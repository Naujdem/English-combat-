import type { Question } from '../game/types'

/**
 * B1-11 · The First Journey (recuerdo 11). Bloque A (el cuarto de L, data/b1ClockRoom.ts):
 *  - Práctica del cuaderno de L, página 42 (tarea b1-11-notebook, tema narrative-b1): b1-11-n1…n8.
 *  - Práctica del muro de recortes (tarea b1-11-wall, tema conditional-3): b1-11-t1…t8.
 * La posición de la respuesta correcta varía a propósito.
 */
const NA = 'narrative-b1' as const
const C3 = 'conditional-3' as const
const NOTEBOOK = ['b1-11-notebook']
const WALL = ['b1-11-wall']
/** Bloque B (la noche del incendio, data/b1FireNight.ts): página 43 y los esbirros Ash Echo */
const PP = 'pastperfect-b1' as const
const PAGE43 = ['b1-11-page43']
const ECHO = ['b1-11-echo']

export const B1_11_NOTEBOOK_IDS = ['b1-11-n1', 'b1-11-n2', 'b1-11-n3', 'b1-11-n4', 'b1-11-n5', 'b1-11-n6', 'b1-11-n7', 'b1-11-n8']
export const B1_11_WALL_IDS = ['b1-11-t1', 'b1-11-t2', 'b1-11-t3', 'b1-11-t4', 'b1-11-t5', 'b1-11-t6', 'b1-11-t7', 'b1-11-t8']

export const B1_11_PAGE43_IDS = ['b1-11-pp1', 'b1-11-pp2', 'b1-11-pp3', 'b1-11-pp4', 'b1-11-pp5', 'b1-11-pp6', 'b1-11-pp7', 'b1-11-pp8']

