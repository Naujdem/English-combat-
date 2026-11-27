import type { EnemyDef, GameState, SceneDef, Zone } from '../game/types'
import type { ReconstructItem } from '../components/Reconstruct'
import type { ScriptLine } from './b1Accident'
import type { SpriteLook } from '../components/Sprite'
import { B1_04_MAP } from './b1Residence'

/**
 * B2-04 · Fake Profile (presente). Bloque 1: la residencia, la calle y el banco de Lumen Bay (escena b2-04-residence,
 * el mismo mapa de B1-04). Guía: Maya (Ricardo en el banco).
 * Orden: Maya (b2-04-profile, script: la solicitud del perfil "G") →
 *   Maya: lección 'online-safety-b2' + práctica (b2-04-security) →
 *   Maya: lección 'past-modals-b2' + práctica (b2-04-modals) →
 *   Maya: lección 'neednt-b2' + práctica (b2-04-neednt) →
 *   Maya: Reconstruct (Detective) del perfil falso (b2-04-detective, bloque 2) → se abre el pasillo →
 *   Jeison (b2-04-jeison, script: el pago falso a nombre de "G") → se abren la calle y el banco →
 *   Ricardo: lección 'fraud-b2' + práctica (b2-04-bank) →
 *   Priya, en la calle con el Herald impreso (b2-04-echo, script: el artículo sobre la dark web y el Echo Market).
 * Bloque 2: el detective (arriba); tras el artículo de Priya, dos Phishing Bots en la calle (esbirros) y el jefe The Catfish
 *   (2 fases) en el vestíbulo, junto al mostrador de Marisol.
 * Bloque 3: tras vencer a The Catfish aparece Leo en el vestíbulo: charla de amistad (B2_04_FRIEND, Explore.tsx) →
 *   Maya: el cierre (b2-04-close): recupera los temas; Explore muestra FragmentJoin (el fragmento de The Catfish se une con el del
 *   lugar 1 y el segundo segmento queda a la mitad, B2_04_FRAGMENTS). Se abren el lugar 5 y el Extra Fusion Night.
 *   Hoodie de hacker (regalo de The Catfish). Diario y lectura larga "Inside the Echo Market": data/b2Diary.ts.
 */
export const B2_04_RESIDENCE_ID = 'b2-04-residence'
export const B2_04_MAYA = 'b2-04-maya'
export const B2_04_JEISON = 'b2-04-jeison'
export const B2_04_RICARDO = 'b2-04-ricardo'
export const B2_04_PRIYA = 'b2-04-priya'
/** Tareas (marcas en `opened`) */
export const B2_04_PROFILE = 'b2-04-profile'
export const B2_04_SECURITY = 'b2-04-security'
export const B2_04_MODALS = 'b2-04-modals'
export const B2_04_NEEDNT = 'b2-04-neednt'
export const B2_04_JEISON_TALK = 'b2-04-jeison-talk'
export const B2_04_BANK = 'b2-04-bank'
export const B2_04_ECHO = 'b2-04-echo'
/** Bloque 2 */
export const B2_04_DETECTIVE = 'b2-04-detective'
export const B2_04_BOT1 = 'b2-04-bot1'
export const B2_04_BOT2 = 'b2-04-bot2'
export const B2_04_BOSS = 'b2-04-boss'
/** Bloque 3 */
export const B2_04_LEO = 'b2-04-leo'
export const B2_04_FRIEND = 'b2-04-friend'
export const B2_04_CLOSE = 'b2-04-close'
/** Se guarda al terminar la animación: el fragmento se une con el del lugar 1 (medio segundo segmento del núcleo) */
export const B2_04_FRAGMENTS = 'b2-04-fragments'
export const B2_04_HALF_SEGMENT = { en: 'The two fragments join… but the second segment only lights up halfway.', es: 'Los dos fragmentos se unen… pero el segundo segmento solo se enciende a la mitad.' }

/** Aspecto de Ricardo como guía de lección (Lesson.tsx): el mismo que en B1-04 */
export const B2_RICARDO_LOOK: SpriteLook = { shirt: '#f4f4f0', hair: '#2b2b33', skin: '#d7a77a', gender: 'male' }

function zoneAt(x: number): Zone {
  if (x <= 8) return 'recepcion'
  if (x <= 16) return 'casa'
  if (x >= 24) return 'oficina'
  return 'calle'
}

