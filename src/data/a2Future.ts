import type { EnemyDef, GameState, Question, SceneDef, Zone } from '../game/types'
import { A2_10_CLOSE } from './a2LeoHouse'

/**
 * A2-11 — The City of Tomorrow (la ciudad de 2056; misma distribución que la de A1, con la estación y el museo del transporte).
 * Canon (A + C): la carreta River está en el museo del transporte. La carga está vacía: Adrián, coordinador de movilidad,
 * supervisó el traslado, tocó el fragmento y empieza a corromperse. El fragmento se recupera en A2-12 (no aquí).
 * Contenido (caps. 21–23): preposiciones de lugar y de movimiento, indicaciones y transporte.
 * Orden: robot de objetos perdidos (Lost Luggage) → Leo (lección places-directions + práctica) → Dron de Rutas (esbirro, 2 fases)
 *        → la persona especial (Route Challenge) → Leo en el museo (Magic Book, escudo con 0-1 errores)
 *        → Leo (Detective: la carreta) → Adrián (reunión, DebateTalk) → The Runaway Tram (jefe, 2 fases, sin fragmento)
 *        → la persona especial (cierre: ALL ROUTES CLOSED).
 * Se activa al terminar A2-10. Tareas en data/tasks.ts, lección en data/lessons.ts, combates en data/questions-a2-11.ts.
 */
const MAP = [
  'qqqqqqqqqqqqqqqq',
  'qCC.O.q.E.u.E.pq',
  'q.....q........q',
  'qHH.H.q.U...U..q',
  'q.....q........q',
  'qqdqqqqqqqqdqqqq',
  'q______________q',
  'q=====zz=======q',
  'q==E==zz=====E=q',
  'q______________q',
  'qP__Y______qqqqq',
  'q______NN__qOOiq',
  'q__H___NNZ_d...q',
  'q_Y________q...q',
  'q______H___q...q',
  'qqqqqqqqqqqqqqqq',
]

function zoneAt(x: number, y: number): Zone {
  if (y <= 5) return x <= 6 ? 'estacion' : 'museo'
  if (y >= 10 && x >= 11) return 'turismo-futuro'
  return 'calle-futuro'
}

export const A2_FUTURE_ID = 'a2-11-city-of-tomorrow'
export const A2_11_LUGGAGE = 'a2-11-luggage'
export const A2_11_PRACTICE = 'a2-11-practice'
/** Esbirro: el Dron de Rutas, a la salida de la estación tras la práctica de Leo */
export const A2_11_MINION = 'a2-11-route-drone'
export const A2_11_ROUTE = 'a2-11-route'
export const A2_11_BOOK = 'a2-11-book'
export const A2_11_DETECTIVE = 'a2-11-detective'
export const A2_11_MEETING = 'a2-11-meeting'
/** Jefe: el tranvía sin rumbo, en Sky Street tras la reunión con Adrián */
export const A2_11_BOSS = 'a2-11-runaway-tram'
export const A2_11_CLOSE = 'a2-11-close'

/** A2-11 se abre al terminar A2-10 */
export const isA2FutureUnlocked = (s: GameState) => s.opened.includes(A2_10_CLOSE)

/** Práctica guiada de Leo (lista fija en data/tasks.ts) */
const T = ['a2-future']
const TP = 'places-directions' as const
export const A2_FUTURE_PRACTICE: Question[] = [
  { id: 'a2-11-p1', topic: TP, prompt: 'My bag is ___ the bench, next to the door.', options: ['under', 'between', 'along'], answer: 0, tip: 'Debajo de algo: under.', tags: T },
  { id: 'a2-11-p2', topic: TP, prompt: 'The café is ___ the station and the museum.', options: ['between', 'next', 'across'], answer: 0, tip: 'En medio de dos cosas: between … and …', tags: T },
  { id: 'a2-11-p3', topic: TP, kind: 'fix', prompt: 'The museum is in front the tower.', options: ['The museum is in front of the tower.', 'The museum is in the front the tower.', 'The museum is front of the tower.'], answer: 0, tip: 'in front of (con of), igual que next to lleva to.', tags: T },
  { id: 'a2-11-p4', topic: TP, prompt: 'Walk ___ the bridge to the other side of the river.', options: ['across', 'through', 'under'], answer: 0, tip: 'De un lado al otro (puente, calle): across.', tags: T },
  { id: 'a2-11-p5', topic: TP, prompt: 'The tram goes ___ the tunnel.', options: ['through', 'across', 'on'], answer: 0, tip: 'Por dentro de algo (túnel, parque): through.', tags: T },
  { id: 'a2-11-p6', topic: TP, kind: 'order', prompt: 'Gira a la izquierda en el semáforo.', options: ['Turn', 'left', 'at', 'the', 'traffic', 'lights.'], answer: 0, tip: 'Turn left + at + el lugar.', tags: T },
  { id: 'a2-11-p7', topic: TP, prompt: 'We can ___ the tram and get off at Museum Bridge.', options: ['take', 'go', 'ride on to'], answer: 0, tip: 'Transporte: take the tram / the bus.', tags: T },
]

