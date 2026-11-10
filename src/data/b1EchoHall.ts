import type { ScriptLine } from './b1Accident'
import type { GameState, SceneDef, Zone } from '../game/types'
import type { InscriptionRoom } from '../game/inscriptions'
import { B1_13_KEEPER_DONE } from './b1TempleEchoes'

/**
 * B1-13 — The Price. Bloque B: la sala de los ecos (escena b1-13-hall; es recuerdo por el prefijo "b1-13-").
 * Una sala alta de piedra donde todo se repite. Se llega por la puerta del fondo del Temple of Echoes (data/b1TempleEchoes.ts)
 * al terminar el muro de los ecos ('b1-13-wall-ins'). El Keeper of Echoes NO pelea: es un NPC con tareas encadenadas.
 *   presentación (b1-13-keeper-intro, script) → primer acertijo (b1-13-keeper-a: B1_13_RIDDLE_A + b1-13-k1…k6)
 *   → página 62 (b1-13-notebook2: tema 'future-plans-b1' + b1-13-f1…f8) → segundo acertijo (b1-13-keeper-f: B1_13_RIDDLE_F + b1-13-k7…k12)
 *   → el precio (b1-13-keeper-done, script) → la puerta del fondo: fuera del templo (bloque 13-C, data/b1TempleCamp.ts). Ningún bloque B guarda closeId(13).
 */
export const B1_13_HALL_ID = 'b1-13-hall'
export const B1_13_KEEPER = 'b1-13-keeper'
export const B1_13_KEEPER_INTRO = 'b1-13-keeper-intro'
export const B1_13_KEEPER_A = 'b1-13-keeper-a'
export const B1_13_NOTEBOOK2 = 'b1-13-notebook2'
export const B1_13_KEEPER_F = 'b1-13-keeper-f'

/** La presentación del Keeper (secuencia fija, MemoryScript) */
export const B1_13_KEEPER_INTRO_SCRIPT: ScriptLine[] = [
  { who: 'narrator', text: '(A tall figure of stone and sound stands in the hall. It has no face, only mouths carved in its chest.)', es: '(Una figura alta de piedra y sonido está en la sala. No tiene cara, solo bocas talladas en el pecho.)' },
  { who: 'narrator', text: 'Keeper of Echoes: Who comes?', es: 'Keeper of Echoes: ¿Quién viene?' },
  { who: 'narrator', text: '(You write in your notebook: "L.")', es: '(Escribes en tu cuaderno: "L".)' },
  { who: 'narrator', text: 'Keeper of Echoes: L... L... L...', es: 'Keeper of Echoes: L... L... L...' },
  { who: 'narrator', text: 'Keeper of Echoes: I repeat everything. Say it right, and I will let you pass.', es: 'Keeper of Echoes: Repito todo. Dilo bien y te dejaré pasar.' },
]

/** El precio: el Keeper revela cómo funciona el aparato (secuencia fija, MemoryScript) */
export const B1_13_KEEPER_PRICE: ScriptLine[] = [
  { who: 'narrator', text: 'Keeper of Echoes: You answered well. Now hear what the stone never told you.', es: 'Keeper of Echoes: Respondiste bien. Ahora escucha lo que la piedra nunca te dijo.' },
  { who: 'narrator', text: 'Keeper of Echoes: The device does not create a voice. It takes one. It must be taken from someone.', es: 'Keeper of Echoes: El aparato no crea una voz. Toma una. Debe tomarse de alguien.' },
  { who: 'narrator', text: '(You write: "From whom?")', es: '(Escribes: "¿De quién?")' },
  { who: 'narrator', text: 'Keeper of Echoes: From whom? From whom?... You must choose.', es: 'Keeper of Echoes: ¿De quién? ¿De quién?... Tú debes elegir.' },
  { who: 'narrator', text: 'Keeper of Echoes: And if you take a voice across time, the clock will break. Think before you choose.', es: 'Keeper of Echoes: Y si tomas una voz a través del tiempo, el reloj se romperá. Piensa antes de elegir.' },
  { who: 'narrator', text: "(Your hands are shaking. In your mind, only one face. A face you can't forget.)", es: '(Te tiemblan las manos. En tu mente, una sola cara. Una cara que no puedes olvidar.)' },
]

