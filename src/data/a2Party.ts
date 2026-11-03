import type { EnemyDef, GameState, Question, SceneDef, Zone } from '../game/types'
import { A2_13_CLOSE } from './a2Return'

/**
 * Misión secundaria de A2 · "Make a Wish" (casa de Leo y su jardín, presente).
 * Cumpleaños sorpresa de la persona especial (Leo organiza). Sin fragmento ni pistas nuevas de "L".
 * Contenido: preferencias (would like / would rather / would prefer), deseos (I hope), primer condicional (Busuu cap. 31)
 *            y relaciones: cómo se conocieron, en pasado (cap. 4).
 * Orden: Leo (lección wishes-conditional + práctica) → Maya (DebateTalk: elegir con los invitados)
 *        → Leo en el jardín (Sequence Master: plan B) → la señora García (DebateTalk: ¿cómo se conocieron?)
 *        → Maya (duelo amistoso, 3 fases) → Leo (tarjeta de deseos, escribir) → la persona especial llega (cierre).
 * Se activa al terminar A2-13. Tareas en data/tasks.ts, lección en data/lessons.ts, combates en data/questions-a2-s3.ts.
 */
const MAP = [
  '################',
  '#L..A.....K...J#',
  '#p..A..........#',
  '#..............#',
  '#######d########',
  'f..............f',
  'fY....K.k.K...Yf',
  'f..............f',
  'f.H..........H.f',
  'fp............pf',
  'f..............f',
  'ffffffffffffffff',
]

function zoneAt(_x: number, y: number): Zone {
  return y <= 4 ? 'casa-leo' : 'parque'
}

export const A2_PARTY_ID = 'a2-s3-make-a-wish'
export const A2_S3_PRACTICE = 'a2-s3-practice'
export const A2_S3_CHOICES = 'a2-s3-choices'
export const A2_S3_PLAN_B = 'a2-s3-plan-b'
export const A2_S3_MEET = 'a2-s3-meet'
/** Duelo amistoso con Maya: aparece en el jardín tras la charla con la señora García */
export const A2_S3_DUEL = 'a2-s3-maya-duel'
export const A2_S3_CARD = 'a2-s3-card'
export const A2_S3_CLOSE = 'a2-s3-close'
/** Después de la fiesta (opcional, cap. 14): Leo enseña las tareas de la casa y la señora García reparte los turnos */
export const A2_S3_CLEANUP = 'a2-s3-cleanup'
export const A2_S3_CHORES = 'a2-s3-chores'

/** La misión secundaria se abre al terminar A2-13 */
export const isA2PartyUnlocked = (s: GameState) => s.opened.includes(A2_13_CLOSE)

