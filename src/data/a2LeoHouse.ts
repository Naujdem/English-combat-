import type { EnemyDef, GameState, Question, SceneDef, Zone } from '../game/types'
import { A2_09_CLOSE } from './a2Mill'

/**
 * A2-10 — Echoes Across Time (casa de Leo en Green Street, presente; el ático es la sala de investigación).
 * Canon aprobado (opción A + C): la luz morada detiene lo que toca (carreta, carro, rueda del molino); el fragmento
 * siguió escondido en la carga de la carreta; la familia River la donó a la colección de la ciudad, y en 2056 estará
 * en el museo del transporte. El reloj marca una señal en 2056 → abre A2-11. Sin fragmento en esta misión.
 * Contenido: Present Perfect (caps. 13, 16), experiencias (cap. 9), reuniones: aclarar y opinar (cap. 12).
 * Orden: Leo abajo (lección present-perfect + práctica) → Eco del ático (esbirro en la escalera, 2 fases)
 *        → Leo arriba (The Memory Chest) → Leo (Detective: el tablero) → Leo (el periódico)
 *        → la persona especial (reunión, DebateTalk) → The Memory Eater (jefe, 3 fases) → Leo (cierre).
 * Se activa al terminar A2-09. Tareas en data/tasks.ts, lección en data/lessons.ts, combates en data/questions-a2-10.ts.
 */
const MAP = [
  '################',
  '#F...B..B...F.p#',
  '#..............#',
  '#8.....K.......#',
  '#F............L#',
  '#######d########',
  'WA...........L.W',
  '#A....K.......p#',
  '#..............#',
  '#J....O.......5#',
  '################',
]

function zoneAt(_x: number, _y: number): Zone {
  return 'casa-leo'
}

export const A2_LEO_HOUSE_ID = 'a2-10-leo-house'
export const A2_10_PRACTICE = 'a2-10-practice'
/** Esbirro: bloquea la escalera del ático tras la práctica de Leo */
export const A2_10_MINION = 'a2-10-attic-echo'
export const A2_10_CHEST = 'a2-10-chest'
export const A2_10_DETECTIVE = 'a2-10-detective'
export const A2_10_NEWS = 'a2-10-news'
export const A2_10_MEETING = 'a2-10-meeting'
/** Jefe: aparece en el ático tras la reunión */
export const A2_10_BOSS = 'a2-10-memory-eater'
export const A2_10_CLOSE = 'a2-10-close'

/** A2-10 se abre al terminar A2-09 */
export const isA2LeoHouseUnlocked = (s: GameState) => s.opened.includes(A2_09_CLOSE)

/** Práctica guiada de Leo (lista fija en data/tasks.ts) */
const T = ['a2-leo-house']
const TP = 'present-perfect' as const
export const A2_LEO_HOUSE_PRACTICE: Question[] = [
  { id: 'a2-10-p1', topic: TP, prompt: 'I ___ (find) an old newspaper.', options: ['have found', 'have find', 'has found'], answer: 0, tip: 'I + have + participio: find → found.', tags: T },
  { id: 'a2-10-p2', topic: TP, prompt: 'Leo ___ (be) to the past twice.', options: ['has been', 'have been', 'has be'], answer: 0, tip: 'Leo (he) + has · be → been.', tags: T },
  { id: 'a2-10-p3', topic: TP, kind: 'fix', prompt: 'She have seen the light.', options: ['She has seen the light.', 'She has saw the light.', 'She have see the light.'], answer: 0, tip: 'she + has · see → seen (no saw).', tags: T },
  { id: 'a2-10-p4', topic: TP, prompt: 'Have you ___ seen a purple light?', options: ['ever', 'yet', 'already'], answer: 0, tip: 'Experiencias: Have you ever…?', tags: T },
  { id: 'a2-10-p5', topic: TP, kind: 'order', prompt: 'Acabo de abrir la caja.', options: ['I', 'have', 'just', 'opened', 'the', 'box.'], answer: 0, tip: 'just va entre have y el participio.', tags: T },
  { id: 'a2-10-p6', topic: TP, prompt: "We haven't found the fragment ___.", options: ['yet', 'already', 'ever'], answer: 0, tip: 'Negativo: …yet al final.', tags: T },
  { id: 'a2-10-p7', topic: TP, prompt: 'The car ___ yesterday.', options: ['stopped', 'has stopped', 'have stopped'], answer: 0, tip: 'Con un momento terminado (yesterday): Past Simple.', tags: T },
]

