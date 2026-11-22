import type { Question } from '../game/types'

/**
 * B2-02 · The Herald (presente). Bloque 1 (la redacción, data/b2Herald.ts): prácticas después de cada lección.
 *  - Past perfect continuous (tarea b2-02-ppc, tema ppc-b2): b2-02-pp1…pp6.
 *  - Preparar la entrevista (tarea b2-02-interview-prep, tema interview-b2): b2-02-iv1…iv6.
 *  - Guía de estilo con Priya (tarea b2-02-style, tema inclusive-b2): b2-02-in1…in6.
 *  - Frases de reunión (tarea b2-02-meeting, tema meetings-b2): b2-02-mt1…mt6.
 *  - Verbo + objeto + to; -ing o to (tarea b2-02-patterns, tema verb-to-ing-b2): b2-02-vp1…vp6.
 * Las opciones incorrectas están mal en cualquier contexto. La posición de la respuesta correcta varía a propósito.
 */
const PP = 'ppc-b2' as const
const IV = 'interview-b2' as const
const IN = 'inclusive-b2' as const
const MT = 'meetings-b2' as const
const VP = 'verb-to-ing-b2' as const
const T_PP = ['b2-02-ppc']
const T_IV = ['b2-02-interview-prep']
const T_IN = ['b2-02-style']
const T_MT = ['b2-02-meeting']
const T_VP = ['b2-02-patterns']

const ids = (p: string) => [1, 2, 3, 4, 5, 6].map((n) => `b2-02-${p}${n}`)
export const B2_02_PPC_IDS = ids('pp')
export const B2_02_INTERVIEW_IDS = ids('iv')
export const B2_02_STYLE_IDS = ids('in')
export const B2_02_MEETING_IDS = ids('mt')
export const B2_02_PATTERNS_IDS = ids('vp')

