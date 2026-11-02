import type { EnemyDef, GameState, Question, SceneDef } from '../game/types'
import { A2_12_CLOSE } from './a2Control'
import { HOSPITAL_MAP, hospitalZoneAt } from './a2Hospital'

/**
 * A2-13 — The Missing Voice (presente, de vuelta al hospital de A2-01). Sigue al cierre de A2-12 ("We're going back").
 * El hospital está en silencio: la luz morada les quita la voz a todos, y Leo se va quedando ronco hasta perderla.
 * Contenido (caps. 28–31): salud y síntomas (What's the matter? I've got… My… hurts), consejos (repaso de should / must,
 * ya vistos en A2-02) y la llamada de emergencia. Cierra A2 con un jefe final de 4 fases (repaso) y el examen escrito de A2.
 * Orden: Leo (lección health-emergency + práctica) → el paciente silenciado (esbirro, 2 fases, bloquea la recepción)
 *        → la recepcionista (notas escritas: lectura) → la médica (DebateTalk) → la persona especial (llamada de emergencia,
 *        Dialogue Under Pressure) → Leo (Detective: el tablero de A2, Reconstruct) → The Silence (jefe final, 4 fases)
 *        → Leo (examen de A2) → Leo (cierre: el núcleo se ilumina, "Be brave. Use your voice." y la pregunta para B1).
 * Reutiliza el mapa del hospital de A2-01 como escena aparte, para no mezclar sus personajes con los de A2-01/02.
 * Se activa al terminar A2-12. Tareas en data/tasks.ts, lección en data/lessons.ts, combates en data/questions-a2-13.ts.
 */
export const A2_RETURN_ID = 'a2-13-missing-voice'
export const A2_13_PRACTICE = 'a2-13-practice'
/** Esbirro: el paciente silenciado, en la puerta de la recepción tras la práctica de Leo */
export const A2_13_MINION = 'a2-13-silenced'
export const A2_13_NOTES = 'a2-13-notes'
export const A2_13_DOCTOR = 'a2-13-doctor'
export const A2_13_CALL = 'a2-13-call'
export const A2_13_BOARD = 'a2-13-board'
/** Jefe final de A2: The Silence, en el pasillo, tras el tablero */
export const A2_13_BOSS = 'a2-13-the-silence'
export const A2_13_EXAM = 'a2-13-exam'
export const A2_13_CLOSE = 'a2-13-close'

/** A2-13 se abre al terminar A2-12 */
export const isA2ReturnUnlocked = (s: GameState) => s.opened.includes(A2_12_CLOSE)

/** Práctica guiada de Leo (lista fija en data/tasks.ts) */
const T = ['a2-return']
const TP = 'health-emergency' as const
export const A2_RETURN_PRACTICE: Question[] = [
  { id: 'a2-13-p1', topic: TP, prompt: "What's the ___? — I've got a headache.", options: ['matter', 'problem to', 'wrong'], answer: 0, tip: "Preguntar qué le pasa a alguien: What's the matter?", tags: T },
  { id: 'a2-13-p2', topic: TP, prompt: "I ___ a sore throat. I can't speak very well.", options: ['have got', 'am got', 'has got'], answer: 0, tip: 'Con I: have got (I\'ve got).', tags: T },
  { id: 'a2-13-p3', topic: TP, prompt: 'My back ___. I can\'t sit down.', options: ['hurts', 'hurt me', 'is hurt to'], answer: 0, tip: 'Una parte del cuerpo + hurts (con -s: my back hurts).', tags: T },
  { id: 'a2-13-p4', topic: TP, kind: 'fix', prompt: 'She has got a fever and she feel dizzy.', options: ['She has got a fever and she feels dizzy.', 'She has got a fever and she feeling dizzy.', 'She have got a fever and she feel dizzy.'], answer: 0, tip: 'Con she: feels (presente con -s).', tags: T },
  { id: 'a2-13-p5', topic: TP, prompt: 'You have a cold. You ___ stay in bed and drink water.', options: ['should', 'should to', 'shoulds'], answer: 0, tip: 'Consejo: should + verbo base, sin to.', tags: T },
  { id: 'a2-13-p6', topic: TP, kind: 'order', prompt: 'Necesito una ambulancia, por favor.', options: ['I', 'need', 'an', 'ambulance,', 'please.'], answer: 0, tip: 'En una emergencia: I need an ambulance.', tags: T },
  { id: 'a2-13-p7', topic: TP, prompt: "What's your emergency? — My friend ___ his voice. He can't speak.", options: ['has lost', 'has lose', 'is lost'], answer: 0, tip: 'Algo que acaba de pasar y se nota ahora: has lost.', tags: T },
  { id: 'a2-13-p8', topic: TP, prompt: "Where ___ you now? — We're in the hospital, on the second floor.", options: ['are', 'is', 'do'], answer: 0, tip: 'Dar la ubicación: Where are you? We are in…', tags: T },
]

