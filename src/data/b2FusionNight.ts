import type { EnemyDef, GameState, SceneDef, Zone } from '../game/types'
import type { ScriptLine } from './b1Accident'
import type { PartyContent } from '../components/PartyPlan'

/**
 * B2 · Extras: Fusion Night (misión secundaria, presente; se abre al cerrar la misión 4). Escena b2-s1-restaurant.
 * La chef Mei Lin abre en el puerto un restaurante de fusión china y colombiana. Einer y Jhoana son los invitados de honor.
 * Orden: Mei Lin: la publicación del restaurante en redes (b2-s1-post, script, lectura) →
 *   Mei Lin: lección 'food-b2' (adjetivos compuestos, sabor y textura, it's worth + -ing) + práctica con escucha (b2-s1-words) →
 *   Mei Lin: el menú de la noche de apertura (b2-s1-menu, PartyPlan versión menú) →
 *   Jhoana: el mejor y el peor plato (b2-s1-jhoana, charla sin respuestas malas, DebateTalk) →
 *   el crítico gastronómico Mr. Ashworth: duelo amistoso (b2-s1-critic, no castiga al perder) →
 *   Mei Lin: el cierre (b2-s1-close): delantal de fusión, monedas y el tema.
 */
export const B2_S1_RESTAURANT_ID = 'b2-s1-restaurant'
export const B2_S1_MEI = 'b2-s1-mei'
export const B2_S1_JHOANA = 'b2-s1-jhoana-npc'
export const B2_S1_EINER = 'b2-s1-einer'
/** Tareas (marcas en `opened`) */
export const B2_S1_POST = 'b2-s1-post'
export const B2_S1_WORDS = 'b2-s1-words'
export const B2_S1_MENU = 'b2-s1-menu'
export const B2_S1_TALK = 'b2-s1-jhoana'
export const B2_S1_CRITIC = 'b2-s1-critic'
export const B2_S1_CLOSE = 'b2-s1-close'

/** Leyenda (Tiles.tsx, sin dibujos nuevos): # pared · h afiche · W ventana · J nevera · C mostrador · K mesa · p planta · d puerta */
const MAP = [
  '#h##W##W##h#',
  '#JCC.......#',
  '#..........#',
  '#.K..K..K..#',
  '#..........#',
  '#p.K....K.p#',
  '#####d######',
]

const zoneAt = (): Zone => 'cafe'
const TEXT = 'Mei\'s Fusion Kitchen, at the port. It smells of ginger and fresh arepas. — El restaurante de Mei, en el puerto. Huele a jengibre y a arepas recién hechas.'

export const B2_S1_RESTAURANT: SceneDef = {
  id: B2_S1_RESTAURANT_ID,
  name: 'Fusion Night · El restaurante de Mei',
  topics: [],
  map: MAP,
  start: { x: 5, y: 5 },
  bossDoor: { x: 0, y: 0 },
  keysNeeded: 0,
  entities: [
    { type: 'npc', id: B2_S1_MEI, x: 4, y: 2 },
    { type: 'npc', id: B2_S1_JHOANA, x: 2, y: 4 },
    { type: 'npc', id: B2_S1_EINER, x: 3, y: 4 },
    // El crítico llega después de la charla con Jhoana
    { type: 'enemy', id: B2_S1_CRITIC, x: 8, y: 4, after: B2_S1_TALK },
  ],
  labels: [{ text: "Mei's Fusion Kitchen", x: 6, y: 1 }],
  zoneAt: () => zoneAt(),
  examine: {
    '2,1': { text: 'The kitchen counter: rice, ginger, corn flour and cheese.', sub: 'El mostrador de la cocina: arroz, jengibre, harina de maíz y queso.', say: 'Rice, ginger, corn flour and cheese.' },
    '3,1': { text: 'A board says: "Tonight: arepa dumplings. It\'s worth trying!"', sub: 'Un tablero dice: "Esta noche: dumplings de arepa. ¡Vale la pena probarlos!"', say: "It's worth trying!" },
  },
  locked: (x, y) => (x === 5 && y === 6 ? { text: 'The way out.', sub: 'Para volver al mapa, toca el botón Mapa.' } : null),
  links: {},
  requirements: [],
  chips: (s: GameState) => [
    { label: 'La publicación del restaurante', done: s.opened.includes(B2_S1_POST) },
    { label: 'Describir comida (Mei Lin)', done: s.opened.includes(B2_S1_WORDS) },
    { label: 'El menú de la apertura', done: s.opened.includes(B2_S1_MENU) },
    { label: 'Charla con Jhoana', done: s.opened.includes(B2_S1_TALK) },
    { label: 'Duelo con el crítico', done: s.defeated.includes(B2_S1_CRITIC) },
    { label: 'El cierre', done: s.opened.includes(B2_S1_CLOSE) },
  ],
  intro: {
    first: TEXT,
    later: (s: GameState) => (s.opened.includes(B2_S1_CLOSE) ? 'Fusion Night. Extra completado.' : TEXT),
  },
}

