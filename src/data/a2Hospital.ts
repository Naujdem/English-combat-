import type { GameState, SceneDef, Zone } from '../game/types'

/**
 * A2-01 — A New Beginning. Habitación del hospital donde despierta el protagonista justo después del final de A1.
 * Primera versión: solo la habitación explorable (sin personajes, diálogos ni enemigos todavía).
 * Leyenda nueva:  5  cama de hospital
 * Tu cama (1,3), la mesa de noche (1,4, mesa K), el expediente médico (1,2, gabinete F) y las ventanas se pueden examinar.
 * Una sola escena con tres zonas: la habitación (arriba a la izquierda, como en la primera versión), la recepción
 * (arriba a la derecha) y el pasillo que las une (abajo). Se amplió solo hacia la derecha y hacia abajo,
 * así las posiciones de la habitación guardadas antes siguen siendo válidas.
 * Personajes: la médica (habitación), tu amigo (pasillo) y la recepcionista. Sus tareas están en data/tasks.ts.
 */
const MAP = [
  '######################',
  '#W...##...W#.p.....p.#',
  '#F.....p...#..CCCCC..#',
  '#5.........#.........#',
  '#K.........#.........#',
  '#..........#.H.....H.#',
  '#5.........#.H.....H.#',
  '#5.........#.........#',
  '#........A.#.........#',
  '#p.......A.#.p.....p.#',
  '#....d.....#.........#',
  '#####d##########d#####',
  '#....................#',
  '#..p.....H....H...p..#',
  '#....................#',
  '######################',
]
/** Se reutilizan pisos existentes para no ampliar las zonas */
function zoneAt(x: number, y: number): Zone {
  if (y >= 12) return 'lobby-torre'
  if (x >= 12) return 'recepcion'
  return 'aula-futuro'
}

/** Al hablar con la médica, el protagonista descubre que el centro del reloj está vacío */
export const A2_CORE_MISSING = 'a2-01-doctor'
export const clockCoreMissing = (s: GameState) => s.opened.includes(A2_CORE_MISSING)

/** A2-02 — Pieces of Yesterday: las seis etapas */
const A2_02_CHIPS = (s: GameState) => [
  { label: 'A2-02 · Pieces of Yesterday', done: s.opened.includes('a2-02-pieces') },
  { label: 'Something Is Missing', done: s.opened.includes('a2-02-missing') },
  { label: 'The Elevator', done: s.opened.includes('a2-02-elevator') },
  { label: 'The Stranger', done: s.opened.includes('a2-02-stranger') },
  { label: 'The Missing Core', done: s.opened.includes('a2-02-core') },
  { label: 'Comparing Memories', done: s.opened.includes('a2-02-compare') },
  { label: 'Pieces of Yesterday', done: s.opened.includes('a2-02-pieces') },
]

export const A2_HOSPITAL: SceneDef = {
  id: 'a2-hospital',
  name: 'Hospital · Habitación',
  topics: [],
  map: MAP,
  start: { x: 2, y: 3 },
  // Sin jefe todavía: la puerta del jefe apunta a un muro y no hace falta ninguna llave
  bossDoor: { x: 0, y: 0 },
  keysNeeded: 0,
  entities: [
    { type: 'npc', id: 'a2-doctor', x: 4, y: 4 },
    { type: 'npc', id: 'a2-friend', x: 7, y: 13 },
    { type: 'npc', id: 'a2-receptionist', x: 16, y: 3 },
    // A2-02: la persona especial aparece en el pasillo cuando vuelve al hospital
    { type: 'npc', id: 'a2-interest', x: 15, y: 12 },
  ],
  labels: [
    { text: 'Habitación', x: 6, y: 1 },
    { text: 'Recepción', x: 16, y: 1 },
    { text: 'Pasillo', x: 11, y: 14 },
  ],
  zoneAt,
  examine: {
    '1,3': { text: 'You are in a hospital bed. Your body is still recovering.', sub: 'Estás en una cama de hospital. Tu cuerpo todavía se está recuperando.', say: 'You are in a hospital bed. Your body is still recovering.' },
    '1,4': { text: 'There is a small table beside your bed.', sub: 'Hay una mesita junto a tu cama.', say: 'There is a small table beside your bed.' },
    '1,2': { text: 'This medical record belongs to you.', sub: 'Este expediente médico es tuyo.', say: 'This medical record belongs to you.', tone: 'warn' },
    '1,1': { text: 'You can see the city through the window.', sub: 'Puedes ver la ciudad por la ventana.', say: 'You can see the city through the window.' },
    '10,1': { text: 'You can see the city through the window.', sub: 'Puedes ver la ciudad por la ventana.', say: 'You can see the city through the window.' },
  },
  requirements: [],
  // Al terminar A2-01 se muestran los objetivos de A2-02
  chips: (s) => s.opened.includes('a2-01-belongings') ? A2_02_CHIPS(s) : [
    { label: 'A2-01 · A New Beginning', done: s.opened.includes('a2-01-belongings') },
    { label: 'Médica', done: s.opened.includes('a2-01-doctor') },
    { label: 'Tu amigo', done: s.opened.includes('a2-01-friend') },
    { label: 'One More Round!', done: s.opened.includes('a2-01-round') },
    { label: 'Pertenencias', done: s.opened.includes('a2-01-belongings') },
  ],
  intro: {
    first: 'Abres los ojos en la habitación de un hospital. Todo terminó en la torre Green Valley... ¿o no? Muévete un poco para despertarte: la médica está junto a tu cama.',
    later: 'El hospital: tu habitación, el pasillo y la recepción. Sigue los objetivos bajo el mapa.',
  },
}
