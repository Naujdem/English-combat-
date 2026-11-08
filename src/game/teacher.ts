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
import { FARM_FUTURE } from '../data/farmFuture'
import { TOWER_FUTURE } from '../data/towerFuture'
import { SCHOOL } from '../data/school'
import { A2_HOSPITAL, A2_ECHO } from '../data/a2Hospital'
import { A2_CITY, A2_03_CLOSE } from '../data/a2City'
import { A2_WORKSHOP, A2_04_CLOSE } from '../data/a2Workshop'
import { A2_LIBRARY, A2_05_CLOSE } from '../data/a2Library'
import { A2_FARM_PAST, A2_06_CLOSE } from '../data/a2FarmPast'
import { A2_RACE, A2_07_CLOSE } from '../data/a2Race'
import { A2_08_CLOSE } from '../data/a2Car'
import { A2_09_CLOSE } from '../data/a2Mill'
import { A2_10_CLOSE } from '../data/a2LeoHouse'
import { A2_11_CLOSE } from '../data/a2Future'
import { A2_12_CLOSE } from '../data/a2Control'
import { A2_RETURN, A2_13_CLOSE } from '../data/a2Return'
import { B1_HOME } from '../data/b1Home'
import { B1_OPENING, closeId } from '../data/b1World'
import { B1_02_LANDED, B1_02_LUMEN, B1_02_PRACTICE } from '../data/b1NewCity'
import { B1_06_ADVERT, B1_06_READ, B1_06_SHELTER } from '../data/b1Shelter'
import { B1_06_KENNELS, B1_06_VOLUNTEER1, B1_06_VOLUNTEER2 } from '../data/b1Kennels'
import { B1_06_OFFICE } from '../data/b1EstebanOffice'
import { B1_04_BOSS, B1_04_FINEPRINT, B1_04_FRIEND, B1_04_PHRASAL, B1_04_RESIDENCE, B1_04_RULES, B1_04_WELCOME } from '../data/b1Residence'
import { B1_05_BANK, B1_05_CHEST, B1_05_FLAT, B1_05_GET_USED_TO, B1_05_JOBS, B1_05_LETTER, B1_05_NOTICE1, B1_05_NOTICE2, B1_05_NOTICE_LETTER, B1_05_USED_TO, B1_05_BOSS } from '../data/b1Flat'
import { B1_05_BANK_SCENE } from '../data/b1Bank'
import { B1_04_JEISON, B1_04_NEIGHBOUR1, B1_04_NEIGHBOUR2, B1_04_REPAIR } from '../data/b1Neighbours'
import { B1_03_DOCTOR, B1_03_HOSPITAL, B1_03_NOTEBOOK, B1_03_NOTEBOOK2, B1_03_STATIC, B1_03_TEXTS, B1_03_UNREAD1, B1_03_UNREAD2, B1_03_UNREAD3 } from '../data/b1Words'
import { B1_02_BOSS, B1_02_JACK, B1_02_LUGGAGE, B1_02_TRAV1, B1_02_TRAV2 } from '../data/b1Airport'
import { B1_02_AGENDA, B1_02_FUTURES, B1_02_ROUTE, B1_02_SHOP } from '../data/b1Office'
import { B1_01_ALARM, B1_01_ECHO, B1_01_MESSAGE, B1_01_PRACTICE, B1_01_SCHOOL, B1_01_TALKED } from '../data/b1Accident'
import { enterMemory, memoryFlag } from './memory'

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
    opened: s.opened.filter((o) => !SCENE_PREFIX.test(o) && !/^(bus-|diary-open-|diary-notified-)/.test(o)),
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
  {
    id: 'future-farm-start',
    label: 'Futuro · Granja 2056: recién llegado',
    apply: (s) => {
      const b = PRESETS[37].apply(s)
      return { ...b, screen: 'explore', sceneId: 'farm-future', pos: { ...FARM_FUTURE.start }, opened: add(b.opened, ['barrio-future-epilogue', 'bus-farm-future']) }
    },
  },
  {
    id: 'farm-future-boss',
    label: 'Futuro · Granja 2056: listo para el jefe',
    apply: (s) => {
      const b = PRESETS[38].apply(s)
      return {
        ...b,
        pos: { x: 11, y: 5 },
        defeated: add(b.defeated, ['farm-future-m1', 'farm-future-m2']),
        keys: { ...b.keys, 'farm-future': 2 },
        opened: add(b.opened, ['future-predict']),
        seenLesson: add(b.seenLesson, ['farm-future', 'going-to-predict']),
      }
    },
  },
  {
    id: 'future-farm-done',
    label: 'Futuro · Granja 2056: terminada',
    apply: (s) => {
      const b = PRESETS[39].apply(s)
      return {
        ...b,
        screen: 'epilogue',
        defeated: add(b.defeated, ['farm-future-boss']),
        recovered: add(b.recovered, ['going-to-predict']) as GameState['recovered'],
        outfits: add(b.outfits, ['overol-solar']),
      }
    },
  },
  {
    id: 'future-tower-start',
    label: 'Futuro · Torre 2056: recién llegado',
    apply: (s) => {
      const b = PRESETS[40].apply(s)
      return { ...b, screen: 'explore', sceneId: 'office-future', pos: { ...TOWER_FUTURE.start }, opened: add(b.opened, ['farm-future-epilogue', 'bus-office-future']) }
    },
  },
  {
    id: 'office-future-boss',
    label: 'Futuro · Torre 2056: listo para el jefe',
    apply: (s) => {
      const b = PRESETS[41].apply(s)
      return {
        ...b,
        pos: { x: 12, y: 5 },
        defeated: add(b.defeated, ['office-future-m1', 'office-future-m2']),
        keys: { ...b.keys, 'office-future': 2 },
        opened: add(b.opened, ['future-speech']),
        seenLesson: add(b.seenLesson, ['office-future', 'want-to']),
      }
    },
  },
  {
    id: 'future-tower-done',
    label: 'Futuro · Torre 2056: terminada (fin de A1)',
    apply: (s) => {
      const b = PRESETS[42].apply(s)
      return {
        ...b,
        screen: 'epilogue',
        defeated: add(b.defeated, ['office-future-boss']),
        recovered: add(b.recovered, ['want-to']) as GameState['recovered'],
        outfits: add(b.outfits, ['traje-2056']),
      }
    },
  },
  {
    id: 'office-future-stranger',
    label: 'Futuro · Torre 2056: combate contra el desconocido',
    apply: (s) => {
      const b = PRESETS[43].apply(s)
      return { ...b, screen: 'battle', battle: { enemyId: 'office-future-stranger', enemyHp: 12, returnTo: { ...b.pos } } }
    },
  },
  {
    id: 'future-tower-stranger-done',
    label: 'Futuro · Torre 2056: después del desconocido (hospital, cierre de A1)',
    apply: (s) => {
      const b = PRESETS[43].apply(s)
      return { ...b, screen: 'epilogue', defeated: add(b.defeated, ['office-future-stranger']) }
    },
  },
]