const LOOK_SILENCE = { shirt: '#1a1424', hair: '#5a3a7a', skin: '#c9b8d8' }

export const A2_RETURN_ENEMIES: Record<string, EnemyDef> = {
  // Esbirro (2 fases): una paciente a la que la luz morada le cambió las palabras. Es un eco: al vencerla da un escudo.
  [A2_13_MINION]: {
    id: A2_13_MINION,
    name: 'La paciente silenciada',
    person: 'Mrs. Lane',
    kind: 'minion',
    echo: true,
    hp: 6,
    topics: [TP],
    kinds: ['fill', 'fix', 'order'],
    tags: ['a2-return-minion'],
    // Fase 1: síntomas (What's the matter? I've got… hurts) · Fase 2: consejos (should / shouldn't)
    phases: [
      {
        hp: 3,
        title: 'Síntomas',
        topics: [TP],
        kinds: ['fill', 'fix', 'order'],
        tags: ['a2-return-minion-ill'],
        line: { text: 'My head hurt me! I am got a cough! What is the matters?', es: '¡Me duele la cabeza! ¡Tengo tos! ¿Qué pasa? (hurt me, am got, the matters: mal).' },
      },
      {
        hp: 3,
        title: 'Consejos',
        topics: [TP],
        kinds: ['fill', 'fix', 'order'],
        tags: ['a2-return-minion-advice'],
        line: { text: 'You should to run! You shouldn\'t rests! Everybody must to be quiet!', es: '¡Deberías correr! ¡No deberías descansar! ¡Todos deben estar callados! (should to, shouldn\'t rests, must to: mal).' },
      },
    ],
    onlyTags: true,
    zone: 'recepcion',
    look: { shirt: '#9fb7c9', hair: '#8a7a6a', skin: '#c9b8d8', gender: 'female' },
    before: [
      { text: 'Shhh! Nobody speaks in this hospital now. Nobody!', es: '¡Shhh! Ahora nadie habla en este hospital. ¡Nadie!' },
      { text: "You are sick? Good! You should to stay sick! I'm got the best advice!", es: '¿Estás enfermo? ¡Bien! ¡Deberías seguir enfermo! ¡Tengo el mejor consejo! (should to, I\'m got: mal).' },
    ],
    after: [
      { text: "Oh… my throat. It hurts a lot. I've got a terrible sore throat.", es: 'Oh… mi garganta. Me duele mucho. Tengo un dolor de garganta terrible.' },
      { text: 'I was in the waiting room. A purple light came from the hallway, and everybody stopped talking.', es: 'Estaba en la sala de espera. Una luz morada vino del pasillo y todos dejaron de hablar.' },
    ],
    freed: { text: 'The receptionist saw everything. She can\'t speak, but she can write.', es: 'La recepcionista lo vio todo. No puede hablar, pero puede escribir.' },
    bonus: { q: "Before you go! You've got a sore throat. You ___ shout.", options: ["shouldn't", 'should', "don't should"], answer: 0, tip: "Un mal consejo para la garganta: shouldn't." },
  },
  // Jefe final de A2 (4 fases de repaso): The Silence. No es el desconocido: es el silencio que deja la luz morada.
  // Al vencerlo entrega el último fragmento de A2; el núcleo del reloj se ilumina pero no se completa.
  [A2_13_BOSS]: {
    id: A2_13_BOSS,
    name: 'The Silence',
    person: 'The Silence',
    kind: 'boss',
    hp: 12,
    topics: ['past-simple-continuous', 'superlatives-comparatives-race', 'present-perfect', 'future-plans', TP],
    kinds: ['fill', 'fix', 'order'],
    tags: ['a2-return-boss'],
    phases: [
      {
        hp: 3,
        title: 'El pasado: Past Simple y Past Continuous',
        topics: ['past-simple-continuous'],
        kinds: ['fill', 'fix', 'order'],
        tags: ['a2-car-boss', 'a2-car-minion'],
        line: { text: 'The cart was stop when the light hitted it… while you sleeping!', es: 'La carreta se detenía cuando la luz la golpeó… ¡mientras dormías! (was stop, hitted, you sleeping: mal).' },
      },
      {
        hp: 3,
        title: 'Comparar y Present Perfect',
        topics: ['superlatives-comparatives-race', 'present-perfect'],
        kinds: ['fill', 'fix', 'order'],
        tags: ['a2-race-boss', 'a2-house-boss'],
        line: { text: 'I am more strong than you! I have took the most quietest voices!', es: '¡Soy más fuerte que tú! ¡Me he llevado las voces más calladas! (more strong, have took, most quietest: mal).' },
      },
      {
        hp: 3,
        title: 'Planes: will, going to y presente continuo',
        topics: ['future-plans'],
        kinds: ['fill', 'fix', 'order'],
        tags: ['a2-control-boss'],
        line: { text: 'Tomorrow I will to take every voice. Nobody going to speak again!', es: 'Mañana me llevaré cada voz. ¡Nadie va a volver a hablar! (will to take, nobody going to: mal).' },
      },
      {
        hp: 3,
        title: 'Salud y emergencias',
        topics: [TP],
        kinds: ['fill', 'fix', 'order'],
        tags: ['a2-return-boss-health'],
        line: { text: 'Your friend have lose his voice. You should to give up!', es: 'Tu amigo ha perdido la voz. ¡Deberías rendirte! (have lose, should to: mal).' },
      },
    ],
    onlyTags: true,
    zone: 'lobby-torre',
    look: LOOK_SILENCE,
    before: [
      { text: '…', es: '(No dice nada. Todo el pasillo se queda en silencio).' },
      { text: 'Shhh. Every word you have learned… I am going to take it. Every one.', es: 'Shhh. Cada palabra que has aprendido… me la voy a llevar. Cada una.' },
    ],
    after: [
      { text: 'Impossible… You remember everything. The past, the future… every word.', es: 'Imposible… Lo recuerdas todo. El pasado, el futuro… cada palabra.' },
      { text: 'Keep it, then. But a voice is not only words…', es: 'Quédatelo, entonces. Pero una voz no son solo palabras…' },
    ],
    freed: { text: 'The purple light is gone. You can hear people talking in every room.', es: 'La luz morada se fue. Se oye a la gente hablar en cada habitación.' },
    release: {
      title: '¡El último fragmento de A2!',
      text: 'The Silence se deshace en luz morada y deja un fragmento en el suelo. Al tomarlo, el centro vacío de tu reloj se ilumina por primera vez… pero no se llena del todo. En el pasillo, alguien tose: es Leo.',
    },
  },
}

