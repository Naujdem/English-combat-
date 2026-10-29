import type { TopicId } from '../game/types'
import type { MiniStep } from '../components/MiniTalk'

/**
 * Tareas de personajes que no pelean: una charla corta con elecciones (MiniTalk).
 * Al terminarla se guarda `done` en `opened`. Si tiene `lesson`, Leo enseña ese tema antes.
 * Si tiene `requires`, el personaje no abre la tarea hasta que esté en `opened`.
 */
export type NpcTask = {
  done: string
  lesson?: TopicId
  requires?: { id: string; text: string; es: string; sub: string }
  steps: MiniStep[]
  reward: { text: string; es?: string; sub: string; say?: string }
  shield?: boolean
  outfit?: string
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
        text: "Hi! I'm Maya's dad. Maya is in her room. She loves reading. She reads all day!",
        es: '¡Hola! Soy el papá de Maya. Maya está en su cuarto. Le encanta leer. ¡Lee todo el día!',
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
  joe: {
    done: 'barrio-photo',
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
