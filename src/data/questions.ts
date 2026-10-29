import type { Question, QuestionKind, TopicId } from '../game/types'
import { canSpeak } from '../game/speech'
import { canRecognize } from '../game/mic'
import { BARRIO_QUESTIONS } from './questions-barrio'
import { FARM_QUESTIONS } from './questions-farm'
import { OFFICE_QUESTIONS } from './questions-office'
import { EXTRA_QUESTIONS } from './questions-extra'
import { PAST_QUESTIONS } from './questions-past'
import { FUTURE_QUESTIONS } from './questions-future'

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

  // ── Preguntas de lugar: aula (Tom) ──────────────────────
  { id: 'ta-01', topic: 'to-be', tags: ['aula'], prompt: 'The board ___ big and green.', options: ['is', 'are', 'am'], answer: 0, tip: '"The board" es una sola cosa, así que va "is".' },
  { id: 'ta-02', topic: 'to-be', tags: ['aula'], prompt: 'The desks ___ old.', options: ['is', 'are', 'am'], answer: 1, tip: '"The desks" es plural, así que va "are".' },
  { id: 'ta-03', topic: 'to-be', tags: ['aula'], prompt: 'Mr. Grimm ___ not in the classroom today.', options: ['is', 'are', 'am'], answer: 0, tip: 'Mr. Grimm es una persona (he), así que va "is".' },
  { id: 'ta-04', topic: 'to-be', tags: ['aula'], prompt: '___ your pencils in your bag?', options: ['Is', 'Are', 'Am'], answer: 1, tip: '"Your pencils" es plural, así que la pregunta empieza con "Are".' },
  { id: 'ta-05', topic: 'to-be', tags: ['aula'], prompt: 'My classmates ___ very loud!', options: ['is', 'am', 'are'], answer: 2, tip: '"My classmates" (mis compañeros) es plural: va "are".' },
  { id: 'ta-06', topic: 'to-be', tags: ['aula'], prompt: 'I ___ the funniest student in this class!', options: ['am', 'is', 'are'], answer: 0, tip: 'Con "I" siempre va "am".' },
  { id: 'ta-07', topic: 'to-be', tags: ['aula'], prompt: 'The windows ___ open.', options: ['is', 'are', 'am'], answer: 1, tip: '"The windows" es plural, así que va "are".' },
  { id: 'tao-01', topic: 'to-be', tags: ['aula'], kind: 'order', prompt: 'La pizarra es verde.', options: ['The', 'board', 'is', 'green.'], answer: 0, tip: 'The board + is + green.' },
  { id: 'tao-02', topic: 'to-be', tags: ['aula'], kind: 'order', prompt: '¿Estás en mi clase?', options: ['Are', 'you', 'in', 'my', 'class?'], answer: 0, tip: 'La pregunta empieza con el verbo: Are you...?' },
  { id: 'tao-03', topic: 'to-be', tags: ['aula'], kind: 'order', prompt: 'Los libros están sobre el pupitre.', options: ['The', 'books', 'are', 'on', 'the', 'desk.'], answer: 0, tip: 'The books + are + on the desk.' },

  // ── Preguntas de lugar: baño (Rick, el presumido) ───────
  { id: 'trf-01', topic: 'to-be', tags: ['bano'], kind: 'fix', prompt: 'I are the smartest student!', options: ['I am the smartest student.', 'I is the smartest student.', 'Me am the smartest student.'], answer: 0, tip: 'Con "I" va "am".' },
  { id: 'trf-02', topic: 'to-be', tags: ['bano'], kind: 'fix', prompt: 'This mirror are beautiful, like me!', options: ['This mirror am beautiful, like me.', 'This mirror is beautiful, like me.', 'This mirrors is beautiful, like me.'], answer: 1, tip: '"This mirror" es una sola cosa, así que va "is".' },
  { id: 'trf-03', topic: 'to-be', tags: ['bano'], kind: 'fix', prompt: 'My hair are perfect!', options: ['My hairs is perfect.', 'My hair am perfect.', 'My hair is perfect.'], answer: 2, tip: 'En inglés "hair" (cabello) es incontable, como una sola cosa: va "is".' },
  { id: 'trf-04', topic: 'to-be', tags: ['bano'], kind: 'fix', prompt: 'The sinks is clean today!', options: ['The sinks are clean today.', 'The sink are clean today.', 'The sinks am clean today.'], answer: 0, tip: '"The sinks" es plural, así que va "are".' },
  { id: 'trf-05', topic: 'to-be', tags: ['bano'], kind: 'fix', prompt: "You isn't smart like me!", options: ['You not smart like me.', "You aren't smart like me.", "You amn't smart like me."], answer: 1, tip: 'Con "you" la negación es "are not" o "aren\'t".' },
  { id: 'trf-06', topic: 'to-be', tags: ['bano'], kind: 'fix', prompt: 'Am you jealous of me?', options: ['Are you jealous of me?', 'Is you jealous of me?', 'You jealous are of me?'], answer: 0, tip: 'Con "you" la pregunta empieza con "Are".' },
  { id: 'trf-07', topic: 'to-be', tags: ['bano'], kind: 'fix', prompt: 'The bathroom are my office!', options: ['The bathroom am my office.', 'The bathrooms is my office.', 'The bathroom is my office.'], answer: 2, tip: '"The bathroom" es un solo lugar, así que va "is".' },
  { id: 'trf-08', topic: 'to-be', tags: ['bano'], kind: 'fix', prompt: 'We is the best students!', options: ['We are the best students.', 'We am the best students.', 'Us are the best students.'], answer: 0, tip: 'Con "we" va "are". "Us" no puede ser el sujeto.' },

  // ── Preguntas de lugar: cafetería (Bella, la egoísta) ───
  { id: 'tc-01', topic: 'possessives', tags: ['cafeteria'], prompt: 'This is ___ sandwich, not yours!', options: ['my', 'me', 'mine'], answer: 0, tip: 'Antes de un sustantivo va "my": my sandwich.' },
  { id: 'tc-02', topic: 'possessives', tags: ['cafeteria'], prompt: 'Excuse me, is this ___ juice?', options: ['your', 'you', 'yours'], answer: 0, tip: 'Antes de un sustantivo va "your": your juice.' },
  { id: 'tc-03', topic: 'possessives', tags: ['cafeteria'], prompt: 'Maya loves cooking. ___ sandwiches are the best.', options: ['Her', 'His', 'She'], answer: 0, tip: 'Maya es mujer: her sandwiches.' },
  { id: 'tc-04', topic: 'possessives', tags: ['cafeteria'], prompt: 'The cook is a man. ___ soup is delicious.', options: ['Her', 'His', 'Its'], answer: 1, tip: 'El cocinero es un hombre: his soup.' },
  { id: 'tc-05', topic: 'possessives', tags: ['cafeteria'], prompt: 'We sit here every day. This is ___ table.', options: ['our', 'us', 'we'], answer: 0, tip: 'Para algo de nosotros: our table.' },
  { id: 'tc-06', topic: 'possessives', tags: ['cafeteria'], prompt: 'These apples are from Leo. They are ___ apples.', options: ['Leos', "Leo's", 'Leo'], answer: 1, tip: "Para decir de quién es algo se agrega 's al nombre: Leo's apples." },
  { id: 'tc-07', topic: 'possessives', tags: ['cafeteria'], prompt: 'The cafeteria is big. ___ windows are huge.', options: ["It's", 'It', 'Its'], answer: 2, tip: '"Its" sin apóstrofo: las ventanas de la cafetería.' },
  { id: 'tcf-01', topic: 'possessives', tags: ['cafeteria'], kind: 'fix', prompt: 'This is me lunch!', options: ['This is my lunch.', 'This is I lunch.', 'This is mine lunch.'], answer: 0, tip: 'Antes de un sustantivo va "my": my lunch.' },
  { id: 'tcf-02', topic: 'possessives', tags: ['cafeteria'], kind: 'fix', prompt: 'Give me you pizza!', options: ["Give me you're pizza.", 'Give me your pizza.', 'Give me yours pizza.'], answer: 1, tip: 'Antes de un sustantivo va "your": your pizza.' },
  { id: 'tcf-03', topic: 'possessives', tags: ['cafeteria'], kind: 'fix', prompt: 'Maya and Leo eat they lunch here!', options: ['Maya and Leo eat there lunch here.', 'Maya and Leo eat them lunch here.', 'Maya and Leo eat their lunch here.'], answer: 2, tip: 'Para algo de ellos va "their": their lunch.' },
  { id: 'tcf-04', topic: 'possessives', tags: ['cafeteria'], kind: 'fix', prompt: 'This is the table of me!', options: ['This is my table.', 'This is me table.', 'This is table my.'], answer: 0, tip: 'En inglés el posesivo va antes: my table.' },
  { id: 'tco-01', topic: 'possessives', tags: ['cafeteria'], kind: 'order', prompt: 'Este es mi sándwich.', options: ['This', 'is', 'my', 'sandwich.'], answer: 0, tip: 'This is + my + sandwich.' },
  { id: 'tco-02', topic: 'possessives', tags: ['cafeteria'], kind: 'order', prompt: '¿Es este tu jugo?', options: ['Is', 'this', 'your', 'juice?'], answer: 0, tip: 'La pregunta empieza con "Is": Is this your juice?' },
  { id: 'tco-03', topic: 'possessives', tags: ['cafeteria'], kind: 'order', prompt: 'Su pizza (de él) está caliente.', options: ['His', 'pizza', 'is', 'hot.'], answer: 0, tip: '"His" va antes de "pizza".' },

  // ── Preguntas de lugar: sala de profesores (Grimm) ──────
  { id: 'ts-01', topic: 'to-be', tags: ['sala'], prompt: 'My desk ___ full of papers.', options: ['is', 'are', 'am'], answer: 0, tip: '"My desk" es una sola cosa: va "is".' },
  { id: 'ts-02', topic: 'to-be', tags: ['sala'], prompt: 'Your words ___ in my desk now!', options: ['are', 'is', 'am'], answer: 0, tip: '"Your words" es plural: va "are".' },
  { id: 'ts-03', topic: 'possessives', tags: ['sala'], prompt: 'The students are in ___ classroom. (de ellos)', options: ['there', 'their', 'they'], answer: 1, tip: '"Their" significa "de ellos". "There" significa "allí".' },
  { id: 'tsf-01', topic: 'to-be', tags: ['sala'], kind: 'fix', prompt: 'They is my words now!', options: ['They are my words now.', 'They am my words now.', 'Them are my words now.'], answer: 0, tip: 'Con "they" va "are".' },
  { id: 'tsf-02', topic: 'possessives', tags: ['sala'], kind: 'fix', prompt: 'I am you teacher!', options: ['I is your teacher.', 'I am your teacher.', 'I am yours teacher.'], answer: 1, tip: 'Antes de "teacher" va "your": I am your teacher.' },
  { id: 'tsf-03', topic: 'possessives', tags: ['sala'], kind: 'fix', prompt: 'This is mine classroom!', options: ['This is me classroom.', 'This is I classroom.', 'This is my classroom.'], answer: 2, tip: '"Mine" va solo, sin sustantivo. Antes de "classroom" va "my".' },
  { id: 'tso-01', topic: 'possessives', tags: ['sala'], kind: 'order', prompt: 'Tus palabras están en mi escritorio.', options: ['Your', 'words', 'are', 'in', 'my', 'desk.'], answer: 0, tip: 'Your words + are + in my desk.' },

  // ── Preguntas de lugar: patio (Max, el competitivo) ─────
  { id: 'tp-01', topic: 'to-be', tags: ['patio'], prompt: 'Football ___ my favorite sport.', options: ['is', 'are', 'am'], answer: 0, tip: '"Football" es un deporte, una sola cosa: va "is".' },
  { id: 'tp-02', topic: 'to-be', tags: ['patio'], prompt: 'The players ___ on the field.', options: ['is', 'are', 'am'], answer: 1, tip: '"The players" es plural: va "are".' },
  { id: 'tp-03', topic: 'possessives', tags: ['patio'], prompt: 'This is ___ ball. Give it back!', options: ['me', 'my', 'mine'], answer: 1, tip: 'Antes de "ball" va "my": my ball.' },
  { id: 'tp-04', topic: 'possessives', tags: ['patio'], prompt: 'Max and Ben are on a team. ___ team is the best.', options: ['Their', 'There', 'They'], answer: 0, tip: 'Para algo de ellos: their team.' },
  { id: 'tp-05', topic: 'to-be', tags: ['patio'], prompt: '___ you fast? — Yes, I am!', options: ['Are', 'Is', 'Am'], answer: 0, tip: 'Con "you" la pregunta empieza con "Are".' },
  { id: 'tp-06', topic: 'to-be', tags: ['patio'], prompt: 'The coach ___ strict.', options: ['are', 'is', 'am'], answer: 1, tip: '"The coach" es una persona (he): va "is".' },
  { id: 'tp-07', topic: 'to-be', tags: ['patio'], prompt: 'My shoes ___ new.', options: ['is', 'am', 'are'], answer: 2, tip: '"My shoes" es plural: va "are".' },
  { id: 'tpf-01', topic: 'to-be', tags: ['patio'], kind: 'fix', prompt: 'I are the best player!', options: ['I am the best player.', 'I is the best player.', 'I are the best players.'], answer: 0, tip: 'Con "I" va "am".' },
  { id: 'tpf-02', topic: 'possessives', tags: ['patio'], kind: 'fix', prompt: 'This is me ball!', options: ['This is mine ball.', 'This is my ball.', 'This is I ball.'], answer: 1, tip: 'Antes de un sustantivo va "my": my ball.' },
  { id: 'tpf-03', topic: 'to-be', tags: ['patio'], kind: 'fix', prompt: 'We is the champions!', options: ['We are the champions.', 'We am the champions.', 'Us are the champions.'], answer: 0, tip: 'Con "we" va "are".' },
  { id: 'tpf-04', topic: 'to-be', tags: ['patio'], kind: 'fix', prompt: 'The ball are red!', options: ['The ball am red.', 'The balls is red.', 'The ball is red.'], answer: 2, tip: '"The ball" es una sola cosa: va "is".' },
  { id: 'tpo-01', topic: 'possessives', tags: ['patio'], kind: 'order', prompt: 'El fútbol es mi deporte favorito.', options: ['Football', 'is', 'my', 'favorite', 'sport.'], answer: 0, tip: 'Football + is + my favorite sport.' },
  { id: 'tpo-02', topic: 'possessives', tags: ['patio'], kind: 'order', prompt: '¿Es esta tu pelota?', options: ['Is', 'this', 'your', 'ball?'], answer: 0, tip: 'La pregunta empieza con "Is": Is this your ball?' },
  { id: 'tpo-03', topic: 'to-be', tags: ['patio'], kind: 'order', prompt: 'Nosotros somos un equipo.', options: ['We', 'are', 'a', 'team.'], answer: 0, tip: 'We + are + a team.' },
  // ── Preposiciones de lugar (aula, baño, cafetería, biblioteca) ──
  { id: 'pp-01', topic: 'prepositions', tags: ['aula'], prompt: 'Your pencil is ___ the desk.', hint: 'encima de', options: ['on', 'under', 'in'], answer: 0, tip: '"On" es encima de algo, tocándolo: on the desk.' },
  { id: 'pp-02', topic: 'prepositions', tags: ['aula'], prompt: 'Your bag is ___ the chair.', hint: 'debajo de', options: ['on', 'under', 'next to'], answer: 1, tip: '"Under" es debajo de: under the chair.' },
  { id: 'pp-03', topic: 'prepositions', tags: ['aula'], prompt: 'The books are ___ my bag.', hint: 'dentro de', options: ['in', 'on', 'between'], answer: 0, tip: '"In" es dentro de: in my bag.' },
  { id: 'pp-04', topic: 'prepositions', tags: ['aula'], prompt: 'Ana sits ___ the window.', hint: 'al lado de', options: ['under', 'in', 'next to'], answer: 2, tip: '"Next to" es al lado de: next to the window.' },
  { id: 'pp-05', topic: 'prepositions', tags: ['aula'], prompt: 'The board is ___ the two windows.', hint: 'entre', options: ['between', 'next', 'in front'], answer: 0, tip: '"Between" es entre dos cosas: between the two windows.' },
  { id: 'pp-06', topic: 'prepositions', tags: ['aula'], prompt: 'Mr. Grimm stands ___ the students.', hint: 'delante de', options: ['in front of', 'in front', 'front of'], answer: 0, tip: 'Delante de se dice completo: "in front of".' },
  { id: 'pp-07', topic: 'prepositions', tags: ['aula'], prompt: 'The clock is ___ the wall.', options: ['on', 'under', 'between'], answer: 0, tip: 'Las cosas colgadas en la pared están "on the wall".' },
  { id: 'pp-08', topic: 'prepositions', tags: ['bano'], prompt: 'The soap is ___ the sink.', hint: 'al lado de', options: ['next to', 'next', 'in front'], answer: 0, tip: 'Al lado de se dice "next to", siempre con "to".' },
  { id: 'pp-09', topic: 'prepositions', tags: ['bano'], prompt: 'Rick is ___ the bathroom.', options: ['in', 'on', 'under'], answer: 0, tip: 'Para estar dentro de un lugar se usa "in": in the bathroom.' },
  { id: 'pp-10', topic: 'prepositions', tags: ['cafeteria'], prompt: 'The pizza is ___ the table.', hint: 'encima de', options: ['under', 'on', 'in'], answer: 1, tip: '"On the table" = sobre la mesa.' },
  { id: 'pp-11', topic: 'prepositions', tags: ['cafeteria'], prompt: 'The milk is ___ the fridge.', options: ['on', 'in', 'next'], answer: 1, tip: 'Dentro de la nevera: "in the fridge".' },
  { id: 'pp-12', topic: 'prepositions', tags: ['cafeteria'], prompt: 'Bella sits ___ Leo and Maya.', hint: 'entre', options: ['between', 'next', 'under'], answer: 0, tip: '"Between" se usa entre dos personas o cosas: between Leo and Maya.' },
  { id: 'pp-13', topic: 'prepositions', tags: ['sala'], prompt: 'Your words are ___ Mr. Grimm\'s desk.', hint: 'dentro de', options: ['in', 'on', 'between'], answer: 0, tip: 'Guardadas dentro del escritorio: "in the desk".' },
  { id: 'pp-14', topic: 'prepositions', tags: ['patio'], prompt: 'The ball is ___ the tree.', hint: 'detrás de', options: ['behind', 'between', 'in front'], answer: 0, tip: '"Behind" es detrás de: behind the tree.' },
  { id: 'pp-15', topic: 'to-be', prompt: 'Where ___ my keys? — They are on the table.', options: ['is', 'are', 'am'], answer: 1, tip: '"My keys" es plural: Where are my keys?' },

  { id: 'ppf-01', topic: 'prepositions', tags: ['aula'], kind: 'fix', prompt: 'Your book is in the desk!', options: ['Your book is on the desk.', 'Your book is at the desk on.', 'Your book on the desk.'], answer: 0, tip: 'Encima de una superficie es "on": on the desk. Y no olvides el verbo "is".' },
  { id: 'ppf-02', topic: 'prepositions', tags: ['aula'], kind: 'fix', prompt: 'The bag is next the chair!', options: ['The bag is next of the chair.', 'The bag is next to the chair.', 'The bag next to the chair.'], answer: 1, tip: '"Next to" siempre lleva "to". No es "next of".' },
  { id: 'ppf-03', topic: 'prepositions', tags: ['cafeteria'], kind: 'fix', prompt: 'I sit between Leo with Maya!', options: ['I sit between Leo and Maya.', 'I sit between of Leo and Maya.', 'I sit Leo between Maya.'], answer: 0, tip: '"Between" va con "and": between Leo and Maya.' },
  { id: 'ppf-04', topic: 'prepositions', tags: ['sala'], kind: 'fix', prompt: 'The teacher is in front the class!', options: ['The teacher is front of the class.', 'The teacher is in front to the class.', 'The teacher is in front of the class.'], answer: 2, tip: 'Delante de es "in front of", con "of".' },
  { id: 'ppf-05', topic: 'prepositions', tags: ['bano'], kind: 'fix', prompt: 'The towel is under of the sink!', options: ['The towel is under the sink.', 'The towel under is the sink.', 'The towel is of under the sink.'], answer: 0, tip: '"Under" va solo, sin "of": under the sink.' },

  { id: 'ppo-01', topic: 'prepositions', tags: ['aula'], kind: 'order', prompt: 'Mi lápiz está sobre el pupitre.', options: ['My', 'pencil', 'is', 'on', 'the', 'desk.'], answer: 0, tip: 'My pencil + is + on the desk.' },
  { id: 'ppo-02', topic: 'prepositions', tags: ['aula'], kind: 'order', prompt: '¿Dónde está mi mochila?', options: ['Where', 'is', 'my', 'bag?'], answer: 0, tip: 'Para preguntar dónde está algo: Where is...?' },
  { id: 'ppo-03', topic: 'prepositions', tags: ['cafeteria'], kind: 'order', prompt: 'La cafetería está al lado de la biblioteca.', options: ['The', 'cafeteria', 'is', 'next', 'to', 'the', 'library.'], answer: 0, tip: 'The cafeteria + is + next to + the library.' },
  { id: 'ppo-04', topic: 'prepositions', tags: ['patio'], kind: 'order', prompt: 'La pelota está debajo de la banca.', options: ['The', 'ball', 'is', 'under', 'the', 'bench.'], answer: 0, tip: 'The ball + is + under + the bench.' },

  // ── Imperativos (órdenes del profesor y del entrenador) ──
  { id: 'im-01', topic: 'imperatives', tags: ['aula'], prompt: '___ your books, please. Page ten.', options: ['Open', 'Opens', 'To open'], answer: 0, tip: 'Las órdenes empiezan con el verbo tal cual, sin sujeto: Open your books.' },
  { id: 'im-02', topic: 'imperatives', tags: ['aula'], prompt: '___ down, please. The class is starting.', options: ['Sits', 'Sit', 'You sit'], answer: 1, tip: 'La orden es "Sit down", con el verbo sin -s y sin "you".' },
  { id: 'im-03', topic: 'imperatives', tags: ['aula'], prompt: "___ talk in class! It's a test.", options: ['No', 'Not', "Don't"], answer: 2, tip: 'Para prohibir algo: Don\'t + verbo. "Don\'t talk!"' },
  { id: 'im-04', topic: 'imperatives', tags: ['aula'], prompt: 'Please ___ to me. This is important.', options: ['listen', 'listens', 'listening'], answer: 0, tip: 'Después de "please" va el verbo tal cual: Please listen.' },
  { id: 'im-05', topic: 'imperatives', tags: ['aula'], prompt: "It's cold. ___ the window, please.", options: ['Open', 'Close', 'Opens'], answer: 1, tip: 'Si hace frío, se cierra la ventana: Close the window.' },
  { id: 'im-06', topic: 'imperatives', tags: ['patio'], prompt: '___ run! The floor is wet!', options: ["Don't", "Doesn't", 'No'], answer: 0, tip: 'Para prohibir: Don\'t + verbo. Nunca "doesn\'t" en una orden.' },
  { id: 'im-07', topic: 'imperatives', tags: ['patio'], prompt: '___ the ball to Ben!', options: ['Pass', 'Passes', 'Passing'], answer: 0, tip: 'La orden usa el verbo base: Pass the ball.' },
  { id: 'im-08', topic: 'imperatives', tags: ['patio'], prompt: 'Run, run! ___ stop!', options: ["Don't", 'Not', 'No to'], answer: 0, tip: '"Don\'t stop!" = ¡No pares!' },
  { id: 'im-09', topic: 'imperatives', tags: ['patio'], prompt: '___ some water after the game.', options: ['Drinks', 'Drink', 'To drinks'], answer: 1, tip: 'Las órdenes van con el verbo base: Drink some water.' },
  { id: 'im-10', topic: 'imperatives', tags: ['sala'], prompt: '___ quiet! I am working.', options: ['Be', 'Are', 'Is'], answer: 0, tip: 'Con "to be" la orden es "Be": Be quiet! Be careful!' },
  { id: 'im-11', topic: 'imperatives', tags: ['sala'], prompt: '___ late for my class!', options: ["Don't be", "Don't are", 'Not be'], answer: 0, tip: 'La orden negativa de "be" es "Don\'t be": Don\'t be late!' },
  { id: 'im-12', topic: 'imperatives', tags: ['bano'], prompt: '___ your hands, please.', options: ['Wash', 'Washes', 'Washing'], answer: 0, tip: 'Verbo base al inicio: Wash your hands.' },
  { id: 'im-13', topic: 'imperatives', tags: ['cafeteria'], prompt: "___ throw food! It's not a game!", options: ["Don't", 'No', "Isn't"], answer: 0, tip: 'Para prohibir algo: Don\'t + verbo.' },

  { id: 'imf-01', topic: 'imperatives', tags: ['aula'], kind: 'fix', prompt: 'You opens the book!', options: ['Open the book.', 'Opens the book.', 'You opening the book.'], answer: 0, tip: 'Las órdenes no llevan sujeto ni -s: Open the book.' },
  { id: 'imf-02', topic: 'imperatives', tags: ['aula'], kind: 'fix', prompt: 'No talk in class!', options: ['Not talk in class.', "Don't talk in class.", "Doesn't talk in class."], answer: 1, tip: 'Para prohibir se usa "Don\'t", no "No": Don\'t talk.' },
  { id: 'imf-03', topic: 'imperatives', tags: ['patio'], kind: 'fix', prompt: 'Runs faster!', options: ['Run faster!', 'To run faster!', 'Running faster!'], answer: 0, tip: 'La orden va con el verbo base: Run faster!' },
  { id: 'imf-04', topic: 'imperatives', tags: ['sala'], kind: 'fix', prompt: 'Are quiet, students!', options: ['Is quiet, students!', 'Be quiet, students!', 'Quiet are, students!'], answer: 1, tip: 'La orden de "to be" es "Be": Be quiet!' },
  { id: 'imf-05', topic: 'imperatives', tags: ['cafeteria'], kind: 'fix', prompt: 'Please to give me the salt!', options: ['Please give me the salt.', 'Please gives me the salt.', 'Please giving me the salt.'], answer: 0, tip: 'Después de "please" va el verbo base, sin "to": Please give me the salt.' },

  { id: 'imo-01', topic: 'imperatives', tags: ['aula'], kind: 'order', prompt: 'Abran sus libros, por favor.', options: ['Open', 'your', 'books,', 'please.'], answer: 0, tip: 'La orden empieza con el verbo: Open your books, please.' },
  { id: 'imo-02', topic: 'imperatives', tags: ['aula'], kind: 'order', prompt: 'No hables en clase.', options: ["Don't", 'talk', 'in', 'class.'], answer: 0, tip: "Don't + verbo + resto: Don't talk in class." },
  { id: 'imo-03', topic: 'imperatives', tags: ['patio'], kind: 'order', prompt: '¡Pásame la pelota!', options: ['Pass', 'me', 'the', 'ball!'], answer: 0, tip: 'Pass + me + the ball.' },
  { id: 'imo-04', topic: 'imperatives', tags: ['sala'], kind: 'order', prompt: '¡Siéntate y escucha!', options: ['Sit', 'down', 'and', 'listen!'], answer: 0, tip: 'Dos órdenes unidas con "and": Sit down and listen!' },
  // ── Ciudad: there is / there are y direcciones (calle) ──
  { id: 'ti-01', topic: 'there-is', tags: ['calle'], prompt: 'There ___ a bank on Main Street.', options: ['is', 'are', 'have'], answer: 0, tip: 'Para una sola cosa: There is a bank. Nunca "there have".' },
  { id: 'ti-02', topic: 'there-is', tags: ['calle'], prompt: 'There ___ two cafés near the park.', options: ['is', 'are', 'have'], answer: 1, tip: 'Para varias cosas: There are two cafés.' },
  { id: 'ti-03', topic: 'there-is', tags: ['calle'], prompt: '___ there a hospital near here?', options: ['Is', 'Are', 'Have'], answer: 0, tip: 'Para preguntar por una cosa: Is there a...?' },
  { id: 'ti-04', topic: 'there-is', tags: ['calle'], prompt: '___ there any shops on this street?', options: ['Is', 'Are', 'Do'], answer: 1, tip: 'Para preguntar por varias cosas: Are there any...?' },
  { id: 'ti-05', topic: 'there-is', tags: ['calle'], prompt: "Sorry, there ___ a supermarket here.", options: ["isn't", "aren't", 'no'], answer: 0, tip: 'Negativo de una cosa: There isn\'t a...' },
  { id: 'ti-06', topic: 'there-is', tags: ['calle'], prompt: 'Is there a café near here? — Yes, there ___.', options: ['is', 'are', "it's"], answer: 0, tip: 'La respuesta corta repite el verbo: Yes, there is.' },
  { id: 'ti-07', topic: 'there-is', tags: ['calle'], prompt: 'Are there any taxis? — No, there ___.', options: ["isn't", "aren't", 'not'], answer: 1, tip: 'Con varias cosas la respuesta corta es: No, there aren\'t.' },
  { id: 'ti-08', topic: 'there-is', tags: ['calle'], prompt: '___ straight and turn left.', options: ['Go', 'Goes', 'Going'], answer: 0, tip: 'Las direcciones son órdenes: verbo base al inicio. Go straight.' },
  { id: 'ti-09', topic: 'there-is', tags: ['calle'], prompt: 'Turn ___. The hospital is on your right.', hint: 'a la derecha', options: ['left', 'right', 'straight'], answer: 1, tip: 'right = derecha · left = izquierda · straight = derecho.' },
  { id: 'ti-10', topic: 'there-is', tags: ['calle'], prompt: 'Excuse me, ___ is the bus stop? — It\'s next to the fountain.', options: ['where', 'what', 'who'], answer: 0, tip: 'Para preguntar por un lugar se usa "where".' },
  { id: 'ti-11', topic: 'there-is', tags: ['turismo'], prompt: 'There are three ___ in the park.', options: ['trees', 'tree', 'treeses'], answer: 0, tip: 'Con "there are" va el plural: trees.' },
  { id: 'ti-12', topic: 'there-is', tags: ['turismo'], prompt: 'The bank is ___ the park and the café.', hint: 'entre', options: ['between', 'next', 'in front'], answer: 0, tip: 'Entre dos lugares: between the park and the café.' },

  { id: 'tif-01', topic: 'there-is', tags: ['calle'], kind: 'fix', prompt: 'There have a bank here!', options: ['There is a bank here.', 'There are a bank here.', 'It have a bank here.'], answer: 0, tip: 'Para decir que algo existe se usa "there is", no "there have".' },
  { id: 'tif-02', topic: 'there-is', tags: ['calle'], kind: 'fix', prompt: 'There is two cafés!', options: ['There are two café.', 'There are two cafés.', 'There is two café.'], answer: 1, tip: 'Con dos o más cosas: There are + plural.' },
  { id: 'tif-03', topic: 'there-is', tags: ['calle'], kind: 'fix', prompt: 'Is there a shops on this street?', options: ['Is there any shops on this street?', 'Are there a shops on this street?', 'Are there any shops on this street?'], answer: 2, tip: 'Para varias cosas: Are there any + plural?' },
  { id: 'tif-04', topic: 'there-is', tags: ['calle'], kind: 'fix', prompt: 'Turns left at the park!', options: ['Turn left at the park.', 'Turning left at the park.', 'You turns left at the park.'], answer: 0, tip: 'Las direcciones son órdenes: verbo base, sin -s.' },
  { id: 'tif-05', topic: 'there-is', tags: ['turismo'], kind: 'fix', prompt: 'The bus stop is next the fountain!', options: ['The bus stop is next of the fountain.', 'The bus stop is next to the fountain.', 'The bus stop next to the fountain.'], answer: 1, tip: '"Next to" siempre lleva "to".' },

  { id: 'tio-01', topic: 'there-is', tags: ['calle'], kind: 'order', prompt: '¿Hay un banco cerca de aquí?', options: ['Is', 'there', 'a', 'bank', 'near', 'here?'], answer: 0, tip: 'La pregunta empieza con "Is there".' },
  { id: 'tio-02', topic: 'there-is', tags: ['calle'], kind: 'order', prompt: 'Hay dos cafés en esta calle.', options: ['There', 'are', 'two', 'cafés', 'on', 'this', 'street.'], answer: 0, tip: 'There are + plural + lugar.' },
  { id: 'tio-03', topic: 'there-is', tags: ['calle'], kind: 'order', prompt: 'Sigue derecho y gira a la izquierda.', options: ['Go', 'straight', 'and', 'turn', 'left.'], answer: 0, tip: 'Go straight + and + turn left.' },
  { id: 'tio-04', topic: 'there-is', tags: ['turismo'], kind: 'order', prompt: 'Disculpe, ¿dónde está la parada de autobús?', options: ['Excuse', 'me,', 'where', 'is', 'the', 'bus', 'stop?'], answer: 0, tip: 'Excuse me + where is + lugar?' },

  // ── Ciudad: this / that / these / those, plurales y precios (tienda) ──
  { id: 'de-01', topic: 'demonstratives', tags: ['tienda'], prompt: '___ shoes are very nice.', hint: 'estos, aquí cerca', options: ['These', 'This', 'That'], answer: 0, tip: 'Varias cosas cerca: these. Una cosa cerca: this.' },
  { id: 'de-02', topic: 'demonstratives', tags: ['tienda'], prompt: '___ jacket is perfect for you.', hint: 'esta, aquí cerca', options: ['These', 'This', 'Those'], answer: 1, tip: 'Una cosa cerca: this jacket.' },
  { id: 'de-03', topic: 'demonstratives', tags: ['tienda'], prompt: 'Look at ___ T-shirts over there!', options: ['those', 'this', 'that'], answer: 0, tip: '"Over there" es allá lejos, y son varias: those T-shirts.' },
  { id: 'de-04', topic: 'demonstratives', tags: ['tienda'], prompt: 'Is ___ dress over there blue? — No, it\'s green.', options: ['that', 'those', 'these'], answer: 0, tip: 'Una cosa lejos: that dress.' },
  { id: 'de-05', topic: 'demonstratives', tags: ['tienda'], prompt: 'How much ___ this jacket?', options: ['is', 'are', 'am'], answer: 0, tip: 'Una cosa: How much is...?' },
  { id: 'de-06', topic: 'demonstratives', tags: ['tienda'], prompt: 'How much ___ these shoes?', options: ['is', 'are', 'am'], answer: 1, tip: 'Varias cosas: How much are...?' },
  { id: 'de-07', topic: 'demonstratives', tags: ['tienda'], prompt: 'This shirt is ten ___.', options: ['dollars', 'dollar', 'dollares'], answer: 0, tip: 'Más de un dólar: dollars.' },
  { id: 'de-08', topic: 'demonstratives', tags: ['tienda'], prompt: 'Two ___, please.', options: ['T-shirts', 'T-shirt', 'T-shirtes'], answer: 0, tip: 'El plural regular agrega -s: T-shirts.' },
  { id: 'de-09', topic: 'demonstratives', tags: ['tienda'], prompt: 'I need two new ___.', options: ['dresses', 'dresss', 'dress'], answer: 0, tip: 'Las palabras que terminan en -s, -sh, -ch o -x agregan -es: dresses.' },
  { id: 'de-10', topic: 'demonstratives', tags: ['tienda'], prompt: 'These shoes are $30: ___ dollars.', options: ['thirty', 'thirteen', 'three'], answer: 0, tip: '30 = thirty. 13 = thirteen. Escucha el final: -ty o -teen.' },
  { id: 'de-11', topic: 'demonstratives', tags: ['tienda'], prompt: 'The jacket is $15: ___ dollars.', options: ['fifty', 'fifteen', 'five'], answer: 1, tip: '15 = fifteen. 50 = fifty.' },
  { id: 'de-12', topic: 'demonstratives', tags: ['turismo'], prompt: '___ is my city map.', hint: 'este, en mi mano', options: ['This', 'These', 'Those'], answer: 0, tip: 'Una cosa cerca: This is...' },

  { id: 'def-01', topic: 'demonstratives', tags: ['tienda'], kind: 'fix', prompt: 'This shoes are beautiful!', options: ['These shoes are beautiful.', 'This shoes is beautiful.', 'These shoe are beautiful.'], answer: 0, tip: '"Shoes" es plural: these shoes.' },
  { id: 'def-02', topic: 'demonstratives', tags: ['tienda'], kind: 'fix', prompt: 'These jacket is perfect!', options: ['These jackets is perfect.', 'This jacket is perfect.', 'This jacket are perfect.'], answer: 1, tip: 'Una sola chaqueta: this jacket is.' },
  { id: 'def-03', topic: 'demonstratives', tags: ['tienda'], kind: 'fix', prompt: 'How much is these jeans?', options: ['How much are these jeans?', 'How many are these jeans?', 'How much is this jeans?'], answer: 0, tip: '"Jeans" siempre es plural: How much are these jeans?' },
  { id: 'def-04', topic: 'demonstratives', tags: ['tienda'], kind: 'fix', prompt: 'I want two shirt!', options: ['I want two shirts.', 'I want two shirtes.', 'I want a two shirt.'], answer: 0, tip: 'Con dos o más se usa el plural: shirts.' },
  { id: 'def-05', topic: 'demonstratives', tags: ['tienda'], kind: 'fix', prompt: 'Those dress is expensive!', options: ['Those dress are expensive.', 'That dress is expensive.', 'That dresses is expensive.'], answer: 1, tip: 'Un vestido lejos: that dress.' },

  { id: 'deo-01', topic: 'demonstratives', tags: ['tienda'], kind: 'order', prompt: '¿Cuánto cuesta esta chaqueta?', options: ['How', 'much', 'is', 'this', 'jacket?'], answer: 0, tip: 'How much + is + this jacket?' },
  { id: 'deo-02', topic: 'demonstratives', tags: ['tienda'], kind: 'order', prompt: 'Estos zapatos son muy bonitos.', options: ['These', 'shoes', 'are', 'very', 'nice.'], answer: 0, tip: 'These shoes + are + very nice.' },
  { id: 'deo-03', topic: 'demonstratives', tags: ['tienda'], kind: 'order', prompt: 'Aquellas camisetas son baratas.', options: ['Those', 'T-shirts', 'are', 'cheap.'], answer: 0, tip: 'Those + T-shirts + are + cheap.' },

  // ── Ciudad: pedir en el café (a/an, some/any, Can I have...?) ──
  { id: 'or-01', topic: 'ordering', tags: ['cafe'], prompt: 'Can I have ___ apple, please?', options: ['an', 'a', 'any'], answer: 0, tip: 'Antes de sonido de vocal va "an": an apple.' },
  { id: 'or-02', topic: 'ordering', tags: ['cafe'], prompt: 'Can I have ___ sandwich, please?', options: ['a', 'an', 'any'], answer: 0, tip: 'Antes de sonido de consonante va "a": a sandwich.' },
  { id: 'or-03', topic: 'ordering', tags: ['cafe'], prompt: 'Can I have some ___, please?', options: ['water', 'waters', 'a water'], answer: 0, tip: '"Water" no se cuenta: some water, sin -s ni "a".' },
  { id: 'or-04', topic: 'ordering', tags: ['cafe'], prompt: 'Is there ___ milk? — Yes, there is.', options: ['any', 'a', 'an'], answer: 0, tip: 'En preguntas, con cosas que no se cuentan: any milk.' },
  { id: 'or-05', topic: 'ordering', tags: ['cafe'], prompt: 'There are ___ cookies on the table.', options: ['some', 'a', 'an'], answer: 0, tip: 'En frases afirmativas con plural: some cookies.' },
  { id: 'or-06', topic: 'ordering', tags: ['cafe'], prompt: 'Are there ___ bananas? — No, there aren\'t.', options: ['any', 'a', 'an'], answer: 0, tip: 'En preguntas y negativas: any.' },
  { id: 'or-07', topic: 'ordering', tags: ['cafe'], prompt: '___ I have a juice, please?', options: ['Can', 'Do', 'Am'], answer: 0, tip: 'Para pedir con amabilidad: Can I have...?' },
  { id: 'or-08', topic: 'ordering', tags: ['cafe'], prompt: 'Can I have a coffee, ___?', options: ['please', 'sorry', 'hello'], answer: 0, tip: 'Al pedir algo se agrega "please".' },
  { id: 'or-09', topic: 'ordering', tags: ['cafe'], prompt: 'How much ___ the cake? — It\'s three dollars.', options: ['is', 'are', 'do'], answer: 0, tip: 'Una cosa: How much is...?' },
  { id: 'or-10', topic: 'ordering', tags: ['cafe'], prompt: 'Here ___ are! — Thank you.', options: ['you', 'your', 'yours'], answer: 0, tip: 'Al entregar algo se dice: Here you are.' },
  { id: 'or-11', topic: 'ordering', tags: ['cafe'], prompt: 'Can I have ___ ice cream, please?', options: ['an', 'a', 'any'], answer: 0, tip: '"Ice" empieza con sonido de vocal: an ice cream.' },
  { id: 'or-12', topic: 'ordering', tags: ['turismo'], prompt: 'Two ___, please.', options: ['sandwiches', 'sandwichs', 'sandwich'], answer: 0, tip: 'Las palabras que terminan en -ch agregan -es: sandwiches.' },

  { id: 'orf-01', topic: 'ordering', tags: ['cafe'], kind: 'fix', prompt: 'I want a water!', options: ['Can I have some water, please?', 'Can I have a waters, please?', 'I want an water.'], answer: 0, tip: '"Water" no se cuenta: some water. Y "Can I have..., please?" es más amable que "I want".' },
  { id: 'orf-02', topic: 'ordering', tags: ['cafe'], kind: 'fix', prompt: 'Can I have a apple?', options: ['Can I have an apple?', 'Can I have apple?', 'Can I have a apples?'], answer: 0, tip: 'Antes de vocal va "an": an apple.' },
  { id: 'orf-03', topic: 'ordering', tags: ['cafe'], kind: 'fix', prompt: 'Is there some milk?', options: ['Is there any milk?', 'Are there any milk?', 'Is there a milk?'], answer: 0, tip: 'En preguntas se usa "any": Is there any milk?' },
  { id: 'orf-04', topic: 'ordering', tags: ['cafe'], kind: 'fix', prompt: 'Give me coffee!', options: ['Can I have a coffee, please?', 'Can I have coffees, please?', 'I have a coffee, please.'], answer: 0, tip: 'Para pedir con amabilidad: Can I have a coffee, please?' },
  { id: 'orf-05', topic: 'ordering', tags: ['cafe'], kind: 'fix', prompt: 'Two sandwichs, please!', options: ['Two sandwich, please.', 'Two sandwiches, please.', 'Two sandwichies, please.'], answer: 1, tip: 'Las palabras que terminan en -ch agregan -es: sandwiches.' },

  { id: 'oro-01', topic: 'ordering', tags: ['cafe'], kind: 'order', prompt: '¿Me da un jugo, por favor?', options: ['Can', 'I', 'have', 'a', 'juice,', 'please?'], answer: 0, tip: 'Can I have + a juice + please?' },
  { id: 'oro-02', topic: 'ordering', tags: ['cafe'], kind: 'order', prompt: '¿Hay leche?', options: ['Is', 'there', 'any', 'milk?'], answer: 0, tip: 'Is there any + cosa que no se cuenta?' },
  { id: 'oro-03', topic: 'ordering', tags: ['cafe'], kind: 'order', prompt: 'Aquí tiene.', options: ['Here', 'you', 'are.'], answer: 0, tip: '"Here you are" se dice al entregar algo.' },
  // ── Barrio (Green Street): presente simple, gustos, can, presente continuo, have got
  ...BARRIO_QUESTIONS,
  // ── Granja: preguntas y negativas con do / does, plurales
  ...FARM_QUESTIONS,
  // ── Oficina: la hora y at/on/in, pronombres de objeto, Could you...?
  ...OFFICE_QUESTIONS,
  // ── Repaso de cierre: palabras de pregunta y conectores
  ...EXTRA_QUESTIONS,
  // ── A1 en pasado
  ...PAST_QUESTIONS,
  ...FUTURE_QUESTIONS,
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
    tags: q.tags,
    tip: `Se escuchaba: "${sentences[q.answer]}" ${q.tip}`,
  }
}

