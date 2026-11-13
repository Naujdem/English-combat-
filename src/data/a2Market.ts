import type { EnemyDef, GameState, Question, SceneDef, Zone } from '../game/types'
import { A2_13_CLOSE } from './a2Return'

/**
 * Misión secundaria de A2 · "Market Day" (tienda de ropa de la ciudad y la calle del mercado, presente).
 * La persona especial invita al protagonista a renovar su ropa en las rebajas. Sin fragmento ni pistas de "L".
 * Contenido (Busuu A2 caps. 19 y 20): ropa, tallas y colores; probarse ropa (try it on / them on, fit, suit,
 *            too big / not big enough); precios y descuentos (on sale, 20% off); devoluciones y cambios (receipt, refund, exchange).
 * Orden: Leo (lección clothes-shopping + práctica) → la persona especial (Fitting Room: lista con presupuesto)
 *        → Nadia, la dependienta (DebateTalk: devolver una camisa) → Rita the Bargain Hunter (duelo amistoso, 3 fases)
 *        → la persona especial (cierre). Al terminar: monedas y la tienda de atuendos (Mochila › Atuendos).
 * Se activa al terminar A2-13. Tareas en data/tasks.ts, lección en data/lessons.ts, combates en data/questions-a2-s4.ts.
 */
const MAP = [
  '################',
  '#R.R.R.R.#Q..Q.#',
  '#........#.....#',
  '#R.R.R.R.d.....#',
  '#........#######',
  '#CC..........p.#',
  '##########d#####',
  '#______________#',
  '#_m__m__m___H__#',
  '#______________#',
  '#Y___p_____Y___#',
  '################',
]

function zoneAt(_x: number, y: number): Zone {
  return y <= 6 ? 'tienda' : 'calle'
}

export const A2_MARKET_ID = 'a2-s4-market-day'
export const A2_S4_PRACTICE = 'a2-s4-practice'
export const A2_S4_FITTING = 'a2-s4-fitting'
export const A2_S4_RETURN = 'a2-s4-return'
/** Duelo amistoso con Rita: aparece en la tienda después de la devolución */
export const A2_S4_DUEL = 'a2-s4-rita-duel'
export const A2_S4_CLOSE = 'a2-s4-close'

/** La misión secundaria se abre al terminar A2-13 */
export const isA2MarketUnlocked = (s: GameState) => s.opened.includes(A2_13_CLOSE)

/** La tienda de atuendos (Mochila › Atuendos) se abre al terminar Market Day. Las monedas se ganan en misiones y minijuegos */
export const isShopOpen = (s: GameState) => s.opened.includes(A2_S4_CLOSE)
export const SHOP: { id: string; price: number }[] = [
  { id: 'camiseta-rebaja', price: 20 },
  { id: 'sudadera-verde', price: 25 },
  { id: 'camisa-amarilla', price: 30 },
  { id: 'chaqueta-negra', price: 35 },
  { id: 'abrigo-invierno', price: 40 },
]

/** Práctica guiada de Leo (lista fija en data/tasks.ts) */
const T = ['a2-shop']
const TP = 'clothes-shopping' as const
export const A2_MARKET_PRACTICE: Question[] = [
  { id: 'a2-s4-p1', topic: TP, prompt: 'I like this jacket. Can I try ___ on?', options: ['it', 'them', 'on it'], answer: 0, tip: 'Una cosa (the jacket) → it, y va en medio: try it on.', tags: T },
  { id: 'a2-s4-p2', topic: TP, prompt: 'These shoes are nice. Can I try ___ on?', options: ['them', 'it', 'they'], answer: 0, tip: 'shoes es plural → them: try them on.', tags: T },
  { id: 'a2-s4-p3', topic: TP, kind: 'fix', prompt: 'Can I try on it, please?', options: ['Can I try it on, please?', 'Can I try it, please, on?', 'Can I try on them, please?'], answer: 0, tip: 'Con it / them, el pronombre va en medio: try it on.', tags: T },
  { id: 'a2-s4-p4', topic: TP, prompt: "These jeans are size 34. They're too ___ for me. I need size 30.", options: ['big', 'small', 'cheap'], answer: 0, tip: 'Una talla más grande de la que necesitas: too big.', tags: T },
  { id: 'a2-s4-p5', topic: TP, prompt: "The T-shirt is $20, but it's 50% off. Now it's ___.", options: ['$10', '$15', '$40'], answer: 0, tip: '50% off = la mitad: $20 → $10.', tags: T },
  { id: 'a2-s4-p6', topic: TP, kind: 'order', prompt: 'Quisiera devolver esta camisa.', options: ["I'd", 'like', 'to', 'return', 'this', 'shirt.'], answer: 0, tip: "I'd like to + return: devolver.", tags: T },
  { id: 'a2-s4-p7', topic: TP, prompt: "This coat isn't warm ___ for the winter.", options: ['enough', 'too', 'very'], answer: 0, tip: 'enough va después del adjetivo: warm enough.', tags: T },
]

