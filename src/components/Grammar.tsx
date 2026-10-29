import type { TopicId } from '../game/types'

/**
 * Ayudas visuales de gramática al estilo "Sujeto + Verbo + ...":
 * cada parte de la frase tiene su color, en la explicación y en la frase de ejemplo.
 */
export type Role = 'subj' | 'verb' | 'key' | 'rest'
type Part = { label: string; role: Role } | '+'

export const ROLE_STYLE: Record<Role, { bg: string; fg: string; name: string }> = {
  subj: { bg: '#3b8bd6', fg: '#ffffff', name: 'Sujeto' },
  verb: { bg: '#3aa864', fg: '#ffffff', name: 'Verbo' },
  key: { bg: '#9b6fd0', fg: '#ffffff', name: 'Palabra clave' },
  rest: { bg: 'transparent', fg: 'inherit', name: 'Resto' },
}

const SUBJ = new Set(['i', 'you', 'he', 'she', 'it', 'we', 'they', 'there', "i'm", "you're", "he's", "she's", "it's", "we're", "they're", "there's"])
const VERB = new Set([
  'am', 'is', 'are', "isn't", "aren't", 'be', 'can', "can't", 'do', 'does', "don't", "doesn't", 'have', 'has', 'go', 'goes', 'turn', 'open', 'close',
  'sit', 'stand', 'listen', 'pass', 'drink', 'wash', 'run', 'jump', 'stop', 'give', 'take', 'eat', 'read', 'play', 'need', 'want', 'like', 'love',
  'loves', 'work', 'works', 'live', 'lives', 'speak', 'help', 'bring', 'kick', 'call', 'send', 'look', 'meet', 'was', 'were', 'excuse',
  'got', "haven't", "hasn't", "am", "'m",
])

/** Verbos del presente simple, gustos y presente continuo: se agregan con su forma -s y su forma -ing */
const MORE_VERBS = [
  'get', 'work', 'play', 'live', 'eat', 'watch', 'cook', 'read', 'sleep', 'swim', 'run', 'dance', 'sing', 'ride', 'fly', 'drive', 'walk', 'study',
  'brush', 'sit', 'make', 'take', 'wait', 'listen', 'rain', 'shine', 'help', 'cry', 'speak', 'write', 'jump', 'love', 'like', 'hate', 'draw',
  'buy', 'find', 'remember', 'say', 'know', 'teach', 'wash', 'go', 'do', 'have', 'stand', 'drink', 'look', 'snow', 'garden', 'shop', 'smile',
  'give', 'fly', 'catch', 'count', 'milk', 'want', 'believe', 'prefer', 'swim', 'bark',
]
function third(v: string) {
  if (v === 'have') return 'has'
  if (/[^aeiou]y$/.test(v)) return v.slice(0, -1) + 'ies'
  if (/(s|sh|ch|x|o)$/.test(v)) return v + 'es'
  return v + 's'
}
function ing(v: string) {
  if (v === 'lie') return 'lying'
  if (/[^e]e$/.test(v)) return v.slice(0, -1) + 'ing'
  if (['run', 'swim', 'get', 'sit', 'shop'].includes(v)) return v + v.at(-1) + 'ing'
  return v + 'ing'
}
for (const v of MORE_VERBS) [v, third(v), ing(v)].forEach((f) => VERB.add(f))
const KEY = new Set([
  'my', 'your', 'his', 'her', 'its', 'our', 'their', 'this', 'that', 'these', 'those', 'a', 'an', 'some', 'any', 'in', 'on', 'under', 'next', 'to',
  'between', 'behind', 'front', 'of', 'not', 'what', 'where', 'who', 'when', 'how', 'much', 'many', 'please',
  'always', 'usually', 'sometimes', 'often', 'never',
])

