import type { ExamChoice, ExamSpeak } from './b1Exam'
import { wordCount } from './b1Exam'

/**
 * Examen final de B2 (misión 14, bloque 3; components/B1Exam.tsx con content={B2_EXAM}). Cuatro partes, con los sistemas de B1:
 *  1. Reading: el artículo de Manuel "The Night the Port Spoke" (unas 250 palabras) con 6 preguntas.
 *  2. Listening: un boletín del Herald y una conversación, leídos con la voz del juego, con 6 preguntas.
 *  3. Writing: un texto de opinión de 120 a 150 palabras. Se revisan requisitos (longitud, 4 conectores con uno de contraste,
 *     un condicional mixto, un verbo declarativo con su patrón y una relativa explicativa o una pasiva de reporte), no la calidad.
 *  4. Speaking: 3 preguntas (describir, opinar e imaginar), con palabras clave; sin reconocimiento de voz, se escriben.
 * Reading y listening se aprueban con 5 de 6 (el mismo criterio de B1: más o menos el 80 %); si no, se repite esa parte.
 */
export const B2_EXAM_PASS = 5

const READING = {
  title: 'The Night the Port Spoke',
  by: "by Manuel, The Lumen Bay Herald",
  paragraphs: [
    'For weeks, Lumen Bay had been living with the "voice blackouts". People who had been speaking normally suddenly lost their voices for a few seconds, and nobody could explain why. It was said that the problem started at the old harbour, which had been closed twice by the police.',
    'Last night, at sunset, four young people from the exchange programme walked to the end of the pier. According to a fisherman who was there, a figure in a hood was waiting for them. The sun was going down, and the harbour was almost empty. "I could see the sea through his body," he told the Herald. "I thought I must have been dreaming."',
    'The fisherman admitted being too scared to move closer. However, he heard the voices clearly. One of the students and an old man were arguing about a fire that, he said, "hadn\'t happened yet". Then two of the students spoke together, loudly, and the figure began to smile.',
    'A few minutes later, the hooded man disappeared. Since then, not a single blackout has been reported. Doctors, who had been studying the cases for a month, have refused to comment. Local shops say that their customers are chatting and laughing again.',
    'When the Herald asked the students what had happened, one of them only said: "If we hadn\'t spoken up, he would still be angry." Whatever the truth is, the port is quiet tonight, and people are talking again.',
  ],
  questions: [
    { q: 'What were the "voice blackouts"?', options: ['People lost their voices for a few seconds.', 'The lights of the port went off.', 'The radio stopped working.'], answer: 0, tip: 'El artículo dice: "suddenly lost their voices for a few seconds".' },
    { q: 'What did the fisherman say about the figure?', options: ['It was very tall.', 'He could see the sea through its body.', 'It was carrying a clock.'], answer: 1, tip: 'El fisherman dice: "I could see the sea through his body".' },
    { q: 'Why didn\'t the fisherman move closer?', options: ['He was working.', 'He couldn\'t hear anything.', 'He was too scared.'], answer: 2, tip: 'El artículo dice: "admitted being too scared to move closer".' },
    { q: 'What were the student and the old man arguing about?', options: ['A fire that hadn\'t happened yet.', 'The price of a boat.', 'A lost card.'], answer: 0, tip: 'El artículo dice: "arguing about a fire that hadn\'t happened yet".' },
    { q: 'What has happened since that night?', options: ['There have been more blackouts.', 'No blackouts have been reported.', 'The port has been closed again.'], answer: 1, tip: 'El artículo dice: "not a single blackout has been reported".' },
    { q: 'What did one of the students say?', options: ['"We never saw the man."', '"The doctors helped us."', '"If we hadn\'t spoken up, he would still be angry."'], answer: 2, tip: 'Es un condicional mixto: si no hubieran hablado, él todavía estaría enojado.' },
  ] as ExamChoice[],
}

