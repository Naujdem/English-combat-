import type { EnemyDef, GameState, SceneDef, Zone } from '../game/types'
import type { ScriptLine } from './b1Accident'

/**
 * B1-03 — Words on a Screen. Recuerdo 3 (escena b1-03-hospital; es recuerdo por el prefijo "b1-03-").
 * Bloque A (este): L despierta en el hospital → la médica (tarea 'b1-03-doctor', secuencia fija con MemoryScript;
 *   L no habla, solo "…") → se abre el pasillo al apartamento de L → el cuaderno del escritorio (tarea 'b1-03-notebook'):
 *   lección 'informal-messages' como página 1 del Cuaderno de L (components/LNotebook.tsx) + práctica (data/questions-b1-03.ts).
 * Bloque B: el teléfono (tarea 'b1-03-texts', Text Only: components/TextOnly.tsx, data/b1TextOnly.ts) → el mismo cuaderno
 *   del escritorio da la página 2 (tarea 'b1-03-notebook2', lección 'present-perfect-cont' + práctica).
 * Bloque C: al terminar la página 2 aparecen los 3 Unread Messages (uno tras otro) → The Static (jefe, 2 fases) → el mismo teléfono
 *   vibra con el cierre (tarea 'b1-03-close'): responde a la amiga, recupera los temas y sale del recuerdo con closeId(3) (abre el nodo 4).
 *   Preguntas en data/questions-b1-03.ts; diario en data/b1Diary.ts. En los recuerdos no se ganan atuendos.
 * L se dibuja con SpriteL y la médica con la cara borrosa (Explore lo hace solo en las escenas de recuerdo).
 */
export const B1_03_HOSPITAL_ID = 'b1-03-hospital'
/** La médica (cara borrosa, sin nombre propio). Su tarea guarda este id al terminar: abre el camino al apartamento */
export const B1_03_DOCTOR = 'b1-03-doctor'
/** El cuaderno sobre el escritorio del apartamento. Su tarea (página 1 + práctica) guarda este id */
export const B1_03_NOTEBOOK = 'b1-03-notebook'
/** Bloque B: el teléfono del apartamento (Text Only, tarea 'b1-03-texts'). La página 2 (tarea 'b1-03-notebook2') sale del mismo cuaderno */
export const B1_03_PHONE = 'b1-03-phone'
export const B1_03_TEXTS = 'b1-03-texts'
export const B1_03_NOTEBOOK2 = 'b1-03-notebook2'
/** Bloque C: los esbirros (en cadena), el jefe y la tarea del cierre (en el mismo teléfono de Text Only, al vencer al jefe) */
export const B1_03_UNREAD1 = 'b1-03-unread1'
export const B1_03_UNREAD2 = 'b1-03-unread2'
export const B1_03_UNREAD3 = 'b1-03-unread3'
export const B1_03_STATIC = 'b1-03-static'
export const B1_03_CLOSE_PHONE = 'b1-03-close'

/**
 * Dos zonas unidas por un pasillo. Izquierda: la habitación del hospital (leyenda de data/a2Hospital.ts:
 * W ventana · F gabinete · 5 cama · K mesa de noche). Derecha: el apartamento de L (5 cama · K escritorio · W ventana · p planta).
 * La puerta del apartamento (13,3) se abre al terminar la charla con la médica.
 */
const MAP = [
  '####################',
  '#W....########W...p#',
  '#F....########..K..#',
  '#5....d......d.....#',
  '#5....########5....#',
  '#K....########5....#',
  '####################',
]

/** Se reutilizan pisos existentes: hospital como en A2-01, el pasillo del hospital y la casa */
function zoneAt(x: number): Zone {
  if (x <= 6) return 'aula-futuro'
  if (x <= 12) return 'lobby-torre'
  return 'casa'
}

const BED = { text: 'A hospital bed.', sub: 'Una cama de hospital.', say: 'A hospital bed.' }
const WINDOW = { text: 'The window.', sub: 'La ventana.', say: 'The window.' }

