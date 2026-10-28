import type { FriendDef, Interest } from '../game/types'

/**
 * Amigos de la escuela. Cada conversación se desbloquea cuando el protagonista
 * recupera el tema de gramática indicado en `requires`. Completar una conversación
 * sube un nivel de amistad.
 */
export const FRIENDS: Record<string, FriendDef> = {
  leo: {
    id: 'leo',
    name: 'Leo',
    theme: 'Videojuegos',
    look: { shirt: '#3b9d5d', hair: '#2d2d3a', skin: '#e0ac69', gender: 'male' },
    conversations: [
      {
        requires: null,
        level: 'A1',
        title: 'Un compañero nuevo',
        lines: [
          { who: 'friend', text: 'Hi! I am Leo. I am in your class.', es: '¡Hola! Soy Leo. Estoy en tu clase.' },
          { who: 'narrator', text: 'Quieres responder, pero no te sale la voz.' },
          { who: 'friend', text: "Oh... you can't talk? Are you OK?", es: '¿No puedes hablar? ¿Estás bien?' },
          {
            who: 'hero',
            text: 'Leo te pregunta si estás bien. ¿Qué gesto haces?',
            choice: {
              options: ['(Asentir con la cabeza)', '(Señalar la pizarra)', '(Salir corriendo)'],
              answer: 0,
              tip: '"Are you OK?" significa "¿Estás bien?". Asentir es responder que sí.',
            },
          },
          { who: 'friend', text: "Good! Don't worry. I can help you. The verb TO BE is easy!", es: '¡Bien! No te preocupes. Puedo ayudarte. ¡El verbo TO BE es fácil!' },
        ],
      },
      {
        requires: 'to-be',
        level: 'A1',
        title: 'Hablemos de juegos',
        lines: [
          { who: 'friend', text: 'You can talk again! Great! Are you a gamer?', es: '¡Ya puedes hablar! ¡Genial! ¿Eres gamer?' },
          {
            who: 'hero',
            text: 'Yes! I ___ a gamer too.',
            choice: { options: ['am', 'is', 'are'], answer: 0, tip: 'Hablas de ti mismo, con "I" va "am".' },
          },
          { who: 'friend', text: 'Cool! My favorite game is an RPG. It is very fun.', es: '¡Genial! Mi juego favorito es un RPG. Es muy divertido.' },
          {
            who: 'hero',
            text: 'RPGs ___ my favorite games!',
            choice: { options: ['is', 'are', 'am'], answer: 1, tip: '"RPGs" es plural, así que va "are".' },
          },
          { who: 'friend', text: 'We are a team now!', es: '¡Ahora somos un equipo!' },
        ],
      },
      {
        requires: 'present-simple',
        level: 'A1',
        title: 'Rutina de juego',
        lines: [],
      },
      {
        requires: 'past-simple',
        level: 'A2',
        title: 'La partida de ayer',
        lines: [],
      },
    ],
  },
  maya: {
    id: 'maya',
    name: 'Maya',
    theme: 'Comida',
    look: { shirt: '#d4537e', hair: '#4a2c17', skin: '#c68642', gender: 'female' },
    conversations: [
      {
        requires: null,
        level: 'A1',
        title: 'En la cafetería',
        lines: [
          { who: 'friend', text: 'Hello! I am Maya. Are you hungry?', es: '¡Hola! Soy Maya. ¿Tienes hambre?' },
          {
            who: 'hero',
            text: 'Maya te pregunta si tienes hambre. ¿Qué gesto haces?',
            choice: {
              options: ['(Tocarte el estómago y asentir)', '(Mirar por la ventana)', '(Bostezar)'],
              answer: 0,
              tip: '"Hungry" significa "con hambre". Tocarte el estómago le dice que sí.',
            },
          },
          { who: 'friend', text: 'Here is a sandwich. It is delicious!', es: 'Aquí tienes un sándwich. ¡Es delicioso!' },
        ],
      },
      {
        requires: 'to-be',
        level: 'A1',
        title: 'Comida favorita',
        lines: [
          { who: 'friend', text: 'Your voice is back! What is your favorite food?', es: '¡Recuperaste la voz! ¿Cuál es tu comida favorita?' },
          {
            who: 'hero',
            text: 'Pizza ___ my favorite food.',
            choice: { options: ['are', 'am', 'is'], answer: 2, tip: '"Pizza" es una sola cosa, equivale a "it", así que va "is".' },
          },
          { who: 'friend', text: 'Me too! The cafeteria pizzas are great.', es: '¡A mí también! Las pizzas de la cafetería son geniales.' },
        ],
      },
      {
        requires: 'present-simple',
        level: 'A1',
        title: '¿Qué desayunas?',
        lines: [],
      },
    ],
  },
}

/** El interés amoroso se arma con el nombre y género que eligió el jugador */
export function interestFriend(interest: Interest): FriendDef {
  const he = interest.gender === 'female' ? 'She' : 'He'
  const his = interest.gender === 'female' ? 'Her' : 'His'
  const romance = interest.mode === 'romance'
  return {
    id: 'interest',
    name: interest.name,
    theme: romance ? 'Ruta especial' : 'Amistad',
    look:
      interest.gender === 'female'
        ? { shirt: '#5d8fd4', hair: '#6b3b1f', skin: '#f1c27d', gender: 'female' }
        : { shirt: '#5d8fd4', hair: '#1f1f1f', skin: '#e0ac69', gender: 'male' },
    conversations: [
      {
        requires: null,
        level: 'A1',
        title: 'En la biblioteca',
        lines: [
          { who: 'narrator', text: `${interest.name} is in the library. ${he} is reading a book.`, es: `${interest.name} está en la biblioteca. Está leyendo un libro.` },
          { who: 'friend', text: `Hi... I am ${interest.name}. Are you new here?`, es: `Hola... Soy ${interest.name}. ¿Acabas de llegar?` },
          {
            who: 'hero',
            text: `${interest.name} te pregunta si acabas de llegar. Es tu primer día. ¿Qué gesto haces?`,
            choice: {
              options: ['(Asentir y sonreír)', '(Negar con la cabeza)', '(Esconderte detrás del libro)'],
              answer: 0,
              tip: '"Are you new here?" pregunta si acabas de llegar. Es tu primer día, así que asientes.',
            },
          },
          { who: 'narrator', text: `${his} smile is very nice. You want to talk, but your voice is gone.`, es: 'Su sonrisa es muy linda. Quieres hablar, pero no tienes voz.' },
        ],
      },
      {
        requires: 'to-be',
        level: 'A1',
        title: 'Por fin, tu nombre',
        lines: [
          { who: 'friend', text: 'You can talk now! What is your name?', es: '¡Ya puedes hablar! ¿Cómo te llamas?' },
          {
            who: 'hero',
            text: 'My name ___ ... (tu nombre)',
            choice: { options: ['am', 'is', 'are'], answer: 1, tip: '"My name" equivale a "it", así que va "is": My name is...' },
          },
          {
            who: 'friend',
            text: romance ? 'That is a beautiful name.' : 'Nice to meet you!',
            es: romance ? 'Es un nombre hermoso.' : '¡Mucho gusto!',
          },
        ],
      },
      {
        requires: 'present-simple',
        level: 'A1',
        title: romance ? 'Gustos en común' : 'Compañeros de estudio',
        lines: [],
      },
      {
        requires: 'future',
        level: 'B1',
        title: romance ? 'Planes juntos' : 'Planes de futuro',
        lines: [],
      },
    ],
  }
}