export const B2_02_QUESTIONS: Question[] = [
  // Bloque 1 · Manuel (past perfect continuous)
  { id: 'b2-02-pp1', topic: PP, prompt: 'I had been ___ at Lumen Paws for months when I got the job.', options: ['volunteering', 'volunteer', 'volunteered'], answer: 0, tip: 'had been + -ing.', tags: T_PP },
  { id: 'b2-02-pp2', topic: PP, prompt: 'Her eyes were red. She ___ crying.', options: ['has been', 'was been', 'had been'], answer: 2, tip: 'Evidencia en el pasado → had been + -ing.', tags: T_PP },
  { id: 'b2-02-pp3', topic: PP, prompt: 'How long ___ you been living there when you moved?', options: ['have', 'had', 'did'], answer: 1, tip: 'Antes de otro momento pasado (when you moved) → had you been living.', tags: T_PP },
  { id: 'b2-02-pp4', topic: PP, prompt: 'By noon I ___ three articles.', options: ['had written', 'had been writing', 'had been write'], answer: 0, tip: 'Un resultado con número (three articles) → past perfect simple.', tags: T_PP },
  { id: 'b2-02-pp5', topic: PP, kind: 'fix', prompt: 'By the time I arrived, they had been finish the article.', options: ['By the time I arrived, they had been finishing the article.', 'By the time I arrived, they had finished the article.', 'By the time I arrived, they have finished the article.'], answer: 1, tip: 'Ya estaba terminado (un resultado) → had finished.', tags: T_PP },
  { id: 'b2-02-pp6', topic: PP, prompt: 'I ___ Leo for years before we went to Lumen Bay.', options: ['had been knowing', 'had known', 'have been knowing'], answer: 1, tip: 'know es verbo de estado: siempre simple. had known.', tags: T_PP },

  // Bloque 1 · Manuel (preparar la entrevista)
  { id: 'b2-02-iv1', topic: IV, prompt: 'Tell me about a time you had to deal ___ pressure.', options: ['of', 'about', 'with'], answer: 2, tip: 'deal with + algo.', tags: T_IV },
  { id: 'b2-02-iv2', topic: IV, prompt: 'You can always count on her. She is very ___.', options: ['reliable', 'relying', 'rely'], answer: 0, tip: 'reliable = confiable.', tags: T_IV },
  { id: 'b2-02-iv3', topic: IV, prompt: 'I stay calm with a deadline. I work well ___ pressure.', options: ['on', 'under', 'below'], answer: 1, tip: 'La expresión fija es "under pressure".', tags: T_IV },
  { id: 'b2-02-iv4', topic: IV, prompt: 'At first I struggled ___ the accent.', options: ['understood', 'to understand', 'understand'], answer: 1, tip: 'struggle to + verbo.', tags: T_IV },
  { id: 'b2-02-iv5', topic: IV, kind: 'fix', prompt: 'I overcame with my fear of speaking in public.', options: ['I overcame my fear of speaking in public.', 'I overcame of my fear of speaking in public.', 'I overcome with my fear of speaking in public.'], answer: 0, tip: 'overcome no lleva preposición.', tags: T_IV },
  { id: 'b2-02-iv6', topic: IV, prompt: 'She notices every small mistake. She has great attention ___ detail.', options: ['for', 'at', 'to'], answer: 2, tip: 'La expresión fija es "attention to detail".', tags: T_IV },

  // Bloque 1 · Priya (guía de estilo: lenguaje inclusivo)
  { id: 'b2-02-in1', topic: IN, prompt: 'A reader called. ___ said the story was wrong.', options: ['They', 'It', 'He or it'], answer: 0, tip: 'Género desconocido → singular they.', tags: T_IN },
  { id: 'b2-02-in2', topic: IN, prompt: 'Someone left a message. They ___ very angry.', options: ['was', 'were', 'is'], answer: 1, tip: 'Con they en singular el verbo va en plural: they were.', tags: T_IN },
  { id: 'b2-02-in3', topic: IN, prompt: 'Two ___ arrived at the port in ten minutes.', options: ['fire men', 'firefighters', 'firemans'], answer: 1, tip: 'Palabra neutra: firefighters.', tags: T_IN },
  { id: 'b2-02-in4', topic: IN, prompt: 'Every student should bring ___ notebook.', options: ['their', 'they', 'them'], answer: 0, tip: 'Posesivo neutro: their.', tags: T_IN },
  { id: 'b2-02-in5', topic: IN, prompt: 'Viktor is the ___ of the editorial meeting.', options: ['chairperson', 'chairing', 'chairs'], answer: 0, tip: 'Palabra neutra para quien dirige: chairperson (o chair).', tags: T_IN },
  { id: 'b2-02-in6', topic: IN, kind: 'fix', prompt: 'A police officer stopped the car. They was very polite.', options: ['A police officer stopped the car. They is very polite.', 'A police officer stopped the car. They were very polite.', 'A police officer stopped the car. Them were very polite.'], answer: 1, tip: 'they + were, también en singular.', tags: T_IN },

  // Bloque 1 · Manuel (frases de reunión)
  { id: 'b2-02-mt1', topic: MT, prompt: 'How about ___ the port tomorrow?', options: ['call', 'calling', 'to call'], answer: 1, tip: 'How about + -ing.', tags: T_MT },
  { id: 'b2-02-mt2', topic: MT, prompt: 'Could you ___ that by me again?', options: ['run', 'go', 'take'], answer: 0, tip: 'run something by someone = explicárselo (otra vez).', tags: T_MT },
  { id: 'b2-02-mt3', topic: MT, prompt: 'It might be ___ checking the photos.', options: ['worthy', 'worth', 'worthing'], answer: 1, tip: 'It might be worth + -ing.', tags: T_MT },
  { id: 'b2-02-mt4', topic: MT, prompt: 'What exactly do you ___ by "blackout"?', options: ['say', 'mean', 'tell'], answer: 1, tip: 'What do you mean by…? = ¿qué quieres decir con…?', tags: T_MT },
  { id: 'b2-02-mt5', topic: MT, kind: 'fix', prompt: 'Could you repeat me that?', options: ['Could you repeat to me that?', 'Could you me repeat that?', 'Could you repeat that?'], answer: 2, tip: 'repeat no lleva "me": Could you repeat that?', tags: T_MT },
  { id: 'b2-02-mt6', topic: MT, prompt: 'Priya, would you like to ___ anything?', options: ['add', 'adding', 'added'], answer: 0, tip: 'would like to + verbo base: add.', tags: T_MT },

  // Bloque 1 · Manuel (verbo + objeto + to; -ing o to)
  { id: 'b2-02-vp1', topic: VP, prompt: 'She asked me ___ the sources.', options: ['checking', 'to check', 'check'], answer: 1, tip: 'ask + objeto + to.', tags: T_VP },
  { id: 'b2-02-vp2', topic: VP, kind: 'fix', prompt: 'I want that you check it.', options: ['I want you check it.', 'I want you to check it.', 'I want you checking it.'], answer: 1, tip: 'want + objeto + to: I want you to check it.', tags: T_VP },
  { id: 'b2-02-vp3', topic: VP, prompt: 'He made me ___ the whole article.', options: ['rewrite', 'to rewrite', 'rewriting'], answer: 0, tip: 'make + objeto + verbo sin to.', tags: T_VP },
  { id: 'b2-02-vp4', topic: VP, prompt: '___ to check the date before you publish.', options: ['Remembering', 'Remember', 'Remembers'], answer: 1, tip: 'Remember to = no olvides hacerlo (antes).', tags: T_VP },
  { id: 'b2-02-vp5', topic: VP, prompt: 'He stopped ___ the phone. It was his mother.', options: ['answer', 'answering', 'to answer'], answer: 2, tip: 'Se detuvo para contestar → stop to.', tags: T_VP },
  { id: 'b2-02-vp6', topic: VP, kind: 'fix', prompt: 'She suggested me to call him.', options: ['She suggested calling him.', 'She suggested to me call him.', 'She suggested me calling him.'], answer: 0, tip: 'suggest + -ing (o suggest that I call), nunca suggest me to.', tags: T_VP },
]
