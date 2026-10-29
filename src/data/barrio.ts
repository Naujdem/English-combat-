import type { EnemyDef, Requirement, SceneDef, Zone } from '../game/types'

/**
 * Mapa del barrio: Green Street (A1, presente). Leyenda además de la de la ciudad:
 *  A  sofá        J  nevera       k  mesa de la fiesta (con el pastel)
 * Arriba: la casa de Leo (izquierda) y la de Maya (derecha). En el medio, Green Street.
 * Abajo: el parque (izquierda) y tu casa, 25 Park Street (derecha, jefe).
 */
const MAP = [
  '################',
  'WA..K..#L..A..pW',
  '#......#.......#',
  '#p..J..#.....K.#',
  '###d#######d####',
  '#______________#',
  '#=====zz=======#',
  '#=====zz====U==#',
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
  if (y <= 3) return x <= 6 ? 'casa-leo' : x >= 8 ? 'casa-maya' : 'calle'
  if (y >= 9 && x >= 10) return 'casa'
  if (y >= 10 && x <= 8) return 'parque'
  if (y === 9 && x >= 3 && x <= 8) return 'parque'
  return 'calle'
}

export const BARRIO_REQUIREMENTS: Requirement[] = [
  {
    id: 'barrio-invite',
    name: 'la invitación al cumpleaños (la mamá de Leo)',
    line: {
      text: "Who are you? Nobody on this street knows you. Go and meet the neighbors! Leo's mom knows everybody.",
      es: '¿Quién eres? Nadie en esta calle te conoce. ¡Ve a conocer a los vecinos! La mamá de Leo conoce a todo el mundo.',
    },
  },
  {
    id: 'barrio-photo',
    name: 'la foto de tu familia (en la fiesta del parque)',
    line: {
      text: 'Family? What family? I have no family! Show me a photo, if you can!',
      es: '¿Familia? ¿Qué familia? ¡No tengo familia! Muéstrame una foto, si puedes.',
    },
  },
]

export const BARRIO: SceneDef = {
  id: 'barrio',
  name: 'Green Street',
  topics: ['present-simple', 'likes', 'can', 'present-continuous', 'have-got'],
  map: MAP,
  start: { x: 2, y: 9 },
  bossDoor: { x: 12, y: 9 },
  keysNeeded: 3,
  entities: [
    { type: 'friend', id: 'leo', x: 5, y: 12 },
    { type: 'npc', id: 'garcia', x: 5, y: 1 },
    { type: 'npc', id: 'emma', x: 6, y: 1 },
    { type: 'friend', id: 'maya', x: 9, y: 2 },
    { type: 'npc', id: 'rojas', x: 14, y: 2 },
    { type: 'interest', x: 3, y: 12 },
    { type: 'npc', id: 'joe', x: 7, y: 12 },
    { type: 'npc', id: 'lucy', x: 1, y: 14 },
    { type: 'enemy', id: 'barrio-m1', x: 7, y: 10 },
    { type: 'enemy', id: 'barrio-m2', x: 14, y: 5 },
    { type: 'enemy', id: 'barrio-m3', x: 1, y: 5 },
    { type: 'boss', id: 'barrio-boss', x: 12, y: 12 },
  ],
  labels: [
    { text: 'Casa de Leo', x: 3, y: 2 },
    { text: 'Casa de Maya', x: 11, y: 2 },
    { text: 'Green Street', x: 10, y: 7 },
    { text: 'Parque', x: 4, y: 13 },
    { text: 'Tu casa', x: 12, y: 13 },
  ],
  zoneAt,
  requirements: BARRIO_REQUIREMENTS,
  chips: (s) => [
    { label: `Llaves ${s.keys.barrio ?? 0}/3`, done: (s.keys.barrio ?? 0) >= 3 },
    { label: 'Invitación', done: s.opened.includes('barrio-invite') },
    { label: 'Foto de familia', done: s.opened.includes('barrio-photo') },
  ],
  intro: {
    first:
      'Green Street, el barrio de Leo. Tu casa también está aquí, en Park Street... pero la puerta está cerrada y tu hermano Nick no abre. Tres vecinos hechizados tienen los pedazos de la llave. Visita a la familia de Leo: hoy es su cumpleaños.',
    later: 'Visita las casas, cruza Green Street por la cebra y busca la fiesta de Leo en el parque.',
  },
  epilogue: 'barrio-epilogue',
  door: {
    text: 'La puerta de tu casa está cerrada con llave.',
    sub: 'Tu hermano Nick no abre. Necesitas 3 pedazos de la llave: los tienen tres vecinos hechizados.',
  },
}

