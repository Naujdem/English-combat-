import type { EnemyDef, GameState, SceneDef, Zone } from '../game/types'
import type { ScriptLine } from './b1Accident'
import type { DebateTurn } from '../components/DebateTalk'
import { canRecognize } from '../game/mic'

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
    // Los amigos en una columna, con la fila 2 libre: así no encierran al protagonista al entrar (lo encontró el bot Humo)
    { type: 'npc', id: B2_14_LEO, x: 4, y: 3 },
    { type: 'npc', id: B2_14_MAYA, x: 4, y: 1 },
    { type: 'npc', id: B2_14_SPECIAL, x: 4, y: 4 },
    { type: 'npc', id: B2_14_FIGURE, x: 9, y: 2 },
    { type: 'npc', id: B2_14_G, x: 9, y: 2 },
    // Bloque 2: los ecos salen del agua; G pelea; al vencerlo queda G en paz (el desenlace)
    { type: 'enemy', id: 'b2-14-echo1', x: 6, y: 2, after: 'b2-14-reveal' },
    { type: 'enemy', id: 'b2-14-echo2', x: 7, y: 4, after: 'b2-14-echo1' },
    { type: 'enemy', id: 'b2-14-echo3', x: 8, y: 3, after: 'b2-14-echo2' },
    { type: 'enemy', id: 'b2-14-boss', x: 9, y: 2, after: 'b2-14-echo3' },
    // Al lado del jefe vencido (que sigue en su casilla y respondería primero): lo encontró el bot Humo
    { type: 'npc', id: 'b2-14-g-peace', x: 10, y: 3 },
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
    { label: 'Los ecos de B2 (3)', done: s.defeated.includes('b2-14-echo3') },
    { label: 'G', done: s.defeated.includes('b2-14-boss') },
    { label: 'Be brave. Use your voice.', done: s.opened.includes('b2-14-ending') },
    { label: 'Recordar juntos', done: s.opened.includes('b2-14-reflect') },
    { label: 'El examen de B2', done: s.opened.includes('b2-14-exam') },
    { label: 'Despedida', done: s.opened.includes('b2-14-close') },
  ],
  intro: {
    first: 'Lumen Bay harbour, at sunset. Someone is waiting for you. — El puerto de Lumen Bay, al atardecer. Alguien te espera.',
    later: (s: GameState) => (s.opened.includes('b2-14-close') ? 'Use Your Voice. The end… for now. — Fin del juego. Puedes volver a jugar cualquier nivel.' : 'The harbour at sunset. — El puerto al atardecer.'),
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

// ── Bloque 2 ──
// Tres ecos de los jefes de B2 (uno por parte del mapa: The Deadline, The Developer y The Spoiler; reutilizan sus preguntas)
// → el jefe final G (3 fases; la 3.ª a dos voces con Leo joven, en voz alta o escrita) → el desenlace (b2-14-ending, script
// con G en paz): devuelve el centro del reloj, "Be brave. Use your voice.", se desvanece; la inscripción del reloj.
export const B2_14_ECHO1 = 'b2-14-echo1'
export const B2_14_ECHO2 = 'b2-14-echo2'
export const B2_14_ECHO3 = 'b2-14-echo3'
export const B2_14_BOSS = 'b2-14-boss'
export const B2_14_G_PEACE = 'b2-14-g-peace'
export const B2_14_ENDING = 'b2-14-ending'

const GREY = { shirt: '#4a4a55', hair: '#2a2a33', skin: '#8f8f9c' }

/** Ecos de los jefes de B2: repaso rápido con las preguntas de los jefes originales (sus etiquetas). Sin atuendo */
const ECHO = (id: string, name: string, topics: EnemyDef['topics'], tags: string[], before: { text: string; es: string }): EnemyDef => ({
  id,
  name,
  person: name,
  kind: 'minion',
  echo: true,
  hp: 4,
  topics,
  kinds: ['fill', 'fix', 'order', 'listen'],
  tags,
  onlyTags: true,
  zone: 'calle',
  look: GREY,
  before: [before],
  after: [{ text: '(The echo breaks and falls back into the water.)', es: '(El eco se rompe y cae de nuevo al agua.)' }],
  freed: { text: '(Only the sound of the waves.)', es: '(Solo el sonido de las olas.)' },
})

const MX = 'mixed-cond-b2' as const
const WS = 'wish-b2' as const
const REVIEW: EnemyDef['topics'] = ['past-modals-b2', 'reporting-to-b2', 'reporting-ing-b2', 'passive-report-b2', 'fperfect-b2', 'nd-relative-b2', 'contrast-b2']

/**
 * G, el último resto de su rencor. Ya no es malvado, solo está dolido. Jefe de 3 fases.
 * Fase 1: condicionales mixtos y wish (b2-14-boss-mx, con escucha) · Fase 2: repaso de todo B2 (b2-14-boss-mix: modales en
 * pasado, verbos declarativos, pasiva de reporte, futuro perfecto, relativas explicativas y contraste) · Fase 3: a dos voces
 * (b2-14-boss-v): el protagonista y Leo joven hablan juntos; sin micrófono se escribe.
 * Suelta el atuendo final 'chaqueta-dos-voces' (data/school.ts) y tiene despedida.
 */
export const B2_14_BOSS_DEF: EnemyDef = {
  id: B2_14_BOSS,
  name: 'G',
  person: 'G',
  kind: 'boss',
  reward: 'chaqueta-dos-voces',
  hp: 12,
  topics: [MX, WS],
  kinds: ['fill', 'fix', 'order', 'listen'],
  tags: ['b2-14-boss-mx'],
  phases: [
    { hp: 4, title: 'Lo que pudo ser', topics: [MX, WS], kinds: ['fill', 'fix', 'listen'], tags: ['b2-14-boss-mx'], line: { text: "If I would have known, I would be here… If you had helped me, I wouldn't lost my voice!", es: "If I would have known y I wouldn't lost: mal." } },
    { hp: 4, title: 'Todo B2', topics: REVIEW, kinds: ['fill', 'fix'], tags: ['b2-14-boss-mix'], line: { text: 'You should have help me! It is say that you never cared…', es: 'should have help e It is say: mal.' } },
    { hp: 4, title: 'Dos voces', topics: [MX, WS, 'fire-b2'], kinds: canRecognize ? ['speak'] : ['write'], tags: ['b2-14-boss-v'], line: { text: "(Leo stands next to you. \"Together?\" he says. You nod.)", es: '(Leo se pone a tu lado. "¿Juntos?", dice. Asientes.)' } },
  ],
  onlyTags: true,
  zone: 'calle',
  look: { shirt: '#23252d', hair: '#c9ccd2', skin: '#d7a77a', gender: 'male' },
  before: [{ text: "If I would have known how this ends, I would be here forever. Say something! You never say anything…", es: '"If I would have known" está mal (If I had known). ¡Di algo! Tú nunca dices nada…' }],
  after: [{ text: '(The anger leaves his face. For the first time, G smiles.)', es: '(La rabia se va de su cara. Por primera vez, G sonríe.)' }],
  freed: { text: '(He is still transparent… but he looks calm now.)', es: '(Sigue transparente… pero ahora se ve tranquilo.)' },
  farewell: {
    q: 'G (smiling): "If you could go back, would you change anything?"',
    options: ["If I could, I won't change our friendship.", "If I could, I wouldn't change our friendship.", "If I can, I wouldn't changed our friendship."],
    answer: 1,
    tip: 'Segundo condicional: If I could, I wouldn\'t change…',
  },
}

export const B2_14_ENEMIES: Record<string, EnemyDef> = {
  [B2_14_ECHO1]: ECHO(B2_14_ECHO1, 'Echo of The Deadline', ['ppc-b2', 'interview-b2'], ['b2-02-boss-pp'], { text: 'Too late, too late… you had been finish!', es: 'Parte 1 · The Deadline: "had been finish" está mal.' }),
  [B2_14_ECHO2]: ECHO(B2_14_ECHO2, 'Echo of The Developer', ['if-alt-b2', 'get-b2'], ['b2-07-boss-if'], { text: 'Provided that it will have exits… you won\'t get away from me!', es: 'Parte 2 · The Developer: "provided… will have" y "get away from" están mal.' }),
  [B2_14_ECHO3]: ECHO(B2_14_ECHO3, 'Echo of The Spoiler', ['narrative-b2', 'film-b2'], ['b2-11-boss-nt'], { text: 'She had been knowing him for years! The end!', es: 'Parte 3 · The Spoiler: "had been knowing" está mal.' }),
  [B2_14_BOSS]: B2_14_BOSS_DEF,
}

/** El desenlace (final B): G devuelve el centro del reloj y se desvanece en paz. La paradoja se resuelve con la inscripción */
export const B2_14_ENDING_SCRIPT: ScriptLine[] = [
  { who: 'narrator', text: '(G opens his hand. Inside, the centre of the clock: the core he took from you on the tower, long ago.)', es: '(G abre la mano. Adentro, el centro del reloj: el núcleo que te quitó en la torre, hace mucho.)' },
  { who: 'friend', text: 'This was always yours. I should never have taken it.', es: 'Esto siempre fue tuyo. Nunca debí habértelo quitado.' },
  { who: 'narrator', text: '(He looks at you. Then at Leo. Two friends, side by side.)', es: '(Te mira. Luego a Leo. Dos amigos, uno al lado del otro.)' },
  { who: 'friend', text: 'Be brave. Use your voice.', es: 'Sean valientes. Usen su voz.' },
  { who: 'narrator', text: '(He fades like morning fog over the water. In peace.)', es: '(Se desvanece como la niebla de la mañana sobre el agua. En paz.)' },
  { who: 'narrator', text: '(Leo takes an old card out of his pocket: the card from his 15th birthday. It is the only thing left of G.)', es: '(Leo saca una tarjeta vieja del bolsillo: la de su cumpleaños número 15. Es lo único que queda de G.)' },
  { who: 'L', text: 'My voice… it\'s back. All of it.', es: 'Mi voz… volvió. Completa.' },
  { who: 'narrator', text: '(The core clicks into the clock. Six segments, all glowing. A last inscription appears: "What happened, still happened. The clock keeps every echo.")', es: '(El núcleo encaja en el reloj. Seis segmentos, todos brillando. Aparece una última inscripción: "Lo que pasó, sigue habiendo pasado. El reloj guarda cada eco".)' },
  { who: 'narrator', text: '(Everything you lived, from the school to this harbour, is still real. But the future doesn\'t lead to G anymore.)', es: '(Todo lo que viviste, desde la escuela hasta este puerto, sigue siendo real. Pero el futuro ya no lleva a G.)' },
]

// ── Bloque 3 ──
// Recordar juntos (b2-14-reflect, DebateTalk con Maya: sin respuestas malas) → Leo: el examen de B2 (b2-14-exam,
// components/B1Exam.tsx con data/b2Exam.ts) → Leo: la despedida, los créditos y el cierre (b2-14-close = b2CloseId(14)).
// Diario: data/b2Diary.ts (página del protagonista, última página del cuaderno de G y página mezclada).
// Insignias "B2 completado" y "Juego completado" (data/collection.ts).
export const B2_14_REFLECT = 'b2-14-reflect'
export const B2_14_EXAM = 'b2-14-exam'
export const B2_14_CLOSE = 'b2-14-close'

/** Recordar juntos en el muelle (Busuu 24): cada amigo recuerda un momento de A1 a B2. Todas las respuestas valen */
export const B2_14_REFLECT_TURNS: DebateTurn[] = [
  {
    text: 'Maya: Do you remember the first day at school? You couldn\'t say a word. I still recall your face!',
    es: 'Maya: ¿Te acuerdas del primer día en la escuela? No podías decir ni una palabra. ¡Todavía recuerdo tu cara!',
    options: [
      { en: 'I remember it well. If it hadn\'t been for Leo, I would never have started talking.', es: 'Lo recuerdo bien. Si no hubiera sido por Leo, nunca habría empezado a hablar.', value: 'good', reply: { text: 'Leo was a good teacher even then.', es: 'Leo ya era buen profesor desde entonces.' } },
      { en: 'It reminds me how far we have come.', es: 'Me recuerda lo lejos que hemos llegado.', value: 'good', reply: { text: 'Very far. From hello to here.', es: 'Muy lejos. Desde hello hasta aquí.' } },
      { en: "Honestly, I'd rather not look back on that day!", es: 'La verdad, ¡prefiero no mirar atrás a ese día!', value: 'good', reply: { text: 'Ha! Fair enough.', es: '¡Ja! Me parece justo.' } },
    ],
  },
  {
    text: '{iname}: I keep thinking about the hospital, after the tower. I regret not staying with you that night.',
    es: '{iname}: Sigo pensando en el hospital, después de la torre. Me arrepiento de no haberme quedado contigo esa noche.',
    options: [
      { en: "Don't regret anything. I'm grateful that you were there at all.", es: 'No te arrepientas de nada. Agradezco que hayas estado ahí.', value: 'good', reply: { text: "Then I'll stop regretting it.", es: 'Entonces dejaré de arrepentirme.' } },
      { en: "You came every day after that. That's what I remember.", es: 'Viniste todos los días después de eso. Eso es lo que recuerdo.', value: 'good', reply: { text: 'Every single day.', es: 'Todos los días.' } },
      { en: "I wish I had told you how much that meant to me.", es: 'Ojalá te hubiera dicho cuánto significó para mí.', value: 'good', reply: { text: "You're telling me now. That's enough.", es: 'Me lo estás diciendo ahora. Con eso basta.' } },
    ],
  },
  {
    text: "Leo: I can't stop thinking about him. About… me. Is it strange that I'm thankful?",
    es: 'Leo: No puedo dejar de pensar en él. En… mí. ¿Es raro que esté agradecido?',
    options: [
      { en: "It's not strange. He gave you the card. It's time to let go of the rest.", es: 'No es raro. Él te dio la tarjeta. Es hora de soltar el resto.', value: 'good', reply: { text: 'Let go… yes. I think I can.', es: 'Soltar… sí. Creo que puedo.' } },
      { en: "We'll never forget him. But we can move on.", es: 'Nunca lo vamos a olvidar. Pero podemos seguir adelante.', value: 'good', reply: { text: "Together, then.", es: 'Juntos, entonces.' } },
      { en: "If you hadn't stood up for me, none of this would be possible.", es: 'Si no me hubieras defendido, nada de esto sería posible.', value: 'good', reply: { text: 'And if you hadn\'t shouted with me, I wouldn\'t have a voice.', es: 'Y si no hubieras gritado conmigo, yo no tendría voz.' } },
    ],
  },
  {
    text: 'Maya: OK, last one. Which moment was the most unforgettable for you?',
    es: 'Maya: Bueno, la última. ¿Cuál fue el momento más inolvidable para ti?',
    options: [
      { en: 'The night of the fire, when two voices were louder than the alarm.', es: 'La noche del incendio, cuando dos voces sonaron más fuerte que la alarma.', value: 'good', reply: { text: 'I can almost hear it.', es: 'Casi puedo oírlo.' } },
      { en: 'This one. Right now, with all of you.', es: 'Este. Ahora mismo, con todos ustedes.', value: 'good', reply: { text: "Stop, you're going to make me cry!", es: '¡Para, me vas a hacer llorar!' } },
      { en: 'Every moment when someone didn\'t stay silent.', es: 'Cada momento en que alguien no se quedó en silencio.', value: 'good', reply: { text: "That's a good answer.", es: 'Esa es una buena respuesta.' } },
    ],
  },
]

/** La despedida en el puerto, los créditos y el fin del juego (b2-14-close) */
export const B2_14_CLOSE_SCRIPT: ScriptLine[] = [
  { who: 'narrator', text: '(The sun touches the sea. The four of you sit at the end of the pier.)', es: '(El sol toca el mar. Los cuatro se sientan al final del muelle.)' },
  { who: 'friend', text: "Maybe I'll be a teacher one day.", es: 'Tal vez algún día sea profesor.' },
  { who: 'L', text: "You will. And you'll be a good one.", es: 'Lo serás. Y vas a ser uno bueno.' },
  { who: 'narrator', text: '(Leo looks at the old card in his hand and smiles. Behind you, the port is full of voices.)', es: '(Leo mira la tarjeta vieja en su mano y sonríe. Detrás de ustedes, el puerto está lleno de voces.)' },
  { who: 'narrator', text: 'ENGLISH COMBAT', es: 'ENGLISH COMBAT' },
  { who: 'narrator', text: 'Created and directed by JuanMed.', es: 'Creado y dirigido por JuanMed.' },
  { who: 'narrator', text: 'Story: the stranger, the clock, the fire and the voice. From A1 to B2.', es: 'Historia: el desconocido, el reloj, el incendio y la voz. De A1 a B2.' },
  { who: 'narrator', text: 'Thank you for playing… and for using your voice.', es: 'Gracias por jugar… y por usar tu voz.' },
  { who: 'narrator', text: '(You can play any level again from the menu: A1, A2, B1 or B2.)', es: '(Puedes volver a jugar cualquier nivel desde el menú: A1, A2, B1 o B2.)' },
]
