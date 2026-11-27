import type { Question } from '../game/types'

/**
 * B2-04 · Fake Profile (presente). Bloque 1 (la residencia y el banco, data/b2FakeProfile.ts): prácticas después de cada lección.
 *  - Seguridad en internet con Maya (tarea b2-04-security, tema online-safety-b2): b2-04-os1…os6.
 *  - Modales en pasado con Maya (tarea b2-04-modals, tema past-modals-b2): b2-04-pm1…pm6.
 *  - needn't have / didn't need to con Maya (tarea b2-04-neednt, tema neednt-b2): b2-04-nn1…nn6.
 *  - Reportar un fraude con Ricardo (tarea b2-04-bank, tema fraud-b2): b2-04-fr1…fr6.
 * Las opciones incorrectas están mal en cualquier contexto. La posición de la respuesta correcta varía a propósito.
 */
const OS = 'online-safety-b2' as const
const PM = 'past-modals-b2' as const
const NN = 'neednt-b2' as const
const FR = 'fraud-b2' as const
const T_OS = ['b2-04-security']
const T_PM = ['b2-04-modals']
const T_NN = ['b2-04-neednt']
const T_FR = ['b2-04-bank']

const ids = (p: string) => [1, 2, 3, 4, 5, 6].map((n) => `b2-04-${p}${n}`)
export const B2_04_SECURITY_IDS = ids('os')
export const B2_04_MODALS_IDS = ids('pm')
export const B2_04_NEEDNT_IDS = ids('nn')
export const B2_04_FRAUD_IDS = ids('fr')

