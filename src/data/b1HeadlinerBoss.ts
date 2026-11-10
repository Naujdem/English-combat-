import type { EnemyDef } from '../game/types'

/**
 * B1-10 · Festival Night, bloque D: el jefe The Headliner (Rutneri, el artista principal, con la luz gris).
 * Aparece en el escenario principal (data/b1Stage.ts), junto a la cabina del DJ, al vencer a los 2 espectadores.
 * Modelo: The Champion (8-D). Fase 1: segundo condicional · Fase 2: prefer / would rather y opiniones.
 * Suelta la pulsera del festival ('pulsera-festival', data/school.ts; se dibuja en la muñeca, Sprite.tsx, charm 'wristband').
 * Preguntas en data/questions-b1-10.ts (tags b1-10-boss-c y b1-10-boss-p).
 */
const C2 = 'conditional-2' as const
const PR = 'prefer-b1' as const
const OP = 'opinions-b1' as const

export const B1_10_BOSS_DEF: EnemyDef = {
  id: 'b1-10-boss',
  name: 'The Headliner',
  person: 'Rutneri',
  kind: 'boss',
  reward: 'pulsera-festival',
  hp: 8,
  topics: [C2, PR, OP],
  kinds: ['fix', 'fill', 'order', 'listen'],
  tags: ['b1-10-boss'],
  phases: [
    {
      hp: 4,
      title: 'Segundo condicional',
      topics: [C2],
      kinds: ['fix', 'fill', 'order', 'listen'],
      tags: ['b1-10-boss-c'],
      line: { text: 'If I would have more fans, I would be the king! If I would be rich...', es: 'If I would have y If I would be: mal.' },
    },
    {
      hp: 4,
      title: 'Prefer y opiniones',
      topics: [PR, OP],
      kinds: ['fix', 'fill', 'order', 'listen'],
      tags: ['b1-10-boss-p'],
      line: { text: 'I prefer play alone! The main problem it is the crowd!', es: 'I prefer play y The main problem it is: mal.' },
    },
  ],
  onlyTags: true,
  zone: 'recepcion',
  look: { shirt: '#2b1f4a', hair: '#c73e8a', skin: '#d0a77f' },
  before: [{ text: "If I would have more fans, I would be the king! You're coming, don't you? I prefer play alone!", es: "If I would have, You're coming, don't you? y I prefer play: mal." }],
  after: [{ text: 'The music stops. The grey light is gone.', es: 'La música se detiene. La luz gris se fue.' }],
  freed: { text: "I'd rather play for friends than for fame. Thank you!", es: 'Prefiero tocar para amigos que para la fama. ¡Gracias!' },
  farewell: {
    q: "Rutneri says: 'The best thing about tonight was you!' What do you answer?",
    options: ['Thank you! The best thing about tonight it was the music.', 'Thank you! The best thing about tonight were the music.', 'Thank you! The best thing about tonight was the music.'],
    answer: 2,
    tip: 'The best thing about… + was + sustantivo.',
  },
}

export const B1_10_BOSS_ENEMIES: Record<string, EnemyDef> = { [B1_10_BOSS_DEF.id]: B1_10_BOSS_DEF }
