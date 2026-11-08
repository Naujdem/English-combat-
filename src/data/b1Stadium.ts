import type { GameState, SceneDef, Zone } from '../game/types'
import { closeId } from './b1World'
import { B1_08_DONE_TEXT } from './b1Concourse'

/**
 * B1-08 · Game Day (presente). Bloque A: la entrada del estadio de Lumen Bay un día de partido (escena b1-08-stadium).
 * NO es recuerdo (game/memory.ts solo toma las misiones impares).
 *
 * Una plaza con banderines, un puesto de bufandas (solo decoración), la puerta de las gradas al fondo y un tablero con el torneo.
 * Orden: la persona especial: lección 'superlatives-b1' + práctica (b1-08-invite) → Julian (con la entrenadora Ilva a su lado):
 *   la charla y la práctica de escucha (b1-08-team, 5 monedas) → la puerta de las gradas lleva a las gradas (bloque 8-B, data/b1Stands.ts).
 * Ningún bloque A guarda closeId(8) (se guarda en 8-D). La bufanda del equipo se entrega en 8-D.
 */
export const B1_08_STADIUM_ID = 'b1-08-stadium'
export const B1_08_SPECIAL = 'b1-08-special'
export const B1_08_JULIAN = 'b1-08-julian'
export const B1_08_ILVA = 'b1-08-ilva'
export const B1_08_INVITE = 'b1-08-invite'
export const B1_08_TEAM = 'b1-08-team'

/**
 * Leyenda (Tiles.tsx, sin dibujos nuevos): # pared · h letrero (banderines) · C mostrador (puesto de bufandas)
 * v pantalla (tablero del torneo) · p planta · d puerta.
 * Puerta de las gradas arriba (6,0); puerta de salida abajo (6,6).
 */
const MAP = [
  '##h#h#d#h#h##',
  '#...........#',
  '#.CC......v.#',
  '#...........#',
  '#...........#',
  '#p.........p#',
  '######d######',
]

const zoneAt = (): Zone => 'recepcion'

const NOT_YET = (sub: string) => ({ text: 'Todavía no.', sub })

export const B1_08_STADIUM: SceneDef = {
  id: B1_08_STADIUM_ID,
  name: 'Lumen Bay · Stadium',
  topics: [],
  map: MAP,
  start: { x: 6, y: 5 },
  // Sin jefe en este bloque: la puerta del jefe apunta a un muro y no hace falta ninguna llave
  bossDoor: { x: 0, y: 0 },
  keysNeeded: 0,
  entities: [
    { type: 'npc', id: B1_08_SPECIAL, x: 4, y: 4 },
    { type: 'npc', id: B1_08_JULIAN, x: 8, y: 3 },
    { type: 'npc', id: B1_08_ILVA, x: 9, y: 3 },
  ],
  labels: [
    { text: 'Gradas', x: 6, y: 1 },
    { text: 'Lumen Bay', x: 6, y: 3 },
  ],
  zoneAt: () => zoneAt(),
  examine: {
    '2,2': { text: 'Team scarves.', sub: 'Bufandas del equipo.', say: 'Team scarves.' },
    '3,2': { text: 'Team scarves.', sub: 'Bufandas del equipo.', say: 'Team scarves.' },
    '10,2': { text: 'The tournament.', sub: 'El tablero del torneo.', say: 'The tournament.' },
  },
  // La puerta de las gradas: cerrada hasta la charla de Julian y la entrenadora Ilva; después lleva a las gradas (bloque 8-B, data/b1Stands.ts).
  // La salida: con el botón Mapa
  locked: (x, y, s) => {
    if (x === 6 && y === 0) {
      if (!s.opened.includes(B1_08_TEAM)) return NOT_YET('Primero habla con Julian y la entrenadora Ilva.')
    }
    if (x === 6 && y === 6) return { text: 'The way out.', sub: 'Para volver al mapa, toca el botón Mapa.' }
    return null
  },
  links: { '6,0': { sceneId: 'b1-08-stands', pos: { x: 6, y: 5 } } },
  requirements: [],
  chips: (s: GameState) => [
    { label: 'La persona especial', done: s.opened.includes(B1_08_INVITE) },
    { label: 'Julian y la entrenadora Ilva', done: s.opened.includes(B1_08_TEAM) },
  ],
  intro: {
    first: 'Game day! — ¡Día de partido!',
    later: (s) => (s.opened.includes(closeId(8)) ? B1_08_DONE_TEXT : 'Game day! — ¡Día de partido!'),
  },
}
