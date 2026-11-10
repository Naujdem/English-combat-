import type { GameState, SceneDef, Zone } from '../game/types'
import { closeId } from './b1World'

/**
 * B1-10 · Festival Night (presente). Bloque B: la carpa de videojuegos del festival de Lumen Bay (escena b1-10-tent).
 * Se entra por la puerta de la carpa del recinto (b1-10-festival, data/b1Festival.ts) al terminar 'b1-10-queue'.
 *
 * Consolas con pantallas, sillones, un puesto de streaming con aro de luz y cámara y carteles de juegos.
 * Orden: la persona especial: lección 'prefer-b1' + práctica (b1-10-prefer) → Jorge, el streamer (tres tareas seguidas del mismo NPC):
 *   la transmisión ('gaming-b1', escucha, b1-10-stream) → opiniones ('opinions-b1', b1-10-opinions) → el debate (DebateTalk, b1-10-debate, 5 monedas)
 *   → la puerta al escenario principal: próximamente (bloque 10-C).
 * Ningún bloque B guarda closeId(10) (se guarda en 10-D).
 */
export const B1_10_TENT_ID = 'b1-10-tent'
export const B1_10_SPECIAL_TENT = 'b1-10-special-tent'
export const B1_10_JORGE = 'b1-10-jorge'
export const B1_10_PREFER = 'b1-10-prefer'
export const B1_10_STREAM = 'b1-10-stream'
export const B1_10_OPINIONS = 'b1-10-opinions'
export const B1_10_DEBATE = 'b1-10-debate'

/**
 * Leyenda (Tiles.tsx, sin dibujos nuevos): # pared · h letrero (carteles de juegos) · v pantalla (consolas y el puesto de streaming)
 * s asientos (sillones) · d puerta.
 * Puerta al escenario principal arriba (6,0, lleva a data/b1Stage.ts); puerta de vuelta al recinto abajo (6,6).
 */
const MAP = [
  '##h#h#d#h#h##',
  '#v.v.....v..#',
  '#s.s........#',
  '#...........#',
  '#...........#',
  '#...........#',
  '######d######',
]

const zoneAt = (): Zone => 'recepcion'

const NOT_YET = (sub: string) => ({ text: 'Todavía no.', sub })

export const B1_10_TENT: SceneDef = {
  id: B1_10_TENT_ID,
  name: 'Lumen Bay · Gaming tent',
  topics: [],
  map: MAP,
  start: { x: 6, y: 5 },
  // Sin jefe en este bloque: la puerta del jefe apunta a un muro y no hace falta ninguna llave
  bossDoor: { x: 0, y: 0 },
  keysNeeded: 0,
  entities: [
    { type: 'npc', id: B1_10_SPECIAL_TENT, x: 4, y: 4 },
    { type: 'npc', id: B1_10_JORGE, x: 9, y: 2 },
  ],
  labels: [
    { text: 'Main stage', x: 6, y: 1 },
    { text: 'Gaming tent', x: 6, y: 3 },
  ],
  zoneAt: () => zoneAt(),
  examine: {
    '1,1': { text: 'A game console.', sub: 'Una consola de videojuegos.', say: 'A game console.' },
    '3,1': { text: 'A game console.', sub: 'Una consola de videojuegos.', say: 'A game console.' },
    '9,1': { text: 'A streaming booth with a ring light and a camera.', sub: 'Un puesto de streaming con aro de luz y cámara.', say: 'A streaming booth.' },
    '1,2': { text: 'An armchair.', sub: 'Un sillón.', say: 'An armchair.' },
    '3,2': { text: 'An armchair.', sub: 'Un sillón.', say: 'An armchair.' },
    '2,0': { text: 'Game posters.', sub: 'Carteles de juegos.', say: 'Game posters.' },
    '4,0': { text: 'Game posters.', sub: 'Carteles de juegos.', say: 'Game posters.' },
    '8,0': { text: 'Game posters.', sub: 'Carteles de juegos.', say: 'Game posters.' },
    '10,0': { text: 'Game posters.', sub: 'Carteles de juegos.', say: 'Game posters.' },
  },
  // La puerta al escenario principal: cerrada hasta el debate con Jorge; después lleva al escenario (bloque 10-C, data/b1Stage.ts)
  locked: (x, y, s) => {
    if (x === 6 && y === 0) {
      if (!s.opened.includes(B1_10_DEBATE)) return NOT_YET('Primero habla con Jorge.')
    }
    return null
  },
  links: { '6,6': { sceneId: 'b1-10-festival', pos: { x: 6, y: 1 } }, '6,0': { sceneId: 'b1-10-stage', pos: { x: 6, y: 5 } } },
  requirements: [],
  chips: (s: GameState) => [
    { label: 'La persona especial', done: s.opened.includes(B1_10_PREFER) },
    { label: 'Jorge: la transmisión', done: s.opened.includes(B1_10_STREAM) },
    { label: 'Jorge: opiniones', done: s.opened.includes(B1_10_OPINIONS) },
    { label: 'Jorge: el debate', done: s.opened.includes(B1_10_DEBATE) },
  ],
  intro: {
    first: 'Press start. — Presiona start.',
    later: (s) => (s.opened.includes(closeId(10)) ? 'La misión 10 terminó. El recuerdo 11 se abrió en el mapa.' : 'Press start. — Presiona start.'),
  },
}
