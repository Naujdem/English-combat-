import type { Question } from '../game/types'

/**
 * Amistad en A2 (Busuu A2 caps. 1, 2 y 4): personalidad, familia ampliada y relaciones.
 * Estas preguntas son para el repaso del tema 'people-relationships', que se abre
 * al terminar el momento A2 de Leo o de Maya (ver game/social.ts).
 */
type L = Omit<Question, 'kind'>
const L = (q: L): Question => ({ ...q, kind: 'listen' })

const TP = 'people-relationships' as const

export const A2_FRIENDS_QUESTIONS: Question[] = [
  // ── Personalidad ──
  { id: 'a2-am-p1', topic: TP, prompt: 'She never tells lies. She is very ___.', options: ['honest', 'bossy', 'lazy'], answer: 0, tip: 'Alguien que no miente es honest (honesto).' },
  { id: 'a2-am-p2', topic: TP, prompt: "He doesn't like talking to new people. He is a bit ___.", options: ['shy', 'generous', 'funny'], answer: 0, tip: 'Le cuesta hablar con gente nueva: shy (tímido).' },
  { id: 'a2-am-p3', topic: TP, prompt: 'Maya always shares her food. She is very ___.', options: ['generous', 'lazy', 'bossy'], answer: 0, tip: 'Compartir lo que tienes: generous (generoso).' },
  { id: 'a2-am-p4', topic: TP, prompt: 'What is your brother ___? — He is funny and very kind.', options: ['like', 'look like', 'likes'], answer: 0, tip: 'Para la personalidad: What is he like? (sin "look").' },
  { id: 'a2-am-p5', topic: TP, prompt: 'What does your aunt ___ like? — She is tall and has curly hair.', options: ['look', 'is', 'do'], answer: 0, tip: 'Para el aspecto físico: What does she look like?' },
  { id: 'a2-am-p6', topic: TP, kind: 'fix', prompt: 'He is very friend. Everybody likes him.', options: ['He is very friendly. Everybody likes him.', 'He is very friend. Everybody likes him.', 'He is a very friend. Everybody likes him.'], answer: 0, tip: 'friend es el sustantivo (amigo); el adjetivo es friendly (amable).' },
  { id: 'a2-am-p7', topic: TP, kind: 'fix', prompt: 'She studies every day. She is very hard-work.', options: ['She studies every day. She is very hard-working.', 'She studies every day. She is very working-hard.', 'She studies every day. She is very hard-work.'], answer: 0, tip: 'El adjetivo es hard-working (trabajador).' },

  // ── Familia ampliada ──
  { id: 'a2-am-f1', topic: TP, prompt: "My mother's brother is my ___.", options: ['uncle', 'cousin', 'nephew'], answer: 0, tip: 'El hermano de tu mamá o de tu papá es tu uncle (tío).' },
  { id: 'a2-am-f2', topic: TP, prompt: "My uncle's daughter is my ___.", options: ['cousin', 'niece', 'aunt'], answer: 0, tip: 'Los hijos de tus tíos son tus cousins (primos).' },
  { id: 'a2-am-f3', topic: TP, prompt: "My sister's son is my ___.", options: ['nephew', 'niece', 'grandson'], answer: 0, tip: 'El hijo de tu hermano o hermana es tu nephew (sobrino). Sobrina: niece.' },
  { id: 'a2-am-f4', topic: TP, prompt: 'My dad married again. His new wife is my ___.', options: ['stepmother', 'mother-in-law', 'grandmother'], answer: 0, tip: 'La nueva esposa de tu papá es tu stepmother (madrastra). Mother-in-law es la suegra.' },
  { id: 'a2-am-f5', topic: TP, prompt: "I'm an ___ child. I haven't got any brothers or sisters.", options: ['only', 'one', 'alone'], answer: 0, tip: 'Hijo único: an only child.' },
  { id: 'a2-am-f6', topic: TP, kind: 'order', prompt: 'El hermano de mi papá vive en Bogotá.', options: ["My", "dad's", 'brother', 'lives', 'in', 'Bogotá.'], answer: 0, tip: "My dad's brother (con 's) + lives (con -s, tercera persona)." },

  // ── Relaciones ──
  { id: 'a2-am-r1', topic: TP, prompt: 'I get ___ well with my cousins. We never argue.', options: ['on', 'in', 'at'], answer: 0, tip: 'Llevarse bien: get on well with.' },
  { id: 'a2-am-r2', topic: TP, prompt: 'Leo and Maya fell ___ yesterday, but today they are friends again.', options: ['out', 'off', 'down'], answer: 0, tip: 'Pelearse con alguien: fall out (pasado: fell out).' },
  { id: 'a2-am-r3', topic: TP, prompt: 'After the argument, they said sorry and made ___.', options: ['up', 'out', 'on'], answer: 0, tip: 'Reconciliarse: make up (pasado: made up).' },
  { id: 'a2-am-r4', topic: TP, kind: 'order', prompt: 'Mi prima y yo tenemos mucho en común.', options: ['My', 'cousin', 'and', 'I', 'have', 'a', 'lot', 'in', 'common.'], answer: 0, tip: 'Tener mucho en común: have a lot in common.' },
  L({ id: 'a2-am-ls1', topic: TP, audio: 'My cousin Sam is very funny, but he is a bit lazy. He never helps in the kitchen!', voice: 'female', prompt: 'What is Sam like?', options: ['Funny but lazy.', 'Shy and hard-working.', 'Bossy but kind.'], answer: 0, tip: 'Dijo: "very funny, but a bit lazy".' }),
  L({ id: 'a2-am-ls2', topic: TP, audio: "I fell out with my best friend last week. We didn't talk for three days. But yesterday we made up, and now everything is fine.", voice: 'male', prompt: 'How are they now?', options: ['They are friends again.', 'They are still angry.', "They don't talk."], answer: 0, tip: 'Dijo: "yesterday we made up, and now everything is fine".' }),
]
