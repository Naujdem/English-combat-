import type { Question } from '../game/types'

/**
 * B1-03 · Words on a Screen (recuerdo 3). Bloque A:
 *  - Práctica de la primera página del Cuaderno de L (lista fija en data/tasks.ts, tarea b1-03-notebook): tag b1-03-practice1.
 * Bloque B:
 *  - Práctica de la segunda página (tarea b1-03-notebook2, tema present-perfect-cont): tag b1-03-practice2.
 * Bloque C:
 *  - Unread Messages (3 esbirros, banco compartido): tag b1-03-unread.
 *  - The Static (jefe): fase 1 b1-03-boss-msg (informal-messages) · fase 2 b1-03-boss-ppc (present-perfect-cont).
 * Regla: en las preguntas de elegir solo UNA opción es correcta.
 */
const PRACTICE1 = ['b1-03-practice1']
const IM = 'informal-messages' as const
const PRACTICE2 = ['b1-03-practice2']
const PPC = 'present-perfect-cont' as const
const UNREAD = ['b1-03-unread']
const BOSS_MSG = ['b1-03-boss', 'b1-03-boss-msg']
const BOSS_PPC = ['b1-03-boss', 'b1-03-boss-ppc']

/** Práctica de la página 1 del cuaderno, en orden */
export const B1_03_PRACTICE1_IDS = ['b1-03-p1', 'b1-03-p2', 'b1-03-p3', 'b1-03-p4', 'b1-03-p5', 'b1-03-p6']

/** Práctica de la página 2 del cuaderno, en orden */
export const B1_03_PRACTICE2_IDS = ['b1-03-pp1', 'b1-03-pp2', 'b1-03-pp3', 'b1-03-pp4', 'b1-03-pp5', 'b1-03-pp6', 'b1-03-pp7']

