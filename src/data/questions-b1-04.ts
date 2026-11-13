import type { Question } from '../game/types'

/**
 * B1-04 · House Rules (presente, residencia de Lumen Bay). Bloque A:
 *  - Práctica guiada de Maya después de su lección 'obligation-b1' (lista fija en data/tasks.ts): tag b1-04-practice1.
 * Bloque B (data/b1Neighbours.ts): los dos vecinos ruidosos (esbirros, banco compartido): tag b1-04-neighbour.
 * Bloque C (el banco): práctica de escucha de Ricardo (tag b1-04-bank) y práctica de Maya después de su lección 'bank-phrasal'
 *   (tag b1-04-practice2); listas fijas en data/tasks.ts.
 * Bloque D: Mr. Fine Print (data/b1FinePrintBoss.ts), fase 1 obligación (tag b1-04-boss-ob) y fase 2 phrasal verbs y banco (tag b1-04-boss-ph).
 * Regla: en las preguntas de elegir solo UNA opción es gramaticalmente correcta.
 */
const PRACTICE1 = ['b1-04-practice1']
const OB = 'obligation-b1' as const
const NEIGHBOUR = ['b1-04-neighbour']
const BANK = ['b1-04-bank']
const PRACTICE2 = ['b1-04-practice2']
const BP = 'bank-phrasal' as const
const BOSS_OB = ['b1-04-boss', 'b1-04-boss-ob']
const BOSS_PH = ['b1-04-boss', 'b1-04-boss-ph']
/** Bloque C: lo que explica Ricardo (b1 a b4 usan el mismo audio) */
const BANK_AUDIO =
  "To open a student account you need three documents: your passport, a proof of address, and your student ID. You have to fill in a form, and then you can pay in some money. We'll give you a debit card, and you can take out money from any cash machine. Your PIN must be secret."

/** Bloque C: práctica de escucha de Ricardo y práctica de Maya (phrasal verbs), en orden */
export const B1_04_BANK_IDS = ['b1-04-b1', 'b1-04-b2', 'b1-04-b3', 'b1-04-b4']
export const B1_04_PRACTICE2_IDS = ['b1-04-f1', 'b1-04-f2', 'b1-04-f3', 'b1-04-f4', 'b1-04-f5', 'b1-04-f6', 'b1-04-f7', 'b1-04-f8']

/** Práctica guiada de Maya, en orden */
export const B1_04_PRACTICE1_IDS = ['b1-04-p1', 'b1-04-p2', 'b1-04-p3', 'b1-04-p4', 'b1-04-p5', 'b1-04-p6', 'b1-04-p7', 'b1-04-p8']

