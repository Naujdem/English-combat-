import type { Question } from '../game/types'

/**
 * B2-05 · Voice Blackouts (presente). Bloque 1 (el puerto de noche y el Herald, data/b2VoiceBlackouts.ts): prácticas después de cada lección.
 *  - Verbo + to y verbo + objeto + to con Manuel (tarea b2-05-verbs-to, tema reporting-to-b2): b2-05-rt1…rt6.
 *  - Verbo + -ing, verbo + preposición + -ing y verbo + that (tarea b2-05-verbs-ing, tema reporting-ing-b2): b2-05-ri1…ri6.
 *  - Prensa seria contra tabloide y phrasal verbs (tarea b2-05-press, tema tabloid-b2): b2-05-tb1…tb6.
 * Las opciones incorrectas están mal en cualquier contexto. La posición de la respuesta correcta varía a propósito.
 */
const RT = 'reporting-to-b2' as const
const RI = 'reporting-ing-b2' as const
const TB = 'tabloid-b2' as const
const T_RT = ['b2-05-verbs-to']
const T_RI = ['b2-05-verbs-ing']
const T_TB = ['b2-05-press']

const ids = (p: string) => [1, 2, 3, 4, 5, 6].map((n) => `b2-05-${p}${n}`)
export const B2_05_VERBS_TO_IDS = ids('rt')
export const B2_05_VERBS_ING_IDS = ids('ri')
export const B2_05_PRESS_IDS = ids('tb')

export const B2_05_QUESTIONS: Question[] = [
  // Bloque 1 · Manuel (verbo + to, verbo + objeto + to)
  { id: 'b2-05-rt1', topic: RT, prompt: '"Don\'t worry, I\'ll help you." → He ___ to help us.', options: ['denied', 'promised', 'suggested'], answer: 1, tip: 'promise + to + verbo.', tags: T_RT },
  { id: 'b2-05-rt2', topic: RT, prompt: 'The captain refused ___ us an interview.', options: ['to give', 'giving', 'give'], answer: 0, tip: 'refuse + to + verbo: refused to give.', tags: T_RT },
  { id: 'b2-05-rt3', topic: RT, prompt: 'She warned the fishermen ___ after midnight.', options: ['to not sail', 'not sailing', 'not to sail'], answer: 2, tip: 'warn + persona + not to + verbo.', tags: T_RT },
  { id: 'b2-05-rt4', topic: RT, prompt: '"Remember to call me." → Manuel reminded ___ him.', options: ['me to call', 'to me call', 'me calling'], answer: 0, tip: 'remind + persona + to + verbo.', tags: T_RT },
  { id: 'b2-05-rt5', topic: RT, prompt: '"I\'ll call the police!" → She ___ to call the police.', options: ['apologised', 'admitted', 'threatened'], answer: 2, tip: 'Una amenaza = threaten + to.', tags: T_RT },
  {
    id: 'b2-05-rt6',
    topic: RT,
    kind: 'listen',
    audio: "Don't sail after midnight. And keep away from the north pier. Two of my sailors lost their voices there.",
    voice: 'female',
    prompt: 'What did the captain warn them not to do?',
    options: ['To sail after midnight.', 'To talk to the sailors.', 'To call the police.'],
    answer: 0,
    tip: "Don't sail after midnight → She warned them not to sail after midnight.",
    tags: T_RT,
  },
  // Bloque 1 · Manuel (verbo + -ing, verbo + preposición + -ing, verbo + that)
  { id: 'b2-05-ri1', topic: RI, prompt: '"I didn\'t make it up!" → Tomás denied ___ it up.', options: ['to make', 'making', 'make'], answer: 1, tip: 'deny + -ing: denied making.', tags: T_RI },
  { id: 'b2-05-ri2', topic: RI, prompt: '"Let\'s ask the captain." → Manuel suggested ___ the captain.', options: ['us to ask', 'to ask', 'asking'], answer: 2, tip: 'suggest + -ing (nunca suggest + persona + to).', tags: T_RI },
  { id: 'b2-05-ri3', topic: RI, prompt: '"You broke the lights!" → She accused them ___ the lights.', options: ['of breaking', 'for breaking', 'to break'], answer: 0, tip: 'accuse someone of + -ing.', tags: T_RI },
  { id: 'b2-05-ri4', topic: RI, prompt: 'I apologise ___ late.', options: ['for be', 'for being', 'to be'], answer: 1, tip: 'apologise for + -ing: for being late.', tags: T_RI },
  { id: 'b2-05-ri5', topic: RI, prompt: 'He insisted ___ for the coffee.', options: ['to pay', 'on paying', 'paying'], answer: 1, tip: 'insist on + -ing.', tags: T_RI },
  {
    id: 'b2-05-ri6',
    topic: RI,
    kind: 'listen',
    audio: "I didn't make it up! I couldn't speak for ten minutes. There was a purple light under the water.",
    voice: 'male',
    prompt: 'How long couldn\'t Tomás speak?',
    options: ['For an hour.', 'For two days.', 'For ten minutes.'],
    answer: 2,
    tip: "I couldn't speak for ten minutes.",
    tags: T_RI,
  },
  // Bloque 1 · Manuel en el Herald (prensa seria contra tabloide)
  { id: 'b2-05-tb1', topic: TB, prompt: 'A ___ is a newspaper with huge headlines, gossip and celebrity stories.', options: ['tabloid', 'broadsheet', 'source'], answer: 0, tip: 'Periódico sensacionalista = tabloid.', tags: T_TB },
  { id: 'b2-05-tb2', topic: TB, prompt: 'The journalist isn\'t sure, so she writes: "The man ___ stole the boat."', options: ['exclusive', 'allegedly', 'eyewitness'], answer: 1, tip: 'allegedly = eso dicen, pero no está probado.', tags: T_TB },
  { id: 'b2-05-tb3', topic: TB, prompt: 'An ___ is a person who saw something happen.', options: ['editor', 'headline', 'eyewitness'], answer: 2, tip: 'Testigo presencial = eyewitness.', tags: T_TB },
  { id: 'b2-05-tb4', topic: TB, prompt: 'Zoe ___ the ghost story. There was no ghost.', options: ['made up', 'turned out', 'looked into'], answer: 0, tip: 'make up = inventar.', tags: T_TB },
  { id: 'b2-05-tb5', topic: TB, prompt: 'The captain ___ the danger. She said it was "nothing serious".', options: ['looked into', 'played down', 'made up'], answer: 1, tip: 'play down = restarle importancia.', tags: T_TB },
  { id: 'b2-05-tb6', topic: TB, prompt: 'The rumour ___ to be false. Nobody saw a ghost.', options: ['made up', 'played down', 'turned out'], answer: 2, tip: 'turn out to be = resultar ser.', tags: T_TB },
]
