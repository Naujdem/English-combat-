import type { Question } from '../game/types'

/**
 * B1-08 · Game Day (presente). Bloque A (la entrada del estadio de Lumen Bay, data/b1Stadium.ts):
 *  - Práctica de la invitación de la persona especial (tarea b1-08-invite, tema superlatives-b1): b1-08-s1…s8.
 *  - Práctica de escucha de la charla de Julian y la entrenadora Ilva (tarea b1-08-team): b1-08-t1…t4.
 * La posición de la respuesta correcta varía a propósito.
 */
const SU = 'superlatives-b1' as const
const PRACTICE = ['b1-08-practice']
const TEAM = ['b1-08-team']
/** Bloque B (las gradas, data/b1Stands.ts): Jose Kike, resultados (football-results) y what a / such / so (emphasis-b1) */
const FR = 'football-results' as const
const RESULTS = ['b1-08-results']
const EM = 'emphasis-b1' as const
const EMPHASIS = ['b1-08-emphasis']

/** Práctica de la invitación, en orden */
export const B1_08_PRACTICE_IDS = ['b1-08-s1', 'b1-08-s2', 'b1-08-s3', 'b1-08-s4', 'b1-08-s5', 'b1-08-s6', 'b1-08-s7', 'b1-08-s8']
/** Escucha de Julian y la entrenadora Ilva, en orden */
export const B1_08_TEAM_IDS = ['b1-08-t1', 'b1-08-t2', 'b1-08-t3', 'b1-08-t4']
/** Práctica de resultados de Jose Kike, en orden */
export const B1_08_RESULTS_IDS = ['b1-08-r1', 'b1-08-r2', 'b1-08-r3', 'b1-08-r4', 'b1-08-r5', 'b1-08-r6', 'b1-08-r7', 'b1-08-r8']
/** Práctica de what a / such / so de Jose Kike, en orden */
export const B1_08_EMPHASIS_IDS = ['b1-08-e1', 'b1-08-e2', 'b1-08-e3', 'b1-08-e4', 'b1-08-e5', 'b1-08-e6', 'b1-08-e7', 'b1-08-e8']

