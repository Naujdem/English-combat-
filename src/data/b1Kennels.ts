import type { WhichDogRound } from '../components/WhichDog'
import type { ShelterDogId } from '../components/ShelterDog'
import type { SpriteLook } from '../components/Sprite'
import type { EnemyDef, GameState, SceneDef, Zone } from '../game/types'

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

/** Bloque C: la segunda tarea de Nayi (lección 'experience-b1') y los 2 voluntarios cansados (esbirros encadenados) */
export const B1_06_EXPERIENCE = 'b1-06-experience'
export const B1_06_VOLUNTEER1 = 'b1-06-volunteer1'
export const B1_06_VOLUNTEER2 = 'b1-06-volunteer2'

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
    // Bloque C: al terminar la lección de experiencia, los voluntarios cansados, uno tras otro
    { type: 'enemy', id: B1_06_VOLUNTEER1, x: 6, y: 3, after: B1_06_EXPERIENCE },
    { type: 'enemy', id: B1_06_VOLUNTEER2, x: 7, y: 4, after: B1_06_VOLUNTEER1 },
  ],
  labels: [
    { text: 'Jaulas', x: 5, y: 2 },
    { text: 'La oficina', x: 9, y: 4 },
  ],
  zoneAt: () => zoneAt(),
  examine: {},
  // La oficina: cerrada hasta vencer a los 2 voluntarios cansados; después lleva a la oficina de Esteban (data/b1EstebanOffice.ts)
  locked: (x, y, s) => {
    if (x !== 10 || y !== 3) return null
    if (!s.opened.includes(B1_06_DOGS)) return NOT_YET('Primero ayuda a Nayi con los perros.')
    if (!s.opened.includes(B1_06_EXPERIENCE)) return NOT_YET('Primero habla otra vez con Nayi.')
    if (!s.defeated.includes(B1_06_VOLUNTEER1) || !s.defeated.includes(B1_06_VOLUNTEER2)) return NOT_YET('Primero ayuda a los voluntarios cansados.')
    return null
  },
  // Vuelta al recibidor (data/b1Shelter.ts) y la oficina (data/b1EstebanOffice.ts)
  links: { '5,5': { sceneId: 'b1-06-shelter', pos: { x: 5, y: 1 } }, '10,3': { sceneId: 'b1-06-office', pos: { x: 1, y: 3 } } },
  requirements: [],
  chips: (s: GameState) => [
    { label: 'Habla con Nayi', done: s.opened.includes(B1_06_NAYI_DONE) },
    { label: 'El tablero de pedidos', done: s.opened.includes(B1_06_DOGS) },
    { label: 'Nayi: cómo contar tu experiencia', done: s.opened.includes(B1_06_EXPERIENCE) },
    { label: 'Voluntarios cansados (2)', done: s.defeated.includes(B1_06_VOLUNTEER1) && s.defeated.includes(B1_06_VOLUNTEER2) },
    { label: 'La oficina', done: s.opened.includes('b1-06-interview') },
  ],
  intro: {
    first: 'Who is who? — ¿Quién es quién?',
    later: 'Who is who? — ¿Quién es quién?',
  },
}

// ── Bloque C · esbirros Tired Volunteer (modelo de los Eviction Notice de 5-C): banco compartido b1-06-v1…v10 ──
const VOLUNTEER_TAGS = ['b1-06-volunteer']
const VOLUNTEER = (id: string, before: { text: string; es: string }, after: { text: string; es: string }, freed: { text: string; es: string }): EnemyDef => ({
  id,
  name: 'Tired Volunteer',
  person: 'Tired Volunteer',
  kind: 'minion',
  echo: true,
  hp: 5,
  topics: ['relative-clauses', 'experience-b1'],
  kinds: ['fix', 'fill', 'order', 'listen'],
  tags: VOLUNTEER_TAGS,
  onlyTags: true,
  zone: 'recepcion',
  look: { shirt: '#6e8b5f', hair: '#7a6a58', skin: '#d6b08c' },
  before: [before],
  after: [after],
  freed,
})

export const B1_06_ENEMIES: Record<string, EnemyDef> = {
  [B1_06_VOLUNTEER1]: VOLUNTEER(
    B1_06_VOLUNTEER1,
    { text: "The dog who's collar is red is tired! The girl which works here is tired too!", es: "The dog who's collar y The girl which works here: mal. (¡Estoy cansado!)" },
    { text: 'The dogs are quiet... I just needed some sleep.', es: 'Los perros están callados... solo necesitaba dormir.' },
    { text: "Sorry! I wasn't myself.", es: '¡Perdón! No era yo.' },
  ),
  [B1_06_VOLUNTEER2]: VOLUNTEER(
    B1_06_VOLUNTEER2,
    { text: 'I worked here since three years! I have walked the dogs yesterday!', es: 'I worked here since three years y I have walked the dogs yesterday: mal.' },
    { text: 'I feel awake again.', es: 'Me siento despierto otra vez.' },
    { text: 'Good luck with Esteban!', es: '¡Suerte con Esteban!' },
  ),
}
