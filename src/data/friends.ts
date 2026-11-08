import type { CasualChat, ChatOption, FriendDef, Interest } from '../game/types'

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
      {
        requires: 'present-simple',
        level: 'A1',
        title: 'Rutina de juego',
        lines: [
          { who: 'friend', text: 'Hey! Your English is great now. I am proud of you!', es: '¡Oye! Tu inglés ya es genial. ¡Estoy orgulloso de ti!' },
          {
            who: 'friend',
            text: 'Every day after school, I do my homework and then I play my RPG. And you? Tell me about your afternoons!',
            es: 'Todos los días después de clase hago la tarea y luego juego mi RPG. ¿Y tú? ¡Cuéntame de tus tardes!',
            options: [
              { text: 'I always do my homework first. Then I play video games!', reply: 'Ha ha, the perfect routine!', es: 'Ja, ja, ¡la rutina perfecta!', effect: 2 },
              { text: 'I usually watch TV and eat a snack.', reply: 'Nice! A relaxed afternoon.', es: '¡Bien! Una tarde tranquila.', effect: 1 },
              { text: 'I plays video games every afternoon.', reply: 'Ha ha, with "I" there is no -s: I PLAY. But cool!', es: 'Ja, ja, con "I" no va -s: I PLAY. ¡Pero genial!', effect: 0 },
              nonsense('My afternoon is a cat.', "A cat? Ha ha, I don't understand.", '¿Un gato? Ja, ja, no entiendo.'),
            ],
          },
          {
            who: 'friend',
            text: 'My sister Emma plays the guitar every afternoon. It is very loud! I sometimes help her with her English homework, too. I love explaining grammar... Is that strange?',
            es: 'Mi hermana Emma toca la guitarra todas las tardes. ¡Suena muy fuerte! A veces también la ayudo con su tarea de inglés. Me encanta explicar gramática... ¿Es raro?',
            options: [
              { text: 'No! You always help me. You are a great teacher!', reply: 'A teacher? Me? Ha ha... maybe one day.', es: '¿Un profesor? ¿Yo? Ja, ja... quizás algún día.', effect: 2 },
              { text: 'A little strange... but it is cool.', reply: 'Ha ha, thanks... I think!', es: 'Ja, ja, gracias... ¡creo!', effect: 1 },
              { text: 'No! You explains very well.', reply: 'Ha ha, with "you" there is no -s: you EXPLAIN. But thank you!', es: 'Ja, ja, con "you" no va -s: you EXPLAIN. ¡Pero gracias!', effect: 0 },
              nonsense('The guitar eats grammar.', "The guitar? Ha ha, I don't understand.", '¿La guitarra? Ja, ja, no entiendo.'),
            ],
          },
          { who: 'narrator', text: 'Leo smiles. For a second, he looks very serious.', es: 'Leo sonríe. Por un segundo, se ve muy serio.' },
          { who: 'friend', text: "OK, no more grammar. Let's play!", es: 'Bueno, no más gramática. ¡A jugar!' },
        ],
      },
      {
        // A2 (Busuu cap. 1): personalidad. Abre en el repaso el tema de personalidad, familia y relaciones
        requires: 'past-simple',
        level: 'A2',
        title: 'La partida de ayer',
        lines: [
          { who: 'friend', text: "Hey! I played an online game yesterday with a new teammate. His name is Ravi, and he's from India!", es: '¡Oye! Ayer jugué una partida en línea con un compañero nuevo. ¡Se llama Ravi y es de la India!' },
          {
            who: 'friend',
            text: 'At first he was very bossy. He told everybody what to do! But then he gave me his best sword. Was he a good teammate in the end?',
            es: 'Al principio era muy mandón. ¡Le decía a todos qué hacer! Pero luego me dio su mejor espada. ¿Fue un buen compañero al final?',
            options: [
              { text: 'Yes! He was bossy at first, but he was very generous.', reply: 'Exactly! People can surprise you.', es: '¡Exacto! La gente te puede sorprender.', effect: 2 },
              { text: 'Maybe he was shy, not bossy.', reply: "Ha ha, shy? No, no. He talked ALL the time!", es: 'Ja, ja, ¿tímido? No, no. ¡Hablaba TODO el tiempo!', effect: 1 },
              { text: 'Yes! He give you his best sword!', reply: 'Ha ha, in the past: he GAVE me his sword. But yes!', es: 'Ja, ja, en pasado: he GAVE me his sword. ¡Pero sí!', effect: 0 },
              nonsense('Ravi is a sword.', "A sword? Ha ha, I don't understand.", '¿Una espada? Ja, ja, no entiendo.'),
            ],
          },
          {
            who: 'friend',
            text: 'OK, now a question for you. What am I like? Be honest!',
            es: 'Bueno, ahora una pregunta para ti. ¿Cómo soy yo? ¡Sé honesto!',
            options: [
              { text: "You're kind, funny and very patient. And you love grammar!", reply: 'Ha ha! Patient? Maybe. Grammar? Definitely.', es: '¡Ja, ja! ¿Paciente? Quizás. ¿Gramática? Definitivamente.', effect: 2 },
              { text: "You're a bit lazy... but very funny.", reply: 'Lazy?! Hey! ...OK, maybe on Sundays.', es: '¿¡Perezoso!? ¡Oye! ...Bueno, quizás los domingos.', effect: 1 },
              { text: 'You have brown hair and you are tall.', reply: "Ha ha, that's what I LOOK like. I asked what I'm LIKE: my personality!", es: 'Ja, ja, eso es cómo me veo (look like). Te pregunté cómo soy (like): ¡mi personalidad!', effect: 0 },
              nonsense('You are a Tuesday.', "A Tuesday?! Ha ha, I don't understand.", '¿¡Un martes!? Ja, ja, no entiendo.'),
            ],
          },
          { who: 'friend', text: "Thanks. You're a really good friend. And honest! I like that.", es: 'Gracias. Eres un muy buen amigo. ¡Y honesto! Me gusta eso.' },
        ],
      },
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
      {
        requires: 'was-were',
        text: 'Were you scared in 1996? The old school was so strange!',
        es: '¿Tuviste miedo en 1996? ¡La escuela vieja era tan rara!',
        options: [
          { text: 'Yes, I was a little scared.', reply: 'Me too! But we were a good team.', es: '¡Yo también! Pero fuimos un buen equipo.', effect: 2 },
          { text: "No, I wasn't. It was fun!", reply: 'You are brave!', es: '¡Eres valiente!', effect: 1 },
          { text: 'Yes, I were scared.', reply: "Ha ha, 'I WAS scared'. Me too!", es: 'Ja, ja, "I WAS scared". ¡Yo también!', effect: 0 },
          nonsense('The bell was a pizza.', "A pizza?! Ha ha, I don't understand.", '¿¡Una pizza!? Ja, ja, no entiendo.'),
        ],
      },
      {
        requires: 'past-regular',
        text: 'Tell me about the old city. I want to remember everything!',
        es: 'Cuéntame de la ciudad vieja. ¡Quiero recordarlo todo!',
        options: [
          { text: 'We walked on a dirt road and we visited the market.', reply: 'Yes! And we helped Mr. Lopez with his sacks!', es: '¡Sí! ¡Y ayudamos al señor López con sus sacos!', effect: 2 },
          { text: 'I talked to Tony. He wanted to be a guide.', reply: 'And now he is Mr. Rossi! Crazy!', es: '¡Y ahora es el señor Rossi! ¡Qué locura!', effect: 1 },
          { text: 'We walk on a dirt road yesterday.', reply: "Ha ha, 'we WALKED'. In the past: -ed!", es: 'Ja, ja, "we WALKED". En pasado: ¡-ed!', effect: 0 },
          nonsense('The well danced with me.', "The well? Ha ha, I don't understand.", '¿El pozo? Ja, ja, no entiendo.'),
        ],
      },
      {
        requires: 'past-irregular',
        text: 'My grandpa built my house... and my mom and dad met on Green Street. Wow.',
        es: 'Mi abuelo construyó mi casa... y mis papás se conocieron en Green Street. Vaya.',
        options: [
          { text: 'I saw it! Your mom was so happy.', reply: 'I know! I saw it too. I want to tell them!', es: '¡Lo sé! Yo también lo vi. ¡Quiero contárselo!', effect: 2 },
          { text: 'I went into your house. It was beautiful.', reply: 'It was! Grandpa made it with love.', es: '¡Lo era! El abuelo la hizo con amor.', effect: 1 },
          { text: 'Wow! He builded it with his hands!', reply: "Ha ha, 'he BUILT it'. Built, not builded!", es: 'Ja, ja, "he BUILT it". ¡Built, no builded!', effect: 0 },
          nonsense('Your house ate a cookie.', "My house? Ha ha, I don't understand.", '¿Mi casa? Ja, ja, no entiendo.'),
        ],
      },
      // A2 (Busuu caps. 1 y 4): personalidad y relaciones
      {
        requires: 'past-simple',
        text: 'My sister Emma and I fell out yesterday. She took my controller without asking! What should I do?',
        es: 'Mi hermana Emma y yo nos peleamos ayer. ¡Tomó mi control sin preguntar! ¿Qué hago?',
        options: [
          { text: "Say sorry and make up. She's your sister!", reply: "You're right. I'll talk to her.", es: 'Tienes razón. Hablaré con ella.', effect: 2 },
          { text: 'Wait one day. Then talk to her.', reply: 'Good idea. We both need some time.', es: 'Buena idea. Los dos necesitamos un poco de tiempo.', effect: 1 },
          { text: 'You should fall up with her.', reply: 'Ha ha, FALL OUT is to fight. MAKE UP is to be friends again!', es: 'Ja, ja, fall out es pelearse. ¡Make up es volver a ser amigos!', effect: 0 },
          nonsense('Your controller is my grandma.', "My controller? Ha ha, I don't understand.", '¿Mi control? Ja, ja, no entiendo.'),
        ],
      },
      {
        requires: 'past-simple',
        text: 'What was your first teacher like?',
        es: '¿Cómo era tu primer profesor?',
        options: [
          { text: 'She was very kind and patient.', reply: 'Like a good teacher!', es: '¡Como un buen profesor!', effect: 2 },
          { text: 'He was a bit bossy, but he was honest.', reply: 'Bossy but honest... OK!', es: 'Mandón pero honesto... ¡bueno!', effect: 1 },
          { text: 'She looked like patient.', reply: "Ha ha, just 'she WAS patient'. 'Look like' is for faces!", es: 'Ja, ja, solo "she WAS patient". ¡"Look like" es para el aspecto!', effect: 0 },
          nonsense('My teacher was a window.', "A window? Ha ha, I don't understand.", '¿Una ventana? Ja, ja, no entiendo.'),
        ],
      },
      {
        requires: 'past-simple',
        text: 'Ravi says we have a lot in common. Do you have a lot in common with your friends?',
        es: 'Ravi dice que tenemos mucho en común. ¿Tú tienes mucho en común con tus amigos?',
        options: [
          { text: 'Yes! We like the same games and the same music.', reply: "That's why you're friends!", es: '¡Por eso son amigos!', effect: 2 },
          { text: 'Not much, but we get on well.', reply: "That's the important thing!", es: '¡Eso es lo importante!', effect: 1 },
          { text: 'Yes, we have a lot on common.', reply: "Ha ha, IN common, not 'on'. But cool!", es: 'Ja, ja, IN common, no "on". ¡Pero genial!', effect: 0 },
          nonsense('My friends are green potatoes.', "Potatoes? Ha ha, I don't understand.", '¿Papas? Ja, ja, no entiendo.'),
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
      {
        requires: 'present-simple',
        level: 'A1',
        title: '¿Qué desayunas?',
        lines: [
          { who: 'friend', text: 'Good morning! Ugh... I hate getting up early.', es: '¡Buenos días! Uf... odio levantarme temprano.' },
          {
            who: 'friend',
            text: 'I always wake up late, so my dad makes my breakfast. He loves cooking! Every morning he makes arepas with cheese. And you? Tell me about your breakfast!',
            es: 'Siempre me despierto tarde, así que mi papá me hace el desayuno. ¡Le encanta cocinar! Todas las mañanas hace arepas con queso. ¿Y tú? ¡Cuéntame de tu desayuno!',
            options: [
              { text: 'I usually eat eggs and bread, and I drink hot chocolate.', reply: 'Hot chocolate! The best breakfast.', es: '¡Chocolate caliente! El mejor desayuno.', effect: 2 },
              { text: 'I sometimes eat fruit. I am never very hungry in the morning.', reply: 'Never hungry? Ha ha, you are not like me!', es: '¿Nunca tienes hambre? Ja, ja, ¡no eres como yo!', effect: 1 },
              { text: 'My mom make eggs every day.', reply: 'Ha ha, "my mom MAKES". With she, add -s! Yum!', es: 'Ja, ja, "my mom MAKES". Con she, ¡agrega -s! ¡Qué rico!', effect: 0 },
              nonsense('My breakfast plays the guitar.', "Your breakfast? Ha ha, I don't understand.", '¿Tu desayuno? Ja, ja, no entiendo.'),
            ],
          },
          {
            who: 'friend',
            text: 'My secret: I eat my breakfast on the bus. Every day! And I always have an extra sandwich in my bag. Here, take it!',
            es: 'Mi secreto: me como el desayuno en el bus. ¡Todos los días! Y siempre tengo un sándwich extra en la mochila. ¡Toma, es para ti!',
            options: [
              { text: 'Thank you, Maya! You are always so kind.', reply: 'Ha ha! Food friends forever!', es: '¡Ja, ja! ¡Amigos de comida para siempre!', effect: 2 },
              { text: 'Thanks! I love your sandwiches.', reply: 'I know! Everybody loves them.', es: '¡Lo sé! A todo el mundo le encantan.', effect: 1 },
              { text: 'Thanks! You makes the best sandwiches.', reply: 'Ha ha, "you MAKE", no -s! But it\'s true.', es: 'Ja, ja, "you MAKE", ¡sin -s! Pero es verdad.', effect: 0 },
              nonsense('The sandwich is my teacher.', "Your teacher? Ha ha, I don't understand.", '¿Tu profesor? Ja, ja, no entiendo.'),
            ],
          },
        ],
      },
      {
        // A2 (Busuu cap. 2): familia ampliada. Abre en el repaso el tema de personalidad, familia y relaciones
        requires: 'present-perfect',
        level: 'A2',
        title: 'La familia de Maya',
        lines: [
          {
            who: 'friend',
            text: "Guess what! I've just become an aunt! My sister has had a baby boy.",
            es: '¡Adivina! ¡Acabo de convertirme en tía! Mi hermana tuvo un bebé.',
            options: [
              { text: "Congratulations! So he's your nephew!", reply: 'Yes! My first nephew. His name is Tomás.', es: '¡Sí! Mi primer sobrino. Se llama Tomás.', effect: 2 },
              { text: 'Wow! Have you held him yet?', reply: "Yes, I've already held him. He's so small!", es: 'Sí, ya lo cargué. ¡Es tan pequeño!', effect: 1 },
              { text: "Congratulations! So he's your niece!", reply: 'Ha ha, a boy is a NEPHEW. A girl is a niece!', es: 'Ja, ja, un niño es un NEPHEW. ¡Una niña es una niece!', effect: 0 },
              nonsense('Your sister is a sandwich.', "A sandwich? I don't understand...", '¿Un sándwich? No entiendo...'),
            ],
          },
          {
            who: 'friend',
            text: 'On Sunday all the family came to see him: my grandparents, my uncles, my aunts and about twenty cousins! Have you got a big family?',
            es: 'El domingo vino toda la familia a verlo: mis abuelos, mis tíos, mis tías ¡y como veinte primos! ¿Tienes una familia grande?',
            options: [
              { text: "Yes! I've got lots of cousins. I get on well with them.", reply: "That's great! Family parties are the best.", es: '¡Qué bien! Las fiestas familiares son lo mejor.', effect: 2 },
              { text: "No, I'm an only child. But I've got two cousins.", reply: 'Small families are nice too. More cake for you!', es: 'Las familias pequeñas también son lindas. ¡Más pastel para ti!', effect: 1 },
              { text: "Yes! My uncle's children are my nephews.", reply: "Ha ha, your uncle's children are your COUSINS. Nephews are your brother's or sister's sons.", es: 'Ja, ja, los hijos de tu tío son tus COUSINS. Los nephews son los hijos de tu hermano o hermana.', effect: 0 },
              nonsense('My family is a bus.', "A bus? Ha ha, I don't understand.", '¿Un bus? Ja, ja, no entiendo.'),
            ],
          },
          {
            who: 'friend',
            text: "My grandma is easy-going and very generous. She cooks for everybody! But my uncle Pedro is a bit bossy... What's your favorite relative like?",
            es: 'Mi abuela es tranquila y muy generosa. ¡Cocina para todos! Pero mi tío Pedro es un poco mandón... ¿Cómo es tu pariente favorito?',
            options: [
              { text: 'My aunt is very funny and kind. I trust her a lot.', reply: 'She sounds lovely!', es: '¡Suena encantadora!', effect: 2 },
              { text: 'My grandpa is shy, but he tells great stories.', reply: 'Shy people often have the best stories.', es: 'Las personas tímidas suelen tener las mejores historias.', effect: 1 },
              { text: 'My aunt is very friend.', reply: "Ha ha, she's very FRIENDLY. A friend is a person!", es: 'Ja, ja, es muy FRIENDLY. ¡Friend es una persona!', effect: 0 },
              nonsense('My grandpa is a pizza.', "A pizza? I don't understand...", '¿Una pizza? No entiendo...'),
            ],
          },
          { who: 'friend', text: 'Next time, come to our family party. My grandma has already asked about you!', es: 'La próxima vez, ven a nuestra fiesta familiar. ¡Mi abuela ya preguntó por ti!' },
        ],
      },
      {
        // A2 (Busuu cap. 25): vacaciones y alojamiento. Abre en el repaso el tema de vacaciones
        requires: 'wishes-conditional',
        level: 'A2',
        title: 'La postal de Maya',
        lines: [
          { who: 'friend', text: 'Look! My cousin Lucía sent me a postcard from her holiday. Read it with me!', es: '¡Mira! Mi prima Lucía me mandó una postal de sus vacaciones. ¡Léela conmigo!' },
          {
            who: 'narrator',
            text: '"Dear Maya, we\'re staying at a small hotel near the beach. Our room has a sea view! Yesterday we went snorkeling and we saw a turtle. The food is delicious, but it\'s very expensive. We\'re coming back on Sunday. Wish you were here! Love, Lucía."',
            es: '"Querida Maya: nos estamos quedando en un hotel pequeño cerca de la playa. ¡Nuestra habitación tiene vista al mar! Ayer fuimos a bucear y vimos una tortuga. La comida es deliciosa, pero muy cara. Volvemos el domingo. ¡Ojalá estuvieras aquí! Con cariño, Lucía."',
          },
          {
            who: 'friend',
            text: "So... where are they staying? I can't read her writing very well.",
            es: 'Entonces... ¿dónde se están quedando? No entiendo muy bien su letra.',
            options: [
              { text: 'At a small hotel near the beach. Their room has a sea view!', reply: 'A sea view! Lucky Lucía.', es: '¡Vista al mar! Qué suerte tiene Lucía.', effect: 2 },
              { text: 'At a campsite, I think.', reply: 'Hmm, no, look: "a small hotel near the beach".', es: 'Mmm, no, mira: "un hotel pequeño cerca de la playa".', effect: 1 },
              { text: 'They is staying at a hotel.', reply: 'Ha ha, THEY ARE staying. But yes, a hotel!', es: 'Ja, ja, THEY ARE staying. ¡Pero sí, un hotel!', effect: 0 },
              nonsense('The turtle is the hotel.', "The turtle? Ha ha, I don't understand.", '¿La tortuga? Ja, ja, no entiendo.'),
            ],
          },
          {
            who: 'friend',
            text: 'Next summer my family wants to go on holiday too. Would you rather stay at a hotel or go camping?',
            es: 'El próximo verano mi familia también quiere irse de vacaciones. ¿Prefieres quedarte en un hotel o ir de camping?',
            options: [
              { text: "I'd rather go camping. I love sleeping in a tent!", reply: 'Me too! And campsites are cheaper.', es: '¡Yo también! Y los campings son más baratos.', effect: 2 },
              { text: "I'd rather stay at a hotel. I like comfortable beds.", reply: 'Ha ha, me too, but hotels are expensive!', es: 'Ja, ja, a mí también, ¡pero los hoteles son caros!', effect: 1 },
              { text: "I'd rather to stay at a hotel.", reply: "Ha ha, I'd rather STAY, no TO. A hotel, OK!", es: 'Ja, ja, I\'d rather STAY, sin to. ¡Un hotel, bueno!', effect: 0 },
              nonsense('My tent is a pizza.', "A pizza? Ha ha, I don't understand.", '¿Una pizza? Ja, ja, no entiendo.'),
            ],
          },
          {
            who: 'friend',
            text: "If we go camping by the lake, will you come with us? My mom will book a place at the campsite.",
            es: 'Si vamos de camping al lago, ¿vienes con nosotros? Mi mamá reservará un lugar en el camping.',
            options: [
              { text: "Yes! If my parents say yes, I'll pack my bag tonight!", reply: 'Ha ha, not tonight! But yes, great!', es: 'Ja, ja, ¡esta noche no! ¡Pero sí, genial!', effect: 2 },
              { text: 'Maybe. When are you going?', reply: 'In July. I\'ll tell you the dates.', es: 'En julio. Te digo las fechas.', effect: 1 },
              { text: 'Yes, I will to come!', reply: 'Ha ha, I WILL COME, no TO. Yay!', es: 'Ja, ja, I WILL COME, sin to. ¡Bien!', effect: 0 },
              nonsense('The lake is my uncle.', "Your uncle? I don't understand...", '¿Tu tío? No entiendo...'),
            ],
          },
          { who: 'friend', text: "Then it's a plan! I'll send YOU a postcard... from the tent next to yours. Ha ha!", es: '¡Entonces es un plan! Te mandaré una postal... desde la carpa de al lado. ¡Ja, ja!' },
        ],
      },
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
      // A2 (Busuu caps. 2 y 4): familia ampliada y relaciones
      {
        requires: 'present-perfect',
        text: 'My cousin Lucía has moved to Canada! Have you got any family in another country?',
        es: '¡Mi prima Lucía se mudó a Canadá! ¿Tienes familia en otro país?',
        options: [
          { text: 'Yes, my uncle lives in Spain.', reply: 'Cool! Have you visited him?', es: '¡Genial! ¿Lo has visitado?', effect: 2 },
          { text: 'No, all my family lives here.', reply: 'Family close to you. That is nice too.', es: 'La familia cerca. Eso también es lindo.', effect: 1 },
          { text: "Yes, my aunt's son lives in Spain. He's my nephew.", reply: "Ha ha, your aunt's son is your COUSIN!", es: 'Ja, ja, ¡el hijo de tu tía es tu COUSIN!', effect: 0 },
          nonsense('Canada is my sandwich.', "Your sandwich? I don't understand...", '¿Tu sándwich? No entiendo...'),
        ],
      },
      {
        requires: 'present-perfect',
        text: 'My nephew Tomás has just smiled for the first time! Have you ever looked after a baby?',
        es: '¡Mi sobrino Tomás acaba de sonreír por primera vez! ¿Alguna vez has cuidado a un bebé?',
        options: [
          { text: 'Yes, I have! I looked after my little cousin.', reply: 'Then you can help me!', es: '¡Entonces me puedes ayudar!', effect: 2 },
          { text: "No, I haven't. Babies scare me a bit!", reply: "Ha ha, they're tiny! Don't be shy.", es: 'Ja, ja, ¡son chiquitos! No seas tímido.', effect: 1 },
          { text: 'Yes, I have look after a baby.', reply: 'Ha ha, I have LOOKED after. Have + participle!', es: 'Ja, ja, I have LOOKED after. ¡Have + participio!', effect: 0 },
          nonsense('The baby is my teacher.', "Your teacher? Ha ha, what?", '¿Tu profesor? Ja, ja, ¿qué?'),
        ],
      },
      {
        requires: 'present-perfect',
        text: 'Do you get on well with your relatives?',
        es: '¿Te llevas bien con tus parientes?',
        options: [
          { text: 'Yes, I get on well with all of them.', reply: 'Lucky you!', es: '¡Qué suerte!', effect: 2 },
          { text: 'With most of them. My uncle is a bit bossy.', reply: 'Ha ha, every family has a bossy uncle!', es: 'Ja, ja, ¡toda familia tiene un tío mandón!', effect: 1 },
          { text: 'Yes, I get in well with them.', reply: "Ha ha, get ON well with. But that's great!", es: 'Ja, ja, get ON well with. ¡Pero qué bien!', effect: 0 },
          nonsense('My relatives are chairs.', "Chairs? I don't understand...", '¿Sillas? No entiendo...'),
        ],
      },
    ],
  },
}

