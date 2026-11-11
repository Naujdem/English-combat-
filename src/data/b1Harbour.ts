import type { EnemyDef, GameState, SceneDef, Zone } from '../game/types'
import type { ScriptLine } from './b1Accident'
import { canRecognize } from '../game/mic'

/**
 * B1-14 · Voices (presente, final de B1). Bloque C: el puerto de Lumen Bay al amanecer (escena b1-14-harbour).
 * Se entra por la puerta de la sala de la residencia (b1-14-lounge, data/b1Lounge.ts) al terminar las preguntas indirectas.
 *
 * Un muelle de piedra con faroles y bancas; el agua abajo. Manuel, el periodista, junto a la cinta de la policía.
 * Orden: Manuel (b1-14-manuel, charla con preguntas indirectas) → la persona especial: el llavero (b1-14-keychain, script;
 *   el protagonista entiende que el amigo callado del recuerdo es él) → tres ecos de esbirros de B1 (repaso) →
 *   el jefe final The Grudge (3 fases: reported speech, repaso de todo B1 y la voz del protagonista) →
 *   "Próximamente": el examen de B1 y el cierre (bloque 14-D). Este bloque NO guarda closeId(14).
 */
export const B1_14_HARBOUR_ID = 'b1-14-harbour'
export const B1_14_MANUEL = 'b1-14-manuel'
export const B1_14_HARBOUR_SPECIAL = 'b1-14-harbour-special'
export const B1_14_HARBOUR_LEO = 'b1-14-harbour-leo'
export const B1_14_HARBOUR_MAYA = 'b1-14-harbour-maya'
export const B1_14_MANUEL_TALK = 'b1-14-manuel-talk'
export const B1_14_KEYCHAIN = 'b1-14-keychain'
export const B1_14_ECHO1 = 'b1-14-echo1'
export const B1_14_ECHO2 = 'b1-14-echo2'
export const B1_14_ECHO3 = 'b1-14-echo3'
export const B1_14_BOSS = 'b1-14-boss'

/**
 * Leyenda (Tiles.tsx, sin dibujos nuevos): f cerca · h luces (faroles) · _ piedra · w agua · H banca · p planta · d puerta.
 * Puerta a la residencia a la izquierda (0,3).
 */
const MAP = [
  'fhfhfhfhfhff',
  'f_H______H_f',
  'f__________f',
  'd__________f',
  'fp________pf',
  'wwwwwwwwwwww',
  'wwwwwwwwwwww',
]

const zoneAt = (): Zone => 'calle'

const WATER = { text: 'The water is dark and very still.', sub: 'El agua está oscura y muy quieta.', say: 'The water is dark and very still.' }

