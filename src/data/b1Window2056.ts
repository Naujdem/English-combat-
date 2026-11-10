import type { ScriptLine } from './b1Accident'
import { closeId } from './b1World'
import { B1_13_DONE_TEXT } from './b1SchoolMorning'
import type { GameState, SceneDef, Zone } from '../game/types'
import type { FuturePlannerContent } from '../components/FuturePlanner'

/**
 * B1-13 — The Price. Bloque D: el patio de una escuela en 2056, al anochecer (escena b1-13-window; recuerdo por el prefijo).
 * Se llega por la puerta derecha de fuera del templo (data/b1TempleCamp.ts) después de la decisión ('b1-13-decision').
 * No hay vuelta atrás (sin puerta a la izquierda).
 *   La ventana iluminada del aula (b1-13-window-view, script) → la banca con la hoja (b1-13-planner: Future Planner con el plan de L)
 *   → la puerta derecha lleva a Greenfield School, a la mañana siguiente (data/b1SchoolMorning.ts), donde se cierra el recuerdo.
 */
export const B1_13_WINDOW_ID = 'b1-13-window'
export const B1_13_WINDOW_NPC = 'b1-13-window'
export const B1_13_WINDOW_VIEW = 'b1-13-window-view'
export const B1_13_BENCH = 'b1-13-bench'
export const B1_13_PLANNER = 'b1-13-planner'

/** Lo que se ve por la ventana (secuencia fija, MemoryScript). El nombre del profesor suena a estática */
export const B1_13_WINDOW_SCRIPT: ScriptLine[] = [
  { who: 'narrator', text: '(Through the window, a classroom full of students. A teacher is writing on the board.)', es: '(Por la ventana se ve un salón lleno de estudiantes. Un profesor escribe en el pizarrón.)' },
  { who: 'narrator', text: '(His name sounds like static: Mr. ▒▒▒.)', es: '(Su nombre suena a estática: Mr. ▒▒▒.)' },
  { who: 'narrator', text: 'Mr. ▒▒▒: Be brave. Use your voice.', es: 'Mr. ▒▒▒: Sean valientes. Usen su voz.' },
  { who: 'narrator', text: '(The students smile. They speak. They are not afraid.)', es: '(Los estudiantes sonríen. Hablan. No tienen miedo.)' },
  { who: 'narrator', text: '(You stay silent for a moment.)', es: '(Te quedas en silencio un momento.)' },
]

/** El plan de L en el Future Planner (components/FuturePlanner.tsx, prop content) */
export const B1_13_PLANNER_CONTENT: FuturePlannerContent = {
  title: "Tomorrow's plan",
  intro: 'L escribe su plan para mañana. Mira el tablero y completa cada frase con la forma correcta del futuro.',
  headers: ['Plan', 'Where', 'Time', 'Status'],
  colors: { PLAN: '#f2c230', 'PLAN OK': '#7ee08a', WAITING: '#7fe0ff', SILENT: '#ff8a8a' },
  rows: [
    { who: 'The student', to: 'Greenfield School', time: '8:00', status: 'PLAN' },
    { who: 'The window', to: 'Classroom', time: '8:00', status: 'WAITING' },
    { who: 'The voice', to: 'My machine', time: '8:10', status: 'PLAN' },
    { who: 'The words', to: 'My clock', time: '8:15', status: 'PLAN' },
    { who: 'The trip', to: 'My time', time: '8:30', status: 'PLAN' },
  ],
  rounds: [
    { who: 'L', row: 0, q: 'Tomorrow a new student ___ arrive at Greenfield School.', es: 'Mañana un estudiante nuevo va a llegar a la escuela Greenfield.', options: ['is going to', 'will to', 'is going'], answer: 0, tip: 'Un plan ya decidido: is going to + verbo.', set: { status: 'PLAN OK' } },
    { who: 'L', row: 1, q: "At 8 o'clock I ___ by the window.", es: 'A las 8 estaré parado junto a la ventana.', options: ['will standing', 'will be standing', 'am will stand'], answer: 1, tip: 'En progreso a las 8: will be + -ing.', set: { status: 'PLAN OK' } },
    { who: 'L', row: 2, q: "I ___ take the student's voice.", es: 'Voy a llevarme la voz del estudiante.', options: ['going to', 'will to', 'am going to'], answer: 2, tip: 'Mi plan: am going to + verbo.', set: { status: 'PLAN OK' } },
    { who: 'L', row: 3, q: 'My machine ___ keep the words inside my clock.', es: 'Mi máquina va a guardar las palabras dentro de mi reloj.', options: ['is going to', 'are going to', 'is go to'], answer: 0, tip: 'is going to + verbo.', set: { status: 'PLAN OK' } },
    { who: 'L', row: 4, q: 'Then I ___ travel back to my time.', es: 'Luego voy a viajar de vuelta a mi tiempo.', options: ['am going to', 'am going', 'will to'], answer: 0, tip: 'am going to + verbo.', set: { status: 'PLAN OK' } },
    { who: 'L', row: 0, q: 'Tomorrow the student ___ be silent.', es: 'Mañana el estudiante va a quedarse sin voz.', options: ['is going', 'is going to', 'are going to'], answer: 1, tip: 'is going to + verbo.', set: { status: 'SILENT' } },
    { who: 'L', row: 2, q: 'And nobody ___ help!', es: '¡Y nadie va a ayudar!', options: ['are going to', 'is going to', 'going to'], answer: 1, tip: 'nobody + is going to.' },
    { who: 'L', row: 4, q: 'This time, I ___ win.', es: 'Esta vez, voy a ganar yo.', options: ['am going', 'will to', 'am going to'], answer: 2, tip: 'am going to + verbo.' },
  ],
  finish: 'El plan está escrito. El viento se lleva la hoja y la deja junto a la ventana.',
}

