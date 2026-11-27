import type { GameState, SceneDef, Zone } from '../game/types'
import type { ScriptLine } from './b1Accident'
import type { TextCommandRoom } from '../components/TextCommand'

/**
 * B2-07 · The Old Building (presente, Lumen Bay). Guía: Leo. El barrio antiguo, el edificio abandonado y el ayuntamiento
 * (escena b2-07-oldtown: el edificio a la izquierda, la calle en el medio y el salón del ayuntamiento a la derecha).
 * Bloque 1: Leo en la calle (b2-07-arrival, script: turistas y arriendos) → Leo: lección 'change-b2' + práctica (b2-07-change):
 *   tiempos para hablar del cambio y the more… the more → Rosa Benítez (b2-07-rosa, script, escucha: el sobreturismo) →
 *   Sam Achebe: The Moving Stone escrito (b2-07-explore: Push the door open, Clear away the boxes, Climb up the stairs) →
 *   Leo dentro del edificio: el cartel de la escuela nocturna (b2-07-poster, script) → lección 'if-alt-b2' + práctica
 *   (b2-07-conditions): unless, as long as, provided, otherwise, suppose → lección 'get-b2' + práctica (b2-07-get):
 *   phrasal verbs con get. El salón del ayuntamiento queda cerrado hasta el bloque 2.
 * Bloque 2 (pendiente): la reunión vecinal (DebateTalk, la condición de las dos salidas de emergencia), Rent Raisers y The Developer.
 * Bloque 3 (pendiente): el cierre (dos fragmentos llenan el tercer segmento del núcleo y se abre la Ventana 8), diario y recompensas.
 */
export const B2_07_OLDTOWN_ID = 'b2-07-oldtown'
export const B2_07_LEO = 'b2-07-leo'
export const B2_07_LEO_IN = 'b2-07-leo-in'
export const B2_07_ROSA = 'b2-07-rosa'
export const B2_07_SAM = 'b2-07-sam'
/** Tareas (marcas en `opened`) */
export const B2_07_ARRIVAL = 'b2-07-arrival'
export const B2_07_CHANGE = 'b2-07-change'
export const B2_07_ROSA_TALK = 'b2-07-rosa-talk'
export const B2_07_EXPLORE = 'b2-07-explore'
export const B2_07_POSTER = 'b2-07-poster'
export const B2_07_CONDITIONS = 'b2-07-conditions'
export const B2_07_GET = 'b2-07-get'

/**
 * Leyenda (Tiles.tsx, sin dibujos nuevos): b pared de ladrillo · h afiche · ^ escalera · g andamio · 8 caja de herramientas ·
 * F archivador · d puerta · _ calle · Y árbol · m puesto del mercado · e cabina de teléfono · H banca · # pared · s butacas ·
 * M escritorio. A la izquierda el edificio abandonado (x 0-6); en el medio la calle del barrio antiguo (x 7-16);
 * a la derecha el salón del ayuntamiento (x 17-23, cerrado en el bloque 1).
 */
const MAP = [
  'bbbhbbb' + 'Ymm_Y_mmeY' + '#h##h##',
  'b.^..gb' + '__________' + '#..M..#',
  'b.....b' + '_H__H___H_' + '#ss.ss#',
  'b.....d' + '__________' + 'd.....#',
  'b8.F..b' + '__________' + '#ss.ss#',
  'bbbbbbb' + '__Y____Y__' + '#######',
]

const zoneAt = (x: number): Zone => (x <= 6 ? 'obra' : x <= 16 ? 'calle' : 'reuniones')

const NOT_YET = (sub: string) => ({ text: 'Todavía no.', sub })

