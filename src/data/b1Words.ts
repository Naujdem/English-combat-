import type { GameState, SceneDef, Zone } from '../game/types'
import type { ScriptLine } from './b1Accident'

/**
 * B1-03 — Words on a Screen. Recuerdo 3 (escena b1-03-hospital; es recuerdo por el prefijo "b1-03-").
 * Bloque A (este): L despierta en el hospital → la médica (tarea 'b1-03-doctor', secuencia fija con MemoryScript;
 *   L no habla, solo "…") → se abre el pasillo al apartamento de L → el cuaderno del escritorio (tarea 'b1-03-notebook'):
 *   lección 'informal-messages' como página 1 del Cuaderno de L (components/LNotebook.tsx) + práctica (data/questions-b1-03.ts).
 * Bloques 3-B y 3-C (pendientes): Text Only, la página 2, los esbirros, el jefe, el diario y el cierre (closeId(3)).
 * L se dibuja con SpriteL y la médica con la cara borrosa (Explore lo hace solo en las escenas de recuerdo).
 */
export const B1_03_HOSPITAL_ID = 'b1-03-hospital'
/** La médica (cara borrosa, sin nombre propio). Su tarea guarda este id al terminar: abre el camino al apartamento */
export const B1_03_DOCTOR = 'b1-03-doctor'
/** El cuaderno sobre el escritorio del apartamento. Su tarea (página 1 + práctica) guarda este id */
export const B1_03_NOTEBOOK = 'b1-03-notebook'

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
    { label: 'Lee el cuaderno del escritorio', done: s.seenLesson.includes('informal-messages') },
    { label: 'Práctica de la primera página', done: s.opened.includes(B1_03_NOTEBOOK) },
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
