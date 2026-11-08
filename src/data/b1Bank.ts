import type { GameState, SceneDef, Zone } from '../game/types'

/**
 * B1-05 — Nothing Left, bloque B. El banco (escena b1-05-bank; es recuerdo por el prefijo "b1-05-"): espejo de la misión 4,
 * pero aquí a L le niegan el préstamo. Se llega por la puerta a la calle del apartamento (data/b1Flat.ts, links).
 * El banquero (cara borrosa, traje gris) detrás del mostrador: tarea 'b1-05-bank' (charla + práctica b1-05-k1…k4).
 * Al terminar, vuelves al apartamento por la puerta (0,3): se abre la página 13 del cuaderno.
 */
export const B1_05_BANK_ID = 'b1-05-bank'
export const B1_05_BANKER = 'b1-05-banker'

/** Leyenda (Tiles.tsx, sin dibujos nuevos, como data/b1Residence.ts): # pared · h letrero · C mostrador · s asientos · d puerta */
const MAP = [
  '###h######',
  '#........#',
  '#..CCCC..#',
  'd........#',
  '#ss......#',
  '##########',
]

const zoneAt = (): Zone => 'oficina'

export const B1_05_BANK_SCENE: SceneDef = {
  id: B1_05_BANK_ID,
  name: 'Recuerdo 5 · El banco',
  topics: [],
  map: MAP,
  start: { x: 1, y: 3 },
  // Sin jefe: la puerta del jefe apunta a un muro y no hace falta ninguna llave
  bossDoor: { x: 0, y: 0 },
  keysNeeded: 0,
  entities: [{ type: 'npc', id: B1_05_BANKER, x: 4, y: 1 }],
  labels: [{ text: 'Banco', x: 6, y: 4 }],
  zoneAt: () => zoneAt(),
  examine: {
    '3,0': { text: 'BANK.', sub: 'BANCO.', say: 'Bank.' },
  },
  // La puerta de vuelta al apartamento (junto a la puerta a la calle)
  links: { '0,3': { sceneId: 'b1-05-flat', pos: { x: 10, y: 3 } } },
  requirements: [],
  chips: (s: GameState) => [{ label: 'Habla con el banquero', done: s.opened.includes('b1-05-bank') }],
  intro: {
    first: 'No loan. No job. No voice. — Sin préstamo. Sin trabajo. Sin voz.',
    later: 'No loan. No job. No voice. — Sin préstamo. Sin trabajo. Sin voz.',
  },
}
