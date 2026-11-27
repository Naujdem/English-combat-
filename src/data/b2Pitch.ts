import type { EnemyDef, GameState, SceneDef, Zone } from '../game/types'
import type { FinePrintContent } from '../components/FinePrint'
import type { ScriptLine } from './b1Accident'
import type { TextCommandRoom } from '../components/TextCommand'

/**
 * B2-08 · Pitch (Ventana, 2064). G ya robó el prototipo (recuerdo 7 de B1) y Vocalis lanza la versión comercial, "Vocalis Restore".
 * Las oficinas de marketing de Vocalis, la sala de reuniones y el escenario del lanzamiento. Nadie oye al protagonista.
 * Guía: lo que hay en el lugar (las pantallas, la propuesta de campaña, la encuesta de mercado; ficha 8).
 * Bloque 1: las pantallas con el eslogan (b2-08-arrival, script) → la propuesta de campaña: lección 'compare-b2' + práctica
 *   (b2-08-compare) → la encuesta de mercado: lección 'uncount-b2' + práctica (b2-08-survey) → Unheard en la oficina
 *   (b2-08-unheard, 3 metas: abrir la carpeta de la campaña, imprimir la letra pequeña, dejarle una nota a Mensah).
 *   Al terminar se abre la puerta de la sala de reuniones (bloque 2).
 * Bloque 2: el manual del empleado: lección 'perks-b2' + práctica (b2-08-perks) → los correos de Chloe: lección 'acronyms-b2'
 *   + práctica (b2-08-acronyms) → The Fine Print con el contrato de Restore (b2-08-fineprint; abre el salón del lanzamiento)
 *   → el lanzamiento (b2-08-launch, script: G con capucha entre el público) → dos Promo Bots (esbirros) → el jefe The Salesman (2 fases).
 */
export const B2_08_VOCALIS_ID = 'b2-08-vocalis'
export const B2_08_SLOGAN = 'b2-08-slogan'
export const B2_08_PROPOSAL = 'b2-08-proposal'
export const B2_08_SURVEY_NPC = 'b2-08-survey-npc'
export const B2_08_DESK = 'b2-08-desk'
/** Tareas (marcas en `opened`) */
export const B2_08_ARRIVAL = 'b2-08-arrival'
export const B2_08_COMPARE = 'b2-08-compare'
export const B2_08_SURVEY = 'b2-08-survey'
export const B2_08_UNHEARD = 'b2-08-unheard'
/** Bloque 2 */
export const B2_08_MANUAL = 'b2-08-manual'
export const B2_08_LAPTOP = 'b2-08-laptop'
export const B2_08_CONTRACT = 'b2-08-contract'
export const B2_08_CHLOE = 'b2-08-chloe'
export const B2_08_MENSAH = 'b2-08-mensah'
export const B2_08_PODIUM = 'b2-08-podium'
export const B2_08_PERKS = 'b2-08-perks'
export const B2_08_ACRONYMS = 'b2-08-acronyms'
/** The Fine Print (abre el salón del lanzamiento) */
export const B2_08_FINEPRINT = 'b2-08-fineprint'
export const B2_08_LAUNCH = 'b2-08-launch'
export const B2_08_BOT1 = 'b2-08-bot1'
export const B2_08_BOT2 = 'b2-08-bot2'
export const B2_08_BOSS = 'b2-08-boss'

/**
 * Leyenda: # pared · i pantalla en la pared · q pared de vidrio · d puerta · M escritorio · K mesa de reuniones
 * C borde del escenario · O asiento · p planta.
 * Arriba a la izquierda las oficinas de marketing; a la derecha la sala de reuniones; abajo el salón del lanzamiento.
 */
const MAP = [
  '#i#i##i#iiii#i##',
  '#.....q........#',
  '#.M.M.q..KKK...#',
  '#.....d..KKK...#',
  '#.M.M.q........#',
  '#p....q.O.O.O.p#',
  '###d#######d####',
  '#..............#',
  '#..CCCCCCCCC...#',
  '#..............#',
  '#O.O.O.O.O.O.O.#',
  '################',
]

