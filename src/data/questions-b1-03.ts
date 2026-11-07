import type { Question } from '../game/types'

/**
 * B1-03 · Words on a Screen (recuerdo 3). Bloque A:
 *  - Práctica de la primera página del Cuaderno de L (lista fija en data/tasks.ts, tarea b1-03-notebook): tag b1-03-practice1.
 * Bloque B:
 *  - Práctica de la segunda página (tarea b1-03-notebook2, tema present-perfect-cont): tag b1-03-practice2.
 * Regla: en las preguntas de elegir solo UNA opción es correcta.
 */
const PRACTICE1 = ['b1-03-practice1']
const IM = 'informal-messages' as const
const PRACTICE2 = ['b1-03-practice2']
const PPC = 'present-perfect-cont' as const

/** Práctica de la página 1 del cuaderno, en orden */
export const B1_03_PRACTICE1_IDS = ['b1-03-p1', 'b1-03-p2', 'b1-03-p3', 'b1-03-p4', 'b1-03-p5', 'b1-03-p6']

/** Práctica de la página 2 del cuaderno, en orden */
export const B1_03_PRACTICE2_IDS = ['b1-03-pp1', 'b1-03-pp2', 'b1-03-pp3', 'b1-03-pp4', 'b1-03-pp5', 'b1-03-pp6', 'b1-03-pp7']

export const B1_03_QUESTIONS: Question[] = [
  // ── Cuaderno · página 1 ──
  { id: 'b1-03-p1', topic: IM, prompt: "Friend: 'Dinner at eight?' You: '___ See you there.'", options: ['Sounds good.', 'Sounds goods.', 'Soundly good.'], answer: 0, tip: 'Sounds good = me parece bien (sin sujeto).', tags: PRACTICE1 },
  { id: 'b1-03-p2', topic: IM, prompt: 'Please ___ me when you arrive at the airport.', options: ['ping', 'pinging', 'to ping'], answer: 0, tip: 'Orden: el verbo base al principio: ping me.', tags: PRACTICE1 },
  { id: 'b1-03-p3', topic: IM, prompt: "I'll ___ you later. My battery is low.", options: ['text', 'texts', 'texting'], answer: 0, tip: "will + verbo base: I'll text you.", tags: PRACTICE1 },
  { id: 'b1-03-p4', topic: IM, kind: 'order', prompt: 'Mándame un mensaje cuando llegues.', options: ['Drop', 'me', 'a', 'line', 'when', 'you', 'arrive.'], answer: 0, tip: 'Drop me a line = mándame un mensaje.', tags: PRACTICE1 },
  { id: 'b1-03-p5', topic: IM, prompt: "Boss: 'Please send the report by Friday.' You write: '___'", options: ['Understood. I will send it by Friday.', 'Got it lol.', 'Ok bye.'], answer: 0, tip: 'Con un jefe: respuesta completa y cortés.', tags: PRACTICE1 },
  { id: 'b1-03-p6', topic: IM, prompt: "Friend: 'Can you come at six?' You: 'Got it. ___ then!'", options: ['See you', 'Seeing you', 'Saw you'], answer: 0, tip: 'Despedida rápida: See you then!', tags: PRACTICE1 },
  // ── Cuaderno · página 2 ──
  { id: 'b1-03-pp1', topic: PPC, prompt: "I ___ for you since six o'clock.", options: ['have been waiting', 'have waiting', 'am wait'], answer: 0, tip: 'Empezó a las seis y sigue: have been waiting.', tags: PRACTICE2 },
  { id: 'b1-03-pp2', topic: PPC, prompt: 'She has been writing messages ___ two hours.', options: ['for', 'since', 'from'], answer: 0, tip: 'Un período de tiempo: for.', tags: PRACTICE2 },
  { id: 'b1-03-pp3', topic: PPC, prompt: 'They have been practicing ___ March.', options: ['since', 'for', 'during'], answer: 0, tip: 'Un punto de inicio: since.', tags: PRACTICE2 },
  { id: 'b1-03-pp4', topic: PPC, prompt: '___ long have you been learning English?', options: ['How', 'What', 'When'], answer: 0, tip: 'Duración: How long...?', tags: PRACTICE2 },
  { id: 'b1-03-pp5', topic: PPC, kind: 'fix', prompt: 'I am waiting since Monday.', options: ['I have been waiting since Monday.', 'I am been waiting since Monday.', 'I have been wait since Monday.'], answer: 0, tip: 'Con since: have been + -ing.', tags: PRACTICE2 },
  { id: 'b1-03-pp6', topic: PPC, kind: 'order', prompt: 'Llevo escribiendo en este cuaderno tres semanas.', options: ["I've", 'been', 'writing', 'in', 'this', 'notebook', 'for', 'three', 'weeks.'], answer: 0, tip: 'have been + -ing + for + período.', tags: PRACTICE2 },
  { id: 'b1-03-pp7', topic: PPC, prompt: 'We ___ her for years. She is a good friend.', options: ['have known', 'have been knowing', 'know'], answer: 0, tip: 'know no usa -ing: have known.', tags: PRACTICE2 },
]
