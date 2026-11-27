import type { EnemyDef, GameState, SceneDef, Zone } from '../game/types'
import type { ScriptLine } from './b1Accident'
import type { FactCheckContent } from '../components/FactCheck'
import type { ReconstructItem } from '../components/Reconstruct'
import type { ReviewContent } from '../components/ReviewWriter'
import type { CasualChat } from '../game/types'
import { wordCount } from './b1Exam'

/**
 * B2-11 · Who Is G? (presente, Lumen Bay). Guía: Manuel en el archivo, y luego el grupo (ficha 11).
 * Escena b2-11-herald: el archivo del Herald (izquierda) y la sala común de la residencia, en una noche de cine (derecha).
 * Bloque 1: Manuel en el archivo (b2-11-arrival, script: el protagonista le cuenta las pistas, sin los viajes en el tiempo)
 *   → lección 'indirect-b2' + práctica (b2-11-indirect): preguntas indirectas y en estilo indirecto → Fact Check, tercera y última
 *   vez (b2-11-factcheck: las preguntas de los testigos de los apagones; abre la puerta de la sala común) → Marisol: la noche de cine
 *   (b2-11-movie, script, escucha: "Last Train to Yesterday") → Maya: lección 'film-b2' + práctica (b2-11-film) → la persona
 *   especial: lección 'narrative-b2' + práctica (b2-11-narrative): tiempos narrativos combinados → el tablero de pistas: Reconstruct,
 *   versión "tablero" (b2-11-board): la línea de tiempo de B2 (el incendio, Vocalis, el aparato, la tarjeta y el cumpleaños).
 * Bloque 2: Leo confiesa (b2-11-confess, script, escucha: el grupo le pregunta con preguntas indirectas; su voz desaparece cuando
 *   los fragmentos brillan y sueña con humo) → dos Plot Holes (esbirros, huecos de guion corrompidos que salen de la pantalla)
 *   → el jefe The Spoiler (2 fases), un crítico de cine corrompido que intenta contar el final de todo.
 * Bloque 3: tras vencer a The Spoiler, los quintos momentos de amistad de B2, en orden (Explore.tsx): Maya (películas que cada uno
 *   recomienda, B2_11_FRIEND_MAYA) → Leo (qué haría cada uno si perdiera la voz, B2_11_FRIEND_LEO) → la persona especial (confianza,
 *   B2_11_FRIEND_SPECIAL). Marisol: el pijama de cine mejorado (b2-11-pyjamas) y la reseña opcional (b2-11-review). Leo: el cierre
 *   (b2-11-close): "If I ever lose my voice… promise you'll speak for me."; Explore muestra FragmentJoin (dos fragmentos llenan
 *   el quinto segmento, B2_11_FRAGMENTS) y se abre la Ventana 12. Diario: data/b2Diary.ts (la línea de tiempo del protagonista).
 */
export const B2_11_HERALD_ID = 'b2-11-herald'
export const B2_11_MANUEL = 'b2-11-manuel'
export const B2_11_MARISOL = 'b2-11-marisol'
export const B2_11_MAYA = 'b2-11-maya'
export const B2_11_SPECIAL = 'b2-11-special'
export const B2_11_LEO = 'b2-11-leo'
/** Tareas (marcas en `opened`) */
export const B2_11_ARRIVAL = 'b2-11-arrival'
export const B2_11_INDIRECT = 'b2-11-indirect'
export const B2_11_FACTCHECK = 'b2-11-factcheck'
export const B2_11_MOVIE = 'b2-11-movie'
export const B2_11_FILM = 'b2-11-film'
export const B2_11_NARRATIVE = 'b2-11-narrative'
export const B2_11_BOARD = 'b2-11-board'
export const B2_11_CONFESS = 'b2-11-confess'
export const B2_11_HOLE1 = 'b2-11-hole1'
export const B2_11_HOLE2 = 'b2-11-hole2'
export const B2_11_BOSS = 'b2-11-boss'
/** Bloque 3 */
export const B2_11_FRIEND_MAYA = 'b2-11-friend-maya'
export const B2_11_FRIEND_LEO = 'b2-11-friend-leo'
export const B2_11_FRIEND_SPECIAL = 'b2-11-friend-special'
export const B2_11_PYJAMAS = 'b2-11-pyjamas'
export const B2_11_REVIEW = 'b2-11-review'
export const B2_11_CLOSE = 'b2-11-close'
/** Se guarda al terminar la animación: dos fragmentos llenan el quinto segmento del núcleo (abre la Ventana 12) */
export const B2_11_FRAGMENTS = 'b2-11-fragments'
export const B2_FIFTH_SEGMENT = { en: 'The two fragments fill the fifth segment. Only one segment is still dark.', es: 'Los dos fragmentos llenan el quinto segmento. Solo queda un segmento apagado.' }

