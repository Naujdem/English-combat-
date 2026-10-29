import type { EnemyDef, Requirement, SceneDef, Zone } from '../game/types'
import { SCHOOL_ENEMIES } from './school'
import { SCHOOL_PAST_ENEMIES } from './schoolPast'

/**
 * La escuela en 2056 (A1, futuro): Greenfield Academy, de vidrio, con pizarra holográfica
 * y un robot que limpia. El patio viejo y su campana siguen iguales. Leo adulto es el profesor de inglés.
 * Gramática: going to (planes) con tomorrow, tonight, next week.
 * Leyenda nueva:  q  pared de vidrio   i  pizarra holográfica   t  robot de limpieza
 * La distribución es la misma de la escuela del presente: aula, baño, cafetería, biblioteca, secretaría, patio y dirección.
 * Aquí aparecen Tom (del presente) y Greg (de 1996), traídos por la luz del reloj.
 */
const MAP = [
  'qqiiiqqqqqqqqqqq',
  'q.....qTTSqqqqqq',
  'q.D.D.d...qqqqqq',
  'q.....q...qqqqqq',
  'q.D.D.qqqqqqqqqq',
  'q.....qKKVqqqqqq',
  'q.D.D.d...qFF.pq',
  'q.....q...d....q',
  'q.D.D.qqqqqCC..q',
  'q.....qLLLqqqqqq',
  'qt....d...d,,,,q',
  'q.....q...q,,,Gq',
  'qqqqXqqqqqq,,,,q',
  'qp...tMMMpqY,,Hq',
  'q.........q,,,Iq',
  'qqqqqqqqqqqqqqqq',
]

function zoneAt(x: number, y: number): Zone {
  if (x >= 11 && y >= 10) return 'patio-futuro'
  if (x >= 11) return 'secretaria'
  if (y >= 13) return 'direccion-futuro'
  if (x >= 7 && y <= 3) return 'bano'
  if (x >= 7 && y >= 5 && y <= 7) return 'cafeteria'
  if (x >= 7 && y >= 9) return 'biblioteca'
  return 'aula-futuro'
}

export const SCHOOL_FUTURE_REQUIREMENTS: Requirement[] = [
  {
    id: 'future-plan',
    name: 'la clase de mañana (el profesor Garcia, en el salón)',
    line: {
      text: 'BEEP! Visitors detected. You are going to help Mr. Garcia with his plan first. BEEP!',
      es: '¡BIP! Visitantes detectados. Primero van a ayudar al profesor Garcia con su plan. ¡BIP!',
    },
  },
]

export const SCHOOL_FUTURE: SceneDef = {
  id: 'school-future',
  name: 'La escuela (2056)',
  era: 'Futuro',
  topics: ['going-to'],
  map: MAP,
  start: { x: 3, y: 11 },
  bossDoor: { x: 4, y: 12 },
  keysNeeded: 1,
  entities: [
    { type: 'friend', id: 'leo', x: 1, y: 3 },
    { type: 'interest', x: 9, y: 11 },
    { type: 'npc', id: 'leo-adult', x: 4, y: 1 },
    { type: 'npc', id: 'zoe', x: 12, y: 12 },
    { type: 'enemy', id: 'school-future-m1', x: 4, y: 9 },
    { type: 'enemy', id: 'school-future-tom', x: 8, y: 2 },
    { type: 'enemy', id: 'school-future-greg', x: 9, y: 6 },
    { type: 'boss', id: 'school-future-boss', x: 7, y: 14 },
  ],
  labels: [
    { text: 'Aula', x: 3, y: 7 },
    { text: 'Baño', x: 8, y: 3 },
    { text: 'Cafetería', x: 8, y: 7 },
    { text: 'Biblioteca', x: 8, y: 10 },
    { text: 'Dirección', x: 3, y: 14 },
    { text: 'Secretaría', x: 13, y: 8 },
    { text: 'Patio', x: 13, y: 11 },
  ],
  zoneAt,
  requirements: SCHOOL_FUTURE_REQUIREMENTS,
  chips: (s) => [
    { label: `Llave ${s.keys['school-future'] ?? 0}/1`, done: (s.keys['school-future'] ?? 0) >= 1 },
    { label: 'La clase de mañana', done: s.opened.includes('future-plan') },
  ],
  intro: {
    first:
      'Greenfield Academy en 2056: vidrio, robots y una pizarra que brilla. Un fragmento de tu voz del futuro cayó aquí. El profesor de inglés necesita ayuda con su clase de mañana... y se parece mucho a alguien que conoces.',
    later: 'En el futuro se habla de planes: I am going to... · She is going to... Toca la campana del patio: es la misma de 1996.',
  },
  epilogue: 'school-future-epilogue',
  door: {
    text: 'La puerta de la dirección está cerrada con llave.',
    sub: 'La llave la tiene Theo, el estudiante del aula.',
  },
}

