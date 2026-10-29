import type { EnemyDef, Requirement, SceneDef, Zone } from '../game/types'
import { FARM_ENEMIES } from './farm'
import { FARM_PAST_ENEMIES } from './farmPast'

/**
 * La granja en 2056 (A1, futuro): la misma distribución de la granja del presente, con un molino eólico,
 * paneles solares, un tractor robot y un dron que cuida las ovejas. Rosie, ya adulta, es la dueña.
 * Gramática: predicciones con going to cuando se ve lo que va a pasar (Look at the clouds! It's going to rain).
 * Leyenda nueva:  1  molino eólico   2  panel solar   3  tractor robot
 * Aquí aparecen Thunder (del presente) y Max, el cachorro (de 1996), traídos por la luz del reloj.
 */
const MAP = [
  '################',
  '#yy..y.#K..A..p#',
  '#......#.......#',
  '#y.....#J......#',
  '###d#######X####',
  '#,,,,,,,,,,,,,,#',
  '#,fffff,,,,Y,1,#',
  '#,f,,,f,,ww,,,,#',
  '#,f,,,f,,ww,,Y,#',
  '#,ff,ff,,,,,3,,#',
  '#,,,,,,,,,cccc,#',
  '#,ff,ff,,,cccc,#',
  '#,f,,,f,,,,,,,,#',
  '#,f,,,f,,Y,,,,,#',
  '#,fffff,,2222,,#',
  '################',
]

function zoneAt(x: number, y: number): Zone {
  if (y <= 3) return x <= 6 ? 'granero' : x >= 8 ? 'casa-granja' : 'campo'
  if (x >= 2 && x <= 6 && ((y >= 6 && y <= 9) || (y >= 11 && y <= 14))) return 'corral'
  return 'campo'
}

export const FARM_FUTURE_REQUIREMENTS: Requirement[] = [
  {
    id: 'future-predict',
    name: '¿qué va a pasar? (Rosie, en el granero)',
    line: {
      text: "Stop! It's not going to rain! The robots is going to break everything! Go and talk to my granddaughter Rosie!",
      es: '¡Alto! ¡No va a llover! ¡Los robots van a romper todo! ¡Ve a hablar con mi nieta Rosie! (Se equivoca: dice "The robots is going to").',
    },
  },
]

export const FARM_FUTURE: SceneDef = {
  id: 'farm-future',
  name: 'La granja (2056)',
  era: 'Futuro',
  topics: ['going-to-predict'],
  map: MAP,
  start: { x: 8, y: 14 },
  bossDoor: { x: 11, y: 4 },
  keysNeeded: 2,
  entities: [
    { type: 'friend', id: 'leo', x: 10, y: 13 },
    { type: 'interest', x: 13, y: 12 },
    { type: 'npc', id: 'rosie-adult', x: 4, y: 2 },
    { type: 'npc', id: 'patel-old', x: 8, y: 9 },
    { type: 'enemy', id: 'farm-future-m1', x: 3, y: 7 },
    { type: 'enemy', id: 'farm-future-m2', x: 13, y: 5 },
    { type: 'enemy', id: 'farm-future-thunder', x: 3, y: 12 },
    { type: 'enemy', id: 'farm-future-max', x: 14, y: 10 },
    { type: 'boss', id: 'farm-future-boss', x: 11, y: 2 },
    { type: 'animal', kind: 'sheep', x: 5, y: 7 },
    { type: 'animal', kind: 'sheep', x: 3, y: 8 },
    { type: 'animal', kind: 'chicken', x: 5, y: 13 },
    { type: 'animal', kind: 'cow', x: 3, y: 13 },
    { type: 'animal', kind: 'duck', x: 11, y: 7 },
    { type: 'animal', kind: 'cat', x: 6, y: 1 },
  ],
  labels: [
    { text: 'Granero', x: 3, y: 3 },
    { text: 'Casa', x: 11, y: 3 },
    { text: 'Corral', x: 4, y: 9 },
    { text: 'Estanque', x: 10, y: 9 },
    { text: 'Paneles', x: 10, y: 13 },
  ],
  zoneAt,
  requirements: FARM_FUTURE_REQUIREMENTS,
  chips: (s) => [
    { label: `Llaves ${s.keys['farm-future'] ?? 0}/2`, done: (s.keys['farm-future'] ?? 0) >= 2 },
    { label: '¿Qué va a pasar?', done: s.opened.includes('future-predict') },
  ],
  intro: {
    first:
      'La granja en 2056: un molino eólico, paneles solares, un tractor robot y un dron que cuida las ovejas. Rosie, la nieta del señor Brown, ahora es la dueña. Otro fragmento de tu voz del futuro está aquí. Ayuda a Rosie y busca a D-4 y a Finn: tienen las dos mitades de la llave.',
    later: "Cuando ves lo que va a pasar, usa going to: Look at the clouds! It's going to rain.",
  },
  epilogue: 'farm-future-epilogue',
  door: {
    text: 'La puerta de la casa de la granja está cerrada con llave.',
    sub: 'Necesitas las 2 mitades de la llave: las tienen D-4, el dron pastor, y Finn, el hijo de Rosie.',
  },
}

