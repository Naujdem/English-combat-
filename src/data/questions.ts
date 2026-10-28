import type { Question, QuestionKind, TopicId } from '../game/types'
import { canSpeak } from '../game/speech'

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
  // ── Saludos y presentación (entrenamiento con Leo) ──────
  { id: 'gr-01', topic: 'greetings', prompt: "It's 9 p.m. You leave a party. You say: Good ___!", options: ['night', 'morning', 'afternoon'], answer: 0, tip: 'Para despedirse en la noche se dice "Good night".' },
  { id: 'gr-02', topic: 'greetings', prompt: '___ is your name?', options: ['Who', 'What', 'How'], answer: 1, tip: 'Para preguntar el nombre: What is your name?' },
  { id: 'gr-03', topic: 'greetings', prompt: "How ___ you? — I'm fine, thanks.", options: ['is', 'am', 'are'], answer: 2, tip: 'Con "you" va "are": How are you?' },
  { id: 'gr-04', topic: 'greetings', prompt: 'I ___ from Colombia.', options: ['am', 'is', 'are'], answer: 0, tip: 'Con "I" va "am": I am from...' },
  { id: 'gr-05', topic: 'greetings', prompt: 'Where ___ you from?', options: ['is', 'are', 'am'], answer: 1, tip: 'Con "you" va "are": Where are you from?' },
  { id: 'gr-06', topic: 'greetings', prompt: 'She is from Mexico. She is ___.', options: ['Mexico', 'Mexicans', 'Mexican'], answer: 2, tip: 'La nacionalidad de México es "Mexican", y va con mayúscula.' },
  { id: 'gr-07', topic: 'greetings', prompt: 'How old ___ you?', options: ['are', 'is', 'do'], answer: 0, tip: 'Para la edad se usa TO BE: How old are you?' },
  { id: 'gr-08', topic: 'greetings', prompt: 'I am fifteen years ___.', options: ['age', 'old', 'years'], answer: 1, tip: 'La edad se dice: I am ... years old.' },
  { id: 'gr-09', topic: 'greetings', prompt: '___ morning, teacher!', options: ['Fine', 'Hello', 'Good'], answer: 2, tip: 'El saludo de la mañana es "Good morning".' },
  { id: 'gr-10', topic: 'greetings', prompt: 'He is from the United States. He is ___.', options: ['American', 'United', 'States'], answer: 0, tip: 'La nacionalidad de Estados Unidos es "American".' },
  { id: 'gr-11', topic: 'greetings', prompt: 'Maya is from Peru. ___ is Peruvian.', options: ['Her', 'She', 'He'], answer: 1, tip: 'Maya es mujer y es el sujeto, así que va "She".' },

  { id: 'gf-01', topic: 'greetings', kind: 'fix', prompt: 'I have 15 years!', options: ['I have 15 years old.', 'I am 15 years old.', 'I is 15 years.'], answer: 1, tip: 'En inglés la edad se dice con TO BE: I am 15 years old. Nunca "I have".' },
  { id: 'gf-02', topic: 'greetings', kind: 'fix', prompt: 'I am from Colombian!', options: ['I am from Colombia.', 'I am from Colombians.', 'I from Colombia.'], answer: 0, tip: 'Después de "from" va el país: from Colombia. La nacionalidad va sin "from": I am Colombian.' },
  { id: 'gf-03', topic: 'greetings', kind: 'fix', prompt: 'What is you name?', options: ['What are your name?', 'What your name is?', 'What is your name?'], answer: 2, tip: 'Antes de "name" va el posesivo "your": What is your name?' },
  { id: 'gf-04', topic: 'greetings', kind: 'fix', prompt: 'How you are?', options: ['How is you?', 'How are you?', 'How you is?'], answer: 1, tip: 'En preguntas el verbo va antes del sujeto: How are you?' },
  { id: 'gf-05', topic: 'greetings', kind: 'fix', prompt: 'Where is you from?', options: ['Where are you from?', 'Where you are from?', 'Where am you from?'], answer: 0, tip: 'Con "you" va "are", y va antes del sujeto: Where are you from?' },
  { id: 'gf-06', topic: 'greetings', kind: 'fix', prompt: 'She are Mexican!', options: ['She is Mexico.', 'Her is Mexican.', 'She is Mexican.'], answer: 2, tip: 'Con "she" va "is", y la nacionalidad es "Mexican".' },

  { id: 'go-01', topic: 'greetings', kind: 'order', prompt: 'Mucho gusto.', options: ['Nice', 'to', 'meet', 'you.'], answer: 0, tip: '"Nice to meet you" significa "mucho gusto".' },
  { id: 'go-02', topic: 'greetings', kind: 'order', prompt: '¿De dónde eres?', options: ['Where', 'are', 'you', 'from?'], answer: 0, tip: 'Where + are + you + from?' },
  { id: 'go-03', topic: 'greetings', kind: 'order', prompt: 'Tengo quince años.', options: ['I', 'am', 'fifteen', 'years', 'old.'], answer: 0, tip: 'La edad: I am + número + years old.' },
  { id: 'go-04', topic: 'greetings', kind: 'order', prompt: '¿Cómo te llamas?', options: ['What', 'is', 'your', 'name?'], answer: 0, tip: 'What is your name? = ¿Cuál es tu nombre?' },
  { id: 'go-05', topic: 'greetings', kind: 'order', prompt: 'Soy de Colombia.', options: ['I', 'am', 'from', 'Colombia.'], answer: 0, tip: 'I am from + país.' },
  { id: 'go-06', topic: 'greetings', kind: 'order', prompt: 'Ella es colombiana.', options: ['She', 'is', 'Colombian.'], answer: 0, tip: 'She is + nacionalidad. La nacionalidad va con mayúscula.' },

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

  // ── Ordenar palabras ────────────────────────────────────
  // prompt: frase en español · options: palabras en el orden correcto (el juego las desordena)
  { id: 'bo-01', topic: 'to-be', kind: 'order', prompt: 'Soy estudiante.', options: ['I', 'am', 'a', 'student.'], answer: 0, tip: 'Primero el sujeto (I), luego el verbo (am) y después el resto.' },
  { id: 'bo-02', topic: 'to-be', kind: 'order', prompt: 'Ella no está en casa.', options: ['She', 'is', 'not', 'at', 'home.'], answer: 0, tip: '"Not" va después del verbo: She is not...' },
  { id: 'bo-03', topic: 'to-be', kind: 'order', prompt: '¿Eres el nuevo estudiante?', options: ['Are', 'you', 'the', 'new', 'student?'], answer: 0, tip: 'En preguntas el verbo va primero: Are you...?' },
  { id: 'bo-04', topic: 'to-be', kind: 'order', prompt: 'Ellos son mis amigos.', options: ['They', 'are', 'my', 'friends.'], answer: 0, tip: 'Sujeto (They) + verbo (are) + el resto.' },
  { id: 'bo-05', topic: 'to-be', kind: 'order', prompt: '¿Está el profesor en el salón?', options: ['Is', 'the', 'teacher', 'in', 'the', 'classroom?'], answer: 0, tip: 'La pregunta empieza con el verbo: Is the teacher...?' },
  { id: 'bo-06', topic: 'to-be', kind: 'order', prompt: 'Nosotros no estamos cansados.', options: ['We', 'are', 'not', 'tired.'], answer: 0, tip: 'We + are + not + el resto.' },
  { id: 'pr-01', topic: 'possessives', kind: 'order', prompt: 'Mi nombre es Leo.', options: ['My', 'name', 'is', 'Leo.'], answer: 0, tip: 'El posesivo va antes del sustantivo: My name...' },
  { id: 'pr-02', topic: 'possessives', kind: 'order', prompt: 'Su mochila (de ella) es roja.', options: ['Her', 'bag', 'is', 'red.'], answer: 0, tip: '"Her" va antes de "bag". En inglés el color va después del verbo.' },
  { id: 'pr-03', topic: 'possessives', kind: 'order', prompt: '¿Este es tu libro?', options: ['Is', 'this', 'your', 'book?'], answer: 0, tip: 'La pregunta empieza con el verbo: Is this...? Y "your" va antes de "book".' },
  { id: 'pr-04', topic: 'possessives', kind: 'order', prompt: 'Su profesor (de ellos) es amable.', options: ['Their', 'teacher', 'is', 'nice.'], answer: 0, tip: '"Their" va antes de "teacher".' },
  { id: 'pr-05', topic: 'possessives', kind: 'order', prompt: 'Esta es la mesa de Maya.', options: ['This', 'is', "Maya's", 'table.'], answer: 0, tip: "\"Maya's table\": el nombre con 's va antes de la cosa." },
  { id: 'pr-06', topic: 'possessives', kind: 'order', prompt: 'Nuestra escuela es grande.', options: ['Our', 'school', 'is', 'big.'], answer: 0, tip: '"Our" va antes de "school".' },
]

