import type { GameState } from '../game/types'
import { A2_13_CLOSE } from './a2Return'

/**
 * B1 (en desarrollo) — datos del mapa de B1. Todos los ids llevan el prefijo "b1-".
 * Se abre al terminar A2-13 (no depende de las misiones secundarias de A2).
 * La escena de apertura (la llamada de Ms. Haddad) está en data/b1Home.ts; su tarea, en data/tasks.ts.
 * Por ahora solo existe la apertura: los 14 lugares son placeholders (el 1 muestra "próximamente").
 */

/** Escena de apertura de B1 (la casa del protagonista, data/b1Home.ts) */
export const B1_HOME_ID = 'b1-home'

/** Se guarda en `opened` al terminar la escena de apertura (abre el nodo 1) */
export const B1_OPENING = 'b1-00-opening'

/** Cierre de la misión n de B1: b1-01-close … b1-14-close */
export const closeId = (n: number) => `b1-${String(n).padStart(2, '0')}-close`

export const isB1Unlocked = (s: GameState) => s.opened.includes(A2_13_CLOSE)

/** Nodo 1: se abre con la apertura. Nodo n (2 a 14): al cerrar el anterior */
export const isB1NodeOpen = (n: number, s: GameState) => (n === 1 ? s.opened.includes(B1_OPENING) : s.opened.includes(closeId(n - 1)))

/** Lo que abre el nodo n en el mapa (para la animación de fragmentos): la apertura para el 1, el cierre anterior para los demás */
export const memoryOpenId = (n: number) => (n === 1 ? B1_OPENING : closeId(n - 1))

/** Época de cada lugar: Presente (el protagonista en Lumen Bay) o Recuerdo (los recuerdos de L) */
export type B1Era = 'Presente' | 'Recuerdo'
export const B1_ERA_COLOR: Record<B1Era, string> = { Presente: '#d9a93a', Recuerdo: '#9b6ad6' }
/** Fondo de las franjas del mapa */
export const B1_BAND: Record<B1Era, string> = { Presente: '#352c18', Recuerdo: '#2a2040' }

export type B1Part = 1 | 2 | 3 | 4
export const B1_PART_NAMES: Record<B1Part, string> = { 1: '1 · Silence', 2: '2 · Underworld', 3: '3 · Temples and Voices', 4: 'Extras' }

/**
 * num: número en el mapa (1 a 14); los Extras no tienen número (★).
 * Coordenadas en el viewBox 360×380 del mapa de A2: los recuerdos a la izquierda (franja morada)
 * y el presente a la derecha (franja dorada), así el camino va y viene entre las dos.
 */
export type B1Node = { id: string; num?: number; name: string; era: B1Era; part: B1Part; x: number; y: number; opensWith?: string }

export const B1_NODES: B1Node[] = [
  // Parte 1 · Silence
  { id: 'b1-01', num: 1, name: 'The Accident', era: 'Recuerdo', part: 1, x: 92, y: 70 },
  { id: 'b1-02', num: 2, name: 'A New City', era: 'Presente', part: 1, x: 268, y: 140 },
  { id: 'b1-03', num: 3, name: 'Words on a Screen', era: 'Recuerdo', part: 1, x: 92, y: 220 },
  { id: 'b1-04', num: 4, name: 'House Rules', era: 'Presente', part: 1, x: 268, y: 290 },
  // Parte 2 · Underworld
  { id: 'b1-05', num: 5, name: 'Nothing Left', era: 'Recuerdo', part: 2, x: 92, y: 70 },
  { id: 'b1-06', num: 6, name: 'First Job', era: 'Presente', part: 2, x: 268, y: 140 },
  { id: 'b1-07', num: 7, name: 'The Underworld', era: 'Recuerdo', part: 2, x: 92, y: 220 },
  { id: 'b1-08', num: 8, name: 'Game Day', era: 'Presente', part: 2, x: 268, y: 290 },
  // Parte 3 · Temples and Voices
  { id: 'b1-09', num: 9, name: 'Temples of Stones and Time', era: 'Recuerdo', part: 3, x: 92, y: 45 },
  { id: 'b1-10', num: 10, name: 'Festival Night', era: 'Presente', part: 3, x: 268, y: 100 },
  { id: 'b1-11', num: 11, name: 'The First Journey', era: 'Recuerdo', part: 3, x: 92, y: 155 },
  { id: 'b1-12', num: 12, name: 'Old Friends', era: 'Presente', part: 3, x: 268, y: 210 },
  { id: 'b1-13', num: 13, name: 'The Price', era: 'Recuerdo', part: 3, x: 92, y: 265 },
  { id: 'b1-14', num: 14, name: 'Voices', era: 'Presente', part: 3, x: 268, y: 320 },
  // Parte 4 · Extras (placeholders)
  { id: 'b1-s1', name: 'Charity Run', era: 'Presente', part: 4, x: 268, y: 80, opensWith: closeId(8) },
  { id: 'b1-s2', name: 'Movie Night', era: 'Presente', part: 4, x: 268, y: 190, opensWith: closeId(10) },
  { id: 'b1-s3', name: 'House Party', era: 'Presente', part: 4, x: 268, y: 300, opensWith: closeId(12) },
]

export const b1NodeOpen = (n: B1Node, s: GameState) => (n.num ? isB1NodeOpen(n.num, s) : s.opened.includes(n.opensWith!))
export const b1NodeDone = (n: B1Node, s: GameState) => !!n.num && s.opened.includes(closeId(n.num))
export const b1Label = (n: B1Node) => (n.num ? String(n.num) : '★')

/** Texto cuando el lugar está cerrado */
export function b1LockedText(n: B1Node): string {
  if (n.num === 1) return 'Se abre al terminar la escena de apertura.'
  if (!n.num) return `Se abre al terminar la misión ${n.opensWith?.slice(3, 5).replace(/^0/, '')}.`
  return n.era === 'Recuerdo' ? 'Se abre al juntar dos fragmentos (termina la misión anterior).' : 'Se abre al terminar el recuerdo anterior.'
}

/** Mensaje superior del mapa cuando se ve B1 */
export function b1Message(s: GameState): string {
  if (!s.opened.includes(B1_OPENING)) return 'B1 · Lumen Bay: la coordinadora del intercambio te está llamando.'
  if (!s.opened.includes(closeId(1))) return 'Dos fragmentos del reloj se juntaron. Toca el recuerdo 1.'
  const next = B1_NODES.find((n) => n.num && b1NodeOpen(n, s) && !b1NodeDone(n, s))
  return next ? `Siguiente lugar abierto: ${next.num}. ${next.name}.` : 'Toca un lugar del mapa de B1.'
}
