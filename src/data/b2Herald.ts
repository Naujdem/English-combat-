import type { GameState, SceneDef, Zone } from '../game/types'
import type { ScriptLine } from './b1Accident'
import type { SpriteLook } from '../components/Sprite'

/**
 * B2-02 · The Herald (presente). Bloque 1: la redacción de The Lumen Bay Herald (escena b2-02-herald):
 * recepción, sala de reuniones y mesa de redacción. Guía: Manuel (y Priya en la guía de estilo).
 * Orden: Manuel (b2-02-arrival, script: llegada) →
 *   Manuel: lección 'ppc-b2' + práctica (b2-02-ppc) →
 *   Manuel: lección 'interview-b2' + práctica (b2-02-interview-prep), antes de la entrevista con Amara →
 *   Priya: lección 'inclusive-b2' + práctica (b2-02-style) →
 *   Manuel: lección 'meetings-b2' + práctica (b2-02-meeting) →
 *   Manuel: lección 'verb-to-ing-b2' + práctica (b2-02-patterns).
 * Bloque 2 (pendiente): entrevista con Amara (DebateTalk), Style Guide (The Fine Print), Fact Check,
 * esbirros y el jefe The Deadline. Bloque 3: diario, recompensas, núcleo y cierre (abre la Ventana 3).
 */
export const B2_02_HERALD_ID = 'b2-02-herald'
export const B2_02_MANUEL = 'b2-02-manuel'
export const B2_02_AMARA = 'b2-02-amara'
export const B2_02_VIKTOR = 'b2-02-viktor'
export const B2_02_PRIYA = 'b2-02-priya'
/** Tareas (marcas en `opened`) */
export const B2_02_ARRIVAL = 'b2-02-arrival'
export const B2_02_PPC = 'b2-02-ppc'
export const B2_02_INTERVIEW_PREP = 'b2-02-interview-prep'
export const B2_02_STYLE = 'b2-02-style'
export const B2_02_MEETING = 'b2-02-meeting'
export const B2_02_PATTERNS = 'b2-02-patterns'

/** Aspecto de los guías de lección (Lesson.tsx). Manuel: el mismo que en B1-14 */
export const B2_MANUEL_LOOK: SpriteLook = { shirt: '#7a2f3a', hair: '#2a1a12', skin: '#b9805c', gender: 'male' }
export const B2_PRIYA_LOOK: SpriteLook = { shirt: '#2f8f8a', hair: '#1a1a1a', skin: '#a8714f', gender: 'female' }

/**
 * Leyenda (Tiles.tsx, sin dibujos nuevos): # pared · h letrero · C mostrador · K mesa · O escritorio · F archivador · p planta · . suelo.
 * Arriba a la izquierda la recepción; arriba a la derecha la sala de reuniones; abajo la mesa de redacción.
 */
const MAP = [
  '#h###h####h#',
  '#.CC...#KKK#',
  '#......#...#',
  '#..........#',
  '#OO.OO..OOF#',
  '#..........#',
  '#p........p#',
  '############',
]

const zoneAt = (x: number, y: number): Zone => (y <= 2 ? (x <= 6 ? 'recepcion' : 'reuniones') : 'oficina')

export const B2_02_HERALD: SceneDef = {
  id: B2_02_HERALD_ID,
  name: 'The Herald · La redacción',
  topics: [],
  map: MAP,
  start: { x: 5, y: 3 },
  // Sin jefe en este bloque: la puerta del jefe apunta a un muro y no hace falta ninguna llave
  bossDoor: { x: 0, y: 0 },
  keysNeeded: 0,
  entities: [
    { type: 'npc', id: B2_02_MANUEL, x: 4, y: 2 },
    { type: 'npc', id: B2_02_AMARA, x: 9, y: 2 },
    { type: 'npc', id: B2_02_PRIYA, x: 3, y: 5 },
    { type: 'npc', id: B2_02_VIKTOR, x: 8, y: 5 },
  ],
  labels: [{ text: 'The Lumen Bay Herald', x: 1, y: 0 }],
  zoneAt,
  examine: {
    '10,4': { text: 'Old newspapers. "VOICE BLACKOUTS AT THE PORT?"', sub: 'Periódicos viejos. "¿APAGONES DE VOZ EN EL PUERTO?"', say: 'Voice blackouts at the port?' },
  },
  locked: () => null,
  links: {},
  requirements: [],
  chips: (s: GameState) => [
    { label: 'Llegada al Herald', done: s.opened.includes(B2_02_ARRIVAL) },
    { label: 'Past perfect continuous', done: s.opened.includes(B2_02_PPC) },
    { label: 'Preparar la entrevista', done: s.opened.includes(B2_02_INTERVIEW_PREP) },
    { label: 'La guía de estilo (Priya)', done: s.opened.includes(B2_02_STYLE) },
    { label: 'Frases de reunión', done: s.opened.includes(B2_02_MEETING) },
    { label: 'Verbo + to / -ing', done: s.opened.includes(B2_02_PATTERNS) },
  ],
  intro: {
    first: 'The Lumen Bay Herald. Phones ring, keyboards click. — The Lumen Bay Herald. Suenan teléfonos, suenan teclados.',
    later: () => 'The newsroom of the Herald. — La redacción del Herald.',
  },
}

/** Llegada (secuencia fija, MemoryScript): Manuel recibe al protagonista antes de la entrevista */
export const B2_02_ARRIVAL_SCRIPT: ScriptLine[] = [
  { who: 'narrator', text: '(The reception of The Lumen Bay Herald. Manuel waves at you.)', es: '(La recepción de The Lumen Bay Herald. Manuel te saluda con la mano.)' },
  { who: 'narrator', text: 'Manuel: You came! Welcome to the Herald.', es: 'Manuel: ¡Viniste! {h:Bienvenido|Bienvenida} al Herald.' },
  { who: 'narrator', text: 'Manuel: Amara Okafor, our editor-in-chief, wants to interview you for the internship.', es: 'Manuel: Amara Okafor, nuestra editora jefe, quiere entrevistarte para la práctica.' },
  { who: 'narrator', text: 'Manuel: She will ask about your experience. What had you been doing before you came here?', es: 'Manuel: Te va a preguntar por tu experiencia. ¿Qué habías estado haciendo antes de venir aquí?' },
  { who: 'narrator', text: '(You think of Lumen Paws, the dogs, the residence… but how do you say it?)', es: '(Piensas en Lumen Paws, los perros, la residencia… pero ¿cómo se dice?)' },
  { who: 'narrator', text: "Manuel: Don't worry. Let me show you a tense that journalists love.", es: 'Manuel: {h:Tranquilo|Tranquila}. Te muestro un tiempo verbal que a los periodistas les encanta.' },
]
