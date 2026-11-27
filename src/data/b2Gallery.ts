import type { GameState, SceneDef, Zone } from '../game/types'
import type { ScriptLine } from './b1Accident'
import type { InscriptionRoom } from '../game/inscriptions'

/**
 * B2-09 · The Gallery (presente, Lumen Bay). Guía: la persona especial. El museo de arte de Lumen Bay
 * (escena b2-09-gallery: la exposición "Voices of Stone" a la izquierda, la sala de arte digital en el medio y la librería a la derecha).
 * Bloque 1: la persona especial en la entrada (b2-09-arrival, script) → lección 'gradable-b2' + práctica (b2-09-strong):
 *   graduables y no graduables, quite / pretty / rather / fairly → lección 'adj-order-b2' + práctica (b2-09-order): orden de adjetivos
 *   → Arturo Silva, el curador: la visita guiada (b2-09-tour, script, escucha) → lección 'nd-relative-b2' + práctica
 *   (b2-09-relative): relativas explicativas y which de toda la oración → Arturo: Inscriptions, versión museo (b2-09-inscriptions):
 *   la última tablilla dice "A voice that is taken returns only when two voices rise together." Leo la lee y se va a otra sala.
 *   La sala de arte digital y la librería quedan cerradas hasta el bloque 2.
 * Bloque 2 (pendiente): la sala de arte digital (opinar y reseñar), la librería (locuciones adverbiales, "The Man Who Lost His Voice"),
 *   Living Statues (2) y The Curator (2 fases).
 * Bloque 3 (pendiente): amistad con Maya, el cierre (dos fragmentos llenan el cuarto segmento del núcleo y se abre la Ventana 10),
 *   diario (la inscripción de las dos voces) y recompensas.
 */
export const B2_09_GALLERY_ID = 'b2-09-gallery'
export const B2_09_SPECIAL = 'b2-09-special'
export const B2_09_LEO = 'b2-09-leo'
export const B2_09_ARTURO = 'b2-09-arturo'
/** Tareas (marcas en `opened`) */
export const B2_09_ARRIVAL = 'b2-09-arrival'
export const B2_09_STRONG = 'b2-09-strong'
export const B2_09_ORDER = 'b2-09-order'
export const B2_09_TOUR = 'b2-09-tour'
export const B2_09_RELATIVE = 'b2-09-relative'
export const B2_09_INSCRIPTIONS = 'b2-09-inscriptions'

/**
 * Leyenda (Tiles.tsx, sin dibujos nuevos): # pared · h pared con cuadros · O vitrina (las tablillas) · H banca · v pantalla
 * (arte digital) · L estantería · M mostrador · d puerta. A la izquierda la exposición (x 0-9); en el medio la sala de arte
 * digital (x 10-15, cerrada en el bloque 1); a la derecha la librería (x 17-22, cerrada en el bloque 1).
 */
const MAP = [
  '#hhhhhhhh#vvvvvv#LLLLLL#',
  '#........#......#......#',
  '#.O..O..O#......#.M....#',
  '#........d......d......#',
  '#.H..O..H#......#..LL..#',
  '####d###################',
]

const zoneAt = (x: number): Zone => (x <= 9 ? 'museo' : x <= 16 ? 'sala' : 'biblioteca')

const NOT_YET = (sub: string) => ({ text: 'Todavía no.', sub })

