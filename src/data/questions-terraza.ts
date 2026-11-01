import type { Question } from '../game/types'

/** Escucha real: se oye la frase sin verla y se responde una pregunta de comprensión */
const L = (q: Omit<Question, 'kind'>): Question => ({ ...q, kind: 'listen' })

/**
 * Preguntas del primer enfrentamiento con el desconocido, en la terraza de la torre (final de A1).
 * Etiqueta: terraza. Repasan A1 en tres fases: pasado, presente y futuro.
 * Las de completar y ordenar también salen como escucha, escritura y habla (se generan solas).
 */
export const TERRAZA_QUESTIONS: Question[] = [
  // ── Fase 1 · The Past: was/were, pasado regular e irregular, did/didn't, ago ──
  { id: 'tz-p01', topic: 'was-were', prompt: 'Last night the man in the dark coat ___ on this terrace.', options: ['was', 'were', 'is'], answer: 0, tip: 'Last night = pasado. Con he (the man): was.', tags: ['terraza'] },
  { id: 'tz-p02', topic: 'was-were', prompt: 'In 1996 we ___ in the old cinema.', options: ['were', 'was', 'are'], answer: 0, tip: 'In 1996 = pasado. Con we: were.', tags: ['terraza'] },
  { id: 'tz-p03', topic: 'past-did', prompt: '___ you follow me to the farm?', options: ['Did', 'Do', 'Were'], answer: 0, tip: 'Pregunta en pasado: Did + sujeto + verbo simple (follow).', tags: ['terraza'] },
  { id: 'tz-p04', topic: 'past-did', prompt: "No, I ___ follow you. You followed me!", options: ["didn't", "don't", "wasn't"], answer: 0, tip: "Negativo en pasado: didn't + verbo simple.", tags: ['terraza'] },
  { id: 'tz-p05', topic: 'past-irregular', prompt: 'Yesterday we ___ to the old farm.', options: ['went', 'goed', 'go'], answer: 0, tip: 'go es irregular: el pasado es went.', tags: ['terraza'] },
  { id: 'tz-p06', topic: 'past-time', prompt: 'I came to this tower two days ___.', options: ['ago', 'before', 'last'], answer: 0, tip: 'Tiempo + ago: two days ago (hace dos días).', tags: ['terraza'] },
  { id: 'tz-pf1', topic: 'past-regular', kind: 'fix', prompt: 'I watch you in 1996, at the cinema.', options: ['I watched you in 1996, at the cinema.', 'I watchd you in 1996, at the cinema.', 'I did watched you in 1996, at the cinema.'], answer: 0, tip: 'In 1996 = pasado. Verbo regular + -ed: watched.', tags: ['terraza'] },
  { id: 'tz-pf2', topic: 'past-did', kind: 'fix', prompt: 'Did you found all the pieces?', options: ['Did you find all the pieces?', 'Did you founded all the pieces?', 'Do you found all the pieces?'], answer: 0, tip: 'Después de did, el verbo va simple: Did you find...?', tags: ['terraza'] },
  { id: 'tz-pf3', topic: 'was-were', kind: 'fix', prompt: 'Your friends was with you every day.', options: ['Your friends were with you every day.', 'Your friends is with you every day.', 'Your friends where with you every day.'], answer: 0, tip: 'Your friends = they: were. (Where significa "dónde".)', tags: ['terraza'] },
  { id: 'tz-po1', topic: 'past-irregular', kind: 'order', prompt: 'Encontraste cinco piezas del reloj.', options: ['You', 'found', 'five', 'pieces', 'of', 'the', 'clock.'], answer: 0, tip: 'find es irregular: found. You + found + ...', tags: ['terraza'] },
  L({ id: 'tz-pl1', topic: 'was-were', audio: 'Last night I was here, on this terrace. I was alone, and the city was very quiet.', voice: 'male', prompt: 'Where was the man last night?', options: ['On the terrace.', 'In the lobby.', 'At the school.'], answer: 0, tip: 'Dijo: "I was here, on this terrace".', tags: ['terraza'] }),
  L({ id: 'tz-pl2', topic: 'past-did', audio: "Did you see him at the farm? No, I didn't. But I saw him at the old cinema.", voice: 'female', prompt: 'Where did she see him?', options: ['At the old cinema.', 'At the farm.', 'At the school.'], answer: 0, tip: 'Dijo: "I saw him at the old cinema".', tags: ['terraza'] }),
  { id: 'tz-po2', topic: 'past-did', kind: 'order', prompt: 'No te vi en la granja.', options: ['I', "didn't", 'see', 'you', 'at', 'the', 'farm.'], answer: 0, tip: "I + didn't + see (verbo simple).", tags: ['terraza'] },

  // ── Fase 2 · The Present: to be, presente simple, do/does, can, have got, presente continuo ──
  { id: 'tz-n01', topic: 'to-be', prompt: 'Who ___ you? Why are you here?', options: ['are', 'is', 'am'], answer: 0, tip: 'Con you: are. Who are you?', tags: ['terraza'] },
  { id: 'tz-n02', topic: 'have-got', prompt: 'You ___ got my clock. Give it to me!', options: ['have', 'has', 'are'], answer: 0, tip: 'Con you: have got.', tags: ['terraza'] },
  { id: 'tz-n03', topic: 'have-got', prompt: 'He ___ got a dark coat and a quiet voice.', options: ['has', 'have', 'is'], answer: 0, tip: 'Con he: has got.', tags: ['terraza'] },
  { id: 'tz-n04', topic: 'can', prompt: 'I ___ talk now. You can\'t take my voice again!', options: ['can', 'cans', 'can to'], answer: 0, tip: 'can + verbo, sin -s y sin to: I can talk.', tags: ['terraza'] },
  { id: 'tz-n05', topic: 'present-continuous', prompt: 'Look! The clock ___ shining.', options: ['is', 'are', 'does'], answer: 0, tip: 'Algo que pasa ahora: is + verbo con -ing (is shining).', tags: ['terraza'] },
  { id: 'tz-n06', topic: 'do-does', prompt: '___ he know my name? — Yes, he does.', options: ['Does', 'Do', 'Is'], answer: 0, tip: 'Pregunta con he: Does + verbo simple.', tags: ['terraza'] },
  { id: 'tz-n07', topic: 'present-simple', prompt: 'He always ___ behind us. Every day!', options: ['walks', 'walk', 'walking'], answer: 0, tip: 'Presente simple con he: verbo + -s (walks).', tags: ['terraza'] },
  { id: 'tz-nf1', topic: 'do-does', kind: 'fix', prompt: 'What do he want?', options: ['What does he want?', 'What does he wants?', 'What is he want?'], answer: 0, tip: 'Con he: does. Y después de does, el verbo va sin -s: want.', tags: ['terraza'] },
  { id: 'tz-nf2', topic: 'present-continuous', kind: 'fix', prompt: 'The wind is blow very hard.', options: ['The wind is blowing very hard.', 'The wind blowing very hard.', 'The wind are blowing very hard.'], answer: 0, tip: 'Presente continuo: is + verbo con -ing (is blowing).', tags: ['terraza'] },
  { id: 'tz-no1', topic: 'can', kind: 'order', prompt: 'No puedes tener mi reloj.', options: ['You', "can't", 'have', 'my', 'clock.'], answer: 0, tip: "can't + verbo simple: You can't have...", tags: ['terraza'] },
  L({ id: 'tz-nl1', topic: 'present-continuous', audio: 'The wind is blowing. The clock is shining in my hand, and the man is walking to me.', voice: 'male', prompt: 'What is the man doing?', options: ['He is walking to me.', 'He is running away.', 'He is sitting down.'], answer: 0, tip: 'Dijo: "the man is walking to me".', tags: ['terraza'] }),
  L({ id: 'tz-nl2', topic: 'have-got', audio: "He has got a dark coat and a quiet voice. He hasn't got the clock. I have got it!", voice: 'female', prompt: 'Who has got the clock?', options: ['I have got it.', 'The man has got it.', 'Leo has got it.'], answer: 0, tip: 'Dijo: "He hasn\'t got the clock. I have got it!".', tags: ['terraza'] }),
  { id: 'tz-no2', topic: 'to-be', kind: 'order', prompt: 'No tengo miedo.', options: ['I', 'am', 'not', 'afraid.'], answer: 0, tip: 'I + am + not + afraid.', tags: ['terraza'] },

  // ── Fase 3 · The Future: going to (afirmativo, negativo y preguntas) ──
  { id: 'tz-f01', topic: 'going-to', prompt: 'I ___ going to take your clock.', options: ['am', 'is', 'are'], answer: 0, tip: 'Con I: am going to.', tags: ['terraza'] },
  { id: 'tz-f02', topic: 'going-to-neg', prompt: "No! You ___ going to take it!", options: ["aren't", "isn't", "don't"], answer: 0, tip: "Negativo con you: aren't going to.", tags: ['terraza'] },
  { id: 'tz-f03', topic: 'going-to-wh', prompt: 'What ___ you going to do with the clock?', options: ['are', 'is', 'do'], answer: 0, tip: 'Pregunta: What + are + you + going to...?', tags: ['terraza'] },
  { id: 'tz-f04', topic: 'going-to', prompt: 'We are going to ___ you.', options: ['stop', 'stops', 'stopping'], answer: 0, tip: 'Después de going to, el verbo va simple: stop.', tags: ['terraza'] },
  { id: 'tz-f05', topic: 'going-to-wh', prompt: '___ he going to come back? — Yes, he is.', options: ['Is', 'Are', 'Does'], answer: 0, tip: 'Pregunta con he: Is he going to...?', tags: ['terraza'] },
  { id: 'tz-ff1', topic: 'going-to-neg', kind: 'fix', prompt: 'I not going to give you my voice!', options: ["I'm not going to give you my voice!", "I don't going to give you my voice!", "I isn't going to give you my voice!"], answer: 0, tip: "Negativo con I: I'm not (I am not) going to.", tags: ['terraza'] },
  { id: 'tz-ff2', topic: 'going-to-wh', kind: 'fix', prompt: 'Where you are going to go?', options: ['Where are you going to go?', 'Where you going to go?', 'Where is you going to go?'], answer: 0, tip: 'En la pregunta, are va antes de you: Where are you going to...?', tags: ['terraza'] },
  { id: 'tz-w01', topic: 'want-to', prompt: 'I want ___ keep my clock.', options: ['to', 'for', '—'], answer: 0, tip: 'want + to + verbo: I want to keep...', tags: ['terraza'] },
  { id: 'tz-wf1', topic: 'want-to', kind: 'fix', prompt: 'Would you like give me the clock?', options: ['Would you like to give me the clock?', 'Would you like giving me the clock?', 'Do you would like to give me the clock?'], answer: 0, tip: 'Would you like + to + verbo...?', tags: ['terraza'] },
  L({ id: 'tz-fl1', topic: 'going-to', audio: "I'm going to take the clock. Then I'm going to leave this tower. You are not going to stop me.", voice: 'male', prompt: 'What is he going to take?', options: ['The clock.', 'The elevator.', 'The key.'], answer: 0, tip: 'Dijo: "I\'m going to take the clock".', tags: ['terraza'] }),
  L({ id: 'tz-fl2', topic: 'want-to', audio: "I don't want to fight. I would like to go home with my friends.", voice: 'female', prompt: 'What would she like to do?', options: ['Go home with her friends.', 'Fight the man.', 'Stay on the terrace.'], answer: 0, tip: 'Dijo: "I would like to go home with my friends".', tags: ['terraza'] }),
  { id: 'tz-fo1', topic: 'going-to', kind: 'order', prompt: 'Voy a hablar otra vez.', options: ['I', 'am', 'going', 'to', 'talk', 'again.'], answer: 0, tip: 'I + am + going to + verbo.', tags: ['terraza'] },
  { id: 'tz-fo2', topic: 'going-to-wh', kind: 'order', prompt: '¿Vas a volver?', options: ['Are', 'you', 'going', 'to', 'come', 'back?'], answer: 0, tip: 'Pregunta: Are + you + going to + verbo?', tags: ['terraza'] },
]
