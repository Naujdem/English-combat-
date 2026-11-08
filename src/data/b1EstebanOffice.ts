import type { GameState, SceneDef, Zone } from '../game/types'
import { closeId } from './b1World'

/**
 * B1-06 · First Job (presente). Bloque C: la oficina de Esteban (escena b1-06-office).
 * Se entra por la puerta "La oficina" de las jaulas (data/b1Kennels.ts) al vencer a los 2 voluntarios cansados.
 * Esteban: la entrevista (tarea b1-06-interview, DebateTalk). Ningún bloque C guarda closeId(6) ni contrata todavía.
 * Bloque D: The Interviewer (jefe, 2 fases) en el lugar de Esteban → Leo (charla de amistad) → Esteban cierra la misión
 *   (tarea b1-06-close = closeId(6), camiseta del refugio del jefe) → FragmentJoin abre el recuerdo 7.
 */
export const B1_06_OFFICE_ID = 'b1-06-office'
export const B1_06_ESTEBAN = 'b1-06-esteban'
export const B1_06_INTERVIEW = 'b1-06-interview'
/** Bloque D: el jefe (data/b1InterviewerBoss.ts), Leo (charla de amistad, quest 'b1-06-leo') y el cierre con Esteban */
export const B1_06_BOSS = 'b1-06-boss'
export const B1_06_LEO = 'b1-06-leo'
/** Se guarda al terminar la charla de amistad con Leo (Explore.tsx, quest 'b1-06-leo') */
export const B1_06_FRIEND = 'b1-06-friend'
/** Esteban otra vez, después de la charla con Leo: cierra la misión (tarea b1-06-close = closeId(6)) */
export const B1_06_ESTEBAN_CLOSE = 'b1-06-esteban-close'
export const B1_06_CLOSE = closeId(6)
/** Ya se vio la animación de los fragmentos tras el cierre (FragmentJoin, memoryNumber 7) */
export const B1_06_FRAGMENTS = 'b1-06-fragments'

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
  // El jefe no está tras una puerta: la puerta del jefe apunta a un muro y no hace falta ninguna llave
  bossDoor: { x: 0, y: 0 },
  keysNeeded: 0,
  entities: [
    // Esteban hasta la entrevista; después, The Interviewer (la luz gris de la pluma); al vencerlo, Leo; tras la charla, Esteban cierra
    { type: 'npc', id: B1_06_ESTEBAN, x: 3, y: 2 },
    { type: 'enemy', id: B1_06_BOSS, x: 3, y: 2, after: B1_06_INTERVIEW },
    { type: 'npc', id: B1_06_LEO, x: 5, y: 2 },
    { type: 'npc', id: B1_06_ESTEBAN_CLOSE, x: 3, y: 2 },
  ],
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
    { label: 'The Interviewer', done: s.defeated.includes(B1_06_BOSS) },
    { label: 'Charla con Leo', done: s.opened.includes(B1_06_FRIEND) },
    { label: 'Cierre', done: s.opened.includes(B1_06_CLOSE) },
  ],
  intro: {
    first: 'The interview. — La entrevista.',
    later: (s) =>
      s.opened.includes(B1_06_CLOSE)
        ? 'La oficina de Lumen Paws. Tienes trabajo y la misión 6 terminó: el recuerdo 7 te espera en el mapa.'
        : s.opened.includes(B1_06_INTERVIEW)
          ? 'La oficina de Lumen Paws. Una luz gris sale de la pluma de Esteban.'
          : 'The interview. — La entrevista.',
  },
}