/**
 * Leyenda (Tiles.tsx, sin dibujos nuevos): # pared · L estantería · F archivador · O escritorio · M escritorio de Manuel ·
 * v pantalla (la película) · A sofá · K mesa · d puerta. A la izquierda el archivo del Herald (x 0-9); a la derecha la sala
 * común de la residencia (x 10-22), cerrada hasta terminar el Fact Check.
 */
const MAP = [
  '#LLFFLLFF#vvvvvvvvvvvv#',
  '#........#............#',
  '#.O..O...#..AAA..AAA..#',
  '#........d............#',
  '#.O..M...#....KK......#',
  '#####d#################',
]

const zoneAt = (x: number): Zone => (x <= 9 ? 'biblioteca' : 'sala')

export const B2_11_HERALD: SceneDef = {
  id: B2_11_HERALD_ID,
  name: 'Who Is G? · El archivo y la noche de cine',
  topics: [],
  map: MAP,
  start: { x: 3, y: 3 },
  // Sin jefe en este bloque: la puerta del jefe apunta a un muro y no hace falta ninguna llave
  bossDoor: { x: 0, y: 0 },
  keysNeeded: 0,
  entities: [
    { type: 'npc', id: B2_11_MANUEL, x: 6, y: 3 },
    { type: 'npc', id: B2_11_MARISOL, x: 12, y: 3 },
    { type: 'npc', id: B2_11_MAYA, x: 15, y: 1 },
    { type: 'npc', id: B2_11_SPECIAL, x: 17, y: 3 },
    { type: 'npc', id: B2_11_LEO, x: 21, y: 4 },
    { type: 'enemy', id: B2_11_HOLE1, x: 13, y: 1, after: B2_11_CONFESS },
    { type: 'enemy', id: B2_11_HOLE2, x: 19, y: 1, after: B2_11_HOLE1 },
    { type: 'enemy', id: B2_11_BOSS, x: 16, y: 1, after: B2_11_HOLE2 },
  ],
  labels: [
    { text: 'The Herald · Archive', x: 4, y: 5 },
    { text: 'Common room', x: 16, y: 5 },
  ],
  zoneAt: (x) => zoneAt(x),
  examine: {
    '3,0': {
      text: 'Old newspapers from B1. A headline: "PURPLE LIGHT OVER THE HARBOUR?"',
      sub: 'Periódicos viejos. Un titular: "¿LUZ MORADA SOBRE EL PUERTO?"',
      say: 'Purple light over the harbour?',
    },
    '6,0': {
      text: 'A box with a label: "Voice blackouts — witnesses". Manuel kept everything.',
      sub: 'Una caja con una etiqueta: "Apagones de voz — testigos". Manuel guardó todo.',
      say: 'Manuel kept everything.',
    },
    '5,2': {
      text: 'A notebook full of questions. The last one: "Who is G?"',
      sub: 'Un cuaderno lleno de preguntas. La última: "¿Quién es G?"',
      say: 'Who is G?',
    },
    '14,4': {
      text: 'A big bowl of popcorn and a remote control.',
      sub: 'Un tazón grande de palomitas y un control remoto.',
      say: 'Movie night!',
    },
    '15,0': {
      text: 'The screen. The title of the film: "Last Train to Yesterday".',
      sub: 'La pantalla. El título de la película: "Last Train to Yesterday" (Último tren a ayer).',
      say: 'Last Train to Yesterday.',
    },
  },
  locked: (x, y, s) => {
    if (x === 9 && y === 3 && !s.opened.includes(B2_11_FACTCHECK)) return { text: 'Todavía no.', sub: 'Primero termina el trabajo en el archivo con Manuel.' }
    return null
  },
  requirements: [],
  chips: (s: GameState) => [
    { label: 'Las pistas, en el archivo', done: s.opened.includes(B2_11_ARRIVAL) },
    { label: 'Do you know where G is? · He asked me where I was going', done: s.opened.includes(B2_11_INDIRECT) },
    { label: 'Fact Check: las preguntas de los testigos', done: s.opened.includes(B2_11_FACTCHECK) },
    { label: 'Noche de cine', done: s.opened.includes(B2_11_MOVIE) },
    { label: 'Hablar de películas · plot twist, gripping', done: s.opened.includes(B2_11_FILM) },
    { label: 'Tiempos narrativos combinados', done: s.opened.includes(B2_11_NARRATIVE) },
    { label: 'El tablero de pistas', done: s.opened.includes(B2_11_BOARD) },
    { label: 'Leo confiesa', done: s.opened.includes(B2_11_CONFESS) },
    { label: 'Plot Holes (2)', done: s.defeated.includes(B2_11_HOLE2) },
    { label: 'The Spoiler', done: s.defeated.includes(B2_11_BOSS) },
    { label: 'Charla con Maya', done: s.opened.includes(B2_11_FRIEND_MAYA) },
    { label: 'Charla con Leo', done: s.opened.includes(B2_11_FRIEND_LEO) },
    { label: 'Charla con la persona especial', done: s.opened.includes(B2_11_FRIEND_SPECIAL) },
    { label: 'Reseña (opcional)', done: s.opened.includes(B2_11_REVIEW) },
    { label: 'El cierre', done: s.opened.includes(B2_11_CLOSE) },
  ],
  intro: {
    first: 'Presente. El archivo del Lumen Bay Herald. Tienes demasiadas pistas y ninguna respuesta. Manuel te espera entre cajas de periódicos viejos.',
    later: (s) =>
      s.opened.includes(B2_11_CLOSE)
        ? 'La sala común. "Promise you\'ll speak for me." La misión 11 terminó: la Ventana 12 te espera en el mapa.'
        : s.defeated.includes(B2_11_BOSS)
        ? 'La sala común. La pantalla está apagada. Maya, Leo y la persona especial siguen despiertos.'
        : s.opened.includes(B2_11_BOARD)
        ? 'La sala común. El tablero de pistas está lleno de hilos rojos. Leo no ha dicho nada en toda la noche.'
        : s.opened.includes(B2_11_FACTCHECK)
          ? 'La sala común de la residencia. Marisol preparó palomitas: hay noche de cine.'
          : 'El archivo del Herald. Polvo, cajas y preguntas.',
  },
}