const NOT_YET = { text: 'Todavía no.', sub: 'Todavía falta escribir tu plan.' }
const LIGHT = { text: 'Light in one window.', sub: 'Luz en una sola ventana.', say: 'Light in one window.' }

/**
 * Leyenda de components/Tiles.tsx (escuela): # pared · W ventana · , pasto · _ piedra · d puerta · p planta.
 * La ventana iluminada del aula (5,0) es la entidad 'b1-13-window' (se dibuja el tile W); la banca con la hoja (7,5);
 * la puerta derecha (11,3). Sin puerta a la izquierda.
 */
const MAP = [
  '#W#W#W#W#W##',
  '#,,,,,,,,,,#',
  '#,,,,,,,,,,#',
  '#__________d',
  '#,,,,,,,,,,#',
  '#,p,,,,,,p,#',
  '############',
]

/** El patio de la escuela */
const zoneAt = (): Zone => 'patio'

export const B1_13_WINDOW: SceneDef = {
  id: B1_13_WINDOW_ID,
  name: 'Recuerdo 13 · 2056, la ventana',
  topics: [],
  map: MAP,
  start: { x: 1, y: 3 },
  bossDoor: { x: 0, y: 0 },
  keysNeeded: 0,
  entities: [
    // La ventana iluminada del aula: la primera tarea (se dibuja solo el tile W, como la alarma de 11-B)
    { type: 'npc', id: B1_13_WINDOW_NPC, x: 5, y: 0 },
    // La banca con una hoja de papel y una pluma (pide haber mirado por la ventana)
    { type: 'npc', id: B1_13_BENCH, x: 7, y: 5 },
  ],
  labels: [{ text: '2056', x: 5, y: 5 }],
  zoneAt: () => zoneAt(),
  examine: { '4,0': LIGHT, '6,0': LIGHT },
  // La puerta derecha: cerrada hasta escribir el plan; después lleva a la escuela a la mañana siguiente
  locked: (x, y, s) => (x === 11 && y === 3 && !s.opened.includes(B1_13_PLANNER) ? NOT_YET : null),
  links: { '11,3': { sceneId: 'b1-13-school', pos: { x: 1, y: 3 } } },
  requirements: [],
  chips: (s: GameState) => [
    { label: 'La ventana del aula', done: s.opened.includes(B1_13_WINDOW_VIEW) },
    { label: 'El plan de L', done: s.opened.includes(B1_13_PLANNER) },
    { label: 'La escuela', done: s.opened.includes(closeId(13)) },
  ],
  intro: {
    first: 'Many years earlier. 2056. — Muchos años antes. 2056.',
    later: (s) => (s.opened.includes(closeId(13)) ? B1_13_DONE_TEXT : 'Many years earlier. 2056. — Muchos años antes. 2056.'),
  },
}
