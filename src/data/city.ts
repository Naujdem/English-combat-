import type { EnemyDef, Requirement, SceneDef, Zone } from '../game/types'

/**
 * Mapa de la ciudad (A1, presente). Leyenda además de la de la escuela:
 *  _  andén (se camina)   =  calle (no se camina)   z  cebra (para cruzar)
 *  P  parada de autobús   U  carro                  N  fuente
 *  R  perchero de ropa    Q  espejo                 O  escritorio de oficina
 * Arriba: el café (izquierda) y la tienda de ropa (derecha). En el medio, Main Street.
 * Abajo: la parada del autobús, la plaza con la fuente y la oficina de turismo (jefe).
 */
const MAP = [
  '################',
  'W.K.K.#R.R.R.R.W',
  '#.....#........#',
  'WCC.K.#Q.R.R.R.W',
  '#.....#........#',
  '##d#######d#####',
  '#______________#',
  '#=====zz=======#',
  '#=====zz=====U=#',
  '#______________#',
  '#P__Y______#####',
  '#______NN__#OOp#',
  '#__H___NN__X...#',
  '#_Y________#...#',
  '#______H___#...#',
  '################',
]

function zoneAt(x: number, y: number): Zone {
  if (y <= 5) return x <= 6 ? 'cafe' : 'tienda'
  if (y >= 10 && x >= 11) return 'turismo'
  return 'calle'
}

export const CITY_REQUIREMENTS: Requirement[] = [
  {
    id: 'city-map',
    name: 'el mapa de la ciudad (la oficial Rosa, en la calle)',
    line: {
      text: "Stop! A tourist without a map? Talk to Officer Rosa on the street. She has maps!",
      es: '¡Alto! ¿Un turista sin mapa? Habla con la oficial Rosa en la calle. ¡Ella tiene mapas!',
    },
  },
  {
    id: 'city-coffee',
    name: 'el café del guía (pídelo en el café)',
    line: {
      text: 'And where is my coffee? I always have a black coffee at ten! Go to the café and order it for me.',
      es: '¿Y dónde está mi café? ¡Siempre tomo un café negro a las diez! Ve al café y pídelo para mí.',
    },
  },
]

export const CITY: SceneDef = {
  id: 'city',
  name: 'La ciudad',
  topics: ['there-is', 'demonstratives', 'ordering'],
  map: MAP,
  start: { x: 3, y: 10 },
  bossDoor: { x: 11, y: 12 },
  keysNeeded: 3,
  entities: [
    { type: 'friend', id: 'leo', x: 9, y: 10 },
    { type: 'interest', x: 9, y: 13 },
    { type: 'npc', id: 'driver', x: 2, y: 11 },
    { type: 'npc', id: 'rosa', x: 5, y: 9 },
    { type: 'npc', id: 'lily', x: 1, y: 4 },
    { type: 'npc', id: 'sam', x: 5, y: 13 },
    { type: 'npc', id: 'mia', x: 4, y: 14 },
    { type: 'enemy', id: 'city-m1', x: 12, y: 9 },
    { type: 'enemy', id: 'city-m2', x: 12, y: 2 },
    { type: 'enemy', id: 'city-m3', x: 4, y: 2 },
    { type: 'chest', id: 'city-chest', outfit: 'chaqueta', x: 14, y: 4 },
    { type: 'boss', id: 'city-boss', x: 13, y: 13 },
  ],
  labels: [
    { text: 'Café', x: 3, y: 4 },
    { text: 'Tienda', x: 11, y: 4 },
    { text: 'Main Street', x: 10, y: 7 },
    { text: 'Plaza', x: 6, y: 14 },
    { text: 'Turismo', x: 13, y: 14 },
  ],
  zoneAt,
  requirements: CITY_REQUIREMENTS,
  chips: (s) => [
    { label: `Llaves ${s.keys.city ?? 0}/3`, done: (s.keys.city ?? 0) >= 3 },
    { label: 'Mapa', done: s.opened.includes('city-map') },
    { label: 'Café del guía', done: s.opened.includes('city-coffee') },
  ],
  intro: {
    first:
      'Una pieza del reloj, con tus palabras, cayó en la ciudad. Tres personas tienen los pedazos de la llave de la oficina de turismo. Cruza la calle por la cebra, pídele un mapa a la oficial Rosa y lleva el café al guía.',
    later: 'Cruza Main Street por la cebra. Choca con personas para hablar y con objetos para ver su nombre en inglés.',
  },
  epilogue: 'city-epilogue',
}