export const B1_03_HOSPITAL: SceneDef = {
  id: B1_03_HOSPITAL_ID,
  name: 'Recuerdo 3 · Words on a Screen',
  topics: [],
  map: MAP,
  start: { x: 3, y: 4 },
  // Sin jefe en este bloque: la puerta del jefe apunta a un muro y no hace falta ninguna llave
  bossDoor: { x: 0, y: 0 },
  keysNeeded: 0,
  entities: [
    { type: 'npc', id: B1_03_DOCTOR, x: 2, y: 3 },
    { type: 'npc', id: B1_03_NOTEBOOK, x: 16, y: 3 },
    { type: 'npc', id: B1_03_PHONE, x: 18, y: 2 },
    // Bloque C: junto al teléfono, junto al escritorio y junto a la ventana; cada uno al vencer al anterior
    { type: 'enemy', id: B1_03_UNREAD1, x: 18, y: 3, after: B1_03_NOTEBOOK2 },
    { type: 'enemy', id: B1_03_UNREAD2, x: 17, y: 2, after: B1_03_UNREAD1 },
    { type: 'enemy', id: B1_03_UNREAD3, x: 15, y: 1, after: B1_03_UNREAD2 },
    // El jefe, cerca de la puerta del apartamento
    { type: 'enemy', id: B1_03_STATIC, x: 14, y: 2, after: B1_03_UNREAD3 },
  ],
  labels: [
    { text: 'Hospital', x: 3, y: 5 },
    { text: 'Pasillo', x: 9, y: 3 },
    { text: 'Apartamento', x: 17, y: 5 },
  ],
  zoneAt: (x) => zoneAt(x),
  examine: {
    '1,3': BED,
    '1,4': BED,
    '1,1': WINDOW,
    '14,1': WINDOW,
    '16,2': { text: 'My desk. A notebook is waiting.', sub: 'Mi escritorio. Un cuaderno está esperando.', say: 'My desk. A notebook is waiting.' },
    '1,5': { text: 'My phone. No messages yet.', sub: 'Mi teléfono. Todavía no hay mensajes.', say: 'My phone. No messages yet.' },
  },
  // El camino al apartamento se abre al terminar la charla con la médica
  locked: (x, y, s) => (x === 13 && y === 3 && !s.opened.includes(B1_03_DOCTOR) ? { text: 'Todavía no.', sub: 'Primero habla con la médica.' } : null),
  requirements: [],
  chips: (s: GameState) => [
    { label: 'Habla con la médica', done: s.opened.includes(B1_03_DOCTOR) },
    { label: 'Cuaderno: página 1', done: s.opened.includes(B1_03_NOTEBOOK) },
    { label: 'Text Only (el teléfono)', done: s.opened.includes(B1_03_TEXTS) },
    { label: 'Cuaderno: página 2', done: s.opened.includes(B1_03_NOTEBOOK2) },
    { label: 'Unread Messages (3)', done: s.defeated.includes(B1_03_UNREAD3) },
    { label: 'The Static', done: s.defeated.includes(B1_03_STATIC) },
    { label: 'Responde a tu amiga', done: s.opened.includes(B1_03_CLOSE_PHONE) },
  ],
  intro: {
    first: 'Un recuerdo que no es tuyo. Hospital. Una voz amable, cara borrosa.',
    later: 'Un recuerdo que no es tuyo.',
  },
}

/** La charla con la médica (secuencia fija, MemoryScript). 'friend' = la médica · 'narrator' = L narra (no puede hablar) */
export const B1_03_DOCTOR_SCRIPT: ScriptLine[] = [
  { who: 'friend', text: "Your vocal cords are damaged. You can't speak for a long time.", es: 'Tus cuerdas vocales están dañadas. No podrás hablar por mucho tiempo.' },
  { who: 'narrator', text: 'I tried to answer. Nothing came out. Only...', es: 'Intenté responder. No salió nada. Solo...' },
  { who: 'narrator', text: '…', es: '(Silencio.)' },
  { who: 'friend', text: "Use your phone to communicate. Text, message, reply. It's not the end of the world.", es: 'Usa tu teléfono para comunicarte. Escribe, manda mensajes, responde. No es el fin del mundo.' },
  { who: 'narrator', text: '(I go home. On the desk there is a notebook.)', es: '(Vuelvo a mi apartamento. En el escritorio hay un cuaderno.)' },
]

// ── Bloque C · esbirros y jefe. Sus frases con error están mal en cualquier contexto. Sin atuendos (es un recuerdo) ──
const IM = 'informal-messages' as const
const PPC = 'present-perfect-cont' as const
const UNREAD = (id: string, before: { text: string; es: string }, after: { text: string; es: string }, freed: { text: string; es: string }, bonus: EnemyDef['bonus']): EnemyDef => ({
  id,
  name: 'Unread Message',
  person: 'Unread Message',
  kind: 'minion',
  echo: true,
  hp: 4,
  topics: [IM, PPC],
  kinds: ['fill', 'fix', 'order', 'listen'],
  tags: ['b1-03-unread'],
  onlyTags: true,
  zone: 'casa',
  look: { shirt: '#5a4a8a', hair: '#c8b8f0', skin: '#d8d0e8' },
  before: [before],
  after: [after],
  freed,
  bonus,
})