/** Manuel en el archivo (MemoryScript): el protagonista le cuenta las pistas, sin mencionar los viajes en el tiempo */
export const B2_11_ARRIVAL_SCRIPT: ScriptLine[] = [
  { who: 'narrator', text: "(The Herald's archive. Old newspapers, boxes and dust. Manuel is looking for something in a cabinet.)", es: '(El archivo del Herald. Periódicos viejos, cajas y polvo. Manuel busca algo en un archivador.)' },
  { who: 'narrator', text: "Manuel: You said you had something to tell me. Go on, I'm listening.", es: 'Manuel: Dijiste que tenías algo que contarme. Adelante, te escucho.' },
  { who: 'narrator', text: "(You tell him almost everything: the blackouts, the purple light, Vocalis, the tablets, a card signed with a G. You don't mention the Windows. Nobody would believe that.)", es: '(Le cuentas casi todo: los apagones, la luz morada, Vocalis, las tablillas, una tarjeta firmada con una G. No mencionas las Ventanas. Nadie creería eso.)' },
  { who: 'narrator', text: 'Manuel: So, a lot of clues and no answers. Let me ask you one thing. Who is G?', es: 'Manuel: O sea, muchas pistas y ninguna respuesta. Déjame preguntarte una cosa. ¿Quién es G?' },
  { who: 'narrator', text: "(You don't know.)", es: '(No lo sabes.)' },
  { who: 'narrator', text: 'Manuel: Then we start with questions. Good questions. A journalist never asks a stranger "Where is G?". It sounds too direct.', es: 'Manuel: Entonces empezamos con preguntas. Buenas preguntas. Un periodista nunca le pregunta a un desconocido "¿Dónde está G?". Suena demasiado directo.' },
  { who: 'narrator', text: 'Manuel: Let me show you how to ask politely… and how to report what people asked.', es: 'Manuel: Déjame mostrarte cómo preguntar con cortesía… y cómo contar lo que la gente preguntó.' },
]

/**
 * Fact Check, tercera y última vez (components/FactCheck.tsx, reutilizado; se gana con 5 de 6): las noticias viejas del Herald
 * sobre los apagones (B1 y lugar 5) y las preguntas que hizo cada testigo, contadas en estilo indirecto.
 */
