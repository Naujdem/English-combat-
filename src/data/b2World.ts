import type { GameState } from '../game/types'

/**
 * B2 (en desarrollo) — datos del mapa de B2 ("English Combat - Fichas B2.md", ficha 0). Todos los ids llevan el prefijo "b2-".
 * Se abre al terminar B1 (cierre de la misión 14, después del examen de B1).
 * Escena de apertura: components/B2Opening.tsx. Las misiones 1 a 14 y los Extras todavía no están hechos (placeholders).
 */

/** Se guarda en `opened` al terminar la escena de apertura (abre el nodo 1) */
export const B2_OPENING = 'b2-00-opening'

/** Cierre de la misión n de B2: b2-01-close … b2-14-close */
export const b2CloseId = (n: number) => `b2-${String(n).padStart(2, '0')}-close`

/** Se guarda al entrar a la Ventana 13 (The Fire): enciende el sexto segmento del núcleo (ficha 13) */
export const B2_13_ENTERED = 'b2-13-entered'

/** B2 se abre al cerrar B1 (b1-14-close = closeId(14) de data/b1World.ts; se escribe aquí para no importar todo B1) */
export const isB2Unlocked = (s: GameState) => s.opened.includes('b1-14-close')

/** Nodo 1: se abre con la apertura. Nodo n (2 a 14): al cerrar el anterior */
export const isB2NodeOpen = (n: number, s: GameState) => (n === 1 ? s.opened.includes(B2_OPENING) : s.opened.includes(b2CloseId(n - 1)))

/** Época de cada lugar: Presente (Lumen Bay) o Ventana (el protagonista entra al futuro, ficha 0.3) */
export type B2Era = 'Presente' | 'Ventana'
export const B2_ERA_COLOR: Record<B2Era, string> = { Presente: '#d9a93a', Ventana: '#3fa9ff' }
/** Fondo de las franjas del mapa */
export const B2_BAND: Record<B2Era, string> = { Presente: '#352c18', Ventana: '#14263d' }

export type B2Part = 1 | 2 | 3 | 4
export const B2_PART_NAMES: Record<B2Part, string> = { 1: '1 · Questions', 2: '2 · Traces', 3: '3 · Use Your Voice', 4: 'Extras' }

/**
 * num: número en el mapa (1 a 14); los Extras no tienen número (★). year: año de la Ventana.
 * Coordenadas en el viewBox 360×380 (como B1): las Ventanas a la izquierda (franja azul) y el presente a la derecha (dorada).
 */
export type B2Node = { id: string; num?: number; name: string; era: B2Era; part: B2Part; x: number; y: number; year?: number; opensWith?: string }

export const B2_NODES: B2Node[] = [
  // Parte 1 · Questions
  { id: 'b2-01', num: 1, name: 'Catching Up', era: 'Presente', part: 1, x: 268, y: 60 },
  { id: 'b2-02', num: 2, name: 'The Herald', era: 'Presente', part: 1, x: 268, y: 150 },
  { id: 'b2-03', num: 3, name: 'Frozen', era: 'Ventana', part: 1, x: 92, y: 220, year: 2061 },
  { id: 'b2-04', num: 4, name: 'Fake Profile', era: 'Presente', part: 1, x: 268, y: 290 },
  // Parte 2 · Traces
  { id: 'b2-05', num: 5, name: 'Voice Blackouts', era: 'Presente', part: 2, x: 268, y: 70 },
  { id: 'b2-06', num: 6, name: 'The Lab', era: 'Ventana', part: 2, x: 92, y: 140, year: 2062 },
  { id: 'b2-07', num: 7, name: 'The Old Building', era: 'Presente', part: 2, x: 268, y: 220 },
  { id: 'b2-08', num: 8, name: 'Pitch', era: 'Ventana', part: 2, x: 92, y: 290, year: 2064 },
  // Parte 3 · Use Your Voice
  { id: 'b2-09', num: 9, name: 'The Gallery', era: 'Presente', part: 3, x: 268, y: 45 },
  { id: 'b2-10', num: 10, name: 'The Card', era: 'Ventana', part: 3, x: 92, y: 100, year: 2056 },
  { id: 'b2-11', num: 11, name: 'Who Is G?', era: 'Presente', part: 3, x: 268, y: 155 },
  { id: 'b2-12', num: 12, name: 'Countdown', era: 'Ventana', part: 3, x: 92, y: 210, year: 2056 },
  { id: 'b2-13', num: 13, name: 'The Fire', era: 'Ventana', part: 3, x: 92, y: 265, year: 2061 },
  { id: 'b2-14', num: 14, name: 'Use Your Voice', era: 'Presente', part: 3, x: 268, y: 320 },
  // Parte 4 · Extras
  { id: 'b2-s1', name: 'Fusion Night', era: 'Presente', part: 4, x: 268, y: 80, opensWith: b2CloseId(4) },
  { id: 'b2-s2', name: 'Paws Debate', era: 'Presente', part: 4, x: 268, y: 190, opensWith: b2CloseId(8) },
  { id: 'b2-s3', name: 'A Year Abroad', era: 'Presente', part: 4, x: 268, y: 300, opensWith: b2CloseId(12) },
]