export const B2_09_GALLERY: SceneDef = {
  id: B2_09_GALLERY_ID,
  name: 'The Gallery · El museo de arte',
  topics: [],
  map: MAP,
  start: { x: 4, y: 4 },
  // Sin jefe en este bloque: la puerta del jefe apunta a un muro y no hace falta ninguna llave
  bossDoor: { x: 0, y: 0 },
  keysNeeded: 0,
  entities: [
    { type: 'npc', id: B2_09_SPECIAL, x: 3, y: 3 },
    // Leo mira las tablillas hasta que lee la última; después se va a otra sala (npcs.ts, until)
    { type: 'npc', id: B2_09_LEO, x: 7, y: 1 },
    { type: 'npc', id: B2_09_ARTURO, x: 6, y: 3 },
  ],
  labels: [
    { text: 'Voices of Stone', x: 4, y: 5 },
    { text: 'Digital art', x: 12, y: 5 },
    { text: 'Bookshop', x: 19, y: 5 },
  ],
  zoneAt: (x) => zoneAt(x),
  examine: {
    '2,2': {
      text: 'A grey stone tablet with strange marks. Label: "Temple of Stones".',
      sub: 'Una tablilla de piedra gris con marcas extrañas. Etiqueta: "Templo de las Piedras".',
      say: 'Temple of Stones.',
    },
    '5,2': {
      text: 'A small round tablet. Label: "Temple of Time". The marks look like a clock.',
      sub: 'Una tablilla pequeña y redonda. Etiqueta: "Templo del Tiempo". Las marcas parecen un reloj.',
      say: 'The marks look like a clock.',
    },
    '8,2': {
      text: 'A long, narrow tablet. Label: "Temple of Roads".',
      sub: 'Una tablilla larga y estrecha. Etiqueta: "Templo de los Caminos".',
      say: 'Temple of Roads.',
    },
    '5,4': {
      text: 'The biggest tablet of all. Label: "Temple of Echoes". Nobody has translated it… yet.',
      sub: 'La tablilla más grande de todas. Etiqueta: "Templo de los Ecos". Nadie la ha traducido… todavía.',
      say: 'Nobody has translated it yet.',
    },
    '3,0': {
      text: 'A huge abstract painting: blue, gold and black. It\'s absolutely stunning.',
      sub: 'Una pintura abstracta enorme: azul, dorado y negro. Es absolutamente impresionante.',
      say: "It's absolutely stunning.",
    },
  },
  locked: (x, y) => {
    if (x === 9 && y === 3) return NOT_YET('La sala de arte digital abre más tarde. Primero termina la exposición "Voices of Stone".')
    if (x === 16 && y === 3) return NOT_YET('La librería abre más tarde.')
    return null
  },
  requirements: [],
  chips: (s: GameState) => [
    { label: 'Llegada al museo', done: s.opened.includes(B2_09_ARRIVAL) },
    { label: 'very good / absolutely amazing · quite, rather', done: s.opened.includes(B2_09_STRONG) },
    { label: 'Orden de adjetivos', done: s.opened.includes(B2_09_ORDER) },
    { label: 'Visita guiada con Arturo', done: s.opened.includes(B2_09_TOUR) },
    { label: 'Relativas explicativas (, which / , who)', done: s.opened.includes(B2_09_RELATIVE) },
    { label: 'Inscriptions: las tablillas', done: s.opened.includes(B2_09_INSCRIPTIONS) },
  ],
  intro: {
    first: 'Presente. El museo de arte de Lumen Bay. Hay una exposición nueva: "Voices of Stone". La persona especial te espera en la entrada.',
    later: (s) =>
      s.opened.includes(B2_09_INSCRIPTIONS)
        ? 'El museo. "A voice that is taken returns only when two voices rise together." Leo se fue a otra sala sin decir nada.'
        : 'El museo de arte de Lumen Bay. Las tablillas de los templos, detrás del vidrio.',
  },
}

/** La llegada al museo (MemoryScript): las tablillas de los templos */
export const B2_09_ARRIVAL_SCRIPT: ScriptLine[] = [
  { who: 'narrator', text: '(The Lumen Bay Art Museum. A big banner at the entrance: "VOICES OF STONE — tablets from four ancient temples".)', es: '(El museo de arte de Lumen Bay. Un cartel grande en la entrada: "VOICES OF STONE — tablillas de cuatro templos antiguos".)' },
  { who: 'narrator', text: '(Stones, Time, Roads, Echoes. You know these names. You walked through those temples in someone else\'s memories.)', es: '(Stones, Time, Roads, Echoes. Conoces esos nombres. Caminaste por esos templos en los recuerdos de otra persona.)' },
  { who: 'narrator', text: 'Special person: I got tickets for us! And Leo came too. He\'s been staring at that tablet for ten minutes.', es: 'La persona especial: ¡Conseguí entradas para nosotros! Y Leo también vino. Lleva diez minutos mirando esa tablilla.' },
  { who: 'narrator', text: 'Special person: Look at that painting. It\'s very… no. It\'s absolutely amazing!', es: 'La persona especial: Mira esa pintura. Es muy… no. ¡Es absolutamente increíble!' },
  { who: 'narrator', text: 'Special person: In a museum you need the right words. "Very amazing" sounds wrong. Let me show you why.', es: 'La persona especial: En un museo necesitas las palabras correctas. "Very amazing" suena mal. Te muestro por qué.' },
]

/** La visita guiada con Arturo Silva, el curador (MemoryScript, escucha): relativas explicativas en contexto */
export const B2_09_TOUR_SCRIPT: ScriptLine[] = [
  { who: 'narrator', text: 'Arturo: Good afternoon, everyone. I\'m Arturo Silva, the curator. Welcome to "Voices of Stone".', es: 'Arturo: Buenas tardes a todos. Soy Arturo Silva, el curador. Bienvenidos a "Voices of Stone".' },
  { who: 'narrator', text: 'Arturo: This tablet, which was found in 1998, comes from the Temple of Echoes.', es: 'Arturo: Esta tablilla, que fue hallada en 1998, viene del Templo de los Ecos.' },
  { who: 'narrator', text: 'Arturo: Dr. Ruiz, who led the excavation, never published her notes. Nobody knows why.', es: 'Arturo: La doctora Ruiz, que dirigió la excavación, nunca publicó sus notas. Nadie sabe por qué.' },
  { who: 'narrator', text: 'Arturo: For years nobody could read the tablets, which made them famous all over the world.', es: 'Arturo: Durante años nadie pudo leer las tablillas, lo que las hizo famosas en todo el mundo.' },
  { who: 'narrator', text: 'Arturo: Now we can translate some of them. The words are quite simple, but the meaning is rather strange.', es: 'Arturo: Ahora podemos traducir algunas. Las palabras son bastante sencillas, pero el significado es más bien extraño.' },
  { who: 'narrator', text: 'Arturo: The last tablet, which is the oldest, is still a mystery. Maybe one of you will read it today.', es: 'Arturo: La última tablilla, que es la más antigua, sigue siendo un misterio. Quizá alguno de ustedes la lea hoy.' },
  { who: 'narrator', text: '(Leo is standing very close to the glass. He doesn\'t say a word.)', es: '(Leo está muy cerca del vidrio. No dice ni una palabra.)' },
]

