import type { Question } from '../game/types'

/**
 * B1-14 · Voices (presente, final de B1). Bloque A (la sala de la residencia, data/b1Lounge.ts):
 *  - Práctica de reported speech con Leo (tarea b1-14-reported, tema reported-speech-b1): b1-14-rs1…rs8.
 *  - Práctica de say / tell / speak con Leo (tarea b1-14-saytell, tema say-tell-b1): b1-14-st1…st8.
 * Las opciones incorrectas están mal en cualquier contexto (no son solo "sin cambio de tiempo").
 * La posición de la respuesta correcta varía a propósito.
 */
const RS = 'reported-speech-b1' as const
const ST = 'say-tell-b1' as const
const REPORTED = ['b1-14-reported']
const SAYTELL = ['b1-14-saytell']

export const B1_14_REPORTED_IDS = ['b1-14-rs1', 'b1-14-rs2', 'b1-14-rs3', 'b1-14-rs4', 'b1-14-rs5', 'b1-14-rs6', 'b1-14-rs7', 'b1-14-rs8']
export const B1_14_SAYTELL_IDS = ['b1-14-st1', 'b1-14-st2', 'b1-14-st3', 'b1-14-st4', 'b1-14-st5', 'b1-14-st6', 'b1-14-st7', 'b1-14-st8']

export const B1_14_QUESTIONS: Question[] = [
  // Bloque A · Leo (reported speech: el cambio de tiempos)
  { id: 'b1-14-rs1', topic: RS, prompt: '"I lost everything." → He said that he ___ everything.', options: ['had lost', 'has lose', 'had lose'], answer: 0, tip: 'Pasado simple → past perfect: had + participio (lost).', tags: REPORTED },
  { id: 'b1-14-rs2', topic: RS, prompt: '"I can\'t speak." → He said he ___ speak.', options: ["can't to", "couldn't", "didn't could"], answer: 1, tip: "can't → couldn't.", tags: REPORTED },
  { id: 'b1-14-rs3', topic: RS, prompt: '"I am tired." → She said that she ___ tired.', options: ['were', 'be', 'was'], answer: 2, tip: 'am → was.', tags: REPORTED },
  { id: 'b1-14-rs4', topic: RS, prompt: '"I will take the clock." → He said he ___ take the clock.', options: ['would', 'will to', 'woulds'], answer: 0, tip: 'will → would.', tags: REPORTED },
  { id: 'b1-14-rs5', topic: RS, prompt: '"We are waiting." → They said they ___ waiting.', options: ['was', 'were', 'been'], answer: 1, tip: 'are waiting → were waiting.', tags: REPORTED },
  { id: 'b1-14-rs6', topic: RS, kind: 'fix', prompt: 'He said that he has lose his voice.', options: ['He said that he had lose his voice.', 'He said that he losted his voice.', 'He said that he had lost his voice.'], answer: 2, tip: 'had + participio: had lost.', tags: REPORTED },
  { id: 'b1-14-rs7', topic: RS, prompt: '"I don\'t know him." → She said she ___ know him.', options: ["didn't", "wasn't", 'not'], answer: 0, tip: "don't → didn't.", tags: REPORTED },
  { id: 'b1-14-rs8', topic: RS, prompt: '"My throat hurts," Leo said. → Leo said that ___ throat hurt.', options: ['he', 'his', 'him'], answer: 1, tip: 'Los pronombres también cambian: my → his.', tags: REPORTED },

  // Bloque A · Leo (say, tell y speak)
  { id: 'b1-14-st1', topic: ST, prompt: 'He ___ me that he was sorry.', options: ['said', 'spoke', 'told'], answer: 2, tip: 'tell + persona: told me.', tags: SAYTELL },
  { id: 'b1-14-st2', topic: ST, prompt: 'She ___ that she was tired.', options: ['said', 'told', 'spoke'], answer: 0, tip: 'say sin persona: said that...', tags: SAYTELL },
  { id: 'b1-14-st3', topic: ST, prompt: 'Can you ___ English?', options: ['say', 'speak', 'tell'], answer: 1, tip: 'speak + un idioma.', tags: SAYTELL },
  { id: 'b1-14-st4', topic: ST, prompt: 'He ___ to me about the fire.', options: ['spoke', 'told', 'said'], answer: 0, tip: 'speak to someone about something.', tags: SAYTELL },
  { id: 'b1-14-st5', topic: ST, prompt: '___ me the truth, please.', options: ['Say', 'Speak', 'Tell'], answer: 2, tip: 'tell the truth; tell + persona.', tags: SAYTELL },
  { id: 'b1-14-st6', topic: ST, kind: 'fix', prompt: 'He said me that he had lost everything.', options: ['He told to me that he had lost everything.', 'He told me that he had lost everything.', 'He spoke me that he had lost everything.'], answer: 1, tip: 'say no lleva persona directa: told me.', tags: SAYTELL },
  { id: 'b1-14-st7', topic: ST, prompt: 'What did he ___ to you?', options: ['say', 'tell', 'told'], answer: 0, tip: 'say + to + persona.', tags: SAYTELL },
  { id: 'b1-14-st8', topic: ST, prompt: 'She ___ us a story about the temple.', options: ['said', 'told', 'spoke'], answer: 1, tip: 'tell a story; tell + persona.', tags: SAYTELL },
]
