import type { EnemyDef, GameState, SceneDef, Zone } from '../game/types'
import { A2_04_CLOSE } from './a2Workshop'

/**
 * A2-05 — Words That Don't Belong (biblioteca, presente). Estanterías, mesa de lectura y mostrador.
 * Orden: Leo (llega) → Leo (lección de Past Simple + práctica) → el lector corrompido (esbirro en el paso al mostrador)
 *        → Mrs. Okafor (testimonio en pasado)
 *        → Mrs. Okafor (Reconstruct the Story: contrastar pistas) → Mrs. Okafor (Sequence Master: ordenar la nota) → el eco de tinta (jefe ligero, 2 fases cortas)
 *        → Leo (cierre con el fragmento y una pista).
 * Se activa al terminar A2-04. Tareas en data/tasks.ts.
 */
const MAP = [
  '##############',
  '#LLLWLLLLWLLL#',
  '#............#',
  '#.LL..LL..LL.#',
  '#............#',
  '#.KK......CCC#',
  '#.KK.....L...#',
  '#p..........p#',
  '#........L...#',
  '##############',
]

function zoneAt(_x: number, _y: number): Zone {
  return 'biblioteca'
}

export const A2_LIBRARY_ID = 'a2-05-library'
export const A2_05_ARRIVE = 'a2-05-arrive'
export const A2_05_PRACTICE = 'a2-05-practice'
export const A2_05_TESTIMONY = 'a2-05-testimony'
export const A2_05_RECONSTRUCT = 'a2-05-reconstruct'
export const A2_05_SEQUENCE = 'a2-05-sequence'
export const A2_05_BOSS = 'a2-05-ink-echo'
/** Esbirro ligero: el lector corrompido bloquea el paso al mostrador tras la práctica de Leo */
export const A2_05_READER = 'a2-05-reader'
export const A2_05_CLOSE = 'a2-05-close'

/** A2-05 se abre al terminar A2-04 */
export const isA2LibraryUnlocked = (s: GameState) => s.opened.includes(A2_04_CLOSE)

export const A2_LIBRARY_ENEMIES: Record<string, EnemyDef> = {
  // Esbirro ligero (1 fase): aparece tras la práctica de Leo en el único paso hacia el mostrador de Mrs. Okafor,
  // antes del testimonio, el Reconstruct y el eco de tinta. Es un eco: al vencerlo vuelve a su tiempo y da un escudo.
  [A2_05_READER]: {
    id: A2_05_READER,
    name: 'El lector corrompido',
    person: 'Mr. Lin',
    kind: 'minion',
    echo: true,
    hp: 4,
    topics: ['past-simple'],
    kinds: ['fill', 'fix', 'order', 'listen', 'write'],
    tags: ['a2-library-reader'],
    onlyTags: true,
    zone: 'biblioteca',
    look: { shirt: '#6b8e6b', hair: '#9a9a9a', skin: '#c9b8d8', accessory: 'glasses', gender: 'male' },
    before: [
      { text: 'Shh! I readed this book yesterday. I finded a secret in it, and I keeped it!', es: '¡Shh! "Leí" este libro ayer. "Encontré" un secreto en él y lo "guardé". (Todo mal: readed, finded, keeped).' },
      { text: 'Nobody goed to the front desk today! Go back to your table!', es: '¡Nadie "fue" al mostrador hoy! ¡Vuelve a tu mesa! (goed: mal).' },
    ],
    after: [
      { text: 'I read... I found... Oh. My words are OK again. What happened?', es: 'Leí... Encontré... Oh. Mis palabras están bien otra vez. ¿Qué pasó?' },
      { text: 'I opened an old book about clocks, and the ink moved. It was purple! Thank you.', es: 'Abrí un libro viejo sobre relojes y la tinta se movió. ¡Era morada! Gracias.' },
    ],
    freed: { text: 'I came here to read the newspaper. I usually sit by the window. Mrs. Okafor is at the front desk.', es: 'Vine a leer el periódico. Normalmente me siento junto a la ventana. Mrs. Okafor está en el mostrador.' },
    bonus: { q: 'Before you go! Last week I ___ three books about history.', options: ['bought', 'buyed', 'buy'], answer: 0, tip: 'buy es irregular: buy → bought.' },
  },
  [A2_05_BOSS]: {
    id: A2_05_BOSS,
    name: 'El eco de tinta',
    person: 'The Ink Echo',
    kind: 'boss',
    hp: 6,
    topics: ['past-simple'],
    kinds: ['fill', 'fix', 'order', 'listen', 'write'],
    tags: ['a2-library'],
    // Fase 1: pasados regulares (-ed) · Fase 2: irregulares, conectores y comparativos
    phases: [
      { hp: 3, title: 'Regular -ed', topics: ['past-simple'], kinds: ['fill', 'fix', 'order', 'listen', 'write'], tags: ['a2-library-reg'] },
      {
        hp: 3,
        title: 'Irregular verbs',
        topics: ['past-simple'],
        kinds: ['fill', 'fix', 'order', 'listen', 'write'],
        tags: ['a2-library-irr'],
        line: { text: 'Stop correcting me! Yesterday I goed everywhere, I eated every page and I writed new words!', es: '¡Deja de corregirme! Ayer "fui" a todas partes, "me comí" cada página y "escribí" palabras nuevas. (Ahora usa mal los verbos irregulares: goed, eated, writed).' },
      },
    ],
    onlyTags: true,
    zone: 'biblioteca',
    look: { shirt: '#2a2440', hair: '#14101f', skin: '#c9b8d8' },
    before: [
      { text: 'Yesterday I walk into this book. I change every word. Nobody stoped me!', es: 'Ayer "entro" a este libro. "Cambio" cada palabra. ¡Nadie me "detuvo"! (Lo dice todo mal: walk, change, stoped).' },
      { text: 'These are MY words now. They do not belong to you!', es: 'Ahora son MIS palabras. ¡No te pertenecen!' },
    ],
    after: [
      { text: 'I... walked... I changed... I stopped. Yes. That is the past.', es: 'Yo... caminé... cambié... me detuve. Sí. Así es el pasado.' },
      { text: 'The ink goes back into the old book. The pages are quiet again.', es: 'La tinta vuelve al libro viejo. Las páginas están tranquilas otra vez.' },
    ],
    freed: { text: 'The words are in the right place again. Thank you!', es: 'Las palabras están otra vez en su lugar. ¡Gracias!' },
    farewell: {
      q: 'Mrs. Okafor: Thank you! What did you do here today?',
      options: ['We fixed the old book!', 'We fixxed the old book!', 'We fix the old book yesterday!'],
      answer: 0,
      tip: 'Pasado regular: fix → fixed (una sola x).',
    },
    release: {
      title: '¡Anomalía liberada!',
      text: 'Entre las páginas queda un fragmento morado, pequeño como una gota de tinta. Lo tomas: el centro vacío de tu reloj vibra un segundo... y se queda quieto. Lo guardas con el otro.',
    },
  },
}