function zoneAt(x: number, y: number): Zone {
  if (y <= 5) return x <= 5 ? 'lobby-torre' : 'oficina-torre'
  return 'sala-torre'
}

export const B2_08_VOCALIS: SceneDef = {
  id: B2_08_VOCALIS_ID,
  name: 'Ventana 2064 · Las oficinas de Vocalis',
  topics: [],
  map: MAP,
  start: { x: 3, y: 3 },
  // Sin jefe en este bloque: la puerta del jefe apunta a un muro y no hace falta ninguna llave
  bossDoor: { x: 0, y: 0 },
  keysNeeded: 0,
  entities: [
    { type: 'npc', id: B2_08_SLOGAN, x: 3, y: 1 },
    { type: 'npc', id: B2_08_PROPOSAL, x: 5, y: 2 },
    { type: 'npc', id: B2_08_SURVEY_NPC, x: 1, y: 4 },
    { type: 'npc', id: B2_08_DESK, x: 5, y: 4 },
    // Bloque 2: la sala de reuniones (manual, correos, contrato, Chloe y Mensah) y el salón del lanzamiento
    { type: 'npc', id: B2_08_MANUAL, x: 13, y: 1 },
    { type: 'npc', id: B2_08_LAPTOP, x: 12, y: 3 },
    { type: 'npc', id: B2_08_CONTRACT, x: 8, y: 2 },
    { type: 'npc', id: B2_08_CHLOE, x: 13, y: 4 },
    { type: 'npc', id: B2_08_MENSAH, x: 8, y: 4 },
    { type: 'npc', id: B2_08_PODIUM, x: 7, y: 7 },
    { type: 'enemy', id: B2_08_BOT1, x: 2, y: 9, after: B2_08_LAUNCH },
    { type: 'enemy', id: B2_08_BOT2, x: 13, y: 9, after: B2_08_BOT1 },
    { type: 'enemy', id: B2_08_BOSS, x: 8, y: 9, after: B2_08_BOT2 },
  ],
  labels: [
    { text: 'Marketing', x: 3, y: 5 },
    { text: 'Sala de reuniones', x: 11, y: 4 },
    { text: 'Lanzamiento', x: 8, y: 9 },
  ],
  zoneAt,
  examine: {
    '2,2': { text: 'A desk full of coffee cups and sticky notes: "Launch day!!!"', sub: 'Un escritorio lleno de tazas de café y notas adhesivas: "¡¡¡Día del lanzamiento!!!".', say: 'Launch day!' },
    '4,2': { text: 'A poster on the screen: "Vocalis Restore — get your voice back."', sub: 'Un afiche en la pantalla: "Vocalis Restore — recupera tu voz".', say: 'Get your voice back.' },
    '2,4': { text: 'A name plate: "Chloe Martin — Head of Marketing".', sub: 'Una placa con un nombre: "Chloe Martin — Jefa de Marketing".', say: 'Chloe Martin, Head of Marketing.' },
    '4,4': { text: 'A name plate: "Dr. Kwame Mensah — Medical Advisor". The chair is empty.', sub: 'Una placa con un nombre: "Dr. Kwame Mensah — Asesor médico". La silla está vacía.', say: 'Doctor Kwame Mensah.' },
    '10,2': { text: 'Coffee, croissants and a pile of "Vocalis Restore" T-shirts.', sub: 'Café, croissants y una pila de camisetas de "Vocalis Restore".', say: 'Coffee and croissants.' },
    '10,3': { text: 'A printed agenda: "1. Slogan 2. Influencers 3. Launch — ASAP".', sub: 'Una agenda impresa: "1. Eslogan 2. Influencers 3. Lanzamiento — lo antes posible".', say: 'Launch as soon as possible.' },
    '5,8': { text: 'The edge of the stage. Blue lights and a giant screen: "RESTORE".', sub: 'El borde del escenario. Luces azules y una pantalla gigante: "RESTORE".', say: 'Restore.' },
    '1,10': { text: 'An empty seat. Somebody left a programme: "Launch — 11:00".', sub: 'Un asiento vacío. Alguien dejó un programa: "Lanzamiento — 11:00".', say: 'Launch at eleven.' },
  },
  // La sala de reuniones se abre después de Unheard; el salón del lanzamiento, después de The Fine Print (bloque 2)
  locked: (x, y, s) =>
    x === 6 && y === 3 && !s.opened.includes(B2_08_UNHEARD)
      ? { text: 'The meeting room is closed. A screen says "Campaign meeting — 10:00".', sub: 'Todavía no. Primero mira lo que hay en las oficinas.' }
      : ((x === 3 && y === 6) || (x === 11 && y === 6)) && !s.opened.includes(B2_08_FINEPRINT)
        ? { text: 'The launch hall is closed. "Doors open at 11:00."', sub: 'Todavía no. El lanzamiento todavía no empieza.' }
        : null,
  links: {},
  requirements: [],
  chips: (s: GameState) => [
    { label: 'Las pantallas de Vocalis', done: s.opened.includes(B2_08_ARRIVAL) },
    { label: 'La propuesta: comparaciones precisas', done: s.opened.includes(B2_08_COMPARE) },
    { label: 'La encuesta: incontables', done: s.opened.includes(B2_08_SURVEY) },
    { label: 'Unheard en la oficina', done: s.opened.includes(B2_08_UNHEARD) },
    { label: 'El manual: beneficios', done: s.opened.includes(B2_08_PERKS) },
    { label: 'Los correos: acrónimos', done: s.opened.includes(B2_08_ACRONYMS) },
    { label: 'The Fine Print', done: s.opened.includes(B2_08_FINEPRINT) },
    { label: 'El lanzamiento', done: s.opened.includes(B2_08_LAUNCH) },
    { label: 'Promo Bots (2)', done: s.defeated.includes(B2_08_BOT2) },
    { label: 'The Salesman', done: s.defeated.includes(B2_08_BOSS) },
  ],
  intro: {
    first: '2064. The Vocalis offices, launch day. — 2064. Las oficinas de Vocalis, el día del lanzamiento. Aquí nadie te oye.',
    later: () => 'The Vocalis offices, 2064. Nobody can hear you. — Las oficinas de Vocalis, 2064. Nadie te oye.',
  },
}

