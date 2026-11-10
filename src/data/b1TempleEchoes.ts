import type { GameState, SceneDef, Zone } from '../game/types'
import type { InscriptionRoom } from '../game/inscriptions'
import { closeId } from './b1World'
import { B1_13_DONE_TEXT } from './b1SchoolMorning'

/**
 * B1-13 — The Price. Bloque A: el Temple of Echoes (escena b1-13-echoes; es recuerdo por el prefijo "b1-13-").
 * Un templo hondo y frío, de noche, donde todo suena dos veces. Juegas como L, ya muy viejo (hacia 2090); sin atuendos.
 * Se entra desde el nodo 13 del mapa (screens/World.tsx, enterMemory). No hay salida mientras dura el recuerdo.
 *   La página 61 sobre una piedra (tarea 'b1-13-notebook': tema 'achievement-b1' + práctica b1-13-a1…a8)
 *   → el muro de los ecos (tarea 'b1-13-wall-ins': The Wall of Echoes, B1_13_PRICE_ROOM + práctica b1-13-p1…p8)
 *   → la puerta pesada del fondo: la sala del Keeper of Echoes (bloque 13-B, data/b1EchoHall.ts). Ningún bloque A guarda closeId(13).
 */
export const B1_13_ECHOES_ID = 'b1-13-echoes'
export const B1_13_NOTEBOOK = 'b1-13-notebook'
export const B1_13_WALL = 'b1-13-wall'
export const B1_13_WALL_INS = 'b1-13-wall-ins'
export const B1_13_KEEPER_DONE = 'b1-13-keeper-done'

/** The Wall of Echoes (components/Inscriptions.tsx, scene 'wall'): 6 piedras; las últimas revelan el precio del aparato */
export const B1_13_PRICE_ROOM: InscriptionRoom = {
  title: 'The Wall of Echoes',
  intro: { en: 'The wall repeats every word you read. Build each sentence, and listen.', es: 'El muro repite cada palabra que lees. Arma cada frase y escucha.' },
  scene: 'wall',
  plates: [
    {
      words: ['They', 'succeeded in', 'building', 'the device'],
      roles: ['subject', 'verb', 'participle', 'object'],
      es: 'Ellos tuvieron éxito en construir el aparato.',
      rule: { title: 'succeed in + -ing', text: 'succeed in + verbo con -ing: tener éxito haciendo algo.', examples: ['She succeeded in passing the exam.', 'We succeeded in finding it.'] },
      hint: 'succeed in + -ing.',
      distractors: [{ text: 'to build', role: 'complement' }],
      effect: 'El muro repite: "…the device."',
    },
    {
      words: ['I', 'finally', 'made it', 'to the top'],
      roles: ['subject', 'time', 'verb', 'complement'],
      es: 'Por fin llegué a la cima.',
      rule: { title: 'make it', text: 'make it = lograrlo, llegar. Finally va antes del verbo.', examples: ['We made it!', 'I finally made it home.'] },
      hint: 'finally + made it.',
      distractors: [{ text: 'did it', role: 'verb' }],
      effect: 'Otro glifo se enciende.',
    },
    {
      words: ['But', 'at what', 'cost?'],
      roles: ['connector', 'complement', 'object'],
      es: 'Pero, ¿a qué costo?',
      rule: { title: 'cost y price', text: 'cost = lo que hay que dar o perder; price = lo que se paga. At what cost? = ¿a qué costo?', examples: ['At what cost?', 'Everything has a price.'] },
      hint: 'At what cost?',
      distractors: [],
      effect: 'La piedra se enfría.',
    },
    {
      words: ['The device', 'does not', 'create', 'a voice'],
      roles: ['subject', 'aux', 'verb', 'object'],
      es: 'El aparato no crea una voz.',
      rule: { title: 'Presente simple negativo', text: 'does not + verbo base. No se añade -s al verbo.', examples: ['The device does not create a voice.', 'It does not work.'] },
      hint: 'does not + create.',
      distractors: [{ text: 'creates', role: 'verb' }],
      effect: 'El eco repite la frase, más bajo.',
    },
    {
      words: ['It', 'takes', 'one'],
      roles: ['subject', 'verb', 'object'],
      es: 'Toma una.',
      rule: { title: 'one', text: 'one reemplaza un sustantivo ya dicho: a voice → one. Aquí: "It takes one" = Toma una voz.', examples: ['I need a pen. Do you have one?'] },
      hint: 'It + takes + one.',
      distractors: [{ text: 'take', role: 'verb' }],
      effect: 'Las palabras se quedan en la piedra.',
    },
    {
      words: ['Someone', 'always', 'pays', 'the price'],
      roles: ['subject', 'time', 'verb', 'object'],
      es: 'Alguien siempre paga el precio.',
      rule: { title: 'always + verbo', text: 'Los adverbios de frecuencia (always, never, often) van antes del verbo principal.', examples: ['Someone always pays.', 'He never listens.'] },
      hint: 'always antes de pays.',
      distractors: [{ text: 'pay', role: 'verb' }],
      effect: 'El muro entero queda en silencio.',
    },
  ],
  finish: { en: 'The echo stops. The last words stay in the stone.', es: 'El eco se detiene. Las últimas palabras quedan en la piedra.', banner: 'El precio, revelado' },
}

