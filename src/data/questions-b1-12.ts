import type { Question } from '../game/types'

/**
 * B1-12 · Old Friends (presente). Bloque A (la casa de los abuelos, data/b1HostHouse.ts):
 *  - Práctica de verbos de estado y de acción con Maya (tarea b1-12-verbs, tema state-verbs-b1): b1-12-sv1…sv8.
 * Bloque B (el jardín, data/b1HostGarden.ts):
 *  - Leo: remember / forget / remind (tarea b1-12-leo-lesson, tema memory-verbs-b1): b1-12-mv1…mv8.
 *  - Maya: relaciones y personalidad (tarea b1-12-maya-lesson, tema relationships-b1): b1-12-rl1…rl8.
 *  - La persona especial: empatía (tarea b1-12-special-lesson, tema empathy-b1): b1-12-em1…em6.
 * La posición de la respuesta correcta varía a propósito.
 */
const SV = 'state-verbs-b1' as const
const VERBS = ['b1-12-verbs']
const MV = 'memory-verbs-b1' as const
const LEO = ['b1-12-leo']
const RL = 'relationships-b1' as const
const MAYA = ['b1-12-maya']
const EM = 'empathy-b1' as const
const SPECIAL = ['b1-12-special']

export const B1_12_VERBS_IDS = ['b1-12-sv1', 'b1-12-sv2', 'b1-12-sv3', 'b1-12-sv4', 'b1-12-sv5', 'b1-12-sv6', 'b1-12-sv7', 'b1-12-sv8']

