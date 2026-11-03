import type { FriendDef, GameState, Question, SceneDef } from './types'
import type { SpriteLook } from '../components/Sprite'
import { OUTFITS, SCHOOL } from '../data/school'
import { CITY } from '../data/city'
import { BARRIO } from '../data/barrio'
import { FARM } from '../data/farm'
import { OFFICE } from '../data/office'
import { SCHOOL_PAST } from '../data/schoolPast'
import { CITY_PAST } from '../data/cityPast'
import { BARRIO_PAST } from '../data/barrioPast'
import { FARM_PAST } from '../data/farmPast'
import { CINEMA_PAST } from '../data/cinemaPast'
import { SCHOOL_FUTURE } from '../data/schoolFuture'
import { CITY_FUTURE } from '../data/cityFuture'
import { BARRIO_FUTURE } from '../data/barrioFuture'
import { FARM_FUTURE } from '../data/farmFuture'
import { TOWER_FUTURE } from '../data/towerFuture'
import { A2_HOSPITAL } from '../data/a2Hospital'
import { A2_CITY } from '../data/a2City'
import { A2_WORKSHOP } from '../data/a2Workshop'
import { A2_LIBRARY } from '../data/a2Library'
import { A2_FARM_PAST } from '../data/a2FarmPast'
import { A2_RACE } from '../data/a2Race'
import { A2_CAR } from '../data/a2Car'
import { A2_MILL } from '../data/a2Mill'
import { A2_LEO_HOUSE } from '../data/a2LeoHouse'
import { A2_PARTY } from '../data/a2Party'
import { A2_MARKET } from '../data/a2Market'
import { A2_DINNER } from '../data/a2Dinner'
import { A2_FUTURE } from '../data/a2Future'
import { A2_CONTROL } from '../data/a2Control'
import { A2_RETURN } from '../data/a2Return'
import { FRIENDS, interestFriend } from '../data/friends'
import { newCard } from './cards'

export const SCENES: Record<string, SceneDef> = { [SCHOOL.id]: SCHOOL, [CITY.id]: CITY, [BARRIO.id]: BARRIO, [FARM.id]: FARM, [OFFICE.id]: OFFICE, [SCHOOL_PAST.id]: SCHOOL_PAST, [CITY_PAST.id]: CITY_PAST, [BARRIO_PAST.id]: BARRIO_PAST, [FARM_PAST.id]: FARM_PAST, [CINEMA_PAST.id]: CINEMA_PAST, [SCHOOL_FUTURE.id]: SCHOOL_FUTURE, [CITY_FUTURE.id]: CITY_FUTURE, [BARRIO_FUTURE.id]: BARRIO_FUTURE, [FARM_FUTURE.id]: FARM_FUTURE, [TOWER_FUTURE.id]: TOWER_FUTURE, [A2_HOSPITAL.id]: A2_HOSPITAL, [A2_CITY.id]: A2_CITY, [A2_WORKSHOP.id]: A2_WORKSHOP, [A2_LIBRARY.id]: A2_LIBRARY, [A2_FARM_PAST.id]: A2_FARM_PAST, [A2_RACE.id]: A2_RACE, [A2_CAR.id]: A2_CAR, [A2_MILL.id]: A2_MILL, [A2_LEO_HOUSE.id]: A2_LEO_HOUSE, [A2_FUTURE.id]: A2_FUTURE, [A2_CONTROL.id]: A2_CONTROL, [A2_RETURN.id]: A2_RETURN, [A2_PARTY.id]: A2_PARTY, [A2_MARKET.id]: A2_MARKET, [A2_DINNER.id]: A2_DINNER }

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
  const next = { ...s, stats: { ...s.stats, [q.topic]: ok ? { ...cur, ok: cur.ok + 1 } : { ...cur, fail: cur.fail + 1 } } }
  // Cada frase que corriges en combate se guarda como ficha (vuelve a salir mañana para repasarla)
  if (q.kind === 'fix') {
    const id = `F-${q.id}`
    if (!s.cards.some((c) => c.id === id)) {
      const card = newCard(`"${q.prompt}"`, q.options[q.answer], q.tip, { id, deck: SCENES[s.sceneId]?.name, type: 'phrase', due: Date.now() + 20 * 60 * 60 * 1000 })
      return { ...next, cards: [...s.cards, card] }
    }
  }
  return next
}