/** Pregunta de hablar: decir en voz alta la frase correcta (de completar o de ordenar) */
function toSpeak(q: Question): Question {
  const sentence = q.kind === 'order' ? q.options.join(' ') : q.prompt.replace('___', q.options[q.answer])
  return {
    id: `S-${q.id}`,
    topic: q.topic,
    kind: 'speak',
    prompt: q.kind === 'order' ? q.prompt : '',
    options: [sentence],
    answer: 0,
    tags: q.tags,
    tip: q.tip,
  }
}

/** Pregunta de escribir la palabra que falta, a partir de una de completar */
function toWriteBlank(q: Question): Question {
  return {
    id: `W-${q.id}`,
    topic: q.topic,
    kind: 'write',
    writeMode: 'blank',
    prompt: q.prompt,
    options: [q.options[q.answer]],
    answer: 0,
    tags: q.tags,
    tip: q.tip,
  }
}

/** Pregunta de escribir la oración completa en inglés, a partir de una de ordenar */
function toWriteSentence(q: Question): Question {
  return {
    id: `T-${q.id}`,
    topic: q.topic,
    kind: 'write',
    writeMode: 'sentence',
    prompt: q.prompt,
    options: [q.options.join(' ')],
    answer: 0,
    tags: q.tags,
    tip: q.tip,
  }
}