/** Las pantallas de la oficina: entrada a la Ventana (sin voz) */
export const B2_08_ARRIVAL_SCRIPT: ScriptLine[] = [
  { who: 'narrator', text: '(A blue flash. A sign in the air: 2064. An open office with big screens. Everybody is running.)', es: '(Un destello azul. Un letrero en el aire: 2064. Una oficina abierta con pantallas grandes. Todo el mundo corre.)' },
  { who: 'narrator', text: '(On every screen, the same slogan: "Vocalis Restore. Get your voice back. Far easier than you think.")', es: '(En todas las pantallas, el mismo eslogan: "Vocalis Restore. Recupera tu voz. Mucho más fácil de lo que crees".)' },
  { who: 'narrator', text: '(Two years after the lab. Somebody stole the first prototype… but Vocalis didn\'t stop. Now they want to sell it.)', es: '(Dos años después del laboratorio. Alguien robó el primer prototipo… pero Vocalis no paró. Ahora lo quiere vender.)' },
  { who: 'L', fx: 'unheard', text: 'Excuse me, what is this?', es: 'Intentas decir: "Disculpe, ¿qué es esto?"' },
  { who: 'narrator', text: '(A woman with a headset walks through you: "Launch at eleven, people! ASAP!" Nobody can hear you.)', es: '(Una mujer con audífonos pasa sin verte: "¡El lanzamiento es a las once, gente! ¡Lo antes posible!". Nadie te oye.)' },
  { who: 'narrator', text: '(On a desk there is a campaign proposal. Maybe it says what they are hiding.)', es: '(Sobre un escritorio hay una propuesta de campaña. Quizá dice lo que están escondiendo.)' },
]