export const B2_07_OLDTOWN: SceneDef = {
  id: B2_07_OLDTOWN_ID,
  name: 'The Old Building · El barrio antiguo',
  topics: [],
  map: MAP,
  start: { x: 14, y: 3 },
  // Sin jefe en este bloque: la puerta del jefe apunta a un muro y no hace falta ninguna llave
  bossDoor: { x: 0, y: 0 },
  keysNeeded: 0,
  entities: [
    // Leo en la calle hasta que Sam abre el edificio; después espera adentro, junto al cartel (npcs.ts, until / after)
    { type: 'npc', id: B2_07_LEO, x: 12, y: 3 },
    { type: 'npc', id: B2_07_LEO_IN, x: 3, y: 1 },
    { type: 'npc', id: B2_07_ROSA, x: 10, y: 2 },
    { type: 'npc', id: B2_07_SAM, x: 8, y: 3 },
  ],
  labels: [
    { text: 'The old building', x: 3, y: 5 },
    { text: 'Old Town', x: 12, y: 5 },
    { text: 'Town hall', x: 20, y: 5 },
  ],
  zoneAt: (x) => zoneAt(x),
  examine: {
    '3,0': {
      text: 'An old poster on the wall: "Lumen Bay Night School — coming soon?"',
      sub: 'Un cartel viejo en la pared: "Escuela nocturna de Lumen Bay — ¿próximamente?".',
      say: 'Lumen Bay Night School. Coming soon?',
    },
    '8,0': { text: 'A souvenir shop: "I ♥ LUMEN BAY". Last year it was a bakery.', sub: 'Una tienda de recuerdos: "I ♥ LUMEN BAY". El año pasado era una panadería.', say: 'Last year it was a bakery.' },
    '13,0': { text: 'A sign in a window: "Short-term rentals. Book online!"', sub: 'Un letrero en una ventana: "Alquiler por días. ¡Reserva en línea!".', say: 'Short-term rentals.' },
    '18,0': { text: 'A notice: "Town hall meeting: the future of the old building. Everyone welcome."', sub: 'Un aviso: "Reunión vecinal: el futuro del edificio antiguo. Todos son bienvenidos".', say: 'Everyone welcome.' },
  },
  locked: (x, y, s) => {
    if (x === 6 && y === 3 && !s.opened.includes(B2_07_EXPLORE)) return { text: 'The door is stuck.', sub: 'La puerta está atascada. Sam Achebe tiene permiso para entrar: habla con él.' }
    if (x === 17 && y === 3) return NOT_YET('La reunión vecinal todavía no empieza. Primero termina en el edificio con Leo.')
    return null
  },
  requirements: [],
  chips: (s: GameState) => [
    { label: 'El barrio antiguo (Leo)', done: s.opened.includes(B2_07_ARRIVAL) },
    { label: 'Hablar del cambio / the more… the more', done: s.opened.includes(B2_07_CHANGE) },
    { label: 'Una vecina: Rosa Benítez', done: s.opened.includes(B2_07_ROSA_TALK) },
    { label: 'Explorar el edificio (Sam)', done: s.opened.includes(B2_07_EXPLORE) },
    { label: 'El cartel viejo', done: s.opened.includes(B2_07_POSTER) },
    { label: 'unless / as long as / provided', done: s.opened.includes(B2_07_CONDITIONS) },
    { label: 'Phrasal verbs con get', done: s.opened.includes(B2_07_GET) },
  ],
  intro: {
    first: 'Presente. El barrio antiguo de Lumen Bay. Hay turistas por todas partes. Leo te espera en la calle.',
    later: (s) =>
      s.opened.includes(B2_07_GET)
        ? 'El barrio antiguo. Mañana hay reunión vecinal en el ayuntamiento: se decide el futuro del edificio.'
        : s.opened.includes(B2_07_EXPLORE)
        ? 'El edificio abandonado está abierto. Leo se quedó adentro, mirando un cartel viejo.'
        : 'El barrio antiguo de Lumen Bay. Los arriendos suben y el edificio viejo espera.',
  },
}

/** Leo en la calle (MemoryScript): el barrio antiguo, lleno de turistas */
export const B2_07_ARRIVAL_SCRIPT: ScriptLine[] = [
  { who: 'narrator', text: '(The Old Town of Lumen Bay. Narrow streets, old houses… and tourists everywhere.)', es: '(El barrio antiguo de Lumen Bay. Calles estrechas, casas viejas… y turistas por todas partes.)' },
  { who: 'narrator', text: 'Leo: I grew up near here. Look at it now. Souvenir shops, selfie sticks and suitcases.', es: 'Leo: Yo crecí cerca de aquí. Míralo ahora. Tiendas de recuerdos, palos de selfi y maletas.' },
  { who: 'narrator', text: 'Leo: My favourite bakery is a souvenir shop now. And my aunt had to move out. Her rent doubled.', es: 'Leo: Mi panadería favorita ahora es una tienda de recuerdos. Y mi tía tuvo que mudarse. Su arriendo se duplicó.' },
  { who: 'narrator', text: "Leo: There's an old building at the end of the street. Nobody has used it for years.", es: 'Leo: Hay un edificio viejo al final de la calle. Nadie lo usa desde hace años.' },
  { who: 'narrator', text: 'Leo: A builder wants to turn it into luxury flats. The town hall will decide soon.', es: 'Leo: Un constructor quiere convertirlo en apartamentos de lujo. El ayuntamiento decidirá pronto.' },
  { who: 'narrator', text: "Leo: If we want to talk about it at the meeting, we need the right English for change. Let me show you.", es: 'Leo: Si queremos hablar de esto en la reunión, necesitamos el inglés correcto para hablar del cambio. Te muestro.' },
]

