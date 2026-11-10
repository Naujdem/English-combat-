import type { EnemyDef, GameState, SceneDef, Zone } from '../game/types'
import type { ScriptLine } from './b1Accident'
import type { WhatIfContent } from '../components/WhatIf'

/**
 * B1-11 — The First Journey. Bloque B: la noche del incendio, otra vez (escena b1-11-fire; es recuerdo por el prefijo "b1-11-").
 * El pasillo de la escuela de la misión 1 (data/b1Accident.ts), minutos antes del incendio. Se llega por la puerta del cuarto de L
 * (data/b1ClockRoom.ts, al usar el reloj). L, ya mayor, es invisible para los demás: esta noche es solo un recuerdo.
 *   La página 43 en el suelo (tarea 'b1-11-page43': tema 'pastperfect-b1' + práctica b1-11-pp1…pp8)
 *   → el amigo junto a la puerta del aula (tarea 'b1-11-friend-seen': script corto) · la alarma de la pared (tarea 'b1-11-whatif':
 *   minijuego What If, components/WhatIf.tsx) → los 2 Ash Echo en el pasillo → la escalera (tarea 'b1-11-fire-out': script,
 *   vuelve al cuarto de L). Ningún bloque B guarda closeId(11).
 */
export const B1_11_FIRE_ID = 'b1-11-fire'
export const B1_11_PAGE43 = 'b1-11-page43'
export const B1_11_FRIEND = 'b1-11-friend'
export const B1_11_FRIEND_SEEN = 'b1-11-friend-seen'
export const B1_11_ALARM = 'b1-11-alarm'
export const B1_11_WHATIF_DONE = 'b1-11-whatif'
export const B1_11_ECHO1 = 'b1-11-echo1'
export const B1_11_ECHO2 = 'b1-11-echo2'
export const B1_11_EXIT = 'b1-11-exit'
export const B1_11_FIRE_OUT = 'b1-11-fire-out'

/** El amigo (who 'narrator'): no te ve */
export const B1_11_FRIEND_SCRIPT: ScriptLine[] = [
  { who: 'narrator', text: "(He doesn't see you. He is looking at the classroom door.)", es: '(No te ve. Mira la puerta del aula.)' },
  { who: 'narrator', text: '(He looks tired. He is waiting for someone.)', es: '(Se ve cansado. Espera a alguien.)' },
]

/** La escalera: al terminar se vuelve al cuarto de L (data/tasks.ts, goto) */
export const B1_11_FIRE_OUT_SCRIPT: ScriptLine[] = [
  { who: 'narrator', text: '(The fire is starting. It always starts.)', es: '(El fuego está empezando. Siempre empieza.)' },
  { who: 'narrator', text: '(You turn the crown back. The corridor fades.)', es: '(Giras la corona de regreso. El pasillo se desvanece.)' },
  { who: 'narrator', text: '(Your room. The same walls. You sit on the floor and hold your head.)', es: '(Tu cuarto. Las mismas paredes. Te sientas en el suelo y te tomas la cabeza.)' },
  { who: 'narrator', text: '(In your notebook, one word: Roads.)', es: '(En tu cuaderno, una sola palabra: Roads.)' },
]

/** What If… (components/WhatIf.tsx): 4 intentos, el fuego empieza en otra ventana cada vez */
export const B1_11_WHATIF: WhatIfContent = {
  title: 'What If…',
  intro: { en: 'You can go back. You can try again. Fix the sentence, and try.', es: 'Puedes volver. Puedes intentarlo otra vez. Arma la frase e inténtalo.' },
  rounds: [
    {
      line: 'If I had pulled the alarm earlier, they ___ escaped.',
      es: 'Si hubiera activado la alarma antes, habrían escapado.',
      options: ['would have', 'would', 'had'],
      answer: 0,
      tip: 'If + past perfect, would have + participio.',
      result: { en: 'The alarm rang. But the fire started in the basement.', es: 'La alarma sonó. Pero el fuego empezó en el sótano.' },
      fireAt: 'basement',
    },
    {
      line: 'If I had closed the door, the smoke ___ spread.',
      es: 'Si hubiera cerrado la puerta, el humo no se habría esparcido.',
      options: ["wouldn't", "hadn't", "wouldn't have"],
      answer: 2,
      tip: "wouldn't have + participio.",
      result: { en: 'The door was closed. But the fire started in the kitchen.', es: 'La puerta estaba cerrada. Pero el fuego empezó en la cocina.' },
      fireAt: 'kitchen',
    },
    {
      line: 'If I had called the firefighters sooner, they ___ arrived in time.',
      es: 'Si hubiera llamado a los bomberos antes, habrían llegado a tiempo.',
      options: ['had', 'would have', 'would'],
      answer: 1,
      tip: 'would have + participio.',
      result: { en: 'They came earlier. But the fire started on the roof.', es: 'Llegaron antes. Pero el fuego empezó en el techo.' },
      fireAt: 'roof',
    },
    {
      line: 'If I ___ everyone outside earlier, nobody would have been hurt.',
      es: 'Si hubiera sacado a todos antes, nadie habría resultado herido.',
      options: ['took', 'had taken', 'would take'],
      answer: 1,
      tip: 'If + past perfect (had taken).',
      result: { en: 'Everyone was outside. But the fire started on the stairs. Same night. Same smoke.', es: 'Todos estaban afuera. Pero el fuego empezó en la escalera. La misma noche. El mismo humo.' },
      fireAt: 'stairs',
    },
  ],
  finish: { en: 'Every try ends the same. The fire always starts.', es: 'Cada intento termina igual. El fuego siempre empieza.', banner: 'Cada intento termina igual' },
}

