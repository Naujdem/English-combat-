import type { SceneDef } from '../game/types'

/**
 * DEMO del recuerdo 1 (B1, tarea 0-B). SOLO PARA VER LA ESTÉTICA DE LOS RECUERDOS:
 * L de espaldas caminando, un NPC con la cara borrosa y una línea con un nombre con estática ([[?]]).
 * Se reemplaza cuando se haga la misión 1 (The Accident): borrar este archivo, su NPC en data/npcs.ts,
 * su tarea en data/tasks.ts y el salto en World.tsx (tapB1).
 * El id empieza por "b1-01-", así isMemoryScene la reconoce como recuerdo.
 */
export const B1_DEMO_ID = 'b1-01-demo'
export const B1_DEMO_NPC = 'b1-01-demo-friend'

const MAP = [
  '##############',
  '#W....W....W.#',
  '#............#',
  '#..K......K..#',
  '#............#',
  '#............#',
  '##############',
]

export const B1_MEMORY_DEMO: SceneDef = {
  id: B1_DEMO_ID,
  name: 'Recuerdo 1 (prueba)',
  topics: [],
  map: MAP,
  start: { x: 2, y: 5 },
  bossDoor: { x: 0, y: 0 },
  keysNeeded: 0,
  entities: [{ type: 'npc', id: B1_DEMO_NPC, x: 11, y: 2 }],
  labels: [{ text: 'Pasillo', x: 7, y: 5 }],
  zoneAt: () => 'aula-futuro',
  examine: {},
  requirements: [],
  chips: () => [{ label: 'Recuerdo de prueba: habla con la persona de la puerta', done: false }],
  intro: {
    first: 'Un recuerdo que no es tuyo. Caminas por un pasillo gris. Alguien espera junto a la puerta.',
    later: 'Un recuerdo que no es tuyo.',
  },
}