export const B1_12_MEMORY_IDS = ['b1-12-mv1', 'b1-12-mv2', 'b1-12-mv3', 'b1-12-mv4', 'b1-12-mv5', 'b1-12-mv6', 'b1-12-mv7', 'b1-12-mv8']
export const B1_12_RELATIONSHIPS_IDS = ['b1-12-rl1', 'b1-12-rl2', 'b1-12-rl3', 'b1-12-rl4', 'b1-12-rl5', 'b1-12-rl6', 'b1-12-rl7', 'b1-12-rl8']
export const B1_12_EMPATHY_IDS = ['b1-12-em1', 'b1-12-em2', 'b1-12-em3', 'b1-12-em4', 'b1-12-em5', 'b1-12-em6']

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
  // Bloque B · Leo (remember / forget / remind)
  { id: 'b1-12-mv1', topic: MV, kind: 'fix', prompt: 'I remember to meet you at the airport last year.', options: ['I remember meeting you at the airport last year.', 'I remember meet you at the airport last year.', 'I remembered to meeting you at the airport last year.'], answer: 0, tip: 'Recuerdo del pasado: remember + -ing.', tags: LEO },
  { id: 'b1-12-mv2', topic: MV, kind: 'fix', prompt: 'Remember closing the window before you leave!', options: ['Remember close the window before you leave!', 'Remember to close the window before you leave!', 'Remembering to close the window before you leave!'], answer: 1, tip: 'Algo que debes hacer: remember + to + verbo.', tags: LEO },
  { id: 'b1-12-mv3', topic: MV, prompt: "I forgot ___ my keys, so I couldn't open the door.", options: ['bringing', 'bring', 'to bring'], answer: 2, tip: 'No lo hice: forget + to + verbo.', tags: LEO },
  { id: 'b1-12-mv4', topic: MV, prompt: "I'll never forget ___ the sea for the first time.", options: ['to see', 'seeing', 'see'], answer: 1, tip: 'Tengo el recuerdo: forget + -ing.', tags: LEO },
  { id: 'b1-12-mv5', topic: MV, prompt: 'Please ___ me to call Mom tonight.', options: ['remind', 'remember', 'forget'], answer: 0, tip: 'remind someone to do something.', tags: LEO },
  { id: 'b1-12-mv6', topic: MV, prompt: 'This song ___ me of my grandmother.', options: ['remembers', 'forgets', 'reminds'], answer: 2, tip: 'remind someone of something.', tags: LEO },
  { id: 'b1-12-mv7', topic: MV, kind: 'order', prompt: 'Recuerdo haberte visto en el aeropuerto.', options: ['I', 'remember', 'seeing', 'you', 'at', 'the', 'airport.'], answer: 0, tip: 'remember + -ing.', tags: LEO },
  {
    id: 'b1-12-mv8',
    topic: MV,
    kind: 'listen',
    audio: 'I remember my first day in the city. I forgot to buy a map, and I got lost. Now my sister always reminds me to carry one.',
    voice: 'male',
    prompt: '¿Qué olvidó comprar?',
    options: ['Un mapa.', 'Un billete.', 'Comida.'],
    answer: 0,
    tip: 'I forgot to buy a map.',
    tags: LEO,
  },
  // Bloque B · Maya (relaciones y personalidad)
  { id: 'b1-12-rl1', topic: RL, kind: 'fix', prompt: 'I get on with very well my cousin.', options: ['I get on very well with my cousin.', 'I get very well on my cousin.', 'I get on very well my cousin.'], answer: 0, tip: 'get on (very) well with someone.', tags: MAYA },
  { id: 'b1-12-rl2', topic: RL, kind: 'fix', prompt: 'They fall out last week, but now they are friends again.', options: ['They have fallen out last week, but now they are friends again.', 'They falling out last week, but now they are friends again.', 'They fell out last week, but now they are friends again.'], answer: 2, tip: 'Pasado simple: fell out.', tags: MAYA },
  { id: 'b1-12-rl3', topic: RL, prompt: 'She never lies. She is very ___.', options: ['selfish', 'loyal', 'stubborn'], answer: 1, tip: 'loyal = fiel.', tags: MAYA },
  { id: 'b1-12-rl4', topic: RL, prompt: "He doesn't listen to anyone. He is very ___.", options: ['stubborn', 'caring', 'reliable'], answer: 0, tip: 'stubborn = terco.', tags: MAYA },
  { id: 'b1-12-rl5', topic: RL, prompt: 'We had an argument, but we said sorry and ___ up.', options: ['made', 'got', 'fell'], answer: 0, tip: 'make up = hacer las paces.', tags: MAYA },
  { id: 'b1-12-rl6', topic: RL, kind: 'order', prompt: 'Me llevo muy bien con mi abuela.', options: ['I', 'get', 'on', 'well', 'with', 'my', 'grandmother.'], answer: 0, tip: 'get on well with someone.', tags: MAYA },
  {
    id: 'b1-12-rl7',
    topic: RL,
    kind: 'listen',
    audio: "My brother and I fell out last summer. We didn't speak for a month. Then he called me, we said sorry, and we made up. He is a very caring person.",
    voice: 'female',
    prompt: '¿Qué pasó al final?',
    options: ['Dejaron de hablarse.', 'Se mudaron.', 'Hicieron las paces.'],
    answer: 2,
    tip: 'We said sorry, and we made up.',
    tags: MAYA,
  },
  { id: 'b1-12-rl8', topic: RL, prompt: "A 'close friend' es un amigo ___.", options: ['lejano', 'cercano', 'nuevo'], answer: 1, tip: 'close = cercano.', tags: MAYA },
  // Bloque B · la persona especial (empatía)
  { id: 'b1-12-em1', topic: EM, prompt: "My friend lost her job. I say: 'I'm ___ to hear that.'", options: ['glad', 'sorry', 'happy'], answer: 1, tip: "I'm sorry to hear that.", tags: SPECIAL },
  { id: 'b1-12-em2', topic: EM, prompt: "'I failed my exam.' — 'That must be ___. Do you want to talk about it?'", options: ['hard', 'funny', 'easy'], answer: 0, tip: 'That must be hard.', tags: SPECIAL },
  { id: 'b1-12-em3', topic: EM, prompt: "'I'm here ___ you. Call me anytime.'", options: ['to', 'for', 'at'], answer: 1, tip: "I'm here for you.", tags: SPECIAL },
  { id: 'b1-12-em4', topic: EM, kind: 'fix', prompt: 'I am sorry for hear that.', options: ["I'm sorry to hear that.", "I'm sorry of hear that.", "I'm sorry hearing that."], answer: 0, tip: 'sorry to hear that.', tags: SPECIAL },
  { id: 'b1-12-em5', topic: EM, kind: 'order', prompt: 'Avísame si necesitas algo.', options: ['Let', 'me', 'know', 'if', 'you', 'need', 'anything.'], answer: 0, tip: 'Let me know if you need anything.', tags: SPECIAL },
  {
    id: 'b1-12-em6',
    topic: EM,
    kind: 'listen',
    audio: "My friend told me about his problem. I said, 'That must be hard. I'm here for you.' He said, 'Thank you for listening. It means a lot to me.'",
    voice: 'female',
    prompt: '¿Qué le dijo el amigo?',
    options: ['Que no importaba.', 'Que significaba mucho para él.', 'Que estaba enojado.'],
    answer: 1,
    tip: 'It means a lot to me.',
    tags: SPECIAL,
  },
]