export const B1_08_QUESTIONS: Question[] = [
  // Bloque A · la invitación de la persona especial (superlativos)
  { id: 'b1-08-s1', topic: SU, kind: 'fix', prompt: 'The most fast player is Julian.', options: ['The most fastest player is Julian.', 'The fastest player is Julian.', 'The fastiest player is Julian.'], answer: 1, tip: 'Adjetivo corto: the + -est.', tags: PRACTICE },
  { id: 'b1-08-s2', topic: SU, kind: 'fix', prompt: 'He is the most good player in the team.', options: ['He is the goodest player in the team.', 'He is the most best player in the team.', 'He is the best player in the team.'], answer: 2, tip: 'good es irregular: the best.', tags: PRACTICE },
  { id: 'b1-08-s3', topic: SU, prompt: 'This is the ___ stadium in the country. It has 80,000 seats.', options: ['biggest', 'most big', 'bigest'], answer: 0, tip: 'big → the biggest (se duplica la g).', tags: PRACTICE },
  { id: 'b1-08-s4', topic: SU, prompt: 'That was ___ exciting match of the season.', options: ['the more', 'the most', 'most the'], answer: 1, tip: 'Adjetivo largo: the most + adjetivo.', tags: PRACTICE },
  { id: 'b1-08-s5', topic: SU, prompt: 'It was a hot day. It was ___ day of the summer.', options: ['the most hot', 'the hotest', 'the hottest'], answer: 2, tip: 'hot → the hottest (se duplica la t).', tags: PRACTICE },
  { id: 'b1-08-s6', topic: SU, kind: 'order', prompt: 'Ellos son el segundo mejor equipo.', options: ['They', 'are', 'the', 'second', 'best', 'team.'], answer: 0, tip: 'the second best team.', tags: PRACTICE },
  { id: 'b1-08-s7', topic: SU, prompt: 'Ilva is ___ coach in the league.', options: ['the more good', 'the best', 'the goodest'], answer: 1, tip: 'good → the best.', tags: PRACTICE },
  {
    id: 'b1-08-s8',
    topic: SU,
    kind: 'listen',
    audio: 'Julian is the fastest player in the team. Mateo is the tallest, but he is not the best. The best goalkeeper in the league is Sofía.',
    voice: 'female',
    prompt: '¿Quién es la mejor portera de la liga?',
    options: ['Mateo.', 'Julian.', 'Sofía.'],
    answer: 2,
    tip: 'The best goalkeeper in the league is Sofía.',
    tags: PRACTICE,
  },
  // Bloque A · la charla de Julian y la entrenadora Ilva (escucha)
  {
    id: 'b1-08-t1',
    topic: SU,
    kind: 'listen',
    audio: 'Julian says the other team is the strongest in the league. Coach Ilva says Julian is the fastest player on the field, and the goalkeeper is the best.',
    voice: 'female',
    prompt: '¿Quién es el jugador más rápido?',
    options: ['La portera.', 'Julian.', 'El otro equipo.'],
    answer: 1,
    tip: 'Julian is the fastest player on the field.',
    tags: TEAM,
  },
  {
    id: 'b1-08-t2',
    topic: SU,
    kind: 'listen',
    audio: "The most important thing today is to play together. It's the worst mistake to play alone.",
    voice: 'male',
    prompt: '¿Cuál es el peor error?',
    options: ['Jugar solos.', 'Llegar tarde.', 'Perder el balón.'],
    answer: 0,
    tip: "It's the worst mistake to play alone.",
    tags: TEAM,
  },
  {
    id: 'b1-08-t3',
    topic: SU,
    kind: 'listen',
    audio: 'Our stadium is the oldest in the city, but it has the best atmosphere. The crowd is the loudest in the country.',
    voice: 'female',
    prompt: '¿Qué tiene el mejor ambiente?',
    options: ['La cafetería.', 'El hotel.', 'El estadio.'],
    answer: 2,
    tip: 'It has the best atmosphere.',
    tags: TEAM,
  },
  {
    id: 'b1-08-t4',
    topic: SU,
    kind: 'listen',
    audio: 'Mateo is not the tallest player, but he is one of the best. He scored the most goals this year: twelve.',
    voice: 'male',
    prompt: '¿Cuántos goles metió?',
    options: ['Dos.', 'Doce.', 'Veinte.'],
    answer: 1,
    tip: 'He scored the most goals this year: twelve.',
    tags: TEAM,
  },
  // Bloque B · Jose Kike: resultados deportivos
  { id: 'b1-08-r1', topic: FR, kind: 'fix', prompt: 'They won the Red Lions 3–1.', options: ['They won to the Red Lions 3–1.', 'They beat the Red Lions 3–1.', 'They beaten the Red Lions 3–1.'], answer: 1, tip: 'Contra un equipo: beat + equipo.', tags: RESULTS },
  { id: 'b1-08-r2', topic: FR, kind: 'fix', prompt: 'It ended on a draw.', options: ['It ended at a draw.', 'It end in a draw.', 'It ended in a draw.'], answer: 2, tip: 'It ended in a draw.', tags: RESULTS },
  { id: 'b1-08-r3', topic: FR, prompt: 'Lumen Bay scored three goals and the other team scored one. Lumen Bay ___ 3–1.', options: ['beat', 'lost', 'won'], answer: 2, tip: 'Sin nombrar al otro equipo: won 3–1.', tags: RESULTS },
  { id: 'b1-08-r4', topic: FR, prompt: 'Lumen Bay ___ the Red Lions in the final.', options: ['won', 'beat', 'lost'], answer: 1, tip: 'Con un equipo como objeto: beat.', tags: RESULTS },
  { id: 'b1-08-r5', topic: FR, prompt: 'The score is 2–0 to the other team. Lumen Bay is two goals ___.', options: ['down', 'up', 'draw'], answer: 0, tip: 'Va perdiendo: two goals down.', tags: RESULTS },
  { id: 'b1-08-r6', topic: FR, kind: 'order', prompt: 'Fue un empate de uno a uno.', options: ['It', 'was', 'a', '1–1', 'draw.'], answer: 0, tip: 'a 1–1 draw.', tags: RESULTS },
  { id: 'b1-08-r7', topic: FR, prompt: "It's 2–2. Nobody is winning. It's a ___.", options: ['goal', 'draw', 'penalty'], answer: 1, tip: 'Empate = draw.', tags: RESULTS },
  {
    id: 'b1-08-r8',
    topic: FR,
    kind: 'listen',
    audio: "Good afternoon! It's half time. Lumen Bay is one goal down: it's one–nil to the Red Lions. But the fans are still singing.",
    voice: 'male',
    prompt: '¿Cómo va Lumen Bay?',
    options: ['Va ganando por un gol.', 'Va perdiendo por un gol.', 'Empatan.'],
    answer: 1,
    tip: 'Lumen Bay is one goal down.',
    tags: RESULTS,
  },
  // Bloque B · Jose Kike: what a / such / so
  { id: 'b1-08-e1', topic: EM, kind: 'fix', prompt: 'Such good game!', options: ['So good game!', 'Such a good game!', 'Such good a game!'], answer: 1, tip: 'such a + adjetivo + sustantivo.', tags: EMPHASIS },
  { id: 'b1-08-e2', topic: EM, kind: 'fix', prompt: 'What goal!', options: ['What goals a!', 'What the goal!', 'What a goal!'], answer: 2, tip: 'What a + sustantivo singular.', tags: EMPHASIS },
  { id: 'b1-08-e3', topic: EM, prompt: "The match was ___ exciting! I couldn't sit down.", options: ['so', 'such', 'such a'], answer: 0, tip: 'so + adjetivo.', tags: EMPHASIS },
  { id: 'b1-08-e4', topic: EM, prompt: 'It was ___ great match.', options: ['so', 'such a', 'such'], answer: 1, tip: 'such a + adjetivo + sustantivo.', tags: EMPHASIS },
  { id: 'b1-08-e5', topic: EM, prompt: 'What ___ goal!', options: ['the', 'an', 'a'], answer: 2, tip: 'What a goal.', tags: EMPHASIS },
  { id: 'b1-08-e6', topic: EM, kind: 'order', prompt: '¡Qué partido tan bueno!', options: ['What', 'a', 'good', 'match!'], answer: 0, tip: 'What a + adjetivo + sustantivo.', tags: EMPHASIS },
  { id: 'b1-08-e7', topic: EM, prompt: "The fans are ___ loud. I can't hear you!", options: ['such a', 'so', 'such'], answer: 1, tip: 'so + adjetivo.', tags: EMPHASIS },
  {
    id: 'b1-08-e8',
    topic: EM,
    kind: 'listen',
    audio: 'What a game! It was such a thrilling final, and the atmosphere was so loud. What a goal in the last minute!',
    voice: 'female',
    prompt: '¿Cómo fue el ambiente?',
    options: ['Muy tranquilo.', 'Muy frío.', 'Muy ruidoso.'],
    answer: 2,
    tip: 'The atmosphere was so loud.',
    tags: EMPHASIS,
  },
]
