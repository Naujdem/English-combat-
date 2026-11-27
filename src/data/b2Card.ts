import type { GameState, SceneDef, Zone } from '../game/types'
import type { ScriptLine } from './b1Accident'

/**
 * B2-10 · The Card (Ventana, 2056). La misma tarde que la ventana del recuerdo 13 de B1 (data/b1Window2056.ts), vista desde fuera
 * y un poco después. El pasillo exterior del salón de un profesor y el patio de la escuela. Nadie oye al protagonista.
 * Guía: lo que hay en el lugar (la pizarra que se ve por la ventana y el cuaderno de G, primera vez en B2; ficha 10).
 * Canon de B1: en la ventana G no escribe nada; la tarjeta la escribe después, en el patio.
 * Bloque 1: la figura con capucha en la ventana (b2-10-arrival, script, nadie te oye) → la clase por la ventana (b2-10-class,
 *   script, escucha: el debate "Should we always speak up?") → la pizarra: lección 'contrast-b2' + práctica (b2-10-contrast)
 *   → G se va al patio: la banca (b2-10-bench, script) → el cuaderno de G: lección 'ing-prep-b2' + práctica (b2-10-ing).
 *   Bloque 2: Reconstruct (la tarjeta), Ink Blots y el jefe Second Thoughts. Bloque 3: el cierre y la salida de la Ventana.
 */
export const B2_10_SCHOOL_ID = 'b2-10-school'
export const B2_10_G_WINDOW = 'b2-10-g-window'
export const B2_10_WINDOW = 'b2-10-window'
export const B2_10_BOARD = 'b2-10-board'
export const B2_10_G_BENCH = 'b2-10-g-bench'
export const B2_10_NOTEBOOK = 'b2-10-notebook'
/** Tareas (marcas en `opened`) */
export const B2_10_ARRIVAL = 'b2-10-arrival'
export const B2_10_CLASS = 'b2-10-class'
export const B2_10_CONTRAST = 'b2-10-contrast'
export const B2_10_BENCH = 'b2-10-bench'
export const B2_10_ING = 'b2-10-ing'

/** G, ya muy viejo: abrigo oscuro y capucha, siempre de espaldas o en sombra */
export const B2_G_OLD_LOOK = { shirt: '#23252d', hair: '#9b9ea6', skin: '#363b46', gender: 'male' as const }

/**
 * Leyenda (Tiles.tsx, sin dibujos nuevos): # pared · W ventana del salón · . piso del pasillo · d puerta · , pasto · H banca · p planta.
 * Arriba el pasillo exterior del salón (las ventanas dan a la clase); abajo el patio, que se abre después de la pizarra.
 */
const MAP = [
  '#W#W#W#W#W##',
  '#..........#',
  '#..........#',
  '####d#######',
  '#,,,,,,,,,,#',
  '#,H,,,,,H,,#',
  '#,p,,,,,,p,#',
  '############',
]

const zoneAt = (_x: number, y: number): Zone => (y <= 2 ? 'aula-futuro' : 'patio-futuro')

const CLASS_VIEW = { text: 'Students sitting in a circle. They are all talking.', sub: 'Estudiantes sentados en círculo. Todos están hablando.', say: 'They are all talking.' }

export const B2_10_SCHOOL: SceneDef = {
  id: B2_10_SCHOOL_ID,
  name: 'Ventana 2056 · La escuela',
  topics: [],
  map: MAP,
  start: { x: 1, y: 2 },
  // Sin jefe en este bloque: la puerta del jefe apunta a un muro y no hace falta ninguna llave
  bossDoor: { x: 0, y: 0 },
  keysNeeded: 0,
  entities: [
    // G mira por la ventana del salón hasta que termina la lección de la pizarra; luego se sienta en la banca del patio
    { type: 'npc', id: B2_10_G_WINDOW, x: 6, y: 1 },
    { type: 'npc', id: B2_10_WINDOW, x: 5, y: 0 },
    { type: 'npc', id: B2_10_BOARD, x: 7, y: 0 },
    { type: 'npc', id: B2_10_G_BENCH, x: 7, y: 5 },
    { type: 'npc', id: B2_10_NOTEBOOK, x: 9, y: 5 },
  ],
  labels: [
    { text: '2056', x: 5, y: 2 },
    { text: 'Patio', x: 5, y: 6 },
  ],
  zoneAt,
  examine: {
    '1,0': CLASS_VIEW,
    '3,0': CLASS_VIEW,
    '9,0': { text: 'A poster in the classroom: "Your voice matters."', sub: 'Un cartel en el salón: "Tu voz importa".', say: 'Your voice matters.' },
    '2,5': { text: 'An empty bench. Someone left a pencil here.', sub: 'Una banca vacía. Alguien dejó un lápiz aquí.', say: 'Someone left a pencil here.' },
  },
  // El patio se abre después de la pizarra: G sale primero
  locked: (x, y, s) =>
    x === 4 && y === 3 && !s.opened.includes(B2_10_CONTRAST)
      ? { text: 'The door to the patio. The hooded man is still at the window.', sub: 'Todavía no. Primero mira lo que pasa en el salón.' }
      : null,
  links: {},
  requirements: [],
  chips: (s: GameState) => [
    { label: 'La figura con capucha', done: s.opened.includes(B2_10_ARRIVAL) },
    { label: 'La clase por la ventana', done: s.opened.includes(B2_10_CLASS) },
    { label: 'La pizarra: ideas opuestas', done: s.opened.includes(B2_10_CONTRAST) },
    { label: 'La banca del patio', done: s.opened.includes(B2_10_BENCH) },
    { label: 'El cuaderno de G', done: s.opened.includes(B2_10_ING) },
  ],
  intro: {
    first: '2056. A school in the afternoon. — 2056. Una escuela por la tarde. Aquí nadie te oye.',
    later: () => 'A school, 2056. Nobody can hear you. — Una escuela, 2056. Nadie te oye.',
  },
}

