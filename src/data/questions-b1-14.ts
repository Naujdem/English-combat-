import type { Question } from '../game/types'

/**
 * B1-14 · Voices (presente, final de B1). Bloque A (la sala de la residencia, data/b1Lounge.ts):
 *  - Práctica de reported speech con Leo (tarea b1-14-reported, tema reported-speech-b1): b1-14-rs1…rs8.
 *  - Práctica de say / tell / speak con Leo (tarea b1-14-saytell, tema say-tell-b1): b1-14-st1…st8.
 * Bloque B: práctica de explain / admit / promise (tarea b1-14-verbs, tema reporting-verbs-b1): b1-14-rv1…rv6;
 *   práctica de preguntas indirectas (tarea b1-14-indirect, tema indirect-questions-b1): b1-14-iq1…iq8.
 * Bloque C (el puerto, data/b1Harbour.ts): The Grudge, fase 1 (etiqueta b1-14-boss-r): b1-14-br1…br10;
 *   fase 3, la voz del protagonista (etiqueta b1-14-boss-v, frases para decir o escribir): b1-14-bv1…bv6.
 * Las opciones incorrectas están mal en cualquier contexto (no son solo "sin cambio de tiempo").
 * La posición de la respuesta correcta varía a propósito.
 */
const RS = 'reported-speech-b1' as const
const ST = 'say-tell-b1' as const
const REPORTED = ['b1-14-reported']
const SAYTELL = ['b1-14-saytell']

export const B1_14_REPORTED_IDS = ['b1-14-rs1', 'b1-14-rs2', 'b1-14-rs3', 'b1-14-rs4', 'b1-14-rs5', 'b1-14-rs6', 'b1-14-rs7', 'b1-14-rs8']
export const B1_14_SAYTELL_IDS = ['b1-14-st1', 'b1-14-st2', 'b1-14-st3', 'b1-14-st4', 'b1-14-st5', 'b1-14-st6', 'b1-14-st7', 'b1-14-st8']

const RV = 'reporting-verbs-b1' as const
const IQ = 'indirect-questions-b1' as const
const VERBS = ['b1-14-verbs']
const INDIRECT = ['b1-14-indirect']
export const B1_14_VERBS_IDS = ['b1-14-rv1', 'b1-14-rv2', 'b1-14-rv3', 'b1-14-rv4', 'b1-14-rv5', 'b1-14-rv6']
export const B1_14_INDIRECT_IDS = ['b1-14-iq1', 'b1-14-iq2', 'b1-14-iq3', 'b1-14-iq4', 'b1-14-iq5', 'b1-14-iq6', 'b1-14-iq7', 'b1-14-iq8']

