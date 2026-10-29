import type { EnemyDef, Requirement, SceneDef, Zone } from '../game/types'

/**
 * La ciudad en 1996 (A1, pasado): carretera destapada, mercado con puestos, un pozo
 * y una cabina de teléfono. Gramática: pasado de los verbos regulares (-ed).
 * Leyenda nueva:  r  carretera destapada (se camina)   u  carreta   m  puesto del mercado
 *                 o  pozo   e  cabina de teléfono
 * Arriba: la tienda de Nora (izquierda) y el correo (derecha). Abajo a la derecha, la oficina del mercado (jefa).
 */
const MAP = [
  '################',
  'W.CC..#O..O..O.W',
  '#.....#........#',
  '#.K...#..F.....#',
  '#.....#........#',
  '##d#######d#####',
  'frrrrrrrrrrrrrrf',
  'frrrrrrrrrrrrurf',
  'frrrrrrrrrrrrrrf',
  'f,m,m,,,,,bbbbbf',
  'f,,,,,,o,,b...bf',
  'f,m,m,,,,,X...bf',
  'f,,,,,e,,,b...bf',
  'fY,,,,,,,,bbbbbf',
  'f,,,,,,,,,,,,,Yf',
  'ffffffffffffffff',
]

function zoneAt(x: number, y: number): Zone {
  if (y <= 5) return x <= 6 ? 'tienda-vieja' : 'correo'
  if (x >= 11 && y >= 10 && y <= 12) return 'mercado'
  if (x <= 5 && y >= 9 && y <= 12) return 'mercado'
  return 'calle-vieja'
}

export const CITY_PAST_REQUIREMENTS: Requirement[] = [
  {
    id: 'past-sounds',
    name: 'los sacos de sonidos (el señor López, en el mercado)',
    line: {
      text: 'Stop! Strangers? Nobody helped Mr. Lopez with his sacks this morning. Help him first, then talk to me!',
      es: '¡Alto! ¿Forasteros? Nadie ayudó al señor López con sus sacos esta mañana. ¡Ayúdalo primero y luego habla conmigo!',
    },
  },
]

export const CITY_PAST: SceneDef = {
  id: 'city-past',
  name: 'La ciudad (1996)',
  era: 'Pasado',
  topics: ['past-regular'],
  map: MAP,
  start: { x: 2, y: 14 },
  bossDoor: { x: 10, y: 11 },
  keysNeeded: 2,
  entities: [
    { type: 'friend', id: 'leo', x: 8, y: 13 },
    { type: 'interest', x: 5, y: 13 },
    { type: 'npc', id: 'lopez', x: 3, y: 10 },
    { type: 'npc', id: 'nora', x: 4, y: 2 },
    { type: 'npc', id: 'rosa-kid', x: 13, y: 14 },
    { type: 'enemy', id: 'city-past-m1', x: 9, y: 7 },
    { type: 'enemy', id: 'city-past-m2', x: 12, y: 3 },
    { type: 'boss', id: 'city-past-boss', x: 13, y: 11 },
  ],
  labels: [
    { text: 'Tienda', x: 3, y: 4 },
    { text: 'Correo', x: 11, y: 4 },
    { text: 'Carretera', x: 5, y: 8 },
    { text: 'Mercado', x: 3, y: 13 },
    { text: 'Oficina', x: 12, y: 10 },
  ],
  zoneAt,
  requirements: CITY_PAST_REQUIREMENTS,
  chips: (s) => [
    { label: `Llaves ${s.keys['city-past'] ?? 0}/2`, done: (s.keys['city-past'] ?? 0) >= 2 },
    { label: 'Sacos de sonidos', done: s.opened.includes('past-sounds') },
  ],
  intro: {
    first:
      'La ciudad en 1996: todavía no hay calles de cemento, solo una carretera destapada, un mercado y un pozo. Otro fragmento de tu voz está aquí. Ayuda al señor López con sus sacos y busca a Tony y a Betty: tienen las dos mitades de la llave.',
    later: 'Aquí se habla de lo que ya pasó: walked, played, wanted. Choca con la cabina de teléfono: alguien estuvo ahí.',
  },
  epilogue: 'city-past-epilogue',
  door: {
    text: 'La puerta de la oficina del mercado está cerrada con llave.',
    sub: 'Necesitas las 2 mitades de la llave: las tienen Tony, el repartidor, y Betty, la cartera.',
  },
}

