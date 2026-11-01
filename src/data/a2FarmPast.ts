import type { EnemyDef, GameState, Question, SceneDef, Zone } from '../game/types'
import { A2_05_CLOSE } from './a2Library'

/**
 * A2-06 — A Tradition at Risk (la granja de la familia River).
 * Mapa adaptado de la granja de A1: establo (arriba izquierda), casa familiar (arriba derecha) y plaza (abajo).
 * Orden: Leo (lección past-simple-comparatives + práctica mixta) → el ayudante corrompido (esbirro en la puerta de la casa) → el abuelo (casa) → el vecino joven (establo) → el vecino (Dialogue Under Pressure)
 *        → Elena (Reconstruct the Story: descartar lo falso + ordenar lo verdadero) → Elena (diálogo final)
 *        → el eco de la carrera (junto al río, 2 fases cortas) → Elena (cierre: el trozo del estandarte).
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
/** Esbirro ligero: el ayudante corrompido bloquea la puerta de la casa familiar tras la práctica de Leo */
export const A2_06_HELPER = 'a2-06-helper'
/** Eco final: aparece junto al río tras el diálogo final con Elena, antes del cierre con el estandarte */
export const A2_06_ECHO = 'a2-06-race-echo'

/** A2-06 se abre al terminar A2-05 */
export const isA2FarmPastUnlocked = (s: GameState) => s.opened.includes(A2_05_CLOSE)

/** Práctica mixta de Leo (lista fija en data/tasks.ts): ordenar, completar y corregir */
const T = ['a2-farm-past']
export const A2_FARM_PAST_QUESTIONS: Question[] = [
  { id: 'a2-06-p1', topic: 'past-simple-comparatives', kind: 'order', prompt: 'Hace cinco años el abuelo se enfermó.', options: ['Five', 'years', 'ago', 'the', 'grandfather', 'became', 'ill.'], answer: 0, tip: 'Five years ago + sujeto + verbo en pasado: become → became.', tags: T },
  { id: 'a2-06-p2', topic: 'past-simple-comparatives', prompt: 'The neighbor says the race was ___ before.', options: ['more expensive than', 'expensiver than', 'more expensive that'], answer: 0, tip: 'Adjetivo largo: more + adjetivo + than (no "expensiver", no "that").', tags: T },
  { id: 'a2-06-p3', topic: 'past-simple-comparatives', kind: 'fix', prompt: 'The race stoped because the banner was lose.', options: ['The race stopped because the banner was lost.', 'The race stoped because the banner was lost.', 'The race stopped because the banner was lose.'], answer: 0, tip: 'stop → stopped (doble p) · lose → lost (irregular).', tags: T },
]