/** Práctica guiada de Leo (lista fija en data/tasks.ts) */
const T = ['a2-wish']
const TP = 'wishes-conditional' as const
export const A2_PARTY_PRACTICE: Question[] = [
  { id: 'a2-s3-p1', topic: TP, prompt: "I'd like ___ some music for the party.", options: ['to play', 'play', 'playing'], answer: 0, tip: "I'd like + to + verbo: to play.", tags: T },
  { id: 'a2-s3-p2', topic: TP, prompt: "Would you rather ___ the cake now or later?", options: ['cut', 'to cut', 'cutting'], answer: 0, tip: 'would rather + verbo tal cual, sin to: cut.', tags: T },
  { id: 'a2-s3-p3', topic: TP, kind: 'fix', prompt: "If it will rain, we'll move inside.", options: ["If it rains, we'll move inside.", "If it rain, we'll move inside.", "If it rains, we move inside will."], answer: 0, tip: 'Después de if va el presente (rains), nunca will.', tags: T },
  { id: 'a2-s3-p4', topic: TP, prompt: "If the guests arrive late, we ___ start the games.", options: ["won't", "doesn't", "aren't"], answer: 0, tip: "Resultado negativo en el futuro: won't + verbo.", tags: T },
  { id: 'a2-s3-p5', topic: TP, kind: 'order', prompt: 'Espero que tengas un gran año.', options: ['I', 'hope', 'you', 'have', 'a', 'great', 'year.'], answer: 0, tip: 'I hope + you + verbo: I hope you have...', tags: T },
  { id: 'a2-s3-p6', topic: TP, prompt: "I'd ___ juice, please. I don't like soda.", options: ['prefer', 'rather', 'like to'], answer: 0, tip: "I'd prefer + cosa: I'd prefer juice.", tags: T },
  { id: 'a2-s3-p7', topic: TP, kind: 'order', prompt: '¿Qué harás si se cae el pastel?', options: ['What', 'will', 'you', 'do', 'if', 'the', 'cake', 'falls?'], answer: 0, tip: 'What + will + you + verbo + if + presente?', tags: T },
  // La tarjeta de deseos (se escriben enteras: T-a2-s3-w1 y T-a2-s3-w2 en la tarea de la tarjeta)
  { id: 'a2-s3-w1', topic: TP, kind: 'order', prompt: 'Escribe en la tarjeta: Espero que se cumplan todos tus deseos.', options: ['I', 'hope', 'all', 'your', 'wishes', 'come', 'true.'], answer: 0, tip: 'I hope + all your wishes + come true.', tags: T },
  { id: 'a2-s3-w2', topic: TP, kind: 'order', prompt: 'Escribe en la tarjeta: Si sonríes, el día será perfecto.', options: ['If', 'you', 'smile,', 'the', 'day', 'will', 'be', 'perfect.'], answer: 0, tip: 'If + presente (smile), will + verbo (will be).', tags: T },
  { id: 'a2-s3-w3', topic: TP, prompt: 'Happy birthday! I hope you ___ a wonderful day.', options: ['have', 'will to have', 'having'], answer: 0, tip: 'I hope + you + verbo: you have.', tags: T },
]

export const A2_PARTY_ENEMIES: Record<string, EnemyDef> = {
  // Duelo amistoso (3 fases): Maya propone un juego de preguntas. No es un enemigo: no castiga al perder.
  [A2_S3_DUEL]: {
    id: A2_S3_DUEL,
    name: 'Maya, la retadora',
    person: 'Maya',
    kind: 'trainer',
    duel: {
      lost: 'Maya: "Ha ha, again! It\'s just a party game." Vuelves a empezar con la vida llena.',
      won: 'Ganaste el juego de Maya. Recuperaste: deseos, preferencias y primer condicional. Habla con Leo para escribir la tarjeta.',
    },
    hp: 9,
    topics: [TP, 'past-simple'],
    kinds: ['fill', 'fix', 'order', 'listen'],
    tags: ['a2-wish-duel'],
    // Fase 1: preferencias y deseos · Fase 2: primer condicional · Fase 3: cómo se conocieron (pasado)
    phases: [
      {
        hp: 3,
        title: 'Would like / rather / hope',
        topics: [TP],
        kinds: ['fill', 'fix', 'order', 'listen'],
        tags: ['a2-wish-pref'],
        line: { text: 'Round one: what would you like? What would you rather do?', es: 'Ronda uno: ¿qué te gustaría? ¿Qué preferirías hacer?' },
      },
      {
        hp: 3,
        title: 'If…, will…',
        topics: [TP],
        kinds: ['fill', 'fix', 'order', 'listen'],
        tags: ['a2-wish-if'],
        line: { text: 'Round two: what will you do if...?', es: 'Ronda dos: ¿qué harás si...?' },
      },
      {
        hp: 3,
        title: 'How did you meet?',
        topics: ['past-simple'],
        kinds: ['fill', 'fix', 'order', 'listen'],
        tags: ['a2-wish-meet'],
        line: { text: 'Last round: love stories! How did people meet?', es: 'Última ronda: ¡historias de amor! ¿Cómo se conoció la gente?' },
      },
    ],
    onlyTags: true,
    zone: 'parque',
    look: { shirt: '#d4537e', hair: '#4a2c17', skin: '#c68642', gender: 'female' },
    before: [
      { text: "The party isn't ready yet, so... let's play a game! I ask, you answer.", es: 'La fiesta todavía no está lista, así que... ¡juguemos! Yo pregunto, tú respondes.' },
      { text: "If you win, I'll help Leo with the balloons. If you lose, we'll just play again!", es: 'Si ganas, ayudaré a Leo con los globos. ¡Si pierdes, simplemente jugaremos otra vez!' },
    ],
    after: [
      { text: "You win! OK, OK, I'll help with the balloons.", es: '¡Ganaste! Bueno, bueno, ayudaré con los globos.' },
      { text: 'Go and talk to Leo. He has the birthday card.', es: 'Ve a hablar con Leo. Él tiene la tarjeta de cumpleaños.' },
    ],
    freed: { text: 'I hope the surprise works!', es: '¡Espero que la sorpresa funcione!' },
  },
}

