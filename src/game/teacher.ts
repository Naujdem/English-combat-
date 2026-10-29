import { useSyncExternalStore } from 'react'
import type { GameState } from './types'
import { LESSONS } from '../data/lessons'
import { SESSIONS } from '../data/schedule'
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
    // Cada atajo parte de cero en los escenarios, para que no se mezcle con lo que ya se jugó
    defeated: s.defeated.filter((d) => !SCENE_PREFIX.test(d)),
    opened: s.opened.filter((o) => !SCENE_PREFIX.test(o) && !/^(bus-|diary-open-)/.test(o)),
    keys: {},
    relics: 0,
    recovered: s.recovered.filter((t) => t === 'greetings'),
  }
}

const SCENE_PREFIX = /^(school|city|barrio|board|party|farm|office|past|future)-/

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
  {
    id: 'barrio-start',
    label: 'Barrio: recién llegado',
    apply: (s) => {
      const b = PRESETS[4].apply(s)
      return { ...b, screen: 'explore', sceneId: 'barrio', pos: { ...BARRIO.start }, opened: add(b.opened, ['city-epilogue', 'diary-open-city', 'bus-barrio']) }
    },
  },
  {
    id: 'barrio-boss',
    label: 'Barrio: listo para el jefe',
    apply: (s) => {
      const b = PRESETS[5].apply(s)
      return {
        ...b,
        pos: { x: 12, y: 10 },
        defeated: add(b.defeated, ['barrio-m1', 'barrio-m2', 'barrio-m3']),
        keys: { ...b.keys, barrio: 3 },
        opened: add(b.opened, ['barrio-invite', 'barrio-photo', 'barrio-likes', 'party-started', 'party-cake', 'party-balloons', 'party-radio', 'party-ready']),
        seenLesson: add(b.seenLesson, ['barrio', 'present-simple', 'likes', 'can', 'present-continuous']),
      }
    },
  },
  {
    id: 'barrio-done',
    label: 'Barrio: terminado (ver el final)',
    apply: (s) => {
      const b = PRESETS[6].apply(s)
      return {
        ...b,
        screen: 'epilogue',
        defeated: add(b.defeated, ['barrio-boss']),
        relics: Math.max(3, b.relics),
        recovered: add(b.recovered, ['present-simple', 'likes', 'can', 'present-continuous', 'have-got']) as GameState['recovered'],
        outfits: add(b.outfits, ['sudadera']),
      }
    },
  },
  {
    id: 'farm-start',
    label: 'Granja: recién llegado',
    apply: (s) => {
      const b = PRESETS[7].apply(s)
      return { ...b, screen: 'explore', sceneId: 'farm', pos: { ...FARM.start }, opened: add(b.opened, ['barrio-epilogue', 'diary-open-barrio', 'bus-farm']) }
    },
  },
  {
    id: 'farm-boss',
    label: 'Granja: lista para el jefe',
    apply: (s) => {
      const b = PRESETS[8].apply(s)
      return {
        ...b,
        pos: { x: 11, y: 5 },
        defeated: add(b.defeated, ['farm-m1', 'farm-m2', 'farm-m3']),
        keys: { ...b.keys, farm: 3 },
        opened: add(b.opened, ['farm-guess', 'farm-pens']),
        seenLesson: add(b.seenLesson, ['farm', 'do-does', 'plurals']),
      }
    },
  },
  {
    id: 'farm-done',
    label: 'Granja: terminada (ver el final)',
    apply: (s) => {
      const b = PRESETS[9].apply(s)
      return {
        ...b,
        screen: 'epilogue',
        defeated: add(b.defeated, ['farm-boss']),
        relics: Math.max(4, b.relics),
        recovered: add(b.recovered, ['do-does', 'plurals']) as GameState['recovered'],
        outfits: add(b.outfits, ['overol']),
      }
    },
  },
  {
    id: 'office-start',
    label: 'Oficina: recién llegado',
    apply: (s) => {
      const b = PRESETS[10].apply(s)
      return { ...b, screen: 'explore', sceneId: 'office', pos: { ...OFFICE.start }, opened: add(b.opened, ['farm-epilogue', 'diary-open-farm', 'bus-office']) }
    },
  },
  {
    id: 'office-boss',
    label: 'Oficina: lista para el jefe',
    apply: (s) => {
      const b = PRESETS[11].apply(s)
      return {
        ...b,
        pos: { x: 12, y: 5 },
        defeated: add(b.defeated, ['office-m1', 'office-m2', 'office-m3']),
        keys: { ...b.keys, office: 3 },
        opened: add(b.opened, ['office-planner', 'office-message']),
        seenLesson: add(b.seenLesson, ['office', 'time', 'object-pronouns', 'could-you']),
      }
    },
  },
  {
    id: 'office-done',
    label: 'Oficina: terminada (final de A1)',
    apply: (s) => {
      const b = PRESETS[12].apply(s)
      return {
        ...b,
        screen: 'epilogue',
        defeated: add(b.defeated, ['office-boss']),
        relics: Math.max(5, b.relics),
        recovered: add(b.recovered, ['time', 'object-pronouns', 'could-you']) as GameState['recovered'],
        outfits: add(b.outfits, ['traje']),
      }
    },
  },
  {
    id: 'past-school-start',
    label: 'Pasado · Escuela 1996: recién llegado',
    apply: (s) => {
      const b = PRESETS[13].apply(s)
      return { ...b, screen: 'explore', sceneId: 'school-past', pos: { ...SCHOOL_PAST.start }, opened: add(b.opened, ['office-epilogue', 'diary-open-office', 'bus-school-past']) }
    },
  },
  {
    id: 'school-past-boss',
    label: 'Pasado · Escuela 1996: listo para el jefe',
    apply: (s) => {
      const b = PRESETS[14].apply(s)
      return {
        ...b,
        pos: { x: 10, y: 9 },
        defeated: add(b.defeated, ['school-past-m1']),
        keys: { ...b.keys, 'school-past': 1 },
        opened: add(b.opened, ['past-attendance']),
        seenLesson: add(b.seenLesson, ['school-past', 'was-were']),
      }
    },
  },
  {
    id: 'past-school-done',
    label: 'Pasado · Escuela 1996: terminada',
    apply: (s) => {
      const b = PRESETS[15].apply(s)
      return {
        ...b,
        screen: 'epilogue',
        defeated: add(b.defeated, ['school-past-boss']),
        recovered: add(b.recovered, ['was-were']) as GameState['recovered'],
        outfits: add(b.outfits, ['chaleco']),
      }
    },
  },
  {
    id: 'past-city-start',
    label: 'Pasado · Ciudad 1996: recién llegado',
    apply: (s) => {
      const b = PRESETS[16].apply(s)
      return { ...b, screen: 'explore', sceneId: 'city-past', pos: { ...CITY_PAST.start }, opened: add(b.opened, ['school-past-epilogue', 'bus-city-past']) }
    },
  },
  {
    id: 'city-past-boss',
    label: 'Pasado · Ciudad 1996: listo para el jefe',
    apply: (s) => {
      const b = PRESETS[17].apply(s)
      return {
        ...b,
        pos: { x: 9, y: 11 },
        defeated: add(b.defeated, ['city-past-m1', 'city-past-m2']),
        keys: { ...b.keys, 'city-past': 2 },
        opened: add(b.opened, ['past-sounds']),
        seenLesson: add(b.seenLesson, ['city-past', 'past-regular']),
      }
    },
  },
  {
    id: 'past-city-done',
    label: 'Pasado · Ciudad 1996: terminada',
    apply: (s) => {
      const b = PRESETS[18].apply(s)
      return {
        ...b,
        screen: 'epilogue',
        defeated: add(b.defeated, ['city-past-boss']),
        recovered: add(b.recovered, ['past-regular']) as GameState['recovered'],
        outfits: add(b.outfits, ['cuadros']),
      }
    },
  },
  {
    id: 'past-barrio-start',
    label: 'Pasado · Green Street 1996: recién llegado',
    apply: (s) => {
      const b = PRESETS[19].apply(s)
      return { ...b, screen: 'explore', sceneId: 'barrio-past', pos: { ...BARRIO_PAST.start }, opened: add(b.opened, ['city-past-epilogue', 'bus-barrio-past']) }
    },
  },
  {
    id: 'barrio-past-boss',
    label: 'Pasado · Green Street 1996: listo para el jefe',
    apply: (s) => {
      const b = PRESETS[20].apply(s)
      return {
        ...b,
        pos: { x: 9, y: 11 },
        defeated: add(b.defeated, ['barrio-past-m1', 'barrio-past-m2']),
        keys: { ...b.keys, 'barrio-past': 2 },
        opened: add(b.opened, ['past-verbbook']),
        seenLesson: add(b.seenLesson, ['barrio-past', 'past-irregular']),
      }
    },
  },
  {
    id: 'past-barrio-done',
    label: 'Pasado · Green Street 1996: terminada',
    apply: (s) => {
      const b = PRESETS[21].apply(s)
      return {
        ...b,
        screen: 'epilogue',
        defeated: add(b.defeated, ['barrio-past-boss']),
        recovered: add(b.recovered, ['past-irregular']) as GameState['recovered'],
        outfits: add(b.outfits, ['casco']),
      }
    },
  },
  {
    id: 'past-farm-start',
    label: 'Pasado · Granja 1996: recién llegado',
    apply: (s) => {
      const b = PRESETS[22].apply(s)
      return { ...b, screen: 'explore', sceneId: 'farm-past', pos: { ...FARM_PAST.start }, opened: add(b.opened, ['barrio-past-epilogue', 'bus-farm-past']) }
    },
  },
  {
    id: 'farm-past-boss',
    label: 'Pasado · Granja 1996: listo para el jefe',
    apply: (s) => {
      const b = PRESETS[23].apply(s)
      return {
        ...b,
        pos: { x: 11, y: 5 },
        defeated: add(b.defeated, ['farm-past-m1', 'farm-past-m2']),
        keys: { ...b.keys, 'farm-past': 2 },
        opened: add(b.opened, ['past-mystery']),
        seenLesson: add(b.seenLesson, ['farm-past', 'past-did']),
      }
    },
  },
  {
    id: 'past-farm-done',
    label: 'Pasado · Granja 1996: terminada',
    apply: (s) => {
      const b = PRESETS[24].apply(s)
      return {
        ...b,
        screen: 'epilogue',
        defeated: add(b.defeated, ['farm-past-boss']),
        recovered: add(b.recovered, ['past-did']) as GameState['recovered'],
        outfits: add(b.outfits, ['sombrero']),
      }
    },
  },
  {
    id: 'past-cinema-start',
    label: 'Pasado · Cine 1996: recién llegado',
    apply: (s) => {
      const b = PRESETS[25].apply(s)
      return { ...b, screen: 'explore', sceneId: 'office-past', pos: { ...CINEMA_PAST.start }, opened: add(b.opened, ['farm-past-epilogue', 'bus-office-past']) }
    },
  },
  {
    id: 'office-past-boss',
    label: 'Pasado · Cine 1996: listo para el jefe',
    apply: (s) => {
      const b = PRESETS[26].apply(s)
      return {
        ...b,
        pos: { x: 9, y: 11 },
        defeated: add(b.defeated, ['office-past-m1', 'office-past-m2']),
        keys: { ...b.keys, 'office-past': 2 },
        opened: add(b.opened, ['past-timeline']),
        seenLesson: add(b.seenLesson, ['office-past', 'past-time']),
      }
    },
  },
  {
    id: 'past-cinema-done',
    label: 'Pasado · Cine 1996: terminado (final del pasado)',
    apply: (s) => {
      const b = PRESETS[27].apply(s)
      return {
        ...b,
        screen: 'epilogue',
        defeated: add(b.defeated, ['office-past-boss']),
        recovered: add(b.recovered, ['past-time']) as GameState['recovered'],
        outfits: add(b.outfits, ['boina']),
      }
    },
  },
  {
    id: 'future-school-start',
    label: 'Futuro · Escuela 2056: recién llegado',
    apply: (s) => {
      const b = PRESETS[28].apply(s)
      return { ...b, screen: 'explore', sceneId: 'school-future', pos: { ...SCHOOL_FUTURE.start }, opened: add(b.opened, ['office-past-epilogue', 'bus-school-future']) }
    },
  },
  {
    id: 'school-future-boss',
    label: 'Futuro · Escuela 2056: listo para el jefe',
    apply: (s) => {
      const b = PRESETS[29].apply(s)
      return {
        ...b,
        pos: { x: 4, y: 11 },
        defeated: add(b.defeated, ['school-future-m1']),
        keys: { ...b.keys, 'school-future': 1 },
        opened: add(b.opened, ['future-plan']),
        seenLesson: add(b.seenLesson, ['school-future', 'going-to']),
      }
    },
  },
  {
    id: 'future-school-done',
    label: 'Futuro · Escuela 2056: terminada',
    apply: (s) => {
      const b = PRESETS[30].apply(s)
      return {
        ...b,
        screen: 'epilogue',
        defeated: add(b.defeated, ['school-future-boss']),
        recovered: add(b.recovered, ['going-to']) as GameState['recovered'],
        outfits: add(b.outfits, ['traje-plata']),
      }
    },
  },
  {
    id: 'future-city-start',
    label: 'Futuro · Ciudad 2056: recién llegado',
    apply: (s) => {
      const b = PRESETS[31].apply(s)
      return { ...b, screen: 'explore', sceneId: 'city-future', pos: { ...CITY_FUTURE.start }, opened: add(b.opened, ['school-future-epilogue', 'bus-city-future']) }
    },
  },
  {
    id: 'city-future-boss',
    label: 'Futuro · Ciudad 2056: listo para el jefe',
    apply: (s) => {
      const b = PRESETS[32].apply(s)
      return {
        ...b,
        pos: { x: 10, y: 12 },
        defeated: add(b.defeated, ['city-future-m1', 'city-future-m2']),
        keys: { ...b.keys, 'city-future': 2 },
        opened: add(b.opened, ['future-tour']),
        seenLesson: add(b.seenLesson, ['city-future', 'going-to-neg']),
      }
    },
  },
  {
    id: 'future-city-done',
    label: 'Futuro · Ciudad 2056: terminada',
    apply: (s) => {
      const b = PRESETS[33].apply(s)
      return {
        ...b,
        screen: 'epilogue',
        defeated: add(b.defeated, ['city-future-boss']),
        recovered: add(b.recovered, ['going-to-neg']) as GameState['recovered'],
        outfits: add(b.outfits, ['gafas-holo']),
      }
    },
  },
  {
    id: 'future-barrio-start',
    label: 'Futuro · Green Street 2056: recién llegado',
    apply: (s) => {
      const b = PRESETS[34].apply(s)
      return { ...b, screen: 'explore', sceneId: 'barrio-future', pos: { ...BARRIO_FUTURE.start }, opened: add(b.opened, ['city-future-epilogue', 'bus-barrio-future']) }
    },
  },
  {
    id: 'barrio-future-boss',
    label: 'Futuro · Green Street 2056: listo para el jefe',
    apply: (s) => {
      const b = PRESETS[35].apply(s)
      return {
        ...b,
        pos: { x: 12, y: 8 },
        defeated: add(b.defeated, ['barrio-future-m1', 'barrio-future-m2']),
        keys: { ...b.keys, 'barrio-future': 2 },
        opened: add(b.opened, ['future-party']),
        seenLesson: add(b.seenLesson, ['barrio-future', 'going-to-wh']),
      }
    },
  },
  {
    id: 'future-barrio-done',
    label: 'Futuro · Green Street 2056: terminada',
    apply: (s) => {
      const b = PRESETS[36].apply(s)
      return {
        ...b,
        screen: 'epilogue',
        defeated: add(b.defeated, ['barrio-future-boss']),
        recovered: add(b.recovered, ['going-to-wh']) as GameState['recovered'],
        outfits: add(b.outfits, ['chaqueta-60']),
      }
    },
  },
]

/** Marca todas las lecciones como vistas (para no repetirlas al revisar) */
export function skipLessons(s: GameState): GameState {
  return { ...s, seenLesson: add(s.seenLesson, Object.keys(LESSONS)) as GameState['seenLesson'] }
}
