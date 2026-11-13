import type { Question } from '../game/types'

/**
 * B1-13 · The Price (recuerdo 13). Bloque A (el Temple of Echoes, data/b1TempleEchoes.ts):
 *  - Práctica del cuaderno de L, página 61 (tarea b1-13-notebook, tema achievement-b1): b1-13-a1…a8.
 *  - Práctica del muro de los ecos (tarea b1-13-wall-ins, tema price-b1): b1-13-p1…p8.
 * La posición de la respuesta correcta varía a propósito.
 */
const AC = 'achievement-b1' as const
const PR = 'price-b1' as const
const NOTEBOOK = ['b1-13-notebook']
const WALL = ['b1-13-wall']
/** Bloque B (la sala del Keeper, data/b1EchoHall.ts): primer acertijo (k1…k6), página 62 (f1…f8) y segundo acertijo (k7…k12) */
const FP = 'future-plans-b1' as const
const KEEPER_A = ['b1-13-keeper-a']
const NOTEBOOK2 = ['b1-13-notebook2']
const KEEPER_F = ['b1-13-keeper-f']
/** Bloque C (fuera del templo, data/b1TempleCamp.ts): página 63 (u1…u8) */
const AU = 'although-unless-b1' as const
const PAGE63 = ['b1-13-page63']

export const B1_13_NOTEBOOK_IDS = ['b1-13-a1', 'b1-13-a2', 'b1-13-a3', 'b1-13-a4', 'b1-13-a5', 'b1-13-a6', 'b1-13-a7', 'b1-13-a8']
export const B1_13_WALL_IDS = ['b1-13-p1', 'b1-13-p2', 'b1-13-p3', 'b1-13-p4', 'b1-13-p5', 'b1-13-p6', 'b1-13-p7', 'b1-13-p8']

export const B1_13_KEEPER_A_IDS = ['b1-13-k1', 'b1-13-k2', 'b1-13-k3', 'b1-13-k4', 'b1-13-k5', 'b1-13-k6']
export const B1_13_NOTEBOOK2_IDS = ['b1-13-f1', 'b1-13-f2', 'b1-13-f3', 'b1-13-f4', 'b1-13-f5', 'b1-13-f6', 'b1-13-f7', 'b1-13-f8']
export const B1_13_KEEPER_F_IDS = ['b1-13-k7', 'b1-13-k8', 'b1-13-k9', 'b1-13-k10', 'b1-13-k11', 'b1-13-k12']
export const B1_13_PAGE63_IDS = ['b1-13-u1', 'b1-13-u2', 'b1-13-u3', 'b1-13-u4', 'b1-13-u5', 'b1-13-u6', 'b1-13-u7', 'b1-13-u8']

