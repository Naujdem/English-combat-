import type { EnemyDef, GameState, SceneDef, Zone } from '../game/types'
import type { ScriptLine } from './b1Accident'
import type { FinePrintContent } from '../components/FinePrint'
import type { TextOnlyContent } from '../components/TextOnly'

/**
 * B2 · Extras: A Year Abroad (misión secundaria, presente; se abre al cerrar la misión 12). Escena b2-s3-office:
 * la oficina del intercambio en la residencia. Ms. Noor Haddad ofrece un semestre opcional en Galway, Irlanda (Busuu 23).
 * Orden: Ms. Haddad: la oferta (b2-s3-offer, script) → la videollamada con Ciarán, un estudiante de Galway (b2-s3-call,
 *   script, escucha: grand, the craic, your man, giving out) → Ms. Haddad: lección 'abroad-b2' (rate / fee, bill, meter,
 *   direct debit, contract; repaso de preguntas indirectas) + práctica (b2-s3-words) → The Fine Print, versión factura
 *   (b2-s3-bill: lo que prometía la oferta y los cobros escondidos) → Text Only con el proveedor: elegir un plan de pago
 *   (b2-s3-chat) → duelo amistoso con un contador de luz corrompido (b2-s3-meter, no castiga al perder) →
 *   Ms. Haddad: el cierre (b2-s3-close): el viaje queda "para después de todo esto"; gorra de lana irlandesa y monedas.
 */
export const B2_S3_OFFICE_ID = 'b2-s3-office'
export const B2_S3_HADDAD = 'b2-s3-haddad'
export const B2_S3_LAPTOP = 'b2-s3-laptop'
export const B2_S3_BILL_NPC = 'b2-s3-bill-paper'
export const B2_S3_PHONE = 'b2-s3-phone'
/** Tareas (marcas en `opened`) */
export const B2_S3_OFFER = 'b2-s3-offer'
export const B2_S3_CALL = 'b2-s3-call'
export const B2_S3_WORDS = 'b2-s3-words'
export const B2_S3_BILL = 'b2-s3-bill'
export const B2_S3_CHAT = 'b2-s3-chat'
export const B2_S3_METER = 'b2-s3-meter'
export const B2_S3_CLOSE = 'b2-s3-close'

/** Leyenda (Tiles.tsx, sin dibujos nuevos): # pared · W ventana · K escritorio · p planta · d puerta */
const MAP = [
  '#W###W###W#',
  '#.........#',
  '#.K.....K.#',
  '#p.......p#',
  '#####d#####',
]

const zoneAt = (): Zone => 'recepcion'
const TEXT = 'The exchange office. A map of Ireland on the wall. — La oficina del intercambio. Un mapa de Irlanda en la pared.'

export const B2_S3_OFFICE: SceneDef = {
  id: B2_S3_OFFICE_ID,
  name: 'A Year Abroad · La oficina del intercambio',
  topics: [],
  map: MAP,
  start: { x: 5, y: 3 },
  bossDoor: { x: 0, y: 0 },
  keysNeeded: 0,
  entities: [
    { type: 'npc', id: B2_S3_HADDAD, x: 5, y: 1 },
    { type: 'npc', id: B2_S3_LAPTOP, x: 2, y: 1 },
    { type: 'npc', id: B2_S3_BILL_NPC, x: 8, y: 1 },
    { type: 'npc', id: B2_S3_PHONE, x: 7, y: 3 },
    // El contador corrompido aparece después del chat con el proveedor
    { type: 'enemy', id: B2_S3_METER, x: 3, y: 3, after: B2_S3_CHAT },
  ],
  labels: [{ text: 'Exchange office', x: 5, y: 2 }],
  zoneAt: () => zoneAt(),
  examine: {},
  locked: (x, y) => (x === 5 && y === 4 ? { text: 'The way out.', sub: 'Para volver al mapa, toca el botón Mapa.' } : null),
  links: {},
  requirements: [],
  chips: (s: GameState) => [
    { label: 'La oferta de Ms. Haddad', done: s.opened.includes(B2_S3_OFFER) },
    { label: 'Videollamada con Galway', done: s.opened.includes(B2_S3_CALL) },
    { label: 'Servicios: rate y fee', done: s.opened.includes(B2_S3_WORDS) },
    { label: 'La factura', done: s.opened.includes(B2_S3_BILL) },
    { label: 'Chat con el proveedor', done: s.opened.includes(B2_S3_CHAT) },
    { label: 'Duelo con el contador', done: s.defeated.includes(B2_S3_METER) },
    { label: 'El cierre', done: s.opened.includes(B2_S3_CLOSE) },
  ],
  intro: {
    first: TEXT,
    later: (s: GameState) => (s.opened.includes(B2_S3_CLOSE) ? 'A Year Abroad. Extra completado.' : TEXT),
  },
}

