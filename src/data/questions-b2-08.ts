import type { Question } from '../game/types'

/**
 * B2-08 · Pitch (Ventana 2064). Bloque 1 (las oficinas de marketing de Vocalis, data/b2Pitch.ts): prácticas después de cada lección.
 *  - La propuesta de campaña (tarea b2-08-compare, tema compare-b2): b2-08-cp1…cp6.
 *  - La encuesta de mercado (tarea b2-08-survey, tema uncount-b2): b2-08-un1…un6.
 * Las opciones incorrectas están mal en cualquier contexto. La posición de la respuesta correcta varía a propósito.
 */
const CP = 'compare-b2' as const
const UN = 'uncount-b2' as const
const T_CP = ['b2-08-compare']
const T_UN = ['b2-08-survey']

const ids = (p: string) => [1, 2, 3, 4, 5, 6].map((n) => `b2-08-${p}${n}`)
export const B2_08_COMPARE_IDS = ids('cp')
export const B2_08_SURVEY_IDS = ids('un')

export const B2_08_QUESTIONS: Question[] = [
  // Bloque 1 · La propuesta de campaña (comparaciones precisas y tipos de marketing)
  { id: 'b2-08-cp1', topic: CP, prompt: 'Restore is ___ more effective than the old treatment. It is a huge difference.', options: ['far', 'very', 'too'], answer: 0, tip: 'Diferencia grande: far / much + comparativo. Nunca "very more".', tags: T_CP },
  { id: 'b2-08-cp2', topic: CP, prompt: 'It is only two dollars cheaper. It is ___ cheaper than the competition.', options: ['far', 'slightly', 'nowhere'], answer: 1, tip: 'Diferencia pequeña: slightly / a bit + comparativo.', tags: T_CP },
  { id: 'b2-08-cp3', topic: CP, prompt: 'Other treatments are nowhere near ___ fast as Restore.', options: ['so much', 'than', 'as'], answer: 2, tip: 'nowhere near as + adjetivo + as.', tags: T_CP },
  { id: 'b2-08-cp4', topic: CP, prompt: 'The new device works ___ the old one.', options: ['twice faster than', 'twice as fast as', 'twice fast as'], answer: 1, tip: 'twice / three times + as + adjetivo + as.', tags: T_CP },
  { id: 'b2-08-cp5', topic: CP, kind: 'fix', prompt: "It's much more better than therapy.", options: ["It's very more better than therapy.", "It's much more good than therapy.", "It's much better than therapy."], answer: 2, tip: 'better ya es comparativo: much better (sin more).', tags: T_CP },
  { id: 'b2-08-cp6', topic: CP, prompt: 'Nobody saw an ad. People heard about it from their friends. That is ___.', options: ['word of mouth', 'targeted ads', 'a slogan'], answer: 0, tip: 'Word of mouth: la gente se lo cuenta a otra gente.', tags: T_CP },

  // Bloque 1 · La encuesta de mercado (contables e incontables)
  { id: 'b2-08-un1', topic: UN, prompt: 'Can you give me ___ about the launch?', options: ['an information', 'some information', 'informations'], answer: 1, tip: 'information es incontable: some information, nunca "an information".', tags: T_UN },
  { id: 'b2-08-un2', topic: UN, prompt: 'My manager gave me a good piece of ___.', options: ['advice', 'advices', 'advise'], answer: 0, tip: 'a piece of advice (advise es el verbo).', tags: T_UN },
  { id: 'b2-08-un3', topic: UN, prompt: 'The news ___ good: sales are going up.', options: ['are', 'is', 'were being'], answer: 1, tip: 'news es incontable y va en singular: the news is.', tags: T_UN },
  { id: 'b2-08-un4', topic: UN, prompt: 'We need new ___ for the stage.', options: ['an equipment', 'equipments', 'equipment'], answer: 2, tip: 'equipment es incontable: sin a/an y sin -s.', tags: T_UN },
  { id: 'b2-08-un5', topic: UN, kind: 'fix', prompt: 'We got a lot of feedbacks from the survey.', options: ['We got a lot of feedback from the survey.', 'We got many feedbacks from the survey.', 'We got a feedback from the survey.'], answer: 0, tip: 'feedback es incontable: a lot of feedback.', tags: T_UN },
  { id: 'b2-08-un6', topic: UN, prompt: 'How ___ research did they do before the launch?', options: ['many', 'much', 'a lot'], answer: 1, tip: 'Con incontables: how much (how many es para contables).', tags: T_UN },
]
