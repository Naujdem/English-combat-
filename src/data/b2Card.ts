import type { EnemyDef, GameState, SceneDef, Zone } from '../game/types'
import type { ScriptLine } from './b1Accident'
import type { ReconstructItem } from '../components/Reconstruct'

/**
 * B2-10 · The Card (Ventana, 2056). La misma tarde que la ventana del recuerdo 13 de B1 (data/b1Window2056.ts), vista desde fuera
 * y un poco después. El pasillo exterior del salón de un profesor y el patio de la escuela. Nadie oye al protagonista.
 * Guía: lo que hay en el lugar (la pizarra que se ve por la ventana y el cuaderno de G, primera vez en B2; ficha 10).
 * Canon de B1: en la ventana G no escribe nada; la tarjeta la escribe después, en el patio.
 * Bloque 1: la figura con capucha en la ventana (b2-10-arrival, script, nadie te oye) → la clase por la ventana (b2-10-class,
 *   script, escucha: el debate "Should we always speak up?") → la pizarra: lección 'contrast-b2' + práctica (b2-10-contrast)
 *   → G se va al patio: la banca (b2-10-bench, script) → el cuaderno de G: lección 'ing-prep-b2' + práctica (b2-10-ing).
 * Bloque 2: G escribe la tarjeta: Reconstruct (b2-10-card, reutilizado: se descartan los borradores tachados hasta el mensaje
 *   de A1, "Happy birthday, Leo. Be brave. Use your voice.", firmado con una G) → G envuelve el regalo (b2-10-gift, script)
 *   → dos Ink Blots (esbirros, manchas de tinta del cuaderno) → el jefe Second Thoughts (2 fases), las dudas de G que intentan
 *   romper la tarjeta.
 * Bloque 3: al vencer a Second Thoughts, G guarda el regalo bajo el abrigo (b2-10-g-leaving): el cierre (b2-10-close, script) recupera
 *   los temas → Explore muestra WindowExit (fundido azul) y vuelves al presente (B2_10_EXITED); se abre el lugar 11. La tarjeta queda
 *   como pista en Mochila › Recuerdos y Ventanas (B2_WINDOW_CLUES). Diario: data/b2Diary.ts (con página del cuaderno de G).
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
/** Bloque 2 */
export const B2_10_CARD = 'b2-10-card'
export const B2_10_GIFT = 'b2-10-gift'
export const B2_10_BLOT1 = 'b2-10-blot1'
export const B2_10_BLOT2 = 'b2-10-blot2'
export const B2_10_BOSS = 'b2-10-boss'
/** Bloque 3 */
export const B2_10_G_LEAVING = 'b2-10-g-leaving'
export const B2_10_CLOSE = 'b2-10-close'
/** Se guarda al salir de la Ventana (después del fundido azul) */
export const B2_10_EXITED = 'b2-10-exited'

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
    // Bloque 2: al envolver el regalo, las manchas de tinta del cuaderno cobran vida; luego las dudas de G
    { type: 'enemy', id: B2_10_BLOT1, x: 3, y: 4, after: B2_10_GIFT },
    { type: 'enemy', id: B2_10_BLOT2, x: 5, y: 6, after: B2_10_BLOT1 },
    { type: 'enemy', id: B2_10_BOSS, x: 6, y: 5, after: B2_10_BLOT2 },
    // Bloque 3: G con el regalo, listo para irse (aparece al vencer a Second Thoughts)
    { type: 'npc', id: B2_10_G_LEAVING, x: 7, y: 5 },
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
    { label: 'La tarjeta', done: s.opened.includes(B2_10_CARD) },
    { label: 'El regalo', done: s.opened.includes(B2_10_GIFT) },
    { label: 'Ink Blots (2)', done: s.defeated.includes(B2_10_BLOT2) },
    { label: 'Second Thoughts', done: s.defeated.includes(B2_10_BOSS) },
    { label: 'G se va', done: s.opened.includes(B2_10_CLOSE) },
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

// ── Bloque 2 ──

/**
 * Reconstruct (reutilizado): G arruga borradores de la tarjeta. Cada pista sale de su cuaderno; la nota de la izquierda es el
 * borrador tachado. La página derecha va armando la tarjeta final, con el texto exacto de A1 (data/diary.ts) y la firma G.
 */
