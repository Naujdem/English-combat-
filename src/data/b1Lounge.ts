import type { GameState, SceneDef, Zone } from '../game/types'
import type { ScriptLine } from './b1Accident'
import type { ReporterContent } from '../components/Reporter'

/**
 * B1-14 · Voices (presente, final de B1). Bloque A: la sala común de la residencia de Lumen Bay, de madrugada (escena b1-14-lounge).
 * NO es recuerdo (game/memory.ts solo toma las misiones impares).
 *
 * Un sofá, una mesa baja, una estantería, ventanas todavía oscuras y la puerta a la calle.
 * Orden: la persona especial (b1-14-gather, script: el protagonista reúne a sus amigos) →
 *   Leo: lección 'reported-speech-b1' + práctica (b1-14-reported) → Leo: lección 'say-tell-b1' + práctica (b1-14-saytell) →
 *   Bloque B: Leo: lección 'reporting-verbs-b1' + práctica (b1-14-verbs) → Maya: el minijuego Reporter (b1-14-reporter) →
 *   la tele: el boletín de Manuel (b1-14-news, script) → Leo: lección 'indirect-questions-b1' + práctica (b1-14-indirect) →
 *   la puerta a la calle: el puerto (bloque 14-C, data/b1Harbour.ts).
 * Ningún bloque A guarda closeId(14) (se guarda en el último bloque).
 */
