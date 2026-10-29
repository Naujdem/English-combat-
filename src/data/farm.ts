import type { EnemyDef, Requirement, SceneDef, Zone } from '../game/types'

/**
 * Mapa de la granja (A1, presente). Leyenda además de las anteriores:
 *  y  heno   f  cerca   w  estanque   c  maíz
 * Arriba: el granero (izquierda) y la casa del granjero (derecha, jefe).
 * Abajo: dos corrales, el estanque y el maizal. Se llega en bicicleta por el camino.
 */
const MAP = [
  '################',
  '#yy..y.#K..A..p#',
  '#......#.......#',
  '#y.....#J......#',
  '###d#######X####',
  '#,,,,,,,,,,,,,,#',
  '#,fffff,,,,Y,,,#',
  '#,f,,,f,,ww,,,,#',
  '#,f,,,f,,ww,,Y,#',
  '#,ff,ff,,,,,,,,#',
  '#,,,,,,,,,cccc,#',
  '#,ff,ff,,,cccc,#',
  '#,f,,,f,,,,,,,,#',
  '#,f,,,f,,Y,,,,,#',
  '#,fffff,,,,,,,,#',
  '################',
]

function zoneAt(x: number, y: number): Zone {
  if (y <= 3) return x <= 6 ? 'granero' : x >= 8 ? 'casa-granja' : 'campo'
  if (x >= 2 && x <= 6 && ((y >= 6 && y <= 9) || (y >= 11 && y <= 14))) return 'corral'
  return 'campo'
}

export const FARM_REQUIREMENTS: Requirement[] = [
  {
    id: 'farm-guess',
    name: 'conocer a los animales (el juego de Rosie en el granero)',
    line: {
      text: "Who are you? You don't know my animals! Ask my granddaughter Rosie. She plays a game in the barn.",
      es: '¿Quién eres? ¡No conoces a mis animales! Pregúntale a mi nieta Rosie. Ella juega un juego en el granero.',
    },
  },
  {
    id: 'farm-pens',
    name: 'los animales en sus corrales (la doctora Patel)',
    line: {
      text: 'My animals are in the wrong pens! Help Dr. Patel, the vet. Then come back.',
      es: '¡Mis animales están en los corrales equivocados! Ayuda a la doctora Patel, la veterinaria. Luego vuelve.',
    },
  },
]

export const FARM: SceneDef = {
  id: 'farm',
  name: 'La granja',
  topics: ['do-does', 'plurals'],
  map: MAP,
  start: { x: 8, y: 14 },
  bossDoor: { x: 11, y: 4 },
  keysNeeded: 3,
  entities: [
    { type: 'friend', id: 'leo', x: 10, y: 13 },
    { type: 'interest', x: 13, y: 12 },
    { type: 'npc', id: 'rosie', x: 4, y: 2 },
    { type: 'npc', id: 'patel', x: 8, y: 9 },
    { type: 'enemy', id: 'farm-m1', x: 3, y: 7 },
    { type: 'enemy', id: 'farm-m2', x: 13, y: 5 },
    { type: 'enemy', id: 'farm-m3', x: 3, y: 12 },
    { type: 'boss', id: 'farm-boss', x: 11, y: 2 },
    { type: 'animal', kind: 'pig', x: 5, y: 7 },
    { type: 'animal', kind: 'chicken', x: 5, y: 13 },
    { type: 'animal', kind: 'chicken', x: 5, y: 12 },
    { type: 'animal', kind: 'duck', x: 11, y: 7 },
    { type: 'animal', kind: 'goose', x: 11, y: 8 },
    { type: 'animal', kind: 'dog', x: 12, y: 14 },
    { type: 'animal', kind: 'cat', x: 6, y: 1 },
    { type: 'animal', kind: 'rabbit', x: 14, y: 10 },
  ],
  labels: [
    { text: 'Granero', x: 3, y: 3 },
    { text: 'Casa', x: 11, y: 3 },
    { text: 'Corral', x: 4, y: 9 },
    { text: 'Estanque', x: 10, y: 9 },
    { text: 'Maíz', x: 12, y: 12 },
  ],
  zoneAt,
  requirements: FARM_REQUIREMENTS,
  chips: (s) => [
    { label: `Llaves ${s.keys.farm ?? 0}/3`, done: (s.keys.farm ?? 0) >= 3 },
    { label: 'Juego de Rosie', done: s.opened.includes('farm-guess') },
    { label: 'Corrales', done: s.opened.includes('farm-pens') },
  ],
  intro: {
    first:
      'La granja del señor Brown. ¡Aquí los animales hablan! Tres tocaron pedazos de la llave de la casa y hablan con errores. Juega con Rosie en el granero, ayuda a la veterinaria con los corrales y libera a los animales.',
    later: 'Choca con los animales para oír su nombre en inglés. Los que tienen una barra roja tocaron un fragmento.',
  },
  epilogue: 'farm-epilogue',
  door: {
    text: 'La puerta de la casa del granjero está cerrada con llave.',
    sub: 'Necesitas 3 pedazos de la llave: los tienen la vaca, el caballo y la oveja que hablan.',
  },
}

