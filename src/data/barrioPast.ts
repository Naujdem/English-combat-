import type { EnemyDef, Requirement, SceneDef, Zone } from '../game/types'

/**
 * Green Street en 1996 (A1, pasado): la calle está en construcción. Joe construye la primera casa
 * (la futura casa de la familia de Leo), hay andamios, arena y una mezcladora. El capataz es el señor Hill de joven.
 * Gramática: pasado de los verbos irregulares (went, had, saw...).
 * Leyenda nueva:  g  andamio   a  montón de arena   x  mezcladora de cemento
 */
const MAP = [
  'ffffffffffffffff',
  'fY,,,,,,,,,,,Y,f',
  'f,,bbbbb,,gggg,f',
  'f,,b...b,,g..g,f',
  'f,,b.K.b,,g..g,f',
  'f,,b...b,,g,,g,f',
  'f,,bbdbb,,gg,g,f',
  'frrrrrrrrrrrrrrf',
  'frrrrrrrrrrrrrrf',
  'f,,a,,x,,,bbbbbf',
  'f,,,,,,,,,b...bf',
  'f,a,,,,,,,X...bf',
  'f,,,,,,,,,b...bf',
  'f,Y,,,,,,,bbbbbf',
  'f,,,,,,,,,,,,,Yf',
  'ffffffffffffffff',
]

function zoneAt(x: number, y: number): Zone {
  if (x >= 4 && x <= 6 && y >= 3 && y <= 5) return 'casa-nueva'
  if (x >= 11 && y >= 10 && y <= 12) return 'caseta'
  return 'obra'
}

export const BARRIO_PAST_REQUIREMENTS: Requirement[] = [
  {
    id: 'past-verbbook',
    name: 'el libro de verbos (Joe, en la casa nueva)',
    line: {
      text: 'Stop! Children on my building site? You know nothing! Go and read Joe\'s verb book first!',
      es: '¡Alto! ¿Niños en mi obra? ¡No saben nada! ¡Primero vayan a leer el libro de verbos de Joe!',
    },
  },
]

export const BARRIO_PAST: SceneDef = {
  id: 'barrio-past',
  name: 'Green Street (1996)',
  era: 'Pasado',
  topics: ['past-irregular'],
  map: MAP,
  start: { x: 2, y: 14 },
  bossDoor: { x: 10, y: 11 },
  keysNeeded: 2,
  entities: [
    { type: 'friend', id: 'leo', x: 6, y: 13 },
    { type: 'interest', x: 4, y: 12 },
    { type: 'npc', id: 'joe-young', x: 4, y: 3 },
    { type: 'npc', id: 'pete', x: 8, y: 1 },
    { type: 'enemy', id: 'barrio-past-m1', x: 12, y: 4 },
    { type: 'enemy', id: 'barrio-past-m2', x: 8, y: 10 },
    { type: 'boss', id: 'barrio-past-boss', x: 13, y: 11 },
  ],
  labels: [
    { text: 'Casa de Joe', x: 5, y: 2 },
    { text: 'Obra', x: 12, y: 2 },
    { text: 'Green Street', x: 8, y: 8 },
    { text: 'Caseta', x: 12, y: 10 },
  ],
  zoneAt,
  requirements: BARRIO_PAST_REQUIREMENTS,
  chips: (s) => [
    { label: `Llaves ${s.keys['barrio-past'] ?? 0}/2`, done: (s.keys['barrio-past'] ?? 0) >= 2 },
    { label: 'Libro de verbos', done: s.opened.includes('past-verbbook') },
  ],
  intro: {
    first:
      'Green Street en 1996: todavía no hay casas, solo andamios, arena y una sola casa de ladrillo, la de Joe. Aquí cayó otro fragmento de tu voz. Lee el libro de verbos de Joe y busca a Sam y a Carmen: tienen las dos mitades de la llave de la caseta.',
    later: 'Muchos verbos no usan -ed en pasado: go → went, see → saw. Los encuentras en el libro de verbos y en tus fichas.',
  },
  epilogue: 'barrio-past-epilogue',
  door: {
    text: 'La puerta de la caseta del capataz está cerrada con llave.',
    sub: 'Necesitas las 2 mitades de la llave: las tienen Sam, el albañil, y Carmen, la pintora.',
  },
}

