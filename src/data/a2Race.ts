import type { EnemyDef, GameState, Question, SceneDef, Zone } from '../game/types'
import { A2_06_CLOSE } from './a2FarmPast'

/**
 * A2-07 — The Great Race (hipódromo del pasado). Mapa adaptado: tribuna (arriba), pista ovalada con el campo
 * interior cercado, y la zona de los establos abajo (donde está el carro viejo).
 * Orden: Leo (lección superlatives-comparatives-race + práctica guiada) → Jack the Rival (esbirro en la puerta de la pista)
 *        → JoJo (DebateTalk: la confianza de JoJo da mejor posición de salida)
 *        → JoJo (la carrera: Sequence Master por tramos + desafíos; la posición sube o baja según el acierto)
 *        → JoJo (Reconstruct the Story: ordenar lo que pasó) → The Master Jockey (jefe, 3 fases, en la meta)
 *        → Leo (cierre: fragmento de la voz del ganador) → Leo (opcional: despedida con JoJo).
 * Se activa al terminar A2-06. Tareas en data/tasks.ts, lección en data/lessons.ts, combates en data/questions-a2-race.ts.
 */
const MAP = [
  '################',
  '#HHHHHHHHHHHHHH#',
  '#..............#',
  '#fffffff.ffffff#',
  '#rrrrrrrrrrrrrr#',
  '#rffffffffffffr#',
  '#rf,,,Y,,,,,,fr#',
  '#rf,,,,,,w,,,fr#',
  '#rf,Y,,,,,,Y,fr#',
  '#rffffffffffffr#',
  '#rrrrrrrrrrrrrr#',
  '#p.....u.....yy#',
  '################',
]

function zoneAt(_x: number, _y: number): Zone {
  return 'campo-viejo'
}

export const A2_RACE_ID = 'a2-07-race-track'
export const A2_07_PRACTICE = 'a2-07-practice'
/** Esbirro: Jack the Rival bloquea la puerta de la pista tras la práctica de Leo */
export const A2_07_JACK = 'a2-07-jack'
export const A2_07_DEBATE = 'a2-07-debate'
/** Marcas del desenlace con JoJo: cambian la posición de salida de la carrera */
export const A2_07_JOJO_TRUST = 'a2-07-jojo-trust'
export const A2_07_JOJO_MIXED = 'a2-07-jojo-mixed'
export const A2_07_RACE = 'a2-07-race'
export const A2_07_STORY = 'a2-07-story'
/** Jefe: aparece en la meta tras reconstruir la historia */
export const A2_07_BOSS = 'a2-07-master-jockey'
export const A2_07_CLOSE = 'a2-07-close'
/** Despedida opcional con JoJo (no cuenta para cerrar la unidad) */
export const A2_07_FAREWELL = 'a2-07-farewell'

/** A2-07 se abre al terminar A2-06 */
export const isA2RaceUnlocked = (s: GameState) => s.opened.includes(A2_06_CLOSE)

/** Práctica guiada de Leo (lista fija en data/tasks.ts) */
const T = ['a2-race']
const TP = 'superlatives-comparatives-race' as const
export const A2_RACE_PRACTICE: Question[] = [
  { id: 'a2-07-p1', topic: TP, prompt: 'She rides ___ (careful) than me.', options: ['more carefully', 'more careful', 'carefuller'], answer: 0, tip: 'Cómo monta (adverbio largo): more carefully than.', tags: T },
  { id: 'a2-07-p2', topic: TP, kind: 'fix', prompt: 'He is more fast than me.', options: ['He is faster than me.', 'He is more faster than me.', 'He is fastest than me.'], answer: 0, tip: 'Adjetivo corto: fast → faster than (sin "more").', tags: T },
  { id: 'a2-07-p3', topic: TP, prompt: 'This is ___ (dangerous) jump.', options: ['the most dangerous', 'the more dangerous', 'the dangerousest'], answer: 0, tip: 'Superlativo de un adjetivo largo: the most dangerous.', tags: T },
  { id: 'a2-07-p4', topic: TP, prompt: 'The horses ___ (run) right now.', options: ['are running', 'is running', 'run'], answer: 0, tip: 'Right now + plural: are + verbo con -ing (running, doble n).', tags: T },
  { id: 'a2-07-p5', topic: TP, kind: 'order', prompt: 'Él es el mejor jinete.', options: ['He', 'is', 'the', 'best', 'jockey.'], answer: 0, tip: 'good → the best: He is the best jockey.', tags: T },
]

