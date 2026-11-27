import type { EnemyDef, GameState, SceneDef, Zone } from '../game/types'
import type { DebateTurn, DebateEndings } from '../components/DebateTalk'
import type { FinePrintContent } from '../components/FinePrint'
import type { FactCheckContent } from '../components/FactCheck'
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
 * Bloque 2: tras preparar la entrevista, Amara: entrevista (b2-02-interview, DebateTalk) → tras la lección de Priya,
 *   Priya: Style Guide (b2-02-styleguide, The Fine Print con sellos STYLE OK / FIX IT) → tras las dos lecciones de Manuel,
 *   Viktor: Fact Check versión fácil (b2-02-factcheck; say / tell / ask + objeto + to) → Viktor desaparece (se corrompe) →
 *   dos practicantes agotados (esbirros) → el jefe The Deadline (2 fases), en el escritorio de Viktor.
 * Bloque 3: Viktor vuelve a la normalidad (b2-02-viktor-back, script) → Manuel: el cierre (b2-02-close): recupera los temas y
 *   le asigna al protagonista los apagones del puerto; Explore muestra FragmentJoin (dos fragmentos → primer segmento del núcleo,
 *   B2_02_FRAGMENTS) y se abre la Ventana 3. Credencial de prensa (regalo de The Deadline). Diario: data/b2Diary.ts.
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
/** Bloque 2 */
export const B2_02_INTERVIEW = 'b2-02-interview'
export const B2_02_STYLEGUIDE = 'b2-02-styleguide'
export const B2_02_FACTCHECK = 'b2-02-factcheck'
export const B2_02_INTERN1 = 'b2-02-intern1'
export const B2_02_INTERN2 = 'b2-02-intern2'
export const B2_02_BOSS = 'b2-02-boss'
/** Bloque 3 */
export const B2_02_VIKTOR_BACK = 'b2-02-viktor-back'
export const B2_02_CLOSE = 'b2-02-close'
/** Se guarda al terminar la animación de los dos fragmentos (primer segmento del núcleo) */
export const B2_02_FRAGMENTS = 'b2-02-fragments'
/** Mensaje de la primera vez que se llena un segmento (ficha 0.4) */
export const B2_FIRST_SEGMENT = { en: 'The core remembers something… but this time, you can go there.', es: 'El núcleo recuerda algo… pero esta vez, puedes ir allí.' }

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
    // Bloque 2: los practicantes agotados y The Deadline (Viktor corrompido, en su escritorio)
    { type: 'enemy', id: B2_02_INTERN1, x: 2, y: 5, after: B2_02_FACTCHECK },
    { type: 'enemy', id: B2_02_INTERN2, x: 6, y: 5, after: B2_02_INTERN1 },
    { type: 'enemy', id: B2_02_BOSS, x: 8, y: 5, after: B2_02_INTERN2 },
    // Bloque 3: Viktor, ya normal, junto a su escritorio (aparece al vencer a The Deadline)
    { type: 'npc', id: B2_02_VIKTOR_BACK, x: 9, y: 5 },
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
    { label: 'Entrevista con Amara', done: s.opened.includes(B2_02_INTERVIEW) },
    { label: 'La guía de estilo (Priya)', done: s.opened.includes(B2_02_STYLE) },
    { label: 'Style Guide', done: s.opened.includes(B2_02_STYLEGUIDE) },
    { label: 'Frases de reunión', done: s.opened.includes(B2_02_MEETING) },
    { label: 'Verbo + to / -ing', done: s.opened.includes(B2_02_PATTERNS) },
    { label: 'Fact Check', done: s.opened.includes(B2_02_FACTCHECK) },
    { label: 'Practicantes agotados (2)', done: s.defeated.includes(B2_02_INTERN2) },
    { label: 'The Deadline', done: s.defeated.includes(B2_02_BOSS) },
    { label: 'Viktor vuelve', done: s.opened.includes(B2_02_VIKTOR_BACK) },
    { label: 'El cierre (Manuel)', done: s.opened.includes(B2_02_CLOSE) },
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

