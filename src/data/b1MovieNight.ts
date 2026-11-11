import type { GameState, SceneDef, Zone } from '../game/types'
import type { ScriptLine } from './b1Accident'
import type { ReviewContent } from '../components/ReviewWriter'
import { B1_EXAM_PAST, wordCount } from './b1Exam'

/**
 * B1 · Extras: Movie Night (misión secundaria, presente; se abre al cerrar la misión 10). Escena b1-s2-room.
 * Noche de películas en la sala de la residencia con Marisol, la dueña, y su gata Moscú.
 * Orden: Marisol: lección 'movie-night-b1' (contar la trama con tiempos narrativos, adverbios de opinión y verbos de estado
 *   para opinar) + práctica (b1-s2-talk) → la tele: la película inventada "The Last Lighthouse" (b1-s2-film, script) →
 *   el tablero de la residencia: escribir una reseña corta (b1-s2-review, components/ReviewWriter.tsx) →
 *   Marisol: el cierre (b1-s2-close): pijama de película y el tema recuperado. Sin combates.
 */
export const B1_S2_ROOM_ID = 'b1-s2-room'
export const B1_S2_MARISOL = 'b1-s2-marisol'
export const B1_S2_MOSCU = 'b1-s2-moscu'
export const B1_S2_TV = 'b1-s2-tv'
export const B1_S2_BOARD = 'b1-s2-board'
export const B1_S2_TALK = 'b1-s2-talk'
export const B1_S2_FILM = 'b1-s2-film'
export const B1_S2_REVIEW = 'b1-s2-review'
export const B1_S2_CLOSE = 'b1-s2-close'

/** Leyenda (Tiles.tsx, sin dibujos nuevos): # pared · W ventana · L estantería · d puerta · A sofá · K mesa · p planta */
const MAP = [
  '##W##LL##W##',
  '#p........p#',
  '#...AAA....#',
  '#..........#',
  '#...KK.....#',
  '#..........#',
  '#####d######',
]

const zoneAt = (): Zone => 'recepcion'
const TEXT = 'Movie night at the residence. — Noche de películas en la residencia.'

export const B1_S2_ROOM: SceneDef = {
  id: B1_S2_ROOM_ID,
  name: 'Movie Night · La sala de la residencia',
  topics: [],
  map: MAP,
  start: { x: 5, y: 5 },
  bossDoor: { x: 0, y: 0 },
  keysNeeded: 0,
  entities: [
    { type: 'npc', id: B1_S2_MARISOL, x: 3, y: 3 },
    { type: 'npc', id: B1_S2_MOSCU, x: 7, y: 3 },
    // La tele (TabletIcon) y el tablero de la residencia (NotebookIcon): Explore.tsx
    { type: 'npc', id: B1_S2_TV, x: 10, y: 3 },
    { type: 'npc', id: B1_S2_BOARD, x: 2, y: 1 },
  ],
  labels: [{ text: 'Movie night', x: 6, y: 1 }],
  zoneAt: () => zoneAt(),
  examine: {},
  locked: (x, y) => (x === 5 && y === 6 ? { text: 'The way out.', sub: 'Para volver al mapa, toca el botón Mapa.' } : null),
  links: {},
  requirements: [],
  chips: (s: GameState) => [
    { label: 'Marisol: contar y opinar', done: s.opened.includes(B1_S2_TALK) },
    { label: 'La película', done: s.opened.includes(B1_S2_FILM) },
    { label: 'Tu reseña', done: s.opened.includes(B1_S2_REVIEW) },
    { label: 'El cierre', done: s.opened.includes(B1_S2_CLOSE) },
  ],
  intro: {
    first: TEXT,
    later: (s: GameState) => (s.opened.includes(B1_S2_CLOSE) ? 'Movie Night. Extra completado.' : TEXT),
  },
}