export const A2_PARTY: SceneDef = {
  id: A2_PARTY_ID,
  name: 'Fiesta en casa de Leo',
  topics: [],
  map: MAP,
  start: { x: 7, y: 3 },
  // Sin puerta ni llaves: el duelo aparece según el avance
  bossDoor: { x: 0, y: 0 },
  keysNeeded: 0,
  entities: [
    // Leo en la sala (lección y práctica) y luego en el jardín (plan B y tarjeta)
    { type: 'npc', id: 'a2-s3-leo', x: 9, y: 2 },
    { type: 'npc', id: 'a2-s3-leo-garden', x: 8, y: 7 },
    // Invitados: Maya y la señora García (mamá de Leo)
    { type: 'npc', id: 'a2-s3-maya', x: 3, y: 7 },
    { type: 'npc', id: 'a2-s3-garcia', x: 12, y: 9 },
    // Maya reta al duelo tras la charla con la señora García
    { type: 'enemy', id: A2_S3_DUEL, x: 5, y: 9, after: A2_S3_MEET },
    // La persona especial llega cuando la tarjeta está lista; tras la sorpresa queda como amiga (momento de amistad de A2)
    { type: 'npc', id: 'a2-s3-interest', x: 5, y: 5 },
    { type: 'interest', x: 5, y: 5, after: A2_S3_CLOSE },
  ],
  labels: [
    { text: 'Living room', x: 3, y: 3 },
    { text: 'Garden', x: 3, y: 10 },
  ],
  zoneAt,
  examine: {
    '8,6': { text: 'A birthday cake with candles. Nobody can touch it yet!', sub: 'Un pastel de cumpleaños con velas. ¡Nadie puede tocarlo todavía!', say: 'Nobody can touch it yet!' },
    '6,6': { text: 'Plates, cups and a big bowl of fruit.', sub: 'Platos, vasos y un gran tazón de fruta.', say: 'Plates, cups and fruit.' },
    '10,6': { text: 'A pile of presents with colorful paper.', sub: 'Un montón de regalos con papel de colores.', say: 'A pile of presents.' },
  },
  requirements: [],
  chips: (s) => [
    { label: 'Make a Wish', done: s.opened.includes(A2_S3_CLOSE) },
    { label: 'Lección de Leo', done: s.seenLesson.includes(TP) },
    { label: 'Práctica', done: s.opened.includes(A2_S3_PRACTICE) },
    { label: 'Elegir con Maya', done: s.opened.includes(A2_S3_CHOICES) },
    { label: 'Plan B', done: s.opened.includes(A2_S3_PLAN_B) },
    { label: 'La señora García', done: s.opened.includes(A2_S3_MEET) },
    { label: 'Duelo con Maya', done: s.defeated.includes(A2_S3_DUEL) },
    { label: 'Tarjeta de deseos', done: s.opened.includes(A2_S3_CARD) },
    { label: '¡Sorpresa!', done: s.opened.includes(A2_S3_CLOSE) },
    { label: 'Extra: recoger la fiesta', done: s.opened.includes(A2_S3_CLEANUP) },
    { label: 'Extra: ¿a quién le toca?', done: s.opened.includes(A2_S3_CHORES) },
  ],
  intro: {
    first: 'Leo te escribió: "Come to my house. It\'s a secret!" Hoy es el cumpleaños de {iname}, y Leo prepara una fiesta sorpresa. Habla con Leo en la sala.',
    later: 'La fiesta sorpresa en casa de Leo. Sigue los objetivos bajo el mapa.',
  },
}