// ── Bloque 2 ──

/** Entrevista con Amara (DebateTalk): preguntas de B2. No hay respuesta mala que bloquee; todos los desenlaces dan la práctica */
export const B2_02_INTERVIEW_TURNS: DebateTurn[] = [
  {
    text: 'So, tell me about yourself. What had you been doing before you came to the Herald?',
    es: 'Cuéntame de ti. ¿Qué habías estado haciendo antes de venir al Herald?',
    options: [
      { en: 'I had been volunteering at Lumen Paws for months. I learned to deal with stressful situations.', es: 'Llevaba meses de voluntariado en Lumen Paws. Aprendí a lidiar con situaciones estresantes.', value: 'good', reply: { text: 'Lumen Paws! Dogs and deadlines have a lot in common.', es: '¡Lumen Paws! Los perros y los plazos tienen mucho en común.' } },
      { en: 'I was a student. Nothing special.', es: 'Era estudiante. Nada especial.', value: 'neutral', reply: { text: "Everyone is \"nothing special\" until they tell me more.", es: 'Todos son "nada especial" hasta que me cuentan más.' } },
      { en: 'I had been volunteer at a shelter.', es: '(Le falta el -ing: had been volunteering.)', value: 'bad', reply: { text: 'Had been… volunteering, you mean? Go on.', es: '¿Llevabas… haciendo voluntariado, quieres decir? Sigue.' } },
    ],
  },
  {
    text: 'Tell me about a time you had to deal with pressure.',
    es: 'Cuéntame de una vez que tuviste que lidiar con presión.',
    options: [
      { en: 'Last month the harbour lights went out. I stayed calm and helped my friends. I work well under pressure.', es: 'El mes pasado se apagaron las luces del puerto. Me mantuve en calma y ayudé a mis amigos. Trabajo bien bajo presión.', value: 'good', reply: { text: 'Calm in the dark. I like that.', es: 'En calma en la oscuridad. Eso me gusta.' } },
      { en: 'I overcame with a lot of problems.', es: '(overcome no lleva with.)', value: 'bad', reply: { text: "You overcame problems. Without \"with\". Noted.", es: 'Superaste problemas. Sin "with". Anotado.' } },
      { en: "I don't really like pressure.", es: 'No me gusta mucho la presión.', value: 'neutral', reply: { text: 'Honest. Nobody likes it. But here we live with it.', es: '{h:Sincero|Sincera}. A nadie le gusta. Pero aquí vivimos con ella.' } },
    ],
  },
  {
    text: 'What is your biggest strength?',
    es: '¿Cuál es tu mayor fortaleza?',
    options: [
      { en: "I'm reliable and I have good attention to detail. I always check my sources.", es: 'Soy confiable y tengo buena atención al detalle. Siempre reviso mis fuentes.', value: 'good', reply: { text: 'Checking sources. Music to an editor\'s ears.', es: 'Revisar fuentes. Música para los oídos de una editora.' } },
      { en: "I'm adaptable. I can change when things change.", es: 'Soy adaptable. Puedo cambiar cuando las cosas cambian.', value: 'good', reply: { text: 'Good. In a newsroom, everything changes by noon.', es: 'Bien. En una redacción, todo cambia antes del mediodía.' } },
      { en: 'I am very reliability.', es: '(reliability es el sustantivo; el adjetivo es reliable.)', value: 'bad', reply: { text: 'Reliable, you mean. Small details matter here.', es: 'Reliable, quieres decir. Aquí los detalles pequeños importan.' } },
    ],
  },
  {
    text: 'Last question. Why do you want to work at the Herald?',
    es: 'Última pregunta. ¿Por qué quieres trabajar en el Herald?',
    options: [
      { en: 'People in Lumen Bay have been losing their voices at the port. I want to find out why.', es: 'La gente de Lumen Bay ha estado perdiendo la voz en el puerto. Quiero averiguar por qué.', value: 'good', reply: { text: 'The blackouts. Nobody has explained them yet.', es: 'Los apagones. Nadie los ha explicado todavía.' } },
      { en: 'I need the money.', es: 'Necesito el dinero.', value: 'neutral', reply: { text: "It's an internship. There isn't much money, I'm afraid.", es: 'Es una práctica. Me temo que no hay mucho dinero.' } },
      { en: 'Manuel wanted that I come.', es: '(want no lleva that: Manuel wanted me to come.)', value: 'bad', reply: { text: 'Manuel wanted you to come. Yes, he told me.', es: 'Manuel quería que vinieras. Sí, me lo dijo.' } },
    ],
  },
]
export const B2_02_INTERVIEW_ENDINGS: DebateEndings = {
  high: { text: "Amara smiles. \"You start today. Welcome to the Herald.\"", es: 'Amara sonríe. "Empiezas hoy. {h:Bienvenido|Bienvenida} al Herald."' },
  mid: { text: 'Amara nods. "Let\'s try. You start today."', es: 'Amara asiente. "Probemos. Empiezas hoy."' },
  low: { text: 'Amara taps her pen. "Manuel trusts you. That\'s enough for now. You start today."', es: 'Amara golpea el bolígrafo. "Manuel confía en ti. Por ahora basta. Empiezas hoy."' },
}

