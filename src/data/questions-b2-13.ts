import type { Question } from '../game/types'

/**
 * B2-13 · The Fire (Ventana 2061). Bloque 1 (el pasillo del tercer piso, data/b2Fire.ts): prácticas después de cada lección.
 *  - El cartel de evacuación (tarea b2-13-hadbetter, tema hadbetter-b2): b2-13-hb1…hb6 (1 de escucha).
 *  - Tu reflejo en la ventana (tarea b2-13-time, tema itstime-b2): b2-13-it1…it6 (1 de escucha).
 * Bloque 2: Smoke Shadows (etiqueta b2-13-shadow): b2-13-sh1…sh6 · Panic, fase 1 (b2-13-boss-hb): b2-13-ph1…ph6 (1 de escucha)
 *   · fase 2, repaso de la Parte 3 (b2-13-boss-mix): b2-13-pm1…pm6 · fase 3, tu voz (b2-13-boss-v, frases para decir o escribir):
 *   b2-13-pv1…pv6 · Call for Help a dos voces (en orden): b2-13-c1…c5 (2 de escucha; la 5 se dice en voz alta o se escribe).
 * Las opciones incorrectas están mal en cualquier contexto. La posición de la respuesta correcta varía a propósito.
 */
const HB = 'hadbetter-b2' as const
const IT = 'itstime-b2' as const
const T_HB = ['b2-13-hadbetter']
const T_IT = ['b2-13-time']

const ids = (p: string) => [1, 2, 3, 4, 5, 6].map((n) => `b2-13-${p}${n}`)
export const B2_13_HADBETTER_IDS = ids('hb')
export const B2_13_TIME_IDS = ids('it')

export const B2_13_QUESTIONS: Question[] = [
  // Bloque 1 · El cartel de evacuación (had better)
  { id: 'b2-13-hb1', topic: HB, prompt: 'In case of fire, you ___ the back stairs.', options: ["'d better to use", "'d better use", "'d better using"], answer: 1, tip: 'had better + forma base, sin to: you\'d better use.', tags: T_HB },
  { id: 'b2-13-hb2', topic: HB, prompt: "There's smoke behind that door. You ___ open it.", options: ["'d not better", "'d better not to", "'d better not"], answer: 2, tip: 'Negativo: had better not + forma base.', tags: T_HB },
  { id: 'b2-13-hb3', topic: HB, kind: 'fix', prompt: 'You had better to leave now.', options: ['You had better leave now.', 'You had better leaving now.', 'You have better leave now.'], answer: 0, tip: 'Después de had better va la forma base, sin to: leave.', tags: T_HB },
  { id: 'b2-13-hb4', topic: HB, prompt: "It's very late. We ___ go home.", options: ['have better', 'had better', 'had better to'], answer: 1, tip: 'Siempre had (aunque hable del ahora): we had better go.', tags: T_HB },
  {
    id: 'b2-13-hb5',
    topic: HB,
    kind: 'listen',
    audio: "Attention, please. You'd better not use the lift. Please use the stairs.",
    voice: 'female',
    prompt: 'What should people do?',
    options: ['Use the stairs, not the lift.', 'Use the lift.', 'Stay in the classroom.'],
    answer: 0,
    tip: '"You\'d better not use the lift": más vale no usar el ascensor; hay que usar las escaleras.',
    tags: T_HB,
  },
  { id: 'b2-13-hb6', topic: HB, prompt: 'Someone is hurt. You ___ call an ambulance right now.', options: ['better had', 'had better', 'better have'], answer: 1, tip: 'El orden es had better: you had better call.', tags: T_HB },

  // Bloque 1 · Tu reflejo en la ventana (it's time)
  { id: 'b2-13-it1', topic: IT, prompt: "It's late. It's time ___ home.", options: ['to go', 'going', 'go to'], answer: 0, tip: "It's time to + forma base: to go.", tags: T_IT },
  { id: 'b2-13-it2', topic: IT, prompt: "It's half past ten. It's time we ___.", options: ['leaves', 'left', 'leaving'], answer: 1, tip: "It's time + sujeto + pasado simple: we left.", tags: T_IT },
  { id: 'b2-13-it3', topic: IT, kind: 'fix', prompt: "It's time everyone go home.", options: ["It's time everyone gone home.", "It's time everyone going home.", "It's time everyone went home."], answer: 2, tip: "It's time + sujeto + pasado: everyone went.", tags: T_IT },
  { id: 'b2-13-it4', topic: IT, prompt: "You never say what you think. It's high time you ___ up.", options: ['spoken', 'spoke', 'speaking'], answer: 1, tip: "It's high time + sujeto + pasado: you spoke up.", tags: T_IT },
  {
    id: 'b2-13-it5',
    topic: IT,
    kind: 'listen',
    audio: "It's half past ten. It's time to leave the building.",
    voice: 'male',
    prompt: 'What does the voice say?',
    options: ['The class is starting now.', 'Everyone should leave now.', 'There is a lot of time.'],
    answer: 1,
    tip: '"It\'s time to leave the building": es hora de salir del edificio.',
    tags: T_IT,
  },
  { id: 'b2-13-it6', topic: IT, prompt: "Don't hold ___. Say what you feel.", options: ['out', 'up', 'back'], answer: 2, tip: 'hold back = contenerse, callarse lo que sientes (lo contrario de speak up).', tags: T_IT },
]

