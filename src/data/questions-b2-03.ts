import type { Question } from '../game/types'

/**
 * B2-03 · Frozen (Ventana 2061). Bloque 1 (la escuela nocturna, data/b2Frozen.ts): prácticas después de cada lección.
 *  - La pizarra (tarea b2-03-senses, tema senses-b2): b2-03-sn1…sn6.
 *  - El cartel de bienestar (tarea b2-03-feelings, tema feelings-b2): b2-03-fe1…fe6.
 *  - El cuaderno olvidado (tarea b2-03-diary, tema diary-b2): b2-03-di1…di6.
 * Las opciones incorrectas están mal en cualquier contexto. La posición de la respuesta correcta varía a propósito.
 */
const SN = 'senses-b2' as const
const FE = 'feelings-b2' as const
const DI = 'diary-b2' as const
const T_SN = ['b2-03-senses']
const T_FE = ['b2-03-feelings']
const T_DI = ['b2-03-diary']

const ids = (p: string) => [1, 2, 3, 4, 5, 6].map((n) => `b2-03-${p}${n}`)
export const B2_03_SENSES_IDS = ids('sn')
export const B2_03_FEELINGS_IDS = ids('fe')
export const B2_03_DIARY_IDS = ids('di')

export const B2_03_QUESTIONS: Question[] = [
  // Bloque 1 · La pizarra (verbos de los sentidos, like / as if)
  { id: 'b2-03-sn1', topic: SN, prompt: 'I heard someone ___ for help, so I ran to the door.', options: ['to shout', 'shouting', 'shouted'], answer: 1, tip: 'hear + alguien + -ing (o forma base), nunca to.', tags: T_SN },
  { id: 'b2-03-sn2', topic: SN, prompt: 'I saw him ___ the door and leave.', options: ['close', 'to close', 'closed'], answer: 0, tip: 'Acción completa → see + alguien + forma base: saw him close.', tags: T_SN },
  { id: 'b2-03-sn3', topic: SN, prompt: 'It smells ___ smoke in here.', options: ['as', 'as if', 'like'], answer: 2, tip: 'like + sustantivo (smoke).', tags: T_SN },
  { id: 'b2-03-sn4', topic: SN, prompt: "You look ___ you haven't slept for days.", options: ['as if', 'like as', 'as'], answer: 0, tip: 'as if + oración completa.', tags: T_SN },
  { id: 'b2-03-sn5', topic: SN, kind: 'fix', prompt: 'We watched the children to play in the yard.', options: ['We watched the children playing in the yard.', 'We watched the children to playing in the yard.', 'We watched to the children play in the yard.'], answer: 0, tip: 'watch + alguien + -ing (o forma base), sin to.', tags: T_SN },
  { id: 'b2-03-sn6', topic: SN, prompt: 'In the story, he looked as if he ___ made of stone.', options: ['is', 'were', 'be'], answer: 1, tip: 'Historia en pasado y algo irreal → as if he were.', tags: T_SN },

  // Bloque 1 · El cartel de bienestar (sentimientos, adjetivo y sustantivo, -ed / -ing)
  { id: 'b2-03-fe1', topic: FE, prompt: 'Too much work and no time. I feel ___.', options: ['relieved', 'overwhelmed', 'boring'], answer: 1, tip: 'Demasiado al mismo tiempo → overwhelmed.', tags: T_FE },
  { id: 'b2-03-fe2', topic: FE, prompt: 'The exam is over and I passed. What a ___!', options: ['relief', 'relieved', 'relieve'], answer: 0, tip: 'Después de "What a" va un sustantivo: relief.', tags: T_FE },
  { id: 'b2-03-fe3', topic: FE, prompt: 'She felt a lot of ___ before the interview.', options: ['anxious', 'anxiously', 'anxiety'], answer: 2, tip: 'a lot of + sustantivo: anxiety.', tags: T_FE },
  { id: 'b2-03-fe4', topic: FE, prompt: "This film is two hours too long. It's really ___.", options: ['bored', 'boring', 'bore'], answer: 1, tip: 'La cosa que causa el sentimiento → -ing: boring.', tags: T_FE },
  { id: 'b2-03-fe5', topic: FE, kind: 'fix', prompt: 'I was very exciting about the trip.', options: ['I was very excited about the trip.', 'I was very excite about the trip.', 'I was very exciting for the trip.'], answer: 0, tip: 'Cómo se siente la persona → -ed: excited.', tags: T_FE },
  { id: 'b2-03-fe6', topic: FE, prompt: 'He lied to his friend, and now he feels ___.', options: ['guilt', 'guilty', 'guiltily'], answer: 1, tip: 'feel + adjetivo: guilty (guilt es el sustantivo).', tags: T_FE },

  // Bloque 1 · El cuaderno olvidado (varios tiempos y phrasal verbs)
  { id: 'b2-03-di1', topic: DI, prompt: "I've been ___ tired lately.", options: ['feel', 'feeling', 'felt'], answer: 1, tip: 'have been + -ing: sigue ahora.', tags: T_DI },
  { id: 'b2-03-di2', topic: DI, prompt: 'I ___ speak up more when I was younger.', options: ['use to', 'was used', 'used to'], answer: 2, tip: 'Costumbre del pasado: used to + verbo.', tags: T_DI },
  { id: 'b2-03-di3', topic: DI, prompt: "Don't hold ___. Tell us what you really think.", options: ['back', 'up', 'down'], answer: 0, tip: 'hold back = contenerse, no decir lo que piensas.', tags: T_DI },
  { id: 'b2-03-di4', topic: DI, prompt: 'Everyone was shouting and I just froze ___.', options: ['down', 'off', 'up'], answer: 2, tip: 'freeze up = quedarse paralizado por el miedo.', tags: T_DI },
  { id: 'b2-03-di5', topic: DI, prompt: 'Take a deep breath and calm ___.', options: ['up', 'down', 'back'], answer: 1, tip: 'calm down = calmarse.', tags: T_DI },
  { id: 'b2-03-di6', topic: DI, kind: 'fix', prompt: "I've been feeling tired since three weeks.", options: ["I've been feeling tired for three weeks.", "I've been feel tired for three weeks.", "I've been feeling tired since three weeks ago."], answer: 0, tip: 'Con una cantidad de tiempo va for: for three weeks.', tags: T_DI },
]
