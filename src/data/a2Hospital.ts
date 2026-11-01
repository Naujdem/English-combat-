import type { SceneDef, Zone } from '../game/types'

/**
 * A2-01 — A New Beginning. Habitación del hospital donde despierta el protagonista justo después del final de A1.
 * Primera versión: solo la habitación explorable (sin personajes, diálogos ni enemigos todavía).
 * Leyenda nueva:  5  cama de hospital
 * Tu cama (1,3), la mesa de noche (1,4, mesa K), el expediente médico (1,2, gabinete F) y las ventanas se pueden examinar.
 * El tamaño (12×12) es mayor que la cámara (11 casillas) para que la vista no quede vacía.
 */
const MAP = [
  '############',
  '#W...##...W#',
  '#F.....p...#',
  '#5.........#',
  '#K.........#',
  '#..........#',
  '#5.........#',
  '#5.........#',
  '#........A.#',
  '#p.......A.#',
  '#....d.....#',
  '############',
]
/** Se reutiliza un piso existente (claro, limpio) para no ampliar las zonas */
const zoneAt = (): Zone => 'aula-futuro'

export const A2_HOSPITAL: SceneDef = {
  id: 'a2-hospital',
  name: 'Hospital · Habitación',
  topics: [],
  map: MAP,
  start: { x: 2, y: 3 },
  // Sin jefe todavía: la puerta del jefe apunta a un muro y no hace falta ninguna llave
  bossDoor: { x: 0, y: 0 },
  keysNeeded: 0,
  entities: [],
  labels: [
    { text: 'Habitación', x: 6, y: 1 },
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
  chips: () => [{ label: 'A2-01 · A New Beginning', done: false }],
  intro: {
    first: 'Abres los ojos en la habitación de un hospital. Todo terminó en la torre Green Valley... ¿o no? Muévete un poco para despertarte.',
    later: 'La habitación del hospital. A2 empieza aquí.',
  },
}
