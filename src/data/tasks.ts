import type { TopicId } from '../game/types'
import type { MiniStep } from '../components/MiniTalk'

/**
 * Tareas de personajes que no pelean: una charla corta con elecciones (MiniTalk).
 * Al terminarla se guarda `done` en `opened`. Si tiene `lesson`, Leo enseña ese tema antes.
 * Si tiene `requires`, el personaje no abre la tarea hasta que esté en `opened`.
 */
export type NpcTask = {
  /** Personaje que da la tarea (si no se indica, el id de la tarea es el del personaje) */
  npc?: string
  done: string
  lesson?: TopicId
  requires?: { id: string; text: string; es: string; sub: string }
  steps: MiniStep[]
  reward: { text: string; es?: string; sub: string; say?: string }
  shield?: boolean
  outfit?: string
  /** En vez de la charla, abre un juego propio */
  activity?: 'guess' | 'pens' | 'planner' | 'vocab' | 'attendance' | 'sounds' | 'verbs' | 'mystery' | 'timeline' | 'plan'
  /** Para activity 'vocab': las palabras y el título del repaso (4 de 5 aciertos) */
  vocab?: { title: string; place: string; words: { en: string; es: string }[] }
}

export const NPC_TASKS: Record<string, NpcTask> = {
  // La mamá de Leo: la familia de Leo y sus rutinas (presente simple con -s)
  garcia: {
    done: 'barrio-invite',
    lesson: 'present-simple',
    steps: [
      {
        text: "Hello! You are Leo's new friend! Come in, come in. I'm Mrs. Garcia, Leo's mom.",
        es: '¡Hola! ¡Eres el nuevo amigo de Leo! Pasa, pasa. Soy la señora García, la mamá de Leo.',
        choice: { ask: '¿Qué le respondes?', options: ['Nice to meet you, Mrs. Garcia!', 'Good night, Mrs. Garcia!', 'You are welcome!'], answer: 0, tip: 'Cuando conoces a alguien: "Nice to meet you!".' },
      },
      {
        text: 'Look, this is our family photo. Leo\'s dad is a doctor. He works in a hospital.',
        es: 'Mira, esta es nuestra foto de familia. El papá de Leo es médico. Trabaja en un hospital.',
        choice: { ask: '¿Dónde trabaja el papá de Leo?', options: ['He work in a hospital.', 'He works in a hospital.', 'He working in a hospital.'], answer: 1, tip: 'Con "he" el verbo lleva -s: he works.' },
      },
      {
        text: 'This is Emma, Leo\'s sister. She plays the guitar every afternoon.',
        es: 'Esta es Emma, la hermana de Leo. Toca la guitarra todas las tardes.',
        choice: { ask: '¿Qué hace Emma todas las tardes?', options: ['She play the guitar.', 'She is guitar.', 'She plays the guitar.'], answer: 2, tip: 'Con "she" el verbo lleva -s: she plays.' },
      },
      {
        text: 'And me? I get up at six and I make breakfast for everybody. Leo usually gets up at seven...',
        es: '¿Y yo? Me levanto a las seis y hago el desayuno para todos. Leo normalmente se levanta a las siete...',
        choice: { ask: 'Completa: Mrs. Garcia ___ up at six.', options: ['get', 'gets', 'getting'], answer: 1, tip: 'Mrs. Garcia es "she": gets.' },
      },
      {
        text: '...but he is always late! He never eats breakfast. Ha ha!',
        es: '...¡pero siempre llega tarde! Nunca desayuna. ¡Ja, ja!',
        choice: { ask: '¿Qué frase es correcta?', options: ['Leo never eats breakfast.', 'Leo eats never breakfast.', 'Leo never eat breakfast.'], answer: 0, tip: 'never va antes del verbo, y con "he" el verbo lleva -s: never eats.' },
      },
      {
        text: "Oh! Today is Leo's birthday! There is a party in the park at four o'clock. Here is your invitation.",
        es: '¡Oh! ¡Hoy es el cumpleaños de Leo! Hay una fiesta en el parque a las cuatro. Aquí tienes tu invitación.',
        choice: { ask: '¿Qué le respondes?', options: ['Thank you! I love parties!', 'Thank you! I loves parties!', "You're welcome!"], answer: 0, tip: 'Te da algo, así que agradeces. Con "I" el verbo va sin -s: I love.' },
      },
    ],
    reward: {
      text: 'Mrs. Garcia: "See you at the party!"',
      es: '¡Nos vemos en la fiesta!',
      sub: 'Tienes la invitación al cumpleaños de Leo. La fiesta es en el parque.',
      say: 'See you at the party!',
    },
  },

  // El papá de Maya: gustos con like / love / hate + -ing
  rojas: {
    done: 'barrio-likes',
    lesson: 'likes',
    steps: [
      {
        text: "Hi! I'm Maya's dad. Look at Maya: she is reading again. She loves reading. She reads all day!",
        es: '¡Hola! Soy el papá de Maya. Mira a Maya: está leyendo otra vez. Le encanta leer. ¡Lee todo el día!',
        choice: { ask: '¿Qué le encanta a Maya?', options: ['She loves read.', 'She loves reading.', 'She love reading.'], answer: 1, tip: 'love + verbo con -ing, y con "she" love lleva -s: she loves reading.' },
      },
      {
        text: 'But she hates getting up early. Every morning: "Five more minutes, Dad!"',
        es: 'Pero odia levantarse temprano. Todas las mañanas: "¡Cinco minutos más, papá!"',
        choice: { ask: '¿Qué odia Maya?', options: ['She hates getting up early.', 'She hates get up early.', 'She hate getting up early.'], answer: 0, tip: 'hate + -ing: getting (con doble t).' },
      },
      {
        text: 'And you? Do you like playing football?',
        es: '¿Y tú? ¿Te gusta jugar al fútbol?',
        choice: { ask: 'Responde que sí.', options: ['Yes, I like play football.', 'Yes, I likes playing football.', 'Yes, I like playing football.'], answer: 2, tip: 'I like + playing (con -ing, y like sin -s).' },
      },
      {
        text: 'I love cooking! I cook Peruvian food every Sunday. What do you love doing?',
        es: '¡Me encanta cocinar! Cocino comida peruana todos los domingos. ¿Qué te encanta hacer?',
        choice: { ask: '¿Qué le respondes?', options: ['I love listen to music.', 'I love listening to music.', 'I loving music.'], answer: 1, tip: 'love + listening.' },
      },
      {
        text: "Great! Here, take a cookie. It's Maya's favorite. Cookies give you energy!",
        es: '¡Genial! Toma, una galleta. Es la favorita de Maya. ¡Las galletas dan energía!',
      },
    ],
    reward: {
      text: 'Mr. Rojas: "Enjoy the cookie!"',
      es: '¡Disfruta la galleta!',
      sub: 'La galleta te da un escudo de palabras: bloquea un error en combate.',
      say: 'Enjoy the cookie!',
    },
    shield: true,
  },

  // El abuelo de Leo en la fiesta: fechas, felicitar y la foto de tu familia
  // Primero: la fiesta no está lista. Hay que conseguir el pastel, los globos y la música
  'joe-start': {
    npc: 'joe',
    done: 'party-started',
    requires: {
      id: 'barrio-invite',
      text: 'Grandpa Joe: "Hello! This party is for family and friends. Have you got an invitation? Leo\'s mom has got the invitations."',
      es: '¡Hola! Esta fiesta es para familia y amigos. ¿Tienes invitación? La mamá de Leo tiene las invitaciones.',
      sub: 'Ve a la casa de Leo y habla con su mamá.',
    },
    steps: [
      {
        text: "Hello, young friend! Welcome to Leo's party! Have you got your invitation?",
        es: '¡Hola, joven amigo! ¡Bienvenido a la fiesta de Leo! ¿Tienes tu invitación?',
        choice: { ask: 'Dale la invitación.', options: ['Yes, you are here.', 'Yes, here you are.', 'No, thank you.'], answer: 1, tip: 'Al entregar algo: Here you are.' },
      },
      {
        text: "Oh no! Look at the table. We haven't got a cake. We haven't got balloons. And we haven't got any music!",
        es: '¡Oh, no! Mira la mesa. No tenemos pastel. No tenemos globos. ¡Y no tenemos música!',
        choice: { ask: '¿Qué falta para la fiesta?', options: ['A cake, balloons and music.', 'A dog, a bike and a ball.', 'Nothing. The party is ready.'], answer: 0, tip: 'El abuelo dice: "We haven\'t got a cake... balloons... any music".' },
      },
      {
        text: 'Can you help me? Ask the neighbors: "Have you got...?" The man who loves cooking has got a cake, I think.',
        es: '¿Me ayudas? Pregúntales a los vecinos: "Have you got...?" El hombre al que le encanta cocinar tiene un pastel, creo.',
      },
      {
        text: 'The girl with orange hair in the park has got a lot of balloons. And the man who loves old music has got a radio... but he is very angry today.',
        es: 'La niña de pelo naranja del parque tiene muchos globos. Y el hombre al que le encanta la música vieja tiene una radio... pero hoy está muy enojado.',
        choice: { ask: '¿Quién tiene la radio?', options: ['The girl in the park.', 'The man who loves old music.', 'Leo.'], answer: 1, tip: 'El abuelo dice: "the man who loves old music has got a radio".' },
      },
    ],
    reward: {
      text: 'Grandpa Joe: "Please hurry! Leo is coming soon!"',
      es: '¡Date prisa, por favor! ¡Leo viene pronto!',
      sub: 'Misión: prepara la fiesta. Pregunta a los vecinos "Have you got...?" y consigue el pastel, los globos y la radio.',
      say: 'Please hurry! Leo is coming soon!',
    },
  },

  // Con todo listo, la fiesta: fechas, felicitar y la foto de tu familia
  joe: {
    done: 'barrio-photo',
    requires: {
      id: 'party-ready',
      text: 'Grandpa Joe: "The party isn\'t ready! Ask the neighbors: Have you got a cake? Have you got any balloons? Have you got a radio?"',
      es: '¡La fiesta no está lista! Pregúntales a los vecinos.',
      sub: 'Mira lo que falta en "Fiesta" bajo el mapa.',
    },
    steps: [
      {
        text: 'A cake, balloons and music! Thank you! Now the party is perfect.',
        es: '¡Un pastel, globos y música! ¡Gracias! Ahora la fiesta es perfecta.',
      },
      {
        text: "Wonderful! Today is the fifth of May. Leo's birthday is on May 5th. He is fifteen today!",
        es: '¡Maravilloso! Hoy es cinco de mayo. El cumpleaños de Leo es el 5 de mayo. ¡Hoy cumple quince!',
        choice: { ask: '¿Cuándo es el cumpleaños de Leo?', options: ['On May 15th.', 'On March 5th.', 'On May 5th.'], answer: 2, tip: '"The fifth of May" = May 5th (5 de mayo).' },
      },
      {
        text: "Here is Leo! Let's sing! ... Now say something to him!",
        es: '¡Aquí está Leo! ¡Cantemos! ... ¡Ahora dile algo!',
        choice: { ask: '¿Qué le dices a Leo?', options: ['Happy new year, Leo!', 'Happy birthday, Leo!', 'Good night, Leo!'], answer: 1, tip: 'En un cumpleaños: "Happy birthday!".' },
      },
      {
        text: 'My birthday is in December. When is your birthday?',
        es: 'Mi cumpleaños es en diciembre. ¿Cuándo es tu cumpleaños?',
        choice: { ask: 'Elige la respuesta bien escrita.', options: ['My birthday are in July.', 'I have birthday July.', 'My birthday is in July.'], answer: 2, tip: 'My birthday is in + mes (con mayúscula): My birthday is in July.' },
      },
      {
        text: 'Look, there is a gift on the table. There is no name on it... only a letter: "L".',
        es: 'Mira, hay un regalo en la mesa. No tiene nombre... solo una letra: "L".',
        choice: { ask: '¿Qué preguntas?', options: ['Who is it from?', 'Who are it from?', 'Where it is from?'], answer: 0, tip: '¿De quién es? = Who is it from?' },
      },
      {
        text: 'Hmm, I don\'t know. Strange... Oh! And this is for you. I always take photos of my neighbors. This is your family!',
        es: 'Hmm, no sé. Qué raro... ¡Oh! Y esto es para ti. Siempre les tomo fotos a mis vecinos. ¡Esta es tu familia!',
        choice: { ask: '¿Qué le dices?', options: ["You're welcome!", 'Thank you so much!', 'Happy birthday!'], answer: 1, tip: 'Te regalan algo: "Thank you so much!".' },
      },
    ],
    reward: {
      text: 'Grandpa Joe: "Show the photo to your brother. He loves it!"',
      es: 'Muéstrale la foto a tu hermano. ¡Le encanta!',
      sub: 'Tienes la foto de tu familia. Nick está en tu casa, al lado del parque.',
      say: 'Show the photo to your brother. He loves it!',
    },
  },
}

