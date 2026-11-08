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
/** Bloque C: práctica de la lección de experiencia (tarea b1-06-experience) y banco compartido de los voluntarios */
const EX = 'experience-b1' as const
const PRACTICE3 = ['b1-06-practice3']
const VOL = ['b1-06-volunteer']

/** Práctica de la lección de experiencia, en orden */
export const B1_06_PRACTICE3_IDS = ['b1-06-x1', 'b1-06-x2', 'b1-06-x3', 'b1-06-x4', 'b1-06-x5', 'b1-06-x6', 'b1-06-x7', 'b1-06-x8']

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
  // ── Bloque C: contar tu experiencia (Nayi) ──
  { id: 'b1-06-x1', topic: EX, kind: 'fix', prompt: 'I worked here since three years.', options: ["I've worked here for three years.", "I've worked here since three years.", 'I worked here since three year.'], answer: 0, tip: 'Dura hasta hoy: present perfect + for.', tags: PRACTICE3 },
  { id: 'b1-06-x2', topic: EX, kind: 'fix', prompt: 'I have volunteered at a shelter last year.', options: ['I volunteered at a shelter last year.', 'I have volunteer at a shelter last year.', 'I volunteering at a shelter last year.'], answer: 0, tip: 'Last year es un momento terminado: past simple.', tags: PRACTICE3 },
  { id: 'b1-06-x3', topic: EX, prompt: 'I ___ at a bakery in 2022.', options: ['worked', 'have worked', 'work'], answer: 0, tip: 'In 2022: past simple.', tags: PRACTICE3 },
  { id: 'b1-06-x4', topic: EX, prompt: 'I ___ with animals since 2020.', options: ['have worked', 'worked', 'work'], answer: 0, tip: 'Since + desde cuándo: present perfect.', tags: PRACTICE3 },
  { id: 'b1-06-x5', topic: EX, prompt: 'She ___ dogs for three months last summer.', options: ['walked', 'has walked', 'walks'], answer: 0, tip: 'Last summer: past simple.', tags: PRACTICE3 },
  { id: 'b1-06-x6', topic: EX, prompt: '___ you ever worked with cats?', options: ['Have', 'Did', 'Are'], answer: 0, tip: 'Experiencia hasta ahora: Have you ever + participio.', tags: PRACTICE3 },
  { id: 'b1-06-x7', topic: EX, kind: 'order', prompt: 'He trabajado con animales por tres años.', options: ['I', 'have', 'worked', 'with', 'animals', 'for', 'three', 'years.'], answer: 0, tip: 'have worked + for.', tags: PRACTICE3 },
  {
    id: 'b1-06-x8',
    topic: EX,
    kind: 'listen',
    audio: "Have you worked with animals before? I'd like to know about your experience. Please tell me about your last job.",
    voice: 'male',
    prompt: '¿Qué quiere saber Esteban?',
    options: ['Su experiencia con animales.', 'Cuánto cobra.', 'Dónde vive.'],
    answer: 0,
    tip: 'Have you worked with animals before?',
    tags: PRACTICE3,
  },
  // ── Bloque C: banco compartido de los 2 Tired Volunteer ──
  { id: 'b1-06-v1', topic: RC, kind: 'fix', prompt: "The dog who's collar is red is Kitay.", options: ['The dog whose collar is red is Kitay.', 'The dog who collar is red is Kitay.', "The dog which's collar is red is Kitay."], answer: 0, tip: 'Posesión: whose.', tags: VOL },
  { id: 'b1-06-v2', topic: RC, kind: 'fix', prompt: 'The boy which feeds the cats is tired.', options: ['The boy who feeds the cats is tired.', 'The boy whose feeds the cats is tired.', 'The boy where feeds the cats is tired.'], answer: 0, tip: 'Personas: who.', tags: VOL },
  { id: 'b1-06-v3', topic: RC, prompt: 'This is the kennel ___ the puppies sleep.', options: ['where', 'who', 'whose'], answer: 0, tip: 'Lugares: where.', tags: VOL },
  { id: 'b1-06-v4', topic: RC, prompt: 'Mr. Díaz is the man ___ dog is very old.', options: ['whose', 'who', 'that'], answer: 0, tip: 'Posesión: whose.', tags: VOL },
  { id: 'b1-06-v5', topic: EX, kind: 'fix', prompt: 'She has worked here since two weeks.', options: ['She has worked here for two weeks.', 'She worked here since two weeks.', 'She has work here for two weeks.'], answer: 0, tip: 'Cuánto tiempo: for.', tags: VOL },
  { id: 'b1-06-v6', topic: EX, kind: 'fix', prompt: 'I have walked the dogs yesterday.', options: ['I walked the dogs yesterday.', 'I have walk the dogs yesterday.', 'I walking the dogs yesterday.'], answer: 0, tip: 'Yesterday: past simple.', tags: VOL },
  { id: 'b1-06-v7', topic: EX, prompt: "I've known Nayi ___ 2021.", options: ['since', 'for', 'during'], answer: 0, tip: 'Desde cuándo: since.', tags: VOL },
  { id: 'b1-06-v8', topic: EX, prompt: 'We have fed the dogs ___ two hours.', options: ['for', 'since', 'from'], answer: 0, tip: 'Cuánto tiempo: for.', tags: VOL },
  { id: 'b1-06-v9', topic: RC, kind: 'order', prompt: 'El perro que paseé ayer es Fresas.', options: ['The', 'dog', 'I', 'walked', 'yesterday', 'is', 'Fresas.'], answer: 0, tip: 'Sin pronombre: the dog I walked.', tags: VOL },
  {
    id: 'b1-06-v10',
    topic: EX,
    kind: 'listen',
    audio: "I'm Sam. I've volunteered here for two years. The dog that I like best is Laica, because she sleeps all day.",
    voice: 'female',
    prompt: '¿Hace cuánto es voluntaria?',
    options: ['Hace dos años.', 'Hace dos meses.', 'Desde ayer.'],
    answer: 0,
    tip: "I've volunteered here for two years.",
    tags: VOL,
  },
]
