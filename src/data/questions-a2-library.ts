import type { Question } from '../game/types'

/**
 * A2-05 · Words That Don't Belong (biblioteca).
 * Past Simple: regulares (-ed) e irregulares comunes, conectores de tiempo (yesterday, last week, then) y comparativos básicos.
 * La práctica de Leo usa una lista fija (ver data/tasks.ts); el eco de tinta pregunta solo de aquí:
 * fase 1 regulares (a2-library-reg), fase 2 irregulares, conectores y comparativos (a2-library-irr).
 */
const R = ['a2-library', 'a2-library-reg']
const I = ['a2-library', 'a2-library-irr']
/** Solo el lector corrompido (esbirro ligero antes del eco de tinta) */
const LR = ['a2-library-reader']

export const A2_LIBRARY_QUESTIONS: Question[] = [
  // ── Pasado regular: verbo + -ed ──
  { id: 'a2-05-r1', topic: 'past-simple', prompt: 'Yesterday I ___ the library with Leo.', options: ['visited', 'visit', 'visits'], answer: 0, tip: 'Pasado regular: visit + -ed = visited.', tags: R },
  { id: 'a2-05-r2', topic: 'past-simple', prompt: 'Last week we ___ to music in the reading room.', options: ['listened', 'listen', 'listening'], answer: 0, tip: 'Pasado regular: listen + -ed = listened.', tags: R },
  { id: 'a2-05-r3', topic: 'past-simple', kind: 'order', prompt: 'Ayer estudié en la biblioteca.', options: ['Yesterday', 'I', 'studied', 'in', 'the', 'library.'], answer: 0, tip: 'study → studied (y cambia a i + -ed).', tags: R },
  { id: 'a2-05-r4', topic: 'past-simple', kind: 'fix', prompt: 'She stoped the old clock.', options: ['She stopped the old clock.', 'She stopd the old clock.', 'She stop the old clock.'], answer: 0, tip: 'stop → stopped: se dobla la p.', tags: R },
  { id: 'a2-05-r5', topic: 'past-simple', prompt: 'Mrs. Okafor ___ at the library at nine.', options: ['arrived', 'arrive', 'arriveed'], answer: 0, tip: 'arrive ya termina en -e: solo se agrega -d (arrived).', tags: R },
  { id: 'a2-05-r6', topic: 'past-simple', kind: 'fix', prompt: 'I watch a movie last night.', options: ['I watched a movie last night.', 'I watching a movie last night.', 'I watches a movie last night.'], answer: 0, tip: 'Con last night el verbo va en pasado: watched.', tags: R },
  { id: 'a2-05-r7', topic: 'past-simple', prompt: 'The words in the book ___ yesterday.', options: ['changed', 'change', 'changes'], answer: 0, tip: 'Pasado regular: change + -d = changed.', tags: R },
  { id: 'a2-05-r8', topic: 'past-simple', kind: 'order', prompt: 'El lector cerró el libro.', options: ['The', 'reader', 'closed', 'the', 'book.'], answer: 0, tip: 'close → closed.', tags: R },

  // ── Pasado irregular ──
  { id: 'a2-05-i1', topic: 'past-simple', prompt: 'Yesterday I ___ to the library by bus.', options: ['went', 'goed', 'go'], answer: 0, tip: 'go es irregular: went (nunca "goed").', tags: I },
  { id: 'a2-05-i2', topic: 'past-simple', prompt: 'Last week a man ___ an old book about clocks.', options: ['bought', 'buyed', 'buy'], answer: 0, tip: 'buy es irregular: bought.', tags: I },
  { id: 'a2-05-i3', topic: 'past-simple', kind: 'fix', prompt: 'We eated sandwiches in the park yesterday.', options: ['We ate sandwiches in the park yesterday.', 'We eat sandwiches in the park yesterday.', 'We eatted sandwiches in the park yesterday.'], answer: 0, tip: 'eat es irregular: ate.', tags: I },
  { id: 'a2-05-i4', topic: 'past-simple', prompt: 'Then the reader ___ a purple light between the pages.', options: ['saw', 'seed', 'see'], answer: 0, tip: 'see es irregular: saw.', tags: I },
  { id: 'a2-05-i5', topic: 'past-simple', kind: 'order', prompt: 'Alguien devolvió el libro la semana pasada.', options: ['Someone', 'returned', 'the', 'book', 'last', 'week.'], answer: 0, tip: 'Sujeto + verbo en pasado + ... + last week.', tags: I },
  { id: 'a2-05-i6', topic: 'past-simple', kind: 'fix', prompt: 'He writed a note for Mr. Hale.', options: ['He wrote a note for Mr. Hale.', 'He write a note for Mr. Hale.', 'He writes a note for Mr. Hale yesterday.'], answer: 0, tip: 'write es irregular: wrote.', tags: I },
  { id: 'a2-05-i7', topic: 'past-simple', prompt: 'Yesterday afternoon the reader ___ a strange noise.', options: ['heard', 'heared', 'hear'], answer: 0, tip: 'hear es irregular: heard.', tags: I },
  { id: 'a2-05-i8', topic: 'past-simple', prompt: 'Mrs. Okafor ___ the old book to Leo.', options: ['gave', 'gived', 'give'], answer: 0, tip: 'give es irregular: gave.', tags: I },

  // ── Conectores y comparativos ──
  { id: 'a2-05-c1', topic: 'past-simple', prompt: 'First, I opened the book. ___, I saw a purple light.', options: ['Then', 'Yesterday', 'Last'], answer: 0, tip: 'Para el siguiente paso de la historia: Then.', tags: I },
  { id: 'a2-05-c2', topic: 'past-simple', prompt: 'I read this book ___ week.', options: ['last', 'yesterday', 'ago'], answer: 0, tip: 'La semana pasada: last week (sin "the").', tags: I },
  { id: 'a2-05-c3', topic: 'past-simple', prompt: 'This book is ___ than the library.', options: ['older', 'more old', 'oldest'], answer: 0, tip: 'Adjetivo corto + -er + than: older than.', tags: I },
  { id: 'a2-05-c4', topic: 'past-simple', kind: 'fix', prompt: 'The library is more big than the café.', options: ['The library is bigger than the café.', 'The library is more bigger than the café.', 'The library is big than the café.'], answer: 0, tip: 'big → bigger than (se dobla la g, sin "more").', tags: I },

  // ── El lector corrompido (esbirro ligero): Past Simple regular e irregular ──
  { id: 'a2-05-l1', topic: 'past-simple', prompt: 'Last night I ___ a book about the moon.', options: ['read', 'readed', 'reads'], answer: 0, tip: 'read es irregular: en pasado se escribe igual (read) y suena "red".', tags: LR },
  { id: 'a2-05-l2', topic: 'past-simple', prompt: 'She ___ the old map in the library yesterday.', options: ['found', 'finded', 'finds'], answer: 0, tip: 'find es irregular: find → found.', tags: LR },
  { id: 'a2-05-l3', topic: 'past-simple', prompt: 'We ___ for two hours at the reading table.', options: ['studied', 'studyed', 'study'], answer: 0, tip: 'study: consonante + y → -ied: studied.', tags: LR },
  { id: 'a2-05-l4', topic: 'past-simple', kind: 'fix', prompt: 'He keeped the book for a month.', options: ['He kept the book for a month.', 'He keep the book for a month.', 'He kepted the book for a month.'], answer: 0, tip: 'keep es irregular: keep → kept.', tags: LR },
  { id: 'a2-05-l5', topic: 'past-simple', kind: 'fix', prompt: 'I goed to the library last Monday.', options: ['I went to the library last Monday.', 'I go to the library last Monday.', 'I wented to the library last Monday.'], answer: 0, tip: 'go es irregular: go → went.', tags: LR },
  { id: 'a2-05-l6', topic: 'past-simple', kind: 'fix', prompt: 'They stoped at the front desk.', options: ['They stopped at the front desk.', 'They stop at the front desk.', 'They stopping at the front desk.'], answer: 0, tip: 'stop: vocal + consonante final, se dobla: stopped.', tags: LR },
  { id: 'a2-05-l7', topic: 'past-simple', kind: 'order', prompt: 'Ayer devolví dos libros.', options: ['Yesterday', 'I', 'returned', 'two', 'books.'], answer: 0, tip: 'Yesterday + I + verbo en pasado (returned).', tags: LR },
  { id: 'a2-05-l8', topic: 'past-simple', kind: 'order', prompt: 'La semana pasada escribí una carta.', options: ['Last', 'week', 'I', 'wrote', 'a', 'letter.'], answer: 0, tip: 'write es irregular: write → wrote.', tags: LR },
]
