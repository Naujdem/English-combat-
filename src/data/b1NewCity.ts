import type { DialogLine, GameState, Interest, SceneDef, Zone } from '../game/types'
import { closeId } from './b1World'
import { B1_02_PLANE_CHATS } from './friends'
import { B1_02_CLERK, B1_02_JACK, B1_02_LUGGAGE, B1_02_TRAV1, B1_02_TRAV2 } from './b1Airport'

/**
 * B1-02 · A New City (presente). Bloque A: el avión, el aeropuerto y la lección de Leo.
 * La escena es b1-02-lumen: NO es recuerdo (game/memory.ts, isMemoryScene, solo toma las misiones impares).
 *
 * Un solo mapa que crecerá con los bloques 2-B y 2-C:
 *   avión (izquierda, 4x3) → aeropuerto (sala de llegadas, cinta de equipaje, tablero de vuelos)
 *   → tienda de celulares, oficina del intercambio y calle hacia la residencia (cerradas: "Todavía no.").
 * Al entrar por primera vez empieza la charla del avión con la persona especial (Explore.tsx, quest 'b1-02-plane'):
 *   narrador → dos charlas casuales B1 (B1_02_PLANE_CHATS en data/friends.ts) → aterrizaje. Al terminar se guarda B1_02_LANDED
 *   y se abre la puerta del avión. Leo espera junto a la cinta: lección 'pp-yet-already' + práctica (tarea b1-02-practice).
 * Preguntas en data/questions-b1-02.ts.
 */
export const B1_02_LUMEN_ID = 'b1-02-lumen'
/** Terminaron las dos charlas del avión y el avión aterrizó (se abre la puerta del avión) */
export const B1_02_LANDED = 'b1-02-landed'
export const B1_02_PRACTICE = 'b1-02-practice'
export const B1_02_LEO = 'b1-02-leo'
/** La persona especial: sentada en el avión hasta aterrizar, y luego en el aeropuerto */
export const B1_02_INTEREST_PLANE = 'b1-02-interest-plane'
export const B1_02_INTEREST = 'b1-02-interest'
export const B1_02_CLOSE = closeId(2)

/**
 * Leyenda (Tiles.tsx, sin dibujos nuevos): # pared · s asientos · d puerta · h letrero · v pantalla (tablero de vuelos)
 * C mostrador (cinta de equipaje; en 15,5 el mostrador de Objetos Perdidos) · O escritorio (mostrador de check-in) · p planta · K mesa · F archivador · = calle.
 * Avión x 1-4, y 1-3 (puerta de salida en 5,2). Aeropuerto x 6-15. Cerrado (x 16): tienda (16,1), oficina (16,4), calle (16,7).
 */
const MAP = [
  '######h##vv#############',
  '#ss.s#.........pd..K..K#',
  '#....d..........#......#',
  '#ss.s#..........########',
  '######..CCCCC...d..O..F#',
  '######.........C#.....p#',
  '######.p....OO..########',
  '######..........d=======',
  '########################',
]

function zoneAt(x: number, y: number): Zone {
  if (x <= 16) return 'estacion'
  if (y <= 2) return 'tienda'
  if (y <= 5) return 'oficina'
  return 'calle'
}

const NOT_YET = (sub: string) => ({ text: 'Todavía no.', sub })

const BOARDING = { text: 'Your boarding pass. Flight to Lumen Bay, seat 2B.', sub: 'Tu pase de abordar. Vuelo a Lumen Bay, asiento 2B.', say: 'Your boarding pass.' }
const BOARD = { text: 'The departures board. Some flights have a delay.', sub: 'El tablero de salidas. Algunos vuelos tienen retraso.', say: 'The departures board.' }
const BELT = { text: 'The luggage belt. Suitcases go round and round.', sub: 'La cinta de equipaje. Las maletas dan vueltas y vueltas.', say: 'Suitcases go round and round.' }
const DESK = { text: 'The check-in desk. People check in here before a flight.', sub: 'El mostrador de check-in. La gente se registra aquí antes de un vuelo.', say: 'The check-in desk.' }

