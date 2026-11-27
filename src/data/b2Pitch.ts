import type { GameState, SceneDef, Zone } from '../game/types'
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
/** Bloque 2: The Fine Print (abre el salón del lanzamiento) */
export const B2_08_FINEPRINT = 'b2-08-fineprint'

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
