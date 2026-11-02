import type { EnemyDef, GameState, Question, SceneDef, Zone } from '../game/types'
import { A2_11_CLOSE } from './a2Future'

/**
 * A2-12 — Out of Control (2056, el centro de control de movilidad). Sigue al cierre de A2-11 ("Nobody leaves the city").
 * Adrián, corrompido por el fragmento que sacó de la carga de la carreta River, cerró todas las rutas.
 * Contenido (caps. 24–25): will / going to / presente continuo para planes, y viajes y reservas.
 * Orden: Leo (lección future-plans + práctica) → el Anunciador (esbirro, 2 fases) → la persona especial (Future Planner, escudo con 0-1 errores)
 *        → Leo (lectura: el registro del sistema) → el robot de control (Command Puzzle: órdenes al transporte, escudo con 0-1 errores)
 *        → Adrián (jefe, 2 fases; entrega el fragmento y queda como aliado) → Leo (cierre: el reloj señala el hospital, A2-13).
 * Se activa al terminar A2-11. Tareas en data/tasks.ts, lección en data/lessons.ts, combates en data/questions-a2-12.ts.
 */
const MAP = [
  '################',
  '#C..C..q.vvvvvv#',
  '#......q.......#',
  '#......q.O.O.O.#',
  '#H.H...q.......#',
  '#......q.....i.#',
  '###d#######d####',
  '#..............#',
  '#.t...H....H...#',
  '#..............#',
  '###d######d#####',
  '#P............P#',
  '#==============#',
  '#==============#',
  '#P....H...H...P#',
  '################',
]

function zoneAt(x: number, y: number): Zone {
  if (y <= 5) return x <= 6 ? 'estacion' : 'oficina-torre'
  if (y <= 9) return 'lobby-torre'
  return 'estacion'
}

export const A2_CONTROL_ID = 'a2-12-out-of-control'
export const A2_12_PRACTICE = 'a2-12-practice'
/** Esbirro: el Anunciador, a la salida de la sala de boletos tras la práctica de Leo */
export const A2_12_MINION = 'a2-12-announcer'
export const A2_12_PLANNER = 'a2-12-planner'
export const A2_12_LOG = 'a2-12-log'
export const A2_12_COMMAND = 'a2-12-command'
/** Jefe: Adrián, en la sala de control, tras dar las órdenes al sistema */
export const A2_12_BOSS = 'a2-12-adrian'
export const A2_12_CLOSE = 'a2-12-close'

/** A2-12 se abre al terminar A2-11 */
export const isA2ControlUnlocked = (s: GameState) => s.opened.includes(A2_11_CLOSE)

/** Práctica guiada de Leo (lista fija en data/tasks.ts) */
const T = ['a2-control']
const TP = 'future-plans' as const
export const A2_CONTROL_PRACTICE: Question[] = [
  { id: 'a2-12-p1', topic: TP, prompt: 'I have my ticket. I ___ for Lake Town at ten.', options: ['am leaving', 'leave going', 'will leaving'], answer: 0, tip: 'Plan ya acordado (con boleto): presente continuo.', tags: T },
  { id: 'a2-12-p2', topic: TP, prompt: 'Look at the clock! We ___ miss the tram.', options: ['are going to', 'will to', 'are missing to'], answer: 0, tip: 'Lo vemos venir (evidencia): going to.', tags: T },
  { id: 'a2-12-p3', topic: TP, prompt: 'The phone is ringing! — ___', options: ["I'll answer it.", "I'm going answer it.", 'I answering it.'], answer: 0, tip: 'Decisión en el momento: will.', tags: T },
  { id: 'a2-12-p4', topic: TP, kind: 'fix', prompt: 'I will to book a ticket tomorrow.', options: ['I will book a ticket tomorrow.', 'I will booking a ticket tomorrow.', 'I will to booking a ticket tomorrow.'], answer: 0, tip: 'will + verbo base, sin to.', tags: T },
  { id: 'a2-12-p5', topic: TP, kind: 'fix', prompt: 'She going to visit Green Valley.', options: ['She is going to visit Green Valley.', 'She is going visit Green Valley.', 'She go to visit Green Valley.'], answer: 0, tip: 'am / is / are + going to + verbo.', tags: T },
  { id: 'a2-12-p6', topic: TP, kind: 'order', prompt: 'Voy a reservar un boleto de ida y vuelta.', options: ['I', 'am', 'going', 'to', 'book', 'a', 'return', 'ticket.'], answer: 0, tip: 'I am going to + book. Ida y vuelta: return.', tags: T },
  { id: 'a2-12-p7', topic: TP, prompt: "Single or return? — ___, please. I'm coming back tomorrow.", options: ['Return', 'Single', 'Cancel'], answer: 0, tip: 'Si vuelves, el boleto es de ida y vuelta: return.', tags: T },
  { id: 'a2-12-p8', topic: TP, prompt: 'What time ___ you leaving tomorrow?', options: ['are', 'is', 'does'], answer: 0, tip: 'Presente continuo en pregunta: are you leaving?', tags: T },
]

