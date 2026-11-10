import type { Question } from '../game/types'

/**
 * B1-10 · Festival Night (presente). Bloque A (la entrada del festival de Lumen Bay, data/b1Festival.ts):
 *  - Práctica del segundo condicional con la persona especial (tarea b1-10-conditional, tema conditional-2): b1-10-c1…c8.
 *  - Práctica de verbo + -ing / to en la fila de la entrada (tarea b1-10-queue, tema verb-patterns): b1-10-v1…v8.
 * La posición de la respuesta correcta varía a propósito.
 */
const C2 = 'conditional-2' as const
const COND = ['b1-10-conditional']
const VP = 'verb-patterns' as const
const QUEUE = ['b1-10-queue']

/** Práctica del segundo condicional, en orden */
export const B1_10_COND_IDS = ['b1-10-c1', 'b1-10-c2', 'b1-10-c3', 'b1-10-c4', 'b1-10-c5', 'b1-10-c6', 'b1-10-c7', 'b1-10-c8']
/** Práctica de verbo + -ing / to, en orden */
export const B1_10_QUEUE_IDS = ['b1-10-v1', 'b1-10-v2', 'b1-10-v3', 'b1-10-v4', 'b1-10-v5', 'b1-10-v6', 'b1-10-v7', 'b1-10-v8']

export const B1_10_QUESTIONS: Question[] = [
  // Bloque A · la persona especial (segundo condicional)
  { id: 'b1-10-c1', topic: C2, kind: 'fix', prompt: 'If I would have money, I would buy a ticket.', options: ['If I would had money, I would buy a ticket.', 'If I have money, I would buy a ticket.', 'If I had money, I would buy a ticket.'], answer: 2, tip: 'If + pasado simple, would + verbo base.', tags: COND },
  { id: 'b1-10-c2', topic: C2, kind: 'fix', prompt: 'If she would be famous, she would sing here.', options: ['If she were famous, she would sing here.', 'If she would were famous, she would sing here.', 'If she be famous, she would sing here.'], answer: 0, tip: 'If + were (no would).', tags: COND },
  { id: 'b1-10-c3', topic: C2, prompt: 'If I ___ a ticket, I would see every show.', options: ['have', 'had', 'would have'], answer: 1, tip: 'If + pasado simple.', tags: COND },
  { id: 'b1-10-c4', topic: C2, prompt: 'What would you do if you ___ the first prize?', options: ['win', 'would win', 'won'], answer: 2, tip: 'If + pasado simple (won).', tags: COND },
  { id: 'b1-10-c5', topic: C2, prompt: 'I ___ go to every concert if I had more money.', options: ['would', 'will', 'am'], answer: 0, tip: 'Resultado imaginario: would + verbo base.', tags: COND },
  { id: 'b1-10-c6', topic: C2, kind: 'order', prompt: 'Si yo fuera tú, iría al concierto.', options: ['If', 'I', 'were', 'you,', 'I', 'would', 'go', 'to', 'the', 'concert.'], answer: 0, tip: 'If I were you, I would…', tags: COND },
  { id: 'b1-10-c7', topic: C2, prompt: 'If I ___ free tonight, I would go with you.', options: ['am', 'would be', 'were'], answer: 2, tip: 'If + were.', tags: COND },
  {
    id: 'b1-10-c8',
    topic: C2,
    kind: 'listen',
    audio: 'If I had a lot of money, I would buy tickets for the whole festival. I would invite all my friends, and we would dance every night.',
    voice: 'female',
    prompt: '¿Qué haría con mucho dinero?',
    options: ['Viajar a otro país.', 'Comprar boletas para todo el festival.', 'Comprar una casa.'],
    answer: 1,
    tip: 'I would buy tickets for the whole festival.',
    tags: COND,
  },
  // Bloque A · la fila de la entrada (verbo + -ing / to)
  { id: 'b1-10-v1', topic: VP, kind: 'fix', prompt: 'I enjoy to dance at festivals.', options: ['I enjoy dance at festivals.', 'I enjoy dancing at festivals.', 'I enjoy to dancing at festivals.'], answer: 1, tip: 'enjoy + -ing.', tags: QUEUE },
  { id: 'b1-10-v2', topic: VP, kind: 'fix', prompt: 'We decided staying until the end.', options: ['We decided stay until the end.', 'We decided stayed until the end.', 'We decided to stay until the end.'], answer: 2, tip: 'decide + to + verbo base.', tags: QUEUE },
  { id: 'b1-10-v3', topic: VP, prompt: 'She finished ___ and left the stage.', options: ['singing', 'to sing', 'sing'], answer: 0, tip: 'finish + -ing.', tags: QUEUE },
  { id: 'b1-10-v4', topic: VP, prompt: 'I hope ___ the headliner tonight.', options: ['seeing', 'see', 'to see'], answer: 2, tip: 'hope + to + verbo base.', tags: QUEUE },
  { id: 'b1-10-v5', topic: VP, prompt: "They avoid ___ in the front row. It's too loud.", options: ['to stand', 'standing', 'stand'], answer: 1, tip: 'avoid + -ing.', tags: QUEUE },
  { id: 'b1-10-v6', topic: VP, kind: 'order', prompt: 'Queremos ver a la banda.', options: ['We', 'want', 'to', 'see', 'the', 'band.'], answer: 0, tip: 'want + to + verbo base.', tags: QUEUE },
  { id: 'b1-10-v7', topic: VP, prompt: 'He stopped ___ water because he was thirsty.', options: ['to buy', 'buying', 'buy'], answer: 0, tip: 'stop + to = paró para hacer algo.', tags: QUEUE },
  {
    id: 'b1-10-v8',
    topic: VP,
    kind: 'listen',
    audio: 'We decided to arrive early. I enjoy waiting in the queue because I meet new people. I hope to find a good place near the stage.',
    voice: 'male',
    prompt: '¿Por qué disfruta la fila?',
    options: ['Porque hay música.', 'Porque come algo.', 'Porque conoce gente.'],
    answer: 2,
    tip: 'I enjoy waiting because I meet new people.',
    tags: QUEUE,
  },
]
