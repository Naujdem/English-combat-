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

const GULL = ['b2-05-gull']
const BOSS_TO = ['b2-05-boss-to']
const BOSS_ING = ['b2-05-boss-ing']

/** Bloque 2 · combate: Rumour Gulls (b2-05-gull) y The Tabloid (fase 1: b2-05-boss-to · fase 2: b2-05-boss-ing) */
export const B2_05_COMBAT_QUESTIONS: Question[] = [
  // Rumour Gulls (esbirros), con repaso de los cambios de tiempo del reported speech de B1
  { id: 'b2-05-gl1', topic: RI, kind: 'fix', prompt: 'He denied to take the money.', options: ['He denied taking the money.', 'He denied take the money.', 'He denied of taking the money.'], answer: 0, tip: 'deny + -ing: denied taking.', tags: GULL },
  { id: 'b2-05-gl2', topic: RI, kind: 'fix', prompt: 'She suggested us to leave.', options: ['She suggested to leave us.', 'She suggested leaving.', 'She suggested us leaving to.'], answer: 1, tip: 'suggest + -ing. Nunca suggest + persona + to.', tags: GULL },
  { id: 'b2-05-gl3', topic: RI, kind: 'fix', prompt: 'They accused him for stealing the boat.', options: ['They accused him to steal the boat.', 'They accused him stealing the boat.', 'They accused him of stealing the boat.'], answer: 2, tip: 'accuse someone of + -ing.', tags: GULL },
  { id: 'b2-05-gl4', topic: RT, prompt: '"I\'ll take you home in my boat." → Tomás offered ___ us home.', options: ['taking', 'to take', 'take'], answer: 1, tip: 'offer + to + verbo.', tags: GULL },
  { id: 'b2-05-gl5', topic: RT, prompt: '"I am scared." → Zoe said that she ___ scared.', options: ['is', 'was', 'were'], answer: 1, tip: 'Repaso de B1: am → was en estilo indirecto.', tags: GULL },
  { id: 'b2-05-gl6', topic: RT, prompt: '"We will check the lights." → They promised that they ___ check the lights.', options: ['would', 'will be', 'are'], answer: 0, tip: 'Repaso de B1: will → would en estilo indirecto.', tags: GULL },

  // The Tabloid, fase 1 (verbo + to, verbo + objeto + to)
  { id: 'b2-05-tt1', topic: RT, kind: 'fix', prompt: 'The captain refused helping us.', options: ['The captain refused to help us.', 'The captain refused us helping.', 'The captain refused help us.'], answer: 0, tip: 'refuse + to + verbo.', tags: BOSS_TO },
  { id: 'b2-05-tt2', topic: RT, kind: 'fix', prompt: 'She warned us to not go near the pier.', options: ['She warned us not going near the pier.', 'She warned to us not to go near the pier.', 'She warned us not to go near the pier.'], answer: 2, tip: 'La negación va antes de to: not to go.', tags: BOSS_TO },
  { id: 'b2-05-tt3', topic: RT, prompt: 'Manuel persuaded the captain ___ to us.', options: ['talking', 'to talk', 'talk'], answer: 1, tip: 'persuade + persona + to + verbo.', tags: BOSS_TO },
  { id: 'b2-05-tt4', topic: RT, prompt: '"Please, please, check your facts!" → Manuel ___ Zoe to check her facts.', options: ['urged', 'denied', 'apologised'], answer: 0, tip: 'Pedir con mucha fuerza = urge + persona + to.', tags: BOSS_TO },
  { id: 'b2-05-tt5', topic: RT, prompt: '"OK, we\'ll close the north pier." → The port ___ to close the north pier.', options: ['accused', 'agreed', 'admitted'], answer: 1, tip: 'Aceptar hacer algo = agree + to.', tags: BOSS_TO },
  { id: 'b2-05-tt6', topic: RT, kind: 'order', prompt: 'Nos recordó cerrar la puerta con llave.', options: ['She', 'reminded', 'us', 'to', 'lock', 'the', 'door.'], answer: 0, tip: 'remind + persona + to + verbo.', tags: BOSS_TO },

  // The Tabloid, fase 2 (verbo + -ing, verbo + preposición + -ing, prensa; anuncios del puerto en escucha)
  { id: 'b2-05-ti1', topic: RI, kind: 'fix', prompt: 'She insisted to pay for the coffee.', options: ['She insisted paying for the coffee.', 'She insisted on paying for the coffee.', 'She insisted for paying the coffee.'], answer: 1, tip: 'insist on + -ing.', tags: BOSS_ING },
  { id: 'b2-05-ti2', topic: RI, kind: 'fix', prompt: 'He admitted to steal it.', options: ['He admitted stealing it.', 'He admitted steal it.', 'He admitted of stealing it.'], answer: 0, tip: 'admit + -ing: admitted stealing.', tags: BOSS_ING },
  { id: 'b2-05-ti3', topic: RI, kind: 'fix', prompt: 'I apologise for be late.', options: ['I apologise to be late.', 'I apologise for late.', 'I apologise for being late.'], answer: 2, tip: 'Después de una preposición, -ing: for being.', tags: BOSS_ING },
  { id: 'b2-05-ti4', topic: RI, prompt: 'The fishermen blamed the ferry ___ the noise.', options: ['of making', 'for making', 'to make'], answer: 1, tip: 'blame someone for + -ing.', tags: BOSS_ING },
  {
    id: 'b2-05-ti5',
    topic: TB,
    kind: 'listen',
    audio: 'Attention, please. The north pier is closed tonight. The night ferry will leave from pier two at eleven o\'clock.',
    voice: 'female',
    prompt: 'Where will the night ferry leave from?',
    options: ['From the north pier.', 'From pier two.', 'From the fishermen\'s pier.'],
    answer: 1,
    tip: 'The night ferry will leave from pier two.',
    tags: BOSS_ING,
  },
  {
    id: 'b2-05-ti6',
    topic: TB,
    kind: 'listen',
    audio: 'This is the Herald news update. Allegedly, three people lost their voices near the port. The police are looking into it.',
    voice: 'male',
    prompt: 'What are the police doing?',
    options: ['They are investigating.', 'They are closing the Herald.', 'They are playing it down.'],
    answer: 0,
    tip: 'look into = investigar: The police are looking into it.',
    tags: BOSS_ING,
  },
]