export const CITY_ENEMIES: Record<string, EnemyDef> = {
  'city-m1': {
    id: 'city-m1',
    name: 'Danny, el despistado',
    person: 'Danny',
    kind: 'minion',
    hp: 4,
    topics: ['there-is'],
    kinds: ['fill', 'fix', 'order', 'listen', 'write'],
    tags: ['calle'],
    look: { shirt: '#e07b39', hair: '#2b2b2b', skin: '#c68642', accessory: 'cap' },
    before: [
      { text: 'Hey! Are you a tourist? There have a great café here! Or is it a bank? I always get lost!', es: '¡Oye! ¿Eres turista? ¡Aquí "hay" un café genial! ¿O es un banco? ¡Siempre me pierdo!' },
      { text: 'The guide gave me a piece of a key. Do you want it? Answer my questions about the city!', es: 'El guía me dio un pedazo de llave. ¿Lo quieres? ¡Responde mis preguntas sobre la ciudad!' },
    ],
    after: [
      { text: 'Oh! There IS a café, and there ARE two shops. Now I understand!', es: '¡Oh! HAY un café, y HAY dos tiendas. ¡Ahora entiendo!' },
      { text: 'Here is the piece of the key. The guide is in the tourist office, next to the fountain.', es: 'Aquí está el pedazo de la llave. El guía está en la oficina de turismo, al lado de la fuente.' },
    ],
    freed: { text: "Excuse me, is there a bank near here? Ha ha, just kidding. It's on Main Street!", es: 'Disculpa, ¿hay un banco cerca? Ja, ja, es broma. ¡Está en Main Street!' },
    bonus: { q: 'One more question. Look at the plaza. Is there a fountain?', options: ['Yes, there is.', 'Yes, there are.', "No, there isn't."], answer: 0, tip: 'En la plaza hay una fuente. Para una cosa: Yes, there is.' },
  },
  'city-m2': {
    id: 'city-m2',
    name: 'Chloe, la vendedora presumida',
    person: 'Chloe',
    kind: 'minion',
    hp: 4,
    topics: ['demonstratives'],
    kinds: ['fill', 'fix', 'order', 'listen', 'write'],
    tags: ['tienda'],
    look: { shirt: '#c2185b', hair: '#e0b04a', skin: '#f6d3b3' },
    before: [
      { text: 'Welcome to my shop! This shoes are beautiful! These jacket is perfect for you!', es: '¡Bienvenido a mi tienda! ¡"Este" zapatos son hermosos! ¡"Estas" chaqueta es perfecta para ti!' },
      { text: 'Mr. Rossi says I am the best seller in the city. Buy something... or answer me!', es: 'El señor Rossi dice que soy la mejor vendedora de la ciudad. Compra algo... ¡o respóndeme!' },
    ],
    after: [
      { text: 'These shoes, this jacket... You are right. Sorry!', es: 'Estos zapatos, esta chaqueta... Tienes razón. ¡Perdón!' },
      { text: 'Take this piece of the key. And look in the box next to the mirror: there is a jacket for you!', es: 'Toma este pedazo de la llave. Y mira en la caja al lado del espejo: ¡hay una chaqueta para ti!' },
    ],
    freed: { text: 'This T-shirt is ten dollars, and these shoes are twenty. Good prices!', es: 'Esta camiseta cuesta diez dólares, y estos zapatos veinte. ¡Buenos precios!' },
    bonus: { q: 'Last question! This jacket is fifteen dollars. How much is it?', options: ['$50', '$15', '$5'], answer: 1, tip: '"Fifteen" es 15. "Fifty" es 50.' },
  },
  'city-m3': {
    id: 'city-m3',
    name: 'Víctor, el mesero gruñón',
    person: 'Victor',
    kind: 'minion',
    hp: 4,
    topics: ['ordering'],
    kinds: ['fill', 'fix', 'order', 'listen', 'write'],
    tags: ['cafe'],
    look: { shirt: '#f4efe4', hair: '#3b2a1a', skin: '#e0ac69' },
    before: [
      { text: 'What do you want? I have no time!', es: '¿Qué quieres? ¡No tengo tiempo!' },
      { text: 'A apple? A water? Hmm. The guide gave me a piece of a key. Order correctly or go away!', es: '¿"Un" manzana? ¿"Un" agua? Hmm. El guía me dio un pedazo de llave. ¡Pide bien o vete!' },
    ],
    after: [
      { text: 'OK, OK... An apple, some water. Can I help you? See? I can be nice.', es: 'Bueno, bueno... Una manzana, un poco de agua. ¿En qué te ayudo? ¿Ves? Puedo ser amable.' },
      { text: 'Here is the piece of the key. Mr. Rossi is angry today. He has no coffee!', es: 'Aquí está el pedazo de la llave. El señor Rossi está enojado hoy. ¡No tiene café!' },
    ],
    freed: { text: "Can I take your order, please? Ha ha, I'm a good waiter now.", es: '¿Puedo tomar su pedido, por favor? Ja, ja, ahora soy un buen mesero.' },
    bonus: { q: 'Here is your juice. Here you are! ... What do you say?', options: ["You're welcome!", 'Thank you!', 'Here you are!'], answer: 1, tip: 'Cuando te dan algo, se responde "Thank you!". "You\'re welcome" es "de nada".' },
  },
  'city-boss': {
    id: 'city-boss',
    name: 'Señor Rossi, el guía',
    person: 'Mr. Rossi',
    kind: 'boss',
    reward: 'gorra',
    hp: 10,
    topics: ['there-is', 'demonstratives', 'ordering', 'imperatives'],
    kinds: ['fill', 'fix', 'order', 'listen'],
    tags: ['turismo'],
    phases: [
      { hp: 3, topics: ['there-is'], kinds: ['fill', 'fix', 'listen'], tags: ['calle', 'turismo'] },
      {
        hp: 3,
        topics: ['demonstratives', 'ordering'],
        kinds: ['fill', 'fix', 'order'],
        tags: ['tienda', 'cafe', 'turismo'],
        line: { text: 'These prices... that coffee... My head! THIS city is MY city!', es: 'Estos precios... ese café... ¡Mi cabeza! ¡ESTA ciudad es MI ciudad!' },
      },
      {
        hp: 4,
        topics: ['there-is', 'demonstratives', 'ordering', 'imperatives'],
        kinds: ['fill', 'order', 'listen', 'fix', 'write'],
        tags: ['turismo', 'calle'],
        line: { text: 'Turn left! No, right! Go straight! Stop! I am... I am lost!', es: '¡Gira a la izquierda! ¡No, a la derecha! ¡Sigue derecho! ¡Para! Estoy... ¡estoy perdido!' },
      },
    ],
    look: { shirt: '#2f5d50', hair: '#6b6b6b', skin: '#e0ac69', accessory: 'cap' },
    before: [
      { text: 'Welcome to the city, tourist! I am Mr. Rossi, the best guide in town.', es: '¡Bienvenido a la ciudad, turista! Soy el señor Rossi, el mejor guía de la ciudad.' },
      { text: 'Look at this shiny piece of a clock. I found it next to the fountain. It is MY treasure! Now every tourist goes to the wrong place! Ha ha!', es: 'Mira esta pieza brillante de un reloj. La encontré al lado de la fuente. ¡Es MI tesoro! ¡Ahora todos los turistas van al lugar equivocado! ¡Ja, ja!' },
      { text: 'Is there a bank here? How much is this? Answer me, if you can!', es: '¿Hay un banco aquí? ¿Cuánto cuesta esto? ¡Respóndeme, si puedes!' },
    ],
    after: [
      { text: 'Where am I? Oh... my office. I touched a strange piece of metal, and then... nothing.', es: '¿Dónde estoy? Oh... mi oficina. Toqué un pedazo de metal extraño, y luego... nada.' },
      { text: 'Yesterday a man in a dark coat asked me about it. His voice was very strange. Then he took a bus to a quiet neighborhood. Green Street, I think.', es: 'Ayer un hombre con abrigo oscuro me preguntó por él. Su voz era muy extraña. Luego tomó un autobús a un barrio tranquilo. Green Street, creo.' },
      { text: 'Take this piece of the clock. It is yours. And thank you for the coffee!', es: 'Toma esta pieza del reloj. Es tuya. ¡Y gracias por el café!' },
    ],
    freed: { text: 'Welcome to the city! There is a great café next to the shop.', es: '¡Bienvenido a la ciudad! Hay un café genial al lado de la tienda.' },
    farewell: {
      q: 'Thank you, my friend! Here is a free map of the city. Have a nice day!',
      options: ["You're welcome!", 'Thank you! You too!', 'Good night!'],
      answer: 1,
      tip: 'Cuando alguien te desea un buen día, se responde "Thank you! You too!" (¡Gracias, igualmente!).',
    },
  },
}
