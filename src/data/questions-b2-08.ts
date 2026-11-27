import type { Question } from '../game/types'

/**
 * B2-08 · Pitch (Ventana 2064). Bloque 1 (las oficinas de marketing de Vocalis, data/b2Pitch.ts): prácticas después de cada lección.
 *  - La propuesta de campaña (tarea b2-08-compare, tema compare-b2): b2-08-cp1…cp6.
 *  - La encuesta de mercado (tarea b2-08-survey, tema uncount-b2): b2-08-un1…un6.
 *  - Bloque 2 · el manual (tarea b2-08-perks, tema perks-b2): b2-08-pk1…pk6 · los correos (tarea b2-08-acronyms,
 *    tema acronyms-b2): b2-08-ac1…ac6. Combate: B2_08_COMBAT_QUESTIONS.
 * Las opciones incorrectas están mal en cualquier contexto. La posición de la respuesta correcta varía a propósito.
 */
const CP = 'compare-b2' as const
const UN = 'uncount-b2' as const
const T_CP = ['b2-08-compare']
const T_UN = ['b2-08-survey']
const PK = 'perks-b2' as const
const AC = 'acronyms-b2' as const
const T_PK = ['b2-08-perks']
const T_AC = ['b2-08-acronyms']

const ids = (p: string) => [1, 2, 3, 4, 5, 6].map((n) => `b2-08-${p}${n}`)
export const B2_08_COMPARE_IDS = ids('cp')
export const B2_08_SURVEY_IDS = ids('un')
export const B2_08_PERKS_IDS = ids('pk')
export const B2_08_ACRONYMS_IDS = ids('ac')

