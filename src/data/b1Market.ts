import type { EnemyDef, GameState, SceneDef, Zone } from '../game/types'
import type { ReconstructItem } from '../components/Reconstruct'

/**
 * B1-07 — The Underworld, bloque C: el bajo mundo (escena b1-07-market; es recuerdo por el prefijo "b1-07-").
 * Un mercado negro subterráneo, oscuro, con luces moradas, puestos tapados con lonas y una puerta roja al fondo.
 * Se llega por la puerta a la calle del cuarto de L (data/b1Room.ts, links) y se vuelve por la misma puerta.
 *   El informante (tarea 'b1-07-informant': página 17 del Cuaderno de L, relativos + práctica b1-07-r1…r8)
 *   → la rendija de la trastienda (tarea 'b1-07-detective': Detective = components/Reconstruct.tsx)
 *   → el guardia (esbirro b1-07-guard, delante de la puerta roja)
 *   → la puerta roja: "Próximamente: The Broker (bloque 7-D)". Ningún bloque C guarda closeId(7) (se guarda en 7-E).
 */
export const B1_07_MARKET_ID = 'b1-07-market'
export const B1_07_INFORMANT = 'b1-07-informant'
/** La rendija de la trastienda: su tarea (el Detective) guarda B1_07_DETECTIVE */
export const B1_07_CRACK = 'b1-07-crack'
export const B1_07_DETECTIVE = 'b1-07-detective'
export const B1_07_GUARD = 'b1-07-guard'

/**
 * Un pasillo de puestos (leyenda de components/Tiles.tsx: m puesto de mercado · d puerta).
 * La puerta de vuelta al cuarto (0,3) y la puerta roja al fondo (13,3).
 */
const MAP = [
  '##############',
  '#m...m...m...#',
  '#............#',
  'd............d',
  '#............#',
  '#m...m...m...#',
  '##############',
]

/** Se reutiliza el piso oscuro del pasillo de noche */
const zoneAt = (): Zone => 'pasillo-noche'

export const B1_07_MARKET: SceneDef = {
  id: B1_07_MARKET_ID,
  name: 'Recuerdo 7 · El bajo mundo',
  topics: [],
  map: MAP,
  start: { x: 1, y: 3 },
  // Sin jefe en este bloque: la puerta del jefe apunta a un muro y no hace falta ninguna llave
  bossDoor: { x: 0, y: 0 },
  keysNeeded: 0,
  entities: [
    { type: 'npc', id: B1_07_INFORMANT, x: 3, y: 2 },
    // La rendija: sus tareas piden terminar al informante (data/tasks.ts, requires)
    { type: 'npc', id: B1_07_CRACK, x: 9, y: 4 },
    // El guardia aparece al terminar el Detective, delante de la puerta roja
    { type: 'enemy', id: B1_07_GUARD, x: 12, y: 3, after: B1_07_DETECTIVE },
  ],
  labels: [{ text: 'Bajo mundo', x: 7, y: 5 }],
  zoneAt: () => zoneAt(),
  // La puerta roja: cerrada hasta vencer al guardia; después, el bloque 7-D
  locked: (x, y, s) => {
    if (x !== 13 || y !== 3) return null
    if (!s.defeated.includes(B1_07_GUARD)) return { text: 'Todavía no.', sub: s.opened.includes(B1_07_DETECTIVE) ? 'Primero vence al guardia.' : 'Primero habla con el informante y mira por la rendija.' }
    return { text: 'Todavía no.', sub: 'Próximamente: The Broker (bloque 7-D).' }
  },
  links: { '0,3': { sceneId: 'b1-07-room', pos: { x: 10, y: 3 } } },
  requirements: [],
  chips: (s: GameState) => [
    { label: 'El informante', done: s.opened.includes(B1_07_INFORMANT) },
    { label: 'La rendija de la trastienda (Detective)', done: s.opened.includes(B1_07_DETECTIVE) },
    { label: 'El guardia', done: s.defeated.includes(B1_07_GUARD) },
    { label: 'Próximamente: The Broker (bloque 7-D)', done: false },
  ],
  intro: {
    first: 'The Underworld. — El bajo mundo.',
    later: 'The Underworld. — El bajo mundo.',
  },
}

