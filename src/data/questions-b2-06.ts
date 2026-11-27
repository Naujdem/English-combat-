import type { Question } from '../game/types'

/**
 * B2-06 · The Lab (Ventana 2062). Bloque 1 (la recepción de Vocalis, data/b2Lab.ts): prácticas después de cada lección.
 *  - Los folletos (tarea b2-06-words, tema wordform-b2): b2-06-wf1…wf6.
 *  - Los recortes de prensa (tarea b2-06-clippings, tema passive-report-b2): b2-06-pr1…pr6.
 *  - Bloque 2 · las gráficas (tarea b2-06-trends, tema trends-b2): b2-06-tr1…tr6 · el memo (tarea b2-06-memo,
 *    tema causative-b2): b2-06-ca1…ca6. Combate: B2_06_COMBAT_QUESTIONS.
 * Las opciones incorrectas están mal en cualquier contexto. La posición de la respuesta correcta varía a propósito.
 */
const WF = 'wordform-b2' as const
const PR = 'passive-report-b2' as const
const T_WF = ['b2-06-words']
const T_PR = ['b2-06-clippings']
const TR = 'trends-b2' as const
const CA = 'causative-b2' as const
const T_TR = ['b2-06-trends']
const T_CA = ['b2-06-memo']

const ids = (p: string) => [1, 2, 3, 4, 5, 6].map((n) => `b2-06-${p}${n}`)
export const B2_06_WORDS_IDS = ids('wf')
export const B2_06_PASSIVE_IDS = ids('pr')
export const B2_06_TRENDS_IDS = ids('tr')
export const B2_06_CAUSATIVE_IDS = ids('ca')

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

  // Bloque 2 · Las gráficas (tendencias y estadísticas)
  { id: 'b2-06-tr1', topic: TR, prompt: 'After trial 4 the success rate ___ sharply.', options: ['rised', 'rose', 'risen'], answer: 1, tip: 'rise → rose (irregular).', tags: T_TR },
  { id: 'b2-06-tr2', topic: TR, prompt: 'The rate went from 40% to 38%. It fell ___.', options: ['sharply', 'slightly', 'steady'], answer: 1, tip: 'Solo un poco → slightly.', tags: T_TR },
  { id: 'b2-06-tr3', topic: TR, prompt: 'The rate rose ___ 12% to 40%.', options: ['from', 'by', 'since'], answer: 0, tip: 'Inicio y final: from… to…', tags: T_TR },
  { id: 'b2-06-tr4', topic: TR, prompt: 'After trial 5 the results stopped changing. They levelled ___.', options: ['up', 'out', 'off'], answer: 2, tip: 'level off = estabilizarse.', tags: T_TR },
  { id: 'b2-06-tr5', topic: TR, kind: 'fix', prompt: 'The success rate rose with 28%.', options: ['The success rate rose by 28%.', 'The success rate rised by 28%.', 'The success rate rose of 28%.'], answer: 0, tip: 'La diferencia va con by.', tags: T_TR },
  { id: 'b2-06-tr6', topic: TR, prompt: 'The numbers went up and down all year. They ___.', options: ['peaked', 'levelled', 'fluctuated'], answer: 2, tip: 'Subir y bajar → fluctuate.', tags: T_TR },

  // Bloque 2 · El memo (have / get something done y phrasal verbs del laboratorio)
  { id: 'b2-06-ca1', topic: CA, prompt: 'We had the prototype ___ by an outside team.', options: ['test', 'tested', 'testing'], answer: 1, tip: 'have + objeto + participio: tested.', tags: T_CA },
  { id: 'b2-06-ca2', topic: CA, prompt: 'Dr. Sato is ___ the lab rebuilt this year.', options: ['having', 'making', 'doing'], answer: 0, tip: 'Presente continuo del causativo: is having + objeto + participio.', tags: T_CA },
  { id: 'b2-06-ca3', topic: CA, kind: 'fix', prompt: 'I got repaired my phone yesterday.', options: ['I got my phone repair yesterday.', 'I got my phone repaired yesterday.', 'I got to repair my phone yesterday by them.'], answer: 1, tip: 'El orden: get + objeto + participio.', tags: T_CA },
  { id: 'b2-06-ca4', topic: CA, prompt: 'Last year the lab had its files ___. Somebody broke in at night.', options: ['steal', 'stealing', 'stolen'], answer: 2, tip: 'Algo malo que te pasó: had + objeto + participio (stolen).', tags: T_CA },
  { id: 'b2-06-ca5', topic: CA, prompt: 'Before a trial, the team sets ___ all the machines.', options: ['up', 'off', 'in'], answer: 0, tip: 'set up = preparar, instalar.', tags: T_CA },
  { id: 'b2-06-ca6', topic: CA, prompt: 'They have carried ___ seven trials so far.', options: ['on', 'out', 'up'], answer: 1, tip: 'carry out = realizar (un experimento).', tags: T_CA },
]

const DRONE = ['b2-06-drone']
const BOSS_PR = ['b2-06-boss-pr']
const BOSS_CA = ['b2-06-boss-ca']

