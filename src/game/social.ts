import type { Conversation, FriendDef, GameState } from './types'
import { TOPICS } from '../data/questions'

export type TalkResult =
  | { kind: 'conv'; index: number; conv: Conversation }
  | { kind: 'maxed'; line: string; note: string }
  | { kind: 'soon'; line: string }

/** Decide qué pasa al hablar con un amigo según su nivel de amistad y la gramática recuperada */
export function talkTo(s: GameState, friend: FriendDef): TalkResult {
  const level = s.friendship[friend.id] ?? 0
  const conv = friend.conversations[level]
  if (!conv) {
    return { kind: 'soon', line: `${friend.name}: "See you later!"` }
  }
  if (conv.requires && !s.recovered.includes(conv.requires)) {
    const topic = TOPICS[conv.requires]
    return {
      kind: 'maxed',
      line: `${friend.name}: "I want to tell you more, but you can't understand me yet. Come back later!"`,
      note: `Nivel máximo de amistad por ahora. Recupera "${topic.name}" (${topic.level}) para seguir hablando con ${friend.name}.`,
    }
  }
  if (conv.lines.length === 0) {
    return { kind: 'soon', line: `${friend.name}: "Let's talk later!" (Esta charla llegará pronto)` }
  }
  return { kind: 'conv', index: level, conv }
}

/** Recompensas por subir la amistad */
export const FRIEND_REWARDS: Record<string, Record<number, string>> = {
  leo: { 1: 'Leo te dará una pista en cada combate: elimina una opción incorrecta.' },
  maya: { 1: 'El sándwich de Maya te da +1 de vida máxima.' },
}

export function completeConversation(s: GameState, friendId: string, index: number): GameState {
  const newLevel = Math.max(s.friendship[friendId] ?? 0, index + 1)
  let next: GameState = { ...s, friendship: { ...s.friendship, [friendId]: newLevel } }
  if (friendId === 'maya' && newLevel === 1 && (s.friendship.maya ?? 0) < 1) {
    next = { ...next, maxHp: next.maxHp + 1, hp: next.maxHp + 1 }
  }
  return next
}

/** Nivel máximo que se puede alcanzar hoy con un amigo (conversaciones disponibles y escritas) */
export function friendCap(s: GameState, friend: FriendDef): number {
  let cap = 0
  for (const c of friend.conversations) {
    if (c.requires && !s.recovered.includes(c.requires)) break
    if (c.lines.length === 0) break
    cap++
  }
  return cap
}