const LISTENING = {
  title: 'The Herald Bulletin + a conversation',
  audio:
    'This is the Lumen Bay Herald evening bulletin. The old harbour, which had been closed since Monday, reopened this afternoon. ' +
    'The council has announced that the old building on Harbour Street will not be demolished; instead, it will be turned into a community centre with two fire exits on every floor. ' +
    'And finally, the exchange programme will hold its farewell party on Saturday at the residence. ' +
    'Now, a short conversation recorded at the party preparations. ' +
    'Maya: Are you coming on Saturday? You\'d better not be late this time. ' +
    'Leo: I\'ll be there. I wish I had more time in Lumen Bay, though. If I hadn\'t come here, I wouldn\'t know you all. ' +
    'Maya: I\'d rather you didn\'t make me cry before the party, Leo.',
  questions: [
    { q: 'When did the harbour reopen?', options: ['This afternoon.', 'On Monday.', 'On Saturday.'], answer: 0, tip: 'Se oye: "reopened this afternoon".' },
    { q: 'What will happen to the old building?', options: ['It will be demolished.', 'It will become a community centre.', 'It will be sold.'], answer: 1, tip: 'Se oye: "it will be turned into a community centre".' },
    { q: 'How many fire exits will each floor have?', options: ['One.', 'Three.', 'Two.'], answer: 2, tip: 'Se oye: "two fire exits on every floor".' },
    { q: 'Where is the farewell party?', options: ['At the residence.', 'At the harbour.', 'At the Herald.'], answer: 0, tip: 'Se oye: "its farewell party on Saturday at the residence".' },
    { q: 'What does Leo wish?', options: ['That he had stayed at home.', 'That he had more time in Lumen Bay.', 'That the party were on Sunday.'], answer: 1, tip: 'Se oye: "I wish I had more time in Lumen Bay".' },
    { q: 'What would Maya rather?', options: ['That Leo came early.', 'That Leo sang at the party.', "That Leo didn't make her cry."], answer: 2, tip: 'Se oye: "I\'d rather you didn\'t make me cry".' },
  ] as ExamChoice[],
}

/** Conectores que cuentan para el writing (cada uno una sola vez). Los de contraste, aparte */
const CONTRAST = ['although', 'however', 'whereas', 'despite', 'in spite of', 'even though', 'on the other hand', 'but', 'while', 'nevertheless']
const CONNECTORS = [...CONTRAST, 'because', 'so', 'therefore', 'as a result', 'first', 'firstly', 'secondly', 'finally', 'in my opinion', 'for example', 'for instance', 'moreover', 'also', 'in addition', 'besides', 'unless', 'provided that', 'as long as', 'in conclusion', 'to sum up', 'when', 'if']

const WRITING = {
  ask: 'Is it always right to speak up? Write your opinion.',
  es: '¿Siempre está bien alzar la voz? Escribe tu opinión.',
  min: 120,
  max: 150,
  model:
    'In my opinion, it is usually right to speak up, although it is not always easy. Many people stay silent because they are afraid, ' +
    'and it is said that fear is the main reason why people do not help others. However, silence can hurt. ' +
    'A friend of mine, who saw a classmate being bullied, admitted feeling guilty for years because she had said nothing. ' +
    'If she had spoken up then, she would feel much better now. On the other hand, speaking up does not mean shouting at everyone. ' +
    'Sometimes it is better to wait, think and choose the right moment. For example, my teacher advised us to talk calmly instead of arguing. ' +
    'In conclusion, I believe that we should use our voice, especially when someone needs help, but we should use it with respect.',
}

