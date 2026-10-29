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
  activity?: 'guess' | 'pens'
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
