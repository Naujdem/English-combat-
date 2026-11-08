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

/** Práctica de la página 15, en orden */
export const B1_07_PRACTICE2_IDS = ['b1-07-m1', 'b1-07-m2', 'b1-07-m3', 'b1-07-m4', 'b1-07-m5', 'b1-07-m6', 'b1-07-m7', 'b1-07-m8']
/** Práctica de la página 16, en orden */
export const B1_07_PRACTICE3_IDS = ['b1-07-p1', 'b1-07-p2', 'b1-07-p3', 'b1-07-p4', 'b1-07-p5', 'b1-07-p6', 'b1-07-p7', 'b1-07-p8']

/** Práctica de la lección de la tele, en orden */
export const B1_07_PRACTICE_IDS = ['b1-07-n1', 'b1-07-n2', 'b1-07-n3', 'b1-07-n4', 'b1-07-n5', 'b1-07-n6', 'b1-07-n7', 'b1-07-n8']

export const B1_07_QUESTIONS: Question[] = [
  { id: 'b1-07-n1', topic: PN, kind: 'fix', prompt: 'The device was develop by scientists.', options: ['The device was developed by scientists.', 'The device was developing by scientists.', 'The device did developed by scientists.'], answer: 0, tip: 'Pasiva: be + participio.', tags: PRACTICE },
  { id: 'b1-07-n2', topic: PN, kind: 'fix', prompt: 'A new medicine has developed by doctors.', options: ['A new medicine has been developed by doctors.', 'A new medicine has been develop by doctors.', 'A new medicine have been developed by doctors.'], answer: 0, tip: 'Presente perfecto pasivo: has been + participio.', tags: PRACTICE },
  { id: 'b1-07-n3', topic: PN, prompt: 'The temple writings ___ found in 2060.', options: ['were', 'was', 'have'], answer: 0, tip: 'Plural en pasado: were found.', tags: PRACTICE },
  { id: 'b1-07-n4', topic: PN, prompt: 'The house ___ built a hundred years ago.', options: ['was', 'has been', 'is'], answer: 0, tip: 'Hace cien años: pasado, was built.', tags: PRACTICE },
  { id: 'b1-07-n5', topic: PN, kind: 'order', prompt: 'El aparato fue diseñado por científicos.', options: ['The', 'device', 'was', 'designed', 'by', 'scientists.'], answer: 0, tip: 'was + participio + by.', tags: PRACTICE },
  { id: 'b1-07-n6', topic: PN, prompt: 'English ___ spoken in many countries.', options: ['is', 'does', 'has'], answer: 0, tip: 'Pasiva en presente: is spoken.', tags: PRACTICE },
  { id: 'b1-07-n7', topic: PN, prompt: 'Scientists ___ the device last year.', options: ['developed', 'were developed', 'have been developed'], answer: 0, tip: 'Los científicos hacen la acción: voz activa.', tags: PRACTICE },
  {
    id: 'b1-07-n8',
    topic: PN,
    kind: 'listen',
    audio: 'A new machine has been invented by scientists. It was tested last month. It can help people who have lost their voice.',
    voice: 'female',
    prompt: '¿Cuándo fue probada?',
    options: ['El mes pasado.', 'Ayer.', 'Hace un año.'],
    answer: 0,
    tip: 'It was tested last month.',
    tags: PRACTICE,
  },
  // Bloque B · página 15: deducción en el presente
  { id: 'b1-07-m1', topic: DE, kind: 'fix', prompt: 'It must to be expensive.', options: ['It must be expensive.', 'It must is expensive.', 'It musts be expensive.'], answer: 0, tip: 'must + verbo base, sin to.', tags: PRACTICE2 },
  { id: 'b1-07-m2', topic: DE, kind: 'fix', prompt: "It mustn't be free. It's too good.", options: ["It can't be free. It's too good.", "It doesn't must be free. It's too good.", "It no can be free. It's too good."], answer: 0, tip: "Para deducir que es imposible: can't be.", tags: PRACTICE2 },
  { id: 'b1-07-m3', topic: DE, prompt: 'He has a big house and three cars. He ___ be rich.', options: ['must', "can't", "mustn't"], answer: 0, tip: 'Casi seguro: must be.', tags: PRACTICE2 },
  { id: 'b1-07-m4', topic: DE, prompt: 'She is five years old. She ___ be a doctor.', options: ["can't", 'must', 'might'], answer: 0, tip: "Imposible: can't be.", tags: PRACTICE2 },
  { id: 'b1-07-m5', topic: DE, prompt: "I'm not sure. It ___ be in the city, or maybe not.", options: ['might', 'must', "can't"], answer: 0, tip: 'No estoy seguro: might be.', tags: PRACTICE2 },
  { id: 'b1-07-m6', topic: DE, kind: 'order', prompt: 'No puede ser gratis.', options: ['It', "can't", 'be', 'free.'], answer: 0, tip: "can't be = es imposible.", tags: PRACTICE2 },
  { id: 'b1-07-m7', topic: DE, prompt: 'The lights are on, so somebody ___ be at home.', options: ['must', "can't", "mustn't"], answer: 0, tip: 'Hay una prueba: must be.', tags: PRACTICE2 },
  {
    id: 'b1-07-m8',
    topic: DE,
    kind: 'listen',
    audio: "The man is wearing a thick coat and a hat. It must be very cold outside. His phone is old, so he can't be rich. And he might be lost.",
    voice: 'male',
    prompt: '¿Qué dice que debe ser?',
    options: ['Que afuera hace mucho frío.', 'Que es rico.', 'Que está en casa.'],
    answer: 0,
    tip: 'It must be very cold outside.',
    tags: PRACTICE2,
  },
  // Bloque B · página 16: deducción en el pasado
  { id: 'b1-07-p1', topic: DP, kind: 'fix', prompt: 'It must be stole.', options: ['It must have been stolen.', 'It must have stole.', 'It must been stolen.'], answer: 0, tip: 'must have been + participio.', tags: PRACTICE3 },
  { id: 'b1-07-p2', topic: DP, kind: 'fix', prompt: "He can't has known the truth.", options: ["He can't have known the truth.", "He can't has know the truth.", 'He not can have known the truth.'], answer: 0, tip: "can't have + participio.", tags: PRACTICE3 },
  { id: 'b1-07-p3', topic: DP, prompt: 'The window is broken. Somebody ___ broken it.', options: ['must have', 'must has', 'must be'], answer: 0, tip: 'Prueba en el pasado: must have + participio.', tags: PRACTICE3 },
  { id: 'b1-07-p4', topic: DP, prompt: 'He was in another city yesterday, so he ___ have seen it.', options: ["can't", 'must', "mustn't"], answer: 0, tip: "Imposible: can't have.", tags: PRACTICE3 },
  { id: 'b1-07-p5', topic: DP, prompt: "I'm not sure. She ___ have taken the keys. I don't know.", options: ['might', 'must', "can't"], answer: 0, tip: 'No estoy seguro: might have.', tags: PRACTICE3 },
  { id: 'b1-07-p6', topic: DP, kind: 'order', prompt: 'Debe de haber sido un ladrón.', options: ['It', 'must', 'have', 'been', 'a', 'thief.'], answer: 0, tip: 'must have been.', tags: PRACTICE3 },
  { id: 'b1-07-p7', topic: DP, prompt: 'The ground is wet. It ___ rained last night.', options: ['must have', 'must', 'must be'], answer: 0, tip: 'Prueba de algo pasado: must have + participio.', tags: PRACTICE3 },
  {
    id: 'b1-07-p8',
    topic: DP,
    kind: 'listen',
    audio: 'The door is open and the box is empty. Somebody must have taken the device. It can\'t have been a scientist, because they have no key. It might have been a thief.',
    voice: 'female',
    prompt: '¿Por qué no fue un científico?',
    options: ['Porque no tienen llave.', 'Porque estaban dormidos.', 'Porque no sabían nada.'],
    answer: 0,
    tip: "It can't have been a scientist, because they have no key.",
    tags: PRACTICE3,
  },
]