export const A2_LEO_HOUSE_ENEMIES: Record<string, EnemyDef> = {
  // Esbirro (2 fases): bloquea la escalera del ático tras la práctica de Leo. Es un eco: al vencerlo da un escudo.
  [A2_10_MINION]: {
    id: A2_10_MINION,
    name: 'Eco del ático',
    person: 'Attic Echo',
    kind: 'minion',
    echo: true,
    hp: 6,
    topics: [TP],
    kinds: ['fill', 'fix', 'order', 'listen'],
    tags: ['a2-house-minion'],
    // Fase 1: participios · Fase 2: just / already / yet
    phases: [
      {
        hp: 3,
        title: 'Participios',
        topics: [TP],
        kinds: ['fill', 'fix', 'order', 'listen'],
        tags: ['a2-house-minion-part'],
        line: { text: 'I have went up! I have saw everything!', es: '¡Ya subí! ¡Lo he visto todo! (have went, have saw: mal).' },
      },
      {
        hp: 3,
        title: 'Just / already / yet',
        topics: [TP],
        kinds: ['fill', 'fix', 'order', 'listen'],
        tags: ['a2-house-minion-jay'],
        line: { text: "I haven't finished already! I have cleaned yet the boxes!", es: '¡Todavía no he terminado! ¡Ya limpié las cajas! (already y yet al revés: mal).' },
      },
    ],
    onlyTags: true,
    zone: 'casa-leo',
    look: { shirt: '#6b5a7a', hair: '#3a2a4a', skin: '#c9b8d8', gender: 'male' },
    before: [
      { text: 'Nobody goes up! I have tooked all the boxes!', es: '¡Nadie sube! ¡Me he llevado todas las cajas! (have tooked: mal).' },
      { text: 'You have never went to the past. You have forgot everything!', es: 'Nunca has ido al pasado. ¡Lo has olvidado todo! (have went, have forgot: mal).' },
    ],
    after: [
      { text: 'You have gone to the past… you have seen the light… Oh. My words are back.', es: 'Has ido al pasado… has visto la luz… Oh. Mis palabras volvieron.' },
      { text: 'Leo is upstairs. He has found an old chest.', es: 'Leo está arriba. Ha encontrado un baúl viejo.' },
    ],
    freed: { text: 'Leo is upstairs. Go!', es: 'Leo está arriba. ¡Ve!' },
    bonus: { q: 'Before I go! Have you ___ the stairs yet?', options: ['climbed', 'climb', 'climbing'], answer: 0, tip: 'Have + participio: climbed.' },
  },
  // Jefe (3 fases): aparece en el ático tras la reunión. No entrega fragmento: el reloj marca la señal de 2056.
  [A2_10_BOSS]: {
    id: A2_10_BOSS,
    name: 'El devorador de recuerdos',
    person: 'The Memory Eater',
    kind: 'boss',
    hp: 9,
    topics: [TP],
    kinds: ['fill', 'fix', 'order', 'listen'],
    tags: ['a2-house-boss'],
    // Fase 1: ever / never · Fase 2: just / already / yet · Fase 3: Present Perfect vs Past Simple
    phases: [
      {
        hp: 3,
        title: 'Ever / never',
        topics: [TP],
        kinds: ['fill', 'fix', 'order', 'listen'],
        tags: ['a2-house-boss-ever'],
        line: { text: 'Have you ever see a cart stop by itself? No, you have ever!', es: '¿Alguna vez has visto una carreta detenerse sola? ¡No, nunca! (ever see, have ever: mal).' },
      },
      {
        hp: 3,
        title: 'Just / already / yet',
        topics: [TP],
        kinds: ['fill', 'fix', 'order', 'listen'],
        tags: ['a2-house-boss-jay'],
        line: { text: 'I have eaten yet your clues! You have already not finished!', es: '¡Ya me comí tus pistas! ¡Todavía no has terminado! (yet y already mal usados).' },
      },
      {
        hp: 3,
        title: 'Present Perfect / Past Simple',
        topics: [TP],
        kinds: ['fill', 'fix', 'order', 'listen'],
        tags: ['a2-house-boss-pps'],
        line: { text: 'I have eaten your memories yesterday! You went never to the mill!', es: '¡Ayer me comí tus recuerdos! ¡Nunca fuiste al molino! (have eaten yesterday, went never: mal).' },
      },
    ],
    onlyTags: true,
    zone: 'casa-leo',
    look: { shirt: '#3a2a4a', hair: '#1a1024', skin: '#b8a8c8', gender: 'male' },
    before: [
      { text: 'You have find the clues… but I have eat them all!', es: 'Has encontrado las pistas… ¡pero me las he comido todas! (have find, have eat: mal).' },
      { text: 'Nobody have ever remember the cart. Nobody will!', es: 'Nadie ha recordado nunca la carreta. ¡Nadie lo hará! (have… remember: mal).' },
    ],
    after: [
      { text: 'You have remembered everything… the cart, the car, the wheel…', es: 'Has recordado todo… la carreta, el carro, la rueda…' },
      { text: 'The cart has waited a long time. It is still waiting… far away.', es: 'La carreta ha esperado mucho tiempo. Todavía espera… muy lejos.' },
    ],
    freed: { text: 'The cart is still waiting.', es: 'La carreta todavía espera.' },
    farewell: {
      q: 'Leo: Thank you! Have you found all the memories?',
      options: ['Yes, I have found all of them.', 'Yes, I have find all of them.', 'Yes, I has found all of them.'],
      answer: 0,
      tip: 'I + have + participio: find → found.',
    },
    release: {
      title: 'La señal',
      text: 'El devorador se deshace en polvo morado. No deja ningún fragmento… pero tu reloj vibra con fuerza: una señal late muy lejos, en 2056.',
    },
  },
}