export const B1_03_QUESTIONS: Question[] = [
  // ── Cuaderno · página 1 ──
  { id: 'b1-03-p1', topic: IM, prompt: "Friend: 'Dinner at eight?' You: '___ See you there.'", options: ['Sounds good.', 'Sound well.', 'Listens good.'], answer: 0, tip: 'Sounds good = me parece bien (sin sujeto).', tags: PRACTICE1 },
  { id: 'b1-03-p2', topic: IM, prompt: 'Please ___ me when you arrive at the airport.', options: ['pinging', 'ping', 'to ping'], answer: 1, tip: 'Orden: el verbo base al principio: ping me.', tags: PRACTICE1 },
  { id: 'b1-03-p3', topic: IM, prompt: "I'll ___ you later. My battery is low.", options: ['texts', 'texting', 'text'], answer: 2, tip: "will + verbo base: I'll text you.", tags: PRACTICE1 },
  { id: 'b1-03-p4', topic: IM, kind: 'order', alts: ["When you arrive, drop me a line."], prompt: 'Mándame un mensaje cuando llegues.', options: ['Drop', 'me', 'a', 'line', 'when', 'you', 'arrive.'], answer: 0, tip: 'Drop me a line = mándame un mensaje.', tags: PRACTICE1 },
  { id: 'b1-03-p5', topic: IM, prompt: "Boss: 'Please send the report by Friday.' You write: '___'", options: ['Got it lol.', 'Understood. I will send it by Friday.', 'Ok bye.'], answer: 1, tip: 'Con un jefe: respuesta completa y cortés.', tags: PRACTICE1 },
  { id: 'b1-03-p6', topic: IM, prompt: "Friend: 'Can you come at six?' You: 'Got it. ___ then!'", options: ['See you', 'Seeing you', 'Saw you'], answer: 0, tip: 'Despedida rápida: See you then!', tags: PRACTICE1 },
  // ── Cuaderno · página 2 ──
  { id: 'b1-03-pp1', topic: PPC, prompt: "I ___ for you since six o'clock.", options: ['am waiting', 'waited', 'have been waiting'], answer: 2, tip: 'Empezó a las seis y sigue: have been waiting.', tags: PRACTICE2 },
  { id: 'b1-03-pp2', topic: PPC, prompt: 'She has been writing messages ___ two hours.', options: ['for', 'since', 'from'], answer: 0, tip: 'Un período de tiempo: for.', tags: PRACTICE2 },
  { id: 'b1-03-pp3', topic: PPC, prompt: 'They have been practicing ___ March.', options: ['for', 'since', 'during'], answer: 1, tip: 'Un punto de inicio: since.', tags: PRACTICE2 },
  { id: 'b1-03-pp4', topic: PPC, prompt: '___ long have you been learning English?', options: ['What', 'When', 'How'], answer: 2, tip: 'Duración: How long...?', tags: PRACTICE2 },
  { id: 'b1-03-pp5', topic: PPC, kind: 'fix', prompt: 'I am waiting since Monday.', options: ['I am been waiting since Monday.', 'I have been waiting since Monday.', 'I have been wait since Monday.'], answer: 1, tip: 'Con since: have been + -ing.', tags: PRACTICE2 },
  { id: 'b1-03-pp6', topic: PPC, kind: 'order', prompt: 'Llevo escribiendo en este cuaderno tres semanas.', options: ["I've", 'been', 'writing', 'in', 'this', 'notebook', 'for', 'three', 'weeks.'], answer: 0, tip: 'have been + -ing + for + período.', tags: PRACTICE2 },
  { id: 'b1-03-pp7', topic: PPC, prompt: 'We ___ her for years. She is a good friend.', options: ['have known', 'have been knowing', 'know'], answer: 0, tip: 'know no usa -ing: have known.', tags: PRACTICE2 },
  // ── Unread Messages (banco compartido de los 3 esbirros) ──
  { id: 'b1-03-u1', topic: PPC, kind: 'fix', prompt: 'How long are you feeling this?', options: ['How long you are feeling like this?', 'How long have you feeling like this?', 'How long have you been feeling like this?'], answer: 2, tip: 'Duración: How long + have you been + -ing.', tags: UNREAD },
  { id: 'b1-03-u2', topic: PPC, kind: 'fix', prompt: 'She is calling me since morning.', options: ['She has been calling me since morning.', 'She is been calling me since morning.', 'She has calling me since morning.'], answer: 0, tip: 'Empezó en la mañana y sigue: has been calling.', tags: UNREAD },
  { id: 'b1-03-u3', topic: PPC, prompt: 'He has been working here ___ five years.', options: ['since', 'for', 'from'], answer: 1, tip: 'Un período de tiempo: for.', tags: UNREAD },
  { id: 'b1-03-u4', topic: PPC, prompt: 'We have been friends ___ 2015.', options: ['for', 'at', 'since'], answer: 2, tip: 'Un punto de inicio (2015): since.', tags: UNREAD },
  { id: 'b1-03-u5', topic: IM, prompt: "Friend: 'Coffee at ten?' You: '___'", options: ['Sounds goods. See there you.', 'Sounds good. See you there.', 'Coffee is good very yes.'], answer: 1, tip: 'Con una amiga: Sounds good. See you there.', tags: UNREAD },
  { id: 'b1-03-u6', topic: IM, prompt: 'Please ___ me a message when the class ends.', options: ['send', 'sent', 'sending'], answer: 0, tip: 'Orden: el verbo base al principio (send).', tags: UNREAD },
  { id: 'b1-03-u7', topic: IM, prompt: "Student: 'Thanks, teacher!' You: '___'", options: ["You're welcomes! Going keep.", 'Welcome you thanks keep.', "You're welcome! Keep going."], answer: 2, tip: "Respuesta natural: You're welcome!", tags: UNREAD },
  { id: 'b1-03-u8', topic: PPC, kind: 'order', prompt: 'He estado escribiendo todo el día.', options: ["I've", 'been', 'writing', 'all', 'day.'], answer: 0, tip: 'have been + -ing.', tags: UNREAD },
  { id: 'b1-03-u9', topic: IM, kind: 'order', prompt: 'Mándame un mensaje luego.', options: ['Drop', 'me', 'a', 'line', 'later.'], answer: 0, tip: 'Drop me a line = mándame un mensaje.', tags: UNREAD },
  { id: 'b1-03-u10', topic: PPC, prompt: 'How long ___ you been waiting?', options: ['have', 'are', 'did'], answer: 0, tip: 'have you been + -ing.', tags: UNREAD },
  { id: 'b1-03-u11', topic: PPC, prompt: 'I ___ her messages for weeks, but she never answers.', options: ['am reading', 'have been reading', 'was reading'], answer: 1, tip: 'for weeks + sigue pasando: have been reading.', tags: UNREAD },
  {
    id: 'b1-03-u12',
    topic: IM,
    kind: 'listen',
    audio: "Hey, I've been waiting for you since six o'clock. Text me when you arrive.",
    voice: 'male',
    prompt: '¿Qué le pide a la persona?',
    options: ['Que lo llame mañana.', 'Que lo espere en casa.', 'Que le escriba cuando llegue.'],
    answer: 2,
    tip: 'Text me when you arrive.',
    tags: UNREAD,
  },
  // ── The Static · fase 1: mensajes informales ──
  { id: 'b1-03-bm1', topic: IM, kind: 'fix', prompt: 'Sounds goods! See tomorrow you!', options: ['Sounds goods! See you tomorrow!', 'Sounds good! See you tomorrow!', 'Sound good! See tomorrow you!'], answer: 1, tip: 'Sounds good (sin -s en good) y See you tomorrow.', tags: BOSS_MSG },
  { id: 'b1-03-bm2', topic: IM, kind: 'fix', prompt: 'Drop me line when you arrive.', options: ['Drop me a line when you arrive.', 'Drop to me a line when you arrive.', 'Drop me a line when you arrives.'], answer: 0, tip: 'Drop me a line (con a).', tags: BOSS_MSG },
  { id: 'b1-03-bm3', topic: IM, prompt: "Friend: 'Lunch at one?' You: '___'", options: ['Good sounds see you there.', 'I am very agree with your lunch.', 'Sounds good. See you there.'], answer: 2, tip: 'Con una amiga: Sounds good. See you there.', tags: BOSS_MSG },
  { id: 'b1-03-bm4', topic: IM, prompt: "Boss: 'Please confirm the meeting for Monday.' You: '___'", options: ['Confirmed. Thank you.', 'Yep lol.', 'Meeting Monday k.'], answer: 0, tip: 'Con un jefe: cortés y completo.', tags: BOSS_MSG },
  { id: 'b1-03-bm5', topic: IM, prompt: "Please ___ me when you get home. I'm worried.", options: ['pinging', 'ping', 'to ping'], answer: 1, tip: 'Orden: el verbo base al principio.', tags: BOSS_MSG },
  { id: 'b1-03-bm6', topic: IM, kind: 'order', alts: ["If you need anything, text me."], prompt: 'Escríbeme si necesitas algo.', options: ['Text', 'me', 'if', 'you', 'need', 'anything.'], answer: 0, tip: 'Text me = escríbeme.', tags: BOSS_MSG },
  { id: 'b1-03-bm7', topic: IM, prompt: "I sent you a message yesterday and you haven't ___ yet.", options: ['reply', 'replying', 'replied'], answer: 2, tip: "haven't + participio: replied.", tags: BOSS_MSG },
  // ── The Static · fase 2: present perfect continuous ──
  { id: 'b1-03-bp1', topic: PPC, kind: 'fix', prompt: 'I am knowing her since years.', options: ['I have been knowing her for years.', 'I have known her for years.', 'I am knowing her for years.'], answer: 1, tip: "know no usa -ing, y 'años' es un período: for.", tags: BOSS_PPC },
  { id: 'b1-03-bp2', topic: PPC, kind: 'fix', prompt: 'How long are you waiting?', options: ['How long have you been waiting?', 'How long you have been waiting?', 'How long are you been waiting?'], answer: 0, tip: 'Duración: How long + have you been + -ing.', tags: BOSS_PPC },
  { id: 'b1-03-bp3', topic: PPC, prompt: 'I ___ to speak every day since the accident.', options: ['am trying', 'try', 'have been trying'], answer: 2, tip: 'Empezó en el pasado y sigue: have been trying.', tags: BOSS_PPC },
  { id: 'b1-03-bp4', topic: PPC, prompt: 'She has been texting me ___ last night.', options: ['since', 'for', 'during'], answer: 0, tip: 'Un punto de inicio: since.', tags: BOSS_PPC },
  { id: 'b1-03-bp5', topic: PPC, prompt: 'They have been waiting for you ___ an hour.', options: ['since', 'for', 'from'], answer: 1, tip: 'Un período de tiempo: for.', tags: BOSS_PPC },
  { id: 'b1-03-bp6', topic: PPC, kind: 'order', prompt: '¿Cuánto tiempo llevas esperando?', options: ['How', 'long', 'have', 'you', 'been', 'waiting?'], answer: 0, tip: 'How long + have you been + -ing.', tags: BOSS_PPC },
  {
    id: 'b1-03-bp7',
    topic: PPC,
    kind: 'listen',
    audio: "I've been writing messages for weeks. I've been waiting for an answer since Monday, and I haven't received anything yet.",
    voice: 'female',
    prompt: '¿Desde cuándo espera una respuesta?',
    options: ['Desde hace una hora.', 'Desde ayer.', 'Desde el lunes.'],
    answer: 2,
    tip: 'since Monday = desde el lunes.',
    tags: BOSS_PPC,
  },
]
