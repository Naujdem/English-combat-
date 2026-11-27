import type { GameState, SceneDef, Zone } from '../game/types'
import type { ScriptLine } from './b1Accident'
import type { TextCommandRoom } from '../components/TextCommand'

/**
 * B2-06 · The Lab (Ventana, 2062). Un año después del incendio, antes de que G robe el aparato (recuerdo 7 de B1).
 * El laboratorio de Vocalis: recepción, sala de datos, archivo y sala de pruebas. Nadie oye al protagonista.
 * Guía: lo que hay en el lugar (el lema de la pared, los folletos, los recortes de prensa; ficha 6).
 * Bloque 1: el lema de la recepción (b2-06-arrival, script) → los folletos: lección 'wordform-b2' + práctica (b2-06-words)
 *   → los recortes de prensa: lección 'passive-report-b2' + práctica (b2-06-clippings) → el archivo: Unheard (b2-06-unheard,
 *   3 metas: abrir el cajón del archivo, encender la pantalla de datos, esconderse detrás del estante). Al terminar se abre
 *   la puerta de la sala de datos (bloque 2: tendencias, el memo, el hallazgo, Lab Drones y The Prototype).
 */
export const B2_06_LAB_ID = 'b2-06-lab'
export const B2_06_MOTTO = 'b2-06-motto'
export const B2_06_BROCHURES = 'b2-06-brochures'
export const B2_06_CLIPPINGS = 'b2-06-clippings'
export const B2_06_ARCHIVE = 'b2-06-archive'
/** Tareas (marcas en `opened`) */
export const B2_06_ARRIVAL = 'b2-06-arrival'
export const B2_06_WORDS = 'b2-06-words'
export const B2_06_PASSIVE = 'b2-06-clippings'
export const B2_06_UNHEARD = 'b2-06-unheard'

/**
 * Leyenda: # pared · i pantalla en la pared · q pared de vidrio · d puerta · C mostrador · O asiento · M escritorio
 * H estante del archivo · K mesa de pruebas · p planta.
 * Arriba a la izquierda la recepción; a la derecha la sala de datos; abajo el archivo (izq.) y la sala de pruebas (der.).
 */
const MAP = [
  '#i#i##i#iiii#i##',
  '#.....q........#',
  '#.....q..M..M..#',
  '#.CCC.d........#',
  '#.....q........#',
  '#O.O..q..p.....#',
  '###d######d#####',
  '#.H.H.q........#',
  '#.....d........#',
  '#.H.H.q...K....#',
  '#p....q.......p#',
  '################',
]

function zoneAt(x: number, y: number): Zone {
  if (y <= 5) return x <= 5 ? 'lobby-torre' : 'oficina-torre'
  return x <= 5 ? 'sala-torre' : 'oficina-torre'
}

export const B2_06_LAB: SceneDef = {
  id: B2_06_LAB_ID,
  name: 'Ventana 2062 · El laboratorio de Vocalis',
  topics: [],
  map: MAP,
  start: { x: 4, y: 4 },
  // Sin jefe en este bloque: la puerta del jefe apunta a un muro y no hace falta ninguna llave
  bossDoor: { x: 0, y: 0 },
  keysNeeded: 0,
  entities: [
    { type: 'npc', id: B2_06_MOTTO, x: 3, y: 1 },
    { type: 'npc', id: B2_06_BROCHURES, x: 5, y: 2 },
    { type: 'npc', id: B2_06_CLIPPINGS, x: 1, y: 1 },
    { type: 'npc', id: B2_06_ARCHIVE, x: 3, y: 8 },
  ],
  labels: [
    { text: 'Recepción', x: 3, y: 5 },
    { text: 'Sala de datos', x: 11, y: 4 },
    { text: 'Archivo', x: 3, y: 10 },
    { text: 'Sala de pruebas', x: 11, y: 10 },
  ],
  zoneAt,
  examine: {
    '2,3': { text: 'The reception desk. Nobody is here at this hour.', sub: 'El mostrador de recepción. A esta hora no hay nadie.', say: 'Nobody is here at this hour.' },
    '3,3': { text: 'A visitor book. The last name is "Dr. K. Mensah, 9:40 p.m."', sub: 'Un libro de visitas. El último nombre es "Dr. K. Mensah, 9:40 p. m.".', say: 'A visitor book.' },
    '4,3': { text: 'A sign: "Staff only after 8 p.m."', sub: 'Un letrero: "Solo personal después de las 8 p. m."', say: 'Staff only after eight p.m.' },
    '2,7': { text: 'Shelves full of boxes: "Trials 1–6".', sub: 'Estantes llenos de cajas: "Pruebas 1–6".', say: 'Trials one to six.' },
    '4,7': { text: 'Shelves full of boxes. One label is missing.', sub: 'Estantes llenos de cajas. Falta una etiqueta.', say: 'One label is missing.' },
    '2,9': { text: 'Old notes about ancient writings. Someone drew a temple in the corner.', sub: 'Notas viejas sobre escritos antiguos. Alguien dibujó un templo en una esquina.', say: 'Old notes about ancient writings.' },
    '4,9': { text: 'Empty boxes, ready for new results.', sub: 'Cajas vacías, listas para nuevos resultados.', say: 'Empty boxes.' },
  },
  // Bloque 1: la sala de datos se abre después de Unheard
  locked: (x, y, s) => (x === 6 && y === 3 && !s.opened.includes(B2_06_UNHEARD) ? { text: 'The door is locked. A small screen says "Data room — staff only".', sub: 'Todavía no. Primero mira la recepción y el archivo.' } : x === 10 && y === 6 ? { text: 'Not yet.', sub: 'Todavía no.' } : x === 6 && y === 8 ? { text: 'Not yet.', sub: 'La sala de pruebas está cerrada.' } : null),
  links: {},
  requirements: [],
  chips: (s: GameState) => [
    { label: 'La recepción de Vocalis', done: s.opened.includes(B2_06_ARRIVAL) },
    { label: 'Los folletos: formación de palabras', done: s.opened.includes(B2_06_WORDS) },
    { label: 'Los recortes: "It is said that…"', done: s.opened.includes(B2_06_PASSIVE) },
    { label: 'Unheard en el archivo', done: s.opened.includes(B2_06_UNHEARD) },
  ],
  intro: {
    first: '2062. The Vocalis lab, late at night. — 2062. El laboratorio de Vocalis, tarde en la noche. Aquí nadie te oye.',
    later: () => 'The Vocalis lab, 2062. Nobody can hear you. — El laboratorio de Vocalis, 2062. Nadie te oye.',
  },
}

