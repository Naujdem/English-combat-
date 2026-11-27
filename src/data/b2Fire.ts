import type { EnemyDef, GameState, SceneDef, Zone } from '../game/types'
import type { ScriptLine } from './b1Accident'
import type { CallForHelpConfig } from '../components/CallForHelp'
import { canRecognize } from '../game/mic'

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
    // Bloque 2: las sombras del humo salen de las escaleras principales; Panic sujeta a tu yo adulto
    { type: 'enemy', id: 'b2-13-shadow1', x: 14, y: 2, after: 'b2-13-alarm' },
    { type: 'enemy', id: 'b2-13-shadow2', x: 14, y: 1, after: 'b2-13-shadow1' },
    { type: 'enemy', id: 'b2-13-boss', x: 8, y: 1, after: 'b2-13-shadow2' },
    { type: 'npc', id: 'b2-13-leo', x: 6, y: 1 },
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
    { label: 'Suena la alarma', done: s.opened.includes('b2-13-alarm') },
    { label: 'Smoke Shadows (2)', done: s.defeated.includes('b2-13-shadow2') },
    { label: 'Panic, segunda forma', done: s.defeated.includes('b2-13-boss') },
    { label: 'Call for Help a dos voces', done: s.opened.includes('b2-13-call') },
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

// ── Bloque 2 ──
// La alarma (b2-13-alarm, script con tu yo adulto) → dos Smoke Shadows → Panic, segunda forma (3 fases; la 3.ª se dice en voz alta
// o se escribe) → Call for Help a dos voces (b2-13-call, reutilizado de B1 en modo steady: la barra de voz de Leo no baja).
export const B2_13_ALARM = 'b2-13-alarm'
export const B2_13_SHADOW1 = 'b2-13-shadow1'
export const B2_13_SHADOW2 = 'b2-13-shadow2'
export const B2_13_BOSS = 'b2-13-boss'
export const B2_13_CALL = 'b2-13-call'

/** Suena la alarma: humo en las escaleras principales y tu yo adulto se paraliza, igual que en la Ventana 3 */
export const B2_13_ALARM_SCRIPT: ScriptLine[] = [
  { who: 'narrator', fx: 'alarm', text: '(Ten thirty-five. The fire alarm goes off.)', es: '(Las diez y treinta y cinco. Suena la alarma de incendio.)' },
  { who: 'narrator', text: '(Smoke is coming up the main stairs. People run out of the classroom.)', es: '(Sube humo por las escaleras principales. La gente sale corriendo del aula.)' },
  { who: 'narrator', text: '(Your older self doesn\'t move. A figure of frost grows behind {h:him|her}, bigger than last time, and holds {h:his|her} shoulders.)', es: '(Tu yo adulto no se mueve. Detrás crece una figura de escarcha, más grande que la última vez, y le sujeta los hombros.)' },
  { who: 'L', text: 'Hey! Can you hear me? You\'d better not stay here!', es: '¡Oye! ¿Me oyes? ¡Más vale que no te quedes aquí!' },
  { who: 'friend', text: '…I can\'t move. I… I can hear someone. Who\'s there?', es: '…No me puedo mover. Yo… oigo a alguien. ¿Quién está ahí?' },
  { who: 'narrator', text: '(This time, {h:he|she} heard you. But the smoke is taking shape between you.)', es: '(Esta vez te oyó. Pero el humo está tomando forma entre ustedes.)' },
]

const HB = 'hadbetter-b2' as const
const IT = 'itstime-b2' as const
const FI = 'fire-b2' as const
const SHADOW_LOOK = { shirt: '#30353d', hair: '#15181c', skin: '#4c525c' }

/** Smoke Shadows (los mismos de la Ventana 3, más fuertes). Preguntas: etiqueta b2-13-shadow */
const SHADOW = (id: string, line: { text: string; es: string }): EnemyDef => ({
  id,
  name: 'Smoke Shadow',
  person: 'Smoke Shadow',
  kind: 'minion',
  hp: 5,
  topics: [HB, IT],
  kinds: ['fill', 'fix'],
  tags: ['b2-13-shadow'],
  onlyTags: true,
  zone: 'pasillo-noche',
  look: SHADOW_LOOK,
  before: [line],
  after: [{ text: '(The shadow breaks into grey smoke and disappears.)', es: '(La sombra se deshace en humo gris y desaparece.)' }],
  freed: { text: '(The corridor is a little clearer now.)', es: '(El pasillo está un poco más despejado.)' },
})