/**
 * A2: cada atajo parte de A1 terminado (con el final del desconocido), borra el avance de A2
 * y marca como cerradas solo las misiones anteriores, para entrar a la misión elegida desde el principio.
 */
const A1_END = PRESETS.findIndex((p) => p.id === 'future-tower-stranger-done')
function a2Start(s: GameState, scene: { id: string; start: { x: number; y: number } }, opened: string[], defeated: string[]): GameState {
  const b = PRESETS[A1_END].apply(s)
  return {
    ...b,
    screen: 'explore',
    sceneId: scene.id,
    pos: { ...scene.start },
    opened: add(b.opened.filter((o) => !o.startsWith('a2-')), ['office-future-epilogue', ...opened]),
    defeated: add(b.defeated.filter((d) => !d.startsWith('a2-')), defeated),
  }
}

PRESETS.push(
  { id: 'a2-01', label: 'A2-01 · Hospital: inicio de A2', apply: (s) => a2Start(s, A2_HOSPITAL, [], []) },
  { id: 'a2-03', label: 'A2-03 · Ciudad: recién llegado', apply: (s) => a2Start(s, A2_CITY, [], [A2_ECHO]) },
  { id: 'a2-04', label: 'A2-04 · Taller: recién llegado', apply: (s) => a2Start(s, A2_WORKSHOP, [A2_03_CLOSE], [A2_ECHO]) },
  { id: 'a2-05', label: 'A2-05 · Biblioteca: recién llegado', apply: (s) => a2Start(s, A2_LIBRARY, [A2_03_CLOSE, A2_04_CLOSE], [A2_ECHO]) },
  { id: 'a2-06', label: 'A2-06 · Granja River: recién llegado', apply: (s) => a2Start(s, A2_FARM_PAST, [A2_03_CLOSE, A2_04_CLOSE, A2_05_CLOSE], [A2_ECHO]) },
  { id: 'a2-07', label: 'A2-07 · Hipódromo: recién llegado', apply: (s) => a2Start(s, A2_RACE, [A2_03_CLOSE, A2_04_CLOSE, A2_05_CLOSE, A2_06_CLOSE], [A2_ECHO]) },
)

