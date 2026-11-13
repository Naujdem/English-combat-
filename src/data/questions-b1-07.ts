import type { Question } from '../game/types'

/**
 * B1-07 · The Underworld (recuerdo 7). Bloque A (el cuarto alquilado de L, data/b1Room.ts):
 *  - Práctica de la lección de la tele (tarea b1-07-news, tema passive-news): tag b1-07-practice, lista fija.
 * Regla: en las preguntas de elegir solo UNA opción es correcta (la primera).
 */
const PN = 'passive-news' as const
const PRACTICE = ['b1-07-practice']
/** Bloque B: Cuaderno de L, página 15 (tema deduction) y página 16 (tema deduction-past) */
const DE = 'deduction' as const
const PRACTICE2 = ['b1-07-practice2']
const DP = 'deduction-past' as const
const PRACTICE3 = ['b1-07-practice3']
/** Bloque C: práctica del informante (tema existente relative-clauses) y banco del guardia (b1-07-guard) */
const RC = 'relative-clauses' as const
const PRACTICE4 = ['b1-07-practice4']
const GUARD = ['b1-07-guard']
const PN2 = 'passive-news' as const
/** Bloque D: The Broker, fase 1 (deducción) y fase 2 (pasiva) */
const BOSS_D = ['b1-07-boss', 'b1-07-boss-d']
const BOSS_P = ['b1-07-boss', 'b1-07-boss-p']

/** Práctica del informante, en orden */
export const B1_07_PRACTICE4_IDS = ['b1-07-r1', 'b1-07-r2', 'b1-07-r3', 'b1-07-r4', 'b1-07-r5', 'b1-07-r6', 'b1-07-r7', 'b1-07-r8']

/** Práctica de la página 15, en orden */
export const B1_07_PRACTICE2_IDS = ['b1-07-m1', 'b1-07-m2', 'b1-07-m3', 'b1-07-m4', 'b1-07-m5', 'b1-07-m6', 'b1-07-m7', 'b1-07-m8']
/** Práctica de la página 16, en orden */
export const B1_07_PRACTICE3_IDS = ['b1-07-p1', 'b1-07-p2', 'b1-07-p3', 'b1-07-p4', 'b1-07-p5', 'b1-07-p6', 'b1-07-p7', 'b1-07-p8']

/** Práctica de la lección de la tele, en orden */
export const B1_07_PRACTICE_IDS = ['b1-07-n1', 'b1-07-n2', 'b1-07-n3', 'b1-07-n4', 'b1-07-n5', 'b1-07-n6', 'b1-07-n7', 'b1-07-n8']

