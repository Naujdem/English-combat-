import type { EnemyDef, Requirement, SceneDef, Zone } from '../game/types'

/**
 * La escuela en 1996 (A1, pasado): una escuela pequeña de ladrillo con un solo salón,
 * patio de tierra con campana y la oficina del director. Gramática: was / were.
 * Leyenda nueva:  b  pared de ladrillo   I  campana del patio
 */
const MAP = [
  'bbbbbbbBBbbbbbbb',
  'b..............b',
  'b.D.D.D..D.D.D.b',
  'b..............b',
  'b.D.D.D..D.D.D.b',
  'b..........M...b',
  'bbbbbbbdbbbbbbbb',
  'f,,,,,,,,,,bbbbb',
  'f,,I,,,,,,,b...b',
  'f,,,,,Y,,,,X...b',
  'f,,,,,,,,,,b.M.b',
  'f,Y,,,,,,,,bbbbb',
  'f,,,,,,,,,,,,,,f',
  'ffffffffffffffff',
]

function zoneAt(x: number, y: number): Zone {
  if (y <= 5) return 'aula-vieja'
  if (x >= 12 && y >= 8 && y <= 10) return 'direccion-vieja'
  return 'patio-viejo'
}

export const SCHOOL_PAST_REQUIREMENTS: Requirement[] = [
  {
    id: 'past-attendance',
    name: 'la lista de asistencia (la señora Higgins, en el salón)',
    line: {
      text: 'Who are you? You were not on the list yesterday! Talk to Mrs. Higgins first. Her attendance book is a disaster!',
      es: '¿Quién eres? ¡Ayer no estabas en la lista! Habla primero con la señora Higgins. ¡Su lista de asistencia es un desastre!',
    },
  },
]

export const SCHOOL_PAST: SceneDef = {
  id: 'school-past',
  name: 'La escuela (1996)',
  era: 'Pasado',
  topics: ['was-were'],
  map: MAP,
  start: { x: 5, y: 12 },
  bossDoor: { x: 11, y: 9 },
  keysNeeded: 1,
  entities: [
    { type: 'friend', id: 'leo', x: 8, y: 12 },
    { type: 'interest', x: 9, y: 10 },
    { type: 'npc', id: 'higgins', x: 12, y: 5 },
    { type: 'npc', id: 'tina', x: 1, y: 1 },
    { type: 'enemy', id: 'school-past-m1', x: 13, y: 3 },
    { type: 'boss', id: 'school-past-boss', x: 13, y: 9 },
  ],
  labels: [
    { text: 'Salón', x: 7, y: 3 },
    { text: 'Patio', x: 5, y: 10 },
    { text: 'Director', x: 13, y: 8 },
  ],
  zoneAt,
  requirements: SCHOOL_PAST_REQUIREMENTS,
  chips: (s) => [
    { label: `Llave ${s.keys['school-past'] ?? 0}/1`, done: (s.keys['school-past'] ?? 0) >= 1 },
    { label: 'Lista de asistencia', done: s.opened.includes('past-attendance') },
  ],
  intro: {
    first:
      'Greenfield School en 1996: una escuela pequeña de ladrillo. Un fragmento de tu voz cayó aquí, y el director lo tiene. Ayuda a la señora Higgins con su lista y habla con el estudiante tímido del salón.',
    later: 'Aquí todo es pasado: was y were. Toca la pizarra del salón: alguien escribió algo.',
  },
  epilogue: 'school-past-epilogue',
  door: {
    text: 'La puerta del director está cerrada con llave.',
    sub: 'La llave la tiene el estudiante tímido del salón.',
  },
}