export const B2_11_FACT_CHECK: FactCheckContent = {
  title: 'Fact Check · The questions',
  intro: {
    en: 'Old Herald drafts about the voice blackouts. This time, the witnesses asked questions. Is each draft faithful to the question? If not, choose the correct version.',
    es: 'Borradores viejos del Herald sobre los apagones de voz. Esta vez, los testigos hicieron preguntas. ¿Cada borrador es fiel a la pregunta? Si no lo es, elige la versión correcta.',
  },
  rounds: [
    {
      speaker: { en: 'Manuel, to Tomás', es: 'Manuel, a Tomás' },
      quote: 'Where were you when the lights went out?',
      quoteEs: '¿Dónde estabas cuando se apagaron las luces?',
      draft: 'Manuel asked Tomás where was he when the lights went out.',
      faithful: false,
      options: ['Manuel asked to Tomás where he was when the lights went out.', 'Manuel asked Tomás where he was when the lights went out.', 'Manuel asked Tomás where did he be when the lights went out.'],
      answer: 1,
      tip: 'En la pregunta indirecta el sujeto va antes del verbo: where he was. Y asked + persona, sin to.',
    },
    {
      speaker: { en: 'Captain Halvorsen, to Manuel', es: 'La capitana Halvorsen, a Manuel' },
      quote: 'Have you seen the purple light before?',
      quoteEs: '¿Ha visto la luz morada antes?',
      draft: 'The captain asked Manuel if he had seen the purple light before.',
      faithful: true,
      tip: 'Pregunta de sí o no → if / whether. Y el tiempo retrocede: have seen → had seen.',
    },
    {
      speaker: { en: 'Zoe Park, to her followers', es: 'Zoe Park, a sus seguidores' },
      quote: 'Do you believe in ghosts?',
      quoteEs: '¿Creen en fantasmas?',
      draft: 'Zoe asked her followers do they believe in ghosts.',
      faithful: false,
      options: ['Zoe asked her followers if they believed in ghosts.', 'Zoe asked her followers if did they believe in ghosts.', 'Zoe asked her followers that they believed in ghosts.'],
      answer: 0,
      tip: 'Sin do / does / did: if + sujeto + verbo en pasado (believed).',
    },
    {
      speaker: { en: 'A ferry passenger', es: 'Una pasajera del ferry' },
      quote: 'When will the lights work again?',
      quoteEs: '¿Cuándo volverán a funcionar las luces?',
      draft: 'A passenger asked when the lights would work again.',
      faithful: true,
      tip: 'will → would en estilo indirecto. Sujeto antes del verbo: the lights would work.',
    },
    {
      speaker: { en: 'A port worker, to Zoe', es: 'Un trabajador del puerto, a Zoe' },
      quote: 'Why are you filming us?',
      quoteEs: '¿Por qué nos estás grabando?',
      draft: 'He asked Zoe why was she filming them.',
      faithful: false,
      options: ['He asked Zoe why did she film them.', 'He asked Zoe that why she was filming them.', 'He asked Zoe why she was filming them.'],
      answer: 2,
      tip: 'why + sujeto + verbo: why she was filming them. Sin that y sin did.',
    },
    {
      speaker: { en: 'A tourist, to Manuel', es: 'Un turista, a Manuel' },
      quote: 'Is Lumen Bay safe at night?',
      quoteEs: '¿Es seguro Lumen Bay de noche?',
      draft: 'A tourist asked Manuel whether Lumen Bay was safe at night.',
      faithful: true,
      tip: 'whether = if en preguntas de sí o no. is → was.',
    },
  ],
}

/** La noche de cine en la sala común (MemoryScript, escucha): Marisol propone la película; el protagonista se queda callado */
export const B2_11_MOVIE_SCRIPT: ScriptLine[] = [
  { who: 'narrator', text: '(The common room of the residence. Marisol has a big bowl of popcorn and the remote control.)', es: '(La sala común de la residencia. Marisol tiene un tazón grande de palomitas y el control remoto.)' },
  { who: 'narrator', text: 'Marisol: You look tired. Everybody looks tired! Movie night. No excuses.', es: 'Marisol: Te ves cansado. ¡Todos se ven cansados! Noche de cine. Sin excusas.' },
  { who: 'narrator', text: 'Marisol: I chose a thriller: "Last Train to Yesterday". A man travels back in time to stop an accident.', es: 'Marisol: Escogí un thriller: "Last Train to Yesterday". Un hombre viaja al pasado para evitar un accidente.' },
  { who: 'narrator', text: "Marisol: It's a bit slow at first, but it's well worth watching. And the ending is spine-chilling.", es: 'Marisol: Es un poco lenta al principio, pero vale mucho la pena. Y el final pone los pelos de punta.' },
  { who: 'narrator', text: '(The film starts. The man had been planning the trip for years. But when he arrived in the past, the accident had already happened.)', es: '(Empieza la película. El hombre llevaba años planeando el viaje. Pero cuando llegó al pasado, el accidente ya había ocurrido.)' },
  { who: 'narrator', text: '(Everybody is eating popcorn. You are not. The story is too close to yours.)', es: '(Todos comen palomitas. Tú no. La historia se parece demasiado a la tuya.)' },
  { who: 'narrator', text: "Maya: Wow, what a plot twist! Hey… are you OK? You haven't said a word.", es: 'Maya: ¡Wow, qué giro! Oye… ¿estás bien? No has dicho ni una palabra.' },
  { who: 'narrator', text: "(You say you're fine. Leo doesn't say anything either. He is staring at the screen.)", es: '(Dices que estás bien. Leo tampoco dice nada. Mira fijamente la pantalla.)' },
  { who: 'narrator', text: "Maya: Come on, let's talk about the film. I'll teach you to sound like a real film critic.", es: 'Maya: Vamos, hablemos de la película. Te enseño a sonar como un crítico de cine de verdad.' },
]

/**
 * El tablero de pistas: Reconstruct, versión "tablero" (components/Reconstruct.tsx, reutilizado). La persona especial y el
 * protagonista arman en un corcho la línea de tiempo de B2 con tiempos narrativos combinados. Cada nota tiene un error.
 */