/** Style Guide (Priya; The Fine Print con dos sellos): ¿la frase cumple la guía del Herald? */
export const B2_02_STYLE_GUIDE: FinePrintContent = {
  title: 'Style Guide',
  intro: { en: 'Read each line of the draft. Does it follow the style guide?', es: 'Lee cada línea del borrador. ¿Cumple la guía de estilo?' },
  paper: { heading: 'HERALD STYLE GUIDE', sub: 'The Lumen Bay Herald · Drafts' },
  seal: 'HERALD',
  stamps: ['follows', 'breaks'],
  clauses: [
    { en: 'Two firefighters arrived at the port in ten minutes.', es: 'Dos bomberos llegaron al puerto en diez minutos.', kind: 'follows', tip: 'firefighters es la palabra neutra.' },
    { en: 'A policeman closed the road to the docks.', es: 'Un policía cerró la calle a los muelles.', kind: 'breaks', tip: 'La guía pide police officer, no policeman.' },
    { en: 'A witness called the Herald. They said the lights went out at nine.', es: 'Un testigo llamó al Herald. Dijo que las luces se apagaron a las nueve.', kind: 'follows', tip: 'Género desconocido → singular they.' },
    { en: 'Every reader should check his facts.', es: 'Todo lector debería revisar sus datos.', kind: 'breaks', tip: 'No supongas el género: their facts.' },
    { en: 'The chairman of the port committee did not answer.', es: 'El presidente del comité del puerto no respondió.', kind: 'breaks', tip: 'La guía pide chairperson o chair.' },
    { en: 'A doctor at the hospital treated three people.', es: 'Una médica del hospital atendió a tres personas.', kind: 'follows', tip: 'Solo "a doctor": sin "female" ni "male".' },
    { en: 'A female engineer repaired the harbour lights.', es: 'Una ingeniera mujer reparó las luces del puerto.', kind: 'breaks', tip: 'Estereotipo: no escribas "female" si nunca escribirías "male engineer".' },
  ],
  finish: { en: 'Clean copy! Amara will be happy.', es: '¡Texto limpio! Amara estará contenta.' },
}

