import type { Question } from '../game/types'

/**
 * A2-08 · El Carro que se Detuvo (camino). Past Simple + Past Continuous (when / while).
 * La práctica guiada de Leo está en data/a2Car.ts (lista fija). Aquí solo los combates:
 * Eco de la carretera (a2-car-minion) y El Motor Silencioso
 * (fase 1 Past Simple: a2-car-boss-simple · fase 2 Past Continuous: a2-car-boss-cont).
 */
const M = ['a2-car-minion']
const B1 = ['a2-car-boss', 'a2-car-boss-simple']
const B2 = ['a2-car-boss', 'a2-car-boss-cont']
const TP = 'past-simple-continuous' as const

export const A2_CAR_QUESTIONS: Question[] = [
  // ── Eco de la carretera (esbirro) ──
  { id: 'a2-08-m1', topic: TP, kind: 'fix', prompt: 'I was drive when the engine stop.', options: ['I was driving when the engine stopped.', 'I was driving when the engine stop.', 'I drove when the engine was stop.'], answer: 0, tip: 'was + -ing (en progreso) · stop → stopped.', tags: M },
  { id: 'a2-08-m2', topic: TP, kind: 'fix', prompt: 'JoJo get out while we was check the wheels.', options: ['JoJo got out while we were checking the wheels.', 'JoJo got out while we was checking the wheels.', 'JoJo get out while we were checking the wheels.'], answer: 0, tip: 'get → got · we + were + -ing.', tags: M },
  { id: 'a2-08-m3', topic: TP, prompt: 'We ___ (see) a purple light near the wheels.', options: ['saw', 'seed', 'was see'], answer: 0, tip: 'see → saw (irregular).', tags: M },
  { id: 'a2-08-m4', topic: TP, prompt: 'You were driving ___ the engine stopped.', options: ['when', 'while', 'so'], answer: 0, tip: 'when + Past Simple (la acción corta interrumpe).', tags: M },
  { id: 'a2-08-m5', topic: TP, kind: 'order', prompt: 'El motor estaba haciendo un ruido extraño.', options: ['The', 'engine', 'was', 'making', 'a', 'strange', 'noise.'], answer: 0, tip: 'was + making (make → making).', tags: M },
  { id: 'a2-08-m6', topic: TP, prompt: 'JoJo ___ (talk) while the engine was making noise.', options: ['was talking', 'were talking', 'talking'], answer: 0, tip: 'JoJo (he) + was + verbo con -ing.', tags: M },

  // ── El Motor Silencioso · fase 1: Past Simple ──
  { id: 'a2-08-b1', topic: TP, kind: 'fix', prompt: 'The car stop in the middle of the road.', options: ['The car stopped in the middle of the road.', 'The car was stop in the middle of the road.', 'The car stoped in the middle of the road.'], answer: 0, tip: 'stop → stopped (doble p).', tags: B1 },
  { id: 'a2-08-b2', topic: TP, kind: 'fix', prompt: 'JoJo get out and run to the front.', options: ['JoJo got out and ran to the front.', 'JoJo got out and runned to the front.', 'JoJo get out and ran to the front.'], answer: 0, tip: 'get → got · run → ran.', tags: B1 },
  { id: 'a2-08-b3', topic: TP, prompt: 'The noise ___ (stop) suddenly.', options: ['stopped', 'was stop', 'stops'], answer: 0, tip: 'Acción terminada → Past Simple.', tags: B1 },
  { id: 'a2-08-b4', topic: TP, kind: 'order', prompt: 'Vimos una luz morada cerca de las ruedas.', options: ['We', 'saw', 'a', 'purple', 'light', 'near', 'the', 'wheels.'], answer: 0, tip: 'see → saw.', tags: B1 },

  // ── El Motor Silencioso · fase 2: Past Continuous ──
  { id: 'a2-08-b5', topic: TP, kind: 'fix', prompt: 'I was drive when the car stopped.', options: ['I was driving when the car stopped.', 'I were driving when the car stopped.', 'I was drived when the car stopped.'], answer: 0, tip: 'was + driving (drive → driving, sin e).', tags: B2 },
  { id: 'a2-08-b6', topic: TP, kind: 'fix', prompt: 'JoJo was talk while the engine was make noise.', options: ['JoJo was talking while the engine was making noise.', 'JoJo was talking while the engine was make noise.', 'JoJo talking while the engine making noise.'], answer: 0, tip: 'Las dos acciones en progreso: was + -ing.', tags: B2 },
  { id: 'a2-08-b7', topic: TP, prompt: 'We ___ (check) the wheels when the light appeared.', options: ['were checking', 'was checking', 'checking'], answer: 0, tip: 'we + were + -ing.', tags: B2 },
  { id: 'a2-08-b8', topic: TP, kind: 'fix', prompt: 'The light was shine while we was look at the road.', options: ['The light was shining while we were looking at the road.', 'The light was shining while we was looking at the road.', 'The light shined while we were look at the road.'], answer: 0, tip: 'shine → shining · we + were + looking.', tags: B2 },
]
