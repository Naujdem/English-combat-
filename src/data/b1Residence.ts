import type { GameState, SceneDef, Zone } from '../game/types'
import { closeId } from './b1World'
import { B1_04_JEISON, B1_04_NEIGHBOUR1, B1_04_NEIGHBOUR2, B1_04_REPAIR, B1_04_TOOLBOX } from './b1Neighbours'

/**
 * B1-04 · House Rules (presente). Bloque A: la residencia de estudiantes de Lumen Bay.
 * La escena es b1-04-residence: NO es recuerdo (game/memory.ts, isMemoryScene, solo toma las misiones impares).
 *
 * Un solo mapa que crecerá con los bloques 4-B y 4-C:
 *   vestíbulo (izquierda: mostrador de Marisol, sofá, escaleras con la gata Moscú, una planta)
 *   → pasillo con 3 puertas (dos cuartos de vecinos y tu cuarto) → calle corta con la puerta del banco.
 * Orden: Marisol da la bienvenida (tarea b1-04-welcome) → aparece Maya: lección 'obligation-b1' + práctica (b1-04-rules)
 *   → The Fine Print (b1-04-fineprint, components/FinePrint.tsx). El pasillo y la calle siguen cerrados: los abren 4-B y 4-C.
 * Bloque B (data/b1Neighbours.ts): al terminar The Fine Print se abre el pasillo: Jeison (b1-04-jeison) → vecino 1 → vecina 2
 *   (esbirros con banco compartido) → se abre tu cuarto: la caja de herramientas (Repair Shop, b1-04-repair, data/b1Repair.ts).
 * Bloque C: al terminar el Repair Shop se abren la calle y el banco: Ricardo (b1-04-ricardo, práctica de escucha)
 *   → Maya en el banco: lección 'bank-phrasal' + práctica (b1-04-phrasal) → mensaje de Marisol (gancho del jefe de 4-D). Ningún bloque A/B guarda closeId(4). Preguntas en data/questions-b1-04.ts.
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
/** Bloque C: el banco */
export const B1_04_RICARDO = 'b1-04-ricardo'
/** La tarea de Ricardo se llama igual que el NPC: done 'b1-04-ricardo' */
export const B1_04_RICARDO_DONE = 'b1-04-ricardo'
export const B1_04_MAYA_BANK = 'b1-04-maya-bank'
export const B1_04_PHRASAL = 'b1-04-phrasal'

/**
 * Leyenda (Tiles.tsx, sin dibujos nuevos): # pared · h letrero · ^ escaleras · p planta · C mostrador · A sofá · d puerta
 * O escritorio (formularios) · F archivador · V máquina (cajero automático) · s asientos · , acera · = calle.
 * Vestíbulo x 1-7 (puerta al pasillo en 8,4). Pasillo x 9-15 (cuartos arriba: 10,1 · 12,1 · 14,1 = tu cuarto; puertas en y 2).
 * Calle x 17-22 (puerta desde el pasillo en 16,4). Banco x 24-29 (puerta desde la calle en 23,4; mostrador en y 2, Ricardo detrás).
 */
const MAP = [
  '####h#####################h####',
  '#^.....p##.#.#.#########.....F#',
  '#^......##d#d#d#########.CCCC.#',
  '#...CCC.#.......#,,,,,,#......#',
  '#.......d.......d,,,,,,d......#',
  '#AA.....#.......#======#p....O#',
  '#.......#########======#ss...V#',
  '###############################',
]

function zoneAt(x: number): Zone {
  if (x <= 8) return 'recepcion'
  if (x <= 16) return 'casa'
  if (x >= 24) return 'oficina'
  return 'calle'
}

const NOT_YET = (sub: string) => ({ text: 'Todavía no.', sub })

