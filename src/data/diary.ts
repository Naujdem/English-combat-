/**
 * Diario del capítulo: la misma historia contada en pasado, presente y futuro,
 * y una cuarta versión que mezcla los tres tiempos.
 *
 * Formato de las líneas: los verbos van marcados para colorearlos según el tiempo:
 *   [took]p = pasado · [is]n = presente (now) · [am going to take]f = futuro
 * {name} = nombre del protagonista · {iname} = persona especial
 */

export type Tense = 'p' | 'n' | 'f'
export type DiaryLine = { en: string; es: string }
export type DiaryQuestion = { q: string; options: string[]; answer: number; tip: string }
export type DiaryVersion = {
  id: string
  tense: Tense | 'mix'
  tab: string
  /** Se abre cuando este id está en `opened` (pasado y futuro, al viajar en el tiempo) */
  unlock?: string
  title: string
  /** Quién lo escribe y cuándo */
  frame: string
  lines: DiaryLine[]
  questions: DiaryQuestion[]
}
export type WordGroup = { title: string; words: [string, string][] }
export type DiaryChapter = { id: string; title: string; unlock: string; versions: DiaryVersion[]; words: WordGroup[] }

export const TENSE_INFO: Record<Tense, { name: string; color: string }> = {
  p: { name: 'Pasado', color: '#e0a526' },
  n: { name: 'Presente', color: '#4cc27a' },
  f: { name: 'Futuro', color: '#7fb0ff' },
}