export const A2_CONTROL_ENEMIES: Record<string, EnemyDef> = {
  // Esbirro (2 fases): el sistema de anuncios de la estación, corrompido. Es un eco: al vencerlo da un escudo.
  [A2_12_MINION]: {
    id: A2_12_MINION,
    name: 'El Anunciador',
    person: 'The Announcer',
    kind: 'minion',
    echo: true,
    hp: 6,
    topics: [TP],
    kinds: ['fill', 'fix', 'order', 'listen'],
    tags: ['a2-control-minion'],
    // Fase 1: will / going to · Fase 2: presente continuo para planes acordados
    phases: [
      {
        hp: 3,
        title: 'Will y going to',
        topics: [TP],
        kinds: ['fill', 'fix', 'order', 'listen'],
        tags: ['a2-control-minion-will'],
        line: { text: 'Attention! It will to rain! Nobody going to travel today!', es: '¡Atención! ¡Va a llover! ¡Nadie va a viajar hoy! (will to rain, nobody going to: mal).' },
      },
      {
        hp: 3,
        title: 'Planes acordados',
        topics: [TP],
        kinds: ['fill', 'fix', 'order', 'listen'],
        tags: ['a2-control-minion-plans'],
        line: { text: 'You are leave at nothing o’clock! Your friends is meeting nobody!', es: '¡Sales a las ninguna en punto! ¡Tus amigos no se reúnen con nadie! (are leave, friends is: mal).' },
      },
    ],
    onlyTags: true,
    zone: 'lobby-torre',
    look: { shirt: '#5a6672', hair: '#2d2d3a', skin: '#c9d6e2', gender: 'male' },
    before: [
      { text: 'Ding dong! Attention, passengers! All trains will to stop forever!', es: '¡Din don! ¡Atención, pasajeros! ¡Todos los trenes se detendrán para siempre! (will to stop: mal).' },
      { text: 'Your plans? You not going to need plans. Nobody leaves the city!', es: '¿Tus planes? No vas a necesitar planes. ¡Nadie sale de la ciudad! (You not going to: mal).' },
    ],
    after: [
      { text: 'Ding dong… Correction: the trains are going to run again. I think.', es: 'Din don… Corrección: los trenes van a volver a funcionar. Creo.' },
      { text: 'Somebody in the Control Room is changing all the plans.', es: 'Alguien en la sala de control está cambiando todos los planes.' },
    ],
    freed: { text: 'Somebody in the Control Room is changing all the plans.', es: 'Alguien en la sala de control está cambiando todos los planes.' },
    bonus: { q: 'Before I go! Look at that queue. We ___ wait a long time.', options: ['are going to', 'will to', 'are waiting to'], answer: 0, tip: 'Lo vemos venir (la fila): going to.' },
  },
  // Jefe (2 fases): Adrián corrompido. Al vencerlo entrega el fragmento de la carreta y vuelve a ser él mismo (aliado).
  [A2_12_BOSS]: {
    id: A2_12_BOSS,
    name: 'Adrián',
    person: 'Adrián, the mobility coordinator',
    kind: 'boss',
    hp: 8,
    topics: [TP],
    kinds: ['fill', 'fix', 'order', 'listen'],
    tags: ['a2-control-boss'],
    // Fase 1: will / going to / presente continuo · Fase 2: viajes y reservas
    phases: [
      {
        hp: 4,
        title: 'Planes: will, going to y presente continuo',
        topics: [TP],
        kinds: ['fill', 'fix', 'order', 'listen'],
        tags: ['a2-control-boss-plans'],
        line: { text: 'I am going close every route! Tomorrow I will closing the sky too!', es: '¡Voy a cerrar cada ruta! ¡Mañana cerraré también el cielo! (going close, will closing: mal).' },
      },
      {
        hp: 4,
        title: 'Viajes y reservas',
        topics: [TP],
        kinds: ['fill', 'fix', 'order', 'listen'],
        tags: ['a2-control-boss-travel'],
        line: { text: 'Your ticket is a single return! Your train leaves from the platform nowhere!', es: '¡Tu boleto es de ida de ida y vuelta! ¡Tu tren sale del andén ninguna parte! (single return, the platform: mal).' },
      },
    ],
    onlyTags: true,
    zone: 'oficina-torre',
    look: { shirt: '#1f3c58', hair: '#3a2a1a', skin: '#b8a8d0', gender: 'male' },
    before: [
      { text: 'You again. I told you: nobody leaves my city.', es: 'Ustedes otra vez. Se los dije: nadie sale de mi ciudad.' },
      { text: 'Every plan is mine now! You not going to travel anywhere!', es: '¡Ahora cada plan es mío! ¡No van a viajar a ninguna parte! (You not going to: mal).' },
    ],
    after: [
      { text: 'What… where am I? I opened the cargo box of the old cart… I touched something purple… and then nothing.', es: '¿Qué… dónde estoy? Abrí la caja de carga de la carreta vieja… toqué algo morado… y luego nada.' },
      { text: 'Here. Take it. I think it is yours. I am going to open all the routes right now.', es: 'Toma. Creo que es tuyo. Voy a abrir todas las rutas ahora mismo.' },
    ],
    freed: { text: 'All the routes are open again. If you ever need help in 2056, come and find me. I will help you.', es: 'Todas las rutas están abiertas otra vez. Si alguna vez necesitas ayuda en 2056, búscame. Te ayudaré.' },
    release: {
      title: '¡Fragmento recuperado!',
      text: 'Adrián abre la mano: tenía el fragmento morado de la carreta River. Al tomarlo, el centro vacío de tu reloj vibra y la luz morada se apaga en los ojos de Adrián. Todas las pantallas cambian a ROUTES OPEN.',
    },
  },
}

