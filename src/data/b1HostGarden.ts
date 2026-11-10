import type { GameState, SceneDef, Zone } from '../game/types'
import type { ScriptLine } from './b1Accident'

/**
 * B1-12 · Old Friends (presente). Bloque B: el jardín trasero de la casa de los abuelos, al anochecer (escena b1-12-garden).
 * Se entra por la puerta del jardín de la casa (b1-12-house, data/b1HostHouse.ts).
 *
 * Guirnaldas de luces en la pared de la casa, un árbol grande, una banca, una mesita y una reja con puerta al fondo.
 * Tres momentos de amistad (cada uno: lección + práctica; al volver a hablarle, su charla de una sola vez en Explore.tsx):
 *   Leo (b1-12-leo-lesson → b1-12-leo-friend) y Maya (b1-12-maya-lesson → b1-12-maya-friend), en cualquier orden;
 *   la persona especial solo con los dos hechos (b1-12-special-lesson → b1-12-special-friend) → el regalo (b1-12-gift, done b1-12-keychain).
 * Ningún bloque B guarda closeId(12) (se guarda en 12-D).
 */
export const B1_12_GARDEN_ID = 'b1-12-garden'
export const B1_12_LEO = 'b1-12-leo'
export const B1_12_GARDEN_MAYA = 'b1-12-garden-maya'
export const B1_12_SPECIAL = 'b1-12-special'
export const B1_12_LEO_LESSON = 'b1-12-leo-lesson'
export const B1_12_MAYA_LESSON = 'b1-12-maya-lesson'
export const B1_12_SPECIAL_LESSON = 'b1-12-special-lesson'
export const B1_12_LEO_FRIEND = 'b1-12-leo-friend'
export const B1_12_MAYA_FRIEND = 'b1-12-maya-friend'
export const B1_12_SPECIAL_FRIEND = 'b1-12-special-friend'
/** El llavero con forma de reloj: objeto de historia (bandera en opened; se dibuja en el cinturón, heroLook) */
export const B1_12_KEYCHAIN = 'b1-12-keychain'

/**
 * Leyenda (Tiles.tsx, sin dibujos nuevos): # pared (la casa) · h luces · d puerta · , pasto · f cerca · Y árbol
 * H banca · K mesa (la mesita) · p planta.
 * Puerta a la casa arriba (9,0); la puerta de la reja al fondo (11,3).
 */
const MAP = [
  '#h#h#h#h#d##',
  'f,,,,,,,,,,f',
  'f,Y,,,,,,,,f',
  'f,,,,,,,K,,d',
  'f,,HH,,,,,,f',
  'fp,,,,,,,,pf',
  'ffffffffffff',
]

const zoneAt = (): Zone => 'parque'

export const B1_12_GARDEN: SceneDef = {
  id: B1_12_GARDEN_ID,
  name: 'Old Friends · El jardín',
  topics: [],
  map: MAP,
  start: { x: 9, y: 1 },
  // Sin jefe en este bloque: la puerta del jefe apunta a un muro y no hace falta ninguna llave
  bossDoor: { x: 0, y: 0 },
  keysNeeded: 0,
  entities: [
    { type: 'npc', id: B1_12_LEO, x: 5, y: 4 },
    { type: 'npc', id: B1_12_GARDEN_MAYA, x: 8, y: 4 },
    { type: 'npc', id: B1_12_SPECIAL, x: 2, y: 3 },
  ],
  labels: [{ text: 'The garden', x: 6, y: 2 }],
  zoneAt: () => zoneAt(),
  examine: {},
  // La puerta de la reja (11,3) lleva a la ciudad (bloque 12-C, data/b1HostCity.ts) solo con el llavero. La puerta de arriba vuelve a la casa
  locked: (x, y, s) => {
    if (x === 11 && y === 3 && !s.opened.includes(B1_12_KEYCHAIN)) return { text: 'Todavía no.', sub: 'Primero habla con tus amigos.' }
    return null
  },
  links: { '9,0': { sceneId: 'b1-12-house', pos: { x: 9, y: 1 } }, '11,3': { sceneId: 'b1-12-city', pos: { x: 1, y: 3 } } },
  requirements: [],
  chips: (s: GameState) => [
    { label: 'Leo: recuerdos', done: s.opened.includes(B1_12_LEO_FRIEND) },
    { label: 'Maya: familia y amigos', done: s.opened.includes(B1_12_MAYA_FRIEND) },
    { label: 'La persona especial', done: s.opened.includes(B1_12_SPECIAL_FRIEND) },
    { label: 'El llavero', done: s.opened.includes(B1_12_KEYCHAIN) },
  ],
  intro: {
    first: 'The garden at night. — El jardín de noche.',
    later: () => 'The garden at night. — El jardín de noche.',
  },
}

/** El regalo de la persona especial (secuencia fija, MemoryScript). 'narrator' con el nombre de quien habla */
export const B1_12_GIFT_SCRIPT: ScriptLine[] = [
  { who: 'narrator', text: '(The special person takes something out of a pocket.)', es: '(La persona especial saca algo del bolsillo.)' },
  { who: 'narrator', text: 'Special person: I found this in a small shop by the harbour. It made me think of you.', es: 'La persona especial: Lo encontré en una tiendita del puerto. Me hizo pensar en ti.' },
  { who: 'narrator', text: '(It is a small keychain, shaped like a clock.)', es: '(Es un llavero pequeño, con forma de reloj.)' },
  { who: 'narrator', text: "Special person: So you don't lose your keys in Lumen Bay.", es: 'La persona especial: Para que no pierdas las llaves en Lumen Bay.' },
  { who: 'narrator', text: '(You hang it on your belt.)', es: '(Lo cuelgas en tu cinturón.)' },
]