// ── La granja: estas tareas abren un juego propio (activity) en vez de una charla ──
NPC_TASKS.rosie = {
  done: 'farm-guess',
  lesson: 'do-does',
  activity: 'guess',
  steps: [],
  reward: {
    text: 'Rosie: "You are very good at this game! Now you know all our animals."',
    es: '¡Eres muy bueno en este juego! Ya conoces a todos nuestros animales.',
    sub: 'Ya conoces a los animales de la granja. El granjero no podrá decir que no.',
    say: 'You are very good at this game! Now you know all our animals.',
  },
}
NPC_TASKS.patel = {
  done: 'farm-pens',
  lesson: 'plurals',
  activity: 'pens',
  steps: [],
  reward: {
    text: 'Dr. Patel: "Every animal is in the right pen. Thank you!"',
    es: 'Cada animal está en su corral. ¡Gracias!',
    sub: 'Los corrales están en orden. La doctora te da un escudo de palabras.',
    say: 'Every animal is in the right pen. Thank you!',
  },
  shield: true,
}

// ── La oficina ──
NPC_TASKS.sara = {
  done: 'office-planner',
  lesson: 'time',
  activity: 'planner',
  steps: [],
  reward: {
    text: 'Sara: "The agenda is perfect now! You have got an appointment with Ms. Clark today."',
    es: '¡La agenda ya está perfecta! Tienes una cita con la señora Clark hoy.',
    sub: 'Tienes una cita con la directora.',
    say: 'The agenda is perfect now! You have got an appointment with Ms. Clark today.',
  },
}
NPC_TASKS.grace = {
  done: 'office-message',
  lesson: 'object-pronouns',
  steps: [
    {
      text: "Ring, ring! Oh no, the phone! I'm very busy. Could you answer it, please?",
      es: '¡Ring, ring! ¡Oh, no, el teléfono! Estoy muy ocupada. ¿Podrías contestar, por favor?',
      choice: { ask: '¿Qué le dices a Grace?', options: ['Sure!', 'Sorry, I can.', 'Yes, I could to.'], answer: 0, tip: 'Para aceptar: Sure! / Of course!' },
    },
    {
      text: '(You answer the phone.) ... Hello? This is Mr. Rossi, from the tourist office. Could I speak to Ms. Clark, please?',
      es: '(Contestas el teléfono.) ... ¿Hola? Habla el señor Rossi, de la oficina de turismo. ¿Podría hablar con la señora Clark, por favor?',
      choice: { ask: 'La señora Clark no está disponible. ¿Qué le dices?', options: ["I'm sorry, she isn't here. Can I take a message?", "Sorry, her isn't here. Can I take message?", "No. Call she later."], answer: 0, tip: "Con cortesía: I'm sorry, she isn't here. Can I take a message?" },
    },
    {
      text: 'Yes, please. Could you tell her to call me? I am in my office in the afternoon, from two to five.',
      es: 'Sí, por favor. ¿Podrías decirle que me llame? Estoy en mi oficina en la tarde, de dos a cinco.',
      choice: { ask: '¿Qué le respondes?', options: ['Of course. I can tell her.', 'Of course. I can tell she.', 'Of course. I can tell to her.'], answer: 0, tip: 'Después del verbo: her (tell her).' },
    },
    {
      text: 'And could you send me the new city map? Send it to me today, please. Thank you!',
      es: 'Y ¿podrías enviarme el nuevo mapa de la ciudad? Envíamelo hoy, por favor. ¡Gracias!',
      choice: { ask: '¿Qué le respondes?', options: ['Sure! I can send it to you today.', 'Sure! I can send it to your today.', 'Sure! I can send you it to.'], answer: 0, tip: 'send it to you: después de to va you.' },
    },
    {
      text: '(You hang up.) Grace: Who is it? Could you write a note for Ms. Clark, please?',
      es: '(Cuelgas.) Grace: ¿Quién era? ¿Podrías escribir una nota para la señora Clark, por favor?',
      choice: { ask: 'Elige la nota bien escrita.', options: ['Message from Mr. Rossi: please call him in the afternoon, and send him the city map.', 'Message from Mr. Rossi: please call he in the afternoon, and send he the city map.', 'Message from Mr. Rossi: please call his at the afternoon, and send his the city map.'], answer: 0, tip: 'Después del verbo: him. Y partes del día: in the afternoon.' },
    },
    {
      text: 'Perfect note! Thank you. Now Ms. Clark can call him. You are a great assistant!',
      es: '¡Nota perfecta! Gracias. Ahora la señora Clark puede llamarlo. ¡Eres un gran asistente!',
    },
  ],
  reward: {
    text: 'Grace: "Thank you! I can give her the note now."',
    es: '¡Gracias! Ya le puedo dar la nota.',
    sub: 'Tomaste el mensaje del teléfono.',
    say: 'Thank you! I can give her the note now.',
  },
}

