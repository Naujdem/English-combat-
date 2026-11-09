import type { EnemyDef, GameState, SceneDef, Zone } from '../game/types'
import type { InscriptionRoom } from '../game/inscriptions'
import type { TextCommandRoom } from '../components/TextCommand'

/**
 * B1-09 — Temples of Stones and Time, bloque B: el salón de entrada del Temple of Stones (escena b1-09-stones; es recuerdo
 * por el prefijo "b1-09-"). Juegas como L (sin voz); los demás con la cara borrosa. Sin atuendos.
 * Se llega por el camino de piedra del valle (data/b1Valley.ts, links) y se vuelve por la misma puerta.
 *   El muro de inscripciones (tarea 'b1-09-stones-ins': Inscriptions, tema 'passive-all') → la piedra del salón
 *   (tarea 'b1-09-stones-move': The Moving Stone escrito) → el minijefe Stone Guardian (una fase) → la puerta del fondo:
 *   el Temple of Time (bloque 9-C, data/b1TempleTime.ts). Ningún bloque B guarda closeId(9).
 */
export const B1_09_STONES_ID = 'b1-09-stones'
export const B1_09_WALL = 'b1-09-wall'
export const B1_09_STONES_INS = 'b1-09-stones-ins'
export const B1_09_STONE = 'b1-09-stone'
export const B1_09_STONES_MOVE = 'b1-09-stones-move'
export const B1_09_GUARDIAN = 'b1-09-guardian'

/**
 * Leyenda de components/Tiles.tsx: # muro con glifos · d puerta · Z la sombra de una estatua · K el pedestal con la caja de piedra.
 * La puerta de vuelta al valle (0,3) y la puerta pesada del fondo (11,3).
 */
const MAP = [
  '############',
  '#..........#',
  '#..........#',
  'd..........d',
  '#..........#',
  '#Z......K..#',
  '############',
]

const zoneAt = (): Zone => 'patio-viejo'

export const B1_09_STONES: SceneDef = {
  id: B1_09_STONES_ID,
  name: 'Recuerdo 9 · Temple of Stones',
  topics: [],
  map: MAP,
  start: { x: 1, y: 3 },
  // Sin puerta de jefe: el minijefe se vence como entidad y abre la puerta del fondo (locked)
  bossDoor: { x: 0, y: 0 },
  keysNeeded: 0,
  entities: [
    // El muro de inscripciones: lo único desbloqueado al inicio
    { type: 'npc', id: B1_09_WALL, x: 4, y: 1 },
    // La piedra del salón: su tarea pide terminar el muro (data/tasks.ts, requires)
    { type: 'npc', id: B1_09_STONE, x: 6, y: 4 },
    // El minijefe aparece al terminar la piedra, delante de la puerta del fondo
    { type: 'enemy', id: B1_09_GUARDIAN, x: 10, y: 3, after: B1_09_STONES_MOVE },
  ],
  labels: [{ text: 'Temple of Stones', x: 5, y: 5 }],
  zoneAt: () => zoneAt(),
  examine: {
    '1,5': { text: 'The shadow of a statue.', sub: 'La sombra de una estatua.', say: 'The shadow of a statue.' },
    '8,5': { text: 'A stone box on a pedestal.', sub: 'Una caja de piedra sobre un pedestal.', say: 'A stone box on a pedestal.' },
  },
  // La puerta del fondo: cerrada hasta vencer al Stone Guardian; después lleva al Temple of Time (bloque 9-C)
  locked: (x, y, s) => {
    if (x !== 11 || y !== 3) return null
    if (!s.defeated.includes(B1_09_GUARDIAN)) {
      const sub = !s.opened.includes(B1_09_STONES_INS) ? 'Primero despierta el muro de inscripciones.' : !s.opened.includes(B1_09_STONES_MOVE) ? 'Primero mueve la piedra del salón.' : 'Primero vence al Stone Guardian.'
      return { text: 'Todavía no.', sub }
    }
    return null
  },
  // Bloque C: la puerta del fondo lleva al Temple of Time (data/b1TempleTime.ts)
  links: { '0,3': { sceneId: 'b1-09-valley', pos: { x: 10, y: 4 } }, '11,3': { sceneId: 'b1-09-time', pos: { x: 1, y: 3 } } },
  requirements: [],
  chips: (s: GameState) => [
    { label: 'El muro de inscripciones', done: s.opened.includes(B1_09_STONES_INS) },
    { label: 'La piedra del salón (Moving Stone)', done: s.opened.includes(B1_09_STONES_MOVE) },
    { label: 'Stone Guardian', done: s.defeated.includes(B1_09_GUARDIAN) },
  ],
  intro: {
    first: 'The stones remember. — Las piedras recuerdan.',
    later: (s) => (s.opened.includes('b1-09-close') ? 'Temples of Stones and Time. La misión 9 terminó: la misión 10 te espera en el mapa.' : 'The stones remember. — Las piedras recuerdan.'),
  },
}

