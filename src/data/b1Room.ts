import type { GameState, SceneDef, Zone } from '../game/types'

/**
 * B1-07 — The Underworld. Recuerdo 7 (escena b1-07-room; es recuerdo por el prefijo "b1-07-"). Juegas como L (SpriteL);
 * los demás con la cara borrosa (Explore lo hace solo en las escenas de recuerdo). Sin atuendos.
 * Bloque A (este): el cuarto alquilado de L, pequeño y sucio, un año después del incendio.
 *   La televisión (tarea 'b1-07-news': lección 'passive-news' + práctica b1-07-n1…n8, data/questions-b1-07.ts; al final,
 *   el mensaje de la amiga) → el cuaderno del escritorio.
 * Bloque B: el mismo cuaderno, dos tareas encadenadas: página 15 ('b1-07-deduce-now', tema 'deduction') y
 *   página 16 ('b1-07-deduce-past', tema 'deduction-past'), con data/questions-b1-07.ts
 *   → la puerta a la calle: lleva al bajo mundo (bloque C, data/b1Market.ts). Ningún bloque A guarda closeId(7) (se guarda en 7-E).
 */
export const B1_07_ROOM_ID = 'b1-07-room'
/** La tele vieja: su tarea guarda B1_07_NEWS al terminar */
export const B1_07_TV = 'b1-07-tv'
export const B1_07_NEWS = 'b1-07-news'
/** El cuaderno del escritorio: se desbloquea al terminar la tele (bloque B: páginas 15 y 16) */
export const B1_07_NOTEBOOK = 'b1-07-notebook'
export const B1_07_DEDUCE_NOW = 'b1-07-deduce-now'
export const B1_07_DEDUCE_PAST = 'b1-07-deduce-past'

/**
 * Un solo cuarto (leyenda de data/b1Words.ts: 5 colchón · K escritorio · W ventana con persianas · d puerta).
 * La tele vieja (8,2), el escritorio con el cuaderno (1,5) y la puerta a la calle (11,3).
 */
const MAP = [
  '############',
  '#5....W....#',
  '#5.........#',
  '#..........d',
  '#..........#',
  '#K.........#',
  '############',
]

const zoneAt = (): Zone => 'casa'

export const B1_07_ROOM: SceneDef = {
  id: B1_07_ROOM_ID,
  name: 'Recuerdo 7 · The Underworld',
  topics: [],
  map: MAP,
  start: { x: 3, y: 3 },
  // Sin jefe en este bloque: la puerta del jefe apunta a un muro y no hace falta ninguna llave
  bossDoor: { x: 0, y: 0 },
  keysNeeded: 0,
  entities: [
    // La tele vieja: la primera tarea
    { type: 'npc', id: B1_07_TV, x: 8, y: 2 },
    // El cuaderno, sobre el escritorio (sus tareas piden terminar la tele: data/tasks.ts, requires)
    { type: 'npc', id: B1_07_NOTEBOOK, x: 2, y: 5 },
  ],
  labels: [{ text: 'Cuarto alquilado', x: 6, y: 5 }],
  zoneAt: () => zoneAt(),
  examine: {
    '1,1': { text: 'My mattress.', sub: 'Mi colchón.', say: 'My mattress.' },
    '1,2': { text: 'My mattress.', sub: 'Mi colchón.', say: 'My mattress.' },
    '6,1': { text: 'The blinds are closed.', sub: 'Las persianas están cerradas.', say: 'The blinds are closed.' },
  },
  // La puerta a la calle: cerrada en este bloque (el bajo mundo llega en el bloque 7-C)
  locked: (x, y, s) => {
    if (x !== 11 || y !== 3) return null
    if (!s.opened.includes(B1_07_NEWS)) return { text: 'Todavía no.', sub: 'Primero mira la televisión.' }
    if (!s.opened.includes(B1_07_DEDUCE_PAST)) return { text: 'Todavía no.', sub: 'Primero termina el cuaderno (páginas 15 y 16).' }
    return null
  },
  // Bloque C: la puerta a la calle lleva al bajo mundo (data/b1Market.ts)
  links: { '11,3': { sceneId: 'b1-07-market', pos: { x: 1, y: 3 } } },
  requirements: [],
  chips: (s: GameState) => [
    { label: 'La televisión', done: s.opened.includes(B1_07_NEWS) },
    { label: "Cuaderno: página 15 (must / might / can't)", done: s.opened.includes(B1_07_DEDUCE_NOW) },
    { label: 'Cuaderno: página 16 (deducción en el pasado)', done: s.opened.includes(B1_07_DEDUCE_PAST) },
  ],
  // Tarjeta de apertura del recuerdo
  intro: {
    first: 'One year after the fire. — Un año después del incendio.',
    later: 'One year after the fire. — Un año después del incendio.',
  },
}
