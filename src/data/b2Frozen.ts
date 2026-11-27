import type { EnemyDef, GameState, SceneDef, Zone } from '../game/types'
import type { ScriptLine } from './b1Accident'

/**
 * B2-03 · Frozen (Ventana, 2061). Bloque 1: la escuela nocturna donde enseña Leo adulto (escena b2-03-school),
 * la noche del incendio. Es el mismo edificio del recuerdo 1 de B1 (data/b1Accident.ts), ahora en el futuro real:
 * las caras se ven (no es recuerdo), nadie oye al protagonista (sus líneas salen "…", fx 'unheard').
 * Guía: lo que hay en el lugar (la pizarra, el cartel de bienestar y el cuaderno del protagonista adulto).
 * Orden: la estudiante (b2-03-hello, script: nadie te oye) → el profesor (b2-03-class, script) →
 *   la pizarra: lección 'senses-b2' + práctica (b2-03-senses) → tu yo adulto (b2-03-adult, script) →
 *   el cartel: lección 'feelings-b2' + práctica (b2-03-feelings) → el cuaderno: lección 'diary-b2' + práctica (b2-03-diary).
 * Bloque 2: el panel de emergencia (b2-03-alarm, script con la alarma) → Unheard (b2-03-unheard, 3 metas sin voz) →
 *   la parálisis de tu yo adulto (b2-03-freeze, script) → la estudiante del tobillo: lección 'injuries-b2' + práctica
 *   (b2-03-injury, guía el botiquín) → dos Smoke Shadows (esbirros) → el jefe Panic (2 fases), junto a tu yo adulto.
 * Bloque 3: al vencer a Panic llega una bombera por las escaleras (b2-03-firefighter): el cierre (b2-03-close, script)
 *   recupera los temas → Explore muestra WindowExit (fundido azul) y vuelves al presente (B2_03_EXITED); se abre el lugar 4.
 *   Diario: data/b2Diary.ts (sin página de G). Las Ventanas no dan atuendos: Panic solo tiene despedida.
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
/** Bloque 2 */
export const B2_03_PANEL = 'b2-03-panel'
export const B2_03_ALARM = 'b2-03-alarm'
export const B2_03_UNHEARD = 'b2-03-unheard'
export const B2_03_FREEZE = 'b2-03-freeze'
export const B2_03_INJURY = 'b2-03-injury'
export const B2_03_SHADOW1 = 'b2-03-shadow1'
export const B2_03_SHADOW2 = 'b2-03-shadow2'
export const B2_03_BOSS = 'b2-03-boss'
/** Bloque 3 */
export const B2_03_FIREFIGHTER = 'b2-03-firefighter'
export const B2_03_CLOSE = 'b2-03-close'
/** Se guarda al salir de la Ventana (después del fundido azul) */
export const B2_03_EXITED = 'b2-03-exited'

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
    // Bloque 2: el panel de emergencia del pasillo; las sombras del humo y Panic, que sujeta a tu yo adulto
    { type: 'npc', id: B2_03_PANEL, x: 13, y: 2 },
    { type: 'enemy', id: B2_03_SHADOW1, x: 11, y: 1, after: B2_03_INJURY },
    { type: 'enemy', id: B2_03_SHADOW2, x: 13, y: 1, after: B2_03_SHADOW1 },
    { type: 'enemy', id: B2_03_BOSS, x: 11, y: 2, after: B2_03_SHADOW2 },
    // Bloque 3: la bombera (aparece al vencer a Panic)
    { type: 'npc', id: B2_03_FIREFIGHTER, x: 14, y: 2 },
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
    { label: 'Suena la alarma', done: s.opened.includes(B2_03_ALARM) },
    { label: 'Unheard', done: s.opened.includes(B2_03_UNHEARD) },
    { label: 'Tu yo adulto no se mueve', done: s.opened.includes(B2_03_FREEZE) },
    { label: 'El tobillo de la estudiante', done: s.opened.includes(B2_03_INJURY) },
    { label: 'Smoke Shadows (2)', done: s.defeated.includes(B2_03_SHADOW2) },
    { label: 'Panic', done: s.defeated.includes(B2_03_BOSS) },
    { label: 'Llegan los bomberos', done: s.opened.includes(B2_03_CLOSE) },
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