export const B1_03_ENEMIES: Record<string, EnemyDef> = {
  [B1_03_UNREAD1]: UNREAD(
    B1_03_UNREAD1,
    { text: "Unread: 47 messages! I've been waiting since three weeks! Read me!", es: 'Sin leer: ¡47 mensajes! ¡Llevo esperando desde hace tres semanas! ¡Léeme! (since three weeks: mal).' },
    { text: 'Read... finally read.', es: 'Leído... por fin leído.' },
    { text: 'Thanks for reading me.', es: 'Gracias por leerme.' },
    { q: 'Elige la frase correcta:', options: ['He has been waiting for two hours.', 'He has been waiting since two hours.', 'He is waiting for two hours.'], answer: 0, tip: 'Un período de tiempo: for + have been + -ing.' },
  ),
  [B1_03_UNREAD2]: UNREAD(
    B1_03_UNREAD2,
    { text: 'Unread: How long are you feeling this? Answer me! Bzzzt!', es: 'Sin leer: ¿Cuánto tiempo estás sintiendo esto? ¡Respóndeme! Bzzzt! (How long are you feeling this: mal).' },
    { text: 'Answered... quiet now.', es: 'Respondido... ya hay silencio.' },
    { text: 'Thanks for answering me.', es: 'Gracias por responderme.' },
    { q: 'Elige la pregunta correcta:', options: ['How long are you been waiting?', 'How long have you been waiting?', 'How long you have waiting?'], answer: 1, tip: 'Duración: How long + have you been + -ing?' },
  ),
  [B1_03_UNREAD3]: UNREAD(
    B1_03_UNREAD3,
    { text: 'Unread: See tomorrow you! Sounds goods! Reply me!', es: 'Sin leer: ¡Nos vemos mañana! ¡Suena bien! ¡Respóndeme! (See tomorrow you, Sounds goods y Reply me: mal).' },
    { text: 'Replied... all done.', es: 'Respondido... todo listo.' },
    { text: 'Thanks. Now I can rest.', es: 'Gracias. Ahora puedo descansar.' },
    { q: 'Elige el mensaje correcto:', options: ['Sounds goods. See you tomorrow.', 'Sound good. See tomorrow you.', 'Sounds good. See you tomorrow.'], answer: 2, tip: 'Mensaje rápido y correcto: Sounds good. See you tomorrow.' },
  ),
  // Jefe (2 fases). Sin reward: en los recuerdos no se ganan atuendos. Sus temas se recuperan en el cierre (b1-03-close)
  [B1_03_STATIC]: {
    id: B1_03_STATIC,
    name: 'The Static',
    person: 'The Static',
    kind: 'boss',
    hp: 8,
    topics: [IM, PPC],
    kinds: ['fill', 'fix', 'order', 'listen'],
    tags: ['b1-03-boss'],
    phases: [
      {
        hp: 4,
        title: 'Mensajes informales',
        topics: [IM],
        kinds: ['fill', 'fix', 'order', 'listen'],
        tags: ['b1-03-boss-msg'],
        line: { text: 'Sounds goods! See tomorrow you! Drop me line!', es: 'Sounds goods, See tomorrow you y Drop me line: mal.' },
      },
      {
        hp: 4,
        title: 'Present perfect continuous',
        topics: [PPC],
        kinds: ['fill', 'fix', 'order', 'listen'],
        tags: ['b1-03-boss-ppc'],
        line: { text: 'I am knowing her since years! How long are you waiting?', es: 'I am knowing her since years y How long are you waiting: mal.' },
      },
    ],
    onlyTags: true,
    zone: 'casa',
    look: { shirt: '#3a3452', hair: '#8a7fb0', skin: '#b8b0c8' },
    before: [{ text: 'Bzzzt... I have been talking since three weeks! How long you have been silent? Bzzzt!', es: 'Bzzzt... ¡Llevo hablando desde hace tres semanas! ¿Cuánto tiempo llevas callado? Bzzzt! (since three weeks y How long you have been: mal).' }],
    after: [{ text: 'Bzzzt... quiet... I... hear nothing... finally.', es: 'Bzzzt... silencio... no... oigo nada... por fin.' }],
    freed: { text: '...', es: '(El ruido se apagó.)' },
    farewell: { q: "The Static whispers: 'See you around...' What do you answer?", options: ['See you! Takes care.', 'See you! Take care.', 'See you! Taking care.'], answer: 1, tip: 'Despedida natural: See you! Take care.' },
  },
}
