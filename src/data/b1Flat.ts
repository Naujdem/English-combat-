import type { GameState, SceneDef, Zone } from '../game/types'
import type { ScriptLine } from './b1Accident'
import type { FinePrintContent } from '../components/FinePrint'
import type { MemoryPair } from '../components/MemoryChest'
import { B1_05_AD_IDS, B1_05_QUESTIONS } from './questions-b1-05'

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
  ],
  labels: [{ text: 'Apartamento', x: 6, y: 5 }],
  zoneAt: () => zoneAt(),
  examine: {
    '1,1': { text: 'My bed.', sub: 'Mi cama.', say: 'My bed.' },
    '1,2': { text: 'My bed.', sub: 'Mi cama.', say: 'My bed.' },
    '6,1': { text: 'The window.', sub: 'La ventana.', say: 'The window.' },
  },
  // La puerta a la calle: cerrada hasta terminar los anuncios; después lleva al banco (b1-05-bank).
  // Al terminar el Memory Chest: el aviso de desalojo llega en el bloque 5-C
  locked: (x, y, s) => {
    if (x !== 11 || y !== 3) return null
    if (!s.opened.includes(B1_05_JOBS)) return NOT_YET('Primero lee los anuncios de empleo.')
    if (s.opened.includes(B1_05_CHEST)) return { text: 'Próximamente: el aviso de desalojo (bloque 5-C)' }
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
    ...(s.opened.includes(B1_05_CHEST) ? [{ label: 'Próximamente: el aviso de desalojo (bloque 5-C)', done: false }] : []),
  ],
  // Tarjeta de apertura del recuerdo
  intro: {
    first: 'I used to live a different life. — Yo solía vivir otra vida.',
    later: 'I used to live a different life. — Yo solía vivir otra vida.',
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
