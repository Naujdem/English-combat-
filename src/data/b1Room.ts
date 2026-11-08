import type { GameState, SceneDef, Zone } from '../game/types'
import type { ScriptLine } from './b1Accident'
import { closeId } from './b1World'

/**
 * B1-07 — The Underworld. Recuerdo 7 (escena b1-07-room; es recuerdo por el prefijo "b1-07-"). Juegas como L (SpriteL);
 * los demás con la cara borrosa (Explore lo hace solo en las escenas de recuerdo). Sin atuendos.
 * Bloque A (este): el cuarto alquilado de L, pequeño y sucio, un año después del incendio.
 *   La televisión (tarea 'b1-07-news': lección 'passive-news' + práctica b1-07-n1…n8, data/questions-b1-07.ts; al final,
 *   el mensaje de la amiga) → el cuaderno del escritorio.
 * Bloque B: el mismo cuaderno, dos tareas encadenadas: página 15 ('b1-07-deduce-now', tema 'deduction') y
 *   página 16 ('b1-07-deduce-past', tema 'deduction-past'), con data/questions-b1-07.ts
 *   → la puerta a la calle: lleva al bajo mundo (bloque C, data/b1Market.ts). Ningún bloque A guarda closeId(7) (se guarda en 7-E).
 */
export const B1_07_ROOM_ID = 'b1-07-room'
/** La tele vieja: su tarea guarda B1_07_NEWS al terminar */
export const B1_07_TV = 'b1-07-tv'
export const B1_07_NEWS = 'b1-07-news'
/** El cuaderno del escritorio: se desbloquea al terminar la tele (bloque B: páginas 15 y 16) */
export const B1_07_NOTEBOOK = 'b1-07-notebook'
export const B1_07_DEDUCE_NOW = 'b1-07-deduce-now'
export const B1_07_DEDUCE_PAST = 'b1-07-deduce-past'
/** Bloque E: el aparato sobre la mesa (aparece al volver de la Escape Room); su tarea es el cierre closeId(7) */
export const B1_07_DEVICE_ROOM = 'b1-07-device-room'
export const B1_07_CLOSE = closeId(7)

/**
 * Un solo cuarto (leyenda de data/b1Words.ts: 5 colchón · K escritorio · W ventana con persianas · d puerta).
 * La tele vieja (8,2), el escritorio con el cuaderno (1,5) y la puerta a la calle (11,3).
 */
const MAP = [
  '############',
  '#5....W....#',
  '#5.........#',
  '#..........d',
  '#..........#',
  '#K.........#',
  '############',
]

const zoneAt = (): Zone => 'casa'

export const B1_07_ROOM: SceneDef = {
  id: B1_07_ROOM_ID,
  name: 'Recuerdo 7 · The Underworld',
  topics: [],
  map: MAP,
  start: { x: 3, y: 3 },
  // Sin jefe en este bloque: la puerta del jefe apunta a un muro y no hace falta ninguna llave
  bossDoor: { x: 0, y: 0 },
  keysNeeded: 0,
  entities: [
    // La tele vieja: la primera tarea
    { type: 'npc', id: B1_07_TV, x: 8, y: 2 },
    // El cuaderno, sobre el escritorio (sus tareas piden terminar la tele: data/tasks.ts, requires)
    { type: 'npc', id: B1_07_NOTEBOOK, x: 2, y: 5 },
    // Bloque E: el aparato, sobre la mesa (npcs.ts, after: 'b1-07-escape')
    { type: 'npc', id: B1_07_DEVICE_ROOM, x: 1, y: 4 },
  ],
  labels: [{ text: 'Cuarto alquilado', x: 6, y: 5 }],
  zoneAt: () => zoneAt(),
  examine: {
    '1,1': { text: 'My mattress.', sub: 'Mi colchón.', say: 'My mattress.' },
    '1,2': { text: 'My mattress.', sub: 'Mi colchón.', say: 'My mattress.' },
    '6,1': { text: 'The blinds are closed.', sub: 'Las persianas están cerradas.', say: 'The blinds are closed.' },
  },
  // La puerta a la calle: cerrada en este bloque (el bajo mundo llega en el bloque 7-C)
  locked: (x, y, s) => {
    if (x !== 11 || y !== 3) return null
    if (!s.opened.includes(B1_07_NEWS)) return { text: 'Todavía no.', sub: 'Primero mira la televisión.' }
    if (!s.opened.includes(B1_07_DEDUCE_PAST)) return { text: 'Todavía no.', sub: 'Primero termina el cuaderno (páginas 15 y 16).' }
    return null
  },
  // Bloque C: la puerta a la calle lleva al bajo mundo (data/b1Market.ts)
  links: { '11,3': { sceneId: 'b1-07-market', pos: { x: 1, y: 3 } } },
  requirements: [],
  chips: (s: GameState) => [
    { label: 'La televisión', done: s.opened.includes(B1_07_NEWS) },
    { label: "Cuaderno: página 15 (must / might / can't)", done: s.opened.includes(B1_07_DEDUCE_NOW) },
    { label: 'Cuaderno: página 16 (deducción en el pasado)', done: s.opened.includes(B1_07_DEDUCE_PAST) },
    // Bloque E: al volver de la Escape Room
    ...(s.opened.includes('b1-07-escape')
      ? [
          { label: 'El aparato', done: s.opened.includes(B1_07_CLOSE) },
          { label: 'Salir del recuerdo', done: s.opened.includes(B1_07_CLOSE) },
        ]
      : []),
  ],
  // Tarjeta de apertura del recuerdo
  intro: {
    first: 'One year after the fire. — Un año después del incendio.',
    later: (s) =>
      s.opened.includes(B1_07_CLOSE)
        ? 'The Underworld. La misión 7 terminó: la misión 8 te espera en el mapa.'
        : 'One year after the fire. — Un año después del incendio.',
  },
}

/** El cierre (secuencia fija, MemoryScript): L narra; 'L' = lo que L escribe */
export const B1_07_CLOSE_SCRIPT: ScriptLine[] = [
  { who: 'narrator', text: '(Back in your room, you put the device on the table. It is small, cold and heavy.)', es: '(De vuelta en tu cuarto, pones el aparato sobre la mesa. Es pequeño, frío y pesado.)' },
  { who: 'narrator', text: "(You see strange symbols on its side. You don't understand them.)", es: '(Ves símbolos extraños en un costado. No los entiendes.)' },
  { who: 'L', text: 'These words are older than English.', es: 'Estas palabras son más antiguas que el inglés.' },
  { who: 'narrator', text: "(Your phone is quiet. Your friend's message is still there: 'Don't do anything stupid, L.')", es: "(Tu teléfono está en silencio. El mensaje de tu amiga sigue ahí: 'No hagas ninguna tontería, L'.)" },
]