/**
 * Inscriptions, versión museo (components/Inscriptions.tsx, reutilizado): las traducciones de las tablillas con relativas explicativas.
 * La última tablilla (relativa especificativa, sin comas) es la pista de las dos voces para los lugares 13 y 14 (final B).
 */
export const B2_09_INSCRIPTIONS_ROOM: InscriptionRoom = {
  title: 'Voices of Stone',
  intro: {
    en: 'The museum has the marks, but not the words. Build each translation, and put the extra information between commas.',
    es: 'El museo tiene las marcas, pero no las palabras. Arma cada traducción y pon la información extra entre comas.',
  },
  scene: 'wall',
  plates: [
    {
      words: ['This tablet,', 'which', 'was found', 'in 1998,', 'comes from', 'the Temple of Echoes'],
      roles: ['subject', 'connector', 'verb', 'time', 'verb', 'object'],
      es: 'Esta tablilla, que fue hallada en 1998, viene del Templo de los Ecos.',
      rule: {
        title: ', which … ,',
        text: 'Relativa explicativa: información extra sobre una cosa, entre comas. Con comas va which, nunca that.',
        examples: ['My car, which is very old, still works.', 'The museum, which opened in 2010, is free.'],
      },
      hint: 'Cosa + coma + which + información extra + coma.',
      distractors: [{ text: 'that', role: 'connector' }],
      effect: 'La primera tablilla brilla un momento.',
    },
    {
      words: ['Dr. Ruiz,', 'who', 'led', 'the excavation,', 'never published', 'her notes'],
      roles: ['subject', 'connector', 'verb', 'object', 'verb', 'object'],
      es: 'La doctora Ruiz, que dirigió la excavación, nunca publicó sus notas.',
      rule: {
        title: ', who … ,',
        text: 'Con personas, la relativa explicativa va con who (o whose para la posesión). También entre comas.',
        examples: ['My brother, who lives in Lima, is an artist.', 'Arturo, whose office is upstairs, is the curator.'],
      },
      hint: 'Una persona: who, no which.',
      distractors: [{ text: 'which', role: 'connector' }],
      effect: 'La segunda tablilla brilla. Arturo toma nota, sorprendido.',
    },
    {
      words: ['Nobody', 'could read', 'it,', 'which', 'made', 'it', 'famous'],
      roles: ['subject', 'verb', 'object', 'connector', 'verb', 'object', 'complement'],
      es: 'Nadie podía leerla, lo que la hizo famosa.',
      rule: {
        title: '…, which (= y eso)',
        text: 'which puede referirse a toda la oración anterior: "y eso", "lo que". Siempre después de una coma.',
        examples: ["He didn't come, which was strange.", 'It rained all day, which ruined the trip.'],
      },
      hint: 'Toda la idea anterior + coma + which.',
      distractors: [{ text: 'what', role: 'connector' }],
      effect: 'La tercera tablilla brilla. La gente de la visita se acerca a mirar.',
    },
    {
      words: ['A voice', 'that', 'is taken', 'returns', 'only when', 'two voices', 'rise', 'together'],
      roles: ['subject', 'connector', 'verb', 'verb', 'connector', 'subject', 'verb', 'complement'],
      es: 'Una voz que es arrebatada solo regresa cuando dos voces se alzan juntas.',
      rule: {
        title: 'Sin comas: that / which',
        text: 'Si la información es necesaria para saber de qué hablamos (relativa especificativa), no lleva comas y sí puede ir con that.',
        examples: ['The tablet that Leo saw is the oldest.', 'A voice that is taken…'],
      },
      hint: 'Aquí no hay comas: es información necesaria. Una voz no es una persona.',
      distractors: [{ text: 'who', role: 'connector' }],
      effect: 'La última tablilla se ilumina entera. Leo da un paso atrás.',
    },
  ],
  finish: {
    en: '"A voice that is taken returns only when two voices rise together."',
    es: '"Una voz que es arrebatada solo regresa cuando dos voces se alzan juntas."',
    banner: '¡Tablillas traducidas!',
  },
}
