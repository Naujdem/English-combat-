import type { EnemyDef, Requirement, SceneDef, Zone } from '../game/types'
import { CITY_ENEMIES } from './city'
import { FARM_ENEMIES } from './farm'

/**
 * La granja en 1996 (A1, pasado): un molino de viento, un trigal, un camino de tierra y la casa vieja
 * de la señora Brown (la mamá del señor Brown). Gramática: did / didn't (preguntas y negaciones en pasado).
 * Leyenda nueva:  n  molino de viento
 * Aquí aparecen dos esbirros del presente (Danny y Daisy): tocaron un fragmento y la luz del reloj
 * los trajo. Son opcionales: al vencerlos vuelven a su tiempo y dan un escudo.
 */
const MAP = [
  '################',
  '#yy..y.#K.....p#',
  '#......#.......#',
  '#y...y.#J......#',
  '###d#######X####',
  'f,,,,,,,,,,,,,,f',
  'f,fffff,,,,Y,,,f',
  'f,f,,,f,,n,,,,,f',
  'f,f,,,f,,,,,,Y,f',
  'f,ff,ff,,,,,,,,f',
  'frrrrrrrrrrrrrrf',
  'f,,,,,,,,,cccc,f',
  'f,ww,,,,,,cccc,f',
  'f,ww,,,,Y,,,,,,f',
  'f,,,,,,,,,,,,,,f',
  'ffffffffffffffff',
]

function zoneAt(x: number, y: number): Zone {
  if (y <= 3) return x <= 6 ? 'granero-viejo' : x >= 8 ? 'casa-vieja' : 'campo-viejo'
  return 'campo-viejo'
}

export const FARM_PAST_REQUIREMENTS: Requirement[] = [
  {
    id: 'past-mystery',
    name: 'el misterio del molino (Bill, al lado del molino)',
    line: {
      text: "Stop! Did you stopped my windmill? No? Then who did it? Ask Bill. I don't talk to strangers!",
      es: '¡Alto! ¿Tú paraste mi molino? ¿No? ¿Entonces quién fue? Pregúntale a Bill. ¡No hablo con desconocidos! (Se equivoca: dice "Did you stopped").',
    },
  },
]

export const FARM_PAST: SceneDef = {
  id: 'farm-past',
  name: 'La granja (1996)',
  era: 'Pasado',
  topics: ['past-did'],
  map: MAP,
  start: { x: 2, y: 14 },
  bossDoor: { x: 11, y: 4 },
  keysNeeded: 2,
  entities: [
    { type: 'friend', id: 'leo', x: 4, y: 14 },
    { type: 'interest', x: 6, y: 13 },
    { type: 'npc', id: 'bill', x: 8, y: 8 },
    { type: 'npc', id: 'hank', x: 12, y: 13 },
    { type: 'enemy', id: 'farm-past-m1', x: 4, y: 7 },
    { type: 'enemy', id: 'farm-past-m2', x: 2, y: 2 },
    { type: 'enemy', id: 'farm-past-danny', x: 13, y: 9 },
    { type: 'enemy', id: 'farm-past-daisy', x: 9, y: 12 },
    { type: 'boss', id: 'farm-past-boss', x: 12, y: 2 },
  ],
  labels: [
    { text: 'Granero', x: 3, y: 1 },
    { text: 'Casa', x: 11, y: 1 },
    { text: 'Molino', x: 9, y: 6 },
    { text: 'Trigal', x: 12, y: 11 },
  ],
  zoneAt,
  requirements: FARM_PAST_REQUIREMENTS,
  chips: (s) => [
    { label: `Llaves ${s.keys['farm-past'] ?? 0}/2`, done: (s.keys['farm-past'] ?? 0) >= 2 },
    { label: 'Misterio del molino', done: s.opened.includes('past-mystery') },
  ],
  intro: {
    first:
      'La granja en 1996: hay un molino de viento, pero está quieto. Otro fragmento de tu voz está aquí. Ayuda a Bill a descubrir quién paró el molino y busca a Max y a Priya: tienen las dos mitades de la llave. ¡Y cuidado! Algunos personajes del presente llegaron hasta aquí.',
    later: 'Para preguntar y negar en pasado: Did you...? · I didn\'t... Después de did, el verbo va simple: Did you go? (no "went").',
  },
  epilogue: 'farm-past-epilogue',
  door: {
    text: 'La puerta de la casa de la señora Brown está cerrada con llave.',
    sub: 'Necesitas las 2 mitades de la llave: las tienen Max, el cachorro, y Priya, la ayudante.',
  },
}

const ANIMAL_LOOK = { shirt: '#ffffff', hair: '#ffffff', skin: '#ffffff' }

