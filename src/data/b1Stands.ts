import type { GameState, SceneDef, Zone } from '../game/types'

/**
 * B1-08 · Game Day (presente). Bloque B: las gradas del estadio (escena b1-08-stands).
 * Se entra por la puerta de las gradas de la plaza (b1-08-stadium, data/b1Stadium.ts) al terminar 'b1-08-team'.
 *
 * La cancha al fondo (césped y dos arcos; no se pisa), los asientos de los hinchas (decoración), la cabina de Jose Kike
 * (el comentarista) y un portón al costado. Orden: la pizarra de predicciones: Predict "Before the match" (b1-08-predict,
 * 5 monedas) → Jose Kike: lección 'football-results' + práctica (b1-08-results) → Jose Kike otra vez: lección 'emphasis-b1'
 * + práctica (b1-08-emphasis, 5 monedas) → el portón lleva al pasillo del medio tiempo (bloque 8-C, data/b1Concourse.ts).
 * Ningún bloque B guarda closeId(8) (se guarda en 8-D).
 */
export const B1_08_STANDS_ID = 'b1-08-stands'
export const B1_08_PREDICT_BOARD = 'b1-08-predict-board'
export const B1_08_JOSEKIKE = 'b1-08-josekike'
export const B1_08_PREDICT = 'b1-08-predict'
export const B1_08_RESULTS = 'b1-08-results'
export const B1_08_EMPHASIS = 'b1-08-emphasis'

/**
 * Leyenda (Tiles.tsx, sin dibujos nuevos): # pared · , césped (la cancha) · G portería · s asientos (hinchas) · d puerta.
 * Portón al costado (12,4, cerrado: bloque 8-C); puerta de vuelta a la plaza abajo (6,6).
 */
const MAP = [
  '#############',
  '#G,,,,,,,,,G#',
  '#,,,,,,,,,,,#',
  '#...........#',
  '#ss.......ssd',
  '#ss.......ss#',
  '######d######',
]

const zoneAt = (): Zone => 'recepcion'

const NOT_YET = (sub: string) => ({ text: 'Todavía no.', sub })

export const B1_08_STANDS: SceneDef = {
  id: B1_08_STANDS_ID,
  name: 'Lumen Bay · Stands',
  topics: [],
  map: MAP,
  start: { x: 6, y: 5 },
  // Sin jefe en este bloque: la puerta del jefe apunta a un muro y no hace falta ninguna llave
  bossDoor: { x: 0, y: 0 },
  keysNeeded: 0,
  entities: [
    { type: 'npc', id: B1_08_PREDICT_BOARD, x: 3, y: 4 },
    { type: 'npc', id: B1_08_JOSEKIKE, x: 9, y: 3 },
  ],
  labels: [
    { text: 'Cancha', x: 6, y: 1 },
    { text: 'Cabina', x: 9, y: 4 },
  ],
  zoneAt: () => zoneAt(),
  examine: {
    '1,4': { text: 'The fans.', sub: 'Los hinchas.', say: 'The fans.' },
    '2,4': { text: 'The fans.', sub: 'Los hinchas.', say: 'The fans.' },
    '10,4': { text: 'The fans.', sub: 'Los hinchas.', say: 'The fans.' },
    '11,4': { text: 'The fans.', sub: 'Los hinchas.', say: 'The fans.' },
  },
  // La cancha no se pisa. El portón: cerrado hasta terminar con Jose Kike; después lleva al pasillo (bloque 8-C, data/b1Concourse.ts). La puerta de abajo vuelve a la plaza
  locked: (x, y, s) => {
    if (y === 1 || y === 2) return { text: 'The field.', sub: 'La cancha. Mira el partido desde las gradas.' }
    if (x === 12 && y === 4) {
      if (!s.opened.includes(B1_08_EMPHASIS)) return NOT_YET('Primero habla con Jose Kike.')
    }
    return null
  },
  links: { '6,6': { sceneId: 'b1-08-stadium', pos: { x: 6, y: 1 } }, '12,4': { sceneId: 'b1-08-concourse', pos: { x: 1, y: 3 } } },
  requirements: [],
  chips: (s: GameState) => [
    { label: 'La pizarra de predicciones', done: s.opened.includes(B1_08_PREDICT) },
    { label: 'Jose Kike: resultados', done: s.opened.includes(B1_08_RESULTS) },
    { label: 'Jose Kike: what a / such / so', done: s.opened.includes(B1_08_EMPHASIS) },
  ],
  intro: {
    first: 'The final begins! — ¡Comienza la final!',
    later: 'The final begins! — ¡Comienza la final!',
  },
}
