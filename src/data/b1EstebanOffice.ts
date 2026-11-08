import type { GameState, SceneDef, Zone } from '../game/types'

/**
 * B1-06 · First Job (presente). Bloque C: la oficina de Esteban (escena b1-06-office).
 * Se entra por la puerta "La oficina" de las jaulas (data/b1Kennels.ts) al vencer a los 2 voluntarios cansados.
 * Esteban: la entrevista (tarea b1-06-interview, DebateTalk). Al terminarla: "Próximamente: The Interviewer (bloque 6-D)".
 * Ningún bloque C guarda closeId(6) ni contrata todavía.
 */
export const B1_06_OFFICE_ID = 'b1-06-office'
export const B1_06_ESTEBAN = 'b1-06-esteban'
export const B1_06_INTERVIEW = 'b1-06-interview'
export const B1_06_BOSS_SOON = 'Próximamente: The Interviewer (bloque 6-D)'

/** Leyenda (Tiles.tsx, sin dibujos nuevos): # pared · O escritorio · F archivador · d puerta (vuelta a las jaulas en 0,3) */
const MAP = [
  '#######',
  '#..O.F#',
  '#.....#',
  'd.....#',
  '#######',
]

const zoneAt = (): Zone => 'oficina'

export const B1_06_OFFICE: SceneDef = {
  id: B1_06_OFFICE_ID,
  name: 'Lumen Paws · La oficina',
  topics: [],
  map: MAP,
  start: { x: 1, y: 3 },
  // Sin jefe en este bloque: la puerta del jefe apunta a un muro y no hace falta ninguna llave
  bossDoor: { x: 0, y: 0 },
  keysNeeded: 0,
  entities: [{ type: 'npc', id: B1_06_ESTEBAN, x: 3, y: 2 }],
  labels: [{ text: 'Oficina', x: 3, y: 3 }],
  zoneAt: () => zoneAt(),
  examine: {
    '3,1': { text: "Esteban's desk. There are CVs on it.", sub: 'El escritorio de Esteban. Hay hojas de vida encima.', say: "Esteban's desk. There are CVs on it." },
    '5,1': { text: 'A filing cabinet.', sub: 'Un archivador.', say: 'A filing cabinet.' },
  },
  // Vuelta a las jaulas (data/b1Kennels.ts)
  links: { '0,3': { sceneId: 'b1-06-kennels', pos: { x: 9, y: 3 } } },
  requirements: [],
  chips: (s: GameState) => [
    { label: 'Entrevista con Esteban', done: s.opened.includes(B1_06_INTERVIEW) },
    { label: B1_06_BOSS_SOON, done: false },
  ],
  intro: {
    first: 'The interview. — La entrevista.',
    later: 'The interview. — La entrevista.',
  },
}
