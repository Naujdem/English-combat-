import type { Question } from '../game/types'

/**
 * A2-12 · Out of Control (centro de control de 2056). will / going to / presente continuo para planes; viajes y reservas.
 * La práctica guiada de Leo está en data/a2Control.ts (lista fija). Aquí solo los combates:
 * El Anunciador (fase 1 will / going to: a2-control-minion-will · fase 2 planes acordados: a2-control-minion-plans) y
 * Adrián (fase 1 contraste de las tres formas: a2-control-boss-plans · fase 2 viajes y reservas: a2-control-boss-travel).
 */
const MW = ['a2-control-minion', 'a2-control-minion-will']
const MP = ['a2-control-minion', 'a2-control-minion-plans']
const BP = ['a2-control-boss', 'a2-control-boss-plans']
const BT = ['a2-control-boss', 'a2-control-boss-travel']
const TP = 'future-plans' as const

export const A2_CONTROL_QUESTIONS: Question[] = [
  // ── El Anunciador · fase 1: will / going to ──
  { id: 'a2-12-m1', topic: TP, prompt: "It's cold in here. — OK, ___ close the window.", options: ["I'll", "I'm going", 'I closing'], answer: 0, tip: 'Decisión en el momento: will (I\'ll).', tags: MW },
  { id: 'a2-12-m2', topic: TP, prompt: 'Look at those dark clouds! It ___ rain.', options: ['is going to', 'will to', 'is raining to'], answer: 0, tip: 'Lo vemos venir (las nubes): going to.', tags: MW },
  { id: 'a2-12-m3', topic: TP, kind: 'fix', prompt: 'I going to travel by train next week.', options: ["I'm going to travel by train next week.", "I'm going travel by train next week.", 'I going travel by train next week.'], answer: 0, tip: 'am / is / are + going to + verbo.', tags: MW },
  { id: 'a2-12-m4', topic: TP, prompt: "I promise I ___ be late again.", options: ["won't", 'am not going', "don't will"], answer: 0, tip: "Promesa: will / won't (will not).", tags: MW },
  { id: 'a2-12-m5', topic: TP, kind: 'order', prompt: 'Creo que mañana lloverá.', options: ['I', 'think', 'it', 'will', 'rain', 'tomorrow.'], answer: 0, tip: 'Opinión o predicción con I think: will.', tags: MW },

  // ── El Anunciador · fase 2: planes acordados (presente continuo) ──
  { id: 'a2-12-m6', topic: TP, prompt: "I can't meet you on Friday. I ___ my grandmother in Lake Town.", options: ['am visiting', 'visit going', 'will visiting'], answer: 0, tip: 'Plan ya acordado: presente continuo (am visiting).', tags: MP },
  { id: 'a2-12-m7', topic: TP, kind: 'fix', prompt: "We are meet Adrián at three o'clock.", options: ["We are meeting Adrián at three o'clock.", "We meeting Adrián at three o'clock.", "We are meet to Adrián at three o'clock."], answer: 0, tip: 'are + verbo con -ing.', tags: MP },
  { id: 'a2-12-m8', topic: TP, prompt: '___ are you doing this weekend? — I am going to the museum.', options: ['What', 'Where', 'Who'], answer: 0, tip: 'Preguntar por planes: What are you doing…?', tags: MP },
  { id: 'a2-12-m9', topic: TP, prompt: 'My sister ___ tomorrow. She has her ticket.', options: ['is arriving', 'arrive', 'will arriving'], answer: 0, tip: 'Tiene boleto: plan acordado → is arriving.', tags: MP },
  { id: 'a2-12-m10', topic: TP, kind: 'order', prompt: 'Esta noche ceno con Leo (ya lo acordamos).', options: ['I', 'am', 'having', 'dinner', 'with', 'Leo', 'tonight.'], answer: 0, tip: 'Plan acordado: am + having.', tags: MP },

  // ── Adrián · fase 1: contraste de las tres formas ──
  { id: 'a2-12-b1', topic: TP, prompt: 'We have the tickets. We ___ to Sky Port at noon.', options: ['are flying', 'fly going', 'are fly'], answer: 0, tip: 'Con boletos: plan acordado → are flying.', tags: BP },
  { id: 'a2-12-b2', topic: TP, prompt: "The routes are closed! — Don't worry. ___ find a new route for you.", options: ["I'll", "I'm going", 'I finding'], answer: 0, tip: 'Ofrecer ayuda en el momento: will (I\'ll).', tags: BP },
  { id: 'a2-12-b3', topic: TP, kind: 'fix', prompt: 'Look! The train is go to crash!', options: ['Look! The train is going to crash!', 'Look! The train going to crash!', 'Look! The train is going crash!'], answer: 0, tip: 'Evidencia: is going to + verbo.', tags: BP },
  { id: 'a2-12-b4', topic: TP, prompt: "I'm sure you ___ enjoy the trip.", options: ['will', 'are going', 'are enjoying'], answer: 0, tip: "Predicción con I'm sure: will.", tags: BP },
  { id: 'a2-12-b5', topic: TP, kind: 'order', prompt: 'No vamos a cancelar el viaje.', options: ['We', 'are', 'not', 'going', 'to', 'cancel', 'the', 'trip.'], answer: 0, tip: 'Negativo: are not going to + verbo.', tags: BP },

  // ── Adrián · fase 2: viajes y reservas ──
  { id: 'a2-12-b6', topic: TP, prompt: "I'd like to ___ a ticket to Lake Town, please.", options: ['book', 'make up', 'reserve to'], answer: 0, tip: 'Reservar un boleto: book a ticket.', tags: BT },
  { id: 'a2-12-b7', topic: TP, prompt: "Is this a single ticket? — No, it's a ___ ticket. I'm coming back on Sunday.", options: ['return', 'single', 'cancelled'], answer: 0, tip: 'Ida y vuelta: return.', tags: BT },
  { id: 'a2-12-b8', topic: TP, prompt: 'The 10:15 train is ___. It is going to arrive at 10:45.', options: ['delayed', 'booked', 'single'], answer: 0, tip: 'Llega tarde: delayed.', tags: BT },
  { id: 'a2-12-b9', topic: TP, kind: 'fix', prompt: 'Your train leaves from the platform three.', options: ['Your train leaves from platform three.', 'Your train leaves of platform three.', 'Your train leaves from the three platform.'], answer: 0, tip: 'platform + número, sin the.', tags: BT },
  { id: 'a2-12-b10', topic: TP, prompt: 'Please ___ in at the desk two hours before your flight.', options: ['check', 'take', 'get'], answer: 0, tip: 'Registrarse en el aeropuerto o el hotel: check in.', tags: BT },
]