export const B1_14_HARBOUR: SceneDef = {
  id: B1_14_HARBOUR_ID,
  name: 'Voices · El puerto',
  topics: [],
  map: MAP,
  start: { x: 1, y: 3 },
  bossDoor: { x: 0, y: 0 },
  keysNeeded: 0,
  entities: [
    { type: 'npc', id: B1_14_MANUEL, x: 3, y: 2 },
    { type: 'npc', id: B1_14_HARBOUR_SPECIAL, x: 5, y: 3 },
    { type: 'npc', id: B1_14_HARBOUR_LEO, x: 2, y: 4 },
    { type: 'npc', id: B1_14_HARBOUR_MAYA, x: 4, y: 1 },
    { type: 'enemy', id: B1_14_ECHO1, x: 7, y: 2, after: B1_14_KEYCHAIN },
    { type: 'enemy', id: B1_14_ECHO2, x: 9, y: 3, after: B1_14_ECHO1 },
    { type: 'enemy', id: B1_14_ECHO3, x: 7, y: 4, after: B1_14_ECHO2 },
    { type: 'enemy', id: B1_14_BOSS, x: 9, y: 2, after: B1_14_ECHO3 },
  ],
  labels: [{ text: 'The harbour', x: 6, y: 1 }],
  zoneAt: () => zoneAt(),
  examine: Object.fromEntries([1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((x) => [`${x},5`, WATER])),
  locked: () => null,
  links: { '0,3': { sceneId: 'b1-14-lounge', pos: { x: 5, y: 5 } } },
  requirements: [],
  chips: (s: GameState) => [
    { label: 'Preguntarle a Manuel', done: s.opened.includes(B1_14_MANUEL_TALK) },
    { label: 'El llavero', done: s.opened.includes(B1_14_KEYCHAIN) },
    { label: 'Los ecos (3)', done: s.defeated.includes(B1_14_ECHO3) },
    { label: 'The Grudge', done: s.defeated.includes(B1_14_BOSS) },
  ],
  intro: {
    first: 'The harbour at sunrise. It is too quiet. — El puerto al amanecer. Hay demasiado silencio.',
    later: (s: GameState) => (s.defeated.includes(B1_14_BOSS) ? 'The harbour is calm again. Próximamente: el examen de B1 y el cierre. — El puerto vuelve a estar en calma.' : 'The harbour at sunrise. It is too quiet. — El puerto al amanecer. Hay demasiado silencio.'),
  },
}

/** El llavero (la persona especial, secuencia fija). El protagonista ata cabos; no se revela quién es el desconocido */
export const B1_14_KEYCHAIN_SCRIPT: ScriptLine[] = [
  { who: 'narrator', text: "Special person: You're holding the keychain again. Are you OK?", es: 'La persona especial: Otra vez tienes el llavero en la mano. ¿Estás bien?' },
  { who: 'narrator', text: '(You look at the little clock in your hand.)', es: '(Miras el relojito que tienes en la mano.)' },
  { who: 'narrator', text: '(You have seen it before. Not in the shop. In the memory of the fire.)', es: '(Ya lo habías visto. No en la tienda. En el recuerdo del incendio.)' },
  { who: 'narrator', text: "(It was hanging from the silent friend's backpack. The same keychain.)", es: '(Colgaba de la mochila del amigo callado. El mismo llavero.)' },
  { who: 'narrator', text: '(The fire has not happened yet. It will happen many years from now.)', es: '(El incendio todavía no ha pasado. Pasará dentro de muchos años.)' },
  { who: 'narrator', text: '(You whisper:) "The silent friend… was me."', es: '(Susurras:) "El amigo callado… era yo."' },
  { who: 'narrator', text: '(The man said that his friend had not helped him. He was talking about you.)', es: '(El hombre dijo que su amigo no lo había ayudado. Hablaba de ti.)' },
  { who: 'narrator', text: '(You whisper:) "The stranger blames me."', es: '(Susurras:) "El desconocido me culpa a mí."' },
  { who: 'narrator', text: '(The air goes cold. The water turns black. Something is rising from it.)', es: '(El aire se enfría. El agua se pone negra. Algo sale de ella.)' },
]

const GREY = { shirt: '#4a4a55', hair: '#2a2a33', skin: '#8f8f9c' }
const KINDS: EnemyDef['kinds'] = ['fix', 'fill', 'order', 'listen']

/**
 * Los ecos: esbirros de B1 que vuelven como repaso. Reutilizan las preguntas de los esbirros originales (sus etiquetas):
 * los viajeros perdidos (misión 2), Eviction Notice (recuerdo 5) y Ash Echo (recuerdo 11). Sin atuendo; dan escudo (echo).
 */
const ECHO = (id: string, name: string, topics: EnemyDef['topics'], tags: string[], before: { text: string; es: string }): EnemyDef => ({
  id,
  name,
  person: name,
  kind: 'minion',
  echo: true,
  hp: 4,
  topics,
  kinds: KINDS,
  tags,
  onlyTags: true,
  zone: 'calle',
  look: GREY,
  before: [before],
  after: [{ text: '(The echo breaks and falls back into the water.)', es: '(El eco se rompe y cae de nuevo al agua.)' }],
  freed: { text: '(Only water.)', es: '(Solo agua.)' },
})

const RS = 'reported-speech-b1' as const
const ST = 'say-tell-b1' as const
const RV = 'reporting-verbs-b1' as const
const IQ = 'indirect-questions-b1' as const

/**
 * El jefe final de B1: The Grudge, el eco de la rabia del desconocido (una sombra alta hecha de humo, sin cara).
 * Fase 1: reported speech (etiqueta b1-14-boss-r) · Fase 2: repaso mezclado de todo B1 (sin etiquetas: todo el banco de esos temas)
 * Fase 3: la voz del protagonista (etiqueta b1-14-boss-v): decir las frases en voz alta; sin reconocimiento de voz, se escriben.
 * Suelta la chaqueta de Lumen Bay ('chaqueta-lumen', data/school.ts). Preguntas en data/questions-b1-14.ts.
 */
export const B1_14_BOSS_DEF: EnemyDef = {
  id: B1_14_BOSS,
  name: 'The Grudge',
  person: 'The Grudge',
  kind: 'boss',
  reward: 'chaqueta-lumen',
  hp: 10,
  topics: [RS, ST, RV, IQ],
  kinds: KINDS,
  tags: ['b1-14-boss-r'],
  phases: [
    {
      hp: 3,
      title: 'Lo que se dijo',
      topics: [RS, ST, RV, IQ],
      kinds: KINDS,
      tags: ['b1-14-boss-r'],
      line: { text: 'You said me nothing! You told that you were my friend!', es: 'You said me y You told that: mal.' },
    },
    {
      hp: 4,
      title: 'Todo B1',
      topics: ['pp-yet-already', 'futures-b1', 'present-perfect-cont', 'obligation-b1', 'used-to', 'relative-clauses', 'deduction', 'superlatives-b1', 'passive-all', 'passive-news', 'conditional-2', 'conditional-3', 'wish-b1', 'state-verbs-b1', 'future-continuous-b1', 'although-unless-b1'],
      kinds: KINDS,
      line: { text: 'I have lose everything! If I would have a voice, I will scream!', es: 'I have lose y If I would have… I will: mal.' },
    },
    {
      hp: 3,
      title: 'Tu voz',
      topics: [ST, IQ],
      kinds: canRecognize ? ['speak'] : ['write'],
      tags: ['b1-14-boss-v'],
      line: { text: 'Say something! You never say anything!', es: '¡Di algo! ¡Tú nunca dices nada!' },
    },
  ],
  onlyTags: true,
  zone: 'calle',
  look: { shirt: '#1c1c22', hair: '#0f0f14', skin: '#55555f' },
  before: [{ text: 'You said me nothing! You told that you were my friend! Say something!', es: 'You said me y You told that: mal.' }],
  after: [{ text: 'The shadow breaks like smoke. The harbour is quiet again.', es: 'La sombra se deshace como humo. El puerto vuelve a estar en silencio.' }],
  freed: { text: 'The anger is gone. Only a question is left.', es: 'La rabia se fue. Solo queda una pregunta.' },
  farewell: {
    q: "The Grudge whispers: 'Why didn't you say anything?' What do you answer?",
    options: ['I not know yet. But I promised find out.', "I don't know yet. But I promise that I find out yesterday.", "I don't know yet. But I promise that I will find out."],
    answer: 2,
    tip: "I don't know + promise that + will.",
  },
}

export const B1_14_ENEMIES: Record<string, EnemyDef> = {
  [B1_14_ECHO1]: ECHO(B1_14_ECHO1, 'Eco del viajero perdido', ['pp-yet-already'], ['b1-02-trav1', 'b1-02-trav2'], {
    text: "Have you seen my voice yesterday? I haven't find it yet!",
    es: 'Have you seen… yesterday y haven\'t find: mal.',
  }),
  [B1_14_ECHO2]: ECHO(B1_14_ECHO2, 'Eco de Eviction Notice', ['used-to', 'get-used-to', 'bank-phrasal'], ['b1-05-notice'], {
    text: "I use to have a voice! I'm used to shout!",
    es: "I use to y I'm used to shout: mal.",
  }),
  [B1_14_ECHO3]: ECHO(B1_14_ECHO3, 'Eco de Ash Echo', ['conditional-3', 'pastperfect-b1'], ['b1-11-echo'], {
    text: 'If you would have shouted, I would have been fine!',
    es: 'If you would have shouted: mal.',
  }),
  [B1_14_BOSS]: B1_14_BOSS_DEF,
}