export const B1_02_LUMEN: SceneDef = {
  id: B1_02_LUMEN_ID,
  name: 'Lumen Bay · Aeropuerto',
  topics: [],
  map: MAP,
  start: { x: 2, y: 2 },
  // Sin jefe: la puerta del jefe apunta a un muro y no hace falta ninguna llave
  bossDoor: { x: 0, y: 0 },
  keysNeeded: 0,
  entities: [
    { type: 'npc', id: B1_02_INTEREST_PLANE, x: 1, y: 2 },
    { type: 'npc', id: B1_02_INTEREST, x: 7, y: 2 },
    { type: 'npc', id: B1_02_LEO, x: 10, y: 5 },
    // Bloque B (data/b1Airport.ts): cada paso aparece cuando el anterior está hecho
    { type: 'enemy', id: B1_02_TRAV1, x: 13, y: 4, after: B1_02_PRACTICE },
    { type: 'enemy', id: B1_02_TRAV2, x: 11, y: 6, after: B1_02_TRAV1 },
    { type: 'npc', id: B1_02_CLERK, x: 15, y: 6 },
    { type: 'enemy', id: B1_02_JACK, x: 15, y: 3, after: B1_02_LUGGAGE },
  ],
  labels: [
    { text: 'Avión', x: 3, y: 3 },
    { text: 'Llegadas', x: 10, y: 7 },
    { text: 'Tienda de celulares', x: 20, y: 2 },
    { text: 'Oficina del intercambio', x: 20, y: 5 },
    { text: 'Calle', x: 20, y: 7 },
  ],
  zoneAt,
  examine: {
    '1,1': BOARDING,
    '2,1': BOARDING,
    '9,0': BOARD,
    '10,0': BOARD,
    '8,4': BELT,
    '9,4': BELT,
    '10,4': BELT,
    '11,4': BELT,
    '12,4': BELT,
    '12,6': DESK,
    '13,6': DESK,
    '15,5': { text: 'The Lost Property desk.', sub: 'El mostrador de Objetos Perdidos.', say: 'Lost Property.' },
    '6,0': { text: 'A sign: "Welcome to Lumen Bay".', sub: 'Un letrero: "Bienvenidos a Lumen Bay".', say: 'Welcome to Lumen Bay.' },
  },
  // La puerta del avión se abre al aterrizar; lo de la derecha lo llenan los bloques 2-B y 2-C
  locked: (x, y, s) => {
    if (x === 5 && y === 2 && !s.opened.includes(B1_02_LANDED)) return NOT_YET('El avión todavía no ha aterrizado.')
    if (x === 16 && y === 1) return NOT_YET(s.defeated.includes(B1_02_JACK) ? 'Se abre en el siguiente bloque.' : 'La tienda de celulares.')
    if (x === 16 && y === 4) return NOT_YET('La oficina del intercambio.')
    if (x === 16 && y === 7) return NOT_YET('La calle hacia la residencia.')
    return null
  },
  requirements: [],
  chips: (s: GameState) => [
    { label: 'B1-02 · A New City', done: s.opened.includes(B1_02_CLOSE) },
    { label: 'Charla en el avión', done: s.opened.includes(B1_02_LANDED) },
    { label: 'Lección y práctica de Leo, junto a la cinta', done: s.opened.includes(B1_02_PRACTICE) },
    { label: 'Viajeros perdidos', done: s.defeated.includes(B1_02_TRAV1) && s.defeated.includes(B1_02_TRAV2) },
    { label: 'Lost Luggage', done: s.opened.includes(B1_02_LUGGAGE) },
    { label: 'Jack the Rival', done: s.defeated.includes(B1_02_JACK) },
  ],
  intro: {
    first: 'Presente. Vas en el avión hacia Lumen Bay.',
    later: 'Lumen Bay. El aeropuerto: Leo espera junto a la cinta de equipaje.',
  },
}

/** La charla del avión (una sola vez, al empezar el nodo 2): narrador → las dos charlas → aterrizaje */
export function b1PlaneLines(interest: Interest): DialogLine[] {
  const n = interest.name
  const sat = interest.gender === 'female' ? 'sentada' : 'sentado'
  return [
    { who: 'narrator', text: `(You are on the plane to Lumen Bay. ${n} is sitting next to you.)`, es: `(Estás en el avión hacia Lumen Bay. ${n} está ${sat} a tu lado.)` },
    ...B1_02_PLANE_CHATS.map((c): DialogLine => ({ who: 'friend', text: c.text, es: c.es, options: c.options })),
    { who: 'narrator', text: "(The plane lands. 'Welcome to Lumen Bay,' says the pilot.)", es: '(El avión aterriza. «Bienvenidos a Lumen Bay», dice el piloto.)' },
  ]
}
