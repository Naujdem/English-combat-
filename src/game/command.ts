import { isSeparable, PHRASAL } from '../data/glossary'

/**
 * The Moving Stone escrito (B1): revisión de una orden escrita por el jugador ("Push the stone slowly to the left").
 * Función pura, sin React: la usan CommandPuzzle (mode 'text'), el validador y scripts/test-command.ts.
 */

/** Una orden correcta: verbo (+ partícula) + objeto (+ complemento obligatorio). optional = palabras que se aceptan y se ignoran */
export type CommandAccept = {
  verb: string
  particle?: string
  /** id del objeto en el registro de la escena (components/StoneObjects.tsx) */
  object: string
  /** Complemento obligatorio: basta con UNA de estas variantes ("with the gold key", "with the key") */
  complement?: string[]
  /** Adverbios o lugares que se aceptan y se ignoran ("slowly", "to the left") */
  optional?: string[]
}

/** Un paso del modo escrito */
export type TextStep = {
  /** Lo que ve el jugador (en los templos, puede venir en pasiva: "The door must be opened with the gold key") */
  problem: { en: string; es: string }
  accept: CommandAccept[]
  /** id del objeto que cambia de estado al acertar */
  target: string
  done: { en: string; es: string }
  /** Pista en español (2.º error) */
  tip: string
  /** Reacciones propias a verbos que existen pero no sirven: { break: { en: "The stone doesn't move.", es: '…' } } */
  fails?: Record<string, { en: string; es: string }>
  /** Verbos reales que no sirven aquí (para distinguirlos de palabras desconocidas) */
  verbPool?: string[]
}

/** Nombres de un objeto de la escena (para reconocerlo en la orden): ['gold key', 'key'] */
export type ObjectNames = { id: string; names: string[] }

export type MatchResult =
  | { ok: true; accept: CommandAccept }
  /** Una palabra casi bien: "Did you mean lift?" (no cuenta como error) */
  | { ok: false; kind: 'typo'; word: string; suggestion: string }
  /** "pick up it": con pronombre, va en medio */
  | { ok: false; kind: 'pronoun'; verb: string; particle: string }
  /** Un verbo real que no resuelve el problema */
  | { ok: false; kind: 'wrongVerb'; verb: string }
  /** Una palabra que no se reconoce como verbo */
  | { ok: false; kind: 'unknown'; word: string }
  /** El verbo sirve, pero sobre otro objeto */
  | { ok: false; kind: 'wrongObject'; object: string }
  /** El verbo sirve, pero falta o sobra algo (la partícula, el complemento…) */
  | { ok: false; kind: 'incomplete' }
  /** No es una orden: sin verbo, solo un sustantivo… (no cuenta como error) */
  | { ok: false; kind: 'malformed' }

const DROP = new Set(['the', 'a', 'an', 'please'])
export const PARTICLES = new Set(['up', 'down', 'on', 'off', 'in', 'out', 'aside', 'around', 'apart', 'away', 'back', 'over', 'through'])
export const PRONOUN_HINT = "Con un pronombre, va en medio: pick it up (no 'pick up it')."

