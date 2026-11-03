import type { EnemyDef, GameState, Question, SceneDef, Zone } from '../game/types'
import { A2_13_CLOSE } from './a2Return'

/**
 * Misión secundaria de A2 · "A Dinner to Remember" (casa de Leo: cocina y comedor, presente).
 * La familia de Leo organiza una cena para agradecer la ayuda en las misiones. Sin fragmento ni pistas de "L".
 * Contenido (Busuu A2 caps. 18 y 27, más much / many): platos y sabores (sweet, salty, spicy; fried, grilled, roasted);
 *            How much / How many (contables e incontables, a lot of, a few / a little); conversación en la mesa
 *            (How was…? How often…? How do you make…? Could you pass…? Would you like some more…?).
 * Orden: Leo (lección food-dinner + práctica) → la señora García (The Memory Chest: platos y sabores)
 *        → la persona especial (Enough for Everyone: cantidades para 6 invitados) → el abuelo Joe (DebateTalk en la mesa)
 *        → Chef Bruno (duelo amistoso, 3 fases) → la persona especial (cierre).
 * Opcional: la señora García ofrece una segunda ronda de The Memory Chest con la Navidad colombiana (escudo).
 * Se activa al terminar A2-13. Tareas en data/tasks.ts, lección en data/lessons.ts, combates en data/questions-a2-s5.ts.
 */
const MAP = [
  '################',
  '#JCCCS....C..p.#',
  '#..............#',
  '#..............#',
  '#######d########',
  'W..............W',
  '#p..KKKKK....A.#',
  '#..............#',
  '#A.............#',
  '#p..........L.p#',
  '################',
]

function zoneAt(_x: number, y: number): Zone {
  return y <= 4 ? 'cafeteria' : 'casa-leo'
}

export const A2_DINNER_ID = 'a2-s5-dinner'
export const A2_S5_PRACTICE = 'a2-s5-practice'
export const A2_S5_TASTE = 'a2-s5-taste'
/** Opcional: la Navidad colombiana (natilla, buñuelos...) con la señora García */
export const A2_S5_CHRISTMAS = 'a2-s5-christmas'
export const A2_S5_ENOUGH = 'a2-s5-enough'
export const A2_S5_TABLE = 'a2-s5-table'
/** Duelo amistoso con Chef Bruno: aparece en el comedor después de la charla en la mesa */
export const A2_S5_DUEL = 'a2-s5-bruno-duel'
export const A2_S5_CLOSE = 'a2-s5-close'

/** La misión secundaria se abre al terminar A2-13 */
export const isA2DinnerUnlocked = (s: GameState) => s.opened.includes(A2_13_CLOSE)

/** Práctica guiada de Leo (lista fija en data/tasks.ts) */
const T = ['a2-dinner']
const TP = 'food-dinner' as const
export const A2_DINNER_PRACTICE: Question[] = [
  { id: 'a2-s5-p1', topic: TP, prompt: 'This soup has a lot of chili. It\'s very ___.', options: ['spicy', 'sweet', 'sour'], answer: 0, tip: 'Con mucho chile o ají: spicy (picante).', tags: T },
  { id: 'a2-s5-p2', topic: TP, prompt: 'How ___ rice do we need?', options: ['much', 'many', 'a few'], answer: 0, tip: 'rice no se cuenta (incontable) → How much.', tags: T },
  { id: 'a2-s5-p3', topic: TP, prompt: 'How ___ eggs are there in the fridge?', options: ['many', 'much', 'little'], answer: 0, tip: 'eggs se cuentan (one egg, two eggs) → How many.', tags: T },
  { id: 'a2-s5-p4', topic: TP, kind: 'fix', prompt: 'There are a little tomatoes on the table.', options: ['There are a few tomatoes on the table.', 'There is a few tomatoes on the table.', 'There are a much tomatoes on the table.'], answer: 0, tip: 'Contables: a few (tomatoes). Incontables: a little (salt).', tags: T },
  { id: 'a2-s5-p5', topic: TP, prompt: 'The chicken is cooked in the oven. It\'s ___ chicken.', options: ['roasted', 'fried', 'raw'], answer: 0, tip: 'En el horno: roasted. En aceite: fried. Crudo: raw.', tags: T },
  { id: 'a2-s5-p6', topic: TP, kind: 'order', prompt: '¿Me pasas la sal, por favor?', options: ['Could', 'you', 'pass', 'the', 'salt,', 'please?'], answer: 0, tip: 'Pedir algo en la mesa: Could you pass the… , please?', tags: T },
  { id: 'a2-s5-p7', topic: TP, prompt: '___ was the dinner? — It was delicious!', options: ['How', 'What', 'How much'], answer: 0, tip: 'Para preguntar la opinión: How was…?', tags: T },
]