export const b2NodeOpen = (n: B2Node, s: GameState) => (n.num ? isB2NodeOpen(n.num, s) : s.opened.includes(n.opensWith!))
/** Hecho: el cierre de la misión o, en los Extras, la marca `<id>-close` (b2-s1-close…) */
export const b2NodeDone = (n: B2Node, s: GameState) => s.opened.includes(n.num ? b2CloseId(n.num) : `${n.id}-close`)
export const b2Label = (n: B2Node) => (n.num ? String(n.num) : '★')

/**
 * Núcleo del reloj (ficha 0.4): barra de 6 segmentos, que se llenan de a uno o de a medio.
 * 2 → 1 · 1 + 4 → medio · 5 → completa el 2.º · 7 → 3 · 9 → 4 · 11 → 5 · entrar a la Ventana 13 → 6.
 * El fragmento del lugar 1 espera suelto en el reloj hasta que el 4 suelta el suyo.
 */
export function b2Core(s: GameState): { filled: number; loose: boolean } {
  const c = (n: number) => s.opened.includes(b2CloseId(n))
  let filled = 0
  if (c(2)) filled += 1
  if (c(1) && c(4)) filled += 0.5
  if (c(5)) filled += 0.5
  if (c(7)) filled += 1
  if (c(9)) filled += 1
  if (c(11)) filled += 1
  if (s.opened.includes(B2_13_ENTERED) || c(13)) filled += 1
  return { filled, loose: c(1) && !c(4) }
}

/** Texto cuando el lugar está cerrado */
export function b2LockedText(n: B2Node): string {
  if (n.num === 1) return 'Se abre al terminar la escena de apertura.'
  if (!n.num) return `Se abre al terminar la misión ${n.opensWith?.slice(3, 5).replace(/^0/, '')}.`
  if (n.num === 13) return 'Se abre sola cuando el núcleo está casi lleno (termina la Ventana 12).'
  return n.era === 'Ventana' ? 'Se abre al juntar dos fragmentos (termina la misión anterior).' : 'Se abre al terminar la misión anterior.'
}

/** Mensaje superior del mapa cuando se ve B2 */
export function b2Message(s: GameState): string {
  if (!s.opened.includes(B2_OPENING)) return 'B2 · Lumen Bay: "Who didn\'t I help? And when?" Toca el lugar 1 para empezar.'
  if (s.opened.includes(b2CloseId(14))) return '¡B2 completado! Ya puedes volver a jugar cualquier nivel.'
  const next = B2_NODES.find((n) => n.num && b2NodeOpen(n, s) && !b2NodeDone(n, s))
  return next ? `Siguiente lugar abierto: ${next.num}. ${next.name}.` : 'Toca un lugar del mapa de B2.'
}