export const B2_04_QUESTIONS: Question[] = [
  // Bloque 1 · Maya (seguridad en internet)
  { id: 'b2-04-os1', topic: OS, prompt: 'Never click links in ___ messages. They want your password.', options: ['privacy', 'phishing', 'profile'], answer: 1, tip: 'Mensajes falsos que roban datos = phishing.', tags: T_OS },
  { id: 'b2-04-os2', topic: OS, prompt: 'With two-factor ___, the app sends a code to your phone.', options: ['authentication', 'password', 'setting'], answer: 0, tip: 'two-factor authentication: contraseña + código.', tags: T_OS },
  { id: 'b2-04-os3', topic: OS, prompt: 'Someone hacked ___ my account last night.', options: ['in', 'into', 'on'], answer: 1, tip: 'hack into + cuenta o sistema.', tags: T_OS },
  { id: 'b2-04-os4', topic: OS, prompt: "Don't give ___ your address to strangers online.", options: ['up', 'out of', 'away'], answer: 2, tip: 'give away = regalar, revelar (datos personales).', tags: T_OS },
  { id: 'b2-04-os5', topic: OS, prompt: 'Change your privacy ___ so only friends can see your photos.', options: ['settings', 'passwords', 'scams'], answer: 0, tip: 'privacy settings = configuración de privacidad.', tags: T_OS },
  { id: 'b2-04-os6', topic: OS, kind: 'fix', prompt: 'We reported the fake profile and the app took off it.', options: ['We reported the fake profile and the app took it down.', 'We reported the fake profile and the app took down.', 'We reported the fake profile and the app took it off down.'], answer: 0, tip: 'take down = eliminar (un perfil, una página). Con pronombre: take it down.', tags: T_OS },

  // Bloque 1 · Maya (modales en pasado)
  { id: 'b2-04-pm1', topic: PM, prompt: 'You should have ___ a stronger password.', options: ['use', 'using', 'used'], answer: 2, tip: 'should have + participio: used.', tags: T_PM },
  { id: 'b2-04-pm2', topic: PM, prompt: "I'm not sure who did it. Someone ___ have copied the photo from the Herald.", options: ['might', 'must', 'should'], answer: 0, tip: 'No estás seguro → might have.', tags: T_PM },
  { id: 'b2-04-pm3', topic: PM, prompt: "The account didn't exist last week. It ___ have been created recently.", options: ['mustn\'t', 'must', 'needn\'t'], answer: 1, tip: 'Estás seguro por la evidencia → must have.', tags: T_PM },
  { id: 'b2-04-pm4', topic: PM, prompt: "You ___ have clicked that link. Now they have your password.", options: ['shouldn\'t', 'mustn\'t', 'couldn\'t'], answer: 0, tip: 'Crítica de algo que sí hiciste → shouldn\'t have.', tags: T_PM },
  { id: 'b2-04-pm5', topic: PM, kind: 'fix', prompt: 'You should of told me about the message.', options: ['You should told me about the message.', 'You should have told me about the message.', 'You should have tell me about the message.'], answer: 1, tip: 'Por escrito siempre should have + participio: should have told.', tags: T_PM },
  { id: 'b2-04-pm6', topic: PM, prompt: "Leo was at the cinema with us all night. He ___ have sent that message.", options: ['can\'t', 'should', 'might'], answer: 0, tip: 'Estás seguro de que no pasó → can\'t have.', tags: T_PM },

  // Bloque 1 · Maya (needn't have / didn't need to)
  { id: 'b2-04-nn1', topic: NN, prompt: 'The app was free. You ___ paid for it.', options: ["didn't need to", "needn't have", "needn't to have"], answer: 1, tip: 'Pagaste, pero no hacía falta → needn\'t have paid.', tags: T_NN },
  { id: 'b2-04-nn2', topic: NN, prompt: "My app was free, so I ___ pay anything.", options: ["needn't have", "didn't need to", "needn't to"], answer: 1, tip: 'No hacía falta y no lo hiciste → didn\'t need to + verbo base.', tags: T_NN },
  { id: 'b2-04-nn3', topic: NN, prompt: "We needn't have ___. The bank was still open.", options: ['hurried', 'hurry', 'to hurry'], answer: 0, tip: 'needn\'t have + participio: hurried.', tags: T_NN },
  { id: 'b2-04-nn4', topic: NN, kind: 'fix', prompt: "She needn't to have paid. It was free.", options: ["She needn't have to pay. It was free.", "She needn't paid. It was free.", "She needn't have paid. It was free."], answer: 2, tip: 'Sin "to": needn\'t have + participio.', tags: T_NN },
  { id: 'b2-04-nn5', topic: NN, prompt: "I ___ change my password, so I didn't. Two-factor was already on.", options: ["didn't need to", "needn't have", "mustn't"], answer: 0, tip: 'No hacía falta y no lo hiciste → didn\'t need to.', tags: T_NN },
  { id: 'b2-04-nn6', topic: NN, prompt: "He bought a new phone after the hack. He needn't have ___: the old one was fine.", options: ['bought one', 'buy one', 'to buy one'], answer: 0, tip: 'needn\'t have + participio: bought.', tags: T_NN },

  // Bloque 1 · Ricardo (reportar un fraude)
  { id: 'b2-04-fr1', topic: FR, prompt: "I'd like to ___ a payment I didn't make.", options: ['report', 'refund', 'return'], answer: 0, tip: 'Avisar al banco de un problema = report.', tags: T_FR },
  { id: 'b2-04-fr2', topic: FR, prompt: 'Could you look ___ it, please?', options: ['at', 'into', 'for'], answer: 1, tip: 'look into = investigar.', tags: T_FR },
  { id: 'b2-04-fr3', topic: FR, prompt: "I'm ___ that someone has used my account.", options: ['concern', 'concerning', 'concerned'], answer: 2, tip: 'I\'m concerned that… = me preocupa que…', tags: T_FR },
  { id: 'b2-04-fr4', topic: FR, prompt: 'A payment without your permission is an ___ payment.', options: ['unauthorised', 'unpaid', 'unhappy'], answer: 0, tip: 'unauthorised = no autorizado.', tags: T_FR },
  { id: 'b2-04-fr5', topic: FR, prompt: 'Would it be possible to get a ___? I want my money back.', options: ['receipt', 'refund', 'report'], answer: 1, tip: 'refund = reembolso (te devuelven el dinero).', tags: T_FR },
  { id: 'b2-04-fr6', topic: FR, prompt: "I'd be grateful if you ___ look into it.", options: ['have', 'could', 'are'], answer: 1, tip: 'Fórmula cortés: I\'d be grateful if you could…', tags: T_FR },
]

const BOT = ['b2-04-bot']
const BOSS_PM = ['b2-04-boss-pm']
const BOSS_OS = ['b2-04-boss-os']