/** Bloque 2: Lab Drones (b2-06-dr1…dr6) y The Prototype (fase 1: b2-06-bp1…bp6 · fase 2: b2-06-bc1…bc6) */
export const B2_06_COMBAT_QUESTIONS: Question[] = [
  // Bloque 2 · Lab Drones (esbirros)
  { id: 'b2-06-dr1', topic: CA, kind: 'fix', prompt: 'They had the prototype test last week.', options: ['They had the prototype tested last week.', 'They had tested the prototype by last week them.', 'They had the prototype to test last week.'], answer: 0, tip: 'have + objeto + participio: tested.', tags: DRONE },
  { id: 'b2-06-dr2', topic: PR, kind: 'fix', prompt: 'He is said to has found the key.', options: ['He is said to have found the key.', 'He is said to having found the key.', 'He is said that has found the key.'], answer: 0, tip: 'to + forma base: to have found.', tags: DRONE },
  { id: 'b2-06-dr3', topic: PR, kind: 'fix', prompt: 'It is believed that be very old.', options: ['It is believed that it be very old.', 'It is believed to it is very old.', 'It is believed that it is very old.'], answer: 2, tip: 'Después de that va una oración completa: it is.', tags: DRONE },
  { id: 'b2-06-dr4', topic: WF, prompt: 'Without his voice, he felt completely ___ to work.', options: ['unable', 'inable', 'disable'], answer: 0, tip: 'able → unable.', tags: DRONE },
  { id: 'b2-06-dr5', topic: WF, prompt: 'The report shows a clear ___ in the patients.', options: ['improve', 'improvement', 'improved'], answer: 1, tip: 'a clear + sustantivo: improvement.', tags: DRONE },
  { id: 'b2-06-dr6', topic: PR, prompt: "Visitors ___ to wear a badge, but you aren't wearing one.", options: ['are supposed', 'suppose', 'are supposing'], answer: 0, tip: 'be supposed to = se debería.', tags: DRONE },

  // Bloque 2 · The Prototype, fase 1 (pasiva de reporte y be supposed to)
  { id: 'b2-06-bp1', topic: PR, kind: 'fix', prompt: 'She is said to discovering it in a temple.', options: ['She is said to have discovered it in a temple.', 'She is said to discovered it in a temple.', 'She is said discovering it in a temple.'], answer: 0, tip: 'Algo que ya pasó → is said to have + participio.', tags: BOSS_PR },
  { id: 'b2-06-bp2', topic: PR, kind: 'fix', prompt: 'It is supposed that works.', options: ['It is supposed to working.', 'It is supposed to work.', 'It supposes to work.'], answer: 1, tip: 'be supposed to + forma base.', tags: BOSS_PR },
  { id: 'b2-06-bp3', topic: PR, prompt: '___ that the device can restore any voice.', options: ['It is claimed', 'It claims that it is', 'Is claimed'], answer: 0, tip: 'It is claimed + that + oración.', tags: BOSS_PR },
  { id: 'b2-06-bp4', topic: PR, prompt: 'The writings are thought ___ by monks 3,000 years ago.', options: ['to be written', 'that were written', 'to have been written'], answer: 2, tip: 'Pasó antes y en pasiva → to have been + participio.', tags: BOSS_PR },
  { id: 'b2-06-bp5', topic: PR, kind: 'order', prompt: 'Se dice que el aparato devuelve las voces.', options: ['The', 'device', 'is', 'said', 'to', 'restore', 'voices.'], answer: 0, tip: 'Cosa + is said + to + forma base.', tags: BOSS_PR },
  { id: 'b2-06-bp6', topic: PR, kind: 'order', prompt: 'Se suponía que nadie lo sabría.', options: ['Nobody', 'was', 'supposed', 'to', 'know', 'about', 'it.'], answer: 0, tip: 'was supposed to + forma base.', tags: BOSS_PR },

  // Bloque 2 · The Prototype, fase 2 (causativo y tendencias, con escuchas de Sato y Mensah)
  { id: 'b2-06-bc1', topic: TR, kind: 'fix', prompt: 'The success rate rose with 30%.', options: ['The success rate rose of 30%.', 'The success rate rose by 30%.', 'The success rate raised by 30%.'], answer: 1, tip: 'La diferencia va con by; rise no lleva objeto.', tags: BOSS_CA },
  { id: 'b2-06-bc2', topic: CA, kind: 'fix', prompt: 'I got repaired my circuits.', options: ['I got my circuits repaired.', 'I got my circuits repair.', 'I got my circuits to repaired.'], answer: 0, tip: 'get + objeto + participio.', tags: BOSS_CA },
  { id: 'b2-06-bc3', topic: TR, prompt: 'In trial 7 the success rate ___ at 90%. It was the highest point.', options: ['levelled', 'peaked', 'fell'], answer: 1, tip: 'El punto más alto → peak.', tags: BOSS_CA },
  { id: 'b2-06-bc4', topic: CA, prompt: 'We need to have the results ___ before the press conference.', options: ['checked', 'check', 'to check'], answer: 0, tip: 'have + objeto + participio: checked.', tags: BOSS_CA },
  {
    id: 'b2-06-bc5',
    topic: TR,
    kind: 'listen',
    audio: 'In the first six trials, the success rate rose steadily from twelve to forty percent. In trial seven, it rose sharply to ninety.',
    voice: 'female',
    prompt: 'What happened in trial 7, according to Dr. Sato?',
    options: ['The rate fell slightly.', 'The rate rose sharply to 90%.', 'The rate levelled off at 40%.'],
    answer: 1,
    tip: 'In trial seven, it rose sharply to ninety.',
    tags: BOSS_CA,
  },
  {
    id: 'b2-06-bc6',
    topic: CA,
    kind: 'listen',
    audio: "We had the donor checked by three doctors. Her voice hasn't come back. We can't rule out that it's permanent.",
    voice: 'male',
    prompt: 'What does Dr. Mensah say about the donor?',
    options: ['Her voice came back after a week.', 'Three doctors checked her, and her voice may never come back.', 'She refused to see a doctor.'],
    answer: 1,
    tip: "We can't rule out that it's permanent = no se puede descartar que sea permanente.",
    tags: BOSS_CA,
  },
]
