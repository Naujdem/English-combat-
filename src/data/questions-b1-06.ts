import type { Question } from '../game/types'

/**
 * B1-06 · First Job (presente). Bloque A (refugio Lumen Paws, data/b1Shelter.ts):
 *  - Práctica de la lección de Ms. Haddad (tarea b1-06-advert, tema work-english): tag b1-06-practice, lista fija.
 *  - Preguntas del anuncio del tablón (tarea b1-06-read, components/FinePrint.tsx en modo anuncios, tema jobs-b1): tag b1-06-ads.
 *    Son de lectura; en el banco de repaso llevan audio con el anuncio para que se puedan responder sin el papel.
 * Regla: en las preguntas de elegir solo UNA opción es correcta (la primera).
 */
const WE = 'work-english' as const
const PRACTICE = ['b1-06-practice']
const JOBS = 'jobs-b1' as const
const ADS = ['b1-06-ads']
/** Bloque B (las jaulas): práctica de la lección de Nayi (tarea b1-06-nayi, tema relative-clauses) */
const RC = 'relative-clauses' as const
const PRACTICE2 = ['b1-06-practice2']

/** Práctica de la lección de Nayi, en orden */
export const B1_06_PRACTICE2_IDS = ['b1-06-d1', 'b1-06-d2', 'b1-06-d3', 'b1-06-d4', 'b1-06-d5', 'b1-06-d6', 'b1-06-d7', 'b1-06-d8']

/** Práctica de la lección de Ms. Haddad, en orden */
export const B1_06_PRACTICE_IDS = ['b1-06-w1', 'b1-06-w2', 'b1-06-w3', 'b1-06-w4', 'b1-06-w5', 'b1-06-w6', 'b1-06-w7', 'b1-06-w8']

/** Preguntas del anuncio del tablón, en orden */
export const B1_06_AD_IDS = ['b1-06-r1', 'b1-06-r2', 'b1-06-r3']

const ADVERT =
  'Volunteer helper wanted — Lumen Paws Shelter. About us: We look after dogs and cats without a home. Duties: Feed the animals. Walk the dogs. Clean the kennels. Requirements: Experience in animal care. Reliable and friendly. Good English. Hours: Part-time, 15 hours a week. How to apply: Send your CV and a short letter to Ms. Haddad.'

