import type { GameState, SceneDef, Zone } from '../game/types'

/**
 * B1-07 — The Underworld. Recuerdo 7 (escena b1-07-room; es recuerdo por el prefijo "b1-07-"). Juegas como L (SpriteL);
 * los demás con la cara borrosa (Explore lo hace solo en las escenas de recuerdo). Sin atuendos.
 * Bloque A (este): el cuarto alquilado de L, pequeño y sucio, un año después del incendio.
 *   La televisión (tarea 'b1-07-news': lección 'passive-news' + práctica b1-07-n1…n8, data/questions-b1-07.ts; al final,
 *   el mensaje de la amiga) → el cuaderno del escritorio ("Próximamente: el Cuaderno de L (bloque 7-B)")
 *   → la puerta a la calle: "Próximamente: el bajo mundo (bloque 7-C)". Ningún bloque A guarda closeId(7) (se guarda en 7-E).
 */
export const B1_07_ROOM_ID = 'b1-07-room'
/** La tele vieja: su tarea guarda B1_07_NEWS al terminar */
export const B1_07_TV = 'b1-07-tv'
export const B1_07_NEWS = 'b1-07-news'
/** El cuaderno del escritorio: se desbloquea al terminar la tele; su lección llega en el bloque 7-B */
export const B1_07_NOTEBOOK = 'b1-07-notebook'

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
    // El cuaderno, sobre el escritorio (cerrado hasta terminar la tele; Explore muestra su aviso)
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
    return { text: 'Todavía no.', sub: 'Próximamente: el bajo mundo (bloque 7-C).' }
  },
  links: {},
  requirements: [],
  chips: (s: GameState) => [
    { label: 'La televisión', done: s.opened.includes(B1_07_NEWS) },
    { label: 'El cuaderno de L', done: false },
    { label: 'Próximamente: el bajo mundo (bloque 7-C)', done: false },
  ],
  // Tarjeta de apertura del recuerdo
  intro: {
    first: 'One year after the fire. — Un año después del incendio.',
    later: 'One year after the fire. — Un año después del incendio.',
  },
}
