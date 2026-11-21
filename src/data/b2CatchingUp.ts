import type { EnemyDef, GameState, SceneDef, Zone } from '../game/types'
import type { ScriptLine } from './b1Accident'
import type { TextOnlyContent } from '../components/TextOnly'

/**
 * B2-01 · Catching Up (presente). Bloque 1: el paseo del puerto de Lumen Bay con la terraza del café (escena b2-01-port).
 * Para ahorrar escenas, el café, Marisol (con Moscú), Jeison y Nayi (paseando a Lupe) están en el mismo paseo
 * (la ficha los ponía en la residencia y en Lumen Paws).
 * Orden: la persona especial (b2-01-breakfast, script: el desayuno y la voz de Leo) →
 *   la persona especial: lección 'catching-up-b2' + práctica (b2-01-catchup) →
 *   ponerse al día con Marisol, Jeison y Nayi (b2-01-marisol, b2-01-jeison, b2-01-nayi, scripts) →
 *   la persona especial: lección 'pp-contrast-b2' + práctica (b2-01-ppcont).
 * Bloque 2: la persona especial: lección 'reactions-b2' + práctica (b2-01-reactions) → Maya: Group Chat (b2-01-chat, Text Only) →
 *   dos Awkward Silences (esbirros) → el jefe ligero Echo of the Grudge (2 fases), en el muelle.
 * Bloque 3 (pendiente): amistad, diario, recompensa y cierre (el fragmento suelto).
 */
export const B2_01_PORT_ID = 'b2-01-port'
export const B2_01_SPECIAL = 'b2-01-special'
export const B2_01_LEO = 'b2-01-leo'
export const B2_01_MAYA = 'b2-01-maya'
export const B2_01_MARISOL = 'b2-01-marisol'
export const B2_01_JEISON = 'b2-01-jeison'
export const B2_01_NAYI = 'b2-01-nayi'
/** Moscú, la gata de Marisol (se dibuja con AnimalSprite, Explore.tsx) */
export const B2_01_MOSCU = 'b2-01-moscu'
/** Tareas (marcas en `opened`) */
export const B2_01_BREAKFAST = 'b2-01-breakfast'
export const B2_01_CATCHUP = 'b2-01-catchup'
export const B2_01_PPCONT = 'b2-01-ppcont'
/** Bloque 2 */
export const B2_01_REACTIONS = 'b2-01-reactions'
export const B2_01_CHAT = 'b2-01-chat'
export const B2_01_SILENCE1 = 'b2-01-silence1'
export const B2_01_SILENCE2 = 'b2-01-silence2'
export const B2_01_BOSS = 'b2-01-boss'
/** Charlas con Marisol, Jeison y Nayi: la marca es el id del NPC + '-talk' */
export const B2_01_TALKS = [`${B2_01_MARISOL}-talk`, `${B2_01_JEISON}-talk`, `${B2_01_NAYI}-talk`]

/**
 * Leyenda (Tiles.tsx, sin dibujos nuevos): f valla · h farol · _ suelo del paseo · K mesa · p planta · w agua.
 * Arriba la terraza del café (mesas), abajo el muelle y el agua.
 */
const MAP = [
  'fhfhfhfhfhff',
  'f_KK____KK_f',
  'f__________f',
  'f__________f',
  'fp________pf',
  'wwwwwwwwwwww',
  'wwwwwwwwwwww',
]

const zoneAt = (y: number): Zone => (y <= 2 ? 'cafe' : 'calle')

