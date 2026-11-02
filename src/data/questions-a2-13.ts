import type { Question } from '../game/types'

/**
 * A2-13 · The Missing Voice (hospital, presente). Salud y síntomas, consejos y emergencias.
 * La práctica guiada de Leo está en data/a2Return.ts (lista fija). Aquí solo los combates:
 * la paciente silenciada (fase 1 síntomas: a2-return-minion-ill · fase 2 consejos: a2-return-minion-advice) y
 * la fase 4 de The Silence (salud y emergencias: a2-return-boss-health). Las fases 1-3 del jefe reutilizan
 * las preguntas de los jefes de A2-08, A2-07, A2-10 y A2-12 (repaso de A2).
 */
const MI = ['a2-return-minion', 'a2-return-minion-ill']
const MA = ['a2-return-minion', 'a2-return-minion-advice']
const BH = ['a2-return-boss', 'a2-return-boss-health']
const TP = 'health-emergency' as const

export const A2_RETURN_QUESTIONS: Question[] = [
  // ── La paciente silenciada · fase 1: síntomas ──
  { id: 'a2-13-m1', topic: TP, prompt: "You look pale. What's ___?", options: ['wrong', 'matter', 'hurt'], answer: 0, tip: "What's wrong? = What's the matter? (¿Qué te pasa?).", tags: MI },
  { id: 'a2-13-m2', topic: TP, prompt: "He ___ a terrible cough. He can't sleep.", options: ['has got', 'have got', 'is got'], answer: 0, tip: 'Con he: has got.', tags: MI },
  { id: 'a2-13-m3', topic: TP, kind: 'fix', prompt: 'My ears hurts when I hear the purple light.', options: ['My ears hurt when I hear the purple light.', 'My ears is hurt when I hear the purple light.', 'My ears hurting when I hear the purple light.'], answer: 0, tip: 'Varias partes del cuerpo (my ears): hurt, sin -s.', tags: MI },
  { id: 'a2-13-m4', topic: TP, prompt: 'I feel ___. I think I am going to fall.', options: ['dizzy', 'dizziness', 'a dizzy'], answer: 0, tip: 'I feel + adjetivo: I feel dizzy / sick / tired.', tags: MI },
  { id: 'a2-13-m5', topic: TP, kind: 'order', prompt: 'Me duele el estómago.', options: ['I', 'have', 'got', 'a', 'stomachache.'], answer: 0, tip: 'Dolores: I have got a headache / a stomachache / a toothache.', tags: MI },

  // ── La paciente silenciada · fase 2: consejos ──
  { id: 'a2-13-m6', topic: TP, prompt: "I've got a fever. — You ___ go to school today.", options: ["shouldn't", 'should', "don't should"], answer: 0, tip: "Con fiebre no conviene ir a la escuela: shouldn't.", tags: MA },
  { id: 'a2-13-m7', topic: TP, kind: 'fix', prompt: 'You should to take this medicine twice a day.', options: ['You should take this medicine twice a day.', 'You should taking this medicine twice a day.', 'You shoulds take this medicine twice a day.'], answer: 0, tip: 'should + verbo base, sin to.', tags: MA },
  { id: 'a2-13-m8', topic: TP, prompt: "My throat hurts. — Why don't you ___ some hot tea with honey?", options: ['drink', 'to drink', 'drinking'], answer: 0, tip: "Sugerencia: Why don't you + verbo base?", tags: MA },
  { id: 'a2-13-m9', topic: TP, prompt: 'This is a hospital. You ___ use your phone in the operating room.', options: ["mustn't", "don't must", 'must to'], answer: 0, tip: "Una prohibición, una norma: mustn't.", tags: MA },
  { id: 'a2-13-m10', topic: TP, kind: 'order', prompt: 'Deberías descansar unos días.', options: ['You', 'should', 'rest', 'for', 'a', 'few', 'days.'], answer: 0, tip: 'Consejo: You should + verbo base.', tags: MA },

  // ── The Silence · fase 4: salud y emergencias ──
  { id: 'a2-13-b1', topic: TP, prompt: 'Emergency desk. ___ is your emergency?', options: ['What', 'Who', 'How'], answer: 0, tip: "La pregunta del operador: What's your emergency?", tags: BH },
  { id: 'a2-13-b2', topic: TP, prompt: "My friend has fainted. He ___ breathing, but he can't speak.", options: ['is', 'are', 'has'], answer: 0, tip: 'Está respirando ahora: he is breathing.', tags: BH },
  { id: 'a2-13-b3', topic: TP, kind: 'fix', prompt: 'Please come quick! We are in the second floor.', options: ['Please come quickly! We are on the second floor.', 'Please come quick! We are at the second floor.', 'Please coming quickly! We are on the second floor.'], answer: 0, tip: 'come quickly (adverbio) · on the second floor (pisos con on).', tags: BH },
  { id: 'a2-13-b4', topic: TP, prompt: 'He has lost his voice. He ___ see a doctor right now.', options: ['must', 'must to', 'musts'], answer: 0, tip: 'Algo necesario y urgente: must + verbo base.', tags: BH },
  { id: 'a2-13-b5', topic: TP, kind: 'order', prompt: 'Por favor, envíen una ambulancia rápido.', options: ['Please', 'send', 'an', 'ambulance', 'quickly.'], answer: 0, tip: 'Orden cortés: Please + verbo + objeto + quickly.', tags: BH },
]