export const A2_RACE_ENEMIES: Record<string, EnemyDef> = {
  // Esbirro (1 fase): bloquea la única puerta de la tribuna a la pista tras la práctica de Leo. Al vencerlo libera la palabra "fastest".
  [A2_07_JACK]: {
    id: A2_07_JACK,
    name: 'Jack the Rival',
    person: 'Jack',
    kind: 'minion',
    echo: true,
    hp: 5,
    topics: [TP],
    kinds: ['fill', 'fix', 'order'],
    tags: ['a2-race-jack'],
    onlyTags: true,
    zone: 'campo-viejo',
    look: { shirt: '#b03a2e', hair: '#2b1d12', skin: '#e0ac69', accessory: 'cap', gender: 'male' },
    before: [{ text: 'You think your horse is the best? Mine is faster than yours. Watch me!', es: '¿Crees que tu caballo es el mejor? El mío es más rápido que el tuyo. ¡Mírame!' }],
    after: [{ text: 'Okay… you are better than me today. But the race isn’t over. Talk to JoJo. He knows about the cart.', es: 'Está bien… hoy eres mejor que yo. Pero la carrera no ha terminado. Habla con JoJo. Él sabe lo del carro. (Palabra liberada: fastest).' }],
    freed: { text: 'Talk to JoJo. He knows about the cart.', es: 'Habla con JoJo. Él sabe lo del carro.' },
  },
  // Jefe (3 fases cortas): aparece en la meta tras Reconstruct the Story. Libera el fragmento de voz y la pieza del reloj.
  [A2_07_BOSS]: {
    id: A2_07_BOSS,
    name: 'The Master Jockey',
    person: 'The Master Jockey',
    kind: 'boss',
    hp: 6,
    topics: [TP],
    kinds: ['fill', 'fix', 'order'],
    tags: ['a2-race-boss'],
    // Fase 1: comparativos + superlativos · Fase 2: presente continuo · Fase 3: mezcla
    phases: [
      { hp: 2, title: 'Comparatives + Superlatives', topics: [TP], kinds: ['fill', 'fix', 'order'], tags: ['a2-race-boss-comp'] },
      {
        hp: 2,
        title: 'Present Continuous',
        topics: [TP],
        kinds: ['fill', 'fix', 'order'],
        tags: ['a2-race-boss-cont'],
        line: { text: 'Not bad… but the fastest horse still belongs to me. Look! My horse is still running! Yours is too slow!', es: 'No está mal… pero el caballo más rápido todavía es mío. ¡Mira! ¡Mi caballo sigue corriendo! ¡El tuyo es demasiado lento!' },
      },
      {
        hp: 2,
        title: 'Mezcla',
        topics: [TP],
        kinds: ['fill', 'fix', 'order'],
        tags: ['a2-race-boss-mix'],
        line: { text: 'You speak better now. But can you finish this? This is the most important moment. Are you the best or not?', es: 'Ahora hablas mejor. Pero ¿puedes terminar esto? Este es el momento más importante. ¿Eres el mejor o no?' },
      },
    ],
    onlyTags: true,
    zone: 'campo-viejo',
    look: { shirt: '#2a2440', hair: '#14101f', skin: '#c9b8d8', accessory: 'cap', gender: 'male' },
    before: [
      { text: 'You finished the race, but your words are still weak. I have the real voice of the winner. The cart took it once. I kept it.', es: 'Terminaste la carrera, pero tus palabras todavía son débiles. Tengo la verdadera voz del ganador. El carro se la llevó una vez. Yo me la quedé.' },
      { text: 'My horse was faster than yours. I am the best.', es: 'Mi caballo fue más rápido que el tuyo. Yo soy el mejor.' },
    ],
    after: [{ text: 'Fine. Take the fragment. The cart is gone, but the race never really ends.', es: 'Está bien. Toma el fragmento. El carro ya no está, pero la carrera nunca termina de verdad.' }],
    freed: { text: 'The cart is gone, but the race never really ends.', es: 'El carro ya no está, pero la carrera nunca termina de verdad.' },
    release: {
      title: '¡Fragmento recuperado!',
      text: 'El Master Jockey suelta un fragmento morado: la voz del ganador. Al tomarlo, la palabra "fastest" vuelve a sonar completa en tu voz. El centro vacío de tu reloj vibra un segundo... y se queda quieto. Lo guardas con los otros.',
    },
  },
}