export const DIARY: DiaryChapter[] = [
  {
    id: 'school',
    title: 'Capítulo 1: La escuela',
    unlock: 'school-epilogue',
    // Todo el vocabulario del capítulo, para repasarlo y guardarlo en las fichas
    words: [
      { title: 'Información personal', words: [['name', 'nombre'], ['age', 'edad'], ['country', 'país'], ['nationality', 'nacionalidad'], ['address', 'dirección'], ['phone number', 'número de teléfono'], ['email', 'correo electrónico']] },
      { title: 'El aula', words: [['teacher', 'profesor'], ['student', 'estudiante'], ['classroom', 'salón de clase'], ['desk', 'pupitre'], ['chair', 'silla'], ['board', 'pizarra'], ['window', 'ventana'], ['door', 'puerta'], ['homework', 'tarea'], ['test', 'examen']] },
      { title: 'Útiles escolares', words: [['book', 'libro'], ['notebook', 'cuaderno'], ['pen', 'bolígrafo'], ['pencil', 'lápiz'], ['ruler', 'regla'], ['scissors', 'tijeras'], ['bag', 'mochila'], ['chalk', 'tiza']] },
      { title: 'Lugares de la escuela', words: [['bathroom', 'baño'], ['cafeteria', 'cafetería'], ['library', 'biblioteca'], ["teachers' room", 'sala de profesores'], ["secretary's office", 'secretaría'], ['playground', 'patio']] },
      { title: 'Materias y horario', words: [['Maths', 'matemáticas'], ['Science', 'ciencias'], ['English', 'inglés'], ['History', 'historia'], ['P.E.', 'educación física'], ['Art', 'arte'], ['Music', 'música'], ['lunch', 'almuerzo'], ['schedule', 'horario'], ["o'clock", 'en punto']] },
      { title: 'Días de la semana', words: [['Monday', 'lunes'], ['Tuesday', 'martes'], ['Wednesday', 'miércoles'], ['Thursday', 'jueves'], ['Friday', 'viernes']] },
      { title: 'Deportes', words: [['football', 'fútbol'], ['basketball', 'baloncesto'], ['tennis', 'tenis'], ['ball', 'pelota'], ['team', 'equipo'], ['player', 'jugador'], ['coach', 'entrenador'], ['whistle', 'silbato'], ['run', 'correr'], ['jump', 'saltar'], ['swim', 'nadar'], ['win', 'ganar']] },
      { title: '¿Dónde está?', words: [['in', 'dentro de'], ['on', 'sobre'], ['under', 'debajo de'], ['next to', 'al lado de'], ['between', 'entre'], ['in front of', 'delante de'], ['behind', 'detrás de']] },
      { title: 'Órdenes', words: [['open', 'abrir'], ['close', 'cerrar'], ['sit down', 'sentarse'], ['stand up', 'ponerse de pie'], ['listen', 'escuchar'], ['be quiet', 'hacer silencio'], ["don't run", 'no corras']] },
      { title: 'Saludos y despedidas', words: [['hello', 'hola'], ['good morning', 'buenos días'], ['good afternoon', 'buenas tardes'], ['good night', 'buenas noches'], ['goodbye', 'adiós'], ['see you tomorrow', 'nos vemos mañana'], ['nice to meet you', 'mucho gusto']] },
    ],
    versions: [
      {
        id: 'school-past',
        unlock: 'school-past-epilogue',
        tense: 'p',
        tab: 'Pasado',
        title: 'Dear diary',
        frame: 'Lo escribes esa misma noche, en tu casa. Un diario se escribe en pasado: cuenta lo que ya pasó.',
        lines: [
          { en: 'Dear diary, today [was]p my first day at Greenfield School.', es: 'Querido diario, hoy fue mi primer día en la escuela Greenfield.' },
          { en: 'In the morning, a man in a dark coat [took]p my voice.', es: 'En la mañana, un hombre con un abrigo oscuro se llevó mi voz.' },
          { en: "I [couldn't talk]p, but Leo [helped]p me. He [was]p my first friend.", es: 'No podía hablar, pero Leo me ayudó. Fue mi primer amigo.' },
          { en: 'Mrs. Lopez [gave]p me a uniform, and Ana [found]p my school things.', es: 'La señora López me dio un uniforme, y Ana encontró mis útiles.' },
          { en: 'I [read]p the class schedule on the board and I [got]p four pieces of chalk.', es: 'Leí el horario de clases en la pizarra y conseguí cuatro tizas.' },
          { en: 'I [fought]p Tom, Rick, Bella and Max. They [had]p the pieces of the key.', es: 'Peleé con Tom, Rick, Bella y Max. Ellos tenían los pedazos de la llave.' },
          { en: 'Coach Mike [gave]p me his whistle.', es: 'El entrenador Mike me dio su silbato.' },
          { en: 'Mr. Grimm [was]p very strange. He [had]p a piece of a broken clock.', es: 'El profesor Grimm estaba muy raro. Tenía una pieza de un reloj roto.' },
          { en: 'But I [won]p, and I [got]p my voice back!', es: '¡Pero gané y recuperé mi voz!' },
          { en: 'After school, I [introduced]p {iname} to Leo. Then we [said]p goodbye.', es: 'Después de clase, le presenté a {iname} a Leo. Luego nos despedimos.' },
        ],
        questions: [
          { q: 'Who took your voice?', options: ['Leo.', 'A man in a dark coat.', 'Mr. Grimm.'], answer: 1, tip: 'El diario dice: "a man in a dark coat took my voice".' },
          { q: 'Who was your first friend?', options: ['Leo.', 'Max.', 'Tom.'], answer: 0, tip: 'El diario dice: "He was my first friend", y habla de Leo.' },
          { q: 'What did Coach Mike give you?', options: ['A uniform.', 'A key.', 'His whistle.'], answer: 2, tip: 'El diario dice: "Coach Mike gave me his whistle".' },
          { q: 'Which sentence is in the past?', options: ['I win.', 'I won.', 'I am going to win.'], answer: 1, tip: '"Won" es el pasado de "win" (ganar). "I win" es presente y "I am going to win" es futuro.' },
        ],
      },
      {
        id: 'school-present',
        tense: 'n',
        tab: 'Presente',
        title: 'My story',
        frame: 'La misma historia contada en presente, como si estuviera pasando ahora. Así se cuentan los cómics y los resúmenes.',
        lines: [
          { en: 'My name [is]n {name}. I [am]n a new student at Greenfield School.', es: 'Me llamo {name}. Soy un estudiante nuevo en la escuela Greenfield.' },
          { en: 'A man in a dark coat [takes]n my voice. I [can\'t talk]n!', es: 'Un hombre con un abrigo oscuro se lleva mi voz. ¡No puedo hablar!' },
          { en: 'Leo [is]n my first friend. He [helps]n me.', es: 'Leo es mi primer amigo. Él me ayuda.' },
          { en: 'Mrs. Lopez [gives]n me a uniform, and Ana [finds]n my school things.', es: 'La señora López me da un uniforme, y Ana encuentra mis útiles.' },
          { en: 'I [read]n the class schedule on the board. Each class [gives]n me a piece of chalk.', es: 'Leo el horario en la pizarra. Cada clase me da una tiza.' },
          { en: 'Tom, Rick, Bella and Max [have]n the pieces of the key. I [fight]n them.', es: 'Tom, Rick, Bella y Max tienen los pedazos de la llave. Peleo con ellos.' },
          { en: 'Coach Mike [gives]n me his whistle.', es: 'El entrenador Mike me da su silbato.' },
          { en: 'Mr. Grimm [is]n very strange. He [has]n a piece of a broken clock.', es: 'El profesor Grimm está muy raro. Tiene una pieza de un reloj roto.' },
          { en: 'But I [win]n, and I [get]n my voice back!', es: '¡Pero gano y recupero mi voz!' },
          { en: 'After school, I [introduce]n {iname} to Leo. Then we [say]n goodbye.', es: 'Después de clase, le presento a {iname} a Leo. Luego nos despedimos.' },
        ],
        questions: [
          { q: 'Where is {name} a new student?', options: ['At Greenfield School.', 'In the city.', 'At the farm.'], answer: 0, tip: 'El texto dice: "I am a new student at Greenfield School".' },
          { q: 'Who has the pieces of the key?', options: ['Leo and Ana.', 'Mrs. Lopez.', 'Tom, Rick, Bella and Max.'], answer: 2, tip: 'El texto dice: "Tom, Rick, Bella and Max have the pieces of the key".' },
          { q: 'What does Ana find?', options: ['My school things.', 'My voice.', 'The whistle.'], answer: 0, tip: 'El texto dice: "Ana finds my school things".' },
          { q: 'Who is your first friend?', options: ['Tom.', 'Leo.', 'Mr. Grimm.'], answer: 1, tip: 'El texto dice: "Leo is my first friend."' },
        ],
      },
      {
        id: 'school-future',
        unlock: 'era-future-a1',
        tense: 'f',
        tab: 'Futuro',
        title: 'The stranger\'s plan',
        frame: 'Una hoja que se le cayó al desconocido. La escribió la noche anterior: es su plan, por eso está en futuro.',
        lines: [
          { en: 'Tomorrow a new student [is going to arrive]f at Greenfield School.', es: 'Mañana un estudiante nuevo va a llegar a la escuela Greenfield.' },
          { en: 'I [am going to take]f the student\'s voice. Ha ha!', es: 'Voy a llevarme la voz del estudiante. ¡Ja, ja!' },
          { en: 'My machine [is going to keep]f the words inside my clock.', es: 'Mi máquina va a guardar las palabras dentro de mi reloj.' },
          { en: 'Then I [am going to travel]f back to my time.', es: 'Luego voy a viajar de vuelta a mi tiempo.' },
          { en: 'The student [is not going to talk]f again. Nobody [is going to help]f.', es: 'El estudiante no va a volver a hablar. Nadie va a ayudar.' },
          { en: 'And nobody [is going to find]f me!', es: '¡Y nadie me va a encontrar!' },
          { en: 'This time, I [am going to win]f.', es: 'Esta vez, voy a ganar yo.' },
        ],
        questions: [
          { q: 'What is the stranger going to take?', options: ['The clock.', "The student's voice.", "Mr. Grimm's desk."], answer: 1, tip: 'El plan dice: "I am going to take the student\'s voice".' },
          { q: 'Where is the machine going to keep the words?', options: ['Inside the clock.', 'In the school.', 'In a bag.'], answer: 0, tip: 'El plan dice: "My machine is going to keep the words inside my clock".' },
          { q: 'Where is the stranger going to travel?', options: ['To the city.', 'Back to his time.', 'To the school.'], answer: 1, tip: 'El plan dice: "Then I am going to travel back to my time".' },
          { q: 'Did the plan work?', options: ['Yes, it did. He went back to his time.', "No, it didn't. The clock broke and the student had friends.", 'Yes, it did. Nobody helped.'], answer: 1, tip: 'El plan falló: el reloj explotó en pedazos, y Leo, Ana y los demás te ayudaron.' },
        ],
      },
      {
        id: 'school-mix',
        unlock: 'era-future-a1',
        tense: 'mix',
        tab: 'Mezcla',
        title: 'One week later',
        frame: 'Lo escribes una semana después. Mezclas lo que pasó (pasado), cómo estás ahora (presente) y lo que vas a hacer (futuro). Activa "Ver verbos" para ver cada tiempo con su color.',
        lines: [
          { en: 'Last week I [lost]p my voice at Greenfield School. It [was]p a terrible day.', es: 'La semana pasada perdí mi voz en la escuela Greenfield. Fue un día terrible.' },
          { en: 'Mr. Grimm [had]p a piece of a strange clock, and his students [had]p the pieces of the key.', es: 'El profesor Grimm tenía una pieza de un reloj extraño, y sus estudiantes tenían los pedazos de la llave.' },
          { en: 'Now I [can talk]n again. Mr. Grimm [is]n my teacher and he [is]n very kind.', es: 'Ahora puedo hablar otra vez. El profesor Grimm es mi profesor y es muy amable.' },
          { en: 'Leo and {iname} [are]n my best friends. We [eat]n lunch together every day.', es: 'Leo y {iname} son mis mejores amigos. Almorzamos juntos todos los días.' },
          { en: 'I [have]n a piece of a strange clock. The clock [has]n five pieces.', es: 'Tengo una pieza de un reloj extraño. El reloj tiene cinco piezas.' },
          { en: 'Tomorrow we [are going to take]f the bus to the city.', es: 'Mañana vamos a tomar el autobús a la ciudad.' },
          { en: 'The stranger [is going to be]f there, but I [am not]n afraid.', es: 'El desconocido va a estar allá, pero no tengo miedo.' },
          { en: 'I [am going to find]f my words and the other pieces of the clock!', es: '¡Voy a encontrar mis palabras y las otras piezas del reloj!' },
        ],
        questions: [
          { q: 'When did you lose your voice?', options: ['Tomorrow.', 'Last week.', 'Every day.'], answer: 1, tip: 'El texto dice: "Last week I lost my voice". "Last week" es la semana pasada.' },
          { q: 'What are you going to do tomorrow?', options: ['Take the bus to the city.', 'Fight Mr. Grimm.', 'Lose my voice.'], answer: 0, tip: 'El texto dice: "Tomorrow we are going to take the bus to the city".' },
          { q: 'How many pieces does the clock have?', options: ['One.', 'Four.', 'Five.'], answer: 2, tip: 'El texto dice: "The clock has five pieces".' },
          { q: 'Which sentence is about the future?', options: ['It was a terrible day.', 'We eat lunch together.', 'We are going to take the bus.'], answer: 2, tip: '"Are going to + verbo" habla del futuro. "Was" es pasado y "eat" es presente.' },
        ],
      },
    ],
  },
  {
    id: 'city',
    title: 'Capítulo 2: La ciudad',
    unlock: 'city-epilogue',
    words: [
      { title: 'Lugares de la ciudad', words: [['street', 'calle'], ['bank', 'banco'], ['park', 'parque'], ['café', 'café'], ['supermarket', 'supermercado'], ['hospital', 'hospital'], ['bus stop', 'parada de autobús'], ['tourist office', 'oficina de turismo'], ['fountain', 'fuente'], ['crosswalk', 'cebra']] },
      { title: 'Direcciones', words: [['go straight', 'sigue derecho'], ['turn left', 'gira a la izquierda'], ['turn right', 'gira a la derecha'], ['on your left', 'a tu izquierda'], ['on your right', 'a tu derecha'], ['near', 'cerca'], ['far from', 'lejos de'], ['cross the street', 'cruza la calle']] },
      { title: 'There is / there are', words: [['there is', 'hay (una cosa)'], ['there are', 'hay (varias)'], ['is there...?', '¿hay...? (una)'], ['are there...?', '¿hay...? (varias)']] },
      { title: 'En el café', words: [['coffee', 'café'], ['juice', 'jugo'], ['water', 'agua'], ['milk', 'leche'], ['cake', 'pastel'], ['sandwich', 'sándwich'], ['apple', 'manzana'], ['menu', 'menú'], ['Can I have..., please?', '¿Me da..., por favor?'], ['Here you are.', 'Aquí tiene.'], ['How much is it?', '¿Cuánto cuesta?']] },
      { title: 'En la tienda', words: [['T-shirt', 'camiseta'], ['jacket', 'chaqueta'], ['shoes', 'zapatos'], ['dress', 'vestido'], ['jeans', 'jeans'], ['this / these', 'este / estos'], ['that / those', 'ese / esos'], ['cheap', 'barato'], ['expensive', 'caro']] },
      { title: 'Números y precios', words: [['thirteen', 'trece'], ['fifteen', 'quince'], ['twenty', 'veinte'], ['thirty', 'treinta'], ['forty', 'cuarenta'], ['fifty', 'cincuenta'], ['dollars', 'dólares']] },
      { title: 'Transporte y cortesía', words: [['bus', 'autobús'], ['ticket', 'boleto'], ['driver', 'conductor'], ['excuse me', 'disculpe'], ['sorry', 'perdón'], ["that's OK", 'no pasa nada'], ['thank you', 'gracias'], ['you too', 'igualmente']] },
    ],
    versions: [
      {
        id: 'city-past',
        unlock: 'city-past-epilogue',
        tense: 'p',
        tab: 'Pasado',
        title: 'Dear diary (1996)',
        frame: 'Lo escribes esa noche, después de volver de 1996. En pasado, casi todos los verbos terminan en -ed.',
        lines: [
          { en: 'Dear diary, today Leo, {iname} and I [walked]p to the old city on a dirt road.', es: 'Querido diario, hoy Leo, {iname} y yo caminamos a la ciudad vieja por una carretera destapada.' },
          { en: 'There [were]p market stalls, a well and an old phone box. There [was]p no fountain!', es: 'Había puestos de mercado, un pozo y una cabina de teléfono vieja. ¡No había fuente!' },
          { en: 'Mr. Lopez [needed]p help with his sacks. I [listened]p and I [sorted]p the sounds: /t/, /d/ and /ɪd/.', es: 'El señor López necesitaba ayuda con sus sacos. Escuché y ordené los sonidos: /t/, /d/ y /ɪd/.' },
          { en: 'Tony [delivered]p bread on his bike. He [talked]p like a broken radio, but I [helped]p him.', es: 'Tony repartía pan en su bicicleta. Hablaba como una radio dañada, pero lo ayudé.' },
          { en: 'Betty, the mail carrier, [spelled]p words wrong: "studyed", "stoped"... We [fixed]p them.', es: 'Betty, la cartera, escribía mal las palabras: "studyed", "stoped"... Las arreglamos.' },
          { en: 'Mrs. Rossi [shouted]p at everybody. She [had]p a fragment of my voice.', es: 'La señora Rossi les gritaba a todos. Tenía un fragmento de mi voz.' },
          { en: 'In the end she [smiled]p and she [thanked]p us.', es: 'Al final sonrió y nos dio las gracias.' },
          { en: 'Tony is Mr. Rossi, the guide! He [wanted]p to show the city to tourists.', es: '¡Tony es el señor Rossi, el guía! Quería mostrarles la ciudad a los turistas.' },
          { en: 'The stranger [stopped]p at the phone box. He [wanted]p to call someone, but he [was]p silent.', es: 'El desconocido se detuvo en la cabina de teléfono. Quería llamar a alguien, pero se quedó callado.' },
        ],
        questions: [
          { q: 'Who delivered bread?', options: ['Betty.', 'Tony.', 'Mrs. Rossi.'], answer: 1, tip: 'El diario dice: "Tony delivered bread on his bike".' },
          { q: 'Where did the stranger stop?', options: ['At the well.', 'At the phone box.', 'At the market.'], answer: 1, tip: 'El diario dice: "The stranger stopped at the phone box".' },
          { q: 'Which verb ends with the sound /ɪd/?', options: ['walked', 'played', 'wanted'], answer: 2, tip: 'want termina en t: want-ed suena /ɪd/.' },
          { q: 'Which sentence is in the past?', options: ['We help Tony.', 'We helped Tony.', 'We are going to help Tony.'], answer: 1, tip: '"Helped" es el pasado de "help". Las otras están en presente y en futuro.' },
        ],
      },
      {
        id: 'city-present',
        tense: 'n',
        tab: 'Presente',
        title: 'My story: the city',
        frame: 'Lo que pasó en la ciudad, contado en presente.',
        lines: [
          { en: 'Leo and I [take]n the bus to the city.', es: 'Leo y yo tomamos el autobús a la ciudad.' },
          { en: 'The city [is]n big. There [is]n a café, a clothes shop and a fountain.', es: 'La ciudad es grande. Hay un café, una tienda de ropa y una fuente.' },
          { en: 'Officer Rosa [gives]n me a map. Now I [know]n the streets.', es: 'La oficial Rosa me da un mapa. Ahora conozco las calles.' },
          { en: 'In the café, I [order]n a juice and a cake. Lily [writes]n my name on the cup.', es: 'En el café pido un jugo y un pastel. Lily escribe mi nombre en el vaso.' },
          { en: 'Danny, Chloe and Victor [have]n the pieces of a key.', es: 'Danny, Chloe y Víctor tienen los pedazos de una llave.' },
          { en: 'Mr. Rossi [is]n the guide. He [has]n a piece of the clock, and he [sends]n tourists to the wrong place!', es: 'El señor Rossi es el guía. Tiene una pieza del reloj, ¡y manda a los turistas al lugar equivocado!' },
          { en: 'I [take]n him a black coffee, and I [win]n.', es: 'Le llevo un café negro, y gano.' },
          { en: 'Now I [have]n two pieces of the clock.', es: 'Ahora tengo dos piezas del reloj.' },
          { en: 'Tomorrow we [go]n to Green Street. Leo [lives]n there!', es: 'Mañana vamos a Green Street. ¡Leo vive allá!' },
        ],
        questions: [
          { q: 'How do you go to the city?', options: ['By bus.', 'By car.', 'By bike.'], answer: 0, tip: 'El texto dice: "Leo and I take the bus to the city".' },
          { q: 'What does Officer Rosa give you?', options: ['A coffee.', 'A map.', 'A key.'], answer: 1, tip: 'El texto dice: "Officer Rosa gives me a map".' },
          { q: 'What do you order in the café?', options: ['An apple and water.', 'A pizza.', 'A juice and a cake.'], answer: 2, tip: 'El texto dice: "I order a juice and a cake".' },
          { q: 'How many pieces of the clock do you have now?', options: ['One.', 'Two.', 'Five.'], answer: 1, tip: 'El texto dice: "Now I have two pieces of the clock".' },
        ],
      },
    ],
  },
  {
    id: 'barrio',
    title: 'Capítulo 3: Green Street',
    unlock: 'barrio-epilogue',
    words: [
      { title: 'Familia', words: [['mother / mom', 'madre / mamá'], ['father / dad', 'padre / papá'], ['brother', 'hermano'], ['sister', 'hermana'], ['grandpa', 'abuelo'], ['grandma', 'abuela'], ['parents', 'padres'], ['family', 'familia'], ['neighbor', 'vecino']] },
      { title: 'Rutinas', words: [['get up', 'levantarse'], ['have breakfast', 'desayunar'], ['go to work', 'ir al trabajo'], ['go to school', 'ir a la escuela'], ['have dinner', 'cenar'], ['watch TV', 'ver televisión'], ['go to bed', 'acostarse'], ['every day', 'todos los días']] },
      { title: 'Frecuencia', words: [['always', 'siempre'], ['usually', 'normalmente'], ['sometimes', 'a veces'], ['never', 'nunca']] },
      { title: 'Gustos y pasatiempos', words: [['like', 'gustar'], ['love', 'encantar'], ['hate', 'odiar'], ['reading', 'leer'], ['cooking', 'cocinar'], ['dancing', 'bailar'], ['swimming', 'nadar'], ['listening to music', 'escuchar música'], ['playing the guitar', 'tocar la guitarra'], ['gardening', 'la jardinería']] },
      { title: 'Habilidades y ahora mismo', words: [['can', 'poder, saber'], ["can't", 'no poder'], ['ride a bike', 'montar en bicicleta'], ['run', 'correr'], ['fly', 'volar'], ['It is raining.', 'Está lloviendo.'], ['The sun is shining.', 'Brilla el sol.'], ['What are you doing?', '¿Qué estás haciendo?']] },
      { title: 'Casa', words: [['house', 'casa'], ['living room', 'sala'], ['kitchen', 'cocina'], ['bedroom', 'cuarto'], ['garden', 'jardín'], ['sofa', 'sofá'], ['fridge', 'nevera'], ['photo', 'foto'], ['have got', 'tener']] },
      { title: 'Cumpleaños y fechas', words: [['birthday', 'cumpleaños'], ['Happy birthday!', '¡Feliz cumpleaños!'], ['party', 'fiesta'], ['gift', 'regalo'], ['invitation', 'invitación'], ['May', 'mayo'], ['July', 'julio'], ['December', 'diciembre'], ['first, second, third', 'primero, segundo, tercero'], ['fifth', 'quinto']] },
    ],
    versions: [
      {
        id: 'barrio-past',
        unlock: 'barrio-past-epilogue',
        tense: 'p',
        tab: 'Pasado',
        title: 'Dear diary (1996)',
        frame: 'Lo escribes esa noche. Los verbos irregulares (en pasado) no terminan en -ed: went, saw, built...',
        lines: [
          { en: 'Dear diary, today we [went]p to Green Street in 1996. There [was]p only one house!', es: 'Querido diario, hoy fuimos a Green Street en 1996. ¡Solo había una casa!' },
          { en: 'Joe [had]p a big verb book. I [read]p all the pages and I [learned]p twenty-five verbs.', es: 'Joe tenía un libro de verbos grande. Leí todas las páginas y aprendí veinticinco verbos.' },
          { en: 'Sam, the builder, [said]p "I goed" and "I buyed". I [helped]p him with his words.', es: 'Sam, el albañil, decía "I goed" y "I buyed". Lo ayudé con sus palabras.' },
          { en: 'Carmen, the painter, [came]p from the city. She [wrote]p a letter to her mom.', es: 'Carmen, la pintora, vino de la ciudad. Le escribió una carta a su mamá.' },
          { en: 'Mr. Hill [was]p the boss. He [took]p a fragment of my voice, and he [became]p very angry.', es: 'El señor Hill era el jefe. Tomó un fragmento de mi voz y se volvió muy enojón.' },
          { en: 'I [won]p, and he [gave]p me an old helmet.', es: 'Gané, y me dio un casco viejo.' },
          { en: 'Then we [found]p out the truth: Joe is Leo\'s grandpa, and Carmen is Leo\'s mom!', es: 'Luego descubrimos la verdad: ¡Joe es el abuelo de Leo, y Carmen es la mamá de Leo!' },
          { en: 'Joe [built]p the house with his hands. Carmen [met]p Daniel, Leo\'s dad, on Green Street.', es: 'Joe construyó la casa con sus manos. Carmen conoció a Daniel, el papá de Leo, en Green Street.' },
          { en: 'The stranger [saw]p the house too. He [touched]p the walls and he [cried]p.', es: 'El desconocido también vio la casa. Tocó las paredes y lloró.' },
        ],
        questions: [
          { q: 'Who built the house?', options: ['Mr. Hill.', 'Joe.', 'Sam.'], answer: 1, tip: 'El diario dice: "Joe built the house with his hands".' },
          { q: 'Where did Carmen come from?', options: ['From the farm.', 'From the school.', 'From the city.'], answer: 2, tip: 'El diario dice: "Carmen came from the city".' },
          { q: 'What is the past of "go"?', options: ['goed', 'went', 'gone'], answer: 1, tip: 'go es irregular: went.' },
          { q: 'Which verb is irregular?', options: ['helped', 'touched', 'gave'], answer: 2, tip: 'gave (de give) no termina en -ed: es irregular.' },
        ],
      },
      {
        id: 'barrio-present',
        tense: 'n',
        tab: 'Presente',
        title: 'My story: Green Street',
        frame: 'Lo que pasó en Green Street, contado en presente.',
        lines: [
          { en: 'Leo [lives]n on Green Street. I [live]n there too, on Park Street!', es: 'Leo vive en Green Street. ¡Yo también vivo allá, en Park Street!' },
          { en: "Leo's mom [gets]n up at six. His dad [works]n in a hospital, and his sister Emma [plays]n the guitar.", es: 'La mamá de Leo se levanta a las seis. Su papá trabaja en un hospital, y su hermana Emma toca la guitarra.' },
          { en: "Maya's dad [loves]n cooking. Maya [loves]n reading, but she [hates]n getting up early.", es: 'Al papá de Maya le encanta cocinar. A Maya le encanta leer, pero odia levantarse temprano.' },
          { en: 'Today [is]n Leo\'s birthday. There [is]n a party in the park.', es: 'Hoy es el cumpleaños de Leo. Hay una fiesta en el parque.' },
          { en: 'My brother Nick [has]n a piece of the clock. He [says]n everything without -s!', es: 'Mi hermano Nick tiene una pieza del reloj. ¡Dice todo sin -s!' },
          { en: 'Grandpa Joe [gives]n me a photo of my family, and Nick [remembers]n me.', es: 'El abuelo Joe me da una foto de mi familia, y Nick me recuerda.' },
          { en: 'At home, Mom [looks]n at the photo. I [have]n got one brother, Nick, and Dad always [cooks]n dinner.', es: 'En casa, mamá mira la foto. Tengo un hermano, Nick, y papá siempre cocina la cena.' },
          { en: 'I always [get]n up at seven. Nick usually [gets]n up at nine!', es: 'Siempre me levanto a las siete. ¡Nick normalmente se levanta a las nueve!' },
          { en: 'A gift from "L" [says]n: "Use your voice." Leo [doesn\'t]n understand.', es: 'Un regalo de "L" dice: "Usa tu voz". Leo no entiende.' },
          { en: 'Now I [have]n three pieces of the clock. Tomorrow we [go]n to the farm.', es: 'Ahora tengo tres piezas del reloj. Mañana vamos a la granja.' },
        ],
        questions: [
          { q: "Where does Leo's dad work?", options: ['In a bank.', 'In a hospital.', 'On a farm.'], answer: 1, tip: 'El texto dice: "His dad works in a hospital".' },
          { q: 'What does Maya love?', options: ['Reading.', 'Getting up early.', 'Cooking.'], answer: 0, tip: 'El texto dice: "Maya loves reading".' },
          { q: 'Where is the party?', options: ['In my house.', 'At school.', 'In the park.'], answer: 2, tip: 'El texto dice: "There is a party in the park".' },
          { q: 'What time does Nick usually get up?', options: ['At seven.', 'At eight.', 'At nine.'], answer: 2, tip: 'El texto dice: "Nick usually gets up at nine".' },
          { q: 'What does the gift from "L" say?', options: ['Happy new year.', 'Use your voice.', 'Go to the farm.'], answer: 1, tip: 'El texto dice: "Use your voice".' },
        ],
      },
    ],
  },
  {
    id: 'farm',
    title: 'Capítulo 4: La granja',
    unlock: 'farm-epilogue',
    words: [
      { title: 'Animales de la granja', words: [['cow', 'vaca'], ['horse', 'caballo'], ['sheep', 'oveja'], ['pig', 'cerdo'], ['chicken', 'gallina'], ['duck', 'pato'], ['goose', 'ganso'], ['rabbit', 'conejo'], ['mouse', 'ratón'], ['dog', 'perro'], ['cat', 'gato']] },
      { title: 'Plurales raros', words: [['sheep → sheep', 'oveja → ovejas'], ['goose → geese', 'ganso → gansos'], ['mouse → mice', 'ratón → ratones'], ['child → children', 'niño → niños'], ['man → men', 'hombre → hombres'], ['woman → women', 'mujer → mujeres'], ['foot → feet', 'pie → pies'], ['tooth → teeth', 'diente → dientes']] },
      { title: 'En la granja', words: [['farm', 'granja'], ['farmer', 'granjero'], ['barn', 'granero'], ['pen', 'corral'], ['field', 'campo'], ['pond', 'estanque'], ['fence', 'cerca'], ['hay', 'heno'], ['milk', 'leche'], ['eggs', 'huevos'], ['wool', 'lana'], ['wings', 'alas'], ['grass', 'pasto'], ['vet', 'veterinario']] },
      { title: 'Preguntas y respuestas', words: [['Do you...?', '¿Tú...?'], ['Does it...?', '¿Eso / él / ella...?'], ['Yes, it does.', 'Sí.'], ["No, it doesn't.", 'No.'], ['Yes, they do.', 'Sí (ellos).'], ["No, they don't.", 'No (ellos).'], ["don't / doesn't", 'no (antes del verbo)']] },
    ],
    versions: [
      {
        id: 'farm-present',
        tense: 'n',
        tab: 'Presente',
        title: 'My story: the farm',
        frame: 'Lo que pasó en la granja, contado en presente.',
        lines: [
          { en: 'We [go]n to the farm by bike. A man [says]n: "The animals talk!"', es: 'Vamos a la granja en bicicleta. Un señor dice: "¡Los animales hablan!".' },
          { en: 'Rosie [plays]n a game with me. I [ask]n: "Does it have wings?" and she [answers]n: "No, it doesn\'t."', es: 'Rosie juega un juego conmigo. Yo pregunto: "¿Tiene alas?" y ella responde: "No".' },
          { en: 'Daisy the cow [doesn\'t]n eat pizza. She [eats]n grass!', es: 'Daisy la vaca no come pizza. ¡Come pasto!' },
          { en: 'There [are]n five sheep and three geese. And there [are]n a lot of mice in the barn!', es: 'Hay cinco ovejas y tres gansos. ¡Y hay muchos ratones en el granero!' },
          { en: 'Mr. Brown [has]n a piece of the clock. He [doesn\'t]n remember the morning.', es: 'El señor Brown tiene una pieza del reloj. No recuerda la mañana.' },
          { en: 'The stranger [says]n: "One day you are going to be silent." I [don\'t]n understand.', es: 'El desconocido dice: "Un día te vas a quedar callado". No entiendo.' },
          { en: 'Now I [have]n four pieces of the clock. The last piece [is]n in an office.', es: 'Ahora tengo cuatro piezas del reloj. La última pieza está en una oficina.' },
        ],
        questions: [
          { q: 'How do you go to the farm?', options: ['By bus.', 'By bike.', 'By car.'], answer: 1, tip: 'El texto dice: "We go to the farm by bike".' },
          { q: 'Does Daisy eat pizza?', options: ["No, she doesn't.", 'Yes, she does.', 'Yes, she eats.'], answer: 0, tip: 'El texto dice: "Daisy the cow doesn\'t eat pizza".' },
          { q: 'What is in the barn?', options: ['A lot of geese.', 'A lot of mice.', 'Five sheep.'], answer: 1, tip: 'El texto dice: "a lot of mice in the barn".' },
          { q: 'Where is the last piece?', options: ['In an office.', 'On the farm.', 'In the park.'], answer: 0, tip: 'El texto dice: "The last piece is in an office".' },
        ],
      },
    ],
  },
  {
    id: 'office',
    title: 'Capítulo 5: La oficina',
    unlock: 'office-epilogue',
    words: [
      { title: 'La hora', words: [["o'clock", 'en punto'], ['half past', 'y media'], ['quarter past', 'y cuarto'], ['quarter to', 'menos cuarto'], ['ten past', 'y diez'], ['ten to', 'menos diez'], ['What time is it?', '¿Qué hora es?']] },
      { title: 'at / on / in', words: [['at nine', 'a las nueve'], ['at night', 'en la noche'], ['on Monday', 'el lunes'], ['in May', 'en mayo'], ['in summer', 'en verano'], ['in the morning', 'en la mañana'], ['in the afternoon', 'en la tarde'], ['in the evening', 'en la noche (temprano)']] },
      { title: 'Días y estaciones', words: [['Monday', 'lunes'], ['Tuesday', 'martes'], ['Wednesday', 'miércoles'], ['Thursday', 'jueves'], ['Friday', 'viernes'], ['spring', 'primavera'], ['summer', 'verano'], ['autumn', 'otoño'], ['winter', 'invierno']] },
      { title: 'Pronombres de objeto', words: [['me', 'me, a mí'], ['you', 'te, a ti'], ['him', 'lo, a él'], ['her', 'la, a ella'], ['it', 'lo (cosa)'], ['us', 'nos'], ['them', 'los, a ellos']] },
      { title: 'En la oficina', words: [['meeting', 'reunión'], ['appointment', 'cita'], ['agenda', 'agenda'], ['email', 'correo'], ['message', 'mensaje'], ['phone', 'teléfono'], ['Could you...?', '¿Podrías...?'], ['Sure! / Of course!', '¡Claro!'], ["Sorry, I can't.", 'Lo siento, no puedo.']] },
      { title: 'Profesiones', words: [['receptionist', 'recepcionista'], ['secretary', 'secretaria'], ['manager', 'gerente'], ['director', 'directora'], ['designer', 'diseñadora'], ['cleaner', 'conserje'], ['doctor', 'médico'], ['farmer', 'granjero'], ['teacher', 'profesor']] },
    ],
    versions: [
      {
        id: 'office-present',
        tense: 'n',
        tab: 'Presente',
        title: 'My story: the office',
        frame: 'Lo que pasó en la oficina, contado en presente.',
        lines: [
          { en: 'We [take]n the bus at quarter to nine, and we [arrive]n at half past nine.', es: 'Tomamos el autobús a las nueve menos cuarto y llegamos a las nueve y media.' },
          { en: 'In the office, every clock [is]n crazy. Gary [says]n: "It\'s eight and half!"', es: 'En la oficina, todos los relojes están locos. Gary dice: "¡Son las ocho y media!" (mal dicho).' },
          { en: 'Sara [has]n a lot of emails. I [put]n the meetings in the agenda: on Monday at nine, on Friday in the morning...', es: 'Sara tiene muchos correos. Pongo las reuniones en la agenda: el lunes a las nueve, el viernes en la mañana...' },
          { en: 'The phone [rings]n. Mr. Rossi [wants]n to speak to Ms. Clark, but she [isn\'t]n there. I [write]n a message for her.', es: 'Suena el teléfono. El señor Rossi quiere hablar con la señora Clark, pero no está. Le escribo un mensaje.' },
          { en: 'Ms. Clark [has]n the last piece. She [is]n very angry, but I [ask]n: "Could you help me, please?"', es: 'La señora Clark tiene la última pieza. Está muy enojada, pero le pregunto: "¿Podrías ayudarme, por favor?"' },
          { en: 'Now the clock [is]n complete. It [shows]n the old school and a city of the future.', es: 'Ahora el reloj está completo. Muestra la escuela vieja y una ciudad del futuro.' },
          { en: 'Leo [says]n: "I always help you." We [touch]n the clock together...', es: 'Leo dice: "Siempre te ayudo". Tocamos el reloj juntos...' },
        ],
        questions: [
          { q: 'What time do you arrive at the office?', options: ['At quarter to nine.', 'At half past nine.', 'At nine o\'clock.'], answer: 1, tip: 'El texto dice: "we arrive at half past nine".' },
          { q: 'Who wants to speak to Ms. Clark?', options: ['Mr. Rossi.', 'Mr. Stone.', 'Gary.'], answer: 0, tip: 'El texto dice: "Mr. Rossi wants to speak to Ms. Clark".' },
          { q: 'What does the clock show?', options: ['The farm and the park.', 'The old school and a city of the future.', 'Ms. Clark and her phone.'], answer: 1, tip: 'El texto dice: "It shows the old school and a city of the future".' },
          { q: 'What does Leo say?', options: ['"I always help you."', '"I never help you."', '"Could you help me?"'], answer: 0, tip: 'El texto dice: "I always help you".' },
        ],
      },
    ],
  },
]

