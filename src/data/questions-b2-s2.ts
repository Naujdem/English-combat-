import type { Question } from '../game/types'

/**
 * B2 · Extras: Paws Debate (data/b2PawsDebate.ts).
 *  - Práctica tras la lección de Nayi (tarea b2-s2-words, tema paws-b2): b2-s2-p1…p8 (1 de escucha).
 *  - Duelo amistoso con el vendedor Mr. Kraven (etiqueta b2-s2-seller): b2-s2-s1…s10 (1 de escucha).
 * Las opciones incorrectas están mal en cualquier contexto. La posición de la respuesta correcta varía a propósito.
 */
const PW = 'paws-b2' as const
const T_W = ['b2-s2-words']
const SL = ['b2-s2-seller']

export const B2_S2_WORDS_IDS = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => `b2-s2-p${n}`)

export const B2_S2_QUESTIONS: Question[] = [
  // Nayi: contraste y both / neither / either
  { id: 'b2-s2-p1', topic: PW, prompt: 'Laica is calm, ___ Kitay never stops running.', options: ['whereas', 'however', 'but also'], answer: 0, tip: 'whereas une dos ideas opuestas en la misma oración.', tags: T_W },
  { id: 'b2-s2-p2', topic: PW, prompt: 'Good zoos fund research. ___, many small zoos are terrible.', options: ['Whereas', 'However', 'Although'], answer: 1, tip: 'However empieza la segunda oración, con coma.', tags: T_W },
  { id: 'b2-s2-p3', topic: PW, prompt: '___ zoos and shelters can help animals.', options: ['Either', 'Neither', 'Both'], answer: 2, tip: 'both… and… = los dos.', tags: T_W },
  { id: 'b2-s2-p4', topic: PW, prompt: '___ option is perfect.', options: ['Neither', 'Both', 'None'], answer: 0, tip: 'neither + sustantivo singular = ninguno de los dos.', tags: T_W },
  { id: 'b2-s2-p5', topic: PW, prompt: 'You can adopt ___ Zirius or Lupe, but not both.', options: ['neither', 'either', 'both'], answer: 1, tip: 'either… or… = uno u otro.', tags: T_W },
  { id: 'b2-s2-p6', topic: PW, kind: 'fix', prompt: 'Whereas zoos protect animals, but they keep them in cages.', options: ['Whereas zoos protect animals, however they keep them in cages.', 'Zoos protect animals, whereas they keep them in cages but.', 'Zoos protect animals. On the other hand, they keep them in cages.'], answer: 2, tip: 'No se usan dos conectores de contraste juntos (whereas… but).', tags: T_W },
  { id: 'b2-s2-p7', topic: PW, prompt: 'Neither of the cats ___ hungry.', options: ['are being', 'is', 'were be'], answer: 1, tip: 'La forma segura en un examen: neither of them + singular (is).', tags: T_W },
  {
    id: 'b2-s2-p8',
    topic: PW,
    kind: 'listen',
    audio: 'Some people believe that zoos protect endangered species, whereas others think that animals should never live in cages.',
    voice: 'male',
    prompt: 'What does the documentary say?',
    options: ['People have different opinions about zoos.', 'Everyone agrees that zoos are good.', 'Zoos have no animals now.'],
    answer: 0,
    tip: '"…whereas others think…": hay opiniones opuestas.',
    tags: T_W,
  },

  // Duelo con el vendedor de mascotas exóticas (sus errores: whereas…, but; neither of them are)
  { id: 'b2-s2-s1', topic: PW, kind: 'fix', prompt: 'Neither of them are dangerous.', options: ['Neither of them is dangerous.', 'Neither of them be dangerous.', 'Neither them is dangerous.'], answer: 0, tip: 'neither of them + singular (is).', tags: SL },
  { id: 'b2-s2-s2', topic: PW, prompt: 'Parrots can live 60 years, ___ hamsters live two or three.', options: ['however', 'while', 'on the other hand'], answer: 1, tip: 'while = mientras que, en la misma oración.', tags: SL },
  { id: 'b2-s2-s3', topic: PW, prompt: 'A monkey looks cute. On the other ___, it needs a forest.', options: ['side', 'way', 'hand'], answer: 2, tip: 'on the other hand = por otro lado.', tags: SL },
  { id: 'b2-s2-s4', topic: PW, prompt: '___ the snake nor the parrot should live in a flat.', options: ['Neither', 'Either', 'Both'], answer: 0, tip: 'neither… nor… = ni… ni…', tags: SL },
  { id: 'b2-s2-s5', topic: PW, prompt: 'I like ___ of your ideas. They are both terrible.', options: ['either', 'neither', 'both'], answer: 1, tip: 'neither of = ninguno de los dos.', tags: SL },
  { id: 'b2-s2-s6', topic: PW, kind: 'order', prompt: 'Las dos opciones tienen problemas.', options: ['Both', 'options', 'have', 'problems.'], answer: 0, tip: 'Both + plural + have.', tags: SL },
  { id: 'b2-s2-s7', topic: PW, prompt: 'Exotic pets are popular online. ___, most of them suffer at home.', options: ['Whereas', 'However', 'While'], answer: 1, tip: 'However al empezar la oración, con coma.', tags: SL },
  { id: 'b2-s2-s8', topic: PW, prompt: 'You can take ___ dog. They are both friendly.', options: ['either', 'neither', 'both'], answer: 0, tip: 'either + singular = cualquiera de los dos.', tags: SL },
  { id: 'b2-s2-s9', topic: PW, kind: 'fix', prompt: 'Both of the dog are sleeping.', options: ['Both of the dogs is sleeping.', 'Both of the dogs are sleeping.', 'Both the dog are sleeping.'], answer: 1, tip: 'both of the + plural (dogs) + are.', tags: SL },
  {
    id: 'b2-s2-s10',
    topic: PW,
    kind: 'listen',
    audio: 'Neither the parrot nor the monkey is happy in a small cage.',
    voice: 'female',
    prompt: 'What does Nayi say?',
    options: ['Only the parrot is happy.', 'Both animals are happy in cages.', 'None of the two animals is happy in a small cage.'],
    answer: 2,
    tip: '"Neither the parrot nor the monkey is happy": ninguno de los dos.',
    tags: SL,
  },
]
