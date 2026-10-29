import type { EnemyDef, Requirement, SceneDef, Zone } from '../game/types'
import { SESSIONS } from './schedule'

/**
 * Mapa de la escuela. Cada letra es una casilla de 1x1:
 *  #  pared          W  ventana         B  pizarra
 *  .  piso           d  puerta abierta  X  puerta del jefe (se abre con llaves)
 *  D  pupitre+silla  T  inodoro         S  lavamanos
 *  K  mesa redonda   V  máquina         L  estantería
 *  p  planta         M  escritorio del profesor
 *  F  archivador     C  mostrador de la secretaría
 *  ,  césped         G  portería        Y  árbol        H  banca
 * Para crear otro escenario basta con escribir otra tabla como esta.
 */
const MAP = [
  '##BBB###########',
  'W.....#TTS######',
  'W.D.D.d...######',
  '#.....#...######',
  'W.D.D.##########',
  'W.....#KKV######',
  '#.D.D.d...#FF.p#',
  'W.....#...d....W',
  'W.D.D.#####CC..#',
  '#.....#LLL######',
  'W.....d...d,,,,#',
  '#.....#...#,,,G#',
  '####X######,,,,#',
  '#p....MMMp#Y,,H#',
  'W.........W,,,,#',
  '################',
]

function zoneAt(x: number, y: number): Zone {
  if (x >= 11 && y >= 10) return 'patio'
  if (x >= 11) return 'secretaria'
  if (y >= 13) return 'sala'
  if (x >= 7 && y <= 3) return 'bano'
  if (x >= 7 && y >= 5 && y <= 7) return 'cafeteria'
  if (x >= 7 && y >= 9) return 'biblioteca'
  return 'aula'
}

export const SCHOOL: SceneDef = {
  id: 'school',
  name: 'La escuela',
  topics: ['to-be', 'possessives'],
  map: MAP,
  start: { x: 3, y: 11 },
  bossDoor: { x: 4, y: 12 },
  keysNeeded: 4,
  entities: [
    { type: 'friend', id: 'leo', x: 1, y: 3 },
    { type: 'friend', id: 'maya', x: 7, y: 7 },
    { type: 'interest', x: 9, y: 11 },
    { type: 'enemy', id: 'school-m1', x: 4, y: 9 },
    { type: 'enemy', id: 'school-m2', x: 8, y: 2 },
    { type: 'enemy', id: 'school-m3', x: 9, y: 6 },
    { type: 'chest', id: 'school-chest', outfit: 'naranja', x: 7, y: 11 },
    { type: 'boss', id: 'school-boss', x: 7, y: 14 },
    { type: 'npc', id: 'secretary', x: 13, y: 6 },
    { type: 'npc', id: 'ana', x: 1, y: 9 },
    { type: 'npc', id: 'librarian', x: 8, y: 11 },
    { type: 'npc', id: 'coach', x: 11, y: 11 },
    { type: 'npc', id: 'ben', x: 12, y: 14 },
    { type: 'enemy', id: 'school-patio', x: 13, y: 12 },
  ],
  labels: [
    { text: 'Aula', x: 3, y: 7 },
    { text: 'Baño', x: 8, y: 3 },
    { text: 'Cafetería', x: 8, y: 7 },
    { text: 'Biblioteca', x: 8, y: 10 },
    { text: 'Sala de profesores', x: 3, y: 14 },
    { text: 'Secretaría', x: 13, y: 8 },
    { text: 'Patio', x: 13, y: 14 },
  ],
  zoneAt,
  // Se completan abajo, cuando BOSS_REQUIREMENTS ya existe
  requirements: [],
  chips: (s) => [
    { label: `Horario ${SESSIONS.filter((x) => s.opened.includes(x.id)).length}/${SESSIONS.length}`, done: SESSIONS.every((x) => s.opened.includes(x.id)) },
    { label: `Llaves ${s.keys.school ?? 0}/4`, done: (s.keys.school ?? 0) >= 4 },
    { label: 'Silbato', done: s.opened.includes('school-whistle') },
    { label: 'Uniforme', done: s.opened.includes('school-registration') },
    { label: 'Útiles', done: s.opened.includes('school-supplies') },
  ],
  intro: {
    first:
      'Los estudiantes de la escuela guardan tus palabras. Lee el horario en la pizarra del aula: cada sesión te da una tiza para retar a un estudiante. Vence a los 4 que tienen las llaves, consigue el silbato del entrenador, tus útiles y matricúlate en la secretaría.',
    later: 'Choca con personas para hablar y con objetos para ver su nombre en inglés. Lee el horario en la pizarra del aula para conseguir tizas.',
  },
  epilogue: 'school-epilogue',
}