export const B2_01_PORT: SceneDef = {
  id: B2_01_PORT_ID,
  name: 'Catching Up · El paseo del puerto',
  topics: [],
  map: MAP,
  start: { x: 5, y: 3 },
  // Sin jefe en este bloque: la puerta del jefe apunta a un muro y no hace falta ninguna llave
  bossDoor: { x: 0, y: 0 },
  keysNeeded: 0,
  entities: [
    { type: 'npc', id: B2_01_SPECIAL, x: 4, y: 2 },
    { type: 'npc', id: B2_01_LEO, x: 2, y: 2 },
    { type: 'npc', id: B2_01_MAYA, x: 3, y: 2 },
    { type: 'npc', id: B2_01_MARISOL, x: 9, y: 2 },
    { type: 'npc', id: B2_01_MOSCU, x: 10, y: 2 },
    { type: 'npc', id: B2_01_JEISON, x: 7, y: 4 },
    { type: 'npc', id: B2_01_NAYI, x: 9, y: 4 },
    // Bloque 2: los silencios incómodos y el eco, en el muelle
    { type: 'enemy', id: B2_01_SILENCE1, x: 3, y: 4, after: B2_01_CHAT },
    { type: 'enemy', id: B2_01_SILENCE2, x: 6, y: 3, after: B2_01_SILENCE1 },
    { type: 'enemy', id: B2_01_BOSS, x: 8, y: 3, after: B2_01_SILENCE2 },
  ],
  labels: [{ text: 'Port Café', x: 2, y: 0 }],
  zoneAt: (_x, y) => zoneAt(y),
  examine: {
    '5,5': { text: 'The sea is calm this morning.', sub: 'El mar está tranquilo esta mañana.', say: 'The sea is calm this morning.' },
  },
  locked: () => null,
  links: {},
  requirements: [],
  chips: (s: GameState) => [
    { label: 'Desayuno en el café', done: s.opened.includes(B2_01_BREAKFAST) },
    { label: 'Ponerse al día (lección)', done: s.opened.includes(B2_01_CATCHUP) },
    { label: 'Marisol, Jeison y Nayi', done: B2_01_TALKS.every((t) => s.opened.includes(t)) },
    { label: 'Present perfect: simple o continuo', done: s.opened.includes(B2_01_PPCONT) },
    { label: 'Reacciones (lección)', done: s.opened.includes(B2_01_REACTIONS) },
    { label: 'El chat de grupo', done: s.opened.includes(B2_01_CHAT) },
    { label: 'Los silencios incómodos (2)', done: s.defeated.includes(B2_01_SILENCE2) },
    { label: 'Echo of the Grudge', done: s.defeated.includes(B2_01_BOSS) },
  ],
  intro: {
    first: 'The morning after the harbour. The Port Café smells of coffee. — La mañana después del puerto. El café huele a café.',
    later: () => 'The port promenade. — El paseo del puerto.',
  },
}

/** El desayuno (secuencia fija, MemoryScript): la voz de Leo se quiebra y la persona especial lo nota */
export const B2_01_BREAKFAST_SCRIPT: ScriptLine[] = [
  { who: 'narrator', text: '(The Port Café. Your friends are already at a table by the window.)', es: '(El café del puerto. Tus amigos ya están en una mesa junto a la ventana.)' },
  { who: 'narrator', text: 'Maya: There you are! We ordered you a hot chocolate.', es: 'Maya: ¡Ahí estás! Te pedimos un chocolate caliente.' },
  { who: 'narrator', text: 'Leo: Good m… (his voice breaks.) …morning.', es: 'Leo: Buenos dí… (se le quiebra la voz.) …días.' },
  { who: 'narrator', text: 'Leo: Ha! Too much coffee. Anyway!', es: 'Leo: ¡Ja! Demasiado café. ¡En fin!' },
  { who: 'narrator', text: '(The special person looks at Leo for a second, but says nothing.)', es: '(La persona especial mira a Leo un segundo, pero no dice nada.)' },
  { who: 'narrator', text: 'Special person: So much has happened. We never just talk anymore. What have you been up to?', es: 'La persona especial: Han pasado tantas cosas. Ya nunca hablamos sin más. ¿En qué has andado?' },
  { who: 'narrator', text: '(You open your mouth… and realise you don\'t know how to start.)', es: '(Abres la boca… y te das cuenta de que no sabes cómo empezar.)' },
  { who: 'narrator', text: 'Special person: Come on, I\'ll show you. Catching up is easy.', es: 'La persona especial: Ven, te enseño. Ponerse al día es fácil.' },
]

/** Marisol, con Moscú: lleva semanas arreglando el jardín de la residencia */
export const B2_01_MARISOL_SCRIPT: ScriptLine[] = [
  { who: 'narrator', text: 'Marisol: Long time no see! How have you been?', es: 'Marisol: ¡Cuánto tiempo sin verte! ¿Cómo has estado?' },
  { who: 'narrator', text: 'Marisol: Me? I\'ve been working on the garden for weeks. Look at my hands!', es: 'Marisol: ¿Yo? Llevo semanas trabajando en el jardín. ¡Mira mis manos!' },
  { who: 'narrator', text: 'Marisol: I\'ve planted twenty roses so far. Moscú has dug up three of them.', es: 'Marisol: Hasta ahora he plantado veinte rosas. Moscú ya desenterró tres.' },
  { who: 'narrator', text: '(Moscú looks at you as if nothing happened.)', es: '(Moscú te mira como si nada hubiera pasado.)' },
]