const BOSS_R = ['b1-14-boss-r']
const BOSS_V = ['b1-14-boss-v']

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

  // Bloque B · Leo (explain, admit, promise)
  { id: 'b1-14-rv1', topic: RV, prompt: 'It was true, and he felt bad about it. He ___ that he had stolen the device.', options: ['admitted', 'spoke', 'told'], answer: 0, tip: 'admit: decir que algo malo es verdad.', tags: VERBS },
  { id: 'b1-14-rv2', topic: RV, prompt: '"I will call you every day." → She ___ that she would call every day.', options: ['told', 'promised', 'spoke'], answer: 1, tip: 'promise: decir que harás algo con seguridad.', tags: VERBS },
  { id: 'b1-14-rv3', topic: RV, prompt: 'The guide ___ how the temple worked.', options: ['told', 'promised', 'explained'], answer: 2, tip: 'explain: dar los detalles o la razón.', tags: VERBS },
  { id: 'b1-14-rv4', topic: RV, kind: 'fix', prompt: 'He explained me the problem.', options: ['He explained the problem to me.', 'He explained to the problem me.', 'He explain me the problem.'], answer: 0, tip: 'explain something to someone.', tags: VERBS },
  { id: 'b1-14-rv5', topic: RV, prompt: 'He promised ___ back soon.', options: ['coming', 'to come', 'come'], answer: 1, tip: 'promise + to + verbo.', tags: VERBS },
  { id: 'b1-14-rv6', topic: RV, prompt: 'She admitted ___ she was afraid.', options: ['to', 'what', 'that'], answer: 2, tip: 'admit + that + oración.', tags: VERBS },

  // Bloque B · Leo (preguntas indirectas)
  { id: 'b1-14-iq1', topic: IQ, prompt: 'Do you know where ___?', options: ['it started', 'did it start', 'started it'], answer: 0, tip: 'Orden normal: sujeto + verbo, sin did.', tags: INDIRECT },
  { id: 'b1-14-iq2', topic: IQ, prompt: 'Can you tell me what time ___?', options: ['does the ferry leave', 'the ferry leaves', 'leaves the ferry'], answer: 1, tip: 'Sin does: the ferry leaves.', tags: INDIRECT },
  { id: 'b1-14-iq3', topic: IQ, prompt: 'Do you know ___ it is dangerous?', options: ['what', 'do', 'if'], answer: 2, tip: 'Pregunta de sí o no: if.', tags: INDIRECT },
  { id: 'b1-14-iq4', topic: IQ, prompt: 'I wonder who ___.', options: ['did this', 'this did', 'did do this'], answer: 0, tip: 'who + verbo: who did this.', tags: INDIRECT },
  { id: 'b1-14-iq5', topic: IQ, kind: 'fix', prompt: 'Do you know where is the harbour?', options: ['Do you know where does the harbour is?', 'Do you know where the harbour is?', 'Do you know the harbour where is?'], answer: 1, tip: 'Sujeto + verbo: where the harbour is.', tags: INDIRECT },
  { id: 'b1-14-iq6', topic: IQ, prompt: 'Could you tell me how many people ___ their voices?', options: ['losing', 'did they lose', 'lost'], answer: 2, tip: 'Sin did: how many people lost...', tags: INDIRECT },
  { id: 'b1-14-iq7', topic: IQ, prompt: "Do you know ___ the reporter's name is?", options: ['what', 'if', 'does'], answer: 0, tip: "what + sujeto + verbo: what the reporter's name is.", tags: INDIRECT },
  { id: 'b1-14-iq8', topic: IQ, kind: 'fix', prompt: 'Can you tell me when did it happen?', options: ['Can you tell me when it did happened?', 'Can you tell me when happened it?', 'Can you tell me when it happened?'], answer: 2, tip: 'Sin did: when it happened.', tags: INDIRECT },

  // Bloque C · The Grudge, fase 1 (reported speech, say / tell, verbos para reportar y preguntas indirectas)
  { id: 'b1-14-br1', topic: ST, kind: 'fix', prompt: 'You said me nothing that night.', options: ['You said nothing to me that night.', 'You told nothing me that night.', 'You spoke me nothing that night.'], answer: 0, tip: 'say + to + persona: said nothing to me.', tags: BOSS_R },
  { id: 'b1-14-br2', topic: ST, kind: 'fix', prompt: 'You told that you were my friend.', options: ['You told to that you were my friend.', 'You said that you were my friend.', 'You spoke that you were my friend.'], answer: 1, tip: 'Sin persona: said that...', tags: BOSS_R },
  { id: 'b1-14-br3', topic: RS, prompt: '"I am your friend." → He said that he ___ my friend.', options: ['were', 'be', 'was'], answer: 2, tip: 'am → was.', tags: BOSS_R },
  { id: 'b1-14-br4', topic: RV, prompt: '"I will help you." → He promised that he ___ help me.', options: ['would', 'will to', 'woulds'], answer: 0, tip: 'will → would.', tags: BOSS_R },
  { id: 'b1-14-br5', topic: ST, prompt: 'The witness ___ us that a dark shape had appeared.', options: ['said', 'told', 'explained'], answer: 1, tip: 'tell + persona: told us.', tags: BOSS_R },
  { id: 'b1-14-br6', topic: RS, kind: 'order', prompt: 'Él dijo que lo había perdido todo.', options: ['He', 'said', 'that', 'he', 'had', 'lost', 'everything.'], answer: 0, tip: 'said that + had + participio.', tags: BOSS_R },
  { id: 'b1-14-br7', topic: RS, prompt: '"I can\'t forgive him." → He said he ___ forgive him.', options: ["can't to", "didn't can", "couldn't"], answer: 2, tip: "can't → couldn't.", tags: BOSS_R },
  { id: 'b1-14-br8', topic: RV, kind: 'fix', prompt: 'She admitted me she was afraid.', options: ['She admitted that she was afraid.', 'She admit me that she was afraid.', 'She admitted me that afraid.'], answer: 0, tip: 'admit + that + oración (sin persona directa).', tags: BOSS_R },
  { id: 'b1-14-br9', topic: IQ, prompt: 'Do you know why ___ so angry?', options: ['is he', 'he is', 'does he be'], answer: 1, tip: 'Orden normal: why he is so angry.', tags: BOSS_R },
  { id: 'b1-14-br10', topic: IQ, kind: 'order', prompt: '¿Sabes dónde empezó?', options: ['Do', 'you', 'know', 'where', 'it', 'started?'], answer: 0, tip: 'Do you know + where + sujeto + verbo.', tags: BOSS_R },

  // Bloque C · The Grudge, fase 3: la voz del protagonista (se dicen en voz alta; sin reconocimiento de voz, se escriben)
  { id: 'b1-14-bv1', topic: ST, kind: 'order', prompt: 'Yo no lo sabía.', options: ['I', "didn't", 'know.'], answer: 0, tip: "Pasado negativo: didn't + verbo base.", tags: BOSS_V },
  { id: 'b1-14-bv2', topic: ST, kind: 'order', prompt: 'Pero no tengo miedo.', options: ['But', "I'm", 'not', 'afraid.'], answer: 0, tip: 'be afraid = tener miedo.', tags: BOSS_V },
  { id: 'b1-14-bv3', topic: IQ, kind: 'order', prompt: 'Dime qué pasó esa noche.', options: ['Tell', 'me', 'what', 'happened', 'that', 'night.'], answer: 0, tip: 'tell + persona; what happened (sin did).', tags: BOSS_V },
  { id: 'b1-14-bv4', topic: IQ, kind: 'order', prompt: 'Quiero saber quién eres.', options: ['I', 'want', 'to', 'know', 'who', 'you', 'are.'], answer: 0, tip: 'Orden normal: who you are.', tags: BOSS_V },
  { id: 'b1-14-bv5', topic: ST, kind: 'order', prompt: 'Voy a usar mi voz.', options: ['I', 'am', 'going', 'to', 'use', 'my', 'voice.'], answer: 0, tip: 'be going to + verbo base.', tags: BOSS_V },
  { id: 'b1-14-bv6', topic: IQ, kind: 'order', prompt: 'No sé por qué estás tan enojado.', options: ['I', "don't", 'know', 'why', 'you', 'are', 'so', 'angry.'], answer: 0, tip: 'Orden normal: why you are so angry.', tags: BOSS_V },
]
