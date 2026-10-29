import type { EnemyDef } from '../game/types'
import { SCHOOL_ENEMIES } from './school'
import { CITY_ENEMIES } from './city'
import { BARRIO_ENEMIES } from './barrio'
import { FARM_ENEMIES } from './farm'
import { OFFICE_ENEMIES } from './office'

/** Todos los enemigos del juego, de todos los escenarios */
const ALL: Record<string, EnemyDef> = { ...SCHOOL_ENEMIES, ...CITY_ENEMIES, ...BARRIO_ENEMIES, ...FARM_ENEMIES, ...OFFICE_ENEMIES }

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
