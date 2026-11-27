import type { EnemyDef, GameState, SceneDef, Zone } from '../game/types'
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
 * Bloque 2: se abre la sala de arte digital: la persona especial y la instalación de luz y sonido (b2-09-digital, script, escucha)
 *   → lección 'review-b2' + práctica (b2-09-review): opinar y reseñar una actuación, stand out / take in → se abre la librería:
 *   Ingrid Larsen, la librera, y el cuento "The Man Who Lost His Voice" (b2-09-story, script) → lección 'adv-phrases-b2' + práctica
 *   (b2-09-adverbs): locuciones adverbiales, rasgos de los personajes, look up to / pick out → Arturo desaparece y dos Living Statues
 *   se mueven en la exposición (esbirros) → el jefe The Curator (2 fases).
 * Bloque 3: tras vencer a The Curator: Arturo vuelve a la normalidad (b2-09-arturo-sorry, script) y regala la boina de artista
 *   (b2-09-beret) → Maya llega al museo: charla de amistad sobre un personaje de ficción (B2_09_FRIEND, Explore.tsx) → la persona
 *   especial: el cierre (b2-09-close): recupera los temas; Explore muestra FragmentJoin (dos fragmentos llenan el cuarto segmento,
 *   B2_09_FRAGMENTS) y se abre la Ventana 10. Diario: data/b2Diary.ts (la inscripción de las dos voces, pista para los lugares 13 y 14).
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
/** Bloque 2 */
export const B2_09_SPECIAL_DIGITAL = 'b2-09-special-digital'
export const B2_09_INGRID = 'b2-09-ingrid'
export const B2_09_DIGITAL = 'b2-09-digital'
export const B2_09_REVIEW = 'b2-09-review'
export const B2_09_STORY = 'b2-09-story'
export const B2_09_ADVERBS = 'b2-09-adverbs'
export const B2_09_STATUE1 = 'b2-09-statue1'
export const B2_09_STATUE2 = 'b2-09-statue2'
export const B2_09_BOSS = 'b2-09-boss'
/** Bloque 3 */
export const B2_09_ARTURO_BACK = 'b2-09-arturo-back'
export const B2_09_MAYA = 'b2-09-maya'
export const B2_09_SPECIAL_CLOSE = 'b2-09-special-close'
export const B2_09_ARTURO_SORRY = 'b2-09-arturo-sorry'
export const B2_09_BERET = 'b2-09-beret'
export const B2_09_FRIEND = 'b2-09-friend'
export const B2_09_CLOSE = 'b2-09-close'
/** Se guarda al terminar la animación: dos fragmentos llenan el cuarto segmento del núcleo (abre la Ventana 10) */
export const B2_09_FRAGMENTS = 'b2-09-fragments'
export const B2_FOURTH_SEGMENT = { en: 'The two fragments fill the fourth segment. Only two segments are still dark.', es: 'Los dos fragmentos llenan el cuarto segmento. Solo quedan dos segmentos apagados.' }