/** Unheard en la oficina de marketing (ficha 8): 3 metas sin voz. Con 0-1 errores, escudo */
export const B2_08_UNHEARD_ROOM: TextCommandRoom = {
  mode: 'text',
  title: 'Unheard · The Marketing Office',
  intro: {
    en: 'The marketing office is empty for a minute. Nobody can hear you. Write what you do.',
    es: 'La oficina de marketing se queda vacía un minuto. Nadie te oye. Escribe lo que haces.',
  },
  scene: 'room',
  objects: ['folder', 'printer', 'note'],
  steps: [
    {
      problem: { en: 'On Chloe\'s desk there is a blue folder: "Restore — campaign". It is closed.', es: 'En el escritorio de Chloe hay una carpeta azul: "Restore — campaña". Está cerrada.' },
      accept: [{ verb: 'open', object: 'folder', optional: ['campaign', 'blue'] }],
      target: 'folder',
      done: { en: 'The folder opens. Slogans, photos of happy people… and the contract. The last page is in very small letters.', es: 'La carpeta se abre. Eslóganes, fotos de gente feliz… y el contrato. La última página tiene letras muy pequeñas.' },
      tip: 'Hay que abrir la carpeta: Open the campaign folder.',
      fails: { read: { en: 'You can\'t read it. The folder is closed.', es: 'No puedes leerla. La carpeta está cerrada.' } },
      verbPool: ['read', 'close', 'push', 'take'],
    },
    {
      problem: {
        en: 'The small letters are hard to read. The printer next to the desk makes everything bigger. Print the last page.',
        es: 'Las letras pequeñas casi no se leen. La impresora junto al escritorio lo agranda todo. Imprime la última página.',
      },
      accept: [{ verb: 'print', object: 'printer', optional: ['out'] }],
      target: 'printer',
      done: { en: 'The printer hums. The fine print comes out in big letters: "A compatible donor voice is required."', es: 'La impresora zumba. La letra pequeña sale en letras grandes: "Se requiere una voz donante compatible".' },
      tip: 'La letra pequeña se llama "fine print": Print the fine print.',
      fails: { read: { en: 'The letters are too small. You need them bigger.', es: 'Las letras son demasiado pequeñas. Las necesitas más grandes.' } },
      verbPool: ['read', 'open', 'push', 'close'],
    },
    {
      problem: {
        en: 'Dr. Mensah will sit at the next desk. Nobody can hear you… but he can read. Write a note for him: he must read the small print out loud at the meeting.',
        es: 'El Dr. Mensah se va a sentar en el escritorio de al lado. Nadie te oye… pero él sí puede leer. Escríbele una nota: que lea en voz alta la letra pequeña en la reunión.',
      },
      accept: [{ verb: 'read', object: 'note', optional: ['aloud', 'out loud'] }],
      target: 'note',
      done: { en: 'You stick the note on his screen, next to the printed page: "Read the small print aloud."', es: 'Pegas la nota en su pantalla, junto a la hoja impresa: "Lee la letra pequeña en voz alta".' },
      tip: 'La nota dice qué leer: Read the small print aloud.',
      fails: {
        print: { en: 'It is already printed. Now somebody has to read it.', es: 'Ya está impresa. Ahora alguien tiene que leerla.' },
        write: { en: 'Write only the instruction for him: what must he do with the small print?', es: 'Escribe solo la instrucción para él: ¿qué debe hacer con la letra pequeña?' },
      },
      verbPool: ['print', 'open', 'close', 'write'],
    },
  ],
  finish: { en: 'Nobody heard you… but the note is there.', es: 'Nadie te oyó… pero la nota está ahí.', banner: 'Unheard completado' },
}

// ── Bloque 2 ──

