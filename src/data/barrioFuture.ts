import type { EnemyDef, Requirement, SceneDef, Zone } from '../game/types'
import { BARRIO_ENEMIES } from './barrio'
import { BARRIO_PAST_ENEMIES } from './barrioPast'

/**
 * Green Street en 2056 (A1, futuro): la misma distribución del barrio del presente. Las casas ya son viejas,
 * los árboles del parque son enormes y pasan carros que vuelan. La calle cumple 60 años (Joe construyó
 * la primera casa en 1996) y los vecinos preparan la fiesta del fin de semana.
 * Leo adulto vive en la casa del abuelo con su hijo Joey; Nick, tu hermano, vive en tu casa con su familia.
 * Gramática: preguntas con What / Where / When / Who + going to.
 * Aquí aparecen Olivia (del presente) y Sam, el albañil (de 1996), traídos por la luz del reloj.
 */
const MAP = [
  '################',
  'WA..K..#L..A..pW',
  '#......#.......#',
  '#p..J..#.....K.#',
  '###d#######d####',
  '#______________#',
  '#=====zz=======#',
  '#=====zz====E==#',
  '#______________#',
  '#P_,,Y,,,###X###',
  '#,,H,,,,,#L..AAW',
  '#,Y,,,k,,#.....#',
  '#,,,,,k,,#.K...W',
  '#,H,,,,Y,#.....#',
  '#,,,Y,,,,#p..J.#',
  '################',
]

function zoneAt(x: number, y: number): Zone {
  if (y <= 3) return x <= 6 ? 'casa-leo' : x >= 8 ? 'casa-maya' : 'calle-futuro'
  if (y >= 9 && x >= 10) return 'casa'
  if (y >= 10 && x <= 8) return 'parque'
  if (y === 9 && x >= 3 && x <= 8) return 'parque'
  return 'calle-futuro'
}

export const BARRIO_FUTURE_REQUIREMENTS: Requirement[] = [
  {
    id: 'future-party',
    name: 'la fiesta de los 60 años (Emma, en el parque)',
    line: {
      text: "What you are going to do in MY house? Who you are going to call? Go and help Emma with the party first!",
      es: '¿Qué vas a hacer en MI casa? ¿A quién vas a llamar? ¡Primero ve a ayudar a Emma con la fiesta! (Se equivoca con el orden de la pregunta).',
    },
  },
]

export const BARRIO_FUTURE: SceneDef = {
  id: 'barrio-future',
  name: 'Green Street (2056)',
  era: 'Futuro',
  topics: ['going-to-wh'],
  map: MAP,
  start: { x: 2, y: 9 },
  bossDoor: { x: 12, y: 9 },
  keysNeeded: 2,
  entities: [
    { type: 'friend', id: 'leo', x: 5, y: 12 },
    { type: 'interest', x: 3, y: 12 },
    { type: 'npc', id: 'leo-home', x: 5, y: 1 },
    { type: 'npc', id: 'emma-adult', x: 7, y: 12 },
    { type: 'npc', id: 'maya-adult', x: 9, y: 3 },
    { type: 'npc', id: 'rojas-old', x: 10, y: 1 },
    { type: 'enemy', id: 'barrio-future-m1', x: 2, y: 3 },
    { type: 'enemy', id: 'barrio-future-m2', x: 1, y: 14 },
    { type: 'enemy', id: 'barrio-future-olivia', x: 14, y: 5 },
    { type: 'enemy', id: 'barrio-future-sam', x: 7, y: 10 },
    { type: 'boss', id: 'barrio-future-boss', x: 12, y: 12 },
  ],
  labels: [
    { text: 'Casa de Leo', x: 3, y: 2 },
    { text: 'Casa de Maya', x: 11, y: 2 },
    { text: 'Green Street', x: 10, y: 7 },
    { text: 'Parque', x: 4, y: 13 },
    { text: 'Tu casa', x: 12, y: 13 },
  ],
  zoneAt,
  requirements: BARRIO_FUTURE_REQUIREMENTS,
  chips: (s) => [
    { label: `Llaves ${s.keys['barrio-future'] ?? 0}/2`, done: (s.keys['barrio-future'] ?? 0) >= 2 },
    { label: 'La fiesta de los 60 años', done: s.opened.includes('future-party') },
  ],
  intro: {
    first:
      'Green Street en 2056: las casas ya son viejas, los árboles del parque son enormes y la calle cumple 60 años. Otro fragmento de tu voz del futuro está aquí. Ayuda a Emma a organizar la fiesta y busca a Joey y a Lucy: tienen las dos mitades de la llave de tu casa.',
    later: 'Para preguntar planes: What / Where / When / Who + are you going to...? Visita la casa de Leo: alguien muy conocido vive ahí.',
  },
  epilogue: 'barrio-future-epilogue',
  door: {
    text: 'La puerta de tu casa está cerrada con llave.',
    sub: 'Necesitas las 2 mitades de la llave: las tienen Joey, en la casa de Leo, y Lucy, en el parque.',
  },
}

