import type { Question } from '../game/types'

/**
 * B1-03 · Words on a Screen (recuerdo 3). Bloque A:
 *  - Práctica de la primera página del Cuaderno de L (lista fija en data/tasks.ts, tarea b1-03-notebook): tag b1-03-practice1.
 * Regla: en las preguntas de elegir solo UNA opción es correcta.
 */
const PRACTICE1 = ['b1-03-practice1']
const IM = 'informal-messages' as const

/** Práctica de la página 1 del cuaderno, en orden */
export const B1_03_PRACTICE1_IDS = ['b1-03-p1', 'b1-03-p2', 'b1-03-p3', 'b1-03-p4', 'b1-03-p5', 'b1-03-p6']

export const B1_03_QUESTIONS: Question[] = [
  // ── Cuaderno · página 1 ──
  { id: 'b1-03-p1', topic: IM, prompt: "Friend: 'Dinner at eight?' You: '___ See you there.'", options: ['Sounds good.', 'Sounds goods.', 'Soundly good.'], answer: 0, tip: 'Sounds good = me parece bien (sin sujeto).', tags: PRACTICE1 },
  { id: 'b1-03-p2', topic: IM, prompt: 'Please ___ me when you arrive at the airport.', options: ['ping', 'pinging', 'to ping'], answer: 0, tip: 'Orden: el verbo base al principio: ping me.', tags: PRACTICE1 },
  { id: 'b1-03-p3', topic: IM, prompt: "I'll ___ you later. My battery is low.", options: ['text', 'texts', 'texting'], answer: 0, tip: "will + verbo base: I'll text you.", tags: PRACTICE1 },
  { id: 'b1-03-p4', topic: IM, kind: 'order', prompt: 'Mándame un mensaje cuando llegues.', options: ['Drop', 'me', 'a', 'line', 'when', 'you', 'arrive.'], answer: 0, tip: 'Drop me a line = mándame un mensaje.', tags: PRACTICE1 },
  { id: 'b1-03-p5', topic: IM, prompt: "Boss: 'Please send the report by Friday.' You write: '___'", options: ['Understood. I will send it by Friday.', 'Got it lol.', 'Ok bye.'], answer: 0, tip: 'Con un jefe: respuesta completa y cortés.', tags: PRACTICE1 },
  { id: 'b1-03-p6', topic: IM, prompt: "Friend: 'Can you come at six?' You: 'Got it. ___ then!'", options: ['See you', 'Seeing you', 'Saw you'], answer: 0, tip: 'Despedida rápida: See you then!', tags: PRACTICE1 },
]
