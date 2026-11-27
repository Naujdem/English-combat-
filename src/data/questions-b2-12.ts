import type { Question } from '../game/types'

/**
 * B2-12 · Countdown (Ventana 2056). Bloque 1 (el cuarto de G, data/b2Countdown.ts): prácticas después de cada lección.
 *  - La pared del plan (tarea b2-12-plan, tema fperfect-b2): b2-12-fp1…fp6 (1 de escucha).
 *  - La lista vieja de metas (tarea b2-12-goals, tema goals-b2): b2-12-gl1…gl6.
 * Las opciones incorrectas están mal en cualquier contexto. La posición de la respuesta correcta varía a propósito.
 */
const FP = 'fperfect-b2' as const
const GL = 'goals-b2' as const
const T_FP = ['b2-12-plan']
const T_GL = ['b2-12-goals']

const ids = (p: string) => [1, 2, 3, 4, 5, 6].map((n) => `b2-12-${p}${n}`)
export const B2_12_PLAN_IDS = ids('fp')
export const B2_12_GOALS_IDS = ids('gl')

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
  { id: 'b2-12-gl6', topic: GL, prompt: 'When I look ___ on my life, I want to be proud of it.', options: ['up', 'out', 'back'], answer: 2, tip: 'look back on = recordar, mirar atrás.', tags: T_GL },
]