/** Bloque 2 · combate: Phishing Bots (b2-04-bot) y The Catfish (fase 1: b2-04-boss-pm · fase 2: b2-04-boss-os) */
export const B2_04_COMBAT_QUESTIONS: Question[] = [
  // Phishing Bots (esbirros)
  { id: 'b2-04-bt1', topic: PM, kind: 'fix', prompt: 'You should have check the link.', options: ['You should have checked the link.', 'You should checked the link.', 'You should have checking the link.'], answer: 0, tip: 'should have + participio: checked.', tags: BOT },
  { id: 'b2-04-bt2', topic: PM, kind: 'fix', prompt: 'He must has deleted the message.', options: ['He must deleted the message.', 'He must have deleted the message.', 'He must had deleted the message.'], answer: 1, tip: 'Después de un modal siempre have (nunca has ni had).', tags: BOT },
  { id: 'b2-04-bt3', topic: NN, kind: 'fix', prompt: "She needn't to have paid. It was free.", options: ["She needn't have paid. It was free.", "She needn't have pay. It was free.", "She didn't need to paid. It was free."], answer: 0, tip: "needn't have + participio, sin to.", tags: BOT },
  { id: 'b2-04-bt4', topic: PM, prompt: "I can't find my wallet. I ___ have left it at the bank.", options: ['did', 'might', 'was'], answer: 1, tip: 'No estás seguro → might have.', tags: BOT },
  { id: 'b2-04-bt5', topic: NN, prompt: "The shop was empty, so we ___ queue.", options: ["didn't need to", "needn't have", "needn't to"], answer: 0, tip: 'No hacía falta y no lo hicieron → didn\'t need to + verbo base.', tags: BOT },
  { id: 'b2-04-bt6', topic: PM, prompt: "You ___ have told me about the message. I could have helped!", options: ['should', 'can\'t', 'must'], answer: 0, tip: 'Crítica: algo que no hiciste y era lo correcto → should have.', tags: BOT },

  // The Catfish, fase 1 (could / might / should have)
  { id: 'b2-04-cf1', topic: PM, kind: 'fix', prompt: 'You should of changed your password.', options: ['You should have change your password.', 'You should have changed your password.', 'You should changed your password.'], answer: 1, tip: 'Por escrito: should have + participio. Nunca "should of".', tags: BOSS_PM },
  { id: 'b2-04-cf2', topic: PM, kind: 'fix', prompt: 'It might have be him.', options: ['It might have been him.', 'It might be have him.', 'It might has been him.'], answer: 0, tip: 'might have + participio: been.', tags: BOSS_PM },
  { id: 'b2-04-cf3', topic: PM, prompt: "We don't know who took the photo. It ___ have been anyone.", options: ['should', 'could', 'needn\'t'], answer: 1, tip: 'Posibilidad abierta → could have.', tags: BOSS_PM },
  { id: 'b2-04-cf4', topic: PM, prompt: "You ___ have shared your password with a stranger. That was a big mistake.", options: ['shouldn\'t', 'might', 'must'], answer: 0, tip: 'Crítica de algo que sí hiciste → shouldn\'t have.', tags: BOSS_PM },
  { id: 'b2-04-cf5', topic: PM, prompt: 'Why didn\'t you call me? You could have ___ me!', options: ['tell', 'told', 'telling'], answer: 1, tip: 'could have + participio: told.', tags: BOSS_PM },
  { id: 'b2-04-cf6', topic: PM, prompt: "The message came from Leo's number, but he was asleep. Someone ___ have used his phone.", options: ['must', 'shouldn\'t', 'can\'t'], answer: 0, tip: 'Es la única explicación lógica → must have.', tags: BOSS_PM },

  // The Catfish, fase 2 (needn't have / didn't need to y seguridad; escuchas de Ricardo)
  { id: 'b2-04-cs1', topic: NN, kind: 'fix', prompt: "I needn't have to pay for the app.", options: ["I needn't have paid for the app.", "I needn't have pay for the app.", "I didn't need have paid for the app."], answer: 0, tip: "needn't have + participio (paid).", tags: BOSS_OS },
  { id: 'b2-04-cs2', topic: OS, kind: 'fix', prompt: 'Turn on your two-factor password.', options: ['Turn on your two-factor privacy.', 'Turn on your two-factor authentication.', 'Turn on your two-factor phishing.'], answer: 1, tip: 'Se llama two-factor authentication.', tags: BOSS_OS },
  { id: 'b2-04-cs3', topic: NN, prompt: "You ___ bought a new phone. The old one only needed a new password.", options: ["needn't have", "didn't need", "needn't"], answer: 0, tip: 'Lo compraste, pero no hacía falta → needn\'t have bought.', tags: BOSS_OS },
  { id: 'b2-04-cs4', topic: OS, prompt: 'Someone tried to hack ___ the bank\'s system.', options: ['into', 'up', 'away'], answer: 0, tip: 'hack into = entrar sin permiso.', tags: BOSS_OS },
  {
    id: 'b2-04-cs5',
    topic: FR,
    kind: 'listen',
    audio: "We've looked into the payment. It was unauthorised, so you will get a full refund in five working days.",
    voice: 'male',
    prompt: 'When will the money come back?',
    options: ['Tomorrow.', 'In five working days.', 'Never.'],
    answer: 1,
    tip: 'You will get a full refund in five working days.',
    tags: BOSS_OS,
  },
  {
    id: 'b2-04-cs6',
    topic: FR,
    kind: 'listen',
    audio: 'The bank will never ask for your password by message. If you get a message like that, report it and delete it.',
    voice: 'male',
    prompt: 'What should you do with a message that asks for your password?',
    options: ['Answer it quickly.', 'Send your password.', 'Report it and delete it.'],
    answer: 2,
    tip: 'If you get a message like that, report it and delete it.',
    tags: BOSS_OS,
  },
]
