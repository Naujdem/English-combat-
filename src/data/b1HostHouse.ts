import type { GameState, SceneDef, Zone } from '../game/types'
import type { ScriptLine } from './b1Accident'
import type { MemoryPair } from '../components/MemoryChest'
import { B1_12_CLOSE, B1_12_DONE_TEXT } from './b1HostPlaza'

/**
 * B1-12 · Old Friends (presente). Bloque A: la sala-comedor de la casa de la familia anfitriona en Lumen Bay, al atardecer (escena b1-12-house).
 * NO es recuerdo (game/memory.ts solo toma las misiones impares).
 *
 * Una mesa grande con platos, la cocina con mostrador y nevera, un sillón (Minus, el gato, duerme ahí), plantas,
 * una repisa con el álbum de fotos y la puerta al jardín.
 * Orden: Jhoana (b1-12-welcome, script) → Maya: lección 'state-verbs-b1' + práctica (b1-12-verbs) →
 *   el álbum de fotos: Memory Chest (b1-12-photos, 10 monedas) → la puerta al jardín: "Próximamente" (bloque 12-B).
 * Ningún bloque A guarda closeId(12) (se guarda en 12-D).
 */
export const B1_12_HOUSE_ID = 'b1-12-house'
export const B1_12_JHOANA = 'b1-12-jhoana'
export const B1_12_EINER = 'b1-12-einer'
export const B1_12_MAYA = 'b1-12-maya'
export const B1_12_ALBUM = 'b1-12-album'
export const B1_12_WELCOME = 'b1-12-welcome'
export const B1_12_VERBS = 'b1-12-verbs'
export const B1_12_PHOTOS = 'b1-12-photos'

/**
 * Leyenda (Tiles.tsx, sin dibujos nuevos): # pared · W ventana · L estantería (la repisa del álbum) · d puerta
 * J nevera · C mostrador (la cocina) · K mesa · A sofá · p planta.
 * Puerta al jardín arriba (9,0); entrada de la casa abajo (5,6).
 */
const MAP = [
  '###W##LL#d##',
  '#JCC.......#',
  '#..........#',
  '#...KKK....#',
  '#..........#',
  '#p......AAp#',
  '#####d######',
]

const zoneAt = (): Zone => 'recepcion'

const MINUS = { text: 'Minus the cat is asleep on the sofa.', sub: 'Minus, el gato, duerme en el sillón.', say: 'Minus is asleep.' }

export const B1_12_HOUSE: SceneDef = {
  id: B1_12_HOUSE_ID,
  name: 'Old Friends · La casa de los abuelos',
  topics: [],
  map: MAP,
  start: { x: 5, y: 5 },
  // Sin jefe en este bloque: la puerta del jefe apunta a un muro y no hace falta ninguna llave
  bossDoor: { x: 0, y: 0 },
  keysNeeded: 0,
  entities: [
    { type: 'npc', id: B1_12_JHOANA, x: 2, y: 2 },
    { type: 'npc', id: B1_12_EINER, x: 5, y: 4 },
    { type: 'npc', id: B1_12_MAYA, x: 7, y: 3 },
    { type: 'npc', id: B1_12_ALBUM, x: 6, y: 1 },
  ],
  labels: [{ text: "The grandparents' house", x: 6, y: 2 }],
  zoneAt: () => zoneAt(),
  examine: {
    '8,5': MINUS,
    '9,5': MINUS,
  },
  // La puerta al jardín (9,0) lleva al jardín (bloque 12-B, data/b1HostGarden.ts). La salida: con el botón Mapa
  locked: (x, y) => {
    if (x === 5 && y === 6) return { text: 'The way out.', sub: 'Para volver al mapa, toca el botón Mapa.' }
    return null
  },
  links: { '9,0': { sceneId: 'b1-12-garden', pos: { x: 9, y: 1 } } },
  requirements: [],
  chips: (s: GameState) => [
    { label: 'Saludar a Jhoana y Einer', done: s.opened.includes(B1_12_WELCOME) },
    { label: 'La lección de Maya', done: s.opened.includes(B1_12_VERBS) },
    { label: 'El álbum de fotos', done: s.opened.includes(B1_12_PHOTOS) },
  ],
  intro: {
    first: "Dinner at the grandparents'. — La cena en casa de los abuelos.",
    later: (s: GameState) => (s.opened.includes(B1_12_CLOSE) ? B1_12_DONE_TEXT : "Dinner at the grandparents'. — La cena en casa de los abuelos."),
  },
}

/** La bienvenida de los abuelos (secuencia fija, MemoryScript). 'narrator' con el nombre de quien habla */
export const B1_12_WELCOME_SCRIPT: ScriptLine[] = [
  { who: 'narrator', text: 'Jhoana: Welcome, welcome! Come in. You must be hungry.', es: 'Jhoana: ¡Bienvenidos! Pasen. Deben tener hambre.' },
  { who: 'narrator', text: 'Einer: We are so happy to have you in Lumen Bay. This house is yours too.', es: 'Einer: Estamos muy felices de tenerlos en Lumen Bay. Esta casa también es suya.' },
  { who: 'narrator', text: "Jhoana: Sit down, please. Minus is asleep, but he doesn't mind.", es: 'Jhoana: Siéntense, por favor. Minus está dormido, pero no le importa.' },
  { who: 'narrator', text: "Einer: After dinner, I'll show you my city.", es: 'Einer: Después de la cena, les mostraré mi ciudad.' },
]

/** El álbum de fotos (Memory Chest): cada lugar con su recuerdo */
export const B1_12_PHOTO_PAIRS: MemoryPair[] = [
  { a: 'The plane', b: 'The travel pillow', example: { en: 'I remember the plane. I still have the travel pillow.', es: 'Recuerdo el avión. Todavía tengo la almohada de viaje.' } },
  { a: 'The residence', b: 'The keychain', example: { en: 'I remember the residence. I still have the keychain.', es: 'Recuerdo la residencia. Todavía tengo el llavero.' } },
  { a: 'The shelter', b: 'The T-shirt', example: { en: 'I remember the shelter. I still wear the T-shirt.', es: 'Recuerdo el refugio. Todavía uso la camiseta.' } },
  { a: 'The stadium', b: 'The scarf', example: { en: 'I remember the stadium. I love the scarf.', es: 'Recuerdo el estadio. Me encanta la bufanda.' } },
  { a: 'The festival', b: 'The wristband', example: { en: 'I remember the festival. I still wear the wristband.', es: 'Recuerdo el festival. Todavía uso la pulsera.' } },
]

export const B1_12_PHOTOS_MEMORY: { title: string; intro: { en: string; es: string }; pairs: MemoryPair[] } = {
  title: 'The Photo Album',
  intro: { en: 'These photos are full of memories. Match each place with its souvenir.', es: 'Estas fotos están llenas de recuerdos. Une cada lugar con su recuerdo.' },
  pairs: B1_12_PHOTO_PAIRS,
}