export const A2_LIBRARY: SceneDef = {
  id: A2_LIBRARY_ID,
  name: 'La biblioteca · A2',
  topics: [],
  map: MAP,
  start: { x: 6, y: 8 },
  // El jefe aparece en la mesa de lectura tras reconstruir la historia: no hay puerta ni llaves
  bossDoor: { x: 0, y: 0 },
  keysNeeded: 0,
  entities: [
    { type: 'npc', id: 'a2-05-leo', x: 5, y: 7 },
    // La persona especial te acompaña (solo una frase, sin tarea)
    { type: 'npc', id: 'a2-05-interest', x: 8, y: 8 },
    // Mrs. Okafor, la bibliotecaria, frente al mostrador
    { type: 'npc', id: 'a2-05-librarian', x: 11, y: 6 },
    // El lector corrompido bloquea el único paso hacia el mostrador tras la práctica de Leo
    { type: 'enemy', id: A2_05_READER, x: 9, y: 7, after: A2_05_PRACTICE },
    { type: 'enemy', id: A2_05_BOSS, x: 4, y: 5, after: A2_05_SEQUENCE },
  ],
  labels: [
    { text: 'Library', x: 6, y: 2 },
    { text: 'Reading table', x: 2, y: 7 },
    { text: 'Front desk', x: 11, y: 7 },
  ],
  zoneAt,
  examine: {
    '2,5': { text: 'An old book about clocks. Some words look wrong: "goed", "buyed", "eated"...', sub: 'Un libro viejo sobre relojes. Algunas palabras se ven mal: "goed", "buyed", "eated"...', say: 'An old book about clocks.', tone: 'warn' },
    '12,5': { text: 'The returns box. A card says: "Returned last week. No name."', sub: 'El buzón de devoluciones. Una tarjeta dice: "Devuelto la semana pasada. Sin nombre".', say: 'Returned last week. No name.' },
  },
  requirements: [],
  chips: (s) => [
    { label: "A2-05 · Words That Don't Belong", done: s.opened.includes(A2_05_CLOSE) },
    { label: 'Leo', done: s.opened.includes(A2_05_ARRIVE) },
    { label: 'Lección de Leo', done: s.seenLesson.includes('past-simple') },
    { label: 'Práctica', done: s.opened.includes(A2_05_PRACTICE) },
    { label: 'El lector', done: s.defeated.includes(A2_05_READER) },
    { label: 'Mrs. Okafor', done: s.opened.includes(A2_05_TESTIMONY) },
    { label: 'Reconstruct the Story', done: s.opened.includes(A2_05_RECONSTRUCT) },
    { label: 'Ordenar la nota', done: s.opened.includes(A2_05_SEQUENCE) },
    { label: 'Jefe: el eco de tinta', done: s.defeated.includes(A2_05_BOSS) },
    { label: 'Cierre', done: s.opened.includes(A2_05_CLOSE) },
  ],
  intro: {
    first: 'Después del taller, Leo te lleva a la biblioteca de la ciudad: la bibliotecaria dice que ayer pasaron cosas raras con las palabras de los libros.',
    later: 'La biblioteca en A2. Sigue los objetivos bajo el mapa.',
  },
}
