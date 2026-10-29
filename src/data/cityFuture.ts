import type { EnemyDef, Requirement, SceneDef, Zone } from '../game/types'
import { CITY_ENEMIES } from './city'
import { CITY_PAST_ENEMIES } from './cityPast'

/**
 * La ciudad en 2056 (A1, futuro): la misma distribución de la ciudad del presente, pero de vidrio,
 * con carros que vuelan, un café con meseros robot y la estatua de Tony Rossi junto a la fuente vieja.
 * Gramática: going to en negativo y en preguntas (isn't going to · Are you going to...? Yes, I am).
 * Leyenda nueva:  E  carro volador   Z  estatua de Rossi
 * Aquí aparecen Víctor (del presente) y Betty (de 1996), traídos por la luz del reloj.
 */
const MAP = [
  'qqqqqqqqqqqqqqqq',
  'q.K.K.qR.R.R.R.q',
  'q.....q........q',
  'qCC.K.qQ.R.R.R.q',
  'q.....q........q',
  'qqdqqqqqqqdqqqqq',
  'q______________q',
  'q=====zz=======q',
  'q==E==zz=====E=q',
  'q______________q',
  'qP__Y______qqqqq',
  'q______NN__qOOiq',
  'q__H___NNZ_X...q',
  'q_Y________q...q',
  'q______H___q...q',
  'qqqqqqqqqqqqqqqq',
]

function zoneAt(x: number, y: number): Zone {
  if (y <= 5) return x <= 6 ? 'cafe' : 'tienda'
  if (y >= 10 && x >= 11) return 'turismo-futuro'
  return 'calle-futuro'
}

export const CITY_FUTURE_REQUIREMENTS: Requirement[] = [
  {
    id: 'future-tour',
    name: 'la ruta de los turistas (Marco, el guía holograma, en la plaza)',
    line: {
      text: "Stop! You isn't going to enter my office! Are you going to help the tourists? No? Then talk to Marco in the plaza!",
      es: '¡Alto! ¡No vas a entrar a mi oficina! ¿Vas a ayudar a los turistas? ¿No? ¡Entonces habla con Marco en la plaza! (Se equivoca: dice "You isn\'t going to").',
    },
  },
]

export const CITY_FUTURE: SceneDef = {
  id: 'city-future',
  name: 'La ciudad (2056)',
  era: 'Futuro',
  topics: ['going-to-neg'],
  map: MAP,
  start: { x: 3, y: 10 },
  bossDoor: { x: 11, y: 12 },
  keysNeeded: 2,
  entities: [
    { type: 'friend', id: 'leo', x: 9, y: 10 },
    { type: 'interest', x: 9, y: 13 },
    { type: 'npc', id: 'park-old', x: 2, y: 11 },
    { type: 'npc', id: 'rosa-chief', x: 5, y: 9 },
    { type: 'npc', id: 'lily-adult', x: 1, y: 4 },
    { type: 'npc', id: 'marco', x: 5, y: 13 },
    { type: 'enemy', id: 'city-future-m1', x: 4, y: 2 },
    { type: 'enemy', id: 'city-future-m2', x: 12, y: 2 },
    { type: 'enemy', id: 'city-future-victor', x: 14, y: 9 },
    { type: 'enemy', id: 'city-future-betty', x: 4, y: 14 },
    { type: 'boss', id: 'city-future-boss', x: 13, y: 13 },
  ],
  labels: [
    { text: 'Café robot', x: 3, y: 4 },
    { text: 'Holo-tienda', x: 11, y: 4 },
    { text: 'Sky Street', x: 10, y: 7 },
    { text: 'Plaza', x: 6, y: 14 },
    { text: 'Alcaldía', x: 13, y: 14 },
  ],
  zoneAt,
  requirements: CITY_FUTURE_REQUIREMENTS,
  chips: (s) => [
    { label: `Llaves ${s.keys['city-future'] ?? 0}/2`, done: (s.keys['city-future'] ?? 0) >= 2 },
    { label: 'Ruta de los turistas', done: s.opened.includes('future-tour') },
  ],
  intro: {
    first:
      'La ciudad en 2056: carros que vuelan, un café con meseros robot... y la fuente vieja, que sigue en la plaza. Otro fragmento de tu voz del futuro está aquí. Ayuda a Marco, el guía holograma, con la ruta de los turistas, y busca a W-8 y a Chloe: tienen las dos mitades de la llave.',
    later: "Para negar y preguntar con going to: She isn't going to... · Are you going to...? Yes, I am. Choca con la estatua de la plaza: ¿de quién es?",
  },
  epilogue: 'city-future-epilogue',
  door: {
    text: 'La puerta de la alcaldía está cerrada con llave.',
    sub: 'Necesitas las 2 mitades de la llave: las tienen W-8, el mesero robot, y Chloe, la de la holo-tienda.',
  },
}

