import { useCallback, useEffect, useState } from 'react'
import type { GameState } from './types'
import { SCHOOL } from '../data/school'
import { STORY_POINTS } from './social'
import { SCENES } from './helpers'
import { ENEMIES } from '../data/enemies'

const KEY = 'english-combat-save-v1'
/** Copia de la última partida válida cargada, por si algo sale mal al seguir jugando */
const BACKUP_KEY = 'english-combat-save-v1-backup'

/** Jefe final de A1 (torre Green Valley, futuro). Vencerlo desbloquea A2 */
export const A1_FINAL_BOSS = 'office-future-boss'
/** Prefijo obligatorio para los identificadores de A2 (escenas, jefes, puertas...) */
export const A2_PREFIX = 'a2-'
export const isA2Unlocked = (s: GameState) => s.defeated.includes(A1_FINAL_BOSS)

export function newGame(): GameState {
  return {
    version: 1,
    screen: 'intro',
    hero: { name: '', gender: 'male', look: { skin: '#f1c27d', hair: '#4a2c17' } },
    interest: { name: '', gender: 'female', mode: 'romance' },
    outfit: 'base',
    outfits: ['base'],
    hp: 5,
    maxHp: 5,
    recovered: [],
    relics: 0,
    sceneId: SCHOOL.id,
    pos: { ...SCHOOL.start },
    facing: 'right',
    keys: {},
    defeated: [],
    opened: [],
    friendship: {},
    talks: {},
    items: { shield: 0 },
    mistakes: [],
    cards: [],
    stats: {},
    lostFound: { started: false, carrying: null, picked: [], returned: [] },
    seenLesson: [],
    battle: null,
  }
}

export function loadSave(): GameState | null {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return null
    const data = JSON.parse(raw) as GameState
    if (data.version !== 1) return null
    // Respaldo intacto antes de ajustar o volver a guardar la partida
    try {
      localStorage.setItem(BACKUP_KEY, raw)
    } catch {
      /* sin espacio para el respaldo: se sigue cargando normalmente */
    }
    // Partidas anteriores guardaban el nivel de amistad en vez de puntos
    if (!data.talks) {
      data.talks = { ...data.friendship }
      data.friendship = Object.fromEntries(Object.entries(data.friendship).map(([k, v]) => [k, STORY_POINTS[v] ?? 0]))
    }
    if (!data.items) data.items = { shield: 0 }
    if (!data.mistakes) data.mistakes = []
    if (!data.cards) data.cards = []
    if (!data.stats) data.stats = {}
    if (!data.lostFound) data.lostFound = { started: false, carrying: null, picked: [], returned: [] }
    // Jefes de A2 vencidos antes de que devolvieran sus temas: se recuperan ahora (los piden los momentos de amistad A2)
    for (const id of data.defeated) {
      const e = ENEMIES[id]
      if (e?.release) for (const t of e.topics) if (!data.recovered.includes(t)) data.recovered.push(t)
    }
    // Escena que ya no existe: se lleva al jugador a la escuela sin tocar su progreso
    if (!SCENES[data.sceneId]) {
      data.sceneId = SCHOOL.id
      data.pos = { ...SCHOOL.start }
      data.battle = null
    }
    return data
  } catch {
    return null
  }
}

function writeSave(state: GameState) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    /* sin almacenamiento: el juego sigue funcionando sin guardar */
  }
}

export function clearSave() {
  try {
    localStorage.removeItem(KEY)
  } catch {
    /* nada que borrar */
  }
}

export type Update = (fn: (s: GameState) => GameState) => void

export function useGameState() {
  const [state, setState] = useState<GameState>(() => {
    const save = loadSave()
    return save ? { ...save, screen: 'title' } : { ...newGame(), screen: 'title' }
  })

  useEffect(() => {
    if (state.hero.name) writeSave(state)
  }, [state])

  const update: Update = useCallback((fn) => setState((s) => fn(s)), [])

  return { state, update, setState }
}
