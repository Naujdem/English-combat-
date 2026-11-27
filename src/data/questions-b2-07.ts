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

const RAISER = ['b2-07-raiser']
const BOSS_CH = ['b2-07-boss-change']
const BOSS_IF = ['b2-07-boss-if']

/** Bloque 2 · combate: Rent Raisers (b2-07-raiser) y The Developer (fase 1: b2-07-boss-change · fase 2: b2-07-boss-if) */
export const B2_07_COMBAT_QUESTIONS: Question[] = [
  // Rent Raisers (esbirros): unless doble negativo, will después de as long as, comparativos dobles
  { id: 'b2-07-rr1', topic: IA, kind: 'fix', prompt: "Unless you don't pay, you'll lose the flat.", options: ["Unless you pay, you'll lose the flat.", "Unless you will pay, you'll lose the flat.", "Unless you paid, you'll lose the flat."], answer: 0, tip: 'unless ya es negativo: Unless you pay (= if you don\'t pay).', tags: RAISER },
  { id: 'b2-07-rr2', topic: IA, kind: 'fix', prompt: 'As long as you will sign today, the price stays the same.', options: ['As long as you signing today, the price stays the same.', 'As long as you sign today, the price stays the same.', 'As long you sign today, the price stays the same.'], answer: 1, tip: 'Después de as long as va presente: as long as you sign.', tags: RAISER },
  { id: 'b2-07-rr3', topic: CH, kind: 'fix', prompt: "It's getting more and more expensiver.", options: ["It's getting more expensive and expensive.", "It's getting expensiver and expensiver.", "It's getting more and more expensive."], answer: 2, tip: 'Adjetivo largo: more and more expensive (sin -er).', tags: RAISER },
  { id: 'b2-07-rr4', topic: CH, prompt: 'Prices are getting ___.', options: ['higher and higher', 'more and more high', 'high and higher'], answer: 0, tip: 'Adjetivo corto: higher and higher.', tags: RAISER },
  { id: 'b2-07-rr5', topic: IA, prompt: "Pay the deposit now, ___ someone else will take the flat.", options: ['unless', 'otherwise', 'as long as'], answer: 1, tip: 'otherwise = si no (si no pagas…).', tags: RAISER },
  { id: 'b2-07-rr6', topic: CH, prompt: 'The rent ___ three times since January.', options: ['went up', 'has gone up', 'is going up'], answer: 1, tip: 'Desde enero hasta hoy → present perfect: has gone up.', tags: RAISER },

  // The Developer, fase 1 (tiempos para hablar del cambio, the more… the more)
  { id: 'b2-07-dc1', topic: CH, kind: 'fix', prompt: 'Rents are rising since 2020.', options: ['Rents rise since 2020.', 'Rents have been rising since 2020.', 'Rents were rising since 2020.'], answer: 1, tip: 'Desde 2020 y sigue → have been rising.', tags: BOSS_CH },
  { id: 'b2-07-dc2', topic: CH, kind: 'fix', prompt: 'The more it is busy, the more I like it.', options: ['The busier it is, the more I like it.', 'The more busy it is, more I like it.', 'The busiest it is, the more I like it.'], answer: 0, tip: 'the + comparativo: the busier it is.', tags: BOSS_CH },
  { id: 'b2-07-dc3', topic: CH, prompt: 'The more flats he builds, ___ money he makes.', options: ['the most', 'more', 'the more'], answer: 2, tip: 'the more…, the more…', tags: BOSS_CH },
  { id: 'b2-07-dc4', topic: CH, prompt: 'There ___ be a bakery on this corner. Now it\'s a souvenir shop.', options: ['used to', 'use to', 'is used to'], answer: 0, tip: 'Antes había y ya no: there used to be.', tags: BOSS_CH },
  { id: 'b2-07-dc5', topic: CH, prompt: 'The old building is ___: the windows are broken and the walls are dirty.', options: ['renovated', 'run-down', 'crowded'], answer: 1, tip: 'run-down = viejo y en mal estado.', tags: BOSS_CH },
  { id: 'b2-07-dc6', topic: CH, kind: 'order', prompt: 'Cuantos más turistas vienen, más suben los arriendos.', options: ['The', 'more', 'tourists', 'come,', 'the', 'higher', 'the', 'rents', 'get.'], answer: 0, tip: 'the + comparativo…, the + comparativo…', tags: BOSS_CH },

  // The Developer, fase 2 (alternativas a if, phrasal verbs con get; la reunión en escucha)
  { id: 'b2-07-di1', topic: IA, kind: 'fix', prompt: 'Provided that it will have exits, we agree.', options: ['Provided that it has exits, we agree.', 'Provided that it having exits, we agree.', 'Provided it will has exits, we agree.'], answer: 0, tip: 'provided + presente: it has.', tags: BOSS_IF },
  { id: 'b2-07-di2', topic: GT, kind: 'fix', prompt: "You won't get away from it.", options: ["You won't get over it.", "You won't get away with it.", "You won't get by it."], answer: 1, tip: 'Hacer algo malo sin castigo: get away with.', tags: BOSS_IF },
  { id: 'b2-07-di3', topic: GT, prompt: 'Rosa has always ___ well with her neighbours.', options: ['got along', 'got by', 'got over'], answer: 0, tip: 'get along (well) with = llevarse bien con.', tags: BOSS_IF },
  { id: 'b2-07-di4', topic: IA, prompt: "We won't sign ___ you promise to keep the building public.", options: ['otherwise', 'unless', 'suppose'], answer: 1, tip: 'unless = if… not: no firmamos si no lo prometes.', tags: BOSS_IF },
  {
    id: 'b2-07-di5',
    topic: IA,
    kind: 'listen',
    audio: "The council will consider the school, provided that the neighbours help with the repairs. Otherwise, the building will be sold.",
    voice: 'female',
    prompt: 'What will happen if the neighbours do not help?',
    options: ['The school will open anyway.', 'The building will be sold.', 'The council will pay for everything.'],
    answer: 1,
    tip: 'Otherwise (si no ayudan), the building will be sold.',
    tags: BOSS_IF,
  },
  {
    id: 'b2-07-di6',
    topic: GT,
    kind: 'listen',
    audio: "When my shop closed, it took me a year to get over it. Now I get by with a small stall in the market.",
    voice: 'male',
    prompt: 'How is the speaker now?',
    options: ['He still cannot accept it.', 'He has a big new shop.', 'He manages with a small stall.'],
    answer: 2,
    tip: 'get by = arreglárselas: I get by with a small stall.',
    tags: BOSS_IF,
  },
]
