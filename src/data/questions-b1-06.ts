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
/** Bloque D: The Interviewer, fase 1 (relativos) y fase 2 (experiencia) */
const BOSS_R = ['b1-06-boss', 'b1-06-boss-r']
const BOSS_E = ['b1-06-boss', 'b1-06-boss-e']

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
  { id: 'b1-06-w2', topic: WE, kind: 'fix', prompt: 'She is responsible of the dogs.', options: ['She is responsible in the dogs.', 'She is responsible for the dogs.', 'She is responsible at the dogs.'], answer: 1, tip: 'responsible for.', tags: PRACTICE },
  { id: 'b1-06-w3', topic: WE, prompt: 'Please send your application ___ the job.', options: ['of', 'at', 'for'], answer: 2, tip: 'application for.', tags: PRACTICE },
  { id: 'b1-06-w4', topic: WE, prompt: 'He has no interest ___ working with animals.', options: ['for', 'in', 'on'], answer: 1, tip: 'interest in.', tags: PRACTICE },
  { id: 'b1-06-w5', topic: WE, prompt: "Red really ___ you. It's a great colour on you.", options: ['suits', 'fits', 'matches'], answer: 0, tip: 'suit = quedar bien.', tags: PRACTICE },
  { id: 'b1-06-w6', topic: WE, prompt: "These boots are too small. They don't ___ me.", options: ['suit', 'match', 'fit'], answer: 2, tip: 'fit = quedar de talla.', tags: PRACTICE },
  { id: 'b1-06-w7', topic: WE, prompt: 'Her blue shirt ___ her blue shoes.', options: ['matches', 'fits', 'suits'], answer: 0, tip: 'match = combinar.', tags: PRACTICE },
  {
    id: 'b1-06-w8',
    topic: WE,
    kind: 'listen',
    audio: 'Welcome to Lumen Paws. We need a reliable person. The job is part-time, fifteen hours a week. You will be responsible for feeding the dogs. Send your CV to me, please.',
    voice: 'female',
    prompt: 'What will the new person be responsible for?',
    options: ['Cleaning the office.', 'Feeding the dogs.', 'Driving the car.'],
    answer: 1,
    tip: 'responsible for feeding the dogs.',
    tags: PRACTICE,
  },
  { id: 'b1-06-r1', topic: JOBS, kind: 'listen', audio: ADVERT, voice: 'female', prompt: 'Which part tells you what you will do?', options: ['About us.', 'How to apply.', 'Duties.'], answer: 2, tip: 'Duties = las tareas.', tags: ADS },
  { id: 'b1-06-r2', topic: JOBS, kind: 'listen', audio: ADVERT, voice: 'female', prompt: 'How many hours a week is the job?', options: ['Forty.', 'Fifteen.', 'Five.'], answer: 1, tip: 'Hours: part-time, 15 hours a week.', tags: ADS },
  { id: 'b1-06-r3', topic: JOBS, kind: 'listen', audio: ADVERT, voice: 'female', prompt: 'How do you apply?', options: ['Send a CV and a short letter to Ms. Haddad.', 'Call the shelter.', 'Come on Monday.'], answer: 0, tip: 'How to apply: send your CV and a short letter.', tags: ADS },
  // ── Bloque B: oraciones de relativo (Nayi) ──
  { id: 'b1-06-d1', topic: RC, kind: 'fix', prompt: 'The girl which works here is Nayi.', options: ['The girl whose works here is Nayi.', 'The girl where works here is Nayi.', 'The girl who works here is Nayi.'], answer: 2, tip: 'Personas: who.', tags: PRACTICE2 },
  { id: 'b1-06-d2', topic: RC, kind: 'fix', prompt: "Kitay is the dog who's collar is red.", options: ['Kitay is the dog whose collar is red.', 'Kitay is the dog who collar is red.', "Kitay is the dog which's collar is red."], answer: 0, tip: 'Posesión: whose.', tags: PRACTICE2 },
  { id: 'b1-06-d3', topic: RC, prompt: 'Laica is the dog ___ sleeps all day.', options: ['whose', 'that', 'where'], answer: 1, tip: 'Animales: that.', tags: PRACTICE2 },
  { id: 'b1-06-d4', topic: RC, prompt: 'Lupe is the dog ___ ears are small.', options: ['who', 'where', 'whose'], answer: 2, tip: 'Posesión: whose.', tags: PRACTICE2 },
  { id: 'b1-06-d5', topic: RC, prompt: 'This is the shelter ___ I work.', options: ['who', 'where', 'whose'], answer: 1, tip: 'Lugares: where.', tags: PRACTICE2 },
  { id: 'b1-06-d6', topic: RC, kind: 'fix', prompt: 'Fresas is the dog that I walked it yesterday.', options: ['Fresas is the dog that I walked yesterday.', 'Fresas is the dog that walked I yesterday.', 'Fresas is the dog that I walked him yesterday.'], answer: 0, tip: 'El pronombre ya es el objeto: no repitas it.', tags: PRACTICE2 },
  { id: 'b1-06-d7', topic: RC, kind: 'order', prompt: 'Laica es el perro que duerme todo el día.', options: ['Laica', 'is', 'the', 'dog', 'that', 'sleeps', 'all', 'day.'], answer: 0, tip: 'the dog that + verbo.', tags: PRACTICE2 },
  {
    id: 'b1-06-d8',
    topic: RC,
    kind: 'listen',
    audio: "Bring me the dog that has a red collar. It's the one whose ears are big. It's sitting next to the door.",
    voice: 'female',
    prompt: 'Which dog does the speaker want?',
    options: ['The one that sleeps all day.', 'The one that has a blue collar.', 'The one that has a red collar.'],
    answer: 2,
    tip: 'the dog that has a red collar.',
    tags: PRACTICE2,
  },
  // ── Bloque C: contar tu experiencia (Nayi) ──
  { id: 'b1-06-x1', topic: EX, kind: 'fix', prompt: 'I worked here since three years.', options: ["I've worked here for three years.", "I've worked here since three years.", 'I worked here since three year.'], answer: 0, tip: 'Dura hasta hoy: present perfect + for.', tags: PRACTICE3 },
  { id: 'b1-06-x2', topic: EX, kind: 'fix', prompt: 'I have volunteered at a shelter last year.', options: ['I have volunteer at a shelter last year.', 'I volunteered at a shelter last year.', 'I volunteering at a shelter last year.'], answer: 1, tip: 'Last year es un momento terminado: past simple.', tags: PRACTICE3 },
  { id: 'b1-06-x3', topic: EX, prompt: 'I ___ at a bakery in 2022.', options: ['have worked', 'work', 'worked'], answer: 2, tip: 'In 2022: past simple.', tags: PRACTICE3 },
  { id: 'b1-06-x4', topic: EX, prompt: 'I ___ with animals since 2020.', options: ['worked', 'have worked', 'work'], answer: 1, tip: 'Since + desde cuándo: present perfect.', tags: PRACTICE3 },
  { id: 'b1-06-x5', topic: EX, prompt: 'She ___ dogs for three months last summer.', options: ['walked', 'has walked', 'walks'], answer: 0, tip: 'Last summer: past simple.', tags: PRACTICE3 },
  { id: 'b1-06-x6', topic: EX, prompt: '___ you ever worked with cats?', options: ['Did', 'Are', 'Have'], answer: 2, tip: 'Experiencia hasta ahora: Have you ever + participio.', tags: PRACTICE3 },
  { id: 'b1-06-x7', topic: EX, kind: 'order', prompt: 'He trabajado con animales por tres años.', options: ['I', 'have', 'worked', 'with', 'animals', 'for', 'three', 'years.'], answer: 0, tip: 'have worked + for.', tags: PRACTICE3 },
  {
    id: 'b1-06-x8',
    topic: EX,
    kind: 'listen',
    audio: "Have you worked with animals before? I'd like to know about your experience. Please tell me about your last job.",
    voice: 'male',
    prompt: 'What does Esteban want to know?',
    options: ['Your experience with animals.', 'How much money you want.', 'Where you live.'],
    answer: 0,
    tip: 'Have you worked with animals before?',
    tags: PRACTICE3,
  },
  // ── Bloque C: banco compartido de los 2 Tired Volunteer ──
  { id: 'b1-06-v1', topic: RC, kind: 'fix', prompt: "The dog who's collar is red is Kitay.", options: ['The dog who collar is red is Kitay.', 'The dog whose collar is red is Kitay.', "The dog which's collar is red is Kitay."], answer: 1, tip: 'Posesión: whose.', tags: VOL },
  { id: 'b1-06-v2', topic: RC, kind: 'fix', prompt: 'The boy which feeds the cats is tired.', options: ['The boy whose feeds the cats is tired.', 'The boy where feeds the cats is tired.', 'The boy who feeds the cats is tired.'], answer: 2, tip: 'Personas: who.', tags: VOL },
  { id: 'b1-06-v3', topic: RC, prompt: 'This is the kennel ___ the puppies sleep.', options: ['who', 'where', 'whose'], answer: 1, tip: 'Lugares: where.', tags: VOL },
  { id: 'b1-06-v4', topic: RC, prompt: 'Mr. Díaz is the man ___ dog is very old.', options: ['whose', 'who', 'that'], answer: 0, tip: 'Posesión: whose.', tags: VOL },
  { id: 'b1-06-v5', topic: EX, kind: 'fix', prompt: 'She has worked here since two weeks.', options: ['She worked here since two weeks.', 'She has work here for two weeks.', 'She has worked here for two weeks.'], answer: 2, tip: 'Cuánto tiempo: for.', tags: VOL },
  { id: 'b1-06-v6', topic: EX, kind: 'fix', prompt: 'I have walked the dogs yesterday.', options: ['I walked the dogs yesterday.', 'I have walk the dogs yesterday.', 'I walking the dogs yesterday.'], answer: 0, tip: 'Yesterday: past simple.', tags: VOL },
  { id: 'b1-06-v7', topic: EX, prompt: "I've known Nayi ___ 2021.", options: ['for', 'since', 'during'], answer: 1, tip: 'Desde cuándo: since.', tags: VOL },
  { id: 'b1-06-v8', topic: EX, prompt: 'We have been at the shelter ___ two hours.', options: ['since', 'from', 'for'], answer: 2, tip: 'Cuánto tiempo: for.', tags: VOL },
  { id: 'b1-06-v9', topic: RC, kind: 'order', prompt: 'El perro que paseé ayer es Fresas.', options: ['The', 'dog', 'I', 'walked', 'yesterday', 'is', 'Fresas.'], answer: 0, tip: 'Sin pronombre: the dog I walked.', tags: VOL },
  {
    id: 'b1-06-v10',
    topic: EX,
    kind: 'listen',
    audio: "I'm Sam. I've volunteered here for two years. The dog that I like best is Laica, because she sleeps all day.",
    voice: 'female',
    prompt: 'How long has Sam been a volunteer?',
    options: ['For two months.', 'For two years.', 'Since yesterday.'],
    answer: 1,
    tip: "I've volunteered here for two years.",
    tags: VOL,
  },
  // ── Bloque D: The Interviewer, fase 1 (relativos) ──
  { id: 'b1-06-bo1', topic: RC, kind: 'fix', prompt: 'The woman which hires you is late.', options: ['The woman who hires you is late.', 'The woman whose hires you is late.', 'The woman where hires you is late.'], answer: 0, tip: 'Personas: who.', tags: BOSS_R },
  { id: 'b1-06-bo2', topic: RC, kind: 'fix', prompt: "The man who's tie is grey is angry.", options: ['The man who tie is grey is angry.', "The man which's tie is grey is angry.", 'The man whose tie is grey is angry.'], answer: 2, tip: 'Posesión: whose.', tags: BOSS_R },
  { id: 'b1-06-bo3', topic: RC, prompt: 'This is the office ___ I had my interview.', options: ['where', 'who', 'whose'], answer: 0, tip: 'Lugares: where.', tags: BOSS_R },
  { id: 'b1-06-bo4', topic: RC, prompt: 'The shelter has a dog ___ eyes are blue.', options: ['who', 'whose', 'where'], answer: 1, tip: 'Posesión: whose.', tags: BOSS_R },
  { id: 'b1-06-bo5', topic: RC, kind: 'fix', prompt: 'The dog that I fed it is Lupe.', options: ['The dog that I fed him is Lupe.', 'The dog that fed I is Lupe.', 'The dog that I fed is Lupe.'], answer: 2, tip: 'El pronombre ya es el objeto: no repitas it.', tags: BOSS_R },
  { id: 'b1-06-bo6', topic: RC, kind: 'order', prompt: 'La chica que trabaja aquí es Nayi.', options: ['The', 'girl', 'who', 'works', 'here', 'is', 'Nayi.'], answer: 0, tip: 'the girl who + verbo.', tags: BOSS_R },
  {
    id: 'b1-06-bo7',
    topic: RC,
    kind: 'listen',
    audio: 'The woman who works at the desk is Ms. Haddad. The man whose office is at the back is Esteban. The dog that sleeps all day is Laica.',
    voice: 'male',
    prompt: 'Who is Esteban?',
    options: ['The woman who works at the desk.', 'The man whose office is at the back.', 'The dog that sleeps all day.'],
    answer: 1,
    tip: 'The man whose office is at the back is Esteban.',
    tags: BOSS_R,
  },
  // ── Bloque D: The Interviewer, fase 2 (experiencia) ──
  { id: 'b1-06-be1', topic: EX, kind: 'fix', prompt: 'He worked here since March.', options: ['He has worked here since March.', 'He worked here for March.', 'He has work here since March.'], answer: 0, tip: 'Desde cuándo y sigue: present perfect + since.', tags: BOSS_E },
  { id: 'b1-06-be2', topic: EX, kind: 'fix', prompt: 'I have visited the shelter in 2022.', options: ['I have visit the shelter in 2022.', 'I visiting the shelter in 2022.', 'I visited the shelter in 2022.'], answer: 2, tip: 'In 2022: past simple.', tags: BOSS_E },
  { id: 'b1-06-be3', topic: EX, prompt: 'I ___ a dog when I was ten.', options: ['had', 'have had', 'has'], answer: 0, tip: 'When I was ten: past simple.', tags: BOSS_E },
  { id: 'b1-06-be4', topic: EX, prompt: 'She ___ with dogs for five years now.', options: ['worked', 'has worked', 'works'], answer: 1, tip: 'For + hasta hoy: present perfect.', tags: BOSS_E },
  { id: 'b1-06-be5', topic: EX, prompt: 'Have you ___ a dog before?', options: ['walk', 'walking', 'walked'], answer: 2, tip: 'Have you + participio.', tags: BOSS_E },
  { id: 'b1-06-be6', topic: EX, kind: 'order', alts: ["Last year I worked here."], prompt: 'Trabajé aquí el año pasado.', options: ['I', 'worked', 'here', 'last', 'year.'], answer: 0, tip: 'Last year: past simple.', tags: BOSS_E },
  {
    id: 'b1-06-be7',
    topic: EX,
    kind: 'listen',
    audio: "I've worked at the shelter since 2021. Last summer I trained two puppies. I've never worked with cats.",
    voice: 'female',
    prompt: 'What has the speaker never done?',
    options: ['Trained puppies.', 'Worked with cats.', 'Worked at the shelter.'],
    answer: 1,
    tip: "I've never worked with cats.",
    tags: BOSS_E,
  },
]
