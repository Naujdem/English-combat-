import type { DialogLine } from '../game/types'

/**
 * Misión "Objetos perdidos": Maya perdió su mochila y Leo su libro.
 * El jugador los encuentra en la escuela y pregunta "Is this your...?" hasta dar con el dueño.
 * Practica posesivos de forma natural: "No, it isn't mine. It's Maya's".
 */
export type LostItem = {
  id: string
  owner: 'maya' | 'leo'
  en: string
  /** Con artículo, para las frases: "la mochila rosada" */
  es: string
  /** Solo el sustantivo: "mochila" */
  noun: string
  color: string
  x: number
  y: number
  /** Tres formas de preguntar; solo una es correcta */
  ask: { options: string[]; answer: number; tip: string }
}

export const LOST_ITEMS: LostItem[] = [
  {
    id: 'bag',
    owner: 'maya',
    en: 'bag',
    es: 'la mochila rosada',
    noun: 'mochila',
    color: '#d4537e',
    x: 9,
    y: 3,
    ask: { options: ['Is this your bag?', 'Is this you bag?', 'This your bag is?'], answer: 0, tip: 'Para preguntar si algo es de alguien: Is this your...? Antes de "bag" va "your", no "you".' },
  },
  {
    id: 'book',
    owner: 'leo',
    en: 'book',
    es: 'el libro azul',
    noun: 'libro',
    color: '#3b6fb6',
    x: 5,
    y: 1,
    ask: { options: ['Is this you book?', 'Is this your book?', 'Is your this book?'], answer: 1, tip: 'La pregunta es: Is this your book? El verbo "is" va primero y "your" va antes de "book".' },
  },
]

export const LOST_INTRO: DialogLine[] = [
  { who: 'friend', text: "Oh no! My bag is gone! And Leo can't find his book!", es: '¡Oh no! ¡Mi mochila desapareció! ¡Y Leo no encuentra su libro!' },
  {
    who: 'friend',
    text: "Can you help us? Look around the school. When you find something, ask people: 'Is this your bag?'",
    es: '¿Nos ayudas? Busca por la escuela. Cuando encuentres algo, pregúntale a la gente: "Is this your bag?"',
  },
]

const OWNER_NAME = { maya: 'Maya', leo: 'Leo' }

/** Qué responde cada persona cuando le preguntas por un objeto */
export function lostReply(item: LostItem, npcId: string): { text: string; es: string; owner: boolean } {
  if (npcId === item.owner) {
    return item.owner === 'maya'
      ? { text: "Yes! It's my bag! Thank you so much!", es: '¡Sí! ¡Es mi mochila! ¡Muchas gracias!', owner: true }
      : { text: "Yes, it's my book! Thanks, friend!", es: '¡Sí, es mi libro! ¡Gracias, amigo!', owner: true }
  }
  const who = OWNER_NAME[item.owner]
  const pos = item.owner === 'maya' ? 'Her' : 'His'
  const posEs = 'Su'
  if (npcId === 'leo') {
    return {
      text: `No, it isn't my ${item.en}. My ${item.en} is green. Maybe it's ${who}'s? ${pos} ${item.en} is ${item.owner === 'maya' ? 'pink' : 'blue'}.`,
      es: `No, no es mi ${item.noun}. ${item.owner === 'maya' ? 'La mía' : 'El mío'} es verde. ¿Será de ${who}? ${posEs} ${item.noun} es ${item.owner === 'maya' ? 'rosada' : 'azul'}.`,
      owner: false,
    }
  }
  if (npcId === 'maya') {
    return {
      text: `No, it isn't my ${item.en}. It's ${who}'s. ${pos} books are blue.`,
      es: `No, no es mi ${item.noun}. Es de ${who}. ${posEs}s libros son azules.`,
      owner: false,
    }
  }
  if (npcId === 'interest') {
    return { text: `No, it isn't mine. I think it's ${who}'s ${item.en}.`, es: `No, no es mi ${item.noun}. Creo que es de ${who}.`, owner: false }
  }
  return { text: `Not mine! I think it's ${who}'s ${item.en}.`, es: `¡No es mi ${item.noun}! Creo que es de ${who}.`, owner: false }
}
