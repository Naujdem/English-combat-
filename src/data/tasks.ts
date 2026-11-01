import type { TopicId } from '../game/types'
import type { MiniStep } from '../components/MiniTalk'
import type { RoundItem, RoundLines } from '../components/OneMoreRound'
import type { SequenceStep } from '../components/SequenceMaster'
import type { FixStep } from '../components/FixRadio'
import type { ReconstructItem } from '../components/Reconstruct'

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
  /** Al completarla, la vida vuelve al máximo */
  heal?: boolean
  outfit?: string
  /** En vez de la charla, abre un juego propio */
  activity?: 'guess' | 'pens' | 'planner' | 'vocab' | 'attendance' | 'sounds' | 'verbs' | 'mystery' | 'timeline' | 'plan' | 'tour' | 'party60' | 'predict' | 'speech' | 'clocks' | 'round' | 'practice' | 'sequence' | 'reconstruct' | 'fixradio'
  /** Para activity 'round' (One More Round!): los objetos y lo que dice el personaje; {item} = el objeto que se movió. Cada error quita una vida */
  round?: { items: RoundItem[]; lines: RoundLines; visual?: 'room' | 'none' }
  /** Para activity 'practice': práctica guiada con Leo (8 frases) del tema indicado */
  practice?: TopicId
  /** Para activity 'practice': preguntas fijas en orden (si no, se eligen al azar del tema) */
  practiceIds?: string[]
  /** Para activity 'sequence' (Sequence Master): los pasos en el orden correcto (salen desordenados) */
  sequence?: { title: string; intro: SequenceStep; steps: SequenceStep[]; hint?: string }
  /** Para activity 'fixradio' (Fix the Radio): instrucciones paso a paso; el jugador toca la pieza de cada paso */
  fixradio?: { title: string; intro: { en: string; es: string }; steps: FixStep[] }
  /** Para activity 'reconstruct' (Reconstruct the Story): contrastar pistas con una nota corrompida y elegir la frase verdadera */
  reconstruct?: { title: string; intro: { en: string; es: string }; items: ReconstructItem[] }
  /** Dialogue Under Pressure: segundos para cada elección de la charla */
  pressure?: number
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
    {
      text: "Oh, and... look out of the window. Do you see that man in a dark coat? Every day he stands there and looks at our phone. He never calls. He never says anything.",
      es: 'Ah, y... mira por la ventana. ¿Ves a ese hombre de abrigo oscuro? Todos los días se para ahí y mira nuestro teléfono. Nunca llama. Nunca dice nada.',
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

// ── La ciudad en 2056 ──
NPC_TASKS.marco = {
  done: 'future-tour',
  lesson: 'going-to-neg',
  activity: 'tour',
  steps: [],
  reward: {
    text: 'Marco: "Perfect! The tourists aren\'t going to get lost today. My grandpa is going to be proud!"',
    es: '¡Perfecto! Los turistas no se van a perder hoy. ¡Mi abuelo va a estar orgulloso!',
    sub: 'La ruta está lista. El alcalde ya no puede decir que no ayudaste a los turistas.',
    say: "Perfect! The tourists aren't going to get lost today.",
  },
}

// ── Green Street en 2056 ──
NPC_TASKS['emma-adult'] = {
  done: 'future-party',
  lesson: 'going-to-wh',
  activity: 'party60',
  steps: [],
  reward: {
    text: 'Emma: "Basketball, photos, Theo, the big tree, five o\'clock... The party is going to be perfect!"',
    es: 'Baloncesto, fotos, Theo, el árbol grande, las cinco... ¡La fiesta va a ser perfecta!',
    sub: 'La lista de la fiesta está lista. Ahora Nick ya no puede decir que no ayudaste a los vecinos.',
    say: 'The party is going to be perfect!',
  },
}

// ── La granja en 2056 ──
NPC_TASKS['rosie-adult'] = {
  done: 'future-predict',
  lesson: 'going-to-predict',
  activity: 'predict',
  steps: [],
  reward: {
    text: 'Rosie: "You can see the future! Rain, a hungry cow, a robot in the pond... Ha ha. Thank you!"',
    es: '¡Puedes ver el futuro! Lluvia, una vaca con hambre, un robot en el estanque... Ja, ja. ¡Gracias!',
    sub: 'Rosie te da su permiso para entrar a la casa. Ahora el abuelo Brown ya no puede decir que no la conoces.',
    say: 'You can see the future! Thank you!',
  },
}

// ── La oficina: los relojes locos (después de la agenda; da un escudo, no es requisito) ──
NPC_TASKS['sara-clocks'] = {
  npc: 'sara',
  done: 'office-clocks',
  activity: 'clocks',
  steps: [],
  reward: {
    text: 'Sara: "Half past eight, quarter past nine... Every clock is OK now! Thank you!"',
    es: 'Y media, y cuarto... ¡Todos los relojes están bien ahora! ¡Gracias!',
    sub: 'Sara te da un escudo de palabras para la pelea con la directora.',
    say: 'Every clock is OK now! Thank you!',
  },
  shield: true,
}

// ── La torre Green Valley en 2056 ──
NPC_TASKS['diana-old'] = {
  done: 'future-speech',
  lesson: 'want-to',
  activity: 'speech',
  steps: [],
  reward: {
    text: 'Diana: "The past, today, tomorrow... and a big thank you. It\'s a perfect speech!"',
    es: 'El pasado, hoy, mañana... y un gran gracias. ¡Es un discurso perfecto!',
    sub: 'Diana te da su permiso para subir a la dirección. Ahora el señor Stone ya no puede decir que no la ayudaste.',
    say: "It's a perfect speech! Thank you!",
  },
}

// ── A2-01 — A New Beginning (hospital). Orden: médico → amigo (charla) → amigo (One More Round!) → recepción ──
// La persona especial te trajo al hospital y está contigo desde el principio (sus tareas empiezan en A2-02).
NPC_TASKS['a2-doctor'] = {
  done: 'a2-01-doctor',
  steps: [
    {
      text: "Oh, you're awake! Good morning. I'm your doctor. {iname} brought you here last night. How are you feeling today?",
      es: '¡Oh, ya despertaste! Buenos días. Soy tu médica. {iname} te trajo anoche. ¿Cómo te sientes hoy?',
      choice: { ask: '¿Qué le respondes?', options: ["I'm feeling a bit tired, but I'm OK.", "I feeling a bit tired, but I'm OK.", "I'm feel a bit tired, but I'm OK."], answer: 0, tip: 'Para decir cómo te sientes ahora: I am (I\'m) + verbo con -ing: I\'m feeling...' },
    },
    {
      text: "That's normal. You need to rest a little more. Do you remember anything?",
      es: 'Es normal. Necesitas descansar un poco más. ¿Recuerdas algo?',
      choice: { ask: '¿Qué le dices?', options: ['Not really. I only remember a white light.', 'Not really. I only remembers a white light.', 'Not really. I am only remember a white light.'], answer: 0, tip: 'Con "I" el verbo va sin -s y sin "am": I remember.' },
    },
    {
      text: 'This old clock was with you when you arrived. Here you are. It looks very special.',
      es: 'Este reloj viejo estaba contigo cuando llegaste. Aquí tienes. Se ve muy especial.',
      choice: { ask: 'Miras el reloj. Las cinco piezas siguen ahí... pero algo falta. ¿Qué dices?', options: ['Wait... the center of the clock is empty!', 'Wait... the center of the clock are empty!', 'Wait... the center of the clock empty!'], answer: 0, tip: '"The center" es uno solo: the center is.' },
    },
    {
      text: "Hmm, I'm sorry. I don't know anything about clocks. Oh, your friend is waiting for you in the hallway.",
      es: 'Mmm, lo siento. No sé nada de relojes. Ah, tu amigo te está esperando en el pasillo.',
      choice: { ask: '¿Qué le respondes?', options: ['Thank you, doctor. I can go and see my friend now.', 'Thank you, doctor. I can to go and see my friend now.', 'Thank you, doctor. I can going to see my friend now.'], answer: 0, tip: 'Después de "can" va el verbo tal cual, sin "to": I can go.' },
    },
  ],
  reward: {
    text: 'The doctor: "Take it easy, OK?"',
    es: 'Tómalo con calma, ¿sí?',
    sub: 'Las cinco piezas del reloj siguen en su lugar, pero el centro está vacío. Tu amigo te espera en el pasillo.',
    say: 'Take it easy, OK?',
  },
}

NPC_TASKS['a2-friend'] = {
  done: 'a2-01-friend',
  requires: {
    id: 'a2-01-doctor',
    text: 'Your friend: "Hey! Go and talk to the doctor first. I can wait!"',
    es: '¡Oye! Ve a hablar primero con la médica. ¡Yo puedo esperar!',
    sub: 'La médica está en tu habitación.',
  },
  steps: [
    {
      text: "There you are! I was so worried about you. How do you feel?",
      es: '¡Ahí estás! Estaba muy preocupado por ti. ¿Cómo te sientes?',
      choice: { ask: '¿Qué le respondes?', options: ["Much better, thanks. It's good to see you!", "Much better, thanks. It's good see you!", "Much better, thanks. Is good to see you!"], answer: 0, tip: "It's good to see you: it is + good + to + verbo." },
    },
    {
      text: 'I came this morning, but you were asleep. {iname} was with you all night.',
      es: 'Vine esta mañana, pero estabas durmiendo. {iname} estuvo contigo toda la noche.',
      choice: { ask: '¿Qué le dices?', options: ['Thanks for coming. That was really kind of you.', 'Thanks for come. That was really kind of you.', 'Thanks for coming. That were really kind of you.'], answer: 0, tip: 'Thanks for + verbo con -ing (coming). "That" va con was.' },
    },
    {
      text: "Before we get your things, let's check your memory. Do you remember our old game? I put some things on a table, and you find what moved.",
      es: 'Antes de ir por tus cosas, revisemos tu memoria. ¿Te acuerdas de nuestro viejo juego? Pongo unas cosas en una mesa y tú encuentras lo que se movió.',
      choice: { ask: '¿Qué le respondes?', options: ["OK, let's play!", "OK, let's playing!", 'OK, lets to play!'], answer: 0, tip: "Let's + verbo tal cual: let's play." },
    },
  ],
  reward: {
    text: 'Your friend: "Great! Talk to me when you are ready."',
    es: '¡Genial! Háblame cuando quieras.',
    sub: 'Habla otra vez con tu amigo para jugar One More Round! Cada error te quita una vida.',
    say: 'Great! Talk to me when you are ready.',
  },
}

NPC_TASKS['a2-friend-round'] = {
  npc: 'a2-friend',
  done: 'a2-01-round',
  activity: 'round',
  steps: [],
  round: {
    visual: 'room',
    items: [
      { id: 'water', icon: '🥛', en: 'water', es: 'agua' },
      { id: 'pills', icon: '💊', en: 'pills', es: 'pastillas' },
      { id: 'apple', icon: '🍎', en: 'apple', es: 'manzana' },
      { id: 'book', icon: '📕', en: 'book', es: 'libro' },
    ],
    lines: {
      intro: { text: "Before we get your things, let's check your memory. Look carefully at your room: the water, the pills, the apple and the book.", es: 'Antes de ir por tus cosas, revisemos tu memoria. Mira bien tu habitación: el agua, las pastillas, la manzana y el libro.' },
      ask: { text: 'OK, open your eyes! One thing moved. Which one?', es: '¡Bien, abre los ojos! Una cosa se movió. ¿Cuál?' },
      name: { text: 'Yes, that one moved! And what is it in English?', es: '¡Sí, esa se movió! ¿Y cómo se dice en inglés?' },
      win: { text: 'Yes! The {item}. Your memory is still amazing!', es: '¡Sí! {item}. ¡Tu memoria sigue siendo increíble!' },
      lose: { text: "Oh no, it was the {item}! Careful, you're still tired. One more round?", es: 'Ay, no, era: {item}. Cuidado, todavía necesitas descansar. ¿Otra ronda?' },
      nameLose: { text: "Almost! It's the {item}. Let's try one more round.", es: '¡Casi! Es: {item}. Intentemos otra ronda.' },
      tired: { text: "Hey, you look very tired. Let's stop here. Your memory is OK. Let's go and get your things.", es: 'Oye, necesitas descansar. Paremos aquí. Tu memoria está bien. Vamos por tus cosas.' },
    },
  },
  reward: {
    text: 'Your friend: "Now let\'s get your things. The reception is at the end of the hallway."',
    es: 'Ahora vamos por tus cosas. La recepción está al final del pasillo.',
    sub: 'Pide tus pertenencias en la recepción.',
    say: "Now let's get your things.",
  },
}

NPC_TASKS['a2-receptionist'] = {
  done: 'a2-01-belongings',
  requires: {
    id: 'a2-01-round',
    text: 'The receptionist: "Hello! Please wait a moment. Talk to your friend first."',
    es: '¡Hola! Espera un momento, por favor. Habla primero con tu amigo.',
    sub: 'Tu amigo está en el pasillo.',
  },
  steps: [
    {
      text: 'Good afternoon! How can I help you?',
      es: '¡Buenas tardes! ¿En qué te puedo ayudar?',
      choice: { ask: '¿Qué le pides?', options: ['Could I have my things, please?', 'Could I having my things, please?', 'I could have my things, please?'], answer: 0, tip: 'Para pedir con cortesía: Could I have... please?' },
    },
    {
      text: 'Of course. Just a moment, please... Here you are: your bag and your jacket.',
      es: 'Claro. Un momento, por favor... Aquí tienes: tu bolso y tu chaqueta.',
      choice: { ask: '¿Qué le dices?', options: ['Thank you very much!', "You're welcome!", 'Excuse me!'], answer: 0, tip: 'Te entrega algo, así que agradeces: Thank you very much!' },
    },
    {
      text: 'Please check your bag. Is everything there?',
      es: 'Por favor revisa tu bolso. ¿Está todo?',
      choice: { ask: 'Revisas el bolso. ¿Qué respondes?', options: ['Yes, everything is here.', 'Yes, everything are here.', 'Yes, all is here.'], answer: 0, tip: '"Everything" va con is: everything is here.' },
    },
  ],
  reward: {
    text: 'The receptionist: "Take care, and have a nice day!"',
    es: '¡Cuídate y que tengas un buen día!',
    sub: 'Recibiste tus pertenencias: tu bolso y tu chaqueta.',
    say: 'Take care, and have a nice day!',
  },
}

// ── A2-02 — Pieces of Yesterday (hospital, después de A2-01) ──
// Recuerdos breves (dos pasos por etapa) → la persona especial llama a Leo → Leo llega → lección → práctica → combate.
// Los recuerdos son internos: los elige el protagonista en las preguntas («¿Qué recuerdas?»); el reloj no los muestra.
// Canon: el desconocido no se revela; Leo se quedó en el ascensor y nadie lo vio después.
// Orden: amigo (Something Is Missing) → recepción (The Elevator) → médica (The Stranger) → amigo (The Missing Core)
//        → persona especial (Comparing Memories) → persona especial (Pieces of Yesterday: llama a Leo)
//        → Leo (llega) → Leo (lección + práctica) → el eco corrompido (combate, en data/a2Hospital.ts)
NPC_TASKS['a2-02-missing'] = {
  npc: 'a2-friend',
  done: 'a2-02-missing',
  requires: {
    id: 'a2-01-belongings',
    text: 'Your friend: "Let\'s get your things at the reception first!"',
    es: '¡Primero vamos por tus cosas a la recepción!',
    sub: 'La recepción está al final del pasillo.',
  },
  steps: [
    {
      text: "OK, you have your bag and your jacket. But you look worried. What's wrong?",
      es: 'Bueno, ya tienes tu bolso y tu chaqueta. Pero algo te preocupa. ¿Qué pasa?',
      choice: { ask: 'Revisas todo otra vez. Las cosas están ahí, pero algo falta... ¿Qué le dices?', options: ["Something is missing. I can't remember yesterday.", "Something is missing. I can't remembered yesterday.", "Something are missing. I can't remember yesterday."], answer: 0, tip: 'Después de "can\'t" va el verbo tal cual: I can\'t remember. "Something" va con is.' },
    },
    {
      text: "Don't worry. Walk around a little. Maybe something helps you remember.",
      es: 'No te preocupes. Camina un poco. Quizá algo te ayude a recordar.',
      choice: { ask: '¿Qué le respondes?', options: ["Good idea. I'm going to walk to the reception.", "Good idea. I going to walk to the reception.", "Good idea. I'm go to walk to the reception."], answer: 0, tip: 'Para un plan: am / is / are + going to + verbo.' },
    },
  ],
  reward: {
    text: 'Your friend: "I can wait here. Go!"',
    es: 'Yo te espero aquí. ¡Ve!',
    sub: 'Algo falta en tus recuerdos de ayer. Camina hasta la recepción.',
    say: 'I can wait here. Go!',
  },
}

NPC_TASKS['a2-02-elevator'] = {
  npc: 'a2-receptionist',
  done: 'a2-02-elevator',
  requires: {
    id: 'a2-02-missing',
    text: 'The receptionist: "Take care, and have a nice day!"',
    es: '¡Cuídate y que tengas un buen día!',
    sub: 'Tu amigo quiere hablar contigo en el pasillo.',
  },
  steps: [
    {
      text: 'Hello again! Oh, sorry, that is the elevator again. The doors open and close all the time!',
      es: '¡Hola otra vez! Ay, perdón, otra vez el ascensor. ¡Las puertas se abren y se cierran todo el tiempo!',
      choice: { ask: 'Miras el ascensor. Las puertas se abren y se cierran solas... y de pronto recuerdas otro ascensor, en la torre. ¿Qué recuerdas?', options: ['Leo was checking the elevator, and we went up the stairs.', 'Leo were checking the elevator, and we went up the stairs.', 'Leo was check the elevator, and we goed up the stairs.'], answer: 0, tip: 'Algo que estaba pasando: was + verbo con -ing (Leo was checking). Go en pasado: went.' },
    },
    {
      text: 'Are you OK? You look pale.',
      es: '¿Estás bien? Tienes mala cara.',
      choice: { ask: 'Todavía piensas en Leo y en el ascensor. ¿Qué le respondes?', options: ["I'm OK. I just remembered something.", "I'm OK. I just remembering something.", "I'm OK. I just remember something yesterday."], answer: 0, tip: 'Algo que acaba de pasar: pasado simple (remembered).' },
    },
  ],
  reward: {
    text: 'The receptionist: "Please rest a little. Oh, and the doctor wants to check your leg. She is in your room."',
    es: 'Descansa un poco, por favor. Ah, y la médica quiere revisarte la pierna. Está en tu habitación.',
    sub: 'Recordaste el ascensor: Leo se quedó revisándolo y ustedes subieron por las escaleras. La médica te espera en tu habitación.',
    say: 'The doctor wants to check your leg.',
  },
}

NPC_TASKS['a2-02-stranger'] = {
  npc: 'a2-doctor',
  done: 'a2-02-stranger',
  requires: {
    id: 'a2-02-elevator',
    text: 'The doctor: "Rest a little, and drink some water. See you later!"',
    es: 'Descansa un poco y toma algo de agua. ¡Hasta luego!',
    sub: 'Sigue los objetivos de A2-02 bajo el mapa.',
  },
  steps: [
    {
      text: "Let's look at your leg. How did it happen? Did you fall?",
      es: 'Veamos tu pierna. ¿Cómo pasó? ¿Te caíste?',
      choice: { ask: 'Cierras los ojos. Recuerdas la terraza de la torre... y a alguien al borde. ¿Qué recuerdas?', options: ['A man in a dark coat was standing on the terrace.', 'A man in a dark coat were standing on the terrace.', 'A man in a dark coat was stand on the terrace.'], answer: 0, tip: 'Para describir una escena del pasado: was + verbo con -ing (was standing).' },
    },
    {
      text: 'Hmm... Take your time.',
      es: 'Mmm... Tómate tu tiempo.',
      choice: { ask: 'El recuerdo sigue. ¿Qué pasó después?', options: ['He raised his hand, and a purple light hit me.', 'He raise his hand, and a purple light hitted me.', 'He raised his hand, and a purple light hitting me.'], answer: 0, tip: 'Pasado simple para acciones seguidas: raised, hit (hit es irregular: hit - hit).' },
    },
  ],
  reward: {
    text: 'The doctor: "Nothing is broken, but you must walk slowly for a few days. Your friend is asking about you."',
    es: 'No hay nada roto, pero debes caminar despacio unos días. Tu amigo pregunta por ti.',
    sub: 'Recordaste al desconocido en la terraza: levantó la mano y una luz morada te golpeó. Tu amigo te espera en el pasillo.',
    say: 'You must walk slowly for a few days.',
  },
}

NPC_TASKS['a2-02-core'] = {
  npc: 'a2-friend',
  done: 'a2-02-core',
  requires: {
    id: 'a2-02-stranger',
    text: 'Your friend: "Did you see the doctor? I can wait here."',
    es: '¿Ya te vio la médica? Yo te espero aquí.',
    sub: 'Sigue los objetivos de A2-02 bajo el mapa.',
  },
  steps: [
    {
      text: 'Hey, can I see your clock? Five pieces... But what was in the center? Was it always empty?',
      es: 'Oye, ¿puedo ver tu reloj? Cinco piezas... ¿Pero qué había en el centro? ¿Siempre estuvo vacío?',
      choice: { ask: 'Miras el hueco del centro y llega el recuerdo: tú en el suelo de la terraza, y el desconocido agachado junto a ti. ¿Qué recuerdas?', options: ['He opened the clock and took the center.', 'He opened the clock and taked the center.', 'He was open the clock and took the center.'], answer: 0, tip: 'Take es irregular: took. Open es regular: opened.' },
    },
    {
      text: 'Wow... {iname} was there too. Talk to {iname}. Maybe you can remember more together.',
      es: 'Vaya... {iname} también estaba ahí. Habla con {iname}. Quizá juntos recuerden más.',
      choice: { ask: '¿Qué dices?', options: ['Good idea. I need to talk to {iname}.', 'Good idea. I need talk to {iname}.', 'Good idea. I needs to talk to {iname}.'], answer: 0, tip: 'Need + to + verbo: I need to talk.' },
    },
  ],
  reward: {
    text: 'Your friend: "Go! I can wait here."',
    es: '¡Ve! Yo te espero aquí.',
    sub: 'Recordaste cómo desapareció el centro del reloj. {iname} está en tu habitación.',
    say: 'Go! I can wait here.',
  },
}

NPC_TASKS['a2-interest'] = {
  done: 'a2-02-compare',
  // Antes de su momento, la persona especial está a tu lado y te anima a seguir
  requires: {
    id: 'a2-02-core',
    text: '{iname}: "{name}, I\'m so happy you\'re awake! I brought you here last night. I\'m right here, OK?"',
    es: '{name}, ¡qué alegría que despertaste! Te traje anoche. Aquí estoy, ¿sí?',
    sub: 'Sigue los objetivos bajo el mapa.',
  },
  steps: [
    {
      text: '{name}, are you OK? Do you remember last night now?',
      es: '{name}, ¿estás bien? ¿Ya recuerdas lo de anoche?',
      choice: { ask: 'Comparas tus recuerdos con los suyos. ¿Qué le cuentas?', options: ['Yes. The stranger hit me with a purple light and took the center of the clock.', 'Yes. The stranger hitted me with a purple light and taked the center of the clock.', 'Yes. The stranger hit me with a purple light and take the center of the clock.'], answer: 0, tip: 'Pasado simple: hit (hit - hit) y took (take - took).' },
    },
    {
      text: 'Yes. I was standing next to you, but everything happened so fast. Then we were back in the present, and I brought you here, step by step.',
      es: 'Sí. Estaba a tu lado, pero todo pasó muy rápido. Luego estábamos de vuelta en el presente y te traje aquí, paso a paso.',
      choice: { ask: '¿Qué le dices?', options: ['Thank you for staying with me.', 'Thank you for stay with me.', 'Thank you to stay with me.'], answer: 0, tip: 'Thank you for + verbo con -ing (staying).' },
    },
    {
      text: 'There is one more thing...',
      es: 'Hay una cosa más...',
      choice: { ask: '¿Qué le preguntas sobre Leo?', options: ['Did you see Leo after the elevator?', 'Did you saw Leo after the elevator?', 'You did see Leo after the elevator?'], answer: 0, tip: 'Pregunta en pasado: Did + you + verbo tal cual (see).' },
    },
  ],
  reward: {
    text: '{iname}: "No, I didn\'t. Let\'s put the pieces of yesterday together, and then I\'m going to call him."',
    es: 'No. Juntemos las piezas de ayer y luego lo llamo.',
    sub: 'Compararon sus recuerdos. Habla otra vez con {iname} para ordenar lo que pasó ayer.',
    say: "Let's put the pieces of yesterday together.",
  },
}

NPC_TASKS['a2-02-pieces'] = {
  npc: 'a2-interest',
  done: 'a2-02-pieces',
  steps: [
    {
      text: "OK. Let's start at the beginning. What happened first?",
      es: 'Bien. Empecemos por el principio. ¿Qué pasó primero?',
      choice: { ask: 'Ordena lo que pasó ayer. ¿Qué pasó primero?', options: ['Leo stayed to check the elevator, and we went up the stairs.', 'The stranger took the center of the clock.', 'We walked to the hospital.'], answer: 0, tip: 'Primero fue el ascensor: Leo se quedó revisándolo y ustedes subieron por las escaleras.' },
    },
    {
      text: 'And on the terrace?',
      es: '¿Y en la terraza?',
      choice: { ask: '¿Qué pasó en la terraza?', options: ['A purple light hit me, and the stranger took the center of the clock.', 'Leo was waiting for us on the terrace.', 'The doctor was standing on the terrace.'], answer: 0, tip: 'La luz morada te golpeó y el desconocido se llevó el centro. Leo se había quedado en el ascensor.' },
    },
    {
      text: 'And in the end?',
      es: '¿Y al final?',
      choice: { ask: '¿Cómo terminó todo?', options: ['We were back in the present, and we walked to the hospital.', 'We went to the elevator.', 'Leo took us to the hospital.'], answer: 0, tip: 'Volvieron al presente y caminaron despacio hasta el hospital.' },
    },
    {
      text: "Now we have all the pieces of yesterday. Write them in your diary, OK? And now... I'm going to call Leo.",
      es: 'Ahora tenemos todas las piezas de ayer. Escríbelas en tu diario, ¿sí? Y ahora... voy a llamar a Leo.',
    },
  ],
  reward: {
    text: '{iname}: "Leo answered! He is OK, and he is coming to the hospital."',
    es: '¡Leo contestó! Está bien y viene al hospital.',
    sub: 'Tu diario tiene un capítulo nuevo: Pieces of Yesterday. {iname} llamó a Leo: búscalo en el pasillo.',
    say: 'Leo is coming to the hospital.',
  },
}

// Leo llega al hospital (punto de progresión: a2-02-leo). No cuenta qué le pasó: eso queda para después
NPC_TASKS['a2-leo'] = {
  done: 'a2-02-leo',
  // Leo llega: el protagonista se recupera (la vida vuelve al máximo antes de la lección y el combate)
  heal: true,
  steps: [
    {
      text: '{name}! There you are! I came as fast as I could.',
      es: '¡{name}! ¡Ahí estás! Vine lo más rápido que pude.',
      choice: { ask: '¿Qué le dices?', options: ['Leo! Are you OK? Where were you?', 'Leo! Are you OK? Where was you?', 'Leo! Are you OK? Where you were?'], answer: 0, tip: 'Pregunta en pasado con you: Where + were + you?' },
    },
    {
      text: "I'm OK. It's a long story... I'm here now, and that's what matters. The doctor told me about your leg.",
      es: 'Estoy bien. Es una historia larga... Ya estoy aquí, y eso es lo importante. La médica me contó lo de tu pierna.',
      choice: { ask: '¿Qué le respondes?', options: ["I'm so happy you're here.", "I'm so happy you here.", "I so happy you're here."], answer: 0, tip: "I'm happy + you're (you are) here." },
    },
    {
      text: "Doctors give a lot of advice and a lot of rules. You have to understand them! Let me teach you, like old times.",
      es: 'Los médicos dan muchos consejos y muchas reglas. ¡Tienes que entenderlos! Déjame enseñarte, como en los viejos tiempos.',
      choice: { ask: '¿Qué le respondes?', options: ['OK, teach me!', 'OK, teach to me!', 'OK, teaches me!'], answer: 0, tip: 'Una orden o petición: el verbo tal cual (teach) + me.' },
    },
  ],
  reward: {
    text: 'Leo: "Lesson time! Talk to me when you are ready."',
    es: '¡Hora de la lección! Háblame cuando quieras.',
    sub: 'Habla otra vez con Leo: te enseña should, must y have to, y luego practican.',
    say: 'Lesson time!',
  },
}

// La lección de Leo (sistema de lecciones, tema should-must) y después la práctica guiada (8 frases)
NPC_TASKS['a2-02-practice'] = {
  npc: 'a2-leo',
  done: 'a2-02-practice',
  lesson: 'should-must',
  activity: 'practice',
  practice: 'should-must',
  steps: [],
  reward: {
    text: 'Leo: "Great job! Hey... look at that man in the hallway. Something is wrong with him."',
    es: '¡Muy bien! Oye... mira a ese hombre del pasillo. Algo le pasa.',
    sub: 'Un eco corrompido apareció al final del pasillo: da consejos con errores. Corrígelo con should, must y have to.',
    say: 'Something is wrong with him.',
  },
}

// ── A2-03 — Day in the City (alcance mínimo, escena en data/a2City.ts) ──
// Orden: Leo (llega) → Leo (lección + práctica) → tu amigo (invitación) → el mesero (charla con presión)
//        → el eco del café (combate en 2 fases) → tu amigo (Sequence Master) → tu amigo (cierre con anomalía).
NPC_TASKS['a2-03-leo'] = {
  done: 'a2-03-arrive',
  steps: [
    {
      text: "{name}! You're out of the hospital! The doctor says you can walk now. How about spending the day in the city?",
      es: '¡{name}! ¡Saliste del hospital! La médica dice que ya puedes caminar. ¿Qué tal si pasamos el día en la ciudad?',
      choice: { ask: '¿Qué le respondes?', options: ["Good idea! Let's go!", "Good idea! Let's going!", "Good idea! Let's to go!"], answer: 0, tip: "Let's + verbo tal cual: let's go." },
    },
    {
      text: "Great! But first, a quick lesson. In the city you make plans with friends. Let me show you how.",
      es: '¡Genial! Pero primero, una lección rápida. En la ciudad haces planes con amigos. Te enseño cómo.',
      choice: { ask: '¿Qué le dices?', options: ['OK, teach me!', 'OK, teach to me!', 'OK, teaches me!'], answer: 0, tip: 'Petición: el verbo tal cual (teach) + me.' },
    },
  ],
  reward: {
    text: 'Leo: "Talk to me when you are ready for the lesson."',
    es: 'Háblame cuando estés listo para la lección.',
    sub: "Habla otra vez con Leo: te enseña let's, how about, would you like y la frecuencia.",
    say: 'Talk to me when you are ready.',
  },
}

// La lección de Leo (tema invitations) y la práctica guiada (7 frases)
NPC_TASKS['a2-03-practice'] = {
  npc: 'a2-03-leo',
  done: 'a2-03-practice',
  lesson: 'invitations',
  activity: 'practice',
  practice: 'invitations',
  // 4 frases de antes + 2 de ordenar + 1 de escribir una invitación
  practiceIds: ['a2-03-o1', 'a2-03-f1', 'a2-03-o2', 'a2-03-x1', 'a2-03-o3', 'a2-03-o4', 'T-a2-03-o5'],
  steps: [],
  reward: {
    text: 'Leo: "Well done! Look, your friend is on the street. Go and say hi!"',
    es: '¡Bien hecho! Mira, tu amigo está en la calle. ¡Ve a saludarlo!',
    sub: 'Tu amigo te espera en la calle, junto a la cebra.',
    say: 'Go and say hi!',
  },
}

NPC_TASKS['a2-03-friend'] = {
  done: 'a2-03-invite',
  requires: {
    id: 'a2-03-practice',
    text: 'Your friend: "Hey! Leo is looking for you. Talk to him first!"',
    es: '¡Oye! Leo te está buscando. ¡Habla primero con él!',
    sub: 'Leo está en la calle, cerca de la parada.',
  },
  steps: [
    {
      text: "Hi! You look much better! Would you like to have a coffee with me at the café?",
      es: '¡Hola! ¡Te ves mucho mejor! ¿Te gustaría tomar un café conmigo en el café?',
      choice: { ask: 'Aceptas la invitación. ¿Qué le dices?', options: ["Sure! I'd love to.", "Sure! I'd love.", "Sure! I love to."], answer: 0, tip: "Para aceptar: I'd love to (I would love to)." },
    },
    {
      text: 'Great! I go there a lot. And you? How often do you drink coffee?',
      es: '¡Genial! Yo voy mucho. ¿Y tú? ¿Con qué frecuencia tomas café?',
      choice: { ask: '¿Qué le respondes?', options: ['I sometimes drink coffee in the morning.', 'I drink sometimes coffee in the morning.', 'I sometimes drinks coffee in the morning.'], answer: 0, tip: 'La frecuencia va antes del verbo, y con I sin -s: I sometimes drink.' },
    },
    {
      text: "Me too! Oh... look at the waiter. He usually smiles, but today he looks strange.",
      es: '¡Yo también! Oh... mira al mesero. Normalmente sonríe, pero hoy se ve raro.',
      choice: { ask: '¿Qué le dices?', options: ["How about going and talking to him?", "How about go and talk to him?", "How about to go and talk to him?"], answer: 0, tip: 'How about + verbo con -ing: going, talking.' },
    },
  ],
  reward: {
    text: 'Your friend: "Let\'s go in. Be careful with the waiter..."',
    es: 'Entremos. Cuidado con el mesero...',
    sub: 'Entra al café y habla con el mesero. ¡Responde rápido!',
    say: 'Be careful!',
  },
}

// Dialogue Under Pressure: el mesero habla rápido y espera tu respuesta (aceptar, rechazar, aclarar)
NPC_TASKS['a2-03-waiter'] = {
  done: 'a2-03-pressure',
  pressure: 12,
  steps: [
    {
      text: 'Good morning! Quick, quick! Would you like a table by the window?',
      es: '¡Buenos días! ¡Rápido, rápido! ¿Quieren una mesa junto a la ventana?',
      choice: { ask: 'Acepta la mesa.', options: ['Yes, please. That would be great.', 'Yes, please. That would being great.', 'Yes, please. That will great.'], answer: 0, tip: 'Para aceptar con cortesía: Yes, please. That would be great.' },
    },
    {
      text: 'How about our special purple coffee? You must try it! Everybody drinks it today!',
      es: '¿Qué tal nuestro café morado especial? ¡Tienes que probarlo! ¡Hoy todos lo toman!',
      choice: { ask: 'Ese café no te gusta nada. Recházalo con amabilidad.', options: ["No, thank you. I'd like a black coffee, please.", "No, thank you. I like a black coffee, please.", "No, thanks you. I'd like a black coffee, please."], answer: 0, tip: "Rechaza y pide otra cosa: No, thank you. I'd like... please." },
    },
    {
      text: 'Blackcoffeeforyouandpurplecoffeeforyourfriendandyoumustpaynowandstayforever!',
      es: '(Habla tan rápido que no se entiende nada.)',
      choice: { ask: 'No entendiste nada. Pide que lo repita.', options: ['Sorry, can you say that again, please?', 'Sorry, can you say again that, please?', 'Sorry, you can say that again, please?'], answer: 0, tip: 'Para aclarar: Sorry, can you say that again, please?' },
    },
    {
      text: 'Stay... forever... You MUST stay!',
      es: 'Quédense... para siempre... ¡DEBEN quedarse!',
    },
  ],
  reward: {
    text: 'The waiter\'s eyes are purple now!',
    es: '¡Los ojos del mesero ahora son morados!',
    sub: 'El mesero se corrompió. Choca con él para el combate: primero reglas, luego invitaciones.',
    say: 'You must stay!',
  },
}

// Sequence Master: ordenar el plan del día (los pasos salen desordenados)
NPC_TASKS['a2-03-plan'] = {
  npc: 'a2-03-friend',
  done: 'a2-03-plan',
  activity: 'sequence',
  requires: {
    id: 'a2-03-echo',
    text: 'Your friend: "The waiter looks strange. Go to the café and help him!"',
    es: 'El mesero se ve raro. ¡Ve al café y ayúdalo!',
    sub: 'El mesero está en el café.',
  },
  sequence: {
    title: 'Plan del día',
    intro: { en: "You helped the waiter! Let's plan the rest of the day. At twelve we have lunch, at two we walk in the park, at four we visit the shop, and at six we go home.", es: '¡Ayudaste al mesero! Planeemos el resto del día. A las doce almorzamos, a las dos caminamos por el parque, a las cuatro vamos a la tienda y a las seis volvemos a casa.' },
    steps: [
      { en: 'First, we have lunch at twelve.', es: 'Primero, almorzamos a las doce.' },
      { en: 'Then, we walk in the park at two.', es: 'Luego, caminamos por el parque a las dos.' },
      { en: 'After that, we visit the shop at four.', es: 'Después, vamos a la tienda a las cuatro.' },
      { en: 'Finally, we go home at six.', es: 'Por último, volvemos a casa a las seis.' },
    ],
  },
  steps: [],
  reward: {
    text: 'Your friend: "Perfect plan! Wait... do you hear that?"',
    es: '¡Plan perfecto! Espera... ¿oyes eso?',
    sub: 'Habla otra vez con tu amigo.',
    say: 'Perfect plan!',
  },
}

// Cierre: una pequeña anomalía (sin revelar nada de B1/B2)
NPC_TASKS['a2-03-close'] = {
  npc: 'a2-03-friend',
  done: 'a2-03-close',
  steps: [
    {
      text: 'Look at the clock in the plaza! It stopped... and now its hands are moving backwards!',
      es: '¡Mira el reloj de la plaza! Se detuvo... ¡y ahora sus manecillas van hacia atrás!',
      choice: { ask: 'Miras tu reloj: el centro vacío brilla un segundo. ¿Qué dices?', options: ['That is strange. My clock is shining too!', 'That is strange. My clock shining too!', 'That are strange. My clock is shining too!'], answer: 0, tip: 'Algo que pasa ahora: is + verbo con -ing (is shining).' },
    },
    {
      text: "Now it's normal again. Maybe it was nothing... Come on, let's enjoy the day!",
      es: 'Ya está normal otra vez. Quizá no fue nada... Vamos, ¡disfrutemos el día!',
    },
  ],
  reward: {
    text: 'Your friend: "Let\'s enjoy the day!"',
    es: '¡Disfrutemos el día!',
    sub: 'A2-03 completada. Por un segundo, el centro vacío de tu reloj brilló con una luz morada... y luego nada.',
    say: "Let's enjoy the day!",
  },
}

// ── A2-04 — Mr. Hale's Workshop (alcance mínimo con jefe, escena en data/a2Workshop.ts) ──
// Orden: Leo (llega) → Leo (lección + práctica) → Mr. Hale (charla con presión) → Leo (Fix the Radio: arreglar la radio)
//        → Mr. Hale corrompido (jefe en 2 fases) → Leo (cierre con el fragmento y una pista).
NPC_TASKS['a2-04-leo'] = {
  done: 'a2-04-arrive',
  steps: [
    {
      text: '{name}, the clock in the plaza moved backwards... So I called Mr. Hale. He repairs clocks, radios, bikes... everything! This is his workshop.',
      es: '{name}, el reloj de la plaza fue hacia atrás... Así que llamé al señor Hale. Arregla relojes, radios, bicicletas... ¡todo! Este es su taller.',
      choice: { ask: 'Quieres que el señor Hale mire tu reloj. ¿Qué le pides a Leo?', options: ['Great! Could you introduce me to him?', 'Great! Could you introducing me to him?', 'Great! Could you to introduce me to him?'], answer: 0, tip: 'Could you + verbo tal cual: Could you introduce...?' },
    },
    {
      text: 'Sure! But Mr. Hale is very busy, and he talks fast. In a workshop you ask for things politely. Let me teach you first.',
      es: '¡Claro! Pero el señor Hale está muy ocupado y habla rápido. En un taller las cosas se piden con cortesía. Déjame enseñarte primero.',
      choice: { ask: '¿Qué le dices?', options: ['OK. Can you teach me now?', 'OK. Can you teaching me now?', 'OK. Can you teaches me now?'], answer: 0, tip: 'Can you + verbo tal cual: Can you teach...?' },
    },
  ],
  reward: {
    text: 'Leo: "Talk to me when you are ready for the lesson."',
    es: 'Háblame cuando estés listo para la lección.',
    sub: 'Habla otra vez con Leo: te enseña peticiones corteses, instrucciones y palabras del taller.',
    say: 'Talk to me when you are ready.',
  },
}

// La lección de Leo (tema requests: peticiones, instrucciones, responsabilidades y herramientas) y la práctica guiada (5 frases)
NPC_TASKS['a2-04-practice'] = {
  npc: 'a2-04-leo',
  done: 'a2-04-practice',
  lesson: 'requests',
  activity: 'practice',
  practice: 'requests',
  // completar, ordenar, completar instrucción, corregir y escribir una petición
  practiceIds: ['a2-04-r1', 'a2-04-r3', 'a2-04-i2', 'a2-04-r5', 'T-a2-04-r7'],
  steps: [],
  reward: {
    text: 'Leo: "Well done! Mr. Hale is at the workbench. Go and talk to him... and be quick!"',
    es: '¡Bien hecho! El señor Hale está en la mesa de trabajo. Ve a hablar con él... ¡y sé rápido!',
    sub: 'El señor Hale está junto a las mesas de trabajo. Habla rápido: tiene mucha prisa.',
    say: 'Be quick!',
  },
}

// Dialogue Under Pressure: Mr. Hale tiene prisa; pides que mire tu reloj, pides ayuda y que repita más despacio
NPC_TASKS['a2-04-hale'] = {
  done: 'a2-04-pressure',
  pressure: 12,
  requires: {
    id: 'a2-04-practice',
    text: 'Mr. Hale: "Sorry, I\'m very busy right now! Talk to Leo first."',
    es: 'Perdón, ¡ahora estoy muy ocupado! Habla primero con Leo.',
    sub: 'Leo está en el taller, cerca de las cajas de herramientas.',
  },
  steps: [
    {
      text: "Hi! Leo's friend, right? Sorry, I'm in a hurry! Quick, what do you need?",
      es: '¡Hola! Eres el amigo de Leo, ¿verdad? Perdón, ¡tengo prisa! Rápido, ¿qué necesitas?',
      choice: { ask: 'Pídele con cortesía que mire tu reloj.', options: ['Could you look at my clock, please?', 'Could you looking at my clock, please?', 'Could you to look at my clock, please?'], answer: 0, tip: 'Could you + verbo tal cual + please?' },
    },
    {
      text: 'Your clock? Hmm, the center is empty... Strange! OK, but first help me. My hands are busy!',
      es: '¿Tu reloj? Mmm, el centro está vacío... ¡Qué raro! Bueno, pero primero ayúdame. ¡Tengo las manos ocupadas!',
      choice: { ask: 'Necesitas que sostenga la escalera un momento. Pídelo con mucha cortesía.', options: ['Would you mind holding the ladder for me?', 'Would you mind hold the ladder for me?', 'Would you mind to hold the ladder for me?'], answer: 0, tip: 'Would you mind + verbo con -ing: holding.' },
    },
    {
      text: 'Firstturnofftheradiothenopentheboxafterthatchangethebatteryandfinally...',
      es: '(Habla tan rápido que no se entiende nada.)',
      choice: { ask: 'No entendiste nada. Pide que lo diga más despacio.', options: ['Sorry, could you say that more slowly, please?', 'Sorry, could you saying that more slowly, please?', 'Sorry, you could say that more slowly, please?'], answer: 0, tip: 'Para aclarar: Sorry, could you say that more slowly, please?' },
    },
    {
      text: 'Oh no... my notes! The steps are all on the floor. Leo, could you help?',
      es: 'Oh, no... ¡mis notas! Los pasos están todos en el piso. Leo, ¿podrías ayudar?',
    },
  ],
  reward: {
    text: 'Mr. Hale: "I have to fix this old radio today!"',
    es: '¡Tengo que arreglar esta radio vieja hoy!',
    sub: 'Las notas del señor Hale se cayeron. Habla con Leo: él lee las notas y tú arreglas la radio paso a paso.',
    say: 'I have to fix this old radio today!',
  },
}

// Fix the Radio: seguir las instrucciones del señor Hale y tocar la pieza de cada paso
NPC_TASKS['a2-04-sequence'] = {
  npc: 'a2-04-leo',
  done: 'a2-04-sequence',
  activity: 'fixradio',
  requires: {
    id: 'a2-04-pressure',
    text: 'Leo: "Go and talk to Mr. Hale. He is at the workbench."',
    es: 'Ve a hablar con el señor Hale. Está en la mesa de trabajo.',
    sub: 'El señor Hale está junto a las mesas de trabajo.',
  },
  fixradio: {
    title: 'Arreglar la radio',
    intro: { en: "Mr. Hale's radio is in pieces. I can read his notes. Listen and do it step by step.", es: 'La radio del señor Hale está en pedazos. Puedo leer sus notas. Escucha y hazlo paso a paso.' },
    steps: [
      { en: 'First, please put the new battery in the radio.', es: 'Primero, por favor, pon la batería nueva en la radio.', piece: 'battery', tip: 'Battery = batería (la pieza verde con +).' },
      { en: 'Then, put in the two screws to close the battery box.', es: 'Luego, pon los dos tornillos para cerrar la caja de la batería.', piece: 'screws', tip: 'Screws = tornillos (las dos piezas pequeñas de metal).' },
      { en: 'Next, could you put the dial on the front?', es: 'Después, ¿podrías poner la perilla del dial al frente?', piece: 'dial', tip: 'Dial = la perilla redonda para cambiar la emisora.' },
      { en: 'After that, put the antenna on top.', es: 'Luego de eso, pon la antena arriba.', piece: 'antenna', tip: 'Antenna = antena (la varilla larga).' },
      { en: 'Finally, turn on the radio!', es: '¡Por último, enciende la radio!', piece: 'switch', tip: 'Turn on = encender: toca el interruptor OFF de la radio.' },
    ],
  },
  steps: [],
  reward: {
    text: 'Leo: "The radio is on! But... look at Mr. Hale. That purple light is in his hands!"',
    es: '¡La radio funciona! Pero... mira al señor Hale. ¡Esa luz morada está en sus manos!',
    sub: 'El señor Hale se corrompió. Choca con él para el combate: primero peticiones, luego instrucciones.',
    say: 'Look at Mr. Hale!',
  },
}

// Cierre: el fragmento liberado y una pista breve (sin revelar nada de B1/B2)
NPC_TASKS['a2-04-close'] = {
  npc: 'a2-04-leo',
  done: 'a2-04-close',
  requires: {
    id: 'a2-04-hale-boss',
    text: 'Leo: "Mr. Hale needs help! Could you stop him? Be careful!"',
    es: '¡El señor Hale necesita ayuda! ¿Podrías detenerlo? ¡Ten cuidado!',
    sub: 'El señor Hale está corrompido junto a las mesas de trabajo.',
  },
  steps: [
    {
      text: 'A man in a dark coat, and he never said a word... Do you remember the stranger on the terrace?',
      es: 'Un hombre con abrigo oscuro que nunca dijo una palabra... ¿Recuerdas al desconocido de la terraza?',
      choice: { ask: 'Miras la piedrita morada. ¿Qué le dices a Leo?', options: ['Yes. Could you help me find him?', 'Yes. Could you helping me find him?', 'Yes. Could you to help me find him?'], answer: 0, tip: 'Could you + verbo tal cual: Could you help...?' },
    },
    {
      text: "Of course! First, we keep the stone safe. Then, we look for more purple lights. It's our job now!",
      es: '¡Por supuesto! Primero, guardamos bien la piedra. Luego, buscamos más luces moradas. ¡Ahora ese es nuestro trabajo!',
    },
  ],
  reward: {
    text: 'Leo: "It\'s our job now!"',
    es: '¡Ahora es nuestro trabajo!',
    sub: 'A2-04 completada. Guardaste el fragmento morado: cerca de él, el centro vacío de tu reloj vibra un poco.',
    say: "It's our job now!",
  },
}

// ── A2-05 — Words That Don't Belong (biblioteca, presente; escena en data/a2Library.ts) ──
// Orden: Leo (llega) → Leo (lección de Past Simple + práctica) → Mrs. Okafor (testimonio) → Mrs. Okafor (Reconstruct the Story:
//        contrastar pistas) → Mrs. Okafor (Sequence Master: ordenar la nota) → el eco de tinta (jefe ligero en 2 fases) → Leo (cierre con el fragmento y una pista).
NPC_TASKS['a2-05-leo'] = {
  done: 'a2-05-arrive',
  steps: [
    {
      text: "{name}, Mr. Hale's note had no name. So yesterday I called the library. Mrs. Okafor said strange things happened here!",
      es: '{name}, la nota del señor Hale no tenía nombre. Así que ayer llamé a la biblioteca. ¡La señora Okafor dijo que aquí pasaron cosas raras!',
      choice: { ask: 'Quieres saber qué pasó. ¿Qué le preguntas a Leo?', options: ['Really? What happened yesterday?', 'Really? What happen yesterday?', 'Really? What did happened yesterday?'], answer: 0, tip: 'Pregunta por el sujeto: What happened...? (sin did).' },
    },
    {
      text: 'Some words in the books changed. People here talk about the past all day, so first... a little lesson!',
      es: 'Algunas palabras de los libros cambiaron. Aquí la gente habla del pasado todo el día, así que primero... ¡una pequeña lección!',
      choice: { ask: '¿Qué le dices?', options: ['OK! I studied a lot last week.', 'OK! I studyed a lot last week.', 'OK! I study a lot last week.'], answer: 0, tip: 'study → studied (y cambia a i).' },
    },
  ],
  reward: {
    text: 'Leo: "Talk to me when you are ready for the lesson."',
    es: 'Háblame cuando estés listo para la lección.',
    sub: 'Habla otra vez con Leo: te enseña el pasado simple, los conectores de tiempo y a comparar.',
    say: 'Talk to me when you are ready.',
  },
}

// La lección de Leo (tema past-simple) y la práctica guiada: completar, ordenar, corregir, escribir y conectar
NPC_TASKS['a2-05-practice'] = {
  npc: 'a2-05-leo',
  done: 'a2-05-practice',
  lesson: 'past-simple',
  activity: 'practice',
  practice: 'past-simple',
  practiceIds: ['a2-05-r1', 'a2-05-i5', 'a2-05-i3', 'W-a2-05-i1', 'a2-05-c1'],
  steps: [],
  reward: {
    text: 'Leo: "Well done! Mrs. Okafor is at the front desk. Ask her what happened."',
    es: '¡Bien hecho! La señora Okafor está en el mostrador. Pregúntale qué pasó.',
    sub: 'Mrs. Okafor, la bibliotecaria, está frente al mostrador.',
    say: 'Ask her what happened.',
  },
}

// El testimonio de la bibliotecaria, en pasado
NPC_TASKS['a2-05-librarian'] = {
  done: 'a2-05-testimony',
  requires: {
    id: 'a2-05-practice',
    text: 'Mrs. Okafor: "Welcome! Please talk to your friend Leo first. He is by the shelves."',
    es: '¡Bienvenido! Por favor habla primero con tu amigo Leo. Está junto a las estanterías.',
    sub: 'Leo está cerca de las estanterías.',
  },
  steps: [
    {
      text: "Hello! You are Leo's friend. I'm Mrs. Okafor. Thank you for coming. Yesterday was a very strange day here.",
      es: '¡Hola! Eres el amigo de Leo. Soy la señora Okafor. Gracias por venir. Ayer fue un día muy raro aquí.',
      choice: { ask: 'Pídele que te cuente.', options: ['What did you see?', 'What did you saw?', 'What you saw?'], answer: 0, tip: 'Pregunta en pasado: did + verbo simple (see, no saw).' },
    },
    {
      text: 'A reader opened an old book about clocks. Then the words started to change: "goed", "buyed", "eated"... Words that don\'t belong!',
      es: 'Un lector abrió un libro viejo sobre relojes. Luego las palabras empezaron a cambiar: "goed", "buyed", "eated"... ¡Palabras que no pertenecen!',
      choice: { ask: 'Miras el libro desde lejos. ¿Qué dices?', options: ['That book is older than the library!', 'That book is more old than the library!', 'That book is oldest than the library!'], answer: 0, tip: 'Comparar: old → older than.' },
    },
    {
      text: 'The reader wrote everything in a note. But the ink changed it... Some facts are wrong now, and the lines are mixed up!',
      es: 'El lector escribió todo en una nota. Pero la tinta la cambió... Ahora algunos datos están mal y las líneas están revueltas.',
    },
  ],
  reward: {
    text: 'Mrs. Okafor: "Here are my notes, the library record and the returns card. Could you find the truth?"',
    es: 'Aquí están mis apuntes, el registro de la biblioteca y la tarjeta de devoluciones. ¿Podrías encontrar la verdad?',
    sub: 'Habla otra vez con Mrs. Okafor: compara las pistas con la nota del lector (Reconstruct the Story).',
    say: 'Could you find the truth?',
  },
}

// Reconstruct the Story: contrastar cada línea de la nota corrompida con una pista y elegir la frase verdadera
NPC_TASKS['a2-05-reconstruct'] = {
  npc: 'a2-05-librarian',
  done: 'a2-05-reconstruct',
  activity: 'reconstruct',
  requires: {
    id: 'a2-05-testimony',
    text: 'Mrs. Okafor: "Please, talk to me first."',
    es: 'Por favor, habla conmigo primero.',
    sub: 'Mrs. Okafor está frente al mostrador.',
  },
  reconstruct: {
    title: 'What really happened?',
    intro: { en: "The ink changed the reader's note. Read each clue and choose what really happened.", es: 'La tinta cambió la nota del lector. Lee cada pista y elige lo que pasó de verdad.' },
    items: [
      {
        source: 'Mrs. Okafor',
        clue: { en: 'The reader came in at nine. I opened the door for him.', es: 'El lector entró a las nueve. Yo le abrí la puerta.' },
        claim: { en: 'The reader arrive at ten.', es: 'El lector "llega" a las diez.' },
        options: ['The reader arrived at nine.', 'The reader arrived at ten.', 'The reader arrive at nine.'],
        answer: 0,
        tip: 'Llegó a las nueve, y arrive → arrived.',
      },
      {
        source: 'Library record',
        clue: { en: 'Book: "Old Clocks". Shelf 3. Taken at 9:15.', es: 'Libro: "Relojes viejos". Estante 3. Tomado a las 9:15.' },
        claim: { en: 'He taked a book about cars.', es: '"Tomó" un libro sobre carros.' },
        options: ['He took a book about clocks.', 'He took a book about cars.', 'He taked a book about clocks.'],
        answer: 0,
        tip: 'El libro era sobre relojes, y take → took (irregular).',
      },
      {
        source: 'Mrs. Okafor',
        clue: { en: 'He told me: "The light was small and purple."', es: 'Él me dijo: "La luz era pequeña y morada".' },
        claim: { en: 'He seed a big green light.', es: '"Vio" una luz verde y grande.' },
        options: ['He saw a small purple light.', 'He saw a big green light.', 'He seed a small purple light.'],
        answer: 0,
        tip: 'La luz era pequeña y morada, y see → saw (irregular).',
      },
      {
        source: 'The old book',
        clue: { en: 'Page 12: "Yesterday I goed to the shop and buyed a clock."', es: 'Página 12: "Ayer *fui a la tienda y *compré un reloj" (con errores).' },
        claim: { en: 'The pictures in the book changed.', es: 'Los dibujos del libro cambiaron.' },
        options: ['The words in the book changed.', 'The pictures in the book changed.', 'The words in the book changeed.'],
        answer: 0,
        tip: 'Cambiaron las palabras, y change → changed (solo -d).',
      },
      {
        source: 'Returns card',
        clue: { en: 'Returned last week. No name.', es: 'Devuelto la semana pasada. Sin nombre.' },
        claim: { en: 'Someone returned the book yesterday.', es: 'Alguien devolvió el libro ayer.' },
        options: ['Someone returned the book last week.', 'Someone returned the book yesterday.', 'Someone return the book last week.'],
        answer: 0,
        tip: 'Fue la semana pasada (last week), y return → returned.',
      },
    ],
  },
  steps: [],
  reward: {
    text: 'Mrs. Okafor: "Now we know the truth. But the lines of the note are still mixed up..."',
    es: 'Ahora sabemos la verdad. Pero las líneas de la nota siguen revueltas...',
    sub: 'Habla otra vez con Mrs. Okafor para poner la nota en orden (Sequence Master).',
    say: 'Now we know the truth.',
  },
}

// Sequence Master: poner en orden la nota ya corregida
NPC_TASKS['a2-05-sequence'] = {
  npc: 'a2-05-librarian',
  done: 'a2-05-sequence',
  activity: 'sequence',
  requires: {
    id: 'a2-05-reconstruct',
    text: 'Mrs. Okafor: "First, let\'s find the truth. Talk to me."',
    es: 'Primero, encontremos la verdad. Habla conmigo.',
    sub: 'Mrs. Okafor está frente al mostrador.',
  },
  sequence: {
    title: "Put the reader's note in order",
    hint: 'Mira las palabras de orden: Yesterday morning, First, Then, After that, Finally.',
    intro: { en: "The facts are right now, but the lines are mixed up. Let's put what happened yesterday in order.", es: 'Los datos ya están bien, pero las líneas están revueltas. Ordenemos lo que pasó ayer.' },
    steps: [
      { en: 'Yesterday morning, I arrived at the library at nine.', es: 'Ayer en la mañana llegué a la biblioteca a las nueve.' },
      { en: 'First, I took an old book about clocks from the shelf.', es: 'Primero, tomé un libro viejo sobre relojes de la estantería.' },
      { en: 'Then, I saw a little purple light between the pages.', es: 'Luego, vi una lucecita morada entre las páginas.' },
      { en: 'After that, the words changed: "goed", "buyed", "eated"!', es: 'Después, las palabras cambiaron: "goed", "buyed", "eated".' },
      { en: 'Finally, I closed the book and called Mrs. Okafor.', es: 'Por último, cerré el libro y llamé a la señora Okafor.' },
    ],
  },
  steps: [],
  reward: {
    text: 'Leo: "The story is complete! But... look at the reading table. The ink is moving!"',
    es: '¡La historia está completa! Pero... mira la mesa de lectura. ¡La tinta se mueve!',
    sub: 'Un eco de tinta salió del libro viejo junto a la mesa de lectura. Choca con él: primero pasados regulares, luego irregulares.',
    say: 'The ink is moving!',
  },
}

// Cierre: el fragmento liberado y una pista breve (sin revelar nada de B1/B2)
NPC_TASKS['a2-05-close'] = {
  npc: 'a2-05-leo',
  done: 'a2-05-close',
  requires: {
    id: 'a2-05-ink-echo',
    text: 'Leo: "The ink is everywhere! Could you stop it? Be careful!"',
    es: '¡La tinta está por todas partes! ¿Podrías detenerla? ¡Ten cuidado!',
    sub: 'El eco de tinta está junto a la mesa de lectura.',
  },
  steps: [
    {
      text: 'Look, there was a bookmark in the old book. Someone returned it last week... and there is a drawing of a clock on it. It looks like yours!',
      es: 'Mira, había un separador en el libro viejo. Alguien lo devolvió la semana pasada... y tiene el dibujo de un reloj. ¡Se parece al tuyo!',
      choice: { ask: 'Comparas el dibujo con tu reloj. ¿Qué dices?', options: ['Yes! But the drawing was bigger than my clock.', 'Yes! But the drawing was more big than my clock.', 'Yes! But the drawing were bigger than my clock.'], answer: 0, tip: 'big → bigger than · the drawing → was.' },
    },
    {
      text: 'An old radio, an old book... The purple lights hide in old things. We found two. Let\'s keep looking!',
      es: 'Una radio vieja, un libro viejo... Las luces moradas se esconden en cosas viejas. Encontramos dos. ¡Sigamos buscando!',
    },
  ],
  reward: {
    text: 'Leo: "We found two. Let\'s keep looking!"',
    es: 'Encontramos dos. ¡Sigamos buscando!',
    sub: 'A2-05 completada. Guardaste otro fragmento morado y el separador con el dibujo del reloj.',
    say: "Let's keep looking!",
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