/** El interés especial se arma con el nombre y género que eligió el jugador */
export function interestFriend(interest: Interest, heroName = ''): FriendDef {
  const he = interest.gender === 'female' ? 'She' : 'He'
  const his = interest.gender === 'female' ? 'Her' : 'His'
  const hisLow = his.toLowerCase()
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
      {
        requires: 'present-simple',
        level: 'A1',
        title: romance ? 'Gustos en común' : 'Compañeros de estudio',
        // No depende del lugar: este momento puede salir en cualquier mapa y época
        lines: [
          { who: 'narrator', text: `${n} always has a book in ${hisLow} bag. Today it is a book about the stars.`, es: `${n} siempre lleva un libro en la mochila. Hoy es un libro sobre las estrellas.` },
          {
            who: 'friend',
            text: romance
              ? 'Oh, hi! I read every afternoon. I love reading about the stars. Every night I look at the sky from my window. What are your hobbies?'
              : 'Oh, hi! I study every afternoon. I always read about the stars. What are your hobbies?',
            es: romance
              ? '¡Oh, hola! Todas las tardes me pongo a leer. Me encanta leer sobre las estrellas. Todas las noches miro el cielo desde mi ventana. ¿Cuáles son tus pasatiempos?'
              : '¡Oh, hola! Estudio todas las tardes. Siempre leo sobre las estrellas. ¿Cuáles son tus pasatiempos?',
            options: [
              {
                text: 'I love reading too! I usually read at night.',
                reply: romance ? 'Really? We have a lot in common...' : 'Great! A reading club of two!',
                es: romance ? '¿En serio? Tenemos mucho en común...' : '¡Genial! ¡Un club de lectura de dos!',
                effect: 2,
              },
              { text: 'I like playing video games with Leo.', reply: 'Ha ha, Leo plays games all day!', es: 'Ja, ja, ¡Leo juega todo el día!', effect: 1 },
              { text: 'I loves the stars too!', reply: 'Ha ha, with "I" it\'s "I LOVE". But I\'m happy!', es: 'Ja, ja, con "I" es "I LOVE". ¡Pero me alegra!', effect: 0 },
              nonsense('The window reads me.', "The window? I don't understand...", '¿La ventana? No entiendo...'),
            ],
          },
          {
            who: 'friend',
            text: romance ? 'Sometimes I look at the stars and I think about you... I mean, about the sky!' : 'You are a good study partner. You always ask good questions.',
            es: romance ? 'A veces miro las estrellas y pienso en ti... ¡digo, en el cielo!' : 'Es genial estudiar contigo. Siempre haces buenas preguntas.',
          },
          {
            who: 'friend',
            text: romance ? 'Can we read together every Friday?' : 'Can we study together every Friday?',
            es: romance ? '¿Podemos leer juntos todos los viernes?' : '¿Podemos estudiar juntos todos los viernes?',
            options: [
              {
                text: 'Yes! I love that idea.',
                reply: romance ? "Then it's our Friday plan!" : 'Great! Study partners!',
                es: romance ? '¡Entonces es nuestro plan de los viernes!' : '¡Genial! ¡Colegas de estudio!',
                effect: 2,
              },
              { text: 'Maybe. I usually help Maya on Fridays.', reply: 'Oh... OK. Maybe on Saturdays?', es: 'Oh... bueno. ¿Quizás los sábados?', effect: 1 },
              romance
                ? { text: 'Yes, we reads together!', reply: 'Ha ha, "we READ". Yes, we read together!', es: 'Ja, ja, "we READ". ¡Sí, leemos juntos!', effect: 0 }
                : { text: 'Yes, we studies together!', reply: 'Ha ha, "we STUDY". Yes, we study together!', es: 'Ja, ja, "we STUDY". ¡Sí, estudiamos juntos!', effect: 0 },
              nonsense('Friday is a pizza.', "A pizza? Ha ha, I don't understand.", '¿Una pizza? Ja, ja, no entiendo.'),
            ],
          },
          romance
            ? { who: 'narrator', text: `${his} cheeks are red. Your cheeks are red too.`, es: 'Tiene las mejillas rojas. Tú también.' }
            : { who: 'friend', text: 'See you on Friday!', es: '¡Nos vemos el viernes!' },
        ],
      },
      // A2: después de la fiesta sorpresa de cumpleaños (misión secundaria Make a Wish): deseos y primer condicional
      {
        requires: 'wishes-conditional',
        level: 'A2',
        title: romance ? 'Un deseo secreto' : 'Después de la fiesta',
        lines: [
          { who: 'narrator', text: `The party is over. ${n} is sitting under the tree in Leo's garden, with your card in ${hisLow} hands.`, es: `La fiesta terminó. ${n} está bajo el árbol del jardín de Leo, con tu tarjeta en las manos.` },
          { who: 'friend', text: 'Thank you for the card. Nobody has ever written me something so nice.', es: 'Gracias por la tarjeta. Nadie me había escrito algo tan bonito.' },
          {
            who: 'friend',
            text: "I won't tell you my wish. If I tell you, it won't come true! But what about you? What would you like to do next year?",
            es: 'No te voy a contar mi deseo. ¡Si te lo cuento, no se cumplirá! Pero ¿y tú? ¿Qué te gustaría hacer el próximo año?',
            options: [
              {
                text: "I'd like to travel with you and Leo. I hope we have more adventures.",
                reply: romance ? "I'd like that very much. Wherever we go." : 'Yes! The three of us, like always.',
                es: romance ? 'Me encantaría. Adonde sea que vayamos.' : '¡Sí! Los tres, como siempre.',
                effect: 2,
              },
              { text: "I'd rather stay at home and sleep for a week!", reply: 'Ha ha, after this year, I understand!', es: 'Ja, ja, después de este año, ¡te entiendo!', effect: 1 },
              { text: "I'd like travel a lot.", reply: "Ha ha, I'd like TO travel. Me too!", es: 'Ja, ja, "I\'d like TO travel". ¡Yo también!', effect: 0 },
              nonsense('If the cake rains, I sleep.', "The cake rains? Ha ha, I don't understand.", '¿El pastel llueve? Ja, ja, no entiendo.'),
            ],
          },
          {
            who: 'friend',
            text: 'This year was crazy. If something strange happens again, will you call me?',
            es: 'Este año fue una locura. Si vuelve a pasar algo raro, ¿me vas a llamar?',
            options: [
              {
                text: "Of course. And if you call me, I'll come right away.",
                reply: romance ? "Then I'll call you... even when nothing strange happens." : 'Promise? Good. Me too.',
                es: romance ? 'Entonces te llamaré... aunque no pase nada raro.' : '¿Lo prometes? Bien. Yo también.',
                effect: 2,
              },
              { text: "Maybe, if I'm not busy.", reply: 'Ha ha, very honest!', es: 'Ja, ja, ¡qué sinceridad!', effect: 1 },
              { text: 'Of course. If you will call me, I come.', reply: "Ha ha: if you CALL me, I'LL come. But thank you!", es: 'Ja, ja: "if you CALL me, I\'LL come". ¡Pero gracias!', effect: 0 },
              nonsense('My phone is a banana.', "A banana? Ha ha, I don't understand.", '¿Una banana? Ja, ja, no entiendo.'),
            ],
          },
          romance
            ? { who: 'narrator', text: `${he} smiles at you, and for a second the whole garden is quiet. Maybe some wishes come true after all.`, es: 'Te sonríe, y por un segundo todo el jardín queda en silencio. Quizás algunos deseos sí se cumplen.' }
            : { who: 'friend', text: 'Best friends? — Best friends.', es: '¿Mejores amigos? — Mejores amigos.' },
        ],
      },
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
      {
        requires: 'was-were',
        text: 'Was Greg really Mr. Grimm? I still can\'t believe it!',
        es: '¿De verdad Greg era el profesor Grimm? ¡Todavía no lo creo!',
        options: [
          { text: 'Yes, he was! He was very shy.', reply: 'People change a lot...', es: 'La gente cambia mucho...', effect: 2 },
          { text: 'Yes. His dad was very strict.', reply: 'Poor Greg!', es: '¡Pobre Greg!', effect: 1 },
          { text: 'Yes, he were.', reply: "Ha ha, 'he WAS'. Yes, he was!", es: 'Ja, ja, "he WAS". ¡Sí lo era!', effect: 0 },
          nonsense('Greg was a cloud.', "A cloud? I don't understand...", '¿Una nube? No entiendo...'),
        ],
      },
      {
        requires: 'past-regular',
        text: 'I loved the old market! And you?',
        es: '¡Me encantó el mercado viejo! ¿Y a ti?',
        options: [
          { text: 'Me too! I talked to Nora and I learned new words.', reply: 'Nora was so nice!', es: '¡Nora era tan amable!', effect: 2 },
          { text: 'It was OK. I wanted to see the well.', reply: 'The well was pretty!', es: '¡El pozo era bonito!', effect: 1 },
          { text: "Me too! I visitted Nora's shop.", reply: "Ha ha, 'visited', with one T!", es: 'Ja, ja, "visited", ¡con una sola T!', effect: 0 },
          nonsense('The market played football.', "The market? Ha ha, what?", '¿El mercado? Ja, ja, ¿qué?'),
        ],
      },
      {
        requires: 'past-irregular',
        text: "Leo's parents met on Green Street. That was so sweet!",
        es: 'Los papás de Leo se conocieron en Green Street. ¡Fue tan tierno!',
        options: [
          { text: 'Yes! Carmen saw Daniel and she smiled.', reply: 'Like in a movie!', es: '¡Como en una película!', effect: 2 },
          { text: 'I ate a cookie from Daniel!', reply: 'Lucky you!', es: '¡Qué suerte!', effect: 1 },
          { text: 'Yes! She seed him and she smiled.', reply: "Ha ha, 'she SAW him'. Saw, not seed!", es: 'Ja, ja, "she SAW him". ¡Saw, no seed!', effect: 0 },
          nonsense('Daniel was a sandwich.', "A sandwich? I don't understand...", '¿Un sándwich? No entiendo...'),
        ],
      },
      // A2 (Busuu cap. 4): relaciones
      {
        requires: 'present-perfect',
        text: 'Have you ever fallen out with a good friend?',
        es: '¿Alguna vez te has peleado con un buen amigo?',
        options: [
          { text: 'Yes, once. But we talked and made up.', reply: 'Talking always helps.', es: 'Hablar siempre ayuda.', effect: 2 },
          { text: "No, never. I'm quite easy-going.", reply: 'Easy-going... yes, I can see that!', es: 'Tranquilo... sí, ¡se nota!', effect: 1 },
          { text: 'Yes, but we made down the next day.', reply: 'Ha ha, we made UP. Made up = friends again!', es: 'Ja, ja, we made UP. ¡Made up = amigos otra vez!', effect: 0 },
          nonsense('My friend is a cloud.', "A cloud? I don't understand.", '¿Una nube? No entiendo.'),
        ],
      },
      {
        requires: 'present-perfect',
        text: romance ? 'What is the most important thing in a relationship?' : 'What is the most important thing in a friendship?',
        es: romance ? '¿Qué es lo más importante en una relación?' : '¿Qué es lo más importante en una amistad?',
        options: [
          { text: 'Trust. You have to trust each other.', reply: 'I think so too. And I trust you.', es: 'Yo también lo creo. Y yo confío en ti.', effect: 2 },
          { text: 'Having a lot in common, I think.', reply: 'Maybe. We have a lot in common, right?', es: 'Quizás. Tenemos mucho en común, ¿no?', effect: 1 },
          { text: 'Trust. You have to trust in each others.', reply: "Ha ha, just 'trust each OTHER'. But yes, trust!", es: 'Ja, ja, solo "trust each OTHER". Pero sí, ¡la confianza!', effect: 0 },
          nonsense('The library is my shoe.', "Your shoe? I don't understand.", '¿Tu zapato? No entiendo.'),
        ],
      },
      {
        requires: 'present-perfect',
        text: "My parents say I'm a bit bossy. Am I?",
        es: 'Mis papás dicen que soy un poco mandón. ¿Lo soy?',
        options: [
          { text: "No! You're kind and very honest.", reply: romance ? "You're sweet. Thank you." : "Thanks! You're a good friend.", es: romance ? 'Eres un amor. Gracias.' : '¡Gracias! Eres un buen amigo.', effect: 2 },
          { text: "Maybe a little... but only when you're right!", reply: "Ha ha, I'm always right!", es: 'Ja, ja, ¡siempre tengo la razón!', effect: 1 },
          { text: 'No, you are very honesty.', reply: "Ha ha, I'm HONEST. Honesty is the noun!", es: 'Ja, ja, soy HONEST. ¡Honesty es el sustantivo!', effect: 0 },
          nonsense('Your parents are bananas.', "Bananas? I don't understand.", '¿Bananos? No entiendo.'),
        ],
      },
    ],
  }
}