/**
 * Solo se pide escribir la palabra que falta cuando la respuesta es única sin ver opciones:
 * verbo to be y saludos, sin negaciones ni contracciones (en posesivos podrían valer varias).
 */
function canWriteBlank(q: Question) {
  const a = q.options[q.answer]
  return canListen(q) && (q.topic === 'to-be' || q.topic === 'greetings') && !/not|'/i.test(a)
}

function canListen(q: Question) {
  return (q.kind ?? 'fill') === 'fill' && q.prompt.split('___').length === 2
}

export function questionsFor(topics: TopicId[], kinds: QuestionKind[] = ['fill', 'fix', 'order', 'listen', 'write']): Question[] {
  const list: Question[] = []
  for (const q of QUESTIONS) {
    if (!topics.includes(q.topic)) continue
    if (kinds.includes(q.kind ?? 'fill')) list.push(q)
    if (kinds.includes('listen') && canSpeak && canListen(q)) list.push(toListen(q))
    if (kinds.includes('write') && canWriteBlank(q)) list.push(toWriteBlank(q))
    if (kinds.includes('write') && q.kind === 'order') list.push(toWriteSentence(q))
    if (kinds.includes('speak') && canRecognize && (canListen(q) || q.kind === 'order') && !q.hint) list.push(toSpeak(q))
  }
  return list
}

