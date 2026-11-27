import type { Question } from '../game/types'

/**
 * B2-07 · The Old Building (presente). Bloque 1 (el barrio antiguo y el edificio, data/b2OldBuilding.ts): prácticas después de cada lección.
 *  - Hablar del cambio y the more… the more con Leo (tarea b2-07-change, tema change-b2): b2-07-ch1…ch6.
 *  - Alternativas a if: unless, as long as, provided, otherwise, suppose (tarea b2-07-conditions, tema if-alt-b2): b2-07-ia1…ia6.
 *  - Phrasal verbs con get (tarea b2-07-get, tema get-b2): b2-07-gt1…gt6.
 * Las opciones incorrectas están mal en cualquier contexto. La posición de la respuesta correcta varía a propósito.
 */
const CH = 'change-b2' as const
const IA = 'if-alt-b2' as const
const GT = 'get-b2' as const
const T_CH = ['b2-07-change']
const T_IA = ['b2-07-conditions']
const T_GT = ['b2-07-get']

const ids = (p: string) => [1, 2, 3, 4, 5, 6].map((n) => `b2-07-${p}${n}`)
export const B2_07_CHANGE_IDS = ids('ch')
export const B2_07_CONDITIONS_IDS = ids('ia')
export const B2_07_GET_IDS = ids('gt')

export const B2_07_QUESTIONS: Question[] = [
  // Bloque 1 · Leo (hablar del cambio, the more… the more)
  { id: 'b2-07-ch1', topic: CH, prompt: 'The area ___ a lot since I was a child.', options: ['has changed', 'changes', 'is changed'], answer: 0, tip: 'Un cambio desde un momento del pasado hasta hoy → present perfect: has changed.', tags: T_CH },
  { id: 'b2-07-ch2', topic: CH, prompt: 'Rents ___ for years, and they are still going up.', options: ['rise', 'are rising', 'have been rising'], answer: 2, tip: 'Algo que empezó antes y sigue → present perfect continuous: have been rising (nunca "are rising for years").', tags: T_CH },
  { id: 'b2-07-ch3', topic: CH, prompt: "This street ___ be quiet. Now it's full of tourists.", options: ['was used to', 'used to', 'is used to'], answer: 1, tip: 'Algo que antes era así y ya no → used to + verbo: used to be.', tags: T_CH },
  { id: 'b2-07-ch4', topic: CH, prompt: "Living here is getting ___.", options: ['more and more expensiver', 'more and more expensive', 'expensive and expensive'], answer: 1, tip: 'Con adjetivos largos: more and more + adjetivo (sin -er).', tags: T_CH },
  { id: 'b2-07-ch5', topic: CH, prompt: 'The more tourists come, ___ the rents get.', options: ['higher', 'the more high', 'the higher'], answer: 2, tip: 'the + comparativo…, the + comparativo: the more…, the higher.', tags: T_CH },
  {
    id: 'b2-07-ch6',
    topic: CH,
    kind: 'listen',
    audio: "I've lived on this street for sixty years. I'm not against tourists, but the more tourists come, the fewer neighbours we have.",
    voice: 'female',
    prompt: 'According to Rosa, what happens when more tourists come?',
    options: ['The rents go down.', 'There are fewer neighbours.', 'The shops close.'],
    answer: 1,
    tip: '"The more tourists come, the fewer neighbours we have."',
    tags: T_CH,
  },
  // Bloque 1 · Leo (alternativas a if)
  { id: 'b2-07-ia1', topic: IA, prompt: "___ we do something, it'll become luxury flats.", options: ['Unless', 'As long as', 'Provided'], answer: 0, tip: 'unless = if… not: si no hacemos algo.', tags: T_IA },
  { id: 'b2-07-ia2', topic: IA, prompt: "Unless you ___, you'll lose the flat.", options: ["don't pay", 'pay', 'will pay'], answer: 1, tip: 'unless ya es negativo (if… not): unless you pay. Y después va presente, no will.', tags: T_IA },
  { id: 'b2-07-ia3', topic: IA, prompt: "We'll support the plan as long as it ___ public.", options: ['will stay', 'stays', 'stay'], answer: 1, tip: 'Después de as long as va presente: as long as it stays.', tags: T_IA },
  { id: 'b2-07-ia4', topic: IA, prompt: 'We need to speak up, ___ nobody will listen.', options: ['unless', 'provided', 'otherwise'], answer: 2, tip: 'otherwise = si no (si no lo hacemos, pasará esto).', tags: T_IA },
  { id: 'b2-07-ia5', topic: IA, prompt: '___ they build a school here. Who would teach in it?', options: ['Suppose', 'Unless', 'Otherwise'], answer: 0, tip: 'Suppose / Supposing… = imagina que…', tags: T_IA },
  {
    id: 'b2-07-ia6',
    topic: IA,
    kind: 'listen',
    audio: "I'll help you with the meeting as long as you help me with the posters. Deal?",
    voice: 'male',
    prompt: 'What does Leo want in return?',
    options: ['A room in the building.', 'Money for the project.', 'Help with the posters.'],
    answer: 2,
    tip: '"As long as you help me with the posters": esa es la condición.',
    tags: T_IA,
  },
  // Bloque 1 · Leo (phrasal verbs con get)
  { id: 'b2-07-gt1', topic: GT, prompt: "Rosa can't ___ her own street anymore because of the crowds.", options: ['get around', 'get over', 'get away with'], answer: 0, tip: 'get around = moverse por un lugar.', tags: T_GT },
  { id: 'b2-07-gt2', topic: GT, prompt: 'The small shops just ___ with the money from tourists.', options: ['get through', 'get along', 'get by'], answer: 2, tip: 'get by = arreglárselas con lo justo.', tags: T_GT },
  { id: 'b2-07-gt3', topic: GT, prompt: 'Do you ___ your neighbours?', options: ['get over', 'get along with', 'get by'], answer: 1, tip: 'get along with someone = llevarse bien con alguien.', tags: T_GT },
  { id: 'b2-07-gt4', topic: GT, prompt: 'It took my aunt months to ___ losing her flat.', options: ['get through with', 'get away with', 'get over'], answer: 2, tip: 'get over something = superar algo malo.', tags: T_GT },
  { id: 'b2-07-gt5', topic: GT, prompt: 'The builder thinks he can ___ breaking the rules.', options: ['get away from', 'get away with', 'get by'], answer: 1, tip: 'get away with = salirse con la suya. get away from = escaparse de un lugar.', tags: T_GT },
  {
    id: 'b2-07-gt6',
    topic: GT,
    kind: 'listen',
    audio: 'This winter was really hard for the shops, but we got through it together. Now the street is full again.',
    voice: 'female',
    prompt: 'What does the speaker say about the winter?',
    options: ['They left the town.', 'They survived a difficult time.', 'They had no problems.'],
    answer: 1,
    tip: 'get through = pasar por algo difícil y salir de ello.',
    tags: T_GT,
  },
]