export const B2_10_CARD_CONTENT: { title: string; intro: { en: string; es: string }; items: ReconstructItem[] } = {
  title: 'The Card',
  intro: {
    en: 'G writes a card, crosses it out and starts again. Keep the useful pieces and throw away the rest.',
    es: 'G escribe una tarjeta, la tacha y vuelve a empezar. Quédate con los pedazos útiles y descarta el resto.',
  },
  items: [
    {
      source: "G's notebook",
      clue: { en: "It's worth starting with something simple.", es: 'Vale la pena empezar con algo sencillo.' },
      claim: { en: 'Dear Leo, despite of everything, I wish you a happy birthday.', es: 'Querido Leo, a pesar de todo, te deseo un feliz cumpleaños.' },
      options: ['Happy birthday, Leo.', 'Despite of everything, happy birthday.', 'Happy birthday to Leo, despite.'],
      answer: 0,
      tip: 'Algo sencillo: Happy birthday, Leo. (Y nunca "despite of".)',
      mode: 'choose',
    },
    {
      source: "G's notebook",
      clue: { en: "There's no point in telling him about the fire. He's only fifteen.", es: 'No tiene sentido contarle lo del incendio. Solo tiene quince años.' },
      claim: { en: 'One day there will be a fire. Despite being scared, you must shout.', es: 'Un día habrá un incendio. A pesar del miedo, debes gritar.' },
      options: ['One day there will be a fire.', 'Be brave.', 'Be braving.'],
      answer: 1,
      tip: 'Nada sobre el incendio. Solo el consejo: Be brave.',
      mode: 'choose',
    },
    {
      source: "G's notebook",
      clue: { en: "I had difficulty writing it… but it's the most important part.", es: 'Me costó escribirlo… pero es la parte más importante.' },
      claim: { en: 'Use your voice, whereas your friend stays quiet.', es: 'Usa tu voz, mientras que tu amigo se queda callado.' },
      options: ['Using your voice.', 'Use your voice, but whereas.', 'Use your voice.'],
      answer: 2,
      tip: 'Sin hablar del amigo, y en imperativo: Use your voice.',
      mode: 'choose',
    },
    {
      source: "G's notebook",
      clue: { en: "Don't write the name. Just one letter.", es: 'No escribas el nombre. Solo una letra.' },
      claim: { en: 'From someone who knows you very well.', es: 'De alguien que te conoce muy bien.' },
      options: ['From an old friend of you.', 'G', 'From someone who knows you very well.'],
      answer: 1,
      tip: 'Solo una letra, con la mancha de tinta: G.',
      mode: 'choose',
    },
  ],
}

/** G envuelve el regalo: es el mismo que Leo abre en el parque en A1 (pista fuerte, sin revelar nada) */
export const B2_10_GIFT_SCRIPT: ScriptLine[] = [
  { who: 'narrator', text: '(G reads the card in silence: "Happy birthday, Leo. Be brave. Use your voice." Then he signs it: G. A drop of ink falls next to the letter.)', es: '(G lee la tarjeta en silencio: "Feliz cumpleaños, Leo. Sé valiente. Usa tu voz". Luego la firma: G. Una gota de tinta cae junto a la letra.)' },
  { who: 'narrator', text: '(He takes a small box out of his coat and wraps it in paper. He sticks the card on top.)', es: '(Saca una cajita del abrigo y la envuelve en papel. Le pega la tarjeta encima.)' },
  { who: 'L', fx: 'unheard', text: 'That card… Leo got that card on his birthday!', es: 'Intentas decir: "Esa tarjeta… ¡Leo recibió esa tarjeta en su cumpleaños!"' },
  { who: 'narrator', text: '(You remember the park. Leo opening a gift. A man in a dark coat behind a tree: "Happy birthday… Leo.")', es: '(Recuerdas el parque. Leo abriendo un regalo. Un hombre con abrigo oscuro detrás de un árbol: "Feliz cumpleaños… Leo".)' },
  { who: 'narrator', text: '(G closes the notebook. The ink stains on the pages start to move…)', es: '(G cierra el cuaderno. Las manchas de tinta de las páginas empiezan a moverse…)' },
]

const CT = 'contrast-b2' as const
const IG = 'ing-prep-b2' as const

/** Ink Blots: manchas de tinta del cuaderno de G que cobran vida. Preguntas: etiqueta b2-10-blot */
const BLOT = (id: string, line: { text: string; es: string }): EnemyDef => ({
  id,
  name: 'Ink Blot',
  person: 'Ink Blot',
  kind: 'minion',
  hp: 4,
  topics: [CT, IG],
  kinds: ['fill', 'fix'],
  tags: ['b2-10-blot'],
  onlyTags: true,
  zone: 'patio-futuro',
  look: { shirt: '#1b1d3a', hair: '#0b0c1a', skin: '#2c2f5e' },
  before: [line],
  after: [{ text: '(The blot shrinks into a small drop of ink.)', es: '(La mancha se encoge hasta quedar en una gotita de tinta.)' }],
  freed: { text: '(The drop goes back into the notebook.)', es: '(La gota vuelve al cuaderno.)' },
})

/**
 * Second Thoughts: las dudas de G hechas sombra, que intentan romper la tarjeta. Jefe de 2 fases.
 * Fase 1: conectores de contraste (b2-10-boss-ct) · Fase 2: preposición + -ing, it's worth, there's no point in, have difficulty,
 * con escucha (b2-10-boss-ing). Al vencerlo, la tarjeta queda entera. Las Ventanas no dan atuendos: solo despedida.
 */
