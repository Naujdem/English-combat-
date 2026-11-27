import type { GameState, SceneDef, Zone } from '../game/types'
import type { ScriptLine } from './b1Accident'

/**
 * B2-03 · Frozen (Ventana, 2061). Bloque 1: la escuela nocturna donde enseña Leo adulto (escena b2-03-school),
 * la noche del incendio. Es el mismo edificio del recuerdo 1 de B1 (data/b1Accident.ts), ahora en el futuro real:
 * las caras se ven (no es recuerdo), nadie oye al protagonista (sus líneas salen "…", fx 'unheard').
 * Guía: lo que hay en el lugar (la pizarra, el cartel de bienestar y el cuaderno del protagonista adulto).
 * Orden: la estudiante (b2-03-hello, script: nadie te oye) → el profesor (b2-03-class, script) →
 *   la pizarra: lección 'senses-b2' + práctica (b2-03-senses) → tu yo adulto (b2-03-adult, script) →
 *   el cartel: lección 'feelings-b2' + práctica (b2-03-feelings) → el cuaderno: lección 'diary-b2' + práctica (b2-03-diary).
 * Bloque 2 (pendiente): la alarma, Unheard, la parálisis y las lesiones, los Smoke Shadows y el jefe Panic.
 * Bloque 3: cierre, salida de la Ventana, diario y abrir el lugar 4.
 */
export const B2_03_SCHOOL_ID = 'b2-03-school'
export const B2_03_STUDENT = 'b2-03-student'
export const B2_03_TEACHER = 'b2-03-teacher'
export const B2_03_BOARD = 'b2-03-board'
export const B2_03_ADULT = 'b2-03-adult'
export const B2_03_POSTER = 'b2-03-poster'
export const B2_03_NOTEBOOK = 'b2-03-notebook'
/** Tareas (marcas en `opened`) */
export const B2_03_HELLO = 'b2-03-hello'
export const B2_03_CLASS = 'b2-03-class'
export const B2_03_SENSES = 'b2-03-senses'
export const B2_03_ADULT_SEEN = 'b2-03-adult'
export const B2_03_FEELINGS = 'b2-03-feelings'
export const B2_03_DIARY = 'b2-03-diary'

/** Leo adulto: siempre en sombra (ficha 0.3) */
export const B2_LEO_ADULT_LOOK = { shirt: '#1d2430', hair: '#0e1218', skin: '#2a313c', gender: 'male' as const }

/**
 * Leyenda (como b1Accident.ts): # pared · W ventana · B pizarra · M escritorio del profesor · D pupitre · d puerta · p planta
 * @ reloj de pared · 9 alarma de incendio · 0 letrero de salida de emergencia · ^ escalera.
 * A la izquierda el aula; a la derecha el pasillo (el protagonista adulto espera junto a la puerta del aula).
 */
const MAP = [
  '##BBB#@##9###0##',
  '#MM.....d.....^#',
  'W.......#......#',
  'W.D.D.D.########',
  '#.......########',
  'W.D.D.D.########',
  '#.......########',
  'W.....p.########',
  '################',
]

const zoneAt = (x: number): Zone => (x >= 8 ? 'pasillo-noche' : 'aula-noche')
const DESK = { text: 'A desk. Someone wrote "I can\'t wait for summer" on it.', sub: 'Un pupitre. Alguien escribió "No veo la hora de que llegue el verano".', say: "I can't wait for summer." }

export const B2_03_SCHOOL: SceneDef = {
  id: B2_03_SCHOOL_ID,
  name: 'Ventana 2061 · La escuela nocturna',
  topics: [],
  map: MAP,
  start: { x: 3, y: 4 },
  // Sin jefe en este bloque: la puerta del jefe apunta a un muro y no hace falta ninguna llave
  bossDoor: { x: 0, y: 0 },
  keysNeeded: 0,
  entities: [
    { type: 'npc', id: B2_03_TEACHER, x: 3, y: 1 },
    { type: 'npc', id: B2_03_BOARD, x: 5, y: 1 },
    { type: 'npc', id: B2_03_STUDENT, x: 5, y: 6 },
    { type: 'npc', id: B2_03_ADULT, x: 9, y: 2 },
    { type: 'npc', id: B2_03_NOTEBOOK, x: 10, y: 2 },
    { type: 'npc', id: B2_03_POSTER, x: 12, y: 1 },
  ],
  labels: [
    { text: 'Aula', x: 3, y: 6 },
    { text: 'Pasillo', x: 11, y: 2 },
  ],
  zoneAt: (x) => zoneAt(x),
  examine: {
    '2,3': DESK,
    '4,3': DESK,
    '6,3': DESK,
    '2,5': DESK,
    '4,5': DESK,
    '6,5': DESK,
    '6,0': { text: "The clock. It's ten thirty-five.", sub: 'El reloj. Son las diez y treinta y cinco.', say: "It's ten thirty-five." },
    '9,0': { text: 'The fire alarm. It looks new.', sub: 'La alarma de incendio. Parece nueva.', say: 'The fire alarm.', tone: 'warn' },
    '13,0': { text: 'The fire exit sign.', sub: 'El letrero de la salida de emergencia.', say: 'The fire exit sign.' },
    '14,1': { text: 'The main stairs. You can hear people talking downstairs.', sub: 'Las escaleras principales. Se oye gente hablando abajo.', say: 'You can hear people talking downstairs.' },
  },
  locked: (x, y) => (x === 14 && y === 1 ? { text: 'Not yet.', sub: 'Todavía no. Algo va a pasar en este pasillo.' } : null),
  links: {},
  requirements: [],
  chips: (s: GameState) => [
    { label: 'Nadie te oye', done: s.opened.includes(B2_03_HELLO) },
    { label: 'La clase del profesor', done: s.opened.includes(B2_03_CLASS) },
    { label: 'La pizarra: verbos de los sentidos', done: s.opened.includes(B2_03_SENSES) },
    { label: 'Tu yo adulto', done: s.opened.includes(B2_03_ADULT_SEEN) },
    { label: 'El cartel: sentimientos', done: s.opened.includes(B2_03_FEELINGS) },
    { label: 'El cuaderno olvidado', done: s.opened.includes(B2_03_DIARY) },
  ],
  intro: {
    first: '2061. A night school. A class is just finishing. — 2061. Una escuela nocturna. Una clase está terminando. Aquí nadie te oye.',
    later: () => 'The night school, 2061. Nobody can hear you. — La escuela nocturna, 2061. Nadie te oye.',
  },
}

