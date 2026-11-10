import type { GameState, SceneDef, Zone } from '../game/types'
import { B1_12_CLOSE, B1_12_DONE_TEXT } from './b1HostPlaza'

/**
 * B1-12 · Old Friends (presente). Bloque C: el paseo por Lumen Bay con el abuelo Einer, al anochecer (escena b1-12-city).
 * Se entra por la reja del jardín (b1-12-garden, data/b1HostGarden.ts) cuando el llavero (b1-12-keychain) está hecho.
 *
 * Una calle con edificios altos (fachadas con ventanas: el "rascacielos"), un mirador con banca a la mitad y una plaza al fondo.
 * Orden: Einer en la entrada: future continuous (b1-12-fc) → Einer en el mirador: sustantivos compuestos (b1-12-cn)
 *   → la charla con Einer (b1-12-einer-talk, debate) → la puerta de la plaza: "Próximamente" (bloque 12-D).
 * Ningún bloque C guarda closeId(12) (se guarda en 12-D).
 */
export const B1_12_CITY_ID = 'b1-12-city'
export const B1_12_CITY_EINER = 'b1-12-city-einer'
export const B1_12_LOOKOUT_EINER = 'b1-12-lookout-einer'
export const B1_12_FC = 'b1-12-fc'
export const B1_12_CN = 'b1-12-cn'
export const B1_12_EINER_TALK = 'b1-12-einer-talk'

/**
 * Leyenda (Tiles.tsx, sin dibujos nuevos): # pared · W ventana (las fachadas altas) · h letrero · @ reloj (la vieja torre)
 * _ acera · = calle · z cebra · P parada de autobús · H banca (el mirador) · p planta · d puerta.
 * Puerta al jardín a la izquierda (0,3); puerta de la plaza a la derecha (12,3).
 */
const MAP = [
  '#WW#WW#h#@#W#',
  '#WW#WW#_#_#W#',
  '#___________#',
  'd___________d',
  '#=====z=====#',
  '#_P____HH___#',
  '#############',
]

const zoneAt = (): Zone => 'calle'

const SKYSCRAPER = { text: 'A very tall skyscraper.', sub: 'Un rascacielos muy alto.', say: 'A skyscraper.' }

export const B1_12_CITY: SceneDef = {
  id: B1_12_CITY_ID,
  name: 'Old Friends · La ciudad',
  topics: [],
  map: MAP,
  start: { x: 1, y: 3 },
  // Sin jefe en este bloque: la puerta del jefe apunta a un muro y no hace falta ninguna llave
  bossDoor: { x: 0, y: 0 },
  keysNeeded: 0,
  entities: [
    { type: 'npc', id: B1_12_CITY_EINER, x: 2, y: 2 },
    { type: 'npc', id: B1_12_LOOKOUT_EINER, x: 9, y: 5 },
  ],
  labels: [{ text: 'Lumen Bay', x: 6, y: 2 }],
  zoneAt: () => zoneAt(),
  examine: {
    '1,0': SKYSCRAPER,
    '2,0': SKYSCRAPER,
    '1,1': SKYSCRAPER,
    '2,1': SKYSCRAPER,
    '7,0': { text: 'The city centre is very crowded today.', sub: 'El centro de la ciudad está muy lleno hoy.', say: 'The city centre is crowded.' },
    '9,0': { text: 'This old clock tower is a famous landmark.', sub: 'Esta vieja torre del reloj es un lugar emblemático.', say: 'A famous landmark.' },
  },
  // La puerta de la plaza (12,3) lleva a la plaza (bloque 12-D, data/b1HostPlaza.ts) tras la charla con Einer. La de la izquierda vuelve al jardín
  locked: (x, y, s) => {
    if (x === 12 && y === 3 && !s.opened.includes(B1_12_EINER_TALK)) return { text: 'Todavía no.', sub: 'Primero termina el recorrido con Einer.' }
    return null
  },
  links: { '0,3': { sceneId: 'b1-12-garden', pos: { x: 10, y: 3 } }, '12,3': { sceneId: 'b1-12-plaza', pos: { x: 1, y: 3 } } },
  requirements: [],
  chips: (s: GameState) => [
    { label: 'Einer: el futuro en progreso', done: s.opened.includes(B1_12_FC) },
    { label: 'El mirador: sustantivos compuestos', done: s.opened.includes(B1_12_CN) },
    { label: 'La charla con Einer', done: s.opened.includes(B1_12_EINER_TALK) },
  ],
  intro: {
    first: 'A walk through Lumen Bay. — Un paseo por Lumen Bay.',
    later: (s: GameState) => (s.opened.includes(B1_12_CLOSE) ? B1_12_DONE_TEXT : 'A walk through Lumen Bay. — Un paseo por Lumen Bay.'),
  },
}