const NOT_YET = (sub: string) => ({ text: 'Todavía no.', sub })
const COUNTER = { text: 'The bank counter. Ricardo works here.', sub: 'El mostrador del banco. Ricardo trabaja aquí.', say: 'The bank counter. Ricardo works here.' }

export const B2_04_RESIDENCE: SceneDef = {
  id: B2_04_RESIDENCE_ID,
  name: 'Fake Profile · Residencia y banco',
  topics: [],
  map: B1_04_MAP,
  start: { x: 4, y: 6 },
  // Sin jefe en este bloque: la puerta del jefe apunta a un muro y no hace falta ninguna llave
  bossDoor: { x: 0, y: 0 },
  keysNeeded: 0,
  entities: [
    { type: 'npc', id: B2_04_MAYA, x: 5, y: 5 },
    { type: 'npc', id: B2_04_JEISON, x: 10, y: 3 },
    { type: 'npc', id: B2_04_RICARDO, x: 26, y: 1 },
    // Priya llega con el Herald impreso cuando terminas en el banco (npcs.ts, after: b2-04-bank)
    { type: 'npc', id: B2_04_PRIYA, x: 20, y: 3 },
    // Bloque 2: dos Phishing Bots en la calle (tras el artículo de Priya) y The Catfish junto al mostrador de Marisol
    { type: 'enemy', id: B2_04_BOT1, x: 19, y: 4, after: B2_04_ECHO },
    { type: 'enemy', id: B2_04_BOT2, x: 21, y: 3, after: B2_04_BOT1 },
    { type: 'enemy', id: B2_04_BOSS, x: 7, y: 3, after: B2_04_BOT2 },
    // Bloque 3: Leo llega al vestíbulo al vencer a The Catfish (npcs.ts, after: b2-04-boss)
    { type: 'npc', id: B2_04_LEO, x: 2, y: 4 },
  ],
  labels: [
    { text: 'Vestíbulo', x: 5, y: 6 },
    { text: 'Pasillo', x: 12, y: 4 },
    { text: 'Calle', x: 20, y: 4 },
    { text: 'Banco', x: 26, y: 4 },
  ],
  zoneAt,
  examine: {
    '25,2': COUNTER,
    '26,2': COUNTER,
    '27,2': COUNTER,
    '28,2': COUNTER,
    '29,6': { text: 'A cash machine. A sign says: "Never share your PIN."', sub: 'Un cajero automático. Un letrero dice: "Nunca compartas tu PIN".', say: 'Never share your PIN.' },
    '27,0': { text: 'BANK. Report suspicious payments at the counter.', sub: 'BANCO. Reporta pagos sospechosos en el mostrador.', say: 'Report suspicious payments at the counter.' },
    '4,0': { text: 'Notice: "Residence Wi-Fi password changed. Ask Marisol."', sub: 'Aviso: "Cambió la contraseña del wifi de la residencia. Pregúntale a Marisol".', say: 'Residence Wi-Fi password changed.' },
  },
  locked: (x, y, s) => {
    if (x === 8 && y === 4 && !s.opened.includes(B2_04_DETECTIVE)) return NOT_YET('Primero termina con Maya: lecciones y detective.')
    if (y === 2 && (x === 10 || x === 12 || x === 14)) return NOT_YET('Es el cuarto de un vecino.')
    if (((x === 16 && y === 4) || (x === 23 && y === 4)) && !s.opened.includes(B2_04_JEISON_TALK)) return NOT_YET('Primero habla con Jeison en el pasillo.')
    return null
  },
  requirements: [],
  chips: (s: GameState) => [
    { label: 'El perfil "G" (Maya)', done: s.opened.includes(B2_04_PROFILE) },
    { label: 'Seguridad en internet', done: s.opened.includes(B2_04_SECURITY) },
    { label: 'Modales en pasado', done: s.opened.includes(B2_04_MODALS) },
    { label: "needn't have / didn't need to", done: s.opened.includes(B2_04_NEEDNT) },
    { label: 'Detective: el perfil falso', done: s.opened.includes(B2_04_DETECTIVE) },
    { label: 'Jeison y el pago falso', done: s.opened.includes(B2_04_JEISON_TALK) },
    { label: 'Reportar el fraude (Ricardo)', done: s.opened.includes(B2_04_BANK) },
    { label: 'El artículo de Priya', done: s.opened.includes(B2_04_ECHO) },
    { label: 'Phishing Bots (2)', done: s.defeated.includes(B2_04_BOT2) },
    { label: 'The Catfish', done: s.defeated.includes(B2_04_BOSS) },
    { label: 'Charla con Leo', done: s.opened.includes(B2_04_FRIEND) },
    { label: 'El cierre (Maya)', done: s.opened.includes(B2_04_CLOSE) },
  ],
  intro: {
    first: 'Presente. La residencia de Lumen Bay. Maya te espera en el vestíbulo con el teléfono en la mano.',
    later: (s) =>
      s.opened.includes(B2_04_CLOSE)
        ? 'La residencia de Lumen Bay. El perfil "G" desapareció. La misión 4 terminó: el lugar 5 y Fusion Night te esperan en el mapa.'
        : s.opened.includes(B2_04_ECHO)
        ? 'La residencia de Lumen Bay. Alguien está usando el nombre "G" en internet.'
        : 'La residencia de Lumen Bay.',
  },
}

