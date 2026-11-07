import type { EnemyDef } from '../game/types'

/**
 * B1-04 · House Rules, bloque D: el jefe Mr. Fine Print, un contrato vivo (un monstruo de papel).
 * Aparece en el vestíbulo de la residencia, junto al mostrador de Marisol, cuando 'b1-04-phrasal' está hecha
 * (el mensaje de Marisol al final del banco). Fase 1: obligación · Fase 2: phrasal verbs y banco.
 * Suelta el atuendo 'llavero-residencia' (data/school.ts; se dibuja como una casita con llave, components/Sprite.tsx).
 * Preguntas en data/questions-b1-04.ts (tags b1-04-boss-ob y b1-04-boss-ph).
 */
const OB = 'obligation-b1' as const
const BP = 'bank-phrasal' as const

export const B1_04_BOSS_DEF: EnemyDef = {
  id: 'b1-04-boss',
  name: 'Mr. Fine Print',
  person: 'Mr. Fine Print',
  kind: 'boss',
  reward: 'llavero-residencia',
  hp: 8,
  topics: [OB, BP],
  kinds: ['fill', 'fix', 'order', 'listen'],
  tags: ['b1-04-boss'],
  phases: [
    {
      hp: 4,
      title: 'Obligación',
      topics: [OB],
      kinds: ['fill', 'fix', 'order', 'listen'],
      tags: ['b1-04-boss-ob'],
      line: { text: "You must to pay! You don't must smoke! She have to sign!", es: "You must to pay, You don't must smoke y She have to sign: mal." },
    },
    {
      hp: 4,
      title: 'Phrasal verbs y banco',
      topics: [BP],
      kinds: ['fill', 'fix', 'order', 'listen'],
      tags: ['b1-04-boss-ph'],
      line: { text: 'Pick up it! Where is the machine cash?', es: 'Pick up it y machine cash: mal.' },
    },
  ],
  onlyTags: true,
  zone: 'recepcion',
  look: { shirt: '#f4efe4', hair: '#b98c5a', skin: '#e8dcc8' },
  before: [{ text: "Section one: you must to pay! Section two: you don't must breathe! Sign here! Fill in it! Turn on it!", es: "Cláusula uno: ¡debes pagar! Cláusula dos: ¡no debes respirar! ¡Firma aquí! ¡Llénalo! ¡Préndelo! (must to pay, don't must breathe, Fill in it y Turn on it: mal)." }],
  after: [{ text: 'The pages are falling... the rules are fair again.', es: 'Las hojas se caen... las reglas vuelven a ser justas.' }],
  freed: { text: 'Thank you. Read me carefully next time!', es: 'Gracias. ¡Léeme con atención la próxima vez!' },
  farewell: { q: "Mr. Fine Print says: 'Read me carefully!' What do you answer?", options: ["OK! I'll read it carefully.", 'OK! I read will carefully it.', "OK! I'll to read carefully."], answer: 0, tip: "Decisión en el momento: will + verbo base (I'll read)." },
}

export const B1_04_BOSS_ENEMIES: Record<string, EnemyDef> = { [B1_04_BOSS_DEF.id]: B1_04_BOSS_DEF }
