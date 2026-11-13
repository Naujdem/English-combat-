import type { Question } from '../game/types'

/**
 * B1-05 · Nothing Left (recuerdo 5). Bloque A:
 *  - Práctica de la página 12 del Cuaderno de L (tarea b1-05-used-to, tema used-to): tag b1-05-practice, lista fija.
 *  - Anuncios de empleo (tarea b1-05-jobs, components/FinePrint.tsx en modo anuncios, tema jobs-b1): tag b1-05-ads.
 *    Son de lectura; en el banco de repaso llevan audio con el anuncio para que se puedan responder sin el papel.
 * Regla: en las preguntas de elegir solo UNA opción es correcta.
 */
const UT = 'used-to' as const
const PRACTICE = ['b1-05-practice']
const JOBS = 'jobs-b1' as const
const ADS = ['b1-05-ads']
/** Bloque B: el banco (bank-phrasal) y la página 13 del cuaderno (get-used-to) */
const BP = 'bank-phrasal' as const
const BANK = ['b1-05-bank']
const GUT = 'get-used-to' as const
const PRACTICE2 = ['b1-05-practice2']
/** Bloque C: los 2 Eviction Notice (banco compartido) */
const NOTICE = ['b1-05-notice']
const UT2 = 'used-to' as const
/** Bloque D: The Collector, fase 1 (used-to) y fase 2 (get-used-to) */
const BOSS_U = ['b1-05-boss', 'b1-05-boss-u']
const BOSS_G = ['b1-05-boss', 'b1-05-boss-g']

/** Práctica del banco, en orden */
export const B1_05_BANK_IDS = ['b1-05-k1', 'b1-05-k2', 'b1-05-k3', 'b1-05-k4']

/** Práctica de la página 13 del cuaderno, en orden */
export const B1_05_PRACTICE2_IDS = ['b1-05-g1', 'b1-05-g2', 'b1-05-g3', 'b1-05-g4', 'b1-05-g5', 'b1-05-g6', 'b1-05-g7', 'b1-05-g8']

/** Práctica de la página 12 del cuaderno, en orden */
export const B1_05_PRACTICE_IDS = ['b1-05-p1', 'b1-05-p2', 'b1-05-p3', 'b1-05-p4', 'b1-05-p5', 'b1-05-p6', 'b1-05-p7', 'b1-05-p8']

/** Preguntas de los anuncios de empleo, en orden */
export const B1_05_AD_IDS = ['b1-05-a1', 'b1-05-a2', 'b1-05-a3', 'b1-05-a4', 'b1-05-a5', 'b1-05-a6']

const AD1 = 'Teacher wanted — Bright School. Two years of experience. Excellent spoken communication. 1,200 a month. Send your CV by Friday.'
const AD2 = 'Call centre assistant. Excellent spoken communication. Friendly voice. 900 a month. Call 555-0100 and ask for Mr. Dean.'
const AD3 = 'Shop assistant — Lumen Books. Excellent spoken communication. Weekends free. 800 a month. Come to the shop with your CV.'