/** Fact Check, versión fácil (Viktor): los apagones de voz del puerto, solo say / tell / ask + objeto + to */
export const B2_02_FACT_CHECK: FactCheckContent = {
  title: 'Fact Check · The Lumen Bay Herald',
  intro: {
    en: 'Viktor gives you six drafts about the voice blackouts. Is each draft faithful to what the witness said? If not, choose the correct version.',
    es: 'Viktor te da seis borradores sobre los apagones de voz. ¿Cada borrador es fiel a lo que dijo el testigo? Si no lo es, elige la versión correcta.',
  },
  rounds: [
    {
      speaker: { en: 'A fisherman', es: 'Un pescador' },
      quote: 'Call the police!',
      quoteEs: '¡Llamen a la policía!',
      draft: 'He told us call the police.',
      faithful: false,
      options: ['He told us to call the police.', 'He said us to call the police.', 'He told to us call the police.'],
      answer: 0,
      tip: 'tell + objeto + to: He told us to call the police.',
    },
    {
      speaker: { en: 'A nurse', es: 'Una enfermera' },
      quote: 'Please wait outside.',
      quoteEs: 'Por favor, esperen afuera.',
      draft: 'She asked us to wait outside.',
      faithful: true,
      tip: 'Una petición con please → ask + objeto + to.',
    },
    {
      speaker: { en: 'A boy on the docks', es: 'Un niño en los muelles' },
      quote: 'I heard nothing.',
      quoteEs: 'No oí nada.',
      draft: 'He said he had heard everything.',
      faithful: false,
      options: ['He said he had heard nothing.', 'He told he had heard nothing.', 'He said me he had heard nothing.'],
      answer: 0,
      tip: 'Dijo "nothing", no "everything". Y say no lleva objeto: He said he had heard nothing.',
    },
    {
      speaker: { en: 'The harbour captain', es: 'La capitana del puerto' },
      quote: "Don't go near the water.",
      quoteEs: 'No se acerquen al agua.',
      draft: 'She told us not to go near the water.',
      faithful: true,
      tip: 'Una orden negativa → tell + objeto + not to.',
    },
    {
      speaker: { en: 'A shop owner', es: 'Un comerciante' },
      quote: 'Can you help me close the shop?',
      quoteEs: '¿Me ayudas a cerrar la tienda?',
      draft: 'He asked me helping him close the shop.',
      faithful: false,
      options: ['He asked me help him close the shop.', 'He asked me to help him close the shop.', 'He said me to help him close the shop.'],
      answer: 1,
      tip: 'ask + objeto + to: He asked me to help him.',
    },
    {
      speaker: { en: 'A tourist', es: 'Una turista' },
      quote: 'Everyone stopped talking at the same time.',
      quoteEs: 'Todos dejaron de hablar al mismo tiempo.',
      draft: 'She said that everyone had stopped talking at the same time.',
      faithful: true,
      tip: 'say + that: el pasado pasa a past perfect (had stopped).',
    },
  ],
}

const PP = 'ppc-b2' as const
const IV = 'interview-b2' as const
const IN = 'inclusive-b2' as const
const MT = 'meetings-b2' as const
const VP = 'verb-to-ing-b2' as const
const KINDS: EnemyDef['kinds'] = ['fill', 'fix']
const INTERN_LOOK = { shirt: '#6b7080', hair: '#3a2f28', skin: '#b8a898' }

/** Practicantes agotados, corrompidos. Preguntas: etiqueta b2-02-intern */
const INTERN = (id: string, line: { text: string; es: string }): EnemyDef => ({
  id,
  name: 'Exhausted Intern',
  person: 'Exhausted Intern',
  kind: 'minion',
  hp: 4,
  topics: [PP, VP, IN],
  kinds: KINDS,
  tags: ['b2-02-intern'],
  onlyTags: true,
  zone: 'oficina',
  look: INTERN_LOOK,
  before: [line],
  after: [{ text: '(The intern blinks, yawns and sits down.) Coffee… I need coffee.', es: '(El practicante parpadea, bosteza y se sienta.) Café… Necesito café.' }],
  freed: { text: 'Thanks. I had been working for fourteen hours.', es: 'Gracias. Llevaba catorce horas trabajando.' },
})