export const B2_10_BOSS_DEF: EnemyDef = {
  id: B2_10_BOSS,
  name: 'Second Thoughts',
  person: 'Second Thoughts',
  kind: 'boss',
  hp: 10,
  topics: [CT, IG],
  kinds: ['fill', 'fix', 'order', 'listen'],
  tags: ['b2-10-boss-ct'],
  phases: [
    { hp: 5, title: 'La duda: ¿y si no sirve de nada?', topics: [CT], kinds: ['fill', 'fix', 'order'], tags: ['b2-10-boss-ct'], line: { text: 'Whereas he was happy, but you were sad! In spite he is young, he will forget!', es: 'Whereas…, but… e in spite sin of: mal.' } },
    { hp: 5, title: 'La última duda: romper la tarjeta', topics: [IG], kinds: ['fill', 'fix', 'listen'], tags: ['b2-10-boss-ing'], line: { text: "It's not worth to try! You have difficulty to write! Tear it up!", es: 'worth to try y difficulty to write: mal.' } },
  ],
  onlyTags: true,
  zone: 'patio-futuro',
  look: { shirt: '#14161c', hair: '#0a0b0f', skin: '#2a2d36' },
  before: [
    { text: '(G\'s shadow stands up on its own. It grows tall and grabs the card.)', es: '(La sombra de G se levanta sola. Crece y agarra la tarjeta.)' },
    { text: 'WHY BOTHER? HE WILL NEVER UNDERSTAND. TEAR IT UP.', es: '¿PARA QUÉ? NUNCA VA A ENTENDER. RÓMPELA.' },
  ],
  after: [{ text: '(The shadow lets go of the card and melts into the ground.)', es: '(La sombra suelta la tarjeta y se derrite en el suelo.)' }],
  freed: { text: '(The card falls on the bench, in one piece.)', es: '(La tarjeta cae sobre la banca, entera.)' },
  farewell: {
    q: 'Second Thoughts (fading): "Maybe… there\'s no point…"',
    options: ["It's worth trying one last time.", "It's worth to try one last time.", "It's worth try one last time."],
    answer: 0,
    tip: "it's worth + -ing.",
  },
}

export const B2_10_ENEMIES: Record<string, EnemyDef> = {
  [B2_10_BLOT1]: BLOT(B2_10_BLOT1, { text: "Despite of the rain, you came? There's no point to stay!", es: 'despite of y no point to stay: mal.' }),
  [B2_10_BLOT2]: BLOT(B2_10_BLOT2, { text: "I'm tired to wait! I'm afraid to failing!", es: 'tired to wait y afraid to failing: mal.' }),
  [B2_10_BOSS]: B2_10_BOSS_DEF,
}

// ── Bloque 3 ──

/** El cierre: G se va hacia el puerto viejo con el regalo; fundido azul y vuelta al presente */
export const B2_10_CLOSE_SCRIPT: ScriptLine[] = [
  { who: 'narrator', text: '(G picks up the card from the bench. It is in one piece. He smiles for the first time.)', es: '(G recoge la tarjeta de la banca. Está entera. Sonríe por primera vez.)' },
  { who: 'narrator', text: '(He puts the gift under his coat and walks slowly towards the old port. He doesn\'t look back.)', es: '(Guarda el regalo bajo el abrigo y camina despacio hacia el puerto viejo. No mira atrás.)' },
  { who: 'L', fx: 'unheard', text: 'Wait! Why do you know Leo?', es: 'Intentas decir: "¡Espera! ¿Por qué conoces a Leo?"' },
  { who: 'narrator', text: '(The blue light grows around you. The school and the patio fade.)', es: '(La luz azul crece a tu alrededor. La escuela y el patio se desvanecen.)' },
  { who: 'narrator', text: '(Back in your notebook, you write: "The man in the park on Leo\'s birthday… it was G. Why would he know Leo?")', es: '(De vuelta en tu cuaderno, escribes: "El hombre del parque en el cumpleaños de Leo… era G. ¿Por qué conocería a Leo?".)' },
]

/** Pistas de las Ventanas para Mochila › Recuerdos y Ventanas (components/MemoriesTab.tsx). Se ven al cerrar la misión */
export const B2_WINDOW_CLUES: { flag: string; year: number; title: string; text: string; es: string }[] = [
  {
    flag: B2_10_CLOSE,
    year: 2056,
    title: 'La tarjeta de G',
    text: 'Happy birthday, Leo. Be brave. Use your voice. — G',
    es: 'G la escribió en el patio de una escuela y la pegó en un regalo. Es la misma tarjeta que Leo abrió en el parque en su cumpleaños.',
  },
]