/** El muro de inscripciones (Inscriptions, modelo INS_DEMO_DOOR) */
export const B1_09_WALL_ROOM: InscriptionRoom = {
  title: 'The Wall of Stones',
  intro: { en: 'The wall is full of glyphs. Build each sentence to wake the stones.', es: 'El muro está lleno de glifos. Arma cada frase para despertar las piedras.' },
  scene: 'wall',
  plates: [
    {
      words: ['The temple', 'was', 'built', 'by the ancient people'],
      roles: ['subject', 'aux', 'participle', 'agent'],
      es: 'El templo fue construido por el pueblo antiguo.',
      rule: {
        title: 'La pasiva en pasado',
        text: 'Cuando importa más la cosa que quien actúa: sujeto + was / were + participio. Quién lo hizo va al final, con by.',
        examples: ['The temple was built.', 'The temple was built by the ancient people.'],
      },
      hint: 'Primero la cosa (The temple). Después was y el participio (built).',
      distractors: [{ text: 'build', role: 'participle' }],
      effect: 'Una piedra del muro brilla.',
    },
    {
      words: ['The device', 'was', 'made', 'with these words'],
      roles: ['subject', 'aux', 'participle', 'complement'],
      es: 'El aparato fue hecho con estas palabras.',
      rule: {
        title: 'Con qué se hizo',
        text: 'Para decir con qué se hizo algo, usa with. Para decir quién lo hizo, usa by.',
        examples: ['The device was made with these words.', 'The device was made by the ancient people.'],
      },
      hint: 'Con qué: with these words.',
      distractors: [{ text: 'by these words', role: 'complement' }],
      effect: 'Dos piedras más brillan.',
    },
    {
      words: ['The temple', 'is', 'guarded', 'by a stone statue'],
      roles: ['subject', 'aux', 'participle', 'agent'],
      es: 'El templo está custodiado por una estatua de piedra.',
      rule: {
        title: 'La pasiva en presente',
        text: 'Para algo que pasa ahora o siempre: sujeto + is / are + participio.',
        examples: ['The temple is guarded.', 'The stones are guarded by a statue.'],
      },
      hint: 'Es presente: is, no was.',
      distractors: [{ text: 'was', role: 'aux' }],
      effect: 'El muro se ilumina.',
    },
    {
      words: ['The door', 'has been', 'closed', 'for a thousand years'],
      roles: ['subject', 'aux', 'participle', 'time'],
      es: 'La puerta ha estado cerrada durante mil años.',
      rule: {
        title: 'La pasiva en presente perfecto',
        text: 'Algo que empezó antes y sigue hasta hoy: sujeto + has / have been + participio. for = cuánto tiempo.',
        examples: ['The door has been closed.', 'The doors have been closed for years.'],
      },
      hint: 'has been + closed; el tiempo va con for.',
      distractors: [{ text: 'since a thousand years', role: 'time' }],
      effect: 'La puerta tiembla.',
    },
    {
      words: ['The door', 'will be', 'opened', 'by the right words'],
      roles: ['subject', 'aux', 'participle', 'agent'],
      es: 'La puerta será abierta por las palabras correctas.',
      rule: {
        title: 'La pasiva en futuro',
        text: 'Algo que pasará: sujeto + will be + participio.',
        examples: ['The door will be opened.', 'The door will be opened by the right words.'],
      },
      hint: 'will be + participio.',
      distractors: [{ text: 'will', role: 'aux' }],
      effect: 'El muro completo brilla.',
    },
  ],
  finish: { en: 'The wall is awake. A stone moves in the hall.', es: 'El muro despertó. Una piedra se mueve en el salón.', banner: '¡Muro despierto!' },
}

