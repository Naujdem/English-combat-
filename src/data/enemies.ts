import type { EnemyDef } from '../game/types'
import { SCHOOL_ENEMIES } from './school'
import { CITY_ENEMIES } from './city'
import { BARRIO_ENEMIES } from './barrio'
import { FARM_ENEMIES } from './farm'
import { OFFICE_ENEMIES } from './office'
import { SCHOOL_PAST_ENEMIES } from './schoolPast'
import { CITY_PAST_ENEMIES } from './cityPast'
import { BARRIO_PAST_ENEMIES } from './barrioPast'
import { FARM_PAST_ENEMIES } from './farmPast'
import { CINEMA_PAST_ENEMIES } from './cinemaPast'
import { SCHOOL_FUTURE_ENEMIES } from './schoolFuture'
import { CITY_FUTURE_ENEMIES } from './cityFuture'
import { BARRIO_FUTURE_ENEMIES } from './barrioFuture'
import { FARM_FUTURE_ENEMIES } from './farmFuture'
import { TOWER_FUTURE_ENEMIES } from './towerFuture'
import { A2_HOSPITAL_ENEMIES } from './a2Hospital'
import { A2_CITY_ENEMIES } from './a2City'
import { A2_WORKSHOP_ENEMIES } from './a2Workshop'
import { A2_LIBRARY_ENEMIES } from './a2Library'
import { A2_FARM_PAST_ENEMIES } from './a2FarmPast'
import { A2_RACE_ENEMIES } from './a2Race'
import { A2_CAR_ENEMIES } from './a2Car'
import { A2_MILL_ENEMIES } from './a2Mill'
import { A2_LEO_HOUSE_ENEMIES } from './a2LeoHouse'
import { A2_FUTURE_ENEMIES } from './a2Future'
import { A2_CONTROL_ENEMIES } from './a2Control'
import { A2_RETURN_ENEMIES } from './a2Return'
import { A2_PARTY_ENEMIES } from './a2Party'
import { A2_MARKET_ENEMIES } from './a2Market'
import { A2_DINNER_ENEMIES } from './a2Dinner'

/** Todos los enemigos del juego, de todos los escenarios */
const ALL: Record<string, EnemyDef> = { ...SCHOOL_ENEMIES, ...CITY_ENEMIES, ...BARRIO_ENEMIES, ...FARM_ENEMIES, ...OFFICE_ENEMIES, ...SCHOOL_PAST_ENEMIES, ...CITY_PAST_ENEMIES, ...BARRIO_PAST_ENEMIES, ...FARM_PAST_ENEMIES, ...CINEMA_PAST_ENEMIES, ...SCHOOL_FUTURE_ENEMIES, ...CITY_FUTURE_ENEMIES, ...BARRIO_FUTURE_ENEMIES, ...FARM_FUTURE_ENEMIES, ...TOWER_FUTURE_ENEMIES, ...A2_HOSPITAL_ENEMIES, ...A2_CITY_ENEMIES, ...A2_WORKSHOP_ENEMIES, ...A2_LIBRARY_ENEMIES, ...A2_FARM_PAST_ENEMIES, ...A2_RACE_ENEMIES, ...A2_CAR_ENEMIES, ...A2_MILL_ENEMIES, ...A2_LEO_HOUSE_ENEMIES, ...A2_FUTURE_ENEMIES, ...A2_CONTROL_ENEMIES, ...A2_RETURN_ENEMIES, ...A2_PARTY_ENEMIES, ...A2_MARKET_ENEMIES, ...A2_DINNER_ENEMIES }

/**
 * Esbirros y jefes también piden hablar: decir la frase en voz alta.
 * (Solo aparece si el navegador puede reconocer la voz.)
 */
function withSpeak(e: EnemyDef): EnemyDef {
  if (e.kind === 'trainer') return e
  const add = (k: EnemyDef['kinds']) => (k.includes('speak') ? k : [...k, 'speak' as const])
  return { ...e, kinds: add(e.kinds), phases: e.phases?.map((p, i) => (i === 0 ? p : { ...p, kinds: add(p.kinds) })) }
}

export const ENEMIES: Record<string, EnemyDef> = Object.fromEntries(Object.entries(ALL).map(([id, e]) => [id, withSpeak(e)]))