const SOFA = { text: 'A comfortable sofa.', sub: 'Un sofá cómodo.', say: 'A comfortable sofa.' }
const STAIRS = { text: 'The stairs go up to the rooms.', sub: 'Las escaleras suben a los cuartos.', say: 'The stairs go up to the rooms.' }
const COUNTER = { text: 'The bank counter. Ricardo works here.', sub: 'El mostrador del banco. Ricardo trabaja aquí.', say: 'The bank counter. Ricardo works here.' }
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
    // Bloque B (data/b1Neighbours.ts): Jeison en el pasillo; los vecinos en cadena; la caja de herramientas en tu cuarto
    { type: 'npc', id: B1_04_JEISON, x: 10, y: 3 },
    { type: 'enemy', id: B1_04_NEIGHBOUR1, x: 12, y: 3, after: B1_04_JEISON },
    { type: 'enemy', id: B1_04_NEIGHBOUR2, x: 13, y: 5, after: B1_04_NEIGHBOUR1 },
    { type: 'npc', id: B1_04_TOOLBOX, x: 14, y: 1 },
    // Bloque C: el banco. Ricardo detrás del mostrador; Maya aparece al terminar con Ricardo (npcs.ts, after: b1-04-ricardo)
    { type: 'npc', id: B1_04_RICARDO, x: 26, y: 1 },
    { type: 'npc', id: B1_04_MAYA_BANK, x: 25, y: 4 },
  ],
  labels: [
    { text: 'Vestíbulo', x: 5, y: 6 },
    { text: 'Pasillo', x: 12, y: 4 },
    { text: 'Tu cuarto', x: 14, y: 1 },
    { text: 'Banco', x: 26, y: 4 },
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
    '25,2': COUNTER,
    '26,2': COUNTER,
    '27,2': COUNTER,
    '28,2': COUNTER,
    '29,6': { text: 'A cash machine. You can take out money here.', sub: 'Un cajero automático. Aquí puedes sacar dinero.', say: 'A cash machine. You can take out money here.' },
    '26,0': { text: 'BANK. Open from nine to five.', sub: 'BANCO. Abierto de nueve a cinco.', say: 'Bank. Open from nine to five.' },
    '29,5': { text: 'Forms to fill in.', sub: 'Formularios para llenar.', say: 'Forms to fill in.' },
    '4,0': { text: 'Rules: Quiet after ten.', sub: 'Reglas: silencio después de las diez.', say: 'Rules: Quiet after ten.' },
  },
  // El pasillo se abre tras The Fine Print; tu cuarto, al vencer a los dos vecinos. Los cuartos de los vecinos, la calle y el banco siguen cerrados (4-C)
  locked: (x, y, s) => {
    if (x === 8 && y === 4 && !s.opened.includes(B1_04_FINEPRINT)) return NOT_YET('Primero lee el contrato con Maya.')
    if (x === 14 && y === 2 && !s.defeated.includes(B1_04_NEIGHBOUR2)) return NOT_YET('Primero habla con los vecinos ruidosos.')
    if (y === 2 && (x === 10 || x === 12)) return NOT_YET('Es el cuarto de un vecino.')
    // Bloque C: la calle y el banco se abren al terminar el Repair Shop
    if (((x === 16 && y === 4) || (x === 23 && y === 4)) && !s.opened.includes(B1_04_REPAIR)) return NOT_YET('Primero arregla tu cuarto.')
    return null
  },
  requirements: [],
  chips: (s: GameState) => [
    { label: 'Habla con Marisol', done: s.opened.includes(B1_04_WELCOME) },
    { label: 'Lección de Maya: las reglas', done: s.opened.includes(B1_04_RULES) },
    { label: 'The Fine Print: el contrato', done: s.opened.includes(B1_04_FINEPRINT) },
    { label: 'Habla con Jeison', done: s.opened.includes(B1_04_JEISON) },
    { label: 'Vecinos ruidosos (2)', done: s.defeated.includes(B1_04_NEIGHBOUR1) && s.defeated.includes(B1_04_NEIGHBOUR2) },
    { label: 'Repair Shop: arregla tu cuarto', done: s.opened.includes(B1_04_REPAIR) },
    { label: 'Habla con Ricardo', done: s.opened.includes(B1_04_RICARDO_DONE) },
    { label: 'Lección de Maya: phrasal verbs', done: s.opened.includes(B1_04_PHRASAL) },
  ],
  intro: {
    first: 'Presente. La residencia de estudiantes de Lumen Bay. Una gata te mira desde las escaleras.',
    later: 'La residencia de Lumen Bay.',
  },
}
