import type { EnemyDef, GameState, SceneDef, Zone } from '../game/types'
import type { ScriptLine } from './b1Accident'
import type { WhichDogRound } from '../components/WhichDog'
import type { DebateTurn } from '../components/DebateTalk'

/**
 * B2 · Extras: Paws Debate (misión secundaria, presente; se abre al cerrar la misión 8). Escena b2-s2-shelter, Lumen Paws.
 * Nayi, los perros Zirius, Laica, Kitay, Fresas y Lupe, y los gatos Moscú y Minus (Busuu 22: bienestar animal).
 * Orden: la pantalla: el video del documentalista (b2-s2-video, script, escucha) →
 *   Nayi: lección 'paws-b2' (whereas, while, however, on the other hand; both / neither / either) + práctica (b2-s2-words) →
 *   el tablero de pedidos: Which Dog? con contraste (b2-s2-dogs) → Nayi: el debate de zoológicos y mascotas exóticas
 *   (b2-s2-debate, DebateTalk: reconocer la otra postura antes de responder) → duelo amistoso con el vendedor de mascotas
 *   exóticas (b2-s2-seller, no castiga al perder) → Nayi: el cierre (b2-s2-close): pañoleta de Lumen Paws, monedas y el tema.
 */
export const B2_S2_SHELTER_ID = 'b2-s2-shelter'
export const B2_S2_NAYI = 'b2-s2-nayi'
export const B2_S2_TV = 'b2-s2-tv'
export const B2_S2_BOARD = 'b2-s2-board'
/** Tareas (marcas en `opened`) */
export const B2_S2_VIDEO = 'b2-s2-video'
export const B2_S2_WORDS = 'b2-s2-words'
export const B2_S2_DOGS = 'b2-s2-dogs'
export const B2_S2_DEBATE = 'b2-s2-debate'
export const B2_S2_SELLER = 'b2-s2-seller'
export const B2_S2_CLOSE = 'b2-s2-close'

/** Leyenda (Tiles.tsx, sin dibujos nuevos): # pared · W ventana · p planta · d puerta */
const MAP = [
  '#W###W###W#',
  '#.........#',
  '#.........#',
  '#p.......p#',
  '#.........#',
  '#####d#####',
]

const zoneAt = (): Zone => 'recepcion'
const TEXT = 'Lumen Paws. Dogs barking, cats sleeping, and Nayi with a cup of coffee. — Lumen Paws. Perros ladrando, gatos durmiendo y Nayi con una taza de café.'

export const B2_S2_SHELTER: SceneDef = {
  id: B2_S2_SHELTER_ID,
  name: 'Paws Debate · Lumen Paws',
  topics: [],
  map: MAP,
  start: { x: 5, y: 4 },
  bossDoor: { x: 0, y: 0 },
  keysNeeded: 0,
  entities: [
    { type: 'npc', id: B2_S2_NAYI, x: 5, y: 2 },
    { type: 'npc', id: B2_S2_TV, x: 2, y: 1 },
    { type: 'npc', id: B2_S2_BOARD, x: 8, y: 1 },
    { type: 'npc', id: 'b2-s2-zirius', x: 1, y: 2 },
    { type: 'npc', id: 'b2-s2-laica', x: 2, y: 4 },
    { type: 'npc', id: 'b2-s2-kitay', x: 4, y: 3 },
    { type: 'npc', id: 'b2-s2-fresas', x: 7, y: 4 },
    { type: 'npc', id: 'b2-s2-lupe', x: 9, y: 2 },
    { type: 'npc', id: 'b2-s2-moscu', x: 3, y: 1 },
    { type: 'npc', id: 'b2-s2-minus', x: 7, y: 1 },
    // El vendedor llega después del debate
    { type: 'enemy', id: B2_S2_SELLER, x: 6, y: 3, after: B2_S2_DEBATE },
  ],
  labels: [{ text: 'Lumen Paws', x: 5, y: 1 }],
  zoneAt: () => zoneAt(),
  examine: {},
  locked: (x, y) => (x === 5 && y === 5 ? { text: 'The way out.', sub: 'Para volver al mapa, toca el botón Mapa.' } : null),
  links: {},
  requirements: [],
  chips: (s: GameState) => [
    { label: 'El video del documentalista', done: s.opened.includes(B2_S2_VIDEO) },
    { label: 'Contraste y both / neither (Nayi)', done: s.opened.includes(B2_S2_WORDS) },
    { label: 'Which Dog?', done: s.opened.includes(B2_S2_DOGS) },
    { label: 'El debate', done: s.opened.includes(B2_S2_DEBATE) },
    { label: 'Duelo con el vendedor', done: s.defeated.includes(B2_S2_SELLER) },
    { label: 'El cierre', done: s.opened.includes(B2_S2_CLOSE) },
  ],
  intro: {
    first: TEXT,
    later: (s: GameState) => (s.opened.includes(B2_S2_CLOSE) ? 'Paws Debate. Extra completado.' : TEXT),
  },
}

