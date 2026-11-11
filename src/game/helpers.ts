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
import { B1_HOME } from '../data/b1Home'
import { B1_TABLET_TEST } from '../data/b1TabletDemo'
import { B1_01_SCHOOL } from '../data/b1Accident'
import { B1_03_HOSPITAL } from '../data/b1Words'
import { B1_02_LUMEN } from '../data/b1NewCity'
import { B1_04_RESIDENCE } from '../data/b1Residence'
import { B1_05_FLAT } from '../data/b1Flat'
import { B1_05_BANK_SCENE } from '../data/b1Bank'
import { B1_06_SHELTER } from '../data/b1Shelter'
import { B1_06_KENNELS } from '../data/b1Kennels'
import { B1_06_OFFICE } from '../data/b1EstebanOffice'
import { B1_07_ROOM } from '../data/b1Room'
import { B1_09_VALLEY } from '../data/b1Valley'
import { B1_11_ROOM } from '../data/b1ClockRoom'
import { B1_11_FIRE } from '../data/b1FireNight'
import { B1_11_ROADS } from '../data/b1TempleRoads'
import { B1_11_POINT } from '../data/b1FixedPoint'
import { B1_12_HOUSE } from '../data/b1HostHouse'
import { B1_12_GARDEN } from '../data/b1HostGarden'
import { B1_12_CITY } from '../data/b1HostCity'
import { B1_12_PLAZA } from '../data/b1HostPlaza'
import { B1_13_ECHOES } from '../data/b1TempleEchoes'
import { B1_13_HALL } from '../data/b1EchoHall'
import { B1_13_CAMP } from '../data/b1TempleCamp'
import { B1_13_WINDOW } from '../data/b1Window2056'
import { B1_13_SCHOOL } from '../data/b1SchoolMorning'
import { B1_14_LOUNGE } from '../data/b1Lounge'
import { B1_14_HARBOUR } from '../data/b1Harbour'
import { B1_S1_PARK } from '../data/b1CharityRun'
import { B1_S2_ROOM } from '../data/b1MovieNight'
import { B1_09_STONES } from '../data/b1TempleStones'
import { B1_09_TIME } from '../data/b1TempleTime'
import { B1_07_MARKET } from '../data/b1Market'
import { B1_08_STADIUM } from '../data/b1Stadium'
import { B1_10_FESTIVAL } from '../data/b1Festival'
import { B1_10_TENT } from '../data/b1GamingTent'
import { B1_10_STAGE } from '../data/b1Stage'
import { B1_08_STANDS } from '../data/b1Stands'
import { B1_08_CONCOURSE } from '../data/b1Concourse'
import { FRIENDS, interestFriend } from '../data/friends'
import { newCard } from './cards'