export const B1_07_QUESTIONS: Question[] = [
  { id: 'b1-07-n1', topic: PN, kind: 'fix', prompt: 'The device was develop by scientists.', options: ['The device was developed by scientists.', 'The device was developing by scientists.', 'The device did developed by scientists.'], answer: 0, tip: 'Pasiva: be + participio.', tags: PRACTICE },
  { id: 'b1-07-n2', topic: PN, kind: 'fix', prompt: 'A new medicine has developed by doctors.', options: ['A new medicine has been develop by doctors.', 'A new medicine has been developed by doctors.', 'A new medicine have been developed by doctors.'], answer: 1, tip: 'Presente perfecto pasivo: has been + participio.', tags: PRACTICE },
  { id: 'b1-07-n3', topic: PN, prompt: 'The temple writings ___ found in 2060.', options: ['was', 'have', 'were'], answer: 2, tip: 'Plural en pasado: were found.', tags: PRACTICE },
  { id: 'b1-07-n4', topic: PN, prompt: 'The house ___ built a hundred years ago.', options: ['has been', 'was', 'is'], answer: 1, tip: 'Hace cien años: pasado, was built.', tags: PRACTICE },
  { id: 'b1-07-n5', topic: PN, kind: 'order', prompt: 'El aparato fue diseñado por científicos.', options: ['The', 'device', 'was', 'designed', 'by', 'scientists.'], answer: 0, tip: 'was + participio + by.', tags: PRACTICE },
  { id: 'b1-07-n6', topic: PN, prompt: 'English ___ spoken in many countries.', options: ['is', 'does', 'has'], answer: 0, tip: 'Pasiva en presente: is spoken.', tags: PRACTICE },
  { id: 'b1-07-n7', topic: PN, prompt: 'Scientists ___ the device last year.', options: ['were developed', 'have been developed', 'developed'], answer: 2, tip: 'Los científicos hacen la acción: voz activa.', tags: PRACTICE },
  {
    id: 'b1-07-n8',
    topic: PN,
    kind: 'listen',
    audio: 'A new machine has been invented by scientists. It was tested last month. It can help people who have lost their voice.',
    voice: 'female',
    prompt: 'When was the machine tested?',
    options: ['Last month.', 'Yesterday.', 'A year ago.'],
    answer: 0,
    tip: 'It was tested last month.',
    tags: PRACTICE,
  },
  // Bloque B · página 15: deducción en el presente
  { id: 'b1-07-m1', topic: DE, kind: 'fix', prompt: 'It must to be expensive.', options: ['It must is expensive.', 'It must be expensive.', 'It musts be expensive.'], answer: 1, tip: 'must + verbo base, sin to.', tags: PRACTICE2 },
  { id: 'b1-07-m2', topic: DE, kind: 'fix', prompt: "It mustn't be free. It's too good.", options: ["It doesn't must be free. It's too good.", "It no can be free. It's too good.", "It can't be free. It's too good."], answer: 2, tip: "Para deducir que es imposible: can't be.", tags: PRACTICE2 },
  { id: 'b1-07-m3', topic: DE, prompt: 'He has a big house and three cars. He ___ be rich.', options: ["can't", 'must', "mustn't"], answer: 1, tip: 'Casi seguro: must be.', tags: PRACTICE2 },
  { id: 'b1-07-m4', topic: DE, prompt: 'She is five years old. She ___ be a doctor.', options: ["can't", 'must', 'might'], answer: 0, tip: "Imposible: can't be.", tags: PRACTICE2 },
  { id: 'b1-07-m5', topic: DE, prompt: "I'm not sure. It ___ be in the city, or maybe not.", options: ['must', "can't", 'might'], answer: 2, tip: 'No estoy seguro: might be.', tags: PRACTICE2 },
  { id: 'b1-07-m6', topic: DE, kind: 'order', prompt: 'No puede ser gratis.', options: ['It', "can't", 'be', 'free.'], answer: 0, tip: "can't be = es imposible.", tags: PRACTICE2 },
  { id: 'b1-07-m7', topic: DE, prompt: 'The lights are on, so somebody ___ be at home.', options: ['must', "can't", "mustn't"], answer: 0, tip: 'Hay una prueba: must be.', tags: PRACTICE2 },
  {
    id: 'b1-07-m8',
    topic: DE,
    kind: 'listen',
    audio: "The man is wearing a thick coat and a hat. It must be very cold outside. His phone is old, so he can't be rich. And he might be lost.",
    voice: 'male',
    prompt: 'What does the speaker think must be true?',
    options: ['The man is rich.', 'It is very cold outside.', 'The man is at home.'],
    answer: 1,
    tip: 'It must be very cold outside.',
    tags: PRACTICE2,
  },
  // Bloque B · página 16: deducción en el pasado
  { id: 'b1-07-p1', topic: DP, kind: 'fix', prompt: 'It must be stole.', options: ['It must have stole.', 'It must been stolen.', 'It must have been stolen.'], answer: 2, tip: 'must have been + participio.', tags: PRACTICE3 },
  { id: 'b1-07-p2', topic: DP, kind: 'fix', prompt: "He can't has known the truth.", options: ["He can't has know the truth.", "He can't have known the truth.", 'He not can have known the truth.'], answer: 1, tip: "can't have + participio.", tags: PRACTICE3 },
  { id: 'b1-07-p3', topic: DP, prompt: 'The window is broken. Somebody ___ broken it.', options: ['must have', 'must has', 'must be'], answer: 0, tip: 'Prueba en el pasado: must have + participio.', tags: PRACTICE3 },
  { id: 'b1-07-p4', topic: DP, prompt: 'He was in another city yesterday, so he ___ have seen it.', options: ['must', "mustn't", "can't"], answer: 2, tip: "Imposible: can't have.", tags: PRACTICE3 },
  { id: 'b1-07-p5', topic: DP, prompt: "I'm not sure. She ___ have taken the keys. I don't know.", options: ['might', 'must', "can't"], answer: 0, tip: 'No estoy seguro: might have.', tags: PRACTICE3 },
  { id: 'b1-07-p6', topic: DP, kind: 'order', prompt: 'Debe de haber sido un ladrón.', options: ['It', 'must', 'have', 'been', 'a', 'thief.'], answer: 0, tip: 'must have been.', tags: PRACTICE3 },
  { id: 'b1-07-p7', topic: DP, prompt: 'The ground is wet. It ___ rained last night.', options: ['must', 'must have', 'must be'], answer: 1, tip: 'Prueba de algo pasado: must have + participio.', tags: PRACTICE3 },
  {
    id: 'b1-07-p8',
    topic: DP,
    kind: 'listen',
    audio: 'The door is open and the box is empty. Somebody must have taken the device. It can\'t have been a scientist, because they have no key. It might have been a thief.',
    voice: 'female',
    prompt: "Why can't it have been a scientist?",
    options: ['Because they were asleep.', 'Because they knew nothing.', 'Because they have no key.'],
    answer: 2,
    tip: "It can't have been a scientist, because they have no key.",
    tags: PRACTICE3,
  },
  // Bloque C · el informante: relativos para dar más información
  { id: 'b1-07-r1', topic: RC, kind: 'fix', prompt: 'Mr. Vega, that sells old tech, is in the back room.', options: ['Mr. Vega, which sells old tech, is in the back room.', 'Mr. Vega, who sells old tech, is in the back room.', 'Mr. Vega, whose sells old tech, is in the back room.'], answer: 1, tip: 'Con comas y personas: who.', tags: PRACTICE4 },
  { id: 'b1-07-r2', topic: RC, kind: 'fix', prompt: 'The market where I bought it there is dark.', options: ['The market where I bought it is dark.', 'The market where I bought it in is dark there.', 'The market that I bought it is dark.'], answer: 0, tip: 'where ya indica el lugar: no repitas there.', tags: PRACTICE4 },
  { id: 'b1-07-r3', topic: RC, prompt: 'The guard ___ never sleeps is at the door.', options: ['whose', 'where', 'who'], answer: 2, tip: 'Personas: who.', tags: PRACTICE4 },
  { id: 'b1-07-r4', topic: RC, prompt: 'The man ___ shop is in the back room is Mr. Vega.', options: ['whose', 'who', 'which'], answer: 0, tip: 'Posesión: whose.', tags: PRACTICE4 },
  { id: 'b1-07-r5', topic: RC, prompt: 'The box ___ he keeps under the desk is empty.', options: ['who', 'that', 'whose'], answer: 1, tip: 'Cosas: that.', tags: PRACTICE4 },
  { id: 'b1-07-r6', topic: RC, prompt: 'The black market is a place ___ you can buy anything.', options: ['who', 'whose', 'where'], answer: 2, tip: 'Lugares: where.', tags: PRACTICE4 },
  { id: 'b1-07-r7', topic: RC, kind: 'order', prompt: 'El guardia, que nunca duerme, vigila la puerta.', options: ['The', 'guard,', 'who', 'never', 'sleeps,', 'watches', 'the', 'door.'], answer: 0, tip: 'El dato extra va entre comas.', tags: PRACTICE4 },
  {
    id: 'b1-07-r8',
    topic: RC,
    kind: 'listen',
    audio: 'The man who sells old tech is Mr. Vega. His assistant, who never sleeps, is called Dax. The back room, where he keeps everything, is behind the red door.',
    voice: 'male',
    prompt: 'Where does Mr. Vega keep everything?',
    options: ['In the street.', 'In the back room, behind the red door.', 'At home.'],
    answer: 1,
    tip: 'The back room, where he keeps everything, is behind the red door.',
    tags: PRACTICE4,
  },
  // Bloque C · banco del guardia (b1-07-guard)
  { id: 'b1-07-g1', topic: DP, kind: 'fix', prompt: 'The box must have been steal.', options: ['The box must have been stolen.', 'The box must have been stole.', 'The box must been stolen.'], answer: 0, tip: 'must have been + participio.', tags: GUARD },
  { id: 'b1-07-g2', topic: DP, kind: 'fix', prompt: "She can't has seen us.", options: ["She can't has saw us.", "She can't have see us.", "She can't have seen us."], answer: 2, tip: "can't have + participio.", tags: GUARD },
  { id: 'b1-07-g3', topic: DE, prompt: 'The man is twenty years old. He ___ be my grandfather.', options: ["can't", 'must', 'might'], answer: 0, tip: "Imposible: can't be.", tags: GUARD },
  { id: 'b1-07-g4', topic: DE, prompt: "I'm not sure, but the door ___ be open. Let's try.", options: ['must', 'might', "can't"], answer: 1, tip: 'No estoy seguro: might be.', tags: GUARD },
  { id: 'b1-07-g5', topic: DP, prompt: 'The floor is wet and there are footprints. Somebody ___ have walked here.', options: ["can't", "mustn't", 'must'], answer: 2, tip: 'Hay una prueba: must have.', tags: GUARD },
  { id: 'b1-07-g6', topic: PN2, kind: 'fix', prompt: 'The device was steal last night.', options: ['The device was stole last night.', 'The device was stolen last night.', 'The device stolen last night.'], answer: 1, tip: 'Pasiva: was + participio.', tags: GUARD },
  { id: 'b1-07-g7', topic: DP, kind: 'order', prompt: 'Ella no puede haberlo sabido.', options: ['She', "can't", 'have', 'known.'], answer: 0, tip: "can't have + participio.", tags: GUARD },
  {
    id: 'b1-07-g8',
    topic: DP,
    kind: 'listen',
    audio: "The guard says: the box must have been moved. It can't have been the boss, because he was away. It might have been the assistant.",
    voice: 'male',
    prompt: 'Who might have moved the box?',
    options: ['The assistant.', 'The boss.', 'A scientist.'],
    answer: 0,
    tip: 'It might have been the assistant.',
    tags: GUARD,
  },
  // Bloque D · The Broker, fase 1: deducción
  { id: 'b1-07-bd1', topic: DP, kind: 'fix', prompt: 'The vendor must be hide it here.', options: ['The vendor must have hide it here.', 'The vendor must hid it here.', 'The vendor must have hidden it here.'], answer: 2, tip: 'must have + participio.', tags: BOSS_D },
  { id: 'b1-07-bd2', topic: DE, kind: 'fix', prompt: "She mustn't be a thief. She is a teacher.", options: ["She can't be a thief. She is a teacher.", "She doesn't must be a thief. She is a teacher.", 'She no can be a thief. She is a teacher.'], answer: 0, tip: "Imposible: can't be.", tags: BOSS_D },
  { id: 'b1-07-bd3', topic: DE, prompt: 'His coat is not here. He ___ be outside.', options: ["can't", 'must', "mustn't"], answer: 1, tip: 'Prueba clara: must be.', tags: BOSS_D },
  { id: 'b1-07-bd4', topic: DP, prompt: 'The window is closed and locked from inside. He ___ have come in through it.', options: ['must', 'might', "can't"], answer: 2, tip: "Imposible en el pasado: can't have.", tags: BOSS_D },
  { id: 'b1-07-bd5', topic: DE, prompt: "I don't know where it is. It ___ be anywhere.", options: ['must', 'could', "can't"], answer: 1, tip: 'No sé: could / might be.', tags: BOSS_D },
  { id: 'b1-07-bd6', topic: DE, kind: 'order', prompt: 'Debe de estar detrás del estante.', options: ['It', 'must', 'be', 'behind', 'the', 'shelf.'], answer: 0, tip: 'must be.', tags: BOSS_D },
  {
    id: 'b1-07-bd7',
    topic: DE,
    kind: 'listen',
    audio: "Mr. Vega's key is not on the table. He must have taken it with him. He can't be far, because his coat is here. He might be in the front room.",
    voice: 'male',
    prompt: 'Where might Mr. Vega be?',
    options: ['In the front room.', 'In another city.', 'In the street.'],
    answer: 0,
    tip: 'He might be in the front room.',
    tags: BOSS_D,
  },
  // Bloque D · The Broker, fase 2: pasiva
  { id: 'b1-07-bp1', topic: PN2, kind: 'fix', prompt: 'The device was sell in the black market.', options: ['The device was selled in the black market.', 'The device sold in the black market.', 'The device was sold in the black market.'], answer: 2, tip: 'Pasiva: was + participio (sell → sold).', tags: BOSS_P },
  { id: 'b1-07-bp2', topic: PN2, kind: 'fix', prompt: 'Many devices have been steal this year.', options: ['Many devices have been stolen this year.', 'Many devices have stolen this year.', 'Many devices has been stolen this year.'], answer: 0, tip: 'have been + participio.', tags: BOSS_P },
  { id: 'b1-07-bp3', topic: PN2, prompt: 'The market ___ closed by the police last night.', options: ['has been', 'was', 'is'], answer: 1, tip: 'Anoche: pasado, was closed.', tags: BOSS_P },
  { id: 'b1-07-bp4', topic: PN2, prompt: 'These tools ___ used by scientists every day.', options: ['is', 'was', 'are'], answer: 2, tip: 'Plural en presente: are used.', tags: BOSS_P },
  { id: 'b1-07-bp5', topic: PN2, prompt: 'My letters ___ never answered.', options: ['was', 'were', 'have'], answer: 1, tip: 'Plural en pasado: were answered.', tags: BOSS_P },
  { id: 'b1-07-bp6', topic: PN2, kind: 'order', prompt: 'El aparato fue robado anoche.', options: ['The', 'device', 'was', 'stolen', 'last', 'night.'], answer: 0, tip: 'was + participio.', tags: BOSS_P },
  {
    id: 'b1-07-bp7',
    topic: PN2,
    kind: 'listen',
    audio: 'The black market has been closed twice this year. The first time, it was closed by the police. The second time, it was closed by the weather.',
    voice: 'female',
    prompt: 'Why was the market closed the second time?',
    options: ['Because of the weather.', 'Because of the police.', 'Because of a fire.'],
    answer: 0,
    tip: 'It was closed by the weather.',
    tags: BOSS_P,
  },
]