// ── Bloque 2 ──

/** El panel de emergencia: suena la alarma y hay humo en las escaleras (como el recuerdo 1 de B1, ahora visto desde fuera) */
export const B2_03_ALARM_SCRIPT: ScriptLine[] = [
  { who: 'narrator', fx: 'alarm', text: '(Suddenly the fire alarm goes off.)', es: '(De repente suena la alarma de incendio.)' },
  { who: 'narrator', text: '(Smoke is coming up the main stairs. You have seen this night before… but from inside a memory.)', es: '(Sube humo por las escaleras principales. Ya viste esta noche… pero desde dentro de un recuerdo.)' },
  { who: 'friend', text: 'Attention, please. This is not a drill. Leave the building by the nearest exit.', es: 'Atención, por favor. No es un simulacro. Salgan del edificio por la salida más cercana.' },
  { who: 'L', fx: 'unheard', text: 'Everyone, get out!', es: 'Intentas gritar: "¡Todos afuera!"' },
  { who: 'narrator', text: '(Nobody hears you. But this panel has buttons, and people read notes. You can still help.)', es: '(Nadie te oye. Pero este panel tiene botones, y la gente lee notas. Todavía puedes ayudar.)' },
]

/** La parálisis: tu yo adulto no se mueve. La narración usa los verbos de los sentidos y as if (sin culpar) */
export const B2_03_FREEZE_SCRIPT: ScriptLine[] = [
  { who: 'narrator', text: '(The lights are on. The fire door is open. People are running to the back stairs.)', es: '(Las luces están encendidas. La puerta de emergencia está abierta. La gente corre a las escaleras traseras.)' },
  { who: 'narrator', text: '(But your older self is still standing in the corridor.)', es: '(Pero tu yo adulto sigue de pie en el pasillo.)' },
  { who: 'narrator', text: "({h:He|She} could hear the teacher shouting. {h:He|She} could feel the heat on {h:his|her} face. {h:He|She} watched people running past {h:him|her}… but {h:he|she} didn't move.)", es: '(Podía oír al profesor gritando. Podía sentir el calor en la cara. Veía a la gente pasar corriendo… pero no se movió.)' },
  { who: 'narrator', text: '({h:He|She} looked as if {h:he|she} were made of stone.)', es: '(Parecía {h:hecho|hecha} de piedra.)' },
  { who: 'L', fx: 'unheard', text: 'Move! Please, move!', es: 'Intentas gritar: "¡Muévete! ¡Por favor, muévete!"' },
  { who: 'narrator', text: '(It is not that {h:he doesn\'t|she doesn\'t} care. Fear can freeze anyone. On the stairs, a student falls and cries out.)', es: '(No es que no le importe. El miedo puede paralizar a cualquiera. En las escaleras, una estudiante se cae y grita.)' },
]

const SN = 'senses-b2' as const
const FE = 'feelings-b2' as const
const DI = 'diary-b2' as const
const IJ = 'injuries-b2' as const
const SHADOW_LOOK = { shirt: '#3a3f48', hair: '#1c1f24', skin: '#5a606b' }

/** Smoke Shadows, sombras del humo. Preguntas: etiqueta b2-03-shadow */
const SHADOW = (id: string, line: { text: string; es: string }): EnemyDef => ({
  id,
  name: 'Smoke Shadow',
  person: 'Smoke Shadow',
  kind: 'minion',
  hp: 4,
  topics: [SN, FE, DI],
  kinds: ['fill', 'fix'],
  tags: ['b2-03-shadow'],
  onlyTags: true,
  zone: 'pasillo-noche',
  look: SHADOW_LOOK,
  before: [line],
  after: [{ text: '(The shadow breaks into grey smoke and disappears.)', es: '(La sombra se deshace en humo gris y desaparece.)' }],
  freed: { text: '(The air is a little clearer now.)', es: '(El aire está un poco más limpio ahora.)' },
})

/**
 * Panic: la parálisis hecha monstruo, una figura de escarcha que sujeta a tu yo adulto de los hombros. Jefe de 2 fases.
 * Fase 1: verbos de los sentidos y like / as if (b2-03-boss-sn) · Fase 2: sentimientos, adjetivo y sustantivo y lesiones,
 * con escuchas de evacuación (b2-03-boss-fe). Al vencerlo, la escena no cambia: tu yo adulto sigue quieto (prepara el lugar 13).
 */
