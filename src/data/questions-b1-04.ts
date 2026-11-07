import type { Question } from '../game/types'

/**
 * B1-04 · House Rules (presente, residencia de Lumen Bay). Bloque A:
 *  - Práctica guiada de Maya después de su lección 'obligation-b1' (lista fija en data/tasks.ts): tag b1-04-practice1.
 * Bloque B (data/b1Neighbours.ts): los dos vecinos ruidosos (esbirros, banco compartido): tag b1-04-neighbour.
 * Los bloques 4-C y 4-D agregan sus preguntas aquí.
 * Regla: en las preguntas de elegir solo UNA opción es gramaticalmente correcta.
 */
const PRACTICE1 = ['b1-04-practice1']
const OB = 'obligation-b1' as const
const NEIGHBOUR = ['b1-04-neighbour']

/** Práctica guiada de Maya, en orden */
export const B1_04_PRACTICE1_IDS = ['b1-04-p1', 'b1-04-p2', 'b1-04-p3', 'b1-04-p4', 'b1-04-p5', 'b1-04-p6', 'b1-04-p7', 'b1-04-p8']

export const B1_04_QUESTIONS: Question[] = [
  // ── Práctica guiada de Maya (vestíbulo de la residencia) ──
  { id: 'b1-04-p1', topic: OB, prompt: "You ___ show your passport at the bank. It's necessary.", options: ['have to', 'have', 'must to'], answer: 0, tip: 'Necesario: have to + verbo base.', tags: PRACTICE1 },
  { id: 'b1-04-p2', topic: OB, prompt: "You ___ smoke inside the building. It's forbidden.", options: ["mustn't", "don't have to", "haven't to"], answer: 0, tip: "Prohibido: mustn't.", tags: PRACTICE1 },
  { id: 'b1-04-p3', topic: OB, prompt: "It's Sunday. You ___ get up early. You can sleep.", options: ["don't have to", "mustn't", 'must'], answer: 0, tip: "No es necesario: don't have to.", tags: PRACTICE1 },
  { id: 'b1-04-p4', topic: OB, kind: 'fix', prompt: 'You must to pay by the 5th.', options: ['You must pay by the 5th.', 'You must paying by the 5th.', 'You musts pay by the 5th.'], answer: 0, tip: 'must + verbo base, sin to.', tags: PRACTICE1 },
  { id: 'b1-04-p5', topic: OB, kind: 'fix', prompt: "You don't must smoke here.", options: ["You mustn't smoke here.", "You don't must to smoke here.", 'You not must smoke here.'], answer: 0, tip: "Prohibido: mustn't (no 'don't must').", tags: PRACTICE1 },
  { id: 'b1-04-p6', topic: OB, kind: 'fix', prompt: 'She have to show her ID.', options: ['She has to show her ID.', 'She haves to show her ID.', 'She have to shows her ID.'], answer: 0, tip: 'She = has to + verbo base.', tags: PRACTICE1 },
  { id: 'b1-04-p7', topic: OB, kind: 'order', prompt: 'No tienes que limpiar la cocina.', options: ['You', "don't", 'have', 'to', 'clean', 'the', 'kitchen.'], answer: 0, tip: "don't have to + verbo base.", tags: PRACTICE1 },
  {
    id: 'b1-04-p8',
    topic: OB,
    kind: 'listen',
    audio: "Welcome. You must pay the rent by the fifth. You mustn't have parties after ten. And you don't have to clean the garden.",
    voice: 'female',
    prompt: '¿Qué NO es obligatorio?',
    options: ['Limpiar el jardín.', 'Pagar el alquiler.', 'Hacer fiestas.'],
    answer: 0,
    tip: "don't have to = no es obligatorio.",
    tags: PRACTICE1,
  },

  // ── Vecinos ruidosos (2 esbirros del pasillo, banco compartido) ──
  { id: 'b1-04-n1', topic: OB, kind: 'fix', prompt: 'You must to be quiet.', options: ['You must be quiet.', 'You must being quiet.', 'You musts be quiet.'], answer: 0, tip: 'must + verbo base, sin to.', tags: NEIGHBOUR },
  { id: 'b1-04-n2', topic: OB, kind: 'fix', prompt: "I don't must follow your rules.", options: ["I don't have to follow your rules.", "I don't must to follow your rules.", 'I not have to follow your rules.'], answer: 0, tip: "No es necesario: don't have to (no 'don't must').", tags: NEIGHBOUR },
  { id: 'b1-04-n3', topic: OB, kind: 'fix', prompt: 'My neighbour have to wake up early.', options: ['My neighbour has to wake up early.', 'My neighbour haves to wake up early.', 'My neighbour have to wakes up early.'], answer: 0, tip: 'My neighbour = he/she: has to + verbo base.', tags: NEIGHBOUR },
  { id: 'b1-04-n4', topic: OB, kind: 'fix', prompt: "You mustn't to complain.", options: ["You mustn't complain.", "You mustn't to complain.", "You don't mustn't complain."], answer: 0, tip: "mustn't + verbo base, sin to.", tags: NEIGHBOUR },
  { id: 'b1-04-n5', topic: OB, prompt: "It's midnight. You ___ make noise. It's forbidden.", options: ["mustn't", "don't have to", "haven't to"], answer: 0, tip: "Prohibido: mustn't.", tags: NEIGHBOUR },
  { id: 'b1-04-n6', topic: OB, prompt: 'The bills are included. You ___ pay them.', options: ["don't have to", "mustn't", 'must'], answer: 0, tip: "Están incluidas: no es necesario, don't have to.", tags: NEIGHBOUR },
  { id: 'b1-04-n7', topic: OB, prompt: "Rule: you ___ wash your plate after dinner. It's necessary.", options: ['have to', "don't have to", "mustn't"], answer: 0, tip: 'Necesario: have to.', tags: NEIGHBOUR },
  { id: 'b1-04-n8', topic: OB, kind: 'order', prompt: 'No deben hacer ruido después de las diez.', options: ['You', "mustn't", 'make', 'noise', 'after', 'ten.'], answer: 0, tip: "mustn't + verbo base.", tags: NEIGHBOUR },
  { id: 'b1-04-n9', topic: OB, kind: 'order', prompt: 'Tengo que levantarme temprano mañana.', options: ['I', 'have', 'to', 'get', 'up', 'early', 'tomorrow.'], answer: 0, tip: 'have to + verbo base.', tags: NEIGHBOUR },
  {
    id: 'b1-04-n10',
    topic: OB,
    kind: 'listen',
    audio: "Hello, neighbours. You mustn't play loud music after ten. You have to be quiet at night. But you don't have to stop talking!",
    voice: 'male',
    prompt: '¿Qué está prohibido después de las diez?',
    options: ['Poner música fuerte.', 'Hablar.', 'Cocinar.'],
    answer: 0,
    tip: "You mustn't play loud music after ten.",
    tags: NEIGHBOUR,
  },
]