/** The First Riddle (components/Inscriptions.tsx, scene 'door'): logro y fracaso */
export const B1_13_RIDDLE_A: InscriptionRoom = {
  title: 'The First Riddle',
  intro: { en: 'The Keeper repeats a sentence. Build it right, and the echo will stop.', es: 'El Keeper repite una frase. Armala bien y el eco se detendrá.' },
  scene: 'door',
  plates: [
    {
      words: ['I', 'managed to', 'open', 'the door'],
      roles: ['subject', 'aux', 'verb', 'object'],
      es: 'Logré abrir la puerta.',
      rule: { title: 'manage to + verbo', text: 'manage to + verbo base: conseguir hacer algo con esfuerzo.', examples: ['She managed to finish.', 'We managed to escape.'] },
      hint: 'manage to + verbo base.',
      distractors: [{ text: 'opening', role: 'verb' }],
      effect: 'El Keeper repite: "...the door... the door."',
    },
    {
      words: ['We', 'failed to', 'reach', 'the top'],
      roles: ['subject', 'aux', 'verb', 'object'],
      es: 'No logramos llegar a la cima.',
      rule: { title: 'fail to + verbo', text: 'fail to + verbo base: no conseguir hacer algo.', examples: ['He failed to call.', 'They failed to win.'] },
      hint: 'fail to + verbo base.',
      distractors: [{ text: 'reaching', role: 'verb' }],
      effect: 'Una boca de piedra se cierra.',
    },
    {
      words: ['She', 'gave up', 'after', 'three years'],
      roles: ['subject', 'verb', 'connector', 'time'],
      es: 'Se rindió después de tres años.',
      rule: { title: 'give up', text: 'give up = rendirse. Gave es el pasado de give.', examples: ['Never give up.', 'He gave up smoking.'] },
      hint: 'gave up = se rindió.',
      distractors: [{ text: 'gave', role: 'verb' }],
      effect: 'El eco baja la voz.',
    },
    {
      words: ['He', 'succeeded in', 'finding', 'the clock'],
      roles: ['subject', 'verb', 'participle', 'object'],
      es: 'Tuvo éxito encontrando el reloj.',
      rule: { title: 'succeed in + -ing', text: 'succeed in + verbo con -ing.', examples: ['She succeeded in winning.'] },
      hint: 'succeed in + -ing.',
      distractors: [{ text: 'to find', role: 'complement' }],
      effect: 'Otra boca se cierra.',
    },
    {
      words: ['We', 'achieved', 'our goal', 'at last'],
      roles: ['subject', 'verb', 'object', 'time'],
      es: 'Por fin logramos nuestra meta.',
      rule: { title: 'achieve a goal', text: 'achieve a goal = lograr una meta. At last = por fin.', examples: ['She achieved her dream.'] },
      hint: 'achieve a goal.',
      distractors: [{ text: 'did', role: 'verb' }],
      effect: 'El Keeper calla.',
    },
  ],
  finish: { en: 'The echo is quiet. The Keeper steps aside... only a little.', es: 'El eco calla. El Keeper se aparta... solo un poco.', banner: 'Primer acertijo resuelto' },
}

/** The Second Riddle (scene 'door'): futuros para planes */
export const B1_13_RIDDLE_F: InscriptionRoom = {
  title: 'The Second Riddle',
  intro: { en: 'Now the Keeper asks about tomorrow. Build each sentence, and the echo will answer.', es: 'Ahora el Keeper pregunta por el mañana. Arma cada frase y el eco responderá.' },
  scene: 'door',
  plates: [
    {
      words: ['Tomorrow', 'I', 'am going to', 'leave', 'this temple'],
      roles: ['time', 'subject', 'aux', 'verb', 'object'],
      es: 'Mañana voy a dejar este templo.',
      rule: { title: 'going to: un plan', text: 'am/is/are going to + verbo base: un plan ya decidido.', examples: ['I am going to study.', 'We are going to leave.'] },
      hint: 'am going to + verbo base.',
      alt: [['I', 'am going to', 'leave', 'this temple', 'tomorrow']],
      distractors: [{ text: 'will to', role: 'aux' }],
      effect: 'El Keeper repite: "...tomorrow... tomorrow."',
    },
    {
      words: ['We', 'are meeting', 'the guide', 'at nine'],
      roles: ['subject', 'verb', 'object', 'time'],
      es: 'Nos reunimos con el guía a las nueve.',
      rule: { title: 'Presente continuo: un arreglo', text: 'am/is/are + -ing con hora o lugar: un arreglo ya organizado.', examples: ['I am meeting her at five.'] },
      hint: 'are meeting + hora.',
      distractors: [{ text: 'meet', role: 'verb' }],
      effect: 'Una boca de piedra se cierra.',
    },
    {
      words: ['I', 'think', 'it', 'will rain', 'tonight'],
      roles: ['subject', 'verb', 'subject', 'verb', 'time'],
      es: 'Creo que lloverá esta noche.',
      rule: { title: 'will: una predicción', text: 'I think + will: una predicción u opinión sobre el futuro.', examples: ['I think it will be cold.'] },
      hint: 'I think + will.',
      distractors: [{ text: 'is going', role: 'aux' }],
      effect: 'El eco baja la voz.',
    },
    {
      words: ['This time tomorrow', 'I', 'will be', 'traveling'],
      roles: ['time', 'subject', 'aux', 'participle'],
      es: 'Mañana a esta hora estaré viajando.',
      rule: { title: 'Future continuous', text: 'will be + -ing: una acción en progreso en un momento futuro.', examples: ['At nine I will be working.'] },
      hint: 'will be + -ing.',
      distractors: [{ text: 'will', role: 'aux' }],
      effect: 'Otra boca se cierra.',
    },
    {
      words: ['She', 'is not going to', 'wait', 'for us'],
      roles: ['subject', 'aux', 'verb', 'complement'],
      es: 'Ella no va a esperarnos.',
      rule: { title: 'going to negativo', text: 'am/is/are not going to + verbo base: no va a hacerlo.', examples: ["He isn't going to come."] },
      hint: 'is not going to + verbo.',
      distractors: [{ text: 'will not to', role: 'aux' }],
      effect: 'El Keeper calla.',
    },
  ],
  finish: { en: 'The Keeper is silent. Tomorrow has been said, and nobody repeated it.', es: 'El Keeper calla. El mañana fue dicho y nadie lo repitió.', banner: 'Segundo acertijo resuelto' },
}