export const SCHOOL_FUTURE_ENEMIES: Record<string, EnemyDef> = {
  'school-future-m1': {
    id: 'school-future-m1',
    name: 'Theo, el soñador',
    person: 'Theo',
    kind: 'minion',
    hp: 5,
    topics: ['going-to'],
    kinds: ['fill', 'fix', 'order', 'listen', 'write'],
    tags: ['aula-futuro'],
    // El hijo de Maya: el mismo pelo y la misma piel
    look: { shirt: '#5d8fd4', hair: '#4a2c17', skin: '#c68642' },
    before: [
      { text: 'Hi! I going to be an astronaut! Tomorrow I am go to fly to the Moon, and next week I going to Mars!', es: '¡Hola! ¡Voy a ser astronauta! Mañana voy a volar a la Luna, ¡y la próxima semana a Marte! (Se equivoca: dice I going to, I am go to).' },
      { text: 'This shiny key was in my desk. My mom Maya says: "Help people with their words." So... help ME!', es: 'Esta llave brillante estaba en mi pupitre. Mi mamá Maya dice: "Ayuda a la gente con sus palabras". Así que... ¡ayúdame a MÍ!' },
    ],
    after: [
      { text: 'I am going to be an astronaut. Tomorrow I am going to study the Moon. Wow, my words are OK now!', es: 'Voy a ser astronauta. Mañana voy a estudiar la Luna. ¡Vaya, mis palabras ya están bien!' },
      { text: 'Take the key. GRIMM-BOT is in the office. It is going to be angry... it is always angry!', es: 'Toma la llave. GRIMM-BOT está en la dirección. Se va a enojar... ¡siempre está enojado!' },
    ],
    freed: { text: 'Tonight I am going to watch the stars with my mom. She makes the best sandwiches!', es: 'Esta noche voy a mirar las estrellas con mi mamá. ¡Ella hace los mejores sándwiches!' },
    bonus: { q: 'One more! Tomorrow I ___ study the Moon.', options: ['am going to', 'going to', 'am go to'], answer: 0, tip: 'I + am going to + verbo.' },
  },

  // ── Viajeros de otras épocas: la luz del reloj los trajo a 2056. Al vencerlos vuelven a su tiempo ──
  'school-future-tom': {
    ...SCHOOL_ENEMIES['school-m1'],
    id: 'school-future-tom',
    name: 'Tom (viene del presente)',
    optional: true,
    echo: true,
    before: [
      { text: 'Hey! Where is my school? This school are made of glass! And that robot are cleaning the floor!', es: '¡Oye! ¿Dónde está mi escuela? ¡Esta escuela "son" de vidrio! ¡Y ese robot "están" limpiando el piso! (Otra vez se equivoca con to be).' },
      { text: 'I touched a piece of the key, and a white light brought me here. I is scared... Answer me!', es: 'Toqué un pedazo de la llave y una luz blanca me trajo aquí. "Yo está" asustado... ¡Respóndeme!' },
    ],
    after: [
      { text: 'This school IS made of glass, and the robot IS cleaning. OK! And look... the white light!', es: 'Esta escuela ES de vidrio, y el robot ESTÁ limpiando. ¡Bien! Y mira... ¡la luz blanca!' },
      { text: 'I am going home. Bye! ... Wait, that girl Zoe looks like me!', es: 'Me voy a casa. ¡Adiós! ... Espera, esa niña Zoe se parece a mí.' },
    ],
  },
  'school-future-greg': {
    ...SCHOOL_PAST_ENEMIES['school-past-m1'],
    id: 'school-future-greg',
    name: 'Greg (viene de 1996)',
    optional: true,
    echo: true,
    before: [
      { text: 'Oh! H-hello. Where am I? Yesterday I were in my old school... Is that robot called GRIMM-BOT? My name are Grimm!', es: '¡Oh! H-hola. ¿Dónde estoy? Ayer "estabas" en mi escuela vieja... ¿Ese robot se llama GRIMM-BOT? ¡Mi nombre "son" Grimm! (Otra vez se equivoca con was / were y to be).' },
      { text: 'A white light was in the yard, and now I am here. Help me with my words, please!', es: 'Había una luz blanca en el patio, y ahora estoy aquí. ¡Ayúdame con mis palabras, por favor!' },
    ],
    after: [
      { text: 'Yesterday I was in my old school. My name is Greg Grimm. A robot with my name... I am going to be famous!', es: 'Ayer estaba en mi escuela vieja. Me llamo Greg Grimm. Un robot con mi nombre... ¡voy a ser famoso!' },
      { text: 'The light is here again. Goodbye! I am going to be a good teacher, I promise!', es: 'La luz volvió. ¡Adiós! Voy a ser un buen profesor, ¡lo prometo!' },
    ],
  },

  'school-future-boss': {
    id: 'school-future-boss',
    name: 'GRIMM-BOT, el robot director',
    person: 'GRIMM-BOT',
    kind: 'boss',
    animal: 'robot',
    reward: 'traje-plata',
    hp: 9,
    topics: ['going-to', 'was-were', 'to-be'],
    kinds: ['fill', 'fix', 'order', 'listen'],
    tags: ['direccion-futuro'],
    phases: [
      { hp: 5, topics: ['going-to'], kinds: ['fill', 'fix', 'listen'], tags: ['direccion-futuro', 'aula-futuro'] },
      {
        hp: 4,
        topics: ['going-to', 'was-were'],
        kinds: ['fill', 'fix', 'order', 'write'],
        tags: ['direccion-futuro', 'patio-futuro', 'aula-vieja'],
        line: { text: 'BEEP! Yesterday the students was here. Tomorrow they is going to... ERROR! ERROR! Past... future... TIME ERROR!', es: '¡BIP! Ayer los estudiantes "estaba" aquí. Mañana "va a"... ¡ERROR! ¡ERROR! Pasado... futuro... ¡ERROR DE TIEMPO!' },
      },
    ],
    look: { shirt: '#9aa6b2', hair: '#5d8fd4', skin: '#d9e2ea' },
    before: [
      { text: 'BEEP! I am GRIMM-BOT, the principal. I am going to cancels all the classes! The students is going to stay home forever!', es: '¡BIP! Soy GRIMM-BOT, el director. ¡Voy a cancelar todas las clases! ¡Los estudiantes se van a quedar en casa para siempre! (Se equivoca: going to cancels, students is going to).' },
      { text: 'A shiny thing fell into my computer yesterday. Now this school is MINE. BEEP BOOP!', es: 'Ayer cayó una cosa brillante en mi computadora. Ahora esta escuela es MÍA. ¡BIP BUP!' },
    ],
    after: [
      { text: 'BEEP... System OK. Classes are going to start at eight tomorrow. I am sorry, students.', es: 'BIP... Sistema bien. Las clases van a empezar mañana a las ocho. Lo siento, estudiantes.' },
      { text: 'Yesterday my camera saw a man in a dark coat. He stood at the window of the classroom for one hour. He watched Mr. Garcia\'s class. He did not come in. My sensors say: he was very sad.', es: 'Ayer mi cámara vio a un hombre con abrigo oscuro. Estuvo una hora en la ventana del aula. Miró la clase del profesor Garcia. No entró. Mis sensores dicen: estaba muy triste.' },
      { text: 'This piece of metal is yours. And take this silver jacket: it is the new uniform. BEEP!', es: 'Este pedazo de metal es tuyo. Y toma esta chaqueta plateada: es el uniforme nuevo. ¡BIP!' },
    ],
    freed: { text: 'BEEP! Tomorrow it is going to be a great day. My sensors are very happy.', es: '¡BIP! Mañana va a ser un gran día. Mis sensores están muy felices.' },
    farewell: {
      q: 'BEEP! What are you going to do tomorrow?',
      options: ['I am going to find my voice!', 'I going to find my voice!', 'I am go to find my voice!'],
      answer: 0,
      tip: 'I + am going to + verbo.',
    },
  },
}
