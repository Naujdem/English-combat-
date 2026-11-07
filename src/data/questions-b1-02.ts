import type { Question } from '../game/types'

/**
 * B1-02 · A New City (presente, aeropuerto de Lumen Bay). Bloque A:
 *  - Práctica guiada de Leo junto a la cinta de equipaje (lista fija en data/tasks.ts): tag b1-02-practice.
 * Bloque B (data/b1Airport.ts): esbirros con onlyTags: tags b1-02-trav1, b1-02-trav2 y b1-02-jack.
 * Bloque C (data/b1Office.ts): práctica de la tienda (b1-02-shop, tema travel-phones; s8 se dice en voz alta: S-b1-02-s8,
 *   o se escribe sin micrófono: T-b1-02-s8) y práctica de Leo en la oficina (b1-02-practice-fut, tema futures-b1).
 * Regla: en las preguntas de elegir solo UNA opción es gramaticalmente correcta.
 */
const PRACTICE = ['b1-02-practice']
const TRAV1 = ['b1-02-trav1']
const TRAV2 = ['b1-02-trav2']
const JACK = ['b1-02-jack']
const SHOP = ['b1-02-shop']
const FUT = ['b1-02-practice-fut']
const TP = 'travel-phones' as const
const FB = 'futures-b1' as const
/** Bloque C: lo que explica el empleado de la tienda (s1-s3 usan el mismo audio) */
const PLANS_AUDIO =
  'We have two plans. The Blue Plan is prepaid. It costs twenty dollars a month, it has ten gigabytes of data, and you can top up online. There is no contract. The Gold Plan has a one-year contract. It costs thirty dollars a month, it includes unlimited data, and the coverage works in six countries.'

const PP = 'pp-yet-already' as const

/** Práctica guiada de Leo, en orden */
export const B1_02_PRACTICE_IDS = ['b1-02-p1', 'b1-02-p2', 'b1-02-p3', 'b1-02-p4', 'b1-02-p5', 'b1-02-p6', 'b1-02-p7', 'b1-02-p8']

