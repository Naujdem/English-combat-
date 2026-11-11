import type { Question } from '../game/types'

/**
 * B1 · Extras (misiones secundarias).
 *  - Charity Run (data/b1CharityRun.ts): práctica con Ilva (tarea b1-s1-coach, tema charity-b1): b1-s1-c1…c8.
 *  - Movie Night (data/b1MovieNight.ts): práctica con Marisol (tarea b1-s2-talk, tema movie-night-b1): b1-s2-m1…m8.
 *  - House Party (data/b1HouseParty.ts): práctica con Jeison (tarea b1-s3-host, tema party-b1): b1-s3-h1…h8;
 *    duelo amistoso con Juan (etiqueta b1-s3-duel): b1-s3-d1…d10.
 * La posición de la respuesta correcta varía a propósito.
 */
const CR = 'charity-b1' as const
const COACH = ['b1-s1-coach']

export const B1_S1_COACH_IDS = ['b1-s1-c1', 'b1-s1-c2', 'b1-s1-c3', 'b1-s1-c4', 'b1-s1-c5', 'b1-s1-c6', 'b1-s1-c7', 'b1-s1-c8']

const MN = 'movie-night-b1' as const
const TALK = ['b1-s2-talk']
export const B1_S2_TALK_IDS = ['b1-s2-m1', 'b1-s2-m2', 'b1-s2-m3', 'b1-s2-m4', 'b1-s2-m5', 'b1-s2-m6', 'b1-s2-m7', 'b1-s2-m8']

const PT = 'party-b1' as const
const HOST = ['b1-s3-host']
const DUEL = ['b1-s3-duel']
export const B1_S3_HOST_IDS = ['b1-s3-h1', 'b1-s3-h2', 'b1-s3-h3', 'b1-s3-h4', 'b1-s3-h5', 'b1-s3-h6', 'b1-s3-h7', 'b1-s3-h8']

