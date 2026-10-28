import type { FriendDef, GameState, SceneDef } from './types'
import type { SpriteLook } from '../components/Sprite'
import { OUTFITS, SCHOOL } from '../data/school'
import { FRIENDS, interestFriend } from '../data/friends'

export const SCENES: Record<string, SceneDef> = { [SCHOOL.id]: SCHOOL }

export function heroLook(s: GameState, extra: Partial<SpriteLook> = {}): SpriteLook {
  const outfit = OUTFITS[s.outfit] ?? OUTFITS.base
  return {
    accessory: s.outfit === 'gafas' ? 'glasses' : undefined,
    shirt: s.outfit === 'capa' ? OUTFITS.base.color : outfit.color,
    cape: s.outfit === 'capa' ? outfit.color : '#c0392b',
    hair: s.hero.look.hair,
    skin: s.hero.look.skin,
    gender: s.hero.gender,
    ...extra,
  }
}

export function friendById(s: GameState, id: string): FriendDef | undefined {
  if (id === 'interest') return interestFriend(s.interest, s.hero.name)
  return FRIENDS[id]
}

export function allFriends(s: GameState): FriendDef[] {
  return [FRIENDS.leo, FRIENDS.maya, interestFriend(s.interest, s.hero.name)]
}

export function bossDoorOpen(s: GameState, scene: SceneDef): boolean {
  return (s.keys[scene.id] ?? 0) >= scene.keysNeeded
}

/** Las amistades dan pequeñas ventajas en combate */
export function perks(s: GameState) {
  return {
    leoHint: (s.talks.leo ?? 0) >= 1,
  }
}