export const B1_05_QUESTIONS: Question[] = [
  // ── Cuaderno · página 12 (used to) ──
  { id: 'b1-05-p1', topic: UT, kind: 'fix', prompt: 'When I was young, I use to sing in the car.', options: ['When I was young, I used to sing in the car.', 'When I was young, I used to singing in the car.', 'When I was young, I use to sang in the car.'], answer: 0, tip: 'Hábito de antes: used to + verbo base.', tags: PRACTICE },
  { id: 'b1-05-p2', topic: UT, kind: 'fix', prompt: 'She used to teaches five classes a day.', options: ['She used to teaching five classes a day.', 'She used to teach five classes a day.', 'She use to teach five classes a day.'], answer: 1, tip: 'used to + verbo base, sin -s ni -ing.', tags: PRACTICE },
  { id: 'b1-05-p3', topic: UT, prompt: 'When I was a teacher, I ___ wake up at six every day.', options: ['am used to', 'use to', 'used to'], answer: 2, tip: 'Hábito de antes: used to + verbo base.', tags: PRACTICE },
  { id: 'b1-05-p4', topic: UT, prompt: 'I ___ like coffee, but now I love it.', options: ["didn't used to", "didn't use to", "don't use to"], answer: 1, tip: "Negativa: didn't use to (sin d).", tags: PRACTICE },
  { id: 'b1-05-p5', topic: UT, prompt: '___ you use to sing in the car?', options: ['Did', 'Do', 'Were'], answer: 0, tip: 'Pregunta: Did + sujeto + use to.', tags: PRACTICE },
  { id: 'b1-05-p6', topic: UT, kind: 'order', prompt: 'Yo solía dar cinco clases al día.', options: ['I', 'used', 'to', 'teach', 'five', 'classes', 'a', 'day.'], answer: 0, tip: 'used to + verbo base.', tags: PRACTICE },
  { id: 'b1-05-p7', topic: UT, prompt: 'Yesterday I ___ a letter from the school.', options: ['used to get', 'use to get', 'got'], answer: 2, tip: 'Ayer es una vez, con fecha: pasado simple, no used to.', tags: PRACTICE },
  {
    id: 'b1-05-p8',
    topic: UT,
    kind: 'listen',
    audio: "I used to teach five classes a day. Now I don't have a job. I used to sing in the car, but now I don't feel like it.",
    voice: 'female',
    prompt: 'What did the speaker use to do in the car?',
    options: ['Sing.', 'Sleep.', 'Listen to the news.'],
    answer: 0,
    tip: 'I used to sing in the car.',
    tags: PRACTICE,
  },

  // ── Anuncios de empleo (jobs-b1) ──
  { id: 'b1-05-a1', topic: JOBS, kind: 'listen', audio: AD1, voice: 'female', prompt: 'In ad 1, what do you have to send?', options: ['Your passport.', 'Your CV.', 'A letter from your boss.'], answer: 1, tip: 'How to apply: Send your CV by Friday.', tags: ADS },
  { id: 'b1-05-a2', topic: JOBS, kind: 'listen', audio: AD1, voice: 'female', prompt: 'In ad 1, when is the deadline?', options: ['Monday.', 'There is no deadline.', 'Friday.'], answer: 2, tip: 'Send your CV by Friday.', tags: ADS },
  { id: 'b1-05-a3', topic: JOBS, kind: 'listen', audio: AD2, voice: 'female', prompt: 'In ad 2, how do you apply?', options: ['You send a CV.', 'You call 555-0100.', 'You go to the shop.'], answer: 1, tip: 'Call 555-0100 and ask for Mr. Dean.', tags: ADS },
  { id: 'b1-05-a4', topic: JOBS, kind: 'listen', audio: `${AD1} ${AD2} ${AD3}`, voice: 'female', prompt: 'Which requirement is in all three ads?', options: ['Excellent spoken communication.', 'Two years of experience.', 'Weekends free.'], answer: 0, tip: 'Los tres piden: excellent spoken communication.', tags: ADS },
  { id: 'b1-05-a5', topic: JOBS, kind: 'listen', audio: AD3, voice: 'female', prompt: 'In ad 3, what does the job pay?', options: ['900 a month.', '1,200 a month.', '800 a month.'], answer: 2, tip: 'Pay: 800 a month.', tags: ADS },
  { id: 'b1-05-a6', topic: JOBS, kind: 'listen', audio: AD2, voice: 'female', prompt: "L can't speak. Which job can he NOT do?", options: ['Call centre assistant.', 'Write a CV.', 'Read the ads.'], answer: 0, tip: 'Un call centre necesita comunicación oral.', tags: ADS },

  // ── Bloque B · el banco (bank-phrasal) ──
  { id: 'b1-05-k1', topic: BP, prompt: "I don't have savings, so I need a ___ from the bank.", options: ['saving', 'loan', 'owe'], answer: 1, tip: 'loan = préstamo.', tags: BANK },
  { id: 'b1-05-k2', topic: BP, prompt: 'I ___ the bank 500. I have to pay it back.', options: ['lend', 'own', 'owe'], answer: 2, tip: 'owe = deber (dinero).', tags: BANK },
  { id: 'b1-05-k3', topic: BP, kind: 'fix', prompt: 'You have to pay back it by June.', options: ['You have to pay back to it by June.', 'You have to pay it back by June.', 'You have to pay it to back by June.'], answer: 1, tip: 'Con pronombre, va en medio: pay it back.', tags: BANK },
  {
    id: 'b1-05-k4',
    topic: BP,
    kind: 'listen',
    audio: "I'm sorry. We can't give you a loan. You don't have a job, and you have debts.",
    voice: 'male',
    prompt: "Why can't he get the loan?",
    options: ['He has no job and he has debts.', 'He has no bank account.', 'He arrived late.'],
    answer: 0,
    tip: "You don't have a job, and you have debts.",
    tags: BANK,
  },

  // ── Bloque B · Cuaderno · página 13 (be / get used to) ──
  { id: 'b1-05-g1', topic: GUT, kind: 'fix', prompt: "I'm used to wake up early.", options: ["I'm used to woke up early.", "I'm use to waking up early.", "I'm used to waking up early."], answer: 2, tip: 'be used to + -ing.', tags: PRACTICE2 },
  { id: 'b1-05-g2', topic: GUT, kind: 'fix', prompt: 'She is getting used to live alone.', options: ['She is getting used to living alone.', 'She is getting used to lived alone.', 'She is getting use to living alone.'], answer: 0, tip: 'get used to + -ing.', tags: PRACTICE2 },
  { id: 'b1-05-g3', topic: GUT, prompt: "I ___ used to the silence now. It's normal for me.", options: ['do', 'am', 'will'], answer: 1, tip: 'Ya estás acostumbrado: be used to.', tags: PRACTICE2 },
  { id: 'b1-05-g4', topic: GUT, prompt: "It's my first week here. I'm ___ used to the noise.", options: ['having', 'doing', 'getting'], answer: 2, tip: 'Es un proceso: get used to.', tags: PRACTICE2 },
  { id: 'b1-05-g5', topic: GUT, prompt: 'When I was a child, I ___ play in the street.', options: ['am used to', 'used to', 'am getting used to'], answer: 1, tip: 'Hábito de antes: used to + verbo base.', tags: PRACTICE2 },
  { id: 'b1-05-g6', topic: GUT, prompt: 'Now I ___ living in a small flat.', options: ['am used to', 'used to', 'use to'], answer: 0, tip: 'Ya estás acostumbrado: be used to + -ing.', tags: PRACTICE2 },
  { id: 'b1-05-g7', topic: GUT, kind: 'order', prompt: 'Me estoy acostumbrando al silencio.', options: ['I', 'am', 'getting', 'used', 'to', 'the', 'silence.'], answer: 0, tip: 'get used to + sustantivo.', tags: PRACTICE2 },
  {
    id: 'b1-05-g8',
    topic: GUT,
    kind: 'listen',
    audio: "I'm not used to this city. But I'm getting used to the noise. I used to live in a small town.",
    voice: 'male',
    prompt: 'Where did the speaker use to live?',
    options: ['In this city.', 'On a boat.', 'In a small town.'],
    answer: 2,
    tip: 'I used to live in a small town.',
    tags: PRACTICE2,
  },

  // ── Bloque C · Eviction Notice (2 esbirros, banco compartido) ──
  { id: 'b1-05-e1', topic: UT2, kind: 'fix', prompt: 'I use to live here when I was a child.', options: ['I used to live here when I was a child.', 'I used to living here when I was a child.', 'I use to lived here when I was a child.'], answer: 0, tip: 'Hábito de antes: used to + verbo base.', tags: NOTICE },
  { id: 'b1-05-e2', topic: GUT, kind: 'fix', prompt: 'He is used to work at night.', options: ['He is used to worked at night.', 'He is used to working at night.', 'He is use to working at night.'], answer: 1, tip: 'be used to + -ing.', tags: NOTICE },
  { id: 'b1-05-e3', topic: UT2, kind: 'fix', prompt: 'Did you used to pay the rent here?', options: ['Did you used to paying the rent here?', 'Do you used to pay the rent here?', 'Did you use to pay the rent here?'], answer: 2, tip: 'Pregunta: Did + sujeto + use to (sin d).', tags: NOTICE },
  { id: 'b1-05-e4', topic: BP, prompt: 'You ___ 800. Pay it today.', options: ['own', 'owe', 'lend'], answer: 1, tip: 'owe = deber (dinero).', tags: NOTICE },
  { id: 'b1-05-e5', topic: BP, prompt: 'The landlord wants to ___ me from the flat.', options: ['evict', 'erase', 'envy'], answer: 0, tip: 'evict = desalojar.', tags: NOTICE },
  { id: 'b1-05-e6', topic: GUT, prompt: "I'm not ___ to living without a job yet.", options: ['use', 'using', 'used'], answer: 2, tip: 'be used to + -ing.', tags: NOTICE },
  { id: 'b1-05-e7', topic: BP, prompt: 'I have a big ___: I owe the bank 3,000.', options: ['debt', 'savings', 'deposit'], answer: 0, tip: 'debt = deuda.', tags: NOTICE },
  { id: 'b1-05-e8', topic: BP, kind: 'fix', prompt: 'Please pay back it today.', options: ['Please pay back to it today.', 'Please pay it back today.', 'Please pay it to back today.'], answer: 1, tip: 'Con pronombre, va en medio: pay it back.', tags: NOTICE },
  { id: 'b1-05-e9', topic: GUT, kind: 'order', prompt: 'Todavía no estoy acostumbrado al silencio.', options: ['I', 'am', 'not', 'used', 'to', 'the', 'silence', 'yet.'], answer: 0, tip: 'be used to + sustantivo.', tags: NOTICE },
  {
    id: 'b1-05-e10',
    topic: BP,
    kind: 'listen',
    audio: 'Dear tenant. You owe three months of rent. Please pay it back before Friday, or we will evict you.',
    voice: 'female',
    prompt: "What will happen if the tenant doesn't pay before Friday?",
    options: ['The tenant will get a loan.', 'The tenant will get more money.', 'The tenant will be evicted.'],
    answer: 2,
    tip: 'or we will evict you.',
    tags: NOTICE,
  },

  // ── Bloque D · The Collector, fase 1 (used to) ──
  { id: 'b1-05-bu1', topic: UT2, kind: 'fix', prompt: 'I use to collect coins when I was young.', options: ['I used to collecting coins when I was young.', 'I used to collect coins when I was young.', 'I use to collected coins when I was young.'], answer: 1, tip: 'Hábito de antes: used to + verbo base.', tags: BOSS_U },
  { id: 'b1-05-bu2', topic: UT2, kind: 'fix', prompt: "He didn't used to be so rude.", options: ["He didn't use to be so rude.", "He didn't used to being so rude.", 'He not used to be so rude.'], answer: 0, tip: "Negativa: didn't use to (sin d).", tags: BOSS_U },
  { id: 'b1-05-bu3', topic: UT2, prompt: 'My grandfather ___ tell us stories every night.', options: ['is used to', 'is getting used to', 'used to'], answer: 2, tip: 'Hábito de antes: used to + verbo base.', tags: BOSS_U },
  { id: 'b1-05-bu4', topic: UT2, prompt: '___ you use to play the guitar?', options: ['Did', 'Were', 'Are'], answer: 0, tip: 'Pregunta: Did + sujeto + use to.', tags: BOSS_U },
  { id: 'b1-05-bu5', topic: UT2, prompt: "I ___ eat meat, but now I'm vegetarian.", options: ['am used to', 'used to', 'use to'], answer: 1, tip: 'Hábito de antes: used to + verbo base.', tags: BOSS_U },
  { id: 'b1-05-bu6', topic: UT2, kind: 'order', prompt: '¿Solías cantar en el carro?', options: ['Did', 'you', 'use', 'to', 'sing', 'in', 'the', 'car?'], answer: 0, tip: 'Did + sujeto + use to + verbo base.', tags: BOSS_U },
  {
    id: 'b1-05-bu7',
    topic: UT2,
    kind: 'listen',
    audio: 'I used to be a banker. I used to have a big house and three cars. Now I only collect debts.',
    voice: 'male',
    prompt: 'What did he use to have?',
    options: ['A boat.', 'A dog.', 'A big house and three cars.'],
    answer: 2,
    tip: 'I used to have a big house and three cars.',
    tags: BOSS_U,
  },
  // ── Bloque D · The Collector, fase 2 (be / get used to) ──
  { id: 'b1-05-bg1', topic: GUT, kind: 'fix', prompt: "I'm used to get up late.", options: ["I'm used to got up late.", "I'm used to getting up late.", "I'm use to getting up late."], answer: 1, tip: 'be used to + -ing.', tags: BOSS_G },
  { id: 'b1-05-bg2', topic: GUT, kind: 'fix', prompt: 'She is getting used to wear glasses.', options: ['She is getting used to wearing glasses.', 'She is getting used to wore glasses.', 'She is getting use to wearing glasses.'], answer: 0, tip: 'get used to + -ing.', tags: BOSS_G },
  { id: 'b1-05-bg3', topic: GUT, prompt: 'He lives alone, so he ___ used to cooking for one.', options: ['does', 'will', 'is'], answer: 2, tip: 'be used to + -ing.', tags: BOSS_G },
  { id: 'b1-05-bg4', topic: GUT, prompt: "It's cold here, but I'm ___ used to it slowly.", options: ['getting', 'taking', 'doing'], answer: 0, tip: 'Es un proceso: get used to.', tags: BOSS_G },
  { id: 'b1-05-bg5', topic: GUT, prompt: 'I used to live in a flat, but now I ___ living in a house.', options: ['used to', 'am used to', 'use to'], answer: 1, tip: 'Ya estás acostumbrado: be used to + -ing.', tags: BOSS_G },
  { id: 'b1-05-bg6', topic: GUT, kind: 'order', prompt: 'Me estoy acostumbrando a vivir solo.', options: ['I', 'am', 'getting', 'used', 'to', 'living', 'alone.'], answer: 0, tip: 'get used to + -ing.', tags: BOSS_G },
  {
    id: 'b1-05-bg7',
    topic: GUT,
    kind: 'listen',
    audio: "I'm not used to this job yet. But I'm getting used to the work. And I'm used to the people now.",
    voice: 'female',
    prompt: 'What is the speaker already used to?',
    options: ['The work.', 'The city.', 'The people.'],
    answer: 2,
    tip: "I'm used to the people now.",
    tags: BOSS_G,
  },
]
