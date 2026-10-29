import type { Question } from '../game/types'

/**
 * Preguntas del futuro de A1.
 * Etiquetas: aula-futuro, patio-futuro, direccion-futuro.
 */
export const FUTURE_QUESTIONS: Question[] = [
  // ── going to (planes): la escuela en 2056 ──
  { id: 'gt-01', topic: 'going-to', prompt: 'Tomorrow I ___ going to study English.', options: ['am', 'is', 'are'], answer: 0, tip: 'I + am going to.', tags: ['aula-futuro'] },
  { id: 'gt-02', topic: 'going-to', prompt: 'Theo ___ going to be an astronaut.', options: ['is', 'are', 'am'], answer: 0, tip: 'He / she (Theo) + is going to.', tags: ['aula-futuro'] },
  { id: 'gt-03', topic: 'going-to', prompt: 'We are going ___ play football after school.', options: ['to', 'for', '—'], answer: 0, tip: 'going TO + verbo: going to play.', tags: ['patio-futuro'] },
  { id: 'gt-04', topic: 'going-to', prompt: 'They are going to ___ a new robot.', options: ['buy', 'buys', 'buying'], answer: 0, tip: 'Después de going to, el verbo va simple: buy.', tags: ['direccion-futuro'] },
  { id: 'gt-05', topic: 'going-to', prompt: 'The students ___ going to read a story.', options: ['are', 'is', 'am'], answer: 0, tip: 'Varios (they) + are going to.', tags: ['aula-futuro'] },
  { id: 'gt-06', topic: 'going-to', prompt: 'Mr. Garcia is going to ___ a new lesson tomorrow.', options: ['teach', 'teaches', 'taught'], answer: 0, tip: 'going to + verbo simple: teach.', tags: ['aula-futuro'] },
  { id: 'gt-07', topic: 'going-to', prompt: "It's going ___ be a great day!", options: ['to', 'at', 'for'], answer: 0, tip: 'going to be.', tags: ['patio-futuro'] },
  { id: 'gt-08', topic: 'going-to', prompt: 'I am going to visit my grandma ___ week.', options: ['next', 'last', 'ago'], answer: 0, tip: 'Futuro: next week (la próxima semana). Last week es pasado.', tags: ['patio-futuro'] },
  { id: 'gt-09', topic: 'going-to', prompt: 'She is going to call you ___.', options: ['tomorrow', 'yesterday', 'last night'], answer: 0, tip: 'Futuro: tomorrow (mañana).', tags: ['direccion-futuro'] },
  { id: 'gt-10', topic: 'going-to', prompt: 'You ___ going to love this school!', options: ['are', 'is', 'am'], answer: 0, tip: 'You + are going to.', tags: ['patio-futuro'] },
  { id: 'gt-11', topic: 'going-to', prompt: 'The robot is going to ___ the classroom tonight.', options: ['clean', 'cleans', 'cleaned'], answer: 0, tip: 'going to + clean.', tags: ['aula-futuro'] },
  { id: 'gt-12', topic: 'going-to', prompt: "___ going to be a teacher one day.", options: ["I'm", 'I', "I'm go"], answer: 0, tip: "I'm = I am: I'm going to...", tags: ['aula-futuro'] },
  { id: 'gt-13', topic: 'going-to', prompt: 'Look at the sky! It ___ going to rain.', options: ['is', 'are', 'am'], answer: 0, tip: 'It + is going to.', tags: ['patio-futuro'] },
  { id: 'gt-14', topic: 'going-to', prompt: 'Zoe and I ___ going to sing a song.', options: ['are', 'is', 'am'], answer: 0, tip: 'Zoe and I = we: are going to.', tags: ['patio-futuro'] },
  { id: 'gt-15', topic: 'going-to', prompt: 'Next year my class is going to ___ to the farm.', options: ['go', 'goes', 'went'], answer: 0, tip: 'going to + go.', tags: ['aula-futuro'] },
  { id: 'gt-16', topic: 'going-to', prompt: 'Yesterday I ___ tired, but tomorrow I am going to rest.', options: ['was', 'am', 'going to'], answer: 0, tip: 'Yesterday = pasado: was. Tomorrow = futuro: going to.', tags: ['patio-futuro'] },
  { id: 'gt-17', topic: 'going-to', prompt: 'GRIMM-BOT is going to ___ the classes at eight.', options: ['start', 'starts', 'started'], answer: 0, tip: 'going to + start.', tags: ['direccion-futuro'] },
  { id: 'gt-18', topic: 'going-to', prompt: 'My dad ___ going to make pizza tonight.', options: ['is', 'are', 'be'], answer: 0, tip: 'He + is going to.', tags: ['patio-futuro'] },

  { id: 'gtf-01', topic: 'going-to', kind: 'fix', prompt: 'I going to be an astronaut!', options: ['I am going to be an astronaut.', 'I is going to be an astronaut.', 'I going to am an astronaut.'], answer: 0, tip: 'Falta am: I am going to...', tags: ['aula-futuro'] },
  { id: 'gtf-02', topic: 'going-to', kind: 'fix', prompt: 'Tomorrow I am go to fly!', options: ['Tomorrow I am going to fly.', 'Tomorrow I am go fly.', 'Tomorrow I going fly.'], answer: 0, tip: 'Es going to (con -ing y to): I am going to fly.', tags: ['aula-futuro'] },
  { id: 'gtf-03', topic: 'going-to', kind: 'fix', prompt: 'I am going to cancels the classes!', options: ['I am going to cancel the classes.', 'I am going cancel the classes.', 'I going to cancel the classes.'], answer: 0, tip: 'Después de going to, sin -s: cancel.', tags: ['direccion-futuro'] },
  { id: 'gtf-04', topic: 'going-to', kind: 'fix', prompt: 'The students is going to stay home!', options: ['The students are going to stay home.', 'The students am going to stay home.', 'The students is go to stay home.'], answer: 0, tip: 'Varios estudiantes: are going to.', tags: ['direccion-futuro'] },
  { id: 'gtf-05', topic: 'going-to', kind: 'fix', prompt: 'She are going to teach tomorrow!', options: ['She is going to teach tomorrow.', 'She going to teach tomorrow.', 'She is going teach tomorrow.'], answer: 0, tip: 'She + is going to.', tags: ['aula-futuro'] },
  { id: 'gtf-06', topic: 'going-to', kind: 'fix', prompt: 'We are going to played football!', options: ['We are going to play football.', 'We are going to playing football.', 'We going to play football.'], answer: 0, tip: 'going to + play (verbo simple).', tags: ['patio-futuro'] },
  { id: 'gtf-07', topic: 'going-to', kind: 'fix', prompt: 'I am going to visit you last week!', options: ['I am going to visit you next week.', 'I visited you next week.', 'I am going to visited you last week.'], answer: 0, tip: 'Futuro con next week; last week es pasado.', tags: ['patio-futuro'] },

  { id: 'gto-01', topic: 'going-to', kind: 'order', prompt: 'Mañana voy a estudiar inglés.', options: ['Tomorrow', 'I', 'am', 'going', 'to', 'study', 'English.'], answer: 0, tip: 'Tomorrow + I + am going to + study...', tags: ['aula-futuro'] },
  { id: 'gto-02', topic: 'going-to', kind: 'order', prompt: 'Ella va a ser profesora.', options: ['She', 'is', 'going', 'to', 'be', 'a', 'teacher.'], answer: 0, tip: 'She + is going to + be...', tags: ['aula-futuro'] },
  { id: 'gto-03', topic: 'going-to', kind: 'order', prompt: 'Vamos a jugar en el patio.', options: ['We', 'are', 'going', 'to', 'play', 'in', 'the', 'yard.'], answer: 0, tip: 'We + are going to + play...', tags: ['patio-futuro'] },
  { id: 'gto-04', topic: 'going-to', kind: 'order', prompt: 'El robot va a limpiar esta noche.', options: ['The', 'robot', 'is', 'going', 'to', 'clean', 'tonight.'], answer: 0, tip: 'The robot + is going to + clean + tonight.', tags: ['direccion-futuro'] },
  // ── going to en negativo y en preguntas: la ciudad en 2056 ──
  { id: 'gn-01', topic: 'going-to-neg', prompt: "She ___ going to buy the jacket. It's too expensive.", options: ["isn't", "aren't", "not"], answer: 0, tip: "She + isn't going to.", tags: ['tienda'] },
  { id: 'gn-02', topic: 'going-to-neg', prompt: "I ___ going to take the bus. I'm going to walk.", options: ["am not", "isn't", "not"], answer: 0, tip: "I + am not going to (I'm not going to).", tags: ['calle-futuro'] },
  { id: 'gn-03', topic: 'going-to-neg', prompt: "The robots ___ going to close the café.", options: ["aren't", "isn't", "don't"], answer: 0, tip: "Varios (they): aren't going to.", tags: ['cafe'] },
  { id: 'gn-04', topic: 'going-to-neg', prompt: '___ you going to visit the fountain?', options: ['Are', 'Is', 'Do'], answer: 0, tip: 'Pregunta con you: Are you going to...?', tags: ['calle-futuro'] },
  { id: 'gn-05', topic: 'going-to-neg', prompt: '___ Marco going to show us the city?', options: ['Is', 'Are', 'Does'], answer: 0, tip: 'Pregunta con he (Marco): Is Marco going to...?', tags: ['calle-futuro'] },
  { id: 'gn-06', topic: 'going-to-neg', prompt: 'Are you going to order a coffee? — Yes, I ___.', options: ['am', 'do', 'going'], answer: 0, tip: 'Respuesta corta: Yes, I am.', tags: ['cafe'] },
  { id: 'gn-07', topic: 'going-to-neg', prompt: "Is it going to rain? — No, it ___.", options: ["isn't", "doesn't", "aren't"], answer: 0, tip: "Respuesta corta: No, it isn't.", tags: ['calle-futuro'] },
  { id: 'gn-08', topic: 'going-to-neg', prompt: 'Are they going to fly to the Sky Tower? — Yes, they ___.', options: ['are', 'is', 'do'], answer: 0, tip: 'Respuesta corta: Yes, they are.', tags: ['turismo-futuro'] },
  { id: 'gn-09', topic: 'going-to-neg', prompt: 'What ___ you going to buy?', options: ['are', 'is', 'do'], answer: 0, tip: 'What + are + you + going to...?', tags: ['tienda'] },
  { id: 'gn-10', topic: 'going-to-neg', prompt: "We ___ going to get lost. We have holo-glasses!", options: ["aren't", "isn't", "am not"], answer: 0, tip: "We + aren't going to.", tags: ['calle-futuro'] },
  { id: 'gn-11', topic: 'going-to-neg', prompt: "Is the mayor going to close the streets? — No, he ___.", options: ["isn't", "doesn't", "not"], answer: 0, tip: "No, he isn't.", tags: ['turismo-futuro'] },
  { id: 'gn-12', topic: 'going-to-neg', prompt: "Danny isn't going to ___ the fountain.", options: ['close', 'closes', 'closed'], answer: 0, tip: "isn't going to + close (verbo simple).", tags: ['turismo-futuro'] },
  { id: 'gn-13', topic: 'going-to-neg', prompt: 'Are you going to ___ the Sky Bus?', options: ['take', 'took', 'takes'], answer: 0, tip: 'going to + take.', tags: ['calle-futuro'] },
  { id: 'gn-14', topic: 'going-to-neg', prompt: "Is Chloe going to sell the holo-jacket? — Yes, she ___.", options: ['is', 'does', 'are'], answer: 0, tip: 'Yes, she is.', tags: ['tienda'] },
  { id: 'gn-15', topic: 'going-to-neg', prompt: 'Where ___ the tourists going to eat?', options: ['are', 'is', 'do'], answer: 0, tip: 'Where + are + the tourists + going to...?', tags: ['cafe'] },
  { id: 'gn-16', topic: 'going-to-neg', prompt: "The coffee ___ going to be cold. Don't worry!", options: ["isn't", "aren't", "not"], answer: 0, tip: "The coffee (it): isn't going to.", tags: ['cafe'] },

  { id: 'gnf-01', topic: 'going-to-neg', kind: 'fix', prompt: "I not going to serve you!", options: ["I'm not going to serve you.", "I don't going to serve you.", "I not go to serve you."], answer: 0, tip: "Negativo: I'm not going to.", tags: ['cafe'] },
  { id: 'gnf-02', topic: 'going-to-neg', kind: 'fix', prompt: 'You going to buy this?', options: ['Are you going to buy this?', 'Do you going to buy this?', 'You are going buy this?'], answer: 0, tip: 'Pregunta: Are you going to...?', tags: ['tienda'] },
  { id: 'gnf-03', topic: 'going-to-neg', kind: 'fix', prompt: "These shoes isn't going to fit you!", options: ["These shoes aren't going to fit you.", "These shoes don't going to fit you.", "These shoes isn't go to fit you."], answer: 0, tip: "Varios zapatos: aren't.", tags: ['tienda'] },
  { id: 'gnf-04', topic: 'going-to-neg', kind: 'fix', prompt: "You isn't going to find the fountain!", options: ["You aren't going to find the fountain.", "You not going to find the fountain.", "You isn't going find the fountain."], answer: 0, tip: "You + aren't going to.", tags: ['turismo-futuro'] },
  { id: 'gnf-05', topic: 'going-to-neg', kind: 'fix', prompt: 'Are you going to visit my city? — Yes, I going!', options: ['Are you going to visit my city? — Yes, I am!', 'Are you going to visit my city? — Yes, I do!', 'Do you going to visit my city? — Yes, I am!'], answer: 0, tip: 'Respuesta corta: Yes, I am.', tags: ['turismo-futuro'] },
  { id: 'gnf-06', topic: 'going-to-neg', kind: 'fix', prompt: 'Does she going to come?', options: ['Is she going to come?', 'Does she go to come?', 'She is going to come?'], answer: 0, tip: 'Con going to no se usa do / does: Is she going to...?', tags: ['calle-futuro'] },

  { id: 'gno-01', topic: 'going-to-neg', kind: 'order', prompt: 'No voy a tomar el bus.', options: ["I'm", 'not', 'going', 'to', 'take', 'the', 'bus.'], answer: 0, tip: "I'm + not + going to + take...", tags: ['calle-futuro'] },
  { id: 'gno-02', topic: 'going-to-neg', kind: 'order', prompt: '¿Vas a visitar la fuente?', options: ['Are', 'you', 'going', 'to', 'visit', 'the', 'fountain?'], answer: 0, tip: 'Are + you + going to + visit...?', tags: ['calle-futuro'] },
  { id: 'gno-03', topic: 'going-to-neg', kind: 'order', prompt: 'Ellos no van a cerrar el café.', options: ['They', "aren't", 'going', 'to', 'close', 'the', 'café.'], answer: 0, tip: "They + aren't + going to + close...", tags: ['cafe'] },
  { id: 'gno-04', topic: 'going-to-neg', kind: 'order', prompt: '¿Qué vas a comprar?', options: ['What', 'are', 'you', 'going', 'to', 'buy?'], answer: 0, tip: 'What + are + you + going to + buy?', tags: ['tienda'] },
]
