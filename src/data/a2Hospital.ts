import type { SceneDef, Zone } from '../game/types'

/**
 * A2-01 — A New Beginning. Habitación del hospital donde despierta el protagonista justo después del final de A1.
 * Primera versión: solo la habitación explorable (sin personajes, diálogos ni enemigos todavía).
 * Leyenda nueva:  5  cama de hospital
 * El tamaño (12×12) es mayor que la cámara (11 casillas) para que la vista no quede vacía.
 */
const MAP = [
  '############',
  '#W...##...W#',
  '#5.....p...#',
  '#5.........#',
  '#..........#',
  '#5....K....#',
  '#5.........#',
  '#..........#',
  '#F.......A.#',
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
  requirements: [],
  chips: () => [{ label: 'A2-01 · A New Beginning', done: false }],
  intro: {
    first: 'Abres los ojos en la habitación de un hospital. Todo terminó en la torre Green Valley... ¿o no? Muévete un poco para despertarte.',
    later: 'La habitación del hospital. A2 empieza aquí.',
  },
}