/** Rosa Benítez, vecina de toda la vida (MemoryScript, escucha): el sobreturismo */
export const B2_07_ROSA_SCRIPT: ScriptLine[] = [
  { who: 'narrator', text: '(An older woman is sweeping the street in front of her door. A group of tourists walks past with suitcases.)', es: '(Una señora mayor barre la calle frente a su puerta. Un grupo de turistas pasa con maletas.)' },
  { who: 'narrator', text: "Rosa: I've lived on this street for sixty years. I can't get around my own street anymore.", es: 'Rosa: Llevo sesenta años viviendo en esta calle. Ya no puedo moverme por mi propia calle.' },
  { who: 'narrator', text: 'Rosa: Half the houses are short-term rentals now. Every weekend there are new faces, and nobody says hello.', es: 'Rosa: La mitad de las casas ahora son alquileres por días. Cada fin de semana hay caras nuevas, y nadie saluda.' },
  { who: 'narrator', text: "Rosa: I'm not against tourists. They help the shops get by. But the more tourists come, the fewer neighbours we have.", es: 'Rosa: No estoy en contra de los turistas. Ayudan a que las tiendas salgan adelante. Pero cuantos más turistas vienen, menos vecinos tenemos.' },
  { who: 'narrator', text: "Rosa: That old building used to be a school. I'd love to see children there again. Not more luxury flats.", es: 'Rosa: Ese edificio viejo era una escuela. Me encantaría ver niños allí otra vez. No más apartamentos de lujo.' },
  { who: 'narrator', text: "Leo: There's Sam, the urban explorer. He has permission to go inside. Let's ask him.", es: 'Leo: Ahí está Sam, el explorador urbano. Tiene permiso para entrar. Preguntémosle.' },
]

/** Sam Achebe, antes de The Moving Stone escrito (intro de la tarea) */
export const B2_07_SAM_INTRO = [
  { text: "Hi! I'm Sam. I explore abandoned buildings and take photos for the town hall.", es: '¡Hola! Soy Sam. Exploro edificios abandonados y tomo fotos para el ayuntamiento.' },
  { text: "I've got permission to go in. But this place is a mess. You'll have to tell me exactly what to do.", es: 'Tengo permiso para entrar. Pero este lugar es un desastre. Me vas a tener que decir exactamente qué hacer.' },
]

