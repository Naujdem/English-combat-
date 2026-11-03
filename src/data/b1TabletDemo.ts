import type { SceneDef } from '../game/types'

/**
 * Sala de prueba de Inscriptions como tarea (B1, tarea 0-C). Solo para el modo profesor
 * ("Probar Inscriptions como tarea (tablilla)"): una tablilla de piedra en un pasillo de recuerdo.
 * Antes vivía en la demo del recuerdo 1 (borrada con la misión 1). El id empieza por "b1-09-"
 * (el recuerdo de los templos), así isMemoryScene la dibuja como recuerdo. Su tarea está en data/tasks.ts.
 */
export const B1_DEMO_TABLET = 'b1-demo-tablet'
export const B1_TABLET_TEST_ID = 'b1-09-tablet-test'

const MAP = [
  '##############',
  '#W....W....W.#',
  '#............#',
  '#..K......K..#',
  '#............#',
  '#............#',
  '##############',
]

export const B1_TABLET_TEST: SceneDef = {
  id: B1_TABLET_TEST_ID,
  name: 'Sala de prueba (tablilla)',
  topics: [],
  map: MAP,
  start: { x: 6, y: 3 },
  bossDoor: { x: 0, y: 0 },
  keysNeeded: 0,
  entities: [{ type: 'npc', id: B1_DEMO_TABLET, x: 6, y: 2 }],
  labels: [{ text: 'Sala de prueba', x: 7, y: 5 }],
  zoneAt: () => 'aula-futuro',
  examine: {},
  requirements: [],
  chips: () => [{ label: 'Prueba: resuelve la tablilla', done: false }],
  intro: { first: 'Sala de prueba de Inscriptions. Acércate a la tablilla.', later: 'Sala de prueba de Inscriptions.' },
}