/** El lema de la recepción: entrada a la Ventana (sin voz, como en la Ventana 3) */
export const B2_06_ARRIVAL_SCRIPT: ScriptLine[] = [
  { who: 'narrator', text: '(A blue flash. A sign in the air: 2062. A white, quiet reception. It smells like cleaning products.)', es: '(Un destello azul. Un letrero en el aire: 2062. Una recepción blanca y silenciosa. Huele a productos de limpieza.)' },
  { who: 'narrator', text: '(On the wall, in big silver letters: "VOCALIS. Restoring human abilities. Wellbeing for everyone.")', es: '(En la pared, con grandes letras plateadas: "VOCALIS. Devolvemos las capacidades humanas. Bienestar para todos".)' },
  { who: 'narrator', text: '(Vocalis… The same logo as the metal plate in the water, the night of the blackouts.)', es: '(Vocalis… El mismo logo de la placa de metal en el agua, la noche de los apagones.)' },
  { who: 'L', fx: 'unheard', text: 'Is anybody here?', es: 'Intentas decir: "¿Hay alguien aquí?"' },
  { who: 'narrator', text: '(Nothing. A man in a white coat walks past with a coffee and doesn\'t even look at you.)', es: '(Nada. Un hombre con bata blanca pasa con un café y ni siquiera te mira.)' },
  { who: 'narrator', text: '(Nobody can hear you here. But the walls are full of things to read.)', es: '(Aquí nadie te oye. Pero las paredes están llenas de cosas para leer.)' },
]

/** Unheard en el archivo (ficha 6): 3 metas sin voz. Con 0-1 errores, escudo */
export const B2_06_UNHEARD_ROOM: TextCommandRoom = {
  mode: 'text',
  title: 'Unheard · The Archive',
  intro: {
    en: 'The archive of Vocalis. Nobody can hear you. Write what you do.',
    es: 'El archivo de Vocalis. Nadie te oye. Escribe lo que haces.',
  },
  scene: 'room',
  objects: ['drawer', 'screen', 'shelf'],
  steps: [
    {
      problem: { en: 'The trial reports are kept in the archive drawer. It is closed, but not locked.', es: 'Los informes de las pruebas se guardan en el cajón del archivo. Está cerrado, pero sin llave.' },
      accept: [{ verb: 'open', object: 'drawer', optional: ['archive'] }],
      target: 'drawer',
      done: { en: 'The drawer opens. Inside: files with numbers, from "Trial 1" to "Trial 6". Trial 7 is missing.', es: 'El cajón se abre. Adentro: carpetas con números, de "Prueba 1" a "Prueba 6". Falta la prueba 7.' },
      tip: 'Hay que abrir el cajón: Open the drawer.',
      fails: { push: { en: 'The drawer goes in even more. It was already closed.', es: 'El cajón entra todavía más. Ya estaba cerrado.' } },
      verbPool: ['push', 'close', 'lift', 'break'],
    },
    {
      problem: { en: 'There is a data screen on the wall. It is off. Maybe Trial 7 is on it.', es: 'Hay una pantalla de datos en la pared. Está apagada. Quizá la prueba 7 está ahí.' },
      accept: [
        { verb: 'turn', particle: 'on', object: 'screen', optional: ['data'] },
        { verb: 'switch', particle: 'on', object: 'screen', optional: ['data'] },
      ],
      target: 'screen',
      done: { en: 'The screen turns on: "Trial 7 — results: restricted". Somebody has hidden it.', es: 'La pantalla se enciende: "Prueba 7 — resultados: restringidos". Alguien la escondió.' },
      tip: 'Encender es un phrasal verb: Turn on the screen.',
      fails: { open: { en: "You can't open a screen.", es: 'No se puede abrir una pantalla.' } },
      verbPool: ['open', 'push', 'close', 'break'],
    },
    {
      problem: {
        en: 'Footsteps! A security guard is coming into the archive. He can\'t hear you… but he can see you. Find a place behind something big.',
        es: '¡Pasos! Un guardia de seguridad entra al archivo. No te oye… pero sí te puede ver. Busca un lugar detrás de algo grande.',
      },
      accept: [{ verb: 'hide', particle: 'behind', object: 'shelf' }],
      target: 'shelf',
      done: { en: 'You hide behind the shelf. The guard looks at the open drawer, shrugs and closes it. "These scientists…"', es: 'Te escondes detrás del estante. El guardia mira el cajón abierto, se encoge de hombros y lo cierra. "Estos científicos…".' },
      tip: 'Esconderse detrás de algo: Hide behind the shelf.',
      fails: { run: { en: 'There is nowhere to run. The guard is at the only door.', es: 'No hay a dónde correr. El guardia está en la única puerta.' } },
      verbPool: ['run', 'open', 'push', 'close'],
    },
  ],
  finish: { en: 'Nobody heard you… and nobody saw you.', es: 'Nadie te oyó… y nadie te vio.', banner: 'Unheard completado' },
}