/** Diccionario de las palabras de los diarios (inglés → español) */
export const DICT: Record<string, string> = {
  a: 'un, una', about: 'sobre', afraid: 'con miedo', after: 'después de', again: 'otra vez', alone: 'solo', am: 'soy, estoy (to be)', an: 'un, una',
  and: 'y', are: 'son, están (to be)', arrive: 'llegar', at: 'en', back: 'de vuelta', be: 'ser, estar', bella: 'Bella (nombre)', best: 'mejor, mejores',
  board: 'pizarra', bus: 'autobús', but: 'pero', can: 'puede, puedo', "can't": 'no puede, no puedo', chalk: 'tiza', city: 'ciudad', class: 'clase',
  clock: 'reloj', coach: 'entrenador', coat: 'abrigo', controlled: 'controló (control)', controls: 'controla (control)', "couldn't": 'no podía (can)', dark: 'oscuro',
  day: 'día', dear: 'querido', diary: 'diario', each: 'cada', eat: 'comer', every: 'cada, todos los', fight: 'pelear', find: 'encontrar', finds: 'encuentra (find)',
  first: 'primero, primer', found: 'encontró (find)', four: 'cuatro', fought: 'peleé (fight)', five: 'cinco', friend: 'amigo', friends: 'amigos', get: 'conseguir, recuperar',
  give: 'dar', gives: 'da (give)', gave: 'dio (give)', goodbye: 'adiós', going: 'yendo (be going to = ir a)', got: 'consiguió, recuperó (get)', greenfield: 'Greenfield (nombre)',
  grimm: 'Grimm (nombre)', had: 'tenía, tenían (have)', has: 'tiene (have)', have: 'tener', he: 'él', help: 'ayudar', helped: 'ayudó (help)', helps: 'ayuda (help)', him: 'a él, lo',
  his: 'su (de él)', i: 'yo', in: 'en', introduce: 'presentar', introduced: 'presenté (introduce)', is: 'es, está (to be)', it: 'eso, lo', its: 'su (de una cosa)', key: 'llave',
  kind: 'amable', last: 'pasado, último', leo: 'Leo (nombre)', lopez: 'López (nombre)', lost: 'perdí (lose)', lunch: 'almuerzo', man: 'hombre', max: 'Max (nombre)', me: 'me, a mí',
  mike: 'Mike (nombre)', morning: 'mañana (parte del día)', mr: 'señor', mrs: 'señora', my: 'mi', name: 'nombre', new: 'nuevo', night: 'noche', nobody: 'nadie', not: 'no',
  now: 'ahora', obey: 'obedecer', of: 'de', on: 'en, sobre', one: 'uno', or: 'o', other: 'otro, otros', piece: 'pieza, pedazo', pieces: 'piezas, pedazos', read: 'leer / leí (se escribe igual)',
  rick: 'Rick (nombre)', said: 'dijimos (say)', say: 'decir', schedule: 'horario', school: 'escuela', spell: 'hechizo', strange: 'extraño, raro', stranger: 'desconocido',
  student: 'estudiante', "student's": 'del estudiante', students: 'estudiantes', take: 'tomar, llevarse', takes: 'se lleva (take)', talk: 'hablar', terrible: 'terrible',
  the: 'el, la, los, las', then: 'luego', there: 'allá', they: 'ellos', things: 'cosas', to: 'a, para', today: 'hoy', together: 'juntos', tom: 'Tom (nombre)', tomorrow: 'mañana (el día siguiente)',
  took: 'se llevó (take)', travel: 'viajar', under: 'bajo, debajo de', uniform: 'uniforme', very: 'muy', voice: 'voz', was: 'era, fue, estaba (to be)', we: 'nosotros',
  week: 'semana', whistle: 'silbato', win: 'ganar', won: 'gané (win)', words: 'palabras', ha: 'ja (risa)', order: 'pedir', writes: 'escribe (write)', sends: 'manda (send)', lives: 'vive (live)', know: 'conocer, saber', streets: 'calles', tourists: 'turistas', guide: 'guía', wrong: 'equivocado', place: 'lugar', cup: 'vaso', cake: 'pastel', juice: 'jugo', map: 'mapa', officer: 'oficial', big: 'grande', fountain: 'fuente', shop: 'tienda', clothes: 'ropa', café: 'café', green: 'verde', street: 'calle', coffee: 'café (bebida)', go: 'ir', broken: 'roto', machine: 'máquina', inside: 'dentro de', time: 'tiempo, época', this: 'este, esta', teacher: 'profesor', them: 'a ellos, los', keep: 'guardar', later: 'después',
  live: 'vivir, vivo', too: 'también', gets: 'se levanta (get up)', up: 'arriba (get up = levantarse)', six: 'seis', works: 'trabaja (work)', hospital: 'hospital',
  sister: 'hermana', emma: 'Emma (nombre)', plays: 'toca, juega (play)', guitar: 'guitarra', loves: 'le encanta (love)', cooking: 'cocinar', reading: 'leer', hates: 'odia (hate)', getting: 'levantarse (get up)',
  early: 'temprano', birthday: 'cumpleaños', party: 'fiesta', park: 'parque', brother: 'hermano', nick: 'Nick (nombre)', says: 'dice (say)', everything: 'todo', without: 'sin',
  grandpa: 'abuelo', joe: 'Joe (nombre)', photo: 'foto', family: 'familia', remembers: 'recuerda (remember)', gift: 'regalo', use: 'usar', "doesn't": 'no (con he, she, it)',
  understand: 'entender', three: 'tres', farm: 'granja', "leo's": 'de Leo', "maya's": 'de Maya', dad: 'papá', mom: 'mamá', maya: 'Maya (nombre)', she: 'ella', her: 'su (de ella)',
  looks: 'mira (look)', cooks: 'cocina (cook)', dinner: 'cena', always: 'siempre', usually: 'normalmente', nine: 'nueve', seven: 'siete', home: 'casa',
  bike: 'bicicleta', by: 'en (by bike = en bicicleta)', animals: 'animales', rosie: 'Rosie (nombre)', game: 'juego', ask: 'pregunto (ask)', wings: 'alas', answers: 'responde (answer)', daisy: 'Daisy (nombre)', cow: 'vaca', pizza: 'pizza', eats: 'come (eat)', grass: 'pasto', sheep: 'ovejas, oveja', geese: 'gansos', mice: 'ratones', barn: 'granero', lot: 'mucho (a lot of = muchos)', brown: 'Brown (nombre)', remember: 'recordar', silent: 'callado', office: 'oficina', does: 'hace (do) / auxiliar de preguntas',
  quarter: 'cuarto', half: 'media', past: 'pasado, y (half past = y media)', crazy: 'loco', gary: 'Gary (nombre)', sara: 'Sara (nombre)', emails: 'correos', put: 'pongo (put)', meetings: 'reuniones', agenda: 'agenda', monday: 'lunes', friday: 'viernes', phone: 'teléfono', rings: 'suena (ring)', rossi: 'Rossi (nombre)', wants: 'quiere (want)', speak: 'hablar', clark: 'Clark (nombre)', "isn't": 'no es, no está', write: 'escribo (write)', message: 'mensaje', for: 'para', angry: 'enojado', could: 'podrías (can)', please: 'por favor', complete: 'completo', shows: 'muestra (show)', old: 'viejo', future: 'futuro', touch: 'tocamos (touch)', ms: 'señora', eight: 'ocho', with: 'con',
  "school's": 'de la escuela', ana: 'Ana (nombre)', story: 'historia', plan: 'plan', "stranger's": 'del desconocido',
}

export function fillNames(text: string, name: string, iname: string) {
  return text.replaceAll('{name}', name).replaceAll('{iname}', iname)
}

/** Normaliza una palabra para buscarla en el diccionario */
export function normWord(raw: string) {
  return raw.toLowerCase().replace(/[’`]/g, "'").replace(/^[^a-zà-ÿ']+|[^a-zà-ÿ']+$/g, '').replace(/^'+|'+$/g, '')
}

export function lookup(raw: string, names: string[] = []): string | null {
  const w = normWord(raw)
  if (!w) return null
  if (names.some((n) => n.toLowerCase() === w)) return `${raw.replace(/[^\p{L}]/gu, '')} (nombre)`
  return DICT[w] ?? null
}
