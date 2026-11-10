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

export const B1_13_NOTEBOOK_IDS = ['b1-13-a1', 'b1-13-a2', 'b1-13-a3', 'b1-13-a4', 'b1-13-a5', 'b1-13-a6', 'b1-13-a7', 'b1-13-a8']
export const B1_13_WALL_IDS = ['b1-13-p1', 'b1-13-p2', 'b1-13-p3', 'b1-13-p4', 'b1-13-p5', 'b1-13-p6', 'b1-13-p7', 'b1-13-p8']

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
    prompt: '¿Qué no logró hacer?',
    options: ['Construir la máquina.', 'Conservar a sus amigos.', 'Encontrar el templo.'],
    answer: 1,
    tip: 'I failed to keep my friends.',
    tags: NOTEBOOK,
  },
  { id: 'b1-13-a8', topic: AC, prompt: "'Blame' significa ___.", options: ['culpa', 'precio', 'venganza'], answer: 0, tip: 'blame = culpa.', tags: NOTEBOOK },
  // Bloque A · el muro de los ecos: el precio
  { id: 'b1-13-p1', topic: PR, kind: 'fix', prompt: "The device don't create a voice.", options: ["The device doesn't create a voice.", "The device doesn't creates a voice.", 'The device not create a voice.'], answer: 0, tip: "doesn't + verbo base.", tags: WALL },
  { id: 'b1-13-p2', topic: PR, kind: 'fix', prompt: 'It take a voice from someone.', options: ['It taking a voice from someone.', 'It takes a voice from someone.', 'It does takes a voice from someone.'], answer: 1, tip: 'it + takes (3.ª persona).', tags: WALL },
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
    prompt: '¿Qué hace el aparato?',
    options: ['Crea una voz.', 'Toma una voz.', 'Borra la memoria.'],
    answer: 1,
    tip: 'It takes one.',
    tags: WALL,
  },
  { id: 'b1-13-p8', topic: PR, prompt: "'Revenge' significa ___.", options: ['venganza', 'perdón', 'precio'], answer: 0, tip: 'revenge = venganza.', tags: WALL },
]
