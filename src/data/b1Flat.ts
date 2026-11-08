import type { EnemyDef, GameState, SceneDef, Zone } from '../game/types'
import type { ScriptLine } from './b1Accident'
import type { FinePrintContent } from '../components/FinePrint'
import type { MemoryPair } from '../components/MemoryChest'
import { B1_05_AD_IDS, B1_05_QUESTIONS } from './questions-b1-05'
import { closeId } from './b1World'

/**
 * B1-05 — Nothing Left. Recuerdo 5 (escena b1-05-flat; es recuerdo por el prefijo "b1-05-"). Juegas como L (SpriteL);
 * los demás con la cara borrosa (Explore lo hace solo en las escenas de recuerdo). Sin atuendos.
 * Bloque A (este): el apartamento de L, pequeño y casi vacío, meses después del incendio.
 *   El director en la puerta (tarea 'b1-05-letter', secuencia fija con MemoryScript) → el cuaderno de la mesa
 *   (tarea 'b1-05-used-to': lección 'used-to' como página 12 del Cuaderno de L + práctica, data/questions-b1-05.ts)
 *   → el periódico y el computador (tarea 'b1-05-jobs': anuncios de empleo con components/FinePrint.tsx en modo anuncios)
 *   → la puerta a la calle: "Próximamente: el banco (bloque 5-B)". Ningún bloque A guarda closeId(5) (se guarda en 5-D).
 */
export const B1_05_FLAT_ID = 'b1-05-flat'
/** El director (cara borrosa, traje gris). Su tarea guarda este id al terminar */
export const B1_05_DIRECTOR = 'b1-05-director'
export const B1_05_LETTER = 'b1-05-letter'
/** El cuaderno de la mesa: página 12 (used to) + práctica */
export const B1_05_NOTEBOOK = 'b1-05-notebook'
export const B1_05_USED_TO = 'b1-05-used-to'
/** El periódico y el computador: anuncios de empleo */
export const B1_05_PAPERS = 'b1-05-papers'
export const B1_05_JOBS = 'b1-05-jobs'
/** Bloque B: el banco (data/b1Bank.ts), la página 13 del mismo cuaderno y las cajas (Memory Chest) */
export const B1_05_BANK = 'b1-05-bank'
export const B1_05_GET_USED_TO = 'b1-05-get-used-to'
export const B1_05_BOXES = 'b1-05-boxes'
export const B1_05_CHEST = 'b1-05-chest'
/** Bloque C: la carta bajo la puerta (tarea 'b1-05-notice-letter') y los 2 esbirros Eviction Notice (en cadena, banco compartido) */
export const B1_05_ENVELOPE = 'b1-05-envelope'
export const B1_05_NOTICE_LETTER = 'b1-05-notice-letter'
export const B1_05_NOTICE1 = 'b1-05-notice1'
export const B1_05_NOTICE2 = 'b1-05-notice2'
/** Bloque D: el jefe The Collector (junto a la puerta) y "Tu caja" (tarea de cierre 'b1-05-close' = closeId(5)) */
export const B1_05_BOSS = 'b1-05-boss'
export const B1_05_BOX = 'b1-05-box'
export const B1_05_CLOSE = closeId(5)

/**
 * Un solo cuarto (leyenda de data/b1Words.ts: 5 cama · K mesa · W ventana · d puerta).
 * La mesa del cuaderno (5,2), la mesa del computador (1,5) y la puerta a la calle (11,3).
 */
const MAP = [
  '############',
  '#5....W....#',
  '#5...K.....#',
  '#..........d',
  '#..........#',
  '#K.........#',
  '############',
]

const zoneAt = (): Zone => 'casa'

const NOT_YET = (sub: string) => ({ text: 'Todavía no.', sub })

