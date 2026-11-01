import type { Question } from '../game/types'

/**
 * A2-04 · Mr. Hale's Workshop.
 * Peticiones corteses (Can / Could / Would you mind...?) y instrucciones con responsabilidades (First, Then, After that,
 * Finally · It's my job to · be responsible for · have to). La práctica de Leo usa una lista fija (ver data/tasks.ts);
 * el jefe Mr. Hale pregunta solo de aquí (etiqueta a2-workshop): fase 1 peticiones, fase 2 instrucciones.
 */
const T = ['a2-workshop']

export const A2_WORKSHOP_QUESTIONS: Question[] = [
  // ── Peticiones corteses (práctica de Leo + fase 1 del jefe) ──
  { id: 'a2-04-r1', topic: 'requests', prompt: '___ you pass me the hammer, please?', options: ['Can', 'Do', 'Are'], answer: 0, tip: 'Para pedir algo: Can / Could + you + verbo...?', tags: T },
  { id: 'a2-04-r2', topic: 'requests', prompt: 'Would you mind ___ the window? It is very hot.', options: ['opening', 'open', 'to open'], answer: 0, tip: 'Would you mind + verbo con -ing: opening.', tags: T },
  { id: 'a2-04-r3', topic: 'requests', kind: 'order', prompt: '¿Podrías ayudarme con esta caja, por favor?', options: ['Could', 'you', 'help', 'me', 'with', 'this', 'box,', 'please?'], answer: 0, tip: 'Could + you + verbo + ... + please?', tags: T },
  { id: 'a2-04-r4', topic: 'requests', kind: 'fix', prompt: 'Could you to give me the screwdriver?', options: ['Could you give me the screwdriver?', 'Could you giving me the screwdriver?', 'Could you gives me the screwdriver?'], answer: 0, tip: 'Después de could you no va to: Could you give...?', tags: T },
  { id: 'a2-04-r5', topic: 'requests', kind: 'fix', prompt: 'Would you mind hold the ladder?', options: ['Would you mind holding the ladder?', 'Would you mind to hold the ladder?', 'Would you mind holds the ladder?'], answer: 0, tip: 'Would you mind + verbo con -ing: holding.', tags: T },
  { id: 'a2-04-r6', topic: 'requests', prompt: 'Can you help me? — Sure, ___ problem!', options: ['no', 'not', 'any'], answer: 0, tip: 'Para aceptar: Sure, no problem!', tags: T },
  // Se usa sobre todo como "escribe una petición" (T-a2-04-r7) en la práctica de Leo
  { id: 'a2-04-r7', topic: 'requests', kind: 'order', prompt: 'Pide la llave inglesa: ¿Puedes darme la llave inglesa, por favor?', options: ['Can', 'you', 'give', 'me', 'the', 'wrench,', 'please?'], answer: 0, tip: 'Can + you + verbo + me + ... + please?', tags: T },
  { id: 'a2-04-r8', topic: 'requests', prompt: "Could you help me? — Sorry, I ___. I'm busy right now.", options: ["can't", "don't", "couldn't to"], answer: 0, tip: "Para decir que no con amabilidad: Sorry, I can't. + la razón.", tags: T },

  // ── Instrucciones y responsabilidades (práctica de Leo + fase 2 del jefe) ──
  { id: 'a2-04-i1', topic: 'instructions', kind: 'order', prompt: 'Primero, apaga la máquina.', options: ['First,', 'turn', 'off', 'the', 'machine.'], answer: 0, tip: 'Instrucción: First, + verbo tal cual (turn off).', tags: T },
  { id: 'a2-04-i2', topic: 'instructions', prompt: 'First, open the box. ___, take out the old battery.', options: ['Then', 'Before', 'First'], answer: 0, tip: 'El segundo paso: Then (luego).', tags: T },
  { id: 'a2-04-i3', topic: 'instructions', prompt: 'After that, ___ the new battery in the radio.', options: ['put', 'puts', 'putting'], answer: 0, tip: 'En instrucciones el verbo va tal cual: put.', tags: T },
  { id: 'a2-04-i4', topic: 'instructions', kind: 'fix', prompt: 'After that, checks the wires.', options: ['After that, check the wires.', 'After that, checking the wires.', 'After that, to checks the wires.'], answer: 0, tip: 'Instrucción: el verbo sin -s: check.', tags: T },
  { id: 'a2-04-i5', topic: 'instructions', kind: 'order', prompt: 'Por último, prueba la radio.', options: ['Finally,', 'test', 'the', 'radio.'], answer: 0, tip: 'El último paso: Finally, + verbo.', tags: T },
  { id: 'a2-04-i6', topic: 'instructions', prompt: "It's my job ___ the tools every evening.", options: ['to clean', 'clean', 'cleaning'], answer: 0, tip: "It's my job + to + verbo: to clean.", tags: T },
  { id: 'a2-04-i7', topic: 'instructions', prompt: 'Mr. Hale is responsible ___ the workshop.', options: ['for', 'of', 'to'], answer: 0, tip: 'Responsable de algo: responsible for.', tags: T },
  { id: 'a2-04-i8', topic: 'instructions', prompt: 'In the workshop we ___ to wear gloves. It is the rule.', options: ['have', 'has', 'having'], answer: 0, tip: 'Con we: have to + verbo.', tags: T },
  { id: 'a2-04-i9', topic: 'instructions', kind: 'fix', prompt: 'She is responsible of the tools.', options: ['She is responsible for the tools.', 'She responsible for the tools.', 'She is responsible to the tools.'], answer: 0, tip: 'Responsable de algo: be + responsible for.', tags: T },
]