/** El perfil "G" (MemoryScript): Maya recibe una solicitud con una foto robada del protagonista */
export const B2_04_PROFILE_SCRIPT: ScriptLine[] = [
  { who: 'narrator', text: '(Maya is sitting on the sofa. She looks worried.)', es: '(Maya está sentada en el sofá. Se ve preocupada.)' },
  { who: 'narrator', text: 'Maya: Look at this. I got a friend request from an account called "G".', es: 'Maya: Mira esto. Me llegó una solicitud de amistad de una cuenta llamada "G".' },
  { who: 'narrator', text: "Maya: And the profile picture… it's you. Someone has stolen your photo.", es: 'Maya: Y la foto de perfil… eres tú. Alguien robó tu foto.' },
  { who: 'narrator', text: '(A new message appears on the screen.)', es: '(Aparece un mensaje nuevo en la pantalla.)' },
  { who: 'narrator', text: '"G": Ask your friend what {h:he|she} didn\'t do.', es: '"G": Pregúntale a tu {h:amigo|amiga} qué fue lo que no hizo.' },
  { who: 'narrator', text: '(Your hands go cold. G… like the name on the card.)', es: '(Se te enfrían las manos. G… como el nombre de la tarjeta.)' },
  { who: 'narrator', text: "Maya: Hey. Don't panic. It's probably a fake profile. Let's be smart about this.", es: 'Maya: Oye. No te asustes. Seguramente es un perfil falso. Seamos inteligentes con esto.' },
  { who: 'narrator', text: 'Maya: First, you need the right words. Account, password, phishing… I\'ll explain.', es: 'Maya: Primero necesitas las palabras correctas. Cuenta, contraseña, phishing… Te explico.' },
]

/** Jeison en el pasillo (MemoryScript): perdió dinero con un pago falso a nombre de "G" */
export const B2_04_JEISON_SCRIPT: ScriptLine[] = [
  { who: 'narrator', text: '(Jeison is walking up and down the corridor, staring at his phone.)', es: '(Jeison camina de un lado a otro del pasillo, mirando su teléfono.)' },
  { who: 'narrator', text: "Jeison: I can't believe it. I paid a lot of money for a second-hand bike. The bike doesn't exist.", es: 'Jeison: No lo puedo creer. Pagué mucho dinero por una bicicleta usada. La bicicleta no existe.' },
  { who: 'narrator', text: 'Jeison: The seller\'s account was called "G". Now the account is gone.', es: 'Jeison: La cuenta del vendedor se llamaba "G". Ahora la cuenta desapareció.' },
  { who: 'narrator', text: 'Jeison: I should have checked the account first. I shouldn\'t have paid before I saw the bike.', es: 'Jeison: Debí revisar la cuenta primero. No debí pagar antes de ver la bicicleta.' },
  { who: 'narrator', text: 'Maya: You might still get your money back. Let\'s go to the bank and report it.', es: 'Maya: Quizá todavía puedas recuperar tu dinero. Vamos al banco a reportarlo.' },
  { who: 'narrator', text: "Jeison: Will you come with me? My English goes away when I'm nervous.", es: 'Jeison: ¿Me acompañas? Mi inglés se me va cuando estoy nervioso.' },
]

