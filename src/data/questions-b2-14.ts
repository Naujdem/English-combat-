import type { Question } from '../game/types'

/**
 * B2-14 · Use Your Voice (presente, final de B2). Bloque 1 (el puerto al atardecer, data/b2UseYourVoice.ts):
 *  - Leo: condicionales mixtos (tarea b2-14-mixed, tema mixed-cond-b2): b2-14-mx1…mx6 (1 de escucha: las palabras de G).
 *  - Leo: wish / if only, wish + would y would rather (tarea b2-14-wish, tema wish-b2): b2-14-ws1…ws6 (1 de escucha).
 * Bloque 2: G, fase 1 (b2-14-boss-mx): b2-14-gm1…gm6 (1 de escucha) · fase 2, todo B2 (b2-14-boss-mix): b2-14-gr1…gr6
 *   · fase 3, a dos voces (b2-14-boss-v, frases para decir o escribir): b2-14-gv1…gv6. Los ecos reutilizan las preguntas de sus jefes.
 * Las opciones incorrectas están mal en cualquier contexto. La posición de la respuesta correcta varía a propósito.
 */
const MX = 'mixed-cond-b2' as const
const WS = 'wish-b2' as const
const T_MX = ['b2-14-mixed']
const T_WS = ['b2-14-wish']

const ids = (p: string) => [1, 2, 3, 4, 5, 6].map((n) => `b2-14-${p}${n}`)
export const B2_14_MIXED_IDS = ids('mx')
export const B2_14_WISH_IDS = ids('ws')

export const B2_14_QUESTIONS: Question[] = [
  // Bloque 1 · Condicionales mixtos (y repaso de los tres de B1)
  { id: 'b2-14-mx1', topic: MX, prompt: "If you hadn't been there, I ___ be disappearing now.", options: ["won't", "wouldn't", "hadn't"], answer: 1, tip: 'Pasado → presente: If + had + participio, would + verbo.', tags: T_MX },
  { id: 'b2-14-mx2', topic: MX, prompt: "If I weren't so angry, I ___ back.", options: ["wouldn't have come", "won't have come", "wouldn't came"], answer: 0, tip: 'Presente → pasado: If + pasado, would have + participio.', tags: T_MX },
  { id: 'b2-14-mx3', topic: MX, kind: 'fix', prompt: 'If I would have known, I would be here.', options: ['If I have known, I would be here.', 'If I had known, I would be here.', 'If I knew, I would have be here.'], answer: 1, tip: 'Nunca would en la parte del if: If I had known.', tags: T_MX },
  { id: 'b2-14-mx4', topic: MX, prompt: 'If she ___ the train, she would be here now.', options: ['would catch', 'has caught', 'had caught'], answer: 2, tip: 'Pasado → presente: If + had + participio (had caught).', tags: T_MX },
  {
    id: 'b2-14-mx5',
    topic: MX,
    kind: 'listen',
    audio: 'If you had helped me that night, I would still have my voice.',
    voice: 'male',
    prompt: 'What does G mean?',
    options: ['He lost his voice because nobody helped him.', 'He still has his voice.', 'Someone helped him that night.'],
    answer: 0,
    tip: '"If you had helped me…, I would still have my voice": nadie lo ayudó, y hoy no tiene voz.',
    tags: T_MX,
  },
  { id: 'b2-14-mx6', topic: MX, prompt: 'If we had left earlier, we ___ the bus.', options: ['would catch', 'would have caught', 'had caught'], answer: 1, tip: 'Tercer condicional (B1): If + had + participio, would have + participio.', tags: T_MX },

  // Bloque 1 · wish / if only, wish + would y would rather
  { id: 'b2-14-ws1', topic: WS, prompt: 'I wish I ___ you the truth.', options: ['had told', 'have told', 'would told'], answer: 0, tip: 'Arrepentimiento del pasado: wish + had + participio.', tags: T_WS },
  { id: 'b2-14-ws2', topic: WS, prompt: 'If only I ___ about the fire!', options: ['knew have', 'had known', 'would known'], answer: 1, tip: 'If only + had + participio: had known.', tags: T_WS },
  { id: 'b2-14-ws3', topic: WS, prompt: 'I wish you ___ blaming him.', options: ['will stop', 'stopping', 'would stop'], answer: 2, tip: 'Molestia por lo que hace otro: wish + would + verbo.', tags: T_WS },
  { id: 'b2-14-ws4', topic: WS, kind: 'fix', prompt: 'I would rather you to stay.', options: ['I would rather you stayed.', 'I would rather you staying.', 'I would rather you to stayed.'], answer: 0, tip: 'would rather + otra persona + pasado: you stayed.', tags: T_WS },
  {
    id: 'b2-14-ws5',
    topic: WS,
    kind: 'listen',
    audio: 'I wish I had trusted you. If only I had known.',
    voice: 'male',
    prompt: 'How does G feel?',
    options: ['He is happy with the past.', 'He regrets the past.', 'He wants to fight.'],
    answer: 1,
    tip: '"I wish I had trusted you. If only I had known": se arrepiente del pasado.',
    tags: T_WS,
  },
  { id: 'b2-14-ws6', topic: WS, prompt: "I'd rather ___ here with you.", options: ['to stay', 'stay', 'staying'], answer: 1, tip: 'Mismo sujeto: would rather + forma base (stay).', tags: T_WS },
]

const BOSS_MX = ['b2-14-boss-mx']
const BOSS_MIX = ['b2-14-boss-mix']
const BOSS_V = ['b2-14-boss-v']

