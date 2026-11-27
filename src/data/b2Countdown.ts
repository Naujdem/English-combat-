import type { GameState, SceneDef, Zone } from '../game/types'
import type { ScriptLine } from './b1Accident'
import type { TextCommandRoom } from '../components/TextCommand'

/**
 * B2-12 · Countdown (Ventana, 2056). La noche en que G escribe la tarjeta, horas antes de viajar al primer día del protagonista
 * en A1. El cuarto que G alquila cerca del puerto viejo. Nadie oye al protagonista. G no está: salió a la escuela (Ventana 10).
 * Guía: lo que hay en el lugar (el plan clavado en la pared, la lista vieja de metas y el cuaderno de G; ficha 12).
 * Canon de B1: el Future Planner del recuerdo 13 ya mostró el plan del día siguiente; aquí se ve el plan GRANDE de G.
 * Bloque 1: el cuarto vacío (b2-12-arrival, script) → la pared del plan: lección 'fperfect-b2' + práctica (b2-12-plan)
 *   → la lista vieja de metas: lección 'goals-b2' + práctica (b2-12-goals) → Unheard en el escritorio (b2-12-unheard):
 *   abrir el cajón (el reloj), intentar quitar el plan (no se puede: ya ocurrió) y dejar la nota "Don't do it."
 */
export const B2_12_ROOM_ID = 'b2-12-room'
export const B2_12_WALL = 'b2-12-wall'
export const B2_12_LIST = 'b2-12-list'
export const B2_12_DESK = 'b2-12-desk'
/** Tareas (marcas en `opened`) */
export const B2_12_ARRIVAL = 'b2-12-arrival'
export const B2_12_PLAN = 'b2-12-plan'
export const B2_12_GOALS = 'b2-12-goals'
export const B2_12_UNHEARD = 'b2-12-unheard'
/** Se guarda al salir de la Ventana (después del fundido azul) */
export const B2_12_EXITED = 'b2-12-exited'

/**
 * Leyenda (Tiles.tsx, sin dibujos nuevos): # pared · W ventana · 5 colchón · K escritorio · . piso · d puerta.
 * La pared del plan (4,0), la lista vieja sobre el escritorio (1,5), el escritorio con el cajón (8,5) y la puerta (11,3).
 */
const MAP = [
  '####W#######',
  '#5.........#',
  '#5.........#',
  '#..........d',
  '#..........#',
  '#K......K..#',
  '############',
]

const zoneAt = (): Zone => 'casa'

export const B2_12_ROOM: SceneDef = {
  id: B2_12_ROOM_ID,
  name: 'Ventana 2056 · El cuarto de G',
  topics: [],
  map: MAP,
  start: { x: 10, y: 3 },
  // Sin jefe en este bloque: la puerta del jefe apunta a un muro y no hace falta ninguna llave
  bossDoor: { x: 0, y: 0 },
  keysNeeded: 0,
  entities: [
    { type: 'npc', id: B2_12_WALL, x: 3, y: 0 },
    { type: 'npc', id: B2_12_LIST, x: 1, y: 5 },
    { type: 'npc', id: B2_12_DESK, x: 8, y: 5 },
  ],
  labels: [{ text: '2056', x: 5, y: 3 }],
  zoneAt,
  examine: {
    '4,0': { text: 'The old port at night. A ship is leaving.', sub: 'El puerto viejo de noche. Un barco está saliendo.', say: 'A ship is leaving.' },
    '1,1': { text: 'A thin mattress. Nobody has slept in it.', sub: 'Un colchón delgado. Nadie ha dormido en él.', say: 'Nobody has slept in it.' },
    '6,3': { text: 'A cup of cold coffee. He left in a hurry.', sub: 'Una taza de café frío. Salió de afán.', say: 'He left in a hurry.' },
  },
  // La puerta da al pasillo del edificio: está cerrada con llave desde afuera
  locked: (x, y) => (x === 11 && y === 3 ? { text: 'The door is locked from the outside.', sub: 'La puerta está cerrada con llave desde afuera.' } : null),
  links: {},
  requirements: [],
  chips: (s: GameState) => [
    { label: 'El cuarto vacío', done: s.opened.includes(B2_12_ARRIVAL) },
    { label: 'La pared del plan', done: s.opened.includes(B2_12_PLAN) },
    { label: 'La lista vieja de metas', done: s.opened.includes(B2_12_GOALS) },
    { label: 'Unheard: el cajón, el plan y la nota', done: s.opened.includes(B2_12_UNHEARD) },
  ],
  intro: {
    first: '2056. A small room near the old port, at night. — 2056. Un cuarto pequeño cerca del puerto viejo, de noche. Aquí nadie te oye.',
    later: () => 'A room near the old port, 2056. Nobody can hear you. — Un cuarto cerca del puerto viejo, 2056. Nadie te oye.',
  },
}