/** La piedra del salón (The Moving Stone escrito, modelo STONE_DEMO_TEMPLE) */
export const B1_09_STONE_ROOM: TextCommandRoom = {
  mode: 'text',
  title: 'The Stone Hall',
  intro: { en: 'The wall explains how to open the way. Read and give the order.', es: 'El muro explica cómo abrir el camino. Lee y da la orden.' },
  scene: 'temple',
  objects: ['stone', 'lid', 'key', 'door'],
  steps: [
    {
      problem: { en: 'The wall says: "The stone is pushed to the right to open the way."', es: 'El muro dice: "La piedra se empuja a la derecha para abrir el camino".' },
      accept: [{ verb: 'push', object: 'stone', optional: ['to the right', 'right', 'slowly'] }],
      target: 'stone',
      done: { en: 'The stone moves to the right. Something clicks.', es: 'La piedra se mueve a la derecha. Algo hace clic.' },
      tip: 'La pasiva dice qué se hace: "is pushed" → Push the stone to the right.',
      fails: { break: { en: "The stone doesn't move.", es: 'La piedra no se mueve.' }, kick: { en: 'Ouch! The stone is too heavy.', es: '¡Ay! La piedra pesa demasiado.' } },
      verbPool: ['break', 'kick', 'pull', 'lift', 'open', 'move'],
    },
    {
      problem: { en: 'Under the stone there is a box. The wall says: "The lid is lifted up to take the key."', es: 'Debajo de la piedra hay una caja. El muro dice: "La tapa se levanta para tomar la llave".' },
      accept: [{ verb: 'lift', particle: 'up', object: 'lid', optional: ['slowly'] }],
      target: 'lid',
      done: { en: 'The lid goes up. There is a gold key inside!', es: 'La tapa sube. ¡Adentro hay una llave dorada!' },
      tip: '"is lifted up" → Lift up the lid (o Lift the lid up).',
      fails: { open: { en: 'The lid is too heavy to open. Try lifting it up.', es: 'La tapa pesa mucho. Prueba a levantarla.' }, push: { en: 'The lid slides a little, but it falls back.', es: 'La tapa se desliza un poco, pero vuelve a caer.' } },
      verbPool: ['open', 'push', 'pull', 'break', 'take'],
    },
    {
      problem: { en: 'The last line says: "The door is opened with the gold key."', es: 'La última línea dice: "La puerta se abre con la llave dorada".' },
      accept: [{ verb: 'open', object: 'door', complement: ['with the gold key', 'with the key', 'with the golden key'] }],
      target: 'door',
      done: { en: 'The key turns, and the door opens slowly. A stone statue stands up!', es: 'La llave gira y la puerta se abre despacio. ¡Una estatua de piedra se levanta!' },
      tip: 'Di la acción y con qué: Open the door with the gold key.',
      fails: { push: { en: "The door doesn't move. It needs a key.", es: 'La puerta no se mueve. Necesita una llave.' }, break: { en: 'The door is made of stone. It does not break.', es: 'La puerta es de piedra. No se rompe.' } },
      verbPool: ['push', 'break', 'pull', 'kick', 'lift'],
    },
  ],
  finish: { en: 'The first door is open.', es: 'La primera puerta está abierta.', banner: '¡Primera puerta abierta!' },
}

// ── Minijefe: Stone Guardian (una sola fase, hp 5). Sin reward: en los recuerdos no se ganan atuendos ──
export const B1_09_STONES_ENEMIES: Record<string, EnemyDef> = {
  [B1_09_GUARDIAN]: {
    id: B1_09_GUARDIAN,
    name: 'Stone Guardian',
    person: 'Stone Guardian',
    kind: 'boss',
    hp: 5,
    topics: ['passive-all'],
    kinds: ['fix', 'fill', 'order', 'listen'],
    tags: ['b1-09-guardian'],
    onlyTags: true,
    zone: 'patio-viejo',
    look: { shirt: '#8a8f96', hair: '#55606e', skin: '#a8adb4' },
    before: [{ text: 'It was build by giants! It can be open by nobody!', es: 'It was build y It can be open: mal.' }],
    after: [
      { text: 'The stone cracks... and the way is open.', es: 'La piedra se agrieta... y el camino está abierto.' },
      // Narrador (L), al vencerlo
      { text: '(The door opens. Beyond it, a red light glows in the dark.)', es: '(La puerta se abre. Más allá, una luz roja brilla en la oscuridad.)' },
    ],
    freed: { text: 'The temple was built to be understood.', es: 'El templo fue construido para ser entendido.' },
    farewell: { q: "Stone Guardian says: 'The way is open.' What do you answer?", options: ['Thank you. The temple was build well.', 'Thank you. The temple built was well.', 'Thank you. The temple was built well.'], answer: 2, tip: 'Pasiva en pasado: was + participio (built).' },
  },
}
