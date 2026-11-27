import type { Question } from '../game/types'

/**
 * B2-13 · The Fire (Ventana 2061). Bloque 1 (el pasillo del tercer piso, data/b2Fire.ts): prácticas después de cada lección.
 *  - El cartel de evacuación (tarea b2-13-hadbetter, tema hadbetter-b2): b2-13-hb1…hb6 (1 de escucha).
 *  - Tu reflejo en la ventana (tarea b2-13-time, tema itstime-b2): b2-13-it1…it6 (1 de escucha).
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
