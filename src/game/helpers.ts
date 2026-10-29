import type { FriendDef, GameState, Question, SceneDef } from './types'
import type { SpriteLook } from '../components/Sprite'
import { OUTFITS, SCHOOL } from '../data/school'
import { CITY } from '../data/city'
import { BARRIO } from '../data/barrio'
import { FARM } from '../data/farm'
import { OFFICE } from '../data/office'
import { SCHOOL_PAST } from '../data/schoolPast'
import { CITY_PAST } from '../data/cityPast'
import { FRIENDS, interestFriend } from '../data/friends'

export const SCENES: Record<string, SceneDef> = { [SCHOOL.id]: SCHOOL, [CITY.id]: CITY, [BARRIO.id]: BARRIO, [FARM.id]: FARM, [OFFICE.id]: OFFICE, [SCHOOL_PAST.id]: SCHOOL_PAST, [CITY_PAST.id]: CITY_PAST }

export function heroLook(s: GameState, extra: Partial<SpriteLook> = {}): SpriteLook {
  const outfit = OUTFITS[s.outfit] ?? OUTFITS.base
  return {
    accessory: s.outfit === 'gafas' ? 'glasses' : s.outfit === 'gorra' ? 'cap' : undefined,
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

/** Anota un acierto o un error del tema de la pregunta (pantalla de progreso) */
export function recordAnswer(s: GameState, q: Question, ok: boolean): GameState {
  const cur = s.stats[q.topic] ?? { ok: 0, fail: 0 }
  return { ...s, stats: { ...s.stats, [q.topic]: ok ? { ...cur, ok: cur.ok + 1 } : { ...cur, fail: cur.fail + 1 } } }
}
