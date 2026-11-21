import type { GameState, SceneDef, Zone } from '../game/types'
import type { ScriptLine } from './b1Accident'

/**
 * B2-01 · Catching Up (presente). Bloque 1: el paseo del puerto de Lumen Bay con la terraza del café (escena b2-01-port).
 * Para ahorrar escenas, el café, Marisol (con Moscú), Jeison y Nayi (paseando a Lupe) están en el mismo paseo
 * (la ficha los ponía en la residencia y en Lumen Paws).
 * Orden: la persona especial (b2-01-breakfast, script: el desayuno y la voz de Leo) →
 *   la persona especial: lección 'catching-up-b2' + práctica (b2-01-catchup) →
 *   ponerse al día con Marisol, Jeison y Nayi (b2-01-marisol, b2-01-jeison, b2-01-nayi, scripts) →
 *   la persona especial: lección 'pp-contrast-b2' + práctica (b2-01-ppcont).
 * Bloque 2 (pendiente): reacciones, Group Chat, esbirros y el jefe Echo of the Grudge. Bloque 3: amistad, diario, recompensa y cierre.
 */
export const B2_01_PORT_ID = 'b2-01-port'
export const B2_01_SPECIAL = 'b2-01-special'
export const B2_01_LEO = 'b2-01-leo'
export const B2_01_MAYA = 'b2-01-maya'
export const B2_01_MARISOL = 'b2-01-marisol'
export const B2_01_JEISON = 'b2-01-jeison'
export const B2_01_NAYI = 'b2-01-nayi'
/** Moscú, la gata de Marisol (se dibuja con AnimalSprite, Explore.tsx) */
export const B2_01_MOSCU = 'b2-01-moscu'
/** Tareas (marcas en `opened`) */
export const B2_01_BREAKFAST = 'b2-01-breakfast'
export const B2_01_CATCHUP = 'b2-01-catchup'
export const B2_01_PPCONT = 'b2-01-ppcont'
/** Charlas con Marisol, Jeison y Nayi: la marca es el id del NPC + '-talk' */
export const B2_01_TALKS = [`${B2_01_MARISOL}-talk`, `${B2_01_JEISON}-talk`, `${B2_01_NAYI}-talk`]

/**
 * Leyenda (Tiles.tsx, sin dibujos nuevos): f valla · h farol · _ suelo del paseo · K mesa · p planta · w agua.
 * Arriba la terraza del café (mesas), abajo el muelle y el agua.
 */
const MAP = [
  'fhfhfhfhfhff',
  'f_KK____KK_f',
  'f__________f',
  'f__________f',
  'fp________pf',
  'wwwwwwwwwwww',
  'wwwwwwwwwwww',
]

const zoneAt = (y: number): Zone => (y <= 2 ? 'cafe' : 'calle')

export const B2_01_PORT: SceneDef = {
  id: B2_01_PORT_ID,
  name: 'Catching Up · El paseo del puerto',
  topics: [],
  map: MAP,
  start: { x: 5, y: 3 },
  // Sin jefe en este bloque: la puerta del jefe apunta a un muro y no hace falta ninguna llave
  bossDoor: { x: 0, y: 0 },
  keysNeeded: 0,
  entities: [
    { type: 'npc', id: B2_01_SPECIAL, x: 4, y: 2 },
    { type: 'npc', id: B2_01_LEO, x: 2, y: 2 },
    { type: 'npc', id: B2_01_MAYA, x: 3, y: 2 },
    { type: 'npc', id: B2_01_MARISOL, x: 9, y: 2 },
    { type: 'npc', id: B2_01_MOSCU, x: 10, y: 2 },
    { type: 'npc', id: B2_01_JEISON, x: 7, y: 4 },
    { type: 'npc', id: B2_01_NAYI, x: 9, y: 4 },
  ],
  labels: [{ text: 'Port Café', x: 2, y: 0 }],
  zoneAt: (_x, y) => zoneAt(y),
  examine: {
    '5,5': { text: 'The sea is calm this morning.', sub: 'El mar está tranquilo esta mañana.', say: 'The sea is calm this morning.' },
  },
  locked: () => null,
  links: {},
  requirements: [],
  chips: (s: GameState) => [
    { label: 'Desayuno en el café', done: s.opened.includes(B2_01_BREAKFAST) },
    { label: 'Ponerse al día (lección)', done: s.opened.includes(B2_01_CATCHUP) },
    { label: 'Marisol, Jeison y Nayi', done: B2_01_TALKS.every((t) => s.opened.includes(t)) },
    { label: 'Present perfect: simple o continuo', done: s.opened.includes(B2_01_PPCONT) },
  ],
  intro: {
    first: 'The morning after the harbour. The Port Café smells of coffee. — La mañana después del puerto. El café huele a café.',
    later: () => 'The port promenade. — El paseo del puerto.',
  },
}