export const FARM_PAST_ENEMIES: Record<string, EnemyDef> = {
  'farm-past-m1': {
    id: 'farm-past-m1',
    name: 'Max, el cachorro',
    person: 'Max',
    kind: 'minion',
    animal: 'dog',
    hp: 5,
    topics: ['past-did'],
    kinds: ['fill', 'fix', 'order', 'listen', 'write'],
    tags: ['campo-viejo'],
    look: ANIMAL_LOOK,
    before: [
      { text: "Woof... I mean, hello! I didn't ate the shoes! I didn't broke the door! Did you saw me? No!", es: 'Guau... digo, ¡hola! ¡Yo no me comí los zapatos! ¡No rompí la puerta! ¿Me viste? ¡No! (Se equivoca: dice didn\'t ate, didn\'t broke, did you saw).' },
      { text: 'Half of a key is under my blanket. Do you want it? Answer me first!', es: 'La mitad de una llave está debajo de mi cobija. ¿La quieres? ¡Primero respóndeme!' },
    ],
    after: [
      { text: "OK... I ate the shoes. But I didn't eat the door! Ha ha. Woof...", es: 'Bueno... Me comí los zapatos. ¡Pero no me comí la puerta! Ja, ja. Guau...' },
      { text: 'Take the key. My words are going away... Woof! Woof!', es: 'Toma la llave. Mis palabras se van... ¡Guau! ¡Guau!' },
    ],
    freed: { text: 'Woof!', es: '¡Guau! (Max ya no habla: las palabras eran tuyas.)' },
    bonus: { q: 'Last one! Did Max eat the door? — No, he ___.', options: ["didn't", "doesn't", "didn't ate"], answer: 0, tip: "Respuesta corta en pasado: No, he didn't." },
  },
  'farm-past-m2': {
    id: 'farm-past-m2',
    name: 'Priya, la ayudante',
    person: 'Priya',
    kind: 'minion',
    hp: 5,
    topics: ['past-did'],
    kinds: ['fill', 'fix', 'order', 'listen', 'write'],
    tags: ['granero-viejo'],
    // La doctora Patel de joven: la misma piel y el mismo pelo, todavía sin gafas
    look: { shirt: '#3b9d5d', hair: '#1f1f1f', skin: '#a0662e', gender: 'female' },
    before: [
      { text: "Hello! I want to be a vet one day. Yesterday I didn't gave food to the chickens, and they didn't gave eggs! Did they was hungry?", es: '¡Hola! Un día quiero ser veterinaria. Ayer no les di comida a las gallinas, ¡y no dieron huevos! ¿Tenían hambre? (Se equivoca: dice didn\'t gave y did they was).' },
      { text: 'Mrs. Brown gave me half of a key. Help me with my words, please!', es: 'La señora Brown me dio la mitad de una llave. ¡Ayúdame con mis palabras, por favor!' },
    ],
    after: [
      { text: "I didn't give food to the chickens. Were they hungry? Yes, they were! Poor chickens!", es: 'No les di comida a las gallinas. ¿Tenían hambre? ¡Sí! ¡Pobres gallinas!' },
      { text: 'Here is the other half of the key. Mrs. Brown is in her house. Be careful, she is very angry today.', es: 'Aquí está la otra mitad de la llave. La señora Brown está en su casa. Cuidado, hoy está muy enojada.' },
    ],
    freed: { text: 'I gave food to all the animals today. One day I am going to be a vet!', es: 'Hoy les di comida a todos los animales. ¡Un día voy a ser veterinaria!' },
    bonus: { q: 'Last question! ___ you give food to the chickens?', options: ['Did', 'Do', 'Were'], answer: 0, tip: 'Pregunta en pasado: Did you give...?' },
  },

  // ── Esbirros del presente: la luz del reloj los trajo a 1996. Al vencerlos vuelven a su tiempo ──
  'farm-past-danny': {
    ...CITY_ENEMIES['city-m1'],
    id: 'farm-past-danny',
    name: 'Danny (viene del presente)',
    optional: true,
    echo: true,
    before: [
      { text: 'Hey! Is there a café here? There have a... wait. Where am I? I touched the shiny piece in Mr. Rossi\'s office, and then... a big white light!', es: '¡Oye! ¿Hay un café aquí? "Hay"... espera. ¿Dónde estoy? Toqué la pieza brillante en la oficina del señor Rossi, y luego... ¡una gran luz blanca! (Otra vez se equivoca con there is / there are).' },
      { text: 'There is no bus, there are no shops... Is there a way home? Answer my questions!', es: 'No hay autobús, no hay tiendas... ¿Hay un camino a casa? ¡Responde mis preguntas!' },
    ],
    after: [
      { text: 'There IS a farm, and there ARE cows. And look, there is the white light again!', es: 'HAY una granja y HAY vacas. ¡Y mira, ahí está otra vez la luz blanca!' },
      { text: 'It is taking me home! Thank you! See you in the city!', es: '¡Me está llevando a casa! ¡Gracias! ¡Nos vemos en la ciudad!' },
    ],
    bonus: { q: 'Before you go! Is there a windmill on this farm?', options: ['Yes, there is.', 'Yes, there are.', "No, there isn't."], answer: 0, tip: 'Hay un molino (uno): Yes, there is.' },
  },
  'farm-past-daisy': {
    ...FARM_ENEMIES['farm-m1'],
    id: 'farm-past-daisy',
    name: 'Daisy (viene del presente)',
    optional: true,
    echo: true,
    before: [
      { text: "Moo... Where is my pen? This farm doesn't looks the same! I don't knows these cows!", es: 'Muu... ¿Dónde está mi corral? ¡Esta granja "no se ve" igual! ¡"No conozco" estas vacas! (Otra vez se equivoca con do / does).' },
      { text: 'A white light brought me here. Do you know the way home? Answer me!', es: 'Una luz blanca me trajo aquí. ¿Sabes el camino a casa? ¡Respóndeme!' },
    ],
    after: [
      { text: "This farm doesn't look the same because it is 1996! Moo... the white light again!", es: '¡Esta granja no se ve igual porque es 1996! Muu... ¡otra vez la luz blanca!' },
      { text: 'I am going home. Thank you... Moooo!', es: 'Me voy a casa. Gracias... ¡Muuuu!' },
    ],
    bonus: { q: 'Before you go! Does Daisy live on this farm in 1996?', options: ["No, she doesn't.", "No, she don't.", 'Yes, she do.'], answer: 0, tip: "Con she: No, she doesn't." },
  },

  'farm-past-boss': {
    id: 'farm-past-boss',
    name: 'La señora Brown, dueña de la granja',
    person: 'Mrs. Brown',
    kind: 'boss',
    reward: 'sombrero',
    hp: 10,
    topics: ['past-did', 'past-irregular', 'past-regular'],
    kinds: ['fill', 'fix', 'order', 'listen'],
    tags: ['casa-vieja'],
    phases: [
      { hp: 5, topics: ['past-did'], kinds: ['fill', 'fix', 'listen'], tags: ['casa-vieja', 'campo-viejo'] },
      {
        hp: 5,
        topics: ['past-did', 'past-irregular', 'past-regular'],
        kinds: ['fill', 'fix', 'order', 'write'],
        tags: ['casa-vieja', 'granero-viejo', 'obra', 'calle-vieja'],
        line: { text: "I didn't stopped! I didn't sleeped! Did you thought this farm was YOURS? It is MINE!", es: '¡No paré! ¡No dormí! ¿Creíste que esta granja era TUYA? ¡Es MÍA! (Se equivoca: didn\'t stopped, didn\'t sleeped, did you thought).' },
      },
    ],
    // La mamá del señor Brown: el mismo color de camisa que su hijo
    look: { shirt: '#3b6fb6', hair: '#bdbdbd', skin: '#e0ac69', gender: 'female', accessory: 'glasses' },
    before: [
      { text: "Stop! Did you came to steal my eggs? I didn't invited you!", es: '¡Alto! ¿Viniste a robar mis huevos? ¡Yo no te invité! (Se equivoca: dice did you came, didn\'t invited).' },
      { text: "Yesterday a shiny thing fell into my well. I picked it up, and now this farm is MINE. Did you understood?", es: 'Ayer una cosa brillante cayó en mi pozo. La recogí, y ahora esta granja es MÍA. ¿Entendiste? (Dice did you understood).' },
    ],
    after: [
      { text: "Oh... I didn't listen to anybody today. I shouted at Bill, at Priya, at everybody. I am sorry.", es: 'Oh... Hoy no escuché a nadie. Le grité a Bill, a Priya, a todos. Lo siento.' },
      { text: "Last night a man in a dark coat came here. He didn't eat, and he didn't sleep. He only asked me one question: 'Did anybody call for help here... a long time ago?' I didn't understand.", es: 'Anoche vino un hombre con abrigo oscuro. No comió y no durmió. Solo me hizo una pregunta: "¿Alguien pidió ayuda aquí... hace mucho tiempo?". No entendí.' },
      { text: 'This piece of metal is yours. And take this old farm shirt. The sun is strong here!', es: 'Este pedazo de metal es tuyo. Y toma esta camisa vieja de granja. ¡Aquí el sol es fuerte!' },
    ],
    freed: { text: 'The windmill works again, and the mice are back in the barn. Everything is OK!', es: 'El molino funciona otra vez, y los ratones volvieron al granero. ¡Todo está bien!' },
    farewell: {
      q: 'Goodbye, children! Did you like my farm?',
      options: ['Yes, we did! Thank you!', 'Yes, we liked!', 'Yes, we do liked!'],
      answer: 0,
      tip: 'Respuesta corta: Yes, we did.',
    },
  },
}