export const B2_14_COMBAT_QUESTIONS: Question[] = [
  // G, fase 1: condicionales mixtos y wish (sus errores: if I would have known, I wouldn't lost)
  { id: 'b2-14-gm1', topic: MX, kind: 'fix', prompt: "If you had helped me, I wouldn't lost my voice.", options: ["If you had helped me, I wouldn't have lost my voice.", "If you had helped me, I won't have lost my voice.", "If you would help me, I wouldn't lost my voice."], answer: 0, tip: "Resultado en el pasado: wouldn't have + participio (lost).", tags: BOSS_MX },
  { id: 'b2-14-gm2', topic: MX, prompt: 'If I had known the truth, I ___ so angry now.', options: ["won't be", "wouldn't be", "wouldn't been"], answer: 1, tip: "Pasado → presente: wouldn't + verbo (be).", tags: BOSS_MX },
  { id: 'b2-14-gm3', topic: MX, prompt: 'If he ___ so proud, he would have asked for help.', options: ["weren't", "wouldn't be", "hasn't been"], answer: 0, tip: 'Presente → pasado: If + pasado (weren\'t).', tags: BOSS_MX },
  { id: 'b2-14-gm4', topic: WS, prompt: 'I wish I ___ so much time being angry.', options: ["hadn't spent", "wouldn't spend", "haven't spent"], answer: 0, tip: "Arrepentimiento: wish + hadn't + participio.", tags: BOSS_MX },
  {
    id: 'b2-14-gm5',
    topic: MX,
    kind: 'listen',
    audio: "If I hadn't been so angry, I wouldn't be so alone now.",
    voice: 'male',
    prompt: 'What does G say?',
    options: ['He is alone now because of his anger.', 'He is not alone now.', 'He was never angry.'],
    answer: 0,
    tip: '"If I hadn\'t been so angry, I wouldn\'t be so alone now": por su rabia, ahora está solo.',
    tags: BOSS_MX,
  },
  { id: 'b2-14-gm6', topic: WS, prompt: "I'd rather you ___ me the whole story.", options: ['tell', 'telling', 'told'], answer: 2, tip: 'would rather + otra persona + pasado: told.', tags: BOSS_MX },

  // G, fase 2: repaso de todo B2
  { id: 'b2-14-gr1', topic: 'past-modals-b2', kind: 'fix', prompt: 'You should have help me.', options: ['You should had helped me.', 'You should have helped me.', 'You should have helping me.'], answer: 1, tip: 'should have + participio: helped.', tags: BOSS_MIX },
  { id: 'b2-14-gr2', topic: 'reporting-ing-b2', prompt: 'He denied ___ the clock.', options: ['to take', 'take', 'taking'], answer: 2, tip: 'deny + -ing: denied taking.', tags: BOSS_MIX },
  { id: 'b2-14-gr3', topic: 'passive-report-b2', kind: 'fix', prompt: 'It is say that the clock keeps every echo.', options: ['It is said that the clock keeps every echo.', 'It says that the clock is kept every echo.', 'It is saying that the clock keeps every echo.'], answer: 0, tip: 'Pasiva de reporte: It is said that…', tags: BOSS_MIX },
  { id: 'b2-14-gr4', topic: 'fperfect-b2', prompt: 'By tomorrow, he ___ completely.', options: ['will have disappeared', 'will has disappeared', 'will have disappear'], answer: 0, tip: 'will have + participio.', tags: BOSS_MIX },
  { id: 'b2-14-gr5', topic: 'nd-relative-b2', prompt: 'Leo, ___ voice is perfect now, looked at the sea.', options: ['who', 'whose', 'which'], answer: 1, tip: 'whose = cuyo: Leo, whose voice…', tags: BOSS_MIX },
  { id: 'b2-14-gr6', topic: 'reporting-to-b2', prompt: 'G warned us not ___ silent.', options: ['to stay', 'staying', 'stay'], answer: 0, tip: 'warn someone not to + verbo.', tags: BOSS_MIX },

  // G, fase 3: a dos voces (el protagonista y Leo joven, en voz alta o escrito)
  { id: 'b2-14-gv1', topic: 'fire-b2', kind: 'order', prompt: 'Somos amigos.', options: ["We're", 'friends.'], answer: 0, tip: "We're friends.", tags: BOSS_V },
  { id: 'b2-14-gv2', topic: 'fire-b2', kind: 'order', prompt: 'No gracias a ti: a pesar de ti.', options: ['Not', 'because', 'of', 'you,', 'in', 'spite', 'of', 'you.'], answer: 0, tip: 'in spite of = a pesar de.', tags: BOSS_V },
  { id: 'b2-14-gv3', topic: 'fire-b2', kind: 'order', prompt: 'Gracias por la tarjeta.', options: ['Thank', 'you', 'for', 'the', 'card.'], answer: 0, tip: 'Thank you for + sustantivo.', tags: BOSS_V },
  { id: 'b2-14-gv4', topic: WS, kind: 'order', prompt: 'Ojalá hubiéramos hablado antes.', options: ['I', 'wish', 'we', 'had', 'talked', 'before.'], answer: 0, tip: 'wish + had + participio.', tags: BOSS_V },
  { id: 'b2-14-gv5', topic: 'fire-b2', kind: 'order', prompt: 'Ya no estás solo.', options: ["You're", 'not', 'alone', 'anymore.'], answer: 0, tip: "You're not alone anymore.", tags: BOSS_V },
  { id: 'b2-14-gv6', topic: 'fire-b2', kind: 'order', prompt: 'Es hora de dejarlo ir.', options: ["It's", 'time', 'to', 'let', 'go.'], answer: 0, tip: "It's time to + forma base: let go.", tags: BOSS_V },
]