export const B1_05_FLAT: SceneDef = {
  id: B1_05_FLAT_ID,
  name: 'Recuerdo 5 · Nothing Left',
  topics: [],
  map: MAP,
  start: { x: 3, y: 3 },
  // Sin jefe en este bloque: la puerta del jefe apunta a un muro y no hace falta ninguna llave
  bossDoor: { x: 0, y: 0 },
  keysNeeded: 0,
  entities: [
    // El director, en la puerta (fuera del paso a la puerta de la calle)
    { type: 'npc', id: B1_05_DIRECTOR, x: 10, y: 2 },
    { type: 'npc', id: B1_05_NOTEBOOK, x: 5, y: 3 },
    { type: 'npc', id: B1_05_PAPERS, x: 2, y: 5 },
    // Bloque B: las cajas aparecen al terminar la página 13 (npcs.ts, after)
    { type: 'npc', id: B1_05_BOXES, x: 8, y: 5 },
    // Bloque C: la carta aparece al terminar el Memory Chest (npcs.ts, after); los avisos, uno tras otro
    { type: 'npc', id: B1_05_ENVELOPE, x: 10, y: 4 },
    { type: 'enemy', id: B1_05_NOTICE1, x: 7, y: 3, after: B1_05_NOTICE_LETTER },
    { type: 'enemy', id: B1_05_NOTICE2, x: 4, y: 4, after: B1_05_NOTICE1 },
    // Bloque D: el jefe junto a la puerta (tras los 2 avisos); al vencerlo aparece tu caja (npcs.ts, after)
    { type: 'enemy', id: B1_05_BOSS, x: 10, y: 3, after: B1_05_NOTICE2 },
    { type: 'npc', id: B1_05_BOX, x: 9, y: 4 },
  ],
  labels: [{ text: 'Apartamento', x: 6, y: 5 }],
  zoneAt: () => zoneAt(),
  examine: {
    '1,1': { text: 'My bed.', sub: 'Mi cama.', say: 'My bed.' },
    '1,2': { text: 'My bed.', sub: 'Mi cama.', say: 'My bed.' },
    '6,1': { text: 'The window.', sub: 'La ventana.', say: 'The window.' },
  },
  // La puerta a la calle: cerrada hasta terminar los anuncios; después lleva al banco (b1-05-bank).
  // Al terminar el Memory Chest: la carta y los avisos de desalojo (bloque C); después The Collector y tu caja (bloque D): se sale con la caja
  locked: (x, y, s) => {
    if (x !== 11 || y !== 3) return null
    if (!s.opened.includes(B1_05_JOBS)) return NOT_YET('Primero lee los anuncios de empleo.')
    if (s.defeated.includes(B1_05_BOSS)) return NOT_YET('Toma tu caja.')
    if (s.defeated.includes(B1_05_NOTICE1) && s.defeated.includes(B1_05_NOTICE2)) return NOT_YET('Primero vence a The Collector.')
    if (s.opened.includes(B1_05_CHEST)) return NOT_YET('Primero lee la carta bajo la puerta.')
    return null
  },
  links: { '11,3': { sceneId: 'b1-05-bank', pos: { x: 1, y: 3 } } },
  requirements: [],
  chips: (s: GameState) => [
    { label: 'Habla con el director', done: s.opened.includes(B1_05_LETTER) },
    { label: 'Cuaderno: página 12 (used to)', done: s.opened.includes(B1_05_USED_TO) },
    { label: 'Anuncios de empleo', done: s.opened.includes(B1_05_JOBS) },
    { label: 'El banco', done: s.opened.includes(B1_05_BANK) },
    { label: 'Cuaderno: página 13 (be / get used to)', done: s.opened.includes(B1_05_GET_USED_TO) },
    { label: 'Las cajas (Memory Chest)', done: s.opened.includes(B1_05_CHEST) },
    { label: 'La carta bajo la puerta', done: s.opened.includes(B1_05_NOTICE_LETTER) },
    { label: 'Avisos de desalojo (2)', done: s.defeated.includes(B1_05_NOTICE1) && s.defeated.includes(B1_05_NOTICE2) },
    { label: 'The Collector', done: s.defeated.includes(B1_05_BOSS) },
    { label: 'Salir con tu caja', done: s.opened.includes(B1_05_CLOSE) },
  ],
  // Tarjeta de apertura del recuerdo
  intro: {
    first: 'I used to live a different life. — Yo solía vivir otra vida.',
    later: (s) =>
      s.opened.includes(B1_05_CLOSE)
        ? 'Nothing Left. La misión 5 terminó: la misión 6 te espera en el mapa.'
        : 'I used to live a different life. — Yo solía vivir otra vida.',
  },
}

/** La carta de la escuela (secuencia fija, MemoryScript). 'friend' = el director · 'narrator' = L narra (no puede hablar) */
export const B1_05_LETTER_SCRIPT: ScriptLine[] = [
  { who: 'friend', text: 'Please sit down. We need to talk about your job.', es: 'Por favor, siéntate. Tenemos que hablar de tu trabajo.' },
  { who: 'friend', text: 'We need a teacher who can speak.', es: 'Necesitamos un profesor que pueda hablar.' },
  { who: 'narrator', text: "(He gives you a letter. You can't answer. You go home.)", es: '(Te da una carta. No puedes contestar. Vuelves a casa.)' },
  { who: 'narrator', text: '(You have lost your job.)', es: '(Perdiste tu trabajo.)' },
]

