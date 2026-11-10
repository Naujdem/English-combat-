import type { GameState, SceneDef, Zone } from '../game/types'
import type { ScriptLine } from './b1Accident'

/**
 * B1-11 — The First Journey. Recuerdo 11 (escena b1-11-room; es recuerdo por el prefijo "b1-11-"). Juegas como L
 * (SpriteL), ya mayor, años después del incendio. Sin atuendos. L no habla: escribe en su cuaderno.
 * Bloque A (este): un cuarto alquilado, pequeño y oscuro, de noche.
 *   El cuaderno de L sobre el escritorio (tarea 'b1-11-notebook': página 42, tema 'narrative-b1' + práctica b1-11-n1…n8,
 *   data/questions-b1-11.ts) → el muro de recortes (tarea 'b1-11-wall': tema 'conditional-3' + práctica b1-11-t1…t8)
 *   → el reloj (tarea 'b1-11-clock': B1_11_CLOCK_SCRIPT, 5 monedas) → la puerta: "Próximamente" (bloque 11-B).
 * Ningún bloque A guarda closeId(11) (se guarda en 11-D).
 */
export const B1_11_ROOM_ID = 'b1-11-room'
export const B1_11_NOTEBOOK = 'b1-11-notebook'
export const B1_11_WALL = 'b1-11-wall'
export const B1_11_CLOCK = 'b1-11-clock'

/** El reloj (who 'narrator'): al terminar se guarda 'b1-11-clock' y se abre la puerta (data/tasks.ts) */
export const B1_11_CLOCK_SCRIPT: ScriptLine[] = [
  { who: 'narrator', text: '(The clock is warm. It has been in your pocket for years.)', es: '(El reloj está tibio. Lleva años en tu bolsillo.)' },
  { who: 'narrator', text: '(Tonight you will try to stop the fire. Just once.)', es: '(Esta noche intentarás detener el incendio. Solo una vez.)' },
  { who: 'narrator', text: '(You turn the crown. The room fades to white.)', es: '(Giras la corona. El cuarto se desvanece en blanco.)' },
]

const NOT_YET = (sub: string) => ({ text: 'Todavía no.', sub })
const SOON = { text: 'Próximamente: el Temple of Roads (bloque 11-C)', sub: 'Esta parte llega en el siguiente bloque.' }
/** Bloque B: al volver de la noche del incendio (data/b1FireNight.ts) */
const FIRE_OUT = 'b1-11-fire-out'

/**
 * Un solo cuarto sin ventana (leyenda de data/b1Words.ts y components/Tiles.tsx: 5 cama · K escritorio · B pizarra/tablón
 * (el muro de recortes y fotos) · d puerta). El escritorio con el cuaderno y el reloj (1..2,5), el muro (5..7,0) y la puerta (11,3).
 */
const MAP = [
  '#####BBB####',
  '#5.........#',
  '#5.........#',
  '#..........d',
  '#..........#',
  '#KK........#',
  '############',
]

/** Se reutiliza el piso oscuro del pasillo de noche */
const zoneAt = (): Zone => 'pasillo-noche'

export const B1_11_ROOM: SceneDef = {
  id: B1_11_ROOM_ID,
  name: 'Recuerdo 11 · The First Journey',
  topics: [],
  map: MAP,
  start: { x: 3, y: 3 },
  bossDoor: { x: 0, y: 0 },
  keysNeeded: 0,
  entities: [
    // El cuaderno sobre el escritorio: la primera tarea
    { type: 'npc', id: B1_11_NOTEBOOK, x: 1, y: 4 },
    // El muro de recortes y fotos (su tarea pide terminar el cuaderno: data/tasks.ts, requires)
    { type: 'npc', id: B1_11_WALL, x: 6, y: 1 },
    // El reloj, brillando sobre la mesa (su tarea pide terminar el muro)
    { type: 'npc', id: B1_11_CLOCK, x: 2, y: 4 },
  ],
  labels: [{ text: 'Cuarto de L', x: 6, y: 5 }],
  zoneAt: () => zoneAt(),
  examine: {
    '1,1': { text: 'A narrow bed.', sub: 'Una cama estrecha.', say: 'A narrow bed.' },
    '1,2': { text: 'A narrow bed.', sub: 'Una cama estrecha.', say: 'A narrow bed.' },
    '1,5': { text: 'An old desk.', sub: 'Un escritorio viejo.', say: 'An old desk.' },
    '2,5': { text: 'An old desk.', sub: 'Un escritorio viejo.', say: 'An old desk.' },
  },
  // La puerta de la derecha: cerrada hasta usar el reloj; después lleva a la noche del incendio (bloque 11-B)
  locked: (x, y, s) => {
    if (x !== 11 || y !== 3) return null
    if (!s.opened.includes(B1_11_CLOCK)) return NOT_YET('Primero usa el reloj.')
    // Después del reloj lleva a la noche del incendio (links); al volver de ella, "Próximamente" (bloque 11-C)
    return s.opened.includes(FIRE_OUT) ? SOON : null
  },
  links: { '11,3': { sceneId: 'b1-11-fire', pos: { x: 1, y: 2 } } },
  requirements: [],
  chips: (s: GameState) => [
    { label: 'El cuaderno de L: página 42', done: s.opened.includes(B1_11_NOTEBOOK) },
    { label: 'Los recortes del muro', done: s.opened.includes(B1_11_WALL) },
    { label: 'El reloj', done: s.opened.includes(B1_11_CLOCK) },
    { label: 'La noche del incendio', done: s.opened.includes(FIRE_OUT) },
  ],
  intro: {
    first: 'Years later, in a small dark room. — Años después, en un cuarto pequeño y oscuro.',
    later: () => 'Years later, in a small dark room. — Años después, en un cuarto pequeño y oscuro.',
  },
}