/**
 * B1-02 · A New City: las dos charlas casuales con la persona especial en el avión (nivel B1).
 * No van en el banco de charlas al azar (tienen requires: null y saldrían en cualquier momento):
 * se juegan una sola vez al empezar la misión (data/b1NewCity.ts, b1PlaneLines; Explore.tsx, quest 'b1-02-plane').
 * La amistad sube o baja con la misma regla de las charlas casuales (game/social.ts, applyCasual).
 */
/** B1-04 · House Rules: charla de amistad con Maya en el vestíbulo (forzada una vez, quest 'b1-04-maya' en Explore.tsx) */
export const B1_04_MAYA_CHAT: CasualChat = {
  requires: null,
  level: 'B1',
  text: 'Back home, we have to take off our shoes at the door. What rules do you have at home?',
  es: 'En mi casa tenemos que quitarnos los zapatos en la puerta. ¿Qué reglas tienes tú en casa?',
  options: [
    { text: "We have to be home by ten, and we mustn't use our phones at dinner.", textEs: 'Tenemos que estar en casa a las diez y no podemos usar el celular en la cena.', reply: "Wow, that's strict! I like the phone rule, though.", es: '¡Uy, qué estricto! Aunque me gusta la regla del celular.', effect: 2 },
    { text: "At home I don't have to cook, but I have to wash the dishes.", textEs: 'En casa no tengo que cocinar, pero tengo que lavar los platos.', reply: 'Fair deal! I hate washing dishes.', es: '¡Buen trato! Yo odio lavar platos.', effect: 2 },
    { text: 'We have no rules. We just ask first.', textEs: 'No tenemos reglas. Solo preguntamos primero.', reply: 'Interesting! Rules are easier when everybody is kind.', es: '¡Interesante! Las reglas son más fáciles cuando todos son amables.', effect: 1 },
    { text: 'House rules shoes the I are dinner.', textEs: '(No tiene sentido.)', reply: "Sorry, I didn't understand.", es: 'Perdón, no te entendí.', effect: -1 },
  ],
}