/** The Fine Print (reutilizado de B1-04): el contrato de Restore. Se marca lo que sale en la publicidad y lo que esconde */
export const B2_08_FINE_PRINT: FinePrintContent = {
  title: 'The Fine Print',
  intro: { en: 'Read the contract. What do the ads say? What do they hide?', es: 'Lee el contrato. ¿Qué dice la publicidad? ¿Qué esconde?' },
  paper: { heading: 'Vocalis Restore — Terms and Conditions', sub: 'Please read carefully before signing.' },
  stamps: ['advertised', 'hidden'],
  seal: 'VOCALIS',
  clauses: [
    { en: 'Restore works twice as fast as traditional therapy.', es: 'Restore funciona el doble de rápido que la terapia tradicional.', kind: 'advertised', tip: 'Es justo lo que dicen las pantallas: sale en la publicidad.' },
    { en: 'A compatible donor voice is required.', es: 'Se requiere una voz donante compatible.', kind: 'hidden', tip: 'Es la frase que imprimiste. La publicidad no habla del donante.' },
    { en: 'The treatment takes only one session of two hours.', es: 'El tratamiento dura una sola sesión de dos horas.', kind: 'advertised', tip: 'Es rápido y fácil: eso sí lo venden.' },
    { en: 'The donor may lose their voice permanently.', es: 'El donante puede perder la voz para siempre.', kind: 'hidden', tip: 'Ningún anuncio diría eso: lo esconden.' },
    { en: 'Patients get free advice from our medical team.', es: 'Los pacientes reciben consejos gratis de nuestro equipo médico.', kind: 'advertised', tip: 'Un beneficio para el cliente: sale en la publicidad.' },
    { en: 'Vocalis is not responsible for any damage to the donor.', es: 'Vocalis no se hace responsable de ningún daño al donante.', kind: 'hidden', tip: 'Otra vez el donante: eso no lo muestran.' },
    { en: 'Restore is slightly more expensive than other treatments, but far more effective.', es: 'Restore es un poco más caro que otros tratamientos, pero mucho más eficaz.', kind: 'advertised', tip: 'Es la comparación de la propuesta de campaña.' },
    { en: 'No information about the donor will be given to the patient.', es: 'No se le dará al paciente ninguna información sobre el donante.', kind: 'hidden', tip: 'El paciente nunca sabe quién perdió la voz: está escondido.' },
  ],
  finish: { en: 'They sell the voice… and hide the donor.', es: 'Venden la voz… y esconden al donante.' },
}

/** El lanzamiento (ficha 8, paso 7): el portavoz holográfico presenta Restore. Al fondo, G con capucha. No se dice nada */
export const B2_08_LAUNCH_SCRIPT: ScriptLine[] = [
  { who: 'narrator', text: '(The launch hall is full. Blue lights, music, cameras. A hologram in a perfect suit appears on the stage.)', es: '(El salón del lanzamiento está lleno. Luces azules, música, cámaras. En el escenario aparece un holograma con un traje perfecto.)' },
  { who: 'narrator', text: '(The hologram smiles: "Ladies and gentlemen… Vocalis Restore! Far easier than you think. Twice as fast as therapy!")', es: '(El holograma sonríe: "Damas y caballeros… ¡Vocalis Restore! Mucho más fácil de lo que creen. ¡El doble de rápido que la terapia!".)' },
  { who: 'narrator', text: '(People clap. Nobody asks about the donor.)', es: '(La gente aplaude. Nadie pregunta por el donante.)' },
  { who: 'narrator', text: '(At the back of the hall, in the shadows, there is a figure with a hood. They are not clapping.)', es: '(Al fondo del salón, en la sombra, hay una figura con capucha. No aplaude.)' },
  { who: 'narrator', text: '(The figure slowly puts a hand on their throat… and disappears among the people.)', es: '(La figura se lleva despacio la mano a la garganta… y desaparece entre la gente.)' },
  { who: 'L', fx: 'unheard', text: 'Wait!', es: 'Intentas gritar: "¡Espera!"' },
  { who: 'narrator', text: '(Nobody hears you. On the stage, the hologram flickers. Its smile looks wrong now. Two promo robots turn towards you.)', es: '(Nadie te oye. En el escenario, el holograma parpadea. Ahora su sonrisa se ve rara. Dos robots promocionales se giran hacia ti.)' },
]

const CP = 'compare-b2' as const
const UN = 'uncount-b2' as const
const PK = 'perks-b2' as const
const AC = 'acronyms-b2' as const
const BOT_LOOK = { shirt: '#ffffff', hair: '#3fa9ff', skin: '#c9d2dc' }