/**
 * B1: cada atajo parte de A2 terminado (todas las misiones principales cerradas, incluido A2_13_CLOSE),
 * borra el avance de B1 y deja al jugador en el mapa, en la pestaña B1.
 * done = ids de B1 que se marcan como hechos (la apertura y los cierres de las misiones anteriores).
 */
const A2_DONE = [A2_03_CLOSE, A2_04_CLOSE, A2_05_CLOSE, A2_06_CLOSE, A2_07_CLOSE, A2_08_CLOSE, A2_09_CLOSE, A2_10_CLOSE, A2_11_CLOSE, A2_12_CLOSE, A2_13_CLOSE]
function b1Start(s: GameState, done: string[]): GameState {
  const b = a2Start(s, A2_RETURN, A2_DONE, [A2_ECHO])
  return {
    ...b,
    screen: 'world',
    sceneId: B1_HOME.id,
    pos: { ...B1_HOME.start },
    battle: null,
    memory: undefined,
    opened: add(b.opened.filter((o) => !o.startsWith('b1-')), done),
    defeated: b.defeated.filter((d) => !d.startsWith('b1-')),
    // A2 terminado: su lección de when / while ya se vio. Las lecciones de B1 vuelven a salir
    seenLesson: add(b.seenLesson.filter((t) => t !== 'cause-effect' && t !== 'emergencies'), ['past-simple-continuous']) as GameState['seenLesson'],
  }
}

/**
 * Atajos de la misión B1-1 (The Accident) para el panel del profe. Parten de "B1: abrir el nodo 1".
 *  memory: entra al recuerdo · alarm: el amigo ya habló (la secuencia sigue en la alarma) · call: ya sonó la alarma (Call for Help)
 *  epilogue: ya despertaste en tu cuarto · echo: listo para el Smoke Echo (mensaje, lección y práctica hechos)
 */
