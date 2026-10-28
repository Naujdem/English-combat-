import type { ChatOption, FriendDef, Interest } from '../game/types'

/**
 * Amigos de la escuela.
 * - conversations: momentos de historia, en orden. Piden puntos de amistad y gramática recuperada.
 * - casual: charlas cortas y repetibles para subir la amistad.
 * No hay respuestas "malas": cada opción tiene una reacción. Las respuestas sin sentido
 * (effect -1) hacen que el amigo no te entienda y baje la amistad.
 */

const NONSENSE = "Huh? Sorry, I don't understand..."
const NONSENSE_ES = '¿Eh? Perdón, no te entiendo...'

const nonsense = (text: string, reply = NONSENSE, es = NONSENSE_ES): ChatOption => ({ text, reply, es, effect: -1 })

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
          {
            who: 'friend',
            text: "Oh... you can't talk? Are you OK?",
            es: '¿No puedes hablar? ¿Estás bien?',
            options: [
              { text: '(Asentir con la cabeza)', reply: "Good! Don't worry. I can help you.", es: '¡Bien! No te preocupes. Puedo ayudarte.', effect: 2 },
              { text: '(Encoger los hombros)', reply: "Not sure? That's OK. I can help you.", es: '¿No estás seguro? Está bien. Puedo ayudarte.', effect: 1 },
              nonsense('(Señalar el techo)', 'The ceiling? Ha ha... I don\'t understand.', '¿El techo? Ja, ja... No entiendo.'),
            ],
          },
          { who: 'friend', text: 'The verb TO BE is easy. We are a team now!', es: 'El verbo TO BE es fácil. ¡Ahora somos un equipo!' },
        ],
      },
      {
        requires: 'to-be',
        level: 'A1',
        title: 'Hablemos de juegos',
        lines: [
          {
            who: 'friend',
            text: 'You can talk again! Great! Are you a gamer?',
            es: '¡Ya puedes hablar! ¡Genial! ¿Eres gamer?',
            options: [
              { text: 'Yes, I am a gamer too!', reply: 'Cool! We are a team!', es: '¡Genial! ¡Somos un equipo!', effect: 2 },
              { text: "No, I'm not. But games are fun.", reply: "That's OK! Games are fun for everyone.", es: '¡No pasa nada! Los juegos son divertidos para todos.', effect: 1 },
              { text: 'Yes, I is a gamer.', reply: "Ha ha, you mean 'I AM a gamer'! Cool!", es: 'Ja, ja, quieres decir "I AM a gamer". ¡Genial!', effect: 0 },
              nonsense('The window is blue.'),
            ],
          },
          {
            who: 'friend',
            text: 'My favorite game is an RPG. What is your favorite game?',
            es: 'Mi juego favorito es un RPG. ¿Cuál es tu juego favorito?',
            options: [
              { text: 'My favorite game is chess.', reply: 'Chess! You are very smart.', es: '¡Ajedrez! Eres muy inteligente.', effect: 2 },
              { text: 'My favorite game is football.', reply: 'Football is great! It is fun with friends.', es: '¡El fútbol es genial! Es divertido con amigos.', effect: 2 },
              nonsense('My name is Mr. Grimm.', "What? You are not Mr. Grimm! Ha ha... I don't understand.", '¿Qué? ¡Tú no eres el profesor Grimm! Ja, ja... No entiendo.'),
            ],
          },
          { who: 'friend', text: 'We are friends now. See you after class!', es: 'Ya somos amigos. ¡Nos vemos después de clase!' },
        ],
      },
      { requires: 'present-simple', level: 'A1', title: 'Rutina de juego', lines: [] },
      { requires: 'past-simple', level: 'A2', title: 'La partida de ayer', lines: [] },
    ],
    casual: [
      {
        requires: null,
        text: 'Look! This is my new game. Is it cool?',
        es: '¡Mira! Este es mi juego nuevo. ¿Es genial?',
        options: [
          { text: '(Levantar el pulgar)', reply: 'Thanks! It is my favorite.', es: '¡Gracias! Es mi favorito.', effect: 2 },
          { text: '(Sonreír)', reply: 'Ha ha, I know!', es: 'Ja, ja, ¡lo sé!', effect: 1 },
          nonsense('(Bostezar y mirar la pared)', 'Oh... are you bored?', 'Oh... ¿estás aburrido?'),
        ],
      },
      {
        requires: 'to-be',
        text: 'Are you tired today?',
        es: '¿Estás cansado hoy?',
        options: [
          { text: "No, I'm not. I am happy!", reply: 'Great! Me too.', es: '¡Genial! Yo también.', effect: 2 },
          { text: 'Yes, I am a little tired.', reply: 'Oh! Rest after class.', es: '¡Oh! Descansa después de clase.', effect: 1 },
          nonsense('It is a pencil.', "A pencil? Sorry, I don't understand.", '¿Un lápiz? Perdón, no entiendo.'),
        ],
      },
      {
        requires: 'to-be',
        text: 'Are we a good team?',
        es: '¿Somos un buen equipo?',
        options: [
          { text: 'Yes, we are a great team!', reply: 'The best team!', es: '¡El mejor equipo!', effect: 2 },
          { text: 'Yes, we is a good team.', reply: "Ha ha, 'we ARE a good team'. Yes, we are!", es: 'Ja, ja, "we ARE a good team". ¡Sí lo somos!', effect: 0 },
          nonsense('I am a banana.', "A banana?! I don't understand you today.", '¿¡Un banano!? Hoy no te entiendo.'),
        ],
      },
      {
        requires: 'possessives',
        text: 'Is this your controller?',
        es: '¿Este es tu control?',
        options: [
          { text: 'Yes, it is my controller. Thanks!', reply: 'Here you go!', es: '¡Aquí tienes!', effect: 2 },
          { text: "No, it isn't mine. It's Maya's.", reply: "Oh! I'll give it to her.", es: '¡Oh! Se lo daré a ella.', effect: 1 },
          { text: 'Yes, it is me controller.', reply: "Ha ha, 'MY controller'. Here you go!", es: 'Ja, ja, "MY controller". ¡Aquí tienes!', effect: 0 },
          nonsense('Our school is a dog.', "What?! Ha ha, I don't understand.", '¿¡Qué!? Ja, ja, no entiendo.'),
        ],
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
          {
            who: 'friend',
            text: 'Hello! I am Maya. Are you hungry?',
            es: '¡Hola! Soy Maya. ¿Tienes hambre?',
            options: [
              { text: '(Tocarte el estómago y asentir)', reply: 'Ha ha, yes! Here is a sandwich.', es: 'Ja, ja, ¡sí! Aquí tienes un sándwich.', effect: 2 },
              { text: '(Negar con la cabeza)', reply: 'Oh, OK. Take it for later!', es: 'Oh, bueno. ¡Llévatelo para después!', effect: 1 },
              nonsense('(Señalar la ventana)', "The window? Sorry, I don't understand...", '¿La ventana? Perdón, no entiendo...'),
            ],
          },
          { who: 'friend', text: 'My sandwiches are the best. You are my friend now!', es: 'Mis sándwiches son los mejores. ¡Ahora eres mi amigo!' },
        ],
      },
      {
        requires: 'to-be',
        level: 'A1',
        title: 'Comida favorita',
        lines: [
          {
            who: 'friend',
            text: 'Your voice is back! What is your favorite food?',
            es: '¡Recuperaste la voz! ¿Cuál es tu comida favorita?',
            options: [
              { text: 'Pizza is my favorite food!', reply: 'Me too! The cafeteria pizza is great.', es: '¡A mí también! La pizza de la cafetería es genial.', effect: 2 },
              { text: 'My favorite food is rice and chicken.', reply: 'Yum! That is delicious.', es: '¡Rico! Eso es delicioso.', effect: 2 },
              { text: "I'm not hungry now.", reply: 'Ha ha, OK! Tell me later.', es: 'Ja, ja, ¡bueno! Me cuentas después.', effect: 1 },
              nonsense('The teacher is a pizza.', "What? Ha ha, I don't understand.", '¿Qué? Ja, ja, no entiendo.'),
            ],
          },
          { who: 'friend', text: 'We are food friends now!', es: '¡Ahora somos amigos de comida!' },
        ],
      },
      { requires: 'present-simple', level: 'A1', title: '¿Qué desayunas?', lines: [] },
    ],
    casual: [
      {
        requires: null,
        text: 'Is this sandwich good?',
        es: '¿Está bueno este sándwich?',
        options: [
          { text: '(Levantar el pulgar)', reply: 'Yay! I make them every day.', es: '¡Bien! Los hago todos los días.', effect: 2 },
          { text: '(Encoger los hombros)', reply: 'OK, OK. Next time it will be better!', es: 'Bueno, bueno. ¡La próxima vez será mejor!', effect: 0 },
          nonsense('(Darte la vuelta)', "Hey! Where are you going? I don't understand.", '¡Oye! ¿A dónde vas? No entiendo.'),
        ],
      },
      {
        requires: 'to-be',
        text: 'Is the pizza hot?',
        es: '¿Está caliente la pizza?',
        options: [
          { text: 'Yes, it is very hot!', reply: 'Careful!', es: '¡Cuidado!', effect: 2 },
          { text: "No, it isn't. It is cold.", reply: 'Oh no, cold pizza!', es: '¡Oh no, pizza fría!', effect: 1 },
          nonsense('You are my book.', "Your book? I don't understand...", '¿Tu libro? No entiendo...'),
        ],
      },
      {
        requires: 'to-be',
        text: 'Are you hungry now?',
        es: '¿Tienes hambre ahora?',
        options: [
          { text: 'Yes, I am very hungry!', reply: "Let's eat!", es: '¡A comer!', effect: 2 },
          { text: "No, I'm not hungry.", reply: 'OK, maybe later.', es: 'Bueno, quizás después.', effect: 1 },
          { text: 'Yes, I are hungry.', reply: "Ha ha, 'I AM hungry'. Here, eat this!", es: 'Ja, ja, "I AM hungry". ¡Toma, come esto!', effect: 0 },
          nonsense('The door is a cat.'),
        ],
      },
      {
        requires: 'possessives',
        text: "What is your mother's favorite food?",
        es: '¿Cuál es la comida favorita de tu mamá?',
        options: [
          { text: 'Her favorite food is fish.', reply: 'Fish! Healthy and good.', es: '¡Pescado! Saludable y rico.', effect: 2 },
          { text: 'His favorite food is fish.', reply: "Your mother? Then it's HER favorite food, ha ha!", es: '¿Tu mamá? Entonces es "HER favorite food", ¡ja, ja!', effect: 0 },
          nonsense('My pencil is green.', "Your pencil? I asked about food! I don't understand.", '¿Tu lápiz? ¡Pregunté por comida! No entiendo.'),
        ],
      },
    ],
  },
}

