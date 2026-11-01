import type { Question } from '../game/types'

/**
 * A2-03 · Day in the City.
 * Invitaciones y frecuencia (4 frases: son la práctica guiada de Leo) y consejos y reglas en la ciudad
 * (solo salen en el combate del café, etiqueta a2-city). Las de completar y ordenar también salen como escucha y escritura.
 */
const T = ['a2-city']

export const A2_CITY_QUESTIONS: Question[] = [
  // ── Invitaciones y frecuencia (práctica de Leo + combate) ──
  { id: 'a2-03-o1', topic: 'invitations', kind: 'order', prompt: '¿Te gustaría venir al café?', options: ['Would', 'you', 'like', 'to', 'come', 'to', 'the', 'café?'], answer: 0, tip: 'Would + you + like to + verbo...?', tags: T },
  { id: 'a2-03-o2', topic: 'invitations', kind: 'order', prompt: 'Normalmente camino al parque los domingos.', options: ['I', 'usually', 'walk', 'to', 'the', 'park', 'on', 'Sundays.'], answer: 0, tip: 'La frecuencia va antes del verbo: I usually walk.', tags: T },
  { id: 'a2-03-f1', topic: 'invitations', prompt: "It's a sunny day. Let's ___ to the park!", options: ['go', 'to go', 'going'], answer: 0, tip: "Let's + verbo tal cual: Let's go.", tags: T },
  { id: 'a2-03-x1', topic: 'invitations', kind: 'fix', prompt: 'How about go to the café?', options: ['How about going to the café?', 'How about to go to the café?', 'How about goes to the café?'], answer: 0, tip: 'How about + verbo con -ing: How about going...?', tags: T },

  // ── Consejos y reglas en la ciudad (solo combate) ──
  { id: 'a2-03-s1', topic: 'should-must', prompt: "It's very late. We ___ go home now.", options: ['should', 'should to', 'shoulds'], answer: 0, tip: 'Should + verbo solo: we should go.', tags: T },
  { id: 'a2-03-s2', topic: 'should-must', prompt: "Café rule: You ___ pay before you sit down.", options: ['must', 'must to', 'musts'], answer: 0, tip: 'Una regla: must + verbo solo.', tags: T },
  { id: 'a2-03-s3', topic: 'should-must', prompt: "You ___ order a coffee. Water is free here.", options: ["don't have to", "doesn't have to", "mustn't to"], answer: 0, tip: "No es necesario: don't have to. Con you: don't.", tags: T },
  { id: 'a2-03-s4', topic: 'should-must', kind: 'fix', prompt: 'You must to try the cake here!', options: ['You must try the cake here!', 'You musts try the cake here!', 'You must trying the cake here!'], answer: 0, tip: 'Después de must no va to: must try.', tags: T },
  { id: 'a2-03-s5', topic: 'should-must', kind: 'order', prompt: 'Deberías venir con nosotros.', options: ['You', 'should', 'come', 'with', 'us.'], answer: 0, tip: 'You + should + verbo: You should come.', tags: T },
]