/** B1-06 · First Job, bloque D: la charla de amistad con Leo en la oficina (una vez; se guarda B1_06_FRIEND en Explore.tsx) */
export const B1_06_LEO_CHAT: CasualChat = {
  requires: null,
  level: 'B1',
  text: 'I heard you had a job interview! What job would you like to have one day?',
  es: '¡Me enteré de que tuviste una entrevista de trabajo! ¿Qué trabajo te gustaría tener algún día?',
  options: [
    { text: "I'd like to be a vet. I love animals, and I've learned a lot here.", textEs: 'Me gustaría ser veterinario. Amo a los animales y he aprendido mucho aquí.', reply: 'A vet! That job suits you. I can see it!', es: '¡Veterinario! Ese trabajo te queda bien. ¡Lo veo!', effect: 2 },
    { text: 'I want to be a teacher, because I like helping people learn.', textEs: 'Quiero ser profesor, porque me gusta ayudar a la gente a aprender.', reply: "A teacher? Cool! You'd be patient and kind.", es: '¿Profesor? ¡Genial! Serías paciente y amable.', effect: 2 },
    { text: "I don't know yet. I'm still thinking about it.", textEs: 'Todavía no sé. Sigo pensándolo.', reply: "That's OK! You have time to find the right job.", es: '¡Está bien! Tienes tiempo para encontrar el trabajo adecuado.', effect: 1 },
    { text: 'Job I the want to dog.', textEs: '(No tiene sentido.)', reply: "Sorry, I didn't understand.", es: 'Perdón, no te entendí.', effect: -1 },
  ],
}