export const A2_RETURN: SceneDef = {
  id: A2_RETURN_ID,
  name: 'El hospital · A2-13',
  topics: [],
  map: HOSPITAL_MAP,
  start: { x: 10, y: 13 },
  // Sin puerta ni llaves: el esbirro y el jefe aparecen según el avance
  bossDoor: { x: 0, y: 0 },
  keysNeeded: 0,
  entities: [
    // Pasillo: Leo (lección), y después Leo con la voz cada vez más débil (tablero, examen y cierre)
    { type: 'npc', id: 'a2-13-leo', x: 12, y: 13 },
    { type: 'npc', id: 'a2-13-leo-hall', x: 6, y: 13 },
    // Recepción: la recepcionista que no puede hablar (notas escritas)
    { type: 'npc', id: 'a2-13-receptionist', x: 16, y: 3 },
    // Habitación: la médica (DebateTalk) y la persona especial (la llamada de emergencia)
    { type: 'npc', id: 'a2-13-doctor', x: 4, y: 4 },
    { type: 'npc', id: 'a2-13-interest', x: 6, y: 6 },
    // La paciente silenciada bloquea la entrada de la recepción tras la práctica
    { type: 'enemy', id: A2_13_MINION, x: 16, y: 10, after: A2_13_PRACTICE },
    // The Silence aparece al fondo del pasillo tras el tablero
    { type: 'enemy', id: A2_13_BOSS, x: 19, y: 13, after: A2_13_BOARD },
  ],
  labels: [
    { text: 'Habitación', x: 6, y: 1 },
    { text: 'Recepción', x: 16, y: 1 },
    { text: 'Pasillo', x: 11, y: 14 },
  ],
  zoneAt: hospitalZoneAt,
  examine: {
    '1,3': { text: 'Your old bed. Everything started here.', sub: 'Tu antigua cama. Todo empezó aquí.', say: 'Everything started here.' },
    '1,1': { text: 'There is a purple light in the window. The city is very quiet.', sub: 'Hay una luz morada en la ventana. La ciudad está muy callada.', say: 'The city is very quiet.', tone: 'warn' },
    '10,1': { text: 'There is a purple light in the window. The city is very quiet.', sub: 'Hay una luz morada en la ventana. La ciudad está muy callada.', say: 'The city is very quiet.', tone: 'warn' },
    '1,2': { text: 'Your medical record. Somebody has written: "Patient lost his voice. Cause: unknown."', sub: 'Tu expediente médico. Alguien escribió: "El paciente perdió la voz. Causa: desconocida".', say: 'Cause: unknown.', tone: 'warn' },
  },
  requirements: [],
  chips: (s) => [
    { label: 'A2-13 · The Missing Voice', done: s.opened.includes(A2_13_CLOSE) },
    { label: 'Lección de Leo', done: s.seenLesson.includes(TP) },
    { label: 'Práctica', done: s.opened.includes(A2_13_PRACTICE) },
    { label: 'Esbirro: la paciente silenciada', done: s.defeated.includes(A2_13_MINION) },
    { label: 'Las notas de la recepcionista', done: s.opened.includes(A2_13_NOTES) },
    { label: 'La médica', done: s.opened.includes(A2_13_DOCTOR) },
    { label: 'Llamada de emergencia', done: s.opened.includes(A2_13_CALL) },
    { label: 'Detective: el tablero de A2', done: s.opened.includes(A2_13_BOARD) },
    { label: 'Jefe final: The Silence', done: s.defeated.includes(A2_13_BOSS) },
    { label: 'Examen de A2', done: s.opened.includes(A2_13_EXAM) },
    { label: 'Cierre', done: s.opened.includes(A2_13_CLOSE) },
  ],
  intro: {
    first: 'Vuelves al hospital donde empezó A2. Está en completo silencio: nadie habla y hay luz morada en las ventanas. Leo te espera en el pasillo… y su voz suena ronca.',
    later: 'El hospital en A2-13. Sigue los objetivos bajo el mapa.',
  },
}