export const B2_11_BOARD_ITEMS: ReconstructItem[] = [
  {
    source: 'The fire',
    clue: { en: 'A teacher was teaching a night class when the fire started. A man froze on the stairs.', es: 'Un profesor estaba dando una clase nocturna cuando empezó el incendio. Un hombre se quedó paralizado en la escalera.' },
    claim: { en: 'The fire started after everybody had left the school.', es: 'El incendio empezó después de que todos se habían ido de la escuela.' },
    options: ['The teacher was teaching a class when the fire started.', 'The teacher taught a class when the fire had been starting.', 'The teacher had been teach a class when the fire started.'],
    answer: 0,
    tip: 'Lo que estaba en curso (fondo): was teaching. El hecho que lo interrumpe: started.',
  },
  {
    source: 'Vocalis',
    clue: { en: 'A year after the fire, the scientists at Vocalis were testing a device. They had started months before.', es: 'Un año después del incendio, los científicos de Vocalis estaban probando un aparato. Habían empezado meses antes.' },
    claim: { en: 'Vocalis had never tested the device.', es: 'Vocalis nunca había probado el aparato.' },
    options: ['Vocalis has been testing the device for months.', 'Vocalis had been testing the device for months.', 'Vocalis had been tested the device for months.'],
    answer: 1,
    tip: 'Algo que duraba desde antes de un momento del pasado: had been + -ing.',
  },
  {
    source: 'The device',
    clue: { en: 'Vocalis launched "Restore" in 2064. The prototype was not in the lab anymore: G had stolen it.', es: 'Vocalis lanzó "Restore" en 2064. El prototipo ya no estaba en el laboratorio: G lo había robado.' },
    claim: { en: 'G stole the prototype after the launch.', es: 'G robó el prototipo después del lanzamiento.' },
    options: ['By the time of the launch, G has already stolen the prototype.', 'By the time of the launch, G had already stole the prototype.', 'By the time of the launch, G had already stolen the prototype.'],
    answer: 2,
    tip: 'by the time + un momento del pasado → had + participio (stolen, no stole).',
  },
  {
    source: 'The card',
    clue: { en: 'In the school playground, G sat on a bench and wrote the card. Nobody saw him.', es: 'En el patio de la escuela, G se sentó en una banca y escribió la tarjeta. Nadie lo vio.' },
    claim: { en: 'G wrote the card in the classroom, in front of everybody.', es: 'G escribió la tarjeta en el salón, delante de todos.' },
    options: ['G was sitting on a bench when he was write the card.', 'G was sitting on a bench when he wrote the card.', 'G sitting on a bench when he wrote the card.'],
    answer: 1,
    tip: 'Fondo: was sitting. La acción principal: wrote.',
  },
  {
    source: 'The birthday',
    clue: { en: 'On his birthday, Leo opened the gift and found the card. G had written it before.', es: 'En su cumpleaños, Leo abrió el regalo y encontró la tarjeta. G la había escrito antes.' },
    claim: { en: 'G wrote the card after Leo opened the gift.', es: 'G escribió la tarjeta después de que Leo abrió el regalo.' },
    options: ['By the time Leo opened the gift, G already has written the card.', 'By the time Leo opened the gift, G had already written the card.', 'By the time Leo had opened the gift, G already writes the card.'],
    answer: 1,
    tip: 'Lo que pasó antes: had already written. Lo que pasó después: opened.',
  },
]

/** Leo confiesa (MemoryScript, escucha): el grupo le pregunta con preguntas indirectas. Solo una sospecha: "What if G is connected to Leo?" */
export const B2_11_CONFESS_SCRIPT: ScriptLine[] = [
  { who: 'narrator', text: '(Leo is holding his throat. When he tries to speak, only air comes out. Then his voice comes back, weak.)', es: '(Leo se sostiene la garganta. Cuando intenta hablar, solo sale aire. Luego su voz vuelve, débil.)' },
  { who: 'narrator', text: 'Maya: Leo, can you tell us why your voice keeps breaking?', es: 'Maya: Leo, ¿puedes decirnos por qué se te sigue quebrando la voz?' },
  { who: 'narrator', text: "Leo: It started at the hospital, after the clock. My voice disappears when the fragments glow.", es: 'Leo: Empezó en el hospital, después del reloj. Mi voz desaparece cuando los fragmentos brillan.' },
  { who: 'narrator', text: 'Special person: Do you know how long it lasts?', es: 'La persona especial: ¿Sabes cuánto dura?' },
  { who: 'narrator', text: "Leo: A few seconds. A minute, sometimes. And I've been having the same dream for weeks.", es: 'Leo: Unos segundos. Un minuto, a veces. Y llevo semanas teniendo el mismo sueño.' },
  { who: 'narrator', text: "Leo: Smoke. A corridor on fire. Somebody is standing on the stairs and I'm shouting for help.", es: 'Leo: Humo. Un pasillo en llamas. Alguien está de pie en la escalera y yo grito pidiendo ayuda.' },
  { who: 'narrator', text: "Maya: Why didn't you tell us?", es: 'Maya: ¿Por qué no nos contaste?' },
  { who: 'narrator', text: "Leo: I didn't want to worry you.", es: 'Leo: No quería preocuparlos.' },
  { who: 'narrator', text: '(A corridor on fire. Somebody on the stairs. You have seen that place through a Window. You think: "What if G is connected to Leo?")', es: '(Un pasillo en llamas. Alguien en la escalera. Has visto ese lugar a través de una Ventana. Piensas: "¿Y si G está conectado con Leo?")' },
  { who: 'narrator', text: '(Suddenly the screen flickers. The film is playing again, but the scenes are full of holes.)', es: '(De repente la pantalla parpadea. La película vuelve a correr, pero las escenas están llenas de huecos.)' },
]

