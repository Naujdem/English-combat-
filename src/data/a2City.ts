import type { EnemyDef, GameState, SceneDef, Zone } from '../game/types'
import { A2_ECHO } from './a2Hospital'

/**
 * A2-03 — Day in the City (alcance mínimo). Copia ligera del mapa de la ciudad de A1, sin jefe ni llaves.
 * Orden: Leo (llega) → Leo (lección + práctica) → tu amigo (invitación al café) → el eco del café (combate)
 *        → tu amigo (plan del día, Sequence Master ligero) → pequeña anomalía.
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
  '#__H___NN__#...#',
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
export const A2_03_ECHO = 'a2-03-echo'
export const A2_03_PLAN = 'a2-03-plan'

/** A2-03 se abre al vencer el eco del hospital */
export const isA2CityUnlocked = (s: GameState) => s.defeated.includes(A2_ECHO)

export const A2_CITY_ENEMIES: Record<string, EnemyDef> = {
  [A2_03_ECHO]: {
    id: A2_03_ECHO,
    name: 'El mesero corrompido',
    person: 'Mr. Bell',
    kind: 'minion',
    echo: true,
    hp: 5,
    topics: ['invitations', 'should-must'],
    kinds: ['fill', 'fix', 'order', 'write'],
    tags: ['a2-city'],
    onlyTags: true,
    zone: 'cafe',
    look: { shirt: '#2b2b2b', hair: '#3b2a1a', skin: '#c9b8d8' },
    before: [
      { text: 'Would you like drink a coffee? You must to order now! How about sit here? I never am late!', es: '¿Quieres tomar un café? ¡Debes pedir ya! ¿Qué tal si te sientas aquí? ¡Nunca llego tarde! (Todo lo dice mal: like drink, must to, how about sit, never am).' },
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
    { type: 'npc', id: 'a2-03-friend', x: 5, y: 9 },
    // El combate del café: aparece cuando tu amigo te invita
    { type: 'enemy', id: A2_03_ECHO, x: 4, y: 2, after: A2_03_INVITE },
  ],
  labels: [
    { text: 'Café', x: 3, y: 4 },
    { text: 'Tienda', x: 11, y: 4 },
    { text: 'Main Street', x: 10, y: 7 },
    { text: 'Plaza', x: 6, y: 14 },
  ],
  zoneAt,
  examine: {
    '7,11': { text: 'The fountain in the plaza. The water looks a little purple...', sub: 'La fuente de la plaza. El agua se ve un poco morada...', say: 'The fountain in the plaza.', tone: 'warn' },
  },
  requirements: [],
  chips: (s) => [
    { label: 'A2-03 · Day in the City', done: s.opened.includes(A2_03_PLAN) },
    { label: 'Leo', done: s.opened.includes(A2_03_ARRIVE) },
    { label: 'Lección de Leo', done: s.seenLesson.includes('invitations') },
    { label: 'Práctica', done: s.opened.includes(A2_03_PRACTICE) },
    { label: 'Invitación', done: s.opened.includes(A2_03_INVITE) },
    { label: 'El café', done: s.defeated.includes(A2_03_ECHO) },
    { label: 'Plan del día', done: s.opened.includes(A2_03_PLAN) },
  ],
  intro: {
    first: 'Saliste del hospital. Hace un día bonito en la ciudad y Leo te espera en la calle para pasar el día juntos.',
    later: 'La ciudad en A2. Sigue los objetivos bajo el mapa.',
  },
}
