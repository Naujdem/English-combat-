import type { GameState } from './types'
import { B2_NODES } from '../data/b2World'

/**
 * Ventanas de B2 (ficha 0.3): el protagonista entra físicamente al futuro. No es un recuerdo.
 * Las escenas de la Ventana n empiezan por "b2-0n-" / "b2-1n-" (lugares 3, 6, 8, 10, 12 y 13).
 * Entrar — enterB2Window(s, n, sceneId, start): guarda dónde estabas y pone phase 'in' (WindowFrame dibuja
 *          el reloj que gira, el destello y el letrero con el año). La salida llega con el cierre de cada misión.
 */
const WINDOW_NUMS = B2_NODES.filter((n) => n.era === 'Ventana' && n.num).map((n) => n.num!)
const pad = (n: number) => String(n).padStart(2, '0')

/** ¿La escena es de una Ventana de B2? */
export function isB2WindowScene(sceneId: string): boolean {
  return WINDOW_NUMS.some((n) => sceneId.startsWith(`b2-${pad(n)}-`))
}

/** Año de la Ventana n (letrero de entrada y marca del filtro) */
export const b2WindowYear = (n: number) => B2_NODES.find((x) => x.num === n)?.year ?? 2061

/** Entra a la Ventana n. Si ya estabas dentro de una Ventana, conserva el lugar del presente al que vas a volver */
export function enterB2Window(s: GameState, n: number, sceneId: string, start: { x: number; y: number }): GameState {
  const returnTo = isB2WindowScene(s.sceneId) ? s.b2Window?.returnTo ?? { sceneId: s.sceneId, pos: s.pos } : { sceneId: s.sceneId, pos: s.pos }
  return { ...s, b2Window: { n, year: b2WindowYear(n), returnTo, phase: 'in' }, sceneId, pos: { ...start }, battle: null, screen: 'explore' }
}
