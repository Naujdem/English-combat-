import type { GameState, SceneDef, Zone } from '../game/types'

/**
 * B1-09 — Temples of Stones and Time. Recuerdo 9 (escena b1-09-valley; es recuerdo por el prefijo "b1-09-"). Juegas como L
 * (SpriteL), ya mayor, años después del incendio; los demás con la cara borrosa. Sin atuendos. L no habla: escribe en su cuaderno.
 * Bloque A (este): la entrada de un valle selvático al atardecer.
 *   El cuaderno de L sobre una roca (tarea 'b1-09-journey': página 31, tema 'travel-b1' + práctica b1-09-j1…j8,
 *   data/questions-b1-09.ts) → la guía local en el portón de la aldea (tarea 'b1-09-culture': tema 'culture-talk' +
 *   práctica b1-09-c1…c4; después 'b1-09-guide-talk', DebateTalk) → el camino de piedra al templo: próximamente (bloque 9-B).
 * Ningún bloque A guarda closeId(9) (se guarda en 9-D).
 */
export const B1_09_VALLEY_ID = 'b1-09-valley'
export const B1_09_NOTEBOOK = 'b1-09-notebook'
export const B1_09_JOURNEY = 'b1-09-journey'
export const B1_09_GUIDE = 'b1-09-guide'
export const B1_09_CULTURE = 'b1-09-culture'
export const B1_09_GUIDE_TALK = 'b1-09-guide-talk'
export const B1_09_TEMPLE_SOON = 'Próximamente: el Temple of Stones (bloque 9-B)'

/**
 * Leyenda de components/Tiles.tsx: Y árbol (vegetación densa) · w agua (la cascada del fondo, decoración) · , pasto ·
 * r sendero · f cerca de la aldea · d portón de madera · _ camino de piedra hacia el templo.
 * El cuaderno sobre la roca (3,3), la guía junto al portón (9,3), el portón (10,4) y el camino de piedra (11..13,4).
 */
const MAP = [
  'YYYYYYYYYYYYYY',
  'YYYwwwwwYYYYYY',
  'Y,,,,,,,,,f,YY',
  'Y,Y,,,,,,,f,YY',
  'rrrrrrrrrrd___',
  'Y,,,,Y,,,,f,YY',
  'YYYYYYYYYYYYYY',
]

const zoneAt = (): Zone => 'parque'

export const B1_09_VALLEY: SceneDef = {
  id: B1_09_VALLEY_ID,
  name: 'Recuerdo 9 · Temples of Stones and Time',
  topics: [],
  map: MAP,
  start: { x: 1, y: 4 },
  // Sin jefe en este bloque: la puerta del jefe apunta a un árbol y no hace falta ninguna llave
  bossDoor: { x: 0, y: 0 },
  keysNeeded: 0,
  entities: [
    // El cuaderno sobre una roca junto al sendero: la primera tarea
    { type: 'npc', id: B1_09_NOTEBOOK, x: 3, y: 3 },
    // La guía, en el portón de la aldea (sus tareas piden terminar el cuaderno: data/tasks.ts, requires)
    { type: 'npc', id: B1_09_GUIDE, x: 9, y: 3 },
  ],
  labels: [{ text: 'Valle', x: 5, y: 5 }],
  zoneAt: () => zoneAt(),
  examine: {
    '5,1': { text: 'A waterfall.', sub: 'Una cascada.', say: 'A waterfall.' },
  },
  // El camino de piedra al templo: cerrado en este bloque
  locked: (x, y) => (x === 11 && y === 4 ? { text: B1_09_TEMPLE_SOON, sub: 'El templo está cerrado por ahora.' } : null),
  requirements: [],
  chips: (s: GameState) => [
    { label: 'El cuaderno de L: página 31', done: s.opened.includes(B1_09_JOURNEY) },
    { label: 'La guía local', done: s.opened.includes(B1_09_CULTURE) },
    { label: 'La conversación con la guía', done: s.opened.includes(B1_09_GUIDE_TALK) },
    { label: B1_09_TEMPLE_SOON, done: false },
  ],
  intro: {
    first: 'Years later, in a faraway valley. — Años después, en un valle lejano.',
    later: () => 'Years later, in a faraway valley. — Años después, en un valle lejano.',
  },
}
