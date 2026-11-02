import type { EnemyDef, GameState, SceneDef, Zone } from '../game/types'

/**
 * A2-01 — A New Beginning. Habitación del hospital donde despierta el protagonista justo después del final de A1.
 * Primera versión: solo la habitación explorable (sin personajes, diálogos ni enemigos todavía).
 * Leyenda nueva:  5  cama de hospital
 * Tu cama (1,3), la mesa de noche (1,4, mesa K), el expediente médico (1,2, gabinete F) y las ventanas se pueden examinar.
 * Una sola escena con tres zonas: la habitación (arriba a la izquierda, como en la primera versión), la recepción
 * (arriba a la derecha) y el pasillo que las une (abajo). Se amplió solo hacia la derecha y hacia abajo,
 * así las posiciones de la habitación guardadas antes siguen siendo válidas.
 * Personajes: la médica y la persona especial (habitación), tu amigo (pasillo), la recepcionista y, en A2-02, Leo.
 * Sus tareas están en data/tasks.ts. Un solo combate (el eco corrompido), después de la lección de Leo.
 */
export const HOSPITAL_MAP = [
  '######################',
  '#W...##...W#.p.....p.#',
  '#F.....p...#..CCCCC..#',
  '#5.........#.........#',
  '#K.........#.........#',
  '#..........#.H.....H.#',
  '#5.........#.H.....H.#',
  '#5.........#.........#',
  '#........A.#.........#',
  '#p.......A.#.p.....p.#',
  '#....d.....#.........#',
  '#####d##########d#####',
  '#....................#',
  '#..p.....H....H...p..#',
  '#....................#',
  '######################',
]
/** Se reutilizan pisos existentes para no ampliar las zonas */
export function hospitalZoneAt(x: number, y: number): Zone {
  if (y >= 12) return 'lobby-torre'
  if (x >= 12) return 'recepcion'
  return 'aula-futuro'
}

/** Al hablar con la médica, el protagonista descubre que el centro del reloj está vacío */
export const A2_CORE_MISSING = 'a2-01-doctor'
export const clockCoreMissing = (s: GameState) => s.opened.includes(A2_CORE_MISSING)

/**
 * A2-02 — Pieces of Yesterday: recuerdos breves → llega Leo → lección → práctica → combate.
 * Leo aparece cuando la persona especial lo llama (al cerrar los recuerdos, `a2-02-pieces`) y su llegada es `a2-02-leo`.
 */
export const A2_LEO_CALLED = 'a2-02-pieces'
export const A2_LEO_ARRIVED = 'a2-02-leo'
export const A2_PRACTICE_DONE = 'a2-02-practice'
export const A2_ECHO = 'a2-echo'

const A2_02_CHIPS = (s: GameState) => [
  { label: 'A2-02 · Pieces of Yesterday', done: s.defeated.includes(A2_ECHO) },
  { label: 'Something Is Missing', done: s.opened.includes('a2-02-missing') },
  { label: 'The Elevator', done: s.opened.includes('a2-02-elevator') },
  { label: 'The Stranger', done: s.opened.includes('a2-02-stranger') },
  { label: 'The Missing Core', done: s.opened.includes('a2-02-core') },
  { label: 'Comparing Memories', done: s.opened.includes('a2-02-compare') },
  { label: 'Llamar a Leo', done: s.opened.includes(A2_LEO_CALLED) },
  { label: 'Leo llega', done: s.opened.includes(A2_LEO_ARRIVED) },
  { label: 'Lección de Leo', done: s.seenLesson.includes('should-must') },
  { label: 'Práctica', done: s.opened.includes(A2_PRACTICE_DONE) },
  { label: 'El eco', done: s.defeated.includes(A2_ECHO) },
]

/**
 * El único combate del hospital: un paciente al que la luz morada dejó corrompido.
 * Aparece después de la lección y la práctica de Leo, y pregunta sobre lo mismo (should / must / have to).
 * Es un eco: al vencerlo vuelve a ser él mismo (desaparece del mapa) y da un escudo.
 */