export const SCHOOL_PAST_ENEMIES: Record<string, EnemyDef> = {
  'school-past-m1': {
    id: 'school-past-m1',
    name: 'Greg, el estudiante tímido',
    person: 'Greg',
    kind: 'minion',
    hp: 5,
    topics: ['was-were'],
    kinds: ['fill', 'fix', 'order', 'listen', 'write'],
    tags: ['aula-vieja'],
    look: { shirt: '#5a4a7a', hair: '#2d2d3a', skin: '#c68642', accessory: 'glasses' },
    before: [
      { text: 'Oh! H-hello. I were the best student yesterday! They was my friends... no, they wasn\'t my friends.', es: '¡Oh! H-hola. Ayer "eras" el mejor estudiante... "Ellos era" mis amigos... no, "ellos no era" mis amigos.' },
      { text: 'My dad is the principal. This key was on his desk, and now it is in my pocket. I am so nervous! Help me with my words... please.', es: 'Mi papá es el director. Esta llave estaba en su escritorio, y ahora está en mi bolsillo. ¡Estoy tan nervioso! Ayúdame con mis palabras... por favor.' },
    ],
    after: [
      { text: 'I was the best student. They were my friends. Oh! My words are OK now.', es: 'Yo era el mejor estudiante. Ellos eran mis amigos. ¡Oh! Mis palabras ya están bien.' },
      { text: 'Take the key. And... one day I want to be a teacher here. A good teacher. Not like my dad!', es: 'Toma la llave. Y... un día quiero ser profesor aquí. Un buen profesor. ¡No como mi papá!' },
    ],
    freed: { text: 'I was very nervous yesterday. Today I am OK. Thank you!', es: 'Ayer estaba muy nervioso. Hoy estoy bien. ¡Gracias!' },
    bonus: { q: 'One more! Were you a good student last year?', options: ['Yes, I was!', 'Yes, I were!', 'Yes, I am was!'], answer: 0, tip: 'Respuesta corta con I: Yes, I was.' },
  },
  'school-past-boss': {
    id: 'school-past-boss',
    name: 'El director Grimm',
    person: 'Principal Grimm',
    kind: 'boss',
    reward: 'chaleco',
    hp: 8,
    topics: ['was-were', 'to-be', 'possessives'],
    kinds: ['fill', 'fix', 'order', 'listen'],
    tags: ['direccion-vieja'],
    phases: [
      { hp: 4, topics: ['was-were'], kinds: ['fill', 'fix', 'listen'], tags: ['direccion-vieja', 'aula-vieja'] },
      {
        hp: 4,
        topics: ['was-were', 'to-be', 'possessives'],
        kinds: ['fill', 'fix', 'order', 'write'],
        tags: ['direccion-vieja', 'patio-viejo'],
        line: { text: 'This school were MY school! The students was MY students! Yesterday... today... everything is MINE!', es: '¡Esta escuela "eran" MI escuela! ¡Los estudiantes "era" MIS estudiantes! Ayer... hoy... ¡todo es MÍO!' },
      },
    ],
    look: { shirt: '#3a3a5a', hair: '#5a4a3a', skin: '#c68642', accessory: 'glasses' },
    before: [
      { text: 'Stop! Students was not in my office yesterday, and they is not in my office today!', es: '¡Alto! Ayer los estudiantes "no estaba" en mi oficina, ¡y hoy "no está" en mi oficina!' },
      { text: 'This shiny thing was on my desk this morning. Now it is MINE. Like this school. Like my son!', es: 'Esta cosa brillante estaba en mi escritorio esta mañana. Ahora es MÍA. Como esta escuela. ¡Como mi hijo!' },
    ],
    after: [
      { text: 'Oh... I was very angry. I was a bad principal today. Where is Greg?', es: 'Oh... Estaba muy enojado. Hoy fui un mal director. ¿Dónde está Greg?' },
      { text: 'Yesterday there was a man in a dark coat in the classroom. He was very quiet. He was at the board for a long time, and then... he was gone.', es: 'Ayer había un hombre con abrigo oscuro en el salón. Estaba muy callado. Estuvo un largo rato en la pizarra, y luego... ya no estaba.' },
      { text: 'This piece of metal is yours. And take this old vest. It was my vest when I was young.', es: 'Este pedazo de metal es tuyo. Y toma este chaleco viejo. Era mío cuando era joven.' },
    ],
    freed: { text: 'I was a strict principal, but I am going to be a better one. Thank you.', es: 'Era un director estricto, pero voy a ser uno mejor. Gracias.' },
    farewell: {
      q: 'Goodbye, children. Were you happy at my school today?',
      options: ['Yes, we were! Goodbye!', 'Yes, we was! Goodbye!', 'Yes, we are was!'],
      answer: 0,
      tip: 'Respuesta corta con we: Yes, we were.',
    },
  },
}