/**
 * The Deadline: Viktor, corrompido por un fragmento. Su cabeza es un reloj de pared que acelera. Jefe de 2 fases.
 * Fase 1: past perfect continuous y lenguaje de entrevista (b2-02-boss-pp) · Fase 2: verbo + objeto + to, cambio de significado
 * y frases de reunión, con la escucha de la reunión (b2-02-boss-vp). En el bloque 3 suelta dos fragmentos (primer segmento del núcleo).
 */
export const B2_02_BOSS_DEF: EnemyDef = {
  id: B2_02_BOSS,
  name: 'The Deadline',
  person: 'The Deadline',
  kind: 'boss',
  reward: 'credencial-prensa',
  hp: 10,
  topics: [PP, IV, VP, MT],
  kinds: ['fill', 'fix', 'order', 'listen'],
  tags: ['b2-02-boss-pp'],
  phases: [
    { hp: 5, title: 'Tic, tac: la experiencia', topics: [PP, IV], kinds: ['fill', 'fix', 'order'], tags: ['b2-02-boss-pp'], line: { text: 'By the time you arrived, they had been finish the article! Too late, too late!', es: 'had been finish: mal (had finished).' } },
    { hp: 5, title: 'Tic, tac: la reunión', topics: [VP, MT], kinds: ['fill', 'fix', 'listen'], tags: ['b2-02-boss-vp'], line: { text: 'I made you to rewrite it! Could you repeat me that? No time!', es: 'made you to rewrite y repeat me that: mal.' } },
  ],
  onlyTags: true,
  zone: 'oficina',
  look: { shirt: '#4a5568', hair: '#c9c9c9', skin: '#e8c4a0' },
  before: [{ text: 'Tick. Tock. The page closes at six. I had been waiting for you… and you are LATE.', es: 'Tic. Tac. La página cierra a las seis. Te había estado esperando… y llegas TARDE.' }],
  after: [{ text: '(The clock slows down… and stops. Viktor falls into his chair.)', es: '(El reloj va más despacio… y se detiene. Viktor cae en su silla.)' }],
  freed: { text: '(Two small pieces of light float above the desk.)', es: '(Dos pedacitos de luz flotan sobre el escritorio.)' },
  farewell: {
    q: 'Viktor (tired): "What happened? Did I ask you to stay late?"',
    options: ['No. You told us to finish before six.', 'No. You told us finish before six.', 'No. You said us to finish before six.'],
    answer: 0,
    tip: 'tell + objeto + to: You told us to finish.',
  },
}

export const B2_02_ENEMIES: Record<string, EnemyDef> = {
  [B2_02_INTERN1]: INTERN(B2_02_INTERN1, { text: 'I had been work here for a year… and I want that you check it!', es: 'had been work y want that you check: mal.' }),
  [B2_02_INTERN2]: INTERN(B2_02_INTERN2, { text: 'She suggested me to call him. Every intern does his job… Tick, tock…', es: 'suggested me to call y every intern… his: mal.' }),
  [B2_02_BOSS]: B2_02_BOSS_DEF,
}

/** Viktor vuelve a la normalidad (MemoryScript), después de vencer a The Deadline */
export const B2_02_VIKTOR_BACK_SCRIPT: ScriptLine[] = [
  { who: 'narrator', text: '(Viktor rubs his eyes. The wall clock is just a clock again.)', es: '(Viktor se frota los ojos. El reloj de pared vuelve a ser solo un reloj.)' },
  { who: 'narrator', text: "Viktor: I'm sorry. I had been working without a break for days. I don't remember much.", es: 'Viktor: Lo siento. Llevaba días trabajando sin descanso. No recuerdo mucho.' },
  { who: 'narrator', text: 'Viktor: I found a strange piece of glass at the port last week. I put it on my desk… and then everything went fast.', es: 'Viktor: La semana pasada encontré un trozo de vidrio extraño en el puerto. Lo puse en mi escritorio… y después todo se aceleró.' },
  { who: 'narrator', text: 'Viktor: Remember to take breaks, intern. I clearly forgot to.', es: 'Viktor: Acuérdate de tomar descansos, practicante. Yo claramente lo olvidé.' },
]