/** Papel de una palabra en la frase, para colorearla */
export function wordRole(word: string, topic?: TopicId): Role {
  const w = word.toLowerCase().replace(/[’`]/g, "'").replace(/[^a-z']/g, '')
  if (!w) return 'rest'
  if (SUBJ.has(w)) return 'subj'
  if (VERB.has(w)) return 'verb'
  if (/'s$/.test(w) && topic === 'possessives') return 'key'
  // Cada tema resalta sus palabras clave; las demás quedan neutras para no saturar
  if (KEY.has(w)) {
    if (topic === 'possessives') return ['my', 'your', 'his', 'her', 'its', 'our', 'their'].includes(w) ? 'key' : 'rest'
    if (topic === 'prepositions') return ['in', 'on', 'under', 'next', 'to', 'between', 'behind', 'front', 'of'].includes(w) ? 'key' : 'rest'
    if (topic === 'demonstratives') return ['this', 'that', 'these', 'those', 'much', 'many'].includes(w) ? 'key' : 'rest'
    if (topic === 'ordering') return ['a', 'an', 'some', 'any', 'please'].includes(w) ? 'key' : 'rest'
    if (topic === 'there-is') return ['a', 'any', 'some', 'where'].includes(w) ? 'key' : 'rest'
    if (topic === 'greetings') return ['what', 'where', 'how', 'who', 'my', 'your'].includes(w) ? 'key' : 'rest'
    if (topic === 'to-be') return w === 'not' ? 'key' : 'rest'
    if (topic === 'imperatives') return w === 'please' ? 'key' : 'rest'
    if (topic === 'present-simple') return ['always', 'usually', 'sometimes', 'often', 'never', 'not'].includes(w) ? 'key' : 'rest'
    if (topic === 'do-does') return ['not', 'what', 'where', 'when'].includes(w) ? 'key' : 'rest'
    if (topic === 'present-continuous' || topic === 'have-got') return ['not', 'what', 'where'].includes(w) ? 'key' : 'rest'
  }
  return 'rest'
}

const QWORDS = new Set(['what', 'where', 'who', 'when', 'how', 'excuse'])
/** Verbos que también pueden ser adjetivos: después del verbo principal no se colorean */
const AMBIG = new Set(['open', 'close', 'like', 'look', 'call', 'work', 'love', 'read', 'stop', 'play', 'run', 'garden', 'shop', 'watch', 'rain', 'snow', 'smile', 'walk', 'drink', 'cook', 'dance', 'help', 'study', 'draw', 'ride', 'sleep', 'swim', 'hate', 'milk', 'count', 'fly', 'catch'])
const norm = (w: string) => w.toLowerCase().replace(/[’`]/g, "'").replace(/[^a-z']/g, '')

/**
 * Papel de cada palabra según su lugar en la frase: lo que va antes del primer verbo
 * es el sujeto ("The windows are open"), el verbo principal y su "not" van en verde.
 */
export function sentenceRoles(words: string[], topic?: TopicId): Role[] {
  const ws = words.map(norm)
  const fv = ws.findIndex((w) => VERB.has(w))
  const isQuestion = QWORDS.has(ws[0] ?? '') || fv === 0
  const roles: Role[] = ws.map((w) => (SUBJ.has(w) ? 'subj' : wordRole(w, topic) === 'key' ? 'key' : 'rest'))
  if (fv < 0) return roles
  // El sujeto: todo lo que va antes del verbo en una frase afirmativa
  if (!isQuestion) for (let i = 0; i < fv; i++) if (roles.at(i) !== 'key') roles.splice(i, 1, 'subj')
  // El verbo principal y lo que lo acompaña (not, n't, otro verbo seguido)
  const AUX = new Set(["don't", 'can', "can't", 'do', 'does', "doesn't", 'to'])
  let i = fv
  while (i < ws.length) {
    const w = ws.at(i)!
    // Un verbo que también es adjetivo solo cuenta si va después de un auxiliar (Don't run · is open)
    const ok = w === 'not' || (VERB.has(w) && (i === fv || !AMBIG.has(w) || AUX.has(ws.at(i - 1)!)))
    if (!ok) break
    roles.splice(i, 1, w === 'not' ? 'key' : 'verb')
    i++
  }
  // Más adelante: otro verbo de orden unido con "and" (Sit down and listen)
  ws.forEach((w, k) => {
    if (k > i && VERB.has(w) && !AMBIG.has(w) && ws.at(k - 1) === 'and') roles.splice(k, 1, 'verb')
    // En preguntas, el verbo que va después del sujeto (Can I have...? Does she live...?)
    if (k >= i && isQuestion && VERB.has(w) && SUBJ.has(ws.at(k - 1) ?? '')) roles.splice(k, 1, 'verb')
  })
  return roles
}

const S = (label: string): Part => ({ label, role: 'subj' })
const V = (label: string): Part => ({ label, role: 'verb' })
const K = (label: string): Part => ({ label, role: 'key' })
const R = (label: string): Part => ({ label, role: 'rest' })

/** La estructura que corresponde a una frase de un tema: afirmativa, negativa o pregunta */
export function patternFor(topic: TopicId, sentence = ''): { title: string; parts: Part[] } {
  const question = /\?\s*$/.test(sentence)
  const negative = /\b(not|n't)\b|n't/i.test(sentence)
  switch (topic) {
    case 'to-be':
    case 'greetings':
      if (question && /^(what|where|how|who)/i.test(sentence.trim()))
        return { title: 'Pregunta con palabra interrogativa:', parts: [K('What / Where / How'), '+', V('am / is / are'), '+', S('Sujeto'), '+', R('...?')] }
      if (question) return { title: 'Para preguntar, el verbo va primero:', parts: [V('Am / Is / Are'), '+', S('Sujeto'), '+', R('...?')] }
      if (negative) return { title: 'Para negar, agrega "not":', parts: [S('Sujeto'), '+', V('am / is / are'), '+', K('not'), '+', R('...')] }
      return { title: 'Usa esta estructura para las frases afirmativas:', parts: [S('Sujeto'), '+', V('am / is / are'), '+', R('...')] }
    case 'possessives':
      return { title: 'El posesivo va antes de la cosa:', parts: [K('my / your / his / her'), '+', R('cosa')] }
    case 'prepositions':
      return { title: 'Para decir dónde está algo:', parts: [S('Cosa'), '+', V('is / are'), '+', K('in / on / under / next to'), '+', R('lugar')] }
    case 'imperatives':
      if (negative) return { title: 'Para prohibir:', parts: [V("Don't"), '+', V('Verbo'), '+', R('...')] }
      return { title: 'Las órdenes empiezan con el verbo, sin sujeto:', parts: [V('Verbo'), '+', R('...')] }
    case 'there-is':
      if (question) return { title: 'Para preguntar si hay algo:', parts: [V('Is / Are'), '+', S('there'), '+', K('a / any'), '+', R('cosa?')] }
      return { title: 'Para decir qué hay en un lugar:', parts: [S('There'), '+', V('is / are'), '+', R('cosa'), '+', R('lugar')] }
    case 'demonstratives':
      return { title: 'Cerca: this / these · Lejos: that / those. Una cosa: is · Varias: are', parts: [K('this / that / these / those'), '+', R('cosa'), '+', V('is / are'), '+', R('...')] }
    case 'ordering':
      return { title: 'Para pedir con amabilidad:', parts: [S('Can I'), '+', V('have'), '+', K('a / an / some'), '+', R('cosa'), '+', K('please?')] }
    case 'present-simple':
      if (question) return { title: 'Para preguntar: do (I, you, we, they) o does (he, she, it):', parts: [V('Do / Does'), '+', S('Sujeto'), '+', V('verbo'), '+', R('...?')] }
      if (negative) return { title: "Para negar: don't o doesn't, y el verbo sin -s:", parts: [S('Sujeto'), '+', V("don't / doesn't"), '+', V('verbo'), '+', R('...')] }
      if (/\b(always|usually|sometimes|often|never)\b/i.test(sentence))
        return { title: 'La frecuencia va antes del verbo (pero después de am / is / are):', parts: [S('Sujeto'), '+', K('always / never'), '+', V('verbo (-s)'), '+', R('...')] }
      return { title: 'Rutinas: con he, she, it el verbo lleva -s (works, goes, studies):', parts: [S('Sujeto'), '+', V('verbo (-s)'), '+', R('...')] }
    case 'likes':
      if (negative) return { title: "Para decir que no te gusta:", parts: [S('Sujeto'), '+', V("don't / doesn't like"), '+', V('verbo-ing'), '+', R('...')] }
      if (question) return { title: 'Para preguntar por gustos:', parts: [V('Do / Does'), '+', S('Sujeto'), '+', V('like'), '+', V('verbo-ing'), '+', R('...?')] }
      return { title: 'Después de like, love y hate el verbo va con -ing:', parts: [S('Sujeto'), '+', V('like / love / hate (-s)'), '+', V('verbo-ing'), '+', R('...')] }
    case 'can':
      if (question) return { title: 'Para preguntar, can va primero:', parts: [V('Can'), '+', S('Sujeto'), '+', V('verbo'), '+', R('...?')] }
      if (negative) return { title: "Para negar: can't + verbo, sin to:", parts: [S('Sujeto'), '+', V("can't"), '+', V('verbo'), '+', R('...')] }
      return { title: 'Después de can va el verbo solo: sin to y sin -s:', parts: [S('Sujeto'), '+', V('can'), '+', V('verbo'), '+', R('...')] }
    case 'present-continuous':
      if (question) return { title: 'Para preguntar qué está pasando:', parts: [K('What'), '+', V('am / is / are'), '+', S('Sujeto'), '+', V('verbo-ing?')] }
      if (negative) return { title: 'Para negar, not va después de am / is / are:', parts: [S('Sujeto'), '+', V('am / is / are'), '+', K('not'), '+', V('verbo-ing'), '+', R('...')] }
      return { title: 'Lo que pasa ahora: no olvides am / is / are:', parts: [S('Sujeto'), '+', V('am / is / are'), '+', V('verbo-ing'), '+', R('...')] }
    case 'have-got':
      if (question) return { title: 'Para preguntar, have o has va primero:', parts: [V('Have / Has'), '+', S('Sujeto'), '+', V('got'), '+', R('...?')] }
      if (negative) return { title: "Para negar: haven't got o hasn't got:", parts: [S('Sujeto'), '+', V("haven't / hasn't"), '+', V('got'), '+', R('...')] }
      return { title: 'I, you, we, they: have got · he, she, it: has got:', parts: [S('Sujeto'), '+', V('have / has'), '+', V('got'), '+', R('cosa')] }
    case 'do-does':
      if (question) return { title: 'Para preguntar: Do (I, you, we, they) o Does (he, she, it) + verbo sin -s:', parts: [V('Do / Does'), '+', S('Sujeto'), '+', V('verbo'), '+', R('...?')] }
      return { title: "Para negar: don't o doesn't + verbo sin -s:", parts: [S('Sujeto'), '+', V("don't / doesn't"), '+', V('verbo'), '+', R('...')] }
    case 'plurals':
      return { title: 'Plurales: -s normal, pero sheep → sheep, goose → geese, mouse → mice, child → children:', parts: [K('two / three...'), '+', R('cosas en plural')] }
    default:
      return { title: 'Usa esta estructura:', parts: [S('Sujeto'), '+', V('Verbo'), '+', R('...')] }
  }
}

/** La caja con la estructura, como en el tablero de Leo */
export function GrammarPattern({ topic, sentence, compact }: { topic: TopicId; sentence?: string; compact?: boolean }) {
  const p = patternFor(topic, sentence)
  return (
    <div className={`rounded-2xl border-2 border-line ${compact ? 'px-3 py-2' : 'px-4 py-3'}`} data-testid="grammar-pattern">
      <p className={`text-paper/75 ${compact ? 'text-sm' : 'text-[15px]'}`}>{p.title}</p>
      <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
        {p.parts.map((part, i) =>
          part === '+' ? (
            <span key={i} className="font-display text-lg text-paper/80">+</span>
          ) : (
            <span
              key={i}
              className="rounded-lg px-2.5 py-0.5 font-display text-[16px] font-medium"
              style={part.role === 'rest' ? { border: '2px solid var(--color-line, #4a4238)' } : { background: ROLE_STYLE[part.role].bg, color: ROLE_STYLE[part.role].fg }}
            >
              {part.label}
            </span>
          ),
        )}
      </div>
    </div>
  )
}

/** Una frase con cada palabra coloreada según su papel */
export function RoleSentence({ text, topic, size = 'md' }: { text: string; topic?: TopicId; size?: 'sm' | 'md' }) {
  const words = text.split(/\s+/).filter(Boolean)
  const roles = sentenceRoles(words, topic)
  return (
    <span className="inline-flex flex-wrap items-center gap-1" data-testid="role-sentence">
      {words.map((w, i) => {
        const r = roles.at(i) ?? 'rest'
        return (
          <span
            key={i}
            className={`rounded-md font-display font-medium ${size === 'sm' ? 'px-1.5 py-0 text-[15px]' : 'px-2 py-0.5 text-[17px]'}`}
            style={r === 'rest' ? { border: '1.5px solid #4a4238' } : { background: ROLE_STYLE[r].bg, color: ROLE_STYLE[r].fg }}
          >
            {w}
          </span>
        )
      })}
    </span>
  )
}

/** Color de una ficha al ordenar: el papel que tiene esa palabra en la frase correcta */
export function tileStyle(words: string[], index: number, topic?: TopicId) {
  const r = sentenceRoles(words, topic).at(index) ?? 'rest'
  return r === 'rest' ? undefined : { background: ROLE_STYLE[r].bg, color: ROLE_STYLE[r].fg, borderColor: ROLE_STYLE[r].bg }
}