export const B1_14_LOUNGE_ID = 'b1-14-lounge'
export const B1_14_LEO = 'b1-14-leo'
export const B1_14_MAYA = 'b1-14-maya'
export const B1_14_SPECIAL = 'b1-14-special'
export const B1_14_GATHER = 'b1-14-gather'
export const B1_14_REPORTED = 'b1-14-reported'
export const B1_14_SAYTELL = 'b1-14-saytell'
/** Bloque B */
export const B1_14_TV = 'b1-14-tv'
export const B1_14_VERBS = 'b1-14-verbs'
export const B1_14_REPORTER = 'b1-14-reporter'
export const B1_14_NEWS = 'b1-14-news'
export const B1_14_INDIRECT = 'b1-14-indirect'

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
    // La tele (bloque B), junto a la pared derecha; se dibuja con TabletIcon (Explore.tsx)
    { type: 'npc', id: B1_14_TV, x: 10, y: 3 },
  ],
  labels: [{ text: 'The common room', x: 6, y: 1 }],
  zoneAt: () => zoneAt(),
  examine: {
    '2,0': WINDOW,
    '9,0': WINDOW,
  },
  // La puerta a la calle (5,6) lleva al puerto (bloque 14-C, data/b1Harbour.ts) solo con las preguntas indirectas hechas
  locked: (x, y, s) => {
    if (x === 5 && y === 6 && !s.opened.includes(B1_14_INDIRECT)) return { text: 'Todavía no.', sub: 'Primero termina todo en la sala: Leo, Maya y las noticias.' }
    return null
  },
  links: { '5,6': { sceneId: 'b1-14-harbour', pos: { x: 1, y: 3 } } },
  requirements: [],
  chips: (s: GameState) => [
    { label: 'Reunir a tus amigos', done: s.opened.includes(B1_14_GATHER) },
    { label: 'Leo: contar lo que alguien dijo', done: s.opened.includes(B1_14_REPORTED) },
    { label: 'Leo: say, tell y speak', done: s.opened.includes(B1_14_SAYTELL) },
    { label: 'Leo: explain, admit y promise', done: s.opened.includes(B1_14_VERBS) },
    { label: 'Contarles los recuerdos (Reporter)', done: s.opened.includes(B1_14_REPORTER) },
    { label: 'Las noticias', done: s.opened.includes(B1_14_NEWS) },
    { label: 'Leo: preguntas indirectas', done: s.opened.includes(B1_14_INDIRECT) },
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

/**
 * Reporter (bloque B, components/Reporter.tsx): las frases más importantes de los recuerdos, en estilo indirecto.
 * Las fichas que sobran (extra) son formas incorrectas; no se da la forma sin cambio de tiempo, que a veces también es válida.
 */
export const B1_14_REPORTER_GAME: ReporterContent = {
  title: 'Reporter',
  intro: { en: 'Your friends are listening. Tell them what was said in the memories.', es: 'Tus amigos te escuchan. Cuéntales lo que se dijo en los recuerdos.' },
  rounds: [
    {
      speaker: { en: 'The doctor', es: 'la médica' },
      quote: "You can't speak for a long time.",
      quoteEs: 'No puedes hablar por mucho tiempo.',
      start: 'The doctor told him that',
      answer: ['he', "couldn't", 'speak', 'for', 'a', 'long', 'time'],
      extra: ['can', 'spoke'],
      es: 'La médica le dijo que no podía hablar por mucho tiempo.',
      tip: "You → he. can't → couldn't + verbo en forma base (speak).",
      reaction: { who: 'maya', en: "For a long time? That's awful.", es: '¿Por mucho tiempo? Qué horrible.' },
    },
    {
      speaker: { en: 'The man', es: 'el hombre' },
      quote: 'I lost everything.',
      quoteEs: 'Lo perdí todo.',
      start: 'He said that',
      answer: ['he', 'had', 'lost', 'everything'],
      extra: ['lose', 'did'],
      es: 'Él dijo que lo había perdido todo.',
      tip: 'I → he. lost → had lost (had + participio).',
      reaction: { who: 'special', en: 'Everything? Poor man.', es: '¿Todo? Pobre hombre.' },
    },
    {
      speaker: { en: 'The man', es: 'el hombre' },
      quote: 'I tried everything.',
      quoteEs: 'Lo intenté todo.',
      start: 'He explained that',
      answer: ['he', 'had', 'tried', 'everything'],
      extra: ['try', 'tries'],
      es: 'Él explicó que lo había intentado todo.',
      tip: 'tried → had tried (had + participio).',
      reaction: { who: 'leo', en: 'So nothing worked. I see.', es: 'Así que nada funcionó. Ya veo.' },
    },
    {
      speaker: { en: 'The man', es: 'el hombre' },
      quote: 'I stole the device.',
      quoteEs: 'Robé el aparato.',
      start: 'He admitted that',
      answer: ['he', 'had', 'stolen', 'the', 'device'],
      extra: ['steal', 'stealed'],
      es: 'Él admitió que había robado el aparato.',
      tip: 'stole → had stolen (el participio de steal es stolen).',
      reaction: { who: 'maya', en: 'He stole it? Are you serious?', es: '¿Lo robó? ¿En serio?' },
    },
    {
      speaker: { en: 'The man', es: 'el hombre' },
      quote: "My friend didn't help me.",
      quoteEs: 'Mi {h:amigo|amiga} no me ayudó.',
      start: 'He said that',
      answer: ['his', 'friend', "hadn't", 'helped', 'him'],
      extra: ['me', 'help'],
      es: 'Él dijo que su {h:amigo|amiga} no lo había ayudado.',
      tip: "My → his, me → him. didn't help → hadn't helped.",
      reaction: { who: 'special', en: "I can't believe it. What kind of friend does that?", es: 'No lo puedo creer. ¿Qué clase de amigo hace eso?' },
    },
    {
      speaker: { en: 'The man', es: 'el hombre' },
      quote: 'I will take back what I lost.',
      quoteEs: 'Recuperaré lo que perdí.',
      start: 'He promised that',
      answer: ['he', 'would', 'take', 'back', 'what', 'he', 'had', 'lost'],
      extra: ['took', 'lose'],
      es: 'Él prometió que recuperaría lo que había perdido.',
      tip: 'will → would. lost → had lost.',
      reaction: { who: 'leo', en: 'That sounds like a threat.', es: 'Eso suena a amenaza.' },
    },
  ],
  finish: { en: 'Now they know what you know.', es: 'Ahora ellos saben lo que tú sabes.', banner: 'Se lo contaste todo' },
}

/** El boletín de Manuel en la tele (bloque B; secuencia fija, MemoryScript). La pasiva de las noticias */
export const B1_14_NEWS_SCRIPT: ScriptLine[] = [
  { who: 'narrator', text: '(Maya turns on the TV. The local news is on.)', es: '(Maya enciende la tele. Están dando las noticias locales.)' },
  { who: 'narrator', text: 'Headline: VOICE BLACKOUTS AT THE HARBOUR.', es: 'Titular: APAGONES DE VOZ EN EL PUERTO.' },
  { who: 'narrator', text: 'Manuel: Good morning. This is Manuel, reporting live from the harbour of Lumen Bay.', es: 'Manuel: Buenos días. Les habla Manuel, en vivo desde el puerto de Lumen Bay.' },
  { who: 'narrator', text: 'Manuel: Strange "voice blackouts" have been reported here since last night.', es: 'Manuel: Desde anoche se han reportado aquí extraños "apagones de voz".' },
  { who: 'narrator', text: 'Manuel: Three people were found near the docks. They are safe, but they cannot speak.', es: 'Manuel: Tres personas fueron encontradas cerca de los muelles. Están a salvo, pero no pueden hablar.' },
  { who: 'narrator', text: 'Manuel: The harbour has been closed by the police.', es: 'Manuel: El puerto ha sido cerrado por la policía.' },
  { who: 'narrator', text: 'Manuel: According to a witness, a dark shape was seen above the water.', es: 'Manuel: Según un testigo, se vio una forma oscura sobre el agua.' },
  { who: 'narrator', text: 'Manuel: Nobody knows where it started. Nobody knows if it will stop.', es: 'Manuel: Nadie sabe dónde empezó. Nadie sabe si se detendrá.' },
  { who: 'narrator', text: 'Leo: We have to go there. And we have to ask the right questions. Politely.', es: 'Leo: Tenemos que ir allá. Y tenemos que hacer las preguntas correctas. Con amabilidad.' },
]
