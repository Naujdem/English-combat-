import type { EnemyDef, GameState, SceneDef, Zone } from '../game/types'
import type { FuturePlannerContent } from '../components/FuturePlanner'
import type { ScriptLine } from './b1Accident'
import type { TextCommandRoom } from '../components/TextCommand'

/**
 * B2-12 · Countdown (Ventana, 2056). La noche en que G escribe la tarjeta, horas antes de viajar al primer día del protagonista
 * en A1. El cuarto que G alquila cerca del puerto viejo. Nadie oye al protagonista. G no está: salió a la escuela (Ventana 10).
 * Guía: lo que hay en el lugar (el plan clavado en la pared, la lista vieja de metas y el cuaderno de G; ficha 12).
 * Canon de B1: el Future Planner del recuerdo 13 ya mostró el plan del día siguiente; aquí se ve el plan GRANDE de G.
 * Bloque 1: el cuarto vacío (b2-12-arrival, script) → la pared del plan: lección 'fperfect-b2' + práctica (b2-12-plan)
 *   → la lista vieja de metas: lección 'goals-b2' + práctica (b2-12-goals) → Unheard en el escritorio (b2-12-unheard):
 *   abrir el cajón (el reloj), intentar quitar el plan (no se puede: ya ocurrió) y dejar la nota "Don't do it."
 * Bloque 2: G vuelve y lee la nota (b2-12-return, script, escucha: be about to y futuro perfecto continuo) → el cuaderno de G:
 *   lección 'time-clauses-b2' + práctica (b2-12-notebook) → Future Planner versión G en la pared (b2-12-timeline, reutilizado:
 *   la línea de tiempo de G con futuro perfecto) → dos Ticking Shadows (esbirros) → el jefe The Countdown (2 fases).
 */
export const B2_12_ROOM_ID = 'b2-12-room'
export const B2_12_WALL = 'b2-12-wall'
export const B2_12_LIST = 'b2-12-list'
export const B2_12_DESK = 'b2-12-desk'
/** Tareas (marcas en `opened`) */
export const B2_12_ARRIVAL = 'b2-12-arrival'
export const B2_12_PLAN = 'b2-12-plan'
export const B2_12_GOALS = 'b2-12-goals'
export const B2_12_UNHEARD = 'b2-12-unheard'
/** Bloque 2 */
export const B2_12_G = 'b2-12-g'
export const B2_12_NOTEBOOK_NPC = 'b2-12-g-notebook'
export const B2_12_RETURN = 'b2-12-return'
export const B2_12_NOTEBOOK = 'b2-12-notebook'
export const B2_12_TIMELINE = 'b2-12-timeline'
export const B2_12_SHADOW1 = 'b2-12-shadow1'
export const B2_12_SHADOW2 = 'b2-12-shadow2'
export const B2_12_BOSS = 'b2-12-boss'
/** Se guarda al salir de la Ventana (después del fundido azul) */
export const B2_12_EXITED = 'b2-12-exited'

/**
 * Leyenda (Tiles.tsx, sin dibujos nuevos): # pared · W ventana · 5 colchón · K escritorio · . piso · d puerta.
 * La pared del plan (4,0), la lista vieja sobre el escritorio (1,5), el escritorio con el cajón (8,5) y la puerta (11,3).
 */
const MAP = [
  '####W#######',
  '#5.........#',
  '#5.........#',
  '#..........d',
  '#..........#',
  '#K......K..#',
  '############',
]

const zoneAt = (): Zone => 'casa'

