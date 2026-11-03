import type { GameState } from './types'
import { B1_NODES, closeId } from '../data/b1World'

/**
 * Recuerdos de B1: entrada y salida. Lo usan todas las misiones de recuerdo (nodos 1, 3, 5, 7, 9, 11 y 13).
 *
 * Entrar  — enterMemory(s, n, sceneId): fundido a negro → destello de estática → <MemoryFrame entering> → la escena.
 * Salir   — exitMemory(s, n, { close }): fundido con estática → despiertas en el presente, en el último lugar donde estabas,
 *           con "(You wake up. Your throat hurts.)" → se abren tu línea del diario y la página del Diario de L
 *           (data/b1Diary.ts, id memoryFlag(n)) → se vuelve al mapa.
 * Las dos son funciones de estado (se usan con update). Las pantallas las dibuja Explore con MemoryTransitions.
 * Al vencer al jefe de un recuerdo, la misión llama update((s) => exitMemory(s, n, { close: true })),
 * o pone exitMemory: n en la tarea final (data/tasks.ts).
 */

/** Recuerdo en curso. phase: 'in' (entrando), 'out' (saliendo, todavía en el recuerdo), 'wake' (despertando en el presente) */
export type MemoryRun = { n: number; returnTo: { sceneId: string; pos: { x: number; y: number } }; phase?: 'in' | 'out' | 'wake'; close?: boolean }

const MEMORY_NUMS = B1_NODES.filter((n) => n.era === 'Recuerdo' && n.num).map((n) => n.num!)
const pad = (n: number) => String(n).padStart(2, '0')

/** ¿La escena es de un recuerdo de B1? Las escenas de la misión n de recuerdo empiezan por "b1-0n-" (1, 3, 5, 7, 9, 11, 13) */
export function isMemoryScene(sceneId: string): boolean {
  return MEMORY_NUMS.some((n) => sceneId.startsWith(`b1-${pad(n)}-`))
}

/** Se guarda en `opened` al salir del recuerdo n: abre su página del diario y la del Diario de L */
export const memoryFlag = (n: number) => `b1-${pad(n)}-memory`

/** Empieza el recuerdo n en la escena sceneId. Guarda dónde estabas (si ya estabas en un recuerdo, conserva el lugar anterior) */
export function enterMemory(s: GameState, n: number, sceneId: string, start: { x: number; y: number }): GameState {
  const returnTo = isMemoryScene(s.sceneId) ? s.memory?.returnTo ?? { sceneId: s.sceneId, pos: s.pos } : { sceneId: s.sceneId, pos: s.pos }
  return { ...s, memory: { n, returnTo, phase: 'in' }, sceneId, pos: { ...start }, battle: null, screen: 'explore' }
}

/** Termina el recuerdo n. close: además se guarda el cierre de la misión (closeId(n)), que abre la siguiente misión del presente */
export function exitMemory(s: GameState, n: number, opts: { close?: boolean } = {}): GameState {
  const returnTo = s.memory?.returnTo ?? { sceneId: s.sceneId, pos: s.pos }
  return { ...s, memory: { n, returnTo, phase: 'out', close: opts.close }, battle: null, screen: 'explore' }
}

/** Paso interno: después del fundido, el protagonista vuelve al último lugar del presente */
export function wakeFromMemory(s: GameState): GameState {
  const m = s.memory
  if (!m) return s
  return { ...s, sceneId: m.returnTo.sceneId, pos: { ...m.returnTo.pos }, memory: { ...m, phase: 'wake' }, screen: 'explore' }
}

/** Paso final: se guardan las páginas del diario (y el cierre, si se pidió) y se vuelve al mapa */
export function finishMemory(s: GameState): GameState {
  const m = s.memory
  if (!m) return s
  const add = [memoryFlag(m.n), ...(m.close ? [closeId(m.n)] : [])].filter((x) => !s.opened.includes(x))
  return { ...s, opened: [...s.opened, ...add], memory: undefined, screen: 'world' }
}
