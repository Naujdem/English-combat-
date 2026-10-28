import type { EnemyDef, SceneDef, Zone } from '../game/types'

/**
 * Mapa de la escuela. Cada letra es una casilla de 1x1:
 *  #  pared          W  ventana         B  pizarra
 *  .  piso           d  puerta abierta  X  puerta del jefe (se abre con llaves)
 *  D  pupitre+silla  T  inodoro         S  lavamanos
 *  K  mesa redonda   V  máquina         L  estantería
 *  p  planta         M  escritorio del profesor
 * Para crear otro escenario basta con escribir otra tabla como esta.
 */
const MAP = [
  '##BBB######',
  'W.....#TTS#',
  'W.D.D.d...#',
  '#.....#...#',
  'W.D.D.#####',
  'W.....#KKV#',
  '#.D.D.d...#',
  'W.....#...#',
  'W.D.D.#####',
  '#.....#LLL#',
  'W.....d...#',
  '#.....#...#',
  '####X######',
  '#p....MMMp#',
  'W.........W',
  '###########',
]

function zoneAt(x: number, y: number): Zone {
  if (y >= 13) return 'sala'
  if (x >= 7 && y <= 3) return 'bano'
  if (x >= 7 && y >= 5 && y <= 7) return 'cafeteria'
  if (x >= 7 && y >= 9) return 'biblioteca'
  return 'aula'
}

export const SCHOOL: SceneDef = {
  id: 'school',
  name: 'La escuela',
  topic: 'to-be',
  map: MAP,
  start: { x: 3, y: 11 },
  bossDoor: { x: 4, y: 12 },
  keysNeeded: 3,
  entities: [
    { type: 'friend', id: 'leo', x: 1, y: 3 },
    { type: 'friend', id: 'maya', x: 7, y: 7 },
    { type: 'interest', x: 9, y: 11 },
    { type: 'enemy', id: 'school-m1', x: 4, y: 9 },
    { type: 'enemy', id: 'school-m2', x: 8, y: 2 },
    { type: 'enemy', id: 'school-m3', x: 9, y: 6 },
    { type: 'chest', id: 'school-chest', outfit: 'naranja', x: 7, y: 11 },
    { type: 'boss', id: 'school-boss', x: 7, y: 14 },
  ],
  labels: [
    { text: 'Aula', x: 3, y: 7 },
    { text: 'Baño', x: 8, y: 3 },
    { text: 'Cafetería', x: 8, y: 7 },
    { text: 'Biblioteca', x: 8, y: 10 },
    { text: 'Sala de profesores', x: 3, y: 14 },
  ],
  zoneAt,
}

export const ENEMIES: Record<string, EnemyDef> = {
  'school-m1': {
    id: 'school-m1',
    name: 'Estudiante burlón',
    kind: 'minion',
    hp: 2,
    topic: 'to-be',
    look: { shirt: '#c0504d', hair: '#2b5c3a', skin: '#e0ac69', accessory: 'cap' },
    intro: '"Ha! You can\'t talk? Answer this!"',
  },
  'school-m2': {
    id: 'school-m2',
    name: 'Estudiante tramposo',
    kind: 'minion',
    hp: 2,
    topic: 'to-be',
    look: { shirt: '#7a4fa3', hair: '#1f1f1f', skin: '#c68642' },
    intro: '"This is MY bathroom. Prove you are smart!"',
  },
  'school-m3': {
    id: 'school-m3',
    name: 'Estudiante glotón',
    kind: 'minion',
    hp: 3,
    topic: 'to-be',
    look: { shirt: '#d9822b', hair: '#6b3b1f', skin: '#f1c27d', accessory: 'cap' },
    intro: '"No food for you... unless you answer!"',
  },
  'school-boss': {
    id: 'school-boss',
    name: 'Profesor Grimm',
    kind: 'boss',
    hp: 5,
    topic: 'to-be',
    look: { shirt: '#5a4a7a', hair: '#9a9a9a', skin: '#c68642', accessory: 'mortarboard' },
    intro: '"So you want your words back? Show me you know the verb TO BE!"',
  },
}

export const OUTFITS: Record<string, { name: string; color: string }> = {
  base: { name: 'Camiseta azul', color: '#3b6fb6' },
  naranja: { name: 'Camiseta naranja', color: '#e07b39' },
  capa: { name: 'Capa del tiempo', color: '#2f5d50' },
}