/** Anuncios de empleo (FinePrint en modo anuncios). Las preguntas salen de data/questions-b1-05.ts (b1-05-a1…a6) */
export const B1_05_JOB_ADS: FinePrintContent = {
  title: 'Job adverts',
  intro: { en: 'Read the job adverts.', es: 'Lee los anuncios de empleo.' },
  paper: { heading: 'JOB ADVERTS', sub: 'Newspaper · Jobs' },
  clauses: [],
  adverts: [
    {
      sections: [
        { label: 'Job', en: 'Teacher wanted — Bright School', es: 'Se busca profesor — Bright School' },
        { label: 'Requirements', en: 'Two years of experience. Excellent spoken communication.', es: 'Dos años de experiencia. Excelente comunicación oral.' },
        { label: 'Pay', en: '1,200 a month.', es: '1.200 al mes.' },
        { label: 'How to apply', en: 'Send your CV by Friday.', es: 'Envía tu hoja de vida a más tardar el viernes.' },
      ],
    },
    {
      sections: [
        { label: 'Job', en: 'Call centre assistant', es: 'Asistente de call center' },
        { label: 'Requirements', en: 'Excellent spoken communication. Friendly voice.', es: 'Excelente comunicación oral. Voz amable.' },
        { label: 'Pay', en: '900 a month.', es: '900 al mes.' },
        { label: 'How to apply', en: 'Call 555-0100 and ask for Mr. Dean.', es: 'Llama al 555-0100 y pregunta por el señor Dean.' },
      ],
    },
    {
      sections: [
        { label: 'Job', en: 'Shop assistant — Lumen Books', es: 'Vendedor de tienda — Lumen Books' },
        { label: 'Requirements', en: 'Excellent spoken communication. Weekends free.', es: 'Excelente comunicación oral. Fines de semana libres.' },
        { label: 'Pay', en: '800 a month.', es: '800 al mes.' },
        { label: 'How to apply', en: 'Come to the shop with your CV.', es: 'Ven a la tienda con tu hoja de vida.' },
      ],
    },
  ],
  questions: B1_05_AD_IDS.map((id) => B1_05_QUESTIONS.find((q) => q.id === id)!).map((q) => ({ prompt: q.prompt, options: q.options, answer: q.answer, tip: q.tip })),
  finish: { en: "(Every ad asks for the same thing: 'excellent spoken communication'.)", es: "(Todos los anuncios piden lo mismo: 'excelente comunicación oral'.)" },
}

/** Las cajas (Memory Chest): cada objeto con lo que L solía hacer con él */
export const B1_05_PACKING: { title: string; intro: { en: string; es: string }; pairs: MemoryPair[] } = {
  title: 'Packing',
  intro: { en: 'Pack your things. Match each object with what you used to do with it.', es: 'Empaca tus cosas. Une cada objeto con lo que solías hacer con él.' },
  pairs: [
    { a: 'the guitar', b: 'I used to play it every night.', example: { en: 'I used to play it every night.', es: 'La guitarra: solía tocarla todas las noches.' } },
    { a: 'the markers', b: 'I used to write on the board with them.', example: { en: 'I used to write on the board with them.', es: 'Los marcadores: solía escribir en la pizarra con ellos.' } },
    { a: 'the mug', b: 'I used to drink tea from it.', example: { en: 'I used to drink tea from it.', es: 'La taza: solía tomar té en ella.' } },
    { a: 'the books', b: 'I used to read them in bed.', example: { en: 'I used to read them in bed.', es: 'Los libros: solía leerlos en la cama.' } },
    { a: 'the microphone', b: 'I used to sing into it.', example: { en: 'I used to sing into it.', es: 'El micrófono: solía cantar con él.' } },
  ],
}

/** La carta bajo la puerta (secuencia fija, MemoryScript): 'narrator' = L narra · 'board' = la pizarra con el vocabulario */
export const B1_05_NOTICE_SCRIPT: ScriptLine[] = [
  { who: 'narrator', text: '(Someone puts a letter under the door.)', es: '(Alguien mete una carta por debajo de la puerta.)' },
  { who: 'board', text: 'evict = desalojar. owe = deber (dinero). debt = deuda. loan = préstamo. savings = ahorros. pay back = devolver (dinero).', es: 'evict = desalojar. owe = deber (dinero). debt = deuda. loan = préstamo. savings = ahorros. pay back = devolver (dinero).' },
  { who: 'board', text: "Con pronombre, pay back va dividido: pay it back (no 'pay back it').", es: "Con pronombre, pay back va dividido: pay it back (no 'pay back it')." },
  { who: 'narrator', text: "(The letter says: 'You owe three months of rent. Pay it back, or we will evict you.')", es: "(La carta dice: 'Debes tres meses de alquiler. Devuélvelo o te desalojaremos'.)" },
  { who: 'narrator', text: '(The paper moves. The ink is running. Two letters stand up.)', es: '(El papel se mueve. La tinta corre. Dos cartas se ponen de pie.)' },
]