export const SCENES: Record<string, SceneDef> = { [SCHOOL.id]: SCHOOL, [CITY.id]: CITY, [BARRIO.id]: BARRIO, [FARM.id]: FARM, [OFFICE.id]: OFFICE, [SCHOOL_PAST.id]: SCHOOL_PAST, [CITY_PAST.id]: CITY_PAST, [BARRIO_PAST.id]: BARRIO_PAST, [FARM_PAST.id]: FARM_PAST, [CINEMA_PAST.id]: CINEMA_PAST, [SCHOOL_FUTURE.id]: SCHOOL_FUTURE, [CITY_FUTURE.id]: CITY_FUTURE, [BARRIO_FUTURE.id]: BARRIO_FUTURE, [FARM_FUTURE.id]: FARM_FUTURE, [TOWER_FUTURE.id]: TOWER_FUTURE, [A2_HOSPITAL.id]: A2_HOSPITAL, [A2_CITY.id]: A2_CITY, [A2_WORKSHOP.id]: A2_WORKSHOP, [A2_LIBRARY.id]: A2_LIBRARY, [A2_FARM_PAST.id]: A2_FARM_PAST, [A2_RACE.id]: A2_RACE, [A2_CAR.id]: A2_CAR, [A2_MILL.id]: A2_MILL, [A2_LEO_HOUSE.id]: A2_LEO_HOUSE, [A2_FUTURE.id]: A2_FUTURE, [A2_CONTROL.id]: A2_CONTROL, [A2_RETURN.id]: A2_RETURN, [A2_PARTY.id]: A2_PARTY, [A2_MARKET.id]: A2_MARKET, [A2_DINNER.id]: A2_DINNER, [B1_HOME.id]: B1_HOME, [B1_TABLET_TEST.id]: B1_TABLET_TEST, [B1_01_SCHOOL.id]: B1_01_SCHOOL, [B1_02_LUMEN.id]: B1_02_LUMEN, [B1_03_HOSPITAL.id]: B1_03_HOSPITAL, [B1_04_RESIDENCE.id]: B1_04_RESIDENCE, [B1_05_FLAT.id]: B1_05_FLAT, [B1_05_BANK_SCENE.id]: B1_05_BANK_SCENE, [B1_06_SHELTER.id]: B1_06_SHELTER, [B1_06_KENNELS.id]: B1_06_KENNELS, [B1_06_OFFICE.id]: B1_06_OFFICE, [B1_07_ROOM.id]: B1_07_ROOM, [B1_07_MARKET.id]: B1_07_MARKET, [B1_08_STADIUM.id]: B1_08_STADIUM, [B1_08_STANDS.id]: B1_08_STANDS, [B1_08_CONCOURSE.id]: B1_08_CONCOURSE, [B1_09_VALLEY.id]: B1_09_VALLEY, [B1_09_STONES.id]: B1_09_STONES, [B1_09_TIME.id]: B1_09_TIME, [B1_10_FESTIVAL.id]: B1_10_FESTIVAL, [B1_10_TENT.id]: B1_10_TENT, [B1_10_STAGE.id]: B1_10_STAGE, [B1_11_ROOM.id]: B1_11_ROOM, [B1_11_FIRE.id]: B1_11_FIRE, [B1_11_ROADS.id]: B1_11_ROADS, [B1_11_POINT.id]: B1_11_POINT, [B1_12_HOUSE.id]: B1_12_HOUSE, [B1_12_GARDEN.id]: B1_12_GARDEN, [B1_12_CITY.id]: B1_12_CITY, [B1_12_PLAZA.id]: B1_12_PLAZA, [B1_13_ECHOES.id]: B1_13_ECHOES, [B1_13_HALL.id]: B1_13_HALL, [B1_13_CAMP.id]: B1_13_CAMP, [B1_13_WINDOW.id]: B1_13_WINDOW, [B1_13_SCHOOL.id]: B1_13_SCHOOL, [B1_14_LOUNGE.id]: B1_14_LOUNGE, [B1_14_HARBOUR.id]: B1_14_HARBOUR, [B1_S1_PARK.id]: B1_S1_PARK, [B1_S2_ROOM.id]: B1_S2_ROOM }

export function heroLook(s: GameState, extra: Partial<SpriteLook> = {}): SpriteLook {
  const outfit = OUTFITS[s.outfit] ?? OUTFITS.base
  return {
    accessory: s.outfit === 'gafas' ? 'glasses' : s.outfit === 'gorra' ? 'cap' : undefined,
    // B1-04: el llavero de la residencia no cambia la camisa; se dibuja como una casita con llave en el cinturón
    // B1-08: la bufanda del equipo tampoco cambia la camisa; se dibuja al cuello
    shirt: s.outfit === 'capa' || s.outfit === 'llavero-residencia' || s.outfit === 'bufanda-lumen' || s.outfit === 'pulsera-festival' || s.outfit === 'delantal-jhoana' ? OUTFITS.base.color : outfit.color,
    charm: s.outfit === 'llavero-residencia' ? 'house-key' : s.outfit === 'bufanda-lumen' ? 'scarf' : s.outfit === 'pulsera-festival' ? 'wristband' : s.outfit === 'delantal-jhoana' ? 'apron' : undefined,
    cape: s.outfit === 'capa' ? outfit.color : '#c0392b',
    hair: s.hero.look.hair,
    skin: s.hero.look.skin,
    gender: s.hero.gender,
    // B1-12: el llavero con forma de reloj (objeto de historia, bandera en opened): siempre, con cualquier atuendo
    keychain: s.opened.includes('b1-12-keychain') || undefined,
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
