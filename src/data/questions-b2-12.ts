import type { Question } from '../game/types'

/**
 * B2-12 · Countdown (Ventana 2056). Bloque 1 (el cuarto de G, data/b2Countdown.ts): prácticas después de cada lección.
 *  - La pared del plan (tarea b2-12-plan, tema fperfect-b2): b2-12-fp1…fp6 (1 de escucha).
 *  - La lista vieja de metas (tarea b2-12-goals, tema goals-b2): b2-12-gl1…gl6.
 * Bloque 2: el cuaderno de G (tarea b2-12-notebook, tema time-clauses-b2): b2-12-tc1…tc6 (2 de escucha: G habla solo)
 *   · Ticking Shadows (etiqueta b2-12-shadow): b2-12-ts1…ts6 · The Countdown, fase 1 (b2-12-boss-fp): b2-12-cf1…cf6
 *   · fase 2 (b2-12-boss-tc): b2-12-ct1…ct6 (1 de escucha).
 * Las opciones incorrectas están mal en cualquier contexto. La posición de la respuesta correcta varía a propósito.
 */
const FP = 'fperfect-b2' as const
const GL = 'goals-b2' as const
const T_FP = ['b2-12-plan']
const T_GL = ['b2-12-goals']
const TC = 'time-clauses-b2' as const
const T_TC = ['b2-12-notebook']

const ids = (p: string) => [1, 2, 3, 4, 5, 6].map((n) => `b2-12-${p}${n}`)
export const B2_12_PLAN_IDS = ids('fp')
export const B2_12_GOALS_IDS = ids('gl')
export const B2_12_NOTEBOOK_IDS = ids('tc')