/**
 * Leyenda (Tiles.tsx, sin dibujos nuevos): # pared · h pared con cuadros · O vitrina (las tablillas) · H banca · v pantalla
 * (arte digital) · L estantería · M mostrador · d puerta. A la izquierda la exposición (x 0-9); en el medio la sala de arte
 * digital (x 10-15, se abre tras Inscriptions); a la derecha la librería (x 17-22, se abre tras la reseña).
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
    // Bloque 2: la persona especial pasa a la sala de arte digital; Ingrid en la librería
    { type: 'npc', id: B2_09_SPECIAL_DIGITAL, x: 12, y: 2 },
    { type: 'npc', id: B2_09_INGRID, x: 19, y: 1 },
    // Al volver de la librería, las estatuas se mueven y Arturo se convierte en The Curator
    { type: 'enemy', id: B2_09_STATUE1, x: 2, y: 1, after: B2_09_ADVERBS },
    { type: 'enemy', id: B2_09_STATUE2, x: 6, y: 1, after: B2_09_STATUE1 },
    { type: 'enemy', id: B2_09_BOSS, x: 5, y: 3, after: B2_09_STATUE2 },
    // Bloque 3: al vencer a The Curator (npcs.ts, after: b2-09-boss), Arturo, Maya y la persona especial en la exposición
    { type: 'npc', id: B2_09_ARTURO_BACK, x: 5, y: 3 },
    { type: 'npc', id: B2_09_MAYA, x: 2, y: 3 },
    { type: 'npc', id: B2_09_SPECIAL_CLOSE, x: 7, y: 3 },
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
  locked: (x, y, s) => {
    if (x === 9 && y === 3 && !s.opened.includes(B2_09_INSCRIPTIONS)) return NOT_YET('La sala de arte digital abre más tarde. Primero termina la exposición "Voices of Stone".')
    if (x === 16 && y === 3 && !s.opened.includes(B2_09_REVIEW)) return NOT_YET('La librería abre más tarde. Primero visita la sala de arte digital.')
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
    { label: 'La instalación de arte digital', done: s.opened.includes(B2_09_DIGITAL) },
    { label: 'Opinar y reseñar', done: s.opened.includes(B2_09_REVIEW) },
    { label: 'El cuento de la librería', done: s.opened.includes(B2_09_STORY) },
    { label: 'Locuciones adverbiales', done: s.opened.includes(B2_09_ADVERBS) },
    { label: 'Living Statues (2)', done: s.defeated.includes(B2_09_STATUE2) },
    { label: 'The Curator', done: s.defeated.includes(B2_09_BOSS) },
    { label: 'Arturo vuelve a ser él', done: s.opened.includes(B2_09_ARTURO_SORRY) },
    { label: 'El regalo de Arturo', done: s.opened.includes(B2_09_BERET) },
    { label: 'Charla con Maya', done: s.opened.includes(B2_09_FRIEND) },
    { label: 'El cierre', done: s.opened.includes(B2_09_CLOSE) },
  ],
  intro: {
    first: 'Presente. El museo de arte de Lumen Bay. Hay una exposición nueva: "Voices of Stone". La persona especial te espera en la entrada.',
    later: (s) =>
      s.opened.includes(B2_09_CLOSE)
        ? 'El museo. "Two voices together…" La misión 9 terminó: la Ventana 10 te espera en el mapa.'
        : s.defeated.includes(B2_09_BOSS)
        ? 'El museo. El marco dorado desapareció. Arturo, Maya y la persona especial te esperan en la exposición.'
        : s.opened.includes(B2_09_ADVERBS)
        ? 'El museo. Las estatuas de la exposición se mueven… y Arturo ya no está en su puesto.'
        : s.opened.includes(B2_09_INSCRIPTIONS)
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

// ── Bloque 2 ──

/** La instalación de luz y sonido (MemoryScript, escucha): la persona especial opina */
export const B2_09_DIGITAL_SCRIPT: ScriptLine[] = [
  { who: 'narrator', text: '(The digital art room is dark. Then the walls light up: blue waves, golden voices, a hundred whispers that become one song.)', es: '(La sala de arte digital está oscura. Luego las paredes se encienden: olas azules, voces doradas, cien susurros que se vuelven una sola canción.)' },
  { who: 'narrator', text: 'Screen: "ECHO — a light and sound performance by Mina Takeda. Duration: eight minutes."', es: 'Pantalla: "ECHO — una actuación de luz y sonido de Mina Takeda. Duración: ocho minutos".' },
  { who: 'narrator', text: '(For eight minutes nobody speaks. The light follows the voices around the room.)', es: '(Durante ocho minutos nadie habla. La luz sigue a las voces por toda la sala.)' },
  { who: 'narrator', text: 'Special person: Wow. What I liked most was the ending, when all the voices sang together. It really stood out.', es: 'La persona especial: Guau. Lo que más me gustó fue el final, cuando todas las voces cantaron juntas. De verdad se destacó.' },
  { who: 'narrator', text: 'Special person: The music was absolutely stunning, but the beginning was rather slow. I needed time to take it all in.', es: 'La persona especial: La música fue absolutamente impresionante, pero el comienzo fue más bien lento. Necesité tiempo para asimilarlo todo.' },
  { who: 'narrator', text: 'Special person: Overall, it was well worth seeing. Four stars out of five. And you? Let\'s write a review together.', es: 'La persona especial: En general, valió mucho la pena verlo. Cuatro estrellas de cinco. ¿Y tú? Escribamos una reseña juntos.' },
]

