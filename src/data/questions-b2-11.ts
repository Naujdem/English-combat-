import type { Question } from '../game/types'

/**
 * B2-11 · Who Is G? (presente). Bloque 1 (el archivo del Herald y la noche de cine, data/b2WhoIsG.ts): prácticas después de cada lección.
 *  - Preguntas indirectas y en estilo indirecto (tarea b2-11-indirect, tema indirect-b2): b2-11-in1…in6.
 *  - Hablar de películas y series (tarea b2-11-film, tema film-b2): b2-11-fm1…fm6 (2 de escucha: Marisol y Maya).
 *  - Tiempos narrativos combinados (tarea b2-11-narrative, tema narrative-b2): b2-11-nt1…nt6.
 * Las opciones incorrectas están mal en cualquier contexto. La posición de la respuesta correcta varía a propósito.
 */
const IN = 'indirect-b2' as const
const FM = 'film-b2' as const
const NT = 'narrative-b2' as const
const T_IN = ['b2-11-indirect']
const T_FM = ['b2-11-film']
const T_NT = ['b2-11-narrative']

const ids = (p: string) => [1, 2, 3, 4, 5, 6].map((n) => `b2-11-${p}${n}`)
export const B2_11_INDIRECT_IDS = ids('in')
export const B2_11_FILM_IDS = ids('fm')
export const B2_11_NARRATIVE_IDS = ids('nt')

export const B2_11_QUESTIONS: Question[] = [
  // Bloque 1 · Manuel (preguntas indirectas y en estilo indirecto)
  { id: 'b2-11-in1', topic: IN, prompt: 'Do you know where ___?', options: ['is G', 'G is', 'does G be'], answer: 1, tip: 'Pregunta indirecta: sujeto + verbo (where G is), no "where is G".', tags: T_IN },
  { id: 'b2-11-in2', topic: IN, prompt: 'Can you tell me when ___?', options: ['it started', 'did it start', 'does it started'], answer: 0, tip: 'Sin did: el pasado va en el verbo (when it started).', tags: T_IN },
  { id: 'b2-11-in3', topic: IN, prompt: 'He asked me where ___.', options: ['was I going', 'did I go', 'I was going'], answer: 2, tip: 'En estilo indirecto: where + sujeto + verbo (where I was going).', tags: T_IN },
  { id: 'b2-11-in4', topic: IN, prompt: 'She asked ___ I had seen it.', options: ['if', 'that', 'did'], answer: 0, tip: 'Pregunta de sí o no en estilo indirecto: asked if (o whether).', tags: T_IN },
  { id: 'b2-11-in5', topic: IN, prompt: "I wonder ___ he'll come or not.", options: ['that', 'whether', 'what'], answer: 1, tip: 'whether … or not: una pregunta de sí o no.', tags: T_IN },
  { id: 'b2-11-in6', topic: IN, prompt: 'Could you tell me what time ___?', options: ['does the film start', 'starts the film', 'the film starts'], answer: 2, tip: 'Sin does y con el sujeto antes del verbo: what time the film starts.', tags: T_IN },
  // Bloque 1 · Maya (películas y series)
  { id: 'b2-11-fm1', topic: FM, prompt: 'The ending was a total surprise. What a ___!', options: ['plot twist', 'cast', 'sequel'], answer: 0, tip: 'Una gran sorpresa en la historia: plot twist.', tags: T_FM },
  { id: 'b2-11-fm2', topic: FM, prompt: 'The episode ended with a ___. Now I have to watch the next one!', options: ['review', 'cliffhanger', 'cast'], answer: 1, tip: 'Un final que te deja esperando el siguiente episodio: cliffhanger.', tags: T_FM },
  { id: 'b2-11-fm3', topic: FM, prompt: "I couldn't stop watching. It was really ___.", options: ['predictable', 'overrated', 'gripping'], answer: 2, tip: 'No podías dejar de verla: gripping (atrapante).', tags: T_FM },
  { id: 'b2-11-fm4', topic: FM, prompt: "Don't ___ the ending! I haven't seen it yet.", options: ['give away', 'figure out', 'turn out'], answer: 0, tip: 'give away = revelar (el final).', tags: T_FM },
  {
    id: 'b2-11-fm5',
    topic: FM,
    kind: 'listen',
    audio: "It's a bit slow at first, but it's well worth watching. And the ending is spine-chilling.",
    voice: 'female',
    prompt: 'What does Marisol think of the film?',
    options: ["It's fast but predictable.", "It starts slowly, but it's worth watching.", "It isn't worth watching."],
    answer: 1,
    tip: '"It\'s a bit slow at first, but it\'s well worth watching."',
    tags: T_FM,
  },
  {
    id: 'b2-11-fm6',
    topic: FM,
    kind: 'listen',
    audio: 'We binge-watched the whole series last weekend. Eight episodes in one day!',
    voice: 'female',
    prompt: 'What did Maya and her friends do?',
    options: ['They wrote a review of the series.', 'They watched only one episode.', 'They watched all the episodes very quickly.'],
    answer: 2,
    tip: 'binge-watch = ver muchos episodios seguidos ("Eight episodes in one day").',
    tags: T_FM,
  },
  // Bloque 1 · la persona especial (tiempos narrativos combinados)
  { id: 'b2-11-nt1', topic: NT, prompt: 'G ___ from behind a tree when Leo opened the gift.', options: ['was watching', 'is watching', 'watching'], answer: 0, tip: 'El fondo en curso: was watching. La acción que pasa en medio: opened.', tags: T_NT },
  { id: 'b2-11-nt2', topic: NT, prompt: 'By the time Leo turned fifteen, G ___ the card.', options: ['has already written', 'had already written', 'already writes'], answer: 1, tip: 'by the time + pasado → had + participio.', tags: T_NT },
  { id: 'b2-11-nt3', topic: NT, prompt: 'G ___ it for years before he finally did it.', options: ['has been planning', 'had been plan', 'had been planning'], answer: 2, tip: 'Cuánto tiempo llevaba pasando antes: had been + -ing.', tags: T_NT },
  { id: 'b2-11-nt4', topic: NT, prompt: 'When we got to the cinema, the film ___.', options: ['has already started', 'had already started', 'already starts'], answer: 1, tip: 'Empezó antes de que llegaran: had already started.', tags: T_NT },
  { id: 'b2-11-nt5', topic: NT, prompt: 'She ___ him for years before they became friends.', options: ['had known', 'had been knowing', 'was knowing'], answer: 0, tip: 'know es un verbo de estado: had known, nunca "had been knowing".', tags: T_NT },
  { id: 'b2-11-nt6', topic: NT, prompt: 'I ___ for an hour when the lights went out.', options: ['was reading since', 'have been reading', 'had been reading'], answer: 2, tip: 'Duración antes de un momento del pasado: had been reading for an hour.', tags: T_NT },
]