/** Promo Bots, robots promocionales. Preguntas: etiqueta b2-08-bot */
const BOT = (id: string, line: { text: string; es: string }): EnemyDef => ({
  id,
  name: 'Promo Bot',
  person: 'Promo Bot',
  kind: 'minion',
  hp: 4,
  topics: [CP, UN],
  kinds: ['fill', 'fix'],
  tags: ['b2-08-bot'],
  onlyTags: true,
  zone: 'sala-torre',
  look: BOT_LOOK,
  before: [line],
  after: [{ text: '(The robot drops its flyers and stops.)', es: '(El robot suelta sus volantes y se detiene.)' }],
  freed: { text: '(The robot\'s screen goes blue: "Promotion paused.")', es: '(La pantalla del robot se pone azul: "Promoción en pausa".)' },
})

/**
 * The Salesman: el portavoz holográfico de la campaña, corrompido.
 * Fase 1: comparaciones precisas, con escucha de la presentación (b2-08-boss-cp) · Fase 2: incontables, beneficios y acrónimos (b2-08-boss-un).
 */
export const B2_08_BOSS_DEF: EnemyDef = {
  id: B2_08_BOSS,
  name: 'The Salesman',
  person: 'The Salesman',
  kind: 'boss',
  hp: 10,
  topics: [CP, UN, PK, AC],
  kinds: ['fill', 'fix', 'order', 'listen'],
  tags: ['b2-08-boss-cp'],
  phases: [
    { hp: 5, title: 'La presentación: comparaciones', topics: [CP], kinds: ['fill', 'fix', 'order', 'listen'], tags: ['b2-08-boss-cp'], line: { text: "The old treatment? It's nowhere near good as Restore! Restore works twice faster than therapy!", es: 'nowhere near good as (por nowhere near as good as) y twice faster than: mal.' } },
    { hp: 5, title: 'La letra pequeña: incontables y correos', topics: [UN, PK, AC], kinds: ['fill', 'fix', 'listen'], tags: ['b2-08-boss-un'], line: { text: 'The equipments are new! Send me the report until EOD!', es: 'equipments (equipment no tiene plural) y until EOD (por by EOD): mal.' } },
  ],
  onlyTags: true,
  zone: 'sala-torre',
  look: { shirt: '#1f3a5f', hair: '#3fa9ff', skin: '#bfe4ff' },
  before: [{ text: 'Special offer! Get your voice back today! Somebody else will pay the price… I mean, the price is low!', es: '¡Oferta especial! ¡Recupera tu voz hoy! Otra persona pagará el precio… digo, ¡el precio es bajo!' }],
  after: [{ text: '(The hologram flickers, freezes and breaks into blue pixels.)', es: '(El holograma parpadea, se congela y se rompe en píxeles azules.)' }],
  freed: { text: '(The stage is silent. The giant screen shows only one line: "A compatible donor voice is required.")', es: '(El escenario queda en silencio. La pantalla gigante muestra una sola línea: "Se requiere una voz donante compatible".)' },
  // Las Ventanas no dan atuendos (ficha 0.4): solo la despedida
  farewell: {
    q: 'The Salesman (fading): "But… our product is much more better than…"',
    options: ['Your product is much better, but somebody always pays the price.', 'Your product is much more better, but somebody always pays the price.', 'Your product is very better, but somebody always pays the price.'],
    answer: 0,
    tip: 'better ya es comparativo: much better (sin more).',
  },
}

export const B2_08_ENEMIES: Record<string, EnemyDef> = {
  [B2_08_BOT1]: BOT(B2_08_BOT1, { text: "Restore is much more better! Can you give me an information? Sign up now!", es: 'much more better y an information: mal.' }),
  [B2_08_BOT2]: BOT(B2_08_BOT2, { text: 'I need some advices! Restore is very more cheaper! Buy, buy, buy!', es: 'some advices y very more cheaper: mal.' }),
  [B2_08_BOSS]: B2_08_BOSS_DEF,
}
