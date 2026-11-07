import type { SpriteLook } from '../components/Sprite'

type Line = { text: string; es: string }

/**
 * Personajes que no pelean. Los que tienen `lines` dicen una frase distinta cada vez
 * que les hablas (estudiantes de ambiente). Otros abren una actividad.
 */
/**
 * interest: el personaje es la persona especial (nombre y aspecto elegidos por el jugador).
 * after: el personaje solo aparece en el mapa cuando este id está en `opened`.
 */
export const NPCS: Record<string, { name: string; look: SpriteLook; doneLine?: Line; lines?: Line[]; interest?: boolean; after?: string; until?: string }> = {
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
  // ── B1 · apertura: el teléfono de tu cuarto. Quien habla es Ms. Noor Haddad, la coordinadora del intercambio ──
  'b1-phone': {
    name: 'Ms. Haddad',
    look: { shirt: '#2f6f73', hair: '#1f1f1f', skin: '#c68642', gender: 'female' },
    // Al salir del recuerdo 1, el teléfono pasa a ser Leo escribiendo (b1-01-leo-phone)
    until: 'b1-01-memory',
    doneLine: { text: '(The phone is quiet now. Your flight leaves tomorrow at nine.)', es: '(El teléfono ya está en silencio. Tu vuelo sale mañana a las nueve.)' },
  },
  // ── B1-01 · epílogo: el mismo teléfono, ahora con Leo escribiendo (retrato de Leo). Aparece con memoryFlag(1) ──
  'b1-01-leo-phone': {
    name: 'Leo',
    look: { shirt: '#d4743a', hair: '#2d2d3a', skin: '#e0ac69', gender: 'male', accessory: 'glasses' },
    after: 'b1-01-memory',
    doneLine: { text: 'Get some sleep. We have a plane to catch.', es: 'Duerme un poco. Tenemos un avión que tomar.' },
  },
  // ── B1-01 · The Accident (recuerdo 1): el amigo junto a la puerta. Cara borrosa y sin nombre (ninguna pista de quién es) ──
  'b1-01-friend': {
    name: 'Amigo',
    look: { shirt: '#5a6a7e', hair: '#2b2b33', skin: '#c9a888' },
    doneLine: { text: '...', es: '(No dice nada).' },
  },
  // ── B1-02 · A New City (data/b1NewCity.ts): la persona especial (en el avión hasta aterrizar, luego en el aeropuerto) y Leo junto a la cinta ──
  'b1-02-interest-plane': {
    name: '',
    look: { shirt: '#5d8fd4', hair: '#1f1f1f', skin: '#e0ac69' },
    interest: true,
    until: 'b1-02-landed',
  },
  'b1-02-interest': {
    name: '',
    look: { shirt: '#5d8fd4', hair: '#1f1f1f', skin: '#e0ac69' },
    interest: true,
    after: 'b1-02-landed',
  },
  // Bloque B: el empleado de Objetos Perdidos (Lost Luggage). Aparece al vencer a la viajera 2 (after admite un enemigo vencido)
  'b1-02-clerk': {
    name: 'The clerk',
    look: { shirt: '#5d8fd4', hair: '#3b2a1a', skin: '#e0ac69', gender: 'male' },
    after: 'b1-02-trav2',
    doneLine: { text: 'Welcome to Lumen Bay! Have a nice stay.', es: '¡Bienvenido a Lumen Bay! Disfruta tu estadía.' },
  },
  // Bloque C (data/b1Office.ts): el empleado de la tienda, Ms. Haddad y Leo en la oficina y en la calle
  'b1-02-assistant': {
    name: 'The shop assistant',
    look: { shirt: '#3b9d5d', hair: '#2b1d12', skin: '#c68642', gender: 'male' },
    doneLine: { text: 'Here is your SIM card. Welcome to Lumen Bay!', es: 'Aquí tienes tu tarjeta SIM. ¡Bienvenido a Lumen Bay!' },
  },
  'b1-02-haddad': {
    name: 'Ms. Haddad',
    look: { shirt: '#2f6f73', hair: '#1f1f1f', skin: '#c68642', gender: 'female' },
    doneLine: { text: 'Here is your agenda. Tomorrow at nine we\'re meeting here for the welcome talk.', es: 'Aquí está su agenda. Mañana a las nueve nos reunimos aquí para la charla de bienvenida.' },
  },
  'b1-02-leo-office': {
    name: 'Leo',
    look: { shirt: '#d4743a', hair: '#2d2d3a', skin: '#e0ac69', gender: 'male', accessory: 'glasses' },
    after: 'b1-02-agenda',
    doneLine: { text: "Great! Now let's get to the residence. Ms. Haddad gave us a map.", es: '¡Muy bien! Ahora vamos a la residencia. La Sra. Haddad nos dio un mapa.' },
  },
  'b1-02-leo-street': {
    name: 'Leo',
    look: { shirt: '#d4743a', hair: '#2d2d3a', skin: '#e0ac69', gender: 'male', accessory: 'glasses' },
    after: 'b1-02-futures',
    doneLine: { text: "We're home! Well... almost. Did you hear that? The airport speakers are making a strange noise.", es: '¡Ya estamos! Bueno... casi. ¿Oíste eso? Los altavoces del aeropuerto hacen un ruido raro.' },
  },
  'b1-02-leo': {
    name: 'Leo',
    look: { shirt: '#d4743a', hair: '#2d2d3a', skin: '#e0ac69', gender: 'male', accessory: 'glasses' },
    after: 'b1-02-landed',
    doneLine: { text: "Good! Now, let's see what's going on at the baggage claim...", es: '¡Bien! Ahora veamos qué pasa en la zona de equipaje...' },
  },
  // ── B1 · DEMO de Inscriptions: una tablilla de piedra (se dibuja como tablilla en Explore) ──
  'b1-demo-tablet': {
    name: 'Stone tablet',
    look: { shirt: '#4a5568', hair: '#343c4b', skin: '#6f7a8c' },
    doneLine: { text: '(The glyphs are quiet now.)', es: '(Los glifos ya están en silencio.)' },
  },
  // ── A2-01, hospital. Nombres y apariencias provisionales (no canónicos) ──
  'a2-doctor': {
    name: 'The doctor',
    look: { shirt: '#eef3f6', hair: '#3b2a1a', skin: '#c68642', gender: 'female', accessory: 'glasses' },
    doneLine: { text: 'Rest a little, and drink some water. See you later!', es: 'Descansa un poco y toma algo de agua. ¡Hasta luego!' },
  },
  'a2-friend': {
    name: 'Your friend',
    look: { shirt: '#3b9d5d', hair: '#2b1d12', skin: '#e0ac69' },
    doneLine: { text: "Take it easy, OK? I'm right here.", es: 'Tómalo con calma, ¿sí? Aquí estoy.' },
  },
  // La persona especial (nombre y aspecto del jugador). Te trajo al hospital: está contigo desde el inicio de A2-01
  'a2-interest': {
    name: '',
    look: { shirt: '#5d8fd4', hair: '#1f1f1f', skin: '#e0ac69' },
    interest: true,
    doneLine: { text: 'Rest a little, {name}. I am right here.', es: 'Descansa un poco, {name}. Aquí estoy.' },
  },
  // A2-02: Leo se quedó en el ascensor al final de A1. Llega al hospital cuando la persona especial lo llama
  'a2-leo': {
    name: 'Leo',
    // Misma piel y pelo que Leo en A1; camisa naranja y gafas para no confundirlo con tu amigo (verde)
    look: { shirt: '#d4743a', hair: '#2d2d3a', skin: '#e0ac69', gender: 'male', accessory: 'glasses' },
    after: 'a2-02-pieces',
    doneLine: { text: 'You should rest a little. I have to stay with you. Doctor\'s orders!', es: 'Deberías descansar un poco. Tengo que quedarme contigo. ¡Órdenes de la médica!' },
  },
  // ── A2-03, la ciudad: Leo y tu amigo (mismo aspecto que en el hospital) ──
  'a2-03-leo': {
    name: 'Leo',
    look: { shirt: '#d4743a', hair: '#2d2d3a', skin: '#e0ac69', gender: 'male', accessory: 'glasses' },
    doneLine: { text: "I usually walk here on Sundays. Let's enjoy the day!", es: 'Normalmente camino por aquí los domingos. ¡Disfrutemos el día!' },
  },
  'a2-03-friend': {
    name: 'Your friend',
    look: { shirt: '#3b9d5d', hair: '#2b1d12', skin: '#e0ac69' },
    doneLine: { text: "What a day! Let's do it again sometime.", es: '¡Qué día! Repitámoslo alguna vez.' },
  },
  // La persona especial (nombre y aspecto del jugador) te acompaña en la ciudad
  'a2-03-interest': {
    name: '',
    look: { shirt: '#5d8fd4', hair: '#1f1f1f', skin: '#e0ac69' },
    interest: true,
    doneLine: { text: "It's so nice to be outside again, {name}!", es: '¡Qué bueno estar afuera otra vez, {name}!' },
  },
  // El mesero del café: aparece al aceptar la invitación y, tras la charla, se convierte en el eco
  'a2-03-waiter': {
    name: 'The waiter',
    look: { shirt: '#2b2b2b', hair: '#3b2a1a', skin: '#e0ac69' },
    after: 'a2-03-invite',
    until: 'a2-03-pressure',
  },
  // ── A2-04, el taller del señor Hale: Leo, la persona especial y Mr. Hale (antes de corromperse) ──
  'a2-04-leo': {
    name: 'Leo',
    look: { shirt: '#d4743a', hair: '#2d2d3a', skin: '#e0ac69', gender: 'male', accessory: 'glasses' },
    doneLine: { text: 'Could you keep that little stone safe? I think it is important.', es: '¿Podrías guardar bien esa piedrita? Creo que es importante.' },
  },
  'a2-04-interest': {
    name: '',
    look: { shirt: '#5d8fd4', hair: '#1f1f1f', skin: '#e0ac69' },
    interest: true,
    doneLine: { text: 'So many tools! Could you show me the wrench, {name}?', es: '¡Cuántas herramientas! ¿Me muestras la llave inglesa, {name}?' },
  },
  // Mr. Hale trabaja en la mesa; tras arreglar la radio (Fix the Radio) se corrompe y pasa a ser el jefe
  'a2-04-hale': {
    name: 'Mr. Hale',
    look: { shirt: '#3b5a7a', hair: '#2b1d12', skin: '#e0ac69', gender: 'male' },
    until: 'a2-04-sequence',
    doneLine: { text: 'Sorry, I have to finish this radio. Could you ask Leo for my notes?', es: 'Perdón, tengo que terminar esta radio. ¿Podrías pedirle mis notas a Leo?' },
  },
  // ── A2-05, la biblioteca: Leo, la persona especial y Mrs. Okafor (la bibliotecaria) ──
  'a2-05-leo': {
    name: 'Leo',
    look: { shirt: '#d4743a', hair: '#2d2d3a', skin: '#e0ac69', gender: 'male', accessory: 'glasses' },
    doneLine: { text: 'Two little stones now... Yesterday we found one, today another. We need to keep them safe.', es: 'Ya son dos piedritas... Ayer encontramos una, hoy otra. Tenemos que guardarlas bien.' },
  },
  'a2-05-interest': {
    name: '',
    look: { shirt: '#5d8fd4', hair: '#1f1f1f', skin: '#e0ac69' },
    interest: true,
    doneLine: { text: 'I read this book last year, {name}. I loved it!', es: 'Leí este libro el año pasado, {name}. ¡Me encantó!' },
  },
  'a2-05-librarian': {
    name: 'Mrs. Okafor',
    look: { shirt: '#3a7a5a', hair: '#1a1a1a', skin: '#8d5524', gender: 'female', accessory: 'glasses' },
    doneLine: { text: 'The books are quiet again. Thank you! Come back and read with us anytime.', es: 'Los libros están tranquilos otra vez. ¡Gracias! Vuelve a leer con nosotros cuando quieras.' },
  },
  // ── A2-06, la granja de los River: Leo (solo la lección), Elena, el abuelo y el vecino joven ──
  'a2-06-leo': {
    name: 'Leo',
    look: { shirt: '#d4743a', hair: '#2d2d3a', skin: '#e0ac69', gender: 'male', accessory: 'glasses' },
    until: 'a2-06-practice',
  },
  'a2-06-elena': {
    name: 'Elena',
    look: { shirt: '#b5523b', hair: '#4a2e1a', skin: '#c68642', gender: 'female' },
    doneLine: { text: 'Maybe one day the River Race will start again. Thank you!', es: 'Quizá algún día la River Race vuelva a empezar. ¡Gracias!' },
  },
  'a2-06-grandfather': {
    name: 'Grandfather',
    look: { shirt: '#7a6a4a', hair: '#d8d8d8', skin: '#c68642', gender: 'male', accessory: 'glasses' },
    doneLine: { text: 'Every year we organized the River Race... Those were good days.', es: 'Cada año organizábamos la River Race... Eran buenos días.' },
  },
  'a2-06-neighbor': {
    name: 'The young neighbor',
    look: { shirt: '#4a7a9a', hair: '#2b1d12', skin: '#e0ac69', gender: 'male', accessory: 'cap' },
    doneLine: { text: "The horses are fine. I feed them every morning.", es: 'Los caballos están bien. Les doy de comer cada mañana.' },
  },
  // ── A2-07, el hipódromo: Leo (lección y cierre) y JoJo (testigo del accidente del carro; no combate) ──
  'a2-07-leo': {
    name: 'Leo',
    look: { shirt: '#d4743a', hair: '#2d2d3a', skin: '#e0ac69', gender: 'male', accessory: 'glasses' },
    doneLine: { text: 'The core is still empty… but we are getting closer.', es: 'El núcleo todavía está vacío… pero nos estamos acercando.' },
  },
  'a2-07-jojo': {
    name: 'JoJo',
    look: { shirt: '#e0c14a', hair: '#1a1a1a', skin: '#8d5524', gender: 'male', accessory: 'cap' },
    doneLine: { text: 'Now I can ride without fear.', es: 'Ahora puedo montar sin miedo.' },
  },
  // ── A2-08, el camino: Leo (lección, Reconstruct y cierre) y JoJo (DebateTalk junto al carro) ──
  'a2-08-leo': {
    name: 'Leo',
    look: { shirt: '#d4743a', hair: '#2d2d3a', skin: '#e0ac69', gender: 'male', accessory: 'glasses' },
    doneLine: { text: 'The purple light keeps appearing. We should keep going.', es: 'La luz morada sigue apareciendo. Debemos seguir.' },
  },
  'a2-08-jojo': {
    name: 'JoJo',
    look: { shirt: '#e0c14a', hair: '#1a1a1a', skin: '#8d5524', gender: 'male', accessory: 'cap' },
    doneLine: { text: 'It was the same purple light from the race. I am sure.', es: 'Era la misma luz morada de la carrera. Estoy seguro.' },
  },
  // ── A2-09, el molino: Leo (lección y cierre) y Mr. Bell, el molinero (charla y receta de pan) ──
  'a2-09-leo': {
    name: 'Leo',
    look: { shirt: '#d4743a', hair: '#2d2d3a', skin: '#e0ac69', gender: 'male', accessory: 'glasses' },
    doneLine: { text: 'The cart stopped by the mill. But why here?', es: 'El carro se detuvo junto al molino. Pero ¿por qué aquí?' },
  },
  'a2-09-miller': {
    name: 'Mr. Bell',
    look: { shirt: '#e8e0cc', hair: '#9a9a9a', skin: '#e0ac69', gender: 'male', accessory: 'cap' },
    doneLine: { text: 'Listen! The wheel is turning again. Thank you.', es: '¡Escucha! La rueda gira otra vez. Gracias.' },
  },
  // ── A2-10, la casa de Leo: Leo abajo (lección) y arriba en el ático (investigación y cierre), y la persona especial (reunión) ──
  'a2-10-leo': {
    name: 'Leo',
    look: { shirt: '#d4743a', hair: '#2d2d3a', skin: '#e0ac69', gender: 'male', accessory: 'glasses' },
    until: 'a2-10-practice',
  },
  'a2-10-leo-up': {
    name: 'Leo',
    look: { shirt: '#d4743a', hair: '#2d2d3a', skin: '#e0ac69', gender: 'male', accessory: 'glasses' },
    after: 'a2-10-practice',
    doneLine: { text: 'The cart is still there… in the future.', es: 'La carreta sigue allí… en el futuro.' },
  },
  'a2-10-interest': {
    name: '',
    look: { shirt: '#5d8fd4', hair: '#1f1f1f', skin: '#e0ac69' },
    interest: true,
    doneLine: { text: "We've come so far together. Let's keep going.", es: 'Hemos llegado muy lejos juntos. Sigamos.' },
  },
  // ── A2-11, la ciudad de 2056: robot de objetos perdidos, Leo (estación y museo), la persona especial y Adrián ──
  'a2-11-robot': {
    name: 'Lost & Found Bot',
    look: { shirt: '#9aa6b2', hair: '#5a6672', skin: '#c9d6e2' },
    doneLine: { text: 'Have a nice trip. Do not lose your bag again!', es: 'Buen viaje. ¡No vuelvas a perder tu mochila!' },
  },
  'a2-11-leo': {
    name: 'Leo',
    look: { shirt: '#d4743a', hair: '#2d2d3a', skin: '#e0ac69', gender: 'male', accessory: 'glasses' },
    until: 'a2-11-route',
    doneLine: { text: "Let's find the museum. The signal is very strong.", es: 'Busquemos el museo. La señal es muy fuerte.' },
  },
  'a2-11-leo-museum': {
    name: 'Leo',
    look: { shirt: '#d4743a', hair: '#2d2d3a', skin: '#e0ac69', gender: 'male', accessory: 'glasses' },
    after: 'a2-11-route',
    doneLine: { text: 'The cargo box is empty. Somebody has the fragment.', es: 'La caja de carga está vacía. Alguien tiene el fragmento.' },
  },
  'a2-11-interest': {
    name: '',
    look: { shirt: '#5d8fd4', hair: '#1f1f1f', skin: '#e0ac69' },
    interest: true,
    doneLine: { text: 'This city is beautiful… but something is wrong.', es: 'Esta ciudad es hermosa… pero algo anda mal.' },
  },
  'a2-11-adrian': {
    name: 'Adrián',
    look: { shirt: '#1f3c58', hair: '#3a2a1a', skin: '#c68642', gender: 'male' },
    after: 'a2-11-detective',
    doneLine: { text: 'Every route in my city is perfect. Every route.', es: 'Cada ruta de mi ciudad es perfecta. Cada una.' },
  },
  // ── A2-12, el centro de control de 2056: Leo (sala de boletos y pasillo), el robot de control y la persona especial ──
  'a2-12-leo': {
    name: 'Leo',
    look: { shirt: '#d4743a', hair: '#2d2d3a', skin: '#e0ac69', gender: 'male', accessory: 'glasses' },
    until: 'a2-12-practice',
    doneLine: { text: 'The announcer is blocking the door. Be careful.', es: 'El anunciador bloquea la puerta. Ten cuidado.' },
  },
  'a2-12-leo-hall': {
    name: 'Leo',
    look: { shirt: '#d4743a', hair: '#2d2d3a', skin: '#e0ac69', gender: 'male', accessory: 'glasses' },
    after: 'a2-12-practice',
    doneLine: { text: "We're going back to the present. I'm sure of it.", es: 'Vamos a volver al presente. Estoy seguro.' },
  },
  'a2-12-bot': {
    name: 'Control Bot',
    look: { shirt: '#9aa6b2', hair: '#5a6672', skin: '#c9d6e2' },
    doneLine: { text: 'System status: all routes open. Have a safe trip.', es: 'Estado del sistema: todas las rutas abiertas. Buen viaje.' },
  },
  'a2-12-interest': {
    name: '',
    look: { shirt: '#5d8fd4', hair: '#1f1f1f', skin: '#e0ac69' },
    interest: true,
    doneLine: { text: 'Everybody has a plan now. And so do we.', es: 'Ahora todos tienen un plan. Y nosotros también.' },
  },
  // ── A2-13, de vuelta al hospital: Leo (pasillo), la recepcionista sin voz, la médica y la persona especial ──
  'a2-13-leo': {
    name: 'Leo',
    look: { shirt: '#d4743a', hair: '#2d2d3a', skin: '#e0ac69', gender: 'male', accessory: 'glasses' },
    until: 'a2-13-doctor',
    doneLine: { text: '(cough) I am OK… Go to the reception. The doctor can help us.', es: '(tose) Estoy bien… Ve a la recepción. La médica nos puede ayudar.' },
  },
  'a2-13-leo-hall': {
    name: 'Leo',
    look: { shirt: '#d4743a', hair: '#2d2d3a', skin: '#e0ac69', gender: 'male', accessory: 'glasses' },
    after: 'a2-13-call',
    doneLine: { text: 'My voice is back. Thanks to you.', es: 'Mi voz volvió. Gracias a ti.' },
  },
  'a2-13-receptionist': {
    name: 'The receptionist',
    look: { shirt: '#5d8fd4', hair: '#6b4a2e', skin: '#f1c27d', gender: 'female' },
    doneLine: { text: '(She writes:) "Thank you. The doctor is in your old room."', es: '(Escribe:) "Gracias. La médica está en tu antigua habitación".' },
  },
  'a2-13-doctor': {
    name: 'The doctor',
    look: { shirt: '#eef3f6', hair: '#3b2a1a', skin: '#c68642', gender: 'female', accessory: 'glasses' },
    doneLine: { text: 'It is not an illness. It is that light. Be careful.', es: 'No es una enfermedad. Es esa luz. Ten cuidado.' },
  },
  'a2-13-interest': {
    name: '',
    look: { shirt: '#5d8fd4', hair: '#1f1f1f', skin: '#e0ac69' },
    interest: true,
    doneLine: { text: 'You were so calm on the phone. I was very scared.', es: 'Estuviste muy tranquilo al teléfono. Yo estaba muy asustado.' },
  },
  // ── Misión secundaria Make a Wish (casa de Leo y jardín): Leo (sala y jardín), Maya, la mamá de Leo y la persona especial ──
  'a2-s3-leo': {
    name: 'Leo',
    look: { shirt: '#d4743a', hair: '#2d2d3a', skin: '#e0ac69', gender: 'male', accessory: 'glasses' },
    until: 'a2-s3-practice',
  },
  'a2-s3-leo-garden': {
    name: 'Leo',
    look: { shirt: '#d4743a', hair: '#2d2d3a', skin: '#e0ac69', gender: 'male', accessory: 'glasses' },
    after: 'a2-s3-practice',
    doneLine: { text: "If you eat more cake, you'll explode! Ha ha.", es: '¡Si comes más pastel, vas a explotar! Ja, ja.' },
  },
  'a2-s3-maya': {
    name: 'Maya',
    look: { shirt: '#d4537e', hair: '#4a2c17', skin: '#c68642', gender: 'female' },
    // Se va cuando reta al duelo (el duelo la pone en otro lugar del jardín)
    until: 'a2-s3-meet',
    doneLine: { text: 'Leo needs your help. Go!', es: 'Leo necesita tu ayuda. ¡Ve!' },
  },
  'a2-s3-garcia': {
    name: 'Mrs. Garcia',
    look: { shirt: '#d4537e', hair: '#2b1d14', skin: '#e0ac69', gender: 'female' },
    doneLine: { text: 'Would you like some more lemonade, dear?', es: '¿Quieres más limonada?' },
  },
  'a2-s3-interest': {
    name: '',
    look: { shirt: '#5d8fd4', hair: '#1f1f1f', skin: '#e0ac69' },
    interest: true,
    after: 'a2-s3-card',
    until: 'a2-s3-close',
    doneLine: { text: 'I hope we have many more days like this.', es: 'Espero que tengamos muchos más días como este.' },
  },
  // ── Misión secundaria Market Day (tienda de ropa y mercado): Leo, la persona especial y Nadia, la dependienta ──
  'a2-s4-leo': {
    name: 'Leo',
    look: { shirt: '#d4743a', hair: '#2d2d3a', skin: '#e0ac69', gender: 'male', accessory: 'glasses' },
    doneLine: { text: "I'd like a new hat... but it's too expensive. Ha ha.", es: 'Me gustaría un sombrero nuevo... pero es demasiado caro. Ja, ja.' },
  },
  'a2-s4-interest': {
    name: '',
    look: { shirt: '#5d8fd4', hair: '#1f1f1f', skin: '#e0ac69' },
    interest: true,
    doneLine: { text: 'That jacket really suits you. Good choice!', es: 'Esa chaqueta te queda muy bien. ¡Buena elección!' },
  },
  'a2-s4-nadia': {
    name: 'Nadia',
    look: { shirt: '#2e9d8f', hair: '#1f1f1f', skin: '#8d5524', gender: 'female' },
    doneLine: { text: 'Thank you for shopping with us. Have a nice day!', es: 'Gracias por comprar con nosotros. ¡Que tengas un buen día!' },
  },
  // ── Misión secundaria A Dinner to Remember (casa de Leo): Leo, la señora García, la persona especial y el abuelo Joe ──
  'a2-s5-leo': {
    name: 'Leo',
    look: { shirt: '#d4743a', hair: '#2d2d3a', skin: '#e0ac69', gender: 'male', accessory: 'glasses' },
    doneLine: { text: "I'm so full... but there's always room for dessert!", es: 'Estoy tan lleno... ¡pero siempre hay espacio para el postre!' },
  },
  'a2-s5-garcia': {
    name: 'Mrs. Garcia',
    look: { shirt: '#d4537e', hair: '#2b1d14', skin: '#e0ac69', gender: 'female' },
    doneLine: { text: 'Would you like some more soup, dear?', es: '¿Quieres un poco más de sopa?' },
  },
  'a2-s5-interest': {
    name: '',
    look: { shirt: '#5d8fd4', hair: '#1f1f1f', skin: '#e0ac69' },
    interest: true,
    doneLine: { text: 'What a dinner! I want to remember this night forever.', es: '¡Qué cena! Quiero recordar esta noche para siempre.' },
  },
  'a2-s5-joe': {
    name: 'Grandpa Joe',
    look: { shirt: '#8b5a2b', hair: '#e8e8e8', skin: '#f1c27d', accessory: 'glasses' },
    doneLine: { text: 'How often do I eat dessert? Every day, ha ha!', es: '¿Con qué frecuencia como postre? ¡Todos los días, ja, ja!' },
  },
  'a2-receptionist': {
    name: 'The receptionist',
    look: { shirt: '#5d8fd4', hair: '#6b4a2e', skin: '#f1c27d', gender: 'female' },
    doneLine: { text: 'Take care, and have a nice day!', es: '¡Cuídate y que tengas un buen día!' },
  },
  // ── B1-03 · Words on a Screen (recuerdo 3, data/b1Words.ts): la médica (cara borrosa, sin nombre propio) y el cuaderno del escritorio ──
  'b1-03-doctor': {
    name: 'The doctor',
    look: { shirt: '#eef3f6', hair: '#4a3a2a', skin: '#d7a77a', gender: 'female' },
    doneLine: { text: "Use your phone to communicate. Text, message, reply. It's not the end of the world.", es: 'Usa tu teléfono para comunicarte. Escribe, manda mensajes, responde. No es el fin del mundo.' },
  },
  // Se dibuja como un cuaderno abierto (components/LNotebook.tsx, NotebookIcon)
  'b1-03-notebook': {
    name: 'Cuaderno de L',
    look: { shirt: '#efe6d2', hair: '#3a2f5c', skin: '#efe6d2' },
    doneLine: { text: '(Tomorrow, the messages begin.)', es: '(Mañana empiezan los mensajes.)' },
  },
  // B1-03 · bloque B: el teléfono del apartamento (Text Only) y el cuaderno de la página 2 (aparece al terminar Text Only)
  'b1-03-phone': {
    name: 'My phone',
    look: { shirt: '#2d2d3a', hair: '#2d2d3a', skin: '#e8eef3' },
    doneLine: { text: 'Three conversations, three different voices. And I never said a word.', es: 'Tres conversaciones, tres voces distintas. Y nunca dije una palabra.' },
  },
  'b1-03-notebook2': {
    name: 'Cuaderno de L',
    look: { shirt: '#efe6d2', hair: '#3a2f5c', skin: '#efe6d2' },
    after: 'b1-03-texts',
    doneLine: { text: '(The messages keep coming. Something is wrong with them.)', es: '(Los mensajes siguen llegando. Algo anda mal con ellos.)' },
  },
  // B1-03 · bloque C: el teléfono del cierre (aparece al vencer a The Static; after admite un enemigo vencido)
  'b1-03-close': {
    name: 'My phone',
    look: { shirt: '#2d2d3a', hair: '#2d2d3a', skin: '#e8eef3' },
    after: 'b1-03-static',
    doneLine: { text: '(Three dots appear on the screen. Then they disappear.)', es: '(Aparecen tres puntos en la pantalla. Luego desaparecen.)' },
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