/**
 * Historia de la escuela: el desconocido hechizó al profesor Grimm y le dio tus palabras.
 * Grimm partió la llave de la sala de profesores en tres y se la dio a sus "mejores"
 * estudiantes, prometiéndoles las mejores notas. Al vencerlos, el hechizo los suelta.
 */
export const SCHOOL_ENEMIES: Record<string, EnemyDef> = {
  'school-patio': {
    id: 'school-patio',
    name: 'Max, el competitivo',
    person: 'Max',
    kind: 'minion',
    reward: 'deportivo',
    hp: 4,
    topics: ['to-be', 'possessives', 'imperatives'],
    kinds: ['fill', 'fix', 'order', 'listen', 'write'],
    tags: ['patio'],
    look: { shirt: '#2e9d8f', hair: '#a0522d', skin: '#f1c27d', accessory: 'cap' },
    before: [
      { text: 'Hey! This is MY court. Are you fast? Are you strong? Run! Jump! Ha ha!', es: '¡Oye! Esta es MI cancha. ¿Eres rápido? ¿Eres fuerte? ¡Corre! ¡Salta! ¡Ja, ja!' },
      { text: 'Mr. Grimm gave me a piece of the key. It is MY prize, because I am the best player here!', es: 'El profesor Grimm me dio un pedazo de la llave. ¡Es MI premio, porque soy el mejor jugador de aquí!' },
    ],
    after: [
      { text: 'Wow, you are strong! OK, you are a good player too.', es: '¡Guau, eres fuerte! Bueno, tú también eres buen jugador.' },
      { text: "Here is my piece of the key. And take this sports shirt. Let's play football after class!", es: 'Aquí está mi pedazo de la llave. Y toma esta camiseta deportiva. ¡Juguemos fútbol después de clase!' },
    ],
    freed: { text: 'My team is the best! Do you want to play with us?', es: '¡Mi equipo es el mejor! ¿Quieres jugar con nosotros?' },
  },
  'leo-trainer': {
    id: 'leo-trainer',
    name: 'Leo, el entrenador',
    person: 'Leo',
    kind: 'trainer',
    hp: 4,
    topics: ['greetings'],
    kinds: ['fill', 'fix', 'order', 'listen', 'write'],
    look: { shirt: '#3b9d5d', hair: '#2d2d3a', skin: '#e0ac69' },
    before: [
      { text: "OK, trainer mode! I'm your sparring partner. Don't worry, it's just practice.", es: '¡Bien, modo entrenador! Soy tu compañero de práctica. Tranquilo, es solo práctica.' },
      { text: 'Answer my questions about greetings and introductions. Ready? Go!', es: 'Responde mis preguntas sobre saludos y presentaciones. ¿Listo? ¡Vamos!' },
    ],
    after: [
      { text: 'Wow! You are a fast learner!', es: '¡Guau! ¡Aprendes rápido!' },
      { text: 'Now you are ready. The students in this school have your words. Let\'s go and get them back!', es: 'Ya estás listo. Los estudiantes de esta escuela tienen tus palabras. ¡Vamos a recuperarlas!' },
    ],
    freed: { text: "Let's practice again anytime!", es: '¡Practiquemos otra vez cuando quieras!' },
  },
  'school-m1': {
    id: 'school-m1',
    name: 'Tom, el burlón',
    person: 'Tom',
    kind: 'minion',
    hp: 4,
    topics: ['to-be'],
    kinds: ['fill', 'order', 'listen', 'write'],
    tags: ['aula'],
    look: { shirt: '#c0504d', hair: '#2b5c3a', skin: '#e0ac69', accessory: 'cap' },
    before: [
      { text: "Ha! You are the new student. You can't talk? That is funny!", es: '¡Ja! Eres el estudiante nuevo. ¿No puedes hablar? ¡Qué chistoso!' },
      { text: 'Mr. Grimm gave me a piece of a key. It is MY prize. Do you want it? Answer me!', es: 'El profesor Grimm me dio un pedazo de llave. Es MI premio. ¿Lo quieres? ¡Respóndeme!' },
    ],
    after: [
      { text: 'Ouch... OK, OK. You are smart. Sorry for laughing at you.', es: 'Ay... Bueno, bueno. Eres inteligente. Perdón por burlarme.' },
      { text: 'Here is the key. Be careful: Mr. Grimm is strange today. His eyes are yellow!', es: 'Aquí está la llave. Ten cuidado: el profesor Grimm está raro hoy. ¡Sus ojos están amarillos!' },
    ],
    freed: { text: "Hi again! I'm not mean now. Good luck with Mr. Grimm!", es: '¡Hola otra vez! Ya no soy malo. ¡Suerte con el profesor Grimm!' },
  },
  'school-m2': {
    id: 'school-m2',
    name: 'Rick, el presumido',
    person: 'Rick',
    kind: 'minion',
    hp: 4,
    topics: ['to-be'],
    kinds: ['fix'],
    tags: ['bano'],
    look: { shirt: '#7a4fa3', hair: '#1f1f1f', skin: '#c68642' },
    before: [
      { text: 'I am the best student here. I never make mistakes!', es: 'Soy el mejor estudiante de aquí. ¡Nunca me equivoco!' },
      { text: 'Mr. Grimm says I am perfect. Listen to my perfect English!', es: 'El profesor Grimm dice que soy perfecto. ¡Escucha mi inglés perfecto!' },
    ],
    after: [
      { text: 'Wait... I make mistakes? ... You are right.', es: 'Espera... ¿Me equivoco? ... Tienes razón.' },
      { text: 'Take this key. This morning Mr. Grimm found a shiny piece of metal on his desk. He touched it, and then he changed.', es: 'Toma esta llave. Esta mañana el profesor Grimm encontró un pedazo de metal brillante en su escritorio. Lo tocó, y luego cambió.' },
    ],
    freed: { text: 'Mistakes are OK. I am learning too!', es: 'Equivocarse está bien. ¡Yo también estoy aprendiendo!' },
  },
  'school-m3': {
    id: 'school-m3',
    name: 'Bella, la egoísta',
    person: 'Bella',
    kind: 'minion',
    hp: 5,
    topics: ['possessives'],
    kinds: ['fill', 'fix', 'order', 'listen', 'write'],
    tags: ['cafeteria'],
    look: { shirt: '#d9822b', hair: '#6b3b1f', skin: '#f1c27d', accessory: 'cap', gender: 'female' },
    before: [
      { text: 'This is MY table. This is MY food. And this is MY key!', es: 'Esta es MI mesa. Esta es MI comida. ¡Y esta es MI llave!' },
      { text: "Nothing here is yours. Your words? They're mine now!", es: 'Nada aquí es tuyo. ¿Tus palabras? ¡Ahora son mías!' },
    ],
    after: [
      { text: "Fine... It's YOUR key now. I'm sorry.", es: 'Está bien... Ahora es TU llave. Lo siento.' },
      { text: "Your words are in Mr. Grimm's room. He keeps them in his desk.", es: 'Tus palabras están en la sala del profesor Grimm. Las guarda en su escritorio.' },
    ],
    freed: { text: 'Do you want some of my sandwich? Sharing is nice!', es: '¿Quieres un poco de mi sándwich? ¡Compartir es bonito!' },
  },
  'school-boss': {
    id: 'school-boss',
    name: 'Profesor Grimm',
    person: 'Mr. Grimm',
    kind: 'boss',
    hp: 10,
    topics: ['to-be', 'possessives', 'prepositions', 'imperatives'],
    kinds: ['fill', 'fix', 'order', 'listen'],
    tags: ['sala'],
    phases: [
      { hp: 3, topics: ['to-be'], kinds: ['fill', 'fix'], tags: ['sala', 'aula'] },
      {
        hp: 3,
        topics: ['possessives'],
        kinds: ['fill', 'fix', 'order'],
        tags: ['sala', 'cafeteria'],
        line: { text: 'Grr... My head! No! Your words are MY words! My desk, my papers, my students!', es: '¡Grr... Mi cabeza! ¡No! ¡Tus palabras son MIS palabras! ¡Mi escritorio, mis papeles, mis estudiantes!' },
      },
      {
        hp: 4,
        topics: ['prepositions', 'imperatives', 'to-be', 'possessives'],
        kinds: ['fill', 'order', 'listen', 'fix', 'write'],
        tags: ['sala', 'aula'],
        line: { text: 'My eyes... A voice in my head... SIT DOWN! BE QUIET! Your words are IN my desk, UNDER my papers! Listen to me!', es: 'Mis ojos... Una voz en mi cabeza... ¡SIÉNTATE! ¡SILENCIO! ¡Tus palabras están DENTRO de mi escritorio, DEBAJO de mis papeles! ¡Escúchame!' },
      },
    ],
    look: { shirt: '#5a4a7a', hair: '#9a9a9a', skin: '#c68642', accessory: 'mortarboard' },
    before: [
      { text: 'So... you have the three keys. My students are not loyal.', es: 'Así que... tienes las tres llaves. Mis estudiantes no son leales.' },
      { text: 'Your words are in my desk. They are MY words now!', es: 'Tus palabras están en mi escritorio. ¡Ahora son MIS palabras!' },
      { text: 'Show me you know TO BE and MY, YOUR, HIS, HER! And obey my orders!', es: '¡Demuéstrame que sabes TO BE y MY, YOUR, HIS, HER! ¡Y obedece mis órdenes!' },
    ],
    after: [
      { text: 'What... Where am I? My head...', es: '¿Qué... Dónde estoy? Mi cabeza...' },
      { text: 'This morning I found a strange piece of metal on my desk. I touched it, and everything went dark. I am so sorry.', es: 'Esta mañana encontré un pedazo de metal extraño en mi escritorio. Lo toqué, y todo se volvió oscuro. Lo siento mucho.' },
      { text: 'It is a piece of a clock, and your words are in it. A man in a dark coat came and asked for it... with a very strange voice. Take it. It is yours.', es: 'Es una pieza de un reloj, y tus palabras están ahí. Un hombre con abrigo oscuro vino a pedirla... con una voz muy extraña. Tómala. Es tuya.' },
    ],
    freed: { text: 'Thank you, my student. Come to my class anytime!', es: 'Gracias, mi estudiante. ¡Ven a mi clase cuando quieras!' },
    farewell: {
      q: "It's late. Goodbye, my student. See you in class tomorrow!",
      options: ['Goodbye, Mr. Grimm! See you tomorrow!', 'Good morning, Mr. Grimm!', 'Hello, Mr. Grimm! Nice to meet you!'],
      answer: 0,
      tip: 'Para despedirse se dice "Goodbye" o "See you tomorrow". "Good morning" es para saludar y "Nice to meet you" es al conocer a alguien.',
    },
  },
}