export const BARRIO_PAST_ENEMIES: Record<string, EnemyDef> = {
  'barrio-past-m1': {
    id: 'barrio-past-m1',
    name: 'Sam, el albañil',
    person: 'Sam',
    kind: 'minion',
    hp: 5,
    topics: ['past-irregular'],
    kinds: ['fill', 'fix', 'order', 'listen', 'write'],
    tags: ['obra'],
    look: { shirt: '#e0a526', hair: '#5a3a1a', skin: '#c68642', accessory: 'cap' },
    before: [
      { text: 'Hey! Yesterday I goed to the shop and I buyed two hundred bricks. Then I maked this wall!', es: '¡Oye! Ayer fui a la tienda y compré doscientos ladrillos. ¡Luego hice esta pared! (Se equivoca: dice goed, buyed, maked).' },
      { text: 'The boss gived me half of a key. I putted it in my pocket. Answer me, little builder!', es: 'El jefe me dio la mitad de una llave. La puse en mi bolsillo. ¡Respóndeme, pequeño constructor! (Dice gived y putted).' },
    ],
    after: [
      { text: 'I went to the shop and I bought bricks. Then I made this wall. Went, bought, made!', es: 'Fui a la tienda y compré ladrillos. Luego hice esta pared. ¡Went, bought, made!' },
      { text: 'Here is half of the key. The boss is in his hut, next to the road. He is very angry today.', es: 'Aquí está la mitad de la llave. El jefe está en su caseta, al lado de la carretera. Hoy está muy enojado.' },
    ],
    freed: { text: 'We built three houses last month. I was very tired, but I was happy!', es: 'El mes pasado construimos tres casas. Estaba muy cansado, ¡pero feliz!' },
    bonus: { q: 'One more! Yesterday I ___ to the shop.', options: ['went', 'goed', 'go'], answer: 0, tip: 'go es irregular: el pasado es went.' },
  },
  'barrio-past-m2': {
    id: 'barrio-past-m2',
    name: 'Carmen, la pintora',
    person: 'Carmen',
    kind: 'minion',
    hp: 5,
    topics: ['past-irregular'],
    kinds: ['fill', 'fix', 'order', 'listen', 'write'],
    tags: ['obra'],
    // La señora García de joven: el mismo color de camiseta y de pelo
    look: { shirt: '#d4537e', hair: '#2b1d14', skin: '#e0ac69', gender: 'female' },
    before: [
      { text: 'Hello! I comed from the city yesterday. I writed a letter to my mom, and I eated a big sandwich!', es: '¡Hola! Ayer vine de la ciudad. Le escribí una carta a mi mamá, ¡y me comí un sándwich grande! (Se equivoca: dice comed, writed, eated).' },
      { text: 'I founded half of a key in my paint bucket. Do you want it? Then fix my words!', es: 'Encontré la mitad de una llave en mi balde de pintura. ¿La quieres? ¡Entonces arregla mis palabras! (Dice founded).' },
    ],
    after: [
      { text: 'I came from the city. I wrote a letter, and I ate a sandwich. Thank you!', es: 'Vine de la ciudad. Escribí una carta y me comí un sándwich. ¡Gracias!' },
      { text: 'Take this half of the key. You know... I love this street. One day I want to live here, with a big family!', es: 'Toma esta mitad de la llave. ¿Sabes? Me encanta esta calle. ¡Un día quiero vivir aquí, con una familia grande!' },
    ],
    freed: { text: 'I painted Joe\'s door yesterday. It was white, and now it is green!', es: 'Ayer pinté la puerta de Joe. Era blanca, ¡y ahora es verde!' },
    bonus: { q: 'Last question! I ___ a letter to my mom.', options: ['wrote', 'writed', 'write'], answer: 0, tip: 'write es irregular: el pasado es wrote.' },
  },
  'barrio-past-boss': {
    id: 'barrio-past-boss',
    name: 'Frank Hill, el capataz',
    person: 'Mr. Hill',
    kind: 'boss',
    reward: 'casco',
    hp: 10,
    topics: ['past-irregular', 'past-regular', 'was-were'],
    kinds: ['fill', 'fix', 'order', 'listen'],
    tags: ['caseta'],
    phases: [
      { hp: 5, topics: ['past-irregular'], kinds: ['fill', 'fix', 'listen'], tags: ['caseta', 'obra'] },
      {
        hp: 5,
        topics: ['past-irregular', 'past-regular', 'was-were'],
        kinds: ['fill', 'fix', 'order', 'write'],
        tags: ['caseta', 'obra', 'casa-nueva', 'calle-vieja'],
        line: { text: 'I builded this street! I telled everybody what to do! I knowed it... this street is MINE!', es: '¡Yo construí esta calle! ¡Les dije a todos qué hacer! Lo sabía... ¡esta calle es MÍA! (Se equivoca: dice builded, telled, knowed).' },
      },
    ],
    // El señor Hill de joven: sin canas todavía
    look: { shirt: '#5a4a3a', hair: '#4a3a2a', skin: '#e0ac69', accessory: 'glasses' },
    before: [
      { text: 'Out! Out of my hut! Yesterday I sayed NO to children, and today you are here!', es: '¡Fuera! ¡Fuera de mi caseta! Ayer les dije NO a los niños, ¡y hoy están aquí! (Se equivoca: dice sayed).' },
      { text: 'This shiny thing falled on my desk last night. I taked it, and now I am the king of Green Street!', es: 'Esta cosa brillante cayó en mi escritorio anoche. La tomé, ¡y ahora soy el rey de Green Street! (Se equivoca: dice falled, taked).' },
    ],
    after: [
      { text: 'Oh... I took it, and I changed. I was a different man. I shouted at Sam, at Carmen, at everybody. I am sorry.', es: 'Oh... La tomé y cambié. Era otro hombre. Le grité a Sam, a Carmen, a todos. Lo siento.' },
      { text: 'Yesterday a man in a dark coat came here. He went into Joe\'s new house. He touched the walls... and he cried. Then he walked to the farm road.', es: 'Ayer vino un hombre con abrigo oscuro. Entró a la casa nueva de Joe. Tocó las paredes... y lloró. Luego caminó hacia el camino de la granja.' },
      { text: 'This piece of metal is yours. And take this old helmet. Every builder needs one!', es: 'Este pedazo de metal es tuyo. Y toma este casco viejo. ¡Todo constructor necesita uno!' },
    ],
    freed: { text: 'I was a hard boss. Now I want a quiet street, with children and music. Well... maybe not too much music.', es: 'Fui un jefe duro. Ahora quiero una calle tranquila, con niños y música. Bueno... tal vez no tanta música.' },
    farewell: {
      q: 'Goodbye, kids! Tell me one thing about today.',
      options: ['We saw the new houses and we met Joe!', 'We seed the new houses and we meeted Joe!', 'We see the new houses yesterday!'],
      answer: 0,
      tip: 'Irregulares: see → saw, meet → met.',
    },
  },
}