export const A2_CONTROL: SceneDef = {
  id: A2_CONTROL_ID,
  name: 'El centro de control · A2',
  topics: [],
  map: MAP,
  start: { x: 4, y: 3 },
  // Sin puerta ni llaves: el esbirro y el jefe aparecen según el avance
  bossDoor: { x: 0, y: 0 },
  keysNeeded: 0,
  entities: [
    // Sala de boletos: Leo (lección)
    { type: 'npc', id: 'a2-12-leo', x: 2, y: 3 },
    // Pasillo: Leo (lectura del registro y cierre) y el robot de control junto a la puerta de la sala de control
    { type: 'npc', id: 'a2-12-leo-hall', x: 8, y: 8 },
    { type: 'npc', id: 'a2-12-bot', x: 13, y: 7 },
    // Andenes: la persona especial con los viajeros (Future Planner)
    { type: 'npc', id: 'a2-12-interest', x: 6, y: 11 },
    // El Anunciador bloquea la salida de la sala de boletos tras la práctica
    { type: 'enemy', id: A2_12_MINION, x: 3, y: 7, after: A2_12_PRACTICE },
    // Adrián aparece en la sala de control tras las órdenes al sistema
    { type: 'enemy', id: A2_12_BOSS, x: 12, y: 2, after: A2_12_COMMAND },
  ],
  labels: [
    { text: 'Ticket Hall', x: 3, y: 5 },
    { text: 'Control Room', x: 11, y: 4 },
    { text: 'Platforms', x: 7, y: 14 },
  ],
  zoneAt,
  examine: {
    '10,1': { text: 'Every screen says the same thing: ALL ROUTES CLOSED.', sub: 'Todas las pantallas dicen lo mismo: TODAS LAS RUTAS CERRADAS.', say: 'All routes closed.', tone: 'warn' },
    '1,1': { text: 'Booking office. Single and return tickets.', sub: 'Taquilla. Boletos de ida y de ida y vuelta.', say: 'Booking office.' },
    '13,5': { text: 'The route board: Route B is going to the closed bridge.', sub: 'El tablero de rutas: la ruta B va hacia el puente cerrado.', say: 'Route B is going to the closed bridge.', tone: 'warn' },
  },
  requirements: [],
  chips: (s) => [
    { label: 'A2-12 · Out of Control', done: s.opened.includes(A2_12_CLOSE) },
    { label: 'Lección de Leo', done: s.seenLesson.includes(TP) },
    { label: 'Práctica', done: s.opened.includes(A2_12_PRACTICE) },
    { label: 'Esbirro: El Anunciador', done: s.defeated.includes(A2_12_MINION) },
    { label: 'Future Planner', done: s.opened.includes(A2_12_PLANNER) },
    { label: 'El registro del sistema', done: s.opened.includes(A2_12_LOG) },
    { label: 'Command Puzzle: el transporte', done: s.opened.includes(A2_12_COMMAND) },
    { label: 'Jefe: Adrián', done: s.defeated.includes(A2_12_BOSS) },
    { label: 'Cierre', done: s.opened.includes(A2_12_CLOSE) },
  ],
  intro: {
    first: 'Todas las rutas de 2056 están cerradas. Llegas a la sala de boletos del centro de control de movilidad. Leo te espera junto a la taquilla.',
    later: 'El centro de control de 2056 en A2. Sigue los objetivos bajo el mapa.',
  },
}