/** Lo que el profesor Grimm exige antes de pelear, además de las llaves */
export const BOSS_REQUIREMENTS: Requirement[] = [
  {
    id: 'school-supplies',
    name: 'tus útiles escolares (Ana, en el aula)',
    line: {
      text: "Stop! Where are your book and your pencil? Don't come to my class without your things! Ask Ana in the classroom.",
      es: '¡Alto! ¿Dónde están tu libro y tu lápiz? ¡No vengas a mi clase sin tus cosas! Pregúntale a Ana en el aula.',
    },
  },
  {
    id: 'school-whistle',
    name: 'el silbato del entrenador',
    line: {
      text: 'Stop! Where is your whistle? Every student in my school does sports. Go to the patio and talk to the coach!',
      es: '¡Alto! ¿Dónde está tu silbato? Todos los estudiantes de mi escuela hacen deporte. ¡Ve al patio y habla con el entrenador!',
    },
  },
  {
    id: 'school-registration',
    name: 'el uniforme de la secretaría',
    line: {
      text: 'Stop! Where is your uniform? You are not registered in my school. Go to the secretary\'s office!',
      es: '¡Alto! ¿Dónde está tu uniforme? No tienes matrícula en mi escuela. ¡Ve a la secretaría!',
    },
  },
]

export const OUTFITS: Record<string, { name: string; color: string }> = {
  base: { name: 'Camiseta azul', color: '#3b6fb6' },
  naranja: { name: 'Camiseta naranja', color: '#e07b39' },
  capa: { name: 'Capa del tiempo', color: '#2f5d50' },
  gafas: { name: 'Gafas de lectura', color: '#3b6fb6' },
  rosada: { name: 'Camiseta rosada', color: '#d4537e' },
  uniforme: { name: 'Uniforme escolar', color: '#2b4a7a' },
  deportivo: { name: 'Camiseta deportiva', color: '#2e9d8f' },
  chaqueta: { name: 'Chaqueta de mezclilla', color: '#4a6fa5' },
  gorra: { name: 'Gorra de turista', color: '#e07b39' },
  sudadera: { name: 'Sudadera de Nick', color: '#6b4fa3' },
  overol: { name: 'Overol de granjero', color: '#3b6fb6' },
  traje: { name: 'Chaqueta de oficina', color: '#2b2b3a' },
  chaleco: { name: 'Chaleco de 1996', color: '#8b5a2b' },
  cuadros: { name: 'Camisa a cuadros de 1996', color: '#b5523b' },
  casco: { name: 'Overol de constructor (1996)', color: '#e0a526' },
  sombrero: { name: 'Camisa de granja (1996)', color: '#c9a83a' },
  boina: { name: 'Chaqueta del cine (1996)', color: '#8a2830' },
  'traje-plata': { name: 'Chaqueta plateada (2056)', color: '#9aa6b2' },
}

SCHOOL.requirements = BOSS_REQUIREMENTS
