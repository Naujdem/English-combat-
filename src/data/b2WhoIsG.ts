import type { GameState, SceneDef, Zone } from '../game/types'
import type { ScriptLine } from './b1Accident'
import type { FactCheckContent } from '../components/FactCheck'
import type { ReconstructItem } from '../components/Reconstruct'

/**
 * B2-11 · Who Is G? (presente, Lumen Bay). Guía: Manuel en el archivo, y luego el grupo (ficha 11).
 * Escena b2-11-herald: el archivo del Herald (izquierda) y la sala común de la residencia, en una noche de cine (derecha).
 * Bloque 1: Manuel en el archivo (b2-11-arrival, script: el protagonista le cuenta las pistas, sin los viajes en el tiempo)
 *   → lección 'indirect-b2' + práctica (b2-11-indirect): preguntas indirectas y en estilo indirecto → Fact Check, tercera y última
 *   vez (b2-11-factcheck: las preguntas de los testigos de los apagones; abre la puerta de la sala común) → Marisol: la noche de cine
 *   (b2-11-movie, script, escucha: "Last Train to Yesterday") → Maya: lección 'film-b2' + práctica (b2-11-film) → la persona
 *   especial: lección 'narrative-b2' + práctica (b2-11-narrative): tiempos narrativos combinados → el tablero de pistas: Reconstruct,
 *   versión "tablero" (b2-11-board): la línea de tiempo de B2 (el incendio, Vocalis, el aparato, la tarjeta y el cumpleaños).
 * Bloque 2 (pendiente): Leo confiesa (escucha, preguntas indirectas), Plot Holes (2) y The Spoiler (2 fases).
 * Bloque 3 (pendiente): los quintos momentos de amistad, el cierre (dos fragmentos llenan el quinto segmento del núcleo y se abre
 *   la Ventana 12; "If I ever lose my voice… promise you'll speak for me."), la reseña opcional, diario y recompensas.
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
  ],
  intro: {
    first: 'Presente. El archivo del Lumen Bay Herald. Tienes demasiadas pistas y ninguna respuesta. Manuel te espera entre cajas de periódicos viejos.',
    later: (s) =>
      s.opened.includes(B2_11_BOARD)
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
