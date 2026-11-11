/**
 * Validador del banco de preguntas (no forma parte del juego).
 *
 *   npm run validate         → revisiones de estructura (sin internet)
 *   npm run validate -- --lt → además pasa el inglés por LanguageTool (necesita internet)
 *
 *   npm run validate -- --strict → termina con error si hay problemas de Estructura o de Cadena (para GitHub Actions)
 *
 * Escribe el informe en reports/validacion.md. Qué revisa:
 *  0. Cadena (scripts/validate-chain.ts): que cada escenario se pueda terminar "en papel" (puertas, tareas encadenadas, cierres).
 *  1. Estructura: IDs repetidos, respuesta fuera de rango, opciones repetidas, "___" que falta,
 *     pistas vacías, prácticas de Leo con IDs inexistentes y enemigos con pocas preguntas propias.
 *  2. Diccionario: palabras en inglés de los textos del juego que no tienen traducción al tocarlas.
 *  3. LanguageTool (--lt):
 *     A) la respuesta CORRECTA tiene un posible error → revisar primero (lo más grave);
 *     B) una opción INCORRECTA no tiene ningún error detectado → podría haber dos respuestas válidas.
 *        B es normal cuando la opción es incorrecta por el contenido (p. ej. "He sold the horses"),
 *        así que es solo una lista para mirar con calma.
 */