/** El desayuno (secuencia fija, MemoryScript): la voz de Leo se quiebra y la persona especial lo nota */
export const B2_01_BREAKFAST_SCRIPT: ScriptLine[] = [
  { who: 'narrator', text: '(The Port Café. Your friends are already at a table by the window.)', es: '(El café del puerto. Tus amigos ya están en una mesa junto a la ventana.)' },
  { who: 'narrator', text: 'Maya: There you are! We ordered you a hot chocolate.', es: 'Maya: ¡Ahí estás! Te pedimos un chocolate caliente.' },
  { who: 'narrator', text: 'Leo: Good m… (his voice breaks.) …morning.', es: 'Leo: Buenos dí… (se le quiebra la voz.) …días.' },
  { who: 'narrator', text: 'Leo: Ha! Too much coffee. Anyway!', es: 'Leo: ¡Ja! Demasiado café. ¡En fin!' },
  { who: 'narrator', text: '(The special person looks at Leo for a second, but says nothing.)', es: '(La persona especial mira a Leo un segundo, pero no dice nada.)' },
  { who: 'narrator', text: 'Special person: So much has happened. We never just talk anymore. What have you been up to?', es: 'La persona especial: Han pasado tantas cosas. Ya nunca hablamos sin más. ¿En qué has andado?' },
  { who: 'narrator', text: '(You open your mouth… and realise you don\'t know how to start.)', es: '(Abres la boca… y te das cuenta de que no sabes cómo empezar.)' },
  { who: 'narrator', text: 'Special person: Come on, I\'ll show you. Catching up is easy.', es: 'La persona especial: Ven, te enseño. Ponerse al día es fácil.' },
]

/** Marisol, con Moscú: lleva semanas arreglando el jardín de la residencia */
export const B2_01_MARISOL_SCRIPT: ScriptLine[] = [
  { who: 'narrator', text: 'Marisol: Long time no see! How have you been?', es: 'Marisol: ¡Cuánto tiempo sin verte! ¿Cómo has estado?' },
  { who: 'narrator', text: 'Marisol: Me? I\'ve been working on the garden for weeks. Look at my hands!', es: 'Marisol: ¿Yo? Llevo semanas trabajando en el jardín. ¡Mira mis manos!' },
  { who: 'narrator', text: 'Marisol: I\'ve planted twenty roses so far. Moscú has dug up three of them.', es: 'Marisol: Hasta ahora he plantado veinte rosas. Moscú ya desenterró tres.' },
  { who: 'narrator', text: '(Moscú looks at you as if nothing happened.)', es: '(Moscú te mira como si nada hubiera pasado.)' },
]

/** Jeison: ha estado estudiando para un examen y ya terminó dos */
export const B2_01_JEISON_SCRIPT: ScriptLine[] = [
  { who: 'narrator', text: 'Jeison: Hey! It\'s been ages! What have you been up to?', es: 'Jeison: ¡Hola! ¡Hace siglos! ¿En qué has andado?' },
  { who: 'narrator', text: 'Jeison: I\'ve been studying all week. I\'m exhausted.', es: 'Jeison: He estado estudiando toda la semana. Estoy agotado.' },
  { who: 'narrator', text: 'Jeison: But good news: I\'ve finished two exams. Only one more!', es: 'Jeison: Pero buenas noticias: ya terminé dos exámenes. ¡Solo me falta uno!' },
]

/** Nayi, paseando a Lupe: ha estado corriendo con los perros (evidencia visible: está sin aliento) */
export const B2_01_NAYI_SCRIPT: ScriptLine[] = [
  { who: 'narrator', text: '(Nayi arrives out of breath. Lupe is pulling the leash.)', es: '(Nayi llega sin aliento. Lupe tira de la correa.)' },
  { who: 'narrator', text: 'Nayi: Sorry, I\'ve been running with the dogs since seven!', es: 'Nayi: ¡Perdón, llevo corriendo con los perros desde las siete!' },
  { who: 'narrator', text: 'Nayi: I\'ve walked five dogs today. Lupe is the last one.', es: 'Nayi: Hoy ya paseé cinco perros. Lupe es la última.' },
  { who: 'narrator', text: 'Nayi: How long have you been in Lumen Bay now? It feels like forever!', es: 'Nayi: ¿Cuánto llevas en Lumen Bay ya? ¡Parece una eternidad!' },
]