export const B1_13_QUESTIONS: Question[] = [
  // Bloque A · página 61: logro y fracaso
  { id: 'b1-13-a1', topic: AC, kind: 'fix', prompt: 'I succeeded to find the temple.', options: ['I succeeded in finding the temple.', 'I succeeded finding to the temple.', 'I succeed in find the temple.'], answer: 0, tip: 'succeed in + -ing.', tags: NOTEBOOK },
  { id: 'b1-13-a2', topic: AC, kind: 'fix', prompt: 'She managed finding the door.', options: ['She managed in finding the door.', 'She managed to find the door.', 'She managed found the door.'], answer: 1, tip: 'manage to + verbo.', tags: NOTEBOOK },
  { id: 'b1-13-a3', topic: AC, prompt: 'He tried for years, but he ___ to open it.', options: ['succeeded', 'achieved', 'failed'], answer: 2, tip: 'fail to + verbo.', tags: NOTEBOOK },
  { id: 'b1-13-a4', topic: AC, prompt: 'After many years, I finally ___ it to the top.', options: ['did', 'made', 'gave'], answer: 1, tip: 'make it = lograrlo.', tags: NOTEBOOK },
  { id: 'b1-13-a5', topic: AC, prompt: 'It was too hard, so she ___ up.', options: ['gave', 'made', 'failed'], answer: 0, tip: 'give up = rendirse.', tags: NOTEBOOK },
  { id: 'b1-13-a6', topic: AC, kind: 'order', prompt: 'Por fin lo logré, pero ¿a qué costo?', options: ['I', 'finally', 'made', 'it,', 'but', 'at', 'what', 'cost?'], answer: 0, tip: 'I finally made it, but at what cost?', tags: NOTEBOOK },
  {
    id: 'b1-13-a7',
    topic: AC,
    kind: 'listen',
    audio: 'I achieved my goal. I succeeded in building the machine, but I failed to keep my friends. Now I wonder if it was worth the price.',
    voice: 'male',
    prompt: 'What did the speaker fail to do?',
    options: ['Build the machine.', 'Keep his friends.', 'Find the temple.'],
    answer: 1,
    tip: 'I failed to keep my friends.',
    tags: NOTEBOOK,
  },
  { id: 'b1-13-a8', topic: AC, prompt: "'Blame' significa ___.", options: ['culpa', 'precio', 'venganza'], answer: 0, tip: 'blame = culpa.', tags: NOTEBOOK },
  // Bloque A · el muro de los ecos: el precio
  { id: 'b1-13-p1', topic: PR, kind: 'fix', prompt: "A voice isn't create by the device.", options: ["A voice isn't created by the device.", "A voice isn't creating by the device.", "A voice doesn't created by the device."], answer: 0, tip: "Pasiva: isn't + participio (created).", tags: WALL },
  { id: 'b1-13-p2', topic: PR, kind: 'fix', prompt: 'A voice is took from someone.', options: ['A voice is taked from someone.', 'A voice is taken from someone.', 'A voice takes from someone.'], answer: 1, tip: 'Pasiva: is + participio (taken).', tags: WALL },
  { id: 'b1-13-p3', topic: PR, prompt: 'I finally made ___ to the top, but it cost me everything.', options: ['up', 'them', 'it'], answer: 2, tip: 'make it = lograrlo.', tags: WALL },
  { id: 'b1-13-p4', topic: PR, prompt: 'Nobody wins without ___ the price.', options: ['pay', 'paying', 'paid'], answer: 1, tip: 'without + -ing.', tags: WALL },
  { id: 'b1-13-p5', topic: PR, prompt: "It's ___ to take someone's voice. It's cruel.", options: ['unfair', 'generous', 'useful'], answer: 0, tip: 'unfair = injusto.', tags: WALL },
  { id: 'b1-13-p6', topic: PR, kind: 'order', prompt: 'Alguien siempre paga el precio.', options: ['Someone', 'always', 'pays', 'the', 'price.'], answer: 0, tip: 'always antes del verbo.', tags: WALL },
  {
    id: 'b1-13-p7',
    topic: PR,
    kind: 'listen',
    audio: "The wall says that the device doesn't create a voice. It takes one. Someone always pays the price, and nobody asks who.",
    voice: 'female',
    prompt: 'What does the device do?',
    options: ['It creates a voice.', 'It takes a voice.', 'It erases memory.'],
    answer: 1,
    tip: 'It takes one.',
    tags: WALL,
  },
  { id: 'b1-13-p8', topic: PR, prompt: "'Revenge' significa ___.", options: ['venganza', 'perdón', 'precio'], answer: 0, tip: 'revenge = venganza.', tags: WALL },
  // Bloque B · primer acertijo del Keeper: logro y fracaso
  { id: 'b1-13-k1', topic: AC, kind: 'fix', prompt: 'They failed reaching the top.', options: ['They failed to reaching the top.', 'They failed to reach the top.', 'They failed in reach the top.'], answer: 1, tip: 'fail to + verbo base.', tags: KEEPER_A },
  { id: 'b1-13-k2', topic: AC, kind: 'fix', prompt: 'He gived up after a year.', options: ['He gave up after a year.', 'He gaved up after a year.', 'He given up after a year.'], answer: 0, tip: 'Pasado de give: gave.', tags: KEEPER_A },
  { id: 'b1-13-k3', topic: AC, prompt: 'We ___ our goal after years of work.', options: ['did', 'won to', 'achieved'], answer: 2, tip: 'achieve a goal.', tags: KEEPER_A },
  { id: 'b1-13-k4', topic: AC, prompt: 'She tried and tried, and she finally ___ in finding it.', options: ['managed', 'succeeded', 'achieved'], answer: 1, tip: 'succeed in + -ing.', tags: KEEPER_A },
  { id: 'b1-13-k5', topic: AC, kind: 'order', alts: ["After three years she gave up."], prompt: 'Se rindió después de tres años.', options: ['She', 'gave', 'up', 'after', 'three', 'years.'], answer: 0, tip: 'give up = rendirse.', tags: KEEPER_A },
  {
    id: 'b1-13-k6',
    topic: AC,
    kind: 'listen',
    audio: 'I tried to open the door for hours, but I failed. Then my friend helped me, and we managed to open it together.',
    voice: 'female',
    prompt: 'How did the speaker manage to open the door?',
    options: ["With a friend's help.", 'With a key.', 'By breaking it.'],
    answer: 0,
    tip: 'My friend helped me, and we managed to open it.',
    tags: KEEPER_A,
  },
  // Bloque B · página 62: futuros para planes
  { id: 'b1-13-f1', topic: FP, kind: 'fix', prompt: 'Tomorrow I going to wait at the school.', options: ["Tomorrow I'm going to wait at the school.", "Tomorrow I'm go to wait at the school.", 'Tomorrow I going wait at the school.'], answer: 0, tip: 'am going to + verbo.', tags: NOTEBOOK2 },
  { id: 'b1-13-f2', topic: FP, kind: 'fix', prompt: 'We are meet the director at nine tomorrow.', options: ['We meeting the director at nine tomorrow.', 'We are meeting the director at nine tomorrow.', 'We are met the director at nine tomorrow.'], answer: 1, tip: 'Arreglo con hora: are meeting.', tags: NOTEBOOK2 },
  { id: 'b1-13-f3', topic: FP, prompt: "It's dark. I ___ turn on the light.", options: ['going to', 'am going', 'will'], answer: 2, tip: 'Decisión en el momento: will.', tags: NOTEBOOK2 },
  { id: 'b1-13-f4', topic: FP, prompt: 'Look at those clouds! It ___ rain.', options: ['is going to', 'will to', 'is going'], answer: 0, tip: 'Con evidencia: is going to.', tags: NOTEBOOK2 },
  { id: 'b1-13-f5', topic: FP, prompt: "At eight o'clock tomorrow, I ___ by the window.", options: ['will be standing', 'will standing', 'am will stand'], answer: 0, tip: 'En progreso a las ocho: will be + -ing.', tags: NOTEBOOK2 },
  { id: 'b1-13-f6', topic: FP, kind: 'order', alts: ["I'm going to wait at the school tomorrow."], prompt: 'Mañana voy a esperar en la escuela.', options: ['Tomorrow', "I'm", 'going', 'to', 'wait', 'at', 'the', 'school.'], answer: 0, tip: "I'm going to + verbo.", tags: NOTEBOOK2 },
  {
    id: 'b1-13-f7',
    topic: FP,
    kind: 'listen',
    audio: "Tomorrow I'm going to travel back to the city. I'm meeting an old friend at eight, and this time tomorrow I'll be sitting in his kitchen.",
    voice: 'male',
    prompt: 'What time is the speaker meeting his friend?',
    options: ['At six.', 'At eight.', 'At nine.'],
    answer: 1,
    tip: "I'm meeting an old friend at eight.",
    tags: NOTEBOOK2,
  },
  { id: 'b1-13-f8', topic: FP, prompt: 'I think it ___ be a long night.', options: ['will', 'am going', 'are'], answer: 0, tip: 'Predicción: will.', tags: NOTEBOOK2 },
  // Bloque B · segundo acertijo del Keeper: futuros
  { id: 'b1-13-k7', topic: FP, kind: 'fix', prompt: 'She not going to wait for us.', options: ["She isn't going to wait for us.", "She isn't go to wait for us.", "She doesn't going to wait for us."], answer: 0, tip: "isn't going to + verbo.", tags: KEEPER_F },
  { id: 'b1-13-k8', topic: FP, kind: 'fix', prompt: 'This time tomorrow, I will traveling.', options: ['This time tomorrow, I will be travel.', 'This time tomorrow, I will be traveling.', 'This time tomorrow, I be will traveling.'], answer: 1, tip: 'will be + -ing.', tags: KEEPER_F },
  { id: 'b1-13-k9', topic: FP, prompt: "We ___ the guide at nine. It's arranged.", options: ['are meeting', 'meeting', 'are meet'], answer: 0, tip: 'Arreglo: are meeting.', tags: KEEPER_F },
  { id: 'b1-13-k10', topic: FP, prompt: 'Careful! That box ___ fall!', options: ['will to', 'is going to', 'are going to'], answer: 1, tip: 'Con evidencia: is going to.', tags: KEEPER_F },
  { id: 'b1-13-k11', topic: FP, kind: 'order', alts: ["I am going to leave this temple tomorrow."], prompt: 'Mañana voy a dejar este templo.', options: ['Tomorrow', 'I', 'am', 'going', 'to', 'leave', 'this', 'temple.'], answer: 0, tip: 'am going to + verbo.', tags: KEEPER_F },
  {
    id: 'b1-13-k12',
    topic: FP,
    kind: 'listen',
    audio: "The guide told me about tomorrow. We are meeting at nine, and we are going to climb the hill. By noon, we'll be eating at the top.",
    voice: 'female',
    prompt: 'Where will they be at noon?',
    options: ['In the village.', 'At the top.', 'In the temple.'],
    answer: 1,
    tip: "By noon, we'll be eating at the top.",
    tags: KEEPER_F,
  },
  // Bloque C · página 63: although, unless, in case
  { id: 'b1-13-u1', topic: AU, kind: 'fix', prompt: 'Although it was raining, but we went out.', options: ['Although it was raining, we went out.', 'Although it raining, we went out.', 'Although was raining, we went out.'], answer: 0, tip: 'although ya contrasta: no lleva but.', tags: PAGE63 },
  { id: 'b1-13-u2', topic: AU, kind: 'fix', prompt: "Unless you will hurry, you'll miss the train.", options: ["Unless you hurried, you'll miss the train.", "Unless you hurry, you'll miss the train.", "Unless you will to hurry, you'll miss the train."], answer: 1, tip: 'Después de unless: presente.', tags: PAGE63 },
  { id: 'b1-13-u3', topic: AU, prompt: '___ he was tired, he kept working.', options: ['So', 'Unless', 'Although'], answer: 2, tip: 'although = aunque.', tags: PAGE63 },
  { id: 'b1-13-u4', topic: AU, prompt: "I'll take an umbrella ___ it rains.", options: ['in case', 'in order', 'in rains'], answer: 0, tip: 'in case = por si acaso.', tags: PAGE63 },
  { id: 'b1-13-u5', topic: AU, prompt: "You can't go in ___ you have a ticket.", options: ['although', 'unless', 'in case'], answer: 1, tip: 'unless = si no.', tags: PAGE63 },
  { id: 'b1-13-u6', topic: AU, kind: 'order', alts: ["I'll never speak again unless I take it."], prompt: 'A menos que lo tome, nunca volveré a hablar.', options: ['Unless', 'I', 'take', 'it,', "I'll", 'never', 'speak', 'again.'], answer: 0, tip: 'Unless + presente, will + verbo.', tags: PAGE63 },
  {
    id: 'b1-13-u7',
    topic: AU,
    kind: 'listen',
    audio: "Although the road was dangerous, he kept walking. He took a lamp in case it got dark, and he told himself: unless I arrive tonight, I'll lose my chance.",
    voice: 'male',
    prompt: 'Why did he take a lamp?',
    options: ['In case it got dark.', 'Because he was cold.', 'Because he was lost.'],
    answer: 0,
    tip: 'He took a lamp in case it got dark.',
    tags: PAGE63,
  },
  { id: 'b1-13-u8', topic: AU, kind: 'fix', prompt: "I'll take my coat in case it will be cold.", options: ["I'll take my coat in case it being cold.", "I'll take my coat in case it be cold.", "I'll take my coat in case it is cold."], answer: 2, tip: 'Después de in case: presente.', tags: PAGE63 },
]
