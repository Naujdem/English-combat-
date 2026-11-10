import type { Question } from '../game/types'

/**
 * B1-10 · Festival Night (presente). Bloque A (la entrada del festival de Lumen Bay, data/b1Festival.ts):
 *  - Práctica del segundo condicional con la persona especial (tarea b1-10-conditional, tema conditional-2): b1-10-c1…c8.
 *  - Práctica de verbo + -ing / to en la fila de la entrada (tarea b1-10-queue, tema verb-patterns): b1-10-v1…v8.
 * Bloque B (la carpa de videojuegos, data/b1GamingTent.ts):
 *  - Práctica de prefer / would rather con la persona especial (tarea b1-10-prefer, tema prefer-b1): b1-10-p1…p8.
 *  - Escucha de la transmisión de Jorge (tarea b1-10-stream, tema gaming-b1): b1-10-j1…j4.
 *  - Práctica de opiniones de Jorge (tarea b1-10-opinions, tema opinions-b1): b1-10-o1…o8.
 * La posición de la respuesta correcta varía a propósito.
 */
const C2 = 'conditional-2' as const
const COND = ['b1-10-conditional']
const VP = 'verb-patterns' as const
const QUEUE = ['b1-10-queue']
const PR = 'prefer-b1' as const
const PREFER = ['b1-10-prefer']
const GA = 'gaming-b1' as const
const STREAM = ['b1-10-stream']
const OP = 'opinions-b1' as const
const OPINIONS = ['b1-10-opinions']

/** Práctica del segundo condicional, en orden */
export const B1_10_COND_IDS = ['b1-10-c1', 'b1-10-c2', 'b1-10-c3', 'b1-10-c4', 'b1-10-c5', 'b1-10-c6', 'b1-10-c7', 'b1-10-c8']
/** Práctica de verbo + -ing / to, en orden */
export const B1_10_QUEUE_IDS = ['b1-10-v1', 'b1-10-v2', 'b1-10-v3', 'b1-10-v4', 'b1-10-v5', 'b1-10-v6', 'b1-10-v7', 'b1-10-v8']

/** Práctica de prefer / would rather, en orden */
export const B1_10_PREFER_IDS = ['b1-10-p1', 'b1-10-p2', 'b1-10-p3', 'b1-10-p4', 'b1-10-p5', 'b1-10-p6', 'b1-10-p7', 'b1-10-p8']
/** Escucha de la transmisión de Jorge, en orden */
export const B1_10_STREAM_IDS = ['b1-10-j1', 'b1-10-j2', 'b1-10-j3', 'b1-10-j4']
/** Práctica de opiniones de Jorge, en orden */
export const B1_10_OPINIONS_IDS = ['b1-10-o1', 'b1-10-o2', 'b1-10-o3', 'b1-10-o4', 'b1-10-o5', 'b1-10-o6', 'b1-10-o7', 'b1-10-o8']

