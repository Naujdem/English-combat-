import type { EnemyDef } from '../game/types'

/**
 * B1-12 · Old Friends, bloque D: el jefe ligero The Rumor (un susurro gris con una boca hecha de letras).
 * Aparece junto a la fuente de la plaza (data/b1HostPlaza.ts) al terminar el guion inicial (b1-12-plaza-intro).
 * Modelo: The Headliner (10-D). Fase 1: verbos de estado · Fase 2: future continuous.
 * Suelta el delantal de la abuela Jhoana ('delantal-jhoana', data/school.ts; se dibuja sobre el torso, Sprite.tsx, charm 'apron').
 * Preguntas en data/questions-b1-12.ts (tags b1-12-boss-s y b1-12-boss-f).
 */
const SV = 'state-verbs-b1' as const
const FC = 'future-continuous-b1' as const

export const B1_12_BOSS_DEF: EnemyDef = {
  id: 'b1-12-boss',
  name: 'The Rumor',
  person: 'The Rumor',
  kind: 'boss',
  reward: 'delantal-jhoana',
  hp: 6,
  topics: [SV, FC],
  kinds: ['fix', 'fill', 'order', 'listen'],
  tags: ['b1-12-boss'],
  phases: [
    {
      hp: 3,
      title: 'Verbos de estado',
      topics: [SV],
      kinds: ['fix', 'fill', 'order', 'listen'],
      tags: ['b1-12-boss-s'],
      line: { text: 'I am knowing a secret! I am hating this group! You are liking nobody!', es: 'I am knowing, I am hating y You are liking: mal.' },
    },
    {
      hp: 3,
      title: 'Future continuous',
      topics: [FC],
      kinds: ['fix', 'fill', 'order', 'listen'],
      tags: ['b1-12-boss-f'],
      line: { text: 'At 8 I will waiting here! Tomorrow they will leaving you alone!', es: 'I will waiting y they will leaving: mal.' },
    },
  ],
  onlyTags: true,
  zone: 'parque',
  look: { shirt: '#5a5a66', hair: '#b9b9c4', skin: '#9a9aa8' },
  before: [{ text: 'I am knowing a secret! I am hating this group! At 8 I will waiting for you all!', es: 'I am knowing, I am hating y I will waiting: mal.' }],
  after: [{ text: 'The whisper fades. The plaza is quiet again.', es: 'El susurro se apaga. La plaza vuelve a estar en calma.' }],
  freed: { text: "I was just a story. Don't believe everything you hear.", es: 'Solo era un cuento. No creas todo lo que oyes.' },
  farewell: {
    q: "The Rumor says: 'Do you know who started me?' What do you answer?",
    options: ["No, I'm not knowing. I think it's not important.", "No, I don't know. I think it's not important.", "No, I don't know. I'm thinking it's not important."],
    answer: 1,
    tip: 'know y think (opinión) son verbos de estado: sin -ing.',
  },
}

export const B1_12_BOSS_ENEMIES: Record<string, EnemyDef> = { [B1_12_BOSS_DEF.id]: B1_12_BOSS_DEF }
