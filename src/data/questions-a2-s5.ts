import type { Question } from '../game/types'

/**
 * Misión secundaria "A Dinner to Remember": preguntas del duelo amistoso con Chef Bruno (Busuu A2 caps. 18 y 27, más much / many).
 * Fase 1 (a2-dinner-flavor): platos, sabores y formas de cocinar.
 * Fase 2 (a2-dinner-qty): How much / How many, contables e incontables, a lot of, a few / a little.
 * Fase 3 (a2-dinner-table): conversación en la mesa (How was…? How often…? Could you pass…? Would you like some more…?).
 */
type L = Omit<Question, 'kind'>
const L = (q: L): Question => ({ ...q, kind: 'listen' })

const FLAVOR = ['a2-dinner-duel', 'a2-dinner-flavor']
const QTY = ['a2-dinner-duel', 'a2-dinner-qty']
const TABLE = ['a2-dinner-duel', 'a2-dinner-table']
const TP = 'food-dinner' as const

export const A2_DINNER_QUESTIONS: Question[] = [
  // ── Fase 1: platos y sabores ──
  { id: 'a2-s5-f1', topic: TP, prompt: 'Lemons are very ___.', options: ['sour', 'sweet', 'spicy'], answer: 0, tip: 'El sabor del limón: sour (ácido).', tags: FLAVOR },
  { id: 'a2-s5-f2', topic: TP, prompt: 'This cake has a lot of sugar. It\'s too ___ for me.', options: ['sweet', 'salty', 'bitter'], answer: 0, tip: 'Con mucha azúcar: sweet (dulce).', tags: FLAVOR },
  { id: 'a2-s5-f3', topic: TP, prompt: 'Black coffee without sugar is a little ___.', options: ['bitter', 'sweet', 'salty'], answer: 0, tip: 'El café negro sin azúcar es bitter (amargo).', tags: FLAVOR },
  { id: 'a2-s5-f4', topic: TP, prompt: 'The fish was cooked in hot oil. It was ___.', options: ['fried', 'roasted', 'boiled'], answer: 0, tip: 'En aceite caliente: fried (frito).', tags: FLAVOR },
  { id: 'a2-s5-f5', topic: TP, prompt: 'We cook the eggs in hot water for ten minutes. They\'re ___ eggs.', options: ['boiled', 'fried', 'grilled'], answer: 0, tip: 'En agua hirviendo: boiled (hervido).', tags: FLAVOR },
  { id: 'a2-s5-f6', topic: TP, kind: 'fix', prompt: 'This soup is delicious very!', options: ['This soup is really delicious!', 'This soup is very delicious very!', 'This soup delicious is!'], answer: 0, tip: 'delicious ya es muy fuerte: mejor really delicious. El adverbio va antes del adjetivo.', tags: FLAVOR },
  { id: 'a2-s5-f7', topic: TP, kind: 'order', prompt: 'El pollo asado está un poco salado.', options: ['The', 'roasted', 'chicken', 'is', 'a', 'bit', 'salty.'], answer: 0, tip: 'roasted chicken (el adjetivo antes) + is + a bit salty.', tags: FLAVOR },
  { id: 'a2-s5-f8', topic: TP, prompt: 'What does it taste ___? — It tastes like chicken.', options: ['like', 'as', 'in'], answer: 0, tip: 'Saber a algo: taste like… · What does it taste like?', tags: FLAVOR },

  // ── Fase 2: How much / How many y cantidades ──
  { id: 'a2-s5-q1', topic: TP, prompt: 'How ___ sugar do you take in your coffee?', options: ['much', 'many', 'often'], answer: 0, tip: 'sugar es incontable → How much.', tags: QTY },
  { id: 'a2-s5-q2', topic: TP, prompt: 'How ___ potatoes do we need for the soup?', options: ['many', 'much', 'long'], answer: 0, tip: 'potatoes se cuentan → How many.', tags: QTY },
  { id: 'a2-s5-q3', topic: TP, prompt: 'There isn\'t ___ milk in the fridge. Can you buy some?', options: ['much', 'many', 'a few'], answer: 0, tip: 'milk es incontable: not much milk.', tags: QTY },
  { id: 'a2-s5-q4', topic: TP, prompt: 'We have ___ apples. Let\'s make a pie!', options: ['a lot of', 'much', 'a little'], answer: 0, tip: 'a lot of sirve para contables e incontables: a lot of apples.', tags: QTY },
  { id: 'a2-s5-q5', topic: TP, prompt: 'Add ___ salt. Not too much!', options: ['a little', 'a few', 'many'], answer: 0, tip: 'Poca cantidad de algo incontable: a little salt.', tags: QTY },
  { id: 'a2-s5-q6', topic: TP, kind: 'fix', prompt: 'How many water do you drink every day?', options: ['How much water do you drink every day?', 'How many waters do you drink every day?', 'How much water you drink every day?'], answer: 0, tip: 'water es incontable → How much water do you drink?', tags: QTY },
  { id: 'a2-s5-q7', topic: TP, kind: 'fix', prompt: 'There are much people at the dinner.', options: ['There are a lot of people at the dinner.', 'There is much people at the dinner.', 'There are much of people at the dinner.'], answer: 0, tip: 'people es plural y contable: a lot of people (o many people).', tags: QTY },
  { id: 'a2-s5-q8', topic: TP, kind: 'order', prompt: '¿Cuántos platos hay en la mesa?', options: ['How', 'many', 'plates', 'are', 'there', 'on', 'the', 'table?'], answer: 0, tip: 'How many + plural + are there…?', tags: QTY },

  // ── Fase 3: conversación en la mesa ──
  { id: 'a2-s5-t1', topic: TP, prompt: '___ was the soup? — It was great, thank you!', options: ['How', 'What', 'How much'], answer: 0, tip: 'Pedir una opinión: How was…?', tags: TABLE },
  { id: 'a2-s5-t2', topic: TP, prompt: 'How ___ do you cook? — Every weekend.', options: ['often', 'much', 'many'], answer: 0, tip: 'Frecuencia: How often…? — Every weekend.', tags: TABLE },
  { id: 'a2-s5-t3', topic: TP, prompt: 'Would you like some more rice? — Yes, ___. It\'s delicious.', options: ['please', 'I like', "I'd like"], answer: 0, tip: 'Aceptar con educación: Yes, please. Rechazar: No, thank you.', tags: TABLE },
  { id: 'a2-s5-t4', topic: TP, prompt: 'Could you ___ me the bread, please?', options: ['pass', 'give to', 'bring to'], answer: 0, tip: 'En la mesa: Could you pass me the bread?', tags: TABLE },
  { id: 'a2-s5-t5', topic: TP, prompt: 'How do you ___ this dish? — With rice, beans and avocado.', options: ['make', 'do', 'cook to'], answer: 0, tip: 'Preguntar la receta: How do you make…?', tags: TABLE },
  { id: 'a2-s5-t6', topic: TP, kind: 'fix', prompt: 'How long you need to cook the beans?', options: ['How long do you need to cook the beans?', 'How long you do need to cook the beans?', 'How much long do you need to cook the beans?'], answer: 0, tip: 'Pregunta con how long + do + sujeto + verbo.', tags: TABLE },
  { id: 'a2-s5-t7', topic: TP, kind: 'order', prompt: '¿Quieres un poco más de jugo?', options: ['Would', 'you', 'like', 'some', 'more', 'juice?'], answer: 0, tip: 'Ofrecer: Would you like some more…?', tags: TABLE },
  { id: 'a2-s5-t8', topic: TP, prompt: 'No, thank you. I\'m ___. It was a big dinner!', options: ['full', 'hungry', 'empty'], answer: 0, tip: 'Estar lleno después de comer: I\'m full.', tags: TABLE },

  // ── Escucha real ──
  L({ id: 'a2-s5-ls1', topic: TP, audio: 'The chicken is roasted, and the potatoes are fried. Be careful, the sauce is very spicy!', voice: 'female', prompt: 'What is spicy?', options: ['The sauce.', 'The chicken.', 'The potatoes.'], answer: 0, tip: 'Dijo: "the sauce is very spicy".', tags: FLAVOR }),
  L({ id: 'a2-s5-ls2', topic: TP, audio: 'We are six people. We need twelve eggs, but there are only eight in the fridge. And there is a lot of milk.', voice: 'male', prompt: 'How many more eggs do they need?', options: ['Four.', 'Eight.', 'Twelve.'], answer: 0, tip: 'Necesitan 12 y hay 8: faltan 4.', tags: QTY }),
  L({ id: 'a2-s5-ls3', topic: TP, audio: 'How often do you cook? — Not very often. I cook on Sundays, with my grandmother.', voice: 'female', prompt: 'When does she cook?', options: ['On Sundays.', 'Every day.', 'Never.'], answer: 0, tip: 'Dijo: "I cook on Sundays".', tags: TABLE }),
]