export const CITY_PAST_ENEMIES: Record<string, EnemyDef> = {
  'city-past-m1': {
    id: 'city-past-m1',
    name: 'Tony, el repartidor',
    person: 'Tony',
    kind: 'minion',
    hp: 5,
    topics: ['past-regular'],
    kinds: ['fill', 'fix', 'order', 'listen', 'write'],
    tags: ['calle-vieja'],
    // El señor Rossi de joven: la misma piel y la misma gorra, pero el pelo todavía oscuro
    look: { shirt: '#e07b39', hair: '#3b2a1a', skin: '#e0ac69', accessory: 'cap' },
    before: [
      { text: 'Hey, watch out! My bike! Yesterday I deliver fifty boxes. I walk ten kilometers and I carry everything!', es: '¡Oye, cuidado! ¡Mi bici! Ayer "entrego" cincuenta cajas. "Camino" diez kilómetros y "cargo" todo.' },
      { text: 'Mrs. Rossi is my mom. Half of her office key was in her apron... and now it is in my bag. Answer me, if you are fast!', es: 'La señora Rossi es mi mamá. La mitad de la llave de su oficina estaba en su delantal... y ahora está en mi bolsa. ¡Respóndeme, si eres rápido!' },
    ],
    after: [
      { text: 'Yesterday I delivered fifty boxes. I walked ten kilometers! Wow, my words are OK now.', es: 'Ayer entregué cincuenta cajas. ¡Caminé diez kilómetros! Vaya, mis palabras ya están bien.' },
      { text: 'Take this half of the key. You know, one day I want to show this city to tourists. I love every street!', es: 'Toma esta mitad de la llave. ¿Sabes? Un día quiero mostrarles esta ciudad a los turistas. ¡Me encanta cada calle!' },
    ],
    freed: { text: 'I delivered the bread this morning, and I helped Mr. Lopez with the apples!', es: 'Esta mañana entregué el pan, ¡y ayudé al señor López con las manzanas!' },
    bonus: { q: 'One more! Yesterday I ___ football with my friends.', options: ['played', 'play', 'plaied'], answer: 0, tip: 'Vocal + y: solo se agrega -ed: play → played.' },
  },
  'city-past-m2': {
    id: 'city-past-m2',
    name: 'Betty, la cartera',
    person: 'Betty',
    kind: 'minion',
    hp: 5,
    topics: ['past-regular'],
    kinds: ['fill', 'fix', 'order', 'listen', 'write'],
    tags: ['correo'],
    look: { shirt: '#3b6fb6', hair: '#c0392b', skin: '#f6d3b3', gender: 'female', accessory: 'glasses' },
    before: [
      { text: 'Hello! I am the best mail carrier in town. Yesterday I studyed the map, and I stoped at every house!', es: '¡Hola! Soy la mejor cartera del pueblo. Ayer "estudié" el mapa y "paré" en cada casa. (Las escribe mal: studyed, stoped).' },
      { text: 'I tryed to write the addresses... but my pen is crazy! The other half of the key is in my mailbag. Help me with my words!', es: '"Intenté" escribir las direcciones... ¡pero mi lápiz está loco! La otra mitad de la llave está en mi bolsa de cartas. ¡Ayúdame con mis palabras!' },
    ],
    after: [
      { text: 'Studied, stopped, tried... Oh! Now my letters are perfect.', es: 'Studied, stopped, tried... ¡Oh! Ahora mis cartas están perfectas.' },
      { text: "Here is the other half of the key. Mrs. Rossi's office is next to the market. Be careful, she shouted at me this morning!", es: 'Aquí está la otra mitad de la llave. La oficina de la señora Rossi está al lado del mercado. ¡Cuidado, esta mañana me gritó!' },
    ],
    freed: { text: 'I posted twenty letters today, and I carried them all in my bag!', es: '¡Hoy envié veinte cartas, y las cargué todas en mi bolsa!' },
    bonus: { q: 'Last one! How do you write the past of "stop"?', options: ['stopped', 'stoped', 'stopt'], answer: 0, tip: 'Verbo corto que termina en consonante-vocal-consonante: se dobla la última letra: stop → stopped.' },
  },
  'city-past-boss': {
    id: 'city-past-boss',
    name: 'La señora Rossi, dueña del mercado',
    person: 'Mrs. Rossi',
    kind: 'boss',
    reward: 'cuadros',
    hp: 9,
    topics: ['past-regular', 'was-were', 'there-is'],
    kinds: ['fill', 'fix', 'order', 'listen'],
    tags: ['mercado'],
    phases: [
      { hp: 4, topics: ['past-regular'], kinds: ['fill', 'fix', 'listen'], tags: ['mercado', 'calle-vieja'] },
      {
        hp: 5,
        topics: ['past-regular', 'was-were'],
        kinds: ['fill', 'fix', 'order', 'write'],
        tags: ['mercado', 'tienda-vieja', 'correo', 'aula-vieja'],
        line: { text: 'I open this market twenty years ago! I work here every day! The stalls, the road, the well... everything is MINE!', es: '¡"Abro" este mercado hace veinte años! ¡"Trabajo" aquí todos los días! Los puestos, la carretera, el pozo... ¡todo es MÍO!' },
      },
    ],
    look: { shirt: '#7a2e2e', hair: '#2b1d14', skin: '#e0ac69', gender: 'female' },
    before: [
      { text: 'Stop! Who are you? Yesterday I close my office early, and today you are in it!', es: '¡Alto! ¿Quiénes son? Ayer "cierro" mi oficina temprano, ¡y hoy están adentro!' },
      { text: 'This shiny thing landed in my market yesterday. I pick it up, and now the market is MINE!', es: 'Esta cosa brillante cayó en mi mercado ayer. La "recojo", ¡y ahora el mercado es MÍO!' },
    ],
    after: [
      { text: 'Oh... I picked it up, and I changed. I shouted at everybody. I am so sorry.', es: 'Oh... La recogí y cambié. Les grité a todos. Lo siento mucho.' },
      { text: 'Yesterday a man in a dark coat stopped at the phone box. He picked up the phone... he waited... but he was silent. Then he walked to Green Street. They are building it now.', es: 'Ayer un hombre con abrigo oscuro se detuvo en la cabina de teléfono. Levantó el teléfono... esperó... pero se quedó callado. Luego caminó hacia Green Street. La están construyendo ahora.' },
      { text: 'This piece of metal is yours. And take this shirt from my stall. It was very popular this year!', es: 'Este pedazo de metal es tuyo. Y toma esta camisa de mi puesto. ¡Fue muy popular este año!' },
    ],
    freed: { text: 'I opened the market at six today. Everybody is happy again!', es: 'Hoy abrí el mercado a las seis. ¡Todos están felices otra vez!' },
    farewell: {
      q: 'Goodbye, children! Tell me one thing about today.',
      options: ['We helped Tony and Betty!', 'We helpped Tony and Betty!', 'We help Tony and Betty yesterday!'],
      answer: 0,
      tip: 'Pasado regular: help → helped (no se dobla la p).',
    },
  },
}