export const B1_11_QUESTIONS: Question[] = [
  // Bloque A · página 42: tiempos narrativos
  { id: 'b1-11-n1', topic: NA, kind: 'fix', prompt: 'Last night, suddenly, the lights go out.', options: ['Last night, suddenly, the lights goes out.', 'Last night, suddenly, the lights was going out.', 'Last night, suddenly, the lights went out.'], answer: 2, tip: 'Hecho principal en el pasado: pasado simple (went).', tags: NOTEBOOK },
  { id: 'b1-11-n2', topic: NA, kind: 'fix', prompt: 'I was walk home when it started to rain.', options: ['I was walking home when it started to rain.', 'I was walked home when it started to rain.', 'I were walking home when it started to rain.'], answer: 0, tip: 'Pasado continuo: was + -ing.', tags: NOTEBOOK },
  { id: 'b1-11-n3', topic: NA, prompt: 'Mia was cooking. ___, her brother was cleaning the kitchen.', options: ['Although', 'Because', 'Meanwhile'], answer: 2, tip: 'Meanwhile = mientras tanto.', tags: NOTEBOOK },
  { id: 'b1-11-n4', topic: NA, prompt: 'I was reading when the lights ___ out.', options: ['going', 'went', 'goes'], answer: 1, tip: 'Pasado simple: went.', tags: NOTEBOOK },
  { id: 'b1-11-n5', topic: NA, prompt: "She ___ her keys, so she couldn't open the door.", options: ['had lost', 'was lose', 'has losing'], answer: 0, tip: 'Lo que pasó antes: past perfect (had lost).', tags: NOTEBOOK },
  { id: 'b1-11-n6', topic: NA, kind: 'order', prompt: 'Para cuando llegué, el tren ya se había ido.', options: ['By', 'the', 'time', 'I', 'arrived,', 'the', 'train', 'had', 'already', 'left.'], answer: 0, tip: 'By the time + pasado simple, + past perfect.', tags: NOTEBOOK },
  {
    id: 'b1-11-n7',
    topic: NA,
    kind: 'listen',
    audio: 'It was a cold night. I was walking home when suddenly the clock began to glow. Eventually, I understood what it was.',
    voice: 'male',
    prompt: '¿Qué pasó de repente?',
    options: ['Empezó a llover.', 'El reloj empezó a brillar.', 'Se apagaron las luces.'],
    answer: 1,
    tip: 'Suddenly the clock began to glow.',
    tags: NOTEBOOK,
  },
  { id: 'b1-11-n8', topic: NA, prompt: "'Eventually' significa ___.", options: ['de repente', 'mientras tanto', 'finalmente'], answer: 2, tip: 'Eventually = finalmente.', tags: NOTEBOOK },
  // Bloque A · el muro de recortes: tercer condicional
  { id: 'b1-11-t1', topic: C3, kind: 'fix', prompt: 'If I would have known, I would have told you.', options: ['If I had known, I would have told you.', 'If I know, I would have told you.', 'If I would known, I would have told you.'], answer: 0, tip: 'If + past perfect (had known).', tags: WALL },
  { id: 'b1-11-t2', topic: C3, kind: 'fix', prompt: 'If she had called, we would help her.', options: ['If she had called, we would helping her.', 'If she had called, we would have helped her.', 'If she called, we would had helped her.'], answer: 1, tip: 'would have + participio.', tags: WALL },
  { id: 'b1-11-t3', topic: C3, prompt: 'If they ___ earlier, they would have arrived on time.', options: ['would have left', 'leaving', 'had left'], answer: 2, tip: 'If + past perfect (had left).', tags: WALL },
  { id: 'b1-11-t4', topic: C3, prompt: 'I would have helped him if I ___ about it.', options: ['knew', 'had known', 'would know'], answer: 1, tip: 'If + past perfect.', tags: WALL },
  { id: 'b1-11-t5', topic: C3, prompt: 'She ___ the bus if she had run faster.', options: ['would have caught', 'would catch', 'had caught'], answer: 0, tip: 'Resultado: would have + participio.', tags: WALL },
  { id: 'b1-11-t6', topic: C3, kind: 'order', prompt: 'Si hubiera cerrado la puerta, el humo no se habría esparcido.', options: ['If', 'I', 'had', 'closed', 'the', 'door,', 'the', 'smoke', "wouldn't", 'have', 'spread.'], answer: 0, tip: 'If + had + participio, would have + participio.', tags: WALL },
  {
    id: 'b1-11-t7',
    topic: C3,
    kind: 'listen',
    audio: 'If I had known about the fire, I would have called the firefighters earlier. If only I had stayed a little longer, I could have helped more.',
    voice: 'female',
    prompt: '¿Qué habría hecho antes?',
    options: ['Llamar a los bomberos.', 'Cerrar la puerta.', 'Salir de casa.'],
    answer: 0,
    tip: 'I would have called the firefighters.',
    tags: WALL,
  },
  { id: 'b1-11-t8', topic: C3, prompt: 'I ___ not telling him the truth. I should have told him.', options: ['win', 'arrive', 'regret'], answer: 2, tip: 'regret = arrepentirse.', tags: WALL },
  // Bloque B · página 43: past perfect
  { id: 'b1-11-pp1', topic: PP, kind: 'fix', prompt: 'By the time I arrived, the fire started.', options: ['By the time I arrived, the fire had started.', 'By the time I arrived, the fire has started.', 'By the time I arrived, the fire was start.'], answer: 0, tip: 'Lo que pasó antes: had + participio.', tags: PAGE43 },
  { id: 'b1-11-pp2', topic: PP, kind: 'fix', prompt: 'When we got there, the others already leave.', options: ['When we got there, the others already leaving.', 'When we got there, the others had already left.', 'When we got there, the others already has left.'], answer: 1, tip: 'had already left.', tags: PAGE43 },
  { id: 'b1-11-pp3', topic: PP, prompt: 'I ___ never seen so much smoke before that night.', options: ['have', 'had', 'was'], answer: 1, tip: 'Antes de esa noche: past perfect (had seen).', tags: PAGE43 },
  { id: 'b1-11-pp4', topic: PP, prompt: 'They ___ the building before the firefighters came.', options: ['had left', 'have left', 'were leave'], answer: 0, tip: 'had left.', tags: PAGE43 },
  { id: 'b1-11-pp5', topic: PP, prompt: "He ___ known about the alarm, so he didn't run.", options: ["hasn't", "wasn't", "hadn't"], answer: 2, tip: "Negativa: hadn't + participio.", tags: PAGE43 },
  { id: 'b1-11-pp6', topic: PP, kind: 'order', prompt: 'Cuando llegó, todos ya se habían ido.', options: ['When', 'she', 'arrived,', 'everyone', 'had', 'already', 'gone.'], answer: 0, tip: 'had + already + participio.', tags: PAGE43 },
  {
    id: 'b1-11-pp7',
    topic: PP,
    kind: 'listen',
    audio: 'When I arrived at the school, the firefighters had already come. The students had left the building, but one teacher was still inside.',
    voice: 'female',
    prompt: '¿Quién seguía dentro?',
    options: ['Un estudiante.', 'Un bombero.', 'Un profesor.'],
    answer: 2,
    tip: 'One teacher was still inside.',
    tags: PAGE43,
  },
  { id: 'b1-11-pp8', topic: PP, prompt: '___ you left the school when the fire started? — Yes, I had.', options: ['Had', 'Did', 'Do'], answer: 0, tip: 'Pregunta en past perfect: Had + sujeto + participio.', tags: PAGE43 },
  // Bloque B · los esbirros Ash Echo (tercer condicional y past perfect)
  { id: 'b1-11-x1', topic: C3, kind: 'fix', prompt: 'If we would have left earlier, we would have been safe.', options: ['If we leave earlier, we would have been safe.', 'If we had left earlier, we would have been safe.', 'If we would left earlier, we would have been safe.'], answer: 1, tip: 'If + past perfect.', tags: ECHO },
  { id: 'b1-11-x2', topic: PP, kind: 'fix', prompt: 'By the time he arrived, we already left.', options: ['By the time he arrived, we already leave.', 'By the time he arrived, we already leaving.', 'By the time he arrived, we had already left.'], answer: 2, tip: 'had already left.', tags: ECHO },
  { id: 'b1-11-x3', topic: C3, kind: 'fix', prompt: 'If I had saw the smoke, I would have called.', options: ['If I had seen the smoke, I would have called.', 'If I had see the smoke, I would have called.', 'If I would see the smoke, I would have called.'], answer: 0, tip: 'Participio de see: seen.', tags: ECHO },
  { id: 'b1-11-x4', topic: PP, prompt: 'The alarm ___ already rung when I woke up.', options: ['has', 'had', 'was'], answer: 1, tip: 'had already rung.', tags: ECHO },
  { id: 'b1-11-x5', topic: C3, prompt: "If she ___ the door, the smoke wouldn't have come in.", options: ['had closed', 'would close', 'closes'], answer: 0, tip: 'If + past perfect.', tags: ECHO },
  { id: 'b1-11-x6', topic: C3, prompt: 'We would have won if we ___ harder.', options: ['train', 'would train', 'had trained'], answer: 2, tip: 'If + past perfect.', tags: ECHO },
  { id: 'b1-11-x7', topic: C3, kind: 'order', prompt: 'Si hubiera sabido, habría ayudado.', options: ['If', 'I', 'had', 'known,', 'I', 'would', 'have', 'helped.'], answer: 0, tip: 'If + had + participio, would have + participio.', tags: ECHO },
  {
    id: 'b1-11-x8',
    topic: C3,
    kind: 'listen',
    audio: 'By the time we got to the street, the fire had spread to the second floor. If we had arrived ten minutes earlier, we could have saved the library.',
    voice: 'male',
    prompt: '¿Qué se pudo salvar?',
    options: ['La cocina.', 'La biblioteca.', 'El gimnasio.'],
    answer: 1,
    tip: 'We could have saved the library.',
    tags: ECHO,
  },
  { id: 'b1-11-x9', topic: PP, prompt: 'She was angry because he ___ told her the truth.', options: ["hadn't", "didn't had", "hasn't"], answer: 0, tip: "hadn't + participio.", tags: ECHO },
  { id: 'b1-11-x10', topic: PP, kind: 'fix', prompt: 'I had went home before the storm.', options: ['I had go home before the storm.', 'I had going home before the storm.', 'I had gone home before the storm.'], answer: 2, tip: 'Participio de go: gone.', tags: ECHO },
]