// ── Repaso de vocabulario suelto (cierre de A1) ──
NPC_TASKS['lucy-vocab'] = {
  npc: 'lucy',
  done: 'barrio-vocab',
  requires: {
    id: 'barrio-photo',
    text: 'Lucy: "I love animals and sunny days! After the party, can we play a word game?"',
    es: '¡Me encantan los animales y los días de sol! Después de la fiesta, ¿jugamos un juego de palabras?',
    sub: 'Lucy tiene un juego de mascotas y clima para después de la fiesta.',
  },
  activity: 'vocab',
  vocab: {
    title: 'Mascotas y clima',
    place: 'Parque · Lucy',
    words: [
      { en: 'dog', es: 'perro' }, { en: 'cat', es: 'gato' }, { en: 'bird', es: 'pájaro' }, { en: 'fish', es: 'pez' }, { en: 'hamster', es: 'hámster' },
      { en: 'sunny', es: 'soleado' }, { en: 'rainy', es: 'lluvioso' }, { en: 'cloudy', es: 'nublado' }, { en: 'windy', es: 'con viento' },
      { en: 'hot', es: 'caluroso' }, { en: 'cold', es: 'frío' }, { en: 'snow', es: 'nieve' },
    ],
  },
  steps: [],
  reward: {
    text: 'Lucy: "You know a lot of words! My dog likes you too. Woof!"',
    es: '¡Sabes muchas palabras! A mi perro también le caes bien. ¡Guau!',
    sub: 'Lucy te da un escudo de palabras.',
    say: 'You know a lot of words! My dog likes you too.',
  },
  shield: true,
}
NPC_TASKS['rosie-body'] = {
  npc: 'rosie',
  done: 'farm-body',
  requires: { id: 'farm-guess', text: '', es: '', sub: '' },
  activity: 'vocab',
  vocab: {
    title: 'Partes del cuerpo',
    place: 'Granero · Rosie',
    words: [
      { en: 'head', es: 'cabeza' }, { en: 'eyes', es: 'ojos' }, { en: 'ears', es: 'orejas' }, { en: 'nose', es: 'nariz' }, { en: 'mouth', es: 'boca' },
      { en: 'legs', es: 'patas, piernas' }, { en: 'tail', es: 'cola' }, { en: 'wings', es: 'alas' }, { en: 'feet', es: 'pies, patas' }, { en: 'teeth', es: 'dientes' },
    ],
  },
  steps: [],
  reward: {
    text: 'Rosie: "Great! A horse has got four legs and a long tail. A duck has got two feet and two wings!"',
    es: '¡Genial! Un caballo tiene cuatro patas y una cola larga. ¡Un pato tiene dos patas y dos alas!',
    sub: 'Rosie te da un escudo de palabras.',
    say: 'Great! A horse has got four legs and a long tail. A duck has got two feet and two wings!',
  },
  shield: true,
}