export function b1Mission1(s: GameState, stage: 'memory' | 'alarm' | 'call' | 'epilogue' | 'echo'): GameState {
  const b = b1Start(s, [B1_OPENING])
  const home = { ...b, sceneId: B1_HOME.id, pos: { ...B1_HOME.start } }
  if (stage === 'memory' || stage === 'alarm' || stage === 'call') {
    const flags = stage === 'memory' ? [] : stage === 'alarm' ? [B1_01_TALKED] : [B1_01_TALKED, B1_01_ALARM]
    const m = enterMemory(home, 1, B1_01_SCHOOL.id, stage === 'memory' ? B1_01_SCHOOL.start : { x: 7, y: 2 })
    return { ...m, opened: add(m.opened, flags) }
  }
  const epi = { ...home, screen: 'explore' as const, pos: { x: 6, y: 4 }, opened: add(home.opened, [memoryFlag(1)]) }
  if (stage === 'epilogue') return epi
  return { ...epi, pos: { x: 7, y: 4 }, opened: add(epi.opened, [B1_01_MESSAGE, B1_01_PRACTICE]), seenLesson: add(epi.seenLesson, ['cause-effect']) as GameState['seenLesson'], defeated: epi.defeated.filter((d) => d !== B1_01_ECHO) }
}

/**
 * Atajos de la misión B1-2 (A New City) para el panel del profe. Parten de "B1: abrir el nodo 2".
 *  plane: empieza en el avión (la charla sale al entrar) · airport: ya aterrizó, en el aeropuerto junto a la puerta del avión
 *  trav1: lección y práctica de Leo hechas (viajero 1 junto a la cinta) · luggage: viajeros vencidos (empleado de Objetos Perdidos)
 *  jack: Lost Luggage hecho (Jack junto a las puertas de la derecha)
 *  shop: Jack vencido (frente a la tienda) · office: tienda hecha (frente a la oficina) · route: oficina hecha (frente a la calle)
 *  boss: Route Challenge hecho (Captain Delay al final de la calle) · close: jefe vencido (Leo en la calle, listo para el cierre)
 */
export function b1Mission2(s: GameState, stage: 'plane' | 'airport' | 'trav1' | 'luggage' | 'jack' | 'shop' | 'office' | 'route' | 'boss' | 'close'): GameState {
  const b = b1Start(s, [B1_OPENING, closeId(1)])
  const lumen = { ...b, screen: 'explore' as const, sceneId: B1_02_LUMEN.id, pos: { ...B1_02_LUMEN.start } }
  if (stage === 'plane') return lumen
  const air = { ...lumen, pos: { x: 6, y: 2 }, opened: add(lumen.opened, [B1_02_LANDED]) }
  if (stage === 'airport') return air
  const t1 = { ...air, pos: { x: 13, y: 5 }, opened: add(air.opened, [B1_02_PRACTICE]), seenLesson: add(air.seenLesson, ['pp-yet-already']) as GameState['seenLesson'] }
  if (stage === 'trav1') return t1
  const lug = { ...t1, pos: { x: 14, y: 6 }, defeated: add(t1.defeated, [B1_02_TRAV1, B1_02_TRAV2]) }
  if (stage === 'luggage') return lug
  const jack = { ...lug, pos: { x: 14, y: 3 }, opened: add(lug.opened, [B1_02_LUGGAGE]) }
  if (stage === 'jack') return jack
  const shop = { ...jack, pos: { x: 15, y: 1 }, defeated: add(jack.defeated, [B1_02_JACK]) }
  if (stage === 'shop') return shop
  const office = { ...shop, pos: { x: 15, y: 4 }, opened: add(shop.opened, [B1_02_SHOP]) }
  if (stage === 'office') return office
  const route = { ...office, pos: { x: 15, y: 7 }, opened: add(office.opened, [B1_02_AGENDA, B1_02_FUTURES]), seenLesson: add(office.seenLesson, ['futures-b1']) as GameState['seenLesson'] }
  if (stage === 'route') return route
  const boss = { ...route, pos: { x: 21, y: 7 }, opened: add(route.opened, [B1_02_ROUTE]) }
  if (stage === 'boss') return boss
  return { ...boss, pos: { x: 18, y: 7 }, defeated: add(boss.defeated, [B1_02_BOSS]) }
}