/** La estudiante: intentas saludar y nadie te oye (ficha 0.3) */
export const B2_03_HELLO_SCRIPT: ScriptLine[] = [
  { who: 'narrator', text: '(A blue flash. A sign in the air: 2061. You are in a classroom at night.)', es: '(Un destello azul. Un letrero en el aire: 2061. Estás en un aula, de noche.)' },
  { who: 'narrator', text: '(A student is putting her books in her bag. You try to say hello.)', es: '(Una estudiante guarda sus libros en la mochila. Intentas saludar.)' },
  { who: 'L', fx: 'unheard', text: 'Hello? Excuse me…', es: 'Intentas decir: "¿Hola? Disculpa…"' },
  { who: 'narrator', text: '(Nothing. No sound comes out. She looks through you as if you were not there.)', es: '(Nada. No sale ningún sonido. Ella mira a través de ti como si no estuvieras.)' },
  { who: 'friend', text: 'What a long day. I can hardly keep my eyes open.', es: 'Qué día tan largo. Casi no puedo mantener los ojos abiertos.' },
  { who: 'narrator', text: "(Here, nobody can hear you. But you can read… and you can write.)", es: '(Aquí nadie te oye. Pero puedes leer… y puedes escribir.)' },
]

/** El profesor (Leo adulto, en sombra y con el nombre en estática) termina la clase */
export const B2_03_CLASS_SCRIPT: ScriptLine[] = [
  { who: 'narrator', text: '(The teacher is standing in front of the board, with his back to you. The light is behind him.)', es: '(El profesor está de pie frente a la pizarra, de espaldas. La luz está detrás de él.)' },
  { who: 'narrator', text: '(A student says goodbye: "Good night, Mr. ▒▒▒!" His name sounds like static.)', es: '(Un estudiante se despide: "¡Buenas noches, Mr. ▒▒▒!". Su nombre suena a estática.)' },
  { who: 'friend', text: "OK, everyone, that's all for tonight. Read the board again before you go home.", es: 'Bueno, todos, eso es todo por esta noche. Lean otra vez la pizarra antes de irse a casa.' },
  { who: 'friend', text: 'Remember: listen to the world around you. What do you see? What do you hear?', es: 'Recuerden: escuchen el mundo que los rodea. ¿Qué ven? ¿Qué oyen?' },
  { who: 'L', fx: 'unheard', text: 'Who are you?', es: 'Intentas decir: "¿Quién eres?"' },
  { who: 'narrator', text: '(He does not turn around. Only the board is waiting for you.)', es: '(No se da la vuelta. Solo la pizarra te espera.)' },
]

/** Tu yo adulto, quieto junto a la puerta del aula */
export const B2_03_ADULT_SCRIPT: ScriptLine[] = [
  { who: 'narrator', text: '(Someone is waiting at the classroom door. You stop.)', es: '(Alguien espera en la puerta del aula. Te detienes.)' },
  { who: 'narrator', text: "(It's you. Older, with glasses and tired eyes. You'd know that face anywhere.)", es: '(Eres tú. Con más años, con lentes y ojos cansados. Reconocerías esa cara en cualquier parte.)' },
  { who: 'friend', text: "Come on, ▒▒▒… I've been waiting for twenty minutes.", es: 'Vamos, ▒▒▒… Llevo veinte minutos esperando.' },
  { who: 'L', fx: 'unheard', text: "That's… me?", es: 'Intentas decir: "¿Ese… soy yo?"' },
  { who: 'narrator', text: '(Your older self looks at the floor. Next to the door there is a poster: "How are you REALLY feeling?")', es: '(Tu yo adulto mira el suelo. Junto a la puerta hay un cartel: "¿Cómo te sientes DE VERDAD?")' },
]
