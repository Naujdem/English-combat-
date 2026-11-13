import type { Question } from '../game/types'

/**
 * B1-09 · Temples of Stones and Time (recuerdo 9). Bloque A (el valle, data/b1Valley.ts):
 *  - Práctica del cuaderno de L, página 31 (tarea b1-09-journey, tema travel-b1): b1-09-j1…j8.
 *  - Práctica de la guía local (tarea b1-09-culture, tema culture-talk): b1-09-c1…c4.
 * La posición de la respuesta correcta varía a propósito.
 */
const TR = 'travel-b1' as const
const CU = 'culture-talk' as const
const PA = 'passive-all' as const
const GUARDIAN = ['b1-09-guardian']
const PM = 'passive-modals' as const
const TIME = ['b1-09-time']
/** Bloque D: el jefe Keeper of Hours (data/b1TempleTime.ts). Fase 1 la pasiva en todas sus formas · fase 2 con modales */
const BOSS_A = ['b1-09-boss', 'b1-09-boss-a']
const BOSS_M = ['b1-09-boss', 'b1-09-boss-m']
const JOURNEY = ['b1-09-journey']
const CULTURE = ['b1-09-culture']

export const B1_09_JOURNEY_IDS = ['b1-09-j1', 'b1-09-j2', 'b1-09-j3', 'b1-09-j4', 'b1-09-j5', 'b1-09-j6', 'b1-09-j7', 'b1-09-j8']
export const B1_09_TIME_IDS = ['b1-09-m1', 'b1-09-m2', 'b1-09-m3', 'b1-09-m4', 'b1-09-m5', 'b1-09-m6', 'b1-09-m7', 'b1-09-m8']
export const B1_09_CULTURE_IDS = ['b1-09-c1', 'b1-09-c2', 'b1-09-c3', 'b1-09-c4']

