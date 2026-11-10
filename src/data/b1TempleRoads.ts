import { B1_11_DONE_TEXT } from './b1FixedPoint'
import { closeId } from './b1World'
import type { GameState, SceneDef, Zone } from '../game/types'
import type { InscriptionRoom } from '../game/inscriptions'

/**
 * B1-11 — The First Journey. Bloque C: el Temple of Roads (escena b1-11-roads; es recuerdo por el prefijo "b1-11-").
 * Un templo abierto en un paso de montaña, de noche: caminos de piedra que llegan a un abismo con un puente roto.
 * Se llega por la puerta del cuarto de L (data/b1ClockRoom.ts) al volver de la noche del incendio ('b1-11-fire-out').
 *   La página 44 sobre una piedra (tarea 'b1-11-page44': tema 'wish-b1' + práctica b1-11-w1…w8)
 *   → el muro de inscripciones (tarea 'b1-11-roads-ins': The Ancient Bridge, B1_11_BRIDGE_ROOM + práctica b1-11-r1…r8)
 *   → el puente se puede cruzar → la puerta pesada del fondo: "Próximamente" (bloque 11-D). Ningún bloque C guarda closeId(11).
 */
export const B1_11_ROADS_ID = 'b1-11-roads'
export const B1_11_PAGE44 = 'b1-11-page44'
export const B1_11_ROADS_WALL = 'b1-11-roads-wall'
export const B1_11_ROADS_INS = 'b1-11-roads-ins'

/** The Ancient Bridge (components/Inscriptions.tsx, scene 'bridge'): 6 piedras; la última, la regla de los hechos fijos */
export const B1_11_BRIDGE_ROOM: InscriptionRoom = {
  title: 'The Ancient Bridge',
  intro: { en: 'Every stone of the bridge is a sentence. Build each one to rebuild the road.', es: 'Cada piedra del puente es una frase. Arma cada una para reconstruir el camino.' },
  scene: 'bridge',
  plates: [
    {
      words: ['The travellers', 'had left', 'before', 'the bridge fell'],
      roles: ['subject', 'verb', 'connector', 'complement'],
      es: 'Los viajeros se habían ido antes de que el puente cayera.',
      rule: { title: 'Past perfect: lo que pasó antes', text: 'had + participio cuenta el primer hecho. Before y after ordenan los dos hechos.', examples: ['They had left before it fell.', 'The bridge fell after they had left.'] },
      hint: 'had + participio.',
      distractors: [{ text: 'have left', role: 'verb' }],
      effect: 'Aparece un tramo del puente.',
    },
    {
      // Sin coma en 'we arrived' para que la alternativa use exactamente las mismas fichas
      words: ['By the time', 'we arrived', 'the road', 'had disappeared'],
      roles: ['connector', 'complement', 'subject', 'verb'],
      es: 'Para cuando llegamos, el camino había desaparecido.',
      rule: { title: 'By the time', text: 'By the time + pasado simple, + past perfect: el segundo hecho ya había ocurrido.', examples: ['By the time I came, he had gone.'] },
      hint: 'By the time + pasado simple.',
      alt: [['The road', 'had disappeared', 'by the time', 'we arrived']],
      distractors: [{ text: 'has disappeared', role: 'verb' }],
      effect: 'Otro tramo se levanta.',
    },
    {
      words: ['I', 'wish', 'I', 'knew', 'the way'],
      roles: ['subject', 'verb', 'subject', 'verb', 'object'],
      es: 'Ojalá supiera el camino.',
      rule: { title: 'wish + pasado simple', text: 'Un deseo sobre el presente: wish + pasado simple. Lo que deseas no es verdad ahora.', examples: ['I wish I knew the way.', 'I wish I had more time.'] },
      hint: 'wish + pasado simple.',
      // Las dos fichas "I" son iguales: la alternativa (el mismo orden) le dice al validador que no es ambiguo
      alt: [['I', 'wish', 'I', 'knew', 'the way']],
      distractors: [{ text: 'know', role: 'verb' }],
      effect: 'Las piedras se alinean.',
    },
    {
      words: ['I', 'wish', 'I', 'had known', 'the truth'],
      roles: ['subject', 'verb', 'subject', 'verb', 'object'],
      es: 'Ojalá hubiera sabido la verdad.',
      rule: { title: 'wish + past perfect', text: 'Un arrepentimiento del pasado: wish + had + participio.', examples: ['I wish I had listened.', 'She wishes she had stayed.'] },
      hint: 'wish + had + participio.',
      alt: [['I', 'wish', 'I', 'had known', 'the truth']],
      distractors: [{ text: 'knew', role: 'verb' }],
      effect: 'El puente brilla.',
    },
    {
      words: ['If only', 'I', 'had listened', 'to the stones'],
      roles: ['connector', 'subject', 'verb', 'complement'],
      es: 'Si tan solo hubiera escuchado a las piedras.',
      rule: { title: 'If only', text: 'If only es un wish más fuerte. If only + had + participio = ¡si tan solo hubiera...!', examples: ['If only I had stayed!', 'If only we had known!'] },
      hint: 'If only + had + participio.',
      distractors: [{ text: 'listened', role: 'verb' }],
      effect: 'Un arco de piedra se cierra.',
    },
    {
      words: ['A fixed point', "can't be", 'changed'],
      roles: ['subject', 'aux', 'participle'],
      es: 'Un hecho fijo no puede cambiarse.',
      rule: { title: 'La regla de los hechos fijos', text: "Algunos momentos del pasado no se pueden cambiar, hagas lo que hagas: son hechos fijos. Se dice: A fixed point can't be changed.", examples: ["A fixed point can't be changed.", 'Some roads always meet.'] },
      hint: "can't be + participio.",
      distractors: [{ text: 'can', role: 'aux' }],
      effect: 'El puente se completa.',
    },
  ],
  finish: { en: 'Some roads always meet. I wish I had known.', es: 'Algunos caminos siempre se encuentran. Ojalá lo hubiera sabido.', banner: 'El puente está completo' },
}