export const A2_MARKET_ENEMIES: Record<string, EnemyDef> = {
  // Duelo amistoso (3 fases): Rita compite por las últimas rebajas. No es un enemigo: no castiga al perder.
  [A2_S4_DUEL]: {
    id: A2_S4_DUEL,
    name: 'Rita the Bargain Hunter',
    person: 'Rita',
    kind: 'trainer',
    duel: {
      lost: 'Rita: "Ha! Better luck next time, darling!" Vuelves a empezar con la vida llena.',
      won: 'Ganaste el duelo de Rita. Recuperaste: ropa, compras, descuentos y devoluciones. Vuelve con tu acompañante, junto a los percheros.',
    },
    hp: 9,
    topics: [TP],
    kinds: ['fill', 'fix', 'order', 'listen'],
    tags: ['a2-shop-duel'],
    // Fase 1: ropa, tallas y probarse · Fase 2: precios y descuentos · Fase 3: devoluciones y too / enough
    phases: [
      {
        hp: 3,
        title: 'Clothes and sizes',
        topics: [TP],
        kinds: ['fill', 'fix', 'order', 'listen'],
        tags: ['a2-shop-clothes'],
        line: { text: 'Round one: what are you wearing? Does it fit?', es: 'Ronda uno: ¿qué llevas puesto? ¿Te queda bien?' },
      },
      {
        hp: 3,
        title: 'Prices and sales',
        topics: [TP],
        kinds: ['fill', 'fix', 'order', 'listen'],
        tags: ['a2-shop-price'],
        line: { text: 'Round two: how much is it? Is it on sale?', es: 'Ronda dos: ¿cuánto cuesta? ¿Está en rebaja?' },
      },
      {
        hp: 3,
        title: 'Returns',
        topics: [TP],
        kinds: ['fill', 'fix', 'order', 'listen'],
        tags: ['a2-shop-return'],
        line: { text: 'Last round: returns! Have you got the receipt?', es: 'Última ronda: ¡devoluciones! ¿Tienes el recibo?' },
      },
    ],
    onlyTags: true,
    zone: 'tienda',
    look: { shirt: '#8a4fa3', hair: '#c9c9c9', skin: '#f1c27d', gender: 'female', accessory: 'glasses' },
    before: [
      { text: "Excuse me! That's the last red scarf on sale. I saw it first!", es: '¡Disculpa! Esa es la última bufanda roja en rebaja. ¡Yo la vi primero!' },
      { text: "I'm Rita. I know every sale in this city. Let's play: if you win, the scarf is yours.", es: 'Soy Rita. Conozco todas las rebajas de esta ciudad. Juguemos: si ganas, la bufanda es tuya.' },
    ],
    after: [
      { text: "Well done! You're a real bargain hunter. The scarf is yours.", es: '¡Bien hecho! Eres un verdadero cazador de ofertas. La bufanda es tuya.' },
      { text: "It suits your friend, I think. Go on, it's a gift!", es: 'Creo que le queda bien a tu {i:amigo|amiga}. Anda, ¡es un regalo!' },
    ],
    freed: { text: "There's a big sale next Saturday. Don't tell anybody!", es: 'Hay una gran rebaja el próximo sábado. ¡No se lo digas a nadie!' },
  },
}

export const A2_MARKET: SceneDef = {
  id: A2_MARKET_ID,
  name: 'Tienda de ropa',
  topics: [],
  map: MAP,
  start: { x: 8, y: 9 },
  // Sin puerta ni llaves: el duelo aparece según el avance
  bossDoor: { x: 0, y: 0 },
  keysNeeded: 0,
  entities: [
    // Leo en la calle del mercado (lección y práctica)
    { type: 'npc', id: 'a2-s4-leo', x: 5, y: 9 },
    // La persona especial en la tienda (lista de compras y cierre)
    { type: 'npc', id: 'a2-s4-interest', x: 6, y: 2 },
    // Nadia, la dependienta, en el mostrador
    { type: 'npc', id: 'a2-s4-nadia', x: 3, y: 5 },
    // Rita aparece en la tienda después de la devolución. No va en (9,5): ese es el único paso entre la tienda y la calle,
    // y vencida se queda ahí; si volvías por la calle, la persona especial (el cierre) quedaba encerrada al otro lado
    { type: 'enemy', id: A2_S4_DUEL, x: 8, y: 4, after: A2_S4_RETURN },
  ],
  labels: [
    { text: 'Clothes shop', x: 3, y: 4 },
    { text: 'Fitting room', x: 10, y: 2 },
    { text: 'Market', x: 2, y: 9 },
  ],
  zoneAt,
  examine: {
    '2,8': { text: 'A stall with hats and scarves. Everything is 20% off!', sub: 'Un puesto de sombreros y bufandas. ¡Todo tiene 20% de descuento!', say: 'Everything is 20% off!' },
    '5,8': { text: 'Second-hand shoes. "Two pairs for $15."', sub: 'Zapatos de segunda mano. "Dos pares por 15 dólares".', say: 'Two pairs for fifteen dollars.' },
    '8,8': { text: 'Colorful T-shirts in all sizes: S, M, L and XL.', sub: 'Camisetas de colores en todas las tallas: S, M, L y XL.', say: 'All sizes: small, medium, large and extra large.' },
    '10,1': { text: 'A mirror. That jacket really suits you!', sub: 'Un espejo. ¡Esa chaqueta te queda muy bien!', say: 'That jacket really suits you!' },
  },
  requirements: [],
  chips: (s) => [
    { label: 'Market Day', done: s.opened.includes(A2_S4_CLOSE) },
    { label: 'Lección de Leo', done: s.seenLesson.includes(TP) },
    { label: 'Práctica', done: s.opened.includes(A2_S4_PRACTICE) },
    { label: 'Fitting Room', done: s.opened.includes(A2_S4_FITTING) },
    { label: 'Devolución con Nadia', done: s.opened.includes(A2_S4_RETURN) },
    { label: 'Duelo con Rita', done: s.defeated.includes(A2_S4_DUEL) },
    { label: 'Ropa nueva', done: s.opened.includes(A2_S4_CLOSE) },
  ],
  intro: {
    first: '{iname} te escribió: "It\'s sale day! Your clothes are very old... Let\'s go shopping!" Leo te espera en la calle del mercado.',
    later: 'La tienda de ropa y el mercado. Sigue los objetivos de la Mochila.',
  },
}
