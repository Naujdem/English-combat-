import type { Question } from '../game/types'

/**
 * Misión secundaria "Make a Wish": preguntas del duelo amistoso con Maya.
 * Fase 1 (a2-wish-pref): would like / would rather / would prefer / I hope.
 * Fase 2 (a2-wish-if): primer condicional (If + presente, will + verbo).
 * Fase 3 (a2-wish-meet): relaciones y cómo se conoció la gente, en pasado (Busuu A2 cap. 4).
 */
type L = Omit<Question, 'kind'>
const L = (q: L): Question => ({ ...q, kind: 'listen' })

const PREF = ['a2-wish-duel', 'a2-wish-pref']
const IF = ['a2-wish-duel', 'a2-wish-if']
const MEET = ['a2-wish-duel', 'a2-wish-meet']
const TP = 'wishes-conditional' as const

export const A2_PARTY_QUESTIONS: Question[] = [
  // ── Fase 1: preferencias y deseos ──
  { id: 'a2-s3-r1', topic: TP, prompt: 'Would you like ___ lemonade?', options: ['some', 'to', 'any of'], answer: 0, tip: 'Para ofrecer: Would you like some + cosa?', tags: PREF },
  { id: 'a2-s3-r2', topic: TP, prompt: "Would you rather dance or sing? — I'd rather ___.", options: ['dance', 'to dance', 'dancing'], answer: 0, tip: "I'd rather + verbo tal cual: dance.", tags: PREF },
  { id: 'a2-s3-r3', topic: TP, kind: 'fix', prompt: "I'd rather to eat outside.", options: ["I'd rather eat outside.", "I'd rather eating outside.", "I'd rathers eat outside."], answer: 0, tip: "Después de I'd rather no va to: I'd rather eat.", tags: PREF },
  { id: 'a2-s3-r4', topic: TP, kind: 'fix', prompt: 'I would like play a game.', options: ['I would like to play a game.', 'I would like playing a game.', 'I would likes to play a game.'], answer: 0, tip: 'would like + to + verbo: to play.', tags: PREF },
  { id: 'a2-s3-r5', topic: TP, prompt: "Pizza or pasta? — I'd ___ pizza, please.", options: ['prefer', 'rather', 'like to'], answer: 0, tip: "Con una cosa (sin verbo): I'd prefer pizza.", tags: PREF },
  { id: 'a2-s3-r6', topic: TP, prompt: 'I hope you ___ your present.', options: ['like', 'to like', 'liking'], answer: 0, tip: 'I hope + you + verbo: you like.', tags: PREF },
  { id: 'a2-s3-r7', topic: TP, kind: 'order', prompt: 'Me gustaría bailar con todos.', options: ["I'd", 'like', 'to', 'dance', 'with', 'everybody.'], answer: 0, tip: "I'd like + to + verbo.", tags: PREF },
  { id: 'a2-s3-r8', topic: TP, prompt: 'I hope ___ visit London next year.', options: ['to', 'for', 'that to'], answer: 0, tip: 'Un deseo para ti mismo: I hope to + verbo.', tags: PREF },

  // ── Fase 2: primer condicional ──
  { id: 'a2-s3-c1', topic: TP, prompt: "If it ___ sunny, we'll eat in the garden.", options: ['is', 'will be', 'be'], answer: 0, tip: 'Después de if va el presente: is (nunca will be).', tags: IF },
  { id: 'a2-s3-c2', topic: TP, prompt: 'If you blow out the candles, your wish ___ come true.', options: ['will', 'is', 'does'], answer: 0, tip: 'El resultado: will + verbo.', tags: IF },
  { id: 'a2-s3-c3', topic: TP, kind: 'fix', prompt: "If we will hurry, we'll finish on time.", options: ["If we hurry, we'll finish on time.", "If we hurries, we'll finish on time.", "If we hurry, we finish will on time."], answer: 0, tip: 'Después de if: presente (we hurry), sin will.', tags: IF },
  { id: 'a2-s3-c4', topic: TP, prompt: "If Leo ___ the cake, he'll be very sad.", options: ['drops', 'drop', 'will drop'], answer: 0, tip: 'Leo (he) + presente con -s: drops.', tags: IF },
  { id: 'a2-s3-c5', topic: TP, prompt: "If you don't come, the party ___ be fun.", options: ["won't", "doesn't", "isn't"], answer: 0, tip: "Resultado negativo: won't + verbo.", tags: IF },
  { id: 'a2-s3-c6', topic: TP, kind: 'order', prompt: 'Si llueve, nos quedaremos adentro.', options: ['If', 'it', 'rains,', "we'll", 'stay', 'inside.'], answer: 0, tip: "If + presente, we'll + verbo.", tags: IF },
  { id: 'a2-s3-c7', topic: TP, prompt: 'What will you do if the music ___?', options: ['stops', 'will stop', 'stop'], answer: 0, tip: 'Después de if: presente con -s (the music → stops).', tags: IF },
  { id: 'a2-s3-c8', topic: TP, kind: 'order', prompt: 'Si no nos escondemos, verá la sorpresa.', options: ['If', 'we', "don't", 'hide,', 'they', 'will', 'see', 'the', 'surprise.'], answer: 0, tip: "If + don't + verbo, will + verbo.", tags: IF },
  { id: 'a2-s3-c9', topic: TP, kind: 'fix', prompt: 'If the guests arrive, we turn will off the lights.', options: ['If the guests arrive, we will turn off the lights.', 'If the guests will arrive, we turn off the lights.', 'If the guests arrives, we will turn off the lights.'], answer: 0, tip: 'If + presente (arrive), will + verbo (will turn off).', tags: IF },

  // ── Fase 3: relaciones y cómo se conoció la gente (pasado) ──
  { id: 'a2-s3-m1', topic: 'past-simple', prompt: 'How did you two ___? — At school.', options: ['meet', 'met', 'meeting'], answer: 0, tip: 'Después de did, el verbo va en base: meet.', tags: MEET },
  { id: 'a2-s3-m2', topic: 'past-simple', prompt: 'My grandparents ___ at a dance in 1970.', options: ['met', 'meet', 'meeted'], answer: 0, tip: 'meet es irregular: met.', tags: MEET },
  { id: 'a2-s3-m3', topic: 'past-simple', prompt: 'They ___ married two years later.', options: ['got', 'getted', 'get'], answer: 0, tip: 'get married (casarse) · get → got.', tags: MEET },
  { id: 'a2-s3-m4', topic: 'past-simple', kind: 'fix', prompt: 'When did they got married?', options: ['When did they get married?', 'When they got married?', 'When did they getting married?'], answer: 0, tip: 'did + verbo base: When did they get married?', tags: MEET },
  { id: 'a2-s3-m5', topic: 'past-simple', prompt: 'Is your sister married? — No, she is ___.', options: ['single', 'alone', 'only'], answer: 0, tip: 'No casado(a) = single.', tags: MEET },
  { id: 'a2-s3-m6', topic: 'past-simple', kind: 'order', prompt: 'Nos conocimos en la biblioteca.', options: ['We', 'met', 'in', 'the', 'library.'], answer: 0, tip: 'meet → met (pasado irregular).', tags: MEET },
  { id: 'a2-s3-m7', topic: 'past-simple', prompt: 'We ___ friends very quickly.', options: ['became', 'become', 'becomed'], answer: 0, tip: 'become es irregular: became.', tags: MEET },

  // ── Escucha real ──
  L({ id: 'a2-s3-ls1', topic: TP, audio: "I'd rather play games than dance. And I'd like some chocolate cake, please.", voice: 'female', prompt: 'What would she like?', options: ['Some chocolate cake.', 'Some lemonade.', 'Some pizza.'], answer: 0, tip: 'Dijo: "I\'d like some chocolate cake".', tags: PREF }),
  L({ id: 'a2-s3-ls2', topic: TP, audio: "If it rains, we'll have the party in the living room. If it's sunny, we'll stay in the garden.", voice: 'male', prompt: 'Where will the party be if it rains?', options: ['In the living room.', 'In the garden.', 'In the kitchen.'], answer: 0, tip: 'Dijo: "If it rains, we\'ll have the party in the living room".', tags: IF }),
  L({ id: 'a2-s3-ls3', topic: 'past-simple', audio: 'My parents met at university. They got married five years later.', voice: 'female', prompt: 'When did her parents get married?', options: ['Five years later.', 'Two years later.', 'At university.'], answer: 0, tip: 'Dijo: "They got married five years later".', tags: MEET }),
]