/** La publicación del restaurante en redes (lectura, MemoryScript) */
export const B2_S1_POST_SCRIPT: ScriptLine[] = [
  { who: 'narrator', text: '(Mei Lin shows you her phone. It is the restaurant\'s first post.)', es: '(Mei Lin te muestra su teléfono. Es la primera publicación del restaurante.)' },
  { who: 'board', text: "🍜 MEI'S FUSION KITCHEN opens tonight at the port! 🌽", es: '¡MEI\'S FUSION KITCHEN abre esta noche en el puerto!' },
  { who: 'board', text: 'China meets Colombia: home-made arepa dumplings, slow-cooked pork with rice and a crunchy plantain salad.', es: 'China se encuentra con Colombia: dumplings de arepa caseros, cerdo cocinado a fuego lento con arroz y una ensalada crujiente de plátano.' },
  { who: 'board', text: 'Sugar-free drinks for everyone. Our guests of honour: Einer and Jhoana, the best cooks in Lumen Bay!', es: 'Bebidas sin azúcar para todos. Nuestros invitados de honor: Einer y Jhoana, ¡los mejores cocineros de Lumen Bay!' },
  { who: 'narrator', text: "Mei Lin: My grandmother was from Guangzhou, and my mother is from Cali. This menu is my family.", es: 'Mei Lin: Mi abuela era de Cantón y mi mamá es de Cali. Este menú es mi familia.' },
  { who: 'narrator', text: "Mei Lin: But my English menu is a disaster. Can you help me describe the food?", es: 'Mei Lin: Pero mi menú en inglés es un desastre. ¿Me ayudas a describir la comida?' },
]

/** El menú de la noche de apertura (PartyPlan, versión menú): se pregunta a cada invitado y se anota en el menú */
export const B2_S1_MENU_PLAN: PartyContent = {
  title: 'Fusion Night · El menú',
  host: 'Mei Lin',
  hostLine: "Let's plan a balanced menu for tonight. Ask the guests what they'd like!",
  listTitle: 'OPENING NIGHT MENU',
  nextLabel: 'Siguiente invitado',
  finishLabel: 'Darle el menú a Mei Lin',
  rounds: [
    {
      who: 'Einer',
      voice: 'male',
      task: 'Pregúntale a Einer si puede comer comida picante.',
      ask: { options: ['Can you eat spicy food?', 'Do you can eat spicy food?', 'Can you eating spicy food?'], answer: 0, tip: 'can + sujeto + verbo base: Can you eat…?' },
      reply: { text: 'Not really. Something mild for me, please. A slow-cooked soup would be perfect.', es: 'La verdad, no. Algo suave para mí, por favor. Una sopa cocinada a fuego lento sería perfecta.' },
      note: { q: 'What would Einer like?', options: ['A slow-cooked soup.', 'Something very spicy.', 'Deep-fried chicken.'], answer: 0, tip: 'Einer dijo: "A slow-cooked soup would be perfect".' },
    },
    {
      who: 'Jhoana',
      voice: 'female',
      task: 'Pregúntale a Jhoana qué postre recomienda.',
      ask: { options: ['What dessert you recommend?', 'What dessert do you recommend?', 'What dessert do you recommending?'], answer: 1, tip: 'What + sustantivo + do you + verbo base?' },
      reply: { text: "The home-made rice pudding, with a little cinnamon. It's worth trying, I promise!", es: 'El arroz con leche casero, con un poquito de canela. ¡Vale la pena probarlo, te lo prometo!' },
      note: { q: 'Which dessert does Jhoana recommend?', options: ['Chocolate cake.', 'Home-made rice pudding.', 'Ice cream.'], answer: 1, tip: 'Jhoana dijo: "The home-made rice pudding".' },
    },
    {
      who: 'Leo',
      voice: 'male',
      task: 'Pregúntale a Leo si prefiere la comida crujiente o la suave.',
      ask: { options: ['Are you prefer crunchy or soft food?', 'Do you prefers crunchy or soft food?', 'Do you prefer crunchy or soft food?'], answer: 2, tip: 'Do you + verbo base: Do you prefer…?' },
      reply: { text: 'Crunchy, always! The vegetable spring rolls look mouth-watering.', es: '¡Crujiente, siempre! Los rollitos de verduras se ven deliciosos.' },
      note: { q: 'What will Leo eat?', options: ['The vegetable spring rolls.', 'The soup.', 'Nothing.'], answer: 0, tip: 'Leo dijo: "The vegetable spring rolls look mouth-watering".' },
    },
    {
      who: 'Maya',
      voice: 'female',
      task: 'Pregúntale a Maya qué le gustaría tomar.',
      ask: { options: ['What you would like to drink?', 'What would you like to drink?', 'What would you like drink?'], answer: 1, tip: 'What would you like + to + verbo?' },
      reply: { text: 'Something sugar-free, please. A tangy lime soda?', es: 'Algo sin azúcar, por favor. ¿Una soda de limón ácida?' },
      note: { q: 'What will Maya drink?', options: ['A sweet milkshake.', 'Hot chocolate.', 'A sugar-free lime soda.'], answer: 2, tip: 'Maya dijo: "Something sugar-free… A tangy lime soda".' },
    },
    {
      who: 'Mei Lin',
      voice: 'female',
      task: 'Por último, pregúntale a Mei Lin cuál es el plato principal.',
      ask: { options: ["What's the main course?", 'What the main course is?', 'Which is main course of?'], answer: 0, tip: "Pregunta con be: What's the main course?" },
      reply: { text: 'Arepa dumplings with slow-cooked pork. China and Colombia on one plate!', es: 'Dumplings de arepa con cerdo a fuego lento. ¡China y Colombia en un solo plato!' },
      note: { q: 'What is the main course?', options: ['Fish and chips.', 'Arepa dumplings with slow-cooked pork.', 'A plantain salad.'], answer: 1, tip: 'Mei Lin dijo: "Arepa dumplings with slow-cooked pork".' },
    },
  ],
}

