import type { EnemyDef, GameState, SceneDef, Zone } from '../game/types'
import type { ScriptLine } from './b1Accident'
import { closeId } from './b1World'
import type { InscriptionRoom } from '../game/inscriptions'

/**
 * B1-09 — Temples of Stones and Time, bloque C: el Temple of Time (escena b1-09-time; es recuerdo por el prefijo "b1-09-").
 * Una sala circular casi a oscuras, con engranajes enormes en las paredes, una luz roja tenue en el centro, una vitrina de
 * piedra (cerrada) y un muro de inscripciones junto a la puerta. Se llega por la puerta del fondo del Temple of Stones
 * (data/b1TempleStones.ts, links) y se vuelve por la misma puerta.
 *   Las inscripciones del reloj (tarea 'b1-09-time-ins': Inscriptions + práctica b1-09-m1…m8, tema 'passive-modals')
 *   → (bloque D) el jefe Keeper of Hours, delante de la vitrina → la vitrina se abre: "El reloj" (tarea 'b1-09-close',
 *   el cierre closeId(9): se sale del recuerdo y se abre el nodo 10).
 */
export const B1_09_TIME_ID = 'b1-09-time'
export const B1_09_TIME_WALL = 'b1-09-time-wall'
export const B1_09_TIME_INS = 'b1-09-time-ins'
/** Bloque D: el jefe Keeper of Hours (aparece al terminar las inscripciones) y el reloj (al vencerlo; su tarea es el cierre closeId(9)) */
export const B1_09_BOSS = 'b1-09-boss'
export const B1_09_CLOCK = 'b1-09-clock'
export const B1_09_CLOSE = closeId(9)
/** Tarjeta de las escenas del recuerdo 9 cuando la misión ya terminó */
export const B1_09_DONE_TEXT = 'Temples of Stones and Time. La misión 9 terminó: la misión 10 te espera en el mapa.'

/**
 * Leyenda de components/Tiles.tsx: # muro · @ engranajes en las paredes · d puerta · F la vitrina de piedra del centro.
 * La puerta de vuelta al Temple of Stones (0,3), las inscripciones junto a la puerta (2,2) y la vitrina (5,3).
 */
const MAP = [
  '#@#@###@#@#',
  '#.........#',
  '@.........@',
  'd....F....#',
  '@.........@',
  '#.........#',
  '#@#@###@#@#',
]

/** Se reutiliza el piso oscuro del pasillo de noche (sala casi a oscuras) */
const zoneAt = (): Zone => 'pasillo-noche'

export const B1_09_TIME: SceneDef = {
  id: B1_09_TIME_ID,
  name: 'Recuerdo 9 · Temple of Time',
  topics: [],
  map: MAP,
  start: { x: 1, y: 3 },
  bossDoor: { x: 0, y: 0 },
  keysNeeded: 0,
  entities: [
    // Las inscripciones del reloj, junto a la puerta: lo único desbloqueado al inicio
    { type: 'npc', id: B1_09_TIME_WALL, x: 2, y: 2 },
    // Bloque D: el jefe, delante de la vitrina (al terminar las inscripciones); al vencerlo, el reloj (npcs.ts, after)
    { type: 'enemy', id: B1_09_BOSS, x: 4, y: 3, after: B1_09_TIME_INS },
    { type: 'npc', id: B1_09_CLOCK, x: 5, y: 2 },
  ],
  labels: [{ text: 'Temple of Time', x: 5, y: 5 }],
  zoneAt: () => zoneAt(),
  examine: {
    '1,0': { text: 'Huge gears.', sub: 'Engranajes enormes.', say: 'Huge gears.' },
  },
  // La vitrina del centro: cerrada hasta vencer al Keeper of Hours; después se abre y aparece el reloj
  locked: (x, y, s) => {
    if (x !== 5 || y !== 3) return null
    if (!s.opened.includes(B1_09_TIME_INS)) return { text: 'Todavía no.', sub: 'Primero despierta las inscripciones del reloj.' }
    if (!s.defeated.includes(B1_09_BOSS)) return { text: 'Todavía no.', sub: 'Primero vence al Keeper of Hours.' }
    return null
  },
  links: { '0,3': { sceneId: 'b1-09-stones', pos: { x: 10, y: 3 } } },
  requirements: [],
  chips: (s: GameState) => [
    { label: 'Las inscripciones del reloj', done: s.opened.includes(B1_09_TIME_INS) },
    { label: 'El Keeper of Hours', done: s.defeated.includes(B1_09_BOSS) },
    { label: 'El reloj', done: s.opened.includes(B1_09_CLOSE) },
  ],
  intro: {
    first: 'Tick. Tock. Tick. — Tic. Tac. Tic.',
    later: (s) => (s.opened.includes(B1_09_CLOSE) ? B1_09_DONE_TEXT : 'Tick. Tock. Tick. — Tic. Tac. Tic.'),
  },
}