const BROKEN = { text: 'The bridge is broken.', sub: 'Reconstruye el puente con las inscripciones.' }
const GAP = { text: 'A deep gap.', sub: 'Un abismo profundo.', say: 'A deep gap.' }

/**
 * Leyenda (data/b1Valley.ts, components/Tiles.tsx): Y árbol · w agua (el abismo con neblina) · , pasto · _ camino de piedra · d puerta.
 * La puerta de entrada (0,3), la página 44 (2,4), el muro de inscripciones (3,1), el puente (5..7,3) y la puerta pesada (11,3).
 */
const MAP = [
  'YYYYYwwwYYYY',
  'Y,,,,www,,,Y',
  'Y,,,,www,,,Y',
  'd__________d',
  'Y,,,,www,,,Y',
  'Y,,,,www,,,Y',
  'YYYYYwwwYYYY',
]

/** Como el Temple of Stones */
const zoneAt = (): Zone => 'patio-viejo'

export const B1_11_ROADS: SceneDef = {
  id: B1_11_ROADS_ID,
  name: 'Recuerdo 11 · Temple of Roads',
  topics: [],
  map: MAP,
  start: { x: 1, y: 3 },
  bossDoor: { x: 0, y: 0 },
  keysNeeded: 0,
  entities: [
    // La página 44 sobre una piedra, cerca de la entrada: la primera tarea
    { type: 'npc', id: B1_11_PAGE44, x: 2, y: 4 },
    // El muro de inscripciones con glifos (pide la página 44: data/tasks.ts, requires)
    { type: 'npc', id: B1_11_ROADS_WALL, x: 3, y: 1 },
  ],
  labels: [{ text: 'Temple of Roads', x: 6, y: 5 }],
  zoneAt: () => zoneAt(),
  examine: {
    '5,2': GAP,
    '6,2': GAP,
    '7,2': GAP,
    '5,4': GAP,
    '6,4': GAP,
    '7,4': GAP,
  },
  // El puente: cerrado hasta terminar las inscripciones (la puerta del fondo solo se alcanza cruzándolo)
  locked: (x, y, s) => {
    if (y !== 3) return null
    if (x >= 5 && x <= 7 && !s.opened.includes(B1_11_ROADS_INS)) return BROKEN
    return null
  },
  // La puerta de la izquierda vuelve al cuarto de L
  // La puerta pesada del fondo (11,3) lleva a la cámara de The Fixed Point (bloque 11-D, data/b1FixedPoint.ts)
  links: { '0,3': { sceneId: 'b1-11-room', pos: { x: 10, y: 3 } }, '11,3': { sceneId: 'b1-11-point', pos: { x: 1, y: 3 } } },
  requirements: [],
  chips: (s: GameState) => [
    { label: 'El cuaderno de L: página 44', done: s.opened.includes(B1_11_PAGE44) },
    { label: 'Las inscripciones: The Ancient Bridge', done: s.opened.includes(B1_11_ROADS_INS) },
    { label: 'El puente', done: s.opened.includes(B1_11_ROADS_INS) },
  ],
  intro: {
    first: 'The Temple of Roads. Every road ends here. — El Templo de los Caminos. Todos los caminos terminan aquí.',
    later: (s) => (s.opened.includes(closeId(11)) ? B1_11_DONE_TEXT : 'The Temple of Roads. Every road ends here. — El Templo de los Caminos. Todos los caminos terminan aquí.'),
  },
}