const IN = 'indirect-b2' as const
const NT = 'narrative-b2' as const
const FM = 'film-b2' as const

/** Plot Holes: huecos de guion corrompidos que salen de la pantalla. Preguntas: etiqueta b2-11-hole */
const HOLE = (id: string, line: { text: string; es: string }): EnemyDef => ({
  id,
  name: 'Plot Hole',
  person: 'Plot Hole',
  kind: 'minion',
  hp: 4,
  topics: [IN, NT],
  kinds: ['fill', 'fix'],
  tags: ['b2-11-hole'],
  onlyTags: true,
  zone: 'sala',
  look: { shirt: '#2b2b3a', hair: '#111118', skin: '#4a4a63' },
  before: [line],
  after: [{ text: '(The hole closes. The scene on the screen is complete again.)', es: '(El hueco se cierra. La escena de la pantalla vuelve a estar completa.)' }],
  freed: { text: '(Only a bit of popcorn is left on the floor.)', es: '(Solo quedan unas palomitas en el suelo.)' },
})

/**
 * The Spoiler: un crítico de cine corrompido que intenta contar el final de todo. Jefe de 2 fases.
 * Fase 1: tiempos narrativos combinados (b2-11-boss-nt) · Fase 2: preguntas indirectas y en estilo indirecto, con la confesión
 * de Leo en escucha (b2-11-boss-in). Los fragmentos, la despedida y el cierre llegan en el bloque 3.
 */
export const B2_11_BOSS_DEF: EnemyDef = {
  id: B2_11_BOSS,
  name: 'The Spoiler',
  person: 'The Spoiler',
  kind: 'boss',
  hp: 10,
  topics: [NT, IN, FM],
  kinds: ['fill', 'fix', 'order', 'listen'],
  tags: ['b2-11-boss-nt'],
  phases: [
    { hp: 5, title: 'Primer acto: contarlo todo mal', topics: [NT, FM], kinds: ['fill', 'fix', 'order'], tags: ['b2-11-boss-nt'], line: { text: 'She had been knowing him for years! When you arrived, they already left! The end!', es: 'had been knowing y they already left: mal.' } },
    { hp: 5, title: 'Último acto: preguntas sin respuesta', topics: [IN], kinds: ['fill', 'fix', 'listen'], tags: ['b2-11-boss-in'], line: { text: 'Can you tell me what time does it end? He asked me did I like it! I know how it ends!', es: 'what time does it end y asked me did I like it: mal.' } },
  ],
  onlyTags: true,
  zone: 'sala',
  look: { shirt: '#1d1d1d', hair: '#c9c9c9', skin: '#8f8fa3' },
  before: [
    { text: '(A tall man in a long black coat steps out of the screen. He is holding a notebook full of reviews.)', es: '(Un hombre alto con un abrigo negro largo sale de la pantalla. Tiene un cuaderno lleno de reseñas.)' },
    { text: 'SPOILER ALERT! I KNOW HOW YOUR STORY ENDS. SHALL I TELL YOU?', es: '¡ALERTA DE SPOILER! SÉ CÓMO TERMINA TU HISTORIA. ¿TE LO CUENTO?' },
  ],
  after: [{ text: '(The critic drops his notebook. The pages fly away, all of them blank.)', es: '(El crítico suelta su cuaderno. Las páginas salen volando, todas en blanco.)' }],
  freed: { text: '(The screen goes dark. The film is over.)', es: '(La pantalla se apaga. La película terminó.)' },
  farewell: {
    q: 'The Spoiler (fading): "Can you tell me… how your story ends?"',
    options: ["I don't know how it ends yet.", "I don't know how does it end yet.", "I don't know how ends it yet."],
    answer: 0,
    tip: 'Pregunta indirecta: how + sujeto + verbo (how it ends).',
  },
}