/** El cuarto vacío: entrada a la Ventana (sin voz) */
export const B2_12_ARRIVAL_SCRIPT: ScriptLine[] = [
  { who: 'narrator', text: '(A blue flash. A sign in the air: 2056. A small, dark room. Through the window, the lights of the old port.)', es: '(Un destello azul. Un letrero en el aire: 2056. Un cuarto pequeño y oscuro. Por la ventana, las luces del puerto viejo.)' },
  { who: 'narrator', text: '(Nobody is here. A cup of coffee is still on the floor. Someone left a short time ago.)', es: '(No hay nadie. Todavía hay una taza de café en el piso. Alguien salió hace poco.)' },
  { who: 'L', fx: 'unheard', text: 'Hello? Is anybody here?', es: 'Intentas decir: "¿Hola? ¿Hay alguien aquí?"' },
  { who: 'narrator', text: '(Silence. On the wall, a big map with pins… and a plan, written in big letters.)', es: '(Silencio. En la pared, un mapa grande con alfileres… y un plan, escrito en letras grandes.)' },
  { who: 'narrator', text: '(You know that coat on the chair. G lives here. Today he went to a school… and wrote a card.)', es: '(Conoces ese abrigo de la silla. G vive aquí. Hoy fue a una escuela… y escribió una tarjeta.)' },
]

/**
 * Unheard en el cuarto de G (ficha 12): 3 metas sin voz. Es el primer intento del protagonista de hablarle a G.
 * El plan NO se puede quitar: la orden es correcta, pero la pared no lo suelta (es un hecho fijo: el plan sí ocurrió).
 * Con 0-1 errores, escudo.
 */
export const B2_12_UNHEARD_ROOM: TextCommandRoom = {
  mode: 'text',
  title: "Unheard · G's room",
  intro: {
    en: "G will be back soon. Nobody can hear you, but you can move things. Write what you do.",
    es: 'G va a volver pronto. Nadie te oye, pero puedes mover cosas. Escribe lo que haces.',
  },
  scene: 'room',
  objects: ['desk-drawer', 'plan', 'note'],
  steps: [
    {
      problem: { en: 'There is a blue light under the desk drawer. It is closed.', es: 'Sale una luz azul por debajo del cajón del escritorio. Está cerrado.' },
      accept: [{ verb: 'open', object: 'desk-drawer' }],
      target: 'desk-drawer',
      done: { en: 'The drawer opens. Inside, the clock is glowing — the whole clock, with its core. It is ticking very fast.', es: 'El cajón se abre. Adentro, el reloj brilla: el reloj entero, con su núcleo. Hace tic-tac muy rápido.' },
      tip: 'Hay que abrir el cajón: Open the drawer.',
      fails: {
        take: { en: 'You can\'t take anything. The drawer is closed.', es: 'No puedes sacar nada. El cajón está cerrado.' },
        close: { en: 'It is already closed.', es: 'Ya está cerrado.' },
      },
      verbPool: ['take', 'close', 'push', 'read'],
    },
    {
      problem: {
        en: 'The plan on the wall says: "By tomorrow morning, I will have arrived at his school." Take it down before he comes back!',
        es: 'El plan de la pared dice: "Para mañana por la mañana, habré llegado a su escuela". ¡Descuélgalo antes de que vuelva!',
      },
      accept: [
        { verb: 'take', particle: 'down', object: 'plan', optional: ['from the wall', 'off the wall'] },
        { verb: 'remove', object: 'plan', optional: ['from the wall'] },
      ],
      target: 'plan',
      done: {
        en: 'You pull and pull. The paper doesn\'t move. The pins glow blue: this plan already happened. You can\'t change it.',
        es: 'Halas y halas. El papel no se mueve. Los alfileres brillan en azul: este plan ya ocurrió. No lo puedes cambiar.',
      },
      tip: 'Descolgar algo de la pared es "take down": Take down the plan.',
      fails: {
        open: { en: 'The plan is a paper on the wall. You can\'t open it.', es: 'El plan es un papel en la pared. No se puede abrir.' },
        read: { en: 'You have already read it. Now take it off the wall.', es: 'Ya lo leíste. Ahora quítalo de la pared.' },
      },
      verbPool: ['open', 'read', 'push', 'close'],
    },
    {
      problem: {
        en: 'You can\'t change the plan… but G can read. There is a pen and a small note on the desk. Leave him a note.',
        es: 'No puedes cambiar el plan… pero G sí puede leer. Hay un lápiz y una notita en el escritorio. Déjale una nota.',
      },
      accept: [
        { verb: 'leave', object: 'note', optional: ['for g', 'for him', 'him', 'on the desk', 'on the table'] },
        { verb: 'write', object: 'note', optional: ['for g', 'for him', 'on the desk'] },
      ],
      target: 'note',
      done: { en: 'You write three words and leave the note next to the clock: "Don\'t do it."', es: 'Escribes tres palabras y dejas la nota junto al reloj: "Don\'t do it." (No lo hagas).' },
      tip: 'Deja una nota: Leave a note for G.',
      fails: {
        open: { en: 'The note is already open. Write something on it.', es: 'La nota ya está abierta. Escribe algo en ella.' },
        take: { en: 'Don\'t take it. Leave it here for G.', es: 'No te la lleves. Déjala aquí para G.' },
      },
      verbPool: ['open', 'take', 'read', 'close'],
    },
  ],
  finish: { en: 'Footsteps on the stairs. Someone is coming…', es: 'Pasos en la escalera. Alguien viene…', banner: 'Unheard completado' },
}