export const A2_FUTURE_ENEMIES: Record<string, EnemyDef> = {
  // Esbirro (2 fases): un dron guía corrompido que da indicaciones equivocadas. Es un eco: al vencerlo da un escudo.
  [A2_11_MINION]: {
    id: A2_11_MINION,
    name: 'Dron de Rutas',
    person: 'Route Drone',
    kind: 'minion',
    echo: true,
    reward: 'chaqueta-neon',
    hp: 6,
    topics: [TP],
    kinds: ['fill', 'fix', 'order', 'listen'],
    tags: ['a2-future-minion'],
    // Fase 1: preposiciones de lugar · Fase 2: indicaciones
    phases: [
      {
        hp: 3,
        title: 'Preposiciones de lugar',
        topics: [TP],
        kinds: ['fill', 'fix', 'order', 'listen'],
        tags: ['a2-future-minion-place'],
        line: { text: 'The museum is next the station! No, it is in front the tower!', es: '¡El museo está al lado de la estación! ¡No, está delante de la torre! (next the, in front the: mal).' },
      },
      {
        hp: 3,
        title: 'Indicaciones',
        topics: [TP],
        kinds: ['fill', 'fix', 'order', 'listen'],
        tags: ['a2-future-minion-dir'],
        line: { text: 'Go straight on left! Turn to right in the bridge!', es: '¡Sigue derecho a la izquierda! ¡Gira a la derecha en el puente! (go straight on left, turn to right: mal).' },
      },
    ],
    onlyTags: true,
    zone: 'calle-futuro',
    look: { shirt: '#9aa6b2', hair: '#5a6672', skin: '#c9d6e2', gender: 'male' },
    before: [
      { text: 'Welcome to 2056! Your route: go under the sky and turn in the river!', es: '¡{h:Bienvenido|Bienvenida} a 2056! Tu ruta: ve por debajo del cielo y gira en el río! (indicaciones sin sentido).' },
      { text: 'All routes are on me. Nobody walk across without me!', es: 'Todas las rutas dependen de mí. ¡Nadie cruza sin mí! (on me, nobody walk: mal).' },
    ],
    after: [
      { text: 'Recalculating… Go straight along Sky Avenue. Thank you. My map is clear again.', es: 'Recalculando… Sigue derecho por Sky Avenue. Gracias. Mi mapa está claro otra vez.' },
      { text: 'Warning: some routes are changing by themselves today.', es: 'Aviso: hoy algunas rutas cambian solas.' },
    ],
    freed: { text: 'Some routes are changing by themselves.', es: 'Algunas rutas cambian solas.' },
    bonus: { q: 'Before I go! The museum is ___ the river.', options: ['across', 'through', 'into'], answer: 0, tip: 'Al otro lado del río: across the river.' },
  },
  // Jefe (2 fases): un tranvía sin conductor que recorre la ciudad sin rumbo. No entrega fragmento.
  [A2_11_BOSS]: {
    id: A2_11_BOSS,
    name: 'El tranvía sin rumbo',
    person: 'The Runaway Tram',
    kind: 'boss',
    hp: 8,
    topics: [TP],
    kinds: ['fill', 'fix', 'order', 'listen'],
    tags: ['a2-future-boss'],
    // Fase 1: preposiciones de movimiento · Fase 2: transporte y viajes
    phases: [
      {
        hp: 4,
        title: 'Preposiciones de movimiento',
        topics: [TP],
        kinds: ['fill', 'fix', 'order', 'listen'],
        tags: ['a2-future-boss-move'],
        line: { text: 'I go across the tunnel and through the bridge! Nobody stops me!', es: '¡Voy por el túnel y por el puente! ¡Nadie me detiene! (across the tunnel, through the bridge: al revés).' },
      },
      {
        hp: 4,
        title: 'Transporte y viajes',
        topics: [TP],
        kinds: ['fill', 'fix', 'order', 'listen'],
        tags: ['a2-future-boss-travel'],
        line: { text: 'Get out the tram! You can go with foot! Next stop: nowhere!', es: '¡Bájate del tranvía! ¡Puedes ir a pie! Próxima parada: ninguna. (get out the tram, with foot: mal).' },
      },
    ],
    onlyTags: true,
    zone: 'calle-futuro',
    look: { shirt: '#2f8f9d', hair: '#1f3c58', skin: '#b8c8d6', gender: 'male' },
    before: [
      { text: 'Ding ding! No driver, no stops, no routes! I go where I want!', es: '¡Tilín tilín! ¡Sin conductor, sin paradas, sin rutas! ¡Voy a donde quiero!' },
      { text: 'Get in me! I take you through the river and across the tunnel!', es: '¡Súbete! ¡Te llevo por dentro del río y al otro lado del túnel! (preposiciones al revés).' },
    ],
    after: [
      { text: 'Next stop… the depot. The tram has stopped.', es: 'Próxima parada… el depósito. El tranvía se ha detenido.' },
      { text: 'Somebody changed my route… somebody in the Mobility Office.', es: 'Alguien cambió mi ruta… alguien de la oficina de movilidad.' },
    ],
    freed: { text: 'Somebody in the Mobility Office changed my route.', es: 'Alguien de la oficina de movilidad cambió mi ruta.' },
    farewell: {
      q: 'Tram driver: Thank you! How do I get to the museum from here?',
      options: ['Go straight on and turn left at the traffic lights.', 'Go straight on and turn to left in the traffic lights.', 'Goes straight on and turn left at the traffic lights.'],
      answer: 0,
      tip: 'Indicaciones: imperativo (Go, turn) + turn left + at the traffic lights.',
    },
    release: {
      title: 'Las rutas',
      text: 'El tranvía se detiene. Del techo cae polvo morado, pero no hay ningún fragmento. Todas las pantallas de la calle parpadean al mismo tiempo.',
    },
  },
}

