import type { Question } from '../game/types'

/**
 * B1-07 · The Underworld (recuerdo 7). Bloque A (el cuarto alquilado de L, data/b1Room.ts):
 *  - Práctica de la lección de la tele (tarea b1-07-news, tema passive-news): tag b1-07-practice, lista fija.
 * Regla: en las preguntas de elegir solo UNA opción es correcta (la primera).
 */
const PN = 'passive-news' as const
const PRACTICE = ['b1-07-practice']

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
]
