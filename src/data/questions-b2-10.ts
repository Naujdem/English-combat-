import type { Question } from '../game/types'

/**
 * B2-10 · The Card (Ventana 2056). Bloque 1 (la escuela, data/b2Card.ts): prácticas después de cada lección.
 *  - La pizarra (tarea b2-10-contrast, tema contrast-b2): b2-10-ct1…ct6 (2 de escucha: el debate de la clase).
 *  - El cuaderno de G (tarea b2-10-ing, tema ing-prep-b2): b2-10-ig1…ig6.
 * Bloque 2 (combates): Ink Blots (etiqueta b2-10-blot): b2-10-bl1…bl6 · Second Thoughts, fase 1 (b2-10-boss-ct): b2-10-sc1…sc6
 *   · fase 2 (b2-10-boss-ing): b2-10-si1…si6 (1 de escucha).
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

const BLOT = ['b2-10-blot']
const BOSS_CT = ['b2-10-boss-ct']
const BOSS_ING = ['b2-10-boss-ing']

export const B2_10_COMBAT_QUESTIONS: Question[] = [
  // Ink Blots (contraste y preposición + -ing; el error típico del esbirro)
  { id: 'b2-10-bl1', topic: CT, kind: 'fix', prompt: 'Despite of the rain, he came.', options: ['Despite the rain, he came.', 'Despite of raining, he came.', 'In spite the rain, he came.'], answer: 0, tip: 'despite sin of (o in spite of, con of).', tags: BLOT },
  { id: 'b2-10-bl2', topic: IG, kind: 'fix', prompt: "There's no point to forgive him.", options: ["There's no point forgive him.", "There's no point in forgiving him.", "There's no point in forgive him."], answer: 1, tip: "there's no point in + -ing.", tags: BLOT },
  { id: 'b2-10-bl3', topic: IG, kind: 'fix', prompt: "I'm tired to wait.", options: ["I'm tired of wait.", "I'm tired for waiting.", "I'm tired of waiting."], answer: 2, tip: 'tired of + -ing.', tags: BLOT },
  { id: 'b2-10-bl4', topic: CT, prompt: 'In spite ___ the noise, she kept reading.', options: ['of', 'from', 'that'], answer: 0, tip: 'in spite of + sustantivo.', tags: BLOT },
  { id: 'b2-10-bl5', topic: IG, prompt: "He's good ___ to people.", options: ['to listen', 'at listening', 'at listen'], answer: 1, tip: 'good at + -ing.', tags: BLOT },
  { id: 'b2-10-bl6', topic: CT, prompt: 'My brother loves parties, ___ I prefer quiet evenings.', options: ['despite', 'however', 'while'], answer: 2, tip: 'Dos ideas opuestas en una oración: while / whereas.', tags: BLOT },

  // Second Thoughts, fase 1 (conectores de contraste)
  { id: 'b2-10-sc1', topic: CT, kind: 'fix', prompt: 'Whereas he was happy, but I was sad.', options: ['Whereas he was happy, I was sad.', 'Whereas he was happy, so I was sad.', 'Despite he was happy, I was sad.'], answer: 0, tip: 'whereas ya es el contraste: sin but.', tags: BOSS_CT },
  { id: 'b2-10-sc2', topic: CT, kind: 'fix', prompt: 'In spite he was tired, he finished the card.', options: ['In spite of he was tired, he finished the card.', 'Although he was tired, he finished the card.', 'Despite he was tired, he finished the card.'], answer: 1, tip: 'Con una oración completa: although. In spite of / despite van con sustantivo o -ing.', tags: BOSS_CT },
  { id: 'b2-10-sc3', topic: CT, prompt: 'The card is short. ___, it says everything.', options: ['Whereas', 'Despite', 'However'], answer: 2, tip: 'Oración nueva + coma: However / Nevertheless.', tags: BOSS_CT },
  { id: 'b2-10-sc4', topic: CT, prompt: 'Staying quiet is safe. On the other ___, it can hurt someone.', options: ['side', 'hand', 'way'], answer: 1, tip: 'on the other hand = por otro lado.', tags: BOSS_CT },
  { id: 'b2-10-sc5', topic: CT, prompt: '___ his age, he walked to the school every day.', options: ['In spite of', 'Although', 'Whereas'], answer: 0, tip: 'in spite of + sustantivo (his age).', tags: BOSS_CT },
  { id: 'b2-10-sc6', topic: CT, kind: 'order', prompt: 'A pesar de tener miedo, ella habló.', options: ['Despite', 'being', 'scared,', 'she', 'spoke.'], answer: 0, tip: 'despite + -ing: Despite being scared.', tags: BOSS_CT },

  // Second Thoughts, fase 2 (preposición + -ing, it's worth, there's no point in, have difficulty)
  { id: 'b2-10-si1', topic: IG, kind: 'fix', prompt: "It's worth to try.", options: ["It's worth try.", "It's worth trying.", "It's worthy to try."], answer: 1, tip: "it's worth + -ing.", tags: BOSS_ING },
  { id: 'b2-10-si2', topic: IG, kind: 'fix', prompt: 'I have difficulty to write.', options: ['I have difficulty writing.', 'I have difficult writing.', 'I have difficulty for writing.'], answer: 0, tip: 'have difficulty + -ing.', tags: BOSS_ING },
  { id: 'b2-10-si3', topic: IG, prompt: 'He left ___ goodbye.', options: ['without say', 'without to say', 'without saying'], answer: 2, tip: 'without + -ing.', tags: BOSS_ING },
  { id: 'b2-10-si4', topic: IG, prompt: "I'm thinking ___ him the card.", options: ['of sending', 'to send', 'of send'], answer: 0, tip: 'think of / about + -ing.', tags: BOSS_ING },
  { id: 'b2-10-si5', topic: IG, prompt: "There's no point ___ about the past.", options: ['to worry', 'in worrying', 'of worrying'], answer: 1, tip: "there's no point in + -ing.", tags: BOSS_ING },
  {
    id: 'b2-10-si6',
    topic: IG,
    kind: 'listen',
    audio: "I'm tired of waiting. Nevertheless, it's worth trying one last time.",
    voice: 'male',
    prompt: 'What does the man decide?',
    options: ['To stop trying.', 'To try one more time.', 'To wait for a long time.'],
    answer: 1,
    tip: '"it\'s worth trying one last time" = vale la pena intentarlo una última vez.',
    tags: BOSS_ING,
  },
]