NPC_TASKS['ana-adjectives'] = {
  npc: 'ana',
  done: 'school-adjectives',
  requires: { id: 'school-supplies', text: '', es: '', sub: '' },
  activity: 'vocab',
  vocab: {
    title: 'Adjetivos opuestos',
    place: 'Aula · Ana',
    words: [
      { en: 'big', es: 'grande' }, { en: 'small', es: 'pequeño' }, { en: 'happy', es: 'feliz' }, { en: 'sad', es: 'triste' }, { en: 'new', es: 'nuevo' },
      { en: 'old', es: 'viejo' }, { en: 'fast', es: 'rápido' }, { en: 'slow', es: 'lento' }, { en: 'tall', es: 'alto' }, { en: 'short', es: 'bajo, corto' },
      { en: 'easy', es: 'fácil' }, { en: 'difficult', es: 'difícil' }, { en: 'clean', es: 'limpio' }, { en: 'dirty', es: 'sucio' },
    ],
  },
  steps: [],
  reward: {
    text: 'Ana: "Big and small, happy and sad... You are very smart!"',
    es: 'Grande y pequeño, feliz y triste... ¡Eres muy inteligente!',
    sub: 'Ana te da un escudo de palabras.',
    say: 'Big and small, happy and sad... You are very smart!',
  },
  shield: true,
}