export const B2_08_QUESTIONS: Question[] = [
  // Bloque 1 · La propuesta de campaña (comparaciones precisas y tipos de marketing)
  { id: 'b2-08-cp1', topic: CP, prompt: 'Restore is ___ more effective than the old treatment. It is a huge difference.', options: ['far', 'very', 'too'], answer: 0, tip: 'Diferencia grande: far / much + comparativo. Nunca "very more".', tags: T_CP },
  { id: 'b2-08-cp2', topic: CP, prompt: 'It is only two dollars cheaper. It is ___ cheaper than the competition.', options: ['far', 'slightly', 'nowhere'], answer: 1, tip: 'Diferencia pequeña: slightly / a bit + comparativo.', tags: T_CP },
  { id: 'b2-08-cp3', topic: CP, prompt: 'Other treatments are nowhere near ___ fast as Restore.', options: ['so much', 'than', 'as'], answer: 2, tip: 'nowhere near as + adjetivo + as.', tags: T_CP },
  { id: 'b2-08-cp4', topic: CP, prompt: 'The new device works ___ the old one.', options: ['twice faster than', 'twice as fast as', 'twice fast as'], answer: 1, tip: 'twice / three times + as + adjetivo + as.', tags: T_CP },
  { id: 'b2-08-cp5', topic: CP, kind: 'fix', prompt: "It's much more better than therapy.", options: ["It's very more better than therapy.", "It's much more good than therapy.", "It's much better than therapy."], answer: 2, tip: 'better ya es comparativo: much better (sin more).', tags: T_CP },
  { id: 'b2-08-cp6', topic: CP, prompt: 'Nobody saw an ad. People heard about it from their friends. That is ___.', options: ['word of mouth', 'targeted ads', 'a slogan'], answer: 0, tip: 'Word of mouth: la gente se lo cuenta a otra gente.', tags: T_CP },

  // Bloque 1 · La encuesta de mercado (contables e incontables)
  { id: 'b2-08-un1', topic: UN, prompt: 'Can you give me ___ about the launch?', options: ['an information', 'some information', 'informations'], answer: 1, tip: 'information es incontable: some information, nunca "an information".', tags: T_UN },
  { id: 'b2-08-un2', topic: UN, prompt: 'My manager gave me a good piece of ___.', options: ['advice', 'advices', 'advise'], answer: 0, tip: 'a piece of advice (advise es el verbo).', tags: T_UN },
  { id: 'b2-08-un3', topic: UN, prompt: 'The news ___ good: sales are going up.', options: ['are', 'is', 'were being'], answer: 1, tip: 'news es incontable y va en singular: the news is.', tags: T_UN },
  { id: 'b2-08-un4', topic: UN, prompt: 'We need new ___ for the stage.', options: ['an equipment', 'equipments', 'equipment'], answer: 2, tip: 'equipment es incontable: sin a/an y sin -s.', tags: T_UN },
  { id: 'b2-08-un5', topic: UN, kind: 'fix', prompt: 'We got a lot of feedbacks from the survey.', options: ['We got a lot of feedback from the survey.', 'We got many feedbacks from the survey.', 'We got a feedback from the survey.'], answer: 0, tip: 'feedback es incontable: a lot of feedback.', tags: T_UN },
  { id: 'b2-08-un6', topic: UN, prompt: 'How ___ research did they do before the launch?', options: ['many', 'much', 'a lot'], answer: 1, tip: 'Con incontables: how much (how many es para contables).', tags: T_UN },

  // Bloque 2 · El manual del empleado (beneficios, permisos y phrasal verbs del trabajo)
  { id: 'b2-08-pk1', topic: PK, prompt: 'The company pays for your doctor and hospital. It gives you health ___.', options: ['leave', 'insurance', 'bonus'], answer: 1, tip: 'health insurance = seguro médico.', tags: T_PK },
  { id: 'b2-08-pk2', topic: PK, prompt: 'She is having a baby, so she will take six months of ___.', options: ['parental leave', 'sick leave', 'flexible hours'], answer: 0, tip: 'Por un bebé: parental leave.', tags: T_PK },
  { id: 'b2-08-pk3', topic: PK, prompt: 'You can start at 7 or at 10. We have ___.', options: ['a notice period', 'a bonus', 'flexible hours'], answer: 2, tip: 'Elegir la hora: flexible hours.', tags: T_PK },
  { id: 'b2-08-pk4', topic: PK, prompt: "I don't agree with the company, so I'm going to hand ___ my notice.", options: ['out', 'in', 'up'], answer: 1, tip: 'hand in your notice = entregar la renuncia.', tags: T_PK },
  { id: 'b2-08-pk5', topic: PK, kind: 'fix', prompt: 'I signed for the new health plan yesterday.', options: ['I signed up for the new health plan yesterday.', 'I signed up the new health plan for yesterday.', 'I signed in for the new health plan yesterday.'], answer: 0, tip: 'Inscribirse en algo: sign up for.', tags: T_PK },
  { id: 'b2-08-pk6', topic: PK, prompt: 'They tried to ___ the problem with the donors, but the truth came out.', options: ['roll out', 'cover up', 'sign up'], answer: 1, tip: 'Esconder un problema: cover up.', tags: T_PK },

  // Bloque 2 · Los correos de Chloe (acrónimos y by / until)
  { id: 'b2-08-ac1', topic: AC, prompt: 'We need the slides now. Please send them ___.', options: ['ASAP', 'RSVP', 'BTW'], answer: 0, tip: 'Lo antes posible: ASAP.', tags: T_AC },
  { id: 'b2-08-ac2', topic: AC, prompt: '___, the meeting room is booked. Just so you know.', options: ['ETA', 'FYI', 'TBC'], answer: 1, tip: 'Para que sepas: FYI (for your information).', tags: T_AC },
  { id: 'b2-08-ac3', topic: AC, prompt: 'The taxi is coming. What is its ___?', options: ['EOD', 'IMO', 'ETA'], answer: 2, tip: 'Hora estimada de llegada: ETA.', tags: T_AC },
  { id: 'b2-08-ac4', topic: AC, kind: 'fix', prompt: 'We need the report until EOD.', options: ['We need the report by EOD.', 'We need the report until the EOD of.', 'We need the report since EOD.'], answer: 0, tip: 'Fecha límite: by EOD.', tags: T_AC },
  { id: 'b2-08-ac5', topic: AC, prompt: 'You are invited to the launch party. Please ___ by Friday.', options: ['FYI', 'RSVP', 'ASAP'], answer: 1, tip: 'Responder a una invitación: RSVP.', tags: T_AC },
  { id: 'b2-08-ac6', topic: AC, prompt: 'The date of the launch is not confirmed. It is ___.', options: ['TBC', 'EOD', 'ETA'], answer: 0, tip: 'Por confirmar: TBC (to be confirmed).', tags: T_AC },
]

const BOT = ['b2-08-bot']
const BOSS_CP = ['b2-08-boss-cp']
const BOSS_UN = ['b2-08-boss-un']