/** Minúsculas, sin signos, sin "the / a / an / please" y sin espacios de más */
export function tokens(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[’`]/g, "'")
    .replace(/[^a-z' -]/g, ' ')
    .replace(/-/g, ' ')
    .split(/\s+/)
    .filter((t) => t && !DROP.has(t))
}

/** Distancia de edición (Levenshtein) */
export function distance(a: string, b: string): number {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)])
  for (let j = 1; j <= b.length; j++) d[0][j] = j
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1))
  return d[a.length][b.length]
}
const near = (typed: string, word: string) => typed !== word && distance(typed, word) <= (word.length >= 7 ? 2 : 1)

/** Busca `part` (ya en tokens) dentro de `list`, desde cualquier posición. Devuelve la posición o -1 */
function find(list: string[], part: string[]): number {
  if (!part.length) return -1
  for (let i = 0; i + part.length <= list.length; i++) if (part.every((p, k) => list[i + k] === p)) return i
  return -1
}
const cut = (list: string[], at: number, n: number) => [...list.slice(0, at), ...list.slice(at + n)]
const same = (a: string[], b: string[]) => a.length === b.length && a.every((x, i) => x === b[i])

/**
 * ¿La orden (ya en tokens) cumple esta forma correcta?
 * Formas válidas del resto, tras quitar el verbo, lo opcional y el complemento:
 *   [partícula, objeto] · [objeto, partícula] (si se separa) · [it, partícula] (si se separa) · [partícula, it] (si NO se separa) · [objeto] · [it]
 */
function fits(t: string[], a: CommandAccept, names: string[][]): 'ok' | 'pronoun' | 'complement' | 'no' {
  if (t[0] !== a.verb) return 'no'
  let rest = t.slice(1)
  for (const opt of a.optional ?? []) {
    const o = tokens(opt)
    const at = find(rest, o)
    if (at >= 0) rest = cut(rest, at, o.length)
  }
  if (a.complement?.length) {
    const hit = a.complement.map(tokens).find((c) => find(rest, c) >= 0)
    if (!hit) return 'complement'
    rest = cut(rest, find(rest, hit), hit.length)
  }
  const p = a.particle
  const sep = p ? isSeparable(`${a.verb} ${p}`) : false
  if (p && same(rest, [p, 'it'])) return sep ? 'pronoun' : 'ok'
  if (p && same(rest, ['it', p])) return sep ? 'ok' : 'no'
  if (!p && same(rest, ['it'])) return 'ok'
  for (const n of names) {
    if (!p && same(rest, n)) return 'ok'
    if (p && same(rest, [p, ...n])) return 'ok'
    if (p && sep && same(rest, [...n, p])) return 'ok'
  }
  return 'no'
}

/**
 * Revisa una orden escrita.
 * objects: los objetos de la escena con sus nombres. allowTypo: si se puede avisar de una falta de ortografía
 * (el juego lo apaga en el intento siguiente a un aviso, así el aviso sale una sola vez por intento).
 */
export function matchCommand(input: string, step: TextStep, objects: ObjectNames[], opts: { allowTypo?: boolean } = {}): MatchResult {
  let t = tokens(input)
  const allowTypo = opts.allowTypo ?? true
  const namesOf = (id: string) => (objects.find((o) => o.id === id)?.names ?? [id]).map(tokens)
  const verbs = new Set([...step.accept.map((a) => a.verb), ...(step.verbPool ?? [])])
  const objectWords = new Set(objects.flatMap((o) => o.names.flatMap(tokens)))

  // Faltas de ortografía: una palabra que no se conoce pero se parece mucho a una conocida
  if (allowTypo) {
    const vocab = new Set<string>([
      ...verbs,
      ...PARTICLES,
      ...objectWords,
      'it',
      ...step.accept.flatMap((a) => [...(a.complement ?? []), ...(a.optional ?? [])].flatMap(tokens)),
    ])
    for (const w of t) {
      if (vocab.has(w)) continue
      const sug = [...vocab].find((v) => v.length >= 3 && near(w, v))
      if (sug) return { ok: false, kind: 'typo', word: w, suggestion: sug }
    }
  }

  if (!t.length) return { ok: false, kind: 'malformed' }
  const verb = t[0]
  if (!verbs.has(verb)) {
    // Sin verbo al principio: si empieza por un objeto o una partícula, no es una orden
    if (objectWords.has(verb) || PARTICLES.has(verb) || verb === 'it') return { ok: false, kind: 'malformed' }
    // Un verbo real de otro problema (ej. un phrasal del diccionario): no sirve aquí
    if (Object.keys(PHRASAL).some((p) => p.split(' ')[0] === verb)) return { ok: false, kind: 'wrongVerb', verb }
    return { ok: false, kind: 'unknown', word: verb }
  }

  const mine = step.accept.filter((a) => a.verb === verb)
  if (!mine.length) return { ok: false, kind: 'wrongVerb', verb }

  let pronoun: CommandAccept | null = null
  let missing = false
  for (const a of mine) {
    const r = fits(t, a, namesOf(a.object))
    if (r === 'ok') return { ok: true, accept: a }
    if (r === 'pronoun') pronoun = a
    if (r === 'complement') missing = true
  }
  if (pronoun) return { ok: false, kind: 'pronoun', verb: pronoun.verb, particle: pronoun.particle! }

  // ¿Nombró otro objeto de la escena?
  const targets = new Set(mine.map((a) => a.object))
  t = t.slice(1)
  for (const o of objects) {
    if (targets.has(o.id)) continue
    // Un objeto que solo aparece dentro del complemento ("with the gold key") no cuenta como objeto equivocado
    const inComplement = mine.some((a) => (a.complement ?? []).some((c) => o.names.some((n) => find(tokens(c), tokens(n)) >= 0)))
    if (inComplement) continue
    if (o.names.some((n) => find(t, tokens(n)) >= 0)) {
      // Si además nombró el objeto correcto (en un orden raro), es incompleta, no de objeto equivocado
      const named = mine.some((a) => namesOf(a.object).some((n) => find(t, n) >= 0))
      if (!named) return { ok: false, kind: 'wrongObject', object: o.id }
    }
  }
  if (!t.length) return { ok: false, kind: missing ? 'incomplete' : 'malformed' }
  return { ok: false, kind: 'incomplete' }
}

/** La orden con letras ocultas en el verbo y la partícula: "l_ft u_ the lid" (ayuda del 3.er error) */
export function maskedCommand(a: CommandAccept, objects: ObjectNames[]): string {
  const hide = (w: string) => (w.length < 2 ? w : w[0] + '_' + w.slice(2))
  const obj = objects.find((o) => o.id === a.object)?.names[0] ?? a.object
  return [hide(a.verb), ...(a.particle ? [hide(a.particle)] : []), `the ${obj}`, ...(a.complement?.length ? [a.complement[0]] : [])].join(' ')
}

/** La orden correcta escrita (para leerla en voz alta al acertar) */
export function commandText(input: string): string {
  const s = input.trim().replace(/\s+/g, ' ')
  if (!s) return s
  const c = s[0].toUpperCase() + s.slice(1)
  return /[.!?]$/.test(c) ? c : `${c}.`
}