/** La película inventada (la tele; secuencia fija). La trama, con tiempos narrativos */
export const B1_S2_FILM_SCRIPT: ScriptLine[] = [
  { who: 'narrator', text: '(The lights go off. The film begins: "The Last Lighthouse".)', es: '(Se apagan las luces. Empieza la película: "El último faro".)' },
  { who: 'narrator', text: 'It was raining when a young sailor arrived at the island.', es: 'Llovía cuando una joven marinera llegó a la isla.' },
  { who: 'narrator', text: 'The old keeper had left the lighthouse many years before.', es: 'El viejo guardián había dejado el faro muchos años antes.' },
  { who: 'narrator', text: 'While she was climbing the tower, the light suddenly turned on.', es: 'Mientras subía la torre, la luz se encendió de repente.' },
  { who: 'narrator', text: 'Unfortunately, a storm destroyed her boat that night.', es: 'Por desgracia, una tormenta destruyó su bote esa noche.' },
  { who: 'narrator', text: 'Eventually, she repaired the light and saved three ships.', es: 'Al final, reparó la luz y salvó tres barcos.' },
  { who: 'narrator', text: '(The end. Moscú is asleep on your feet.)', es: '(Fin. Moscú está dormida sobre tus pies.)' },
  { who: 'narrator', text: 'Marisol: So? What did you think? Write a review for the residence board!', es: 'Marisol: ¿Y? ¿Qué te pareció? ¡Escribe una reseña para el tablero de la residencia!' },
]

export const B1_S2_ADVERBS = ['surprisingly', 'unfortunately', 'luckily', 'obviously', 'sadly', 'honestly', 'fortunately', 'personally']
const OPINION = /\b(i think|i believe|in my opinion|i loved|i liked|i enjoyed|i preferred|i would recommend|i recommend|i didn't like|i hated)\b/i

/** Requisitos de la reseña: longitud, 2 adverbios de opinión, un pasado y una opinión. No se revisa la calidad */
export function reviewChecks(text: string): { label: string; ok: boolean }[] {
  const n = wordCount(text)
  const t = ` ${text.toLowerCase().replace(/[^a-z' ]+/g, ' ')} `
  const found = B1_S2_ADVERBS.filter((a) => t.includes(` ${a} `))
  return [
    { label: `Entre 40 y 70 palabras (llevas ${n})`, ok: n >= 40 && n <= 70 },
    { label: `Al menos 2 adverbios de opinión: surprisingly, unfortunately, luckily, honestly… (llevas ${found.length})`, ok: found.length >= 2 },
    { label: 'La trama en pasado (was, arrived, had left…)', ok: B1_EXAM_PAST.test(text) },
    { label: 'Tu opinión: I think…, I loved…, I would recommend…', ok: OPINION.test(text) },
  ]
}

export const B1_S2_REVIEW_GAME: ReviewContent = {
  title: 'Movie review',
  ask: 'Write a short review of "The Last Lighthouse".',
  es: 'Escribe una reseña corta de "The Last Lighthouse": cuenta un poco de la trama y da tu opinión.',
  help: 'It was raining when… · Surprisingly, … · I think it is…',
  checks: reviewChecks,
  model:
    'Last night I watched The Last Lighthouse at the residence. It was raining when a young sailor arrived at an island. The keeper had left years before. ' +
    'Surprisingly, the light turned on while she was climbing the tower. Unfortunately, a storm destroyed her boat, but she repaired the light. ' +
    'Honestly, I loved the ending. I think it is a great film, and I would recommend it.',
  modelBy: 'Reseña modelo de Marisol',
}

/** El cierre con Marisol (b1-s2-close) */
export const B1_S2_CLOSE_SCRIPT: ScriptLine[] = [
  { who: 'narrator', text: 'Marisol: I read your review. Honestly, it is better than the ones in the newspaper!', es: 'Marisol: Leí tu reseña. Sinceramente, ¡es mejor que las del periódico!' },
  { who: 'narrator', text: "Marisol: I'm putting it on the board, so everybody can read it.", es: 'Marisol: La voy a poner en el tablero para que todos la lean.' },
  { who: 'narrator', text: '(Moscú wakes up, looks at you, and goes back to sleep.)', es: '(Moscú se despierta, te mira y se vuelve a dormir.)' },
  { who: 'narrator', text: 'Marisol: Next time, come in pyjamas. Here, these are for you.', es: 'Marisol: La próxima vez, ven en pijama. Toma, esta es para ti.' },
]
