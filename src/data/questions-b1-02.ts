import type { Question } from '../game/types'

/**
 * B1-02 · A New City (presente, aeropuerto de Lumen Bay). Bloque A:
 *  - Práctica guiada de Leo junto a la cinta de equipaje (lista fija en data/tasks.ts): tag b1-02-practice.
 * Bloque B (data/b1Airport.ts): esbirros con onlyTags: tags b1-02-trav1, b1-02-trav2 y b1-02-jack.
 * Regla: en las preguntas de elegir solo UNA opción es gramaticalmente correcta.
 */
const PRACTICE = ['b1-02-practice']
const TRAV1 = ['b1-02-trav1']
const TRAV2 = ['b1-02-trav2']
const JACK = ['b1-02-jack']
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
  { id: 'b1-02-j-6', topic: PP, kind: 'order', prompt: 'Ya he comprado mi tarjeta SIM.', options: ["I've", 'already', 'bought', 'my', 'SIM', 'card.'], answer: 0, tip: 'have + already + participio.', tags: JACK },
]