/** Priya en la calle (MemoryScript): el artículo del Herald sobre la dark web y el Echo Market */
export const B2_04_ECHO_SCRIPT: ScriptLine[] = [
  { who: 'narrator', text: '(Priya runs towards you with a printed copy of the Herald.)', es: '(Priya corre hacia ti con un ejemplar impreso del Herald.)' },
  { who: 'narrator', text: 'Priya: Manuel told me about the fake profile. Read this. It comes out tomorrow.', es: 'Priya: Manuel me contó lo del perfil falso. Lee esto. Sale mañana.' },
  { who: 'narrator', text: '(The headline says: "THE DARK WEB: WHERE STOLEN DATA IS SOLD".)', es: '(El titular dice: "LA DARK WEB: DONDE SE VENDEN DATOS ROBADOS".)' },
  { who: 'narrator', text: '"The dark web is a hidden part of the internet. You can\'t find it with a normal search engine."', es: '"La dark web es una parte oculta de internet. No se encuentra con un buscador normal".' },
  { who: 'narrator', text: '"Criminals sell passwords, bank details and fake profiles there. Some of them may have used stolen photos."', es: '"Allí los delincuentes venden contraseñas, datos bancarios y perfiles falsos. Algunos pueden haber usado fotos robadas".' },
  { who: 'narrator', text: '"One market is stranger than the rest. It is called the Echo Market, and one seller offers… lost voices."', es: '"Hay un mercado más extraño que los demás. Se llama Echo Market y un vendedor ofrece… voces perdidas".' },
  { who: 'narrator', text: "Priya: Lost voices. It must be a joke… right?", es: 'Priya: Voces perdidas. Debe ser una broma… ¿no?' },
  { who: 'narrator', text: '(You don\'t answer. A black market for voices… where have you heard that before?)', es: '(No respondes. Un mercado negro de voces… ¿dónde has oído eso antes?)' },
]

// ── Bloque 2 ──

/** Reconstruct (Detective), reutilizado: Maya y el protagonista analizan el perfil "G" con modales en pasado */
export const B2_04_DETECTIVE_CONTENT: { title: string; intro: { en: string; es: string }; items: ReconstructItem[] } = {
  title: 'Detective: the "G" profile',
  intro: { en: "Let's look at the profile carefully. Compare each clue with the note.", es: 'Miremos el perfil con cuidado. Compara cada pista con la nota.' },
  items: [
    {
      source: 'Account information',
      clue: { en: 'Account created: yesterday, 11:48 p.m.', es: 'Cuenta creada: ayer, 11:48 p. m.' },
      claim: { en: 'The account might have been created years ago.', es: 'La cuenta pudo crearse hace años.' },
      options: ['The account must have been created yesterday.', "The account can't have been created yesterday.", 'The account must has been created yesterday.'],
      answer: 0,
      tip: 'Hay una prueba (la fecha): must have + participio.',
      mode: 'choose',
    },
    {
      source: 'The Herald website',
      clue: { en: 'Your photo is also on the Herald website, in the article about the new interns.', es: 'Tu foto también está en la página del Herald, en el artículo sobre los nuevos practicantes.' },
      claim: { en: 'Nobody could have copied the photo.', es: 'Nadie pudo copiar la foto.' },
      options: ['Someone could have copy the photo from the Herald.', 'Someone could have copied the photo from the Herald.', 'Nobody could have copied the photo.'],
      answer: 1,
      tip: 'Es una posibilidad: could have + participio (copied).',
      mode: 'choose',
    },
    {
      source: 'The profile text',
      clue: { en: 'The profile says: "I has many friend. I am live in Lumen Bay."', es: 'El perfil dice: "I has many friend. I am live in Lumen Bay."' },
      claim: { en: 'The person who wrote it must have been an English teacher.', es: 'Quien lo escribió debió de ser profesor de inglés.' },
      options: ["The person who wrote it can't have be an English teacher.", 'The person who wrote it must have been an English teacher.', "The person who wrote it can't have been an English teacher."],
      answer: 2,
      tip: 'Tantos errores: es casi imposible → can\'t have been.',
      mode: 'choose',
    },
    {
      source: 'Maya',
      clue: { en: 'Last week you did a quiz: "Which animal are you?" It asked for your birthday and your photo.', es: 'La semana pasada hiciste un test: "¿Qué animal eres?" Te pidió tu cumpleaños y tu foto.' },
      claim: { en: 'You should have given your birthday to the quiz.', es: 'Debiste darle tu cumpleaños al test.' },
      options: ["You shouldn't have given your birthday to the quiz.", "You shouldn't have gave your birthday to the quiz.", 'You should have given your birthday to the quiz.'],
      answer: 0,
      tip: 'Crítica de algo que hiciste: shouldn\'t have + participio (given).',
      mode: 'choose',
    },
  ],
}

