import type { Question } from '../game/types'

/**
 * Preguntas de A1 en pasado. Escuela vieja: was / were (y there was / there were).
 * Etiquetas: aula-vieja, patio-viejo, direccion-vieja.
 */
export const PAST_QUESTIONS: Question[] = [
  // ── Was / were ──────────────────────────────────────────
  { id: 'ww-01', topic: 'was-were', prompt: 'Mr. Grimm ___ a student here.', options: ['was', 'were', 'is'], answer: 0, tip: 'En pasado, con he / she / it: was.', tags: ['aula-vieja'] },
  { id: 'ww-02', topic: 'was-were', prompt: 'The students ___ in the classroom.', options: ['was', 'were', 'are'], answer: 1, tip: '"The students" son varios (they): were.', tags: ['aula-vieja'] },
  { id: 'ww-03', topic: 'was-were', prompt: 'I ___ tired yesterday.', options: ['were', 'was', 'am'], answer: 1, tip: 'Con I, en pasado: was.', tags: ['patio-viejo'] },
  { id: 'ww-04', topic: 'was-were', prompt: 'You ___ late this morning!', options: ['was', 'were', 'is'], answer: 1, tip: 'Con you, en pasado: were (aunque sea una persona).', tags: ['aula-vieja'] },
  { id: 'ww-05', topic: 'was-were', prompt: 'The school ___ very small.', options: ['were', 'was', 'are'], answer: 1, tip: '"The school" es una (it): was.', tags: ['patio-viejo'] },
  { id: 'ww-06', topic: 'was-were', prompt: 'We ___ friends at school.', options: ['were', 'was', 'is'], answer: 0, tip: 'Con we: were.', tags: ['patio-viejo'] },
  { id: 'ww-07', topic: 'was-were', prompt: 'Greg ___ at school yesterday. He was sick.', options: ["wasn't", "weren't", "isn't"], answer: 0, tip: 'Negativo con he: wasn\'t (was not).', tags: ['aula-vieja'] },
  { id: 'ww-08', topic: 'was-were', prompt: 'The windows ___ open. It was cold.', options: ["wasn't", "weren't", "aren't"], answer: 1, tip: 'Varias ventanas (they): weren\'t.', tags: ['aula-vieja'] },
  { id: 'ww-09', topic: 'was-were', prompt: '___ you at school yesterday?', options: ['Was', 'Were', 'Did'], answer: 1, tip: 'Pregunta con you: Were you...?', tags: ['aula-vieja'] },
  { id: 'ww-10', topic: 'was-were', prompt: '___ the teacher angry?', options: ['Were', 'Was', 'Is'], answer: 1, tip: 'Pregunta con he / she: Was...?', tags: ['direccion-vieja'] },
  { id: 'ww-11', topic: 'was-were', prompt: 'Was it cold? — Yes, it ___.', options: ['was', 'were', 'did'], answer: 0, tip: 'Respuesta corta: Yes, it was.', tags: ['patio-viejo'] },
  { id: 'ww-12', topic: 'was-were', prompt: 'Were they happy? — No, they ___.', options: ["wasn't", "weren't", "didn't"], answer: 1, tip: 'Respuesta corta con they: No, they weren\'t.', tags: ['patio-viejo'] },
  { id: 'ww-13', topic: 'was-were', prompt: 'There ___ a big bell in the yard.', options: ['were', 'was', 'is'], answer: 1, tip: 'Una cosa en pasado: there was.', tags: ['patio-viejo'] },
  { id: 'ww-14', topic: 'was-were', prompt: 'There ___ twenty students in the class.', options: ['was', 'were', 'are'], answer: 1, tip: 'Varias cosas en pasado: there were.', tags: ['aula-vieja'] },
  { id: 'ww-15', topic: 'was-were', prompt: 'Where ___ you last night?', options: ['was', 'were', 'are'], answer: 1, tip: 'Con you: Where were you...?', tags: ['direccion-vieja'] },
  { id: 'ww-16', topic: 'was-were', prompt: 'My grandpa ___ a teacher thirty years ago.', options: ['was', 'were', 'is'], answer: 0, tip: '"Thirty years ago" (hace treinta años) es pasado: was.', tags: ['direccion-vieja'] },

  { id: 'wwf-01', topic: 'was-were', kind: 'fix', prompt: 'I were a good student!', options: ['I was a good student.', 'I is a good student.', 'I were a good students.'], answer: 0, tip: 'Con I, en pasado: was.', tags: ['aula-vieja'] },
  { id: 'wwf-02', topic: 'was-were', kind: 'fix', prompt: 'They was my friends!', options: ['They were my friends.', 'They was my friend.', 'Them were my friends.'], answer: 0, tip: 'Con they: were.', tags: ['patio-viejo'] },
  { id: 'wwf-03', topic: 'was-were', kind: 'fix', prompt: 'Yesterday the teacher is angry!', options: ['Yesterday the teacher was angry.', 'Yesterday the teacher were angry.', 'Yesterday the teacher be angry.'], answer: 0, tip: '"Yesterday" (ayer) pide pasado: was.', tags: ['direccion-vieja'] },
  { id: 'wwf-04', topic: 'was-were', kind: 'fix', prompt: 'Was you at home?', options: ['Were you at home?', 'Was you at the home?', 'Did you at home?'], answer: 0, tip: 'Con you: Were you...?', tags: ['aula-vieja'] },
  { id: 'wwf-05', topic: 'was-were', kind: 'fix', prompt: 'There was two bells!', options: ['There were two bells.', 'There was two bell.', 'There were two bell.'], answer: 0, tip: 'Dos cosas: there were (y bells en plural).', tags: ['patio-viejo'] },
  { id: 'wwf-06', topic: 'was-were', kind: 'fix', prompt: 'He not was in class!', options: ["He wasn't in class.", "He weren't in class.", "He didn't was in class."], answer: 0, tip: 'Negativo: was + not = wasn\'t.', tags: ['aula-vieja'] },

  { id: 'wwo-01', topic: 'was-were', kind: 'order', prompt: 'La escuela era pequeña.', options: ['The', 'school', 'was', 'small.'], answer: 0, tip: 'The school + was + small.', tags: ['patio-viejo'] },
  { id: 'wwo-02', topic: 'was-were', kind: 'order', prompt: '¿Estabas en la escuela ayer?', options: ['Were', 'you', 'at', 'school', 'yesterday?'], answer: 0, tip: 'Were + you + ...?', tags: ['aula-vieja'] },
  { id: 'wwo-03', topic: 'was-were', kind: 'order', prompt: 'Había veinte estudiantes.', options: ['There', 'were', 'twenty', 'students.'], answer: 0, tip: 'There were + varias cosas.', tags: ['aula-vieja'] },
  { id: 'wwo-04', topic: 'was-were', kind: 'order', prompt: 'Ellos no estaban felices.', options: ['They', "weren't", 'happy.'], answer: 0, tip: "They + weren't + happy.", tags: ['patio-viejo'] },
]
