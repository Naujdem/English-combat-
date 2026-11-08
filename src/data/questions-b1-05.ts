import type { Question } from '../game/types'

/**
 * B1-05 · Nothing Left (recuerdo 5). Bloque A:
 *  - Práctica de la página 12 del Cuaderno de L (tarea b1-05-used-to, tema used-to): tag b1-05-practice, lista fija.
 *  - Anuncios de empleo (tarea b1-05-jobs, components/FinePrint.tsx en modo anuncios, tema jobs-b1): tag b1-05-ads.
 *    Son de lectura; en el banco de repaso llevan audio con el anuncio para que se puedan responder sin el papel.
 * Regla: en las preguntas de elegir solo UNA opción es correcta.
 */
const UT = 'used-to' as const
const PRACTICE = ['b1-05-practice']
const JOBS = 'jobs-b1' as const
const ADS = ['b1-05-ads']

/** Práctica de la página 12 del cuaderno, en orden */
export const B1_05_PRACTICE_IDS = ['b1-05-p1', 'b1-05-p2', 'b1-05-p3', 'b1-05-p4', 'b1-05-p5', 'b1-05-p6', 'b1-05-p7', 'b1-05-p8']

/** Preguntas de los anuncios de empleo, en orden */
export const B1_05_AD_IDS = ['b1-05-a1', 'b1-05-a2', 'b1-05-a3', 'b1-05-a4', 'b1-05-a5', 'b1-05-a6']

const AD1 = 'Teacher wanted — Bright School. Two years of experience. Excellent spoken communication. 1,200 a month. Send your CV by Friday.'
const AD2 = 'Call centre assistant. Excellent spoken communication. Friendly voice. 900 a month. Call 555-0100 and ask for Mr. Dean.'
const AD3 = 'Shop assistant — Lumen Books. Excellent spoken communication. Weekends free. 800 a month. Come to the shop with your CV.'

export const B1_05_QUESTIONS: Question[] = [
  // ── Cuaderno · página 12 (used to) ──
  { id: 'b1-05-p1', topic: UT, kind: 'fix', prompt: 'When I was young, I use to sing in the car.', options: ['When I was young, I used to sing in the car.', 'When I was young, I used to singing in the car.', 'When I was young, I use to sang in the car.'], answer: 0, tip: 'Hábito de antes: used to + verbo base.', tags: PRACTICE },
  { id: 'b1-05-p2', topic: UT, kind: 'fix', prompt: 'She used to teaches five classes a day.', options: ['She used to teach five classes a day.', 'She used to teaching five classes a day.', 'She use to teach five classes a day.'], answer: 0, tip: 'used to + verbo base, sin -s ni -ing.', tags: PRACTICE },
  { id: 'b1-05-p3', topic: UT, prompt: 'When I was a teacher, I ___ wake up at six every day.', options: ['used to', 'am used to', 'use to'], answer: 0, tip: 'Hábito de antes: used to + verbo base.', tags: PRACTICE },
  { id: 'b1-05-p4', topic: UT, prompt: 'I ___ like coffee, but now I love it.', options: ["didn't use to", "didn't used to", "don't use to"], answer: 0, tip: "Negativa: didn't use to (sin d).", tags: PRACTICE },
  { id: 'b1-05-p5', topic: UT, prompt: '___ you use to sing in the car?', options: ['Did', 'Do', 'Were'], answer: 0, tip: 'Pregunta: Did + sujeto + use to.', tags: PRACTICE },
  { id: 'b1-05-p6', topic: UT, kind: 'order', prompt: 'Yo solía dar cinco clases al día.', options: ['I', 'used', 'to', 'teach', 'five', 'classes', 'a', 'day.'], answer: 0, tip: 'used to + verbo base.', tags: PRACTICE },
  { id: 'b1-05-p7', topic: UT, prompt: 'Yesterday I ___ a letter from the school.', options: ['got', 'used to get', 'use to get'], answer: 0, tip: 'Ayer es una vez, con fecha: pasado simple, no used to.', tags: PRACTICE },
  {
    id: 'b1-05-p8',
    topic: UT,
    kind: 'listen',
    audio: "I used to teach five classes a day. Now I don't have a job. I used to sing in the car, but now I don't feel like it.",
    voice: 'female',
    prompt: '¿Qué hacía antes en el carro?',
    options: ['Cantaba.', 'Dormía.', 'Escuchaba noticias.'],
    answer: 0,
    tip: 'I used to sing in the car.',
    tags: PRACTICE,
  },

  // ── Anuncios de empleo (jobs-b1) ──
  { id: 'b1-05-a1', topic: JOBS, kind: 'listen', audio: AD1, voice: 'female', prompt: 'In ad 1, what do you have to send?', options: ['Your CV.', 'Your passport.', 'A letter from your boss.'], answer: 0, tip: 'How to apply: Send your CV by Friday.', tags: ADS },
  { id: 'b1-05-a2', topic: JOBS, kind: 'listen', audio: AD1, voice: 'female', prompt: 'In ad 1, when is the deadline?', options: ['Friday.', 'Monday.', 'There is no deadline.'], answer: 0, tip: 'Send your CV by Friday.', tags: ADS },
  { id: 'b1-05-a3', topic: JOBS, kind: 'listen', audio: AD2, voice: 'female', prompt: 'In ad 2, how do you apply?', options: ['You call 555-0100.', 'You send a CV.', 'You go to the shop.'], answer: 0, tip: 'Call 555-0100 and ask for Mr. Dean.', tags: ADS },
  { id: 'b1-05-a4', topic: JOBS, kind: 'listen', audio: `${AD1} ${AD2} ${AD3}`, voice: 'female', prompt: 'Which requirement is in all three ads?', options: ['Excellent spoken communication.', 'Two years of experience.', 'Weekends free.'], answer: 0, tip: 'Los tres piden: excellent spoken communication.', tags: ADS },
  { id: 'b1-05-a5', topic: JOBS, kind: 'listen', audio: AD3, voice: 'female', prompt: 'In ad 3, what does the job pay?', options: ['800 a month.', '900 a month.', '1,200 a month.'], answer: 0, tip: 'Pay: 800 a month.', tags: ADS },
  { id: 'b1-05-a6', topic: JOBS, kind: 'listen', audio: AD2, voice: 'female', prompt: "L can't speak. Which job can he NOT do?", options: ['Call centre assistant.', 'Write a CV.', 'Read the ads.'], answer: 0, tip: 'Un call centre necesita comunicación oral.', tags: ADS },
]
