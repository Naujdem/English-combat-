import type { GameState, SceneDef, Zone } from '../game/types'
import { closeId } from './b1World'

/**
 * B1-04 · House Rules (presente). Bloque A: la residencia de estudiantes de Lumen Bay.
 * La escena es b1-04-residence: NO es recuerdo (game/memory.ts, isMemoryScene, solo toma las misiones impares).
 *
 * Un solo mapa que crecerá con los bloques 4-B y 4-C:
 *   vestíbulo (izquierda: mostrador de Marisol, sofá, escaleras con la gata Moscú, una planta)
 *   → pasillo con 3 puertas (dos cuartos de vecinos y tu cuarto) → calle corta con la puerta del banco.
 * Orden: Marisol da la bienvenida (tarea b1-04-welcome) → aparece Maya: lección 'obligation-b1' + práctica (b1-04-rules)
 *   → The Fine Print (b1-04-fineprint, components/FinePrint.tsx). El pasillo y la calle siguen cerrados: los abren 4-B y 4-C.
 * Este bloque NO guarda closeId(4). Preguntas en data/questions-b1-04.ts.
 */
export const B1_04_RESIDENCE_ID = 'b1-04-residence'
export const B1_04_MARISOL = 'b1-04-marisol'
/** La gata gris de la residencia: solo examinable (se dibuja con AnimalSprite 'cat', Explore.tsx) */
export const B1_04_MOSCU = 'b1-04-moscu'
export const B1_04_MAYA = 'b1-04-maya'
export const B1_04_WELCOME = 'b1-04-welcome'
export const B1_04_RULES = 'b1-04-rules'
export const B1_04_FINEPRINT = 'b1-04-fineprint'
export const B1_04_CLOSE = closeId(4)

/**
 * Leyenda (Tiles.tsx, sin dibujos nuevos): # pared · h letrero · ^ escaleras · p planta · C mostrador · A sofá · d puerta
 * O escritorio · F archivador · , acera · = calle.
 * Vestíbulo x 1-7 (puerta al pasillo en 8,4). Pasillo x 9-15 (cuartos arriba: 10,1 · 12,1 · 14,1 = tu cuarto; puertas en y 2).
 * Calle x 17-22 (puerta desde el pasillo en 16,4); el banco arriba (puerta en 19,2).
 */
const MAP = [
  '####h###################',
  '#^.....p##.#.#.##..O..F#',
  '#^......##d#d#d####d####',
  '#...CCC.#.......#,,,,,,#',
  '#.......d.......d,,,,,,#',
  '#AA.....#.......#======#',
  '#.......#########======#',
  '########################',
]

function zoneAt(x: number, y: number): Zone {
  if (x <= 8) return 'recepcion'
  if (x <= 16) return 'casa'
  if (y <= 1) return 'oficina'
  return 'calle'
}

const NOT_YET = (sub: string) => ({ text: 'Todavía no.', sub })
const LATER = NOT_YET('Se abre en los siguientes bloques.')

const SOFA = { text: 'A comfortable sofa.', sub: 'Un sofá cómodo.', say: 'A comfortable sofa.' }
const STAIRS = { text: 'The stairs go up to the rooms.', sub: 'Las escaleras suben a los cuartos.', say: 'The stairs go up to the rooms.' }
const DESK = { text: "Marisol's desk. There are keys and papers on it.", sub: 'El escritorio de Marisol. Hay llaves y papeles encima.', say: "Marisol's desk. There are keys and papers on it." }

export const B1_04_RESIDENCE: SceneDef = {
  id: B1_04_RESIDENCE_ID,
  name: 'Lumen Bay · Residencia',
  topics: [],
  map: MAP,
  start: { x: 4, y: 6 },
  // Sin jefe en este bloque: la puerta del jefe apunta a un muro y no hace falta ninguna llave
  bossDoor: { x: 0, y: 0 },
  keysNeeded: 0,
  entities: [
    { type: 'npc', id: B1_04_MARISOL, x: 5, y: 2 },
    { type: 'npc', id: B1_04_MOSCU, x: 2, y: 2 },
    // Maya aparece cuando Marisol terminó la bienvenida (npcs.ts, after: b1-04-welcome)
    { type: 'npc', id: B1_04_MAYA, x: 3, y: 4 },
  ],
  labels: [
    { text: 'Vestíbulo', x: 5, y: 6 },
    { text: 'Pasillo', x: 12, y: 4 },
    { text: 'Tu cuarto', x: 14, y: 1 },
    { text: 'Banco', x: 20, y: 1 },
    { text: 'Calle', x: 20, y: 4 },
  ],
  zoneAt,
  examine: {
    '1,5': SOFA,
    '2,5': SOFA,
    '1,1': STAIRS,
    '1,2': STAIRS,
    '4,3': DESK,
    '5,3': DESK,
    '6,3': DESK,
    '4,0': { text: 'Rules: Quiet after ten.', sub: 'Reglas: silencio después de las diez.', say: 'Rules: Quiet after ten.' },
  },
  // El pasillo se abre en el bloque 4-B; los cuartos, la calle y el banco, en 4-B y 4-C
  locked: (x, y, s) => {
    if (x === 8 && y === 4) return NOT_YET(s.opened.includes(B1_04_FINEPRINT) ? 'Se abre en el siguiente bloque.' : 'Primero lee el contrato con Maya.')
    if (y === 2 && (x === 10 || x === 12 || x === 14 || x === 19)) return LATER
    if (x === 16 && y === 4) return LATER
    return null
  },
  requirements: [],
  chips: (s: GameState) => [
    { label: 'Habla con Marisol', done: s.opened.includes(B1_04_WELCOME) },
    { label: 'Lección de Maya: las reglas', done: s.opened.includes(B1_04_RULES) },
    { label: 'The Fine Print: el contrato', done: s.opened.includes(B1_04_FINEPRINT) },
  ],
  intro: {
    first: 'Presente. La residencia de estudiantes de Lumen Bay. Una gata te mira desde las escaleras.',
    later: 'La residencia de Lumen Bay.',
  },
}