export const B1_04_QUESTIONS: Question[] = [
  // ── Práctica guiada de Maya (vestíbulo de la residencia) ──
  { id: 'b1-04-p1', topic: OB, prompt: "You ___ show your passport at the bank. It's necessary.", options: ['have to', 'have', 'must to'], answer: 0, tip: 'Necesario: have to + verbo base.', tags: PRACTICE1 },
  { id: 'b1-04-p2', topic: OB, prompt: "You ___ smoke inside the building. It's forbidden.", options: ["don't have to", "mustn't", "haven't to"], answer: 1, tip: "Prohibido: mustn't.", tags: PRACTICE1 },
  { id: 'b1-04-p3', topic: OB, prompt: "It's Sunday. You ___ get up early. You can sleep.", options: ["mustn't", 'must', "don't have to"], answer: 2, tip: "No es necesario: don't have to.", tags: PRACTICE1 },
  { id: 'b1-04-p4', topic: OB, kind: 'fix', prompt: 'You must to pay by the 5th.', options: ['You must paying by the 5th.', 'You must pay by the 5th.', 'You musts pay by the 5th.'], answer: 1, tip: 'must + verbo base, sin to.', tags: PRACTICE1 },
  { id: 'b1-04-p5', topic: OB, kind: 'fix', prompt: "You don't must smoke here.", options: ["You mustn't smoke here.", "You don't must to smoke here.", 'You not must smoke here.'], answer: 0, tip: "Prohibido: mustn't (no 'don't must').", tags: PRACTICE1 },
  { id: 'b1-04-p6', topic: OB, kind: 'fix', prompt: 'She have to show her ID.', options: ['She haves to show her ID.', 'She have to shows her ID.', 'She has to show her ID.'], answer: 2, tip: 'She = has to + verbo base.', tags: PRACTICE1 },
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
  { id: 'b1-04-n1', topic: OB, kind: 'fix', prompt: 'You must to be quiet.', options: ['You must being quiet.', 'You must be quiet.', 'You musts be quiet.'], answer: 1, tip: 'must + verbo base, sin to.', tags: NEIGHBOUR },
  { id: 'b1-04-n2', topic: OB, kind: 'fix', prompt: "I don't must follow your rules.", options: ["I don't must to follow your rules.", 'I not have to follow your rules.', "I don't have to follow your rules."], answer: 2, tip: "No es necesario: don't have to (no 'don't must').", tags: NEIGHBOUR },
  { id: 'b1-04-n3', topic: OB, kind: 'fix', prompt: 'My neighbour have to wake up early.', options: ['My neighbour haves to wake up early.', 'My neighbour has to wake up early.', 'My neighbour have to wakes up early.'], answer: 1, tip: 'My neighbour = he/she: has to + verbo base.', tags: NEIGHBOUR },
  { id: 'b1-04-n4', topic: OB, kind: 'fix', prompt: "You mustn't to complain.", options: ["You mustn't complain.", "You mustn't to complain.", "You don't mustn't complain."], answer: 0, tip: "mustn't + verbo base, sin to.", tags: NEIGHBOUR },
  { id: 'b1-04-n5', topic: OB, prompt: "It's midnight. You ___ make noise. It's forbidden.", options: ["don't have to", "haven't to", "mustn't"], answer: 2, tip: "Prohibido: mustn't.", tags: NEIGHBOUR },
  { id: 'b1-04-n6', topic: OB, prompt: 'The bills are included. You ___ pay them.', options: ["don't have to", "mustn't", 'must'], answer: 0, tip: "Están incluidas: no es necesario, don't have to.", tags: NEIGHBOUR },
  { id: 'b1-04-n7', topic: OB, prompt: "Rule: you ___ wash your plate after dinner. It's necessary.", options: ["don't have to", 'have to', "mustn't"], answer: 1, tip: 'Necesario: have to.', tags: NEIGHBOUR },
  { id: 'b1-04-n8', topic: OB, kind: 'order', alts: ["After ten you mustn't make noise."], prompt: 'No deben hacer ruido después de las diez.', options: ['You', "mustn't", 'make', 'noise', 'after', 'ten.'], answer: 0, tip: "mustn't + verbo base.", tags: NEIGHBOUR },
  { id: 'b1-04-n9', topic: OB, kind: 'order', alts: ["Tomorrow I have to get up early."], prompt: 'Tengo que levantarme temprano mañana.', options: ['I', 'have', 'to', 'get', 'up', 'early', 'tomorrow.'], answer: 0, tip: 'have to + verbo base.', tags: NEIGHBOUR },
  {
    id: 'b1-04-n10',
    topic: OB,
    kind: 'listen',
    audio: "Hello, neighbours. You mustn't play loud music after ten. You have to be quiet at night. But you don't have to stop talking!",
    voice: 'male',
    prompt: '¿Qué está prohibido después de las diez?',
    options: ['Hablar.', 'Cocinar.', 'Poner música fuerte.'],
    answer: 2,
    tip: "You mustn't play loud music after ten.",
    tags: NEIGHBOUR,
  },

  // ── Bloque C · Ricardo: práctica de escucha (mismo audio) ──
  { id: 'b1-04-b1', topic: BP, kind: 'listen', audio: BANK_AUDIO, voice: 'male', prompt: '¿Cuántos documentos necesitan?', options: ['Dos.', 'Tres.', 'Cuatro.'], answer: 1, tip: 'three documents: passport, proof of address and student ID.', tags: BANK },
  { id: 'b1-04-b2', topic: BP, kind: 'listen', audio: BANK_AUDIO, voice: 'male', prompt: '¿Qué tienen que llenar?', options: ['Un formulario.', 'Un pasaporte.', 'Una tarjeta.'], answer: 0, tip: 'You have to fill in a form.', tags: BANK },
  { id: 'b1-04-b3', topic: BP, kind: 'listen', audio: BANK_AUDIO, voice: 'male', prompt: '¿Dónde pueden sacar dinero?', options: ['Solo en este banco.', 'En la residencia.', 'En cualquier cajero automático.'], answer: 2, tip: 'take out money from any cash machine.', tags: BANK },
  { id: 'b1-04-b4', topic: BP, kind: 'listen', audio: BANK_AUDIO, voice: 'male', prompt: '¿Qué deben hacer con el PIN?', options: ['Mantenerlo en secreto.', 'Dárselo a Marisol.', 'Escribirlo en la tarjeta.'], answer: 0, tip: 'Your PIN must be secret.', tags: BANK },

  // ── Bloque C · Maya en el banco: práctica de phrasal verbs ──
  { id: 'b1-04-f1', topic: BP, prompt: 'Please ___ the form. Use your full name.', options: ['fill on', 'fill in', 'fill at'], answer: 1, tip: 'fill in = llenar un formulario.', tags: PRACTICE2 },
  { id: 'b1-04-f2', topic: BP, prompt: 'I want to ___ for the swimming class. It starts on Monday.', options: ['sign down', 'sign below', 'sign up'], answer: 2, tip: 'sign up = inscribirse.', tags: PRACTICE2 },
  { id: 'b1-04-f3', topic: BP, prompt: 'The form is on the desk. ___ now, please.', options: ['Fill in it', 'Fill it in', 'Fill on it'], answer: 1, tip: 'Con pronombre, va en medio: fill it in.', tags: PRACTICE2 },
  { id: 'b1-04-f4', topic: BP, kind: 'fix', prompt: 'Turn on it, please.', options: ['Turn it on, please.', 'Turn on to it, please.', 'Turn it to on, please.'], answer: 0, tip: 'Con pronombre, va en medio: turn it on.', tags: PRACTICE2 },
  { id: 'b1-04-f5', topic: BP, kind: 'fix', prompt: 'Pick up it, please.', options: ['Pick up to it, please.', 'Pick it to up, please.', 'Pick it up, please.'], answer: 2, tip: 'Con pronombre, va en medio: pick it up.', tags: PRACTICE2 },
  { id: 'b1-04-f6', topic: BP, prompt: 'I need to ___ some money into my account.', options: ['pay in', 'pay on', 'pay at'], answer: 0, tip: 'pay in = ingresar dinero.', tags: PRACTICE2 },
  { id: 'b1-04-f7', topic: BP, prompt: 'I need cash. Where is the ___?', options: ['machine cash', 'cash machine', 'cash of machine'], answer: 1, tip: 'El primer sustantivo describe al segundo: cash machine.', tags: PRACTICE2 },
  { id: 'b1-04-f8', topic: BP, kind: 'order', prompt: 'Quisiera abrir una cuenta bancaria.', options: ["I'd", 'like', 'to', 'open', 'a', 'bank', 'account.'], answer: 0, tip: "I'd like to + verbo base. bank account = cuenta bancaria.", tags: PRACTICE2 },
  // ── Bloque D · Mr. Fine Print, fase 1: obligación ──
  { id: 'b1-04-bo1', topic: OB, kind: 'fix', prompt: 'You must to sign here.', options: ['You must signing here.', 'You musts sign here.', 'You must sign here.'], answer: 2, tip: 'must + verbo base, sin to.', tags: BOSS_OB },
  { id: 'b1-04-bo2', topic: OB, kind: 'fix', prompt: "You don't must make noise.", options: ["You don't must to make noise.", "You mustn't make noise.", 'You not must make noise.'], answer: 1, tip: "Prohibido: mustn't (no 'don't must').", tags: BOSS_OB },
  { id: 'b1-04-bo3', topic: OB, kind: 'fix', prompt: 'He have to pay today.', options: ['He has to pay today.', 'He haves to pay today.', 'He have to pays today.'], answer: 0, tip: 'He = has to + verbo base.', tags: BOSS_OB },
  { id: 'b1-04-bo4', topic: OB, prompt: "It's forbidden to open the door to strangers. You ___ open it.", options: ["don't have to", "needn't to", "mustn't"], answer: 2, tip: "Prohibido: mustn't.", tags: BOSS_OB },
  { id: 'b1-04-bo5', topic: OB, prompt: 'Marisol takes out the rubbish on Mondays. You ___ do it.', options: ["don't have to", "mustn't", 'must'], answer: 0, tip: "Lo hace Marisol: no es necesario, don't have to.", tags: BOSS_OB },
  { id: 'b1-04-bo6', topic: OB, kind: 'order', alts: ["Today I have to sign the contract."], prompt: 'Tengo que firmar el contrato hoy.', options: ['I', 'have', 'to', 'sign', 'the', 'contract', 'today.'], answer: 0, tip: 'have to + verbo base.', tags: BOSS_OB },
  {
    id: 'b1-04-bo7',
    topic: OB,
    kind: 'listen',
    audio: "Please remember: you have to keep your key safe. You mustn't give it to strangers. And you don't have to tell me when you go out.",
    voice: 'female',
    prompt: '¿Qué no es necesario hacer?',
    options: ['Cuidar la llave.', 'Avisarle a Marisol cuando salen.', 'Darle la llave a extraños.'],
    answer: 1,
    tip: "you don't have to tell me when you go out.",
    tags: BOSS_OB,
  },

  // ── Bloque D · Mr. Fine Print, fase 2: phrasal verbs y banco ──
  { id: 'b1-04-bp1', topic: BP, kind: 'fix', prompt: 'Fill in it, please.', options: ['Fill in to it, please.', 'Fill it to in, please.', 'Fill it in, please.'], answer: 2, tip: 'Con pronombre, va en medio: fill it in.', tags: BOSS_PH },
  { id: 'b1-04-bp2', topic: BP, kind: 'fix', prompt: 'Plug in it, please.', options: ['Plug in to it, please.', 'Plug it in, please.', 'Plug it to in, please.'], answer: 1, tip: 'Con pronombre, va en medio: plug it in.', tags: BOSS_PH },
  { id: 'b1-04-bp3', topic: BP, kind: 'fix', prompt: 'Pick up them, please.', options: ['Pick them up, please.', 'Pick up to them, please.', 'Pick them to up, please.'], answer: 0, tip: 'Con pronombre, va en medio: pick them up.', tags: BOSS_PH },
  { id: 'b1-04-bp4', topic: BP, prompt: 'I want to ___ money at the cash machine.', options: ['take down', 'take under', 'take out'], answer: 2, tip: 'take out = sacar.', tags: BOSS_PH },
  { id: 'b1-04-bp5', topic: BP, prompt: 'I need a ___ to pay in the shop.', options: ['debit card', 'card debit', 'debit of card'], answer: 0, tip: 'El primer sustantivo describe al segundo: debit card.', tags: BOSS_PH },
  { id: 'b1-04-bp6', topic: BP, kind: 'order', prompt: 'Tengo que llenar este formulario.', options: ['I', 'have', 'to', 'fill', 'in', 'this', 'form.'], answer: 0, tip: 'have to + fill in + objeto.', tags: BOSS_PH },
  {
    id: 'b1-04-bp7',
    topic: BP,
    kind: 'listen',
    audio: 'Please fill in this form and sign it. Then pay in the money at the counter. You can take out cash at any cash machine.',
    voice: 'male',
    prompt: '¿Dónde ingresan el dinero?',
    options: ['En el cajero automático.', 'En el mostrador.', 'En la residencia.'],
    answer: 1,
    tip: 'pay in the money at the counter.',
    tags: BOSS_PH,
  },
]