export const B2_03_BOSS_DEF: EnemyDef = {
  id: B2_03_BOSS,
  name: 'Panic',
  person: 'Panic',
  kind: 'boss',
  hp: 10,
  topics: [SN, FE, IJ],
  kinds: ['fill', 'fix', 'order', 'listen'],
  tags: ['b2-03-boss-sn'],
  phases: [
    { hp: 5, title: 'Escarcha: los sentidos', topics: [SN], kinds: ['fill', 'fix', 'order'], tags: ['b2-03-boss-sn'], line: { text: 'I could smell the smoke to come… He looked as if he is a statue!', es: 'smell the smoke to come y as if he is (en una historia en pasado): mal.' } },
    { hp: 5, title: 'Escarcha: lo que sientes', topics: [FE, IJ], kinds: ['fill', 'fix', 'listen'], tags: ['b2-03-boss-fe'], line: { text: 'He felt a lot of anxious! She sprained her ankle\'s! Stay still… stay still…', es: 'a lot of anxious y her ankle\'s: mal.' } },
  ],
  onlyTags: true,
  zone: 'pasillo-noche',
  look: { shirt: '#bfe2ff', hair: '#e8f5ff', skin: '#9fc8e8' },
  before: [{ text: 'Shhh… Don\'t move. Don\'t speak. If you stay still, nothing can go wrong.', es: 'Shhh… No te muevas. No hables. Si no te mueves, nada puede salir mal.' }],
  after: [{ text: '(The frost melts and falls to the floor like rain.)', es: '(La escarcha se derrite y cae al suelo como lluvia.)' }],
  freed: { text: '(Panic is gone… but your older self is still standing there, frozen.)', es: '(Panic se fue… pero tu yo adulto sigue ahí, paralizado.)' },
  // Las Ventanas no dan atuendos (ficha 0.4): solo la despedida
  farewell: {
    q: 'Panic (melting): "Why are you still here? Nobody can hear you…"',
    options: ['I heard you whisper. And I saw you melting.', 'I heard you to whisper. And I saw you to melt.', 'I heard you whispered. And I saw you melted.'],
    answer: 0,
    tip: 'hear / see + objeto + forma base o -ing, nunca to.',
  },
}

export const B2_03_ENEMIES: Record<string, EnemyDef> = {
  [B2_03_SHADOW1]: SHADOW(B2_03_SHADOW1, { text: 'I saw him to run… We heard her to call for help… Nobody listens…', es: 'saw him to run y heard her to call: mal (sin to).' }),
  [B2_03_SHADOW2]: SHADOW(B2_03_SHADOW2, { text: "I'm boring in this class… so boring… I'm exhausting…", es: "I'm boring (por bored) e I'm exhausting (por exhausted): mal." }),
  [B2_03_BOSS]: B2_03_BOSS_DEF,
}

// ── Bloque 3 ──

/** El cierre: llegan los bomberos y todos salen (script con la bombera). Afuera, Leo adulto se lleva la mano a la garganta */
export const B2_03_CLOSE_SCRIPT: ScriptLine[] = [
  { who: 'friend', text: 'Fire service! Is anyone still up here? Everybody out, now!', es: '¡Bomberos! ¿Queda alguien aquí arriba? ¡Todos afuera, ya!' },
  { who: 'narrator', text: '(The firefighter takes your older self by the arm. Slowly, {h:he|she} starts to walk.)', es: '(La bombera toma a tu yo adulto del brazo. Despacio, empieza a caminar.)' },
  { who: 'narrator', text: '(Outside, in the cold air, everyone is safe. Your older self is looking at the floor.)', es: '(Afuera, con el aire frío, todos están a salvo. Tu yo adulto mira el suelo.)' },
  { who: 'narrator', text: '(In the shadows, the teacher puts a hand to his throat. He tries to speak… and only a whisper comes out.)', es: '(En la sombra, el profesor se lleva la mano a la garganta. Intenta hablar… y solo sale un susurro.)' },
  { who: 'narrator', text: '(The blue light grows around you. The night school fades.)', es: '(La luz azul crece a tu alrededor. La escuela nocturna se desvanece.)' },
]