/** Jeison: ha estado estudiando para un examen y ya terminó dos */
export const B2_01_JEISON_SCRIPT: ScriptLine[] = [
  { who: 'narrator', text: 'Jeison: Hey! It\'s been ages! What have you been up to?', es: 'Jeison: ¡Hola! ¡Hace siglos! ¿En qué has andado?' },
  { who: 'narrator', text: 'Jeison: I\'ve been studying all week. I\'m exhausted.', es: 'Jeison: He estado estudiando toda la semana. Estoy agotado.' },
  { who: 'narrator', text: 'Jeison: But good news: I\'ve finished two exams. Only one more!', es: 'Jeison: Pero buenas noticias: ya terminé dos exámenes. ¡Solo me falta uno!' },
]

/** Nayi, paseando a Lupe: ha estado corriendo con los perros (evidencia visible: está sin aliento) */
export const B2_01_NAYI_SCRIPT: ScriptLine[] = [
  { who: 'narrator', text: '(Nayi arrives out of breath. Lupe is pulling the leash.)', es: '(Nayi llega sin aliento. Lupe tira de la correa.)' },
  { who: 'narrator', text: 'Nayi: Sorry, I\'ve been running with the dogs since seven!', es: 'Nayi: ¡Perdón, llevo corriendo con los perros desde las siete!' },
  { who: 'narrator', text: 'Nayi: I\'ve walked five dogs today. Lupe is the last one.', es: 'Nayi: Hoy ya paseé cinco perros. Lupe es la última.' },
  { who: 'narrator', text: 'Nayi: How long have you been in Lumen Bay now? It feels like forever!', es: 'Nayi: ¿Cuánto llevas en Lumen Bay ya? ¡Parece una eternidad!' },
]

/** Group Chat (Maya; components/TextOnly.tsx con hero): el chat del grupo del intercambio. En cada elección solo UNA opción es correcta */
const ASK = 'Tú respondes:'
const LOOK = {
  maya: { shirt: '#d4537e', hair: '#4a2c17', skin: '#c68642', gender: 'female' as const },
  jeison: { shirt: '#3b9d5d', hair: '#2b2b33', skin: '#c68642', gender: 'male' as const },
  nayi: { shirt: '#e0873a', hair: '#6b3a2a', skin: '#d9a37a', gender: 'female' as const },
  leo: { shirt: '#3b9d5d', hair: '#2d2d3a', skin: '#e0ac69', gender: 'male' as const },
}
export const B2_01_GROUP_CHAT: TextOnlyContent = {
  title: 'Group Chat',
  hero: true,
  intro: { text: 'Your phone buzzes. The exchange group chat is full of news.', es: 'Tu teléfono vibra. El chat de grupo del intercambio está lleno de novedades.' },
  chats: [
    {
      contact: 'Lumen Exchange 💬',
      steps: [
        { text: "Guess what? I've been learning to surf!", es: '¿Adivina qué? ¡He estado aprendiendo a surfear!', speaker: { name: 'Maya', look: LOOK.maya }, choice: { ask: ASK, options: ["No way! That's amazing!", "No road! That's amazed!", 'I am very surprised by this information.'], answer: 0, tip: 'Reacción natural: No way! That\'s amazing!' } },
        { text: "I've finished my second exam!", es: '¡Ya terminé mi segundo examen!', speaker: { name: 'Jeison', look: LOOK.jeison }, choice: { ask: ASK, options: ['Congrats! You must relieved.', 'Felicitations upon your academic achievement.', 'Congrats! You must be relieved.'], answer: 2, tip: 'You must be + adjetivo: You must be relieved.' } },
        { text: 'I love Lumen Bay in the morning.', es: 'Me encanta Lumen Bay por la mañana.', speaker: { name: 'Nayi', look: LOOK.nayi }, choice: { ask: ASK, options: ['So I do!', 'So do I!', 'Neither do I!'], answer: 1, tip: 'Frase positiva con love → So do I (auxiliar antes del sujeto).' } },
        { text: "I haven't slept much this week.", es: 'No he dormido mucho esta semana.', speaker: { name: 'Leo', look: LOOK.leo }, choice: { ask: ASK, options: ['Neither have I.', 'Neither I have.', 'So have I.'], answer: 0, tip: "Frase negativa con haven't → Neither have I." } },
        { text: 'Are we meeting at the café tomorrow?', es: '¿Nos vemos mañana en el café?', choice: { ask: ASK, options: ['I am of the opinion that this is so.', 'I think so!', 'I think yes so!'], answer: 1, tip: 'Respuesta corta: I think so!' } },
      ],
    },
  ],
  finish: { text: "Everyone has been moving on. And Leo hasn't said a word about his voice.", es: 'Todos han seguido adelante. Y Leo no ha dicho ni una palabra sobre su voz.' },
}

