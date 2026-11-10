import type { EnemyDef, GameState, SceneDef, Zone } from '../game/types'
import type { ScriptLine } from './b1Accident'
import { closeId } from './b1World'

/**
 * B1-11 — The First Journey. Bloque D (último): The Fixed Point (escena b1-11-point; es recuerdo por el prefijo "b1-11-").
 * Una cámara circular de piedra al otro lado del puente del Temple of Roads (data/b1TempleRoads.ts), con el tiempo detenido.
 *   El jefe The Fixed Point (2 fases, sin atuendo) → la piedra (aparece al vencerlo; tarea 'b1-11-close' = closeId(11):
 *   B1_11_CLOSE_SCRIPT, recupera los 5 temas, sale del recuerdo y abre el nodo 12 sin FragmentJoin, como 9 → 10).
 */
export const B1_11_POINT_ID = 'b1-11-point'
export const B1_11_BOSS = 'b1-11-boss'
export const B1_11_STONE = 'b1-11-stone'
export const B1_11_CLOSE = closeId(11)
/** Tarjeta de las 4 escenas del recuerdo 11 cuando la misión ya terminó */
export const B1_11_DONE_TEXT = 'The First Journey. La misión 11 terminó: la misión 12 te espera en el mapa.'

/** El cierre (secuencia fija): 'L' = lo que L escribe en su cuaderno */
export const B1_11_CLOSE_SCRIPT: ScriptLine[] = [
  { who: 'narrator', text: '(The Fixed Point goes silent. The hands of the great clock on the floor stop moving.)', es: '(The Fixed Point se queda en silencio. Las manecillas del gran reloj del suelo se detienen.)' },
  { who: 'narrator', text: '(Words appear in the stone, slowly, as if someone were carving them.)', es: '(Aparecen palabras en la piedra, despacio, como si alguien las tallara.)' },
  { who: 'narrator', text: "Some things can't be changed. But a voice... can be taken.", es: 'Hay cosas que no se pueden cambiar. Pero una voz... se puede quitar.' },
  { who: 'L', text: "I don't understand. A voice... can be taken?", es: 'No entiendo. ¿Una voz... se puede quitar?' },
  { who: 'narrator', text: '(You close your notebook. Behind you, the road is gone.)', es: '(Cierras tu cuaderno. Detrás de ti, el camino ya no está.)' },
]

/**
 * Leyenda (como data/b1TempleTime.ts): # muro · @ relojes detenidos en las paredes · d puerta · K pedestal de piedra.
 * La puerta de vuelta al Temple of Roads (0,3), el jefe (5,3), el pedestal (8,3) y la piedra (8,2).
 */
const MAP = [
  '#@#@###@#@#',
  '#.........#',
  '@.........@',
  'd.......K.#',
  '@.........@',
  '#.........#',
  '#@#@###@#@#',
]

const zoneAt = (): Zone => 'pasillo-noche'

export const B1_11_POINT: SceneDef = {
  id: B1_11_POINT_ID,
  name: 'Recuerdo 11 · The Fixed Point',
  topics: [],
  map: MAP,
  start: { x: 1, y: 3 },
  bossDoor: { x: 0, y: 0 },
  keysNeeded: 0,
  entities: [
    { type: 'enemy', id: B1_11_BOSS, x: 5, y: 3 },
    // La piedra: aparece al vencer al jefe (npcs.ts, after). Su tarea es el cierre closeId(11)
    { type: 'npc', id: B1_11_STONE, x: 8, y: 2 },
  ],
  labels: [{ text: 'The Fixed Point', x: 5, y: 5 }],
  zoneAt: () => zoneAt(),
  examine: {
    '1,0': { text: 'Stopped clocks.', sub: 'Relojes detenidos.', say: 'Stopped clocks.' },
  },
  // El pedestal: cerrado hasta vencer a The Fixed Point
  locked: (x, y, s) => (x === 8 && y === 3 && !s.defeated.includes(B1_11_BOSS) ? { text: 'Todavía no.', sub: 'Primero vence a The Fixed Point.' } : null),
  links: { '0,3': { sceneId: 'b1-11-roads', pos: { x: 10, y: 3 } } },
  requirements: [],
  chips: (s: GameState) => [
    { label: 'The Fixed Point', done: s.defeated.includes(B1_11_BOSS) },
    { label: 'La piedra', done: s.opened.includes(B1_11_CLOSE) },
  ],
  intro: {
    first: 'Time stops here. — El tiempo se detiene aquí.',
    later: (s) => (s.opened.includes(B1_11_CLOSE) ? B1_11_DONE_TEXT : 'Time stops here. — El tiempo se detiene aquí.'),
  },
}

// ── Jefe The Fixed Point (2 fases; modelo Keeper of Hours de 9-D). Sin reward: en los recuerdos no se ganan atuendos ──
export const B1_11_BOSS_ENEMIES: Record<string, EnemyDef> = {
  [B1_11_BOSS]: {
    id: B1_11_BOSS,
    name: 'The Fixed Point',
    person: 'The Fixed Point',
    kind: 'boss',
    hp: 8,
    topics: ['conditional-3', 'wish-b1', 'pastperfect-b1'],
    kinds: ['fix', 'fill', 'order', 'listen'],
    tags: ['b1-11-boss'],
    phases: [
      {
        hp: 4,
        title: 'Tercer condicional',
        topics: ['conditional-3'],
        kinds: ['fix', 'fill', 'order', 'listen'],
        tags: ['b1-11-boss-c'],
        line: { text: 'If you would have known, you would have changed me! If you would have run, you would have won!', es: 'If you would have known y If you would have run: mal.' },
      },
      {
        hp: 4,
        title: 'Wish y past perfect',
        topics: ['wish-b1', 'pastperfect-b1'],
        kinds: ['fix', 'fill', 'order', 'listen'],
        tags: ['b1-11-boss-w'],
        line: { text: 'I wish you know! I wish you would have never come!', es: 'I wish you know y I wish you would have never come: mal.' },
      },
    ],
    onlyTags: true,
    zone: 'pasillo-noche',
    look: { shirt: '#1f1f2b', hair: '#cfc8b8', skin: '#a9a4b5' },
    before: [{ text: "If you would have known, you would have changed me! I wish you know: I can't be changed!", es: 'If you would have known y I wish you know: mal.' }],
    after: [{ text: "The night stops. The fire is still there, far away, and it doesn't move.", es: 'La noche se detiene. El fuego sigue allí, lejos, y no se mueve.' }],
    freed: { text: "You tried. That's all a person can do.", es: 'Lo intentaste. Es todo lo que una persona puede hacer.' },
    farewell: { q: "The Fixed Point says: 'You tried everything.' What do you answer?", options: ['I wish I would have known.', 'I wish I had known.', 'I wish I knew it yesterday.'], answer: 1, tip: 'wish + past perfect (had known).' },
  },
}