const ANIMAL_LOOK = { shirt: '#ffffff', hair: '#ffffff', skin: '#ffffff' }

export const FARM_FUTURE_ENEMIES: Record<string, EnemyDef> = {
  'farm-future-m1': {
    id: 'farm-future-m1',
    name: 'D-4, el dron pastor',
    person: 'D-4',
    kind: 'minion',
    animal: 'robot',
    hp: 5,
    topics: ['going-to-predict'],
    kinds: ['fill', 'fix', 'order', 'listen', 'write'],
    tags: ['corral'],
    look: { shirt: '#9aa6b2', hair: '#5d8fd4', skin: '#d9e2ea' },
    before: [
      { text: "BZZZ! Look at the clouds! It going to rain! The sheeps is going to run away! The sky are going to fall!", es: '¡BZZZ! ¡Mira las nubes! ¡Va a llover! ¡Las ovejas se van a escapar! ¡El cielo se va a caer! (Se equivoca: It going to, the sheeps is, the sky are).' },
      { text: 'Half of a key is in my camera box. My sensors say: you are going to answer my questions. BZZZ!', es: 'La mitad de una llave está en la caja de mi cámara. Mis sensores dicen: vas a responder mis preguntas. ¡BZZZ!' },
    ],
    after: [
      { text: "BZZZ. It's going to rain. The sheep are going to stay in the barn. The sky isn't going to fall. System OK!", es: 'BZZZ. Va a llover. Las ovejas se van a quedar en el granero. El cielo no se va a caer. ¡Sistema bien!' },
      { text: 'Take the key. Finn has the other half. He is near the house. BZZZ!', es: 'Toma la llave. Finn tiene la otra mitad. Está cerca de la casa. ¡BZZZ!' },
    ],
    freed: { text: "BZZZ! Look at the sheep. They're going to sleep. Shh!", es: '¡BZZZ! Mira las ovejas. Se van a dormir. ¡Shh!' },
    bonus: { q: 'One more! Look at those black clouds! It ___ rain.', options: ["'s going to", 'going to', 'is go to'], answer: 0, tip: "It + is ('s) going to + rain." },
  },
  'farm-future-m2': {
    id: 'farm-future-m2',
    name: 'Finn, el hijo de Rosie',
    person: 'Finn',
    kind: 'minion',
    hp: 5,
    topics: ['going-to-predict'],
    kinds: ['fill', 'fix', 'order', 'listen', 'write'],
    tags: ['campo'],
    // El hijo de Rosie: el mismo pelo rojizo de su mamá
    look: { shirt: '#3b6fb6', hair: '#c0602a', skin: '#f6d3b3', accessory: 'cap' },
    before: [
      { text: "Hey! Careful! That tractor is go to fall in the pond! And that cow are going eat my hat!", es: '¡Oye! ¡Cuidado! ¡Ese tractor se va a caer al estanque! ¡Y esa vaca se va a comer mi sombrero! (Se equivoca: is go to, are going eat).' },
      { text: 'My grandpa gave me half of a key. Answer me, city kid!', es: 'Mi abuelo me dio la mitad de una llave. ¡Respóndeme, niño de ciudad!' },
    ],
    after: [
      { text: "That tractor is going to fall in the pond! That cow is going to eat my hat! Ha ha, now I can say it!", es: '¡Ese tractor se va a caer al estanque! ¡Esa vaca se va a comer mi sombrero! ¡Ja, ja, ahora sí lo puedo decir!' },
      { text: 'Here is the other half of the key. My great-grandpa is in the house. He is very angry with the robots today.', es: 'Aquí está la otra mitad de la llave. Mi bisabuelo está en la casa. Hoy está muy enojado con los robots.' },
    ],
    freed: { text: "My mom says I'm going to be a farmer, like her. And like my grandpa, and my great-grandpa!", es: 'Mi mamá dice que voy a ser granjero, como ella. ¡Y como mi abuelo, y mi bisabuelo!' },
    bonus: { q: 'Last question! Look! The cow is next to your hat. She ___ eat it!', options: ["'s going to", 'going to', 'goes to'], answer: 0, tip: "She + is ('s) going to + eat." },
  },

  // ── Viajeros de otras épocas: la luz del reloj los trajo a 2056. Al vencerlos vuelven a su tiempo ──
  'farm-future-thunder': {
    ...FARM_ENEMIES['farm-m2'],
    id: 'farm-future-thunder',
    name: 'Thunder (viene del presente)',
    optional: true,
    echo: true,
    look: { ...ANIMAL_LOOK },
    before: [
      { text: "Neigh! Do this robot eats grass? Does the sheeps likes the drone? Where is my old barn?", es: '¡Relincho! ¿Este robot "come" pasto? ¿Las ovejas "les gusta" el dron? ¿Dónde está mi granero viejo? (Otra vez se equivoca con do / does).' },
      { text: 'A white light brought me here. Answer me, and maybe I can go home!', es: 'Una luz blanca me trajo aquí. ¡Respóndeme, y tal vez pueda volver a casa!' },
    ],
    after: [
      { text: "Does this robot eat grass? No, it doesn't! Do the sheep like the drone? Yes, they do. Neigh... the light!", es: '¿Este robot come pasto? ¡No! ¿A las ovejas les gusta el dron? Sí. Relincho... ¡la luz!' },
      { text: 'I am going home. Neeeigh!', es: 'Me voy a casa. ¡Relinchooo!' },
    ],
    bonus: { q: 'Before you go! Does a horse eat robots?', options: ["No, it doesn't.", "No, it don't.", 'Yes, it does.'], answer: 0, tip: "Con it: No, it doesn't." },
  },
  'farm-future-max': {
    ...FARM_PAST_ENEMIES['farm-past-m1'],
    id: 'farm-future-max',
    name: 'Max (viene de 1996)',
    optional: true,
    echo: true,
    before: [
      { text: "Woof! Where is my farm? Where is the windmill? I didn't saw any robots yesterday! Did you brought me here?", es: '¡Guau! ¿Dónde está mi granja? ¿Dónde está el molino? ¡Ayer no "vi" robots! ¿Tú me "trajiste" aquí? (Otra vez se equivoca con did / didn\'t).' },
      { text: 'A white light took me. Answer me, and I am going to give you a big lick!', es: 'Una luz blanca me llevó. ¡Respóndeme y te voy a dar un gran lengüetazo!' },
    ],
    after: [
      { text: "I didn't see any robots yesterday. Did you bring me here? No! The light did. Woof, woof!", es: 'Ayer no vi robots. ¿Tú me trajiste? ¡No! Fue la luz. ¡Guau, guau!' },
      { text: 'The light is here again! Bye! Woof!', es: '¡La luz volvió! ¡Adiós! ¡Guau!' },
    ],
    bonus: { q: 'Before you go! ___ Max eat the shoes in 1996?', options: ['Did', 'Does', 'Is'], answer: 0, tip: 'Pasado: Did Max eat...?' },
  },

  'farm-future-boss': {
    id: 'farm-future-boss',
    name: 'El abuelo Brown (2056)',
    person: 'Grandpa Brown',
    kind: 'boss',
    reward: 'overol-solar',
    hp: 10,
    topics: ['going-to-predict', 'going-to', 'do-does'],
    kinds: ['fill', 'fix', 'order', 'listen'],
    tags: ['casa-granja'],
    phases: [
      { hp: 5, topics: ['going-to-predict'], kinds: ['fill', 'fix', 'listen'], tags: ['casa-granja', 'campo'] },
      {
        hp: 5,
        topics: ['going-to-predict', 'going-to', 'going-to-neg', 'do-does'],
        kinds: ['fill', 'fix', 'order', 'write'],
        tags: ['casa-granja', 'corral', 'granero'],
        line: { text: "The robots is going to take my farm! My cows doesn't like them! It isn't going to... it IS going to rain!", es: '¡Los robots se van a quedar con mi granja! ¡A mis vacas no les gustan! No va a... ¡SÍ va a llover!' },
      },
    ],
    // El señor Brown, sesenta años después de 1996: la misma gorra y la misma camisa azul, muy mayor
    look: { shirt: '#3b6fb6', hair: '#f0f0f0', skin: '#e0ac69', accessory: 'glasses' },
    before: [
      { text: "Stop! I'm ninety years old, and I know my farm! It's not going to rain. Those robots is going to break everything!", es: '¡Alto! ¡Tengo noventa años y conozco mi granja! No va a llover. ¡Esos robots van a romper todo! (Se equivoca: those robots is going to).' },
      { text: 'A shiny thing fell on my roof last night. Now the farm is MINE again. Not Rosie\'s, not the robots\'... MINE!', es: 'Anoche cayó una cosa brillante en mi techo. Ahora la granja es MÍA otra vez. Ni de Rosie, ni de los robots... ¡MÍA!' },
    ],
    after: [
      { text: "Oh... Rosie is a great farmer. The robots aren't going to break anything. And look at those clouds... it's going to rain.", es: 'Oh... Rosie es una gran granjera. Los robots no van a romper nada. Y mira esas nubes... va a llover.' },
      { text: "Last night a man in a dark coat sat on my porch. He looked at the sky and asked: 'Is it going to rain?' I said yes. He said: 'Good. Rain is loud... nobody can hear you in the rain.'", es: 'Anoche un hombre con abrigo oscuro se sentó en mi porche. Miró el cielo y preguntó: "¿Va a llover?". Le dije que sí. Dijo: "Bien. La lluvia es ruidosa... nadie te puede oír en la lluvia".' },
      { text: 'This piece of metal is yours. And take these solar overalls: they are going to keep you warm!', es: 'Este pedazo de metal es tuyo. Y toma este overol solar: ¡te va a mantener caliente!' },
    ],
    freed: { text: "Sixty years ago I fixed the windmill with two kids... and they looked like you! Ha ha. Strange, no?", es: 'Hace sesenta años arreglé el molino con dos niños... ¡y se parecían a ustedes! Ja, ja. Raro, ¿no?' },
    farewell: {
      q: 'Goodbye, kids! Look at the sky. What is going to happen?',
      options: ["It's going to rain! Goodbye!", 'It going to rain! Goodbye!', 'It rains tomorrow yesterday!'],
      answer: 0,
      tip: "It + is ('s) going to + rain.",
    },
  },
}
