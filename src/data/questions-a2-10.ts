import type { Question } from '../game/types'

/**
 * A2-10 · Echoes Across Time (casa de Leo). Present Perfect: participios, ever/never, just/already/yet,
 * y contraste con Past Simple. La práctica guiada de Leo está en data/a2LeoHouse.ts (lista fija). Aquí solo los combates:
 * Eco del ático (fase 1 participios: a2-house-minion-part · fase 2 just/already/yet: a2-house-minion-jay) y
 * El devorador de recuerdos (fase 1 ever/never: a2-house-boss-ever · fase 2 just/already/yet: a2-house-boss-jay ·
 * fase 3 Present Perfect vs Past Simple: a2-house-boss-pps).
 */
const MP = ['a2-house-minion', 'a2-house-minion-part']
const MJ = ['a2-house-minion', 'a2-house-minion-jay']
const BE = ['a2-house-boss', 'a2-house-boss-ever']
const BJ = ['a2-house-boss', 'a2-house-boss-jay']
const BP = ['a2-house-boss', 'a2-house-boss-pps']
const TP = 'present-perfect' as const

export const A2_LEO_HOUSE_QUESTIONS: Question[] = [
  // ── Eco del ático · fase 1: participios ──
  { id: 'a2-10-m1', topic: TP, kind: 'fix', prompt: 'I have went to the attic.', options: ['I have gone to the attic.', 'I have go to the attic.', 'I has gone to the attic.'], answer: 0, tip: 'go → went → gone. Con have va el participio: gone.', tags: MP },
  { id: 'a2-10-m2', topic: TP, prompt: 'We have ___ (take) all the boxes upstairs.', options: ['taken', 'took', 'taked'], answer: 0, tip: 'take → took → taken.', tags: MP },
  { id: 'a2-10-m3', topic: TP, prompt: 'Leo has ___ (write) a list of clues.', options: ['written', 'wrote', 'writed'], answer: 0, tip: 'write → wrote → written.', tags: MP },
  { id: 'a2-10-m4', topic: TP, kind: 'order', prompt: 'Hemos visto esta caja antes.', options: ['We', 'have', 'seen', 'this', 'box', 'before.'], answer: 0, tip: 'have + seen (see → saw → seen).', tags: MP },

  // ── Eco del ático · fase 2: just / already / yet (tareas de la casa) ──
  { id: 'a2-10-m5', topic: TP, prompt: 'Leo has ___ gone upstairs. He was here a second ago.', options: ['just', 'yet', 'ever'], answer: 0, tip: 'just = hace muy poco.', tags: MJ },
  { id: 'a2-10-m6', topic: TP, prompt: 'Have you washed the dishes ___?', options: ['yet', 'just', 'ever'], answer: 0, tip: 'Pregunta sobre algo esperado: …yet al final.', tags: MJ },
  { id: 'a2-10-m7', topic: TP, kind: 'fix', prompt: "I haven't opened the chest already.", options: ["I haven't opened the chest yet.", "I haven't opened the chest just.", "I haven't open the chest yet."], answer: 0, tip: 'Negativo: …yet al final (no already).', tags: MJ },
  { id: 'a2-10-m8', topic: TP, kind: 'order', prompt: 'Ya he ordenado las cajas.', options: ['I', 'have', 'already', 'tidied', 'the', 'boxes.'], answer: 0, tip: 'already va entre have y el participio.', tags: MJ },

  // ── El devorador de recuerdos · fase 1: ever / never ──
  { id: 'a2-10-b1', topic: TP, prompt: 'No, I have ___ been to 2080.', options: ['never', 'ever', 'yet'], answer: 0, tip: 'Nunca: have never + participio.', tags: BE },
  { id: 'a2-10-b2', topic: TP, kind: 'fix', prompt: 'Have you ever see a talking wheel?', options: ['Have you ever seen a talking wheel?', 'Have you ever saw a talking wheel?', 'Has you ever seen a talking wheel?'], answer: 0, tip: 'Have you ever + participio: seen.', tags: BE },
  { id: 'a2-10-b3', topic: TP, prompt: '___ you ever ridden a horse?', options: ['Have', 'Has', 'Are'], answer: 0, tip: 'you → Have you ever…?', tags: BE },
  { id: 'a2-10-b4', topic: TP, kind: 'order', prompt: 'Nunca he olvidado esta historia.', options: ['I', 'have', 'never', 'forgotten', 'this', 'story.'], answer: 0, tip: 'have + never + participio (forget → forgotten).', tags: BE },

  // ── El devorador de recuerdos · fase 2: just / already / yet ──
  { id: 'a2-10-b5', topic: TP, prompt: 'The clock has ___ moved! Did you see it?', options: ['just', 'yet', 'ever'], answer: 0, tip: 'Acaba de pasar: has just + participio.', tags: BJ },
  { id: 'a2-10-b6', topic: TP, kind: 'fix', prompt: 'We have finished yet the board.', options: ['We have already finished the board.', 'We have yet finished the board.', 'We have already finish the board.'], answer: 0, tip: 'Afirmativo: already, entre have y el participio.', tags: BJ },
  { id: 'a2-10-b7', topic: TP, prompt: "Leo hasn't read the newspaper ___.", options: ['yet', 'already', 'just'], answer: 0, tip: 'Negativo: …yet al final.', tags: BJ },
  { id: 'a2-10-b8', topic: TP, kind: 'order', prompt: 'Acabamos de encontrar una pista.', options: ['We', 'have', 'just', 'found', 'a', 'clue.'], answer: 0, tip: 'have + just + participio (find → found).', tags: BJ },

  // ── El devorador de recuerdos · fase 3: Present Perfect vs Past Simple ──
  { id: 'a2-10-b9', topic: TP, prompt: 'We ___ to the mill yesterday.', options: ['went', 'have gone', 'have went'], answer: 0, tip: 'Con un momento terminado (yesterday): Past Simple.', tags: BP },
  { id: 'a2-10-b10', topic: TP, prompt: 'I ___ this newspaper before. It is very interesting.', options: ['have read', 'has read', 'have readed'], answer: 0, tip: 'Experiencia sin fecha: I have read (read → read → read).', tags: BP },
  { id: 'a2-10-b11', topic: TP, kind: 'fix', prompt: 'I have seen the cart in 1996.', options: ['I saw the cart in 1996.', 'I have saw the cart in 1996.', 'I seen the cart in 1996.'], answer: 0, tip: 'Con una fecha (in 1996): Past Simple → saw.', tags: BP },
  { id: 'a2-10-b12', topic: TP, prompt: 'The light ___ three machines so far.', options: ['has stopped', 'have stopped', 'is stopped'], answer: 0, tip: 'Hasta ahora (so far), sin fecha: the light (it) + has + participio.', tags: BP },
]
