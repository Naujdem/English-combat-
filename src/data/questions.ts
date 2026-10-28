import type { Question, QuestionKind, TopicId } from '../game/types'

/**
 * Banco de preguntas.
 * Cada pregunta fue escrita y revisada a mano. Para agregar más, copia el formato:
 * - prompt: la frase con ___ en el espacio
 * - options: 2 a 4 opciones
 * - answer: posición de la opción correcta (empieza en 0)
 * - tip: explicación corta en español que da un amigo si fallas
 * - kind: 'fix' para "corregir al enemigo": prompt es la frase con error y
 *   options son frases completas, una de ellas la correcta
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

  // ── Verbo to be: corregir al enemigo ────────────────────
  { id: 'bf-01', topic: 'to-be', kind: 'fix', prompt: 'I is a student!', options: ['I am a student.', 'I are a student.', 'Me is a student.'], answer: 0, tip: 'Con "I" siempre va "am", nunca "is".' },
  { id: 'bf-02', topic: 'to-be', kind: 'fix', prompt: 'She are happy!', options: ['She am happy.', 'She is happy.', 'Her is happy.'], answer: 1, tip: 'Con "she" va "is". "Her" no puede ser el sujeto de la frase.' },
  { id: 'bf-03', topic: 'to-be', kind: 'fix', prompt: 'They is my friends!', options: ['They are my friends.', 'They am my friends.', 'Them are my friends.'], answer: 0, tip: 'Con "they" va "are". "Them" no puede ser el sujeto.' },
  { id: 'bf-04', topic: 'to-be', kind: 'fix', prompt: 'We is in the cafeteria!', options: ['We am in the cafeteria.', 'Us are in the cafeteria.', 'We are in the cafeteria.'], answer: 2, tip: 'Con "we" va "are". "Us" no puede ser el sujeto.' },
  { id: 'bf-05', topic: 'to-be', kind: 'fix', prompt: 'You is not my friend!', options: ['You are not my friend.', 'You not are my friend.', 'You am not my friend.'], answer: 0, tip: 'Con "you" va "are", y "not" va después del verbo: you are not.' },
  { id: 'bf-06', topic: 'to-be', kind: 'fix', prompt: 'He not is in class!', options: ['He not in class.', 'He is not in class.', 'He are not in class.'], answer: 1, tip: '"Not" va después del verbo: he is not o he isn\'t.' },
  { id: 'bf-07', topic: 'to-be', kind: 'fix', prompt: 'Is you ready?', options: ['Are you ready?', 'Am you ready?', 'You ready is?'], answer: 0, tip: 'Con "you" la pregunta empieza con "Are": Are you...?' },
  { id: 'bf-08', topic: 'to-be', kind: 'fix', prompt: 'Is they at school?', options: ['Is them at school?', 'Are they at school?', 'Am they at school?'], answer: 1, tip: 'Con "they" la pregunta empieza con "Are": Are they...?' },
  { id: 'bf-09', topic: 'to-be', kind: 'fix', prompt: 'The books is on the desk!', options: ['The book are on the desk.', 'The books am on the desk.', 'The books are on the desk.'], answer: 2, tip: '"The books" es plural, equivale a "they", así que va "are".' },
  { id: 'bf-10', topic: 'to-be', kind: 'fix', prompt: 'My parents is teachers!', options: ['My parents am teachers.', 'My parents are teachers.', 'My parent are teachers.'], answer: 1, tip: '"My parents" es plural, así que va "are".' },

  // ── Posesivos: completar ────────────────────────────────
  { id: 'po-01', topic: 'possessives', prompt: 'I am Ana. ___ name is Ana.', options: ['My', 'Me', 'I'], answer: 0, tip: '"My" significa "mi". "Me" significa "a mí" y no va antes de un sustantivo.' },
  { id: 'po-02', topic: 'possessives', prompt: 'You are new here. Is this ___ bag?', options: ['you', 'your', "you're"], answer: 1, tip: '"Your" significa "tu". "You\'re" es la contracción de "you are".' },
  { id: 'po-03', topic: 'possessives', prompt: 'Maya is my friend. ___ bag is pink.', options: ['His', 'She', 'Her'], answer: 2, tip: 'Para algo de una mujer se usa "her" (su, de ella).' },
  { id: 'po-04', topic: 'possessives', prompt: 'Leo has a cat. ___ cat is black.', options: ['His', 'He', 'Her'], answer: 0, tip: 'Para algo de un hombre se usa "his" (su, de él).' },
  { id: 'po-05', topic: 'possessives', prompt: 'We are students. ___ school is big.', options: ['Us', 'Our', 'We'], answer: 1, tip: '"Our" significa "nuestro" o "nuestra".' },
  { id: 'po-06', topic: 'possessives', prompt: 'They are my cousins. ___ house is near the park.', options: ['Their', 'There', 'They'], answer: 0, tip: '"Their" significa "su" (de ellos). "There" significa "allí". Suenan igual, pero se escriben distinto.' },
  { id: 'po-07', topic: 'possessives', prompt: 'The dog is hungry. ___ bowl is empty.', options: ["It's", 'Its', 'It'], answer: 1, tip: '"Its" sin apóstrofo significa "su" (de una cosa o animal). "It\'s" es "it is".' },
  { id: 'po-08', topic: 'possessives', prompt: 'This pen is from Leo. It is ___ pen.', options: ["Leo's", 'Leos', 'Leo'], answer: 0, tip: 'Para decir que algo es de alguien se agrega \'s: Leo\'s pen = el bolígrafo de Leo.' },
  { id: 'po-09', topic: 'possessives', prompt: 'Mr. Grimm is a teacher. ___ classroom is very quiet.', options: ['Her', 'His', 'He'], answer: 1, tip: 'Mr. Grimm es un hombre, así que su salón es "his classroom".' },
  { id: 'po-10', topic: 'possessives', prompt: 'I love ___ family.', options: ['me', 'mine', 'my'], answer: 2, tip: 'Antes de un sustantivo se usa "my": my family.' },
  { id: 'po-11', topic: 'possessives', prompt: 'Ana and Sam are here. Where are ___ books?', options: ['their', 'they', 'them'], answer: 0, tip: 'Para algo de varias personas se usa "their".' },
  { id: 'po-12', topic: 'possessives', prompt: 'Hello! What is ___ name?', options: ['your', 'you', 'yours'], answer: 0, tip: 'Para preguntar el nombre de alguien: What is your name?' },

  // ── Posesivos: corregir al enemigo ──────────────────────
  { id: 'pf-01', topic: 'possessives', kind: 'fix', prompt: 'Me name is Grimm!', options: ['My name is Grimm.', 'I name is Grimm.', 'Mine name is Grimm.'], answer: 0, tip: 'Antes de un sustantivo va "my": my name.' },
  { id: 'pf-02', topic: 'possessives', kind: 'fix', prompt: 'This is she book!', options: ['This is hers book.', 'This is her book.', "This is she's book."], answer: 1, tip: 'Para algo de una mujer, antes del sustantivo va "her": her book.' },
  { id: 'pf-03', topic: 'possessives', kind: 'fix', prompt: 'He is my brother. Her name is Tom!', options: ['His name is Tom.', 'He name is Tom.', 'Him name is Tom.'], answer: 0, tip: 'Tom es un hombre, así que es "his name".' },
  { id: 'pf-04', topic: 'possessives', kind: 'fix', prompt: 'They books are old!', options: ['There books are old.', 'Them books are old.', 'Their books are old.'], answer: 2, tip: 'Para algo de ellos se usa "their": their books.' },
  { id: 'pf-05', topic: 'possessives', kind: 'fix', prompt: 'This is Maya bag!', options: ["This is Maya's bag.", 'This is Mayas bag.', 'This is bag Maya.'], answer: 0, tip: 'Para decir que algo es de alguien se agrega \'s al nombre: Maya\'s bag.' },
  { id: 'pf-06', topic: 'possessives', kind: 'fix', prompt: 'We love us school!', options: ['We love we school.', 'We love our school.', 'We love ours school.'], answer: 1, tip: 'Para algo de nosotros, antes del sustantivo va "our": our school.' },
  { id: 'pf-07', topic: 'possessives', kind: 'fix', prompt: "The cat is sad. It's leg hurts!", options: ['Its leg hurts.', 'It leg hurts.', "Its' leg hurts."], answer: 0, tip: '"It\'s" es "it is". Para "su" (de un animal) va "its" sin apóstrofo.' },
  { id: 'pf-08', topic: 'possessives', kind: 'fix', prompt: 'Where is you book?', options: ['Where is yours book?', "Where is you're book?", 'Where is your book?'], answer: 2, tip: 'Para "tu" antes de un sustantivo va "your": your book.' },
]

export function questionsFor(topics: TopicId[], kinds: QuestionKind[] = ['fill', 'fix']): Question[] {
  return QUESTIONS.filter((q) => topics.includes(q.topic) && kinds.includes(q.kind ?? 'fill'))
}

/** Devuelve una pregunta aleatoria evitando las ya usadas en este combate */
export function pickQuestion(topics: TopicId[], kinds: QuestionKind[], used: string[]): Question {
  const pool = questionsFor(topics, kinds)
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
  possessives: {
    name: 'Posesivos',
    level: 'A1',
    lesson: [
      'Los posesivos dicen de quién es algo y van antes del sustantivo.',
      'I → my  ·  you → your  ·  he → his  ·  she → her  ·  it → its',
      'we → our  ·  they → their',
      "Para nombres se agrega 's: Leo's bag = la mochila de Leo.",
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