export const B1_09_QUESTIONS: Question[] = [
  // Bloque A · página 31: el viaje de L
  { id: 'b1-09-j1', topic: TR, kind: 'fix', prompt: "I didn't slept much on the bus.", options: ['I not slept much on the bus.', "I didn't sleeping much on the bus.", "I didn't sleep much on the bus."], answer: 2, tip: 'Negativa: didn\'t + verbo base.', tags: JOURNEY },
  { id: 'b1-09-j2', topic: TR, kind: 'fix', prompt: 'We goed to the valley last week.', options: ['We went to the valley last week.', 'We gone to the valley last week.', 'We did went to the valley last week.'], answer: 0, tip: 'go es irregular: went.', tags: JOURNEY },
  { id: 'b1-09-j3', topic: TR, kind: 'fix', prompt: 'I made a long travel to get here.', options: ['I made a long travelling to get here.', 'I made a long journey to get here.', 'I made a long journeys to get here.'], answer: 1, tip: 'travel no se cuenta: a long journey.', tags: JOURNEY },
  { id: 'b1-09-j4', topic: TR, prompt: 'The mountain view was ___. I took fifty photos.', options: ['exhausting', 'overcrowded', 'breathtaking'], answer: 2, tip: 'Muy bonito: breathtaking.', tags: JOURNEY },
  { id: 'b1-09-j5', topic: TR, prompt: 'The bus was ___. There were no seats, and people stood for hours.', options: ['overcrowded', 'breathtaking', 'peaceful'], answer: 0, tip: 'Sin asientos y llena de gente: overcrowded.', tags: JOURNEY },
  { id: 'b1-09-j6', topic: TR, kind: 'order', prompt: '¿Viste la cascada ayer?', options: ['Did', 'you', 'see', 'the', 'waterfall', 'yesterday?'], answer: 0, tip: 'Did + sujeto + verbo base.', tags: JOURNEY },
  { id: 'b1-09-j7', topic: TR, prompt: 'After nine days on the road, I was ___.', options: ['exhausting', 'exhausted', 'exhaust'], answer: 1, tip: '-ed = cómo te sientes.', tags: JOURNEY },
  {
    id: 'b1-09-j8',
    topic: TR,
    kind: 'listen',
    audio: "Last year I took a trip to the jungle. The journey was long and exhausting, but the waterfall was breathtaking. I didn't sleep for two nights, but it was unforgettable.",
    voice: 'male',
    prompt: 'What was the waterfall like?',
    options: ['Overcrowded.', 'Exhausting.', 'Breathtaking.'],
    answer: 2,
    tip: 'The waterfall was breathtaking.',
    tags: JOURNEY,
  },
  // Bloque A · la guía local: hablar con respeto de otra cultura
  { id: 'b1-09-c1', topic: CU, prompt: 'Could you ___ me more about this tradition?', options: ['say', 'tell', 'speak'], answer: 1, tip: 'tell me more.', tags: CULTURE },
  { id: 'b1-09-c2', topic: CU, prompt: 'Is it OK ___ I take a photo?', options: ['that', 'what', 'if'], answer: 2, tip: 'Is it OK if…?', tags: CULTURE },
  { id: 'b1-09-c3', topic: CU, kind: 'fix', prompt: 'Could you to explain this custom?', options: ['Could you explain this custom?', 'Could you explaining this custom?', 'Could you explains this custom?'], answer: 0, tip: 'Could you + verbo base.', tags: CULTURE },
  { id: 'b1-09-c4', topic: CU, kind: 'fix', prompt: 'Could you tell me why do you do that?', options: ['Could you tell me why does you do that?', 'Could you tell me why you do that?', 'Could you tell me why you doing that?'], answer: 1, tip: 'En una pregunta indirecta el orden es normal: why you do that.', tags: CULTURE },
  // Bloque B · el minijefe Stone Guardian (data/b1TempleStones.ts): la pasiva en todas sus formas
  { id: 'b1-09-g1', topic: PA, kind: 'fix', prompt: 'The temple was build a long time ago.', options: ['The temple was builded a long time ago.', 'The temple was built a long time ago.', 'The temple built was a long time ago.'], answer: 1, tip: 'build → built.', tags: GUARDIAN },
  { id: 'b1-09-g2', topic: PA, kind: 'fix', prompt: 'The stones is carved by hand.', options: ['The stones are carved by hand.', 'The stones be carved by hand.', 'The stones carved by hand are.'], answer: 0, tip: 'Plural: are + participio.', tags: GUARDIAN },
  { id: 'b1-09-g3', topic: PA, kind: 'fix', prompt: 'The door has opened by the guardian.', options: ['The door have been opened by the guardian.', 'The door has be opened by the guardian.', 'The door has been opened by the guardian.'], answer: 2, tip: 'Presente perfecto pasivo: has been + participio.', tags: GUARDIAN },
  { id: 'b1-09-g4', topic: PA, prompt: 'The words ___ written on the wall a thousand years ago.', options: ['was', 'were', 'are'], answer: 1, tip: 'Plural en pasado: were written.', tags: GUARDIAN },
  { id: 'b1-09-g5', topic: PA, prompt: 'Today, the temple ___ guarded by a stone statue.', options: ['has', 'are', 'is'], answer: 2, tip: 'Presente: is guarded.', tags: GUARDIAN },
  { id: 'b1-09-g6', topic: PA, prompt: 'The key ___ found yesterday.', options: ['is', 'was', 'has been'], answer: 1, tip: 'Yesterday: pasado, was found.', tags: GUARDIAN },
  { id: 'b1-09-g7', topic: PA, prompt: 'The door ___ opened by the right words soon.', options: ['will be', 'will', 'is'], answer: 0, tip: 'Futuro pasivo: will be + participio.', tags: GUARDIAN },
  { id: 'b1-09-g8', topic: PA, kind: 'order', prompt: 'El aparato fue hecho con estas palabras.', options: ['The', 'device', 'was', 'made', 'with', 'these', 'words.'], answer: 0, tip: 'was + participio + with.', tags: GUARDIAN },
  { id: 'b1-09-g9', topic: PA, kind: 'fix', prompt: 'The device will built by scientists.', options: ['The device will being built by scientists.', 'The device will be built by scientists.', 'The device will been built by scientists.'], answer: 1, tip: 'will be + participio.', tags: GUARDIAN },
  {
    id: 'b1-09-g10',
    topic: PA,
    kind: 'listen',
    audio: 'The temple was built a thousand years ago. It is guarded by a stone statue. The door has been closed for centuries, but it will be opened by the right words.',
    voice: 'female',
    prompt: 'What will open the door?',
    options: ['A gold key.', 'Force.', 'The right words.'],
    answer: 2,
    tip: 'It will be opened by the right words.',
    tags: GUARDIAN,
  },
  // Bloque C · las inscripciones del reloj (data/b1TempleTime.ts): la pasiva con modales
  { id: 'b1-09-m1', topic: PM, kind: 'fix', prompt: 'The clock must keep in the dark.', options: ['The clock must is kept in the dark.', 'The clock must be kept in the dark.', 'The clock must been kept in the dark.'], answer: 1, tip: 'must be + participio.', tags: TIME },
  { id: 'b1-09-m2', topic: PM, kind: 'fix', prompt: "The door can't opened by force.", options: ["The door can't be open by force.", "The door can't being opened by force.", "The door can't be opened by force."], answer: 2, tip: "can't be + participio.", tags: TIME },
  { id: 'b1-09-m3', topic: PM, kind: 'fix', prompt: 'The key should kept in a safe place.', options: ['The key should be kept in a safe place.', 'The key should been kept in a safe place.', 'The key should is kept in a safe place.'], answer: 0, tip: 'should be + participio.', tags: TIME },
  { id: 'b1-09-m4', topic: PM, prompt: "The rules ___ be followed. It's obligatory.", options: ['can', 'must', 'might'], answer: 1, tip: 'Obligatorio: must be.', tags: TIME },
  { id: 'b1-09-m5', topic: PM, prompt: "The ruins ___ be visited at night. It's forbidden.", options: ['can', 'should', "mustn't"], answer: 2, tip: "Prohibido: mustn't be.", tags: TIME },
  { id: 'b1-09-m6', topic: PM, kind: 'order', prompt: 'La puerta no puede ser abierta con fuerza.', options: ['The', 'door', "can't", 'be', 'opened', 'by', 'force.'], answer: 0, tip: "can't be + participio.", tags: TIME },
  { id: 'b1-09-m7', topic: PM, prompt: 'The clock ___ been made by the ancient people. Look at the glyphs.', options: ['must have', 'must', 'can'], answer: 0, tip: 'Deducción en el pasado: must have been.', tags: TIME },
  {
    id: 'b1-09-m8',
    topic: PM,
    kind: 'listen',
    audio: "The clock must be kept in the dark. It can't be opened by force. The hands should be turned slowly, and the lid mustn't be touched.",
    voice: 'male',
    prompt: "What mustn't be touched?",
    options: ['The hands.', 'The lid.', 'The glyphs.'],
    answer: 1,
    tip: "The lid mustn't be touched.",
    tags: TIME,
  },
  // Bloque D · jefe Keeper of Hours, fase 1: la pasiva en todas sus formas
  { id: 'b1-09-bf1', topic: PA, kind: 'fix', prompt: 'The clock was keep here for years.', options: ['The clock was keeped here for years.', 'The clock was kept here for years.', 'The clock kept was here for years.'], answer: 1, tip: 'keep → kept.', tags: BOSS_A },
  { id: 'b1-09-bf2', topic: PA, kind: 'fix', prompt: 'The glyphs are wrote by hand.', options: ['The glyphs is written by hand.', 'The glyphs written are by hand.', 'The glyphs are written by hand.'], answer: 2, tip: 'write → written; plural: are.', tags: BOSS_A },
  { id: 'b1-09-bf3', topic: PA, kind: 'fix', prompt: 'The gears have turned by the water for years.', options: ['The gears have been turned by the water for years.', 'The gears have be turned by the water for years.', 'The gears has been turned by the water for years.'], answer: 0, tip: 'have been + participio.', tags: BOSS_A },
  { id: 'b1-09-bf4', topic: PA, prompt: 'The temple ___ visited by many people last year.', options: ['is', 'was', 'has been'], answer: 1, tip: 'Last year: pasado, was visited.', tags: BOSS_A },
  { id: 'b1-09-bf5', topic: PA, prompt: 'At this moment, the clock ___ guarded by the Keeper.', options: ['was', 'will be', 'is'], answer: 2, tip: 'Ahora: is guarded.', tags: BOSS_A },
  { id: 'b1-09-bf6', topic: PA, kind: 'order', prompt: 'El reloj será abierto por las palabras correctas.', options: ['The', 'clock', 'will', 'be', 'opened', 'by', 'the', 'right', 'words.'], answer: 0, tip: 'will be + participio.', tags: BOSS_A },
  {
    id: 'b1-09-bf7',
    topic: PA,
    kind: 'listen',
    audio: 'The temple was built by the ancient people. The clock was made with special stones. It has been kept in the dark for centuries, and it will be found by the right person.',
    voice: 'female',
    prompt: 'What was the clock made with?',
    options: ['Special stones.', 'Gold.', 'Wood.'],
    answer: 0,
    tip: 'The clock was made with special stones.',
    tags: BOSS_A,
  },
  // Bloque D · jefe Keeper of Hours, fase 2: la pasiva con modales
  { id: 'b1-09-bm1', topic: PM, kind: 'fix', prompt: 'The clock must kept in the dark.', options: ['The clock must is kept in the dark.', 'The clock must been kept in the dark.', 'The clock must be kept in the dark.'], answer: 2, tip: 'must be + participio.', tags: BOSS_M },
  { id: 'b1-09-bm2', topic: PM, kind: 'fix', prompt: "It can't opened by anybody.", options: ["It can't be opened by anybody.", "It can't being opened by anybody.", "It can't been opened by anybody."], answer: 0, tip: "can't be + participio.", tags: BOSS_M },
  { id: 'b1-09-bm3', topic: PM, kind: 'fix', prompt: 'The hands should turned slowly.', options: ['The hands should been turned slowly.', 'The hands should be turned slowly.', 'The hands should is turned slowly.'], answer: 1, tip: 'should be + participio.', tags: BOSS_M },
  { id: 'b1-09-bm4', topic: PM, prompt: "The glass ___ be touched. It's forbidden.", options: ['must', 'can', "mustn't"], answer: 2, tip: "Prohibido: mustn't be.", tags: BOSS_M },
  { id: 'b1-09-bm5', topic: PM, prompt: 'The clock ___ be broken by water. Be careful.', options: ['must', 'could', 'should'], answer: 1, tip: 'Posibilidad: could be + participio.', tags: BOSS_M },
  { id: 'b1-09-bm6', topic: PM, kind: 'order', prompt: 'No puede ser abierto con fuerza.', options: ['It', "can't", 'be', 'opened', 'by', 'force.'], answer: 0, tip: "can't be + participio.", tags: BOSS_M },
  {
    id: 'b1-09-bm7',
    topic: PM,
    kind: 'listen',
    audio: "The Keeper says: the clock must be used carefully. It can't be given to strangers. And it should be kept close to you.",
    voice: 'male',
    prompt: 'Where should the clock be kept?',
    options: ['In the temple.', 'In the water.', 'Close to you.'],
    answer: 2,
    tip: 'It should be kept close to you.',
    tags: BOSS_M,
  },
]