const NOT_YET = { text: 'Todavía no.', sub: 'Primero despierta el muro de los ecos.' }

/**
 * Leyenda de components/Tiles.tsx (como el Temple of Stones): # muro con glifos · d puerta · Z sombra de estatua · K pedestal.
 * Sin puerta a la izquierda (no hay salida mientras dura el recuerdo). La página 61 (2,4), el muro de los ecos (4,1)
 * y la puerta pesada del fondo (11,3).
 */
const MAP = [
  '############',
  '#..........#',
  '#..........#',
  '#..........d',
  '#..........#',
  '#Z......K..#',
  '############',
]

/** Como el Temple of Stones */
const zoneAt = (): Zone => 'patio-viejo'

export const B1_13_ECHOES: SceneDef = {
  id: B1_13_ECHOES_ID,
  name: 'Recuerdo 13 · Temple of Echoes',
  topics: [],
  map: MAP,
  start: { x: 1, y: 3 },
  bossDoor: { x: 0, y: 0 },
  keysNeeded: 0,
  entities: [
    // La página 61 sobre una piedra, cerca de la entrada: la primera tarea
    { type: 'npc', id: B1_13_NOTEBOOK, x: 2, y: 4 },
    // El muro de los ecos, a la izquierda de la puerta del fondo (pide la página 61: data/tasks.ts, requires)
    { type: 'npc', id: B1_13_WALL, x: 4, y: 1 },
  ],
  labels: [{ text: 'Temple of Echoes', x: 5, y: 5 }],
  zoneAt: () => zoneAt(),
  examine: {
    '1,5': { text: 'A statue. Your steps sound twice.', sub: 'Una estatua. Tus pasos suenan dos veces.', say: 'Your steps sound twice.' },
  },
  // La puerta pesada del fondo: cerrada hasta terminar el muro de los ecos; después lleva a la sala del Keeper (bloque 13-B, data/b1EchoHall.ts)
  locked: (x, y, s) => (x === 11 && y === 3 && !s.opened.includes(B1_13_WALL_INS) ? NOT_YET : null),
  links: { '11,3': { sceneId: 'b1-13-hall', pos: { x: 1, y: 3 } } },
  requirements: [],
  chips: (s: GameState) => [
    { label: 'El cuaderno de L: página 61', done: s.opened.includes(B1_13_NOTEBOOK) },
    { label: 'El muro de los ecos', done: s.opened.includes(B1_13_WALL_INS) },
    { label: 'La puerta del fondo', done: s.opened.includes(B1_13_KEEPER_DONE) },
  ],
  intro: {
    first: 'Many years later. L is very old. — Muchos años después. L es muy viejo.',
    later: (s) => (s.opened.includes(closeId(13)) ? B1_13_DONE_TEXT : 'Many years later. L is very old. — Muchos años después. L es muy viejo.'),
  },
}