export const B1_02_QUESTIONS: Question[] = [
  // ── Práctica guiada de Leo (aeropuerto) ──
  { id: 'b1-02-p1', topic: PP, prompt: 'Have you found your suitcase ___?', options: ['yet', 'yesterday', 'ago'], answer: 0, tip: "Pregunta: 'ya' al final: yet.", tags: PRACTICE },
  { id: 'b1-02-p2', topic: PP, prompt: "I've ___ checked in. Look, here is my boarding pass.", options: ['already', 'yet', 'ago'], answer: 0, tip: "Afirmativa, 'ya': already, entre have y el participio.", tags: PRACTICE },
  { id: 'b1-02-p3', topic: PP, prompt: 'The plane has ___ landed. We can still hear the engines.', options: ['just', 'yet', 'yesterday'], answer: 0, tip: 'Hace muy poco: just.', tags: PRACTICE },
  { id: 'b1-02-p4', topic: PP, kind: 'fix', prompt: 'Have you find your bag yet?', options: ['Have you found your bag yet?', 'Did you found your bag yet?', 'Have you finding your bag yet?'], answer: 0, tip: 'have + participio de find: found.', tags: PRACTICE },
  { id: 'b1-02-p5', topic: PP, prompt: "I haven't called my mother ___. My phone has no signal.", options: ['yet', 'already', 'just'], answer: 0, tip: "Negativa, 'todavía no': yet.", tags: PRACTICE },
  { id: 'b1-02-p6', topic: PP, kind: 'order', prompt: 'Todavía no he recibido mi maleta.', options: ['I', "haven't", 'received', 'my', 'suitcase', 'yet.'], answer: 0, tip: "haven't + participio + yet al final.", tags: PRACTICE },
  { id: 'b1-02-p7', topic: PP, prompt: 'I ___ my passport at the hotel yesterday.', options: ['left', 'have left', 'has left'], answer: 0, tip: "'yesterday' = momento terminado: past simple.", tags: PRACTICE },
  { id: 'b1-02-p8', topic: PP, prompt: 'She ___ already bought a SIM card.', options: ['has', 'have', 'is'], answer: 0, tip: 'She va con has: has already bought.', tags: PRACTICE },

  // ── Viajero 1 (esbirro, junto a la cinta) ──
  { id: 'b1-02-t1-1', topic: PP, kind: 'fix', prompt: "I haven't find my suitcase yet.", options: ["I haven't found my suitcase yet.", "I didn't found my suitcase yet.", "I hasn't found my suitcase yet."], answer: 0, tip: "haven't + participio: found.", tags: TRAV1 },
  { id: 'b1-02-t1-2', topic: PP, prompt: 'Have you seen a blue suitcase ___?', options: ['yet', 'yesterday', 'last night'], answer: 0, tip: "Pregunta con present perfect: 'ya' al final (yet). Con yesterday o last night va past simple.", tags: TRAV1 },
  { id: 'b1-02-t1-3', topic: PP, prompt: 'I ___ a blue suitcase. Has anyone seen it?', options: ['have lost', 'has lost', 'losed'], answer: 0, tip: 'Con I: have + participio (lost).', tags: TRAV1 },
  { id: 'b1-02-t1-4', topic: PP, prompt: 'Has anyone ___ my blue suitcase?', options: ['seen', 'saw', 'see'], answer: 0, tip: 'has + participio: seen.', tags: TRAV1 },
  { id: 'b1-02-t1-5', topic: PP, kind: 'order', prompt: '¿Ya encontraste tu maleta?', options: ['Have', 'you', 'found', 'your', 'suitcase', 'yet?'], answer: 0, tip: 'Have + sujeto + participio + yet al final.', tags: TRAV1 },
  {
    id: 'b1-02-t1-6',
    topic: PP,
    kind: 'listen',
    audio: "Excuse me, has anyone seen a blue suitcase? I haven't found it yet. It has a red tag.",
    voice: 'male',
    prompt: '¿Qué busca la persona?',
    options: ['Una maleta azul con una etiqueta roja.', 'Un pasaporte rojo.', 'Una mochila azul.'],
    answer: 0,
    tip: 'a blue suitcase with a red tag.',
    tags: TRAV1,
  },

  // ── Viajera 2 (esbirro, junto al check-in) ──
  { id: 'b1-02-t2-1', topic: PP, kind: 'fix', prompt: "I already haven't checked in.", options: ["I haven't checked in yet.", "I haven't check in yet.", "I hasn't checked in yet."], answer: 0, tip: 'Negativa: haven\'t + participio + yet al final.', tags: TRAV2 },
  { id: 'b1-02-t2-2', topic: PP, prompt: 'The plane has ___ left. I can see it in the sky!', options: ['just', 'yet', 'ago'], answer: 0, tip: 'Hace muy poco: has just left.', tags: TRAV2 },
  { id: 'b1-02-t2-3', topic: PP, kind: 'fix', prompt: 'The plane has just left yesterday.', options: ['The plane left yesterday.', 'The plane has left yesterday.', 'The plane just left yesterdays.'], answer: 0, tip: "Con 'yesterday' (momento terminado): past simple, sin has.", tags: TRAV2 },
  { id: 'b1-02-t2-4', topic: PP, prompt: 'We ___ already bought our tickets.', options: ['have', 'has', 'are'], answer: 0, tip: 'We va con have: have already bought.', tags: TRAV2 },
  { id: 'b1-02-t2-5', topic: PP, kind: 'order', prompt: 'Mi amigo acaba de llamarme.', options: ['My', 'friend', 'has', 'just', 'called', 'me.'], answer: 0, tip: 'has just + participio.', tags: TRAV2 },
  {
    id: 'b1-02-t2-6',
    topic: PP,
    kind: 'listen',
    audio: "I've already checked in, but I haven't found my gate yet. Where is gate twelve?",
    voice: 'female',
    prompt: '¿Qué no ha encontrado todavía?',
    options: ['Su puerta de embarque.', 'Su pasaporte.', 'Su equipaje.'],
    answer: 0,
    tip: 'gate = puerta de embarque.',
    tags: TRAV2,
  },

  // ── Jack the Rival (esbirro invitado, junto a las puertas de la derecha) ──
  { id: 'b1-02-j-1', topic: PP, kind: 'fix', prompt: 'I have arrived yesterday.', options: ['I arrived yesterday.', 'I have arrive yesterday.', 'I arrives yesterday.'], answer: 0, tip: "'yesterday' es momento terminado: past simple.", tags: JACK },
  { id: 'b1-02-j-2', topic: PP, kind: 'fix', prompt: 'I have already see the whole city.', options: ['I have already seen the whole city.', 'I have already saw the whole city.', 'I am already seen the whole city.'], answer: 0, tip: 'have + already + participio: seen.', tags: JACK },
  { id: 'b1-02-j-3', topic: PP, prompt: '___ you seen the harbour yet?', options: ['Have', 'Did', 'Are'], answer: 0, tip: 'Present perfect: Have + sujeto + participio.', tags: JACK },
  { id: 'b1-02-j-4', topic: PP, prompt: 'I ___ the harbour yet. Do you want to go together?', options: ["haven't seen", "didn't saw", "hasn't seen"], answer: 0, tip: "Con I: haven't + participio.", tags: JACK },
  { id: 'b1-02-j-5', topic: PP, prompt: 'We ___ to the harbour last Sunday.', options: ['went', 'have gone', 'have went'], answer: 0, tip: "'last Sunday' es momento terminado: past simple.", tags: JACK },
  // ── Tienda de celulares (bloque C) ──
  { id: 'b1-02-s1', topic: TP, kind: 'listen', audio: PLANS_AUDIO, voice: 'male', prompt: '¿Qué plan no tiene contrato?', options: ['El plan Blue.', 'El plan Gold.', 'Los dos planes.'], answer: 0, tip: 'The Blue Plan is prepaid: no hay contrato.', tags: SHOP },
  { id: 'b1-02-s2', topic: TP, kind: 'listen', audio: PLANS_AUDIO, voice: 'male', prompt: '¿En cuántos países funciona la cobertura del plan Gold?', options: ['En seis.', 'En diez.', 'En uno.'], answer: 0, tip: 'the coverage works in six countries.', tags: SHOP },
  { id: 'b1-02-s3', topic: TP, kind: 'listen', audio: PLANS_AUDIO, voice: 'male', prompt: '¿Cuánto cuesta el plan Gold al mes?', options: ['Treinta dólares.', 'Veinte dólares.', 'Diez dólares.'], answer: 0, tip: 'It costs thirty dollars a month.', tags: SHOP },
  { id: 'b1-02-s4', topic: TP, prompt: "You are staying in Lumen Bay for three months and you don't want a contract. You say: ___", options: ["I'd like the Blue Plan, please.", "I'd like the Gold Plan, please.", "I'd like both contracts, please."], answer: 0, tip: 'Solo tres meses y sin contrato: prepago, el plan Blue.', tags: SHOP },
  { id: 'b1-02-s5', topic: TP, prompt: 'You want coverage in several countries and you can sign a contract. You say: ___', options: ["I'd like the Gold Plan, please.", "I'd like the Blue Plan, please.", "I'd like no plan, please."], answer: 0, tip: 'Cobertura en varios países y contrato de un año: el plan Gold.', tags: SHOP },
  { id: 'b1-02-s6', topic: TP, kind: 'order', prompt: 'Quisiera recargar mi plan, por favor.', options: ["I'd", 'like', 'to', 'top', 'up', 'my', 'plan,', 'please.'], answer: 0, tip: "I'd like to + verbo. top up = recargar.", tags: SHOP },
  { id: 'b1-02-s7', topic: TP, prompt: 'Excuse me, how much ___ the Blue Plan cost?', options: ['does', 'do', 'is'], answer: 0, tip: "Con 'the Blue Plan' (it): does + verbo base.", tags: SHOP },
  // s8: se usa como S-b1-02-s8 (decirlo en voz alta) o, sin micrófono, T-b1-02-s8 (escribirlo), como la ronda 5 de Call for Help
  { id: 'b1-02-s8', topic: TP, kind: 'order', prompt: 'Ahora pídelo con tus palabras: «Hola, quisiera el plan Blue, por favor.»', options: ['Hello,', "I'd", 'like', 'the', 'Blue', 'Plan,', 'please.'], answer: 0, tip: "I'd like + el plan, please.", tags: SHOP },

  // ── Práctica de Leo en la oficina (bloque C) ──
  { id: 'b1-02-f1', topic: FB, prompt: "We ___ visit the old port on Saturday. We've planned it.", options: ['are going to', 'will to', 'going'], answer: 0, tip: 'Plan decidido: are going to + verbo base.', tags: FUT },
  { id: 'b1-02-f2', topic: FB, prompt: 'I ___ my cousin at the station at six. We arranged it yesterday.', options: ['am meeting', 'will meeting', 'meet to'], answer: 0, tip: 'Cita fija: presente continuo.', tags: FUT },
  { id: 'b1-02-f3', topic: FB, prompt: "It's cold in here. I ___ the window.", options: ['will close', 'am going closing', 'close to'], answer: 0, tip: 'Decisión en el momento: will + verbo base.', tags: FUT },
  { id: 'b1-02-f4', topic: FB, kind: 'fix', prompt: "I'm going to meets Ms. Haddad tomorrow.", options: ["I'm going to meet Ms. Haddad tomorrow.", "I'm going meet Ms. Haddad tomorrow.", 'I going to meet Ms. Haddad tomorrow.'], answer: 0, tip: 'going to + verbo base (sin -s).', tags: FUT },
  { id: 'b1-02-f5', topic: FB, kind: 'fix', prompt: 'We will to take the bus.', options: ['We will take the bus.', 'We will taking the bus.', 'We wills take the bus.'], answer: 0, tip: 'will + verbo base, sin to.', tags: FUT },
  { id: 'b1-02-f6', topic: FB, kind: 'order', prompt: 'Esta noche nos encontramos con Leo.', options: ["We're", 'meeting', 'Leo', 'tonight.'], answer: 0, tip: "Cita fija: presente continuo (We're meeting).", tags: FUT },
  { id: 'b1-02-f7', topic: FB, prompt: 'Look at the sky! It ___ rain.', options: ['is going to', 'will to', 'going to'], answer: 0, tip: 'Con evidencia visible: is going to + verbo base.', tags: FUT },
  {
    id: 'b1-02-f8',
    topic: FB,
    kind: 'listen',
    audio: "Tomorrow we're visiting the old port at ten. After that, we're going to have lunch, and in the afternoon I'll show you the university.",
    voice: 'female',
    prompt: '¿A qué hora visitan el puerto?',
    options: ['A las diez.', 'A las doce.', 'Por la tarde.'],
    answer: 0,
    tip: "we're visiting the old port at ten.",
    tags: FUT,
  },

  { id: 'b1-02-j-6', topic: PP, kind: 'order', prompt: 'Ya he comprado mi tarjeta SIM.', options: ["I've", 'already', 'bought', 'my', 'SIM', 'card.'], answer: 0, tip: 'have + already + participio.', tags: JACK },
]