/** El Detective de la trastienda (Reconstruct, modo 'choose'; la opción 0 es la verdadera) */
export const B1_07_DETECTIVE_CONTENT: { title: string; intro: { en: string; es: string }; items: ReconstructItem[] } = {
  title: 'The Back Room',
  intro: { en: "Through the crack you see the vendor's room. Compare the clues with the notes.", es: 'Por la rendija ves el cuarto del vendedor. Compara las pistas con las notas.' },
  items: [
    {
      source: 'Informant',
      clue: { en: 'The box is empty. I opened it myself.', es: 'La caja está vacía. Yo misma la abrí.' },
      claim: { en: 'The device must be in the box.', es: 'El aparato debe estar en la caja.' },
      options: ["The device can't be in the box.", 'The device must be in the box.', "The device can't is in the box."],
      answer: 0,
      tip: "Está vacía: es imposible, can't be.",
      mode: 'choose',
    },
    {
      source: 'Informant',
      clue: { en: 'The desk drawer has a new lock, and the vendor looks nervous when we pass it.', es: 'El cajón del escritorio tiene un candado nuevo y el vendedor se pone nervioso cuando pasamos.' },
      claim: { en: "The device can't be in the desk.", es: 'El aparato no puede estar en el escritorio.' },
      options: ['The device might be in the desk.', "The device can't be in the desk.", 'The device might in the desk.'],
      answer: 0,
      tip: 'Hay una sospecha, no una prueba: might be.',
      mode: 'choose',
    },
    {
      source: 'Floor marks',
      clue: { en: 'There are marks on the floor in front of the shelf.', es: 'Hay marcas en el piso frente al estante.' },
      claim: { en: "Somebody can't have moved the shelf.", es: 'Es imposible que alguien haya movido el estante.' },
      options: ['Somebody must have moved the shelf.', "Somebody can't have moved the shelf.", 'Somebody must has moved the shelf.'],
      answer: 0,
      tip: 'Hay una prueba del pasado: must have + participio.',
      mode: 'choose',
    },
    {
      source: 'Guard',
      clue: { en: 'The vendor was in the front room all night. Everyone saw him.', es: 'El vendedor estuvo en el cuarto de adelante toda la noche. Todos lo vieron.' },
      claim: { en: 'He must have hidden it last night.', es: 'Debe de haberlo escondido anoche.' },
      options: ["He can't have hidden it last night.", 'He must have hidden it last night.', "He can't has hidden it last night."],
      answer: 0,
      tip: "Estaba en otro cuarto: can't have + participio.",
      mode: 'choose',
    },
    {
      source: 'Your notes',
      clue: { en: 'The box is empty, nobody opened the desk, and the marks lead to the shelf.', es: 'La caja está vacía, nadie abrió el escritorio y las marcas llevan al estante.' },
      claim: { en: 'It might be under the floor.', es: 'Quizá esté bajo el piso.' },
      options: ['It must be behind the shelf.', 'It might be under the floor.', 'It must is behind the shelf.'],
      answer: 0,
      tip: 'Todas las pistas llevan al estante: must be.',
      mode: 'choose',
    },
  ],
}

// ── Esbirro: el guardia del vendedor (modelo de los Eviction Notice de 5-C). Sin atuendos (es un recuerdo) ──
export const B1_07_ENEMIES: Record<string, EnemyDef> = {
  [B1_07_GUARD]: {
    id: B1_07_GUARD,
    name: "The Broker's Guard",
    person: 'Guard',
    kind: 'minion',
    echo: true,
    hp: 5,
    topics: ['deduction', 'deduction-past'],
    kinds: ['fix', 'fill', 'order', 'listen'],
    tags: ['b1-07-guard'],
    onlyTags: true,
    zone: 'casa',
    look: { shirt: '#2d2d3a', hair: '#111111', skin: '#c9a27e' },
    before: [{ text: "It must be stole! He can't has known! Go away!", es: "It must be stole y He can't has known: mal. (¡Vete!)" }],
    after: [{ text: "I can't have seen anything. Go in.", es: 'No pude haber visto nada. Pasa.' }],
    freed: { text: 'You must be very brave. Be careful.', es: 'Debes de ser muy valiente. Ten cuidado.' },
  },
}