export const CITY_FUTURE_ENEMIES: Record<string, EnemyDef> = {
  'city-future-m1': {
    id: 'city-future-m1',
    name: 'W-8, el mesero robot',
    person: 'W-8',
    kind: 'minion',
    animal: 'robot',
    hp: 5,
    topics: ['going-to-neg'],
    kinds: ['fill', 'fix', 'order', 'listen', 'write'],
    tags: ['cafe'],
    look: { shirt: '#9aa6b2', hair: '#5d8fd4', skin: '#d9e2ea' },
    before: [
      { text: "BEEP! Welcome to the Robot Café! I not going to serve you. You going to order? No! The coffee aren't going to be hot!", es: '¡BIP! ¡Bienvenido al Café Robot! No te voy a atender. ¿Vas a pedir? ¡No! El café no va a estar caliente. (Se equivoca: I not going to, You going to order?, aren\'t).' },
      { text: 'Half of a key is in my coffee machine. Are you going to answer my questions? BEEP BOOP!', es: 'La mitad de una llave está en mi máquina de café. ¿Vas a responder mis preguntas? ¡BIP BUP!' },
    ],
    after: [
      { text: "BEEP. I'm not going to be rude. Are you going to order? The coffee is going to be hot. System OK!", es: 'BIP. No voy a ser grosero. ¿Vas a pedir? El café va a estar caliente. ¡Sistema bien!' },
      { text: 'Take the key. Chloe has the other half, in the holo-shop. She is going to ask you a lot of questions!', es: 'Toma la llave. Chloe tiene la otra mitad, en la holo-tienda. ¡Te va a hacer muchas preguntas!' },
    ],
    freed: { text: 'BEEP! Are you going to have a juice? It is going to be fresh!', es: '¡BIP! ¿Vas a tomar un jugo? ¡Va a estar fresco!' },
    bonus: { q: 'BEEP! One more! ___ you going to order a coffee?', options: ['Are', 'Is', 'Do'], answer: 0, tip: 'Pregunta con you: Are you going to...?' },
  },
  'city-future-m2': {
    id: 'city-future-m2',
    name: 'Chloe, la de la holo-tienda',
    person: 'Chloe',
    kind: 'minion',
    hp: 5,
    topics: ['going-to-neg'],
    kinds: ['fill', 'fix', 'order', 'listen', 'write'],
    tags: ['tienda'],
    // Chloe, la vendedora del presente, treinta años después: el mismo pelo y la misma blusa
    look: { shirt: '#c2185b', hair: '#e0b04a', skin: '#f6d3b3', gender: 'female', accessory: 'glasses' },
    before: [
      { text: "Welcome to my holo-shop! You going to buy this jacket? It not going to be cheap! These shoes isn't going to fit you!", es: '¡Bienvenido a mi holo-tienda! ¿Vas a comprar esta chaqueta? ¡No va a ser barata! ¡Estos zapatos no te van a quedar! (Se equivoca: You going to buy, It not going to, isn\'t).' },
      { text: 'Thirty years ago I was the best seller in the city. I still am! Answer me, and the key is yours.', es: 'Hace treinta años yo era la mejor vendedora de la ciudad. ¡Todavía lo soy! Respóndeme y la llave es tuya.' },
    ],
    after: [
      { text: "Are you going to buy this jacket? It isn't going to be cheap... These shoes aren't going to fit you. Perfect English!", es: '¿Vas a comprar esta chaqueta? No va a ser barata... Estos zapatos no te van a quedar. ¡Inglés perfecto!' },
      { text: 'Here is the other half of the key. Our mayor is in his office. Be careful: today he is very strange.', es: 'Aquí está la otra mitad de la llave. Nuestro alcalde está en su oficina. Cuidado: hoy está muy raro.' },
    ],
    freed: { text: "This holo-jacket changes color. Are you going to try it? Ha ha!", es: 'Esta holo-chaqueta cambia de color. ¿Te la vas a probar? ¡Ja, ja!' },
    bonus: { q: "Last question! These shoes ___ going to fit you.", options: ["aren't", "isn't", "not"], answer: 0, tip: "Varios zapatos (they): aren't going to." },
  },

  // ── Viajeros de otras épocas: la luz del reloj los trajo a 2056. Al vencerlos vuelven a su tiempo ──
  'city-future-victor': {
    ...CITY_ENEMIES['city-m3'],
    id: 'city-future-victor',
    name: 'Víctor (viene del presente)',
    optional: true,
    echo: true,
    before: [
      { text: 'What do you want? I have no time! A robots are working in MY café! A apple? A water? Where am I?', es: '¿Qué quieres? ¡No tengo tiempo! ¡Unos robots trabajan en MI café! ¿"Un" manzana? ¿"Un" agua? ¿Dónde estoy? (Otra vez se equivoca con a / an / some).' },
      { text: 'A white light brought me here. Order correctly, or go away!', es: 'Una luz blanca me trajo aquí. ¡Pide bien o vete!' },
    ],
    after: [
      { text: 'OK, OK... An apple, some water. Robots are working in my café. Hmm, they are good waiters.', es: 'Bueno, bueno... Una manzana, un poco de agua. Unos robots trabajan en mi café. Hmm, son buenos meseros.' },
      { text: 'The light again! I am going home. Robots... ha!', es: '¡Otra vez la luz! Me voy a casa. Robots... ¡ja!' },
    ],
    bonus: { q: 'Before you go! Can I have ___ orange juice, please?', options: ['an', 'a', 'some a'], answer: 0, tip: 'Orange empieza con sonido de vocal: an orange juice.' },
  },
  'city-future-betty': {
    ...CITY_PAST_ENEMIES['city-past-m2'],
    id: 'city-future-betty',
    name: 'Betty (viene de 1996)',
    optional: true,
    echo: true,
    before: [
      { text: 'Hello! I am the best mail carrier in town. Yesterday I walkd to the post office... but it isn\'t here! Where are the letters?', es: '¡Hola! Soy la mejor cartera del pueblo. Ayer "caminé" al correo... ¡pero no está aquí! ¿Dónde están las cartas? (Otra vez se equivoca con -ed).' },
      { text: 'I touched a white light in 1996, and I stoped here. Help me with my words!', es: 'Toqué una luz blanca en 1996 y "paré" aquí. ¡Ayúdame con mis palabras!' },
    ],
    after: [
      { text: 'I walked to the post office. I stopped here. Oh! People send letters with their phones now? Strange!', es: 'Caminé al correo. Paré aquí. ¡Oh! ¿Ahora la gente manda cartas con el teléfono? ¡Qué raro!' },
      { text: 'The light! I am going back to 1996. Goodbye, future!', es: '¡La luz! Vuelvo a 1996. ¡Adiós, futuro!' },
    ],
    bonus: { q: 'Before you go! Yesterday I ___ ten letters.', options: ['posted', 'postted', 'post'], answer: 0, tip: 'post → posted.' },
  },

  'city-future-boss': {
    id: 'city-future-boss',
    name: 'Danny, el alcalde',
    person: 'Mayor Danny',
    kind: 'boss',
    reward: 'gafas-holo',
    hp: 10,
    topics: ['going-to-neg', 'going-to', 'there-is'],
    kinds: ['fill', 'fix', 'order', 'listen'],
    tags: ['turismo-futuro'],
    phases: [
      { hp: 5, topics: ['going-to-neg'], kinds: ['fill', 'fix', 'listen'], tags: ['turismo-futuro', 'calle-futuro'] },
      {
        hp: 5,
        topics: ['going-to-neg', 'going-to', 'there-is'],
        kinds: ['fill', 'fix', 'order', 'write'],
        tags: ['turismo-futuro', 'calle-futuro', 'calle'],
        line: { text: "There isn't going to be a fountain! There aren't going to be streets! Is there a bank? I... I always get lost!", es: '¡No va a haber fuente! ¡No va a haber calles! ¿Hay un banco? Yo... ¡siempre me pierdo!' },
      },
    ],
    // Danny, el despistado del presente, treinta años después: ahora es el alcalde
    look: { shirt: '#e07b39', hair: '#8d8d8d', skin: '#c68642', accessory: 'cap' },
    before: [
      { text: "Welcome to my city! I am the mayor. Tomorrow I going to close every street! You isn't going to find the fountain!", es: '¡Bienvenidos a mi ciudad! Soy el alcalde. ¡Mañana voy a cerrar todas las calles! ¡No van a encontrar la fuente! (Se equivoca: I going to, You isn\'t going to).' },
      { text: 'A shiny thing fell into the fountain yesterday. I picked it up, and now the city is MINE. Are you going to take it? No, you aren\'t!', es: 'Ayer cayó una cosa brillante en la fuente. La recogí, y ahora la ciudad es MÍA. ¿Me la vas a quitar? ¡No!' },
    ],
    after: [
      { text: "Oh... I'm not going to close the streets. People are going to walk, and the buses are going to fly. Sorry!", es: 'Oh... No voy a cerrar las calles. La gente va a caminar y los buses van a volar. ¡Perdón!' },
      { text: "Yesterday a man in a dark coat sat at the old bus stop all day. I asked him: 'Are you going to take the bus?' He said: 'No, I'm not. I'm going to wait for my friend... but my friend isn't going to come.'", es: 'Ayer un hombre con abrigo oscuro estuvo todo el día en la parada vieja. Le pregunté: "¿Va a tomar el bus?". Dijo: "No. Voy a esperar a mi amigo... pero mi amigo no va a venir".' },
      { text: 'This piece of metal is yours. And take these holo-glasses: you are never going to get lost. Not like me! Ha ha.', es: 'Este pedazo de metal es tuyo. Y toma estas gafas holográficas: nunca te vas a perder. ¡No como yo! Ja, ja.' },
    ],
    freed: { text: "Is there a bank near here? Ha ha, just kidding. I'm the mayor... and I'm not going to get lost again!", es: '¿Hay un banco cerca? Ja, ja, es broma. Soy el alcalde... ¡y no me voy a volver a perder!' },
    farewell: {
      q: 'Goodbye, kids! Are you going to visit my city again?',
      options: ['Yes, we are! Goodbye!', 'Yes, we going! Goodbye!', 'Yes, we do! Goodbye!'],
      answer: 0,
      tip: 'Respuesta corta: Yes, we are.',
    },
  },
}