/**
 * Panic, segunda forma: más grande, vuelve a sujetar a tu yo adulto. Jefe de 3 fases.
 * Fase 1: had better e it's time (b2-13-boss-hb) · Fase 2: repaso de la Parte 3 (b2-13-boss-mix: relativas explicativas,
 * contraste, preposición + -ing, tiempos narrativos y futuro perfecto) · Fase 3: tu voz (b2-13-boss-v): le hablas en voz
 * alta a tu yo adulto; sin micrófono se escribe. Las Ventanas no dan atuendos: solo despedida.
 */
export const B2_13_BOSS_DEF: EnemyDef = {
  id: B2_13_BOSS,
  name: 'Panic',
  person: 'Panic',
  kind: 'boss',
  hp: 12,
  topics: [HB, IT, FI],
  kinds: ['fill', 'fix', 'order', 'listen'],
  tags: ['b2-13-boss-hb'],
  phases: [
    { hp: 4, title: 'Escarcha: más vale quedarse', topics: [HB, IT], kinds: ['fill', 'fix', 'listen'], tags: ['b2-13-boss-hb'], line: { text: 'You had better to stay. It\'s time to staying still…', es: 'had better to stay y it\'s time to staying: mal.' } },
    { hp: 4, title: 'Escarcha: todo lo que callaste', topics: ['nd-relative-b2', 'contrast-b2', 'ing-prep-b2', 'narrative-b2', 'fperfect-b2'], kinds: ['fill', 'fix'], tags: ['b2-13-boss-mix'], line: { text: 'Despite of the smoke, nobody will have notice you…', es: 'despite of y will have notice: mal.' } },
    { hp: 4, title: 'Tu voz', topics: [FI, IT], kinds: canRecognize ? ['speak'] : ['write'], tags: ['b2-13-boss-v'], line: { text: 'Don\'t speak. Stay quiet. Nobody needs your voice…', es: 'No hables. Quédate callado. Nadie necesita tu voz…' } },
  ],
  onlyTags: true,
  zone: 'pasillo-noche',
  look: { shirt: '#a9d6fb', hair: '#e8f5ff', skin: '#8dbde2' },
  before: [{ text: 'Shhh… You had better to stay. Don\'t speak. Last time, it worked…', es: 'Shhh… "had better to stay" (mal). No hables. La última vez funcionó…' }],
  after: [{ text: '(The frost cracks. Your older self takes a deep breath… and moves.)', es: '(La escarcha se rompe. Tu yo adulto respira hondo… y se mueve.)' }],
  freed: { text: '(Your older self looks at you. "Who… who are you?" There is no time to explain.)', es: '(Tu yo adulto te mira. "¿Quién… quién eres?". No hay tiempo para explicar.)' },
  farewell: {
    q: 'Panic (cracking): "Why didn\'t you stay quiet this time?"',
    options: ["Because it was time someone spoke up.", "Because it was time someone speak up.", "Because it was time someone to speak up."],
    answer: 0,
    tip: "it's / it was time + sujeto + pasado: someone spoke up.",
  },
}

export const B2_13_ENEMIES: Record<string, EnemyDef> = {
  [B2_13_SHADOW1]: SHADOW(B2_13_SHADOW1, { text: "You'd better to go back… You'd better to hide…", es: "You'd better to go: mal (sin to)." }),
  [B2_13_SHADOW2]: SHADOW(B2_13_SHADOW2, { text: "It's time to staying… It's time everyone stay inside…", es: "It's time to staying y everyone stay: mal." }),
  [B2_13_BOSS]: B2_13_BOSS_DEF,
}

/** Call for Help a dos voces (ficha 13): Leo adulto y tu yo adulto gritan juntos. La barra de voz de Leo no baja */
export const B2_13_CALL_CONFIG: CallForHelpConfig = {
  ids: ['b2-13-c1', 'b2-13-c2', 'b2-13-c3', 'b2-13-c4', 'b2-13-c5'],
  shouts: ['Follow our voices! Use the back stairs!', 'Fire! Get out!', "You'd better not use the lift!", "Stay calm! We're coming!", 'Is anybody there? Get out now!'],
  badge: 'Ventana 2061 · a dos voces',
  voiceLabel: 'Voz de ▒▒▒',
  steady: true,
  lastLabel: 'Los tres a la vez…',
  together: 'Esta vez no grita solo: la barra no baja.',
}
