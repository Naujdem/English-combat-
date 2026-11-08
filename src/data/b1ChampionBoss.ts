import type { EnemyDef } from '../game/types'

/**
 * B1-08 · Game Day, bloque D: el jefe The Champion (el capitán de los Leones Rojos, con la luz gris).
 * Aparece en el pasillo del medio tiempo (data/b1Concourse.ts), delante de la puerta del túnel, al vencer a los 2 hinchas.
 * Modelo: The Interviewer (6-D). Fase 1: superlativos · Fase 2: resultados y énfasis.
 * Suelta la bufanda del equipo ('bufanda-lumen', data/school.ts; se dibuja al cuello, Sprite.tsx, charm 'scarf').
 * Preguntas en data/questions-b1-08.ts (tags b1-08-boss-s y b1-08-boss-e).
 */
const SU = 'superlatives-b1' as const
const EM = 'emphasis-b1' as const
const FR = 'football-results' as const

export const B1_08_BOSS_DEF: EnemyDef = {
  id: 'b1-08-boss',
  name: 'The Champion',
  person: 'The Champion',
  kind: 'boss',
  reward: 'bufanda-lumen',
  hp: 8,
  topics: [SU, EM, FR],
  kinds: ['fix', 'fill', 'order', 'listen'],
  tags: ['b1-08-boss'],
  phases: [
    {
      hp: 4,
      title: 'Superlativos',
      topics: [SU],
      kinds: ['fix', 'fill', 'order', 'listen'],
      tags: ['b1-08-boss-s'],
      line: { text: "I'm the most fast! He is the most good! The most big goal!", es: 'the most fast, the most good y the most big: mal.' },
    },
    {
      hp: 4,
      title: 'Resultados y énfasis',
      topics: [EM, FR],
      kinds: ['fix', 'fill', 'order', 'listen'],
      tags: ['b1-08-boss-e'],
      line: { text: 'Such good game! What goal! We won to Lumen Bay!', es: 'Such good game, What goal y won to Lumen Bay: mal.' },
    },
  ],
  onlyTags: true,
  zone: 'recepcion',
  look: { shirt: '#2b2b2b', hair: '#1b1b1b', skin: '#c68e6a' },
  before: [{ text: "I'm the most good player! Such good goal! We won to Lumen Bay!", es: 'the most good player, Such good goal y won to Lumen Bay: mal.' }],
  after: [{ text: 'The grey light is gone... I only wanted to win.', es: 'La luz gris se fue... solo quería ganar.' }],
  freed: { text: 'Good game. Lumen Bay is the best team today.', es: 'Buen partido. Lumen Bay es el mejor equipo hoy.' },
  farewell: {
    q: "The Champion says: 'Good game!' What do you answer?",
    options: ['Thank you. It was such good game.', 'Thank you. It was such a good game!', 'Thank you. It was so a good game.'],
    answer: 1,
    tip: 'such a + adjetivo + sustantivo.',
  },
}

export const B1_08_BOSS_ENEMIES: Record<string, EnemyDef> = { [B1_08_BOSS_DEF.id]: B1_08_BOSS_DEF }
