import type { Question } from '../game/types'

/**
 * B2-01 · Catching Up (presente). Bloque 1 (el paseo del puerto, data/b2CatchingUp.ts):
 *  - Práctica de ponerse al día con la persona especial (tarea b2-01-catchup, tema catching-up-b2): b2-01-cu1…cu8.
 *  - Práctica de present perfect simple o continuo (tarea b2-01-ppcont, tema pp-contrast-b2): b2-01-pc1…pc8.
 * Las opciones incorrectas están mal en cualquier contexto. La posición de la respuesta correcta varía a propósito.
 */
const CU = 'catching-up-b2' as const
const PC = 'pp-contrast-b2' as const
const CATCHUP = ['b2-01-catchup']
const PPCONT = ['b2-01-ppcont']

export const B2_01_CATCHUP_IDS = ['b2-01-cu1', 'b2-01-cu2', 'b2-01-cu3', 'b2-01-cu4', 'b2-01-cu5', 'b2-01-cu6', 'b2-01-cu7', 'b2-01-cu8']
export const B2_01_PPCONT_IDS = ['b2-01-pc1', 'b2-01-pc2', 'b2-01-pc3', 'b2-01-pc4', 'b2-01-pc5', 'b2-01-pc6', 'b2-01-pc7', 'b2-01-pc8']

export const B2_01_QUESTIONS: Question[] = [
  // Bloque 1 · la persona especial (ponerse al día)
  { id: 'b2-01-cu1', topic: CU, prompt: 'Hey! ___ time no see!', options: ['Much', 'Long', 'Many'], answer: 1, tip: 'La expresión fija es "Long time no see!".', tags: CATCHUP },
  { id: 'b2-01-cu2', topic: CU, prompt: 'What have you been ___ to?', options: ['up', 'on', 'at'], answer: 0, tip: '"be up to" = andar haciendo algo.', tags: CATCHUP },
  { id: 'b2-01-cu3', topic: CU, prompt: 'How ___ you been?', options: ['are', 'did', 'have'], answer: 2, tip: 'Present perfect: How have you been?', tags: CATCHUP },
  { id: 'b2-01-cu4', topic: CU, prompt: "It's been ___! I haven't seen you since March.", options: ['ages', 'age', 'aged'], answer: 0, tip: '"It\'s been ages" = hace siglos.', tags: CATCHUP },
  { id: 'b2-01-cu5', topic: CU, prompt: '"What have you been up to?" — "Not ___, you?"', options: ['many', 'much', 'lot'], answer: 1, tip: 'Respuesta corta informal: Not much, you?', tags: CATCHUP },
  { id: 'b2-01-cu6', topic: CU, kind: 'fix', prompt: 'How have you being?', options: ['How has you been?', 'How you have been?', 'How have you been?'], answer: 2, tip: 'have + participio: been.', tags: CATCHUP },
  { id: 'b2-01-cu7', topic: CU, prompt: "How's it going ___ your new job?", options: ['with', 'of', 'at'], answer: 0, tip: "How's it going with + algo.", tags: CATCHUP },
  { id: 'b2-01-cu8', topic: CU, prompt: '"How have you been?" — "___ busy. Not much time to relax."', options: ['Have be', 'Been', 'Was been'], answer: 1, tip: 'En lo informal se quita el sujeto: (I\'ve) been busy → Been busy.', tags: CATCHUP },

  // Bloque 1 · la persona especial (present perfect simple o continuo)
  { id: 'b2-01-pc1', topic: PC, prompt: "You're out of breath. Have you ___?", options: ['runned', 'been running', 'run since'], answer: 1, tip: 'Evidencia visible → continuo: Have you been running?', tags: PPCONT },
  { id: 'b2-01-pc2', topic: PC, prompt: 'Nayi ___ five dogs today.', options: ['has been walk', 'have walked', 'has walked'], answer: 2, tip: 'Un número (five dogs) → simple: has walked.', tags: PPCONT },
  { id: 'b2-01-pc3', topic: PC, prompt: 'How long ___ you been studying?', options: ['have', 'has', 'are'], answer: 0, tip: 'How long + have you been + -ing.', tags: PPCONT },
  { id: 'b2-01-pc4', topic: PC, prompt: 'How ___ exams have you finished?', options: ['much', 'long', 'many'], answer: 2, tip: 'Exams se cuentan: how many.', tags: PPCONT },
  { id: 'b2-01-pc5', topic: PC, prompt: "I've ___ her for years.", options: ['known', 'been knowing', 'knew'], answer: 0, tip: 'know es verbo de estado: siempre simple. I\'ve known her.', tags: PPCONT },
  { id: 'b2-01-pc6', topic: PC, kind: 'fix', prompt: "I've been finishing the report. Here it is.", options: ["I've finished the report. Here it is.", "I've been finish the report. Here it is.", "I've finishing the report. Here it is."], answer: 0, tip: 'Si ya está listo (Here it is), es un resultado → simple.', tags: PPCONT },
  { id: 'b2-01-pc7', topic: PC, prompt: 'Marisol ___ on the garden for weeks.', options: ['has been work', 'has been working', 'have been working'], answer: 1, tip: 'Actividad que dura (for weeks) → has been working.', tags: PPCONT },
  { id: 'b2-01-pc8', topic: PC, prompt: 'How long ___ in Lumen Bay?', options: ['you have been', 'are you been', 'have you been'], answer: 2, tip: 'Pregunta: How long have you been…?', tags: PPCONT },
]
