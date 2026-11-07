import type { Question } from '../game/types'

/**
 * B1-02 · A New City (presente, aeropuerto de Lumen Bay). Bloque A:
 *  - Práctica guiada de Leo junto a la cinta de equipaje (lista fija en data/tasks.ts): tag b1-02-practice.
 * Regla: en las preguntas de elegir solo UNA opción es gramaticalmente correcta.
 */
const PRACTICE = ['b1-02-practice']
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
]
