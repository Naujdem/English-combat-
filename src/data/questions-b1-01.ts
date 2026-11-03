import type { Question } from '../game/types'

/**
 * B1-01 · The Accident (recuerdo + epílogo en el presente). Todas las preguntas de la misión:
 *  - Call for Help (recuerdo, 5 rondas en orden, tema 'emergencies'): tag b1-01-call. La ronda 5 es de ordenar;
 *    en el recuerdo se dice en voz alta (S-) o, sin micrófono, se escribe (T-). Ver components/CallForHelp.tsx.
 *  - Práctica guiada de Leo (lista fija en data/tasks.ts): tag b1-01-practice.
 *  - Smoke Echo (esbirro del epílogo, onlyTags): tag b1-01-minion.
 *  - Repaso de emergencias (solo para Repasar › Emergencias): tag b1-01-extra.
 * Regla: en las preguntas de elegir solo UNA opción es gramaticalmente correcta; las frases con error del enemigo
 * están mal en cualquier contexto.
 */
const CALL = ['b1-01-call']
const PRACTICE = ['b1-01-practice']
const MINION = ['b1-01-minion']
const EXTRA = ['b1-01-extra']
const EM = 'emergencies' as const
const CE = 'cause-effect' as const
const PSC = 'past-simple-continuous' as const

/** Rondas de Call for Help, en orden */
export const B1_01_CALL_IDS = ['b1-01-c1', 'b1-01-c2', 'b1-01-c3', 'b1-01-c4', 'b1-01-c5']
/** Práctica guiada de Leo, en orden */
export const B1_01_PRACTICE_IDS = ['b1-01-p1', 'b1-01-p2', 'b1-01-p3', 'b1-01-p4', 'b1-01-p5', 'b1-01-p6', 'b1-01-p7', 'b1-01-p8']

