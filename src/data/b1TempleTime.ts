import type { GameState, SceneDef, Zone } from '../game/types'
import type { InscriptionRoom } from '../game/inscriptions'

/**
 * B1-09 — Temples of Stones and Time, bloque C: el Temple of Time (escena b1-09-time; es recuerdo por el prefijo "b1-09-").
 * Una sala circular casi a oscuras, con engranajes enormes en las paredes, una luz roja tenue en el centro, una vitrina de
 * piedra (cerrada) y un muro de inscripciones junto a la puerta. Se llega por la puerta del fondo del Temple of Stones
 * (data/b1TempleStones.ts, links) y se vuelve por la misma puerta.
 *   Las inscripciones del reloj (tarea 'b1-09-time-ins': Inscriptions + práctica b1-09-m1…m8, tema 'passive-modals')
 *   → la vitrina del centro: próximamente el Keeper of Hours (bloque 9-D). Ningún bloque C guarda closeId(9).
 */
export const B1_09_TIME_ID = 'b1-09-time'
export const B1_09_TIME_WALL = 'b1-09-time-wall'
export const B1_09_TIME_INS = 'b1-09-time-ins'
export const B1_09_KEEPER_SOON = 'Próximamente: el Keeper of Hours (bloque 9-D)'

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
  ],
  labels: [{ text: 'Temple of Time', x: 5, y: 5 }],
  zoneAt: () => zoneAt(),
  examine: {
    '1,0': { text: 'Huge gears.', sub: 'Engranajes enormes.', say: 'Huge gears.' },
  },
  // La vitrina del centro: cerrada en este bloque
  locked: (x, y, s) => {
    if (x !== 5 || y !== 3) return null
    if (!s.opened.includes(B1_09_TIME_INS)) return { text: 'Todavía no.', sub: 'Primero despierta las inscripciones del reloj.' }
    return { text: B1_09_KEEPER_SOON, sub: '(En el centro, la vitrina brilla con una luz roja. Algo está despierto.)' }
  },
  links: { '0,3': { sceneId: 'b1-09-stones', pos: { x: 10, y: 3 } } },
  requirements: [],
  chips: (s: GameState) => [
    { label: 'Las inscripciones del reloj', done: s.opened.includes(B1_09_TIME_INS) },
    { label: B1_09_KEEPER_SOON, done: false },
  ],
  intro: {
    first: 'Tick. Tock. Tick. — Tic. Tac. Tic.',
    later: () => 'Tick. Tock. Tick. — Tic. Tac. Tic.',
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