/** La oferta de Ms. Haddad ('friend' = Ms. Haddad) */
export const B2_S3_OFFER_SCRIPT: ScriptLine[] = [
  { who: 'friend', text: 'Good news! The programme is offering an optional semester abroad, in Galway, Ireland.', es: '¡Buenas noticias! El programa ofrece un semestre opcional en el extranjero, en Galway, Irlanda.' },
  { who: 'friend', text: "But a year abroad needs preparation: a flat, internet, electricity… and a lot of bills.", es: 'Pero un año fuera necesita preparación: un piso, internet, luz… y muchas facturas.' },
  { who: 'narrator', text: '(Leo looks at the map of Ireland. Maya is already searching for photos of the sea.)', es: '(Leo mira el mapa de Irlanda. Maya ya está buscando fotos del mar.)' },
  { who: 'friend', text: 'First, a student from Galway wants to say hello. He is on the laptop.', es: 'Primero, un estudiante de Galway quiere saludarlos. Está en el portátil.' },
]

/** La videollamada con Ciarán: el inglés de Irlanda (escucha) */
export const B2_S3_CALL_SCRIPT: ScriptLine[] = [
  { who: 'narrator', text: '(A boy with red hair appears on the screen. Behind him, rain on a window.)', es: '(Aparece en la pantalla un chico pelirrojo. Detrás de él, lluvia en una ventana.)' },
  { who: 'friend', text: "Hiya! I'm Ciarán. How are you all? Grand, yeah?", es: '¡Hola! Soy Ciarán. ¿Cómo están? Bien, ¿no? (grand = bien)' },
  { who: 'friend', text: "You'll love Galway. The craic here is mighty: music in every pub, every night.", es: 'Les va a encantar Galway. El ambiente aquí es buenísimo: música en cada pub, cada noche. (the craic = el ambiente, la diversión)' },
  { who: 'friend', text: "But be careful with your landlord. Your man next door was giving out to me for an hour about the bills!", es: 'Pero cuidado con el casero. El tipo de al lado me estuvo regañando una hora por las facturas. (your man = ese tipo · giving out = regañando)' },
  { who: 'friend', text: 'Read every bill. Ask about every fee. Trust me.', es: 'Lean cada factura. Pregunten por cada cobro. Créanme.' },
]

/** The Fine Print, versión factura: lo que prometía la oferta (IN THE ADS) y los cobros escondidos (HIDDEN) */
export const B2_S3_BILL_CONTENT: FinePrintContent = {
  title: 'The Fine Print · The bill',
  intro: {
    en: 'This is the first bill for the flat in Galway. What did the offer promise? What charges are hidden?',
    es: 'Es la primera factura del piso de Galway. ¿Qué prometía la oferta? ¿Qué cobros están escondidos? IN THE ADS = lo prometido · HIDDEN = cobro escondido.',
  },
  paper: { heading: 'Galway Power & Net — Monthly Bill', sub: 'Account: Lumen Exchange Flat 3B' },
  stamps: ['advertised', 'hidden'],
  seal: 'GALWAY',
  clauses: [
    { en: 'Electricity rate: 20 cents per kilowatt hour.', es: 'Tarifa de luz: 20 centavos por kilovatio hora.', kind: 'advertised', tip: 'Es la tarifa (rate) de la oferta: está en la publicidad.' },
    { en: 'Internet: 30 euros per month, unlimited data.', es: 'Internet: 30 euros al mes, datos ilimitados.', kind: 'advertised', tip: 'Es el precio que prometía la oferta.' },
    { en: 'Meter reading fee: 8 euros per visit.', es: 'Cobro por leer el contador: 8 euros por visita.', kind: 'hidden', tip: 'Un cobro fijo (fee) que la oferta nunca mencionó.' },
    { en: 'Free installation for new customers.', es: 'Instalación gratis para clientes nuevos.', kind: 'advertised', tip: 'Es un beneficio de la oferta.' },
    { en: 'Paper bill fee: 3 euros per month.', es: 'Cobro por factura en papel: 3 euros al mes.', kind: 'hidden', tip: 'Otro fee escondido: cobran por enviar la factura.' },
    { en: 'Early cancellation fee: 150 euros.', es: 'Cobro por cancelar antes de tiempo: 150 euros.', kind: 'hidden', tip: 'Está en la letra pequeña del contrato, no en la oferta.' },
    { en: '10% discount if you pay by direct debit.', es: '10 % de descuento si pagas por débito automático.', kind: 'advertised', tip: 'Es la promoción de la oferta.' },
  ],
  finish: { en: 'Three hidden fees. Ciarán was right.', es: 'Tres cobros escondidos. Ciarán tenía razón.' },
}

const ASK = 'Tú escribes:'