const ANIMAL_LOOK = { shirt: '#ffffff', hair: '#ffffff', skin: '#ffffff' }

export const FARM_ENEMIES: Record<string, EnemyDef> = {
  'farm-m1': {
    id: 'farm-m1',
    name: 'Daisy, la vaca presumida',
    person: 'Daisy',
    kind: 'minion',
    animal: 'cow',
    hp: 4,
    topics: ['do-does'],
    kinds: ['fill', 'fix', 'order', 'listen', 'write'],
    tags: ['corral'],
    look: { ...ANIMAL_LOOK, gender: 'female' },
    before: [
      { text: "Moo... I mean, hello! I doesn't eat grass. I eats pizza! And I don't gives milk. I gives milkshakes!", es: 'Muu... digo, ¡hola! Yo "no come" pasto. ¡Yo "come" pizza! Y "no da" leche. ¡Doy malteadas!' },
      { text: 'This shiny thing in my pen gives me words. And a piece of a key. Do you want it? Then answer me!', es: 'Esta cosa brillante de mi corral me da palabras. Y un pedazo de llave. ¿Lo quieres? ¡Entonces respóndeme!' },
    ],
    after: [
      { text: "OK, OK... I don't eat pizza. I eat grass. And I give milk. Cows don't make milkshakes!", es: 'Bueno, bueno... No como pizza. Como pasto. Y doy leche. ¡Las vacas no hacen malteadas!' },
      { text: 'Here is the piece of the key. My words are going away... Moo... Moooo!', es: 'Aquí está el pedazo de la llave. Mis palabras se van... Muu... ¡Muuuu!' },
    ],
    freed: { text: 'Moo!', es: '¡Muu! (Daisy ya no habla: las palabras eran tuyas.)' },
    bonus: { q: 'Last question! Does a cow eat grass?', options: ['Yes, it does.', 'Yes, it do.', 'Yes, it eats.'], answer: 0, tip: 'Respuesta corta con does: Yes, it does.' },
  },
  'farm-m2': {
    id: 'farm-m2',
    name: 'Thunder, el caballo preguntón',
    person: 'Thunder',
    kind: 'minion',
    animal: 'horse',
    hp: 4,
    topics: ['do-does'],
    kinds: ['fill', 'fix', 'order', 'listen', 'write'],
    tags: ['campo'],
    look: { ...ANIMAL_LOOK },
    before: [
      { text: 'Neigh! Questions, questions! Does you ride horses? Do the farmer works today? Where the chickens sleeps?', es: '¡Iiih! ¡Preguntas, preguntas! ¿"Montas" caballos? ¿El granjero "trabaja" hoy? ¿Dónde "duermen" las gallinas?' },
      { text: 'I found a piece of a key in the field. Answer my questions... if you can!', es: 'Encontré un pedazo de llave en el campo. Responde mis preguntas... ¡si puedes!' },
    ],
    after: [
      { text: 'Do you ride horses? Does the farmer work today? Ah, now my questions are perfect!', es: '¿Montas caballos? ¿El granjero trabaja hoy? ¡Ah, ahora mis preguntas son perfectas!' },
      { text: 'Take the piece of the key. The farmer is in his house. He is very strange today... Neigh!', es: 'Toma el pedazo de la llave. El granjero está en su casa. Hoy está muy raro... ¡Iiih!' },
    ],
    freed: { text: 'Neigh!', es: '¡Iiih! (Thunder ya no habla.)' },
    bonus: { q: 'One more! Do horses fly?', options: ["No, they don't.", "No, they doesn't.", "No, it don't."], answer: 0, tip: 'Horses son varios (they): No, they don\'t.' },
  },
  'farm-m3': {
    id: 'farm-m3',
    name: 'Fluffy, la oveja confundida',
    person: 'Fluffy',
    kind: 'minion',
    animal: 'sheep',
    hp: 4,
    topics: ['plurals'],
    kinds: ['fill', 'fix', 'order', 'listen', 'write'],
    tags: ['corral', 'campo'],
    look: { ...ANIMAL_LOOK, gender: 'female' },
    before: [
      { text: 'Baa! Look at all the sheeps! And the gooses! And the mouses in the barn! I count them all day!', es: '¡Bee! ¡Mira todas las "ovejas"! ¡Y los "gansos"! ¡Y los "ratones" del granero! ¡Los cuento todo el día!' },
      { text: 'I have got a piece of a key. One piece, two pieces... Count with me, and maybe I give it to you!', es: 'Tengo un pedazo de llave. Un pedazo, dos pedazos... ¡Cuenta conmigo y quizás te lo doy!' },
    ],
    after: [
      { text: 'One sheep, two sheep. One goose, two geese. One mouse, two mice! Now I can count!', es: 'Una oveja, dos ovejas. Un ganso, dos gansos. Un ratón, dos ratones. ¡Ahora sé contar!' },
      { text: 'Here, take the key. Baa... my words are going... Baaa!', es: 'Toma la llave. Bee... mis palabras se van... ¡Beee!' },
    ],
    freed: { text: 'Baa!', es: '¡Bee! (Fluffy ya no habla.)' },
    bonus: { q: 'Count with me! One child, two...?', options: ['childs', 'children', 'childrens'], answer: 1, tip: 'child → children.' },
  },
  'farm-boss': {
    id: 'farm-boss',
    name: 'El señor Brown, el granjero',
    person: 'Mr. Brown',
    kind: 'boss',
    reward: 'overol',
    hp: 10,
    topics: ['do-does', 'plurals', 'present-simple'],
    kinds: ['fill', 'fix', 'order', 'listen'],
    tags: ['casa-granja'],
    phases: [
      { hp: 4, topics: ['do-does'], kinds: ['fill', 'fix', 'listen'], tags: ['casa-granja', 'corral'] },
      {
        hp: 3,
        topics: ['plurals', 'do-does'],
        kinds: ['fill', 'fix', 'order'],
        tags: ['campo', 'granero'],
        line: { text: 'My sheeps! My gooses! My mouses! Everything is MINE!', es: '¡Mis "ovejas"! ¡Mis "gansos"! ¡Mis "ratones"! ¡Todo es MÍO!' },
      },
      {
        hp: 3,
        topics: ['do-does', 'plurals', 'present-simple'],
        kinds: ['fill', 'order', 'listen', 'fix', 'write'],
        tags: ['casa-granja', 'campo'],
        line: { text: 'Do the cows... does the farmer... What do I do every day? I... I milk the cows!', es: '¿Las vacas... el granjero...? ¿Qué hago todos los días? Yo... ¡yo ordeño las vacas!' },
      },
    ],
    look: { shirt: '#3b6fb6', hair: '#c9c9c9', skin: '#e0ac69', accessory: 'cap' },
    before: [
      { text: 'Stop! This is my farm. The cows doesn\'t work! Do the chickens gives eggs? NO!', es: '¡Alto! Esta es mi granja. ¡Las vacas "no trabaja"! ¿Las gallinas "dan" huevos? ¡NO!' },
      { text: 'This morning a shiny piece of metal falls from the sky into my field. Now my animals talk... and they talk too much!', es: 'Esta mañana cae del cielo una pieza de metal brillante en mi campo. Ahora mis animales hablan... ¡y hablan demasiado!' },
      { text: 'Do you want this piece? Answer my questions, city kid!', es: '¿Quieres esta pieza? ¡Responde mis preguntas, niño de ciudad!' },
    ],
    after: [
      { text: 'Oh... my head. Where are my glasses? Rosie? Are you OK?', es: 'Oh... mi cabeza. ¿Dónde están mis gafas? ¿Rosie? ¿Estás bien?' },
      { text: 'Yesterday a man in a dark coat comes to my farm. He doesn\'t say his name. He talks to my dog very slowly and very clearly... like a teacher with a student. Strange, no?', es: 'Ayer un hombre con abrigo oscuro viene a mi granja. No dice su nombre. Le habla a mi perro muy despacio y muy claro... como un profesor con un alumno. Raro, ¿no?' },
      { text: 'Take this piece of the clock. And this, my old overalls: every farmer needs them!', es: 'Toma esta pieza del reloj. Y esto, mi overol viejo: ¡todo granjero lo necesita!' },
    ],
    freed: { text: 'Do you like my farm? We have got cows, sheep, geese... and a lot of mice in the barn!', es: '¿Te gusta mi granja? Tenemos vacas, ovejas, gansos... ¡y muchos ratones en el granero!' },
    farewell: {
      q: 'Thank you, young friend! Do you want some fresh milk before you go?',
      options: ['Yes, please! Thank you!', 'Yes, I does!', 'No, I not want.'],
      answer: 0,
      tip: 'Para aceptar con amabilidad: "Yes, please!". Con "I" se dice "I do" o "I don\'t", nunca "I does".',
    },
  },
}
