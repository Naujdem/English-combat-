import type { Question } from '../game/types'

/**
 * B2 · Extras: Fusion Night (data/b2FusionNight.ts).
 *  - Práctica tras la lección de Mei Lin (tarea b2-s1-words, tema food-b2): b2-s1-f1…f8.
 *  - Duelo amistoso con el crítico Mr. Ashworth (etiqueta b2-s1-critic): b2-s1-cr1…cr8.
 * Las opciones incorrectas están mal en cualquier contexto. La posición de la respuesta correcta varía a propósito.
 */
const FD = 'food-b2' as const
const T_W = ['b2-s1-words']
const CR = ['b2-s1-critic']

export const B2_S1_WORDS_IDS = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => `b2-s1-f${n}`)

export const B2_S1_QUESTIONS: Question[] = [
  // Mei Lin: adjetivos compuestos, sabor y textura, it's worth + -ing
  { id: 'b2-s1-f1', topic: FD, prompt: 'My grandmother made this soup at home. It\'s ___.', options: ['home-make', 'home-made', 'made-home'], answer: 1, tip: 'Adjetivo compuesto con participio: home-made.', tags: T_W },
  { id: 'b2-s1-f2', topic: FD, prompt: 'The chicken is cooked in very hot oil. It\'s ___.', options: ['deep-fried', 'deep-fry', 'fried-deep'], answer: 0, tip: 'Cocido en mucho aceite = deep-fried.', tags: T_W },
  { id: 'b2-s1-f3', topic: FD, prompt: 'The smell is ___! I\'m so hungry.', options: ['watering-mouth', 'mouth-water', 'mouth-watering'], answer: 2, tip: 'Que hace agua la boca = mouth-watering.', tags: T_W },
  { id: 'b2-s1-f4', topic: FD, prompt: 'No salt, no spices, no flavour. This rice is ___.', options: ['bland', 'tangy', 'spicy'], answer: 0, tip: 'Sin sabor = bland.', tags: T_W },
  { id: 'b2-s1-f5', topic: FD, prompt: 'These plantain chips make a loud noise when you bite them. They\'re ___.', options: ['chewy', 'crunchy', 'sugar-free'], answer: 1, tip: 'Crujiente = crunchy.', tags: T_W },
  { id: 'b2-s1-f6', topic: FD, prompt: 'The arepa dumplings? It\'s worth ___ them.', options: ['to try', 'try', 'trying'], answer: 2, tip: "It's worth + -ing.", tags: T_W },
  { id: 'b2-s1-f7', topic: FD, prompt: 'The pork is cooked for eight hours. It\'s ___.', options: ['slow-cooked', 'slow-cooking', 'cooked-slow'], answer: 0, tip: 'Cocinado a fuego lento = slow-cooked.', tags: T_W },
  {
    id: 'b2-s1-f8',
    topic: FD,
    kind: 'listen',
    audio: "Our slow-cooked pork is cooked for eight hours. It's rich and tender, and we serve it with a sugar-free lime soda.",
    voice: 'female',
    prompt: 'What do they serve with the pork?',
    options: ['A sweet milkshake.', 'A sugar-free lime soda.', 'Hot chocolate.'],
    answer: 1,
    tip: 'We serve it with a sugar-free lime soda.',
    tags: T_W,
  },

  // Duelo amistoso con el crítico
  { id: 'b2-s1-cr1', topic: FD, kind: 'fix', prompt: 'This is a home-make soup.', options: ['This is a home-made soup.', 'This is a made-home soup.', 'This is a home-making soup.'], answer: 0, tip: 'home + participio: home-made.', tags: CR },
  { id: 'b2-s1-cr2', topic: FD, kind: 'fix', prompt: "It's worth to try the dessert.", options: ["It's worth try the dessert.", "It's worth trying the dessert.", "It worths trying the dessert."], answer: 1, tip: "It's worth + -ing: worth trying.", tags: CR },
  { id: 'b2-s1-cr3', topic: FD, prompt: 'The lime sauce is a little sour, in a nice way. It\'s ___.', options: ['bland', 'well-done', 'tangy'], answer: 2, tip: 'Ácido y agradable = tangy.', tags: CR },
  { id: 'b2-s1-cr4', topic: FD, prompt: 'I chewed this meat for a minute. It\'s too ___.', options: ['chewy', 'sugar-free', 'mouth-watering'], answer: 0, tip: 'Difícil de masticar = chewy.', tags: CR },
  { id: 'b2-s1-cr5', topic: FD, kind: 'fix', prompt: "I'd like a sugar-freed juice, please.", options: ["I'd like a free-sugar juice, please.", "I'd like a sugar-free juice, please.", "I'd like a sugar-freeing juice, please."], answer: 1, tip: 'Sin azúcar = sugar-free.', tags: CR },
  { id: 'b2-s1-cr6', topic: FD, prompt: 'The restaurant is far, but it\'s worth ___ there.', options: ['going', 'to go', 'go'], answer: 0, tip: "It's worth + -ing: worth going.", tags: CR },
  { id: 'b2-s1-cr7', topic: FD, kind: 'order', prompt: 'Es la mejor sopa que he probado.', options: ["It's", 'the', 'best', 'soup', "I've", 'ever', 'tasted.'], answer: 0, tip: 'the best + sustantivo + I\'ve ever + participio.', tags: CR },
  {
    id: 'b2-s1-cr8',
    topic: FD,
    kind: 'listen',
    audio: "The rice was a bit bland, but the dessert was the best I've ever had. I'll definitely come back.",
    voice: 'male',
    prompt: 'What did the critic think of the rice?',
    options: ['It was too spicy.', 'It was the best.', "It didn't have much flavour."],
    answer: 2,
    tip: 'bland = sin mucho sabor.',
    tags: CR,
  },
]
