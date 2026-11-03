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
 *        Dialogue Under Pressure) → Leo (Detective: el tablero de A2, Reconstruct) → The Silence (jefe, 2 fases)
 *        → el desconocido (segundo round, como en A1: se le hace retroceder, no se le vence) → Leo (examen de A2) → Leo (cierre: el núcleo se ilumina, "Be brave. Use your voice." y la pregunta para B1).
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
/** Segundo round contra el desconocido (el primero fue en la torre, al final de A1): aparece tras vencer a The Silence */
export const A2_13_STRANGER = 'a2-13-stranger'
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
    kinds: ['fill', 'fix', 'order', 'listen'],
    tags: ['a2-return-minion'],
    // Fase 1: síntomas (What's the matter? I've got… hurts) · Fase 2: consejos (should / shouldn't)
    phases: [
      {
        hp: 3,
        title: 'Síntomas',
        topics: [TP],
        kinds: ['fill', 'fix', 'order', 'listen'],
        tags: ['a2-return-minion-ill'],
        line: { text: 'My head hurt me! I am got a cough! What is the matters?', es: '¡Me duele la cabeza! ¡Tengo tos! ¿Qué pasa? (hurt me, am got, the matters: mal).' },
      },
      {
        hp: 3,
        title: 'Consejos',
        topics: [TP],
        kinds: ['fill', 'fix', 'order', 'listen'],
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
  // Jefe de A2-13 (2 fases): The Silence. No es el desconocido: es el silencio que deja la luz morada.
  // Al vencerlo deja el último fragmento de A2, y aparece el desconocido (segundo round) para llevárselo.
  [A2_13_BOSS]: {
    id: A2_13_BOSS,
    name: 'The Silence',
    person: 'The Silence',
    kind: 'boss',
    hp: 6,
    topics: [TP],
    kinds: ['fill', 'fix', 'order', 'listen'],
    tags: ['a2-return-boss'],
    phases: [
      {
        hp: 3,
        title: 'Síntomas',
        topics: [TP],
        kinds: ['fill', 'fix', 'order', 'listen'],
        tags: ['a2-return-boss-health', 'a2-return-minion-ill'],
        line: { text: 'Your friend have lose his voice. His throat hurt him!', es: 'Tu amigo ha perdido la voz. ¡Le duele la garganta! (have lose, hurt him: mal).' },
      },
      {
        hp: 3,
        title: 'Consejos y emergencias',
        topics: [TP],
        kinds: ['fill', 'fix', 'order', 'listen'],
        tags: ['a2-return-boss-health', 'a2-return-minion-advice'],
        line: { text: 'You should to give up! Nobody must to call for help!', es: '¡Deberías rendirte! ¡Nadie debe pedir ayuda! (should to, must to: mal).' },
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
    farewell: {
      q: 'Doctor: You did it! How do you feel now?',
      options: ['I feel much better, thank you.', 'I feel much more good, thank you.', 'I am feel better, thank you.'],
      answer: 0,
      tip: 'good → better (irregular) · I feel, sin am.',
    },
    release: {
      title: '¡El último fragmento de A2!',
      text: 'The Silence se deshace en luz morada y deja un fragmento en el suelo. Lo tomas justo a tiempo: al fondo del pasillo aparece un hombre con un abrigo oscuro. Quiere el fragmento.',
    },
  },
  // Segundo round contra el desconocido (como en la torre de A1): repaso de A2 en pasado, presente y futuro.
  // Se le hace retroceder, pero no se le vence. No revela quién es: eso se reserva para B2.
  // Su frase final anuncia el incendio de B1 ("you said nothing"), que el protagonista todavía no puede entender.
  [A2_13_STRANGER]: {
    id: A2_13_STRANGER,
    name: 'El hombre del abrigo oscuro',
    person: '???',
    kind: 'boss',
    standoff: true,
    onlyTags: true,
    zone: 'lobby-torre',
    hp: 12,
    topics: ['past-simple-continuous', 'superlatives-comparatives-race', 'present-perfect', 'future-plans'],
    kinds: ['fill', 'fix', 'order', 'listen'],
    tags: ['a2-car-boss', 'a2-car-minion', 'a2-race-boss', 'a2-house-boss', 'a2-control-boss'],
    phases: [
      { hp: 4, title: 'The Past', topics: ['past-simple-continuous'], kinds: ['fill', 'fix', 'order', 'listen'], tags: ['a2-car-boss', 'a2-car-minion'] },
      {
        hp: 4,
        title: 'The Present',
        topics: ['superlatives-comparatives-race', 'present-perfect'],
        kinds: ['fill', 'fix', 'order', 'listen'],
        tags: ['a2-race-boss', 'a2-house-boss'],
        line: { text: 'You have learned a lot. But have you ever used your voice when it really mattered?', es: 'Has aprendido mucho. Pero ¿alguna vez has usado tu voz cuando de verdad importaba?' },
      },
      {
        hp: 4,
        title: 'The Future',
        topics: ['future-plans'],
        kinds: ['fill', 'fix', 'order', 'listen'],
        tags: ['a2-control-boss'],
        line: { text: 'And one day, when someone needs you… will you speak? Or will you stay silent?', es: 'Y un día, cuando alguien te necesite… ¿vas a hablar? ¿O te vas a quedar callado?' },
      },
    ],
    // La misma sombra de A1: abrigo oscuro, la cara en penumbra
    look: { shirt: '#2d2440', hair: '#15111f', skin: '#5b5070' },
    before: [
      { text: 'Hi, hi… We meet again.', es: 'Hola, hola… Nos volvemos a ver.' },
      { text: 'That fragment is mine. Give it to me… or answer me, if you can.', es: 'Ese fragmento es mío. Dámelo… o respóndeme, si puedes.' },
    ],
    after: [
      { text: 'You had a voice… and you said nothing.', es: 'Tenías voz… y no dijiste nada.' },
      { text: '(He looks at Leo for a long moment. Then he disappears in a purple cloud.)', es: '(Mira a Leo durante un largo momento. Luego desaparece en una nube morada).' },
    ],
    freed: { text: 'The hallway is quiet again. The fragment is still in your hand.', es: 'El pasillo vuelve a estar en calma. El fragmento sigue en tu mano.' },
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
    // El desconocido (segundo round) aparece en el pasillo cuando The Silence ya fue vencido
    { type: 'enemy', id: A2_13_STRANGER, x: 17, y: 13, after: A2_13_BOSS },
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
