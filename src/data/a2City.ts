import type { EnemyDef, GameState, SceneDef, Zone } from '../game/types'
import { A2_ECHO } from './a2Hospital'

/**
 * A2-03 — Day in the City (alcance mínimo). Copia ligera del mapa de la ciudad de A1, sin jefe ni llaves.
 * Orden: Leo (llega) → Leo (lección + práctica) → tu amigo (invitación al café) → la turista corrompida (esbirro en la puerta del café)
 *        → el mesero (charla con presión)
 *        → el eco del café (combate en 2 fases) → tu amigo (Sequence Master: plan del día) → tu amigo (cierre con anomalía).
 * Se activa al vencer el eco del hospital (A2-02). Tareas en data/tasks.ts.
 */
const MAP = [
  '################',
  'W.K.K.#R.R.R.R.W',
  '#.....#........#',
  'WCC.K.#Q.R.R.R.W',
  '#.....#........#',
  '##d#######d#####',
  '#______________#',
  '#=====zz=======#',
  '#=====zz=====U=#',
  '#______________#',
  '#P__Y______#####',
  '#______NN__#OOp#',
  '#__H___NN__d...#',
  '#_Y________#...#',
  '#______H___#...#',
  '################',
]

function zoneAt(x: number, y: number): Zone {
  if (y <= 5) return x <= 6 ? 'cafe' : 'tienda'
  if (y >= 10 && x >= 11) return 'turismo'
  return 'calle'
}

export const A2_CITY_ID = 'a2-03-city'
export const A2_03_ARRIVE = 'a2-03-arrive'
export const A2_03_PRACTICE = 'a2-03-practice'
export const A2_03_INVITE = 'a2-03-invite'
export const A2_03_PRESSURE = 'a2-03-pressure'
export const A2_03_ECHO = 'a2-03-echo'
/** Esbirro ligero: la turista corrompida bloquea la puerta del café tras la invitación */
export const A2_03_TOURIST = 'a2-03-tourist'
export const A2_03_PLAN = 'a2-03-plan'
export const A2_03_CLOSE = 'a2-03-close'

/** A2-03 se abre al vencer el eco del hospital */
export const isA2CityUnlocked = (s: GameState) => s.defeated.includes(A2_ECHO)

export const A2_CITY_ENEMIES: Record<string, EnemyDef> = {
  // Esbirro ligero (1 fase): aparece tras la invitación del amigo, delante de la puerta del café, antes del mesero.
  // Es un eco: al vencerlo vuelve a su tiempo y da un escudo; la pregunta extra puede dar otro.
  [A2_03_TOURIST]: {
    id: A2_03_TOURIST,
    name: 'La turista corrompida',
    person: 'Ms. Costa',
    kind: 'minion',
    echo: true,
    hp: 4,
    topics: ['invitations'],
    kinds: ['fill', 'fix', 'order', 'listen', 'write'],
    tags: ['a2-city-tourist'],
    onlyTags: true,
    zone: 'calle',
    look: { shirt: '#e58aa6', hair: '#6b4a2b', skin: '#c9b8d8', accessory: 'cap', gender: 'female' },
    before: [
      { text: 'Would you like come with me? Let\'s to stay at this door! How about stay here forever?', es: '¿Te gustaría venir conmigo? ¡Quedémonos en esta puerta! ¿Qué tal quedarnos aquí para siempre? (Invita mal: like come, let\'s to, how about stay).' },
      { text: 'Nobody goes in the café! Answer my invitations first!', es: '¡Nadie entra al café! ¡Primero responde mis invitaciones!' },
    ],
    after: [
      { text: 'Would you like to... Oh! Sorry. Where am I?', es: '¿Te gustaría...? ¡Oh! Perdón. ¿Dónde estoy?' },
      { text: 'I was looking at the café window, and then... a purple light. Thank you! I usually visit a new city every summer.', es: 'Estaba mirando la ventana del café y luego... una luz morada. ¡Gracias! Normalmente visito una ciudad nueva cada verano.' },
    ],
    freed: { text: 'How about visiting the tourist office? The maps are free!', es: '¿Qué tal si visitas la oficina de turismo? ¡Los mapas son gratis!' },
    bonus: { q: "Before you go! How about ___ a photo of the fountain?", options: ['taking', 'take', 'to take'], answer: 0, tip: 'How about + verbo con -ing: How about taking...?' },
  },
  [A2_03_ECHO]: {
    id: A2_03_ECHO,
    name: 'El mesero corrompido',
    person: 'Mr. Bell',
    kind: 'minion',
    echo: true,
    reward: 'chaleco-mesero',
    hp: 6,
    topics: ['should-must', 'invitations'],
    kinds: ['fill', 'fix', 'order', 'listen', 'write'],
    tags: ['a2-city'],
    // Dos fases cortas: primero reglas y consejos, luego invitaciones y hábitos
    phases: [
      { hp: 3, title: 'Rules', topics: ['should-must'], kinds: ['fill', 'fix', 'order', 'listen', 'write'], tags: ['a2-city'] },
      {
        hp: 3,
        title: 'Invitations',
        topics: ['invitations'],
        kinds: ['fill', 'fix', 'order', 'listen', 'write'],
        tags: ['a2-city'],
        line: { text: "OK, no rules! Let's sit here forever! How about drink purple coffee? I always am here, you never leaves!", es: '¡Bueno, sin reglas! ¡Sentémonos aquí para siempre! ¿Qué tal tomar café morado? ¡Siempre estoy aquí, tú nunca te vas! (Ahora mezcla invitaciones y frecuencia).' },
      },
    ],
    onlyTags: true,
    zone: 'cafe',
    look: { shirt: '#2b2b2b', hair: '#3b2a1a', skin: '#c9b8d8' },
    before: [
      { text: 'You must to order now! You should drinks the purple coffee! Everybody have to stay!', es: '¡Debes pedir ya! ¡Deberías tomar el café morado! ¡Todos tienen que quedarse! (Todo lo dice mal: must to, should drinks, everybody have to).' },
      { text: 'Nobody leaves my café! Sit down and drink the purple coffee!', es: '¡Nadie sale de mi café! ¡Siéntate y toma el café morado!' },
    ],
    after: [
      { text: 'Would you like to have a coffee...? Oh. Where am I? My head hurts.', es: '¿Te gustaría tomar un café...? Oh. ¿Dónde estoy? Me duele la cabeza.' },
      { text: 'I was working, and then... a purple light in the window. Thank you. I usually make very good coffee, really!', es: 'Estaba trabajando y luego... una luz morada en la ventana. Gracias. ¡Normalmente hago muy buen café, de verdad!' },
    ],
    freed: { text: "Sit down, please. How about having a coffee? It's free for you today!", es: 'Siéntate, por favor. ¿Qué tal un café? ¡Hoy es gratis para ti!' },
    bonus: { q: 'Before you go! Would you like a cake? — Sorry, I ___. I have to go.', options: ["can't", "don't can", "can't to"], answer: 0, tip: "Para rechazar con amabilidad: Sorry, I can't." },
  },
}