/** Text Only con el proveedor: preguntas indirectas para elegir un plan de pago */
export const B2_S3_CHAT_CONTENT: TextOnlyContent = {
  title: 'Text Only · Galway Power & Net',
  hero: true,
  intro: { text: 'You open the chat of the provider. A plan without hidden fees… is it possible?', es: 'Abres el chat del proveedor. Un plan sin cobros escondidos… ¿será posible?' },
  chats: [
    {
      contact: 'Galway Power & Net 💬',
      steps: [
        { text: 'Hello! How can I help you today?', es: '¡Hola! ¿Cómo te puedo ayudar hoy?', choice: { ask: ASK, options: ['Could you tell me what the monthly fee is?', 'Could you tell me what is the monthly fee?', 'Could you tell me what the monthly fee it is?'], answer: 0, tip: 'Pregunta indirecta: sujeto + verbo (what the monthly fee is).' } },
        { text: 'The fixed fee is 10 euros a month, plus the rate for what you use.', es: 'El cobro fijo es de 10 euros al mes, más la tarifa por lo que uses.', choice: { ask: ASK, options: ['Do you know if is there a cheaper plan?', 'Do you know if there is a cheaper plan?', 'Do you know there is if a cheaper plan?'], answer: 1, tip: 'if + sujeto + verbo: if there is.' } },
        { text: 'Yes: the Student Plan. Lower rate, no paper bill fee.', es: 'Sí: el plan de estudiante. Tarifa más baja, sin cobro por factura en papel.', choice: { ask: ASK, options: ['I wonder how long does the contract last.', 'I wonder how long the contract lasts.', 'I wonder how long lasts the contract.'], answer: 1, tip: 'Pregunta indirecta: how long the contract lasts.' } },
        { text: 'Six months, and you can cancel for free after that.', es: 'Seis meses, y después puedes cancelar gratis.', choice: { ask: ASK, options: ["Great. I'd like to pay by direct debit, please.", "Great. I'd like pay by direct debit, please.", "Great. I like to paying by direct debit, please."], answer: 0, tip: "I'd like + to + verbo." } },
      ],
    },
  ],
  finish: { text: 'Student Plan: lower rate, no hidden fees. Ms. Haddad will be proud.', es: 'Plan de estudiante: tarifa más baja, sin cobros escondidos. Ms. Haddad va a estar orgullosa.' },
}

/** El cierre con Ms. Haddad: el grupo deja el viaje "para después de todo esto" */
export const B2_S3_CLOSE_SCRIPT: ScriptLine[] = [
  { who: 'friend', text: 'Flat ready, plan chosen, no hidden fees. You are ready for Galway!', es: 'Piso listo, plan elegido, sin cobros escondidos. ¡Están listos para Galway!' },
  { who: 'narrator', text: '(You look at Leo. Then at the clock in your pocket. It is still shaking.)', es: '(Miras a Leo. Luego al reloj de tu bolsillo. Sigue temblando.)' },
  { who: 'narrator', text: "Leo: Galway sounds grand… but maybe after all this?", es: 'Leo: Galway suena genial… ¿pero tal vez después de todo esto?' },
  { who: 'friend', text: 'Of course. The offer will still be here. Life goes on after the story, you know.', es: 'Claro. La oferta va a seguir aquí. La vida sigue después de la historia, ¿saben?' },
  { who: 'friend', text: "Take this wool cap. Ciarán sent it. He says it's for the rain… which never stops there.", es: 'Tomen esta gorra de lana. La mandó Ciarán. Dice que es para la lluvia… que allá nunca para.' },
]

const AB = 'abroad-b2' as const

export const B2_S3_ENEMIES: Record<string, EnemyDef> = {
  // Duelo amistoso: un contador de luz corrompido. No castiga al perder
  [B2_S3_METER]: {
    id: B2_S3_METER,
    name: 'The Hungry Meter',
    person: 'The Hungry Meter',
    kind: 'trainer',
    duel: {
      lost: 'The Hungry Meter: "Click, click… more fees for you!" Vuelves a empezar con la vida llena.',
      won: 'El contador vuelve a contar bien. Habla con Ms. Haddad.',
    },
    hp: 6,
    topics: [AB],
    kinds: ['fill', 'fix', 'order', 'listen'],
    tags: [B2_S3_METER],
    onlyTags: true,
    zone: 'recepcion',
    look: { shirt: '#d9d9d9', hair: '#2f6fb0', skin: '#bfc5cc' },
    before: [
      { text: 'Click, click! Can you tell me how much is the fee? The fee per kilowatt is very high!', es: '"how much is the fee" (pregunta indirecta) y "the fee per kilowatt" (ahí va rate): mal.' },
    ],
    after: [{ text: 'Click… the numbers are correct now.', es: 'Clic… los números ya están bien.' }],
    freed: { text: '(The meter counts slowly and honestly.)', es: '(El contador cuenta despacio y con honestidad.)' },
  },
}