export const B2_12_QUESTIONS: Question[] = [
  // Bloque 1 · La pared del plan (futuro perfecto simple)
  { id: 'b2-12-fp1', topic: FP, prompt: 'By tomorrow morning, I ___ at his school.', options: ['will arrive have', 'will have arrived', 'will has arrived'], answer: 1, tip: 'will have + participio: will have arrived (después de will, siempre have).', tags: T_FP },
  { id: 'b2-12-fp2', topic: FP, prompt: 'By the end of the year, they ___ the new library.', options: ['will have built', 'will have build', 'will built have'], answer: 0, tip: 'will have + participio: build → built.', tags: T_FP },
  { id: 'b2-12-fp3', topic: FP, kind: 'fix', prompt: 'By 2060 I will have finish my plan.', options: ['By 2060 I will had finished my plan.', 'By 2060 I will have finishing my plan.', 'By 2060 I will have finished my plan.'], answer: 2, tip: 'Después de will have va el participio: finished.', tags: T_FP },
  { id: 'b2-12-fp4', topic: FP, prompt: 'If my plan works, they ___ friends.', options: ['will never have became', 'will never have become', 'will never become have'], answer: 1, tip: 'will never have + participio: become → become (no "became").', tags: T_FP },
  {
    id: 'b2-12-fp5',
    topic: FP,
    kind: 'listen',
    audio: 'By the time he turns fifteen, I will have taken his voice.',
    voice: 'male',
    prompt: 'What does the plan say?',
    options: ['His voice will be gone before he turns fifteen.', 'He will get his voice back at fifteen.', 'He is fifteen now.'],
    answer: 0,
    tip: '"By the time he turns fifteen, I will have taken his voice": antes de los quince, ya se la habrá quitado.',
    tags: T_FP,
  },
  { id: 'b2-12-fp6', topic: FP, prompt: '___ you have finished the report by Friday?', options: ['Do', 'Will', 'Are'], answer: 1, tip: 'Pregunta en futuro perfecto: Will you have finished…?', tags: T_FP },

  // Bloque 1 · La lista vieja de metas (futuro perfecto continuo y vocabulario de metas)
  { id: 'b2-12-gl1', topic: GL, prompt: 'By 40, I ___ for ten years.', options: ['will have been teaching', 'will have teaching', 'will been teaching'], answer: 0, tip: 'Cuánto tiempo llevará algo en un momento del futuro: will have been + -ing.', tags: T_GL },
  { id: 'b2-12-gl2', topic: GL, prompt: 'Next month, she ___ here for twenty years.', options: ['will have working', 'will been working', 'will have been working'], answer: 2, tip: 'will have been + -ing + for: will have been working for twenty years.', tags: T_GL },
  { id: 'b2-12-gl3', topic: GL, kind: 'fix', prompt: 'I will have been wait for years.', options: ['I will been waiting for years.', 'I will have been waiting for years.', 'I will have been waits for years.'], answer: 1, tip: 'Después de will have been va -ing: waiting.', tags: T_GL },
  { id: 'b2-12-gl4', topic: GL, prompt: 'Becoming a teacher was his biggest ___.', options: ['ambitious', 'ambition', 'ambitiously'], answer: 1, tip: 'Hace falta un sustantivo: ambition (ambición, meta grande).', tags: T_GL },
  { id: 'b2-12-gl5', topic: GL, prompt: 'She worked hard and ___ all her goals.', options: ['achieved', 'arrived', 'succeeded'], answer: 0, tip: 'achieve a goal = lograr una meta (succeed lleva "in": succeed in).', tags: T_GL },
  // Bloque 2 · El cuaderno de G (by the time, by / until, when / if + presente, be about to)
  { id: 'b2-12-tc1', topic: TC, prompt: 'By the time he ___ me, it will be too late.', options: ['will see', 'sees', 'seeing'], answer: 1, tip: 'Después de by the time va presente, aunque hable del futuro: sees.', tags: T_TC },
  { id: 'b2-12-tc2', topic: TC, prompt: "I'll wait ___ he's alone.", options: ['by', 'since', 'until'], answer: 2, tip: 'until = todo el tiempo hasta ese momento.', tags: T_TC },
  { id: 'b2-12-tc3', topic: TC, prompt: 'Please send me the report ___ Friday.', options: ['until', 'by', 'since'], answer: 1, tip: 'by = a más tardar ese día.', tags: T_TC },
  { id: 'b2-12-tc4', topic: TC, kind: 'fix', prompt: 'Wait here until I will come back.', options: ['Wait here until I come back.', 'Wait here by I come back.', 'Wait here until I came back.'], answer: 0, tip: 'Después de until va presente: until I come back.', tags: T_TC },
  {
    id: 'b2-12-tc5',
    topic: TC,
    kind: 'listen',
    audio: "No one can stop me now. I'm about to change everything.",
    voice: 'male',
    prompt: 'What does G say?',
    options: ['Somebody is going to stop him.', 'He is going to change everything very soon.', 'He changed everything a long time ago.'],
    answer: 1,
    tip: '"I\'m about to change everything": está a punto de cambiarlo todo.',
    tags: T_TC,
  },
  {
    id: 'b2-12-tc6',
    topic: TC,
    kind: 'listen',
    audio: "By tomorrow, I'll have been waiting for this for thirty years.",
    voice: 'male',
    prompt: 'How long has G been waiting?',
    options: ['Since yesterday.', 'Only a few days.', 'Almost thirty years.'],
    answer: 2,
    tip: '"By tomorrow, I\'ll have been waiting… for thirty years": mañana se cumplen treinta años.',
    tags: T_TC,
  },
  { id: 'b2-12-gl6', topic: GL, prompt: 'When I look ___ on my life, I want to be proud of it.', options: ['up', 'out', 'back'], answer: 2, tip: 'look back on = recordar, mirar atrás.', tags: T_GL },
]

const SHADOW = ['b2-12-shadow']
const BOSS_FP = ['b2-12-boss-fp']
const BOSS_TC = ['b2-12-boss-tc']