/**
 * Atajos de la misión B1-3 (Words on a Screen, recuerdo) para el panel del profe. Parten de "B1: abrir el nodo 3".
 *  memory: entra al recuerdo (habitación del hospital) · notebook: ya hablaste con la médica (junto al cuaderno del apartamento)
 *  texts: página 1 hecha (junto al teléfono, Text Only) · notebook2: Text Only hecho (junto al cuaderno de la página 2)
 *  unread: página 2 hecha (primer Unread Message) · static: los 3 Unread Messages vencidos (The Static) · close: jefe vencido (teléfono del cierre)
 */
export function b1Mission3(s: GameState, stage: 'memory' | 'notebook' | 'texts' | 'notebook2' | 'unread' | 'static' | 'close'): GameState {
  const b = b1Start(s, [B1_OPENING, closeId(1), closeId(2)])
  // Las lecciones del cuaderno vuelven a salir
  const present = { ...b, sceneId: B1_02_LUMEN.id, pos: { x: 18, y: 7 }, seenLesson: b.seenLesson.filter((t) => t !== 'informal-messages' && t !== 'present-perfect-cont') }
  const pos = { memory: B1_03_HOSPITAL.start, notebook: { x: 15, y: 3 }, texts: { x: 17, y: 2 }, notebook2: { x: 15, y: 3 }, unread: { x: 17, y: 3 }, static: { x: 15, y: 2 }, close: { x: 17, y: 3 } }[stage]
  const m = enterMemory(present, 3, B1_03_HOSPITAL.id, pos)
  const all = [B1_03_DOCTOR, B1_03_NOTEBOOK, B1_03_TEXTS, B1_03_NOTEBOOK2]
  const flags = { memory: [], notebook: [B1_03_DOCTOR], texts: [B1_03_DOCTOR, B1_03_NOTEBOOK], notebook2: [B1_03_DOCTOR, B1_03_NOTEBOOK, B1_03_TEXTS], unread: all, static: all, close: all }[stage]
  const beaten = { static: [B1_03_UNREAD1, B1_03_UNREAD2, B1_03_UNREAD3], close: [B1_03_UNREAD1, B1_03_UNREAD2, B1_03_UNREAD3, B1_03_STATIC] }[stage as 'static' | 'close'] ?? []
  const lessons = stage === 'texts' || stage === 'notebook2' ? ['informal-messages'] : stage === 'unread' || stage === 'static' || stage === 'close' ? ['informal-messages', 'present-perfect-cont'] : []
  return { ...m, opened: add(m.opened, flags), defeated: add(m.defeated, beaten), seenLesson: add(m.seenLesson, lessons) as GameState['seenLesson'] }
}

/**
 * Atajos de la misión B1-4 (House Rules) para el panel del profe. Parten de "B1: abrir el nodo 4".
 *  start: entra a la residencia (frente al mostrador de Marisol) · lesson: ya hablaste con Marisol (junto a Maya, la lección sale de nuevo)
 *  fineprint: lección y práctica de Maya hechas (junto a Maya, listo para The Fine Print)
 *  jeison: The Fine Print hecho (en el pasillo, junto a Jeison) · neighbours: Jeison hecho (vecino 1 en el pasillo)
 *  repair: los dos vecinos vencidos (frente a tu cuarto, listo para el Repair Shop)
 *  bank: Repair Shop hecho (en el banco, frente a Ricardo) · phrasal: ya hablaste con Ricardo (junto a Maya; la lección sale de nuevo)
 *  boss: todo lo anterior hecho (en el vestíbulo, frente a Mr. Fine Print) · maya: jefe vencido (junto a Maya, la charla sale al hablarle)
 *  close: charla con Maya hecha (frente al mostrador de Marisol, listo para el cierre)
 */