export const B1_06_QUESTIONS: Question[] = [
  { id: 'b1-06-w1', topic: WE, kind: 'fix', prompt: 'I have experience on animal care.', options: ['I have experience in animal care.', 'I have experience to animal care.', 'I have experience by animal care.'], answer: 0, tip: 'experience in + área.', tags: PRACTICE },
  { id: 'b1-06-w2', topic: WE, kind: 'fix', prompt: 'She is responsible of the dogs.', options: ['She is responsible for the dogs.', 'She is responsible in the dogs.', 'She is responsible at the dogs.'], answer: 0, tip: 'responsible for.', tags: PRACTICE },
  { id: 'b1-06-w3', topic: WE, prompt: 'Please send your application ___ the job.', options: ['for', 'of', 'at'], answer: 0, tip: 'application for.', tags: PRACTICE },
  { id: 'b1-06-w4', topic: WE, prompt: 'He has no interest ___ working with animals.', options: ['in', 'for', 'on'], answer: 0, tip: 'interest in.', tags: PRACTICE },
  { id: 'b1-06-w5', topic: WE, prompt: "Red really ___ you. It's a great colour on you.", options: ['suits', 'fits', 'matches'], answer: 0, tip: 'suit = quedar bien.', tags: PRACTICE },
  { id: 'b1-06-w6', topic: WE, prompt: "These boots are too small. They don't ___ me.", options: ['fit', 'suit', 'match'], answer: 0, tip: 'fit = quedar de talla.', tags: PRACTICE },
  { id: 'b1-06-w7', topic: WE, prompt: 'Her blue shirt ___ her blue shoes.', options: ['matches', 'fits', 'suits'], answer: 0, tip: 'match = combinar.', tags: PRACTICE },
  {
    id: 'b1-06-w8',
    topic: WE,
    kind: 'listen',
    audio: 'Welcome to Lumen Paws. We need a reliable person. The job is part-time, fifteen hours a week. You will be responsible for feeding the dogs. Send your CV to me, please.',
    voice: 'female',
    prompt: '¿De qué será responsable?',
    options: ['De darle de comer a los perros.', 'De limpiar la oficina.', 'De manejar el carro.'],
    answer: 0,
    tip: 'responsible for feeding the dogs.',
    tags: PRACTICE,
  },
  { id: 'b1-06-r1', topic: JOBS, kind: 'listen', audio: ADVERT, voice: 'female', prompt: 'Which part tells you what you will do?', options: ['Duties.', 'About us.', 'How to apply.'], answer: 0, tip: 'Duties = las tareas.', tags: ADS },
  { id: 'b1-06-r2', topic: JOBS, kind: 'listen', audio: ADVERT, voice: 'female', prompt: 'How many hours a week is the job?', options: ['Fifteen.', 'Forty.', 'Five.'], answer: 0, tip: 'Hours: part-time, 15 hours a week.', tags: ADS },
  { id: 'b1-06-r3', topic: JOBS, kind: 'listen', audio: ADVERT, voice: 'female', prompt: 'How do you apply?', options: ['Send a CV and a short letter to Ms. Haddad.', 'Call the shelter.', 'Come on Monday.'], answer: 0, tip: 'How to apply: send your CV and a short letter.', tags: ADS },
  // ── Bloque B: oraciones de relativo (Nayi) ──
  { id: 'b1-06-d1', topic: RC, kind: 'fix', prompt: 'The girl which works here is Nayi.', options: ['The girl who works here is Nayi.', 'The girl whose works here is Nayi.', 'The girl where works here is Nayi.'], answer: 0, tip: 'Personas: who.', tags: PRACTICE2 },
  { id: 'b1-06-d2', topic: RC, kind: 'fix', prompt: "Kitay is the dog who's collar is red.", options: ['Kitay is the dog whose collar is red.', 'Kitay is the dog who collar is red.', "Kitay is the dog which's collar is red."], answer: 0, tip: 'Posesión: whose.', tags: PRACTICE2 },
  { id: 'b1-06-d3', topic: RC, prompt: 'Laica is the dog ___ sleeps all day.', options: ['that', 'whose', 'where'], answer: 0, tip: 'Animales: that.', tags: PRACTICE2 },
  { id: 'b1-06-d4', topic: RC, prompt: 'Lupe is the dog ___ ears are small.', options: ['whose', 'who', 'where'], answer: 0, tip: 'Posesión: whose.', tags: PRACTICE2 },
  { id: 'b1-06-d5', topic: RC, prompt: 'This is the shelter ___ I work.', options: ['where', 'who', 'whose'], answer: 0, tip: 'Lugares: where.', tags: PRACTICE2 },
  { id: 'b1-06-d6', topic: RC, kind: 'fix', prompt: 'Fresas is the dog that I walked it yesterday.', options: ['Fresas is the dog that I walked yesterday.', 'Fresas is the dog that walked I yesterday.', 'Fresas is the dog that I walked him yesterday.'], answer: 0, tip: 'El pronombre ya es el objeto: no repitas it.', tags: PRACTICE2 },
  { id: 'b1-06-d7', topic: RC, kind: 'order', prompt: 'Laica es el perro que duerme todo el día.', options: ['Laica', 'is', 'the', 'dog', 'that', 'sleeps', 'all', 'day.'], answer: 0, tip: 'the dog that + verbo.', tags: PRACTICE2 },
  {
    id: 'b1-06-d8',
    topic: RC,
    kind: 'listen',
    audio: "Bring me the dog that has a red collar. It's the one whose ears are big. It's sitting next to the door.",
    voice: 'female',
    prompt: '¿Qué perro quiere?',
    options: ['El que tiene un collar rojo.', 'El que duerme todo el día.', 'El que tiene un collar azul.'],
    answer: 0,
    tip: 'the dog that has a red collar.',
    tags: PRACTICE2,
  },
]