/** Bloque 2: Promo Bots (b2-08-pb1…pb6) y The Salesman (fase 1: b2-08-sc1…sc6 · fase 2: b2-08-su1…su6) */
export const B2_08_COMBAT_QUESTIONS: Question[] = [
  // Bloque 2 · Promo Bots (esbirros)
  { id: 'b2-08-pb1', topic: CP, kind: 'fix', prompt: "It's much more better than the old one.", options: ["It's much better than the old one.", "It's much more good than the old one.", "It's more much better than the old one."], answer: 0, tip: 'better ya es comparativo: much better.', tags: BOT },
  { id: 'b2-08-pb2', topic: UN, kind: 'fix', prompt: 'Can you give me an information?', options: ['Can you give me informations?', 'Can you give me some information?', 'Can you give me a informations?'], answer: 1, tip: 'information es incontable: some information.', tags: BOT },
  { id: 'b2-08-pb3', topic: UN, kind: 'fix', prompt: 'I need some advices.', options: ['I need an advice.', 'I need some advises.', 'I need some advice.'], answer: 2, tip: 'advice es incontable: some advice.', tags: BOT },
  { id: 'b2-08-pb4', topic: CP, prompt: 'It is ___ cheaper than the competition: only one dollar less.', options: ['far', 'a bit', 'very'], answer: 1, tip: 'Diferencia pequeña: a bit / slightly.', tags: BOT },
  { id: 'b2-08-pb5', topic: CP, prompt: 'Restore is three times ___ expensive as the old treatment.', options: ['more', 'as', 'so'], answer: 1, tip: 'three times as + adjetivo + as.', tags: BOT },
  { id: 'b2-08-pb6', topic: UN, prompt: 'How ___ customers signed up for Restore?', options: ['much', 'many', 'a lot'], answer: 1, tip: 'customers es contable: how many.', tags: BOT },

  // Bloque 2 · The Salesman, fase 1 (comparaciones precisas, con escucha de la presentación)
  { id: 'b2-08-sc1', topic: CP, kind: 'fix', prompt: "It's nowhere near good as the old one.", options: ["It's nowhere near as good as the old one.", "It's nowhere near so good than the old one.", "It's nowhere as near good as the old one."], answer: 0, tip: 'nowhere near as + adjetivo + as.', tags: BOSS_CP },
  { id: 'b2-08-sc2', topic: CP, kind: 'fix', prompt: 'Restore works twice faster than therapy.', options: ['Restore works twice as faster than therapy.', 'Restore works twice as fast as therapy.', 'Restore works two times fast as therapy.'], answer: 1, tip: 'twice as + adjetivo + as.', tags: BOSS_CP },
  { id: 'b2-08-sc3', topic: CP, prompt: 'The new version is just ___ safe as the old one.', options: ['so', 'than', 'as'], answer: 2, tip: 'just as + adjetivo + as = igual de.', tags: BOSS_CP },
  { id: 'b2-08-sc4', topic: CP, kind: 'order', prompt: 'Es mucho más fácil de lo que crees.', options: ['It', 'is', 'far', 'easier', 'than', 'you', 'think.'], answer: 0, tip: 'far + comparativo + than.', tags: BOSS_CP },
  { id: 'b2-08-sc5', topic: CP, kind: 'order', prompt: 'Los otros tratamientos no son ni de lejos tan rápidos.', options: ['Other', 'treatments', 'are', 'nowhere', 'near', 'as', 'fast.'], answer: 0, tip: 'nowhere near as + adjetivo.', tags: BOSS_CP },
  {
    id: 'b2-08-sc6',
    topic: CP,
    kind: 'listen',
    audio: 'Restore is far more effective than therapy, and it is only slightly more expensive. Other treatments are nowhere near as fast.',
    voice: 'male',
    prompt: 'What does the hologram say about the price of Restore?',
    options: ['It is much cheaper than therapy.', 'It is a little more expensive.', 'It is twice as expensive.'],
    answer: 1,
    tip: '"Only slightly more expensive" = solo un poco más caro.',
    tags: BOSS_CP,
  },

  // Bloque 2 · The Salesman, fase 2 (incontables, beneficios y acrónimos)
  { id: 'b2-08-su1', topic: UN, kind: 'fix', prompt: 'The equipments are new.', options: ['The equipments is new.', 'The equipment is new.', 'An equipment is new.'], answer: 1, tip: 'equipment es incontable: sin -s y con is.', tags: BOSS_UN },
  { id: 'b2-08-su2', topic: AC, kind: 'fix', prompt: 'We need the report until EOD.', options: ['We need the report by EOD.', 'We need the report on until EOD.', 'We need the report at EOD until.'], answer: 0, tip: 'Fecha límite: by.', tags: BOSS_UN },
  { id: 'b2-08-su3', topic: UN, prompt: 'The ___ about the donors is bad.', options: ['news', 'newses', 'a news'], answer: 0, tip: 'news es incontable y va con is.', tags: BOSS_UN },
  { id: 'b2-08-su4', topic: PK, prompt: "Mensah doesn't want to work here anymore. He's going to ___.", options: ['sign up', 'resign', 'roll out'], answer: 1, tip: 'Dejar el trabajo: resign.', tags: BOSS_UN },
  { id: 'b2-08-su5', topic: AC, prompt: '___, I think the slogan is a lie. (in my opinion)', options: ['IMO', 'ETA', 'RSVP'], answer: 0, tip: 'En mi opinión: IMO.', tags: BOSS_UN },
  {
    id: 'b2-08-su6',
    topic: PK,
    kind: 'listen',
    audio: 'All our staff get health insurance and flexible hours. And with Restore, you will never need sick leave again!',
    voice: 'male',
    prompt: 'What does the hologram promise?',
    options: ['A big bonus for every customer.', 'That you will never need sick leave again.', 'Free parental leave for everybody.'],
    answer: 1,
    tip: '"You will never need sick leave again" = nunca más necesitarás incapacidad.',
    tags: BOSS_UN,
  },
]
