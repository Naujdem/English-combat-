import type { Question } from '../game/types'

/**
 * B2 · Extras: A Year Abroad (data/b2YearAbroad.ts).
 *  - Práctica tras la lección de Ms. Haddad (tarea b2-s3-words, tema abroad-b2): b2-s3-a1…a8 (1 de escucha).
 *  - Duelo amistoso con el contador corrompido (etiqueta b2-s3-meter): b2-s3-m1…m10 (1 de escucha).
 * Las opciones incorrectas están mal en cualquier contexto. La posición de la respuesta correcta varía a propósito.
 */
const AB = 'abroad-b2' as const
const T_W = ['b2-s3-words']
const MT = ['b2-s3-meter']

export const B2_S3_WORDS_IDS = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => `b2-s3-a${n}`)

export const B2_S3_QUESTIONS: Question[] = [
  // Ms. Haddad: rate / fee, facturas, inglés de Irlanda y preguntas indirectas
  { id: 'b2-s3-a1', topic: AB, prompt: 'The electricity ___ is 20 cents per kilowatt hour.', options: ['fee', 'rate', 'bill'], answer: 1, tip: 'Precio por unidad = rate.', tags: T_W },
  { id: 'b2-s3-a2', topic: AB, prompt: 'There is a fixed cancellation ___ of 150 euros.', options: ['fee', 'rate', 'meter'], answer: 0, tip: 'Cobro fijo por algo = fee.', tags: T_W },
  { id: 'b2-s3-a3', topic: AB, prompt: 'The money leaves my account automatically every month. I pay by direct ___.', options: ['debt', 'debit', 'deposit'], answer: 1, tip: 'direct debit = débito automático.', tags: T_W },
  { id: 'b2-s3-a4', topic: AB, prompt: 'The ___ in the kitchen shows how much electricity we use.', options: ['bill', 'contract', 'meter'], answer: 2, tip: 'El aparato que mide = meter (contador).', tags: T_W },
  { id: 'b2-s3-a5', topic: AB, prompt: 'Could you tell me when the bill ___?', options: ['arrives', 'does arrive', 'arrives it'], answer: 0, tip: 'Pregunta indirecta: sujeto + verbo (the bill arrives).', tags: T_W },
  { id: 'b2-s3-a6', topic: AB, kind: 'fix', prompt: 'Do you know how much is the rate?', options: ['Do you know how much the rate is?', 'Do you know how much does the rate?', 'Do you know how much is it the rate?'], answer: 0, tip: 'Pregunta indirecta: how much the rate is.', tags: T_W },
  { id: 'b2-s3-a7', topic: AB, prompt: 'In Ireland, "How are you?" "I\'m ___!" means "I\'m fine".', options: ['craic', 'grand', 'giving out'], answer: 1, tip: 'grand = bien (inglés de Irlanda).', tags: T_W },
  {
    id: 'b2-s3-a8',
    topic: AB,
    kind: 'listen',
    audio: 'Your man next door was giving out to me for an hour about the bills!',
    voice: 'male',
    prompt: 'What happened to Ciarán?',
    options: ['A neighbour was complaining to him.', 'A neighbour gave him money.', 'He paid all the bills.'],
    answer: 0,
    tip: 'your man = ese tipo · giving out to me = regañándome.',
    tags: T_W,
  },

  // Duelo con el contador corrompido (sus errores: how much is the fee, the fee per kilowatt)
  { id: 'b2-s3-m1', topic: AB, kind: 'fix', prompt: 'Can you tell me how much is the fee?', options: ['Can you tell me how much is it the fee?', 'Can you tell me how much the fee is?', 'Can you tell me how much does the fee?'], answer: 1, tip: 'Pregunta indirecta: how much the fee is.', tags: MT },
  { id: 'b2-s3-m2', topic: AB, prompt: 'The ___ per kilowatt went up again.', options: ['rate', 'fee', 'contract'], answer: 0, tip: 'Por unidad (per kilowatt) = rate.', tags: MT },
  { id: 'b2-s3-m3', topic: AB, prompt: 'I wonder ___ there is a student discount.', options: ['that', 'if', 'what'], answer: 1, tip: 'Pregunta de sí o no indirecta: I wonder if…', tags: MT },
  { id: 'b2-s3-m4', topic: AB, prompt: 'They charge a 3-euro ___ for paper bills.', options: ['rate', 'meter', 'fee'], answer: 2, tip: 'Un cobro fijo = fee.', tags: MT },
  { id: 'b2-s3-m5', topic: AB, kind: 'order', prompt: '¿Me podría decir cuánto dura el contrato?', options: ['Could', 'you', 'tell', 'me', 'how', 'long', 'the', 'contract', 'lasts?'], answer: 0, tip: 'Pregunta indirecta: how long the contract lasts.', tags: MT },
  { id: 'b2-s3-m6', topic: AB, prompt: 'Please read the ___ every month and send us the number.', options: ['meter', 'debit', 'fee'], answer: 0, tip: 'Read the meter = leer el contador.', tags: MT },
  { id: 'b2-s3-m7', topic: AB, prompt: 'This month\'s electricity ___ is 45 euros.', options: ['rate', 'bill', 'meter'], answer: 1, tip: 'El total que hay que pagar = bill (factura).', tags: MT },
  { id: 'b2-s3-m8', topic: AB, kind: 'fix', prompt: 'Do you know where can I pay the bill?', options: ['Do you know where I can pay the bill?', 'Do you know where can pay I the bill?', 'Do you know where I can to pay the bill?'], answer: 0, tip: 'Pregunta indirecta: where I can pay.', tags: MT },
  { id: 'b2-s3-m9', topic: AB, prompt: 'The music, the people, the fun… the ___ in Galway is great!', options: ['grand', 'craic', 'man'], answer: 1, tip: 'the craic = el ambiente, la diversión (Irlanda).', tags: MT },
  {
    id: 'b2-s3-m10',
    topic: AB,
    kind: 'listen',
    audio: 'The Student Plan has a lower rate and no paper bill fee. You can cancel for free after six months.',
    voice: 'female',
    prompt: 'What is true about the Student Plan?',
    options: ['It has a higher rate.', 'You can never cancel it.', 'It has no paper bill fee.'],
    answer: 2,
    tip: '"…and no paper bill fee".',
    tags: MT,
  },
]