export const B2_12_ROOM: SceneDef = {
  id: B2_12_ROOM_ID,
  name: 'Ventana 2056 · El cuarto de G',
  topics: [],
  map: MAP,
  start: { x: 10, y: 3 },
  // Sin jefe en este bloque: la puerta del jefe apunta a un muro y no hace falta ninguna llave
  bossDoor: { x: 0, y: 0 },
  keysNeeded: 0,
  entities: [
    { type: 'npc', id: B2_12_WALL, x: 3, y: 0 },
    { type: 'npc', id: B2_12_LIST, x: 1, y: 5 },
    { type: 'npc', id: B2_12_DESK, x: 8, y: 5 },
    // Bloque 2: G vuelve (al terminar Unheard) y deja su cuaderno abierto en el piso, junto al colchón
    { type: 'npc', id: B2_12_G, x: 9, y: 3 },
    { type: 'npc', id: B2_12_NOTEBOOK_NPC, x: 3, y: 2 },
    // Al completar la línea de tiempo, los alfileres hacen tic-tac: dos sombras y luego la obsesión de G
    { type: 'enemy', id: B2_12_SHADOW1, x: 5, y: 1, after: B2_12_TIMELINE },
    { type: 'enemy', id: B2_12_SHADOW2, x: 3, y: 4, after: B2_12_SHADOW1 },
    { type: 'enemy', id: B2_12_BOSS, x: 6, y: 3, after: B2_12_SHADOW2 },
  ],
  labels: [{ text: '2056', x: 5, y: 3 }],
  zoneAt,
  examine: {
    '4,0': { text: 'The old port at night. A ship is leaving.', sub: 'El puerto viejo de noche. Un barco está saliendo.', say: 'A ship is leaving.' },
    '1,1': { text: 'A thin mattress. Nobody has slept in it.', sub: 'Un colchón delgado. Nadie ha dormido en él.', say: 'Nobody has slept in it.' },
    '6,3': { text: 'A cup of cold coffee. He left in a hurry.', sub: 'Una taza de café frío. Salió de afán.', say: 'He left in a hurry.' },
  },
  // La puerta da al pasillo del edificio: está cerrada con llave desde afuera
  locked: (x, y) => (x === 11 && y === 3 ? { text: 'The door is locked from the outside.', sub: 'La puerta está cerrada con llave desde afuera.' } : null),
  links: {},
  requirements: [],
  chips: (s: GameState) => [
    { label: 'El cuarto vacío', done: s.opened.includes(B2_12_ARRIVAL) },
    { label: 'La pared del plan', done: s.opened.includes(B2_12_PLAN) },
    { label: 'La lista vieja de metas', done: s.opened.includes(B2_12_GOALS) },
    { label: 'Unheard: el cajón, el plan y la nota', done: s.opened.includes(B2_12_UNHEARD) },
    { label: 'G vuelve', done: s.opened.includes(B2_12_RETURN) },
    { label: 'El cuaderno de G', done: s.opened.includes(B2_12_NOTEBOOK) },
    { label: 'La línea de tiempo de G', done: s.opened.includes(B2_12_TIMELINE) },
    { label: 'Ticking Shadows (2)', done: s.defeated.includes(B2_12_SHADOW2) },
    { label: 'The Countdown', done: s.defeated.includes(B2_12_BOSS) },
  ],
  intro: {
    first: '2056. A small room near the old port, at night. — 2056. Un cuarto pequeño cerca del puerto viejo, de noche. Aquí nadie te oye.',
    later: () => 'A room near the old port, 2056. Nobody can hear you. — Un cuarto cerca del puerto viejo, 2056. Nadie te oye.',
  },
}

/** El cuarto vacío: entrada a la Ventana (sin voz) */
export const B2_12_ARRIVAL_SCRIPT: ScriptLine[] = [
  { who: 'narrator', text: '(A blue flash. A sign in the air: 2056. A small, dark room. Through the window, the lights of the old port.)', es: '(Un destello azul. Un letrero en el aire: 2056. Un cuarto pequeño y oscuro. Por la ventana, las luces del puerto viejo.)' },
  { who: 'narrator', text: '(Nobody is here. A cup of coffee is still on the floor. Someone left a short time ago.)', es: '(No hay nadie. Todavía hay una taza de café en el piso. Alguien salió hace poco.)' },
  { who: 'L', fx: 'unheard', text: 'Hello? Is anybody here?', es: 'Intentas decir: "¿Hola? ¿Hay alguien aquí?"' },
  { who: 'narrator', text: '(Silence. On the wall, a big map with pins… and a plan, written in big letters.)', es: '(Silencio. En la pared, un mapa grande con alfileres… y un plan, escrito en letras grandes.)' },
  { who: 'narrator', text: '(You know that coat on the chair. G lives here. Today he went to a school… and wrote a card.)', es: '(Conoces ese abrigo de la silla. G vive aquí. Hoy fue a una escuela… y escribió una tarjeta.)' },
]

/**
 * Unheard en el cuarto de G (ficha 12): 3 metas sin voz. Es el primer intento del protagonista de hablarle a G.
 * El plan NO se puede quitar: la orden es correcta, pero la pared no lo suelta (es un hecho fijo: el plan sí ocurrió).
 * Con 0-1 errores, escudo.
 */