const FI = 'fire-b2' as const
const SHADOW = ['b2-13-shadow']
const BOSS_HB = ['b2-13-boss-hb']
const BOSS_MIX = ['b2-13-boss-mix']
const BOSS_V = ['b2-13-boss-v']
const CALL = ['b2-13-call']

export const B2_13_COMBAT_QUESTIONS: Question[] = [
  // Smoke Shadows (el error típico: you'd better to go, it's time to staying, it's time everyone stay, had better not to)
  { id: 'b2-13-sh1', topic: HB, kind: 'fix', prompt: "You'd better to go back.", options: ["You'd better going back.", "You'd better go back.", "You'd to better go back."], answer: 1, tip: 'had better + forma base, sin to.', tags: SHADOW },
  { id: 'b2-13-sh2', topic: HB, kind: 'fix', prompt: 'You had better not to stay here.', options: ['You had better not stay here.', 'You had not better stay here.', 'You had better not staying here.'], answer: 0, tip: 'had better not + forma base.', tags: SHADOW },
  { id: 'b2-13-sh3', topic: IT, kind: 'fix', prompt: "It's time everyone stay inside.", options: ["It's time everyone staying inside.", "It's time everyone stayed inside.", "It's time everyone stays inside."], answer: 1, tip: "It's time + sujeto + pasado: everyone stayed.", tags: SHADOW },
  { id: 'b2-13-sh4', topic: IT, prompt: "Come on, it's time ___.", options: ['to go', 'going', 'for go'], answer: 0, tip: "It's time to + forma base.", tags: SHADOW },
  { id: 'b2-13-sh5', topic: HB, prompt: 'The smoke is getting thicker. We ___ hurry.', options: ['had better', 'had better to', 'have better'], answer: 0, tip: 'We had better + forma base: hurry.', tags: SHADOW },
  { id: 'b2-13-sh6', topic: IT, prompt: "It's high time somebody ___ the alarm.", options: ['pull', 'pulled', 'pulling'], answer: 1, tip: "It's high time + sujeto + pasado: pulled.", tags: SHADOW },

  // Panic, fase 1: had better e it's time
  { id: 'b2-13-ph1', topic: HB, prompt: "You ___ wait for the lift. Take the stairs.", options: ["'d better not", "'d not better", "'d better not to"], answer: 0, tip: 'had better not + forma base.', tags: BOSS_HB },
  { id: 'b2-13-ph2', topic: IT, prompt: "It's ten thirty-five. It's time we ___ the building.", options: ['leave to', 'left', 'leaving'], answer: 1, tip: "It's time + sujeto + pasado: we left.", tags: BOSS_HB },
  { id: 'b2-13-ph3', topic: HB, kind: 'fix', prompt: "We'd better to cover our mouths.", options: ["We'd better covering our mouths.", "We'd better covered our mouths.", "We'd better cover our mouths."], answer: 2, tip: 'had better + forma base: cover.', tags: BOSS_HB },
  { id: 'b2-13-ph4', topic: IT, kind: 'fix', prompt: "It's time to staying calm.", options: ["It's time to stay calm.", "It's time staying calm.", "It's time for stay calm."], answer: 0, tip: "It's time to + forma base: to stay.", tags: BOSS_HB },
  {
    id: 'b2-13-ph5',
    topic: HB,
    kind: 'listen',
    audio: "This is not a drill. You'd better leave now. Don't go back for your things.",
    voice: 'female',
    prompt: 'What does the announcement say?',
    options: ['Go back and get your bag first.', 'Leave now, without your things.', 'Wait for the next announcement.'],
    answer: 1,
    tip: '"You\'d better leave now. Don\'t go back for your things": hay que salir ya, sin las cosas.',
    tags: BOSS_HB,
  },
  { id: 'b2-13-ph6', topic: IT, prompt: "You always stay quiet. It's time you ___ what you think.", options: ['said', 'say to', 'saying'], answer: 0, tip: "It's time + sujeto + pasado: you said.", tags: BOSS_HB },

  // Panic, fase 2: repaso de la Parte 3 (relativas explicativas, contraste, preposición + -ing, tiempos narrativos, futuro perfecto)
  { id: 'b2-13-pm1', topic: 'nd-relative-b2', prompt: 'The teacher, ___ voice was very clear, called everyone.', options: ['who', 'whose', 'that'], answer: 1, tip: 'whose = cuyo: the teacher, whose voice…', tags: BOSS_MIX },
  { id: 'b2-13-pm2', topic: 'contrast-b2', prompt: '___ the smoke, they found the back stairs.', options: ['Despite of', 'Although', 'Despite'], answer: 2, tip: 'despite + sustantivo, sin of.', tags: BOSS_MIX },
  { id: 'b2-13-pm3', topic: 'ing-prep-b2', prompt: 'He left the room without ___ a word.', options: ['say', 'saying', 'to say'], answer: 1, tip: 'preposición + -ing: without saying.', tags: BOSS_MIX },
  { id: 'b2-13-pm4', topic: 'narrative-b2', prompt: 'When the alarm went off, the class ___ already finished.', options: ['has', 'have', 'had'], answer: 2, tip: 'Antes de otro hecho del pasado: had finished.', tags: BOSS_MIX },
  { id: 'b2-13-pm5', topic: 'fperfect-b2', kind: 'fix', prompt: 'By eleven, everyone will have leave the building.', options: ['By eleven, everyone will have left the building.', 'By eleven, everyone will had left the building.', 'By eleven, everyone will have leaving the building.'], answer: 0, tip: 'will have + participio: left.', tags: BOSS_MIX },
  { id: 'b2-13-pm6', topic: 'narrative-b2', prompt: 'We ___ down the stairs when we heard the sirens.', options: ['were running', 'had run to', 'are running'], answer: 0, tip: 'Acción en curso interrumpida: past continuous (were running).', tags: BOSS_MIX },

  // Panic, fase 3: tu voz. Le hablas a tu yo adulto (se dice en voz alta o se escribe)
  { id: 'b2-13-pv1', topic: FI, kind: 'order', prompt: 'No estás solo.', options: ["You're", 'not', 'alone.'], answer: 0, tip: "You're not alone.", tags: BOSS_V },
  { id: 'b2-13-pv2', topic: IT, kind: 'order', prompt: 'Ya es hora de que alces la voz.', options: ["It's", 'time', 'you', 'spoke', 'up.'], answer: 0, tip: "It's time + sujeto + pasado: you spoke up.", tags: BOSS_V },
  { id: 'b2-13-pv3', topic: FI, kind: 'order', prompt: 'Respira hondo.', options: ['Take', 'a', 'deep', 'breath.'], answer: 0, tip: 'take a deep breath = respirar hondo.', tags: BOSS_V },
  { id: 'b2-13-pv4', topic: FI, kind: 'order', prompt: 'Tranquilo. Tú puedes.', options: ['Stay', 'calm.', 'You', 'can', 'do', 'it.'], answer: 0, tip: 'Stay calm. You can do it.', tags: BOSS_V },
  { id: 'b2-13-pv5', topic: FI, kind: 'order', prompt: 'Te tengo. No te contengas.', options: ["I've", 'got', 'you.', "Don't", 'hold', 'back.'], answer: 0, tip: "I've got you = te tengo. Don't hold back = no te contengas.", tags: BOSS_V },
  { id: 'b2-13-pv6', topic: HB, kind: 'order', prompt: 'Más vale que vengas conmigo.', options: ["You'd", 'better', 'come', 'with', 'me.'], answer: 0, tip: "You'd better + forma base: come.", tags: BOSS_V },

  // Call for Help a dos voces (5 rondas en orden). La 5 se dice en voz alta (S-) o se escribe (T-)
  {
    id: 'b2-13-c1',
    topic: FI,
    kind: 'listen',
    audio: "Is anybody there? I can't find the exit!",
    voice: 'female',
    prompt: "Someone can't find the exit. What do you shout together?",
    options: ['Follow our voices! Use the back stairs!', 'Follow our voices! Using the back stairs!', 'Following our voices! Use the back stairs!'],
    answer: 0,
    tip: 'Órdenes con el verbo base al principio: Follow… Use…',
    tags: CALL,
  },
  { id: 'b2-13-c2', topic: FI, prompt: 'Fire! Get ___!', options: ['up', 'out', 'off'], answer: 1, tip: 'get out = salir (de un lugar).', tags: CALL },
  { id: 'b2-13-c3', topic: HB, prompt: "You'd better not ___ the lift!", options: ['use', 'to use', 'using'], answer: 0, tip: 'had better not + forma base.', tags: CALL },
  {
    id: 'b2-13-c4',
    topic: FI,
    kind: 'listen',
    audio: "Help! I'm behind this door! It's really hot in here!",
    voice: 'male',
    prompt: 'Someone is trapped behind a door. What do you shout?',
    options: ["Stay calm! We coming!", "Stay calm! We're come!", "Stay calm! We're coming!"],
    answer: 2,
    tip: "Presente continuo: We're coming!",
    tags: CALL,
  },
  { id: 'b2-13-c5', topic: FI, kind: 'order', prompt: '¿Hay alguien ahí? ¡Salgan ya!', options: ['Is', 'anybody', 'there?', 'Get', 'out', 'now!'], answer: 0, tip: 'Pregunta con is al principio, y luego la orden: Get out now!', tags: CALL },
]
