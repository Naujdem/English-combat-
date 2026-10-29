import { useSyncExternalStore } from 'react'
import type { GameState } from './types'
import { LESSONS } from '../data/lessons'
import { SESSIONS } from '../data/schedule'
import { CITY } from '../data/city'
import { SCHOOL } from '../data/school'

/**
 * Modo profesor: permisos especiales para revisar el juego sin jugarlo entero.
 * Se activa tocando 5 veces el título "English Combat" y escribiendo la clave.
 * Se guarda aparte de la partida, así sigue activo aunque se empiece otra.
 */
export const TEACHER_PIN = 'grimm'

const KEY = 'english-combat-profe'
type Settings = { on: boolean; answers: boolean }
const DEFAULT: Settings = { on: false, answers: false }

let current: Settings = read()
const listeners = new Set<() => void>()

function read(): Settings {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? { ...DEFAULT, ...JSON.parse(raw) } : DEFAULT
  } catch {
    return DEFAULT
  }
}

export function setTeacher(patch: Partial<Settings>) {
  current = { ...current, ...patch }
  try {
    localStorage.setItem(KEY, JSON.stringify(current))
  } catch {
    /* sin almacenamiento: queda activo solo en esta sesión */
  }
  listeners.forEach((l) => l())
}

export function useTeacher(): Settings {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l)
      return () => listeners.delete(l)
    },
    () => current,
  )
}

const add = (list: string[], items: string[]) => [...list, ...items.filter((x) => !list.includes(x))]

function base(s: GameState): GameState {
  return {
    ...s,
    hero: s.hero.name ? s.hero : { ...s.hero, name: 'Alex' },
    interest: s.interest.name ? s.interest : { ...s.interest, name: 'Sofia' },
    talks: { ...s.talks, leo: Math.max(1, s.talks.leo ?? 0) },
    friendship: { ...s.friendship, leo: Math.max(3, s.friendship.leo ?? 0) },
    battle: null,
    hp: s.maxHp,
  }
}

/** Estados preparados para revisar partes del juego */
export const PRESETS: { id: string; label: string; apply: (s: GameState) => GameState }[] = [
  {
    id: 'school-boss',
    label: 'Escuela: listo para el jefe',
    apply: (s) => {
      const b = base(s)
      return {
        ...b,
        screen: 'explore',
        sceneId: 'school',
        pos: { x: 4, y: 11 },
        defeated: add(b.defeated, ['school-m1', 'school-m2', 'school-m3', 'school-patio']),
        keys: { ...b.keys, school: 4 },
        opened: add(b.opened, [...SESSIONS.map((x) => x.id), ...SCHOOL.requirements.map((r) => r.id), 'school-commands']),
        seenLesson: add(b.seenLesson, ['school', 'greetings', 'to-be', 'possessives', 'prepositions', 'imperatives']),
      }
    },
  },
  {
    id: 'school-done',
    label: 'Escuela: terminada (ver el final)',
    apply: (s) => {
      const b = PRESETS[0].apply(s)
      return {
        ...b,
        screen: 'epilogue',
        defeated: add(b.defeated, ['school-boss']),
        relics: Math.max(1, b.relics),
        recovered: add(b.recovered, ['greetings', 'to-be', 'possessives', 'prepositions', 'imperatives']) as GameState['recovered'],
        outfits: add(b.outfits, ['capa']),
      }
    },
  },
  {
    id: 'city-start',
    label: 'Ciudad: recién llegado',
    apply: (s) => {
      const b = PRESETS[1].apply(s)
      return { ...b, screen: 'explore', sceneId: 'city', pos: { ...CITY.start }, opened: add(b.opened, ['school-epilogue', 'diary-open-school', 'bus-city']) }
    },
  },
  {
    id: 'city-boss',
    label: 'Ciudad: listo para el jefe',
    apply: (s) => {
      const b = PRESETS[2].apply(s)
      return {
        ...b,
        pos: { x: 10, y: 12 },
        defeated: add(b.defeated, ['city-m1', 'city-m2', 'city-m3']),
        keys: { ...b.keys, city: 3 },
        opened: add(b.opened, ['city-map', 'city-coffee']),
        seenLesson: add(b.seenLesson, ['city', 'there-is', 'demonstratives', 'ordering']),
      }
    },
  },
  {
    id: 'city-done',
    label: 'Ciudad: terminada (ver el final)',
    apply: (s) => {
      const b = PRESETS[3].apply(s)
      return {
        ...b,
        screen: 'epilogue',
        defeated: add(b.defeated, ['city-boss']),
        relics: Math.max(2, b.relics),
        recovered: add(b.recovered, ['there-is', 'demonstratives', 'ordering']) as GameState['recovered'],
        outfits: add(b.outfits, ['gorra']),
      }
    },
  },
]

/** Marca todas las lecciones como vistas (para no repetirlas al revisar) */
export function skipLessons(s: GameState): GameState {
  return { ...s, seenLesson: add(s.seenLesson, Object.keys(LESSONS)) as GameState['seenLesson'] }
}