/** Las inscripciones del reloj (Inscriptions, modelo de The Wall of Stones) */
export const B1_09_CLOCK_ROOM: InscriptionRoom = {
  title: 'The Clock Door',
  intro: { en: 'The door of the clock is covered with glyphs. Build each sentence to wake the gears.', es: 'La puerta del reloj está cubierta de glifos. Arma cada frase para despertar los engranajes.' },
  scene: 'door',
  plates: [
    {
      words: ['The clock', 'must be', 'kept', 'in the dark'],
      roles: ['subject', 'aux', 'participle', 'complement'],
      es: 'El reloj debe mantenerse en la oscuridad.',
      rule: {
        title: 'La pasiva con modales',
        text: 'Modal + be + participio: must be kept, can be opened. Después del modal, be no cambia.',
        examples: ['The clock must be kept.', 'The clock can be seen.'],
      },
      hint: 'must be + participio.',
      distractors: [{ text: 'must', role: 'aux' }],
      effect: 'Una aguja se mueve.',
    },
    {
      words: ['It', "can't be", 'opened', 'by force'],
      roles: ['subject', 'aux', 'participle', 'agent'],
      es: 'No puede ser abierto por la fuerza.',
      rule: {
        title: 'Imposible y prohibido',
        text: "can't be + participio = es imposible; mustn't be + participio = está prohibido.",
        examples: ["It can't be opened.", "It mustn't be touched."],
      },
      hint: "can't be + opened.",
      distractors: [{ text: "can't", role: 'aux' }],
      effect: 'Dos engranajes giran.',
    },
    {
      words: ['The hands', 'should be', 'turned', 'slowly'],
      roles: ['subject', 'aux', 'participle', 'complement'],
      es: 'Las agujas deben girarse despacio.',
      rule: {
        title: 'Recomendación',
        text: 'should be + participio = se recomienda; must be + participio = es obligatorio.',
        examples: ['The hands should be turned slowly.', 'The hands must be turned slowly.'],
      },
      hint: 'should be + participio.',
      distractors: [{ text: 'turn', role: 'participle' }],
      effect: 'El muro vibra.',
    },
    {
      words: ['The clock', 'could be', 'damaged', 'by the water'],
      roles: ['subject', 'aux', 'participle', 'agent'],
      es: 'El reloj podría ser dañado por el agua.',
      rule: {
        title: 'Posibilidad',
        text: 'could be / might be + participio = quizá pasa.',
        examples: ['The clock could be damaged.', 'It might be broken.'],
      },
      hint: 'could be + participio.',
      distractors: [{ text: 'could', role: 'aux' }],
      effect: 'Los engranajes aceleran.',
    },
    {
      words: ['The clock', 'must have been', 'made', 'by the ancient people'],
      roles: ['subject', 'aux', 'participle', 'agent'],
      es: 'El reloj debe de haber sido hecho por el pueblo antiguo.',
      rule: {
        title: 'Deducción en el pasado',
        text: "must have been + participio = seguro que fue hecho. También: can't have been + participio = es imposible que haya sido.",
        examples: ['The clock must have been made long ago.', "It can't have been broken."],
      },
      hint: 'must have been + participio.',
      distractors: [{ text: 'must be', role: 'aux' }],
      effect: 'Toda la puerta se ilumina.',
    },
  ],
  finish: { en: 'The gears are awake. The clock is waiting in the dark.', es: 'Los engranajes despertaron. El reloj espera en la oscuridad.', banner: '¡Engranajes despiertos!' },
}

// ── Bloque D · jefe Keeper of Hours (2 fases; modelo The Broker de 7-D). Sin reward: en los recuerdos no se ganan atuendos ──
export const B1_09_BOSS_ENEMIES: Record<string, EnemyDef> = {
  [B1_09_BOSS]: {
    id: B1_09_BOSS,
    name: 'Keeper of Hours',
    person: 'Keeper of Hours',
    kind: 'boss',
    hp: 8,
    topics: ['passive-all', 'passive-modals'],
    kinds: ['fix', 'fill', 'order', 'listen'],
    tags: ['b1-09-boss'],
    phases: [
      {
        hp: 4,
        title: 'Todas las formas',
        topics: ['passive-all'],
        kinds: ['fix', 'fill', 'order', 'listen'],
        tags: ['b1-09-boss-a'],
        line: { text: 'The clock was keep here! The door has opened by me!', es: 'was keep y has opened: mal.' },
      },
      {
        hp: 4,
        title: 'Con modales',
        topics: ['passive-modals'],
        kinds: ['fix', 'fill', 'order', 'listen'],
        tags: ['b1-09-boss-m'],
        line: { text: "It must kept in the dark! It can't opened by force!", es: "must kept y can't opened: mal." },
      },
    ],
    onlyTags: true,
    zone: 'pasillo-noche',
    look: { shirt: '#3a2f1f', hair: '#b8b2a6', skin: '#c9b79a' },
    before: [{ text: 'The clock was keep by me! It must kept in the dark! Nobody can opened it!', es: 'was keep, must kept y can opened: mal.' }],
    after: [{ text: 'The hours stop for a moment... the clock is yours.', es: 'Las horas se detienen un momento... el reloj es tuyo.' }],
    freed: { text: 'It must be used carefully. Time is not forgiven.', es: 'Debe usarse con cuidado. El tiempo no se perdona.' },
    farewell: { q: "The Keeper says: 'It must be used carefully.' What do you answer?", options: ['I understand. It will used carefully.', 'I understand. It will be used carefully.', 'I understand. It will be use carefully.'], answer: 1, tip: 'Pasiva en futuro: will be + participio.' },
  },
}

/** El cierre (secuencia fija, MemoryScript): L narra; 'L' = lo que L escribe en su cuaderno */
export const B1_09_CLOSE_SCRIPT: ScriptLine[] = [
  { who: 'narrator', text: '(The glass case opens. Inside, the clock is whole, and it shines.)', es: '(La vitrina se abre. Adentro, el reloj está completo y brilla.)' },
  { who: 'L', text: "I know what it is. But I don't know how the device works yet.", es: 'Sé qué es. Pero todavía no sé cómo funciona el aparato.' },
  { who: 'narrator', text: '(You put the clock next to the device. Both start to hum.)', es: '(Pones el reloj junto al aparato. Los dos empiezan a zumbar.)' },
  { who: 'L', text: 'With this... I can go back.', es: 'Con esto... puedo volver.' },
]
