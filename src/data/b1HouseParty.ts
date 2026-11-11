import type { EnemyDef, GameState, SceneDef, Zone } from '../game/types'
import type { ScriptLine } from './b1Accident'
import type { PartyContent } from '../components/PartyPlan'

/**
 * B1 · Extras: House Party (misión secundaria, presente; se abre al cerrar la misión 12). Escena b1-s3-flat.
 * Jeison, el vecino de la residencia, hace una fiesta en su cuarto. Su primo Juan está de visita.
 * Orden: Jeison: lección 'party-b1' (question tags con otros auxiliares: can, will, did, have; frase negativa → tag positivo)
 *   + práctica (b1-s3-host) → Jeison: confirmar con los invitados (b1-s3-plan, PartyPlan con question tags) →
 *   Juan: el duelo amistoso (b1-s3-duel, no castiga al perder) → Jeison: el cierre (b1-s3-close): camisa de fiesta y el tema.
 */
export const B1_S3_FLAT_ID = 'b1-s3-flat'
export const B1_S3_JEISON = 'b1-s3-jeison'
export const B1_S3_HOST = 'b1-s3-host'
export const B1_S3_PLAN = 'b1-s3-plan'
export const B1_S3_DUEL = 'b1-s3-duel'
export const B1_S3_CLOSE = 'b1-s3-close'

/** Leyenda (Tiles.tsx, sin dibujos nuevos): # pared · W ventana · h luces · L estantería · d puerta · A sofá · K mesa · p planta */
const MAP = [
  '#h#W#h#h#W#h',
  '#p...LL...p#',
  '#..........#',
  '#...KKK....#',
  '#..........#',
  '#.AA.....AA#',
  '#####d######',
]

const zoneAt = (): Zone => 'recepcion'
const TEXT = "Jeison's room. Music, lights and snacks. — El cuarto de Jeison. Música, luces y pasabocas."

export const B1_S3_FLAT: SceneDef = {
  id: B1_S3_FLAT_ID,
  name: 'House Party · El cuarto de Jeison',
  topics: [],
  map: MAP,
  start: { x: 5, y: 5 },
  bossDoor: { x: 0, y: 0 },
  keysNeeded: 0,
  entities: [
    { type: 'npc', id: B1_S3_JEISON, x: 3, y: 2 },
    { type: 'enemy', id: B1_S3_DUEL, x: 8, y: 2, after: B1_S3_PLAN },
  ],
  labels: [{ text: 'House party', x: 6, y: 1 }],
  zoneAt: () => zoneAt(),
  examine: {
    '4,3': { text: 'Snacks and juice.', sub: 'Pasabocas y jugo.', say: 'Snacks and juice.' },
    '5,3': { text: 'Snacks and juice.', sub: 'Pasabocas y jugo.', say: 'Snacks and juice.' },
    '6,3': { text: 'Snacks and juice.', sub: 'Pasabocas y jugo.', say: 'Snacks and juice.' },
  },
  locked: (x, y) => (x === 5 && y === 6 ? { text: 'The way out.', sub: 'Para volver al mapa, toca el botón Mapa.' } : null),
  links: {},
  requirements: [],
  chips: (s: GameState) => [
    { label: 'Jeison: question tags', done: s.opened.includes(B1_S3_HOST) },
    { label: 'Confirmar con los invitados', done: s.opened.includes(B1_S3_PLAN) },
    { label: 'Duelo amistoso con Juan', done: s.defeated.includes(B1_S3_DUEL) },
    { label: 'El cierre', done: s.opened.includes(B1_S3_CLOSE) },
  ],
  intro: {
    first: TEXT,
    later: (s: GameState) => (s.opened.includes(B1_S3_CLOSE) ? 'House Party. Extra completado.' : TEXT),
  },
}

