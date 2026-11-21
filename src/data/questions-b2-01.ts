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

const RE = 'reactions-b2' as const
const REACTIONS = ['b2-01-reactions']
export const B2_01_REACTIONS_IDS = ['b2-01-re1', 'b2-01-re2', 'b2-01-re3', 'b2-01-re4', 'b2-01-re5', 'b2-01-re6', 'b2-01-re7', 'b2-01-re8']
const SILENCE = ['b2-01-silence']
const BOSS_PP = ['b2-01-boss-pp']
const BOSS_RE = ['b2-01-boss-re']

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

  // Bloque 2 · la persona especial (reacciones y respuestas cortas)
  { id: 'b2-01-re1', topic: RE, prompt: '"I passed my driving test!" — "No ___! Congratulations!"', options: ['road', 'way', 'path'], answer: 1, tip: 'Sorpresa: No way!', tags: REACTIONS },
  { id: 'b2-01-re2', topic: RE, prompt: '"I love this café." — "So ___ I."', options: ['do', 'am', 'have'], answer: 0, tip: 'love (presente simple) → So do I.', tags: REACTIONS },
  { id: 'b2-01-re3', topic: RE, prompt: '"I haven\'t been to the museum." — "Neither ___ I."', options: ['do', 'am', 'have'], answer: 2, tip: "haven't been → Neither have I.", tags: REACTIONS },
  { id: 'b2-01-re4', topic: RE, prompt: '"Is it going to rain?" — "I hope ___."', options: ['not', 'no', "don't"], answer: 0, tip: 'Respuesta corta negativa: I hope not.', tags: REACTIONS },
  { id: 'b2-01-re5', topic: RE, prompt: '"Is Leo coming?" — "I think ___."', options: ['it', 'yes', 'so'], answer: 2, tip: 'Respuesta corta positiva: I think so.', tags: REACTIONS },
  { id: 'b2-01-re6', topic: RE, prompt: '"I got the internship!" — "You must be ___!"', options: ['thrilled', 'thrilling', 'thrill'], answer: 0, tip: 'Cómo se siente una persona: -ed (thrilled).', tags: REACTIONS },
  { id: 'b2-01-re7', topic: RE, kind: 'fix', prompt: '"I love surfing." — "So I do."', options: ['"I love surfing." — "So I am do."', '"I love surfing." — "So do I."', '"I love surfing." — "Do so I."'], answer: 1, tip: 'So + auxiliar + sujeto: So do I.', tags: REACTIONS },
  { id: 'b2-01-re8', topic: RE, prompt: '"I can\'t come, I have to work." — "Fair ___."', options: ['well', 'fine', 'enough'], answer: 2, tip: '"Fair enough" = vale, es razonable.', tags: REACTIONS },

  // Bloque 2 · Awkward Silences (esbirros)
  { id: 'b2-01-si1', topic: PC, prompt: "I've ___ three books this month.", options: ['been read', 'read', 'reading'], answer: 1, tip: 'Cantidad (three books) → simple: I\'ve read.', tags: SILENCE },
  { id: 'b2-01-si2', topic: RE, kind: 'fix', prompt: '"I haven\'t got any plans." — "Neither I have."', options: ['"I haven\'t got any plans." — "Neither have I."', '"I haven\'t got any plans." — "Neither I haven\'t."', '"I haven\'t got any plans." — "Neither have not I."'], answer: 0, tip: 'Neither + auxiliar + sujeto: Neither have I.', tags: SILENCE },
  { id: 'b2-01-si3', topic: RE, prompt: '"I\'m tired." — "So ___ I."', options: ['do', 'am', 'have'], answer: 1, tip: "I'm → So am I.", tags: SILENCE },
  { id: 'b2-01-si4', topic: PC, prompt: "She's been ___ here since June.", options: ['living', 'live', 'lived'], answer: 0, tip: 'has been + -ing: living.', tags: SILENCE },
  { id: 'b2-01-si5', topic: PC, prompt: 'How long ___ you been waiting?', options: ['did', 'are', 'have'], answer: 2, tip: 'How long have you been + -ing?', tags: SILENCE },
  { id: 'b2-01-si6', topic: PC, prompt: "We've ___ each other for ages.", options: ['known', 'been knowing', 'knowed'], answer: 0, tip: 'know es verbo de estado: known.', tags: SILENCE },

  // Bloque 2 · Echo of the Grudge, fase 1 (present perfect simple o continuo)
  { id: 'b2-01-bp1', topic: PC, kind: 'fix', prompt: 'How long are you living here?', options: ['How long have you been living here?', 'How long have you living here?', 'How long you have been living here?'], answer: 0, tip: 'How long + have you been + -ing.', tags: BOSS_PP },
  { id: 'b2-01-bp2', topic: PC, prompt: "I've ___ the whole film. It was great.", options: ['watching', 'watches', 'watched'], answer: 2, tip: 'Resultado terminado → simple: watched.', tags: BOSS_PP },
  { id: 'b2-01-bp3', topic: PC, prompt: 'Your hands are covered in paint! Have you ___ the fence?', options: ['painting', 'been painting', 'painted been'], answer: 1, tip: 'Evidencia visible → continuo: been painting.', tags: BOSS_PP },
  { id: 'b2-01-bp4', topic: PC, prompt: '___ for the bus for twenty minutes.', options: ["They've been waiting", "They's been waiting", "They've been wait"], answer: 0, tip: "They have → They've been waiting.", tags: BOSS_PP },
  { id: 'b2-01-bp5', topic: PC, prompt: 'How many cups of coffee ___ today?', options: ['you have had', 'have you had', 'have you have'], answer: 1, tip: 'Pregunta con cantidad: How many… have you had?', tags: BOSS_PP },
  { id: 'b2-01-bp6', topic: PC, prompt: "I've been ___ English for two years.", options: ['learnt been', 'learn', 'learning'], answer: 2, tip: 'have been + -ing: learning.', tags: BOSS_PP },

  // Bloque 2 · Echo of the Grudge, fase 2 (reacciones y respuestas cortas)
  { id: 'b2-01-br1', topic: RE, prompt: '"I\'ve never been to Ireland." — "Neither ___ I."', options: ['have', "haven't", 'am'], answer: 0, tip: 'Neither ya es negativo: Neither have I.', tags: BOSS_RE },
  { id: 'b2-01-br2', topic: RE, prompt: '"I\'m starving." — "So ___ I!"', options: ['do', 'have', 'am'], answer: 2, tip: "I'm → So am I.", tags: BOSS_RE },
  { id: 'b2-01-br3', topic: RE, prompt: '"Will the café be open tomorrow?" — "I ___ so."', options: ['thinking', 'think', 'thinks'], answer: 1, tip: 'I think so.', tags: BOSS_RE },
  { id: 'b2-01-br4', topic: RE, prompt: '"My team lost the final." — "Oh no, you must be ___."', options: ['gutted', 'gutting', 'gut'], answer: 0, tip: 'gutted = muy decepcionado (cómo se siente alguien).', tags: BOSS_RE },
  { id: 'b2-01-br5', topic: RE, kind: 'fix', prompt: '"Is it far?" — "I think not so."', options: ['"Is it far?" — "I not think so."', '"Is it far?" — "I think no so."', '"Is it far?" — "I don\'t think so."'], answer: 2, tip: "Negativo: I don't think so.", tags: BOSS_RE },
  { id: 'b2-01-br6', topic: RE, prompt: '"Maya won the competition!" — "No way! That\'s ___!"', options: ['amazing', 'amazed', 'amaze'], answer: 0, tip: 'Cómo es algo: -ing (amazing).', tags: BOSS_RE },
]
