import type { Question } from '../game/types'

/**
 * B2-14 · Use Your Voice (presente, final de B2). Bloque 1 (el puerto al atardecer, data/b2UseYourVoice.ts):
 *  - Leo: condicionales mixtos (tarea b2-14-mixed, tema mixed-cond-b2): b2-14-mx1…mx6 (1 de escucha: las palabras de G).
 *  - Leo: wish / if only, wish + would y would rather (tarea b2-14-wish, tema wish-b2): b2-14-ws1…ws6 (1 de escucha).
 * Las opciones incorrectas están mal en cualquier contexto. La posición de la respuesta correcta varía a propósito.
 */
const MX = 'mixed-cond-b2' as const
const WS = 'wish-b2' as const
const T_MX = ['b2-14-mixed']
const T_WS = ['b2-14-wish']

const ids = (p: string) => [1, 2, 3, 4, 5, 6].map((n) => `b2-14-${p}${n}`)
export const B2_14_MIXED_IDS = ids('mx')
export const B2_14_WISH_IDS = ids('ws')

export const B2_14_QUESTIONS: Question[] = [
  // Bloque 1 · Condicionales mixtos (y repaso de los tres de B1)
  { id: 'b2-14-mx1', topic: MX, prompt: "If you hadn't been there, I ___ be disappearing now.", options: ["won't", "wouldn't", "hadn't"], answer: 1, tip: 'Pasado → presente: If + had + participio, would + verbo.', tags: T_MX },
  { id: 'b2-14-mx2', topic: MX, prompt: "If I weren't so angry, I ___ back.", options: ["wouldn't have come", "won't have come", "wouldn't came"], answer: 0, tip: 'Presente → pasado: If + pasado, would have + participio.', tags: T_MX },
  { id: 'b2-14-mx3', topic: MX, kind: 'fix', prompt: 'If I would have known, I would be here.', options: ['If I have known, I would be here.', 'If I had known, I would be here.', 'If I knew, I would have be here.'], answer: 1, tip: 'Nunca would en la parte del if: If I had known.', tags: T_MX },
  { id: 'b2-14-mx4', topic: MX, prompt: 'If she ___ the train, she would be here now.', options: ['would catch', 'has caught', 'had caught'], answer: 2, tip: 'Pasado → presente: If + had + participio (had caught).', tags: T_MX },
  {
    id: 'b2-14-mx5',
    topic: MX,
    kind: 'listen',
    audio: 'If you had helped me that night, I would still have my voice.',
    voice: 'male',
    prompt: 'What does G mean?',
    options: ['He lost his voice because nobody helped him.', 'He still has his voice.', 'Someone helped him that night.'],
    answer: 0,
    tip: '"If you had helped me…, I would still have my voice": nadie lo ayudó, y hoy no tiene voz.',
    tags: T_MX,
  },
  { id: 'b2-14-mx6', topic: MX, prompt: 'If we had left earlier, we ___ the bus.', options: ['would catch', 'would have caught', 'had caught'], answer: 1, tip: 'Tercer condicional (B1): If + had + participio, would have + participio.', tags: T_MX },

  // Bloque 1 · wish / if only, wish + would y would rather
  { id: 'b2-14-ws1', topic: WS, prompt: 'I wish I ___ you the truth.', options: ['had told', 'have told', 'would told'], answer: 0, tip: 'Arrepentimiento del pasado: wish + had + participio.', tags: T_WS },
  { id: 'b2-14-ws2', topic: WS, prompt: 'If only I ___ about the fire!', options: ['knew have', 'had known', 'would known'], answer: 1, tip: 'If only + had + participio: had known.', tags: T_WS },
  { id: 'b2-14-ws3', topic: WS, prompt: 'I wish you ___ blaming him.', options: ['will stop', 'stopping', 'would stop'], answer: 2, tip: 'Molestia por lo que hace otro: wish + would + verbo.', tags: T_WS },
  { id: 'b2-14-ws4', topic: WS, kind: 'fix', prompt: 'I would rather you to stay.', options: ['I would rather you stayed.', 'I would rather you staying.', 'I would rather you to stayed.'], answer: 0, tip: 'would rather + otra persona + pasado: you stayed.', tags: T_WS },
  {
    id: 'b2-14-ws5',
    topic: WS,
    kind: 'listen',
    audio: 'I wish I had trusted you. If only I had known.',
    voice: 'male',
    prompt: 'How does G feel?',
    options: ['He is happy with the past.', 'He regrets the past.', 'He wants to fight.'],
    answer: 1,
    tip: '"I wish I had trusted you. If only I had known": se arrepiente del pasado.',
    tags: T_WS,
  },
  { id: 'b2-14-ws6', topic: WS, prompt: "I'd rather ___ here with you.", options: ['to stay', 'stay', 'staying'], answer: 1, tip: 'Mismo sujeto: would rather + forma base (stay).', tags: T_WS },
]
