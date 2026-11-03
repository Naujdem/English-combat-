import type { GameState, SceneDef } from '../game/types'
import { B1_HOME_ID, B1_OPENING, closeId } from './b1World'
import { B1_01_BLURRY, B1_01_ECHO, B1_01_MESSAGE, B1_01_PRACTICE, B1_LEO_PHONE } from './b1Accident'
import { memoryFlag } from '../game/memory'

/**
 * B1 · Apertura — tu cuarto, la noche antes del viaje a Lumen Bay (presente).
 * En el repo no había un cuarto del protagonista que sirviera (tu casa de Green Street es la zona del jefe de A1),
 * así que este es uno pequeño. Leyenda: W ventana · 5 cama · K escritorio · L estante · p planta · A sofá.
 * El teléfono (personaje b1-phone, junto al escritorio) suena: Ms. Haddad llama. Su tarea está en data/tasks.ts
 * (done = B1_CALL). Al terminarla, Explore muestra FragmentJoin (que guarda B1_OPENING).
 * B1-01 · epílogo: al despertar del recuerdo 1 (memoryFlag(1)), el teléfono pasa a ser Leo escribiendo (b1-01-leo-phone)
 * y, tras la práctica, aparece el Smoke Echo. Todo en data/b1Accident.ts y data/tasks.ts.
 */
export const B1_PHONE = 'b1-phone'
/** La llamada de Ms. Haddad terminó (falta el momento de los fragmentos) */
export const B1_CALL = 'b1-00-call'

const MAP = [
  '############',
  '#W...L..W..#',
  '#5.........#',
  '#5...K.....#',
  '#..........#',
  '#p.......A.#',
  '#..........#',
  '############',
]

export const B1_HOME: SceneDef = {
  id: B1_HOME_ID,
  name: 'Tu cuarto',
  topics: [],
  map: MAP,
  start: { x: 3, y: 4 },
  // Sin jefe: la puerta del jefe apunta a un muro y no hace falta ninguna llave
  bossDoor: { x: 0, y: 0 },
  keysNeeded: 0,
  entities: [
    { type: 'npc', id: B1_PHONE, x: 6, y: 3 },
    // B1-01 · epílogo (data/b1Accident.ts): el teléfono con Leo (mismo lugar) y el eco de humo tras la práctica
    { type: 'npc', id: B1_LEO_PHONE, x: 6, y: 3 },
    { type: 'enemy', id: B1_01_ECHO, x: 8, y: 4, after: B1_01_PRACTICE },
  ],
  labels: [{ text: 'Tu cuarto', x: 6, y: 6 }],
  zoneAt: () => 'casa',
  examine: {
    '1,2': { text: 'Your bed. Your bag for the trip is ready.', sub: 'Tu cama. Tu maleta para el viaje está lista.', say: 'Your bed. Your bag for the trip is ready.' },
    '5,3': { text: 'Your desk. The old clock is here. The empty core shines a little.', sub: 'Tu escritorio. El reloj viejo está aquí. El centro vacío brilla un poco.', say: 'Your desk. The old clock is here.', tone: 'warn' },
    '1,1': { text: 'It is dark outside.', sub: 'Afuera ya está oscuro.', say: 'It is dark outside.' },
  },
  requirements: [],
  chips: (s: GameState) =>
    s.opened.includes(memoryFlag(1))
      ? [
          // B1-01 · epílogo: despertaste del recuerdo 1
          { label: 'B1-01 · The Accident (epílogo)', done: s.opened.includes(closeId(1)) },
          { label: 'Escríbele a Leo (el teléfono)', done: s.opened.includes(B1_01_MESSAGE) },
          { label: 'Lección y práctica de Leo', done: s.opened.includes(B1_01_PRACTICE) },
          { label: 'Esbirro: Smoke Echo', done: s.defeated.includes(B1_01_ECHO) },
          { label: 'Blurry Memory', done: s.opened.includes(B1_01_BLURRY) },
          { label: 'Cierre', done: s.opened.includes(closeId(1)) },
        ]
      : [
          { label: 'B1 · La noche antes del viaje', done: s.opened.includes(B1_OPENING) },
          { label: 'Contestar el teléfono', done: s.opened.includes(B1_CALL) },
          { label: 'Los fragmentos', done: s.opened.includes(B1_OPENING) },
        ],
  intro: {
    first: 'Unas semanas después del hospital. Es de noche y estás en tu cuarto. Suena tu teléfono, en el escritorio: acércate y contesta.',
    later: 'Tu cuarto. El reloj sigue en el escritorio.',
  },
}
