import type { GameState, SceneDef, Zone } from '../game/types'
import type { ScriptLine } from './b1Accident'

/**
 * B1-14 · Voices (presente, final de B1). Bloque A: la sala común de la residencia de Lumen Bay, de madrugada (escena b1-14-lounge).
 * NO es recuerdo (game/memory.ts solo toma las misiones impares).
 *
 * Un sofá, una mesa baja, una estantería, ventanas todavía oscuras y la puerta a la calle.
 * Orden: la persona especial (b1-14-gather, script: el protagonista reúne a sus amigos) →
 *   Leo: lección 'reported-speech-b1' + práctica (b1-14-reported) → Leo: lección 'say-tell-b1' + práctica (b1-14-saytell) →
 *   la puerta a la calle: "Próximamente" (bloque 14-B).
 * Ningún bloque A guarda closeId(14) (se guarda en el último bloque).
 */
export const B1_14_LOUNGE_ID = 'b1-14-lounge'
export const B1_14_LEO = 'b1-14-leo'
export const B1_14_MAYA = 'b1-14-maya'
export const B1_14_SPECIAL = 'b1-14-special'
export const B1_14_GATHER = 'b1-14-gather'
export const B1_14_REPORTED = 'b1-14-reported'
export const B1_14_SAYTELL = 'b1-14-saytell'

/**
 * Leyenda (Tiles.tsx, sin dibujos nuevos): # pared · W ventana · L estantería · d puerta · A sofá · K mesa · p planta.
 * La puerta a la calle abajo (5,6).
 */
const MAP = [
  '##W##LL##W##',
  '#p........p#',
  '#...AAA....#',
  '#..........#',
  '#...KK.....#',
  '#..........#',
  '#####d######',
]

const zoneAt = (): Zone => 'recepcion'

const WINDOW = { text: 'It is still dark outside. The harbour lights are on.', sub: 'Afuera todavía está oscuro. Las luces del puerto están encendidas.', say: 'It is still dark outside.' }

export const B1_14_LOUNGE: SceneDef = {
  id: B1_14_LOUNGE_ID,
  name: 'Voices · La sala de la residencia',
  topics: [],
  map: MAP,
  start: { x: 5, y: 5 },
  // Sin jefe en este bloque: la puerta del jefe apunta a un muro y no hace falta ninguna llave
  bossDoor: { x: 0, y: 0 },
  keysNeeded: 0,
  entities: [
    { type: 'npc', id: B1_14_SPECIAL, x: 3, y: 3 },
    { type: 'npc', id: B1_14_LEO, x: 7, y: 3 },
    { type: 'npc', id: B1_14_MAYA, x: 8, y: 4 },
  ],
  labels: [{ text: 'The common room', x: 6, y: 1 }],
  zoneAt: () => zoneAt(),
  examine: {
    '2,0': WINDOW,
    '9,0': WINDOW,
  },
  // La puerta a la calle (bloque 14-B): Próximamente. Para salir: el botón Mapa
  locked: (x, y) => {
    if (x === 5 && y === 6) return { text: 'Próximamente: el siguiente bloque de la misión 14', sub: 'Para volver al mapa, toca el botón Mapa.' }
    return null
  },
  links: {},
  requirements: [],
  chips: (s: GameState) => [
    { label: 'Reunir a tus amigos', done: s.opened.includes(B1_14_GATHER) },
    { label: 'Leo: contar lo que alguien dijo', done: s.opened.includes(B1_14_REPORTED) },
    { label: 'Leo: say, tell y speak', done: s.opened.includes(B1_14_SAYTELL) },
  ],
  intro: {
    first: 'Five in the morning. You could not sleep. — Las cinco de la mañana. No pudiste dormir.',
    later: () => 'The common room, before sunrise. — La sala común, antes del amanecer.',
  },
}

/** El protagonista reúne a sus amigos (secuencia fija, MemoryScript). 'narrator' con el nombre de quien habla */
export const B1_14_GATHER_SCRIPT: ScriptLine[] = [
  { who: 'narrator', text: '(You woke up with a sore throat. Your hands are still shaking.)', es: '(Despertaste con dolor de garganta. Todavía te tiemblan las manos.)' },
  { who: 'narrator', text: '(You texted your friends: "Common room. Now. Please.")', es: '(Les escribiste a tus amigos: "Sala común. Ahora. Por favor.")' },
  { who: 'narrator', text: 'Special person: You look pale. What happened?', es: 'La persona especial: Estás pálido. ¿Qué pasó?' },
  { who: 'narrator', text: 'Maya: Another memory? Sit down. Breathe.', es: 'Maya: ¿Otro recuerdo? Siéntate. Respira.' },
  { who: 'narrator', text: '(Leo touches his throat for a second. He says nothing about it.)', es: '(Leo se toca la garganta un segundo. No dice nada sobre eso.)' },
  { who: 'narrator', text: 'Leo: Tell us everything. Slowly.', es: 'Leo: Cuéntanos todo. Despacio.' },
  { who: 'narrator', text: '(You want to. But the words in the memory were not yours. How do you repeat what another person said?)', es: '(Quieres hacerlo. Pero las palabras del recuerdo no eran tuyas. ¿Cómo repites lo que dijo otra persona?)' },
  { who: 'narrator', text: 'Leo: I can help with that. Come here.', es: 'Leo: Yo te ayudo con eso. Ven.' },
]