/**
 * Leyenda (como data/b1Accident.ts): # pared · d puerta del aula (con la luz encendida; no se abre) · 9 alarma de incendio ·
 * 0 letrero de salida · ^ escalera. A la izquierda el pasillo ancho (llegada, página 43, el amigo, la alarma); a la derecha un
 * tramo de una sola fila con los 2 Ash Echo, y al fondo la escalera (14,1).
 */
const MAP = [
  '####d###9####0##',
  '#.............^#',
  '#.........######',
  '#.........######',
  '################',
]

/** El mismo piso del pasillo de noche de la misión 1 */
const zoneAt = (): Zone => 'pasillo-noche'

const LIGHT = { text: 'Light under the door.', sub: 'Hay luz bajo la puerta.', say: 'Light under the door.' }

export const B1_11_FIRE: SceneDef = {
  id: B1_11_FIRE_ID,
  name: 'Recuerdo 11 · La noche del incendio',
  topics: [],
  map: MAP,
  start: { x: 1, y: 2 },
  bossDoor: { x: 0, y: 0 },
  keysNeeded: 0,
  entities: [
    // La página 43, en el suelo junto a la llegada: la primera tarea
    { type: 'npc', id: B1_11_PAGE43, x: 2, y: 2 },
    // El amigo, junto a la puerta del aula (con la mochila y el llavero: npcs.ts, charm 'clock-keychain')
    { type: 'npc', id: B1_11_FRIEND, x: 5, y: 1 },
    // La alarma de la pared (tile 9): What If (pide la página 43)
    { type: 'npc', id: B1_11_ALARM, x: 8, y: 0 },
    // Los Ash Echo, en el tramo estrecho del pasillo: aparecen al terminar What If
    { type: 'enemy', id: B1_11_ECHO1, x: 11, y: 1, after: B1_11_WHATIF_DONE },
    { type: 'enemy', id: B1_11_ECHO2, x: 12, y: 1, after: B1_11_WHATIF_DONE },
    // La escalera: aparece al vencer al segundo (el primero está antes en el pasillo, así que ya está vencido)
    { type: 'npc', id: B1_11_EXIT, x: 14, y: 1 },
  ],
  labels: [{ text: 'Pasillo', x: 5, y: 3 }],
  zoneAt: () => zoneAt(),
  examine: {
    '4,0': LIGHT,
  },
  // La puerta del aula no se abre
  locked: (x, y) => (x === 4 && y === 0 ? LIGHT : null),
  requirements: [],
  chips: (s: GameState) => [
    { label: 'La página 43', done: s.opened.includes(B1_11_PAGE43) },
    { label: 'La alarma: What If', done: s.opened.includes(B1_11_WHATIF_DONE) },
    { label: 'Los Ash Echo', done: s.defeated.includes(B1_11_ECHO1) && s.defeated.includes(B1_11_ECHO2) },
    { label: 'La escalera', done: s.opened.includes(B1_11_FIRE_OUT) },
  ],
  intro: {
    first: 'The night of the fire, again. — La noche del incendio, otra vez.',
    later: () => 'The night of the fire, again. — La noche del incendio, otra vez.',
  },
}

const ASH_ECHO_TAGS = ['b1-11-echo']
const ASH_ECHO = (
  id: string,
  look: EnemyDef['look'],
  before: { text: string; es: string },
  after: { text: string; es: string },
  freed: { text: string; es: string },
): EnemyDef => ({
  id,
  name: 'Ash Echo',
  person: 'Ash Echo',
  kind: 'minion',
  echo: true,
  hp: 5,
  topics: ['conditional-3', 'pastperfect-b1'],
  kinds: ['fix', 'fill', 'order', 'listen'],
  tags: ASH_ECHO_TAGS,
  onlyTags: true,
  zone: 'pasillo-noche',
  look,
  before: [before],
  after: [after],
  freed,
})

const ASH = { shirt: '#4a4a4f', hair: '#2a2a2e', skin: '#8c8c92' }

export const B1_11_ENEMIES: Record<string, EnemyDef> = {
  [B1_11_ECHO1]: ASH_ECHO(
    B1_11_ECHO1,
    ASH,
    { text: 'If I would have known... If I would have known...', es: 'If I would have known: mal.' },
    { text: 'Ash falls. It was only a memory.', es: 'Cae ceniza. Solo era un recuerdo.' },
    { text: 'Go on. There is nothing here for you.', es: 'Sigue. Aquí no hay nada para ti.' },
  ),
  [B1_11_ECHO2]: ASH_ECHO(
    B1_11_ECHO2,
    ASH,
    { text: 'By the time I arrived, the fire started! By the time you came, it ended!', es: 'By the time I arrived, the fire started: mal (había empezado).' },
    { text: 'The smoke thins.', es: 'El humo se disipa.' },
    { text: 'Ask the roads. They know.', es: 'Pregunta a los caminos. Ellos saben.' },
  ),
}
