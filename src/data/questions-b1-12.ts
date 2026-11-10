import type { Question } from '../game/types'

/**
 * B1-12 · Old Friends (presente). Bloque A (la casa de los abuelos, data/b1HostHouse.ts):
 *  - Práctica de verbos de estado y de acción con Maya (tarea b1-12-verbs, tema state-verbs-b1): b1-12-sv1…sv8.
 * La posición de la respuesta correcta varía a propósito.
 */
const SV = 'state-verbs-b1' as const
const VERBS = ['b1-12-verbs']

export const B1_12_VERBS_IDS = ['b1-12-sv1', 'b1-12-sv2', 'b1-12-sv3', 'b1-12-sv4', 'b1-12-sv5', 'b1-12-sv6', 'b1-12-sv7', 'b1-12-sv8']

export const B1_12_QUESTIONS: Question[] = [
  // Bloque A · Maya (verbos de estado y de acción)
  { id: 'b1-12-sv1', topic: SV, kind: 'fix', prompt: 'I am knowing Jhoana very well.', options: ['I know Jhoana very well.', 'I knowing Jhoana very well.', 'I am know Jhoana very well.'], answer: 0, tip: 'know es verbo de estado: sin -ing.', tags: VERBS },
  { id: 'b1-12-sv2', topic: SV, kind: 'fix', prompt: 'She is wanting a glass of water.', options: ['She is want a glass of water.', 'She wants a glass of water.', 'She wanting a glass of water.'], answer: 1, tip: 'want es verbo de estado.', tags: VERBS },
  { id: 'b1-12-sv3', topic: SV, prompt: 'I ___ you are right. I agree with you.', options: ['am believing', 'am believe', 'believe'], answer: 2, tip: 'believe es verbo de estado.', tags: VERBS },
  { id: 'b1-12-sv4', topic: SV, prompt: 'Be quiet, please. I ___ on the phone.', options: ['am talking', 'talk', 'talks'], answer: 0, tip: 'Acción en este momento: am talking.', tags: VERBS },
  { id: 'b1-12-sv5', topic: SV, prompt: "I ___ it's a great idea. (my opinion)", options: ['think', 'am thinking', 'thinks'], answer: 0, tip: 'Opinión: think (sin -ing).', tags: VERBS },
  { id: 'b1-12-sv6', topic: SV, prompt: "Don't call now. We ___ dinner.", options: ['have', 'are having', 'has'], answer: 1, tip: 'have como acción (cenar): are having.', tags: VERBS },
  { id: 'b1-12-sv7', topic: SV, kind: 'order', prompt: 'Esta sopa sabe muy bien.', options: ['This', 'soup', 'tastes', 'really', 'good.'], answer: 0, tip: 'taste como estado: tastes.', tags: VERBS },
  {
    id: 'b1-12-sv8',
    topic: SV,
    kind: 'listen',
    audio: "I know Einer very well. He's cooking at the moment, and I'm helping him. I think the soup smells wonderful.",
    voice: 'female',
    prompt: '¿Qué está haciendo Einer?',
    options: ['Está limpiando.', 'Está cocinando.', 'Está durmiendo.'],
    answer: 1,
    tip: "He's cooking at the moment.",
    tags: VERBS,
  },
]