/** El interés especial se arma con el nombre y género que eligió el jugador */
export function interestFriend(interest: Interest, heroName = ''): FriendDef {
  const he = interest.gender === 'female' ? 'She' : 'He'
  const his = interest.gender === 'female' ? 'Her' : 'His'
  const romance = interest.mode === 'romance'
  const n = interest.name
  return {
    id: 'interest',
    name: n,
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
          { who: 'narrator', text: `${n} is in the library. ${he} is reading a book.`, es: `${n} está en la biblioteca. Está leyendo un libro.` },
          {
            who: 'friend',
            text: `Hi... I am ${n}. Are you new here?`,
            es: `Hola... Soy ${n}. ¿Acabas de llegar?`,
            options: [
              { text: '(Asentir y sonreír)', reply: "Welcome! It's nice to meet you.", es: '¡Te doy la bienvenida! Mucho gusto.', effect: 2 },
              { text: '(Saludar con la mano)', reply: 'Ha ha, hello!', es: 'Ja, ja, ¡hola!', effect: 1 },
              nonsense('(Esconderte detrás de un libro)', 'Oh... Are you OK? I don\'t understand.', 'Oh... ¿Estás bien? No entiendo.'),
            ],
          },
          { who: 'narrator', text: `${his} smile is very nice. You want to talk, but your voice is gone.`, es: 'Su sonrisa es muy linda. Quieres hablar, pero no tienes voz.' },
        ],
      },
      {
        requires: 'to-be',
        level: 'A1',
        title: 'Por fin, tu nombre',
        lines: [
          {
            who: 'friend',
            text: 'You can talk now! What is your name?',
            es: '¡Ya puedes hablar! ¿Cómo te llamas?',
            options: [
              {
                text: `My name is ${heroName || '...'}. Nice to meet you!`,
                reply: romance ? 'That is a beautiful name.' : 'Nice to meet you too!',
                es: romance ? 'Es un nombre hermoso.' : '¡Mucho gusto también!',
                effect: 2,
              },
              { text: `I am ${heroName || '...'}.`, reply: `Hi, ${heroName}!`, es: `¡Hola, ${heroName}!`, effect: 1 },
              nonsense('The library is green.', "The library? Ha ha, I don't understand.", '¿La biblioteca? Ja, ja, no entiendo.'),
            ],
          },
          {
            who: 'friend',
            text: romance ? 'I am happy you are here.' : "Let's study together sometime!",
            es: romance ? 'Me alegra que estés aquí.' : '¡Estudiemos juntos algún día!',
          },
        ],
      },
      { requires: 'present-simple', level: 'A1', title: romance ? 'Gustos en común' : 'Compañeros de estudio', lines: [] },
      { requires: 'future', level: 'B1', title: romance ? 'Planes juntos' : 'Planes de futuro', lines: [] },
    ],
    casual: [
      {
        requires: null,
        text: 'This book is about the stars. Is it interesting?',
        es: 'Este libro es sobre las estrellas. ¿Es interesante?',
        options: [
          { text: '(Asentir con curiosidad)', reply: 'I know! I love the stars.', es: '¡Lo sé! Me encantan las estrellas.', effect: 2 },
          { text: '(Sonreír)', reply: 'Ha ha, you are nice.', es: 'Ja, ja, eres amable.', effect: 1 },
          nonsense('(Bostezar)', 'Oh... is it boring for you?', 'Oh... ¿te parece aburrido?'),
        ],
      },
      {
        requires: 'to-be',
        text: 'Are you a good student?',
        es: '¿Eres buen estudiante?',
        options: [
          { text: 'Yes, I am a good student!', reply: 'Me too! Ha ha.', es: '¡Yo también! Ja, ja.', effect: 2 },
          { text: "I'm not sure...", reply: 'You are smart, I think.', es: 'Creo que eres inteligente.', effect: 1 },
          nonsense('The chair is happy.', "The chair?! I don't understand.", '¿¡La silla!? No entiendo.'),
        ],
      },
      {
        requires: 'to-be',
        text: 'Is the library your favorite place?',
        es: '¿La biblioteca es tu lugar favorito?',
        options: [
          { text: 'Yes, it is! It is quiet.', reply: romance ? 'Mine too. Maybe we are similar.' : 'Mine too!', es: romance ? 'El mío también. Quizás nos parecemos.' : '¡El mío también!', effect: 2 },
          { text: 'No, the cafeteria is my favorite place.', reply: 'Ha ha, the food!', es: 'Ja, ja, ¡la comida!', effect: 1 },
          { text: 'Yes, we is students here.', reply: "Ha ha, 'we ARE students'. Yes, we are!", es: 'Ja, ja, "we ARE students". ¡Sí lo somos!', effect: 0 },
        ],
      },
      {
        requires: 'possessives',
        text: 'Is this your pen?',
        es: '¿Este es tu bolígrafo?',
        options: [
          { text: 'Yes, it is my pen. Thank you!', reply: "You're welcome!", es: '¡De nada!', effect: 2 },
          { text: "No, it isn't. It's Maya's pen.", reply: "OK, I'll give it to her.", es: 'Bueno, se lo daré a ella.', effect: 1 },
          nonsense('Her cat is a pen.', "What? I don't understand.", '¿Qué? No entiendo.'),
        ],
      },
    ],
  }
}