/** El cierre con Mei Lin (b2-s1-close) */
export const B2_S1_CLOSE_SCRIPT: ScriptLine[] = [
  { who: 'narrator', text: '(The restaurant is full. Einer raises his glass of lime soda.)', es: '(El restaurante está lleno. Einer levanta su vaso de soda de limón.)' },
  { who: 'narrator', text: 'Einer: To Mei! The best soup I have ever tasted… after Jhoana\'s, of course.', es: 'Einer: ¡Por Mei! La mejor sopa que he probado… después de la de Jhoana, claro.' },
  { who: 'narrator', text: 'Mr. Ashworth (the critic): I came to complain, but I\'ll write a good review. It was worth coming.', es: 'Mr. Ashworth (el crítico): Vine a quejarme, pero voy a escribir una buena reseña. Valió la pena venir.' },
  { who: 'narrator', text: "Mei Lin: You saved my menu. Take this apron. You're part of the kitchen now.", es: 'Mei Lin: Salvaste mi menú. Toma este delantal. Ahora eres parte de la cocina.' },
  { who: 'narrator', text: '(For one night, nobody talks about clocks or fragments. Only about food.)', es: '(Por una noche, nadie habla de relojes ni de fragmentos. Solo de comida.)' },
]

const FD = 'food-b2' as const

export const B2_S1_ENEMIES: Record<string, EnemyDef> = {
  // Duelo amistoso: Mr. Ashworth, un crítico gastronómico exigente. No castiga al perder
  [B2_S1_CRITIC]: {
    id: B2_S1_CRITIC,
    name: 'Mr. Ashworth, el crítico',
    person: 'Mr. Ashworth',
    kind: 'trainer',
    duel: {
      lost: 'Mr. Ashworth: "Hmm. Not convincing. Try again." Vuelves a empezar con la vida llena.',
      won: 'Convenciste al crítico. Habla con Mei Lin.',
    },
    hp: 6,
    topics: [FD],
    kinds: ['fill', 'fix', 'order', 'listen'],
    tags: [B2_S1_CRITIC],
    onlyTags: true,
    zone: 'cafe',
    look: { shirt: '#3a3a4a', hair: '#bfbfbf', skin: '#f1d3bd', accessory: 'glasses', gender: 'male' },
    before: [
      { text: "I'm Mr. Ashworth. I write restaurant reviews. Most new restaurants are… disappointing.", es: 'Soy Mr. Ashworth. Escribo reseñas de restaurantes. La mayoría de los restaurantes nuevos son… decepcionantes.' },
      { text: 'Describe this food properly, and maybe I will change my mind.', es: 'Describe bien esta comida y quizá cambie de opinión.' },
    ],
    after: [{ text: 'Well… I must admit it. That was mouth-watering.', es: 'Bueno… tengo que admitirlo. Eso estaba delicioso.' }],
    freed: { text: 'Five stars. Don\'t tell anyone I said that.', es: 'Cinco estrellas. No le digas a nadie que dije eso.' },
  },
}
