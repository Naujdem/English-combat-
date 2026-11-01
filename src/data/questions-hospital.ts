import type { Question } from '../game/types'

/**
 * A2 · Hospital: consejos y reglas (should / must / have to) y palabras de salud.
 * Salen en la práctica guiada de Leo y en el combate del eco corrompido (etiqueta a2-hospital).
 * Las de completar y ordenar también salen como escucha, escritura y habla (se generan solas).
 */
const T = ['a2-hospital']

export const HOSPITAL_QUESTIONS: Question[] = [
  // ── Completar ──
  { id: 'hs-01', topic: 'should-must', prompt: 'You look tired. You ___ rest a little.', options: ['should', 'should to', 'shoulds'], answer: 0, tip: 'Should + verbo solo: You should rest.', tags: T },
  { id: 'hs-02', topic: 'should-must', prompt: 'Your leg hurts. You ___ run today.', options: ["shouldn't", 'should', "don't should"], answer: 0, tip: "Mal consejo con la pierna herida: shouldn't run.", tags: T },
  { id: 'hs-03', topic: 'should-must', prompt: 'The doctor says: You ___ take this medicine every morning.', options: ['must', 'must to', 'musts'], answer: 0, tip: 'Must + verbo solo, igual con todos: You must take.', tags: T },
  { id: 'hs-04', topic: 'should-must', prompt: 'Hospital rule: Visitors ___ smoke in the rooms.', options: ["mustn't", 'must', "don't must"], answer: 0, tip: "Está prohibido: mustn't + verbo.", tags: T },
  { id: 'hs-05', topic: 'should-must', prompt: 'The nurse ___ check my leg again tonight.', options: ['has to', 'have to', 'haves to'], answer: 0, tip: 'The nurse (she) → has to + verbo.', tags: T },
  { id: 'hs-06', topic: 'should-must', prompt: 'I ___ stay in the hospital one more night.', options: ['have to', 'has to', 'have'], answer: 0, tip: 'Con I: have to + verbo.', tags: T },
  { id: 'hs-07', topic: 'should-must', prompt: "Your leg is better. You ___ stay in bed all day.", options: ["don't have to", "doesn't have to", "mustn't to"], answer: 0, tip: "No es necesario: don't have to. Con you: don't.", tags: T },
  { id: 'hs-08', topic: 'should-must', prompt: '___ I have to take this medicine after lunch?', options: ['Do', 'Does', 'Must'], answer: 0, tip: 'Pregunta con have to: Do + I + have to...?', tags: T },
  { id: 'hs-09', topic: 'should-must', prompt: 'My head hurts. I have a ___.', options: ['headache', 'stomachache', 'sore throat'], answer: 0, tip: 'Head (cabeza) + ache (dolor) = headache.', tags: T },
  { id: 'hs-10', topic: 'should-must', prompt: 'I ate too much. Now I have a ___.', options: ['stomachache', 'headache', 'cough'], answer: 0, tip: 'Comiste demasiado: te duele el estómago (stomachache).', tags: T },
  { id: 'hs-11', topic: 'should-must', prompt: 'You have a cough. You ___ drink some hot tea.', options: ['should', "shouldn't", 'should to'], answer: 0, tip: 'Un buen consejo para la tos: should drink.', tags: T },
  { id: 'hs-12', topic: 'should-must', prompt: 'She has a fever. She should ___ to the doctor.', options: ['go', 'goes', 'to go'], answer: 0, tip: 'Después de should el verbo va solo: should go.', tags: T },

  // ── Corregir al enemigo ──
  { id: 'hs-f1', topic: 'should-must', kind: 'fix', prompt: 'You must to rest now!', options: ['You must rest now!', 'You musts rest now!', 'You must resting now!'], answer: 0, tip: 'Después de must no va to: You must rest.', tags: T },
  { id: 'hs-f2', topic: 'should-must', kind: 'fix', prompt: 'You should drinks more water.', options: ['You should drink more water.', 'You should to drink more water.', 'You shoulds drink more water.'], answer: 0, tip: 'Después de should el verbo va solo, sin -s: should drink.', tags: T },
  { id: 'hs-f3', topic: 'should-must', kind: 'fix', prompt: 'The doctor have to work tonight.', options: ['The doctor has to work tonight.', 'The doctor have work tonight.', 'The doctor has work tonight.'], answer: 0, tip: 'The doctor (she / he) → has to + verbo.', tags: T },
  { id: 'hs-f4', topic: 'should-must', kind: 'fix', prompt: 'Does I have to stay here?', options: ['Do I have to stay here?', 'Do I has to stay here?', 'Must I to stay here?'], answer: 0, tip: 'Con I la pregunta es con Do: Do I have to...?', tags: T },
  { id: 'hs-f5', topic: 'should-must', kind: 'fix', prompt: "You don't should walk fast with that leg.", options: ["You shouldn't walk fast with that leg.", "You should not to walk fast with that leg.", "You doesn't should walk fast with that leg."], answer: 0, tip: "Negativo de should: shouldn't (sin don't).", tags: T },

  // ── Ordenar ──
  { id: 'hs-o1', topic: 'should-must', kind: 'order', prompt: 'Deberías descansar un poco.', options: ['You', 'should', 'rest', 'a', 'little.'], answer: 0, tip: 'You + should + verbo: You should rest.', tags: T },
  { id: 'hs-o2', topic: 'should-must', kind: 'order', prompt: 'Debes tomar esta medicina.', options: ['You', 'must', 'take', 'this', 'medicine.'], answer: 0, tip: 'You + must + verbo: You must take...', tags: T },
  { id: 'hs-o3', topic: 'should-must', kind: 'order', prompt: 'Ella tiene que trabajar esta noche.', options: ['She', 'has', 'to', 'work', 'tonight.'], answer: 0, tip: 'She + has to + verbo.', tags: T },
  { id: 'hs-o4', topic: 'should-must', kind: 'order', prompt: 'No deberías correr hoy.', options: ['You', "shouldn't", 'run', 'today.'], answer: 0, tip: "You + shouldn't + verbo.", tags: T },
  { id: 'hs-o5', topic: 'should-must', kind: 'order', prompt: '¿Tengo que quedarme en cama?', options: ['Do', 'I', 'have', 'to', 'stay', 'in', 'bed?'], answer: 0, tip: 'Do + I + have to + verbo...?', tags: T },
]