export const B2_12_UNHEARD_ROOM: TextCommandRoom = {
  mode: 'text',
  title: "Unheard · G's room",
  intro: {
    en: "G will be back soon. Nobody can hear you, but you can move things. Write what you do.",
    es: 'G va a volver pronto. Nadie te oye, pero puedes mover cosas. Escribe lo que haces.',
  },
  scene: 'room',
  objects: ['desk-drawer', 'plan', 'note'],
  steps: [
    {
      problem: { en: 'There is a blue light under the desk drawer. It is closed.', es: 'Sale una luz azul por debajo del cajón del escritorio. Está cerrado.' },
      accept: [{ verb: 'open', object: 'desk-drawer' }],
      target: 'desk-drawer',
      done: { en: 'The drawer opens. Inside, the clock is glowing — the whole clock, with its core. It is ticking very fast.', es: 'El cajón se abre. Adentro, el reloj brilla: el reloj entero, con su núcleo. Hace tic-tac muy rápido.' },
      tip: 'Hay que abrir el cajón: Open the drawer.',
      fails: {
        take: { en: 'You can\'t take anything. The drawer is closed.', es: 'No puedes sacar nada. El cajón está cerrado.' },
        close: { en: 'It is already closed.', es: 'Ya está cerrado.' },
      },
      verbPool: ['take', 'close', 'push', 'read'],
    },
    {
      problem: {
        en: 'The plan on the wall says: "By tomorrow morning, I will have arrived at his school." Take it down before he comes back!',
        es: 'El plan de la pared dice: "Para mañana por la mañana, habré llegado a su escuela". ¡Descuélgalo antes de que vuelva!',
      },
      accept: [
        { verb: 'take', particle: 'down', object: 'plan', optional: ['from the wall', 'off the wall'] },
        { verb: 'remove', object: 'plan', optional: ['from the wall'] },
      ],
      target: 'plan',
      done: {
        en: 'You pull and pull. The paper doesn\'t move. The pins glow blue: this plan already happened. You can\'t change it.',
        es: 'Halas y halas. El papel no se mueve. Los alfileres brillan en azul: este plan ya ocurrió. No lo puedes cambiar.',
      },
      tip: 'Descolgar algo de la pared es "take down": Take down the plan.',
      fails: {
        open: { en: 'The plan is a paper on the wall. You can\'t open it.', es: 'El plan es un papel en la pared. No se puede abrir.' },
        read: { en: 'You have already read it. Now take it off the wall.', es: 'Ya lo leíste. Ahora quítalo de la pared.' },
      },
      verbPool: ['open', 'read', 'push', 'close'],
    },
    {
      problem: {
        en: 'You can\'t change the plan… but G can read. There is a pen and a small note on the desk. Leave him a note.',
        es: 'No puedes cambiar el plan… pero G sí puede leer. Hay un lápiz y una notita en el escritorio. Déjale una nota.',
      },
      accept: [
        { verb: 'leave', object: 'note', optional: ['for g', 'for him', 'him', 'on the desk', 'on the table'] },
        { verb: 'write', object: 'note', optional: ['for g', 'for him', 'on the desk'] },
      ],
      target: 'note',
      done: { en: 'You write three words and leave the note next to the clock: "Don\'t do it."', es: 'Escribes tres palabras y dejas la nota junto al reloj: "Don\'t do it." (No lo hagas).' },
      tip: 'Deja una nota: Leave a note for G.',
      fails: {
        open: { en: 'The note is already open. Write something on it.', es: 'La nota ya está abierta. Escribe algo en ella.' },
        take: { en: 'Don\'t take it. Leave it here for G.', es: 'No te la lleves. Déjala aquí para G.' },
      },
      verbPool: ['open', 'take', 'read', 'close'],
    },
  ],
  finish: { en: 'Footsteps on the stairs. Someone is coming…', es: 'Pasos en la escalera. Alguien viene…', banner: 'Unheard completado' },
}

// ── Bloque 2 ──