export const A2_DINNER_ENEMIES: Record<string, EnemyDef> = {
  // Duelo amistoso (3 fases): Chef Bruno, el vecino cocinero, huele la cena y reta al protagonista. No castiga al perder.
  [A2_S5_DUEL]: {
    id: A2_S5_DUEL,
    name: 'Chef Bruno, the Hungry Chef',
    person: 'Chef Bruno',
    kind: 'trainer',
    duel: {
      lost: 'Chef Bruno: "Not enough salt, my friend! Try again." Vuelves a empezar con la vida llena.',
      won: 'Ganaste el duelo de Chef Bruno. Recuperaste: platos, sabores, cantidades y la conversación en la mesa. Vuelve con tu acompañante, junto a la mesa.',
    },
    hp: 9,
    topics: [TP],
    kinds: ['fill', 'fix', 'order', 'listen'],
    tags: ['a2-dinner-duel'],
    // Fase 1: platos y sabores · Fase 2: How much / How many y cantidades · Fase 3: conversación en la mesa
    phases: [
      {
        hp: 3,
        title: 'Dishes and flavors',
        topics: [TP],
        kinds: ['fill', 'fix', 'order', 'listen'],
        tags: ['a2-dinner-flavor'],
        line: { text: 'Round one: tell me about the food. Is it sweet? Is it spicy?', es: 'Ronda uno: háblame de la comida. ¿Es dulce? ¿Es picante?' },
      },
      {
        hp: 3,
        title: 'How much? How many?',
        topics: [TP],
        kinds: ['fill', 'fix', 'order', 'listen'],
        tags: ['a2-dinner-qty'],
        line: { text: 'Round two: a good cook knows the quantities. How much? How many?', es: 'Ronda dos: un buen cocinero sabe las cantidades. ¿Cuánto? ¿Cuántos?' },
      },
      {
        hp: 3,
        title: 'At the table',
        topics: [TP],
        kinds: ['fill', 'fix', 'order', 'listen'],
        tags: ['a2-dinner-table'],
        line: { text: 'Last round: table manners! How do you ask for more?', es: 'Última ronda: ¡modales en la mesa! ¿Cómo pides más?' },
      },
    ],
    onlyTags: true,
    zone: 'casa-leo',
    look: { shirt: '#f4efe4', hair: '#4a3a2a', skin: '#c68642', gender: 'male' },
    before: [
      { text: 'Mmm... what is that smell? Roasted chicken? Fried plantain? I live next door, and I\'m very hungry!', es: 'Mmm... ¿qué es ese olor? ¿Pollo asado? ¿Plátano frito? Vivo al lado, ¡y tengo mucha hambre!' },
      { text: "I'm Chef Bruno. Let's play a cooking game: if you win, I'll make dessert for everybody.", es: 'Soy Chef Bruno. Juguemos un juego de cocina: si ganas, preparo el postre para todos.' },
    ],
    after: [
      { text: 'Bravo! You talk about food like a real chef.', es: '¡Bravo! Hablas de comida como un verdadero chef.' },
      { text: 'A deal is a deal: dessert is on me. And take this apron. It suits you!', es: 'Trato es trato: el postre corre por mi cuenta. Y llévate este delantal. ¡Te queda bien!' },
    ],
    freed: { text: 'The secret of a good soup? A little salt, a lot of love.', es: '¿El secreto de una buena sopa? Un poco de sal y mucho amor.' },
  },
}

export const A2_DINNER: SceneDef = {
  id: A2_DINNER_ID,
  name: 'Cena en casa de Leo',
  topics: [],
  map: MAP,
  start: { x: 7, y: 7 },
  // Sin puerta ni llaves: el duelo aparece según el avance
  bossDoor: { x: 0, y: 0 },
  keysNeeded: 0,
  entities: [
    // Leo en el comedor (lección y práctica)
    { type: 'npc', id: 'a2-s5-leo', x: 10, y: 7 },
    // La señora García en la cocina (The Memory Chest y la Navidad colombiana opcional)
    { type: 'npc', id: 'a2-s5-garcia', x: 3, y: 2 },
    // La persona especial en la cocina (Enough for Everyone y cierre)
    { type: 'npc', id: 'a2-s5-interest', x: 11, y: 2 },
    // El abuelo Joe, sentado a la mesa (conversación)
    { type: 'npc', id: 'a2-s5-joe', x: 6, y: 7 },
    // Chef Bruno llega al comedor después de la charla en la mesa
    { type: 'enemy', id: A2_S5_DUEL, x: 13, y: 8, after: A2_S5_TABLE },
  ],
  labels: [
    { text: 'Kitchen', x: 8, y: 1 },
    { text: 'Dining room', x: 6, y: 5 },
  ],
  zoneAt,
  examine: {
    '1,1': { text: 'The fridge: milk, eggs, cheese and a lot of fruit.', sub: 'La nevera: leche, huevos, queso y mucha fruta.', say: 'Milk, eggs, cheese and a lot of fruit.' },
    '3,1': { text: 'A pot of soup. It smells delicious!', sub: 'Una olla de sopa. ¡Huele delicioso!', say: 'It smells delicious!' },
    '6,6': { text: 'The table is ready: plates, glasses, forks and knives.', sub: 'La mesa está lista: platos, vasos, tenedores y cuchillos.', say: 'Plates, glasses, forks and knives.' },
    '12,9': { text: 'A cookbook: "Easy recipes from around the world."', sub: 'Un libro de cocina: "Recetas fáciles de todo el mundo".', say: 'Easy recipes from around the world.' },
  },
  requirements: [],
  chips: (s) => [
    { label: 'A Dinner to Remember', done: s.opened.includes(A2_S5_CLOSE) },
    { label: 'Lección de Leo', done: s.seenLesson.includes(TP) },
    { label: 'Práctica', done: s.opened.includes(A2_S5_PRACTICE) },
    { label: 'The Memory Chest', done: s.opened.includes(A2_S5_TASTE) },
    { label: 'Enough for Everyone', done: s.opened.includes(A2_S5_ENOUGH) },
    { label: 'Charla en la mesa', done: s.opened.includes(A2_S5_TABLE) },
    { label: 'Duelo con Chef Bruno', done: s.defeated.includes(A2_S5_DUEL) },
    { label: 'La cena', done: s.opened.includes(A2_S5_CLOSE) },
    { label: 'Opcional: Navidad colombiana', done: s.opened.includes(A2_S5_CHRISTMAS) },
  ],
  intro: {
    first: 'Leo te escribió: "My family wants to say thank you. Come to dinner tonight! Bring {iname}!" La casa de Leo huele delicioso.',
    later: 'La cena en casa de Leo. Sigue los objetivos de la Mochila.',
  },
}