/** La figura con capucha en la ventana: entrada a la Ventana (sin voz) */
export const B2_10_ARRIVAL_SCRIPT: ScriptLine[] = [
  { who: 'narrator', text: '(A blue flash. A sign in the air: 2056. A school corridor in the afternoon. Light comes from a classroom.)', es: '(Un destello azul. Un letrero en el aire: 2056. El pasillo de una escuela por la tarde. Sale luz de un salón.)' },
  { who: 'narrator', text: '(A man in a dark coat is standing at the window, with his back to you. He has a hood. He is very old.)', es: '(Un hombre con abrigo oscuro está de pie frente a la ventana, de espaldas a ti. Tiene capucha. Es muy viejo.)' },
  { who: 'L', fx: 'unheard', text: 'Excuse me… who are you?', es: 'Intentas decir: "Disculpe… ¿quién es usted?"' },
  { who: 'narrator', text: '(He doesn\'t turn around. He is only looking at the classroom. His hands are shaking a little.)', es: '(No se da la vuelta. Solo mira el salón. Le tiemblan un poco las manos.)' },
  { who: 'narrator', text: '(You have seen this window before… in a memory. But this time you are outside.)', es: '(Ya viste esta ventana antes… en un recuerdo. Pero esta vez estás afuera.)' },
]

/** La clase por la ventana (escucha): el debate del profesor. Su nombre suena a estática, como en el recuerdo 13 de B1 */
export const B2_10_CLASS_SCRIPT: ScriptLine[] = [
  { who: 'narrator', text: '(Inside, a teacher with his back to the window. His name sounds like static: Mr. ▒▒▒.)', es: '(Adentro, un profesor de espaldas a la ventana. Su nombre suena a estática: Mr. ▒▒▒.)' },
  { who: 'narrator', text: 'Mr. ▒▒▒: Today\'s debate: should we always speak up?', es: 'Mr. ▒▒▒: El debate de hoy: ¿siempre deberíamos alzar la voz?' },
  { who: 'narrator', text: 'A student: I think we should. However, sometimes it\'s safer to stay quiet.', es: 'Un estudiante: Creo que sí. Sin embargo, a veces es más seguro quedarse callado.' },
  { who: 'narrator', text: 'Another student: Some people speak up, whereas others prefer to listen. Both are OK.', es: 'Otra estudiante: Algunas personas alzan la voz, mientras que otras prefieren escuchar. Las dos cosas están bien.' },
  { who: 'narrator', text: 'Mr. ▒▒▒: Good. And despite being scared, you can still say what you think.', es: 'Mr. ▒▒▒: Bien. Y a pesar de tener miedo, igual pueden decir lo que piensan.' },
  { who: 'narrator', text: '(He writes on the board. You can read it from the window.)', es: '(Escribe en la pizarra. Puedes leerla desde la ventana.)' },
]

/** La banca del patio: G se sienta y abre su cuaderno. El protagonista lee por encima de su hombro (nadie lo nota, ficha 0.3) */
export const B2_10_BENCH_SCRIPT: ScriptLine[] = [
  { who: 'narrator', text: '(The class is over. The old man walks slowly to the patio and sits on a bench.)', es: '(La clase terminó. El viejo camina despacio hasta el patio y se sienta en una banca.)' },
  { who: 'narrator', text: '(He takes out an old notebook. The cover has an ink stain… and a letter: G.)', es: '(Saca un cuaderno viejo. La tapa tiene una mancha de tinta… y una letra: G.)' },
  { who: 'L', fx: 'unheard', text: 'G… the notebook from the memories.', es: 'Intentas decir: "G… el cuaderno de los recuerdos".' },
  { who: 'narrator', text: '(Nobody notices you. You stand behind the bench and read over his shoulder.)', es: '(Nadie te nota. Te paras detrás de la banca y lees por encima de su hombro.)' },
  { who: 'narrator', text: '(The handwriting is shaky. Many words are crossed out.)', es: '(La letra es temblorosa. Muchas palabras están tachadas.)' },
]