const PM = 'past-modals-b2' as const
const NN = 'neednt-b2' as const
const OS = 'online-safety-b2' as const
const FR = 'fraud-b2' as const

/** Phishing Bots, bots corrompidos de mensajes falsos. Preguntas: etiqueta b2-04-bot */
const BOT = (id: string, line: { text: string; es: string }): EnemyDef => ({
  id,
  name: 'Phishing Bot',
  person: 'Phishing Bot',
  kind: 'minion',
  hp: 4,
  topics: [PM, NN],
  kinds: ['fill', 'fix'],
  tags: ['b2-04-bot'],
  onlyTags: true,
  zone: 'calle',
  look: { shirt: '#5b6b7a', hair: '#9fd3ff', skin: '#c9d3dc' },
  before: [line],
  after: [{ text: '(The bot sends one last message: "ERROR". Then it switches off.)', es: '(El bot manda un último mensaje: "ERROR". Luego se apaga.)' }],
  freed: { text: '(Your phone stops buzzing.)', es: '(Tu teléfono deja de vibrar.)' },
})

/**
 * The Catfish: el avatar corrompido del perfil "G", que cambia de cara en cada turno. Jefe de 2 fases.
 * Fase 1: could / might / should have (b2-04-boss-pm) · Fase 2: needn't have contra didn't need to y vocabulario de seguridad,
 * con escuchas de Ricardo en el banco (b2-04-boss-os). El fragmento y el cierre llegan en el bloque 3.
 */
export const B2_04_BOSS_DEF: EnemyDef = {
  id: B2_04_BOSS,
  name: 'The Catfish',
  person: 'The Catfish',
  kind: 'boss',
  reward: 'hoodie-hacker',
  hp: 10,
  topics: [PM, NN, OS],
  kinds: ['fill', 'fix', 'order', 'listen'],
  tags: ['b2-04-boss-pm'],
  phases: [
    { hp: 5, title: 'Una cara nueva: el pasado', topics: [PM], kinds: ['fill', 'fix', 'order'], tags: ['b2-04-boss-pm'], line: { text: 'You should of changed your password… It might have be me. Or you!', es: 'should of y might have be: mal.' } },
    { hp: 5, title: 'Otra cara: la seguridad', topics: [NN, OS, FR], kinds: ['fill', 'fix', 'listen'], tags: ['b2-04-boss-os'], line: { text: 'I needn\'t have to pay… Turn on your two-factor password!', es: 'needn\'t have to y two-factor password: mal.' } },
  ],
  onlyTags: true,
  zone: 'recepcion',
  look: { shirt: '#2a6f7a', hair: '#7fe0d0', skin: '#b8c4cc' },
  before: [{ text: '(The phone screen grows and grows. A face made of photos steps out of it. Every second, it changes.)', es: '(La pantalla del teléfono crece y crece. Una cara hecha de fotos sale de ella. Cada segundo cambia.)' }, { text: 'I am you. I am anyone. Who will believe you now?', es: 'Soy tú. Soy cualquiera. ¿Quién te va a creer ahora?' }],
  after: [{ text: '(The faces fall like playing cards. Only a blank screen is left.)', es: '(Las caras caen como cartas. Solo queda una pantalla en blanco.)' }],
  freed: { text: '(On the floor, something glows. A fragment.)', es: '(En el suelo, algo brilla. Un fragmento.)' },
  farewell: {
    q: 'The Catfish (fading): "I only borrowed your face… You needn\'t have fought so hard."',
    options: ['You should have asked first.', 'You should of asked first.', 'You should have ask first.'],
    answer: 0,
    tip: 'should have + participio (asked). Nunca "should of".',
  },
}

export const B2_04_ENEMIES: Record<string, EnemyDef> = {
  [B2_04_BOT1]: BOT(B2_04_BOT1, { text: 'NEW MESSAGE: You should have check the link! Click again!', es: 'should have check: mal (should have checked).' }),
  [B2_04_BOT2]: BOT(B2_04_BOT2, { text: "NEW MESSAGE: He must has deleted it… She needn't to have paid…", es: "must has y needn't to have: mal." }),
  [B2_04_BOSS]: B2_04_BOSS_DEF,
}