export const A2_HOSPITAL_ENEMIES: Record<string, EnemyDef> = {
  [A2_ECHO]: {
    id: A2_ECHO,
    name: 'Un eco corrompido',
    person: 'Mr. Reed',
    kind: 'minion',
    echo: true,
    hp: 5,
    topics: ['should-must'],
    kinds: ['fill', 'fix', 'order', 'listen', 'write'],
    tags: ['a2-hospital'],
    onlyTags: true,
    look: { shirt: '#9fb7c9', hair: '#5a5a5a', skin: '#c9b8d8' },
    before: [
      { text: 'You must to stay here! You should drinks the purple water! Nobody have to leave!', es: '¡Tienes que quedarte aquí! ¡Deberías tomar el agua morada! ¡Nadie tiene que irse! (Todo lo dice mal: must to, should drinks, nobody have to).' },
      { text: 'Doctors give bad advice. I give the best advice! Listen to me!', es: 'Los médicos dan malos consejos. ¡Yo doy los mejores! ¡Escúchame!' },
    ],
    after: [
      { text: 'You must rest... You should drink water... Oh. My head! I have a terrible headache.', es: 'Debes descansar... Deberías tomar agua... Oh. ¡Mi cabeza! Tengo un dolor de cabeza terrible.' },
      { text: 'Where am I? I was in the waiting room, and then... a purple light. Thank you. I should go back to my room.', es: '¿Dónde estoy? Estaba en la sala de espera y luego... una luz morada. Gracias. Debería volver a mi habitación.' },
    ],
    freed: { text: "I have to rest now. The nurse says I mustn't walk fast!", es: 'Ahora tengo que descansar. ¡La enfermera dice que no debo caminar rápido!' },
    bonus: { q: 'Before you go! You have a sore throat. You ___ drink cold soda.', options: ["shouldn't", 'should', "don't should"], answer: 0, tip: "Un mal consejo para la garganta: shouldn't." },
  },
}

export const A2_HOSPITAL: SceneDef = {
  id: 'a2-hospital',
  name: 'Hospital · Habitación',
  topics: [],
  map: HOSPITAL_MAP,
  start: { x: 2, y: 3 },
  // Sin jefe todavía: la puerta del jefe apunta a un muro y no hace falta ninguna llave
  bossDoor: { x: 0, y: 0 },
  keysNeeded: 0,
  entities: [
    { type: 'npc', id: 'a2-doctor', x: 4, y: 4 },
    { type: 'npc', id: 'a2-friend', x: 7, y: 13 },
    { type: 'npc', id: 'a2-receptionist', x: 16, y: 3 },
    // La persona especial te trajo al hospital: está en tu habitación desde el principio
    { type: 'npc', id: 'a2-interest', x: 6, y: 6 },
    // Leo llega al pasillo cuando la persona especial lo llama
    { type: 'npc', id: 'a2-leo', x: 15, y: 12 },
    // El único combate: aparece después de la lección y la práctica de Leo
    { type: 'enemy', id: A2_ECHO, x: 19, y: 14, after: A2_PRACTICE_DONE },
  ],
  labels: [
    { text: 'Habitación', x: 6, y: 1 },
    { text: 'Recepción', x: 16, y: 1 },
    { text: 'Pasillo', x: 11, y: 14 },
  ],
  zoneAt: hospitalZoneAt,
  examine: {
    '1,3': { text: 'You are in a hospital bed. Your body is still recovering.', sub: 'Estás en una cama de hospital. Tu cuerpo todavía se está recuperando.', say: 'You are in a hospital bed. Your body is still recovering.' },
    '1,4': { text: 'There is a small table beside your bed.', sub: 'Hay una mesita junto a tu cama.', say: 'There is a small table beside your bed.' },
    '1,2': { text: 'This medical record belongs to you.', sub: 'Este expediente médico es tuyo.', say: 'This medical record belongs to you.', tone: 'warn' },
    '1,1': { text: 'You can see the city through the window.', sub: 'Puedes ver la ciudad por la ventana.', say: 'You can see the city through the window.' },
    '10,1': { text: 'You can see the city through the window.', sub: 'Puedes ver la ciudad por la ventana.', say: 'You can see the city through the window.' },
  },
  requirements: [],
  // Al terminar A2-01 se muestran los objetivos de A2-02
  chips: (s) => s.opened.includes('a2-01-belongings') ? A2_02_CHIPS(s) : [
    { label: 'A2-01 · A New Beginning', done: s.opened.includes('a2-01-belongings') },
    { label: 'Médica', done: s.opened.includes('a2-01-doctor') },
    { label: 'Tu amigo', done: s.opened.includes('a2-01-friend') },
    { label: 'One More Round!', done: s.opened.includes('a2-01-round') },
    { label: 'Pertenencias', done: s.opened.includes('a2-01-belongings') },
  ],
  intro: {
    first: 'Abres los ojos en la habitación de un hospital. Todo terminó en la torre Green Valley... ¿o no? Muévete un poco para despertarte: la médica está junto a tu cama, y {iname} te acompaña.',
    later: 'El hospital: tu habitación, el pasillo y la recepción. Sigue los objetivos bajo el mapa.',
  },
}
