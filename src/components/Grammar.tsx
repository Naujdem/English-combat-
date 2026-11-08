import type { TopicId } from '../game/types'
import { IRREGULAR_VERBS, MORE_IRREGULAR_PASTS } from '../data/irregular'

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
  "wasn't", "weren't", 'did', "didn't",
  'could', 'send', 'answer', 'repeat', 'spell', 'start', 'tell', 'bring',
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
/** Pasado de los verbos regulares: también se colorean como verbo */
const PAST_VERBS = [
  'walk', 'play', 'want', 'need', 'visit', 'start', 'wait', 'paint', 'clean', 'open', 'close', 'call', 'listen', 'live', 'love', 'like', 'help', 'stop',
  'wash', 'watch', 'cook', 'talk', 'study', 'try', 'carry', 'deliver', 'post', 'look', 'work', 'jump', 'laugh', 'dance', 'smile', 'shout', 'pick',
  'land', 'sort', 'fix', 'finish', 'arrive', 'stay', 'change', 'thank', 'show', 'use', 'spell', 'rain', 'drop', 'hate', 'answer', 'ask', 'kick',
]
function ed(v: string) {
  if (v.endsWith('e')) return v + 'd'
  if (/[^aeiou]y$/.test(v)) return v.slice(0, -1) + 'ied'
  if (['stop', 'drop'].includes(v)) return v + v.at(-1) + 'ed'
  return v + 'ed'
}
for (const v of PAST_VERBS) [v, third(v), ed(v)].forEach((f) => VERB.add(f))
const KEY_BASE = [
  'me', 'him', 'us', 'them', 'past', 'at',
  'my', 'your', 'his', 'her', 'its', 'our', 'their', 'this', 'that', 'these', 'those', 'a', 'an', 'some', 'any', 'in', 'on', 'under', 'next', 'to',
  'between', 'behind', 'front', 'of', 'not', 'what', 'where', 'who', 'when', 'how', 'much', 'many', 'please',
  'always', 'usually', 'sometimes', 'often', 'never',
]
const KEY = new Set([...KEY_BASE, 'yesterday', 'ago', 'last', 'tomorrow', 'tonight', 'going'])
/** Pasados irregulares: van en morado (los regulares, en verde como todo verbo) */
const IRREG_PAST = new Set([...IRREGULAR_VERBS.filter((v) => v.past !== v.base).map((v) => v.past), ...MORE_IRREGULAR_PASTS])
for (const v of IRREGULAR_VERBS) VERB.add(v.base)