/** PartyPlan (components/PartyPlan.tsx) con question tags: se confirma con cada invitado y se anota en la lista */
export const B1_S3_PARTY: PartyContent = {
  title: 'House Party',
  host: 'Jeison',
  hostLine: 'The party is tonight! Can you check with the guests?',
  listTitle: 'PARTY LIST · TONIGHT',
  nextLabel: 'Siguiente invitado',
  finishLabel: 'Darle la lista a Jeison',
  rounds: [
    {
      who: 'Nayi',
      voice: 'female',
      task: 'Confirma con Nayi que viene.',
      ask: { options: ["You're coming, aren't you?", "You're coming, isn't you?", "You're coming, don't you?"], answer: 0, tip: "Frase con are → tag con aren't: You're coming, aren't you?" },
      reply: { text: "Of course! I'll bring some juice. And no, Lupe isn't coming.", es: '¡Claro! Llevaré jugo. Y no, Lupe no viene.' },
      note: { q: 'What is Nayi going to bring?', options: ['Some juice.', 'A ball.', 'A cake.'], answer: 0, tip: 'Nayi dijo: "I\'ll bring some juice".' },
    },
    {
      who: 'Jorge',
      voice: 'male',
      task: 'Confirma que Jorge puede traer la música.',
      ask: { options: ["You can bring the music, can't you?", "You can bring the music, don't you?", "You can bring the music, aren't you?"], answer: 0, tip: "Frase con can → tag con can't: can't you?" },
      reply: { text: "Sure! I've made a playlist. It's two hours long.", es: '¡Claro! Hice una lista de canciones. Dura dos horas.' },
      note: { q: 'How long is the playlist?', options: ['Two hours.', 'Two minutes.', 'Ten hours.'], answer: 0, tip: 'Jorge dijo: "It\'s two hours long".' },
    },
    {
      who: 'Liceth',
      voice: 'female',
      task: 'Confirma que Liceth no olvidó el pastel.',
      ask: { options: ["You haven't forgotten the cake, have you?", "You haven't forgotten the cake, haven't you?", "You haven't forgotten the cake, did you?"], answer: 0, tip: 'Frase negativa (haven\'t) → tag positivo: have you?' },
      reply: { text: "No, I haven't! It's a chocolate cake. I'll be there at eight.", es: '¡No, no lo olvidé! Es un pastel de chocolate. Llegaré a las ocho.' },
      note: { q: 'When will Liceth arrive?', options: ['At eight.', 'At six.', 'At ten.'], answer: 0, tip: 'Liceth dijo: "I\'ll be there at eight".' },
    },
    {
      who: 'Marisol',
      voice: 'female',
      task: 'Confirma con Marisol que la fiesta termina a las once.',
      ask: { options: ["The party ends at eleven, doesn't it?", "The party ends at eleven, isn't it?", "The party ends at eleven, don't it?"], answer: 0, tip: "Presente simple (ends) → tag con doesn't: doesn't it?" },
      reply: { text: "Yes, it does. And please don't be too loud: Moscú hates noise.", es: 'Sí. Y por favor no hagan mucho ruido: Moscú odia el ruido.' },
      note: { q: 'Who hates noise?', options: ['Moscú.', 'Marisol.', 'Jeison.'], answer: 0, tip: 'Marisol dijo: "Moscú hates noise".' },
    },
  ],
}

/** El cierre con Jeison (b1-s3-close) */
export const B1_S3_CLOSE_SCRIPT: ScriptLine[] = [
  { who: 'narrator', text: "Jeison: Everybody came! It's a great party, isn't it?", es: 'Jeison: ¡Vinieron todos! Es una gran fiesta, ¿cierto?' },
  { who: 'narrator', text: "Juan: You beat me at my own game. We'll play again, won't we?", es: 'Juan: Me ganaste en mi propio juego. Jugaremos otra vez, ¿verdad?' },
  { who: 'narrator', text: "Jeison: You didn't bring a party shirt, did you? Take this one. It's yours.", es: 'Jeison: No trajiste camisa de fiesta, ¿cierto? Toma esta. Es tuya.' },
  { who: 'narrator', text: '(The music is loud. At eleven, Marisol knocks on the door. Everybody laughs.)', es: '(La música está fuerte. A las once, Marisol toca la puerta. Todos se ríen.)' },
]

const PT = 'party-b1' as const

export const B1_S3_ENEMIES: Record<string, EnemyDef> = {
  // Duelo amistoso: Juan, el primo de Jeison, propone un juego de question tags. No castiga al perder
  [B1_S3_DUEL]: {
    id: B1_S3_DUEL,
    name: 'Juan, el primo de Jeison',
    person: 'Juan',
    kind: 'trainer',
    duel: {
      lost: 'Juan: "Ha ha! One more round, OK?" Vuelves a empezar con la vida llena.',
      won: 'Ganaste el juego de Juan. Habla con Jeison.',
    },
    hp: 6,
    topics: [PT],
    kinds: ['fill', 'fix', 'order', 'listen'],
    tags: [B1_S3_DUEL],
    onlyTags: true,
    zone: 'recepcion',
    look: { shirt: '#e0a526', hair: '#2b2b33', skin: '#c68642', gender: 'male' },
    before: [
      { text: "You're Jeison's neighbour, aren't you? I'm Juan, his cousin. Let's play a game!", es: 'Eres el vecino de Jeison, ¿cierto? Soy Juan, su primo. ¡Juguemos!' },
      { text: "I say a sentence, you finish it. If you lose, we'll just play again!", es: 'Yo digo una frase y tú la terminas. ¡Si pierdes, jugamos otra vez!' },
    ],
    after: [{ text: "You win! You're good at this, aren't you?", es: '¡Ganaste! Eres bueno en esto, ¿cierto?' }],
    freed: { text: "Great party, isn't it?", es: 'Gran fiesta, ¿cierto?' },
  },
}
