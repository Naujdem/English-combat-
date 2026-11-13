import type { ScriptLine } from './b1Accident'
import { closeId } from './b1World'
import type { GameState, SceneDef, Zone } from '../game/types'

/**
 * B1-13 — The Price. Bloque D (cierre): Greenfield School, a la mañana siguiente (escena b1-13-school; recuerdo por el prefijo).
 * Se llega por la puerta derecha del patio de 2056 (data/b1Window2056.ts) después de escribir el plan ('b1-13-planner').
 * Un estudiante nuevo llega temprano, solo: se dibuja con el aspecto del jugador (screens/Explore.tsx, heroLook), sin nombre.
 * Cierre: tarea 'b1-13-close' (= closeId(13)), B1_13_CLOSE_SCRIPT; la última línea es la de A1 (screens/Intro.tsx) y no hay nada
 * después: se recuperan los 4 temas, se sale del recuerdo con fundido a negro y se abre el nodo 14 sin FragmentJoin.
 */
export const B1_13_SCHOOL_ID = 'b1-13-school'
export const B1_13_STUDENT = 'b1-13-student'
export const B1_13_CLOSE = closeId(13)
export const B1_13_DONE_TEXT = 'The Price. La misión 13 terminó: la misión 14 te espera en el mapa.'

/** El cierre (secuencia fija, MemoryScript). La línea de L es la de A1, con voz ronca (fx 'stranger') */
export const B1_13_CLOSE_SCRIPT: ScriptLine[] = [
  { who: 'narrator', text: '(Next morning. A new school. A student arrives early, alone.)', es: '(A la mañana siguiente. Una escuela nueva. {h:Un|Una} estudiante llega temprano, {h:solo|sola}.)' },
  { who: 'narrator', text: '(Your voice is hoarse. It is the only voice you have left.)', es: '(Tu voz es ronca. Es la única voz que te queda.)' },
  { who: 'L', text: 'Hi, hi... What a nice voice you have.', es: 'Hola, hola... Qué linda voz tienes. (Su voz es ronca, como si casi no pudiera hablar.)', fx: 'stranger' },
]

/**
 * Leyenda de components/Tiles.tsx (escuela): # pared · W ventana · , pasto · _ piedra · p planta.
 * Sin puertas de salida: el recuerdo termina aquí. El estudiante, cerca del portón (6,3).
 */
const MAP = [
  '#W#W#W#W#W##',
  '#,,,,,,,,,,#',
  '#p,,,,,,,,p#',
  '#__________#',
  '#,,,,,,,,,,#',
  '#p,,,,,,,,p#',
  '############',
]

/** El patio de la escuela */
const zoneAt = (): Zone => 'patio'

export const B1_13_SCHOOL: SceneDef = {
  id: B1_13_SCHOOL_ID,
  name: 'Recuerdo 13 · Greenfield School, mañana',
  topics: [],
  map: MAP,
  start: { x: 1, y: 3 },
  bossDoor: { x: 0, y: 0 },
  keysNeeded: 0,
  entities: [
    // El estudiante nuevo, solo, cerca del portón (aspecto del jugador). Su tarea es el cierre closeId(13)
    { type: 'npc', id: B1_13_STUDENT, x: 6, y: 3 },
  ],
  labels: [{ text: 'Greenfield School', x: 5, y: 5 }],
  zoneAt: () => zoneAt(),
  examine: {},
  links: {},
  requirements: [],
  chips: (s: GameState) => [{ label: s.hero.gender === 'female' ? 'La estudiante nueva' : 'El estudiante nuevo', done: s.opened.includes(B1_13_CLOSE) }],
  intro: {
    first: 'Next morning. A new school. — A la mañana siguiente. Una escuela nueva.',
    later: (s) => (s.opened.includes(B1_13_CLOSE) ? B1_13_DONE_TEXT : 'Next morning. A new school. — A la mañana siguiente. Una escuela nueva.'),
  },
}