/** Papel de una palabra en la frase, para colorearla */
export function wordRole(word: string, topic?: TopicId): Role {
  const w = word.toLowerCase().replace(/[’`]/g, "'").replace(/[^a-z']/g, '')
  if (!w) return 'rest'
  if (SUBJ.has(w)) return 'subj'
  if (IRREG_PAST.has(w) && (topic === 'past-irregular' || topic === 'past-regular')) return 'key'
  if (VERB.has(w)) return 'verb'
  if (/'s$/.test(w) && topic === 'possessives') return 'key'
  // B1 · causa y efecto: los conectores van en morado
  if (topic === 'cause-effect' && ['because', 'so', 'result', 'when', 'while'].includes(w)) return 'key'
  // B1 · present perfect con yet / already / just
  if (topic === 'pp-yet-already' && ['yet', 'already', 'just'].includes(w)) return 'key'
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
    if (topic === 'time') return ['at', 'on', 'in', 'what', 'past', 'to'].includes(w) ? 'key' : 'rest'
    if (topic === 'object-pronouns') return ['me', 'him', 'her', 'us', 'them', 'it'].includes(w) ? 'key' : 'rest'
    if (topic === 'could-you') return w === 'please' ? 'key' : 'rest'
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
    case 'was-were':
      if (question) return { title: 'Para preguntar en pasado, el verbo va primero:', parts: [V('Was / Were'), '+', S('Sujeto'), '+', R('...?')] }
      if (negative) return { title: "Para negar en pasado: wasn't / weren't:", parts: [S('Sujeto'), '+', V("wasn't / weren't"), '+', R('...')] }
      return { title: 'I, he, she, it → was · you, we, they → were:', parts: [S('Sujeto'), '+', V('was / were'), '+', R('...')] }
    case 'past-regular':
      return { title: 'En pasado, el verbo lleva -ed y es igual para todas las personas:', parts: [S('Sujeto'), '+', V('verbo + ed'), '+', R('...'), '+', K('yesterday / ago')] }
    case 'past-irregular':
      return { title: 'Los irregulares tienen su propio pasado (en morado), igual para todas las personas:', parts: [S('Sujeto'), '+', K('went / saw / ate...'), '+', R('...')] }
    case 'past-did':
      if (question) return { title: 'Pregunta en pasado: Did + sujeto + verbo simple (sin -ed):', parts: [V('Did'), '+', S('Sujeto'), '+', V('verbo simple'), '+', R('...?')] }
      if (negative) return { title: "Negativo en pasado: didn't + verbo simple:", parts: [S('Sujeto'), '+', V("didn't"), '+', V('verbo simple'), '+', R('...')] }
      return { title: "Did ya lleva el pasado: el verbo va simple. Yes, I did · No, I didn't:", parts: [V('Did'), '+', S('Sujeto'), '+', V('verbo simple'), '+', R('...?')] }
    case 'past-time':
      if (question) return { title: 'Para preguntar cuándo: When + did + sujeto + verbo?', parts: [K('When'), '+', V('did'), '+', S('Sujeto'), '+', V('verbo'), '+', R('...?')] }
      return { title: 'Cuándo pasó: yesterday · last week · tiempo + ago · in 1980:', parts: [S('Sujeto'), '+', V('pasado'), '+', R('...'), '+', K('two days ago / last week')] }
    case 'going-to':
      return { title: 'Planes: am / is / are + going to + verbo simple:', parts: [S('Sujeto'), '+', V('am / is / are'), '+', K('going to'), '+', V('verbo'), '+', R('...')] }
    case 'going-to-neg':
      if (question) return { title: 'Para preguntar: am / is / are va primero (sin do):', parts: [V('Are / Is'), '+', S('Sujeto'), '+', K('going to'), '+', V('verbo'), '+', R('...?')] }
      return { title: "Para negar: am not / isn't / aren't + going to:", parts: [S('Sujeto'), '+', V("isn't / aren't"), '+', K('going to'), '+', V('verbo'), '+', R('...')] }
    case 'going-to-wh':
      return { title: 'Palabra de pregunta + am / is / are + sujeto + going to + verbo:', parts: [K('What / Where / When'), '+', V('are / is'), '+', S('Sujeto'), '+', K('going to'), '+', V('verbo?')] }
    case 'going-to-predict':
      return { title: 'Ves señales de lo que va a pasar: Look! + sujeto + is / are + going to + verbo:', parts: [K('Look!'), '+', S('Sujeto'), '+', V('is / are'), '+', K('going to'), '+', V('verbo')] }
    case 'want-to':
      if (question) return { title: 'Para invitar o preguntar con cortesía: Would + you + like to + verbo?', parts: [V('Would'), '+', S('you'), '+', K('like to'), '+', V('verbo'), '+', R('...?')] }
      if (negative) return { title: "Para decir que no quieres: don't / doesn't want to + verbo:", parts: [S('Sujeto'), '+', V("don't / doesn't"), '+', K('want to'), '+', V('verbo'), '+', R('...')] }
      return { title: 'Lo que quieres: want(s) to + verbo · con cortesía: would like to + verbo:', parts: [S('Sujeto'), '+', K('want(s) to / would like to'), '+', V('verbo'), '+', R('...')] }
    case 'wishes-conditional':
      if (/\bif\b/i.test(sentence)) return { title: 'Primer condicional: If + presente, will + verbo (después de if, nunca will):', parts: [K('If'), '+', S('sujeto'), '+', V('presente'), '+', K("will / won't"), '+', V('verbo')] }
      if (/\bhope\b/i.test(sentence)) return { title: 'Para desear algo: I hope + frase · I hope to + verbo:', parts: [S('I'), '+', K('hope'), '+', R('you have a great year')] }
      return { title: "Preferencias: I'd like to + verbo · I'd rather + verbo (sin to) · I'd prefer + cosa:", parts: [S('I'), '+', K("'d like to / 'd rather / 'd prefer"), '+', V('verbo / cosa'), '+', R('...')] }
    case 'clothes-shopping':
      if (/\b(enough|too)\b/i.test(sentence)) return { title: 'too + adjetivo (demasiado) · adjetivo + enough (lo bastante):', parts: [S('It'), '+', V("is / isn't"), '+', K('too'), '+', R('big / long'), '+', K('enough')] }
      if (/\btry\b/i.test(sentence)) return { title: 'Probarse ropa: try + it / them + on (el pronombre va en medio):', parts: [K('Can I'), '+', V('try'), '+', S('it / them'), '+', K('on?')] }
      if (question) return { title: 'Precios: How much + is (una cosa) / are (varias)?', parts: [K('How much'), '+', V('is / are'), '+', S('this / these'), '+', R('...?')] }
      return { title: "En la tienda: I'm looking for… · I'd like to return / exchange… · I'll take it:", parts: [S('I'), '+', K("'m looking for / 'd like to return"), '+', R('a black jacket / this shirt')] }
    case 'food-dinner':
      if (/\bhow (much|many)\b/i.test(sentence)) return { title: 'How much + incontable (rice, salt) · How many + plural (eggs, plates):', parts: [K('How much / How many'), '+', S('rice / eggs'), '+', V('do we need / are there'), '+', R('...?')] }
      if (/\b(a few|a little|a lot of|much|many)\b/i.test(sentence)) return { title: 'a lot of (los dos) · a little + incontable · a few + plural:', parts: [S('There is / are'), '+', K('a little / a few / a lot of'), '+', R('salt / tomatoes')] }
      if (/\b(could you|would you like)\b/i.test(sentence)) return { title: 'En la mesa: Could you pass…, please? · Would you like some more…?', parts: [K('Could you / Would you like'), '+', V('pass / some more'), '+', R('the salt / juice?')] }
      if (question) return { title: 'Preguntas con how: How was…? · How often…? · How do you make…?', parts: [K('How'), '+', V('was / often / do you make'), '+', R('...?')] }
      return { title: 'Describir un plato: sabor (sweet, spicy) y forma de cocinarlo (fried, roasted):', parts: [S('The chicken'), '+', V('is'), '+', K('roasted'), '+', R('and a bit spicy')] }
    case 'people-relationships':
      if (/\blook like\b/i.test(sentence)) return { title: 'Aspecto físico: What does + sujeto + look like?', parts: [K('What'), '+', V('does'), '+', S('he / she'), '+', K('look like?')] }
      if (/\blike\?/i.test(sentence) || question) return { title: 'Personalidad: What + is / are + sujeto + like?', parts: [K('What'), '+', V('is / are'), '+', S('he / she / they'), '+', K('like?')] }
      if (/\b(get on|fell out|fall out|made up|make up|in common|trust)\b/i.test(sentence)) return { title: 'Relaciones: get on well with · fall out · make up · have a lot in common:', parts: [S('Sujeto'), '+', K('get on well with / fell out / made up'), '+', R('...')] }
      if (/'s\b/i.test(sentence)) return { title: "Familia con 's: my mother's brother = my uncle:", parts: [S("My mother's"), '+', K('brother'), '+', V('is'), '+', R('my uncle')] }
      return { title: 'Describir a alguien: sujeto + is + (a bit / very) + adjetivo de personalidad:', parts: [S('Sujeto'), '+', V('is'), '+', K('a bit / very'), '+', R('shy / friendly / honest')] }
    case 'housework':
      if (question) return { title: 'Para preguntar si ya se hizo: Have you + participio + ... yet?', parts: [V('Have / Has'), '+', S('Sujeto'), '+', V('done / made / taken out'), '+', R('...'), '+', K('yet?')] }
      if (/\bmake|made\b/i.test(sentence)) return { title: 'make = crear o producir: make the bed, make a cake, make a mess, make a mistake:', parts: [S('Sujeto'), '+', K('make / made'), '+', R('the bed / a mess')] }
      return { title: 'do = tareas y trabajos: do the dishes, do the laundry, do homework, do the shopping:', parts: [S('Sujeto'), '+', K('do / did / have done'), '+', R('the dishes / the laundry')] }
    case 'holidays':
      if (/\brather\b/i.test(sentence)) return { title: "Para elegir: I'd rather + verbo (sin to):", parts: [S('I'), '+', K("'d rather"), '+', V('go camping / stay at a hotel')] }
      return { title: "En una postal: We're staying at + lugar · Yesterday we + pasado:", parts: [S('We'), '+', V("'re staying"), '+', K('at'), '+', R('a hotel / a campsite')] }
    case 'should-must':
      if (question) return { title: 'Para preguntar: Should + sujeto + verbo? · Do / Does + sujeto + have to + verbo?', parts: [V('Should / Do'), '+', S('Sujeto'), '+', K('(have to)'), '+', V('verbo'), '+', R('...?')] }
      if (negative) return { title: "shouldn't = mal consejo · mustn't = prohibido · don't have to = no es necesario:", parts: [S('Sujeto'), '+', K("shouldn't / mustn't / don't have to"), '+', V('verbo'), '+', R('...')] }
      return { title: 'Consejo: should · Regla: must · Obligación: have to / has to. Después, el verbo va solo:', parts: [S('Sujeto'), '+', K('should / must / have to'), '+', V('verbo'), '+', R('...')] }
    case 'obligation-b1':
      if (/\bmustn't\b/i.test(sentence)) return { title: "Prohibido: mustn't + verbo base:", parts: [S('Sujeto'), '+', K("mustn't"), '+', V('verbo'), '+', R('...')] }
      if (/\b(don't|doesn't) have to\b|\bneedn't\b/i.test(sentence)) return { title: "No es necesario: don't / doesn't have to · needn't + verbo base:", parts: [S('Sujeto'), '+', K("don't have to / needn't"), '+', V('verbo'), '+', R('...')] }
      return { title: 'Obligación: must + verbo base (sin to) · have to / has to + verbo base:', parts: [S('Sujeto'), '+', K('must / have to / has to'), '+', V('verbo'), '+', R('...')] }
    case 'bank-phrasal':
      if (/\b(it|them|me)\s+(in|on|out|up|off)\b/i.test(sentence)) return { title: 'Con pronombre, el pronombre va en medio: fill it in · turn it on:', parts: [V('Verbo'), '+', S('it / them / me'), '+', K('in / on / out / up')] }
      if (/\b(account|card|machine|ID)\b/.test(sentence) && !/\b(fill|pay|take|sign)\s/i.test(sentence)) return { title: 'Sustantivo + sustantivo: el primero describe al segundo (bank account, cash machine):', parts: [K('bank / debit / cash'), '+', R('account / card / machine')] }
      return { title: 'Phrasal verb: verbo + palabra pequeña (fill in, take out, pay in, sign up):', parts: [S('Sujeto'), '+', V('verbo'), '+', K('in / out / up / on'), '+', R('...')] }
    case 'used-to':
      if (question) return { title: 'Pregunta: Did + sujeto + use to + verbo base? (sin d):', parts: [V('Did'), '+', S('Sujeto'), '+', K('use to'), '+', V('verbo'), '+', R('...?')] }
      if (negative) return { title: "Negativa: didn't use to + verbo base (sin d):", parts: [S('Sujeto'), '+', K("didn't use to"), '+', V('verbo'), '+', R('...')] }
      return { title: 'Hábito de antes: used to + verbo base:', parts: [S('Sujeto'), '+', K('used to'), '+', V('verbo'), '+', R('...')] }
    case 'get-used-to':
      if (/\bgett?ing used to\b|\bget used to\b/i.test(sentence)) return { title: 'Acostumbrarse (el proceso): get used to + -ing o sustantivo:', parts: [S('Sujeto'), '+', V('am / is getting'), '+', K('used to'), '+', R('-ing / sustantivo')] }
      return { title: 'Estar acostumbrado: be used to + -ing o sustantivo:', parts: [S('Sujeto'), '+', V('am / is / are'), '+', K('used to'), '+', R('-ing / sustantivo')] }
    case 'invitations':
      if (question) return { title: 'Para invitar: Would + you + like to + verbo? · How about + verbo con -ing?', parts: [K('Would you like to / How about'), '+', V('verbo / verbo-ing'), '+', R('...?')] }
      return { title: "Let's + verbo · la frecuencia (always, usually, sometimes, never) va antes del verbo:", parts: [S('Sujeto'), '+', K('always / usually / sometimes / never'), '+', V('verbo'), '+', R('...')] }
    case 'requests':
      if (negative) return { title: "Para decir que no con amabilidad: Sorry, I can't. + la razón:", parts: [K("Sorry, I can't."), '+', R("I'm busy...")] }
      return { title: 'Para pedir: Can / Could + you + verbo? · Would you mind + verbo con -ing?', parts: [K('Can / Could you · Would you mind'), '+', V('verbo / verbo-ing'), '+', R('...'), '+', K('please?')] }
    case 'past-simple':
      if (/\bthan\b/i.test(sentence)) return { title: 'Para comparar: adjetivo corto + -er + than (older, bigger):', parts: [S('Sujeto'), '+', V('is / was'), '+', K('older / bigger'), '+', K('than'), '+', R('...')] }
      return { title: 'Pasado: regulares + -ed (visited) · irregulares con su forma (went, saw) · yesterday / last week:', parts: [S('Sujeto'), '+', V('verbo en pasado'), '+', R('...'), '+', K('yesterday / last week')] }
    case 'instructions':
      return { title: "Pasos en orden con el verbo tal cual · It's my job to + verbo · responsible for:", parts: [K('First / Then / After that / Finally'), '+', V('verbo'), '+', R('...')] }
    case 'past-simple-comparatives':
      if (/\bthan\b/i.test(sentence)) return { title: 'Para comparar: corto + -er + than · more + largo + than:', parts: [S('Sujeto'), '+', V('was / were'), '+', K('older / more expensive'), '+', K('than'), '+', R('...')] }
      if (negative) return { title: "Para negar en pasado: didn't + verbo base:", parts: [S('Sujeto'), '+', K("didn't"), '+', V('verbo base'), '+', R('...')] }
      return { title: 'Pasado: regulares + -ed (organized) · irregulares con su forma (became, lost):', parts: [S('Sujeto'), '+', V('verbo en pasado'), '+', R('...')] }
    case 'superlatives-comparatives-race':
      if (/\bthe (most|best|\w+est)\b/i.test(sentence)) return { title: 'El más de todos: the + corto + -est · the most + largo:', parts: [S('Sujeto'), '+', V('is'), '+', K('the fastest / the most...'), '+', R('...')] }
      if (/\bthan\b/i.test(sentence)) return { title: 'Para comparar dos: corto + -er + than · more + largo + than:', parts: [S('Sujeto'), '+', V('is'), '+', K('faster / more careful'), '+', K('than'), '+', R('...')] }
      return { title: 'Comparar: faster than · El más: the fastest · Ahora mismo: am / is / are + -ing:', parts: [S('Sujeto'), '+', V('is / are'), '+', K('faster than / the fastest / running'), '+', R('...')] }
    case 'past-simple-continuous':
      return { title: 'Acción larga: was / were + -ing · acción corta que interrumpe: pasado simple (when / while):', parts: [S('Sujeto'), '+', V('was / were + -ing'), '+', K('when'), '+', R('acción en pasado simple')] }
    case 'recipes-some-any':
      if (question || negative) return { title: 'En negativas y preguntas: any:', parts: [V("Is there / There isn't"), '+', K('any'), '+', R('cosa')] }
      return { title: "Receta: el verbo va primero (Don't + verbo para prohibir) · en afirmativas: some:", parts: [V('Put / Add / Mix'), '+', K('some'), '+', R('cosa')] }
    case 'pp-yet-already':
      if (/\b(yesterday|last night|ago)\b/i.test(sentence)) return { title: 'Momento terminado (yesterday, last night): past simple, no present perfect:', parts: [S('Sujeto'), '+', V('pasado'), '+', R('...'), '+', K('yesterday')] }
      if (question) return { title: '¿Ya? Have / Has + sujeto + participio + yet?', parts: [V('Have / Has'), '+', S('sujeto'), '+', V('participio'), '+', R('...'), '+', K('yet?')] }
      if (negative) return { title: "Todavía no: haven't / hasn't + participio + yet (al final):", parts: [S('Sujeto'), '+', V("haven't / hasn't"), '+', V('participio'), '+', R('...'), '+', K('yet')] }
      return { title: 'Ya / hace muy poco: have / has + already / just + participio:', parts: [S('Sujeto'), '+', V('have / has'), '+', K('already / just'), '+', V('participio'), '+', R('...')] }
    case 'present-perfect':
      if (question) return { title: 'Para preguntar por experiencias: Have / Has + sujeto + ever + participio?', parts: [V('Have / Has'), '+', S('Sujeto'), '+', K('ever'), '+', V('participio'), '+', R('...?')] }
      if (negative) return { title: "Para negar: haven't / hasn't + participio (… yet):", parts: [S('Sujeto'), '+', K("haven't / hasn't"), '+', V('participio'), '+', R('... yet')] }
      return { title: 'have / has + participio (seen, been, found) · just / already van en medio:', parts: [S('Sujeto'), '+', K('have / has'), '+', V('participio'), '+', R('...')] }
    case 'places-directions':
      if (question) return { title: 'Para preguntar el camino:', parts: [K('How can I get to'), '+', R('lugar?')] }
      return { title: 'Dónde está: next to / between / opposite · cómo llegar: turn left / go straight:', parts: [S('Lugar'), '+', V('is'), '+', K('next to / between / opposite'), '+', R('...')] }
    case 'futures-b1':
    case 'future-plans':
      if (/\bwill\b|'ll\b/i.test(sentence)) return { title: 'Decisión ahora, oferta o promesa: will + verbo (sin to):', parts: [S('Sujeto'), '+', K('will'), '+', V('verbo'), '+', R('...')] }
      if (/\bgoing to\b/i.test(sentence)) return { title: 'Intención o algo que se ve venir: am / is / are + going to + verbo:', parts: [S('Sujeto'), '+', K('am / is / are going to'), '+', V('verbo'), '+', R('...')] }
      return { title: 'Plan acordado: am / is / are + -ing · intención: going to · decisión ahora: will:', parts: [S('Sujeto'), '+', K('am leaving / going to / will'), '+', V('verbo'), '+', R('...')] }
    case 'health-emergency':
      if (/\b(should|must)/i.test(sentence)) return { title: 'Consejo: should + verbo · norma: must + verbo (sin to):', parts: [S('You'), '+', K("should / shouldn't / must"), '+', V('verbo'), '+', R('...')] }
      return { title: "Síntomas: I've got + a headache · una parte duele: hurts · consejo: should + verbo:", parts: [S('I / He'), '+', K("'ve got / 's got"), '+', R('a headache / a cough')] }
    case 'cause-effect':
      if (/\bbecause of\b/i.test(sentence)) return { title: 'Causa con un sustantivo: because of + the smoke / the fire:', parts: [S('Sujeto'), '+', V('verbo'), '+', R('...'), '+', K('because of'), '+', R('sustantivo')] }
      if (/\bbecause\b/i.test(sentence)) return { title: 'Causa con una oración completa: because + sujeto + verbo:', parts: [S('Sujeto'), '+', V('verbo'), '+', R('...'), '+', K('because'), '+', S('sujeto'), '+', V('verbo')] }
      if (/\bas a result\b/i.test(sentence)) return { title: 'Resultado en una frase nueva: As a result, + oración:', parts: [R('Causa.'), '+', K('As a result,'), '+', S('sujeto'), '+', V('verbo'), '+', R('...')] }
      if (/\bso\b/i.test(sentence)) return { title: 'Resultado: causa, + so + resultado:', parts: [R('Causa,'), '+', K('so'), '+', S('sujeto'), '+', V('verbo'), '+', R('...')] }
      return { title: 'Causa: because (+ oración) · because of (+ sustantivo) · Resultado: so · As a result,', parts: [S('Sujeto'), '+', V('verbo'), '+', K('because / because of / so'), '+', R('...')] }
    case 'emergencies':
      if (question) return { title: 'Pedir ayuda: Is anybody there? · Can you hear me?', parts: [V('Is / Can'), '+', S('anybody / you'), '+', R('there / hear me?')] }
      return { title: "Órdenes en una emergencia: verbo base al principio · Don't + verbo:", parts: [K("(Don't)"), '+', V('Call / Get out / Follow / use'), '+', R('the firefighters / my voice')] }
    case 'time':
      if (question) return { title: 'Para preguntar la hora:', parts: [K('What time'), '+', V('is'), '+', S('it?')] }
      return { title: 'at + hora · on + día · in + mes, estación o parte del día:', parts: [R('...'), '+', K('at / on / in'), '+', R('hora / día / mes')] }
    case 'object-pronouns':
      return { title: 'Después del verbo (o de to, with, for): me, you, him, her, it, us, them:', parts: [V('Verbo'), '+', K('me / him / her / us / them'), '+', R('...')] }
    case 'could-you':
      return { title: 'Para pedir con cortesía:', parts: [V('Could'), '+', S('you / I'), '+', V('verbo'), '+', R('...'), '+', K('please?')] }
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

/** Una celda de tabla con colores: <sujeto> azul, [verbo] verde, {clave} morado */
export function MarkedText({ text }: { text: string }) {
  const parts = text.split(/(<[^>]+>|\[[^\]]+\]|\{[^}]+\})/g).filter(Boolean)
  return (
    <>
      {parts.map((p, i) => {
        const role: Role | null = p.startsWith('<') ? 'subj' : p.startsWith('[') ? 'verb' : p.startsWith('{') ? 'key' : null
        if (!role) return <span key={i}>{p}</span>
        return (
          <span key={i} className="font-semibold" style={{ color: role === 'subj' ? '#5aa7f0' : role === 'verb' ? '#4cc47a' : '#b994ea' }}>
            {p.slice(1, -1)}
          </span>
        )
      })}
    </>
  )
}

/** Quita las marcas de color (para leer en voz alta) */
export function unmark(text: string) {
  return text.replace(/[<>[\]{}]/g, '')
}

/** Tabla de explicación: cada fila en su línea, con colores (en vez de una lista con comas) */
export function GrammarTable({ table }: { table: { head?: string[]; rows: string[][]; arrow?: boolean } }) {
  const cols = Math.max(...table.rows.map((r) => r.length))
  const template = table.arrow ? `auto 1.2rem ${'auto '.repeat(cols - 1)}`.trim() : `repeat(${cols}, auto)`
  return (
    <div className="anim-fade-in mt-3 overflow-x-auto rounded-xl border-2 border-line" data-testid="grammar-table">
      <div className="grid w-full" style={{ gridTemplateColumns: template }}>
        {table.head &&
          table.head.map((h, k) => (
            <div key={`h${k}`} className="contents">
              <div className="border-b border-line bg-black/20 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-paper/55">{h}</div>
              {table.arrow && k === 0 && <div className="border-b border-line bg-black/20" />}
            </div>
          ))}
        {table.rows.map((r, i) => (
          <div key={i} className="contents">
            {r.map((c, k) => (
              <div key={k} className="contents">
                <div className={`px-3 py-1.5 font-display text-[17px] leading-snug ${i < table.rows.length - 1 ? 'border-b border-line/60' : ''}`}>
                  <MarkedText text={c} />
                </div>
                {table.arrow && k === 0 && (
                  <div className={`flex items-center justify-center text-paper/45 ${i < table.rows.length - 1 ? 'border-b border-line/60' : ''}`}>→</div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
