import type { GameState, SceneDef, Zone } from '../game/types'
import type { ScriptLine } from './b1Accident'

/**
 * B2-13 · The Fire (Ventana, 2061). La noche del incendio, la misma de la Ventana 3 y del recuerdo 1 de B1.
 * Escena b2-13-school: el pasillo del tercer piso de la escuela nocturna, con las escaleras principales (derecha)
 * y las escaleras traseras (izquierda), que existen gracias a la condición de las dos salidas del lugar 7.
 * Al entrar se enciende el sexto segmento (B2_13_ENTERED, lo guarda World.tsx). Aquí la regla de "nadie te oye" queda
 * desactivada: las líneas del protagonista NO llevan fx 'unheard'.
 * Guía: el cartel de evacuación y, por primera vez en una Ventana, la voz del propio protagonista (ficha 13).
 * Bloque 1: la estudiante te oye (b2-13-arrival, script) → antes de la alarma (b2-13-before, script con Leo adulto
 *   y tu yo adulto) → el cartel de evacuación: lección 'hadbetter-b2' + práctica (b2-13-sign)
 *   → tu reflejo en la ventana oscura: lección 'itstime-b2' + práctica (b2-13-time).
 */
export const B2_13_SCHOOL_ID = 'b2-13-school'
export const B2_13_STUDENT = 'b2-13-student'
export const B2_13_TEACHER = 'b2-13-teacher'
export const B2_13_ADULT = 'b2-13-adult'
export const B2_13_SIGN = 'b2-13-sign'
export const B2_13_REFLECTION = 'b2-13-reflection'
/** Tareas (marcas en `opened`) */
export const B2_13_ARRIVAL = 'b2-13-arrival'
export const B2_13_BEFORE = 'b2-13-before'
export const B2_13_HADBETTER = 'b2-13-hadbetter'
export const B2_13_TIME = 'b2-13-time'

/**
 * Leyenda (Tiles.tsx, sin dibujos nuevos): # pared · W ventana · d puerta · 9 alarma de incendio · 0 letrero de salida
 * · ^ escalera · p planta · . piso. La puerta del aula (6,0), la alarma (9,0), la ventana oscura (12,0),
 * las escaleras traseras (0,1) con su letrero de salida (1,0) y las escaleras principales (15,1).
 */
const MAP = [
  '#0####d##9##W###',
  '^..............^',
  '#..............#',
  '#....p.........#',
  '################',
]

const zoneAt = (): Zone => 'pasillo-noche'

export const B2_13_SCHOOL: SceneDef = {
  id: B2_13_SCHOOL_ID,
  name: 'Ventana 2061 · El pasillo del tercer piso',
  topics: [],
  map: MAP,
  start: { x: 10, y: 2 },
  // Sin jefe en este bloque: la puerta del jefe apunta a un muro y no hace falta ninguna llave
  bossDoor: { x: 0, y: 4 },
  keysNeeded: 0,
  entities: [
    { type: 'npc', id: B2_13_STUDENT, x: 8, y: 2 },
    { type: 'npc', id: B2_13_TEACHER, x: 5, y: 1 },
    { type: 'npc', id: B2_13_ADULT, x: 7, y: 1 },
    { type: 'npc', id: B2_13_SIGN, x: 2, y: 1 },
    { type: 'npc', id: B2_13_REFLECTION, x: 12, y: 1 },
  ],
  labels: [
    { text: '2061', x: 10, y: 3 },
    { text: 'Escaleras traseras', x: 2, y: 3 },
  ],
  zoneAt,
  examine: {
    '9,0': { text: 'The fire alarm. In ten minutes, it will go off.', sub: 'La alarma de incendio. En diez minutos va a sonar.', say: 'The fire alarm.', tone: 'warn' },
    '1,0': { text: 'FIRE EXIT → BACK STAIRS', sub: 'SALIDA DE EMERGENCIA → ESCALERAS TRASERAS', say: 'Fire exit.' },
    '5,3': { text: 'A plant. Someone waters it every night.', sub: 'Una planta. Alguien la riega cada noche.', say: 'Someone waters it every night.' },
  },
  locked: (x, y) => {
    if (x === 6 && y === 0) return { text: 'The class is about to finish.', sub: 'La clase está a punto de terminar.' }
    if (x === 15 && y === 1) return { text: 'The main stairs. Not yet.', sub: 'Las escaleras principales. Todavía no. Sabes lo que va a subir por ahí.' }
    if (x === 0 && y === 1) return { text: 'The back stairs. Not without them.', sub: 'Las escaleras traseras. No sin ellos.' }
    return null
  },
  links: {},
  requirements: [],
  chips: (s: GameState) => [
    { label: 'Tu voz funciona aquí', done: s.opened.includes(B2_13_ARRIVAL) },
    { label: 'Antes de la alarma', done: s.opened.includes(B2_13_BEFORE) },
    { label: 'El cartel: had better', done: s.opened.includes(B2_13_HADBETTER) },
    { label: "Tu voz: it's time", done: s.opened.includes(B2_13_TIME) },
  ],
  intro: {
    first: '2061. The night school again, the third floor. — 2061. Otra vez la escuela nocturna, el tercer piso. Esta vez, tu voz funciona.',
    later: () => 'The third floor, 2061. This time they can hear you. — El tercer piso, 2061. Esta vez sí te oyen.',
  },
}