export const A2_RACE: SceneDef = {
  id: A2_RACE_ID,
  name: 'El hipódromo · A2',
  topics: [],
  map: MAP,
  start: { x: 8, y: 2 },
  // Sin puerta ni llaves: el esbirro y el jefe aparecen en el mapa según el avance
  bossDoor: { x: 0, y: 0 },
  keysNeeded: 0,
  entities: [
    { type: 'npc', id: 'a2-07-leo', x: 6, y: 2 },
    // JoJo, junto a los establos (al otro lado de la pista)
    { type: 'npc', id: 'a2-07-jojo', x: 3, y: 11 },
    // Jack bloquea la única puerta de la tribuna a la pista tras la práctica de Leo
    { type: 'enemy', id: A2_07_JACK, x: 8, y: 3, after: A2_07_PRACTICE },
    // El Master Jockey espera en la meta tras reconstruir la historia
    { type: 'enemy', id: A2_07_BOSS, x: 13, y: 10, after: A2_07_STORY },
    { type: 'animal', kind: 'horse', x: 4, y: 11 },
    { type: 'animal', kind: 'horse', x: 10, y: 11 },
    { type: 'animal', kind: 'horse', x: 8, y: 7 },
    { type: 'animal', kind: 'dog', x: 12, y: 2 },
  ],
  labels: [
    { text: 'Stands', x: 4, y: 2 },
    { text: 'Track', x: 7, y: 6 },
    { text: 'Finish line', x: 12, y: 9 },
    { text: 'Stables', x: 13, y: 12 },
  ],
  zoneAt,
  examine: {
    '7,11': { text: 'A cart crossed the track last year.', sub: 'Un carro cruzó la pista el año pasado.', say: 'A cart crossed the track last year.', tone: 'warn' },
  },
  requirements: [],
  chips: (s) => [
    { label: 'A2-07 · The Great Race', done: s.opened.includes(A2_07_CLOSE) },
    { label: 'Lección de Leo', done: s.seenLesson.includes(TP) },
    { label: 'Práctica', done: s.opened.includes(A2_07_PRACTICE) },
    { label: 'Esbirro: Jack the Rival', done: s.defeated.includes(A2_07_JACK) },
    { label: 'Hablar con JoJo', done: s.opened.includes(A2_07_DEBATE) },
    { label: 'La carrera', done: s.opened.includes(A2_07_RACE) },
    { label: 'Reconstruct the Story', done: s.opened.includes(A2_07_STORY) },
    { label: 'Jefe: The Master Jockey', done: s.defeated.includes(A2_07_BOSS) },
    { label: 'Cierre: el fragmento', done: s.opened.includes(A2_07_CLOSE) },
  ],
  intro: {
    first: 'El trozo del estandarte de los River te recuerda otra carrera de caballos. Leo te lleva a un viejo hipódromo del pasado: aquí, hace un año, un carro cruzó la pista en plena carrera. Habla con Leo en la tribuna.',
    later: 'El hipódromo en A2. Sigue los objetivos bajo el mapa.',
  },
}