/** The Moving Stone escrito (reutilizado): explorar el edificio con órdenes escritas. Con 0-1 errores, escudo */
export const B2_07_EXPLORE_ROOM: TextCommandRoom = {
  mode: 'text',
  title: 'The Old Building',
  intro: {
    en: 'The old building is dark and dusty. Write what to do.',
    es: 'El edificio viejo está oscuro y lleno de polvo. Escribe qué hacer.',
  },
  scene: 'room',
  objects: ['door', 'box', 'stairs'],
  steps: [
    {
      problem: { en: "The front door is stuck. The handle doesn't turn, but the door moves a little when you lean on it.", es: 'La puerta de entrada está atascada. La manija no gira, pero la puerta se mueve un poco cuando te apoyas en ella.' },
      accept: [{ verb: 'push', object: 'door', optional: ['open', 'hard', 'front'] }],
      target: 'door',
      done: { en: 'You push the door open. Dust everywhere! Inside it smells of old paper.', es: 'Empujas la puerta y se abre. ¡Polvo por todas partes! Adentro huele a papel viejo.' },
      tip: 'La manija no gira: hay que empujarla. Push the door open.',
      fails: {
        open: { en: "The handle doesn't turn. You can't open it the normal way.", es: 'La manija no gira. No se puede abrir de la forma normal.' },
        pull: { en: 'You pull. Nothing. It only moves the other way.', es: 'Halas. Nada. Solo se mueve hacia el otro lado.' },
      },
      verbPool: ['open', 'pull', 'break', 'kick', 'lift'],
    },
    {
      problem: { en: 'Old boxes are blocking the way to the stairs. They are full of papers, but they are not heavy.', es: 'Unas cajas viejas bloquean el paso a la escalera. Están llenas de papeles, pero no pesan.' },
      accept: [
        { verb: 'clear', particle: 'away', object: 'box' },
        { verb: 'move', particle: 'away', object: 'box' },
        { verb: 'push', particle: 'aside', object: 'box' },
      ],
      target: 'box',
      done: { en: 'You clear away the boxes. On top of one there is an old register: "Lumen Bay School, 1998".', es: 'Quitas las cajas del camino. Encima de una hay un libro de registro viejo: "Escuela de Lumen Bay, 1998".' },
      tip: 'Quitar algo del camino: Clear away the boxes.',
      fails: {
        open: { en: "There's only paper inside. You still can't get to the stairs.", es: 'Adentro solo hay papel. Todavía no puedes llegar a la escalera.' },
        lift: { en: 'You lift one box. There are ten more behind it. Move them all out of the way.', es: 'Levantas una caja. Detrás hay diez más. Quítalas todas del camino.' },
      },
      verbPool: ['open', 'lift', 'break', 'throw', 'pick'],
    },
    {
      problem: { en: 'Now the stairs are free. Sam says the best view of the old classrooms is upstairs.', es: 'Ahora la escalera está libre. Sam dice que la mejor vista de los salones viejos está arriba.' },
      accept: [
        { verb: 'climb', particle: 'up', object: 'stairs', optional: ['slowly', 'carefully'] },
        { verb: 'go', particle: 'up', object: 'stairs', optional: ['slowly', 'carefully'] },
        { verb: 'climb', object: 'stairs', optional: ['slowly', 'carefully'] },
      ],
      target: 'stairs',
      done: { en: 'You climb up the stairs. Upstairs: long corridors, empty classrooms… and a poster on the wall.', es: 'Subes la escalera. Arriba: pasillos largos, salones vacíos… y un cartel en la pared.' },
      tip: 'Subir la escalera: Climb up the stairs.',
      fails: { run: { en: 'Careful! The old steps are weak. Go slowly.', es: '¡Cuidado! Los escalones viejos están débiles. Despacio.' } },
      verbPool: ['run', 'jump', 'push', 'open'],
    },
  ],
  finish: { en: 'The old building is open. And it was a school.', es: 'El edificio viejo está abierto. Y era una escuela.', banner: 'Exploración completada' },
}

/** Leo frente al cartel viejo (MemoryScript): la ironía dramática de la escuela nocturna */
export const B2_07_POSTER_SCRIPT: ScriptLine[] = [
  { who: 'narrator', text: '(Upstairs, on a dusty wall, there is an old poster: "Lumen Bay Night School — coming soon?")', es: '(Arriba, en una pared llena de polvo, hay un cartel viejo: "Escuela nocturna de Lumen Bay — ¿próximamente?".)' },
  { who: 'narrator', text: '(Leo stops. He looks at the poster for a long time.)', es: '(Leo se detiene. Se queda mirando el cartel un buen rato.)' },
  { who: 'narrator', text: "Leo: A night school… I've always wanted to teach in a place like this.", es: 'Leo: Una escuela nocturna… Siempre he querido enseñar en un lugar así.' },
  { who: 'narrator', text: '(You know these corridors. You walked through them in 2061, when nobody could hear you.)', es: '(Conoces estos pasillos. Caminaste por ellos en 2061, cuando nadie podía oírte.)' },
  { who: 'narrator', text: "Leo: Sam says the builder wants it for luxury flats. Unless we do something, that's what will happen.", es: 'Leo: Sam dice que el constructor lo quiere para apartamentos de lujo. A menos que hagamos algo, eso es lo que va a pasar.' },
  { who: 'narrator', text: 'Leo: "Unless"… At the meeting we have to put conditions on the table. Let me explain how.', es: '"Unless"… En la reunión tenemos que poner condiciones sobre la mesa. Te explico cómo.' },
]
