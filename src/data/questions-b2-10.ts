import type { Question } from '../game/types'

/**
 * B2-10 · The Card (Ventana 2056). Bloque 1 (la escuela, data/b2Card.ts): prácticas después de cada lección.
 *  - La pizarra (tarea b2-10-contrast, tema contrast-b2): b2-10-ct1…ct6 (2 de escucha: el debate de la clase).
 *  - El cuaderno de G (tarea b2-10-ing, tema ing-prep-b2): b2-10-ig1…ig6.
 * Las opciones incorrectas están mal en cualquier contexto. La posición de la respuesta correcta varía a propósito.
 */
const CT = 'contrast-b2' as const
const IG = 'ing-prep-b2' as const
const T_CT = ['b2-10-contrast']
const T_IG = ['b2-10-ing']

const ids = (p: string) => [1, 2, 3, 4, 5, 6].map((n) => `b2-10-${p}${n}`)
export const B2_10_CONTRAST_IDS = ids('ct')
export const B2_10_ING_IDS = ids('ig')

export const B2_10_QUESTIONS: Question[] = [
  // Bloque 1 · La pizarra (conectores de contraste)
  { id: 'b2-10-ct1', topic: CT, prompt: 'Some people speak up, ___ others stay quiet.', options: ['whereas', 'despite', 'however'], answer: 0, tip: 'whereas une dos oraciones que contrastan, en la misma frase.', tags: T_CT },
  { id: 'b2-10-ct2', topic: CT, prompt: '___ the rain, we played outside.', options: ['Despite of', 'Although', 'Despite'], answer: 2, tip: 'despite + sustantivo (sin of). Although va con una oración: although it was raining.', tags: T_CT },
  { id: 'b2-10-ct3', topic: CT, prompt: 'She was scared. ___, she spoke in front of everyone.', options: ['Whereas', 'Nevertheless', 'In spite'], answer: 1, tip: 'Al comienzo de una oración nueva y con coma: However / Nevertheless.', tags: T_CT },
  { id: 'b2-10-ct4', topic: CT, kind: 'fix', prompt: 'Whereas he was happy, but I was sad.', options: ['Whereas he was happy, I was sad.', 'Whereas he was happy, however I was sad.', 'Despite he was happy, I was sad.'], answer: 0, tip: 'whereas ya marca el contraste: sobra el but.', tags: T_CT },
  {
    id: 'b2-10-ct5',
    topic: CT,
    kind: 'listen',
    audio: "I think we should. However, sometimes it's safer to stay quiet.",
    voice: 'male',
    prompt: 'What does the first student think?',
    options: ['We should never speak up.', 'We should speak up, but sometimes staying quiet is safer.', 'Staying quiet is always better.'],
    answer: 1,
    tip: '"I think we should. However, sometimes it\'s safer to stay quiet."',
    tags: T_CT,
  },
  {
    id: 'b2-10-ct6',
    topic: CT,
    kind: 'listen',
    audio: 'Despite being scared, you can still say what you think.',
    voice: 'male',
    prompt: 'What does the teacher say?',
    options: ['You can speak even if you are scared.', 'You should wait until you are not scared.', 'Scared people should listen.'],
    answer: 0,
    tip: '"Despite being scared, you can still say what you think."',
    tags: T_CT,
  },

  // Bloque 1 · El cuaderno de G (preposición + -ing, it's worth, there's no point in, have difficulty)
  { id: 'b2-10-ig1', topic: IG, prompt: "I'm tired ___ for him.", options: ['to wait', 'of waiting', 'of wait'], answer: 1, tip: 'Después de una preposición (of) va -ing: tired of waiting.', tags: T_IG },
  { id: 'b2-10-ig2', topic: IG, prompt: "There's no point ___ him now.", options: ['in forgiving', 'to forgive', 'forgive'], answer: 0, tip: "there's no point in + -ing.", tags: T_IG },
  { id: 'b2-10-ig3', topic: IG, prompt: "It's worth ___ one last time.", options: ['to try', 'try', 'trying'], answer: 2, tip: "it's worth + -ing (nunca \"worth to try\").", tags: T_IG },
  { id: 'b2-10-ig4', topic: IG, kind: 'fix', prompt: 'I had difficulty to write this card.', options: ['I had difficulty in write this card.', 'I had difficulty writing this card.', 'I had difficult writing this card.'], answer: 1, tip: 'have difficulty + -ing: I had difficulty writing.', tags: T_IG },
  { id: 'b2-10-ig5', topic: IG, prompt: "I'm afraid ___ again.", options: ['of failing', 'to failing', 'for fail'], answer: 0, tip: 'afraid of + -ing.', tags: T_IG },
  { id: 'b2-10-ig6', topic: IG, prompt: '___ him, I still miss our friendship.', options: ['Despite I hate', 'In spite hating', 'Despite hating'], answer: 2, tip: 'despite / in spite of + -ing: Despite hating him… (nunca "in spite hating").', tags: T_IG },
]
