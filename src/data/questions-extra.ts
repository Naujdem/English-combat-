import type { Question } from '../game/types'

/**
 * Repaso de cierre de A1: palabras de pregunta (who, what, where, when, how old)
 * con to be, y conectores (and, but, or) con los gustos.
 */
export const EXTRA_QUESTIONS: Question[] = [
  // ── Palabras de pregunta ────────────────────────────────
  { id: 'wh-01', topic: 'to-be', prompt: '___ is your teacher? — Mr. Grimm.', options: ['Who', 'What', 'Where'], answer: 0, tip: 'Para preguntar por una persona: Who (quién).', tags: ['aula'] },
  { id: 'wh-02', topic: 'to-be', prompt: '___ is the library? — It is next to the cafeteria.', options: ['When', 'Where', 'Who'], answer: 1, tip: 'Para preguntar por un lugar: Where (dónde).', tags: ['biblioteca'] },
  { id: 'wh-03', topic: 'to-be', prompt: '___ is your favorite subject? — English.', options: ['Who', 'Where', 'What'], answer: 2, tip: 'Para preguntar por una cosa: What (qué, cuál).', tags: ['aula'] },
  { id: 'wh-04', topic: 'to-be', prompt: '___ is the English test? — On Monday.', options: ['When', 'Where', 'Who'], answer: 0, tip: 'Para preguntar por un momento: When (cuándo).', tags: ['aula'] },
  { id: 'wh-05', topic: 'to-be', prompt: 'How ___ is your brother? — He is twelve.', options: ['many', 'old', 'much'], answer: 1, tip: 'Para la edad: How old...?', tags: ['patio'] },
  { id: 'wh-06', topic: 'to-be', prompt: '___ are my books? — They are on the desk.', options: ['What', 'How', 'Where'], answer: 2, tip: 'Lugar: Where.', tags: ['aula'] },
  { id: 'wh-07', topic: 'to-be', prompt: '___ is that girl? — She is Maya.', options: ['Who', 'What', 'How'], answer: 0, tip: 'Persona: Who.', tags: ['patio'] },
  { id: 'wh-08', topic: 'to-be', prompt: '___ are you? — I\'m fine, thanks.', options: ['Who', 'How', 'Where'], answer: 1, tip: 'Para preguntar cómo está alguien: How are you?', tags: ['aula'] },
  { id: 'whf-01', topic: 'to-be', kind: 'fix', prompt: 'What is that boy? He is Tom!', options: ['Who is that boy?', 'Where is that boy?', 'What that boy is?'], answer: 0, tip: 'Para preguntar por una persona se usa Who, no What.', tags: ['patio'] },
  { id: 'whf-02', topic: 'to-be', kind: 'fix', prompt: 'Where are the bathroom?', options: ['Where is the bathroom?', 'Where the bathroom is?', 'Where are bathroom?'], answer: 0, tip: '"The bathroom" es uno: Where is...?', tags: ['bano'] },
  { id: 'whf-03', topic: 'to-be', kind: 'fix', prompt: 'How many years you have?', options: ['How old are you?', 'How old you are?', 'How many old are you?'], answer: 0, tip: 'La edad se pregunta con to be: How old are you?', tags: ['aula'] },
  { id: 'who-01', topic: 'to-be', kind: 'order', prompt: '¿Quién es tu mejor amigo?', options: ['Who', 'is', 'your', 'best', 'friend?'], answer: 0, tip: 'Who + is + your best friend?', tags: ['patio'] },
  { id: 'who-02', topic: 'to-be', kind: 'order', prompt: '¿Cuándo es tu cumpleaños?', options: ['When', 'is', 'your', 'birthday?'], answer: 0, tip: 'When + is + your birthday?', tags: ['aula'] },

  // ── Conectores: and, but, or ────────────────────────────
  { id: 'ab-01', topic: 'likes', prompt: "I like tea, ___ I don't like coffee.", options: ['and', 'but', 'or'], answer: 1, tip: 'Para contrastar (sí... pero no...): but.', tags: ['barrio'] },
  { id: 'ab-02', topic: 'likes', prompt: 'Maya likes reading ___ drawing.', options: ['and', 'but', 'or'], answer: 0, tip: 'Para sumar dos cosas: and.', tags: ['casa-maya'] },
  { id: 'ab-03', topic: 'likes', prompt: 'Do you want juice ___ water?', options: ['but', 'and', 'or'], answer: 2, tip: 'Para elegir entre dos cosas: or.', tags: ['barrio'] },
  { id: 'ab-04', topic: 'likes', prompt: "Kevin can swim, ___ he can't fly.", options: ['or', 'but', 'and'], answer: 1, tip: 'Contraste: but.', tags: ['parque'] },
  { id: 'ab-05', topic: 'likes', prompt: 'Leo loves games ___ music.', options: ['and', 'or', 'but'], answer: 0, tip: 'Las dos cosas le encantan: and.', tags: ['casa-leo'] },
  { id: 'ab-06', topic: 'likes', prompt: 'Is your cat black ___ white?', options: ['and', 'but', 'or'], answer: 2, tip: 'Pregunta para elegir: or.', tags: ['barrio'] },
  { id: 'abf-01', topic: 'likes', kind: 'fix', prompt: "I love pizza or I don't like salad!", options: ["I love pizza, but I don't like salad.", "I love pizza and I don't like salad or.", "I love pizza or I like salad."], answer: 0, tip: 'Dos ideas opuestas se unen con but.', tags: ['barrio'] },
  { id: 'abo-01', topic: 'likes', kind: 'order', prompt: 'Me gusta leer, pero odio cocinar.', options: ['I', 'like', 'reading,', 'but', 'I', 'hate', 'cooking.'], answer: 0, tip: 'I like reading, but I hate cooking.', tags: ['casa-maya'] },
]