/** El video del documentalista (escucha, en la pantalla de la sala) */
export const B2_S2_VIDEO_SCRIPT: ScriptLine[] = [
  { who: 'narrator', text: '(Nayi turns on the screen. A short documentary about wild animals begins.)', es: '(Nayi enciende la pantalla. Empieza un documental corto sobre animales salvajes.)' },
  { who: 'board', text: 'Some people believe that zoos protect endangered species, whereas others think that animals should never live in cages.', es: 'Algunas personas creen que los zoológicos protegen a las especies en peligro, mientras que otras piensan que los animales nunca deberían vivir en jaulas.' },
  { who: 'board', text: 'Good zoos fund research. However, many animals in small zoos suffer from stress.', es: 'Los buenos zoológicos financian investigación. Sin embargo, muchos animales de zoológicos pequeños sufren estrés.' },
  { who: 'board', text: 'Exotic pets are popular online. On the other hand, most of them are taken from the wild.', es: 'Las mascotas exóticas son populares en internet. Por otro lado, la mayoría se sacan de su hábitat.' },
  { who: 'narrator', text: 'Nayi: Neither side is completely right. That\'s why we\'re having a debate tonight. But first, the words.', es: 'Nayi: Ninguno de los dos lados tiene toda la razón. Por eso hoy tenemos un debate. Pero primero, las palabras.' },
]

/** Which Dog? con contraste (reutilizado de B1-06): Nayi describe dos perros y pide uno */
export const B2_S2_WHICH_DOG: WhichDogRound[] = [
  { en: 'Laica is calm, whereas Kitay never stops running. Bring me the calm one.', es: 'Laica es tranquila, mientras que Kitay nunca deja de correr. Tráeme la tranquila.', dog: 'laica' },
  { en: 'Zirius loves the ball. Lupe, however, only barks at it. Bring me the one who plays.', es: 'A Zirius le encanta la pelota. Lupe, sin embargo, solo le ladra. Tráeme el que juega.', dog: 'zirius' },
  { en: 'Fresas is shy. On the other hand, Kitay jumps on everyone. Bring me the shy one.', es: 'Fresas es tímida. Por otro lado, Kitay salta sobre todos. Tráeme la tímida.', dog: 'fresas' },
  { en: 'While Laica sleeps all day, Lupe barks at everything. Bring me the noisy one.', es: 'Mientras Laica duerme todo el día, Lupe le ladra a todo. Tráeme la ruidosa.', dog: 'lupe' },
  { en: 'Neither Laica nor Fresas has a red collar. Bring me the dog that has one.', es: 'Ni Laica ni Fresas tienen collar rojo. Tráeme el perro que sí lo tiene.', dog: 'kitay' },
]