export const A2_CITY: SceneDef = {
  id: A2_CITY_ID,
  name: 'La ciudad · A2',
  topics: [],
  map: MAP,
  start: { x: 3, y: 10 },
  // Sin jefe: la puerta del jefe apunta a un muro y no hace falta ninguna llave
  bossDoor: { x: 0, y: 0 },
  keysNeeded: 0,
  entities: [
    { type: 'npc', id: 'a2-03-leo', x: 9, y: 10 },
    // La persona especial te acompaña en la ciudad (solo una frase, sin tarea)
    { type: 'npc', id: 'a2-03-interest', x: 2, y: 10 },
    { type: 'npc', id: 'a2-03-friend', x: 5, y: 9 },
    // La turista corrompida bloquea la puerta del café tras la invitación (hay que vencerla para llegar al mesero)
    { type: 'enemy', id: A2_03_TOURIST, x: 2, y: 6, after: A2_03_INVITE },
    // El mesero (charla con presión) y, en su lugar, el eco del café (combate)
    { type: 'npc', id: 'a2-03-waiter', x: 4, y: 2 },
    { type: 'enemy', id: A2_03_ECHO, x: 4, y: 2, after: A2_03_PRESSURE },
  ],
  labels: [
    { text: 'Café', x: 3, y: 4 },
    { text: 'Tienda', x: 11, y: 4 },
    { text: 'Main Street', x: 10, y: 7 },
    { text: 'Plaza', x: 6, y: 14 },
    { text: 'Turismo', x: 13, y: 14 },
  ],
  zoneAt,
  examine: {
    '12,11': { text: 'Free city maps and bus times. A sign says: "Welcome! Enjoy your day in the city."', sub: 'Mapas gratis de la ciudad y horarios del bus. Un letrero dice: "¡Bienvenido! Disfruta tu día en la ciudad".', say: 'Welcome! Enjoy your day in the city.' },
    '7,11': { text: 'The fountain in the plaza. The water looks a little purple...', sub: 'La fuente de la plaza. El agua se ve un poco morada...', say: 'The fountain in the plaza.', tone: 'warn' },
  },
  requirements: [],
  chips: (s) => [
    { label: 'A2-03 · Day in the City', done: s.opened.includes(A2_03_CLOSE) },
    { label: 'Leo', done: s.opened.includes(A2_03_ARRIVE) },
    { label: 'Lección de Leo', done: s.seenLesson.includes('invitations') },
    { label: 'Práctica', done: s.opened.includes(A2_03_PRACTICE) },
    { label: 'Invitación', done: s.opened.includes(A2_03_INVITE) },
    { label: 'La turista', done: s.defeated.includes(A2_03_TOURIST) },
    { label: 'En el café', done: s.opened.includes(A2_03_PRESSURE) },
    { label: 'El mesero', done: s.defeated.includes(A2_03_ECHO) },
    { label: 'Plan del día', done: s.opened.includes(A2_03_PLAN) },
    { label: 'Cierre', done: s.opened.includes(A2_03_CLOSE) },
  ],
  intro: {
    first: 'Saliste del hospital. Hace un día bonito en la ciudad y Leo te espera en la calle para pasar el día juntos.',
    later: 'La ciudad en A2. Sigue los objetivos bajo el mapa.',
  },
}