export const B2_11_ENEMIES: Record<string, EnemyDef> = {
  [B2_11_HOLE1]: HOLE(B2_11_HOLE1, { text: 'Do you know where is G? He asked me where was I going!', es: 'where is G y where was I going: mal.' }),
  [B2_11_HOLE2]: HOLE(B2_11_HOLE2, { text: 'By the time we arrived, the film already started!', es: 'already started: falta had.' }),
  [B2_11_BOSS]: B2_11_BOSS_DEF,
}

// ── Bloque 3 ──

/** Los quintos momentos de amistad de B2 (Explore.tsx), en orden: Maya → Leo → la persona especial. No hay respuestas malas */
export const B2_11_MAYA_CHAT: CasualChat = {
  requires: null,
  level: 'B2',
  text: "OK, that film was too close to home. Let's change the subject. What film or series would you recommend to me, and why?",
  es: 'Bueno, esa película nos tocó de cerca. Cambiemos de tema. ¿Qué película o serie me recomendarías, y por qué?',
  options: [
    { text: "There's a series about a lighthouse keeper. It's a bit slow at first, but it's well worth watching. Every episode ends with a cliffhanger.", textEs: 'Hay una serie sobre un guardián de faro. Es un poco lenta al principio, pero vale mucho la pena. Cada episodio termina en suspenso.', reply: "Sold! I'll binge-watch it this weekend. Don't give away the ending!", es: '¡Vendido! La veré de corrido este fin de semana. ¡No me cuentes el final!', effect: 2 },
    { text: "A thought-provoking film about a family that had stopped talking. It turned out to be my favourite of the year.", textEs: 'Una película que hace pensar, sobre una familia que había dejado de hablarse. Resultó ser mi favorita del año.', reply: 'That sounds gripping. And a bit like us, sometimes.', es: 'Suena atrapante. Y un poco como nosotros, a veces.', effect: 2 },
    { text: "Honestly, most films are overrated. I prefer documentaries.", textEs: 'Sinceramente, la mayoría de las películas están sobrevaloradas. Prefiero los documentales.', reply: 'Fair enough! Next movie night, you choose.', es: '¡Me parece justo! En la próxima noche de cine, eliges tú.', effect: 1 },
    { text: 'Plot the twist series recommend watching cast.', textEs: '(No tiene sentido.)', reply: "Sorry, I didn't understand.", es: 'Perdón, no te entendí.', effect: -1 },
  ],
}

export const B2_11_LEO_CHAT: CasualChat = {
  requires: null,
  level: 'B2',
  text: "Can I ask you something strange? What would you do if you lost your voice? I… I'm scared it'll happen to me.",
  es: '¿Puedo preguntarte algo raro? ¿Qué harías si perdieras la voz? Yo… tengo miedo de que me pase.',
  options: [
    { text: "I'd be terrified. But I'd find another way to speak: writing, signs, anything. And I'd have you.", textEs: 'Me aterraría. Pero encontraría otra forma de hablar: escribiendo, con señas, como sea. Y te tendría a ti.', reply: "Thanks. It's easier to be scared when you're not alone.", es: 'Gracias. Es más fácil tener miedo cuando no estás solo.', effect: 2 },
    { text: "I know how it feels. I lost mine once, remember? It came back piece by piece.", textEs: 'Sé lo que se siente. Una vez perdí la mía, ¿recuerdas? Volvió pieza por pieza.', reply: "You're right. If yours came back… maybe mine will too.", es: 'Tienes razón. Si la tuya volvió… quizá la mía también.', effect: 2 },
    { text: "I don't know. I try not to think about it.", textEs: 'No sé. Trato de no pensar en eso.', reply: "Yeah… me neither. Until it happens again.", es: 'Sí… yo tampoco. Hasta que vuelve a pasar.', effect: 1 },
    { text: 'Voice lost the would if scared I.', textEs: '(No tiene sentido.)', reply: "Sorry, I didn't understand.", es: 'Perdón, no te entendí.', effect: -1 },
  ],
}

export const B2_11_SPECIAL_CHAT: CasualChat = {
  requires: null,
  level: 'B2',
  text: "You've been quiet all night. You don't have to tell me everything. But whatever happens, I'm here.",
  es: 'Has estado callado toda la noche. No tienes que contarme todo. Pero pase lo que pase, aquí estoy.',
  options: [
    { text: "I'll be honest: I've seen things I can't explain, and I think Leo is in danger. I'm scared.", textEs: 'Te voy a ser sincero: he visto cosas que no puedo explicar, y creo que Leo está en peligro. Tengo miedo.', reply: "Then we'll face it together.", es: 'Entonces lo enfrentaremos juntos.', effect: 2 },
    { text: "Thank you. I can't tell you everything yet, but I'll tell you as soon as I understand it.", textEs: 'Gracias. Todavía no puedo contarte todo, pero te lo contaré en cuanto lo entienda.', reply: "OK. I trust you. I'll be waiting.", es: 'Está bien. Confío en ti. Te estaré esperando.', effect: 2 },
    { text: "I'm fine, really. It was just the film.", textEs: 'Estoy bien, de verdad. Fue solo la película.', reply: 'If you say so… The offer stands.', es: 'Si tú lo dices… La oferta sigue en pie.', effect: 1 },
    { text: 'Here whatever I happens trust the.', textEs: '(No tiene sentido.)', reply: "Sorry, I didn't understand.", es: 'Perdón, no te entendí.', effect: -1 },
  ],
}

