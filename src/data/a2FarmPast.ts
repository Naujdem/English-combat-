import type { GameState, Question, SceneDef, Zone } from '../game/types'
import { A2_05_CLOSE } from './a2Library'

/**
 * A2-06 — A Tradition at Risk (la granja de la familia River). Versión mínima, sin combate.
 * Mapa adaptado de la granja de A1: establo (arriba izquierda), casa familiar (arriba derecha) y plaza (abajo).
 * Orden: Leo (lección past-simple-comparatives + práctica mixta) → el abuelo (casa) → el vecino joven (establo) → el vecino (Dialogue Under Pressure)
 *        → Elena (Reconstruct the Story: descartar lo falso + ordenar lo verdadero) → Elena (diálogo final)
 *        → Elena (cierre: el trozo del estandarte).
 * Se activa al terminar A2-05. Tareas en data/tasks.ts, lección en data/lessons.ts.
 */
const MAP = [
  '################',
  '#yy..y.#K..A..p#',
  '#......#.......#',
  '#y.....#J......#',
  '###d#######d####',
  '#,,,,,,,,,,,,,,#',
  '#,fffff,,,,Y,,,#',
  '#,f,,,f,,ww,,,,#',
  '#,f,,,f,,ww,,Y,#',
  '#,ff,ff,,,,,,,,#',
  '#,,,,,,,,,,,,,,#',
  '#,Y,......,,Y,,#',
  '#,,,......,,,,,#',
  '#,,,......,,Y,,#',
  '#,,,,,,,,,,,,,,#',
  '################',
]

function zoneAt(x: number, y: number): Zone {
  if (y <= 3) return x <= 6 ? 'granero' : x >= 8 ? 'casa-granja' : 'campo'
  if (y >= 11 && y <= 13 && x >= 3 && x <= 9) return 'calle'
  return 'campo'
}

export const A2_FARM_PAST_ID = 'a2-06-farm'
export const A2_06_PRACTICE = 'a2-06-practice'
export const A2_06_GRANDFATHER = 'a2-06-grandfather-talk'
export const A2_06_NEIGHBOR = 'a2-06-neighbor-talk'
export const A2_06_DEBATE = 'a2-06-debate'
export const A2_06_RECONSTRUCT = 'a2-06-reconstruct'
export const A2_06_ORDER = 'a2-06-order'
export const A2_06_ELENA = 'a2-06-elena-talk'
export const A2_06_CLOSE = 'a2-06-close'

/** A2-06 se abre al terminar A2-05 */
export const isA2FarmPastUnlocked = (s: GameState) => s.opened.includes(A2_05_CLOSE)

/** Práctica mixta de Leo (lista fija en data/tasks.ts): ordenar, completar y corregir */
const T = ['a2-farm-past']
export const A2_FARM_PAST_QUESTIONS: Question[] = [
  { id: 'a2-06-p1', topic: 'past-simple-comparatives', kind: 'order', prompt: 'Hace cinco años el abuelo se enfermó.', options: ['Five', 'years', 'ago', 'the', 'grandfather', 'became', 'ill.'], answer: 0, tip: 'Five years ago + sujeto + verbo en pasado: become → became.', tags: T },
  { id: 'a2-06-p2', topic: 'past-simple-comparatives', prompt: 'The neighbor says the race was ___ before.', options: ['more expensive than', 'expensiver than', 'more expensive that'], answer: 0, tip: 'Adjetivo largo: more + adjetivo + than (no "expensiver", no "that").', tags: T },
  { id: 'a2-06-p3', topic: 'past-simple-comparatives', kind: 'fix', prompt: 'The race stoped because the banner was lose.', options: ['The race stopped because the banner was lost.', 'The race stoped because the banner was lost.', 'The race stopped because the banner was lose.'], answer: 0, tip: 'stop → stopped (doble p) · lose → lost (irregular).', tags: T },
]

export const A2_FARM_PAST: SceneDef = {
  id: A2_FARM_PAST_ID,
  name: 'La granja de los River · A2',
  topics: [],
  map: MAP,
  start: { x: 8, y: 14 },
  // Sin combate: no hay puerta de jefe ni llaves
  bossDoor: { x: 0, y: 0 },
  keysNeeded: 0,
  entities: [
    // Leo solo aparece para la lección y la práctica (npcs.ts: until)
    { type: 'npc', id: 'a2-06-leo', x: 9, y: 13 },
    { type: 'npc', id: 'a2-06-elena', x: 6, y: 12 },
    { type: 'npc', id: 'a2-06-grandfather', x: 11, y: 2 },
    { type: 'npc', id: 'a2-06-neighbor', x: 4, y: 2 },
    { type: 'animal', kind: 'horse', x: 4, y: 7 },
    { type: 'animal', kind: 'horse', x: 4, y: 8 },
    { type: 'animal', kind: 'dog', x: 12, y: 14 },
    { type: 'animal', kind: 'chicken', x: 13, y: 10 },
  ],
  labels: [
    { text: 'Stable', x: 3, y: 3 },
    { text: 'Family house', x: 11, y: 3 },
    { text: 'Square', x: 6, y: 13 },
  ],
  zoneAt,
  examine: {
    '9,7': { text: 'The river. Every year the River Race started here.', sub: 'El río. Cada año la River Race empezaba aquí.', say: 'Every year the River Race started here.' },
    '1,1': { text: 'An empty hook on the wall. The family banner was here before.', sub: 'Un gancho vacío en la pared. Antes el estandarte de la familia estaba aquí.', say: 'The family banner was here before.', tone: 'warn' },
  },
  requirements: [],
  chips: (s) => [
    { label: 'A2-06 · A Tradition at Risk', done: s.opened.includes(A2_06_CLOSE) },
    { label: 'Llegada', done: s.seenLesson.includes(A2_FARM_PAST_ID) },
    { label: 'Lección de Leo', done: s.seenLesson.includes('past-simple-comparatives') },
    { label: 'Práctica', done: s.opened.includes(A2_06_PRACTICE) },
    { label: 'Hablar con el abuelo', done: s.opened.includes(A2_06_GRANDFATHER) },
    { label: 'Hablar con el vecino', done: s.opened.includes(A2_06_NEIGHBOR) },
    { label: 'Defender la tradición', done: s.opened.includes(A2_06_DEBATE) },
    { label: 'Reconstruct the Story', done: s.opened.includes(A2_06_ORDER) },
    { label: 'Diálogo final con Elena', done: s.opened.includes(A2_06_ELENA) },
    { label: 'Cierre: el trozo del estandarte', done: s.opened.includes(A2_06_CLOSE) },
  ],
  intro: {
    first: 'Leo te lleva a la granja de la familia River. Elena quiere recuperar una vieja tradición: la River Race. Habla con Leo en la plaza.',
    later: 'La granja de los River en A2. Sigue los objetivos bajo el mapa.',
  },
}