/** Pregunta de escucha generada a partir de una de completar */
function toListen(q: Question): Question {
  const sentences = q.options.map((o) => q.prompt.replace('___', o))
  return {
    id: `L-${q.id}`,
    topic: q.topic,
    kind: 'listen',
    prompt: sentences[q.answer],
    options: sentences,
    answer: q.answer,
    tip: `Se escuchaba: "${sentences[q.answer]}" ${q.tip}`,
  }
}

function canListen(q: Question) {
  return (q.kind ?? 'fill') === 'fill' && q.prompt.split('___').length === 2
}

export function questionsFor(topics: TopicId[], kinds: QuestionKind[] = ['fill', 'fix', 'order', 'listen']): Question[] {
  const list: Question[] = []
  for (const q of QUESTIONS) {
    if (!topics.includes(q.topic)) continue
    if (kinds.includes(q.kind ?? 'fill')) list.push(q)
    if (kinds.includes('listen') && canSpeak && canListen(q)) list.push(toListen(q))
  }
  return list
}

export function questionById(id: string): Question | undefined {
  if (id.startsWith('L-')) {
    const base = QUESTIONS.find((q) => q.id === id.slice(2))
    return base && canSpeak ? toListen(base) : undefined
  }
  return QUESTIONS.find((q) => q.id === id)
}