// ── La escuela en 1996 ──
NPC_TASKS.higgins = {
  done: 'past-attendance',
  lesson: 'was-were',
  activity: 'attendance',
  steps: [],
  reward: {
    text: 'Mrs. Higgins: "Thank you, dear! You were a big help."',
    es: '¡Gracias, querido! Fuiste de gran ayuda.',
    sub: 'La lista de asistencia está en orden. El director ya no puede decir que no estabas en la lista.',
    say: 'Thank you, dear! You were a big help.',
  },
}

// ── La ciudad en 1996 ──
NPC_TASKS.lopez = {
  done: 'past-sounds',
  lesson: 'past-regular',
  activity: 'sounds',
  steps: [],
  reward: {
    text: 'Mr. Lopez: "Walked, played, wanted! You listened very well."',
    es: '¡Walked, played, wanted! Escuchaste muy bien.',
    sub: 'Los sacos están en orden. Ahora la señora Rossi no puede decir que nadie ayudó en el mercado.',
    say: 'Walked, played, wanted! You listened very well.',
  },
}

NPC_TASKS.nora = {
  done: 'city-past-vocab',
  activity: 'vocab',
  vocab: {
    title: 'Cosas de 1996',
    place: 'Tienda · Nora',
    words: [
      { en: 'well', es: 'pozo' }, { en: 'cart', es: 'carreta' }, { en: 'horse', es: 'caballo' }, { en: 'dirt road', es: 'carretera destapada' },
      { en: 'market', es: 'mercado' }, { en: 'stall', es: 'puesto' }, { en: 'phone box', es: 'cabina de teléfono' }, { en: 'letter', es: 'carta' },
      { en: 'stamp', es: 'estampilla' }, { en: 'mail carrier', es: 'cartero' }, { en: 'bread', es: 'pan' }, { en: 'sack', es: 'saco' },
      { en: 'apron', es: 'delantal' }, { en: 'radio', es: 'radio' },
    ],
  },
  steps: [],
  reward: {
    text: 'Nora: "Well, cart, stall, stamp... You learned all my words!"',
    es: 'Pozo, carreta, puesto, estampilla... ¡Aprendiste todas mis palabras!',
    sub: 'Nora te da un escudo de palabras.',
    say: 'Well, cart, stall, stamp... You learned all my words!',
  },
  shield: true,
}

