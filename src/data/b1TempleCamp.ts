import type { ScriptLine } from './b1Accident'
import type { GameState, SceneDef, Zone } from '../game/types'
import { closeId } from './b1World'
import { B1_13_DONE_TEXT } from './b1SchoolMorning'

/**
 * B1-13 — The Price. Bloque C: fuera del templo (escena b1-13-camp; es recuerdo por el prefijo "b1-13-").
 * El exterior del templo, de noche, con una fogata pequeña. Se llega por la puerta del fondo de la sala del Keeper
 * (data/b1EchoHall.ts) después de la revelación del precio ('b1-13-keeper-done').
 *   La página 63 (b1-13-page63: tema 'although-unless-b1' + b1-13-u1…u8) → el diario de L (b1-13-journal, script)
 *   → la mujer junto al fuego (b1-13-woman-talk, debate de 3 turnos) → el reloj (b1-13-decision, script)
 *   → la puerta derecha: la ventana de 2056 (bloque 13-D, data/b1Window2056.ts). Ningún bloque C guarda closeId(13).
 * La mujer no tiene nombre ("A woman") y se ve con la cara borrosa (filtro de recuerdo).
 */
export const B1_13_CAMP_ID = 'b1-13-camp'
export const B1_13_PAGE63 = 'b1-13-page63'
export const B1_13_JOURNAL = 'b1-13-journal'
export const B1_13_WOMAN = 'b1-13-woman'
export const B1_13_WOMAN_TALK = 'b1-13-woman-talk'
export const B1_13_CAMP_CLOCK = 'b1-13-camp-clock'
export const B1_13_DECISION = 'b1-13-decision'

/** El diario viejo bajo la piedra (secuencia fija, MemoryScript); 'L' = lo que L escribió */
export const B1_13_JOURNAL_SCRIPT: ScriptLine[] = [
  { who: 'narrator', text: '(Under the stone, an old journal. The pages are wet. You open it.)', es: '(Bajo la piedra, un diario viejo. Las páginas están mojadas. Lo abres.)' },
  { who: 'L', text: "He didn't shout. He didn't help.", es: 'No gritó. No ayudó.' },
  { who: 'L', text: 'He lived a full life... and I lost everything.', es: 'Él vivió una vida plena... y yo lo perdí todo.' },
  { who: 'L', text: "Although he was my friend, he didn't help me.", es: 'Aunque era mi amigo, no me ayudó.' },
  { who: 'L', text: "Unless I take his voice, I'll never speak again.", es: 'A menos que le quite la voz, nunca volveré a hablar.' },
  { who: 'L', text: "I'll take the clock in case something goes wrong.", es: 'Llevaré el reloj por si algo sale mal.' },
]

/** La decisión junto al reloj (secuencia fija, MemoryScript) */
export const B1_13_DECISION_SCRIPT: ScriptLine[] = [
  { who: 'narrator', text: "(The woman is gone. She didn't say goodbye. The fire is almost out.)", es: '(La mujer ya no está. No dijo adiós. La fogata casi se apaga.)' },
  { who: 'L', text: 'I will go back to the day we met.', es: 'Volveré al día en que nos conocimos.' },
  { who: 'L', text: 'Then we will never be friends. And his voice will be mine.', es: 'Entonces nunca seremos amigos. Y su voz será mía.' },
  { who: 'narrator', text: '(You take the clock and the device. Your hands are steady now.)', es: '(Tomas el reloj y el aparato. Tus manos ya no tiemblan.)' },
  { who: 'narrator', text: '(You turn the crown. Light, and then a window.)', es: '(Giras la corona. Luz, y luego una ventana.)' },
]

const NOT_YET = { text: 'Todavía no.', sub: 'Todavía no has tomado tu decisión.' }
const FIRE = { text: 'A small fire.', sub: 'Una fogata pequeña.', say: 'A small fire.' }

/**
 * Leyenda (data/b1Valley.ts, components/Tiles.tsx): Y árbol · , pasto · _ camino de piedra · d puerta.
 * No hay tile de fogata: la fogata es el anillo de piedra 'o' (5,2) con un examine de texto.
 * La puerta de vuelta a la sala del Keeper (0,3), la página 63 (2,4), el diario (4,2), la mujer (7,3),
 * el reloj (9,5) y la puerta derecha (11,3).
 */
const MAP = [
  'YYYYYYYYYYYY',
  'Y,,,,,,,,,,Y',
  'Y,,,,o,,,,,Y',
  'd__________d',
  'Y,,,,,,,,,,Y',
  'Y,,,,,,,,,,Y',
  'YYYYYYYYYYYY',
]

/** Un exterior de noche, como el Temple of Echoes */
const zoneAt = (): Zone => 'patio-viejo'

export const B1_13_CAMP: SceneDef = {
  id: B1_13_CAMP_ID,
  name: 'Recuerdo 13 · Fuera del templo',
  topics: [],
  map: MAP,
  start: { x: 1, y: 3 },
  bossDoor: { x: 0, y: 0 },
  keysNeeded: 0,
  entities: [
    // La página 63 sobre una roca, cerca de la entrada: la primera tarea
    { type: 'npc', id: B1_13_PAGE63, x: 2, y: 4 },
    // El diario viejo y mojado bajo una piedra, junto a la fogata (pide la página 63)
    { type: 'npc', id: B1_13_JOURNAL, x: 4, y: 2 },
    // Una mujer mayor junto al fuego (sin nombre; pide el diario)
    { type: 'npc', id: B1_13_WOMAN, x: 7, y: 3 },
    // El reloj de L sobre una manta, cerca de la salida derecha (pide la conversación con la mujer)
    { type: 'npc', id: B1_13_CAMP_CLOCK, x: 9, y: 5 },
  ],
  labels: [{ text: 'Outside the temple', x: 6, y: 5 }],
  zoneAt: () => zoneAt(),
  examine: { '5,2': FIRE },
  // La puerta derecha: cerrada hasta la decisión; después lleva a la ventana de 2056 (bloque 13-D, data/b1Window2056.ts)
  locked: (x, y, s) => (x === 11 && y === 3 && !s.opened.includes(B1_13_DECISION) ? NOT_YET : null),
  // La puerta de la izquierda vuelve a la sala del Keeper
  links: { '0,3': { sceneId: 'b1-13-hall', pos: { x: 10, y: 3 } }, '11,3': { sceneId: 'b1-13-window', pos: { x: 1, y: 3 } } },
  requirements: [],
  chips: (s: GameState) => [
    { label: 'El cuaderno de L: página 63', done: s.opened.includes(B1_13_PAGE63) },
    { label: 'El diario de L', done: s.opened.includes(B1_13_JOURNAL) },
    { label: 'La mujer', done: s.opened.includes(B1_13_WOMAN_TALK) },
    { label: 'El reloj', done: s.opened.includes(B1_13_DECISION) },
  ],
  intro: {
    first: 'Outside the temple, the night is cold. — Fuera del templo, la noche es fría.',
    later: (s) => (s.opened.includes(closeId(13)) ? B1_13_DONE_TEXT : 'Outside the temple, the night is cold. — Fuera del templo, la noche es fría.'),
  },
}