/** La estudiante: al entrar se enciende el sexto segmento y, por primera vez en una Ventana, alguien te oye */
export const B2_13_ARRIVAL_SCRIPT: ScriptLine[] = [
  { who: 'narrator', text: '(A blue flash. A sign in the air: 2061. The night school again. The third-floor corridor.)', es: '(Un destello azul. Un letrero en el aire: 2061. Otra vez la escuela nocturna. El pasillo del tercer piso.)' },
  { who: 'narrator', text: '(The clock in your pocket glows. The sixth segment lights up. The core is complete.)', es: '(El reloj de tu bolsillo brilla. Se enciende el sexto segmento. El núcleo está completo.)' },
  { who: 'narrator', text: '(A student walks past you. Without thinking, you speak.)', es: '(Una estudiante pasa a tu lado. Sin pensarlo, hablas.)' },
  { who: 'L', text: 'Excuse me… what time is it?', es: 'Disculpa… ¿qué hora es?' },
  { who: 'friend', text: "Oh! Sorry, I didn't see you there. It's twenty-five past ten.", es: '¡Ay! Perdón, no te había visto. Son las diez y veinticinco.' },
  { who: 'L', text: 'My voice… it works here now.', es: 'Mi voz… aquí ya funciona.' },
  { who: 'friend', text: 'Are you new here? The class next door is about to finish. Good night!', es: '¿Eres nuevo aquí? La clase de al lado está a punto de terminar. ¡Buenas noches!' },
  { who: 'narrator', text: '(She heard you. For the first time in a Window, someone heard you.)', es: '(Te oyó. Por primera vez en una Ventana, alguien te oyó.)' },
]

/** Antes de la alarma: Leo adulto termina la clase (de espaldas) y tu yo adulto espera en la puerta. Ya sabes lo que va a pasar */
export const B2_13_BEFORE_SCRIPT: ScriptLine[] = [
  { who: 'narrator', text: '(Through the classroom door, you see the teacher. His back is to you. The light is behind him.)', es: '(Por la puerta del aula ves al profesor. Está de espaldas. La luz está detrás de él.)' },
  { who: 'narrator', text: '(He says: "That\'s all for tonight. See you on Thursday.")', es: '(Dice: "Eso es todo por esta noche. Nos vemos el jueves".)' },
  { who: 'narrator', text: '(And at the door, waiting, there is your older self. Glasses. Tired eyes. Looking at the floor.)', es: '(Y en la puerta, esperando, está tu yo adulto. Lentes. Ojos cansados. Mirando el suelo.)' },
  { who: 'friend', text: "Come on, ▒▒▒… I've been waiting for twenty minutes.", es: 'Vamos, ▒▒▒… Llevo veinte minutos esperando.' },
  { who: 'narrator', text: '(You have seen this night before. In ten minutes, the alarm. Then the smoke. And your older self will freeze.)', es: '(Ya viste esta noche. En diez minutos, la alarma. Luego el humo. Y tu yo adulto se va a paralizar.)' },
  { who: 'L', text: 'Not this time.', es: 'Esta vez no.' },
  { who: 'narrator', text: '(The fire will happen. That can\'t change. But the silence can. Next to the back stairs there is an evacuation sign.)', es: '(El incendio va a ocurrir. Eso no puede cambiar. Pero el silencio sí. Junto a las escaleras traseras hay un cartel de evacuación.)' },
]