export function questionById(id: string): Question | undefined {
  if (id.startsWith('W-') || id.startsWith('T-')) {
    const base = QUESTIONS.find((q) => q.id === id.slice(2))
    if (!base) return undefined
    return id.startsWith('W-') ? toWriteBlank(base) : toWriteSentence(base)
  }
  if (id.startsWith('S-')) {
    const base = QUESTIONS.find((q) => q.id === id.slice(2))
    return base && canRecognize ? toSpeak(base) : undefined
  }
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
export function pickQuestion(topics: TopicId[], kinds: QuestionKind[], used: string[], mistakes: string[] = [], tags: string[] = []): Question {
  const pool = questionsFor(topics, kinds)
  const fresh = pool.filter((q) => !used.includes(q.id))
  const list = fresh.length > 0 ? fresh : pool
  const pending = list.filter((q) => mistakes.includes(q.id))
  if (pending.length > 0 && Math.random() < 0.45) return pending[Math.floor(Math.random() * pending.length)]
  // Primero se elige el tipo de pregunta al azar, para que haya variedad
  const available = kinds.filter((k) => list.some((q) => (q.kind ?? 'fill') === k))
  const kind = available[Math.floor(Math.random() * available.length)]
  const ofKind = list.filter((q) => (q.kind ?? 'fill') === kind)
  // La mayoría de las veces el enemigo pregunta sobre su lugar o su historia
  const own = ofKind.filter((q) => q.tags?.some((t) => tags.includes(t)))
  const from = own.length > 0 && Math.random() < 0.7 ? own : ofKind
  return from[Math.floor(Math.random() * from.length)]
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
  prepositions: {
    name: 'Preposiciones de lugar',
    level: 'A1',
    lesson: [
      'Dicen dónde está algo: Where is my book? → It is on the desk.',
      'in = dentro · on = encima · under = debajo',
      'next to = al lado de · between = entre · in front of = delante de · behind = detrás de',
    ],
  },
  imperatives: {
    name: 'Imperativos',
    level: 'A1',
    lesson: [
      'Las órdenes empiezan con el verbo, sin sujeto: Open the door. Sit down.',
      "Para prohibir: Don't + verbo → Don't run!",
      "Con to be: Be quiet! · Don't be late!",
    ],
  },
  'there-is': {
    name: 'There is / there are y direcciones',
    level: 'A1',
    lesson: [
      'There is + una cosa: There is a bank. · There are + varias: There are two cafés.',
      'Preguntas: Is there a...? · Are there any...?',
      'Direcciones: Go straight · Turn left / right · It is on your left / right.',
    ],
  },
  demonstratives: {
    name: 'This, that, these, those y precios',
    level: 'A1',
    lesson: [
      'Cerca: this (una) · these (varias). Lejos: that (una) · those (varias).',
      'Plural: shirt → shirts · dress → dresses · sandwich → sandwiches.',
      'Precios: How much is this? · How much are these? → It is / They are ten dollars.',
    ],
  },
  ordering: {
    name: 'Pedir en el café (a/an, some/any)',
    level: 'A1',
    lesson: [
      'Pedir con amabilidad: Can I have a juice, please?',
      'a + sonido de consonante (a sandwich) · an + sonido de vocal (an apple).',
      'some en frases afirmativas · any en preguntas y negativas: Is there any milk?',
    ],
  },
  'present-simple': {
    name: 'Presente simple y rutinas',
    level: 'A1',
    lesson: [
      'Para rutinas y cosas que siempre pasan: I get up at seven. She works in a hospital.',
      'Con he, she, it el verbo lleva -s: works, plays · -es después de -s, -sh, -ch, -o: goes, watches · consonante + y → -ies: studies.',
      'Frecuencia antes del verbo: I always / usually / sometimes / never eat breakfast. Con to be, después: I am never late.',
    ],
  },
  likes: {
    name: 'Gustos: like, love, hate + -ing',
    level: 'A1',
    lesson: [
      'Para gustos: like (gustar), love (encantar), hate (odiar) + verbo con -ing: I love reading.',
      'Con he, she, it: she likes dancing · Negativo: I don\'t like / he doesn\'t like cooking.',
      'Reglas del -ing: dance → dancing (sin e) · run → running · swim → swimming.',
    ],
  },
  can: {
    name: 'Can / can\'t (habilidades)',
    level: 'A1',
    lesson: [
      'Can = poder, saber hacer algo: I can swim. · Can\'t = no poder: I can\'t drive.',
      'Can es igual con todos y el verbo va solo, sin "to" y sin -s: she can sing.',
      'Pregunta: Can you dance? → Yes, I can. / No, I can\'t.',
    ],
  },
  'present-continuous': {
    name: 'Presente continuo (lo que pasa ahora)',
    level: 'A1',
    lesson: [
      'Para lo que pasa en este momento: am / is / are + verbo con -ing.',
      'The dog is running. The children are playing. I am reading.',
      'Pregunta: What are you doing? · Negativo: He isn\'t sleeping.',
    ],
  },
  'have-got': {
    name: 'Have got (familia y cosas)',
    level: 'A1',
    lesson: [
      'Para decir lo que tienes: I have got a dog. She has got two brothers.',
      'I, you, we, they → have got · he, she, it → has got.',
      'Pregunta: Have you got a pet? → Yes, I have. / No, I haven\'t.',
    ],
  },
  'do-does': {
    name: 'Preguntas y negativas (do / does)',
    level: 'A1',
    lesson: [
      'Para preguntar en presente: Do (I, you, we, they) o Does (he, she, it) + verbo sin -s: Does the cow eat grass?',
      "Para negar: don't o doesn't + verbo sin -s: The horse doesn't eat meat.",
      "Respuestas cortas: Yes, it does. / No, it doesn't. · Yes, they do. / No, they don't.",
    ],
  },
  plurals: {
    name: 'Plurales (sheep, geese, mice...)',
    level: 'A1',
    lesson: [
      'Plural normal: -s (cow → cows) · -es después de -s, -sh, -ch, -x (box → boxes).',
      'Irregulares: sheep → sheep · goose → geese · mouse → mice · child → children · man → men · woman → women.',
      'Otros: foot → feet · tooth → teeth · leaf → leaves.',
    ],
  },
  time: {
    name: 'La hora y at / on / in',
    level: 'A1',
    lesson: [
      "What time is it? → It's seven o'clock · half past seven (7:30) · quarter past seven (7:15) · quarter to eight (7:45).",
      'at + hora (at nine) · on + día (on Monday) · in + mes, estación o parte del día (in May, in summer, in the morning).',
      'Excepción: at night (en la noche).',
    ],
  },
  'object-pronouns': {
    name: 'Pronombres de objeto (me, him, her...)',
    level: 'A1',
    lesson: [
      'Después del verbo o de to / with / for: me, you, him, her, it, us, them.',
      'I → me · he → him · she → her · we → us · they → them: Call me. Send it to her. I work with them.',
      'Antes del verbo va el sujeto (I, she, they); después, el objeto (me, her, them).',
    ],
  },
  'could-you': {
    name: 'Pedir con cortesía (Could you...?)',
    level: 'A1',
    lesson: [
      'Para pedir algo con amabilidad: Could you + verbo + ..., please? → Could you help me, please?',
      'Para pedir permiso: Could I speak to Ms. Clark, please?',
      "Respuestas: Sure! · Of course! · Sorry, I can't.",
    ],
  },
  'was-were': {
    name: 'Was / were (to be en pasado)',
    level: 'A1',
    lesson: [
      'I · he · she · it → was · you · we · they → were.',
      "Negativo: wasn't / weren't · Pregunta: Was he...? Were you...?",
      'There was (una cosa) · there were (varias).',
    ],
  },
  'past-regular': {
    name: 'Pasado de los verbos regulares (-ed)',
    level: 'A1',
    lesson: [
      'Verbo + ed, igual para todas las personas: walk → walked · play → played · want → wanted.',
      'Ortografía: live → lived · study → studied · stop → stopped.',
      'Tres sonidos: /t/ walked · /d/ played · /ɪd/ wanted (después de t o d).',
      'Palabras de pasado: yesterday · last week · two days ago.',
    ],
  },
  'past-irregular': {
    name: 'Pasado de los verbos irregulares (went, saw...)',
    level: 'A1',
    lesson: [
      'Algunos verbos no usan -ed: cada uno tiene su propio pasado. go → went · see → saw · eat → ate · buy → bought.',
      'Igual para todas las personas: I went, she went, they went.',
      'Nunca "goed" ni "eated". Repásalos en el libro de verbos y en tus fichas.',
    ],
  },
  'past-did': {
    name: "Preguntas y negaciones en pasado (did / didn't)",
    level: 'A1',
    lesson: [
      'Pregunta: Did + sujeto + verbo simple: Did you go? Did she see it?',
      "Negativo: didn't + verbo simple: I didn't go. He didn't see it.",
      "Respuestas cortas: Yes, I did. · No, I didn't. Nunca \"Did you went?\".",
      'Con was / were no se usa did: Were you there? Was it cold?',
    ],
  },
  'past-time': {
    name: 'Cuándo pasó (yesterday, last week, ago)',
    level: 'A1',
    lesson: [
      'yesterday (ayer) · last night (anoche) · last week / month / year (la semana / el mes / el año pasado).',
      'Tiempo + ago (hace...): two days ago · an hour ago · thirty years ago.',
      'in 1980 (años) · on Monday (días) · at six (horas). Sin "the" ni "in" antes de last o yesterday.',
      'Para preguntar: When did you...? → Two days ago.',
    ],
  },
  'going-to': {
    name: 'Planes con going to',
    level: 'A1',
    lesson: [
      'Para planes: sujeto + am / is / are + going to + verbo simple: I am going to study.',
      "I'm going to · she's going to · they're going to (formas cortas).",
      'Palabras de futuro: tomorrow · tonight · next week · next year · one day.',
    ],
  },
  'going-to-neg': {
    name: 'Going to: negativo y preguntas',
    level: 'A1',
    lesson: [
      "Negativo: I'm not going to · he / she / it isn't going to · you / we / they aren't going to.",
      'Pregunta: Am I / Is she / Are you going to + verbo? → Yes, I am. · No, she isn\'t.',
      'Con going to no se usa do / does: Is she going to come? (no "Does she going...").',
    ],
  },
  'going-to-wh': {
    name: 'Preguntas de planes (What / Where / When are you going to...?)',
    level: 'A1',
    lesson: [
      'Palabra de pregunta + am / is / are + sujeto + going to + verbo: What are you going to do?',
      'What (qué) · Where (dónde) · When (cuándo) · Who (quién) · What time (a qué hora) · How (cómo) · Why (por qué).',
      'Nunca "What you are going to...": el am / is / are va antes del sujeto.',
    ],
  },
  'going-to-predict': {
    name: 'Predicciones con going to (It is going to rain)',
    level: 'A1',
    lesson: [
      "Cuando ves señales de lo que va a pasar: Look at the clouds! It's going to rain.",
      "Careful! You're going to fall! · The cow is going to eat the hat!",
      'Palabras útiles: Look! · Careful! · soon (pronto).',
    ],
  },
  'want-to': {
    name: 'Deseos: want to / would like to',
    level: 'A1',
    lesson: [
      'Lo que quieres: I want to + verbo. Con he / she: she wants to.',
      'Con más cortesía: I would like to (I\'d like to) + verbo. Would no cambia: she would like to.',
      'Para invitar: Would you like to come? → Yes, I would. / Yes, I\'d like to!',
    ],
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
