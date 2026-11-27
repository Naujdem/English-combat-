import type { GameState, SceneDef, Zone } from '../game/types'
import type { ScriptLine } from './b1Accident'

/**
 * B2-14 · Use Your Voice (presente, final de B2 y del juego). El puerto de Lumen Bay al atardecer, el mismo de The Grudge (B1).
 * Guía: Leo (como en A1, cierra el círculo). G se ve transparente y su voz suena débil, pero se oye.
 * Bloque 1: la figura con capucha (b2-14-arrival, script) → Leo: condicionales mixtos, con repaso de los tres de B1
 *   (lección 'mixed-cond-b2' + práctica, b2-14-mixed) → Leo: wish / if only, wish + would y would rather
 *   (lección 'wish-b2' + práctica, b2-14-wish) → la revelación (b2-14-reveal, script): cae la capucha y la estática se limpia:
 *   "G… García." Desde aquí los nombres con estática se ven como "García" (game/staticName.ts, B2_14_REVEALED).
 */
export const B2_14_PORT_ID = 'b2-14-port'
export const B2_14_LEO = 'b2-14-leo'
export const B2_14_MAYA = 'b2-14-maya'
export const B2_14_SPECIAL = 'b2-14-special'
export const B2_14_FIGURE = 'b2-14-figure'
export const B2_14_G = 'b2-14-g'
/** Tareas (marcas en `opened`) */
export const B2_14_ARRIVAL = 'b2-14-arrival'
export const B2_14_MIXED = 'b2-14-mixed'
export const B2_14_WISH = 'b2-14-wish'
/** La revelación: al guardarse, la estática de los nombres se limpia en todo el juego */
export const B2_14_REVEAL = 'b2-14-reveal'

/**
 * Leyenda (como b1Harbour.ts, sin dibujos nuevos): f cerca · h luces (faroles) · _ piedra · w agua · H banca · p planta.
 */
const MAP = [
  'fhfhfhfhfhff',
  'f_H______H_f',
  'f__________f',
  'f__________f',
  'fp________pf',
  'wwwwwwwwwwww',
  'wwwwwwwwwwww',
]

const zoneAt = (): Zone => 'calle'
const WATER = { text: 'The sun is going down over the water.', sub: 'El sol se está poniendo sobre el agua.', say: 'The sun is going down.' }

export const B2_14_PORT: SceneDef = {
  id: B2_14_PORT_ID,
  name: 'Use Your Voice · El puerto al atardecer',
  topics: [],
  map: MAP,
  start: { x: 1, y: 3 },
  // Sin jefe en este bloque: la puerta del jefe apunta a un muro y no hace falta ninguna llave
  bossDoor: { x: 0, y: 0 },
  keysNeeded: 0,
  entities: [
    { type: 'npc', id: B2_14_LEO, x: 3, y: 3 },
    { type: 'npc', id: B2_14_MAYA, x: 2, y: 2 },
    { type: 'npc', id: B2_14_SPECIAL, x: 3, y: 4 },
    { type: 'npc', id: B2_14_FIGURE, x: 9, y: 2 },
    { type: 'npc', id: B2_14_G, x: 9, y: 2 },
  ],
  labels: [{ text: 'The harbour', x: 6, y: 1 }],
  zoneAt,
  examine: Object.fromEntries([1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((x) => [`${x},5`, WATER])),
  locked: () => null,
  links: {},
  requirements: [],
  chips: (s: GameState) => [
    { label: 'La figura con capucha', done: s.opened.includes(B2_14_ARRIVAL) },
    { label: 'Leo: condicionales mixtos', done: s.opened.includes(B2_14_MIXED) },
    { label: 'Leo: wish, if only y would rather', done: s.opened.includes(B2_14_WISH) },
    { label: 'La revelación', done: s.opened.includes(B2_14_REVEAL) },
  ],
  intro: {
    first: 'Lumen Bay harbour, at sunset. Someone is waiting for you. — El puerto de Lumen Bay, al atardecer. Alguien te espera.',
    later: () => 'The harbour at sunset. — El puerto al atardecer.',
  },
}

/** La figura con capucha: se ve transparente y su voz suena débil, pero se oye ('friend' = la figura) */
export const B2_14_ARRIVAL_SCRIPT: ScriptLine[] = [
  { who: 'narrator', text: '(Sunset at the harbour. Leo, Maya, {iname} and you walk to the end of the pier.)', es: '(Atardecer en el puerto. Leo, Maya, {iname} y tú caminan hasta el final del muelle.)' },
  { who: 'narrator', text: '(A figure in a hood is standing by the water. You can see the sea through its body.)', es: '(Una figura con capucha está de pie junto al agua. A través de su cuerpo se ve el mar.)' },
  { who: 'friend', text: "You weren't supposed to be there. That night was mine.", es: 'Tú no debías estar ahí. Esa noche era mía.' },
  { who: 'L', text: 'The fire. You mean the fire.', es: 'El incendio. Hablas del incendio.' },
  { who: 'friend', text: "If you hadn't been there tonight, I wouldn't be disappearing now.", es: 'Si no hubieras estado ahí esta noche, no me estaría borrando ahora.' },
  { who: 'narrator', text: '(Leo takes a step forward. "I can explain what he\'s saying. Every sentence. Listen.")', es: '(Leo da un paso adelante. "Puedo explicar lo que dice. Cada frase. Escucha".)' },
]

/** La revelación: cae la capucha y la estática del nombre se limpia letra por letra */
export const B2_14_REVEAL_SCRIPT: ScriptLine[] = [
  { who: 'narrator', text: '(The wind blows from the sea. The hood falls.)', es: '(Sopla el viento del mar. Se cae la capucha.)' },
  { who: 'narrator', text: '(An old man. Grey hair. Tired eyes… eyes that you know very well.)', es: '(Un hombre muy viejo. Pelo gris. Ojos cansados… unos ojos que conoces muy bien.)' },
  { who: 'narrator', text: '(The static around his name clears, letter by letter: G… G-a-r… García.)', es: '(La estática de su nombre se limpia, letra por letra: G… G-a-r… García.)' },
  { who: 'narrator', text: '(Leo goes pale. "That\'s… my face." He can\'t say another word.)', es: '(Leo se pone pálido. "Esa… es mi cara". No puede decir nada más.)' },
  { who: 'L', text: 'The fire. The card. Your birthday. My voice… It was you. It was always you.', es: 'El incendio. La tarjeta. Tu cumpleaños. Mi voz… Eras tú. Siempre fuiste tú.' },
  { who: 'friend', text: "I blamed you for everything. But tonight… you didn't stay silent.", es: 'Te culpé de todo. Pero esta noche… no te quedaste en silencio.' },
  { who: 'narrator', text: '(Mrs. García, Leo\'s mother. Mr. García, the teacher of 2056. G was never a stranger. G was Leo.)', es: '(La señora García, la mamá de Leo. El señor García, el profesor de 2056. G nunca fue un desconocido. G era Leo.)' },
]