export const BARRIO_ENEMIES: Record<string, EnemyDef> = {
  'barrio-m1': {
    id: 'barrio-m1',
    name: 'Kevin, el presumido',
    person: 'Kevin',
    kind: 'minion',
    hp: 4,
    topics: ['can'],
    kinds: ['fill', 'fix', 'order', 'listen', 'write'],
    tags: ['parque'],
    look: { shirt: '#2e9d8f', hair: '#e0b04a', skin: '#f1c27d', accessory: 'cap' },
    before: [
      { text: 'Hey! I can to swim, I can to fly, I cans do everything! And you? You can nothing!', es: '¡Oye! Sé "a" nadar, sé "a" volar, ¡"puedos" hacer todo! ¿Y tú? ¡Tú no puedes nada!' },
      { text: 'I found a piece of a key under that tree. Do you want it? Show me what you can do!', es: 'Encontré un pedazo de una llave bajo ese árbol. ¿Lo quieres? ¡Muéstrame lo que sabes hacer!' },
    ],
    after: [
      { text: "OK, OK... I can swim. I can run fast. But I can't fly. Nobody can fly!", es: 'Bueno, bueno... Sé nadar. Corro rápido. Pero no puedo volar. ¡Nadie puede volar!' },
      { text: 'Here is the piece of the key. Your brother Nick lost it this morning. He is very strange today.', es: 'Aquí está el pedazo de la llave. Tu hermano Nick lo perdió esta mañana. Está muy raro hoy.' },
    ],
    freed: { text: 'Can you play basketball? I can teach you! Ha ha.', es: '¿Sabes jugar baloncesto? ¡Yo te enseño! Ja, ja.' },
    bonus: { q: 'One more! Can a fish walk?', options: ["No, it can't.", "No, it doesn't.", 'Yes, it can.'], answer: 0, tip: 'Un pez no puede caminar. Se responde con can: No, it can\'t.' },
  },
  'barrio-m2': {
    id: 'barrio-m2',
    name: 'Olivia, la reportera',
    person: 'Olivia',
    kind: 'minion',
    hp: 4,
    topics: ['present-continuous'],
    kinds: ['fill', 'fix', 'order', 'listen', 'write'],
    tags: ['barrio', 'parque'],
    look: { shirt: '#7a4fa3', hair: '#2b1d14', skin: '#c68642', gender: 'female' },
    before: [
      { text: 'Breaking news from Green Street! A dog running! The children is play! The sun shining!', es: '¡Última hora desde Green Street! ¡Un perro "corriendo"! ¡Los niños "está jugar"! ¡El sol "brillando"!' },
      { text: 'I have a piece of a key for my report. You want it? Tell me what is happening... correctly!', es: 'Tengo un pedazo de una llave para mi reportaje. ¿Lo quieres? Dime qué está pasando... ¡bien dicho!' },
    ],
    after: [
      { text: 'The dog IS running. The children ARE playing. Oh, my report is perfect now!', es: 'El perro ESTÁ corriendo. Los niños ESTÁN jugando. ¡Oh, ahora mi reportaje es perfecto!' },
      { text: "Take the piece of the key. And the next news: there is a birthday party in the park. It's Leo's!", es: 'Toma el pedazo de la llave. Y la siguiente noticia: hay una fiesta de cumpleaños en el parque. ¡Es la de Leo!' },
    ],
    freed: { text: 'Live from Green Street: a new neighbor is walking down the street. It is you!', es: 'En directo desde Green Street: un vecino nuevo está caminando por la calle. ¡Eres tú!' },
    bonus: { q: 'Last question for my report. Look at the sky! What is the weather like?', options: ['It is shining.', 'The sun is shining.', 'The sun shining.'], answer: 1, tip: 'Sujeto + is + -ing: The sun is shining (el sol está brillando).' },
  },
  'barrio-m3': {
    id: 'barrio-m3',
    name: 'Señor Hill, el vecino gruñón',
    person: 'Mr. Hill',
    kind: 'minion',
    hp: 4,
    topics: ['likes'],
    kinds: ['fill', 'fix', 'order', 'listen', 'write'],
    tags: ['barrio'],
    look: { shirt: '#5a4a3a', hair: '#cfcfcf', skin: '#e0ac69', accessory: 'glasses' },
    before: [
      { text: 'Quiet! I hate children play! I no like music! I like... I like nothing!', es: '¡Silencio! ¡Odio niños "jugar"! ¡Yo "no gusta" la música! Me gusta... ¡no me gusta nada!' },
      { text: 'I found a piece of a key in my garden. It is MINE now. Do you want it? Then answer me!', es: 'Encontré un pedazo de una llave en mi jardín. Ahora es MÍO. ¿Lo quieres? ¡Entonces respóndeme!' },
    ],
    after: [
      { text: "Hmm... I like gardening. I love listening to old music. I don't like noise... but children playing is OK.", es: 'Hmm... Me gusta la jardinería. Me encanta escuchar música vieja. No me gusta el ruido... pero que los niños jueguen está bien.' },
      { text: 'Here, take your key. And say happy birthday to Leo for me.', es: 'Toma, tu llave. Y felicita a Leo de mi parte.' },
    ],
    freed: { text: 'I love sitting at my window. I like watching the street. Hello, neighbor!', es: 'Me encanta sentarme en mi ventana. Me gusta mirar la calle. ¡Hola, vecino!' },
    bonus: { q: 'One more question. Do you like gardening?', options: ['Yes, I like gardening.', 'Yes, I like garden.', 'Yes, I likes gardening.'], answer: 0, tip: 'like + verbo con -ing: I like gardening.' },
  },
  'barrio-boss': {
    id: 'barrio-boss',
    name: 'Nick, tu hermano mayor',
    person: 'Nick',
    kind: 'boss',
    reward: 'sudadera',
    hp: 10,
    topics: ['present-simple', 'have-got', 'likes', 'can', 'present-continuous'],
    kinds: ['fill', 'fix', 'order', 'listen'],
    tags: ['casa'],
    phases: [
      { hp: 4, topics: ['present-simple'], kinds: ['fill', 'fix', 'listen'], tags: ['casa', 'casa-leo'] },
      {
        hp: 3,
        topics: ['have-got', 'present-simple'],
        kinds: ['fill', 'fix', 'order'],
        tags: ['casa'],
        line: { text: 'Mom go to work. Dad cook dinner. Every day the same! I have got... I have got nothing!', es: 'Mamá "ir" al trabajo. Papá "cocinar" la cena. ¡Todos los días lo mismo! Tengo... ¡no tengo nada!' },
      },
      {
        hp: 3,
        topics: ['present-simple', 'have-got', 'likes', 'can', 'present-continuous'],
        kinds: ['fill', 'order', 'listen', 'fix', 'write'],
        tags: ['casa', 'barrio', 'parque'],
        line: { text: 'What is happening? My head... I can... I can remember you!', es: '¿Qué está pasando? Mi cabeza... Puedo... ¡puedo recordarte!' },
      },
    ],
    look: { shirt: '#3a3a5a', hair: '#4a2c17', skin: '#f1c27d' },
    before: [
      { text: 'Who are you? This is MY house. I live here alone!', es: '¿Quién eres? Esta es MI casa. ¡Vivo aquí solo!' },
      { text: 'This morning I find this shiny piece of a clock in the garden. Now every day is the same. Mom go to work, Dad cook dinner, I watch TV...', es: 'Esta mañana encuentro esta pieza brillante de un reloj en el jardín. Ahora todos los días son iguales. Mamá "ir" al trabajo, papá "cocinar" la cena, yo veo televisión...' },
      { text: 'A photo? So you think you are my family. Prove it! Answer my questions!', es: '¿Una foto? Así que crees que eres mi familia. ¡Demuéstralo! ¡Responde mis preguntas!' },
    ],
    after: [
      { text: 'Hey... it is you! You are my family! Why am I on the floor?', es: 'Oye... ¡eres tú! ¡Eres mi familia! ¿Por qué estoy en el suelo?' },
      { text: 'I remember a man in a dark coat in our garden. He has got a very strange voice. He looks at the clock piece and says: "Not mine. Not yet."', es: 'Recuerdo a un hombre con abrigo oscuro en nuestro jardín. Tiene una voz muy extraña. Mira la pieza del reloj y dice: "No es mía. Todavía no".' },
      { text: 'Then he walks to the old road. The farm road. Here, take this piece. And this hoodie: it is too small for me now.', es: 'Luego camina hacia el camino viejo. El camino de la granja. Toma esta pieza. Y esta sudadera: ya me queda pequeña.' },
    ],
    freed: { text: 'Mom works at the bank and Dad cooks dinner every day. And I always help! Well... sometimes.', es: 'Mamá trabaja en el banco y papá cocina la cena todos los días. ¡Y yo siempre ayudo! Bueno... a veces.' },
    farewell: {
      q: 'Thank you, little one. You are very brave. I love you, you know?',
      options: ['I love you too, Nick!', 'You love me too, Nick!', 'I loves you, Nick!'],
      answer: 0,
      tip: 'Para responder igual: "I love you too!" (yo también te quiero). Con "I" el verbo va sin -s.',
    },
  },
}