export const B1_01_QUESTIONS: Question[] = [
  // ── Call for Help (recuerdo) ──
  {
    id: 'b1-01-c1',
    topic: EM,
    kind: 'listen',
    audio: "Help! There's someone behind this door! I think it's locked!",
    voice: 'female',
    prompt: '¿Qué pasa con la puerta?',
    options: ['Está cerrada con llave.', 'Está abierta.', 'Se está quemando.'],
    answer: 0,
    tip: 'locked = cerrada con llave.',
    tags: CALL,
  },
  { id: 'b1-01-c2', topic: EM, prompt: "Student: I can't find the exit! — L: ___ my voice! The fire exit is on your left!", options: ['Follow', 'Following', 'Follows'], answer: 0, tip: 'Una orden: el verbo base al principio. Follow my voice!', tags: CALL },
  { id: 'b1-01-c3', topic: EM, kind: 'order', prompt: '¡Llamen a los bomberos! ¡Estamos en el tercer piso!', options: ['Call', 'the', 'firefighters!', 'We', 'are', 'on', 'the', 'third', 'floor!'], answer: 0, tip: 'Orden con el verbo al principio (Call…) y el piso con on: on the third floor.', tags: CALL },
  { id: 'b1-01-c4', topic: EM, kind: 'fix', prompt: "Get out now! Don't to use the lift!", options: ["Get out now! Don't use the lift!", 'Get out now! Not use the lift!', "Get out now! Don't using the lift!"], answer: 0, tip: "Don't + verbo base: Don't use.", tags: CALL },
  { id: 'b1-01-c5', topic: EM, kind: 'order', prompt: '¿Hay alguien ahí? ¡Ayuda!', options: ['Is', 'anybody', 'there?', 'Help!'], answer: 0, tip: 'Pregunta con is al principio: Is anybody there?', tags: CALL },

  // ── Práctica guiada de Leo (epílogo) ──
  { id: 'b1-01-p1', topic: PSC, prompt: 'I ___ the board when the alarm rang.', options: ['was cleaning', 'cleaning', 'was clean'], answer: 0, tip: 'Acción en progreso interrumpida: was cleaning.', tags: PRACTICE },
  { id: 'b1-01-p2', topic: PSC, prompt: 'While we ___ down the stairs, the lights went out.', options: ['were walking', 'was walking', 'walking'], answer: 0, tip: 'while + acción larga en progreso: were walking (we → were).', tags: PRACTICE },
  { id: 'b1-01-p3', topic: PSC, kind: 'fix', prompt: 'I was wash the dishes when the phone rang.', options: ['I was washing the dishes when the phone rang.', 'I was wash the dishes when the phone rang.', 'I washing the dishes when the phone rang.'], answer: 0, tip: 'Past continuous: was + verbo con -ing.', tags: PRACTICE },
  { id: 'b1-01-p4', topic: CE, prompt: 'He lost his voice ___ the smoke.', options: ['because of', 'because', 'so'], answer: 0, tip: 'Después viene solo un sustantivo (the smoke): because of.', tags: PRACTICE },
  { id: 'b1-01-p5', topic: CE, prompt: 'He lost his voice ___ the smoke was very thick.', options: ['because', 'because of', 'as a result of'], answer: 0, tip: 'Después viene una oración completa (the smoke was…): because.', tags: PRACTICE },
  { id: 'b1-01-p6', topic: CE, prompt: 'The stairs were full of smoke, ___ we used the fire exit.', options: ['so', 'because of', 'as a result of'], answer: 0, tip: 'Es el resultado: so (así que).', tags: PRACTICE },
  { id: 'b1-01-p7', topic: CE, kind: 'order', prompt: 'Usamos la salida de emergencia por el humo.', options: ['We', 'used', 'the', 'fire', 'exit', 'because', 'of', 'the', 'smoke.'], answer: 0, tip: 'because of + sustantivo (the smoke).', tags: PRACTICE },
  { id: 'b1-01-p8', topic: CE, prompt: 'The fire was very hot. ___, nobody could stay inside.', options: ['As a result', 'Because of', 'Because'], answer: 0, tip: 'As a result abre una frase nueva con el resultado (lleva coma).', tags: PRACTICE },

  // ── Smoke Echo (esbirro del epílogo) ──
  { id: 'b1-01-m1', topic: PSC, kind: 'fix', prompt: 'While the alarm rang, I was clean the board.', options: ['While the alarm was ringing, I was cleaning the board.', 'While the alarm rang, I cleaning the board.', 'While the alarm was ring, I was clean the board.'], answer: 0, tip: 'Las dos acciones largas en progreso: was ringing / was cleaning.', tags: MINION },
  { id: 'b1-01-m2', topic: CE, kind: 'fix', prompt: "Because the smoke, he couldn't breathe.", options: ["Because of the smoke, he couldn't breathe.", "Because the smoke, he can't to breathe.", "Because of smoke, he couldn't to breathe."], answer: 0, tip: 'Sustantivo: because of the smoke.', tags: MINION },
  { id: 'b1-01-m3', topic: PSC, prompt: 'My friend ___ at the door when I heard the alarm.', options: ['was standing', 'were standing', 'standing'], answer: 0, tip: 'My friend = he: was standing.', tags: MINION },
  { id: 'b1-01-m4', topic: PSC, prompt: 'We were running when the lights ___.', options: ['went out', 'goes out', 'going out'], answer: 0, tip: 'El hecho corto que interrumpe va en past simple: went out.', tags: MINION },
  { id: 'b1-01-m5', topic: CE, prompt: "She couldn't see anything ___ the thick smoke.", options: ['because of', 'because', 'so'], answer: 0, tip: 'Sustantivo (the thick smoke): because of.', tags: MINION },
  { id: 'b1-01-m6', topic: CE, prompt: 'The door was locked, ___ we broke it.', options: ['so', 'because of', 'as a result of'], answer: 0, tip: 'Es el resultado: so.', tags: MINION },
  { id: 'b1-01-m7', topic: PSC, kind: 'order', prompt: 'Mientras bajábamos, el humo se hacía más espeso.', options: ['While', 'we', 'were', 'going', 'down,', 'the', 'smoke', 'got', 'thicker.'], answer: 0, tip: 'while + past continuous, coma, past simple.', tags: MINION },
  {
    id: 'b1-01-m8',
    topic: PSC,
    kind: 'listen',
    audio: 'The alarm rang while I was cleaning the board, so I ran to the door.',
    voice: 'male',
    prompt: '¿Qué hacía la persona cuando sonó la alarma?',
    options: ['Limpiaba la pizarra.', 'Cerraba la puerta.', 'Hablaba por teléfono.'],
    answer: 0,
    tip: 'was cleaning = estaba limpiando.',
    tags: MINION,
  },

  // ── Repaso de emergencias (Repasar › Emergencias y pedir ayuda) ──
  { id: 'b1-01-e1', topic: EM, prompt: 'Help! A man is ___ in the lift!', options: ['trapped', 'trap', 'traps'], answer: 0, tip: 'trapped = atrapado (is trapped).', tags: EXTRA },
  { id: 'b1-01-e2', topic: EM, kind: 'fix', prompt: 'Call to the firefighters! Quick!', options: ['Call the firefighters! Quick!', 'Calls the firefighters! Quick!', 'Calling to the firefighters! Quick!'], answer: 0, tip: 'call + a quién, sin to: Call the firefighters!', tags: EXTRA },
  { id: 'b1-01-e3', topic: EM, kind: 'order', prompt: 'Cúbrete la boca y la nariz.', options: ['Cover', 'your', 'mouth', 'and', 'nose.'], answer: 0, tip: 'Orden con el verbo al principio: Cover your mouth.', tags: EXTRA },
  { id: 'b1-01-e4', topic: EM, prompt: "Is anybody ___? — Yes! I'm here! Help me!", options: ['there', 'their', 'they'], answer: 0, tip: 'Is anybody there? = ¿Hay alguien ahí?', tags: EXTRA },
]