export const A2_FARM_PAST_ENEMIES: Record<string, EnemyDef> = {
  // Esbirro ligero (1 fase): aparece tras la práctica de Leo en la única entrada a la casa familiar (donde está el abuelo).
  // Es un eco: al vencerlo vuelve a su tiempo y da un escudo.
  [A2_06_HELPER]: {
    id: A2_06_HELPER,
    name: 'El ayudante corrompido',
    person: 'Mr. Ortiz',
    kind: 'minion',
    echo: true,
    hp: 5,
    topics: ['past-simple-comparatives'],
    kinds: ['fill', 'fix', 'order'],
    tags: ['a2-farm-helper'],
    onlyTags: true,
    zone: 'campo',
    look: { shirt: '#8a6a3a', hair: '#3a2a1a', skin: '#c9b8d8', accessory: 'cap', gender: 'male' },
    before: [
      { text: 'Stop! Yesterday I feeded the horses and I carryed the water. I worked more hard than everybody!', es: '¡Alto! Ayer "alimenté" a los caballos y "cargué" el agua. ¡Trabajé "más duro" que todos! (Todo mal: feeded, carryed, more hard).' },
      { text: 'The house is more far than you think. Nobody goed in today!', es: 'La casa está "más lejos" de lo que crees. ¡Nadie "entró" hoy! (more far y goed: mal).' },
    ],
    after: [
      { text: 'I fed... I carried... I worked harder. Oh. My words are OK again.', es: 'Alimenté... cargué... trabajé más duro. Oh. Mis palabras están bien otra vez.' },
      { text: 'Yesterday I saw a strange light near the river. I touched it, and then everything was strange.', es: 'Ayer vi una luz extraña cerca del río. La toqué y después todo fue extraño.' },
    ],
    freed: { text: 'I help the grandfather with the horses. He is in the family house. Go in!', es: 'Ayudo al abuelo con los caballos. Está en la casa familiar. ¡Entra!' },
    bonus: { q: 'Before you go! The grandfather was ___ yesterday than last week.', options: ['better', 'gooder', 'more good'], answer: 0, tip: 'good es irregular: good → better (nunca "gooder" ni "more good").' },
  },
  // Eco final (2 fases cortas): el eco de la última River Race aparece junto al río tras el diálogo final con Elena.
  // No libera fragmento: el capítulo cierra con el trozo del estandarte. Al vencerlo da un escudo (echo).
  [A2_06_ECHO]: {
    id: A2_06_ECHO,
    name: 'El eco de la carrera',
    person: 'The Race Echo',
    kind: 'minion',
    echo: true,
    hp: 6,
    topics: ['past-simple-comparatives'],
    kinds: ['fill', 'fix', 'order'],
    tags: ['a2-farm-echo'],
    // Fase 1: Past Simple de la carrera · Fase 2: comparativos
    phases: [
      { hp: 3, title: 'Past Simple', topics: ['past-simple-comparatives'], kinds: ['fill', 'fix', 'order'], tags: ['a2-farm-echo-past'] },
      {
        hp: 3,
        title: 'Comparatives',
        topics: ['past-simple-comparatives'],
        kinds: ['fill', 'fix', 'order'],
        tags: ['a2-farm-echo-comp'],
        line: { text: 'OK, OK! But my horse was more fast and more strong than all the horses!', es: '¡Vale, vale! ¡Pero mi caballo era "más rápido" y "más fuerte" que todos los caballos! (Ahora usa mal los comparativos: more fast, more strong).' },
      },
    ],
    onlyTags: true,
    zone: 'campo',
    look: { shirt: '#2a2440', hair: '#14101f', skin: '#c9b8d8', accessory: 'cap' },
    before: [
      { text: 'I am the last River Race. I winned it! Then everybody forgetted me.', es: 'Soy la última River Race. ¡Yo la "gané"! Después todos me "olvidaron". (Lo dice mal: winned, forgetted).' },
      { text: 'The race stoped forever. You can not bring it back!', es: 'La carrera se "detuvo" para siempre. ¡No puedes recuperarla! (stoped: mal).' },
    ],
    after: [
      { text: 'I won... they forgot... the race stopped. But it was not forever.', es: 'Gané... olvidaron... la carrera se detuvo. Pero no fue para siempre.' },
      { text: 'The water of the river is calmer now. The echo goes back to the past.', es: 'El agua del río está más tranquila ahora. El eco vuelve al pasado.' },
    ],
    freed: { text: 'The river is quiet again. Elena is waiting for you in the square.', es: 'El río está tranquilo otra vez. Elena te espera en la plaza.' },
    farewell: {
      q: 'Elena: Are you OK? What happened by the river?',
      options: ['A strange echo stopped me, but I won.', 'A strange echo stoped me, but I winned.', 'A strange echo stop me, but I win.'],
      answer: 0,
      tip: 'stop → stopped (doble p) · win → won (irregular).',
    },
  },
}

export const A2_FARM_PAST: SceneDef = {
  id: A2_FARM_PAST_ID,
  name: 'La granja de los River · A2',
  topics: [],
  map: MAP,
  start: { x: 8, y: 14 },
  // Sin jefe: el esbirro y el eco aparecen en el mapa según el avance, sin puerta ni llaves
  bossDoor: { x: 0, y: 0 },
  keysNeeded: 0,
  entities: [
    // Leo solo aparece para la lección y la práctica (npcs.ts: until)
    { type: 'npc', id: 'a2-06-leo', x: 9, y: 13 },
    { type: 'npc', id: 'a2-06-elena', x: 6, y: 12 },
    { type: 'npc', id: 'a2-06-grandfather', x: 11, y: 2 },
    { type: 'npc', id: 'a2-06-neighbor', x: 4, y: 2 },
    // El ayudante corrompido bloquea la única entrada a la casa familiar tras la práctica de Leo
    { type: 'enemy', id: A2_06_HELPER, x: 11, y: 5, after: A2_06_PRACTICE },
    // El eco de la carrera aparece junto al río (donde empezaba la River Race) tras el diálogo final con Elena
    { type: 'enemy', id: A2_06_ECHO, x: 8, y: 7, after: A2_06_ELENA },
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
    { label: 'El ayudante', done: s.defeated.includes(A2_06_HELPER) },
    { label: 'Hablar con el abuelo', done: s.opened.includes(A2_06_GRANDFATHER) },
    { label: 'Hablar con el vecino', done: s.opened.includes(A2_06_NEIGHBOR) },
    { label: 'Defender la tradición', done: s.opened.includes(A2_06_DEBATE) },
    { label: 'Reconstruct the Story', done: s.opened.includes(A2_06_ORDER) },
    { label: 'Diálogo final con Elena', done: s.opened.includes(A2_06_ELENA) },
    { label: 'El eco de la carrera', done: s.defeated.includes(A2_06_ECHO) },
    { label: 'Cierre: el trozo del estandarte', done: s.opened.includes(A2_06_CLOSE) },
  ],
  intro: {
    first: 'Leo te lleva a la granja de la familia River. Elena quiere recuperar una vieja tradición: la River Race. Habla con Leo en la plaza.',
    later: 'La granja de los River en A2. Sigue los objetivos bajo el mapa.',
  },
}