/** G vuelve y lee la nota. No ve a nadie. Habla solo (escucha): be about to y futuro perfecto continuo */
export const B2_12_RETURN_SCRIPT: ScriptLine[] = [
  { who: 'narrator', text: '(The key turns. The door opens. The old man in the dark coat comes in, with a small gift under his arm.)', es: '(La llave gira. La puerta se abre. Entra el viejo del abrigo oscuro, con un regalito bajo el brazo.)' },
  { who: 'narrator', text: '(He sees the note next to the clock. He reads it. His hands stop shaking for a second.)', es: '(Ve la nota junto al reloj. La lee. Por un segundo, sus manos dejan de temblar.)' },
  { who: 'narrator', text: 'G: "Don\'t do it."… Who\'s there?', es: 'G: "No lo hagas"… ¿Quién está ahí?' },
  { who: 'narrator', text: '(He looks around the room. He looks straight at you… and sees nothing.)', es: '(Mira por todo el cuarto. Te mira directo a ti… y no ve nada.)' },
  { who: 'L', fx: 'unheard', text: "I'm here! Please, listen to me!", es: 'Intentas decir: "¡Estoy aquí! ¡Por favor, escúchame!"' },
  { who: 'narrator', text: 'G: No one can stop me now. I\'m about to change everything.', es: 'G: Ya nadie puede detenerme. Estoy a punto de cambiarlo todo.' },
  { who: 'narrator', text: 'G: By tomorrow, I\'ll have been waiting for this for thirty years.', es: 'G: Para mañana, llevaré treinta años esperando esto.' },
  { who: 'narrator', text: '(He drops his notebook on the floor, open, and sits on the mattress. You can read the page.)', es: '(Deja caer su cuaderno en el piso, abierto, y se sienta en el colchón. Puedes leer la página.)' },
]

/** Future Planner, versión G (reutilizado, components/FuturePlanner.tsx): la línea de tiempo de mañana, con futuro perfecto */
export const B2_12_PLANNER_CONTENT: FuturePlannerContent = {
  title: "G's timeline",
  intro: 'G completa la línea de tiempo de mañana en la pared. Mira el tablero y completa cada frase: casi todas usan el futuro perfecto.',
  headers: ['When', 'Where', 'Action', 'Status'],
  colors: { PLAN: '#f2c230', DONE: '#7ee08a', NOW: '#3fa9ff' },
  rows: [
    { who: 'By 8 a.m.', to: 'This room', time: 'leave', status: 'PLAN' },
    { who: 'By 9 a.m.', to: 'His school', time: 'arrive', status: 'PLAN' },
    { who: 'By 10 a.m.', to: 'The window', time: 'stand', status: 'PLAN' },
    { who: 'After class', to: 'The classroom', time: 'take his voice', status: 'PLAN' },
    { who: 'Tonight', to: '2056', time: 'come back', status: 'PLAN' },
  ],
  rounds: [
    { who: 'G', row: 0, q: 'By 8 a.m., I ___ this room.', es: 'Para las 8 a. m., ya habré salido de este cuarto.', options: ['will have left', 'will have leave', 'will leaving'], answer: 0, tip: 'will have + participio: leave → left.', set: { status: 'DONE' } },
    { who: 'G', row: 1, q: 'By 9 a.m., I ___ at his school.', es: 'Para las 9 a. m., ya habré llegado a su escuela.', options: ['will arrived', 'will have arrived', 'have will arrived'], answer: 1, tip: 'will have + participio: arrived.', set: { status: 'DONE' } },
    { who: 'G', row: 2, q: 'By 10 a.m., I ___ at the window for an hour.', es: 'Para las 10 a. m., llevaré una hora parado junto a la ventana.', options: ['will have standing', 'will be stood', 'will have been standing'], answer: 2, tip: 'Cuánto tiempo llevará: will have been + -ing.', set: { status: 'DONE' } },
    { who: 'G', row: 3, q: "By the time the class ___, I'll have taken his voice.", es: 'Para cuando termine la clase, ya le habré quitado la voz.', options: ['ends', 'will end', 'ending'], answer: 0, tip: 'by the time + presente: ends.', set: { status: 'DONE' } },
    { who: 'G', row: 4, q: "When I ___ back, I'll speak again.", es: 'Cuando vuelva, hablaré otra vez.', options: ['will come', 'came', 'come'], answer: 2, tip: 'when + presente para el futuro: come.', set: { status: 'DONE' } },
    { who: 'G', row: 4, q: "I'm ___ to change everything.", es: 'Estoy a punto de cambiarlo todo.', options: ['about', 'going about', 'ready about'], answer: 0, tip: 'be about to + verbo.', set: { status: 'NOW' } },
  ],
  finish: 'La línea de tiempo está completa. Los alfileres del mapa empiezan a hacer tic-tac…',
}