export const A2_FUTURE: SceneDef = {
  id: A2_FUTURE_ID,
  name: 'La ciudad de 2056 · A2',
  topics: [],
  map: MAP,
  start: { x: 3, y: 2 },
  // Sin puerta ni llaves: el esbirro y el jefe aparecen según el avance
  bossDoor: { x: 0, y: 0 },
  keysNeeded: 0,
  entities: [
    // Estación: robot de objetos perdidos (junto al mostrador) y Leo (lección)
    { type: 'npc', id: 'a2-11-robot', x: 3, y: 1 },
    { type: 'npc', id: 'a2-11-leo', x: 4, y: 4 },
    // La persona especial, en la calle, con el mapa viejo de la oficial Rosa
    { type: 'npc', id: 'a2-11-interest', x: 5, y: 9 },
    // Leo en el museo del transporte, junto a la carreta
    { type: 'npc', id: 'a2-11-leo-museum', x: 10, y: 2 },
    // Adrián, en la oficina de movilidad (aparece tras el Detective)
    { type: 'npc', id: 'a2-11-adrian', x: 13, y: 13 },
    // El Dron de Rutas bloquea la salida de la estación tras la práctica
    { type: 'enemy', id: A2_11_MINION, x: 2, y: 6, after: A2_11_PRACTICE },
    // El tranvía sin rumbo aparece en Sky Street tras la reunión con Adrián
    { type: 'enemy', id: A2_11_BOSS, x: 9, y: 9, after: A2_11_MEETING },
  ],
  labels: [
    { text: 'Station', x: 3, y: 4 },
    { text: 'Transport Museum', x: 10, y: 4 },
    { text: 'Sky Street', x: 10, y: 7 },
    { text: 'Mobility Office', x: 13, y: 14 },
  ],
  zoneAt,
  examine: {
    '10,1': { text: 'The River cart, behind glass. There is purple dust on the wheels. The cargo box is empty.', sub: 'La carreta River, detrás de un vidrio. Hay polvo morado en las ruedas. La caja de carga está vacía.', say: 'The cargo box is empty.', tone: 'warn' },
    '8,1': { text: 'A flying car from 2040. "Please do not touch."', sub: 'Un carro volador de 2040. "Por favor, no tocar."', say: 'Please do not touch.' },
    '8,3': { text: 'An old car from the 1990s, like the car on the road.', sub: 'Un carro viejo de los años 90, como el carro del camino.', say: 'An old car from the nineteen nineties.' },
    '1,1': { text: 'Lost and Found. Open 24 hours.', sub: 'Objetos perdidos. Abierto 24 horas.', say: 'Lost and Found.' },
  },
  requirements: [],
  chips: (s) => [
    { label: 'A2-11 · The City of Tomorrow', done: s.opened.includes(A2_11_CLOSE) },
    { label: 'Lost Luggage', done: s.opened.includes(A2_11_LUGGAGE) },
    { label: 'Lección de Leo', done: s.seenLesson.includes(TP) },
    { label: 'Práctica', done: s.opened.includes(A2_11_PRACTICE) },
    { label: 'Esbirro: Dron de Rutas', done: s.defeated.includes(A2_11_MINION) },
    { label: 'Route Challenge', done: s.opened.includes(A2_11_ROUTE) },
    { label: 'The Magic Book', done: s.opened.includes(A2_11_BOOK) },
    { label: 'Detective: la carreta', done: s.opened.includes(A2_11_DETECTIVE) },
    { label: 'Reunión con Adrián', done: s.opened.includes(A2_11_MEETING) },
    { label: 'Jefe: El tranvía sin rumbo', done: s.defeated.includes(A2_11_BOSS) },
    { label: 'Cierre', done: s.opened.includes(A2_11_CLOSE) },
  ],
  intro: {
    first: 'El reloj te trae a la estación de 2056, siguiendo la señal. Tu mochila no está contigo. Habla con el robot de objetos perdidos.',
    later: 'La ciudad de 2056 en A2. Sigue los objetivos bajo el mapa.',
  },
}
