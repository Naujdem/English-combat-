import type { EnemyDef, GameState, Question, SceneDef, Zone } from '../game/types'
import { A2_07_CLOSE } from './a2Race'

/**
 * A2-08 — El Carro que se Detuvo (camino del pasado, después de la carrera).
 * Canon: el jugador manejaba; JoJo se bajó y revisó las ruedas; Leo revisa el motor.
 * "cart" = la carreta que cruzó la pista en A2-07 · "car" = el carro de hoy. Los une la misma luz morada.
 * Orden: Leo (lección past-simple-continuous + práctica) → Eco de la carretera (esbirro)
 *        → JoJo (DebateTalk) → Leo (Reconstruct the Story + Sequence Master)
 *        → El Motor Silencioso (jefe, 2 fases, entrega el fragmento) → Leo (cierre).
 * Se activa al terminar A2-07. Tareas en data/tasks.ts, lección en data/lessons.ts, combates en data/questions-a2-car.ts.
 */
const MAP = [
  '################',
  '#Y.....Y.....Y.#',
  '#..............#',
  '#rrrrrrrrrrrrrr#',
  '#rrrrrrUrrrrrrr#',
  '#rrrrrrrrrrrrrr#',
  '#..............#',
  '#.Y..........Y.#',
  '#..............#',
  '#..............#',
  '################',
]

function zoneAt(_x: number, _y: number): Zone {
  return 'campo-viejo'
}

export const A2_CAR_ID = 'a2-08-road'
export const A2_08_PRACTICE = 'a2-08-practice'
/** Esbirro: aparece en el camino tras la práctica de Leo */
export const A2_08_MINION = 'a2-08-road-echo'
export const A2_08_DEBATE = 'a2-08-debate'
export const A2_08_RECONSTRUCT = 'a2-08-reconstruct'
export const A2_08_STORY = 'a2-08-story'
/** Jefe: aparece junto al carro tras ordenar la historia */
export const A2_08_BOSS = 'a2-08-silent-engine'
export const A2_08_CLOSE = 'a2-08-close'

/** A2-08 se abre al terminar A2-07 */
export const isA2CarUnlocked = (s: GameState) => s.opened.includes(A2_07_CLOSE)

/** Práctica guiada de Leo (lista fija en data/tasks.ts) */
const T = ['a2-car']
const TP = 'past-simple-continuous' as const
export const A2_CAR_PRACTICE: Question[] = [
  { id: 'a2-08-p1', topic: TP, prompt: 'I ___ (drive) when the car stopped.', options: ['was driving', 'drove', 'am driving'], answer: 0, tip: 'Past Continuous: was + verbo con -ing (acción en progreso).', tags: T },
  { id: 'a2-08-p2', topic: TP, prompt: 'JoJo ___ (get) out of the car.', options: ['got', 'getted', 'was get'], answer: 0, tip: 'get → got (irregular). Past Simple.', tags: T },
  { id: 'a2-08-p3', topic: TP, kind: 'fix', prompt: 'We was check the wheels while the engine was make noise.', options: ['We were checking the wheels while the engine was making noise.', 'We was checking the wheels while the engine was making noise.', 'We were check the wheels while the engine was making noise.'], answer: 0, tip: 'we + were + -ing · make → making.', tags: T },
  { id: 'a2-08-p4', topic: TP, kind: 'order', prompt: 'El motor se detuvo de repente.', options: ['The', 'engine', 'stopped', 'suddenly.'], answer: 0, tip: 'stop → stopped (doble p).', tags: T },
  { id: 'a2-08-p5', topic: TP, prompt: '___ we were looking at the road, we saw a purple light.', options: ['While', 'When', 'Then'], answer: 0, tip: 'While + Past Continuous (acción en progreso).', tags: T },
  { id: 'a2-08-p6', topic: TP, prompt: 'I was looking at the map ___ the car stopped.', options: ['when', 'while', 'so'], answer: 0, tip: 'when + Past Simple (acción corta que interrumpe).', tags: T },
  { id: 'a2-08-p7', topic: TP, kind: 'fix', prompt: 'JoJo get out while I check the road.', options: ['JoJo got out while I was checking the road.', 'JoJo got out while I checked the road.', 'JoJo was get out while I was checking the road.'], answer: 0, tip: 'got (terminada) · was checking (en progreso).', tags: T },
]

