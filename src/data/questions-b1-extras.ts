import type { Question } from '../game/types'

/**
 * B1 · Extras (misiones secundarias).
 *  - Charity Run (data/b1CharityRun.ts): práctica con Ilva (tarea b1-s1-coach, tema charity-b1): b1-s1-c1…c8.
 * La posición de la respuesta correcta varía a propósito.
 */
const CR = 'charity-b1' as const
const COACH = ['b1-s1-coach']

export const B1_S1_COACH_IDS = ['b1-s1-c1', 'b1-s1-c2', 'b1-s1-c3', 'b1-s1-c4', 'b1-s1-c5', 'b1-s1-c6', 'b1-s1-c7', 'b1-s1-c8']

export const B1_EXTRA_QUESTIONS: Question[] = [
  // Charity Run · Ilva (colocaciones de logros; past continuous + past simple)
  { id: 'b1-s1-c1', topic: CR, prompt: 'Last year we ___ a lot of money for the shelter.', options: ['raised', 'rose', 'beat'], answer: 0, tip: 'Recaudar dinero: raise money.', tags: COACH },
  { id: 'b1-s1-c2', topic: CR, prompt: 'I trained every day, and I finally ___ my goal.', options: ['raised', 'achieved', 'took part'], answer: 1, tip: 'Lograr una meta: achieve a goal.', tags: COACH },
  { id: 'b1-s1-c3', topic: CR, prompt: 'She ran very fast and ___ her own record.', options: ['won', 'raised', 'beat'], answer: 2, tip: 'Superar una marca: beat a record.', tags: COACH },
  { id: 'b1-s1-c4', topic: CR, prompt: 'More than two hundred people took ___ in the race.', options: ['part', 'place', 'goal'], answer: 0, tip: 'Participar: take part in.', tags: COACH },
  { id: 'b1-s1-c5', topic: CR, prompt: 'I ___ when I fell.', options: ['were running', 'was running', 'am running'], answer: 1, tip: 'Con I: was + verbo con -ing.', tags: COACH },
  { id: 'b1-s1-c6', topic: CR, kind: 'fix', prompt: 'I was run when it started to rain.', options: ['I was runned when it started to rain.', 'I were running when it started to rain.', 'I was running when it started to rain.'], answer: 2, tip: 'was + verbo con -ing: was running.', tags: COACH },
  { id: 'b1-s1-c7', topic: CR, prompt: 'We were waiting at the start line when the coach ___.', options: ['arrives', 'arrive', 'arrived'], answer: 2, tip: 'La acción corta va en pasado simple: arrived.', tags: COACH },
  { id: 'b1-s1-c8', topic: CR, kind: 'order', prompt: 'Estaba corriendo cuando vi a Lupe.', options: ['I', 'was', 'running', 'when', 'I', 'saw', 'Lupe.'], answer: 0, tip: 'was + -ing + when + pasado simple.', tags: COACH },
]