export const B1_EXTRA_QUESTIONS: Question[] = [
  // Charity Run · Ilva (colocaciones de logros; past continuous + past simple)
  { id: 'b1-s1-c1', topic: CR, prompt: 'Last year we ___ a lot of money for the shelter.', options: ['raised', 'rose', 'beat'], answer: 0, tip: 'Recaudar dinero: raise money.', tags: COACH },
  { id: 'b1-s1-c2', topic: CR, prompt: 'I trained every day, and I finally ___ my goal.', options: ['raised', 'achieved', 'took part'], answer: 1, tip: 'Lograr una meta: achieve a goal.', tags: COACH },
  { id: 'b1-s1-c3', topic: CR, prompt: 'She ran very fast and ___ her own record.', options: ['won', 'raised', 'beat'], answer: 2, tip: 'Superar una marca: beat a record.', tags: COACH },
  { id: 'b1-s1-c4', topic: CR, prompt: 'More than two hundred people took ___ in the race.', options: ['part', 'place', 'goal'], answer: 0, tip: 'Participar: take part in.', tags: COACH },
  { id: 'b1-s1-c5', topic: CR, prompt: 'I ___ when I fell.', options: ['were running', 'was running', 'am running'], answer: 1, tip: 'Con I: was + verbo con -ing.', tags: COACH },
  { id: 'b1-s1-c6', topic: CR, kind: 'fix', prompt: 'I was run when it started to rain.', options: ['I was runned when it started to rain.', 'I were running when it started to rain.', 'I was running when it started to rain.'], answer: 2, tip: 'was + verbo con -ing: was running.', tags: COACH },
  { id: 'b1-s1-c7', topic: CR, prompt: 'We were waiting at the start line when the coach ___.', options: ['arrives', 'arrive', 'arrived'], answer: 2, tip: 'La acción corta va en pasado simple: arrived.', tags: COACH },
  { id: 'b1-s1-c8', topic: CR, kind: 'order', prompt: 'Estaba corriendo cuando vi a Lupe.', options: ['I', 'was', 'running', 'when', 'I', 'saw', 'Lupe.'], answer: 0, tip: 'was + -ing + when + pasado simple.', tags: COACH },

  // Movie Night · Marisol (adverbios de opinión, tiempos narrativos y opinar)
  { id: 'b1-s2-m1', topic: MN, prompt: '___, the cinema was closed, so we watched the film at home.', options: ['Unfortunately', 'Surprising', 'Lucky'], answer: 0, tip: 'Adverbio de opinión: Unfortunately (termina en -ly).', tags: TALK },
  { id: 'b1-s2-m2', topic: MN, prompt: 'The storm was terrible. ___, nobody was hurt.', options: ['Sadly', 'Luckily', 'Unfortunately'], answer: 1, tip: 'Algo bueno: luckily (por suerte).', tags: TALK },
  { id: 'b1-s2-m3', topic: MN, prompt: 'Everyone thought the keeper was the thief. ___, it was his sister!', options: ['Luck', 'Obviously', 'Surprisingly'], answer: 2, tip: 'Algo inesperado: surprisingly.', tags: TALK },
  { id: 'b1-s2-m4', topic: MN, kind: 'fix', prompt: 'I am thinking this film is great.', options: ['I think this film is great.', 'I thinking this film is great.', 'I am think this film is great.'], answer: 0, tip: 'think (opinión) es verbo de estado: sin -ing.', tags: TALK },
  { id: 'b1-s2-m5', topic: MN, prompt: 'When the film started, Moscú ___ on the sofa.', options: ['were sleeping', 'was sleeping', 'is sleeping'], answer: 1, tip: 'La escena: was + verbo con -ing.', tags: TALK },
  { id: 'b1-s2-m6', topic: MN, prompt: 'By the time we arrived, the film ___.', options: ['has start', 'had start', 'had started'], answer: 2, tip: 'Lo que pasó antes: had + participio.', tags: TALK },
  { id: 'b1-s2-m7', topic: MN, prompt: 'The sailor opened the door and ___ a light in the tower.', options: ['saw', 'seen', 'had see'], answer: 0, tip: 'Hechos seguidos: pasado simple (saw).', tags: TALK },
  { id: 'b1-s2-m8', topic: MN, kind: 'order', prompt: 'Sinceramente, me encantó el final.', options: ['Honestly,', 'I', 'loved', 'the', 'ending.'], answer: 0, tip: 'El adverbio de opinión va al principio, con coma.', tags: TALK },

  // House Party · Jeison (question tags con otros auxiliares)
  { id: 'b1-s3-h1', topic: PT, prompt: "You can come tonight, ___ you?", options: ["can't", "don't", "aren't"], answer: 0, tip: "can → can't you?", tags: HOST },
  { id: 'b1-s3-h2', topic: PT, prompt: "Nayi will bring some juice, ___ she?", options: ["doesn't", "won't", "isn't"], answer: 1, tip: "will → won't she?", tags: HOST },
  { id: 'b1-s3-h3', topic: PT, prompt: "You like this song, ___ you?", options: ["aren't", "doesn't", "don't"], answer: 2, tip: "Presente simple con you → don't you?", tags: HOST },
  { id: 'b1-s3-h4', topic: PT, prompt: "Jorge made the playlist, ___ he?", options: ["didn't", "doesn't", "wasn't"], answer: 0, tip: "Pasado simple → didn't he?", tags: HOST },
  { id: 'b1-s3-h5', topic: PT, prompt: "You haven't met my cousin, ___ you?", options: ["haven't", 'have', 'did'], answer: 1, tip: 'Frase negativa → tag positivo: have you?', tags: HOST },
  { id: 'b1-s3-h6', topic: PT, kind: 'fix', prompt: "The party starts at eight, isn't it?", options: ["The party starts at eight, don't it?", "The party starts at eight, doesn't she?", "The party starts at eight, doesn't it?"], answer: 2, tip: "starts (presente simple) → doesn't it?", tags: HOST },
  { id: 'b1-s3-h7', topic: PT, prompt: "We won't be too loud, ___ we?", options: ['will', "won't", 'do'], answer: 0, tip: "won't → tag positivo: will we?", tags: HOST },
  { id: 'b1-s3-h8', topic: PT, kind: 'order', prompt: 'Vienes a la fiesta, ¿cierto?', options: ["You're", 'coming', 'to', 'the', 'party,', "aren't", 'you?'], answer: 0, tip: "You're → aren't you?", tags: HOST },

  // House Party · duelo amistoso con Juan
  { id: 'b1-s3-d1', topic: PT, prompt: "You're Jeison's neighbour, ___ you?", options: ["aren't", "isn't", "don't"], answer: 0, tip: "are → aren't you?", tags: DUEL },
  { id: 'b1-s3-d2', topic: PT, prompt: "Liceth brought a cake, ___ she?", options: ["wasn't", "didn't", "doesn't"], answer: 1, tip: "Pasado simple → didn't she?", tags: DUEL },
  { id: 'b1-s3-d3', topic: PT, prompt: "Moscú doesn't like noise, ___ she?", options: ["doesn't", 'is', 'does'], answer: 2, tip: "doesn't → tag positivo: does she?", tags: DUEL },
  { id: 'b1-s3-d4', topic: PT, prompt: "You can dance, ___ you?", options: ["can't", "aren't", "don't"], answer: 0, tip: "can → can't you?", tags: DUEL },
  { id: 'b1-s3-d5', topic: PT, prompt: "They have already arrived, ___ they?", options: ["didn't", "haven't", "aren't"], answer: 1, tip: "have → haven't they?", tags: DUEL },
  { id: 'b1-s3-d6', topic: PT, kind: 'fix', prompt: "You live in the residence, aren't you?", options: ["You live in the residence, don't you?", "You live in the residence, doesn't you?", "You live in the residence, isn't you?"], answer: 0, tip: "live (presente simple) → don't you?", tags: DUEL },
  { id: 'b1-s3-d7', topic: PT, kind: 'fix', prompt: "It was a great party, isn't it?", options: ["It was a great party, didn't it?", "It was a great party, weren't it?", "It was a great party, wasn't it?"], answer: 2, tip: "was → wasn't it?", tags: DUEL },
  { id: 'b1-s3-d8', topic: PT, prompt: "We'll play again, ___ we?", options: ["won't", "don't", "aren't"], answer: 0, tip: "will → won't we?", tags: DUEL },
  { id: 'b1-s3-d9', topic: PT, prompt: "You didn't eat all the snacks, ___ you?", options: ["didn't", 'did', 'do'], answer: 1, tip: "didn't → tag positivo: did you?", tags: DUEL },
  { id: 'b1-s3-d10', topic: PT, kind: 'order', prompt: 'Es una gran fiesta, ¿cierto?', options: ["It's", 'a', 'great', 'party,', "isn't", 'it?'], answer: 0, tip: "It's → isn't it?", tags: DUEL },
]