export function b1Mission4(s: GameState, stage: 'start' | 'lesson' | 'fineprint' | 'jeison' | 'neighbours' | 'repair' | 'bank' | 'phrasal' | 'boss' | 'maya' | 'close'): GameState {
  const b = b1Start(s, [B1_OPENING, closeId(1), closeId(2), closeId(3)])
  const home = { ...b, screen: 'explore' as const, sceneId: B1_04_RESIDENCE.id, pos: { ...B1_04_RESIDENCE.start }, seenLesson: b.seenLesson.filter((t) => t !== 'obligation-b1') }
  if (stage === 'start') return home
  const lesson = { ...home, pos: { x: 4, y: 5 }, opened: add(home.opened, [B1_04_WELCOME]) }
  if (stage === 'lesson') return lesson
  const fine = { ...lesson, opened: add(lesson.opened, [B1_04_RULES]), seenLesson: add(lesson.seenLesson, ['obligation-b1']) as GameState['seenLesson'] }
  if (stage === 'fineprint') return fine
  const jeison = { ...fine, pos: { x: 11, y: 3 }, opened: add(fine.opened, [B1_04_FINEPRINT]) }
  if (stage === 'jeison') return jeison
  const nb = { ...jeison, pos: { x: 11, y: 4 }, opened: add(jeison.opened, [B1_04_JEISON]), defeated: jeison.defeated.filter((d) => d !== B1_04_NEIGHBOUR1 && d !== B1_04_NEIGHBOUR2) }
  if (stage === 'neighbours') return nb
  const rep = { ...nb, pos: { x: 14, y: 3 }, defeated: add(nb.defeated, [B1_04_NEIGHBOUR1, B1_04_NEIGHBOUR2]) }
  if (stage === 'repair') return rep
  const bank = { ...rep, pos: { x: 24, y: 2 }, opened: add(rep.opened, [B1_04_REPAIR]), seenLesson: rep.seenLesson.filter((t) => t !== 'bank-phrasal') }
  if (stage === 'bank') return bank
  const phr = { ...bank, pos: { x: 25, y: 5 }, opened: add(bank.opened, ['b1-04-ricardo']) }
  if (stage === 'phrasal') return phr
  // La charla de Maya y el cierre (y su animación de fragmentos) vuelven a salir
  const boss = {
    ...phr,
    pos: { x: 6, y: 4 },
    opened: add(phr.opened, [B1_04_PHRASAL]).filter((o) => o !== B1_04_FRIEND && o !== 'b1-04-close' && o !== 'b1-04-fragments'),
    seenLesson: add(phr.seenLesson, ['bank-phrasal']) as GameState['seenLesson'],
    defeated: phr.defeated.filter((d) => d !== B1_04_BOSS),
  }
  if (stage === 'boss') return boss
  const maya = { ...boss, pos: { x: 4, y: 5 }, defeated: add(boss.defeated, [B1_04_BOSS]) }
  if (stage === 'maya') return maya
  return { ...maya, pos: { x: 5, y: 4 }, opened: add(maya.opened, [B1_04_FRIEND]) }
}

/**
 * Atajos de la misión B1-5 (Nothing Left, recuerdo) para el panel del profe. Parten de "B1: abrir el nodo 5".
 *  letter: entra al recuerdo (el apartamento de L, frente al director) · notebook: carta hecha (junto al cuaderno; la lección sale de nuevo)
 *  jobs: página 12 hecha (junto al periódico y el computador, listo para los anuncios)
 *  bank: anuncios hechos (en el banco, frente al banquero) · notebook2: banco hecho (junto al cuaderno; la página 13 sale de nuevo)
 *  chest: página 13 hecha (junto a las cajas, listo para el Memory Chest)
 *  notice: Memory Chest hecho (junto a la carta bajo la puerta) · evictions: carta leída (los 2 Eviction Notice, frente al primero)
 *  boss: los 2 avisos vencidos (frente a The Collector) · close: jefe vencido (junto a tu caja, listo para el cierre)
 */