/** Marisol: el pijama de cine mejorado (pasos de la tarea b2-11-pyjamas) */
export const B2_11_PYJAMAS_STEPS = [
  { text: "What a night! First a thriller, then a critic jumping out of the screen. I've never had a movie night like this.", es: '¡Qué noche! Primero un thriller, luego un crítico saltando de la pantalla. Nunca había tenido una noche de cine así.' },
  { text: 'Remember the movie pyjamas I gave you last year? I made you a new pair. Midnight blue, with little stars.', es: '¿Recuerdas el pijama de películas que te regalé el año pasado? Te hice uno nuevo. Azul medianoche, con estrellitas.' },
]

const FILM_WORDS = ['plot', 'plot twist', 'cliffhanger', 'cast', 'sequel', 'episode', 'review', 'gripping', 'predictable', 'spine-chilling', 'overrated', 'thought-provoking', 'well worth', 'binge-watch']
const PAST_PERFECT = /\bhad\s+(been\s+\w+ing|already\s+\w+|\w+(ed|en|wn|ne|t))\b/i
const PAST_CONT = /\b(was|were)\s+\w+ing\b/i
const RECOMMEND = /\b(i would recommend|i'd recommend|i recommend|well worth watching|you should (definitely )?(see|watch) it|not really my thing)\b/i

/** Requisitos de la reseña (se revisa con patrones, igual que en Movie Night de B1). No se revisa la calidad */
export function b2ReviewChecks(text: string): { label: string; ok: boolean }[] {
  const n = wordCount(text)
  const t = ` ${text.toLowerCase().replace(/[^a-z' -]+/g, ' ')} `
  const found = FILM_WORDS.filter((w) => t.includes(` ${w}`))
  return [
    { label: `Entre 60 y 90 palabras (llevas ${n})`, ok: n >= 60 && n <= 90 },
    { label: 'Un pasado perfecto (had planned, had already happened, had been waiting…)', ok: PAST_PERFECT.test(text) },
    { label: 'Un pasado continuo para el fondo (was travelling, were watching…)', ok: PAST_CONT.test(text) },
    { label: `Al menos 2 palabras de cine: plot twist, gripping, predictable… (llevas ${found.length})`, ok: found.length >= 2 },
    { label: 'Una recomendación: I would recommend it, It\'s well worth watching…', ok: RECOMMEND.test(text) },
  ]
}

/** La reseña opcional de "Last Train to Yesterday" (ReviewWriter, reutilizado) */
export const B2_11_REVIEW_GAME: ReviewContent = {
  title: 'Movie review',
  ask: 'Write a short review of "Last Train to Yesterday".',
  es: 'Escribe una reseña corta de "Last Train to Yesterday" (60 a 90 palabras): cuenta un poco de la trama con varios pasados y da tu recomendación.',
  help: 'A man had been planning… · While he was travelling… · By the time he arrived, … · It\'s well worth watching.',
  checks: b2ReviewChecks,
  model:
    'Last Train to Yesterday is a gripping thriller. A man had been planning a trip to the past for years because he wanted to stop an accident. ' +
    'While he was travelling, the train stopped in the wrong year. By the time he arrived, the accident had already happened. ' +
    'The plot twist at the end is spine-chilling, although the first half is a bit predictable. ' +
    "It's a bit slow at first, but it's well worth watching.",
  modelBy: 'Reseña modelo de Marisol',
}

/** El cierre con Leo (pasos de la tarea b2-11-close) */
export const B2_11_CLOSE_STEPS = [
  { text: '(Two small lights rise from the dark screen and fly into your clock. Click. Click.)', es: '(Dos lucecitas salen de la pantalla apagada y vuelan hacia tu reloj. Clic. Clic.)' },
  { text: '(Leo is looking at the clock. When the fragments glow, his voice breaks again.)', es: '(Leo mira el reloj. Cuando los fragmentos brillan, su voz vuelve a quebrarse.)' },
  { text: 'Leo: If I ever lose my voice… promise you\'ll speak for me.', es: 'Leo: Si alguna vez pierdo la voz… prométeme que hablarás por mí.' },
  { text: '(You promise. On the clue board, under the last red thread, you write: "Who is G?")', es: '(Se lo prometes. En el tablero de pistas, bajo el último hilo rojo, escribes: "¿Quién es G?")' },
]
