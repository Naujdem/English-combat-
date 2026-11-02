import type { Question } from '../game/types'

/**
 * Misión secundaria "Market Day": preguntas del duelo amistoso con Rita (Busuu A2 caps. 19 y 20).
 * Fase 1 (a2-shop-clothes): ropa, tallas, colores y probarse ropa (try it on / them on, fit, suit).
 * Fase 2 (a2-shop-price): precios, rebajas y descuentos (How much…?, on sale, 20% off, pagar).
 * Fase 3 (a2-shop-return): devoluciones y cambios (receipt, refund, exchange) y too / enough.
 */
type L = Omit<Question, 'kind'>
const L = (q: L): Question => ({ ...q, kind: 'listen' })

const CLOTHES = ['a2-shop-duel', 'a2-shop-clothes']
const PRICE = ['a2-shop-duel', 'a2-shop-price']
const RETURN = ['a2-shop-duel', 'a2-shop-return']
const TP = 'clothes-shopping' as const

export const A2_MARKET_QUESTIONS: Question[] = [
  // ── Fase 1: ropa, tallas y probarse ──
  { id: 'a2-s4-r1', topic: TP, prompt: 'What size are you? — I\'m a ___. Not small, not large.', options: ['medium', 'middle', 'normal'], answer: 0, tip: 'Las tallas: small, medium, large (S, M, L).', tags: CLOTHES },
  { id: 'a2-s4-r2', topic: TP, prompt: 'Can I try ___ these trousers, please?', options: ['on', 'in', 'at'], answer: 0, tip: 'Probarse ropa: try on. Con el nombre puede ir al final: try on these trousers.', tags: CLOTHES },
  { id: 'a2-s4-r3', topic: TP, kind: 'fix', prompt: 'These boots are great. Can I try it on?', options: ['These boots are great. Can I try them on?', 'These boots are great. Can I try on them?', 'These boots are great. Can I try they on?'], answer: 0, tip: 'boots es plural → them, y en medio: try them on.', tags: CLOTHES },
  { id: 'a2-s4-r4', topic: TP, prompt: 'That blue dress really ___ you. You look great!', options: ['suits', 'fits', 'wears'], answer: 0, tip: 'suit = quedar bien (el estilo o el color). fit = quedar bien de talla.', tags: CLOTHES },
  { id: 'a2-s4-r5', topic: TP, prompt: "I'm ___ a white shirt and black trousers today.", options: ['wearing', 'carrying', 'putting'], answer: 0, tip: 'Llevar puesta ropa: wear → I\'m wearing.', tags: CLOTHES },
  { id: 'a2-s4-r6', topic: TP, prompt: 'Does the jacket fit? — Yes, it fits ___. It\'s my size.', options: ['perfectly', 'perfect', 'very perfect'], answer: 0, tip: 'Cómo queda: fits + adverbio → fits perfectly.', tags: CLOTHES },
  { id: 'a2-s4-r7', topic: TP, kind: 'order', prompt: 'Estoy buscando una chaqueta negra.', options: ["I'm", 'looking', 'for', 'a', 'black', 'jacket.'], answer: 0, tip: 'look for = buscar. El color va antes de la prenda: a black jacket.', tags: CLOTHES },
  { id: 'a2-s4-r8', topic: TP, prompt: 'Where are the fitting rooms? — They\'re next ___ the mirrors.', options: ['to', 'of', 'at'], answer: 0, tip: 'Al lado de: next to.', tags: CLOTHES },

  // ── Fase 2: precios y descuentos ──
  { id: 'a2-s4-c1', topic: TP, prompt: '___ is this scarf? — It\'s $12.', options: ['How much', 'How many', 'What cost'], answer: 0, tip: 'Para el precio: How much is it?', tags: PRICE },
  { id: 'a2-s4-c2', topic: TP, prompt: 'How much ___ these shoes? — They\'re $40.', options: ['are', 'is', 'do'], answer: 0, tip: 'shoes es plural: How much are these shoes?', tags: PRICE },
  { id: 'a2-s4-c3', topic: TP, prompt: 'The coat was $80. Now it\'s on ___: only $60!', options: ['sale', 'sell', 'sold'], answer: 0, tip: 'En rebaja: on sale.', tags: PRICE },
  { id: 'a2-s4-c4', topic: TP, prompt: 'The shirt is $30 and there\'s 10% off. So it\'s ___.', options: ['$27', '$20', '$33'], answer: 0, tip: '10% de 30 es 3: 30 − 3 = 27.', tags: PRICE },
  { id: 'a2-s4-c5', topic: TP, kind: 'fix', prompt: 'How much it costs?', options: ['How much does it cost?', 'How much is it cost?', 'How much it does cost?'], answer: 0, tip: 'Pregunta con cost: How much does it cost?', tags: PRICE },
  { id: 'a2-s4-c6', topic: TP, prompt: 'How would you like to pay? — ___ card, please.', options: ['By', 'With the', 'In'], answer: 0, tip: 'Pagar con tarjeta: by card. En efectivo: in cash.', tags: PRICE },
  { id: 'a2-s4-c7', topic: TP, kind: 'order', prompt: 'Es una ganga. ¡Me lo llevo!', options: ["It's", 'a', 'bargain.', "I'll", 'take', 'it!'], answer: 0, tip: "a bargain = una ganga · I'll take it = me lo llevo.", tags: PRICE },
  { id: 'a2-s4-c8', topic: TP, prompt: "$50 for a T-shirt? That's too ___!", options: ['expensive', 'cheap', 'bargain'], answer: 0, tip: 'Muy caro: too expensive. Barato: cheap.', tags: PRICE },
  { id: 'a2-s4-c9', topic: TP, kind: 'fix', prompt: 'This dress is in sale.', options: ['This dress is on sale.', 'This dress is at sale.', 'This dress is for sale off.'], answer: 0, tip: 'En rebaja: on sale.', tags: PRICE },

  // ── Fase 3: devoluciones, cambios y too / enough ──
  { id: 'a2-s4-m1', topic: TP, prompt: "I'd like to ___ this jumper. It has a hole.", options: ['return', 'turn back', 'come back'], answer: 0, tip: 'Devolver algo a una tienda: return.', tags: RETURN },
  { id: 'a2-s4-m2', topic: TP, prompt: 'Have you got the ___? — Yes, here it is.', options: ['receipt', 'recipe', 'ticket of pay'], answer: 0, tip: 'El papel de la compra es el receipt. Recipe es una receta de cocina.', tags: RETURN },
  { id: 'a2-s4-m3', topic: TP, prompt: 'Would you like a refund or an ___? — A bigger size, please.', options: ['exchange', 'change money', 'other'], answer: 0, tip: 'refund = te devuelven el dinero · exchange = cambiar por otra prenda.', tags: RETURN },
  { id: 'a2-s4-m4', topic: TP, prompt: "I can't wear these shoes. They're too ___.", options: ['small', 'smaller', 'much small'], answer: 0, tip: 'too + adjetivo: too small.', tags: RETURN },
  { id: 'a2-s4-m5', topic: TP, kind: 'fix', prompt: 'This sweater is enough warm.', options: ['This sweater is warm enough.', 'This sweater is too enough warm.', 'This sweater is warmer enough.'], answer: 0, tip: 'enough va después del adjetivo: warm enough.', tags: RETURN },
  { id: 'a2-s4-m6', topic: TP, prompt: "The trousers aren't long ___. I need a bigger size.", options: ['enough', 'too', 'very'], answer: 0, tip: "No suficientemente largo: not long enough.", tags: RETURN },
  { id: 'a2-s4-m7', topic: TP, kind: 'order', prompt: '¿Puedo cambiarla por una talla más pequeña?', options: ['Can', 'I', 'exchange', 'it', 'for', 'a', 'smaller', 'size?'], answer: 0, tip: 'exchange + it + for + otra cosa.', tags: RETURN },
  { id: 'a2-s4-m8', topic: TP, kind: 'fix', prompt: 'I bought it yesterday, but it\'s too much big.', options: ["I bought it yesterday, but it's too big.", "I buyed it yesterday, but it's too big.", "I bought it yesterday, but it's big enough too."], answer: 0, tip: 'too + adjetivo, sin much: too big.', tags: RETURN },

  // ── Escucha real ──
  L({ id: 'a2-s4-ls1', topic: TP, audio: "I'm looking for a jacket. Not black, I'd like a green one, size medium.", voice: 'female', prompt: 'What is she looking for?', options: ['A green jacket, size M.', 'A black jacket, size M.', 'A green jacket, size L.'], answer: 0, tip: 'Dijo: "a green one, size medium".', tags: CLOTHES }),
  L({ id: 'a2-s4-ls2', topic: TP, audio: 'These boots were sixty dollars, but today everything is half price. So they are thirty dollars.', voice: 'male', prompt: 'How much are the boots today?', options: ['$30.', '$60.', '$16.'], answer: 0, tip: 'Dijo: "half price… thirty dollars".', tags: PRICE }),
  L({ id: 'a2-s4-ls3', topic: TP, audio: "Hello. I'd like to return this shirt. It's too small. Can I have a refund? Here's the receipt.", voice: 'female', prompt: 'What does she want?', options: ['Her money back.', 'A smaller shirt.', 'A new receipt.'], answer: 0, tip: 'Pidió "a refund": que le devuelvan el dinero.', tags: RETURN }),
]