export const B1_02_PLANE_CHATS: CasualChat[] = [
  {
    requires: null,
    level: 'B1',
    text: "Are you nervous? I'm a little nervous. What are you going to do first in Lumen Bay?",
    es: '¿Estás nervioso? Yo estoy un poco nervioso. ¿Qué vas a hacer primero en Lumen Bay?',
    options: [
      { text: "I'm going to explore the harbour.", textEs: 'Voy a explorar el puerto.', reply: "Nice! I'd love to see the old port too.", es: '¡Qué bien! A mí también me encantaría ver el puerto viejo.', effect: 2 },
      { text: "I'd love to try the local food.", textEs: 'Me encantaría probar la comida local.', reply: "Me too! I'm going to try everything.", es: '¡Yo también! Voy a probarlo todo.', effect: 2 },
      { text: "I'm going to sleep for two days.", textEs: 'Voy a dormir dos días.', reply: "Ha! Good plan. I'll wake you up for dinner.", es: '¡Ja! Buen plan. Te despierto para la cena.', effect: 1 },
      { text: 'Yes, the harbour I am pizza.', textEs: '(No tiene sentido.)', reply: "Sorry, I didn't understand.", es: 'Perdón, no te entendí.', effect: -1 },
    ],
  },
  {
    requires: null,
    level: 'B1',
    text: "I'd love to make friends from other countries. What about you?",
    es: 'Me encantaría hacer amigos de otros países. ¿Y tú?',
    options: [
      { text: "Me too. I'm going to talk to everybody!", textEs: 'Yo también. ¡Voy a hablar con todo el mundo!', reply: "Great! Then let's start with the taxi driver.", es: '¡Genial! Entonces empecemos con el taxista.', effect: 2 },
      { text: "I'd like to meet people, but I'm shy.", textEs: 'Me gustaría conocer gente, pero soy tímido.', reply: "That's OK. We can be shy together.", es: 'Está bien. Podemos ser tímidos juntos.', effect: 2 },
      { text: "Maybe. I'll see.", textEs: 'Tal vez. Ya veré.', reply: "Fair enough. Let's see what happens.", es: 'Me parece bien. Veamos qué pasa.', effect: 0 },
      { text: 'Friends the country is big.', textEs: '(No tiene sentido.)', reply: 'Sorry, what?', es: 'Perdón, ¿qué?', effect: -1 },
    ],
  },
]