/**
 * Devuelve una pregunta aleatoria evitando las ya usadas en este combate.
 * Las preguntas del cuaderno de errores salen con más frecuencia hasta que se acierten.
 */
export function pickQuestion(topics: TopicId[], kinds: QuestionKind[], used: string[], mistakes: string[] = []): Question {
  const pool = questionsFor(topics, kinds)
  const fresh = pool.filter((q) => !used.includes(q.id))
  const list = fresh.length > 0 ? fresh : pool
  const pending = list.filter((q) => mistakes.includes(q.id))
  if (pending.length > 0 && Math.random() < 0.45) return pending[Math.floor(Math.random() * pending.length)]
  // Primero se elige el tipo de pregunta al azar, para que haya variedad
  const available = kinds.filter((k) => list.some((q) => (q.kind ?? 'fill') === k))
  const kind = available[Math.floor(Math.random() * available.length)]
  const ofKind = list.filter((q) => (q.kind ?? 'fill') === kind)
  return ofKind[Math.floor(Math.random() * ofKind.length)]
}

export const TOPICS: Record<TopicId, { name: string; level: 'A1' | 'A2' | 'B1'; lesson: string[] }> = {
  greetings: {
    name: 'Saludos y presentación',
    level: 'A1',
    lesson: [
      'Saludos: Hello, Hi, Good morning, Good afternoon, Good night.',
      'What is your name? → My name is...',
      'How old are you? → I am 15 years old.',
      'Where are you from? → I am from Colombia. I am Colombian.',
    ],
  },
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