export const B2_12_COMBAT_QUESTIONS: Question[] = [
  // Ticking Shadows (el error típico del esbirro: will have finish, will have been wait, I'm about leaving)
  { id: 'b2-12-ts1', topic: FP, kind: 'fix', prompt: 'By tomorrow I will have finish.', options: ['By tomorrow I will have finished.', 'By tomorrow I will had finished.', 'By tomorrow I will have finishing.'], answer: 0, tip: 'will have + participio: finished.', tags: SHADOW },
  { id: 'b2-12-ts2', topic: GL, kind: 'fix', prompt: 'I will have been wait for years.', options: ['I will been waiting for years.', 'I will have been waits for years.', 'I will have been waiting for years.'], answer: 2, tip: 'will have been + -ing: waiting.', tags: SHADOW },
  { id: 'b2-12-ts3', topic: TC, kind: 'fix', prompt: "I'm about leaving.", options: ["I'm about to leave.", "I'm about to leaving.", "I'm about leave."], answer: 0, tip: 'be about to + verbo: about to leave.', tags: SHADOW },
  { id: 'b2-12-ts4', topic: FP, prompt: 'By the end of the night, the clock ___ a thousand times.', options: ['will ticked', 'will have ticked', 'will have tick'], answer: 1, tip: 'will have + participio: ticked.', tags: SHADOW },
  { id: 'b2-12-ts5', topic: GL, prompt: 'By midnight, he ___ for six hours.', options: ['will have been writing', 'will have writing', 'will been written'], answer: 0, tip: 'Cuánto tiempo llevará: will have been + -ing.', tags: SHADOW },
  { id: 'b2-12-ts6', topic: TC, prompt: 'Quick! The ship is about ___.', options: ['leaving', 'to leave', 'leave'], answer: 1, tip: 'be about to + verbo.', tags: SHADOW },

  // The Countdown, fase 1 (futuro perfecto simple y continuo)
  { id: 'b2-12-cf1', topic: GL, kind: 'fix', prompt: 'By 2060 I will have been became a teacher.', options: ['By 2060 I will have became a teacher.', 'By 2060 I will have become a teacher.', 'By 2060 I will be became a teacher.'], answer: 1, tip: 'will have + participio: become (no "been became").', tags: BOSS_FP },
  { id: 'b2-12-cf2', topic: FP, prompt: 'Hurry up! By the time we get there, the film ___.', options: ['will have started', 'will have start', 'will started'], answer: 0, tip: 'Ya habrá empezado antes de que lleguemos: will have started.', tags: BOSS_FP },
  { id: 'b2-12-cf3', topic: FP, prompt: "Don't call at eight. We ___ dinner yet.", options: ["won't have finish", "won't have finished", "will haven't finished"], answer: 1, tip: "Negativo: won't have + participio.", tags: BOSS_FP },
  { id: 'b2-12-cf4', topic: GL, prompt: 'In June, they ___ here for five years.', options: ['will have been living', 'will have live', 'will been living'], answer: 0, tip: 'Cuánto tiempo llevarán: will have been + -ing.', tags: BOSS_FP },
  { id: 'b2-12-cf5', topic: GL, prompt: 'Becoming a teacher was the most important ___ of his life.', options: ['milestone', 'deadline', 'countdown'], answer: 0, tip: 'milestone = un hito, un momento importante.', tags: BOSS_FP },
  { id: 'b2-12-cf6', topic: FP, kind: 'order', prompt: 'Para mañana, habré llegado a su escuela.', options: ['By', 'tomorrow,', 'I', 'will', 'have', 'arrived', 'at', 'his', 'school.'], answer: 0, tip: 'By + momento, y will have + participio.', tags: BOSS_FP },

  // The Countdown, fase 2 (by the time / until / when + presente y be about to)
  { id: 'b2-12-ct1', topic: TC, kind: 'fix', prompt: "By the time he will arrive, I'll have left.", options: ["By the time he arrives, I'll have left.", "By the time he arrived, I'll have left.", "By the time he arriving, I'll have left."], answer: 0, tip: 'Después de by the time va presente: arrives.', tags: BOSS_TC },
  { id: 'b2-12-ct2', topic: TC, kind: 'fix', prompt: 'Wait here until I will come back.', options: ['Wait here until I came back.', 'Wait here until I come back.', 'Wait here until I coming back.'], answer: 1, tip: 'Después de until va presente: come.', tags: BOSS_TC },
  { id: 'b2-12-ct3', topic: TC, prompt: 'If he ___ the note, he might stop.', options: ['will read', 'reads', 'reading'], answer: 1, tip: 'Después de if va presente cuando hablamos del futuro: reads.', tags: BOSS_TC },
  { id: 'b2-12-ct4', topic: TC, prompt: 'You must finish the project ___ the end of the month.', options: ['until', 'by', 'since'], answer: 1, tip: 'by = a más tardar (un momento límite).', tags: BOSS_TC },
  { id: 'b2-12-ct5', topic: TC, prompt: "Don't go to bed! The film is ___ to start.", options: ['about', 'going about', 'near'], answer: 0, tip: 'be about to = a punto de.', tags: BOSS_TC },
  {
    id: 'b2-12-ct6',
    topic: TC,
    kind: 'listen',
    audio: "When I take his voice, I'll speak again. By the time he understands, I'll be gone.",
    voice: 'male',
    prompt: 'When will G speak again?',
    options: ["After he takes the boy's voice.", 'Before the boy understands anything.', 'He will never speak again.'],
    answer: 0,
    tip: '"When I take his voice, I\'ll speak again": cuando le quite la voz.',
    tags: BOSS_TC,
  },
]