const has = (list: string[], text: string) => {
  const t = ` ${text.toLowerCase().replace(/[^a-z' ]+/g, ' ')} `
  return list.filter((c) => t.includes(` ${c} `))
}
const MIXED = /\bif\b[^.!?]*\bhad(n't)?\b[^.!?]*\b(would|wouldn't|'d|could|might)\s+(?!have\b)(not\s+)?\w+|\bif\b[^.!?]*\b(were|weren't|was|wasn't|did|didn't|knew|had|\w+ed)\b[^.!?]*\b(would|wouldn't|could|might)(\s+not)?\s+have\b/i
const REPORTING = /\b(warned|told|asked|advised|persuaded|encouraged|reminded|urged|invited)\s+\w+\s+(not\s+)?to\s+\w+|\b(denied|admitted|suggested|recommended|regretted|considered)\s+(not\s+)?\w+ing\b|\b(accused|blamed|thanked)\s+\w+\s+(of|for)\s+\w+ing\b|\b(apologi[sz]ed|insisted)\s+(for|on)\s+\w+ing\b|\b(promised|refused|agreed|offered|threatened|decided)\s+(not\s+)?to\s+\w+/i
const RELATIVE_OR_PASSIVE = /,\s*(who|which|whose|where)\b|\b(is|are|was|were)\s+(said|believed|thought|reported|known|expected)\s+(that|to)\b|\bit\s+(is|was)\s+(said|believed|thought|reported|known|expected)\b/i

/** Requisitos del writing de B2: cada uno con su texto y si se cumple. No se revisa la calidad del texto */
export function b2WritingChecks(text: string): { label: string; ok: boolean }[] {
  const n = wordCount(text)
  const found = has(CONNECTORS, text)
  const contrast = has(CONTRAST, text)
  return [
    { label: `Entre ${WRITING.min} y ${WRITING.max} palabras (llevas ${n})`, ok: n >= WRITING.min && n <= WRITING.max },
    { label: `Al menos 4 conectores distintos (llevas ${found.length}${found.length ? `: ${found.join(', ')}` : ''})`, ok: found.length >= 4 },
    { label: 'Uno de contraste: although, however, whereas, despite, on the other hand…', ok: contrast.length >= 1 },
    { label: 'Un condicional mixto: If I had…, I would… now / If I were…, I would have…', ok: MIXED.test(text) },
    { label: 'Un verbo declarativo con su patrón: advised us to…, admitted feeling…, warned him not to…', ok: REPORTING.test(text) },
    { label: 'Una relativa explicativa (, who… / , which…) o una pasiva de reporte (it is said that…)', ok: RELATIVE_OR_PASSIVE.test(text) },
  ]
}

const SPEAKING: ExamSpeak[] = [
  {
    ask: 'Describe what happened at the harbour.',
    es: 'Describe lo que pasó en el puerto.',
    help: 'We met… · He had been… · Then we spoke…',
    need: /\b(was|were|had|met|saw|spoke|said|told|came|went|found|knew|\w{3,}ed)\b/i,
    needMsg: 'Cuéntalo en pasado: We met…, He had been…, Then we spoke…',
    model: 'We met an old man at the harbour. He had been angry for years, but when we spoke together, he finally smiled.',
  },
  {
    ask: 'In your opinion, is it always right to speak up?',
    es: 'En tu opinión, ¿siempre está bien alzar la voz?',
    help: 'In my opinion… · I think… although… · I believe…',
    need: /\b(think|believe|opinion|feel|agree|disagree|seems?)\b/i,
    needMsg: 'Da tu opinión: In my opinion…, I think…, I believe…',
    model: 'In my opinion, it is usually right, although we should choose the right moment and speak with respect.',
  },
  {
    ask: 'What would you have done if you had been in the fire?',
    es: '¿Qué habrías hecho si hubieras estado en el incendio?',
    help: 'If I had been there, I would have… · I would have shouted…',
    need: /\bwould(n't)?\s+have\b|'d\s+have\b|\bwould(n't)?\s+\w+/i,
    needMsg: 'Imagina con would have: If I had been there, I would have…',
    model: 'If I had been there, I would have shouted for help and I would have used the back stairs.',
  },
]

export type ExamContent = {
  level: string
  intro: string
  pass: number
  reading: typeof READING
  listening: typeof LISTENING
  writing: typeof WRITING
  checks: (text: string) => { label: string; ok: boolean }[]
  speaking: ExamSpeak[]
  /** Quién firma los modelos */
  modelBy: string
}

export const B2_EXAM: ExamContent = {
  level: 'B2',
  intro: 'El examen final de B2 tiene cuatro partes: leer el artículo de Manuel, escuchar un boletín del Herald y una conversación, escribir un texto de opinión y responder tres preguntas en voz alta.',
  pass: B2_EXAM_PASS,
  reading: READING,
  listening: LISTENING,
  writing: WRITING,
  checks: b2WritingChecks,
  speaking: SPEAKING,
  modelBy: 'Leo',
}