export const B1_10_QUESTIONS: Question[] = [
  // Bloque A · la persona especial (segundo condicional)
  { id: 'b1-10-c1', topic: C2, kind: 'fix', prompt: 'If I would have money, I would buy a ticket.', options: ['If I would had money, I would buy a ticket.', 'If I have money, I would buy a ticket.', 'If I had money, I would buy a ticket.'], answer: 2, tip: 'If + pasado simple, would + verbo base.', tags: COND },
  { id: 'b1-10-c2', topic: C2, kind: 'fix', prompt: 'If she would be famous, she would sing here.', options: ['If she were famous, she would sing here.', 'If she would were famous, she would sing here.', 'If she be famous, she would sing here.'], answer: 0, tip: 'If + were (no would).', tags: COND },
  { id: 'b1-10-c3', topic: C2, prompt: 'If I ___ a ticket, I would see every show.', options: ['have', 'had', 'would have'], answer: 1, tip: 'If + pasado simple.', tags: COND },
  { id: 'b1-10-c4', topic: C2, prompt: 'What would you do if you ___ the first prize?', options: ['win', 'would win', 'won'], answer: 2, tip: 'If + pasado simple (won).', tags: COND },
  { id: 'b1-10-c5', topic: C2, prompt: 'I ___ go to every concert if I had more money.', options: ['would', 'will', 'am'], answer: 0, tip: 'Resultado imaginario: would + verbo base.', tags: COND },
  { id: 'b1-10-c6', topic: C2, kind: 'order', prompt: 'Si yo fuera tú, iría al concierto.', options: ['If', 'I', 'were', 'you,', 'I', 'would', 'go', 'to', 'the', 'concert.'], answer: 0, tip: 'If I were you, I would…', tags: COND },
  { id: 'b1-10-c7', topic: C2, prompt: 'If I ___ free tonight, I would go with you.', options: ['am', 'would be', 'were'], answer: 2, tip: 'If + were.', tags: COND },
  {
    id: 'b1-10-c8',
    topic: C2,
    kind: 'listen',
    audio: 'If I had a lot of money, I would buy tickets for the whole festival. I would invite all my friends, and we would dance every night.',
    voice: 'female',
    prompt: '¿Qué haría con mucho dinero?',
    options: ['Viajar a otro país.', 'Comprar boletas para todo el festival.', 'Comprar una casa.'],
    answer: 1,
    tip: 'I would buy tickets for the whole festival.',
    tags: COND,
  },
  // Bloque A · la fila de la entrada (verbo + -ing / to)
  { id: 'b1-10-v1', topic: VP, kind: 'fix', prompt: 'I enjoy to dance at festivals.', options: ['I enjoy dance at festivals.', 'I enjoy dancing at festivals.', 'I enjoy to dancing at festivals.'], answer: 1, tip: 'enjoy + -ing.', tags: QUEUE },
  { id: 'b1-10-v2', topic: VP, kind: 'fix', prompt: 'We decided staying until the end.', options: ['We decided stay until the end.', 'We decided stayed until the end.', 'We decided to stay until the end.'], answer: 2, tip: 'decide + to + verbo base.', tags: QUEUE },
  { id: 'b1-10-v3', topic: VP, prompt: 'She finished ___ and left the stage.', options: ['singing', 'to sing', 'sing'], answer: 0, tip: 'finish + -ing.', tags: QUEUE },
  { id: 'b1-10-v4', topic: VP, prompt: 'I hope ___ the headliner tonight.', options: ['seeing', 'see', 'to see'], answer: 2, tip: 'hope + to + verbo base.', tags: QUEUE },
  { id: 'b1-10-v5', topic: VP, prompt: "They avoid ___ in the front row. It's too loud.", options: ['to stand', 'standing', 'stand'], answer: 1, tip: 'avoid + -ing.', tags: QUEUE },
  { id: 'b1-10-v6', topic: VP, kind: 'order', prompt: 'Queremos ver a la banda.', options: ['We', 'want', 'to', 'see', 'the', 'band.'], answer: 0, tip: 'want + to + verbo base.', tags: QUEUE },
  { id: 'b1-10-v7', topic: VP, prompt: 'He stopped ___ water because he was thirsty.', options: ['to buy', 'buying', 'buy'], answer: 0, tip: 'stop + to = paró para hacer algo.', tags: QUEUE },
  {
    id: 'b1-10-v8',
    topic: VP,
    kind: 'listen',
    audio: 'We decided to arrive early. I enjoy waiting in the queue because I meet new people. I hope to find a good place near the stage.',
    voice: 'male',
    prompt: '¿Por qué disfruta la fila?',
    options: ['Porque hay música.', 'Porque come algo.', 'Porque conoce gente.'],
    answer: 2,
    tip: 'I enjoy waiting because I meet new people.',
    tags: QUEUE,
  },
  // Bloque B · la persona especial (prefer / would rather)
  { id: 'b1-10-p1', topic: PR, kind: 'fix', prompt: "I'd rather to watch the band than the play.", options: ["I'd rather watching the band than the play.", "I'd rather watched the band than the play.", "I'd rather watch the band than the play."], answer: 2, tip: 'would rather + verbo base, sin to.', tags: PREFER },
  { id: 'b1-10-p2', topic: PR, kind: 'fix', prompt: 'I prefer stay at home.', options: ['I prefer stayed at home.', 'I prefer to stay at home.', 'I prefer staying at home to.'], answer: 1, tip: 'prefer + to + verbo base.', tags: PREFER },
  { id: 'b1-10-p3', topic: PR, prompt: 'I would ___ listen to music than play games.', options: ['prefer', 'better', 'rather'], answer: 2, tip: 'would rather + verbo base.', tags: PREFER },
  { id: 'b1-10-p4', topic: PR, prompt: 'I prefer dancing ___ sitting down.', options: ['than', 'to', 'that'], answer: 1, tip: 'prefer + -ing to + -ing.', tags: PREFER },
  { id: 'b1-10-p5', topic: PR, prompt: "She'd rather ___ the concert than stay at home.", options: ['go to', 'to go to', 'going to'], answer: 0, tip: 'would rather + verbo base.', tags: PREFER },
  { id: 'b1-10-p6', topic: PR, kind: 'order', prompt: 'Prefiero ver la banda a jugar.', options: ['I', 'prefer', 'watching', 'the', 'band', 'to', 'playing.'], answer: 0, tip: 'prefer + -ing to + -ing.', tags: PREFER },
  { id: 'b1-10-p7', topic: PR, prompt: "I'd rather ___ go tonight. I'm too tired.", options: ["don't", 'no', 'not'], answer: 2, tip: "Negativa: I'd rather not + verbo base.", tags: PREFER },
  {
    id: 'b1-10-p8',
    topic: PR,
    kind: 'listen',
    audio: 'I prefer playing games to watching concerts. But my brother would rather listen to music. He prefers to sit near the stage.',
    voice: 'female',
    prompt: '¿Qué prefiere quien habla?',
    options: ['Ver conciertos en vez de jugar.', 'Jugar en vez de ver conciertos.', 'Escuchar música.'],
    answer: 1,
    tip: 'I prefer playing games to watching concerts.',
    tags: PREFER,
  },
  // Bloque B · Jorge transmite (videojuegos)
  {
    id: 'b1-10-j1',
    topic: GA,
    kind: 'listen',
    audio: "Hi everybody! Today I'm playing a new adventure game at the festival. The graphics are incredible and the multiplayer is so much fun.",
    voice: 'male',
    prompt: '¿Qué tipo de juego está jugando?',
    options: ['Uno de carreras.', 'Uno de deportes.', 'Uno de aventura.'],
    answer: 2,
    tip: 'A new adventure game.',
    tags: STREAM,
  },
  {
    id: 'b1-10-j2',
    topic: GA,
    kind: 'listen',
    audio: "The gameplay is really smooth, but the levels are incredibly short. The main problem is the price: it's too expensive for a short game.",
    voice: 'male',
    prompt: '¿Cuál es el principal problema?',
    options: ['Los gráficos.', 'El precio.', 'El multijugador.'],
    answer: 1,
    tip: 'The main problem is the price.',
    tags: STREAM,
  },
  {
    id: 'b1-10-j3',
    topic: GA,
    kind: 'listen',
    audio: 'A viewer writes: I love the graphics! The best thing about this game is the music. Can you play with a friend in multiplayer?',
    voice: 'female',
    prompt: '¿Qué es lo mejor del juego según el espectador?',
    options: ['La música.', 'Los gráficos.', 'El precio.'],
    answer: 0,
    tip: 'The best thing about this game is the music.',
    tags: STREAM,
  },
  { id: 'b1-10-j4', topic: GA, prompt: 'In a game, the pictures, colours and animations are the ___.', options: ['levels', 'console', 'graphics'], answer: 2, tip: 'graphics = gráficos.', tags: STREAM },
  // Bloque B · Jorge y las opiniones (frases nominales)
  { id: 'b1-10-o1', topic: OP, kind: 'fix', prompt: 'The best thing about is the music.', options: ['The best thing about it the music.', 'The best thing about it is the music.', 'The best thing about it are the music.'], answer: 1, tip: 'The best thing about it is…', tags: OPINIONS },
  { id: 'b1-10-o2', topic: OP, kind: 'fix', prompt: 'The main problem it is the price.', options: ['The main problem it the price.', 'The main problem are the price.', 'The main problem is the price.'], answer: 2, tip: 'The main problem is…', tags: OPINIONS },
  { id: 'b1-10-o3', topic: OP, prompt: 'The worst ___ is waiting in line.', options: ['part', 'parte', 'partly'], answer: 0, tip: 'The worst part is…', tags: OPINIONS },
  { id: 'b1-10-o4', topic: OP, prompt: 'The levels are ___ short. I finished the game in one hour!', options: ['a lot', 'much', 'incredibly'], answer: 2, tip: 'incredibly + adjetivo.', tags: OPINIONS },
  { id: 'b1-10-o5', topic: OP, prompt: "The main problem ___ that it's expensive.", options: ['are', 'is', 'it is'], answer: 1, tip: 'The main problem is that…', tags: OPINIONS },
  { id: 'b1-10-o6', topic: OP, kind: 'order', prompt: 'Lo mejor es jugar con amigos.', options: ['The', 'best', 'thing', 'is', 'playing', 'with', 'friends.'], answer: 0, tip: 'The best thing is + -ing.', tags: OPINIONS },
  { id: 'b1-10-o7', topic: OP, prompt: 'The best thing about the festival ___ the music.', options: ['are', 'be', 'is'], answer: 2, tip: 'The best thing … is.', tags: OPINIONS },
  {
    id: 'b1-10-o8',
    topic: OP,
    kind: 'listen',
    audio: 'The best thing about the festival is the music. The main problem is the price of the food. And the worst part is the long queues.',
    voice: 'female',
    prompt: '¿Cuál es el principal problema?',
    options: ['Las filas largas.', 'El precio de la comida.', 'La música.'],
    answer: 1,
    tip: 'The main problem is the price of the food.',
    tags: OPINIONS,
  },
]