/** El debate con Nayi: reconocer la otra postura antes de responder (good) o solo contradecir (bad) */
export const B2_S2_DEBATE_TURNS: DebateTurn[] = [
  {
    text: 'Zoos protect animals. Without them, many species would disappear. Do you agree?',
    es: 'Los zoológicos protegen a los animales. Sin ellos, muchas especies desaparecerían. ¿Estás de acuerdo?',
    options: [
      { en: "That's true for some zoos. However, small zoos often keep animals in terrible conditions.", es: 'Eso es cierto para algunos zoológicos. Sin embargo, los pequeños suelen tener a los animales en condiciones terribles.', value: 'good', reply: { text: 'Fair point. You listened before you answered.', es: 'Buen punto. Escuchaste antes de responder.' } },
      { en: 'No. Zoos are prisons. End of discussion.', es: 'No. Los zoológicos son cárceles. Fin de la discusión.', value: 'bad', reply: { text: "Hmm. That's not a debate, that's a wall.", es: 'Mmm. Eso no es un debate, es un muro.' } },
      { en: 'Maybe. I am not sure.', es: 'Quizás. No estoy seguro.', value: 'neutral', reply: { text: 'Think about it. Both sides have reasons.', es: 'Piénsalo. Los dos lados tienen razones.' } },
    ],
  },
  {
    text: 'Some people say exotic pets are fine if you love them. What do you think?',
    es: 'Algunos dicen que las mascotas exóticas están bien si las quieres. ¿Qué piensas?',
    options: [
      { en: 'I understand that people love them. On the other hand, most exotic pets are taken from the wild.', es: 'Entiendo que la gente las quiera. Por otro lado, la mayoría de las mascotas exóticas se sacan de su hábitat.', value: 'good', reply: { text: 'Exactly. Love is not always enough.', es: 'Exacto. El amor no siempre basta.' } },
      { en: 'Exotic pets are cool. Everyone should have a snake.', es: 'Las mascotas exóticas son geniales. Todos deberían tener una serpiente.', value: 'bad', reply: { text: 'Everyone? Even Moscú? He would not agree.', es: '¿Todos? ¿Hasta Moscú? Él no estaría de acuerdo.' } },
      { en: 'It depends on the animal.', es: 'Depende del animal.', value: 'neutral', reply: { text: 'True. But which animals?', es: 'Cierto. ¿Pero cuáles?' } },
    ],
  },
  {
    text: 'So… zoos or shelters? Which ones help animals more?',
    es: 'Entonces… ¿zoológicos o refugios? ¿Cuáles ayudan más a los animales?',
    options: [
      { en: 'Both zoos and shelters can help. However, neither is perfect without rules.', es: 'Tanto los zoológicos como los refugios pueden ayudar. Sin embargo, ninguno es perfecto sin reglas.', value: 'good', reply: { text: 'Both, neither… you sound like a documentary now!', es: 'Both, neither… ¡ya suenas como un documental!' } },
      { en: 'Shelters, obviously. Zoos are useless.', es: 'Los refugios, obvio. Los zoológicos no sirven.', value: 'bad', reply: { text: 'Useless? Some zoos save species. Be fair.', es: '¿No sirven? Algunos zoológicos salvan especies. Sé justo.' } },
      { en: 'Either one is OK, I guess.', es: 'Cualquiera de los dos está bien, supongo.', value: 'neutral', reply: { text: 'Either… but with what conditions?', es: 'Cualquiera… ¿pero con qué condiciones?' } },
    ],
  },
]

/** El cierre con Nayi (b2-s2-close) */
export const B2_S2_CLOSE_SCRIPT: ScriptLine[] = [
  { who: 'narrator', text: '(The seller leaves with his empty cages. Lupe barks at him until he closes the door.)', es: '(El vendedor se va con sus jaulas vacías. Lupe le ladra hasta que cierra la puerta.)' },
  { who: 'narrator', text: 'Nayi: You disagreed with him, but you listened first. That\'s how a real debate works.', es: 'Nayi: No estuviste de acuerdo con él, pero primero escuchaste. Así funciona un debate de verdad.' },
  { who: 'narrator', text: 'Nayi: Take this bandana. Zirius chose it for you. Well… he chewed it a little.', es: 'Nayi: Toma esta pañoleta. Zirius la eligió para ti. Bueno… la mordió un poquito.' },
  { who: 'narrator', text: '(Moscú and Minus sleep on the sofa. Neither of them cares about debates.)', es: '(Moscú y Minus duermen en el sofá. A ninguno de los dos le importan los debates.)' },
]

const PW = 'paws-b2' as const

export const B2_S2_ENEMIES: Record<string, EnemyDef> = {
  // Duelo amistoso: el vendedor de mascotas exóticas. No castiga al perder
  [B2_S2_SELLER]: {
    id: B2_S2_SELLER,
    name: 'Mr. Kraven, el vendedor',
    person: 'Mr. Kraven',
    kind: 'trainer',
    duel: {
      lost: 'Mr. Kraven: "Ha! You see? Nobody can argue with me." Vuelves a empezar con la vida llena.',
      won: 'El vendedor se queda sin argumentos. Habla con Nayi.',
    },
    hp: 6,
    topics: [PW],
    kinds: ['fill', 'fix', 'order', 'listen'],
    tags: [B2_S2_SELLER],
    onlyTags: true,
    zone: 'recepcion',
    look: { shirt: '#4b7a2a', hair: '#2b2b33', skin: '#e0b48f', gender: 'male' },
    before: [
      { text: 'Whereas zoos protect animals, but my pets are better! Neither of them are dangerous!', es: '"Whereas…, but" y "Neither of them are" (en un examen formal): mal.' },
      { text: 'A baby monkey, a parrot, a tiny snake… Want to buy one?', es: 'Un monito bebé, un loro, una serpiente diminuta… ¿Quieres comprar uno?' },
    ],
    after: [{ text: 'Fine, fine. I see your point… and I don\'t like it.', es: 'Bueno, bueno. Entiendo tu punto… y no me gusta.' }],
    freed: { text: 'Maybe I should sell dog food instead.', es: 'Tal vez debería vender comida para perros.' },
  },
}