// ── Green Street en 1996 ──
NPC_TASKS['joe-young'] = {
  done: 'past-verbbook',
  lesson: 'past-irregular',
  activity: 'verbs',
  steps: [],
  reward: {
    text: 'Joe: "Twenty-five verbs! You read my whole book!"',
    es: '¡Veinticinco verbos! ¡Leíste todo mi libro!',
    sub: 'Los 25 verbos irregulares quedaron en tus fichas. También los ves en el Cuaderno, en "Libro de verbos".',
    say: 'Twenty-five verbs! You read my whole book!',
  },
}

// ── La granja en 1996 ──
NPC_TASKS.bill = {
  done: 'past-mystery',
  lesson: 'past-did',
  activity: 'mystery',
  steps: [],
  reward: {
    text: 'Bill: "The mice ate the rope! Did you see their little teeth? Ha ha. Thank you, detective!"',
    es: '¡Los ratones se comieron la cuerda! ¿Viste sus dientecitos? Ja, ja. ¡Gracias, detective!',
    sub: 'Misterio resuelto. Ahora la señora Brown ya no puede decir que tú paraste el molino.',
    say: 'The mice ate the rope! Thank you, detective!',
  },
}

// ── El viejo cine en 1996 ──
NPC_TASKS.diana = {
  done: 'past-timeline',
  lesson: 'past-time',
  activity: 'timeline',
  steps: [],
  reward: {
    text: 'Diana: "In 1980, ten years ago, last week, yesterday... You know the story of our cinema!"',
    es: 'En 1980, hace diez años, la semana pasada, ayer... ¡Conoces la historia de nuestro cine!',
    sub: 'Diana te da una boleta. Ahora el señor Clark ya no puede decir que llegaste tarde sin boleta.',
    say: 'You know the story of our cinema!',
  },
}