export const A2_CAR_ENEMIES: Record<string, EnemyDef> = {
  // Esbirro (1 fase): aparece en el camino tras la práctica de Leo.
  [A2_08_MINION]: {
    id: A2_08_MINION,
    name: 'Eco de la carretera',
    person: 'Road Echo',
    kind: 'minion',
    echo: true,
    hp: 5,
    topics: [TP],
    kinds: ['fill', 'fix', 'order', 'listen'],
    tags: ['a2-car-minion'],
    onlyTags: true,
    zone: 'campo-viejo',
    look: { shirt: '#4a4a4a', hair: '#2a2a2a', skin: '#c9b8d8', accessory: 'cap', gender: 'male' },
    before: [
      { text: 'You was drive too fast! The car stop because of you!', es: '¡Ibas demasiado rápido! ¡El carro se detuvo por tu culpa! (was drive, stop: mal).' },
      { text: 'I was see everything! JoJo get out and run!', es: '¡Yo lo vi todo! ¡JoJo se bajó y corrió! (was see, get, run: mal).' },
    ],
    after: [
      { text: 'You… were driving… the engine stopped… Oh. My words are clear again.', es: 'Tú… estabas manejando… el motor se detuvo… Oh. Mis palabras están claras otra vez.' },
      { text: 'There was a purple light near the wheels. I saw it.', es: 'Había una luz morada cerca de las ruedas. La vi.' },
    ],
    freed: { text: 'Talk to JoJo. He remembers more.', es: 'Habla con JoJo. Él recuerda más.' },
    bonus: { q: 'Before you go! While we ___ the engine, the light appeared.', options: ['were checking', 'was checking', 'were check'], answer: 0, tip: 'we + were + verbo con -ing.' },
  },
  // Jefe (2 fases): aparece junto al carro tras ordenar la historia. Entrega el fragmento.
  [A2_08_BOSS]: {
    id: A2_08_BOSS,
    name: 'El Motor Silencioso',
    person: 'The Silent Engine',
    kind: 'boss',
    hp: 6,
    topics: [TP],
    kinds: ['fill', 'fix', 'order', 'listen'],
    tags: ['a2-car-boss'],
    // Fase 1: Past Simple · Fase 2: Past Continuous
    phases: [
      {
        hp: 3,
        title: 'Past Simple',
        topics: [TP],
        kinds: ['fill', 'fix', 'order', 'listen'],
        tags: ['a2-car-boss-simple'],
        line: { text: 'The engine stop! JoJo get out! I see the light!', es: '¡El motor se detuvo! ¡JoJo se bajó! ¡Vi la luz! (stop, get, see: mal).' },
      },
      {
        hp: 3,
        title: 'Past Continuous',
        topics: [TP],
        kinds: ['fill', 'fix', 'order', 'listen'],
        tags: ['a2-car-boss-cont'],
        line: { text: 'OK… but what were you doing? You was drive! We was check!', es: 'Vale… pero ¿qué estabas haciendo? ¡Tú estabas manejando! ¡Estábamos revisando! (was drive, was check: mal).' },
      },
    ],
    onlyTags: true,
    zone: 'campo-viejo',
    look: { shirt: '#2a2440', hair: '#14101f', skin: '#c9b8d8', accessory: 'cap', gender: 'male' },
    before: [
      { text: 'The car stopped… and I took the words. You was drive when everything go wrong!', es: 'El carro se detuvo… y yo me llevé las palabras. ¡Tú estabas manejando cuando todo salió mal! (was drive, go: mal).' },
      { text: 'JoJo get out. Leo was check the engine. But the light was mine!', es: 'JoJo se bajó. Leo estaba revisando el motor. ¡Pero la luz era mía! (get, was check: mal).' },
    ],
    after: [
      { text: 'You were driving… the engine stopped… JoJo got out… Oh. The light is gone.', es: 'Tú estabas manejando… el motor se detuvo… JoJo se bajó… Oh. La luz se fue.' },
      { text: 'Last year the light touched the cart at the race. Today it touched your car.', es: 'El año pasado la luz tocó la carreta en la carrera. Hoy tocó tu carro.' },
    ],
    freed: { text: 'The car is quiet now. Talk to Leo.', es: 'El carro está quieto ahora. Habla con Leo.' },
    release: {
      title: '¡Fragmento recuperado!',
      text: 'Del motor sale un pequeño fragmento morado. Al tomarlo, el centro vacío de tu reloj vibra un segundo… y se queda quieto. Lo guardas con los otros.',
    },
  },
}

export const A2_CAR: SceneDef = {
  id: A2_CAR_ID,
  name: 'El camino · A2',
  topics: [],
  map: MAP,
  start: { x: 7, y: 8 },
  // Sin puerta ni llaves: el esbirro y el jefe aparecen en el mapa según el avance
  bossDoor: { x: 0, y: 0 },
  keysNeeded: 0,
  entities: [
    { type: 'npc', id: 'a2-08-leo', x: 5, y: 8 },
    // JoJo, junto a las ruedas del carro
    { type: 'npc', id: 'a2-08-jojo', x: 9, y: 4 },
    // El eco de la carretera aparece en el camino tras la práctica de Leo
    { type: 'enemy', id: A2_08_MINION, x: 7, y: 6, after: A2_08_PRACTICE },
    // El Motor Silencioso aparece junto al carro tras ordenar la historia
    { type: 'enemy', id: A2_08_BOSS, x: 6, y: 4, after: A2_08_STORY },
  ],
  labels: [
    { text: 'Road', x: 2, y: 3 },
    { text: 'Stopped car', x: 7, y: 2 },
  ],
  zoneAt,
  examine: {
    '7,4': { text: 'The car stopped. The engine is silent now.', sub: 'El carro se detuvo. El motor está silencioso ahora.', say: 'The car stopped.', tone: 'warn' },
  },
  requirements: [],
  chips: (s) => [
    { label: 'A2-08 · El Carro que se Detuvo', done: s.opened.includes(A2_08_CLOSE) },
    { label: 'Lección de Leo', done: s.seenLesson.includes(TP) },
    { label: 'Práctica', done: s.opened.includes(A2_08_PRACTICE) },
    { label: 'Esbirro: Eco de la carretera', done: s.defeated.includes(A2_08_MINION) },
    { label: 'Hablar con JoJo', done: s.opened.includes(A2_08_DEBATE) },
    { label: 'Reconstruct the Story', done: s.opened.includes(A2_08_RECONSTRUCT) },
    { label: 'Ordenar la historia', done: s.opened.includes(A2_08_STORY) },
    { label: 'Jefe: El Motor Silencioso', done: s.defeated.includes(A2_08_BOSS) },
    { label: 'Cierre con Leo', done: s.opened.includes(A2_08_CLOSE) },
  ],
  intro: {
    first: 'Después de la carrera, vas manejando por un camino viejo con Leo y JoJo… y el carro se detiene de repente. Habla con Leo.',
    later: 'El camino en A2. Sigue los objetivos bajo el mapa.',
  },
}