const NOT_YET = { text: 'Todavía no.', sub: 'El Keeper todavía no te deja pasar.' }

/**
 * Leyenda de components/Tiles.tsx (como el Temple of Echoes): # muro con glifos · d puerta · Z sombra de estatua.
 * La puerta de vuelta al templo (0,3), el Keeper en el centro (5,3), la página 62 (2,4) y la puerta del fondo (11,3).
 */
const MAP = [
  '############',
  '#..........#',
  '#..........#',
  'd..........d',
  '#..........#',
  '#Z........Z#',
  '############',
]

/** Como el Temple of Echoes */
const zoneAt = (): Zone => 'patio-viejo'

export const B1_13_HALL: SceneDef = {
  id: B1_13_HALL_ID,
  name: 'Recuerdo 13 · La sala de los ecos',
  topics: [],
  map: MAP,
  start: { x: 1, y: 3 },
  bossDoor: { x: 0, y: 0 },
  keysNeeded: 0,
  entities: [
    // El Keeper of Echoes (sin combate): sus tareas se encadenan (data/tasks.ts, requires)
    { type: 'npc', id: B1_13_KEEPER, x: 5, y: 3 },
    // La página 62 sobre una piedra (pide el primer acertijo)
    { type: 'npc', id: B1_13_NOTEBOOK2, x: 2, y: 4 },
  ],
  labels: [{ text: 'Hall of Echoes', x: 5, y: 5 }],
  zoneAt: () => zoneAt(),
  examine: {
    '1,5': { text: 'The statue repeats your steps.', sub: 'La estatua repite tus pasos.', say: 'It repeats your steps.' },
  },
  // La puerta del fondo: cerrada hasta la revelación del precio; después sale al exterior del templo (bloque 13-C, data/b1TempleCamp.ts)
  locked: (x, y, s) => (x === 11 && y === 3 && !s.opened.includes(B1_13_KEEPER_DONE) ? NOT_YET : null),
  // La puerta de la izquierda vuelve al Temple of Echoes
  links: { '0,3': { sceneId: 'b1-13-echoes', pos: { x: 10, y: 3 } }, '11,3': { sceneId: 'b1-13-camp', pos: { x: 1, y: 3 } } },
  requirements: [],
  chips: (s: GameState) => [
    { label: 'El Keeper: presentación', done: s.opened.includes(B1_13_KEEPER_INTRO) },
    { label: 'Primer acertijo: logro y fracaso', done: s.opened.includes(B1_13_KEEPER_A) },
    { label: 'Página 62: planes y futuro', done: s.opened.includes(B1_13_NOTEBOOK2) },
    { label: 'Segundo acertijo: futuros', done: s.opened.includes(B1_13_KEEPER_F) },
    { label: 'El precio', done: s.opened.includes(B1_13_KEEPER_DONE) },
  ],
  intro: {
    first: 'The hall of echoes. Everything is said twice. — La sala de los ecos. Todo se dice dos veces.',
    later: () => 'The hall of echoes. Everything is said twice. — La sala de los ecos. Todo se dice dos veces.',
  },
}