import { writeFileSync, mkdirSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { chainIssues } from './validate-chain'
import { translate } from '../src/data/glossary'
import { QUESTIONS } from '../src/data/questions'
import { ENEMIES } from '../src/data/enemies'
import { NPC_TASKS } from '../src/data/tasks'
import type { Question } from '../src/game/types'
import { plateProblems, sentenceOf, type InscriptionRoom } from '../src/game/inscriptions'
import { INS_DEMOS } from '../src/data/b1InscriptionsDemo'
import { STONE_DEMOS } from '../src/data/b1StoneDemo'
import { STONE_OBJECTS, objectNames } from '../src/components/StoneObjects'
import type { TextCommandRoom } from '../src/components/TextCommand'
import { matchCommand } from '../src/game/command'
import { PHRASAL } from '../src/data/glossary'

const useLT = process.argv.includes('--lt')
const LT_URL = process.env.LT_URL ?? 'https://api.languagetool.org/v2/check'

type Issue = { where: string; msg: string }
const structure: Issue[] = []
const ltCorrect: Issue[] = []
const ltWrong: Issue[] = []

// Solo las preguntas escritas a mano (las W-/T-/L-/S- se generan a partir de ellas)
const bank = QUESTIONS.filter((q) => !/^[WTLS]-/.test(q.id))
const kindOf = (q: Question) => q.kind ?? 'fill'

// ── 1. Estructura ──
const seen = new Map<string, number>()
for (const q of bank) seen.set(q.id, (seen.get(q.id) ?? 0) + 1)
for (const [id, n] of seen) if (n > 1) structure.push({ where: id, msg: `ID repetido ${n} veces` })

for (const q of bank) {
  const k = kindOf(q)
  if (q.answer < 0 || q.answer >= q.options.length) structure.push({ where: q.id, msg: `respuesta ${q.answer} fuera de rango (${q.options.length} opciones)` })
  const norm = q.options.map((o) => o.trim().toLowerCase())
  if (k !== 'order' && new Set(norm).size !== norm.length) structure.push({ where: q.id, msg: 'hay opciones repetidas' })
  if (k === 'fill' && !q.audio && !q.prompt.includes('___')) structure.push({ where: q.id, msg: 'pregunta de completar sin "___"' })
  if (k === 'order' && q.answer !== 0) structure.push({ where: q.id, msg: 'ordenar: las palabras deben venir en orden y answer = 0' })
  if (!q.tip?.trim()) structure.push({ where: q.id, msg: 'sin pista (tip)' })
}

const ids = new Set(bank.map((q) => q.id))
for (const [id, t] of Object.entries(NPC_TASKS)) {
  // W-/T-/L-/S- son variantes generadas: basta con que exista la pregunta base
  for (const pid of t.practiceIds ?? []) if (!ids.has(pid.replace(/^[WTLS]-/, ''))) structure.push({ where: `tarea ${id}`, msg: `la práctica usa ${pid}, que no existe` })
}

/** Preguntas que puede sacar un enemigo con onlyTags (mismo filtro que pickQuestion, sin variantes generadas) */
function poolSize(topics: string[], kinds: string[], tags: string[]) {
  return bank.filter((q) => topics.includes(q.topic) && kinds.includes(kindOf(q)) && q.tags?.some((t) => tags.includes(t))).length
}
for (const e of Object.values(ENEMIES)) {
  if (!e.onlyTags || !e.tags?.length) continue
  const n = poolSize(e.topics, e.kinds, e.tags)
  if (n === 0) structure.push({ where: `enemigo ${e.id}`, msg: 'no tiene preguntas propias: mezclará preguntas de cualquier lugar' })
  else if (n < 4) structure.push({ where: `enemigo ${e.id}`, msg: `solo ${n} preguntas propias (se repetirán mucho)` })
  e.phases?.forEach((p, i) => {
    // Fase de hablar o escribir (variantes generadas): cuentan las preguntas base de ordenar y completar
    const kinds = p.kinds.some((k) => k === 'speak' || k === 'write') ? [...p.kinds, 'order', 'fill'] : p.kinds
    // Fase sin etiquetas (repaso mezclado, como en el juego: p.tags ?? []): cuenta todo el banco de sus temas
    const m = p.tags ? poolSize(p.topics, kinds, p.tags) : bank.filter((q) => p.topics.includes(q.topic) && kinds.includes(kindOf(q))).length
    if (m < 3) structure.push({ where: `enemigo ${e.id} · fase ${i + 1}`, msg: `solo ${m} preguntas propias` })
  })
}

// ── 1b. Inscriptions (B1): las tablillas de las tareas y de las salas de prueba ──
const rooms: [string, InscriptionRoom][] = [
  ...Object.entries(NPC_TASKS).flatMap(([id, t]) => (t.inscriptions ? [[`tarea ${id}`, t.inscriptions] as [string, InscriptionRoom]] : [])),
  ...Object.entries(INS_DEMOS).map(([k, r]) => [`sala de prueba ${k}`, r] as [string, InscriptionRoom]),
]
for (const [where, room] of rooms) {
  if (!room.plates.length) structure.push({ where, msg: 'la sala de Inscriptions no tiene tablillas' })
  room.plates.forEach((p, i) => {
    for (const msg of plateProblems(p)) structure.push({ where: `${where} · tablilla ${i + 1}`, msg })
  })
}
// El chequeo se prueba a sí mismo: una tablilla con words y roles de distinto largo tiene que dar error
if (!plateProblems({ words: ['The door', 'was', 'opened'], roles: ['subject', 'aux'], es: 'x', rule: { title: 'x', text: 'x' } }).length)
  structure.push({ where: 'validador de Inscriptions', msg: 'no detecta una tablilla con words y roles de distinto largo' })

// ── 1c. The Moving Stone escrito (B1): los pasos de las salas de tareas y de prueba ──
const stoneRooms: [string, TextCommandRoom][] = [
  ...Object.entries(NPC_TASKS).flatMap(([id, t]) => (t.command?.mode === 'text' ? [[`tarea ${id}`, t.command] as [string, TextCommandRoom]] : [])),
  ...Object.entries(STONE_DEMOS).map(([k, r]) => [`sala de prueba ${k}`, r] as [string, TextCommandRoom]),
]
for (const [where, room] of stoneRooms) {
  for (const o of room.objects) if (!STONE_OBJECTS[o]) structure.push({ where, msg: `el objeto "${o}" no está en el registro (StoneObjects.tsx)` })
  const names = objectNames(room.objects)
  room.steps.forEach((st, i) => {
    const w = `${where} · paso ${i + 1}`
    if (!st.accept.length) structure.push({ where: w, msg: 'no tiene órdenes correctas (accept)' })
    if (!room.objects.includes(st.target)) structure.push({ where: w, msg: `el objeto que cambia (target "${st.target}") no está en la sala` })
    if (!st.tip?.trim()) structure.push({ where: w, msg: 'sin pista (tip)' })
    for (const a of st.accept) {
      if (!a.verb?.trim() || !a.object?.trim()) structure.push({ where: w, msg: 'una orden sin verbo u objeto' })
      if (a.particle && !PHRASAL[`${a.verb} ${a.particle}`]) structure.push({ where: w, msg: `"${a.verb} ${a.particle}" no está en PHRASAL (glossary.ts)` })
      if (!room.objects.includes(a.object)) structure.push({ where: w, msg: `el objeto "${a.object}" no está en la sala` })
      // La orden de ejemplo tiene que pasar la revisión del juego
      const sample = [a.verb, a.particle, 'the', STONE_OBJECTS[a.object]?.names[0] ?? a.object, a.complement?.[0]].filter(Boolean).join(' ')
      if (!matchCommand(sample, st, names).ok) structure.push({ where: w, msg: `la orden "${sample}" no la acepta el juego` })
    }
  })
}

// ── 2. Diccionario: palabras en inglés sin traducción ──
// Se leen los campos con texto en inglés de los archivos de datos. Para no confundir el español con el inglés,
// se descartan las palabras que aparecen en campos en español (es, tip, sub...) y las que llevan tilde.
const noTranslation = new Map<string, Set<string>>()
{
  const dir = 'src/data'
  const EN = /(?:text|en|prompt|say|q|audio):\s*(['"`])((?:\\.|(?!\1).)*)\1/g
  const ES = /(?:es|sub|tip|ask|frame|help|needMsg|intro|placeEs|label|title):\s*(['"`])((?:\\.|(?!\1).)*)\1/g
  const SOUNDS = /^(b+e+p+|b+o+p+|m+o+o+|b+a+a+|n+e+i+g+h+|h+m+|u+h+|a+h+|o+h+|z+|s+h+)$/
  const files = readdirSync(dir).filter((f) => f.endsWith('.ts')).map((f) => [f, readFileSync(`${dir}/${f}`, 'utf8')] as const)
  const spanish = new Set<string>()
  for (const [, src] of files) for (const m of src.matchAll(ES)) for (const t of m[2].split(/[^A-Za-zÀ-ÿ']+/)) spanish.add(t.toLowerCase())
  for (const [f, src] of files) {
    for (const m of src.matchAll(EN)) {
      for (const raw of m[2].replace(/\[|\]/g, ' ').split(/[^A-Za-zÀ-ÿ']+/)) {
        const w = raw.replace(/^'+|'+$/g, '')
        if (w.length < 2 || w.length > 18 || ['ll', 're', 've'].includes(w) || /[À-ÿ]/.test(w) || /^[A-Z]/.test(w)) continue
        const low = w.toLowerCase()
        if (spanish.has(low) || SOUNDS.test(low) || translate(low)) continue
        noTranslation.set(low, (noTranslation.get(low) ?? new Set()).add(f))
      }
    }
  }
}
const dictionary: Issue[] = [...noTranslation].sort().map(([w, fs]) => ({ where: w, msg: [...fs].join(', ') }))

// ── 3. Frases para LanguageTool ──
type Sentence = { text: string; correct: boolean; where: string; checkWrong: boolean }
const sentences: Sentence[] = []
const add = (text: string, correct: boolean, where: string, checkWrong = true) => {
  // Sin pistas en español entre paréntesis y sin espacio antes de contracciones (It ___ → It 's)
  const t = text.replace(/\s*\([^)]*\)/g, '').replace(/ (?='(s|re|m|ll|ve|d)\b)/g, '').replace(/\s+/g, ' ').trim()
  if (t) sentences.push({ text: t, correct, where, checkWrong })
}

for (const q of bank) {
  const k = kindOf(q)
  if (k === 'fill' && q.prompt.includes('___')) {
    q.options.forEach((o, i) => add(q.prompt.replace('___', o), i === q.answer, q.id))
  } else if (k === 'fix') {
    q.options.forEach((o, i) => add(o, i === q.answer, q.id))
  } else if (k === 'order') {
    add(q.options.join(' '), true, q.id)
  } else if (k === 'listen' && q.audio) {
    add(q.audio, true, `${q.id} (audio)`)
  }
}
for (const e of Object.values(ENEMIES)) {
  for (const [label, b] of [['extra', e.bonus], ['despedida', e.farewell]] as const) {
    if (!b) continue
    const where = `${e.id} · pregunta ${label}`
    if (b.q.includes('___')) b.options.forEach((o, i) => add(b.q.replace('___', o).replace(/^[^:]{1,30}: /, ''), i === b.answer, where))
    else b.options.forEach((o, i) => add(o, i === b.answer, where, false))
  }
}
for (const [id, t] of Object.entries(NPC_TASKS)) {
  t.steps.forEach((s, i) => {
    // En las charlas, las opciones malas suelen ser malas por el contenido: solo se revisa la correcta
    if (s.choice) add(s.choice.options[s.choice.answer], true, `tarea ${id} · paso ${i + 1}`, false)
  })
}

for (const [where, room] of rooms) {
  room.plates.forEach((p, i) => {
    const w = `${where} · tablilla ${i + 1}`
    add(sentenceOf(p.words), true, w)
    for (const a of p.alt ?? []) add(sentenceOf(a), true, `${w} (otro orden)`)
    for (const ex of p.rule.examples ?? []) add(ex, true, `${w} (ejemplo de la regla)`)
  })
}

for (const [where, room] of stoneRooms) {
  room.steps.forEach((st, i) => {
    const w = `${where} · paso ${i + 1}`
    add(st.problem.en.replace(/"/g, ''), true, `${w} (problema)`)
    add(st.done.en, true, `${w} (al acertar)`)
    for (const [v, f] of Object.entries(st.fails ?? {})) add(f.en, true, `${w} (reacción a ${v})`)
  })
}

// Reglas de estilo que solo meten ruido (comillas, guiones, mayúscula inicial en fragmentos...)
// ENGLISH_WORD_REPEAT_BEGINNING_RULE salta solo porque se envían muchas frases juntas; las comas antes de "and" son estilo
const DISABLED = ['ENGLISH_WORD_REPEAT_BEGINNING_RULE', 'COMMA_COMPOUND_SENTENCE', 'COMMA_COMPOUND_SENTENCE_2', 'EN_QUOTES', 'DASH_RULE', 'WHITESPACE_RULE', 'COMMA_PARENTHESIS_WHITESPACE', 'UPPERCASE_SENTENCE_START', 'PUNCTUATION_PARAGRAPH_END', 'EN_UNPAIRED_QUOTES', 'EN_UNPAIRED_BRACKETS', 'SENTENCE_FRAGMENT', 'I_LOWERCASE']

type LTMatch = { offset: number; length: number; message: string; rule: { id: string; issueType?: string }; replacements: { value: string }[] }

async function check(text: string): Promise<LTMatch[]> {
  for (let tries = 0; tries < 4; tries++) {
    const res = await fetch(LT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ text, language: 'en-US', disabledRules: DISABLED.join(',') }),
    })
    if (res.status === 429) { await sleep(30_000); continue }
    if (!res.ok) throw new Error(`LanguageTool respondió ${res.status}`)
    return ((await res.json()) as { matches: LTMatch[] }).matches
  }
  throw new Error('LanguageTool: demasiados intentos (límite de uso)')
}
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

async function runLT() {
  // Se agrupan muchas frases por petición (una por párrafo) para respetar el límite gratuito (~20 KB por petición, 75 KB por minuto)
  const MAX = 15_000
  let i = 0
  let batch = 0
  while (i < sentences.length) {
    const group: { s: Sentence; start: number }[] = []
    let text = ''
    while (i < sentences.length && text.length + sentences[i].text.length + 2 < MAX) {
      group.push({ s: sentences[i], start: text.length })
      text += sentences[i].text + '\n\n'
      i++
    }
    if (batch++ > 0) await sleep(process.env.LT_URL ? 0 : 13_000)
    process.stdout.write(`LanguageTool: ${i}/${sentences.length} frases\r`)
    const matches = await check(text)
    const hits = new Map<Sentence, LTMatch[]>()
    for (const m of matches) {
      const g = [...group].reverse().find((x) => x.start <= m.offset)
      if (!g) continue
      const word = text.slice(m.offset, m.offset + m.length)
      // Nombres propios (Okafor, Hale...) no son errores de inglés
      if (m.rule.issueType === 'misspelling' && /^[A-Z]/.test(word)) continue
      hits.set(g.s, [...(hits.get(g.s) ?? []), m])
    }
    for (const { s } of group) {
      const found = hits.get(s) ?? []
      if (s.correct && found.length) {
        const why = found.map((m) => `${m.message}${m.replacements[0] ? ` → ¿"${m.replacements[0].value}"?` : ''}`).join(' · ')
        ltCorrect.push({ where: s.where, msg: `"${s.text}" — ${why}` })
      }
      if (!s.correct && s.checkWrong && !found.length) ltWrong.push({ where: s.where, msg: `"${s.text}"` })
    }
  }
  process.stdout.write('\n')
}

function section(title: string, note: string, list: Issue[]) {
  const body = list.length ? list.map((x) => `- **${x.where}**: ${x.msg}`).join('\n') : '- Nada que revisar ✅'
  return `## ${title} (${list.length})\n\n${note}\n\n${body}\n`
}

/** Bot Cadena: lee todo src/ y revisa el encadenamiento de escenas, tareas y cierres (scripts/validate-chain.ts) */
function runChain(): Issue[] {
  const files: { path: string; text: string }[] = []
  const walk = (dir: string) => {
    for (const f of readdirSync(dir)) {
      const p = join(dir, f)
      if (statSync(p).isDirectory()) walk(p)
      else if (/\.tsx?$/.test(f)) files.push({ path: p, text: readFileSync(p, 'utf8') })
    }
  }
  walk('src')
  return chainIssues(files)
}

async function main() {
  const chain = runChain()
  if (useLT) {
    try {
      await runLT()
    } catch (err) {
      console.error(`No se pudo usar LanguageTool: ${(err as Error).message}`)
      process.exitCode = 1
    }
  }
  const parts = [
    `# Validación del banco de preguntas\n\n${bank.length} preguntas · ${Object.keys(ENEMIES).length} enemigos · ${new Date().toISOString().slice(0, 10)}\n`,
    section('Cadena', 'Bloqueos "en papel": una puerta que no lleva a ningún lado, una tarea que nunca se puede completar, un cierre que no se alcanza. Se revisa por datos, sin jugar: no cubre los minijuegos por dentro ni el micrófono.', chain),
    section('Estructura', 'Errores del archivo de datos. Se corrigen sin saber inglés.', structure),
    section('Diccionario', 'Palabras en inglés de los textos del juego que no tienen traducción al tocarlas. Se agregan en src/data/glossary.ts. Puede salir alguna palabra en español o un nombre propio: esas se ignoran.', dictionary),
  ]
  if (useLT) {
    parts.push(
      section('A · Respuesta correcta con posible error', 'Lo más importante: LanguageTool cree que la respuesta "buena" tiene un error. Puede ser falsa alarma; si hay duda, pásalo a una persona.', ltCorrect),
      section('B · Opción incorrecta sin error detectado', 'Puede que haya dos respuestas válidas, o que la opción sea incorrecta solo por el contenido (eso está bien). Revisar con calma.', ltWrong),
    )
  } else {
    parts.push('_Sin revisión de inglés. Usa `npm run validate -- --lt` (con internet) o la acción "Validar preguntas" en GitHub._\n')
  }
  const report = parts.join('\n')
  mkdirSync('reports', { recursive: true })
  writeFileSync('reports/validacion.md', report)
  if (process.env.GITHUB_STEP_SUMMARY) writeFileSync(process.env.GITHUB_STEP_SUMMARY, report)
  if (process.argv.includes('--strict') && (chain.length || structure.length)) process.exitCode = 1
  console.log(`Cadena: ${chain.length} · Estructura: ${structure.length} · Diccionario: ${dictionary.length}${useLT ? ` · A: ${ltCorrect.length} · B: ${ltWrong.length}` : ''} → reports/validacion.md`)
}

main()
