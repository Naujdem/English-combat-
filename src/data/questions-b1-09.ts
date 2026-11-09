import type { Question } from '../game/types'

/**
 * B1-09 · Temples of Stones and Time (recuerdo 9). Bloque A (el valle, data/b1Valley.ts):
 *  - Práctica del cuaderno de L, página 31 (tarea b1-09-journey, tema travel-b1): b1-09-j1…j8.
 *  - Práctica de la guía local (tarea b1-09-culture, tema culture-talk): b1-09-c1…c4.
 * La posición de la respuesta correcta varía a propósito.
 */
const TR = 'travel-b1' as const
const CU = 'culture-talk' as const
const PA = 'passive-all' as const
const GUARDIAN = ['b1-09-guardian']
const JOURNEY = ['b1-09-journey']
const CULTURE = ['b1-09-culture']

export const B1_09_JOURNEY_IDS = ['b1-09-j1', 'b1-09-j2', 'b1-09-j3', 'b1-09-j4', 'b1-09-j5', 'b1-09-j6', 'b1-09-j7', 'b1-09-j8']
export const B1_09_CULTURE_IDS = ['b1-09-c1', 'b1-09-c2', 'b1-09-c3', 'b1-09-c4']

export const B1_09_QUESTIONS: Question[] = [
  // Bloque A · página 31: el viaje de L
  { id: 'b1-09-j1', topic: TR, kind: 'fix', prompt: "I didn't slept much on the bus.", options: ['I not slept much on the bus.', "I didn't sleeping much on the bus.", "I didn't sleep much on the bus."], answer: 2, tip: 'Negativa: didn\'t + verbo base.', tags: JOURNEY },
  { id: 'b1-09-j2', topic: TR, kind: 'fix', prompt: 'We goed to the valley last week.', options: ['We went to the valley last week.', 'We gone to the valley last week.', 'We did went to the valley last week.'], answer: 0, tip: 'go es irregular: went.', tags: JOURNEY },
  { id: 'b1-09-j3', topic: TR, kind: 'fix', prompt: 'I made a long travel to get here.', options: ['I made a long travelling to get here.', 'I made a long journey to get here.', 'I made a long journeys to get here.'], answer: 1, tip: 'travel no se cuenta: a long journey.', tags: JOURNEY },
  { id: 'b1-09-j4', topic: TR, prompt: 'The mountain view was ___. I took fifty photos.', options: ['exhausting', 'overcrowded', 'breathtaking'], answer: 2, tip: 'Muy bonito: breathtaking.', tags: JOURNEY },
  { id: 'b1-09-j5', topic: TR, prompt: 'The bus was ___. There were no seats, and people stood for hours.', options: ['overcrowded', 'breathtaking', 'peaceful'], answer: 0, tip: 'Sin asientos y llena de gente: overcrowded.', tags: JOURNEY },
  { id: 'b1-09-j6', topic: TR, kind: 'order', prompt: '¿Viste la cascada ayer?', options: ['Did', 'you', 'see', 'the', 'waterfall', 'yesterday?'], answer: 0, tip: 'Did + sujeto + verbo base.', tags: JOURNEY },
  { id: 'b1-09-j7', topic: TR, prompt: 'After nine days on the road, I was ___.', options: ['exhausting', 'exhausted', 'exhaust'], answer: 1, tip: '-ed = cómo te sientes.', tags: JOURNEY },
  {
    id: 'b1-09-j8',
    topic: TR,
    kind: 'listen',
    audio: "Last year I took a trip to the jungle. The journey was long and exhausting, but the waterfall was breathtaking. I didn't sleep for two nights, but it was unforgettable.",
    voice: 'male',
    prompt: '¿Cómo fue la cascada?',
    options: ['Abarrotada.', 'Agotadora.', 'Impresionante.'],
    answer: 2,
    tip: 'The waterfall was breathtaking.',
    tags: JOURNEY,
  },
  // Bloque A · la guía local: hablar con respeto de otra cultura
  { id: 'b1-09-c1', topic: CU, prompt: 'Could you ___ me more about this tradition?', options: ['say', 'tell', 'speak'], answer: 1, tip: 'tell me more.', tags: CULTURE },
  { id: 'b1-09-c2', topic: CU, prompt: 'Is it OK ___ I take a photo?', options: ['that', 'what', 'if'], answer: 2, tip: 'Is it OK if…?', tags: CULTURE },
  { id: 'b1-09-c3', topic: CU, kind: 'fix', prompt: 'Could you to explain this custom?', options: ['Could you explain this custom?', 'Could you explaining this custom?', 'Could you explains this custom?'], answer: 0, tip: 'Could you + verbo base.', tags: CULTURE },
  { id: 'b1-09-c4', topic: CU, kind: 'fix', prompt: 'Could you tell me why do you do that?', options: ['Could you tell me why does you do that?', 'Could you tell me why you do that?', 'Could you tell me why you doing that?'], answer: 1, tip: 'En una pregunta indirecta el orden es normal: why you do that.', tags: CULTURE },
  // Bloque B · el minijefe Stone Guardian (data/b1TempleStones.ts): la pasiva en todas sus formas
  { id: 'b1-09-g1', topic: PA, kind: 'fix', prompt: 'The temple was build a long time ago.', options: ['The temple was builded a long time ago.', 'The temple was built a long time ago.', 'The temple built was a long time ago.'], answer: 1, tip: 'build → built.', tags: GUARDIAN },
  { id: 'b1-09-g2', topic: PA, kind: 'fix', prompt: 'The stones is carved by hand.', options: ['The stones are carved by hand.', 'The stones be carved by hand.', 'The stones carved by hand are.'], answer: 0, tip: 'Plural: are + participio.', tags: GUARDIAN },
  { id: 'b1-09-g3', topic: PA, kind: 'fix', prompt: 'The door has opened by the guardian.', options: ['The door have been opened by the guardian.', 'The door has be opened by the guardian.', 'The door has been opened by the guardian.'], answer: 2, tip: 'Presente perfecto pasivo: has been + participio.', tags: GUARDIAN },
  { id: 'b1-09-g4', topic: PA, prompt: 'The words ___ written on the wall a thousand years ago.', options: ['was', 'were', 'are'], answer: 1, tip: 'Plural en pasado: were written.', tags: GUARDIAN },
  { id: 'b1-09-g5', topic: PA, prompt: 'Today, the temple ___ guarded by a stone statue.', options: ['has', 'are', 'is'], answer: 2, tip: 'Presente: is guarded.', tags: GUARDIAN },
  { id: 'b1-09-g6', topic: PA, prompt: 'The key ___ found yesterday.', options: ['is', 'was', 'has been'], answer: 1, tip: 'Yesterday: pasado, was found.', tags: GUARDIAN },
  { id: 'b1-09-g7', topic: PA, prompt: 'The door ___ opened by the right words soon.', options: ['will be', 'will', 'is'], answer: 0, tip: 'Futuro pasivo: will be + participio.', tags: GUARDIAN },
  { id: 'b1-09-g8', topic: PA, kind: 'order', prompt: 'El aparato fue hecho con estas palabras.', options: ['The', 'device', 'was', 'made', 'with', 'these', 'words.'], answer: 0, tip: 'was + participio + with.', tags: GUARDIAN },
  { id: 'b1-09-g9', topic: PA, kind: 'fix', prompt: 'The device will built by scientists.', options: ['The device will being built by scientists.', 'The device will be built by scientists.', 'The device will been built by scientists.'], answer: 1, tip: 'will be + participio.', tags: GUARDIAN },
  {
    id: 'b1-09-g10',
    topic: PA,
    kind: 'listen',
    audio: 'The temple was built a thousand years ago. It is guarded by a stone statue. The door has been closed for centuries, but it will be opened by the right words.',
    voice: 'female',
    prompt: '¿Qué abrirá la puerta?',
    options: ['Una llave de oro.', 'La fuerza.', 'Las palabras correctas.'],
    answer: 2,
    tip: 'It will be opened by the right words.',
    tags: GUARDIAN,
  },
]
