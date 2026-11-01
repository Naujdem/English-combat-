import type { Question } from '../game/types'

/**
 * A2-06 · A Tradition at Risk (granja de los River). Past Simple + comparativos.
 * La práctica de Leo está en data/a2FarmPast.ts (lista fija). Aquí solo los combates:
 * el ayudante corrompido (a2-farm-helper) y el eco de la carrera
 * (fase 1 Past Simple: a2-farm-echo-past · fase 2 comparativos: a2-farm-echo-comp).
 */
const H = ['a2-farm-helper']
const EP = ['a2-farm-echo', 'a2-farm-echo-past']
const EC = ['a2-farm-echo', 'a2-farm-echo-comp']
const TP = 'past-simple-comparatives' as const

export const A2_FARM_QUESTIONS: Question[] = [
  // ── El ayudante corrompido (esbirro ligero) ──
  { id: 'a2-06-h1', topic: TP, prompt: 'Yesterday the helper ___ the horses at six.', options: ['fed', 'feeded', 'feed'], answer: 0, tip: 'feed es irregular: feed → fed.', tags: H },
  { id: 'a2-06-h2', topic: TP, prompt: 'This horse is ___ than the old one.', options: ['faster', 'more fast', 'fastest'], answer: 0, tip: 'Adjetivo corto: fast + -er + than = faster than.', tags: H },
  { id: 'a2-06-h3', topic: TP, kind: 'fix', prompt: 'The horses was more fast than the dog.', options: ['The horses were faster than the dog.', 'The horses was faster than the dog.', 'The horses were more faster than the dog.'], answer: 0, tip: 'Plural en pasado: were · fast → faster (sin "more").', tags: H },
  { id: 'a2-06-h4', topic: TP, kind: 'order', prompt: 'El año pasado la carrera fue más larga.', options: ['Last', 'year', 'the', 'race', 'was', 'longer.'], answer: 0, tip: 'Last year + sujeto + was + comparativo (long → longer).', tags: H },
  { id: 'a2-06-h5', topic: TP, kind: 'fix', prompt: 'I carryed the water yesterday.', options: ['I carried the water yesterday.', 'I carry the water yesterday.', 'I carryied the water yesterday.'], answer: 0, tip: 'carry: consonante + y → -ied: carried.', tags: H },
  { id: 'a2-06-h6', topic: TP, prompt: 'The stable was ___ than the house.', options: ['dirtier', 'more dirty', 'dirtyer'], answer: 0, tip: 'Adjetivo en -y: dirty → dirtier than.', tags: H },
  { id: 'a2-06-h7', topic: TP, kind: 'order', prompt: 'Ayer el abuelo se sintió mejor.', options: ['Yesterday', 'the', 'grandfather', 'felt', 'better.'], answer: 0, tip: 'feel → felt (irregular) · good/well → better.', tags: H },
  { id: 'a2-06-h8', topic: TP, kind: 'fix', prompt: 'The new road is more good than the old one.', options: ['The new road is better than the old one.', 'The new road is more better than the old one.', 'The new road is gooder than the old one.'], answer: 0, tip: 'good es irregular: better than.', tags: H },

  // ── El eco de la carrera · fase 1: Past Simple ──
  { id: 'a2-06-e1', topic: TP, prompt: 'Every year the grandfather ___ the River Race.', options: ['organized', 'organizated', 'organize'], answer: 0, tip: 'Pasado regular: organize + -d = organized.', tags: EP },
  { id: 'a2-06-e2', topic: TP, kind: 'fix', prompt: 'The rider winned the last race.', options: ['The rider won the last race.', 'The rider win the last race.', 'The rider wonned the last race.'], answer: 0, tip: 'win es irregular: win → won.', tags: EP },
  { id: 'a2-06-e3', topic: TP, kind: 'order', prompt: 'El ganador se quedó con el estandarte.', options: ['The', 'winner', 'kept', 'the', 'banner.'], answer: 0, tip: 'keep es irregular: keep → kept.', tags: EP },
  { id: 'a2-06-e4', topic: TP, prompt: 'Many people ___ to the river every summer.', options: ['came', 'comed', 'come'], answer: 0, tip: 'come es irregular: come → came.', tags: EP },

  // ── El eco de la carrera · fase 2: comparativos ──
  { id: 'a2-06-c1', topic: TP, prompt: 'The River Race was ___ than the city race.', options: ['more exciting', 'excitinger', 'more excitinger'], answer: 0, tip: 'Adjetivo largo: more + adjetivo + than.', tags: EC },
  { id: 'a2-06-c2', topic: TP, kind: 'fix', prompt: 'My horse was more strong than your horse.', options: ['My horse was stronger than your horse.', 'My horse was more stronger than your horse.', 'My horse was strong than your horse.'], answer: 0, tip: 'Adjetivo corto: strong → stronger than (sin "more").', tags: EC },
  { id: 'a2-06-c3', topic: TP, kind: 'order', prompt: 'El río estaba más frío que ayer.', options: ['The', 'river', 'was', 'colder', 'than', 'yesterday.'], answer: 0, tip: 'cold → colder than.', tags: EC },
  { id: 'a2-06-c4', topic: TP, prompt: 'Before, the race was ___ than now.', options: ['cheaper', 'more cheap', 'cheapper'], answer: 0, tip: 'Adjetivo corto: cheap → cheaper (una sola p).', tags: EC },
]