// ── La escuela en 2056 ──
NPC_TASKS['leo-adult'] = {
  done: 'future-plan',
  lesson: 'going-to',
  activity: 'plan',
  steps: [],
  reward: {
    text: 'Mr. Garcia: "Hi, hi! What a great plan. Tomorrow is going to be a wonderful class. Thank you!"',
    es: '¡Hola, hola! Qué buen plan. Mañana va a ser una clase maravillosa. ¡Gracias!',
    sub: 'El plan de clase está listo. GRIMM-BOT ya no puede decir que no ayudaste al profesor.',
    say: 'Hi, hi! What a great plan. Tomorrow is going to be a wonderful class. Thank you!',
  },
}

/** La tarea pendiente de un personaje: la primera que no ha terminado. blocked = le falta su requisito */
export function taskOf(npcId: string, opened: string[]): { id: string; task: NpcTask; blocked: boolean } | null {
  for (const [id, t] of Object.entries(NPC_TASKS)) {
    if ((t.npc ?? id) !== npcId || opened.includes(t.done)) continue
    return { id, task: t, blocked: !!t.requires && !opened.includes(t.requires.id) }
  }
  return null
}

/**
 * Misión del barrio: preparar la fiesta de Leo. Se pregunta "Have you got...?" a los vecinos.
 * owner = quién lo tiene (un personaje o un esbirro que hay que liberar antes).
 */
export type PartyItem = {
  id: string
  es: string
  question: string
  wrong: [string, string]
  owner: string
  yes: { text: string; es: string }
  no: { text: string; es: string }
}

export const PARTY_ITEMS: PartyItem[] = [
  {
    id: 'cake',
    es: 'el pastel',
    question: 'Have you got a cake?',
    wrong: ['Has you got a cake?', 'Do you have got a cake?'],
    owner: 'rojas',
    yes: { text: 'Yes, I have! I always make a cake on Sundays. Take it, and say happy birthday to Leo!', es: '¡Sí! Siempre hago un pastel los domingos. ¡Llévatelo y felicita a Leo!' },
    no: { text: "No, I haven't. Ask Maya's dad. He loves cooking!", es: 'No, no tengo. Pregúntale al papá de Maya. ¡Le encanta cocinar!' },
  },
  {
    id: 'balloons',
    es: 'los globos',
    question: 'Have you got any balloons?',
    wrong: ['Have you got a balloons?', 'Have you get any balloons?'],
    owner: 'lucy',
    yes: { text: 'Yes, I have! I have got ten balloons. Here you are!', es: '¡Sí! Tengo diez globos. ¡Aquí tienes!' },
    no: { text: "No, I haven't. The girl with orange hair in the park has got a lot of balloons.", es: 'No, no tengo. La niña de pelo naranja del parque tiene muchos globos.' },
  },
  {
    id: 'radio',
    es: 'la radio',
    question: 'Have you got a radio?',
    wrong: ['Has you got a radio?', 'Have you a radio got?'],
    owner: 'barrio-m3',
    yes: { text: 'A radio? Yes, I have. I love old music! Take it. Leo is a good boy.', es: '¿Una radio? Sí, tengo. ¡Me encanta la música vieja! Llévatela. Leo es un buen chico.' },
    no: { text: "No, I haven't. Mr. Hill has got an old radio... but he is very angry today.", es: 'No, no tengo. El señor Hill tiene una radio vieja... pero hoy está muy enojado.' },
  },
]
