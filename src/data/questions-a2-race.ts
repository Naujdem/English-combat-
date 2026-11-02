import type { Question } from '../game/types'

/**
 * A2-07 · The Great Race (hipódromo). Comparativos, superlativos y presente continuo.
 * La práctica guiada de Leo está en data/a2Race.ts (lista fija). Aquí solo los combates:
 * Jack the Rival (a2-race-jack) y The Master Jockey
 * (fase 1 comparativos + superlativos: a2-race-boss-comp · fase 2 presente continuo: a2-race-boss-cont · fase 3 mezcla: a2-race-boss-mix).
 */
const J = ['a2-race-jack']
const B1 = ['a2-race-boss', 'a2-race-boss-comp']
const B2 = ['a2-race-boss', 'a2-race-boss-cont']
const B3 = ['a2-race-boss', 'a2-race-boss-mix']
const TP = 'superlatives-comparatives-race' as const

export const A2_RACE_QUESTIONS: Question[] = [
  // ── Jack the Rival (esbirro) ──
  { id: 'a2-07-j1', topic: TP, prompt: 'This horse is ___ than that one.', options: ['faster', 'fastest', 'more fast'], answer: 0, tip: 'Comparamos dos: fast → faster than (sin "more").', tags: J },
  { id: 'a2-07-j2', topic: TP, kind: 'fix', prompt: 'This is the more dangerous jump.', options: ['This is the most dangerous jump.', 'This is the dangerousest jump.', 'This is most dangerous jump.'], answer: 0, tip: 'El más de todos (adjetivo largo): the most dangerous.', tags: J },
  { id: 'a2-07-j3', topic: TP, kind: 'order', prompt: 'Los caballos están corriendo ahora.', options: ['The', 'horses', 'are', 'running', 'now.'], answer: 0, tip: 'Sujeto + are + verbo con -ing: The horses are running now.', tags: J },
  { id: 'a2-07-j4', topic: TP, prompt: 'She ___ (jump) over the fence.', options: ['is jumping', 'are jumping', 'jumping'], answer: 0, tip: 'She + is + verbo con -ing: is jumping.', tags: J },
  { id: 'a2-07-j5', topic: TP, prompt: 'He is ___ (good) jockey here.', options: ['the best', 'the better', 'the goodest'], answer: 0, tip: 'good es irregular: better → the best.', tags: J },
  { id: 'a2-07-j6', topic: TP, kind: 'fix', prompt: 'Your horse is more slow.', options: ['Your horse is slower.', 'Your horse is more slower.', 'Your horse is slowest.'], answer: 0, tip: 'Adjetivo corto: slow → slower (sin "more").', tags: J },
  { id: 'a2-07-j7', topic: TP, prompt: 'They ___ (ride) as fast as they can.', options: ['are riding', 'is riding', 'riding'], answer: 0, tip: 'They + are + verbo con -ing: ride → riding (sin la e).', tags: J },
  { id: 'a2-07-j8', topic: TP, kind: 'order', prompt: 'Este es el caballo más rápido.', options: ['This', 'is', 'the', 'fastest', 'horse.'], answer: 0, tip: 'the + fastest + horse: This is the fastest horse.', tags: J },

  // ── The Master Jockey · fase 1: comparativos + superlativos ──
  { id: 'a2-07-b1', topic: TP, prompt: 'My jump was ___ than yours.', options: ['higher', 'more high', 'highest'], answer: 0, tip: 'Adjetivo corto: high → higher than (sin "more").', tags: B1 },
  { id: 'a2-07-b2', topic: TP, kind: 'fix', prompt: 'I am the more good jockey.', options: ['I am the best jockey.', 'I am the goodest jockey.', 'I am the most good jockey.'], answer: 0, tip: 'good es irregular: the best (nunca "more good" ni "goodest").', tags: B1 },
  { id: 'a2-07-b3', topic: TP, prompt: 'Your horse is ___ than mine.', options: ['slower', 'more slow', 'slowest'], answer: 0, tip: 'Adjetivo corto: slow → slower than.', tags: B1 },
  { id: 'a2-07-b4', topic: TP, prompt: 'This is ___ race of the year.', options: ['the most important', 'the importantest', 'the more important'], answer: 0, tip: 'Adjetivo largo, el más de todos: the most important.', tags: B1 },

  // ── The Master Jockey · fase 2: presente continuo ──
  { id: 'a2-07-c1', topic: TP, prompt: 'The horses ___ (run).', options: ['are running', 'is running', 'running'], answer: 0, tip: 'Plural: are + running (doble n).', tags: B2 },
  { id: 'a2-07-c2', topic: TP, prompt: 'She ___ (lead) right now.', options: ['is leading', 'are leading', 'leads'], answer: 0, tip: 'Right now: is + verbo con -ing → is leading.', tags: B2 },
  { id: 'a2-07-c3', topic: TP, kind: 'order', prompt: 'Mi caballo todavía está corriendo.', options: ['My', 'horse', 'is', 'still', 'running.'], answer: 0, tip: 'still va entre is y el verbo con -ing: is still running.', tags: B2 },
  { id: 'a2-07-c4', topic: TP, kind: 'fix', prompt: 'Look! The jockey are jumping.', options: ['Look! The jockey is jumping.', 'Look! The jockey jumping.', 'Look! The jockey is jump.'], answer: 0, tip: 'Un jinete: is + verbo con -ing → is jumping.', tags: B2 },

  // ── The Master Jockey · fase 3: mezcla ──
  { id: 'a2-07-m1', topic: TP, prompt: 'This is ___ (dangerous) part.', options: ['the most dangerous', 'the more dangerous', 'most dangerous'], answer: 0, tip: 'Superlativo de adjetivo largo: the most dangerous.', tags: B3 },
  { id: 'a2-07-m2', topic: TP, kind: 'order', prompt: 'Él es el jinete más rápido.', options: ['He', 'is', 'the', 'fastest', 'rider.'], answer: 0, tip: 'He is + the fastest + rider.', tags: B3 },
  { id: 'a2-07-m3', topic: TP, prompt: 'Look! You ___ faster than me now.', options: ['are riding', 'is riding', 'ride'], answer: 0, tip: 'Look! + now: you + are + verbo con -ing → are riding.', tags: B3 },
  { id: 'a2-07-m4', topic: TP, kind: 'fix', prompt: 'He is the more fast rider today.', options: ['He is the fastest rider today.', 'He is the most fast rider today.', 'He is the faster rider today.'], answer: 0, tip: 'Adjetivo corto, el más de todos: the fastest.', tags: B3 },
]