export const BARRIO_FUTURE_ENEMIES: Record<string, EnemyDef> = {
  'barrio-future-m1': {
    id: 'barrio-future-m1',
    name: 'Joey, el hijo del profe',
    person: 'Joey',
    kind: 'minion',
    hp: 5,
    topics: ['going-to-wh'],
    kinds: ['fill', 'fix', 'order', 'listen', 'write'],
    tags: ['casa-leo'],
    // El hijo de Leo adulto: se llama como el bisabuelo Joe y tiene la camiseta verde de su papá
    look: { shirt: '#3b9d5d', hair: '#2d2d3a', skin: '#e0ac69' },
    before: [
      { text: 'Hi, hi! Who you are? What you going to do in my house? Where you are going to go?', es: '¡Hola, hola! ¿Quién eres? ¿Qué vas a hacer en mi casa? ¿A dónde vas a ir? (Se equivoca con el orden: who you are, what you going to, where you are going).' },
      { text: 'Half of a key is in my toy box. My dad says: "Use your words." So... answer me!', es: 'La mitad de una llave está en mi caja de juguetes. Mi papá dice: "Usa tus palabras". Así que... ¡respóndeme!' },
    ],
    after: [
      { text: 'Who are you? What are you going to do? Where are you going to go? Ha ha, now I can ask!', es: '¿Quién eres? ¿Qué vas a hacer? ¿A dónde vas a ir? ¡Ja, ja, ahora sí sé preguntar!' },
      { text: 'Take the key. My name is Joey, like my great-grandpa Joe. He built this house!', es: 'Toma la llave. Me llamo Joey, como mi bisabuelo Joe. ¡Él construyó esta casa!' },
    ],
    freed: { text: 'What are you going to do at the party? I am going to eat a lot of cake!', es: '¿Qué vas a hacer en la fiesta? ¡Yo voy a comer mucho pastel!' },
    bonus: { q: 'One more! ___ are you going to go tomorrow?', options: ['Where', 'Who', 'What time is'], answer: 0, tip: 'Where = a dónde: Where are you going to go?' },
  },
  'barrio-future-m2': {
    id: 'barrio-future-m2',
    name: 'Lucy, la de las mascotas',
    person: 'Lucy',
    kind: 'minion',
    hp: 5,
    topics: ['going-to-wh'],
    kinds: ['fill', 'fix', 'order', 'listen', 'write'],
    tags: ['parque'],
    // Lucy, la niña de las mascotas del presente, treinta años después
    look: { shirt: '#e0a526', hair: '#d9822b', skin: '#f6d3b3', gender: 'female', accessory: 'glasses' },
    before: [
      { text: 'Hello! When you going to feed my dogs? Where I am going to put my cats? What my robot dog is going to eat?', es: '¡Hola! ¿Cuándo vas a darles de comer a mis perros? ¿Dónde voy a poner mis gatos? ¿Qué va a comer mi perro robot? (Se equivoca con el orden de las preguntas).' },
      { text: 'I have got eight pets and half of a key. Help me with my questions, please!', es: 'Tengo ocho mascotas y la mitad de una llave. ¡Ayúdame con mis preguntas, por favor!' },
    ],
    after: [
      { text: 'When are you going to feed my dogs? Where am I going to put my cats? What is my robot dog going to eat? Perfect!', es: '¿Cuándo vas a darles de comer a mis perros? ¿Dónde voy a poner mis gatos? ¿Qué va a comer mi perro robot? ¡Perfecto!' },
      { text: 'Here is the other half of the key. Nick is in your old house. He is very strange today... like thirty years ago!', es: 'Aquí está la otra mitad de la llave. Nick está en tu casa vieja. Hoy está muy raro... ¡como hace treinta años!' },
    ],
    freed: { text: 'My robot dog is going to dance at the party. Are you going to dance too?', es: 'Mi perro robot va a bailar en la fiesta. ¿Tú también vas a bailar?' },
    bonus: { q: 'Last question! ___ are you going to feed the dogs? — At six.', options: ['When', 'Where', 'Who'], answer: 0, tip: 'La respuesta es una hora (At six): When = cuándo.' },
  },

  // ── Viajeros de otras épocas: la luz del reloj los trajo a 2056. Al vencerlos vuelven a su tiempo ──
  'barrio-future-olivia': {
    ...BARRIO_ENEMIES['barrio-m2'],
    id: 'barrio-future-olivia',
    name: 'Olivia (viene del presente)',
    optional: true,
    echo: true,
    before: [
      { text: 'Breaking news! A car is fly over Green Street! The trees is growing very big! Where am I?', es: '¡Última hora! ¡Un carro "está volar" sobre Green Street! ¡Los árboles "está" creciendo mucho! ¿Dónde estoy? (Otra vez se equivoca con el presente continuo).' },
      { text: 'A white light brought me here. I am write my report... Help me with my words!', es: 'Una luz blanca me trajo aquí. "Estoy escribir" mi reportaje... ¡Ayúdame con mis palabras!' },
    ],
    after: [
      { text: 'A car is flying over Green Street! The trees are growing! What a story! And... the white light!', es: '¡Un carro está volando sobre Green Street! ¡Los árboles están creciendo! ¡Qué historia! Y... ¡la luz blanca!' },
      { text: 'I am going back to my time. Nobody is going to believe my report!', es: 'Vuelvo a mi tiempo. ¡Nadie va a creer mi reportaje!' },
    ],
    bonus: { q: 'Before you go! Look! The car ___ over the park.', options: ['is flying', 'is fly', 'flying'], answer: 0, tip: 'Presente continuo: is + flying.' },
  },
  'barrio-future-sam': {
    ...BARRIO_PAST_ENEMIES['barrio-past-m1'],
    id: 'barrio-future-sam',
    name: 'Sam (viene de 1996)',
    optional: true,
    echo: true,
    before: [
      { text: 'Hey! Yesterday I builded these houses... but now they are OLD! I goed to sleep and I waked up here!', es: '¡Oye! Ayer "construí" estas casas... ¡pero ahora están VIEJAS! "Me fui" a dormir y "desperté" aquí. (Otra vez se equivoca con los irregulares).' },
      { text: 'A white light taked me. Answer me, little builder!', es: 'Una luz blanca me "llevó". ¡Respóndeme, pequeño constructor!' },
    ],
    after: [
      { text: 'Yesterday I built these houses. I went to sleep and I woke up here. Sixty years! They are still good houses!', es: 'Ayer construí estas casas. Me fui a dormir y desperté aquí. ¡Sesenta años! ¡Siguen siendo buenas casas!' },
      { text: 'The light again! I am going back to 1996. I have got a lot of work!', es: '¡Otra vez la luz! Vuelvo a 1996. ¡Tengo mucho trabajo!' },
    ],
    bonus: { q: 'Before you go! Joe ___ the first house on Green Street.', options: ['built', 'builded', 'build'], answer: 0, tip: 'build → built.' },
  },

  'barrio-future-boss': {
    id: 'barrio-future-boss',
    name: 'Nick, tu hermano (2056)',
    person: 'Nick',
    kind: 'boss',
    reward: 'chaqueta-60',
    hp: 10,
    topics: ['going-to-wh', 'going-to-neg', 'going-to'],
    kinds: ['fill', 'fix', 'order', 'listen'],
    tags: ['casa'],
    phases: [
      { hp: 5, topics: ['going-to-wh'], kinds: ['fill', 'fix', 'listen'], tags: ['casa', 'parque'] },
      {
        hp: 5,
        topics: ['going-to-wh', 'going-to-neg', 'going-to', 'present-simple'],
        kinds: ['fill', 'fix', 'order', 'write'],
        tags: ['casa', 'calle-futuro', 'casa-leo'],
        line: { text: "Who is going to visit me? Nobody! When my family is going to come? Never! This house is MINE... like thirty years ago!", es: '¿Quién me va a visitar? ¡Nadie! ¿Cuándo va a venir mi familia? ¡Nunca! Esta casa es MÍA... ¡como hace treinta años!' },
      },
    ],
    // Nick treinta años después: la misma camiseta, con canas
    look: { shirt: '#3a3a5a', hair: '#8d8d8d', skin: '#f1c27d', accessory: 'glasses' },
    before: [
      { text: "Stop! What you are going to do in my house? Who you are going to call? I live alone here!", es: '¡Alto! ¿Qué vas a hacer en mi casa? ¿A quién vas a llamar? ¡Vivo solo aquí! (Se equivoca con el orden de las preguntas).' },
      { text: 'A shiny thing fell in the garden again. Again! Like thirty years ago... Now this house is MINE.', es: 'Otra vez cayó una cosa brillante en el jardín. ¡Otra vez! Como hace treinta años... Ahora esta casa es MÍA.' },
    ],
    after: [
      { text: "Oh... I don't live alone. My wife and my kids are going to come back tonight. What was I thinking?", es: 'Oh... No vivo solo. Mi esposa y mis hijos van a volver esta noche. ¿En qué estaba pensando?' },
      { text: "Last night a man in a dark coat stood in front of Leo's house. Leo was reading a story to Joey. The man put his hand on his throat... and he walked away. He didn't say a word.", es: 'Anoche un hombre con abrigo oscuro estuvo frente a la casa de Leo. Leo le leía un cuento a Joey. El hombre se puso la mano en la garganta... y se fue. No dijo ni una palabra.' },
      { text: 'This piece of metal is yours. And take this party jacket: "Green Street, 60 years". Happy birthday, Green Street!', es: 'Este pedazo de metal es tuyo. Y toma esta chaqueta de la fiesta: "Green Street, 60 años". ¡Feliz cumpleaños, Green Street!' },
    ],
    freed: { text: 'What are you going to eat at the party? Mom is going to bring her famous cake!', es: '¿Qué vas a comer en la fiesta? ¡Mamá va a traer su famoso pastel!' },
    farewell: {
      q: 'Goodbye! What are you going to do now?',
      options: ['We are going to visit the farm!', 'We going to visit the farm!', 'What we are going to visit the farm!'],
      answer: 0,
      tip: 'We + are going to + verbo.',
    },
  },
}