export function b1Mission5(s: GameState, stage: 'letter' | 'notebook' | 'jobs' | 'bank' | 'notebook2' | 'chest' | 'notice' | 'evictions' | 'boss' | 'close'): GameState {
  const b = b1Start(s, [B1_OPENING, closeId(1), closeId(2), closeId(3), closeId(4)])
  const present = { ...b, sceneId: B1_04_RESIDENCE.id, pos: { ...B1_04_RESIDENCE.start }, recovered: b.recovered.filter((t) => t !== 'used-to' && t !== 'get-used-to' && t !== 'jobs-b1'), seenLesson: b.seenLesson.filter((t) => t !== 'used-to' && t !== 'get-used-to'), opened: b.opened.filter((o) => !o.startsWith('b1-05-')) }
  const pos = { letter: { x: 9, y: 2 }, notebook: { x: 5, y: 4 }, jobs: { x: 3, y: 5 }, bank: { x: 4, y: 3 }, notebook2: { x: 5, y: 4 }, chest: { x: 7, y: 5 }, notice: { x: 10, y: 3 }, evictions: { x: 8, y: 3 }, boss: { x: 9, y: 3 }, close: { x: 8, y: 4 } }[stage]
  const m = enterMemory(present, 5, stage === 'bank' ? B1_05_BANK_SCENE.id : B1_05_FLAT.id, pos)
  const a = [B1_05_LETTER, B1_05_USED_TO, B1_05_JOBS]
  const flags = { letter: [], notebook: [B1_05_LETTER], jobs: [B1_05_LETTER, B1_05_USED_TO], bank: a, notebook2: [...a, B1_05_BANK], chest: [...a, B1_05_BANK, B1_05_GET_USED_TO], notice: [...a, B1_05_BANK, B1_05_GET_USED_TO, B1_05_CHEST], evictions: [...a, B1_05_BANK, B1_05_GET_USED_TO, B1_05_CHEST, B1_05_NOTICE_LETTER], boss: [...a, B1_05_BANK, B1_05_GET_USED_TO, B1_05_CHEST, B1_05_NOTICE_LETTER], close: [...a, B1_05_BANK, B1_05_GET_USED_TO, B1_05_CHEST, B1_05_NOTICE_LETTER] }[stage]
  const lessons = stage === 'letter' || stage === 'notebook' ? [] : stage === 'chest' || stage === 'notice' || stage === 'evictions' || stage === 'boss' || stage === 'close' ? ['used-to', 'get-used-to'] : ['used-to']
  return { ...m, opened: add(m.opened, flags), defeated: add(m.defeated.filter((d) => d !== B1_05_NOTICE1 && d !== B1_05_NOTICE2 && d !== B1_05_BOSS), stage === 'boss' ? [B1_05_NOTICE1, B1_05_NOTICE2] : stage === 'close' ? [B1_05_NOTICE1, B1_05_NOTICE2, B1_05_BOSS] : []), seenLesson: add(m.seenLesson, lessons) as GameState['seenLesson'] }
}

/**
 * Atajos de la misión B1-6 (First Job, presente) para el panel del profe. Parten de "B1: abrir el nodo 6".
 *  lesson: en el refugio, frente a Ms. Haddad (la lección sale de nuevo) · board: lección hecha (junto al tablón)
 *  apply: tablón hecho (junto a la mesa de postulación) · nayi / dogs: bloque B, en las jaulas (ver abajo)
 */
