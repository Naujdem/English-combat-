import type { EnemyDef } from '../game/types'

/**
 * B1-06 · First Job, bloque D: el jefe The Interviewer (Esteban con el traje gris, por la luz gris de su pluma).
 * Aparece en la oficina (data/b1EstebanOffice.ts) cuando 'b1-06-interview' está hecha. Modelo: Mr. Fine Print (4-D).
 * Fase 1: oraciones de relativo · Fase 2: contar tu experiencia. Suelta la camiseta del refugio ('camiseta-refugio', data/school.ts).
 * Preguntas en data/questions-b1-06.ts (tags b1-06-boss-r y b1-06-boss-e).
 */
const RC = 'relative-clauses' as const
const EX = 'experience-b1' as const

export const B1_06_BOSS_DEF: EnemyDef = {
  id: 'b1-06-boss',
  name: 'The Interviewer',
  person: 'Esteban',
  kind: 'boss',
  reward: 'camiseta-refugio',
  hp: 8,
  topics: [RC, EX],
  kinds: ['fix', 'fill', 'order', 'listen'],
  tags: ['b1-06-boss'],
  phases: [
    {
      hp: 4,
      title: 'Relativos',
      topics: [RC],
      kinds: ['fix', 'fill', 'order', 'listen'],
      tags: ['b1-06-boss-r'],
      line: { text: "The man who's tie is grey is angry! The woman which hires you is late!", es: "The man who's tie y The woman which hires you: mal." },
    },
    {
      hp: 4,
      title: 'Tu experiencia',
      topics: [EX],
      kinds: ['fix', 'fill', 'order', 'listen'],
      tags: ['b1-06-boss-e'],
      line: { text: 'I worked here since three years! I have volunteered last year!', es: 'I worked here since y I have volunteered last year: mal.' },
    },
  ],
  onlyTags: true,
  zone: 'oficina',
  look: { shirt: '#59606b', hair: '#3a3a3a', skin: '#e1b896' },
  before: [{ text: 'The woman which hires you is late! You worked here since three years! Next!', es: 'The woman which y worked here since three years: mal. (¡Siguiente!)' }],
  after: [{ text: 'The grey light is gone. My head feels clear again.', es: 'La luz gris se fue. Tengo la cabeza despejada otra vez.' }],
  freed: { text: 'Thank you. I felt like a robot.', es: 'Gracias. Me sentía como un robot.' },
  farewell: { q: "Esteban says: 'See you on Monday!' What do you answer?", options: ["See you on Monday! I'm excited.", 'See you on Monday! I am excite.', "See you in Monday! I'm excited."], answer: 0, tip: 'excited = emocionado; See you on Monday.' },
}

export const B1_06_BOSS_ENEMIES: Record<string, EnemyDef> = { [B1_06_BOSS_DEF.id]: B1_06_BOSS_DEF }
