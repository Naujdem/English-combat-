import type { Question } from '../game/types'

/**
 * B2-11 · Who Is G? (presente). Bloque 1 (el archivo del Herald y la noche de cine, data/b2WhoIsG.ts): prácticas después de cada lección.
 *  - Preguntas indirectas y en estilo indirecto (tarea b2-11-indirect, tema indirect-b2): b2-11-in1…in6.
 *  - Hablar de películas y series (tarea b2-11-film, tema film-b2): b2-11-fm1…fm6 (2 de escucha: Marisol y Maya).
 *  - Tiempos narrativos combinados (tarea b2-11-narrative, tema narrative-b2): b2-11-nt1…nt6.
 * Bloque 2 (combates): Plot Holes (etiqueta b2-11-hole): b2-11-ho1…ho6 · The Spoiler, fase 1 (b2-11-boss-nt): b2-11-sn1…sn6
 *   · fase 2 (b2-11-boss-in): b2-11-si1…si6 (2 de escucha: la confesión de Leo).
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

const HOLE = ['b2-11-hole']
const BOSS_NT = ['b2-11-boss-nt']
const BOSS_IN = ['b2-11-boss-in']

export const B2_11_COMBAT_QUESTIONS: Question[] = [
  // Plot Holes (preguntas indirectas y tiempos narrativos; el error típico del esbirro)
  { id: 'b2-11-ho1', topic: IN, kind: 'fix', prompt: 'Do you know where is G?', options: ['Do you know where G is?', 'Do you know where does G is?', 'Do you know G where is?'], answer: 0, tip: 'Pregunta indirecta: where + sujeto + verbo.', tags: HOLE },
  { id: 'b2-11-ho2', topic: IN, kind: 'fix', prompt: 'He asked me where was I going.', options: ['He asked me where did I go.', 'He asked me where I was going.', 'He asked to me where I was going.'], answer: 1, tip: 'Estilo indirecto: where I was going (sujeto antes del verbo).', tags: HOLE },
  { id: 'b2-11-ho3', topic: NT, kind: 'fix', prompt: 'By the time we arrived, the film already started.', options: ['By the time we arrived, the film has already started.', 'By the time we had arrived, the film already starts.', 'By the time we arrived, the film had already started.'], answer: 2, tip: 'by the time + pasado → had + participio.', tags: HOLE },
  { id: 'b2-11-ho4', topic: IN, prompt: 'I wonder ___ the lights will come back.', options: ['if', 'that', 'do'], answer: 0, tip: 'Pregunta de sí o no: I wonder if / whether.', tags: HOLE },
  { id: 'b2-11-ho5', topic: NT, prompt: 'They ___ dinner when the screen went dark.', options: ['had been have', 'were having', 'are having'], answer: 1, tip: 'Lo que estaba en curso cuando pasó algo: were having.', tags: HOLE },
  { id: 'b2-11-ho6', topic: IN, prompt: 'Can you tell me why ___ so quiet?', options: ['is Leo', 'does Leo be', 'Leo is'], answer: 2, tip: 'Sin inversión: why Leo is so quiet.', tags: HOLE },

  // The Spoiler, fase 1 (tiempos narrativos combinados y vocabulario de cine)
  { id: 'b2-11-sn1', topic: NT, kind: 'fix', prompt: 'She had been knowing him for years.', options: ['She had known him for years.', 'She has been knowing him for years.', 'She was knowing him for years.'], answer: 0, tip: 'know es un verbo de estado: had known, nunca en continuo.', tags: BOSS_NT },
  { id: 'b2-11-sn2', topic: NT, kind: 'fix', prompt: 'When I arrived, they already left.', options: ['When I arrived, they have already left.', 'When I arrived, they had already left.', 'When I had arrived, they already leave.'], answer: 1, tip: 'Se fueron antes de que llegaras: had already left.', tags: BOSS_NT },
  { id: 'b2-11-sn3', topic: NT, prompt: 'The man ___ the trip for years before he finally travelled.', options: ['has been planning', 'had been planned', 'had been planning'], answer: 2, tip: 'Duración antes de otro hecho pasado: had been + -ing.', tags: BOSS_NT },
  { id: 'b2-11-sn4', topic: FM, prompt: "Don't read the review. It ___ the whole ending!", options: ['gives away', 'figures out', 'turns out'], answer: 0, tip: 'give away = revelar (un final, un secreto).', tags: BOSS_NT },
  { id: 'b2-11-sn5', topic: FM, prompt: 'Everybody loves that film, but I think it\'s ___.', options: ['gripping', 'overrated', 'well worth'], answer: 1, tip: 'overrated = sobrevalorado: todos dicen que es genial, pero no lo es.', tags: BOSS_NT },
  { id: 'b2-11-sn6', topic: NT, kind: 'order', prompt: 'Para cuando llegamos, la película ya había empezado.', options: ['By the time', 'we arrived,', 'the film', 'had already', 'started.'], answer: 0, tip: 'By the time + pasado simple, + had already + participio.', tags: BOSS_NT },

  // The Spoiler, fase 2 (preguntas indirectas y en estilo indirecto, la confesión de Leo)
  { id: 'b2-11-si1', topic: IN, kind: 'fix', prompt: 'Can you tell me what time does it start?', options: ['Can you tell me what time it starts?', 'Can you tell me what time starts it?', 'Can you tell me what time did it start?'], answer: 0, tip: 'Sin does: what time it starts.', tags: BOSS_IN },
  { id: 'b2-11-si2', topic: IN, kind: 'fix', prompt: 'He asked me did I like it.', options: ['He asked me that I liked it.', 'He asked me if I liked it.', 'He asked me if did I like it.'], answer: 1, tip: 'Pregunta de sí o no en estilo indirecto: asked if + sujeto + verbo.', tags: BOSS_IN },
  { id: 'b2-11-si3', topic: IN, prompt: 'Maya asked Leo why he ___ told them.', options: ["hasn't", "didn't", "hadn't"], answer: 2, tip: 'Estilo indirecto: "Why didn\'t you tell us?" → why he hadn\'t told them.', tags: BOSS_IN },
  { id: 'b2-11-si4', topic: IN, kind: 'order', prompt: '¿Sabes cuánto dura?', options: ['Do you know', 'how long', 'it lasts?'], answer: 0, tip: 'Do you know + how long + sujeto + verbo.', tags: BOSS_IN },
  {
    id: 'b2-11-si5',
    topic: IN,
    kind: 'listen',
    audio: 'It started at the hospital, after the clock. My voice disappears when the fragments glow.',
    voice: 'male',
    prompt: 'When does Leo lose his voice?',
    options: ['When he watches films.', 'When the fragments glow.', 'When he is at the hospital.'],
    answer: 1,
    tip: '"My voice disappears when the fragments glow."',
    tags: BOSS_IN,
  },
  {
    id: 'b2-11-si6',
    topic: NT,
    kind: 'listen',
    audio: "I've been having the same dream for weeks. Smoke. A corridor on fire. I'm shouting for help.",
    voice: 'male',
    prompt: 'What is Leo\'s dream about?',
    options: ['A fire and a corridor full of smoke.', 'A train that goes back in time.', 'A man who steals a gift.'],
    answer: 0,
    tip: '"Smoke. A corridor on fire."',
    tags: BOSS_IN,
  },
]
