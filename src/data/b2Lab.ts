import type { EnemyDef, GameState, SceneDef, Zone } from '../game/types'
import type { ScriptLine } from './b1Accident'
import type { TextCommandRoom } from '../components/TextCommand'

/**
 * B2-06 · The Lab (Ventana, 2062). Un año después del incendio, antes de que G robe el aparato (recuerdo 7 de B1).
 * El laboratorio de Vocalis: recepción, sala de datos, archivo y sala de pruebas. Nadie oye al protagonista.
 * Guía: lo que hay en el lugar (el lema de la pared, los folletos, los recortes de prensa; ficha 6).
 * Bloque 1: el lema de la recepción (b2-06-arrival, script) → los folletos: lección 'wordform-b2' + práctica (b2-06-words)
 *   → los recortes de prensa: lección 'passive-report-b2' + práctica (b2-06-clippings) → el archivo: Unheard (b2-06-unheard,
 *   3 metas: abrir el cajón del archivo, encender la pantalla de datos, esconderse detrás del estante). Al terminar se abre
 *   la puerta de la sala de datos.
 * Bloque 2: las gráficas de la sala de datos: lección 'trends-b2' + práctica (b2-06-trends) → el memo interno: lección
 *   'causative-b2' + práctica (b2-06-memo; abre la sala de pruebas) → el hallazgo con el Dr. Mensah y la Dra. Sato
 *   (b2-06-finding, script: el informe de la prueba 7) → dos Lab Drones (esbirros) → el jefe The Prototype (2 fases).
 * Bloque 3: al vencer a The Prototype se enciende la pantalla final (b2-06-screen): el cierre (b2-06-close, script) con el
 *   mapa de los tres templos de B1 recupera los temas → Explore muestra WindowExit (fundido azul) y vuelves al presente
 *   (B2_06_EXITED); se abre el lugar 7. Diario: data/b2Diary.ts (sin página de G). Las Ventanas no dan atuendos.
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
/** Bloque 2 */
export const B2_06_CHARTS = 'b2-06-charts'
export const B2_06_MEMO_NPC = 'b2-06-memo-npc'
export const B2_06_SATO = 'b2-06-sato'
export const B2_06_MENSAH = 'b2-06-mensah'
export const B2_06_TRENDS = 'b2-06-trends'
export const B2_06_MEMO = 'b2-06-memo'
export const B2_06_FINDING = 'b2-06-finding'
export const B2_06_DRONE1 = 'b2-06-drone1'
export const B2_06_DRONE2 = 'b2-06-drone2'
export const B2_06_BOSS = 'b2-06-boss'
/** Bloque 3 */
export const B2_06_SCREEN = 'b2-06-screen'
export const B2_06_CLOSE = 'b2-06-close'
/** Se guarda al salir de la Ventana (después del fundido azul) */
export const B2_06_EXITED = 'b2-06-exited'

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
    // Bloque 2: la sala de datos (gráficas y memo) y la sala de pruebas (los científicos, los drones y el prototipo)
    { type: 'npc', id: B2_06_CHARTS, x: 10, y: 1 },
    { type: 'npc', id: B2_06_MEMO_NPC, x: 12, y: 3 },
    { type: 'npc', id: B2_06_MENSAH, x: 9, y: 7 },
    { type: 'npc', id: B2_06_SATO, x: 12, y: 7 },
    { type: 'enemy', id: B2_06_DRONE1, x: 8, y: 10, after: B2_06_FINDING },
    { type: 'enemy', id: B2_06_DRONE2, x: 13, y: 10, after: B2_06_DRONE1 },
    { type: 'enemy', id: B2_06_BOSS, x: 11, y: 8, after: B2_06_DRONE2 },
    // Bloque 3: la pantalla final (aparece al vencer a The Prototype)
    { type: 'npc', id: B2_06_SCREEN, x: 13, y: 8 },
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
  locked: (x, y, s) => (x === 6 && y === 3 && !s.opened.includes(B2_06_UNHEARD) ? { text: 'The door is locked. A small screen says "Data room — staff only".', sub: 'Todavía no. Primero mira la recepción y el archivo.' } : (x === 10 && y === 6) || (x === 6 && y === 8) ? (s.opened.includes(B2_06_MEMO) ? null : { text: 'The test room is closed. A red light: "Trial in progress".', sub: 'Todavía no. Primero mira lo que hay en la sala de datos.' }) : null),
  links: {},
  requirements: [],
  chips: (s: GameState) => [
    { label: 'La recepción de Vocalis', done: s.opened.includes(B2_06_ARRIVAL) },
    { label: 'Los folletos: formación de palabras', done: s.opened.includes(B2_06_WORDS) },
    { label: 'Los recortes: "It is said that…"', done: s.opened.includes(B2_06_PASSIVE) },
    { label: 'Unheard en el archivo', done: s.opened.includes(B2_06_UNHEARD) },
    { label: 'Las gráficas: tendencias', done: s.opened.includes(B2_06_TRENDS) },
    { label: 'El memo: have something done', done: s.opened.includes(B2_06_MEMO) },
    { label: 'La prueba 7', done: s.opened.includes(B2_06_FINDING) },
    { label: 'Lab Drones (2)', done: s.defeated.includes(B2_06_DRONE2) },
    { label: 'The Prototype', done: s.defeated.includes(B2_06_BOSS) },
    { label: 'La pantalla final', done: s.opened.includes(B2_06_CLOSE) },
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

// ── Bloque 2 ──

/** El hallazgo (ficha 6, paso 7): el informe de la prueba 7 en la mesa de pruebas. Habla el Dr. Mensah; la Dra. Sato responde (narrador) */
export const B2_06_FINDING_SCRIPT: ScriptLine[] = [
  { who: 'narrator', text: '(The test room. Two scientists are standing next to a metal table. On the table there is a report: "Trial 7".)', es: '(La sala de pruebas. Dos científicos están de pie junto a una mesa de metal. Sobre la mesa hay un informe: "Prueba 7".)' },
  { who: 'narrator', text: '(You read it over their shoulders: "Trial 7: voice restored. The donor lost theirs.")', es: '(Lo lees por encima de sus hombros: "Prueba 7: voz recuperada. El donante perdió la suya".)' },
  { who: 'narrator', text: '(You already knew the price. But now you can see it: Vocalis knows, and it is hiding it.)', es: '(Ya conocías el precio. Pero ahora lo ves: Vocalis lo sabe, y lo está escondiendo.)' },
  { who: 'friend', text: "Dr. Sato, we're supposed to help people. Not take a voice from one person and give it to another.", es: 'Dra. Sato, se supone que ayudamos a la gente. No que le quitamos la voz a una persona para dársela a otra.' },
  { who: 'narrator', text: '(Dr. Sato doesn\'t look up from the report: "The results are too good to stop now, Kwame.")', es: '(La Dra. Sato no levanta la vista del informe: "Los resultados son demasiado buenos para parar ahora, Kwame".)' },
  { who: 'L', fx: 'unheard', text: "You can't do this!", es: 'Intentas gritar: "¡No pueden hacer esto!"' },
  { who: 'narrator', text: '(Nobody hears you. But behind them, the machine on the table starts to hum. A small red light turns on.)', es: '(Nadie te oye. Pero detrás de ellos, la máquina de la mesa empieza a zumbar. Se enciende una lucecita roja.)' },
]

const TR = 'trends-b2' as const
const CA = 'causative-b2' as const
const PR = 'passive-report-b2' as const
const WF = 'wordform-b2' as const
const DRONE_LOOK = { shirt: '#c9d2dc', hair: '#3fa9ff', skin: '#8a96a3' }

/** Lab Drones, drones de seguridad. Preguntas: etiqueta b2-06-drone */
const DRONE = (id: string, line: { text: string; es: string }): EnemyDef => ({
  id,
  name: 'Lab Drone',
  person: 'Lab Drone',
  kind: 'minion',
  hp: 4,
  topics: [PR, CA, WF],
  kinds: ['fill', 'fix'],
  tags: ['b2-06-drone'],
  onlyTags: true,
  zone: 'oficina-torre',
  look: DRONE_LOOK,
  before: [line],
  after: [{ text: '(The drone beeps twice and lands on the floor.)', es: '(El dron pita dos veces y aterriza en el suelo.)' }],
  freed: { text: '(The red light of the drone goes off.)', es: '(Se apaga la luz roja del dron.)' },
})

/**
 * The Prototype: la primera versión del aparato, que se activa sola e intenta quitarle al protagonista una voz que ahí no tiene.
 * Fase 1: pasiva de reporte y be supposed to (b2-06-boss-pr) · Fase 2: causativo y tendencias, con escuchas de Sato y Mensah (b2-06-boss-ca).
 */
export const B2_06_BOSS_DEF: EnemyDef = {
  id: B2_06_BOSS,
  name: 'The Prototype',
  person: 'The Prototype',
  kind: 'boss',
  hp: 10,
  topics: [PR, CA, TR],
  kinds: ['fill', 'fix', 'order', 'listen'],
  tags: ['b2-06-boss-pr'],
  phases: [
    { hp: 5, title: 'Escaneo: lo que se dice', topics: [PR], kinds: ['fill', 'fix', 'order'], tags: ['b2-06-boss-pr'], line: { text: 'Scanning… She is said to discovering it. It is supposed that works.', es: 'is said to discovering e It is supposed that works: mal.' } },
    { hp: 5, title: 'Escaneo: los resultados', topics: [CA, TR], kinds: ['fill', 'fix', 'listen'], tags: ['b2-06-boss-ca'], line: { text: 'Success rate rose with 30%. I got repaired my circuits. Voice… not found…', es: 'rose with (por rose by) y got repaired my circuits: mal.' } },
  ],
  onlyTags: true,
  zone: 'oficina-torre',
  look: { shirt: '#5a6672', hair: '#e35d5d', skin: '#c9d2dc' },
  before: [{ text: 'Trial 8. Donor found. Scanning for a voice…', es: 'Prueba 8. Donante encontrado. Buscando una voz…' }],
  after: [{ text: '(Sparks. The machine shakes, and its red light goes dark.)', es: '(Chispas. La máquina tiembla, y su luz roja se apaga.)' }],
  freed: { text: '(The Prototype is silent now. The scientists look at it as if it had switched off by itself.)', es: '(The Prototype está en silencio. Los científicos lo miran como si se hubiera apagado solo.)' },
  // Las Ventanas no dan atuendos (ficha 0.4): solo la despedida
  farewell: {
    q: 'The Prototype (fading): "Error… I was supposed to take a voice…"',
    options: ['You were supposed to help people, not hurt them.', 'You were supposed helping people, not hurt them.', 'You supposed to help people, not hurt them.'],
    answer: 0,
    tip: 'be supposed to + forma base: were supposed to help.',
  },
}

export const B2_06_ENEMIES: Record<string, EnemyDef> = {
  [B2_06_DRONE1]: DRONE(B2_06_DRONE1, { text: 'Intruder… They had the prototype test… He is said to has found it…', es: 'had the prototype test y is said to has found: mal.' }),
  [B2_06_DRONE2]: DRONE(B2_06_DRONE2, { text: 'It is believed that be old… Unable… unsafe… inable…', es: 'It is believed that be old e inable: mal.' }),
  [B2_06_BOSS]: B2_06_BOSS_DEF,
}

// ── Bloque 3 ──

/** El cierre: la pantalla final con el mapa de los tres templos de B1, el fundido azul y la nota del protagonista */
export const B2_06_CLOSE_SCRIPT: ScriptLine[] = [
  { who: 'narrator', text: '(The Prototype is silent. On the wall, a big screen turns on by itself: "Project Voice — Sources".)', es: '(The Prototype está en silencio. En la pared, una pantalla grande se enciende sola: "Proyecto Voz — Fuentes".)' },
  { who: 'narrator', text: '(A map. Three temples are marked in red: Stones, Time and Echoes.)', es: '(Un mapa. Hay tres templos marcados en rojo: Stones, Time y Echoes.)' },
  { who: 'narrator', text: '(You know those names. You have walked through those temples… in G\'s memories.)', es: '(Conoces esos nombres. Caminaste por esos templos… en los recuerdos de G.)' },
  { who: 'narrator', text: '(Dr. Mensah looks at the screen for a long time. Then he looks at the report of Trial 7, and puts it in his bag.)', es: '(El Dr. Mensah mira la pantalla un largo rato. Luego mira el informe de la prueba 7 y lo guarda en su maletín.)' },
  { who: 'narrator', text: '(The blue light grows around you. The lab fades.)', es: '(La luz azul crece a tu alrededor. El laboratorio se desvanece.)' },
]
