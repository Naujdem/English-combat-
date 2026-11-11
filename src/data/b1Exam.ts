/**
 * Examen final de B1 (misión 14, bloque D; components/B1Exam.tsx). Cuatro partes:
 *  1. Reading: una noticia de Manuel (unas 160 palabras) con 5 preguntas.
 *  2. Listening: un boletín de radio leído con la voz del juego, con 5 preguntas (el texto no se ve hasta terminar).
 *  3. Writing: un texto de 60 a 90 palabras. Se revisan requisitos (longitud, conectores, un pasado, un condicional), no la calidad.
 *  4. Speaking: 3 preguntas para responder en voz alta (palabras clave); sin reconocimiento de voz, se escriben.
 * Reading y listening se aprueban con 3 de 5; si no, se repite esa parte.
 */
export type ExamChoice = { q: string; options: string[]; answer: number; tip: string }
export type ExamSpeak = { ask: string; es: string; help: string; need: RegExp; needMsg: string; model: string }

export const B1_EXAM_PASS = 3

export const B1_EXAM_READING: { title: string; by: string; paragraphs: string[]; questions: ExamChoice[] } = {
  title: 'Voices return to Lumen Bay',
  by: 'by Manuel, Lumen Bay News',
  paragraphs: [
    'Early this morning, three people who had lost their voices at the harbour were able to speak again. The "voice blackouts" had been reported since last night, and the harbour had been closed by the police.',
    'According to a witness, a dark shape appeared above the water just after sunrise. "It was shouting, but the words were wrong," she said. She told us that four exchange students had been standing near the docks. One of them answered the shape in a loud, clear voice. A few minutes later, the shape disappeared.',
    'The police said that nobody had been hurt. They explained that the harbour would open again tomorrow. Doctors admitted that they could not explain the blackouts.',
    'If the students had not been there, the story might have ended differently. This reporter asked one of them what had happened. The student only smiled and said that some questions had no answers yet.',
  ],
  questions: [
    { q: 'How many people had lost their voices?', options: ['Two.', 'Three.', 'Four.'], answer: 1, tip: 'La noticia dice: "three people who had lost their voices".' },
    { q: 'When did the dark shape appear?', options: ['Just after sunrise.', 'Last night.', 'Tomorrow morning.'], answer: 0, tip: 'La noticia dice: "just after sunrise".' },
    { q: 'What did the police say?', options: ['That the students were in danger.', 'That the harbour would never open again.', 'That nobody had been hurt.'], answer: 2, tip: 'La noticia dice: "The police said that nobody had been hurt".' },
    { q: 'What did the doctors admit?', options: ['That they had closed the harbour.', 'That they could not explain the blackouts.', 'That they had seen the shape.'], answer: 1, tip: 'La noticia dice: "Doctors admitted that they could not explain the blackouts".' },
    { q: 'What did the student tell the reporter?', options: ['That some questions had no answers yet.', 'That nothing had happened.', 'That the shape was a friend.'], answer: 0, tip: 'La noticia dice: "some questions had no answers yet".' },
  ],
}

export const B1_EXAM_LISTENING: { title: string; audio: string; questions: ExamChoice[] } = {
  title: 'Lumen Bay Radio',
  audio:
    'This is Lumen Bay Radio with the morning news. The harbour, which was closed last night, will open again tomorrow at nine o\'clock. ' +
    'The ferry to the islands has been cancelled today, but buses are running as usual. ' +
    'The weather will be sunny this morning, although it might rain in the evening, so take an umbrella. ' +
    'Finally, the music festival has raised a lot of money for the animal shelter. The organisers said that they were very happy with the result.',
  questions: [
    { q: 'When will the harbour open again?', options: ['Today at nine.', 'Tomorrow at nine.', 'Tomorrow at noon.'], answer: 1, tip: 'Se oye: "will open again tomorrow at nine o\'clock".' },
    { q: 'What has been cancelled today?', options: ['The buses.', 'The festival.', 'The ferry.'], answer: 2, tip: 'Se oye: "The ferry to the islands has been cancelled today".' },
    { q: 'What might happen in the evening?', options: ['It might rain.', 'It might snow.', 'The harbour might close.'], answer: 0, tip: 'Se oye: "it might rain in the evening".' },
    { q: 'Who is the festival money for?', options: ['The harbour.', 'The school.', 'The animal shelter.'], answer: 2, tip: 'Se oye: "money for the animal shelter".' },
    { q: 'What did the organisers say?', options: ['That they were tired.', 'That they were very happy with the result.', 'That they would cancel the festival.'], answer: 1, tip: 'Se oye: "they were very happy with the result".' },
  ],
}