export function b1Mission6(s: GameState, stage: 'lesson' | 'board' | 'apply' | 'nayi' | 'dogs' | 'experience' | 'volunteers' | 'interview' | 'boss' | 'leo' | 'close'): GameState {
  const b = b1Start(s, [B1_OPENING, closeId(1), closeId(2), closeId(3), closeId(4), closeId(5)])
  const home = { ...b, screen: 'explore' as const, sceneId: B1_06_SHELTER.id, pos: { x: 6, y: 3 }, opened: b.opened.filter((o) => !o.startsWith('b1-06-')), seenLesson: b.seenLesson.filter((t) => t !== 'work-english') }
  if (stage === 'lesson') return home
  const board = { ...home, pos: { x: 8, y: 2 }, opened: add(home.opened, [B1_06_ADVERT]), seenLesson: add(home.seenLesson, ['work-english']) as GameState['seenLesson'] }
  if (stage === 'board') return board
  const apply = { ...board, pos: { x: 8, y: 3 }, opened: add(board.opened, [B1_06_READ]) }
  if (stage === 'apply') return apply
  // Bloque B: en las jaulas. nayi: frente a Nayi (la lección sale de nuevo) · dogs: lección hecha (junto al tablero de pedidos)
  const nayi = { ...apply, sceneId: B1_06_KENNELS.id, pos: { x: 5, y: 3 }, opened: add(apply.opened, ['b1-06-apply']), seenLesson: apply.seenLesson.filter((t) => t !== 'relative-clauses') }
  if (stage === 'nayi') return nayi
  const dogs = { ...nayi, pos: { x: 9, y: 3 }, opened: add(nayi.opened, ['b1-06-nayi']), seenLesson: add(nayi.seenLesson, ['relative-clauses']) as GameState['seenLesson'] }
  if (stage === 'dogs') return dogs
  // Bloque C. experience: frente a Nayi (la lección sale de nuevo) · volunteers: frente al primer voluntario · interview: en la oficina, frente a Esteban
  const vol = [B1_06_VOLUNTEER1, B1_06_VOLUNTEER2]
  const exp = { ...dogs, pos: { x: 5, y: 3 }, opened: add(dogs.opened, ['b1-06-dogs']), defeated: dogs.defeated.filter((d) => !vol.includes(d)), seenLesson: dogs.seenLesson.filter((t) => t !== 'experience-b1') }
  if (stage === 'experience') return exp
  const volunteers = { ...exp, pos: { x: 6, y: 4 }, opened: add(exp.opened, ['b1-06-experience']), seenLesson: add(exp.seenLesson, ['experience-b1']) as GameState['seenLesson'] }
  if (stage === 'volunteers') return volunteers
  // La charla de Leo, el cierre y su animación de fragmentos vuelven a salir
  const interview = {
    ...volunteers,
    sceneId: B1_06_OFFICE.id,
    pos: { x: 3, y: 3 },
    defeated: add(volunteers.defeated, vol).filter((d) => d !== 'b1-06-boss'),
    opened: volunteers.opened.filter((o) => o !== 'b1-06-interview' && o !== 'b1-06-friend' && o !== 'b1-06-close' && o !== 'b1-06-fragments'),
  }
  if (stage === 'interview') return interview
  // Bloque D. boss: entrevista hecha (frente a The Interviewer) · leo: jefe vencido (junto a Leo) · close: charla hecha (frente a Esteban)
  const boss = { ...interview, opened: add(interview.opened, ['b1-06-interview']) }
  if (stage === 'boss') return boss
  const leo = { ...boss, pos: { x: 5, y: 3 }, defeated: add(boss.defeated, ['b1-06-boss']) }
  if (stage === 'leo') return leo
  return { ...leo, pos: { x: 3, y: 3 }, opened: add(leo.opened, ['b1-06-friend']) }
}

PRESETS.push(
  { id: 'b1-start', label: 'B1: inicio (A2 completo, sin apertura)', apply: (s) => b1Start(s, []) },
  { id: 'b1-opened', label: 'B1: después de la apertura', apply: (s) => b1Start(s, [B1_OPENING]) },
  ...Array.from({ length: 14 }, (_, k) => {
    const n = k + 1
    return {
      id: `b1-node-${n}`,
      label: `B1: abrir el nodo ${n}`,
      apply: (s: GameState) => b1Start(s, [B1_OPENING, ...Array.from({ length: n - 1 }, (_, j) => closeId(j + 1))]),
    }
  }),
)

/** Marca todas las lecciones como vistas (para no repetirlas al revisar) */
export function skipLessons(s: GameState): GameState {
  return { ...s, seenLesson: add(s.seenLesson, Object.keys(LESSONS)) as GameState['seenLesson'] }
}
