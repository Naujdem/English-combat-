import type { EnemyDef } from '../game/types'
import { SCHOOL_ENEMIES } from './school'
import { CITY_ENEMIES } from './city'

/** Todos los enemigos del juego, de todos los escenarios */
export const ENEMIES: Record<string, EnemyDef> = { ...SCHOOL_ENEMIES, ...CITY_ENEMIES }
