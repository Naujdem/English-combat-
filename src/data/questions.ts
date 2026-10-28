import type { Question, TopicId } from '../game/types'

/**
 * Banco de preguntas.
 * Cada pregunta fue escrita y revisada a mano. Para agregar más, copia el formato:
 * - prompt: la frase con ___ en el espacio
 * - options: 2 a 4 opciones
 * - answer: posición de la opción correcta (empieza en 0)
 * - tip: explicación corta en español que da un amigo si fallas
 */
export const QUESTIONS: Question[] = [
  // ── Verbo to be: afirmativo ─────────────────────────────
  { id: 'be-01', topic: 'to-be', prompt: 'I ___ a student.', options: ['am', 'is', 'are'], answer: 0, tip: 'Con "I" siempre se usa "am": I am.' },
  { id: 'be-02', topic: 'to-be', prompt: 'She ___ my teacher.', options: ['are', 'is', 'am'], answer: 1, tip: 'Con he, she e it se usa "is".' },
  { id: 'be-03', topic: 'to-be', prompt: 'They ___ hungry.', options: ['is', 'am', 'are'], answer: 2, tip: 'Con you, we y they se usa "are".' },
  { id: 'be-04', topic: 'to-be', prompt: 'We ___ in the classroom.', options: ['are', 'is', 'am'], answer: 0, tip: '"We" es plural, así que usa "are".' },
  { id: 'be-05', topic: 'to-be', prompt: 'The book ___ on the desk.', options: ['are', 'am', 'is'], answer: 2, tip: '"The book" es una sola cosa, equivale a "it", y con "it" va "is".' },
  { id: 'be-06', topic: 'to-be', prompt: 'My friends ___ at the cafeteria.', options: ['is', 'are', 'am'], answer: 1, tip: '"My friends" son varios, equivale a "they", y con "they" va "are".' },
  { id: 'be-07', topic: 'to-be', prompt: 'You ___ very kind.', options: ['are', 'is', 'am'], answer: 0, tip: 'Con "you" siempre se usa "are", sea una persona o varias.' },
  { id: 'be-08', topic: 'to-be', prompt: 'It ___ cold today.', options: ['am', 'is', 'are'], answer: 1, tip: 'Con "it" se usa "is".' },

  // ── Verbo to be: contracciones ──────────────────────────
  { id: 'be-09', topic: 'to-be', prompt: '___ ready to fight!', options: ["I'm", "I's", "I're"], answer: 0, tip: '"I am" se contrae como "I\'m".' },
  { id: 'be-10', topic: 'to-be', prompt: '___ from Colombia.', options: ["He're", "He's", "He'm"], answer: 1, tip: '"He is" se contrae como "He\'s".' },
  { id: 'be-11', topic: 'to-be', prompt: "___ late for class!", options: ["We's", "We'm", "We're"], answer: 2, tip: '"We are" se contrae como "We\'re".' },

  // ── Verbo to be: negativo ───────────────────────────────
  { id: 'be-12', topic: 'to-be', prompt: 'I ___ tired.', options: ['am not', 'is not', 'are not'], answer: 0, tip: 'Para negar, agrega "not" después del verbo: I am not.' },
  { id: 'be-13', topic: 'to-be', prompt: 'He ___ in the bathroom.', options: ["aren't", "isn't", "amn't"], answer: 1, tip: '"Is not" se contrae como "isn\'t". Con he, she e it.' },
  { id: 'be-14', topic: 'to-be', prompt: "The windows ___ open.", options: ["isn't", "aren't", "am not"], answer: 1, tip: '"The windows" es plural, así que va "are not" o "aren\'t".' },
  { id: 'be-15', topic: 'to-be', prompt: 'You ___ my enemy.', options: ["aren't", "isn't", "am not"], answer: 0, tip: 'Con "you" la negación es "are not" o "aren\'t".' },

  // ── Verbo to be: preguntas ──────────────────────────────
  { id: 'be-16', topic: 'to-be', prompt: '___ you a student?', options: ['Is', 'Are', 'Am'], answer: 1, tip: 'En preguntas el verbo va primero. Con "you" es "Are you...?"' },
  { id: 'be-17', topic: 'to-be', prompt: '___ she your sister?', options: ['Is', 'Are', 'Am'], answer: 0, tip: 'Con "she" la pregunta empieza con "Is": Is she...?' },
  { id: 'be-18', topic: 'to-be', prompt: '___ your parents at home?', options: ['Is', 'Am', 'Are'], answer: 2, tip: '"Your parents" es plural, así que la pregunta empieza con "Are".' },
  { id: 'be-19', topic: 'to-be', prompt: '___ I in the right room?', options: ['Am', 'Is', 'Are'], answer: 0, tip: 'Con "I" la pregunta empieza con "Am": Am I...?' },
  { id: 'be-20', topic: 'to-be', prompt: '___ the cafeteria open?', options: ['Are', 'Is', 'Am'], answer: 1, tip: '"The cafeteria" es un solo lugar, equivale a "it", así que va "Is".' },

  // ── Verbo to be: respuestas cortas ──────────────────────
  { id: 'be-21', topic: 'to-be', prompt: 'Are you ready? — Yes, I ___.', options: ['am', 'are', 'is'], answer: 0, tip: 'Si te preguntan "Are you...?", respondes por ti: "Yes, I am".' },
  { id: 'be-22', topic: 'to-be', prompt: 'Is he your friend? — No, he ___.', options: ["aren't", "isn't", "am not"], answer: 1, tip: 'La respuesta corta repite el sujeto y el verbo: "No, he isn\'t".' },
  { id: 'be-23', topic: 'to-be', prompt: 'Are they students? — Yes, they ___.', options: ['is', 'am', 'are'], answer: 2, tip: 'Con "they" la respuesta corta es "Yes, they are".' },
  { id: 'be-24', topic: 'to-be', prompt: 'Is it your book? — Yes, it ___.', options: ['is', 'are', 'am'], answer: 0, tip: 'Con "it" la respuesta corta es "Yes, it is".' },
]

export function questionsFor(topic: TopicId): Question[] {
  return QUESTIONS.filter((q) => q.topic === topic)
}

/** Devuelve una pregunta aleatoria evitando las ya usadas en este combate */
export function pickQuestion(topic: TopicId, used: string[]): Question {
  const pool = questionsFor(topic)
  const fresh = pool.filter((q) => !used.includes(q.id))
  const list = fresh.length > 0 ? fresh : pool
  return list[Math.floor(Math.random() * list.length)]
}

export const TOPICS: Record<TopicId, { name: string; level: 'A1' | 'A2' | 'B1'; lesson: string[] }> = {
  'to-be': {
    name: 'Verbo to be',
    level: 'A1',
    lesson: [
      'El verbo "to be" significa ser o estar.',
      'I → am  ·  he, she, it → is  ·  you, we, they → are',
      'Negativo: agrega "not" → I am not, she isn\'t, they aren\'t.',
      'Pregunta: el verbo va primero → Are you...? Is she...?',
    ],
  },
  'present-simple': {
    name: 'Presente simple',
    level: 'A1',
    lesson: ['Próximamente.'],
  },
  'past-simple': {
    name: 'Pasado simple',
    level: 'A2',
    lesson: ['Próximamente.'],
  },
  future: {
    name: 'Futuro',
    level: 'B1',
    lesson: ['Próximamente.'],
  },
}