/** El cuento de la librería (MemoryScript, lectura): "The Man Who Lost His Voice" */
export const B2_09_STORY_SCRIPT: ScriptLine[] = [
  { who: 'narrator', text: 'Ingrid: This little book is our best seller this month. "The Man Who Lost His Voice". Read the first pages, if you like.', es: 'Ingrid: Este librito es el más vendido del mes. "The Man Who Lost His Voice" (El hombre que perdió su voz). Lee las primeras páginas, si quieres.' },
  { who: 'narrator', text: 'Tomas was a singer in a small port town. Everybody looked up to him, because he was kind, generous and never afraid.', es: 'Tomas era cantante en un pequeño pueblo con puerto. Todos lo admiraban, porque era amable, generoso y nunca tenía miedo.' },
  { who: 'narrator', text: 'One night, all of a sudden, a storm hit the harbour. Tomas shouted for help, again and again, until his voice broke.', es: 'Una noche, de repente, una tormenta golpeó el puerto. Tomas gritó pidiendo ayuda, una y otra vez, hasta que se le rompió la voz.' },
  { who: 'narrator', text: 'From that day, he lived in silence. He walked past his old friends without a word. He became bitter and lonely.', es: 'Desde ese día vivió en silencio. Pasaba junto a sus viejos amigos sin decir una palabra. Se volvió amargado y solitario.' },
  { who: 'narrator', text: 'His friend Nell, who was shy and quiet, had not shouted that night. She was frightened, and she never forgave herself.', es: 'Su amiga Nell, que era tímida y callada, no había gritado esa noche. Tenía miedo, y nunca se lo perdonó.' },
  { who: 'narrator', text: 'Tomas blamed her. "It was by no means my fault," he wrote on a piece of paper. "It was yours."', es: 'Tomas la culpó. "De ninguna manera fue mi culpa", escribió en un papel. "Fue tuya".' },
  { who: 'narrator', text: 'Years later, at long last, another storm came. This time Nell picked out the bravest words she knew… and she sang.', es: 'Años después, por fin, llegó otra tormenta. Esta vez Nell escogió las palabras más valientes que conocía… y cantó.' },
  { who: 'narrator', text: '(The next page is missing. Someone has torn it out.)', es: '(Falta la página siguiente. Alguien la arrancó.)' },
  { who: 'narrator', text: 'Ingrid: Oh! That\'s strange. The page was there this morning. And the statues in the exhibition… did they just move?', es: 'Ingrid: ¡Oh! Qué raro. La página estaba esta mañana. Y las estatuas de la exposición… ¿se acaban de mover?' },
]

const GR = 'gradable-b2' as const
const AO = 'adj-order-b2' as const
const ND = 'nd-relative-b2' as const
const AD = 'adv-phrases-b2' as const

/** Living Statues: estatuas de la sala, corrompidas. Preguntas: etiqueta b2-09-statue */
const STATUE = (id: string, line: { text: string; es: string }): EnemyDef => ({
  id,
  name: 'Living Statue',
  person: 'Living Statue',
  kind: 'minion',
  hp: 4,
  topics: [GR, AO, ND],
  kinds: ['fill', 'fix'],
  tags: ['b2-09-statue'],
  onlyTags: true,
  zone: 'museo',
  look: { shirt: '#b8b2a7', hair: '#9a948a', skin: '#d6d0c4' },
  before: [line],
  after: [{ text: '(Cracks run across the stone. The purple light leaves its eyes.)', es: '(Las grietas recorren la piedra. La luz morada sale de sus ojos.)' }],
  freed: { text: '(The statue goes back to its pedestal, perfectly still.)', es: '(La estatua vuelve a su pedestal, totalmente quieta.)' },
})

/**
 * The Curator: Arturo corrompido, un marco dorado que encierra todo lo que toca. Jefe de 2 fases.
 * Fase 1: relativas explicativas y which de toda la oración (b2-09-boss-rel) · Fase 2: graduables, orden de adjetivos,
 * quite / rather y locuciones adverbiales, con escucha (b2-09-boss-art). Los fragmentos y el cierre llegan en el bloque 3.
 */