export const A2_LEO_HOUSE: SceneDef = {
  id: A2_LEO_HOUSE_ID,
  name: 'La casa de Leo · A2',
  topics: [],
  map: MAP,
  start: { x: 7, y: 8 },
  // Sin puerta ni llaves: el esbirro y el jefe aparecen según el avance
  bossDoor: { x: 0, y: 0 },
  keysNeeded: 0,
  entities: [
    // Leo abajo (lección y práctica) y luego arriba, en el ático
    { type: 'npc', id: 'a2-10-leo', x: 5, y: 8 },
    { type: 'npc', id: 'a2-10-leo-up', x: 3, y: 3 },
    // La persona especial, junto al tablero de pistas
    { type: 'npc', id: 'a2-10-interest', x: 10, y: 2 },
    // El eco bloquea la escalera del ático tras la práctica
    { type: 'enemy', id: A2_10_MINION, x: 7, y: 6, after: A2_10_PRACTICE },
    // El devorador de recuerdos aparece en el ático tras la reunión
    { type: 'enemy', id: A2_10_BOSS, x: 9, y: 3, after: A2_10_MEETING },
  ],
  labels: [
    { text: 'Attic', x: 2, y: 2 },
    { text: 'Living room', x: 3, y: 8 },
  ],
  zoneAt,
  examine: {
    '1,3': { text: 'An old chest with six locks. Leo keeps the clues inside.', sub: 'Un baúl viejo con seis candados. Leo guarda las pistas adentro.', say: 'An old chest with six locks.' },
    '5,1': { text: 'The clue board: a race, a road, a mill.', sub: 'El tablero de pistas: una carrera, un camino, un molino.', say: 'The clue board.' },
    '8,1': { text: 'Three pictures: a cart, a car and a mill wheel. All of them have stopped.', sub: 'Tres dibujos: una carreta, un carro y una rueda de molino. Todos se han detenido.', say: 'All of them have stopped.', tone: 'warn' },
  },
  requirements: [],
  chips: (s) => [
    { label: 'A2-10 · Echoes Across Time', done: s.opened.includes(A2_10_CLOSE) },
    { label: 'Lección de Leo', done: s.seenLesson.includes(TP) },
    { label: 'Práctica', done: s.opened.includes(A2_10_PRACTICE) },
    { label: 'Esbirro: Eco del ático', done: s.defeated.includes(A2_10_MINION) },
    { label: 'The Memory Chest', done: s.opened.includes(A2_10_CHEST) },
    { label: 'Detective: el tablero', done: s.opened.includes(A2_10_DETECTIVE) },
    { label: 'El periódico viejo', done: s.opened.includes(A2_10_NEWS) },
    { label: 'Reunión', done: s.opened.includes(A2_10_MEETING) },
    { label: 'Jefe: El devorador de recuerdos', done: s.defeated.includes(A2_10_BOSS) },
    { label: 'Cierre con Leo', done: s.opened.includes(A2_10_CLOSE) },
  ],
  intro: {
    first: 'De vuelta en el presente, Leo te espera en su casa de Green Street. Es hora de juntar todo lo que han descubierto. Habla con Leo.',
    later: 'La casa de Leo en A2. Sigue los objetivos bajo el mapa.',
  },
}
