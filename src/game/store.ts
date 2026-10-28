import { useCallback, useEffect, useState } from 'react'
import type { GameState } from './types'
import { SCHOOL } from '../data/school'
import { STORY_POINTS } from './social'

const KEY = 'english-combat-save-v1'

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
    // Partidas anteriores guardaban el nivel de amistad en vez de puntos
    if (!data.talks) {
      data.talks = { ...data.friendship }
      data.friendship = Object.fromEntries(Object.entries(data.friendship).map(([k, v]) => [k, STORY_POINTS[v] ?? 0]))
    }
    if (!data.items) data.items = { shield: 0 }
    if (!data.mistakes) data.mistakes = []
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