const RE = 'reactions-b2' as const
const PC = 'pp-contrast-b2' as const
const KINDS: EnemyDef['kinds'] = ['fill', 'fix']
const SILENCE_LOOK = { shirt: '#5b5f6b', hair: '#3a3d46', skin: '#9da1ab' }

/** Awkward Silences: silencios incómodos corrompidos que cortan las conversaciones. Preguntas: etiqueta b2-01-silence */
const SILENCE = (id: string, line: { text: string; es: string }): EnemyDef => ({
  id,
  name: 'Awkward Silence',
  person: 'Awkward Silence',
  kind: 'minion',
  hp: 4,
  topics: [PC, RE],
  kinds: KINDS,
  tags: ['b2-01-silence'],
  onlyTags: true,
  zone: 'calle',
  look: SILENCE_LOOK,
  before: [line],
  after: [{ text: '(The silence breaks. Somewhere, someone laughs.)', es: '(El silencio se rompe. En algún lugar, alguien se ríe.)' }],
  freed: { text: '(Only the sound of the sea.)', es: '(Solo el sonido del mar.)' },
})

/**
 * Echo of the Grudge: un resto de The Grudge (B1) que se forma en el muelle. Jefe ligero de 2 fases.
 * Fase 1: present perfect simple o continuo (etiqueta b2-01-boss-pp) · Fase 2: reacciones y respuestas cortas (b2-01-boss-re).
 * En el bloque 3 suelta UN fragmento (queda suelto en el reloj) y el atuendo.
 */
export const B2_01_BOSS_DEF: EnemyDef = {
  id: B2_01_BOSS,
  name: 'Echo of the Grudge',
  person: 'Echo of the Grudge',
  kind: 'boss',
  hp: 8,
  topics: [PC, RE],
  kinds: KINDS,
  tags: ['b2-01-boss-pp'],
  phases: [
    { hp: 4, title: 'Lo que has hecho', topics: [PC], kinds: KINDS, tags: ['b2-01-boss-pp'], line: { text: "I've been finishing everything! How long are you living with your silence?", es: "I've been finishing (algo ya terminado) y How long are you living: mal." } },
    { hp: 4, title: 'Reacciones', topics: [RE], kinds: KINDS, tags: ['b2-01-boss-re'], line: { text: 'So am I! I think not so! Nobody reacts like you!', es: 'So am I (a "I love…") y I think not so: mal.' } },
  ],
  onlyTags: true,
  zone: 'calle',
  look: { shirt: '#2a2a33', hair: '#15151b', skin: '#6a6a76' },
  before: [{ text: "Everyone has moved on… but you haven't. I've been waiting for you.", es: 'Todos siguieron adelante… pero tú no. Te he estado esperando.' }],
  after: [{ text: '(The echo fades like smoke over the water.)', es: '(El eco se desvanece como humo sobre el agua.)' }],
  freed: { text: '(A small piece of light floats where the echo was.)', es: '(Un pedacito de luz flota donde estaba el eco.)' },
}

export const B2_01_ENEMIES: Record<string, EnemyDef> = {
  [B2_01_SILENCE1]: SILENCE(B2_01_SILENCE1, { text: "So… I've been read three books… Neither I have anything to say.", es: "I've been read y Neither I have: mal." }),
  [B2_01_SILENCE2]: SILENCE(B2_01_SILENCE2, { text: "…So I do. How long are you waiting here?", es: 'So I do y How long are you waiting: mal.' }),
  [B2_01_BOSS]: B2_01_BOSS_DEF,
}
