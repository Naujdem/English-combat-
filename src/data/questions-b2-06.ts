import type { Question } from '../game/types'

/**
 * B2-06 · The Lab (Ventana 2062). Bloque 1 (la recepción de Vocalis, data/b2Lab.ts): prácticas después de cada lección.
 *  - Los folletos (tarea b2-06-words, tema wordform-b2): b2-06-wf1…wf6.
 *  - Los recortes de prensa (tarea b2-06-clippings, tema passive-report-b2): b2-06-pr1…pr6.
 * Las opciones incorrectas están mal en cualquier contexto. La posición de la respuesta correcta varía a propósito.
 */
const WF = 'wordform-b2' as const
const PR = 'passive-report-b2' as const
const T_WF = ['b2-06-words']
const T_PR = ['b2-06-clippings']

const ids = (p: string) => [1, 2, 3, 4, 5, 6].map((n) => `b2-06-${p}${n}`)
export const B2_06_WORDS_IDS = ids('wf')
export const B2_06_PASSIVE_IDS = ids('pr')

export const B2_06_QUESTIONS: Question[] = [
  // Bloque 1 · Los folletos (formación de palabras)
  { id: 'b2-06-wf1', topic: WF, prompt: 'Vocalis promises the ___ of lost abilities.', options: ['restore', 'restoration', 'restoring of'], answer: 1, tip: 'Después de "the" va un sustantivo: restoration.', tags: T_WF },
  { id: 'b2-06-wf2', topic: WF, prompt: 'Sleep is important for your mental ___.', options: ['wellbeing', 'well', 'good'], answer: 0, tip: 'El sustantivo es wellbeing (bienestar).', tags: T_WF },
  { id: 'b2-06-wf3', topic: WF, prompt: 'Nobody has tested the ___ of the new treatment yet.', options: ['effective', 'effectively', 'effectiveness'], answer: 2, tip: 'Adjetivo + -ness → sustantivo: effectiveness.', tags: T_WF },
  { id: 'b2-06-wf4', topic: WF, prompt: 'She lost the ___ to speak after the fire.', options: ['able', 'ability', 'unable'], answer: 1, tip: 'the + sustantivo: ability.', tags: T_WF },
  { id: 'b2-06-wf5', topic: WF, kind: 'fix', prompt: 'There has been a big improve in the results.', options: ['There has been a big improving in the results.', 'There has been a big improvement in the results.', 'There has been a big improved in the results.'], answer: 1, tip: 'a big + sustantivo: improvement.', tags: T_WF },
  { id: 'b2-06-wf6', topic: WF, prompt: 'The stairs were ___ after the fire, so nobody could use them.', options: ['insafe', 'unsafe', 'dissafe'], answer: 1, tip: 'safe → unsafe (no seguro).', tags: T_WF },

  // Bloque 1 · Los recortes de prensa (pasiva de reporte, be supposed to y repaso de la pasiva)
  { id: 'b2-06-pr1', topic: PR, prompt: '___ that the writings are 3,000 years old.', options: ['It is believed', 'It believes', 'They are believed'], answer: 0, tip: 'It is believed + that + oración.', tags: T_PR },
  { id: 'b2-06-pr2', topic: PR, prompt: 'Dr. Sato is said ___ in the lab day and night.', options: ['that she works', 'working', 'to work'], answer: 2, tip: 'Persona + is said + to + forma base.', tags: T_PR },
  { id: 'b2-06-pr3', topic: PR, prompt: 'The key is reported ___ in a temple ten years ago.', options: ['to be found', 'to have been found', 'that was found'], answer: 1, tip: 'Pasó antes y en pasiva → to have been + participio.', tags: T_PR },
  { id: 'b2-06-pr4', topic: PR, prompt: 'The device ___ to restore lost voices, but nobody knows if it works.', options: ['supposes', 'is supposing', 'is supposed'], answer: 2, tip: 'be supposed to: se dice que… / se supone que…', tags: T_PR },
  { id: 'b2-06-pr5', topic: PR, kind: 'fix', prompt: 'He is said to has found the key.', options: ['He is said to have found the key.', 'He is said to had found the key.', 'He is said to finding the key.'], answer: 0, tip: 'Después de to siempre va forma base: to have found.', tags: T_PR },
  { id: 'b2-06-pr6', topic: PR, prompt: 'The first lab ___ in 2058.', options: ['built', 'was built', 'has building'], answer: 1, tip: 'Repaso de la pasiva: was + participio.', tags: T_PR },
]