/** Conectores que cuentan para el writing (cada uno una sola vez) */
export const B1_EXAM_CONNECTORS = ['because', 'so', 'although', 'but', 'when', 'while', 'however', 'then', 'after', 'before', 'unless', 'as a result', 'finally', 'suddenly', 'eventually', 'meanwhile', 'at first']

export const B1_EXAM_WRITING = {
  ask: 'Write about a difficult moment and what you learned.',
  es: 'Escribe sobre un momento difícil y qué aprendiste.',
  min: 60,
  max: 90,
  connectors: 3,
  model:
    "Last year I moved to a new school, and I was very nervous because I didn't know anyone. At first I didn't speak to anybody, so the days felt very long. " +
    'Then a classmate asked me a question, and we started talking. Although I was shy, I answered. If I had stayed silent, I would never have made friends. ' +
    'I learned that a small word can change a day. Now, when I see someone alone, I say hello.',
}

export const B1_EXAM_PAST = /\b(was|were|had|did|didn't|went|got|felt|learned|learnt|said|told|saw|came|made|took|knew|thought|lost|found|\w{3,}ed)\b/i
const CONDITIONAL = /\bif\b[^.!?]*\b(would|will|won't|could|might|had)\b|\bif\b[^.!?]*('ll|'d)\b|\b(would|could|might)\b[^.!?]*\bif\b/i

export const wordCount = (text: string) => text.trim().split(/\s+/).filter(Boolean).length

/** Conectores distintos que aparecen en el texto */
export function connectorsIn(text: string): string[] {
  const t = ` ${text.toLowerCase().replace(/[^a-z' ]+/g, ' ')} `
  return B1_EXAM_CONNECTORS.filter((c) => t.includes(` ${c} `))
}

/** Requisitos del writing: cada uno con su texto y si se cumple. No se revisa la calidad del texto */
export function writingChecks(text: string): { label: string; ok: boolean }[] {
  const n = wordCount(text)
  const found = connectorsIn(text)
  const { min, max, connectors } = B1_EXAM_WRITING
  return [
    { label: `Entre ${min} y ${max} palabras (llevas ${n})`, ok: n >= min && n <= max },
    { label: `Al menos ${connectors} conectores distintos: because, so, although, but, when, then… (llevas ${found.length}${found.length ? `: ${found.join(', ')}` : ''})`, ok: found.length >= connectors },
    { label: 'Un tiempo pasado (was, had, learned, went…)', ok: B1_EXAM_PAST.test(text) },
    { label: 'Un condicional con if (If I had…, I would… / If I were…)', ok: CONDITIONAL.test(text) },
  ]
}

export const B1_EXAM_SPEAKING: ExamSpeak[] = [
  {
    ask: 'Describe Lumen Bay. What have you done there?',
    es: 'Describe Lumen Bay. ¿Qué has hecho allí?',
    help: 'Lumen Bay is… · I have visited… · I have made…',
    need: /\b(have|has)\s+\w+|'ve\s+\w+/i,
    needMsg: 'Usa el present perfect: I have visited…, I have made…',
    model: 'Lumen Bay is a beautiful city by the sea. I have made new friends and I have learned a lot.',
  },
  {
    ask: 'What do you think will happen next?',
    es: '¿Qué crees que va a pasar ahora?',
    help: "I think we will… · I'm going to… · It might…",
    need: /\b(will|won't|going to|might)\b|'ll\b/i,
    needMsg: "Habla del futuro: I think we will…, I'm going to…, It might…",
    model: "I think we will find the stranger, and I'm going to ask him what happened.",
  },
  {
    ask: 'Tell us what the man in the memory said.',
    es: 'Cuéntanos qué dijo el hombre del recuerdo.',
    help: 'He said that he had… · He promised that he would…',
    need: /\b(said|told|explained|admitted|promised)\b.*\b(had|hadn't|was|were|would|could|couldn't|didn't)\b/i,
    needMsg: 'Usa el estilo indirecto: He said that he had…, He promised that he would…',
    model: 'He said that he had lost everything, and he promised that he would take it back.',
  },
]