// ── Bloque C · esbirros Eviction Notice (modelo de los vecinos ruidosos de 4-B). Sin atuendos (es un recuerdo) ──
const NOTICE_TAGS = ['b1-05-notice']
const NOTICE = (id: string, before: { text: string; es: string }, after: { text: string; es: string }, freed: { text: string; es: string }): EnemyDef => ({
  id,
  name: 'Eviction Notice',
  person: 'Eviction Notice',
  kind: 'minion',
  echo: true,
  hp: 5,
  topics: ['used-to', 'get-used-to', 'bank-phrasal'],
  kinds: ['fix', 'fill', 'order', 'listen'],
  tags: NOTICE_TAGS,
  onlyTags: true,
  zone: 'casa',
  look: { shirt: '#f2e6c8', hair: '#c9b48a', skin: '#e8dcc8' },
  before: [before],
  after: [after],
  freed,
})

export const B1_05_ENEMIES: Record<string, EnemyDef> = {
  [B1_05_NOTICE1]: NOTICE(
    B1_05_NOTICE1,
    { text: "I use to live here! I'm used to wake up early! Pay or leave!", es: "I use to live here y I'm used to wake up early: mal. (¡Paga o vete!)" },
    { text: "The ink is running... I'm just paper now.", es: 'La tinta se corre... ahora solo soy papel.' },
    { text: "Sorry. I didn't want to scare you.", es: 'Perdón. No quería asustarte.' },
  ),
  [B1_05_NOTICE2]: NOTICE(
    B1_05_NOTICE2,
    { text: 'Did you used to pay? You owe a lot! Pay back it today!', es: 'Did you used to pay y pay back it: mal. (¡Debes mucho!)' },
    { text: 'The letter is blank again.', es: 'La carta vuelve a estar en blanco.' },
    { text: 'Good luck, L. You are not alone.', es: 'Buena suerte, L. No estás solo.' },
  ),
}

// ── Bloque D · jefe The Collector (2 fases; modelo Mr. Fine Print). Sin reward: en los recuerdos no se ganan atuendos.
// Sus temas se recuperan en el cierre (b1-05-close) ──
export const B1_05_BOSS_ENEMIES: Record<string, EnemyDef> = {
  [B1_05_BOSS]: {
    id: B1_05_BOSS,
    name: 'The Collector',
    person: 'The Collector',
    kind: 'boss',
    hp: 8,
    topics: ['used-to', 'get-used-to'],
    kinds: ['fix', 'fill', 'order', 'listen'],
    tags: ['b1-05-boss'],
    phases: [
      {
        hp: 4,
        title: 'Used to',
        topics: ['used-to'],
        kinds: ['fix', 'fill', 'order', 'listen'],
        tags: ['b1-05-boss-u'],
        line: { text: "I use to be rich! I didn't used to be kind! Did you used to pay?", es: "I use to be, I didn't used to y Did you used to: mal." },
      },
      {
        hp: 4,
        title: 'Be / get used to',
        topics: ['get-used-to'],
        kinds: ['fix', 'fill', 'order', 'listen'],
        tags: ['b1-05-boss-g'],
        line: { text: "I'm used to take everything! You get used to lose!", es: "I'm used to take y get used to lose: mal." },
      },
    ],
    onlyTags: true,
    zone: 'casa',
    look: { shirt: '#2b2b2b', hair: '#555555', skin: '#d8c2a8' },
    before: [{ text: "I use to collect gold! Now I'm used to take everything! You owe me!", es: "I use to collect e I'm used to take: mal. (¡Me debes!)" }],
    after: [{ text: 'The coins turn into paper... and the paper into ashes.', es: 'Las monedas se vuelven papel... y el papel, ceniza.' }],
    freed: { text: 'I forgot I used to be a person.', es: 'Olvidé que yo solía ser una persona.' },
    farewell: { q: "The Collector says: 'Good luck, L!' What do you answer?", options: ["Thank you. I'm getting used to the silence.", "Thank you. I'm get used to the silence.", 'Thank you. I used to getting the silence.'], answer: 0, tip: "Proceso: I'm getting used to + sustantivo." },
  },
}

/** El cierre (secuencia fija, MemoryScript): L narra */
export const B1_05_CLOSE_SCRIPT: ScriptLine[] = [
  { who: 'narrator', text: '(The apartment is empty. You pick up your box and go out to the street.)', es: '(El apartamento está vacío. Tomas tu caja y sales a la calle.)' },
  { who: 'narrator', text: "(Your phone shines. A message from your friend: 'Stay with me, L.')", es: "(Tu teléfono brilla. Un mensaje de tu amiga: 'Quédate conmigo, L.')" },
  { who: 'narrator', text: "(You read it three times. You don't answer.)", es: '(Lo lees tres veces. No contestas.)' },
]
