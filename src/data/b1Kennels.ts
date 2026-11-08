import type { WhichDogRound } from '../components/WhichDog'
import type { ShelterDogId } from '../components/ShelterDog'
import type { SpriteLook } from '../components/Sprite'
import type { GameState, SceneDef, Zone } from '../game/types'

/**
 * B1-06 · First Job (presente). Bloque B: la zona de las jaulas del refugio Lumen Paws (escena b1-06-kennels).
 * Se entra por la puerta del fondo del recibidor (b1-06-shelter, data/b1Shelter.ts) al terminar 'b1-06-apply'.
 * Orden: Nayi: lección 'relative-clauses' + práctica (b1-06-nayi) → el tablero de pedidos: Which Dog?
 *   (b1-06-dogs, components/WhichDog.tsx, 5 monedas) → la puerta de la oficina: "Próximamente" (bloque 6-C).
 * Los 5 perros son NPC solo examinables (como la gata Moscú de 4-A): se dibujan con ShelterDog (Explore.tsx)
 * y al tocarlos dicen su doneLine (npcs.ts). Ningún bloque B guarda closeId(6).
 */
export const B1_06_KENNELS_ID = 'b1-06-kennels'
export const B1_06_NAYI = 'b1-06-nayi'
export const B1_06_ORDERS = 'b1-06-orders'
export const B1_06_NAYI_DONE = 'b1-06-nayi'
export const B1_06_DOGS = 'b1-06-dogs'

/** Nayi: su sprite (npcs.ts) y su retrato cuando guía la lección (Lesson.tsx, who 'nayi') */
export const B1_06_NAYI_LOOK: SpriteLook = { shirt: '#e0873a', hair: '#6b3a2a', skin: '#d9a37a', gender: 'female' }

/** Los perros en el mapa: id del NPC → cuál perro se dibuja (components/ShelterDog.tsx) */
export const B1_06_DOG_NPCS: Record<string, ShelterDogId> = {
  'b1-06-zirius': 'zirius',
  'b1-06-laica': 'laica',
  'b1-06-kitay': 'kitay',
  'b1-06-fresas': 'fresas',
  'b1-06-lupe': 'lupe',
}

export const B1_06_OFFICE_SOON = 'Próximamente: la oficina de Esteban (bloque 6-C)'

/** Which Dog?: las peticiones de Nayi, en orden */
export const B1_06_WHICH_DOG: WhichDogRound[] = [
  { en: 'Bring me the dog that sleeps all day.', es: 'Tráeme el perro que duerme todo el día.', dog: 'laica' },
  { en: 'Bring me the one whose collar is red.', es: 'Tráeme el que tiene el collar rojo.', dog: 'kitay' },
  { en: 'Bring me the dog that plays with the ball.', es: 'Tráeme el perro que juega con la pelota.', dog: 'zirius' },
  { en: 'Bring me the dog that barks at everything.', es: 'Tráeme el perro que ladra a todo.', dog: 'lupe' },
  { en: 'Bring me the dog I walked yesterday.', es: 'Tráeme el perro que paseé ayer.', dog: 'fresas' },
]

/**
 * Leyenda (Tiles.tsx, sin dibujos nuevos): # pared · d puerta.
 * Puerta de vuelta al recibidor abajo (5,5); puerta de la oficina a la derecha (10,3, cerrada: bloque 6-C).
 */
const MAP = [
  '###########',
  '#.........#',
  '#.........#',
  '#.........d',
  '#.........#',
  '#####d#####',
]

const zoneAt = (): Zone => 'recepcion'

const NOT_YET = (sub: string) => ({ text: 'Todavía no.', sub })

export const B1_06_KENNELS: SceneDef = {
  id: B1_06_KENNELS_ID,
  name: 'Lumen Paws · Las jaulas',
  topics: [],
  map: MAP,
  start: { x: 5, y: 4 },
  // Sin jefe en este bloque: la puerta del jefe apunta a un muro y no hace falta ninguna llave
  bossDoor: { x: 0, y: 0 },
  keysNeeded: 0,
  entities: [
    { type: 'npc', id: B1_06_NAYI, x: 4, y: 3 },
    { type: 'npc', id: 'b1-06-zirius', x: 2, y: 1 },
    { type: 'npc', id: 'b1-06-laica', x: 4, y: 1 },
    { type: 'npc', id: 'b1-06-kitay', x: 6, y: 1 },
    { type: 'npc', id: 'b1-06-fresas', x: 8, y: 1 },
    { type: 'npc', id: 'b1-06-lupe', x: 2, y: 3 },
    { type: 'npc', id: B1_06_ORDERS, x: 9, y: 2 },
  ],
  labels: [
    { text: 'Jaulas', x: 5, y: 2 },
    { text: 'La oficina', x: 9, y: 4 },
  ],
  zoneAt: () => zoneAt(),
  examine: {},
  // La oficina: cerrada; al terminar Which Dog?, el aviso del bloque 6-C
  locked: (x, y, s) => {
    if (x !== 10 || y !== 3) return null
    if (!s.opened.includes(B1_06_DOGS)) return NOT_YET('Primero ayuda a Nayi con los perros.')
    return { text: 'The office.', sub: B1_06_OFFICE_SOON }
  },
  // Vuelta al recibidor (data/b1Shelter.ts)
  links: { '5,5': { sceneId: 'b1-06-shelter', pos: { x: 5, y: 1 } } },
  requirements: [],
  chips: (s: GameState) => [
    { label: 'Habla con Nayi', done: s.opened.includes(B1_06_NAYI_DONE) },
    { label: 'El tablero de pedidos', done: s.opened.includes(B1_06_DOGS) },
    { label: B1_06_OFFICE_SOON, done: false },
  ],
  intro: {
    first: 'Who is who? — ¿Quién es quién?',
    later: 'Who is who? — ¿Quién es quién?',
  },
}
