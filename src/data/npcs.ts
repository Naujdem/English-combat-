import type { SpriteLook } from '../components/Sprite'

type Line = { text: string; es: string }

/**
 * Personajes que no pelean. Los que tienen `lines` dicen una frase distinta cada vez
 * que les hablas (estudiantes de ambiente). Otros abren una actividad.
 */
export const NPCS: Record<string, { name: string; look: SpriteLook; doneLine?: Line; lines?: Line[] }> = {
  secretary: {
    name: 'Mrs. Lopez',
    look: { shirt: '#6a8caf', hair: '#3b2a1a', skin: '#e0ac69', gender: 'female', accessory: 'glasses' },
    doneLine: { text: 'Have a nice day at Greenfield School!', es: '¡Que tengas un buen día en la escuela Greenfield!' },
  },
  coach: {
    name: 'Coach Mike',
    // Al hablarle abre el repaso de palabras de deportes
    look: { shirt: '#c0392b', hair: '#1f1f1f', skin: '#8d5524', accessory: 'cap' },
  },
  ana: {
    name: 'Ana',
    look: { shirt: '#e0a526', hair: '#a0522d', skin: '#f6d3b3', gender: 'female' },
    lines: [
      { text: 'Shh! I am studying. The English test is tomorrow!', es: '¡Shh! Estoy estudiando. ¡El examen de inglés es mañana!' },
      { text: 'My favorite subject is English. Math is difficult for me.', es: 'Mi materia favorita es inglés. Las matemáticas son difíciles para mí.' },
      { text: 'This is my notebook. Your notebook is on the desk.', es: 'Este es mi cuaderno. Tu cuaderno está en el pupitre.' },
    ],
  },
  librarian: {
    name: 'Mr. Brown',
    look: { shirt: '#5a4a3a', hair: '#cfcfcf', skin: '#f1c27d', accessory: 'glasses' },
    lines: [
      { text: 'Welcome to the library. Books are our friends!', es: 'Te doy la bienvenida a la biblioteca. ¡Los libros son nuestros amigos!' },
      { text: 'This is my favorite book. It is about animals.', es: 'Este es mi libro favorito. Es sobre animales.' },
      { text: 'Please be quiet. The students are reading.', es: 'Por favor, silencio. Los estudiantes están leyendo.' },
    ],
  },
  driver: {
    name: 'Mr. Park',
    look: { shirt: '#2f6fd0', hair: '#1f1f1f', skin: '#f1c27d', accessory: 'cap' },
    lines: [
      { text: 'This is the city bus stop. The next bus is at five o\'clock.', es: 'Esta es la parada de autobús de la ciudad. El próximo autobús es a las cinco.' },
      { text: 'Cross the street at the crosswalk, please. Be careful!', es: 'Cruza la calle por la cebra, por favor. ¡Ten cuidado!' },
      { text: 'There is a great café next to the clothes shop.', es: 'Hay un café muy bueno al lado de la tienda de ropa.' },
    ],
  },
  rosa: {
    name: 'Officer Rosa',
    // Al hablarle abre la actividad de direcciones y da el mapa
    look: { shirt: '#1f3c88', hair: '#2b1d14', skin: '#c68642', gender: 'female', accessory: 'cap' },
    doneLine: { text: 'Do you need help? There is a map in your bag!', es: '¿Necesitas ayuda? ¡Hay un mapa en tu mochila!' },
  },
  lily: {
    name: 'Lily',
    // Cajera del café: abre la actividad de pedir
    look: { shirt: '#8b5a2b', hair: '#d9822b', skin: '#f6d3b3', gender: 'female' },
    doneLine: { text: 'Hi again! Can I get you anything?', es: '¡Hola otra vez! ¿Te traigo algo?' },
  },
  mia: {
    name: 'Mia',
    // Corre con audífonos y choca contigo: practicar disculpas y dar indicaciones
    look: { shirt: '#3b9d5d', hair: '#1f1f1f', skin: '#c68642', gender: 'female' },
    lines: [
      { text: 'Hi again! I run in the park every morning.', es: '¡Hola otra vez! Corro en el parque todas las mañanas.' },
      { text: 'Thank you for your help! The bank is next to the park, right?', es: '¡Gracias por tu ayuda! El banco está al lado del parque, ¿cierto?' },
    ],
  },
  sam: {
    name: 'Sam',
    look: { shirt: '#e0a526', hair: '#5a3a1a', skin: '#8d5524' },
    lines: [
      { text: 'Look! There are fish in the fountain! One, two, three... ten fish!', es: '¡Mira! ¡Hay peces en la fuente! Uno, dos, tres... ¡diez peces!' },
      { text: 'Is this your first time in the city? There are many shops here.', es: '¿Es tu primera vez en la ciudad? Aquí hay muchas tiendas.' },
      { text: 'Those tourists are lost. Mr. Rossi always sends them to the wrong place!', es: 'Esos turistas están perdidos. ¡El señor Rossi siempre los manda al lugar equivocado!' },
    ],
  },
  ben: {
    name: 'Ben',
    look: { shirt: '#f4efe4', hair: '#d9b46a', skin: '#f6d3b3' },
    lines: [
      { text: 'Hello! Is this your ball? No? Ha ha, it is my ball!', es: '¡Hola! ¿Es esta tu pelota? ¿No? ¡Ja, ja, es mi pelota!' },
      { text: 'Football is my favorite sport. Max is our captain.', es: 'El fútbol es mi deporte favorito. Max es nuestro capitán.' },
      { text: 'The coach is strict, but he is very nice.', es: 'El entrenador es estricto, pero es muy amable.' },
    ],
  },
  // ── Green Street (barrio) ──
  garcia: {
    name: 'Mrs. Garcia',
    // La mamá de Leo: rutinas de la familia (presente simple) y la invitación al cumpleaños
    look: { shirt: '#d4537e', hair: '#2b1d14', skin: '#e0ac69', gender: 'female' },
    doneLine: { text: 'See you at the party! It starts at four o\'clock.', es: '¡Nos vemos en la fiesta! Empieza a las cuatro.' },
  },
  emma: {
    name: 'Emma',
    look: { shirt: '#3b9d5d', hair: '#2b1d14', skin: '#e0ac69', gender: 'female' },
    lines: [
      { text: "Hi! I'm Emma, Leo's sister. I play the guitar every afternoon.", es: '¡Hola! Soy Emma, la hermana de Leo. Toco la guitarra todas las tardes.' },
      { text: 'Leo always gets up late. Mom is always angry! Ha ha.', es: 'Leo siempre se levanta tarde. ¡Mamá siempre se enoja! Ja, ja.' },
      { text: 'Our dog is called Rocky. He sleeps in the garden.', es: 'Nuestro perro se llama Rocky. Duerme en el jardín.' },
    ],
  },
  rojas: {
    name: 'Mr. Rojas',
    // El papá de Maya: gustos con like / love / hate + -ing
    look: { shirt: '#e07b39', hair: '#1f1f1f', skin: '#c68642', accessory: 'glasses' },
    doneLine: { text: 'I love cooking for Maya and her friends. Come back for dinner!', es: 'Me encanta cocinar para Maya y sus amigos. ¡Vuelve a cenar!' },
  },
  joe: {
    name: 'Grandpa Joe',
    // El abuelo de Leo: la fiesta de cumpleaños (fechas, Happy birthday) y la foto de tu familia
    look: { shirt: '#8b5a2b', hair: '#e8e8e8', skin: '#f1c27d', accessory: 'glasses' },
    doneLine: { text: 'I always take photos at parties. Smile!', es: 'Siempre tomo fotos en las fiestas. ¡Sonríe!' },
  },
  lucy: {
    name: 'Lucy',
    look: { shirt: '#e0a526', hair: '#d9822b', skin: '#f6d3b3', gender: 'female' },
    lines: [
      { text: 'Look! The dog is running after the ball!', es: '¡Mira! ¡El perro está corriendo detrás de la pelota!' },
      { text: 'I am waiting for my mom. She is buying ice cream.', es: 'Estoy esperando a mi mamá. Está comprando helado.' },
      { text: 'The sun is shining today. I love playing in the park!', es: 'Hoy brilla el sol. ¡Me encanta jugar en el parque!' },
    ],
  },
  // ── La granja ──
  rosie: {
    name: 'Rosie',
    // La nieta del granjero: juego de adivinar el animal con preguntas (Does it...?)
    look: { shirt: '#d64545', hair: '#d9822b', skin: '#f6d3b3', gender: 'female' },
    doneLine: { text: 'Do you want to play again? I love this game!', es: '¿Quieres jugar otra vez? ¡Me encanta este juego!' },
  },
  patel: {
    name: 'Dr. Patel',
    // La veterinaria: los animales a sus corrales (pistas con doesn't y plurales)
    look: { shirt: '#f4efe4', hair: '#1f1f1f', skin: '#a0662e', gender: 'female', accessory: 'glasses' },
    doneLine: { text: 'The animals are happy now. Thank you for your help!', es: 'Los animales ya están contentos. ¡Gracias por tu ayuda!' },
  },
  // ── La oficina ──
  sara: {
    name: 'Sara',
    // La recepcionista: la agenda de la directora (la hora y at / on / in)
    look: { shirt: '#3b9d5d', hair: '#e0b04a', skin: '#f6d3b3', gender: 'female' },
    doneLine: { text: 'Your appointment with Ms. Clark is today. Good luck!', es: 'Tu cita con la señora Clark es hoy. ¡Suerte!' },
  },
  grace: {
    name: 'Grace',
    // La asistente: contestar el teléfono y tomar un mensaje (pronombres de objeto, Could you...?)
    look: { shirt: '#e07b39', hair: '#2b1d14', skin: '#8d5524', gender: 'female' },
    doneLine: { text: 'Thank you for your help with the phone! Could you come back tomorrow? Ha ha!', es: '¡Gracias por ayudarme con el teléfono! ¿Podrías volver mañana? ¡Ja, ja!' },
  },
  diaz: {
    name: 'Mr. Diaz',
    look: { shirt: '#5a7a5a', hair: '#9a9a9a', skin: '#c68642', accessory: 'cap' },
    lines: [
      { text: "I'm a cleaner. I start work at six in the morning, and I finish at two.", es: 'Soy conserje. Empiezo a trabajar a las seis de la mañana y termino a las dos.' },
      { text: 'Could you put your cup in the kitchen, please? Thank you!', es: '¿Podrías poner tu taza en la cocina, por favor? ¡Gracias!' },
      { text: 'In summer the office is very hot, but in winter it is very cold!', es: 'En verano la oficina es muy calurosa, ¡pero en invierno es muy fría!' },
    ],
  },
  amy: {
    name: 'Amy',
    look: { shirt: '#9b6fd0', hair: '#d9822b', skin: '#f6d3b3', gender: 'female' },
    lines: [
      { text: "I'm a designer. I draw pictures for the company, and I love my job!", es: 'Soy diseñadora. Hago dibujos para la empresa, ¡y me encanta mi trabajo!' },
      { text: 'I usually have lunch at half past one, but today I am very busy.', es: 'Normalmente almuerzo a la una y media, pero hoy estoy muy ocupada.' },
      { text: 'Do you want coffee or tea? The coffee machine is in the kitchen.', es: '¿Quieres café o té? La máquina de café está en la cafetería.' },
    ],
  },
  // ── La escuela en 1996 ──
  higgins: {
    name: 'Mrs. Higgins',
    // La maestra de 1996: la lista de asistencia (was / were)
    look: { shirt: '#7a4fa3', hair: '#8b5a2b', skin: '#f1c27d', gender: 'female' },
    doneLine: { text: 'My attendance book was a disaster. Now it is perfect! Thank you, dear.', es: 'Mi lista de asistencia era un desastre. ¡Ahora está perfecta! Gracias, querido.' },
  },
  tina: {
    name: 'Tina',
    look: { shirt: '#d64545', hair: '#e0b04a', skin: '#f6d3b3', gender: 'female' },
    lines: [
      { text: 'Yesterday was my birthday! There was a big cake, and my friends were at my house.', es: '¡Ayer fue mi cumpleaños! Había un pastel grande, y mis amigos estaban en mi casa.' },
      { text: 'Greg was very strange this morning. He was quiet, and his eyes were sad.', es: 'Greg estaba muy raro esta mañana. Estaba callado y sus ojos estaban tristes.' },
      { text: 'Look at the board! There were strange words on it this morning.', es: '¡Mira la pizarra! Esta mañana había unas palabras raras escritas.' },
    ],
  },
  // ── La ciudad en 1996 ──
  lopez: {
    name: 'Mr. Lopez',
    // El vendedor de frutas: los sacos de sonidos (/t/ /d/ /ɪd/)
    look: { shirt: '#5f9a3c', hair: '#3b2a1a', skin: '#c68642', accessory: 'cap' },
    doneLine: { text: 'My sacks are perfect now. Walked, played, wanted! You listened very well.', es: 'Mis sacos ya están perfectos. ¡Walked, played, wanted! Escuchaste muy bien.' },
  },
  nora: {
    name: 'Nora',
    // La dueña de la tienda: repaso de palabras de 1996
    look: { shirt: '#c98b4a', hair: '#8b5a2b', skin: '#f1c27d', gender: 'female' },
    doneLine: { text: 'Thank you for visiting my shop! Everything here is new... in 1996!', es: '¡Gracias por visitar mi tienda! Aquí todo es nuevo... ¡en 1996!' },
  },
  'rosa-kid': {
    name: 'Rosa',
    // La oficial Rosa de niña
    look: { shirt: '#1f3c88', hair: '#2b1d14', skin: '#c68642', gender: 'female' },
    lines: [
      { text: 'Yesterday I helped a lost dog. I walked him to his house. One day I want to be a police officer!', es: 'Ayer ayudé a un perro perdido. Lo acompañé a su casa. ¡Un día quiero ser policía!' },
      { text: 'My dad cleaned the well last week. The water is very cold!', es: 'Mi papá limpió el pozo la semana pasada. ¡El agua está muy fría!' },
      { text: 'A man in a dark coat watched the phone box all morning. He looked very sad.', es: 'Un hombre con abrigo oscuro miró la cabina de teléfono toda la mañana. Se veía muy triste.' },
    ],
  },
  // ── Green Street en 1996 ──
  'joe-young': {
    name: 'Joe',
    // El abuelo Joe de joven: construye la primera casa de Green Street y tiene el libro de verbos
    look: { shirt: '#8b5a2b', hair: '#6b4a2a', skin: '#f1c27d', accessory: 'glasses' },
    doneLine: { text: 'Keep my verb book in your head! Went, saw, ate... My son Daniel learned them all. He is a medical student now!', es: '¡Guarda mi libro de verbos en tu cabeza! Went, saw, ate... Mi hijo Daniel los aprendió todos. ¡Ahora estudia medicina!' },
  },
  pete: {
    name: 'Pete',
    look: { shirt: '#3b6fb6', hair: '#e0b04a', skin: '#f6d3b3', accessory: 'cap' },
    lines: [
      { text: 'Sam says "I goed to the shop". Ha ha! It is "I went"!', es: 'Sam dice "I goed to the shop". ¡Ja, ja! ¡Se dice "I went"!' },
      { text: 'We built three houses last month. Well... we started three houses!', es: 'El mes pasado construimos tres casas. Bueno... ¡empezamos tres casas!' },
      { text: 'Yesterday I saw a strange man in a dark coat. He was in front of Joe\'s house for a long time.', es: 'Ayer vi a un hombre raro con abrigo oscuro. Estuvo mucho rato frente a la casa de Joe.' },
    ],
  },
  // ── La granja en 1996 ──
  bill: {
    name: 'Bill',
    // El señor Brown de joven: la misma gorra y la misma camisa azul, el pelo todavía oscuro
    look: { shirt: '#3b6fb6', hair: '#4a3a2a', skin: '#e0ac69', accessory: 'cap' },
    doneLine: { text: 'The mice! Ha ha. I fixed the rope, and the windmill works again. Thank you!', es: '¡Los ratones! Ja, ja. Arreglé la cuerda y el molino funciona otra vez. ¡Gracias!' },
  },
  hank: {
    name: 'Hank',
    look: { shirt: '#c0602a', hair: '#e0b04a', skin: '#f1c27d', accessory: 'cap' },
    lines: [
      { text: "Did you see my son Tom? He didn't do his homework again!", es: '¿Viste a mi hijo Tom? ¡Otra vez no hizo su tarea!' },
      { text: "I fixed three fences yesterday. I didn't sleep very much!", es: 'Ayer arreglé tres cercas. ¡No dormí mucho!' },
      { text: "A man in a dark coat sat by the pond last night. He didn't say a word. Strange, no?", es: 'Anoche un hombre con abrigo oscuro se sentó junto al estanque. No dijo ni una palabra. Raro, ¿no?' },
    ],
  },
  // ── El viejo cine en 1996 ──
  diana: {
    name: 'Diana',
    // La señora Clark de joven, en la taquilla del cine de su papá: las mismas gafas y el mismo pelo
    look: { shirt: '#8a2830', hair: '#2b1d14', skin: '#f1c27d', gender: 'female', accessory: 'glasses' },
    doneLine: { text: 'One day I want to be a director... of a big company! Ha ha. Enjoy the film!', es: 'Un día quiero ser directora... ¡de una gran empresa! Ja, ja. ¡Disfruta la película!' },
  },
  // ── La escuela en 2056 ──
  'leo-adult': {
    name: 'Mr. Garcia',
    // Leo adulto, el profesor de inglés: la misma piel y el mismo pelo, con gafas y camisa de profesor
    look: { shirt: '#2f5d50', hair: '#2d2d3a', skin: '#e0ac69', accessory: 'glasses' },
    doneLine: { text: 'Hi, hi! On my fifteenth birthday somebody gave me a card: "Be brave. Use your voice." I never knew who. Now I say it to all my students.', es: '¡Hola, hola! En mi cumpleaños número quince alguien me dio una tarjeta: "Sé valiente. Usa tu voz". Nunca supe quién. Ahora se lo digo a todos mis estudiantes.' },
  },
  zoe: {
    name: 'Zoe',
    look: { shirt: '#e07b39', hair: '#e0b04a', skin: '#f6d3b3', gender: 'female' },
    lines: [
      { text: "Tomorrow I'm going to play football. My dad Tom is the coach!", es: 'Mañana voy a jugar fútbol. ¡Mi papá Tom es el entrenador!' },
      { text: "Mr. Garcia is the best teacher. He always says: \"Be brave. Use your voice.\"", es: 'El profesor Garcia es el mejor. Siempre dice: "Sé valiente. Usa tu voz".' },
      { text: "Look! The old bell. My grandma says it is from 1996. We are going to ring it at the party next week!", es: '¡Mira! La campana vieja. Mi abuela dice que es de 1996. ¡La vamos a tocar en la fiesta de la próxima semana!' },
    ],
  },
  // ── La ciudad en 2056 ──
  marco: {
    name: 'Marco',
    // El guía holograma: nieto de Tony Rossi, con la misma gorra
    look: { shirt: '#7fe0ff', hair: '#3b2a1a', skin: '#e0ac69', accessory: 'cap' },
    doneLine: { text: "My grandpa Tony was the best guide in town. I'm not going to be the second best! Ha ha.", es: 'Mi abuelo Tony fue el mejor guía de la ciudad. ¡No voy a ser el segundo mejor! Ja, ja.' },
  },
  'park-old': {
    name: 'Mr. Park',
    look: { shirt: '#2f6fd0', hair: '#cfcfcf', skin: '#f1c27d', accessory: 'cap' },
    lines: [
      { text: "I drove the city bus for forty years. Now the buses fly! I'm going to retire next year.", es: 'Manejé el bus de la ciudad cuarenta años. ¡Ahora los buses vuelan! Me voy a retirar el próximo año.' },
      { text: "Are you going to take the Sky Bus? Don't look down! Ha ha.", es: '¿Vas a tomar el Sky Bus? ¡No mires hacia abajo! Ja, ja.' },
      { text: 'A man in a dark coat sat at this old bus stop all day yesterday. He was not going anywhere.', es: 'Ayer un hombre con abrigo oscuro estuvo todo el día en esta parada vieja. No iba a ninguna parte.' },
    ],
  },
  'rosa-chief': {
    name: 'Chief Rosa',
    // La oficial Rosa, ahora jefa de la policía
    look: { shirt: '#1f3c88', hair: '#bdbdbd', skin: '#c68642', gender: 'female', accessory: 'cap' },
    lines: [
      { text: "I'm the chief of police now. Are you going to cross the street? Use the crosswalk, please!", es: 'Ahora soy la jefa de la policía. ¿Vas a cruzar la calle? ¡Usa la cebra, por favor!' },
      { text: "Thirty years ago I gave maps to tourists. Now they aren't going to need maps: they have holo-glasses!", es: 'Hace treinta años les daba mapas a los turistas. ¡Ahora no van a necesitar mapas: tienen gafas holográficas!' },
      { text: "When I was a little girl, I helped a lost dog in 1996. Ha ha, that's a long story.", es: 'Cuando era niña, ayudé a un perro perdido en 1996. Ja, ja, es una larga historia.' },
    ],
  },
  'lily-adult': {
    name: 'Lily',
    look: { shirt: '#8b5a2b', hair: '#d9822b', skin: '#f6d3b3', gender: 'female', accessory: 'glasses' },
    lines: [
      { text: "This is my café now! The robots are going to bring your order. I'm not going to write your name on the cup... the robot is!", es: '¡Ahora este café es mío! Los robots te van a traer el pedido. Yo no voy a escribir tu nombre en el vaso... ¡el robot sí!' },
      { text: "Are you going to have a black coffee? Mr. Rossi always had a black coffee at ten.", es: '¿Vas a tomar un café negro? El señor Rossi siempre tomaba un café negro a las diez.' },
    ],
  },
  // ── Green Street en 2056 ──
  'leo-home': {
    name: 'Mr. Garcia',
    // Leo adulto en su casa (la casa que construyó el abuelo Joe)
    look: { shirt: '#2f5d50', hair: '#2d2d3a', skin: '#e0ac69', accessory: 'glasses' },
    lines: [
      { text: 'Hi, hi again! This is my house. My grandpa Joe built it with his hands in 1996.', es: '¡Hola, hola otra vez! Esta es mi casa. Mi abuelo Joe la construyó con sus manos en 1996.' },
      { text: "What am I going to say at the party? I'm going to talk about my best friend... and about being brave.", es: '¿Qué voy a decir en la fiesta? Voy a hablar de mi mejor amigo... y de ser valiente.' },
      { text: 'Every night I read a story to Joey. Tonight we are going to read a story about a magic clock!', es: 'Todas las noches le leo un cuento a Joey. ¡Esta noche vamos a leer un cuento sobre un reloj mágico!' },
    ],
  },
  'emma-adult': {
    name: 'Emma',
    // La hermana de Leo, treinta años después: organiza la fiesta de los 60 años de la calle
    look: { shirt: '#3b9d5d', hair: '#2b1d14', skin: '#e0ac69', gender: 'female', accessory: 'glasses' },
    doneLine: { text: 'The party is going to be amazing! I am going to play the guitar, like when I was a girl.', es: '¡La fiesta va a ser increíble! Voy a tocar la guitarra, como cuando era niña.' },
  },
  'maya-adult': {
    name: 'Maya',
    look: { shirt: '#d4537e', hair: '#4a2c17', skin: '#c68642', gender: 'female' },
    lines: [
      { text: "Hi! I'm Theo's mom. What am I going to cook for the party? My famous sandwiches, of course!", es: '¡Hola! Soy la mamá de Theo. ¿Qué voy a cocinar para la fiesta? ¡Mis famosos sándwiches, claro!' },
      { text: 'Leo and I are going to sit together at the party. Like at school, thirty years ago!', es: 'Leo y yo nos vamos a sentar juntos en la fiesta. ¡Como en la escuela, hace treinta años!' },
    ],
  },
  'rojas-old': {
    name: 'Mr. Rojas',
    look: { shirt: '#e07b39', hair: '#e8e8e8', skin: '#c68642', accessory: 'glasses' },
    lines: [
      { text: "I'm eighty-five, but I still love cooking. Where am I going to put the food? On the big table in the park!", es: 'Tengo ochenta y cinco años, pero todavía me encanta cocinar. ¿Dónde voy a poner la comida? ¡En la mesa grande del parque!' },
      { text: 'When is Theo going to the Moon? Next year, he says! Ha ha.', es: '¿Cuándo va a ir Theo a la Luna? ¡El próximo año, dice! Ja, ja.' },
    ],
  },
  // ── La granja en 2056 ──
  'rosie-adult': {
    name: 'Rosie',
    // Rosie, la nieta del señor Brown, ahora es la dueña de la granja
    look: { shirt: '#3b9d5d', hair: '#c0602a', skin: '#f6d3b3', gender: 'female', accessory: 'cap' },
    doneLine: { text: "Look at the sky. It's going to rain... and the windmill is going to make a lot of energy! Ha ha.", es: 'Mira el cielo. Va a llover... ¡y el molino va a hacer mucha energía! Ja, ja.' },
  },
  'patel-old': {
    name: 'Dr. Patel',
    look: { shirt: '#f4efe4', hair: '#d0d0d0', skin: '#a0662e', gender: 'female', accessory: 'glasses' },
    lines: [
      { text: "I'm eighty, but I still visit the animals every week. That sheep is going to have a baby soon!", es: 'Tengo ochenta años, pero todavía visito a los animales cada semana. ¡Esa oveja va a tener un bebé pronto!' },
      { text: 'When I was a girl, I helped Mrs. Brown with the chickens. Sixty years ago!', es: 'Cuando era niña, ayudaba a la señora Brown con las gallinas. ¡Hace sesenta años!' },
      { text: "Look at the drone! It's going to bring the sheep back to the barn.", es: '¡Mira el dron! Va a traer las ovejas de vuelta al granero.' },
    ],
  },
  // ── La torre Green Valley en 2056 ──
  'diana-old': {
    name: 'Ms. Clark',
    // Diana, la señora Clark, el día que se jubila: las mismas gafas, el pelo blanco y su color morado
    look: { shirt: '#7a4fa3', hair: '#e8e8e8', skin: '#f1c27d', gender: 'female', accessory: 'glasses' },
    doneLine: { text: 'Thank you! Now I would like to say goodbye... with a big smile.', es: '¡Gracias! Ahora me gustaría despedirme... con una gran sonrisa.' },
  },
  'grace-old': {
    name: 'Grace',
    // Grace, la de las palomitas (1996) y la asistente (presente), ya mayor
    look: { shirt: '#e07b39', hair: '#d0d0d0', skin: '#8d5524', gender: 'female' },
    lines: [
      { text: "In 1996 I sold popcorn in the old cinema. Then I answered the phones here. Now I'm retired... but I would like to stay for the party!", es: 'En 1996 vendía palomitas en el viejo cine. Después contestaba los teléfonos aquí. Ahora estoy jubilada... ¡pero me gustaría quedarme a la fiesta!' },
      { text: 'Diana and I drink coffee here every morning. Tomorrow she is going to have a lot of free time!', es: 'Diana y yo tomamos café aquí todas las mañanas. ¡Mañana va a tener mucho tiempo libre!' },
      { text: "Would you like a coffee? The robot makes it... but I bring it. Ha ha!", es: '¿Quieres un café? El robot lo prepara... pero yo lo traigo. ¡Ja, ja!' },
    ],
  },
}

/** Datos inventados del papel de traslado: así no se pide información real del jugador */
export const TRANSFER = {
  address: '25 Park Street',
  phone: '555-0147',
  phoneWrong: '555-0174',
  phoneSpoken: 'five, five, five, oh, one, seven, four',
}

export function schoolEmail(name: string) {
  const user = name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z]/g, '')
  return `${user || 'student'}@greenfield.edu`
}
