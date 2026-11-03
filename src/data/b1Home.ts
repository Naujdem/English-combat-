import type { GameState, SceneDef } from '../game/types'
import { B1_HOME_ID, B1_OPENING } from './b1World'

/**
 * B1 · Apertura — tu cuarto, la noche antes del viaje a Lumen Bay (presente).
 * En el repo no había un cuarto del protagonista que sirviera (tu casa de Green Street es la zona del jefe de A1),
 * así que este es uno pequeño. Leyenda: W ventana · 5 cama · K escritorio · L estante · p planta · A sofá.
 * El teléfono (personaje b1-phone, junto al escritorio) suena: Ms. Haddad llama. Su tarea está en data/tasks.ts
 * (done = B1_CALL). Al terminarla, Explore muestra FragmentJoinCue y guarda B1_OPENING.
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
  entities: [{ type: 'npc', id: B1_PHONE, x: 6, y: 3 }],
  labels: [{ text: 'Tu cuarto', x: 6, y: 6 }],
  zoneAt: () => 'casa',
  examine: {
    '1,2': { text: 'Your bed. Your bag for the trip is ready.', sub: 'Tu cama. Tu maleta para el viaje está lista.', say: 'Your bed. Your bag for the trip is ready.' },
    '5,3': { text: 'Your desk. The old clock is here. The empty core shines a little.', sub: 'Tu escritorio. El reloj viejo está aquí. El centro vacío brilla un poco.', say: 'Your desk. The old clock is here.', tone: 'warn' },
    '1,1': { text: 'It is dark outside.', sub: 'Afuera ya está oscuro.', say: 'It is dark outside.' },
  },
  requirements: [],
  chips: (s: GameState) => [
    { label: 'B1 · La noche antes del viaje', done: s.opened.includes(B1_OPENING) },
    { label: 'Contestar el teléfono', done: s.opened.includes(B1_CALL) },
    { label: 'Los fragmentos', done: s.opened.includes(B1_OPENING) },
  ],
  intro: {
    first: 'Unas semanas después del hospital. Es de noche y estás en tu cuarto. Suena tu teléfono, en el escritorio: acércate y contesta.',
    later: 'Tu cuarto. El reloj sigue en el escritorio.',
  },
}
