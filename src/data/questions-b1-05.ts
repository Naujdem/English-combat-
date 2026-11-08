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
/** Bloque B: el banco (bank-phrasal) y la página 13 del cuaderno (get-used-to) */
const BP = 'bank-phrasal' as const
const BANK = ['b1-05-bank']
const GUT = 'get-used-to' as const
const PRACTICE2 = ['b1-05-practice2']
/** Bloque C: los 2 Eviction Notice (banco compartido) */
const NOTICE = ['b1-05-notice']
const UT2 = 'used-to' as const

/** Práctica del banco, en orden */
export const B1_05_BANK_IDS = ['b1-05-k1', 'b1-05-k2', 'b1-05-k3', 'b1-05-k4']

/** Práctica de la página 13 del cuaderno, en orden */
export const B1_05_PRACTICE2_IDS = ['b1-05-g1', 'b1-05-g2', 'b1-05-g3', 'b1-05-g4', 'b1-05-g5', 'b1-05-g6', 'b1-05-g7', 'b1-05-g8']

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

  // ── Bloque B · el banco (bank-phrasal) ──
  { id: 'b1-05-k1', topic: BP, prompt: "I don't have savings, so I need a ___ from the bank.", options: ['loan', 'saving', 'owe'], answer: 0, tip: 'loan = préstamo.', tags: BANK },
  { id: 'b1-05-k2', topic: BP, prompt: 'I ___ the bank 500. I have to pay it back.', options: ['owe', 'lend', 'own'], answer: 0, tip: 'owe = deber (dinero).', tags: BANK },
  { id: 'b1-05-k3', topic: BP, kind: 'fix', prompt: 'You have to pay back it by June.', options: ['You have to pay it back by June.', 'You have to pay back to it by June.', 'You have to pay it to back by June.'], answer: 0, tip: 'Con pronombre, va en medio: pay it back.', tags: BANK },
  {
    id: 'b1-05-k4',
    topic: BP,
    kind: 'listen',
    audio: "I'm sorry. We can't give you a loan. You don't have a job, and you have debts.",
    voice: 'male',
    prompt: '¿Por qué no le dan el préstamo?',
    options: ['No tiene trabajo y tiene deudas.', 'No tiene cuenta bancaria.', 'Llegó tarde.'],
    answer: 0,
    tip: "You don't have a job, and you have debts.",
    tags: BANK,
  },

  // ── Bloque B · Cuaderno · página 13 (be / get used to) ──
  { id: 'b1-05-g1', topic: GUT, kind: 'fix', prompt: "I'm used to wake up early.", options: ["I'm used to waking up early.", "I'm used to woke up early.", "I'm use to waking up early."], answer: 0, tip: 'be used to + -ing.', tags: PRACTICE2 },
  { id: 'b1-05-g2', topic: GUT, kind: 'fix', prompt: 'She is getting used to live alone.', options: ['She is getting used to living alone.', 'She is getting used to lived alone.', 'She is getting use to living alone.'], answer: 0, tip: 'get used to + -ing.', tags: PRACTICE2 },
  { id: 'b1-05-g3', topic: GUT, prompt: "I ___ used to the silence now. It's normal for me.", options: ['am', 'do', 'will'], answer: 0, tip: 'Ya estás acostumbrado: be used to.', tags: PRACTICE2 },
  { id: 'b1-05-g4', topic: GUT, prompt: "It's my first week here. I'm ___ used to the noise.", options: ['getting', 'having', 'doing'], answer: 0, tip: 'Es un proceso: get used to.', tags: PRACTICE2 },
  { id: 'b1-05-g5', topic: GUT, prompt: 'When I was a child, I ___ play in the street.', options: ['used to', 'am used to', 'am getting used to'], answer: 0, tip: 'Hábito de antes: used to + verbo base.', tags: PRACTICE2 },
  { id: 'b1-05-g6', topic: GUT, prompt: 'Now I ___ living in a small flat.', options: ['am used to', 'used to', 'use to'], answer: 0, tip: 'Ya estás acostumbrado: be used to + -ing.', tags: PRACTICE2 },
  { id: 'b1-05-g7', topic: GUT, kind: 'order', prompt: 'Me estoy acostumbrando al silencio.', options: ['I', 'am', 'getting', 'used', 'to', 'the', 'silence.'], answer: 0, tip: 'get used to + sustantivo.', tags: PRACTICE2 },
  {
    id: 'b1-05-g8',
    topic: GUT,
    kind: 'listen',
    audio: "I'm not used to this city. But I'm getting used to the noise. I used to live in a small town.",
    voice: 'male',
    prompt: '¿Dónde vivía antes?',
    options: ['En un pueblo pequeño.', 'En esta ciudad.', 'En un barco.'],
    answer: 0,
    tip: 'I used to live in a small town.',
    tags: PRACTICE2,
  },

  // ── Bloque C · Eviction Notice (2 esbirros, banco compartido) ──
  { id: 'b1-05-e1', topic: UT2, kind: 'fix', prompt: 'I use to live here when I was a child.', options: ['I used to live here when I was a child.', 'I used to living here when I was a child.', 'I use to lived here when I was a child.'], answer: 0, tip: 'Hábito de antes: used to + verbo base.', tags: NOTICE },
  { id: 'b1-05-e2', topic: GUT, kind: 'fix', prompt: 'He is used to work at night.', options: ['He is used to working at night.', 'He is used to worked at night.', 'He is use to working at night.'], answer: 0, tip: 'be used to + -ing.', tags: NOTICE },
  { id: 'b1-05-e3', topic: UT2, kind: 'fix', prompt: 'Did you used to pay the rent here?', options: ['Did you use to pay the rent here?', 'Did you used to paying the rent here?', 'Do you used to pay the rent here?'], answer: 0, tip: 'Pregunta: Did + sujeto + use to (sin d).', tags: NOTICE },
  { id: 'b1-05-e4', topic: BP, prompt: 'You ___ 800. Pay it today.', options: ['owe', 'own', 'lend'], answer: 0, tip: 'owe = deber (dinero).', tags: NOTICE },
  { id: 'b1-05-e5', topic: BP, prompt: 'The landlord wants to ___ me from the flat.', options: ['evict', 'erase', 'envy'], answer: 0, tip: 'evict = desalojar.', tags: NOTICE },
  { id: 'b1-05-e6', topic: GUT, prompt: "I'm not ___ to living without a job yet.", options: ['used', 'use', 'using'], answer: 0, tip: 'be used to + -ing.', tags: NOTICE },
  { id: 'b1-05-e7', topic: BP, prompt: 'I have a big ___: I owe the bank 3,000.', options: ['debt', 'savings', 'deposit'], answer: 0, tip: 'debt = deuda.', tags: NOTICE },
  { id: 'b1-05-e8', topic: BP, kind: 'fix', prompt: 'Please pay back it today.', options: ['Please pay it back today.', 'Please pay back to it today.', 'Please pay it to back today.'], answer: 0, tip: 'Con pronombre, va en medio: pay it back.', tags: NOTICE },
  { id: 'b1-05-e9', topic: GUT, kind: 'order', prompt: 'Todavía no estoy acostumbrado al silencio.', options: ['I', 'am', 'not', 'used', 'to', 'the', 'silence', 'yet.'], answer: 0, tip: 'be used to + sustantivo.', tags: NOTICE },
  {
    id: 'b1-05-e10',
    topic: BP,
    kind: 'listen',
    audio: 'Dear tenant. You owe three months of rent. Please pay it back before Friday, or we will evict you.',
    voice: 'female',
    prompt: '¿Qué pasará si no paga antes del viernes?',
    options: ['Lo desalojarán.', 'Le darán un préstamo.', 'Le subirán el sueldo.'],
    answer: 0,
    tip: 'or we will evict you.',
    tags: NOTICE,
  },
]
