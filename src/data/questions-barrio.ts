import type { Question } from '../game/types'

/**
 * Preguntas del barrio (Green Street), A1 en presente.
 * Mismo formato que questions.ts. Etiquetas: casa-leo, casa-maya, parque, barrio, casa.
 */
export const BARRIO_QUESTIONS: Question[] = [
  // ── Presente simple: afirmativo con -s y frecuencia ─────
  { id: 'ps-01', topic: 'present-simple', prompt: 'Leo ___ to school by bus.', options: ['go', 'goes', 'going'], answer: 1, tip: 'Con he, she, it (Leo) el verbo lleva -s o -es: go → goes.', tags: ['casa-leo'] },
  { id: 'ps-02', topic: 'present-simple', prompt: 'His dad ___ in a hospital.', options: ['works', 'work', 'is work'], answer: 0, tip: '"His dad" es "he", así que el verbo lleva -s: works.', tags: ['casa-leo'] },
  { id: 'ps-03', topic: 'present-simple', prompt: 'I ___ up at seven every day.', options: ['gets', 'getting', 'get'], answer: 2, tip: 'Con I, you, we, they el verbo va sin -s: I get up.', tags: ['casa'] },
  { id: 'ps-04', topic: 'present-simple', prompt: 'My mom ___ TV in the evening.', options: ['watchs', 'watches', 'watch'], answer: 1, tip: 'Después de -ch se agrega -es: watch → watches.', tags: ['casa'] },
  { id: 'ps-05', topic: 'present-simple', prompt: 'Emma ___ the guitar every afternoon.', options: ['plays', 'play', 'playes'], answer: 0, tip: 'Con "she" (Emma) va -s: plays. Después de vocal + y solo se agrega -s.', tags: ['casa-leo'] },
  { id: 'ps-06', topic: 'present-simple', prompt: 'We ___ dinner at eight.', options: ['has', 'have', 'haves'], answer: 1, tip: 'Con "we" va "have". "Has" es solo para he, she, it.', tags: ['casa'] },
  { id: 'ps-07', topic: 'present-simple', prompt: 'My brother ___ his homework at night.', options: ['do', 'dos', 'does'], answer: 2, tip: 'Do con he, she, it es "does".', tags: ['casa'] },
  { id: 'ps-08', topic: 'present-simple', prompt: 'The baby ___ a lot.', options: ['cries', 'crys', 'cry'], answer: 0, tip: 'Consonante + y: la y cambia a -ies. cry → cries.', tags: ['barrio'] },
  { id: 'ps-09', topic: 'present-simple', prompt: 'I ___ late for school. I am always on time!', options: ['always am', 'never am', 'am never'], answer: 2, tip: 'Con el verbo to be, la frecuencia va después: I am never late.', tags: ['casa'] },
  { id: 'ps-10', topic: 'present-simple', prompt: 'She ___ coffee. She loves it!', options: ['always drinks', 'drinks always', 'always drink'], answer: 0, tip: 'La frecuencia va antes del verbo normal: she always drinks.', tags: ['barrio'] },
  { id: 'ps-11', topic: 'present-simple', prompt: 'My dog ___ in the garden.', options: ['sleep', 'sleeps', 'sleepes'], answer: 1, tip: '"My dog" es "it", así que va -s: sleeps.', tags: ['casa-leo'] },
  { id: 'ps-12', topic: 'present-simple', prompt: 'Mr. Hill ___ at the window all day.', options: ['sits', 'sit', 'sitting'], answer: 0, tip: 'Con "he" (Mr. Hill) el verbo lleva -s: sits.', tags: ['barrio'] },
  { id: 'ps-13', topic: 'present-simple', prompt: 'They ___ in a big house on Green Street.', options: ['lives', 'live', 'living'], answer: 1, tip: 'Con "they" el verbo va sin -s: they live.', tags: ['barrio'] },
  { id: 'ps-14', topic: 'present-simple', prompt: 'Every morning, Leo ___ his teeth.', options: ['brushs', 'brush', 'brushes'], answer: 2, tip: 'Después de -sh se agrega -es: brush → brushes.', tags: ['casa-leo'] },

  { id: 'psf-01', topic: 'present-simple', kind: 'fix', prompt: 'My mom go to work at eight!', options: ['My mom goes to work at eight.', 'My mom going to work at eight.', 'My mom gos to work at eight.'], answer: 0, tip: '"My mom" es "she": el verbo lleva -es: goes.', tags: ['casa'] },
  { id: 'psf-02', topic: 'present-simple', kind: 'fix', prompt: 'Dad cook dinner every day!', options: ['Dad cooking dinner every day.', 'Dad cooks dinner every day.', 'Dad is cook dinner every day.'], answer: 1, tip: 'Con he, she, it el verbo lleva -s: Dad cooks.', tags: ['casa'] },
  { id: 'psf-03', topic: 'present-simple', kind: 'fix', prompt: 'I gets up at six!', options: ['I get up at six.', 'I am get up at six.', 'I getting up at six.'], answer: 0, tip: 'Con "I" el verbo va sin -s: I get up.', tags: ['casa'] },
  { id: 'psf-04', topic: 'present-simple', kind: 'fix', prompt: 'She watchs TV every night!', options: ['She watch TV every night.', 'She watches TV every night.', 'She is watch TV every night.'], answer: 1, tip: 'Después de -ch se agrega -es: watches.', tags: ['casa'] },
  { id: 'psf-05', topic: 'present-simple', kind: 'fix', prompt: 'My sister studys English!', options: ['My sister studies English.', 'My sister study English.', 'My sister studying English.'], answer: 0, tip: 'Consonante + y: study → studies.', tags: ['casa-leo'] },
  { id: 'psf-06', topic: 'present-simple', kind: 'fix', prompt: 'I eat always breakfast!', options: ['I eat breakfast always.', 'Always I eat breakfast.', 'I always eat breakfast.'], answer: 2, tip: 'La frecuencia (always, usually, never) va antes del verbo: I always eat.', tags: ['casa'] },
  { id: 'psf-07', topic: 'present-simple', kind: 'fix', prompt: 'He is never go to the park!', options: ['He never goes to the park.', 'He never go to the park.', 'He goes never to the park.'], answer: 0, tip: 'Sin "is": he never goes. La frecuencia va antes del verbo y el verbo lleva -es.', tags: ['barrio'] },
  { id: 'psf-08', topic: 'present-simple', kind: 'fix', prompt: 'We has a dog!', options: ['We haves a dog.', 'We have a dog.', 'We having a dog.'], answer: 1, tip: 'Con "we" va "have". "Has" es solo para he, she, it.', tags: ['casa'] },
  { id: 'psf-09', topic: 'present-simple', kind: 'fix', prompt: 'Leo live on Green Street!', options: ['Leo lives on Green Street.', 'Leo living on Green Street.', 'Leo is live on Green Street.'], answer: 0, tip: 'Con "he" (Leo) va -s: lives.', tags: ['barrio'] },

  { id: 'pso-01', topic: 'present-simple', kind: 'order', prompt: 'Mi papá trabaja en un hospital.', options: ['My', 'dad', 'works', 'in', 'a', 'hospital.'], answer: 0, tip: 'Sujeto + verbo con -s + lugar: My dad works in a hospital.', tags: ['casa-leo'] },
  { id: 'pso-02', topic: 'present-simple', kind: 'order', prompt: 'Siempre me levanto a las siete.', options: ['I', 'always', 'get', 'up', 'at', 'seven.'], answer: 0, tip: 'La frecuencia va entre el sujeto y el verbo: I always get up.', tags: ['casa'] },
  { id: 'pso-03', topic: 'present-simple', kind: 'order', prompt: 'Ella toca la guitarra.', options: ['She', 'plays', 'the', 'guitar.'], answer: 0, tip: 'Con "she" el verbo lleva -s: She plays.', tags: ['casa-leo'] },
  { id: 'pso-04', topic: 'present-simple', kind: 'order', prompt: 'Leo vive en Green Street.', options: ['Leo', 'lives', 'on', 'Green', 'Street.'], answer: 0, tip: 'Leo + lives + on + calle.', tags: ['barrio'] },
  { id: 'pso-05', topic: 'present-simple', kind: 'order', prompt: 'Nunca llego tarde.', options: ['I', 'am', 'never', 'late.'], answer: 0, tip: 'Con to be, la frecuencia va después: I am never late.', tags: ['casa'] },
  { id: 'pso-06', topic: 'present-simple', kind: 'order', prompt: 'Normalmente cenamos a las ocho.', options: ['We', 'usually', 'have', 'dinner', 'at', 'eight.'], answer: 0, tip: 'Sujeto + usually + verbo: We usually have dinner.', tags: ['casa'] },

  // ── Like / love / hate + -ing ───────────────────────────
  { id: 'lk-01', topic: 'likes', prompt: 'Maya loves ___ books.', options: ['read', 'reading', 'reads'], answer: 1, tip: 'Después de like, love y hate el verbo va con -ing: loves reading.', tags: ['casa-maya'] },
  { id: 'lk-02', topic: 'likes', prompt: 'I like ___ in the park.', options: ['running', 'run', 'runing'], answer: 0, tip: 'Verbo corto que termina en vocal + consonante: se dobla la consonante. run → running.', tags: ['parque'] },
  { id: 'lk-03', topic: 'likes', prompt: 'She hates ___ up early.', options: ['get', 'getting', 'geting'], answer: 1, tip: 'get → getting (se dobla la t). Después de hate va -ing.', tags: ['casa-maya'] },
  { id: 'lk-04', topic: 'likes', prompt: 'We love ___ pizza on Fridays.', options: ['eating', 'eat', 'eats'], answer: 0, tip: 'Después de love va -ing: love eating.', tags: ['barrio'] },
  { id: 'lk-05', topic: 'likes', prompt: 'My dad ___ cooking. He cooks every day.', options: ['love', 'loves', 'loving'], answer: 1, tip: '"My dad" es "he": loves (con -s).', tags: ['casa-maya'] },
  { id: 'lk-06', topic: 'likes', prompt: 'Do you like ___?', options: ['dance', 'danceing', 'dancing'], answer: 2, tip: 'Si el verbo termina en -e, la e se va: dance → dancing.', tags: ['parque'] },
  { id: 'lk-07', topic: 'likes', prompt: 'Mr. Hill ___ like music. He hates it!', options: ["don't", "doesn't", 'not'], answer: 1, tip: 'Negativo con he, she, it: doesn\'t + like.', tags: ['barrio'] },
  { id: 'lk-08', topic: 'likes', prompt: 'They like ___ to music.', options: ['listen', 'listening', 'listens'], answer: 1, tip: 'like + verbo con -ing: listening.', tags: ['barrio'] },
  { id: 'lk-09', topic: 'likes', prompt: 'I ___ swimming. It is my favorite sport!', options: ['love', 'hate', 'loves'], answer: 0, tip: 'Si es tu deporte favorito, lo amas: I love. Con "I" va sin -s.', tags: ['parque'] },

  { id: 'lkf-01', topic: 'likes', kind: 'fix', prompt: 'I like play football!', options: ['I like playing football.', 'I like plays football.', 'I likes playing football.'], answer: 0, tip: 'Después de like va el verbo con -ing: I like playing.', tags: ['parque'] },
  { id: 'lkf-02', topic: 'likes', kind: 'fix', prompt: 'I hate children play in the street!', options: ['I hate children playing in the street.', 'I hates children play in the street.', 'I hate children plays in the street.'], answer: 0, tip: 'Después de hate + persona, el verbo va con -ing: children playing.', tags: ['barrio'] },
  { id: 'lkf-03', topic: 'likes', kind: 'fix', prompt: 'She love reading!', options: ['She loving reading.', 'She loves reading.', 'She love read.'], answer: 1, tip: 'Con "she", love lleva -s: she loves.', tags: ['casa-maya'] },
  { id: 'lkf-04', topic: 'likes', kind: 'fix', prompt: 'He no likes dancing!', options: ["He doesn't like dancing.", "He don't like dancing.", 'He not likes dancing.'], answer: 0, tip: "Negativo con he, she, it: doesn't + like (sin -s).", tags: ['barrio'] },
  { id: 'lkf-05', topic: 'likes', kind: 'fix', prompt: 'We love swiming!', options: ['We love swim.', 'We love swimming.', 'We loves swimming.'], answer: 1, tip: 'swim → swimming: se dobla la m.', tags: ['parque'] },
  { id: 'lkf-06', topic: 'likes', kind: 'fix', prompt: 'I like writeing stories!', options: ['I like writing stories.', 'I like write stories.', 'I likes writing stories.'], answer: 0, tip: 'Si el verbo termina en -e, se quita: write → writing.', tags: ['casa-maya'] },

  { id: 'lko-01', topic: 'likes', kind: 'order', prompt: 'A Maya le encanta leer.', options: ['Maya', 'loves', 'reading.'], answer: 0, tip: 'Maya + loves + verbo con -ing.', tags: ['casa-maya'] },
  { id: 'lko-02', topic: 'likes', kind: 'order', prompt: 'Me gusta escuchar música.', options: ['I', 'like', 'listening', 'to', 'music.'], answer: 0, tip: 'I like + listening to music.', tags: ['barrio'] },
  { id: 'lko-03', topic: 'likes', kind: 'order', prompt: 'Él odia levantarse temprano.', options: ['He', 'hates', 'getting', 'up', 'early.'], answer: 0, tip: 'He hates + getting up.', tags: ['casa-maya'] },
  { id: 'lko-04', topic: 'likes', kind: 'order', prompt: '¿Te gusta bailar?', options: ['Do', 'you', 'like', 'dancing?'], answer: 0, tip: 'Pregunta: Do + you + like + -ing?', tags: ['parque'] },

  // ── Can / can't (habilidad) ─────────────────────────────
  { id: 'cn-01', topic: 'can', prompt: 'I can ___ very fast.', options: ['run', 'to run', 'running'], answer: 0, tip: 'Después de can va el verbo solo, sin "to": can run.', tags: ['parque'] },
  { id: 'cn-02', topic: 'can', prompt: 'Fish can swim, but they ___ walk.', options: ["don't", "can't", 'not can'], answer: 1, tip: 'El negativo de can es can\'t (cannot).', tags: ['parque'] },
  { id: 'cn-03', topic: 'can', prompt: '___ you ride a bike?', options: ['Do', 'Are', 'Can'], answer: 2, tip: 'Para preguntar por una habilidad: Can you...?', tags: ['parque'] },
  { id: 'cn-04', topic: 'can', prompt: 'Can your sister swim? — Yes, she ___.', options: ['can', 'does', 'is'], answer: 0, tip: 'La respuesta corta repite can: Yes, she can.', tags: ['parque'] },
  { id: 'cn-05', topic: 'can', prompt: 'Kevin ___ play the piano.', options: ['cans', 'can', 'can to'], answer: 1, tip: 'Can no cambia nunca: I can, he can, she can. Nunca "cans".', tags: ['parque'] },
  { id: 'cn-06', topic: 'can', prompt: 'Babies can\'t ___.', options: ['to drive', 'driving', 'drive'], answer: 2, tip: 'Después de can\'t va el verbo solo: can\'t drive.', tags: ['barrio'] },
  { id: 'cn-07', topic: 'can', prompt: 'Can you cook? — No, I ___.', options: ["don't", "can't", "am not"], answer: 1, tip: 'Respuesta corta negativa: No, I can\'t.', tags: ['casa'] },
  { id: 'cn-08', topic: 'can', prompt: 'My grandpa can ___ three languages.', options: ['speak', 'speaks', 'speaking'], answer: 0, tip: 'Después de can el verbo no lleva -s: can speak.', tags: ['parque'] },
  { id: 'cn-09', topic: 'can', prompt: 'Birds can ___.', options: ['fly', 'flies', 'to fly'], answer: 0, tip: 'can + verbo base: can fly.', tags: ['parque'] },

  { id: 'cnf-01', topic: 'can', kind: 'fix', prompt: 'I can to swim!', options: ['I can swim.', 'I can swimming.', 'I cans swim.'], answer: 0, tip: 'Después de can no va "to": I can swim.', tags: ['parque'] },
  { id: 'cnf-02', topic: 'can', kind: 'fix', prompt: 'He cans jump very high!', options: ['He can jumps very high.', 'He can jump very high.', 'He can to jump very high.'], answer: 1, tip: 'Can es igual con todos y el verbo va sin -s: he can jump.', tags: ['parque'] },
  { id: 'cnf-03', topic: 'can', kind: 'fix', prompt: 'You don\'t can play!', options: ["You can't play.", "You not can play.", "You can't to play."], answer: 0, tip: 'El negativo es can\'t, sin "don\'t": You can\'t play.', tags: ['parque'] },
  { id: 'cnf-04', topic: 'can', kind: 'fix', prompt: 'Do you can dance?', options: ['Can you to dance?', 'You can dance?', 'Can you dance?'], answer: 2, tip: 'La pregunta empieza con Can: Can you dance?', tags: ['parque'] },
  { id: 'cnf-05', topic: 'can', kind: 'fix', prompt: 'She can sings very well!', options: ['She can sing very well.', 'She cans sing very well.', 'She can singing very well.'], answer: 0, tip: 'Después de can el verbo va sin -s: can sing.', tags: ['parque'] },
  { id: 'cnf-06', topic: 'can', kind: 'fix', prompt: 'Can he ride a bike? — Yes, he does!', options: ['Yes, he can.', 'Yes, he is.', 'Yes, he cans.'], answer: 0, tip: 'Si la pregunta es con can, la respuesta también: Yes, he can.', tags: ['parque'] },

  { id: 'cno-01', topic: 'can', kind: 'order', prompt: 'Puedo nadar.', options: ['I', 'can', 'swim.'], answer: 0, tip: 'I + can + verbo.', tags: ['parque'] },
  { id: 'cno-02', topic: 'can', kind: 'order', prompt: '¿Sabes montar en bicicleta?', options: ['Can', 'you', 'ride', 'a', 'bike?'], answer: 0, tip: 'Can + you + verbo...?', tags: ['parque'] },
  { id: 'cno-03', topic: 'can', kind: 'order', prompt: 'Él no puede cocinar.', options: ['He', "can't", 'cook.'], answer: 0, tip: "He + can't + verbo.", tags: ['casa'] },
  { id: 'cno-04', topic: 'can', kind: 'order', prompt: 'Mi perro puede saltar muy alto.', options: ['My', 'dog', 'can', 'jump', 'very', 'high.'], answer: 0, tip: 'My dog + can + jump...', tags: ['parque'] },

  // ── Presente continuo (lo que pasa ahora) ───────────────
  { id: 'pc-01', topic: 'present-continuous', prompt: 'Look! The dog ___ running.', options: ['is', 'are', 'am'], answer: 0, tip: 'Presente continuo: is / am / are + verbo con -ing. "The dog" es "it": is running.', tags: ['parque'] },
  { id: 'pc-02', topic: 'present-continuous', prompt: 'The children are ___ football.', options: ['play', 'plays', 'playing'], answer: 2, tip: 'Después de are va el verbo con -ing: are playing.', tags: ['parque'] },
  { id: 'pc-03', topic: 'present-continuous', prompt: 'I ___ eating a sandwich now.', options: ['is', 'am', 'are'], answer: 1, tip: 'Con "I" va am: I am eating.', tags: ['parque'] },
  { id: 'pc-04', topic: 'present-continuous', prompt: 'Shh! The baby is ___.', options: ['sleep', 'sleeping', 'sleeps'], answer: 1, tip: 'is + -ing: is sleeping.', tags: ['barrio'] },
  { id: 'pc-05', topic: 'present-continuous', prompt: 'It is ___ today. Take an umbrella!', options: ['raining', 'rain', 'rains'], answer: 0, tip: 'Lo que pasa ahora: it is raining.', tags: ['parque'] },
  { id: 'pc-06', topic: 'present-continuous', prompt: 'Grandpa is ___ a photo.', options: ['takeing', 'taking', 'take'], answer: 1, tip: 'Si termina en -e, la e se va: take → taking.', tags: ['parque'] },
  { id: 'pc-07', topic: 'present-continuous', prompt: 'We ___ waiting for the bus.', options: ['is', 'am', 'are'], answer: 2, tip: 'Con "we" va are: we are waiting.', tags: ['barrio'] },
  { id: 'pc-08', topic: 'present-continuous', prompt: 'She is ___ in the pool.', options: ['swiming', 'swimming', 'swims'], answer: 1, tip: 'swim → swimming: se dobla la m.', tags: ['parque'] },
  { id: 'pc-09', topic: 'present-continuous', prompt: 'What ___ you doing?', options: ['are', 'do', 'is'], answer: 0, tip: 'Pregunta: What are you doing? (¿Qué estás haciendo?)', tags: ['barrio'] },
  { id: 'pc-10', topic: 'present-continuous', prompt: 'Leo isn\'t ___. He is reading.', options: ['sleeping', 'sleep', 'sleeps'], answer: 0, tip: 'isn\'t + -ing: isn\'t sleeping.', tags: ['casa-leo'] },

  { id: 'pcf-01', topic: 'present-continuous', kind: 'fix', prompt: 'The kids playing in the park!', options: ['The kids are playing in the park.', 'The kids is playing in the park.', 'The kids are play in the park.'], answer: 0, tip: 'Falta el verbo to be: The kids ARE playing.', tags: ['parque'] },
  { id: 'pcf-02', topic: 'present-continuous', kind: 'fix', prompt: 'Look! The dog are running!', options: ['The dog is run.', 'The dog is running.', 'The dog running.'], answer: 1, tip: '"The dog" es uno: is running.', tags: ['parque'] },
  { id: 'pcf-03', topic: 'present-continuous', kind: 'fix', prompt: 'I am read a book now!', options: ['I reading a book now.', 'I am reads a book now.', 'I am reading a book now.'], answer: 2, tip: 'am + verbo con -ing: I am reading.', tags: ['barrio'] },
  { id: 'pcf-04', topic: 'present-continuous', kind: 'fix', prompt: 'She is danceing!', options: ['She is dancing.', 'She dancing.', 'She is dances.'], answer: 0, tip: 'dance → dancing: la e se va.', tags: ['parque'] },
  { id: 'pcf-05', topic: 'present-continuous', kind: 'fix', prompt: 'Is raining today!', options: ['It is raining today.', 'It raining today.', 'It is rain today.'], answer: 0, tip: 'En inglés siempre hay sujeto: IT is raining.', tags: ['parque'] },
  { id: 'pcf-06', topic: 'present-continuous', kind: 'fix', prompt: 'What you are doing?', options: ['What you doing?', 'What are you doing?', 'What do you doing?'], answer: 1, tip: 'En preguntas el verbo to be va antes del sujeto: What are you doing?', tags: ['barrio'] },

  { id: 'pco-01', topic: 'present-continuous', kind: 'order', prompt: 'Los niños están jugando al fútbol.', options: ['The', 'children', 'are', 'playing', 'football.'], answer: 0, tip: 'Sujeto + are + verbo con -ing.', tags: ['parque'] },
  { id: 'pco-02', topic: 'present-continuous', kind: 'order', prompt: 'Está lloviendo.', options: ['It', 'is', 'raining.'], answer: 0, tip: 'It + is + raining.', tags: ['parque'] },
  { id: 'pco-03', topic: 'present-continuous', kind: 'order', prompt: '¿Qué estás haciendo?', options: ['What', 'are', 'you', 'doing?'], answer: 0, tip: 'What + are + you + doing?', tags: ['barrio'] },
  { id: 'pco-04', topic: 'present-continuous', kind: 'order', prompt: 'Estoy esperando el autobús.', options: ['I', 'am', 'waiting', 'for', 'the', 'bus.'], answer: 0, tip: 'I + am + waiting for...', tags: ['barrio'] },

  // ── Have got (familia y cosas) ──────────────────────────
  { id: 'hg-01', topic: 'have-got', prompt: 'I ___ got two brothers.', options: ['have', 'has', 'am'], answer: 0, tip: 'Con I, you, we, they: have got.', tags: ['casa'] },
  { id: 'hg-02', topic: 'have-got', prompt: 'Leo ___ got a dog.', options: ['have', 'has', 'is'], answer: 1, tip: 'Con he, she, it: has got.', tags: ['casa-leo'] },
  { id: 'hg-03', topic: 'have-got', prompt: 'We have ___ a big garden.', options: ['get', 'got', 'gets'], answer: 1, tip: 'La forma es have got / has got.', tags: ['casa'] },
  { id: 'hg-04', topic: 'have-got', prompt: '___ you got a sister?', options: ['Do', 'Has', 'Have'], answer: 2, tip: 'Pregunta con you: Have you got...?', tags: ['casa'] },
  { id: 'hg-05', topic: 'have-got', prompt: 'Has she got a cat? — No, she ___.', options: ["hasn't", "haven't", "doesn't"], answer: 0, tip: 'Respuesta corta con she: No, she hasn\'t.', tags: ['casa-maya'] },
  { id: 'hg-06', topic: 'have-got', prompt: 'My house ___ got three bedrooms.', options: ['have', 'has', 'is'], answer: 1, tip: '"My house" es "it": has got.', tags: ['casa'] },
  { id: 'hg-07', topic: 'have-got', prompt: 'They ___ got a car. They go by bus.', options: ["haven't", "hasn't", "don't"], answer: 0, tip: 'Negativo con they: haven\'t got.', tags: ['barrio'] },
  { id: 'hg-08', topic: 'have-got', prompt: 'My grandma has got ___ hair.', options: ['grey', 'greys', 'a grey'], answer: 0, tip: 'Hair (pelo) no lleva "a" ni plural: grey hair.', tags: ['casa'] },

  { id: 'hgf-01', topic: 'have-got', kind: 'fix', prompt: 'My brother have got a bike!', options: ['My brother has got a bike.', 'My brother has get a bike.', 'My brother got have a bike.'], answer: 0, tip: '"My brother" es "he": has got.', tags: ['casa'] },
  { id: 'hgf-02', topic: 'have-got', kind: 'fix', prompt: 'I has got a dog!', options: ['I have got a dog.', 'I have get a dog.', 'I am got a dog.'], answer: 0, tip: 'Con "I": have got.', tags: ['casa'] },
  { id: 'hgf-03', topic: 'have-got', kind: 'fix', prompt: 'Do you have got a pen?', options: ['Have you got a pen?', 'Has you got a pen?', 'You have got a pen?'], answer: 0, tip: 'Con have got la pregunta empieza con Have: Have you got...?', tags: ['casa'] },
  { id: 'hgf-04', topic: 'have-got', kind: 'fix', prompt: "She hasn't got no brothers!", options: ["She hasn't got any brothers.", "She haven't got any brothers.", "She hasn't got brother."], answer: 0, tip: 'En negativo se usa any: She hasn\'t got any brothers.', tags: ['casa-maya'] },
  { id: 'hgf-05', topic: 'have-got', kind: 'fix', prompt: 'We has got a family photo!', options: ['We have got a family photo.', 'We has get a family photo.', 'We got has a family photo.'], answer: 0, tip: 'Con "we": have got.', tags: ['casa'] },

  { id: 'hgo-01', topic: 'have-got', kind: 'order', prompt: 'Tengo dos hermanas.', options: ['I', 'have', 'got', 'two', 'sisters.'], answer: 0, tip: 'I + have got + cosa.', tags: ['casa'] },
  { id: 'hgo-02', topic: 'have-got', kind: 'order', prompt: 'Leo tiene un perro.', options: ['Leo', 'has', 'got', 'a', 'dog.'], answer: 0, tip: 'Leo + has got + cosa.', tags: ['casa-leo'] },
  { id: 'hgo-03', topic: 'have-got', kind: 'order', prompt: '¿Tienes una mascota?', options: ['Have', 'you', 'got', 'a', 'pet?'], answer: 0, tip: 'Have + you + got...?', tags: ['casa'] },
  { id: 'hgo-04', topic: 'have-got', kind: 'order', prompt: 'Mi casa tiene un jardín.', options: ['My', 'house', 'has', 'got', 'a', 'garden.'], answer: 0, tip: 'My house + has got...', tags: ['casa'] },
]
