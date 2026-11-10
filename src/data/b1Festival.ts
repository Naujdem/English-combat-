import type { GameState, SceneDef, Zone } from '../game/types'

/**
 * B1-10 · Festival Night (presente). Bloque A: el recinto del festival de arte y música de Lumen Bay al anochecer (escena b1-10-festival).
 * NO es recuerdo (game/memory.ts solo toma las misiones impares).
 *
 * Luces de colores, un escenario grande al fondo con pantalla (decoración), puestos de comida, una fila de gente frente a la puerta
 * de la carpa de videojuegos y un cartel con el cartel de bandas.
 * Orden: Liceth (b1-10-welcome, diálogo corto) → la persona especial: lección 'conditional-2' + práctica (b1-10-conditional) →
 *   la fila de la entrada: lección 'verb-patterns' + práctica (b1-10-queue, 5 monedas) → la puerta lleva a la carpa (bloque 10-B, data/b1GamingTent.ts).
 * Ningún bloque A guarda closeId(10) (se guarda en 10-D). La pulsera del festival se entrega en 10-D.
 */
export const B1_10_FESTIVAL_ID = 'b1-10-festival'
export const B1_10_LICETH = 'b1-10-liceth'
export const B1_10_SPECIAL = 'b1-10-special'
export const B1_10_QUEUE_NPC = 'b1-10-queue'
/** El segundo hincha de la fila (solo se examina; la tarea la tiene b1-10-queue) */
export const B1_10_QUEUE_NPC2 = 'b1-10-queue-2'
export const B1_10_WELCOME = 'b1-10-welcome'
export const B1_10_CONDITIONAL = 'b1-10-conditional'
export const B1_10_QUEUE = 'b1-10-queue'

/**
 * Leyenda (Tiles.tsx, sin dibujos nuevos): # pared · h letrero (luces de colores) · v pantalla (el escenario)
 * C mostrador (puestos de comida) · p planta · d puerta.
 * Puerta de la carpa de videojuegos arriba (6,0); entrada del festival abajo (6,6).
 */
const MAP = [
  '##h#h#d#h#h##',
  '#.........v.#',
  '#.CC........#',
  '#...........#',
  '#...........#',
  '#p.........p#',
  '######d######',
]

const zoneAt = (): Zone => 'recepcion'

const NOT_YET = (sub: string) => ({ text: 'Todavía no.', sub })

export const B1_10_FESTIVAL: SceneDef = {
  id: B1_10_FESTIVAL_ID,
  name: 'Lumen Bay · Festival',
  topics: [],
  map: MAP,
  start: { x: 6, y: 5 },
  // Sin jefe en este bloque: la puerta del jefe apunta a un muro y no hace falta ninguna llave
  bossDoor: { x: 0, y: 0 },
  keysNeeded: 0,
  entities: [
    { type: 'npc', id: B1_10_LICETH, x: 5, y: 5 },
    { type: 'npc', id: B1_10_SPECIAL, x: 4, y: 3 },
    { type: 'npc', id: B1_10_QUEUE_NPC, x: 5, y: 1 },
    { type: 'npc', id: B1_10_QUEUE_NPC2, x: 7, y: 1 },
  ],
  labels: [
    { text: 'Gaming tent', x: 6, y: 1 },
    { text: 'Lumen Bay Festival', x: 6, y: 3 },
  ],
  zoneAt: () => zoneAt(),
  examine: {
    '10,1': { text: 'The main stage.', sub: 'El escenario principal.', say: 'The main stage.' },
    '2,2': { text: 'Food stalls.', sub: 'Puestos de comida.', say: 'Food stalls.' },
    '3,2': { text: 'Food stalls.', sub: 'Puestos de comida.', say: 'Food stalls.' },
    '2,0': { text: 'The line-up.', sub: 'El cartel de bandas.', say: 'The line-up.' },
    '4,0': { text: 'Colourful lights.', sub: 'Luces de colores.', say: 'Colourful lights.' },
    '8,0': { text: 'Colourful lights.', sub: 'Luces de colores.', say: 'Colourful lights.' },
    '10,0': { text: 'Colourful lights.', sub: 'Luces de colores.', say: 'Colourful lights.' },
  },
  // La puerta de la carpa de videojuegos: cerrada hasta terminar la fila; después lleva a la carpa (bloque 10-B, data/b1GamingTent.ts).
  // La salida: con el botón Mapa
  locked: (x, y, s) => {
    if (x === 6 && y === 0) {
      if (!s.opened.includes(B1_10_QUEUE)) return NOT_YET('Primero pasa por la fila de la entrada.')
    }
    if (x === 6 && y === 6) return { text: 'The way out.', sub: 'Para volver al mapa, toca el botón Mapa.' }
    return null
  },
  links: { '6,0': { sceneId: 'b1-10-tent', pos: { x: 6, y: 5 } } },
  requirements: [],
  chips: (s: GameState) => [
    { label: 'Liceth', done: s.opened.includes(B1_10_WELCOME) },
    { label: 'La persona especial', done: s.opened.includes(B1_10_CONDITIONAL) },
    { label: 'La fila de la entrada', done: s.opened.includes(B1_10_QUEUE) },
  ],
  intro: {
    first: 'Festival night! — ¡Noche de festival!',
    later: () => 'Festival night! — ¡Noche de festival!',
  },
}
