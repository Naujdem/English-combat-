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

/** Práctica de la invitación, en orden */
export const B1_08_PRACTICE_IDS = ['b1-08-s1', 'b1-08-s2', 'b1-08-s3', 'b1-08-s4', 'b1-08-s5', 'b1-08-s6', 'b1-08-s7', 'b1-08-s8']
/** Escucha de Julian y la entrenadora Ilva, en orden */
export const B1_08_TEAM_IDS = ['b1-08-t1', 'b1-08-t2', 'b1-08-t3', 'b1-08-t4']

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
]