const FP = 'fperfect-b2' as const
const GL = 'goals-b2' as const
const TC = 'time-clauses-b2' as const

/** Ticking Shadows: sombras que hacen tic-tac, salidas de los alfileres del mapa. Preguntas: etiqueta b2-12-shadow */
const SHADOW = (id: string, line: { text: string; es: string }): EnemyDef => ({
  id,
  name: 'Ticking Shadow',
  person: 'Ticking Shadow',
  kind: 'minion',
  hp: 4,
  topics: [FP, GL, TC],
  kinds: ['fill', 'fix'],
  tags: ['b2-12-shadow'],
  onlyTags: true,
  zone: 'casa',
  look: { shirt: '#1a2233', hair: '#0b0f18', skin: '#2a3550' },
  before: [line],
  after: [{ text: '(The shadow stops ticking.)', es: '(La sombra deja de hacer tic-tac.)' }],
  freed: { text: '(It goes back into a pin on the map.)', es: '(Vuelve a un alfiler del mapa.)' },
})

/**
 * The Countdown: la obsesión de G hecha reloj gigante. Jefe de 2 fases.
 * Fase 1: futuro perfecto simple y continuo (b2-12-boss-fp) · Fase 2: by the time / until / when + presente y be about to,
 * con escucha (b2-12-boss-tc). Las Ventanas no dan atuendos: solo despedida.
 */
export const B2_12_BOSS_DEF: EnemyDef = {
  id: B2_12_BOSS,
  name: 'The Countdown',
  person: 'The Countdown',
  kind: 'boss',
  hp: 10,
  topics: [FP, GL, TC],
  kinds: ['fill', 'fix', 'order', 'listen'],
  tags: ['b2-12-boss-fp'],
  phases: [
    { hp: 5, title: 'Tic-tac: el plan de treinta años', topics: [FP, GL], kinds: ['fill', 'fix', 'order'], tags: ['b2-12-boss-fp'], line: { text: 'By 2060 I will have been became everything! By next year she will finish!', es: 'will have been became: mal. Y "will finish" cuando el contexto pide "will have finished".' } },
    { hp: 5, title: 'Las últimas horas', topics: [TC], kinds: ['fill', 'fix', 'listen'], tags: ['b2-12-boss-tc'], line: { text: "By the time he will arrive, I'll have left! Wait here until I will come back!", es: 'by the time he will arrive y until I will come: mal (van en presente).' } },
  ],
  onlyTags: true,
  zone: 'casa',
  look: { shirt: '#1c2a3e', hair: '#3fa9ff', skin: '#25344d' },
  before: [
    { text: '(The clock in the drawer rises into the air. It grows and grows until it fills the room.)', es: '(El reloj del cajón se eleva en el aire. Crece y crece hasta llenar el cuarto.)' },
    { text: 'TICK. TOCK. THIRTY YEARS. NOTHING CAN STOP THE COUNTDOWN.', es: 'TIC. TAC. TREINTA AÑOS. NADA PUEDE DETENER LA CUENTA REGRESIVA.' },
  ],
  after: [{ text: '(The giant clock slows down… and shrinks back into the drawer.)', es: '(El reloj gigante va más despacio… y se encoge hasta volver al cajón.)' }],
  freed: { text: '(The ticking stops. For a moment, the room is silent.)', es: '(El tic-tac se detiene. Por un momento, el cuarto queda en silencio.)' },
  farewell: {
    q: 'The Countdown (fading): "Tick… tock… by the time he…"',
    options: ['By the time he understands, it will be too late.', 'By the time he will understand, it will be too late.', 'By the time he understanding, it will be too late.'],
    answer: 0,
    tip: 'by the time + presente: understands.',
  },
}

export const B2_12_ENEMIES: Record<string, EnemyDef> = {
  [B2_12_SHADOW1]: SHADOW(B2_12_SHADOW1, { text: "Tick! By tomorrow I will have finish! Tock! I'm about leaving!", es: 'will have finish y about leaving: mal.' }),
  [B2_12_SHADOW2]: SHADOW(B2_12_SHADOW2, { text: 'Tick, tock… I will have been wait for years!', es: 'will have been wait: mal.' }),
  [B2_12_BOSS]: B2_12_BOSS_DEF,
}