export const B2_09_BOSS_DEF: EnemyDef = {
  id: B2_09_BOSS,
  name: 'The Curator',
  person: 'The Curator',
  kind: 'boss',
  hp: 10,
  topics: [ND, GR, AO, AD],
  kinds: ['fill', 'fix', 'order', 'listen'],
  tags: ['b2-09-boss-rel'],
  phases: [
    { hp: 5, title: 'El marco dorado: la información extra', topics: [ND], kinds: ['fill', 'fix', 'order'], tags: ['b2-09-boss-rel'], line: { text: 'The tablet, that is very old, is MINE! Nobody can touch it which is perfect!', es: ', that y which sin coma: mal.' } },
    { hp: 5, title: 'La última obra: las palabras del arte', topics: [GR, AO, AD], kinds: ['fill', 'fix', 'listen'], tags: ['b2-09-boss-art'], line: { text: 'You will stay in a red big ancient frame… absolutely interesting… in a silence!', es: 'a red big ancient, absolutely interesting y in a silence: mal.' } },
  ],
  onlyTags: true,
  zone: 'museo',
  look: { shirt: '#d4a72c', hair: '#6b6b6b', skin: '#9a7bb8' },
  before: [
    { text: '(In the middle of the exhibition, Arturo stands very still. A huge golden frame grows around him.)', es: '(En medio de la exposición, Arturo está muy quieto. Un marco dorado enorme crece a su alrededor.)' },
    { text: 'EVERYTHING BEAUTIFUL BELONGS IN A FRAME. EVEN YOUR VOICE.', es: 'TODO LO HERMOSO PERTENECE A UN MARCO. HASTA TU VOZ.' },
  ],
  after: [{ text: '(The golden frame cracks and falls to the floor in pieces.)', es: '(El marco dorado se agrieta y cae al suelo en pedazos.)' }],
  freed: { text: '(Among the pieces of the frame, two small lights are shining.)', es: '(Entre los pedazos del marco brillan dos lucecitas.)' },
  farewell: {
    q: 'The Curator (fading): "I only wanted to keep the beautiful things… forever…"',
    options: ['Art, which belongs to everyone, should be free.', 'Art, that belongs to everyone, should be free.', 'Art which belongs to everyone, should be free.'],
    answer: 0,
    tip: 'Relativa explicativa: coma + which + coma. Nunca that.',
  },
}

export const B2_09_ENEMIES: Record<string, EnemyDef> = {
  [B2_09_STATUE1]: STATUE(B2_09_STATUE1, { text: "Look at me! I'm very fantastic! A wooden old small box is my home!", es: 'very fantastic y a wooden old small box: mal.' }),
  [B2_09_STATUE2]: STATUE(B2_09_STATUE2, { text: 'My brother, that lives in Lima, is an artist! He is absolutely good!', es: ', that y absolutely good: mal.' }),
  [B2_09_BOSS]: B2_09_BOSS_DEF,
}

// ── Bloque 3 ──

/** Arturo vuelve a la normalidad (MemoryScript) */
export const B2_09_ARTURO_SCRIPT: ScriptLine[] = [
  { who: 'narrator', text: '(Arturo is sitting on a bench, surrounded by pieces of the golden frame. He looks tired, but his eyes are normal again.)', es: '(Arturo está sentado en una banca, rodeado de pedazos del marco dorado. Se ve cansado, pero sus ojos ya son normales.)' },
  { who: 'narrator', text: 'Arturo: I touched the last tablet this morning, which I never do without gloves. Then everything went gold.', es: 'Arturo: Esta mañana toqué la última tablilla, cosa que nunca hago sin guantes. Luego todo se volvió dorado.' },
  { who: 'narrator', text: 'Arturo: I wanted to keep everything in a frame: the tablets, the statues, the visitors… even your voice. How awful.', es: 'Arturo: Quería guardarlo todo en un marco: las tablillas, las estatuas, los visitantes… hasta tu voz. Qué horrible.' },
  { who: 'narrator', text: 'Arturo: Art, which belongs to everyone, should be free. I\'ll remember that.', es: 'Arturo: El arte, que nos pertenece a todos, debería ser libre. Lo voy a recordar.' },
]

/** Lo que el protagonista anota al cerrar la misión (cierre y diario) */
export const B2_09_NOTE = { en: 'Two voices together… what does that mean?', es: 'Dos voces juntas… ¿qué significa eso?' }
