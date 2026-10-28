import type { CasualChat, Conversation, FriendDef, GameState } from './types'
import { TOPICS } from '../data/questions'

/**
 * Puntos de amistad que pide cada momento de historia: el momento 0 se puede
 * tener de inmediato, el 1 pide 3 puntos, el 2 pide 7, etc.
 */
export const STORY_POINTS = [0, 3, 7, 12, 18, 25]
export const MAX_POINTS = 30

export const LEVEL_NAMES = ['Conocido', 'Compañero', 'Amigo', 'Buen amigo', 'Mejor amigo']

export type TalkResult =
  | { kind: 'story'; index: number; conv: Conversation }
  | { kind: 'casual'; chat: CasualChat; note?: string }
  | { kind: 'none'; line: string; note?: string }

function canUse(s: GameState, requires: CasualChat['requires']) {
  return !requires || s.recovered.includes(requires)
}

/** Decide qué pasa al hablar con un amigo: un momento de historia o una charla casual */
export function talkTo(s: GameState, friend: FriendDef): TalkResult {
  const done = s.talks[friend.id] ?? 0
  const pts = s.friendship[friend.id] ?? 0
  const conv = friend.conversations[done]

  let note: string | undefined
  if (conv && conv.lines.length > 0) {
    const grammarOk = canUse(s, conv.requires)
    if (grammarOk && pts >= STORY_POINTS[done]) return { kind: 'story', index: done, conv }
    if (!grammarOk && pts >= STORY_POINTS[done]) {
      const t = TOPICS[conv.requires!]
      note = `Nivel máximo de amistad por ahora. Recupera "${t.name}" (${t.level}) para que ${friend.name} te cuente algo importante.`
    }
  }

  const pool = friend.casual.filter((c) => canUse(s, c.requires))
  if (pool.length === 0) return { kind: 'none', line: `${friend.name}: "See you later!"`, note }
  // Las charlas del último tema recuperado salen más seguido
  const newest = pool.filter((c) => c.requires && c.requires === s.recovered[s.recovered.length - 1])
  const list = newest.length > 0 && Math.random() < 0.6 ? newest : pool
  return { kind: 'casual', chat: list[Math.floor(Math.random() * list.length)], note }
}

/** Suma o resta puntos por una charla casual, sin pasar el tope del siguiente momento de historia */
export function applyCasual(s: GameState, friendId: string, delta: number): GameState {
  const done = s.talks[friendId] ?? 0
  const cap = (STORY_POINTS[done + 1] ?? MAX_POINTS) - 1
  const now = s.friendship[friendId] ?? 0
  const next = Math.max(0, Math.min(Math.max(cap, now), now + delta))
  return { ...s, friendship: { ...s.friendship, [friendId]: next } }
}

/** Recompensas por llegar a cierto nivel (momentos de historia completados) */
export const FRIEND_REWARDS: Record<string, Record<number, string>> = {
  leo: { 1: 'Leo te dará una pista en cada combate: elimina una opción incorrecta.' },
  maya: { 1: 'El sándwich de Maya te da +1 de vida máxima.' },
}

export function completeStory(s: GameState, friendId: string, index: number, delta: number): GameState {
  const before = s.talks[friendId] ?? 0
  const talks = Math.max(before, index + 1)
  const pts = Math.max(0, Math.min(MAX_POINTS, (s.friendship[friendId] ?? 0) + delta + 1))
  let next: GameState = { ...s, talks: { ...s.talks, [friendId]: talks }, friendship: { ...s.friendship, [friendId]: pts } }
  if (friendId === 'maya' && before < 1 && talks >= 1) {
    next = { ...next, maxHp: next.maxHp + 1, hp: next.maxHp + 1 }
  }
  return next
}

/** Progreso hacia el siguiente momento de historia, de 0 a 1 */
export function progressToNext(s: GameState, friend: FriendDef): number {
  const done = s.talks[friend.id] ?? 0
  const pts = s.friendship[friend.id] ?? 0
  const from = STORY_POINTS[done - 1] ?? 0
  const to = STORY_POINTS[done] ?? MAX_POINTS
  if (to <= from) return 1
  return Math.max(0, Math.min(1, (pts - from) / (to - from)))
}
