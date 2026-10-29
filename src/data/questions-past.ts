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

  // ── Pasado de los verbos regulares (-ed): la ciudad de 1996 ──
  { id: 'prg-01', topic: 'past-regular', prompt: 'Yesterday I ___ to the market.', options: ['walked', 'walk', 'walks'], answer: 0, tip: 'Yesterday (ayer) = pasado: walk → walked.', tags: ['calle-vieja'] },
  { id: 'prg-02', topic: 'past-regular', prompt: 'Tony ___ fifty boxes yesterday.', options: ['delivers', 'delivered', 'deliverred'], answer: 1, tip: 'Pasado: deliver + ed = delivered (no se dobla la r).', tags: ['calle-vieja'] },
  { id: 'prg-03', topic: 'past-regular', prompt: 'We ___ football last Saturday.', options: ['played', 'plaied', 'play'], answer: 0, tip: 'Vocal + y: solo se agrega -ed: played.', tags: ['calle-vieja'] },
  { id: 'prg-04', topic: 'past-regular', prompt: 'Betty ___ English last night.', options: ['studyed', 'studied', 'study'], answer: 1, tip: 'Consonante + y: la y cambia a -ied: study → studied.', tags: ['correo'] },
  { id: 'prg-05', topic: 'past-regular', prompt: 'The bus ___ at the well.', options: ['stoped', 'stopped', 'stops'], answer: 1, tip: 'Verbo corto (consonante-vocal-consonante): se dobla la última letra: stop → stopped.', tags: ['calle-vieja'] },
  { id: 'prg-06', topic: 'past-regular', prompt: 'They ___ in a small house in 1996.', options: ['lived', 'liveed', 'live'], answer: 0, tip: 'Si el verbo termina en e, solo se agrega -d: live → lived.', tags: ['tienda-vieja'] },
  { id: 'prg-07', topic: 'past-regular', prompt: 'Mrs. Rossi ___ the market at six.', options: ['open', 'opened', 'openned'], answer: 1, tip: 'open → opened. No se dobla la n: el acento va en "O-pen".', tags: ['mercado'] },
  { id: 'prg-08', topic: 'past-regular', prompt: 'I ___ my grandma last week.', options: ['visited', 'visit', 'visitted'], answer: 0, tip: 'Last week = pasado: visit → visited.', tags: ['tienda-vieja'] },
  { id: 'prg-09', topic: 'past-regular', prompt: 'She ___ the letter to her friend.', options: ['posted', 'post', 'postted'], answer: 0, tip: 'post → posted (enviar por correo).', tags: ['correo'] },
  { id: 'prg-10', topic: 'past-regular', prompt: 'He ___ the box to the shop.', options: ['carryed', 'carried', 'carries'], answer: 1, tip: 'Consonante + y → -ied: carry → carried.', tags: ['calle-vieja'] },
  { id: 'prg-11', topic: 'past-regular', prompt: 'We ___ for the bus for an hour.', options: ['waited', 'waitted', 'wait'], answer: 0, tip: 'wait → waited (dos vocales antes de la t: no se dobla).', tags: ['calle-vieja'] },
  { id: 'prg-12', topic: 'past-regular', prompt: 'I ___ the radio yesterday evening.', options: ['listened to', 'listen to', 'listened'], answer: 0, tip: 'listen to + algo, y en pasado: listened to.', tags: ['tienda-vieja'] },
  { id: 'prg-13', topic: 'past-regular', prompt: "The shop ___ at five o'clock yesterday.", options: ['closes', 'closed', 'closeed'], answer: 1, tip: 'Termina en e: solo -d: close → closed.', tags: ['tienda-vieja'] },
  { id: 'prg-14', topic: 'past-regular', prompt: 'Mr. Lopez ___ me with the apples.', options: ['helped', 'helpped', 'help'], answer: 0, tip: 'help → helped (no se dobla: termina en dos consonantes, l y p).', tags: ['mercado'] },
  { id: 'prg-15', topic: 'past-regular', prompt: 'Two days ___, I painted my room.', options: ['ago', 'last', 'yesterday'], answer: 0, tip: 'Ago va después del tiempo: two days ago (hace dos días).', tags: ['tienda-vieja'] },
  { id: 'prg-16', topic: 'past-regular', prompt: 'I cleaned the stall ___ week.', options: ['last', 'ago', 'yesterday'], answer: 0, tip: 'Last week = la semana pasada.', tags: ['mercado'] },
  { id: 'prg-17', topic: 'past-regular', prompt: 'The children ___ at the funny horse.', options: ['laughed', 'laught', 'laughs'], answer: 0, tip: 'laugh → laughed (reírse).', tags: ['calle-vieja'] },
  { id: 'prg-18', topic: 'past-regular', prompt: 'Betty ___ to read my address.', options: ['tryed', 'tried', 'tries'], answer: 1, tip: 'Consonante + y → -ied: try → tried.', tags: ['correo'] },
  { id: 'prg-19', topic: 'past-regular', prompt: 'I ___ my friend from the phone box.', options: ['called', 'calld', 'callt'], answer: 0, tip: 'call → called.', tags: ['calle-vieja'] },
  { id: 'prg-20', topic: 'past-regular', prompt: 'Yesterday it ___ all day.', options: ['rained', 'rainned', 'rains'], answer: 0, tip: 'rain → rained (llover).', tags: ['calle-vieja'] },
  { id: 'prg-21', topic: 'past-regular', prompt: 'Mrs. Rossi ___ at everybody this morning.', options: ['shouted', 'shout', 'shoutted'], answer: 0, tip: 'shout → shouted (gritar). Suena /ɪd/ porque termina en t.', tags: ['mercado'] },
  { id: 'prg-22', topic: 'past-regular', prompt: 'We ___ the letters into the mailbox.', options: ['dropped', 'droped', 'drop'], answer: 0, tip: 'Corto, consonante-vocal-consonante: drop → dropped.', tags: ['correo'] },

  { id: 'prgf-01', topic: 'past-regular', kind: 'fix', prompt: 'Yesterday I walk to the market!', options: ['Yesterday I walked to the market.', 'Yesterday I walkt to the market.', 'Yesterday I walking to the market.'], answer: 0, tip: 'Con yesterday, el verbo va en pasado: walked.', tags: ['calle-vieja'] },
  { id: 'prgf-02', topic: 'past-regular', kind: 'fix', prompt: 'I studyed the map!', options: ['I studied the map.', 'I studed the map.', 'I study the map yesterday.'], answer: 0, tip: 'study → studied (y → ied).', tags: ['correo'] },
  { id: 'prgf-03', topic: 'past-regular', kind: 'fix', prompt: 'The bus stoped here!', options: ['The bus stopped here.', 'The bus stops here yesterday.', 'The bus stopt here.'], answer: 0, tip: 'stop → stopped (se dobla la p).', tags: ['calle-vieja'] },
  { id: 'prgf-04', topic: 'past-regular', kind: 'fix', prompt: 'She plaied the piano!', options: ['She played the piano.', 'She plaid the piano.', 'She playied the piano.'], answer: 0, tip: 'Vocal + y: play → played.', tags: ['tienda-vieja'] },
  { id: 'prgf-05', topic: 'past-regular', kind: 'fix', prompt: 'Last week we visit Grandma!', options: ['Last week we visited Grandma.', 'Last week we visitted Grandma.', 'Last week we visiting Grandma.'], answer: 0, tip: 'Last week = pasado: visited.', tags: ['tienda-vieja'] },
  { id: 'prgf-06', topic: 'past-regular', kind: 'fix', prompt: 'He liveed in the city!', options: ['He lived in the city.', 'He livd in the city.', 'He lives in the city last year.'], answer: 0, tip: 'live termina en e: solo -d: lived.', tags: ['calle-vieja'] },
  { id: 'prgf-07', topic: 'past-regular', kind: 'fix', prompt: 'I openned the shop!', options: ['I opened the shop.', 'I open the shop yesterday.', 'I opend the shop.'], answer: 0, tip: 'open → opened: no se dobla la n.', tags: ['mercado'] },
  { id: 'prgf-08', topic: 'past-regular', kind: 'fix', prompt: 'Tony carryed the boxes!', options: ['Tony carried the boxes.', 'Tony carryd the boxes.', 'Tony carries the boxes yesterday.'], answer: 0, tip: 'carry → carried (y → ied).', tags: ['calle-vieja'] },

  { id: 'prgo-01', topic: 'past-regular', kind: 'order', prompt: 'Ayer caminé al mercado.', options: ['Yesterday', 'I', 'walked', 'to', 'the', 'market.'], answer: 0, tip: 'Yesterday + I + walked + ...', tags: ['calle-vieja'] },
  { id: 'prgo-02', topic: 'past-regular', kind: 'order', prompt: 'Ella estudió inglés anoche.', options: ['She', 'studied', 'English', 'last', 'night.'], answer: 0, tip: 'She + studied + English + last night.', tags: ['correo'] },
  { id: 'prgo-03', topic: 'past-regular', kind: 'order', prompt: 'Esperamos el autobús.', options: ['We', 'waited', 'for', 'the', 'bus.'], answer: 0, tip: 'wait for = esperar: We waited for the bus.', tags: ['calle-vieja'] },
  { id: 'prgo-04', topic: 'past-regular', kind: 'order', prompt: 'Visité a mi abuela hace dos días.', options: ['I', 'visited', 'my', 'grandma', 'two', 'days', 'ago.'], answer: 0, tip: 'El tiempo + ago va al final: two days ago.', tags: ['tienda-vieja'] },
  { id: 'prgo-05', topic: 'past-regular', kind: 'order', prompt: 'Tony entregó el pan.', options: ['Tony', 'delivered', 'the', 'bread.'], answer: 0, tip: 'Tony + delivered + the bread.', tags: ['calle-vieja'] },
]
