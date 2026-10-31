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
        id: 'school-present',
        tense: 'n',
        tab: 'Presente',
        title: 'My story',
        frame: 'Lo escribes esa noche, en presente, como si estuviera pasando ahora. Así se cuentan los cómics y los resúmenes.',
        lines: [
          { en: 'My name [is]n {name}. I [am]n a new student at Greenfield School.', es: 'Me llamo {name}. Hoy empiezo en la escuela Greenfield.' },
          { en: "A man in a dark coat [takes]n my voice. I [can't talk]n!", es: 'Un hombre con un abrigo oscuro se lleva mi voz. ¡No puedo hablar!' },
          { en: 'Leo [is]n my first friend. He [helps]n me.', es: 'Leo es mi primer amigo. Él me ayuda.' },
          { en: 'Mrs. Lopez [gives]n me a uniform, and Ana [finds]n my school things.', es: 'La señora López me da un uniforme, y Ana encuentra mis útiles.' },
          { en: 'I [read]n the class schedule on the board. Each class [gives]n me a piece of chalk.', es: 'Leo el horario en la pizarra. Cada clase me da una tiza.' },
          { en: 'Tom, Rick, Bella and Max [have]n the pieces of the key. I [fight]n them.', es: 'Tom, Rick, Bella y Max tienen los pedazos de la llave. Peleo con ellos.' },
          { en: 'Coach Mike [gives]n me his whistle.', es: 'El entrenador Mike me da su silbato.' },
          { en: 'Mr. Grimm [is]n very strange. He [has]n a piece of a broken clock. But I [win]n, and I [get]n my voice back!', es: 'El profesor Grimm está muy raro. Tiene una pieza de un reloj roto. ¡Pero gano y recupero mi voz!' },
          { en: 'After school, I [introduce]n {iname} to my friends.', es: 'Después de clase, presento a {iname} a mis amigos.' },
          { en: 'Leo [looks]n at his shoes. Then a man in a dark coat [looks]n at my piece of the clock and [says]n: "Keep it... for now."', es: 'Leo mira sus zapatos. Entonces un hombre con abrigo oscuro mira mi pieza del reloj y dice: "Quédatela... por ahora".' },
          { en: 'The clock [has]n five pieces. Where [are]n the other pieces?', es: 'El reloj tiene cinco piezas. ¿Dónde están las otras piezas?' },
        ],
        questions: [
          { q: 'Where is {name} a new student?', options: ['At Greenfield School.', 'In the city.', 'At the farm.'], answer: 0, tip: 'El texto dice: "I am a new student at Greenfield School".' },
          { q: 'Who has the pieces of the key?', options: ['Leo and Ana.', 'Mrs. Lopez.', 'Tom, Rick, Bella and Max.'], answer: 2, tip: 'El texto dice: "Tom, Rick, Bella and Max have the pieces of the key".' },
          { q: 'What does Ana find?', options: ['My school things.', 'My voice.', 'The whistle.'], answer: 0, tip: 'El texto dice: "Ana finds my school things".' },
          { q: 'What does the man in the dark coat look at?', options: ["Leo's shoes.", 'My piece of the clock.', 'The board.'], answer: 1, tip: 'El texto dice: "a man in a dark coat looks at my piece of the clock". Leo es el que mira sus zapatos.' },
        ],
      },
      {
        id: 'school-past',
        unlock: 'school-past-epilogue',
        tense: 'p',
        tab: 'Pasado',
        title: 'Dear diary (1996)',
        frame: 'Lo escribes esa noche, al volver de 1996. Es tu primera página del pasado: todo se cuenta con was y were.',
        lines: [
          { en: 'Dear diary, today we [were]p at Greenfield School in 1996.', es: 'Querido diario, hoy estuvimos en la escuela Greenfield en 1996.' },
          { en: 'The school [was]p very small. There [was]p one classroom, and there [was]p a bell in the yard.', es: 'La escuela era muy pequeña. Había un solo salón y una campana en el patio.' },
          { en: "We [were not]p on the list! Mrs. Higgins's attendance book [was]p a disaster.", es: '¡No estábamos en la lista! El libro de asistencia de la señora Higgins era un desastre.' },
          { en: 'Greg [was]p a student. He [was]p very nervous, and his eyes [were]p sad.', es: 'Greg era estudiante. Estaba muy nervioso y tenía los ojos tristes.' },
          { en: 'His dad [was]p the principal. He [was]p very angry.', es: 'Su papá era el director. Estaba muy enojado.' },
          { en: "A fragment of my voice [was]p on the principal's desk.", es: 'Un fragmento de mi voz estaba en el escritorio del director.' },
          { en: 'In the end, the principal [was]p sorry, and Greg [was]p happy.', es: 'Al final, el director estaba arrepentido y Greg estaba feliz.' },
          { en: 'Greg [is]n Mr. Grimm, our teacher!', es: '¡Greg es el profesor Grimm, nuestro profesor!' },
          { en: 'Leo [was]p at the bell. The stranger [was]p behind the wall. His words [were]p sad: "It [was]p small... and it [was]p full of voices."', es: 'Leo estaba en la campana. El desconocido estaba detrás de la pared. Sus palabras eran tristes: "Era pequeña... y estaba llena de voces".' },
        ],
        questions: [
          { q: 'Where was the fragment of your voice?', options: ['In the yard.', "On the principal's desk.", "In Greg's bag."], answer: 1, tip: 'El diario dice: "A fragment of my voice was on the principal\'s desk".' },
          { q: "Who was Greg's dad?", options: ['The principal.', 'Mr. Grimm.', 'Coach Mike.'], answer: 0, tip: 'El diario dice: "His dad was the principal". Mr. Grimm es Greg, no su papá.' },
          { q: 'Which sentence is correct?', options: ['The students was nervous.', 'The students is nervous.', 'The students were nervous.'], answer: 2, tip: 'The students (they): were. Was va con I, he, she, it.' },
          { q: 'Who is Greg today?', options: ['Coach Mike.', 'Mr. Grimm, our teacher.', "Leo's grandpa."], answer: 1, tip: 'El diario dice: "Greg is Mr. Grimm, our teacher!".' },
        ],
      },
      {
        id: 'school-future',
        unlock: 'school-future-epilogue',
        tense: 'f',
        tab: 'Futuro',
        title: "The stranger's plan",
        frame: 'Una hoja que se le cayó al desconocido en 2056, junto a la ventana del aula del profesor Garcia. La escribió la noche antes de quitarte la voz: es su plan, por eso está en futuro.',
        lines: [
          { en: 'Tomorrow a new student [is going to arrive]f at Greenfield School.', es: 'Mañana un estudiante nuevo va a llegar a la escuela Greenfield.' },
          { en: "I [am going to take]f the student's voice. Ha ha!", es: 'Voy a llevarme la voz del estudiante. ¡Ja, ja!' },
          { en: 'My machine [is going to keep]f the words inside my clock.', es: 'Mi máquina va a guardar las palabras dentro de mi reloj.' },
          { en: 'Then I [am going to travel]f back to my time.', es: 'Luego voy a viajar de vuelta a mi tiempo.' },
          { en: 'Tomorrow the student [is going to be]f silent. And nobody [is going to help]f!', es: 'Mañana el estudiante va a quedarse sin voz. ¡Y nadie va a ayudar!' },
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
        unlock: 'school-future-epilogue',
        tense: 'mix',
        tab: 'Mezcla',
        title: 'One school, three times',
        frame: 'Lo escribes al terminar la escuela de 2056. No cuentas otra vez lo que pasó: miras qué fue de cada persona en las tres épocas. Activa "Ver verbos" para ver cada tiempo con su color.',
        lines: [
          { en: 'In 1996, Greg [was]p a shy student, and his dad [was]p a strict principal.', es: 'En 1996, Greg era un estudiante tímido, y su papá era un director estricto.' },
          { en: 'Greg [wanted]p to be a good teacher: "Not like my dad!"', es: 'Greg quería ser un buen profesor: "¡No como mi papá!".' },
          { en: 'Today, Greg [is]n Mr. Grimm, our teacher. {iname} [says]n: "People change."', es: 'Hoy, Greg es el profesor Grimm, nuestro profesor. {iname} dice: "La gente cambia".' },
          { en: 'In 2056, the principal of this school [is]n a robot: GRIMM-BOT!', es: 'En 2056, el director de esta escuela es un robot: ¡GRIMM-BOT!' },
          { en: 'And the English teacher [is going to be]f... Leo! His name [is]n Mr. Garcia.', es: 'Y el profesor de inglés va a ser... ¡Leo! Se llama el señor Garcia.' },
          { en: 'His lesson for every day [is]n: "Be brave, and use your voice."', es: 'Su lección de todos los días es: "Sean valientes y usen su voz".' },
          { en: 'The man in the dark coat [was]p in this school in every time. In 1996, he [was]p at the board for a long time.', es: 'El hombre del abrigo oscuro estuvo en esta escuela en todas las épocas. En 1996 estuvo un largo rato en la pizarra.' },
          { en: "In 2056, he [watched]p Mr. Garcia's class from the window. And today, he [took]p my voice here.", es: 'En 2056 miró la clase del señor Garcia desde la ventana. Y hoy me quitó la voz aquí.' },
          { en: 'Why this school? I [am going to find]f out.', es: '¿Por qué esta escuela? Lo voy a descubrir.' },
        ],
        questions: [
          { q: 'Who was Mr. Grimm in 1996?', options: ['The principal.', 'A shy student.', 'A robot.'], answer: 1, tip: 'El texto dice: "In 1996, Greg was a shy student". Greg es el profesor Grimm.' },
          { q: 'What is Leo going to be?', options: ['The English teacher at this school.', 'The principal.', 'An astronaut.'], answer: 0, tip: 'El texto dice: "the English teacher is going to be... Leo!".' },
          { q: 'Where was the stranger in 2056?', options: ['In the yard.', 'At the bus stop.', 'At the window of the classroom.'], answer: 2, tip: 'El texto dice: "he watched Mr. Garcia\'s class from the window".' },
          { q: 'Which sentence is about the future?', options: ['Greg was a student.', 'Leo is going to be a teacher.', 'Mr. Grimm is our teacher.'], answer: 1, tip: '"Is going to + verbo" habla del futuro. "Was" es pasado e "is" es presente.' },
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
        id: 'city-present',
        tense: 'n',
        tab: 'Presente',
        title: 'My story: the city',
        frame: 'Lo que pasó en la ciudad, contado en presente.',
        lines: [
          { en: 'Leo, {iname} and I [take]n the bus to the city.', es: 'Leo, {iname} y yo tomamos el autobús a la ciudad.' },
          { en: 'The city [is]n big. There [is]n a café, a clothes shop and a fountain.', es: 'La ciudad es grande. Hay un café, una tienda de ropa y una fuente.' },
          { en: 'Officer Rosa [gives]n me a map. Now I [know]n the streets.', es: 'La oficial Rosa me da un mapa. Ahora conozco las calles.' },
          { en: 'In the café, I [order]n a juice and a cake. Lily [writes]n my name on the cup.', es: 'En el café pido un jugo y un pastel. Lily escribe mi nombre en el vaso.' },
          { en: 'Danny, Chloe and Victor [have]n the pieces of a key.', es: 'Danny, Chloe y Víctor tienen los pedazos de una llave.' },
          { en: 'Mr. Rossi [is]n the guide. He [has]n a piece of the clock, and he [sends]n tourists to the wrong place!', es: 'El señor Rossi es el guía. Tiene una pieza del reloj, ¡y manda a los turistas al lugar equivocado!' },
          { en: 'I [take]n him a black coffee, and I [win]n.', es: 'Le llevo un café negro, y gano.' },
          { en: 'Now I [have]n two pieces of the clock.', es: 'Ahora tengo dos piezas del reloj.' },
          { en: 'Leo [counts]n the fish in the fountain. Then a man in a dark coat [says]n: "Two pieces... You are fast."', es: 'Leo cuenta los peces de la fuente. Entonces un hombre con abrigo oscuro dice: "Dos piezas... Vas muy rápido".' },
          { en: 'Tomorrow we [go]n to Green Street. Leo [lives]n there!', es: 'Mañana vamos a Green Street. ¡Leo vive allá!' },
        ],
        questions: [
          { q: 'How do you go to the city?', options: ['By bus.', 'By car.', 'By bike.'], answer: 0, tip: 'El texto dice: "Leo, {iname} and I take the bus to the city".' },
          { q: 'What does Officer Rosa give you?', options: ['A coffee.', 'A map.', 'A key.'], answer: 1, tip: 'El texto dice: "Officer Rosa gives me a map".' },
          { q: 'What do you order in the café?', options: ['An apple and water.', 'A pizza.', 'A juice and a cake.'], answer: 2, tip: 'El texto dice: "I order a juice and a cake".' },
          { q: 'What does the man in the dark coat say?', options: ['"Welcome to the city!"', '"Two pieces... You are fast."', '"Can I have a coffee?"'], answer: 1, tip: 'El texto dice: "Two pieces... You are fast."' },
        ],
      },
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
          { en: 'Mrs. Rossi [shouted]p at everybody. A fragment of my voice [was]p in her market.', es: 'La señora Rossi les gritaba a todos. Un fragmento de mi voz estaba en su mercado.' },
          { en: 'In the end she [smiled]p and she [thanked]p us.', es: 'Al final sonrió y nos dio las gracias.' },
          { en: 'Tony is Mr. Rossi, the guide! He [wanted]p to show the city to tourists.', es: '¡Tony es el señor Rossi, el guía! Quería mostrarles la ciudad a los turistas.' },
          { en: 'The stranger [stopped]p at the phone box. He [wanted]p to call someone, but he [was]p silent.', es: 'El desconocido se detuvo en la cabina de teléfono. Quería llamar a alguien, pero se quedó callado.' },
        ],
        questions: [
          { q: 'Who delivered bread?', options: ['Betty.', 'Tony.', 'Mrs. Rossi.'], answer: 1, tip: 'El diario dice: "Tony delivered bread on his bike".' },
          { q: 'Where was the stranger?', options: ['At the well.', 'At the phone box.', 'At the market.'], answer: 1, tip: 'El diario dice: "The stranger stopped at the phone box".' },
          { q: 'Which verb ends with the sound /ɪd/?', options: ['walked', 'played', 'wanted'], answer: 2, tip: 'want termina en t: want-ed suena /ɪd/.' },
          { q: 'Which sentence is in the past?', options: ['We help Tony.', 'We helped Tony.', 'We are going to help Tony.'], answer: 1, tip: '"Helped" es el pasado de "help". Las otras están en presente y en futuro.' },
        ],
      },
      {
        id: 'city-future',
        unlock: 'city-future-epilogue',
        tense: 'f',
        tab: 'Futuro',
        title: "Marco's tour plan",
        frame: 'Una holonota que Marco, el guía holograma y nieto de Tony, dejó en la plaza la noche anterior: su plan para los turistas de mañana. Fíjate en las negativas y las preguntas con going to.',
        lines: [
          { en: 'Tomorrow I [am going to guide]f three groups: Kira, Bo and the Bleeps.', es: 'Mañana voy a guiar a tres grupos: Kira, Bo y los Bleeps.' },
          { en: "Kira and the Bleeps [are going to visit]f the fountain. Bo [isn't going to visit]f it.", es: 'Kira y los Bleeps van a visitar la fuente. Bo no la va a visitar.' },
          { en: "[Is]f Kira [going to visit]f the café? No, she [isn't]f. [Are]f the Bleeps [going to visit]f it? Yes, they [are]f.", es: '¿Kira va a visitar el café? No. ¿Los Bleeps lo van a visitar? Sí.' },
          { en: 'Kira [is going to visit]f the statue of my grandpa, Tony!', es: '¡Kira va a visitar la estatua de mi abuelo, Tony!' },
          { en: "Bo [isn't going to visit]f the statue. He [is going to go]f up the Sky Tower.", es: 'Bo no va a visitar la estatua. Va a subir a la Sky Tower.' },
          { en: "The tourists [aren't going to get]f lost. Not on my tour!", es: 'Los turistas no se van a perder. ¡No en mi recorrido!' },
          { en: 'Grandpa Tony [was]p the best guide in town. I [am not going to be]f the second best!', es: 'El abuelo Tony fue el mejor guía de la ciudad. ¡Yo no voy a ser el segundo mejor!' },
        ],
        questions: [
          { q: 'Is Bo going to visit the fountain?', options: ['Yes, he is.', "No, he isn't.", "No, he doesn't."], answer: 1, tip: 'La nota dice: "Bo isn\'t going to visit it". Respuesta corta: No, he isn\'t.' },
          { q: "Who is Marco's grandpa?", options: ['Tony, the old guide.', 'Mayor Danny.', 'Mr. Park.'], answer: 0, tip: 'La nota dice: "the statue of my grandpa, Tony" y "Grandpa Tony was the best guide in town".' },
          { q: 'Which question is correct?', options: ['The Bleeps are going to visit the café?', 'Are the Bleeps going to visit the café?', 'Do the Bleeps going to visit the café?'], answer: 1, tip: 'En la pregunta, are va primero: Are + the Bleeps + going to + verbo?' },
          { q: 'Did the tourists get lost?', options: ["No, they didn't. You helped Marco with his plan.", 'Yes, they did. The mayor closed the streets.', 'Yes, they did. There was no fountain.'], answer: 0, tip: 'Ayudaste a Marco con la ruta, y el alcalde al final no cerró las calles.' },
        ],
      },
      {
        id: 'city-mix',
        unlock: 'city-future-epilogue',
        tense: 'mix',
        tab: 'Mezcla',
        title: 'One city, three times',
        frame: 'Lo escribes al terminar la ciudad de 2056. Miras qué fue de cada persona y cada lugar de la ciudad en las tres épocas. Activa "Ver verbos" para ver cada tiempo con su color.',
        lines: [
          { en: 'In 1996, there [was]p no fountain. There [was]p a well, and the road [was]p dirt.', es: 'En 1996 no había fuente. Había un pozo, y la carretera era de tierra.' },
          { en: 'Today, there [is]n a fountain with ten fish. In 2056, the buses [fly]n... but the old fountain [is]n still there.', es: 'Hoy hay una fuente con diez peces. En 2056 los buses vuelan... pero la fuente vieja sigue ahí.' },
          { en: 'Next to it, there [is]n a statue of Tony. In 1996, he [delivered]p bread on his bike. Today, he [is]n Mr. Rossi, the guide.', es: 'Al lado hay una estatua de Tony. En 1996 repartía pan en su bicicleta. Hoy es el señor Rossi, el guía.' },
          { en: 'In 2056, his grandson Marco [is]n a guide too.', es: 'En 2056, su nieto Marco también es guía.' },
          { en: 'In 1996, little Rosa [wanted]p to be a police officer. Today, Officer Rosa [gives]n maps to tourists. In 2056, she [is]n the chief of police!', es: 'En 1996, la pequeña Rosa quería ser policía. Hoy la oficial Rosa les da mapas a los turistas. ¡En 2056 es la jefa de policía!' },
          { en: 'Danny always [asks]n: "Is there a bank here?" In 2056, he [is]n the mayor... and he [isn\'t going to get]f lost again.', es: 'Danny siempre pregunta: "¿Hay un banco aquí?". En 2056 es el alcalde... y no se va a volver a perder.' },
          { en: 'The stranger [was]p in this city in every time. In 1996, he [picked up]p the phone, but there [was]p no voice.', es: 'El desconocido estuvo en esta ciudad en todas las épocas. En 1996 levantó el teléfono, pero no había voz.' },
          { en: 'In 2056, he [waited]p at the old bus stop all day for a friend. Nobody [came]p.', es: 'En 2056 esperó a un amigo todo el día en la parada vieja. Nadie vino.' },
          { en: 'Who [is]n his friend? [Is]f he [going to come]f one day?', es: '¿Quién es su amigo? ¿Va a venir algún día?' },
        ],
        questions: [
          { q: 'What was there in 1996, before the fountain?', options: ['A statue.', 'A well.', 'A bus stop.'], answer: 1, tip: 'El texto dice: "In 1996, there was no fountain. There was a well".' },
          { q: 'Who wanted to be a police officer?', options: ['Rosa.', 'Betty.', 'Lily.'], answer: 0, tip: 'El texto dice: "little Rosa wanted to be a police officer". Hoy es la oficial Rosa.' },
          { q: 'Who is the statue in 2056?', options: ['Mayor Danny.', 'Marco.', 'Tony Rossi.'], answer: 2, tip: 'El texto dice: "there is a statue of Tony". Marco es su nieto.' },
          { q: 'What did the stranger do at the old bus stop?', options: ['He waited for a friend.', 'He took a flying bus.', 'He sold maps.'], answer: 0, tip: 'El texto dice: "he waited at the old bus stop all day for a friend".' },
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
        id: 'barrio-present',
        tense: 'n',
        tab: 'Presente',
        title: 'My story: Green Street',
        frame: 'Lo que pasó en Green Street, contado en presente.',
        lines: [
          { en: 'Leo [lives]n on Green Street. I [live]n there too, on Park Street!', es: 'Leo vive en Green Street. ¡Yo también vivo allá, en Park Street!' },
          { en: "Leo's mom [gets]n up at six. His dad [works]n in a hospital, and his sister Emma [plays]n the guitar.", es: 'La mamá de Leo se levanta a las seis. Su papá trabaja en un hospital, y su hermana Emma toca la guitarra.' },
          { en: "Maya's dad [loves]n cooking. Maya [loves]n reading, but she [hates]n getting up early.", es: 'Al papá de Maya le encanta cocinar. A Maya le encanta leer, pero odia levantarse temprano.' },
          { en: "Today [is]n Leo's birthday. He [is]n fifteen! There [is]n a party in the park.", es: 'Hoy es el cumpleaños de Leo. ¡Cumple quince! Hay una fiesta en el parque.' },
          { en: 'My brother Nick [has]n a piece of the clock. He [says]n everything without -s!', es: 'Mi hermano Nick tiene una pieza del reloj. ¡Dice todo sin -s!' },
          { en: 'Grandpa Joe [gives]n me a photo of my family, and Nick [remembers]n me.', es: 'El abuelo Joe me da una foto de mi familia, y Nick me recuerda.' },
          { en: 'At home, Mom [looks]n at the photo. I [have]n got one brother, Nick, and Dad always [cooks]n dinner.', es: 'En casa, mamá mira la foto. Tengo un hermano, Nick, y papá siempre cocina la cena.' },
          { en: 'I always [get]n up at seven. Nick usually [gets]n up at nine!', es: 'Siempre me levanto a las siete. ¡Nick normalmente se levanta a las nueve!' },
          { en: 'Leo [opens]n a gift from "L". The card [says]n: "Happy birthday, Leo. Be brave. Use your voice." Leo [doesn\'t understand]n.', es: 'Leo abre un regalo de "L". La tarjeta dice: "Feliz cumpleaños, Leo. Sé valiente. Usa tu voz". Leo no entiende.' },
          { en: 'Leo [picks up]n the gift paper. Behind a tree, a man in a dark coat [says]n: "Happy birthday... Leo."', es: 'Leo recoge el papel de regalo. Detrás de un árbol, un hombre con abrigo oscuro dice: "Feliz cumpleaños... Leo".' },
          { en: 'Now I [have]n three pieces of the clock. Tomorrow we [go]n to the farm.', es: 'Ahora tengo tres piezas del reloj. Mañana vamos a la granja.' },
        ],
        questions: [
          { q: "Where does Leo's dad work?", options: ['In a bank.', 'In a hospital.', 'On a farm.'], answer: 1, tip: 'El texto dice: "His dad works in a hospital".' },
          { q: 'What does Maya love?', options: ['Reading.', 'Getting up early.', 'Cooking.'], answer: 0, tip: 'El texto dice: "Maya loves reading".' },
          { q: 'How old is Leo today?', options: ['Sixty.', 'Seven.', 'Fifteen.'], answer: 2, tip: 'El texto dice: "Today is Leo\'s birthday. He is fifteen!".' },
          { q: 'What does the card from "L" say?', options: ['"Happy new year."', '"Be brave. Use your voice."', '"Go to the farm."'], answer: 1, tip: 'La tarjeta dice: "Happy birthday, Leo. Be brave. Use your voice."' },
        ],
      },
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
          { en: 'Mr. Hill [was]p the boss. He [took]p a fragment of my voice, and he [changed]p. He [was]p very angry.', es: 'El señor Hill era el jefe. Tomó un fragmento de mi voz y cambió. Estaba muy enojado.' },
          { en: 'I [won]p, and he [gave]p me an old helmet.', es: 'Gané, y me dio un casco viejo.' },
          { en: 'Then we [found]p out the truth: Joe is Leo\'s grandpa, and Carmen is Leo\'s mom!', es: 'Luego descubrimos la verdad: ¡Joe es el abuelo de Leo, y Carmen es la mamá de Leo!' },
          { en: 'Joe [built]p the house with his hands. Carmen [met]p Daniel, Leo\'s dad, on Green Street.', es: 'Joe construyó la casa con sus manos. Carmen conoció a Daniel, el papá de Leo, en Green Street.' },
          { en: 'The stranger [saw]p the house too. He [touched]p the walls and he [cried]p.', es: 'El desconocido también vio la casa. Tocó las paredes y lloró.' },
        ],
        questions: [
          { q: 'Who built the house?', options: ['Mr. Hill.', 'Joe.', 'Sam.'], answer: 1, tip: 'El diario dice: "Joe built the house with his hands".' },
          { q: 'Who came from the city?', options: ['Joe.', 'Mr. Hill.', 'Carmen.'], answer: 2, tip: 'El diario dice: "Carmen, the painter, came from the city".' },
          { q: 'What is the past of "go"?', options: ['goed', 'went', 'gone'], answer: 1, tip: 'go es irregular: went.' },
          { q: 'Which verb is irregular?', options: ['helped', 'touched', 'gave'], answer: 2, tip: 'gave (de give) no termina en -ed: es irregular.' },
        ],
      },
      {
        id: 'barrio-future',
        unlock: 'barrio-future-epilogue',
        tense: 'f',
        tab: 'Futuro',
        title: "Emma's party list",
        frame: 'Una lista que Emma, la hermana de Leo, escribió la noche anterior para organizar la fiesta de los 60 años de la calle. Tiene lo que ya sabe y lo que todavía no. Fíjate en las preguntas con What, Where, When y Who.',
        lines: [
          { en: 'Green Street [is going to be]f sixty years old!', es: '¡Green Street va a cumplir sesenta años!' },
          { en: 'Where [is]f the party [going to be]f? In the park, next to the big tree.', es: '¿Dónde va a ser la fiesta? En el parque, al lado del árbol grande.' },
          { en: "What time [is]f it [going to start]f? At five o'clock.", es: '¿A qué hora va a empezar? A las cinco.' },
          { en: 'What [is]f Maya [going to cook]f? Her famous sandwiches, of course!', es: '¿Qué va a cocinar Maya? ¡Sus famosos sándwiches, claro!' },
          { en: 'Who [is going to make]f a speech? My brother Leo. And he [is going to say]f "Hi, hi!" Ha ha.', es: '¿Quién va a dar un discurso? Mi hermano Leo. Y va a decir "Hi, hi!". Ja, ja.' },
          { en: 'What [am]f I [going to do]f? I [am going to play]f the guitar, like when I [was]p a girl.', es: '¿Qué voy a hacer yo? Voy a tocar la guitarra, como cuando era niña.' },
          { en: "What [are]f the neighbors [going to bring]f? I [don't know]n yet!", es: '¿Qué van a traer los vecinos? ¡Todavía no lo sé!' },
        ],
        questions: [
          { q: 'How old is Green Street going to be?', options: ['Fifteen.', 'Sixty.', 'Ninety.'], answer: 1, tip: 'La lista dice: "Green Street is going to be sixty years old!".' },
          { q: 'What is Emma going to do at the party?', options: ['Play the guitar.', 'Cook sandwiches.', 'Make a speech.'], answer: 0, tip: 'Emma escribe: "I am going to play the guitar". Maya cocina y Leo da el discurso.' },
          { q: 'Which question is correct?', options: ['What time the party is going to start?', 'What time is the party going start?', 'What time is the party going to start?'], answer: 2, tip: 'What time + is + the party + going to + verbo?' },
          { q: 'Was the party good in the end?', options: ['No, it wasn\'t. It rained.', 'Yes, it was. Emma played the guitar, and Leo danced with Joey.', "No, it wasn't. Nobody came."], answer: 1, tip: 'Al final de Green Street en 2056, Emma toca la guitarra y Leo baila con Joey.' },
        ],
      },
      {
        id: 'barrio-mix',
        unlock: 'barrio-future-epilogue',
        tense: 'mix',
        tab: 'Mezcla',
        title: 'One street, three times',
        frame: 'Lo escribes al terminar Green Street en 2056. Miras qué fue de las casas y de la gente de la calle en las tres épocas. Activa "Ver verbos" para ver cada tiempo con su color.',
        lines: [
          { en: 'In 1996, Joe [built]p a house with his hands. It [was]p the first house on Green Street.', es: 'En 1996, Joe construyó una casa con sus manos. Fue la primera casa de Green Street.' },
          { en: 'Today, his grandson Leo [lives]n in it. He [is]n fifteen.', es: 'Hoy vive ahí su nieto Leo. Tiene quince años.' },
          { en: 'In 2056, Leo [is going to live]f there with his son. His name [is]n Joey, like his great-grandpa Joe.', es: 'En 2056, Leo va a vivir ahí con su hijo. Se llama Joey, como su bisabuelo Joe.' },
          { en: 'On his birthday, Leo [got]p a card from "L": "Be brave. Use your voice." Who [is]n "L"? Leo [doesn\'t know]n.', es: 'En su cumpleaños, Leo recibió una tarjeta de "L": "Sé valiente. Usa tu voz". ¿Quién es "L"? Leo no lo sabe.' },
          { en: 'In 2056, Mr. Garcia [says]n these words to all his students... and he still [doesn\'t know]n who [wrote]p the card.', es: 'En 2056, el señor Garcia les dice esas palabras a todos sus estudiantes... y todavía no sabe quién escribió la tarjeta.' },
          { en: 'My house [is]n on this street too. In 2056, Nick [is going to live]f in it with his family.', es: 'Mi casa también está en esta calle. En 2056, Nick va a vivir ahí con su familia.' },
          { en: 'And me? I [am going to live]f in another city... but I [am going to visit]f Leo every Sunday.', es: '¿Y yo? Voy a vivir en otra ciudad... pero voy a visitar a Leo todos los domingos.' },
          { en: "The stranger [knows]n this street. In 1996, he [touched]p the walls of Joe's house and [cried]p.", es: 'El desconocido conoce esta calle. En 1996 tocó las paredes de la casa de Joe y lloró.' },
          { en: "In 2056, he [stood]p in front of Leo's house. Inside, Leo [read]p a story to Joey. The man [put]p his hand on his throat and [walked]p away.", es: 'En 2056 se paró frente a la casa de Leo. Adentro, Leo le leía un cuento a Joey. El hombre se puso la mano en la garganta y se fue.' },
        ],
        questions: [
          { q: "Who built Leo's house?", options: ['Mr. Hill.', "Joe, Leo's grandpa.", 'Nick.'], answer: 1, tip: 'El texto dice: "In 1996, Joe built a house with his hands". Joe es el abuelo de Leo.' },
          { q: 'Where are you going to live in 2056?', options: ['In another city.', 'In your house on Park Street.', 'On the farm.'], answer: 0, tip: 'El texto dice: "I am going to live in another city". Nick va a vivir en tu casa.' },
          { q: 'Does Mr. Garcia know who wrote the card?', options: ['Yes, he does.', "No, he doesn't.", 'He never got a card.'], answer: 1, tip: 'El texto dice: "he still doesn\'t know who wrote the card".' },
          { q: 'Which sentence is about the future?', options: ['Joe built the house.', 'Leo lives in the house.', 'Leo is going to live there with his son.'], answer: 2, tip: '"Is going to + verbo" habla del futuro. "Built" es pasado y "lives" es presente.' },
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
          { en: 'Rosie, Mr. Brown\'s granddaughter, [plays]n a game with me. I [ask]n: "Does it have wings?" and she [answers]n: "No, it doesn\'t."', es: 'Rosie, la nieta del señor Brown, juega un juego conmigo. Yo pregunto: "¿Tiene alas?" y ella responde: "No".' },
          { en: "Daisy the cow [doesn't]n eat pizza. She [eats]n grass!", es: 'Daisy la vaca no come pizza. ¡Come pasto!' },
          { en: 'There [are]n five sheep and three geese. And there [are]n a lot of mice in the barn!', es: 'Hay cinco ovejas y tres gansos. ¡Y hay muchos ratones en el granero!' },
          { en: "Mr. Brown [has]n a piece of the clock. He [doesn't]n remember the morning.", es: 'El señor Brown tiene una pieza del reloj. No recuerda la mañana.' },
          { en: 'Leo [goes]n with Rosie to see the rabbits. Behind the fence, a man in a dark coat [says]n: "One day you are going to be silent." I [don\'t]n understand.', es: 'Leo se va con Rosie a ver los conejos. Detrás de la cerca, un hombre con abrigo oscuro dice: "Un día te vas a quedar callado". No entiendo.' },
          { en: 'Now I [have]n four pieces of the clock. The last piece [is]n in an office.', es: 'Ahora tengo cuatro piezas del reloj. La última pieza está en una oficina.' },
        ],
        questions: [
          { q: 'How do you go to the farm?', options: ['By bus.', 'By bike.', 'By car.'], answer: 1, tip: 'El texto dice: "We go to the farm by bike".' },
          { q: 'Does Daisy eat pizza?', options: ["No, she doesn't.", 'Yes, she does.', 'Yes, she eats.'], answer: 0, tip: 'El texto dice: "Daisy the cow doesn\'t eat pizza".' },
          { q: 'Who is Rosie?', options: ["Dr. Patel's daughter.", 'A cow.', "Mr. Brown's granddaughter."], answer: 2, tip: 'El texto dice: "Rosie, Mr. Brown\'s granddaughter".' },
          { q: 'Where is the last piece?', options: ['In an office.', 'On the farm.', 'In the park.'], answer: 0, tip: 'El texto dice: "The last piece is in an office".' },
        ],
      },
      {
        id: 'farm-past',
        unlock: 'farm-past-epilogue',
        tense: 'p',
        tab: 'Pasado',
        title: 'Dear diary (1996)',
        frame: "Lo escribes esa noche. Fíjate en las preguntas y negaciones: did / didn't + verbo simple.",
        lines: [
          { en: 'Dear diary, today we [walked]p to the farm in 1996. The windmill [didn\'t move]p.', es: 'Querido diario, hoy caminamos a la granja en 1996. El molino no se movía.' },
          { en: 'Bill [asked]p me: "[Did]p you [stop]p my windmill?" I [said]p: "No, I [didn\'t]p!"', es: 'Bill me preguntó: "¿Tú paraste mi molino?". Yo dije: "¡No!"' },
          { en: 'I [asked]p everybody. Hank [didn\'t touch]p it, and Lucy [didn\'t hear]p a sound.', es: 'Les pregunté a todos. Hank no lo tocó, y Lucy no oyó ningún ruido.' },
          { en: 'Tom [saw]p a lot of mice in the barn. The mice [ate]p the rope!', es: 'Tom vio muchos ratones en el granero. ¡Los ratones se comieron la cuerda!' },
          { en: 'Danny and Daisy [were]p here too! The light of the clock [brought]p them. Now they are home.', es: '¡Danny y Daisy también estaban aquí! La luz del reloj los trajo. Ya están en casa.' },
          { en: 'Max, the puppy, [said]p: "I [didn\'t eat]p the shoes!" But he [did]p.', es: 'Max, el cachorro, dijo: "¡No me comí los zapatos!". Pero sí se los comió.' },
          { en: 'Mrs. Brown [didn\'t listen]p to anybody. She [had]p a fragment of my voice.', es: 'La señora Brown no escuchaba a nadie. Tenía un fragmento de mi voz.' },
          { en: 'Bill is Mr. Brown, and Priya is Dr. Patel! [Did]p they [know]p about us? No, they [didn\'t]p.', es: '¡Bill es el señor Brown, y Priya es la doctora Patel! ¿Sabían de nosotros? No.' },
          { en: 'The stranger [asked]p: "[Did]p anybody [call]p for help?" Why [did]p he [ask]p that?', es: 'El desconocido preguntó: "¿Alguien pidió ayuda?". ¿Por qué preguntó eso?' },
        ],
        questions: [
          { q: 'Did Hank touch the windmill?', options: ["Yes, he did.", "No, he didn't.", "No, he doesn't."], answer: 1, tip: "El diario dice: \"Hank didn't touch it\"." },
          { q: 'Who ate the rope?', options: ['The mice.', 'Max.', 'Daisy.'], answer: 0, tip: 'El diario dice: "The mice ate the rope!".' },
          { q: 'Did Max eat the shoes?', options: ['Yes, he did.', "No, he didn't.", 'Yes, he ate.'], answer: 0, tip: 'Max dijo que no, pero el diario dice: "But he did".' },
          { q: 'Which question is correct?', options: ['Did you went?', 'Did you go?', 'Do you went?'], answer: 1, tip: 'Después de did, el verbo va simple: Did you go?' },
        ],
      },
      {
        id: 'farm-future',
        unlock: 'farm-future-epilogue',
        tense: 'f',
        tab: 'Futuro',
        title: "Rosie's farm notes",
        frame: 'Una página de la libreta de Rosie, la dueña de la granja. La escribió la noche anterior para organizar el trabajo de mañana con su hijo y sus robots. Fíjate en las predicciones con going to.',
        lines: [
          { en: 'The clouds [are]n black tonight. Tomorrow it [is going to rain]f!', es: 'Esta noche las nubes están negras. ¡Mañana va a llover!' },
          { en: 'And with this wind, the turbine [is going to make]f a lot of energy.', es: 'Y con este viento, el molino va a hacer mucha energía.' },
          { en: 'D-4 [is going to bring]f the sheep back to the barn.', es: 'D-4 va a llevar las ovejas de vuelta al granero.' },
          { en: 'Dr. Patel [says]n that sheep [is going to have]f a baby soon.', es: 'La doctora Patel dice que esa oveja va a tener un bebé pronto.' },
          { en: 'Finn [is going to help]f me. He [is going to be]f a farmer, like me, like his grandpa and like his great-grandpa.', es: 'Finn me va a ayudar. Va a ser granjero, como yo, como su abuelo y como su bisabuelo.' },
          { en: 'Grandpa Brown [is]n ninety, and he [knows]n this farm very well.', es: 'El abuelo Brown tiene noventa años, y conoce muy bien esta granja.' },
        ],
        questions: [
          { q: 'What is the turbine going to do?', options: ['Fall in the pond.', 'Make a lot of energy.', 'Eat grass.'], answer: 1, tip: 'La libreta dice: "the turbine is going to make a lot of energy".' },
          { q: 'Who is going to bring the sheep back to the barn?', options: ['D-4, the drone.', 'Finn.', 'Thunder.'], answer: 0, tip: 'La libreta dice: "D-4 is going to bring the sheep back to the barn".' },
          { q: 'The clouds are black. What is going to happen?', options: ['It going to rain.', 'It rained tomorrow.', "It's going to rain."], answer: 2, tip: "Ves nubes negras: It + is ('s) going to + rain." },
          { q: 'Was Rosie right about the weather?', options: ['Yes, she was. It rained.', "No, she wasn't. It was sunny.", 'No. Grandpa Brown was right.'], answer: 0, tip: 'Al final de la granja de 2056 empieza a llover, como dijo Rosie.' },
        ],
      },
      {
        id: 'farm-mix',
        unlock: 'farm-future-epilogue',
        tense: 'mix',
        tab: 'Mezcla',
        title: 'One farm, three times',
        frame: 'Lo escribes al terminar la granja de 2056. Miras qué fue del molino, de los animales y de la gente de la granja en las tres épocas. Activa "Ver verbos" para ver cada tiempo con su color.',
        lines: [
          { en: 'In 1996, the old windmill [stopped]p. The mice [ate]p the rope, and Bill [fixed]p it.', es: 'En 1996 el molino viejo se paró. Los ratones se comieron la cuerda, y Bill lo arregló.' },
          { en: 'Today, Bill [is]n Mr. Brown. His granddaughter Rosie [plays]n the animal game in the barn.', es: 'Hoy Bill es el señor Brown. Su nieta Rosie juega a adivinar animales en el granero.' },
          { en: 'In 2056, Rosie [is]n the farmer. She [has got]n robots, a drone, a turbine... and a son, Finn. He [is going to be]f a farmer too.', es: 'En 2056 Rosie es la granjera. Tiene robots, un dron, un molino eólico... y un hijo, Finn. Él también va a ser granjero.' },
          { en: 'In 1996, Priya [helped]p Mrs. Brown with the chickens. Today, she [is]n Dr. Patel, the vet. In 2056, at eighty, she still [visits]n the animals.', es: 'En 1996 Priya ayudaba a la señora Brown con las gallinas. Hoy es la doctora Patel, la veterinaria. En 2056, a los ochenta años, todavía visita a los animales.' },
          { en: 'In 2056, Grandpa Brown [remembers]n three kids from sixty years ago: "A boy with a green shirt... and you two." That [was]p us!', es: 'En 2056, el abuelo Brown recuerda a tres niños de hace sesenta años: "Un niño con camiseta verde... y ustedes dos". ¡Éramos nosotros!' },
          { en: 'In 1996 and in 2056, the stranger [went]p to the pond. In 1996, he [said]p: "Did anybody call for help... that night? No. Nobody did."', es: 'En 1996 y en 2056, el desconocido fue al estanque. En 1996 dijo: "¿Alguien pidió ayuda... esa noche? No. Nadie".' },
          { en: 'In 2056, in the rain, he [said]p: "Nobody can hear you in the rain."', es: 'En 2056, bajo la lluvia, dijo: "Nadie te puede oír en la lluvia".' },
          { en: 'What [happened]p "that night"? Nobody on the farm [understands]n his question.', es: '¿Qué pasó "esa noche"? Nadie en la granja entiende su pregunta.' },
        ],
        questions: [
          { q: 'Who fixed the old windmill in 1996?', options: ['Rosie and Finn.', 'D-4.', 'Bill, with three kids.'], answer: 2, tip: 'Bill arregló el molino en 1996, y en 2056 recuerda a los tres niños que lo ayudaron.' },
          { q: 'Who is Dr. Patel?', options: ['Priya, the girl from 1996.', "Rosie's mom.", 'Mrs. Brown.'], answer: 0, tip: 'El texto dice: "In 1996, Priya helped Mrs. Brown... Today, she is Dr. Patel".' },
          { q: 'Where did the stranger go on the farm?', options: ['To the barn.', 'To the pond.', 'To the house.'], answer: 1, tip: 'El texto dice: "In 1996 and in 2056, the stranger went to the pond".' },
          { q: 'Which sentence is in the past?', options: ['Rosie plays a game.', 'The turbine is going to make energy.', 'Bill fixed the windmill.'], answer: 2, tip: '"Fixed" es el pasado de "fix". "Plays" es presente e "is going to make" es futuro.' },
        ],
      },
    ],
  },
  {
    id: 'office',
    title: 'Capítulo 5: La oficina (el cine y la torre)',
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
          { en: "The phone [rings]n. Mr. Rossi [wants]n to speak to Ms. Clark, but she [isn't]n there. I [write]n a message for her.", es: 'Suena el teléfono. El señor Rossi quiere hablar con la señora Clark, pero no está. Le escribo un mensaje.' },
          { en: 'Grace [shows]n me a man in a dark coat outside. She [says]n: "Every day he stands there and looks at our phone. He never calls."', es: 'Grace me muestra a un hombre con abrigo oscuro afuera. Dice: "Todos los días se para ahí y mira nuestro teléfono. Nunca llama".' },
          { en: 'Ms. Clark [has]n the last piece. She [is]n very angry, but I [ask]n: "Could you help me, please?"', es: 'La señora Clark tiene la última pieza. Está muy enojada, pero le pregunto: "¿Podrías ayudarme, por favor?"' },
          { en: 'Now the clock [is]n complete. It [shows]n the old school and a city of the future.', es: 'Ahora el reloj está completo. Muestra la escuela vieja y una ciudad del futuro.' },
          { en: 'Leo [goes]n to get water. At the door, a man in a dark coat [says]n: "Five pieces... Thank you. You are doing my work for me."', es: 'Leo va a buscar agua. En la puerta, un hombre con abrigo oscuro dice: "Cinco piezas... Gracias. Estás haciendo mi trabajo por mí".' },
          { en: 'Leo [says]n: "I always help you." We [touch]n the clock together...', es: 'Leo dice: "Siempre te ayudo". Tocamos el reloj juntos...' },
        ],
        questions: [
          { q: 'What time do you arrive at the office?', options: ['At quarter to nine.', 'At half past nine.', "At nine o'clock."], answer: 1, tip: 'El texto dice: "we arrive at half past nine".' },
          { q: 'What does the man in the dark coat look at every day?', options: ['Our phone.', 'The clocks.', 'The agenda.'], answer: 0, tip: 'Grace dice: "Every day he stands there and looks at our phone".' },
          { q: 'What does the clock show?', options: ['The farm and the park.', 'The old school and a city of the future.', 'Ms. Clark and her phone.'], answer: 1, tip: 'El texto dice: "It shows the old school and a city of the future".' },
          { q: 'What does Leo say?', options: ['"I always help you."', '"I never help you."', '"Could you help me?"'], answer: 0, tip: 'El texto dice: "I always help you".' },
        ],
      },
      {
        id: 'office-past',
        unlock: 'office-past-epilogue',
        tense: 'p',
        tab: 'Pasado',
        title: 'Dear diary (1996)',
        frame: 'Lo escribes esa noche. Es la última página del pasado: fíjate en cuándo pasó cada cosa.',
        lines: [
          { en: 'Dear diary, today we [went]p to an old cinema. Thirty years ago, the office [was]p a cinema!', es: 'Querido diario, hoy fuimos a un cine viejo. ¡Hace treinta años, la oficina era un cine!' },
          { en: 'Mr. Clark [opened]p the cinema in 1980. His daughter Diana [sold]p the tickets.', es: 'El señor Clark abrió el cine en 1980. Su hija Diana vendía las boletas.' },
          { en: 'Ray [said]p: "I fixed it ago two days." I [helped]p him: "two days ago"!', es: 'Ray dijo: "I fixed it ago two days". Lo ayudé: ¡"two days ago"!' },
          { en: 'Grace [sold]p two hundred bags of popcorn last week.', es: 'Grace vendió doscientas bolsas de palomitas la semana pasada.' },
          { en: 'Gary and Kevin [came]p from the present. The light [took]p them home.', es: 'Gary y Kevin vinieron del presente. La luz se los llevó a casa.' },
          { en: 'Diana is Ms. Clark! Ray is Mr. Stone! They [didn\'t forget]p their cinema.', es: '¡Diana es la señora Clark! ¡Ray es el señor Stone! No olvidaron su cine.' },
          { en: 'The stranger [watched]p "Two Best Friends" three times. He [said]p: "I know how it ends."', es: 'El desconocido vio "Two Best Friends" tres veces. Dijo: "Sé cómo termina".' },
          { en: 'He [left]p a ticket on the seat: "Be brave." Leo [didn\'t see]p him. He never [sees]n him.', es: 'Dejó una boleta en la butaca: "Be brave". Leo no lo vio. Nunca lo ve.' },
          { en: 'Now I have five fragments of my past voice. Tomorrow... the future?', es: 'Ahora tengo cinco fragmentos de mi voz del pasado. Mañana... ¿el futuro?' },
        ],
        questions: [
          { q: 'When did Mr. Clark open the cinema?', options: ['In 1980.', 'Last week.', 'Two days ago.'], answer: 0, tip: 'El diario dice: "Mr. Clark opened the cinema in 1980".' },
          { q: 'What was the office thirty years ago?', options: ['A farm.', 'A cinema.', 'A school.'], answer: 1, tip: 'El diario dice: "Thirty years ago, the office was a cinema!".' },
          { q: 'Which sentence is correct?', options: ['I fixed it ago two days.', 'I fixed it two days ago.', 'I fixed it before two days.'], answer: 1, tip: 'Ago va después del tiempo.' },
          { q: 'How many times did the stranger watch the film?', options: ['One time.', 'Two times.', 'Three times.'], answer: 2, tip: 'El diario dice: "three times".' },
        ],
      },
      {
        id: 'office-future',
        unlock: 'office-future-epilogue',
        tense: 'f',
        tab: 'Futuro',
        title: "Diana's speech notes",
        frame: 'Las notas que Diana, la señora Clark, escribió la noche anterior para su discurso de despedida. Al día siguiente te pide ayuda para ordenarlo. Fíjate en want to y would like to: lo que Diana quiere decir y hacer.',
        lines: [
          { en: 'Tomorrow [is]n my last day in Green Valley Tower.', es: 'Mañana es mi último día en la torre Green Valley.' },
          { en: 'I [would like to say]n goodbye with a big smile.', es: 'Me gustaría despedirme con una gran sonrisa.' },
          { en: "First, I [want to talk]n about 1996: my father's cinema, the tickets, and Ray with the old projector.", es: 'Primero quiero hablar de 1996: el cine de mi papá, las boletas y Ray con el proyector viejo.' },
          { en: 'Then, today: three hundred people [work]n in this tower.', es: 'Luego, hoy: trescientas personas trabajan en esta torre.' },
          { en: 'Tomorrow, Paula [is going to be]f the new director.', es: 'Mañana Paula va a ser la nueva directora.' },
          { en: 'And me? I [am going to read]f a lot of books!', es: '¿Y yo? ¡Voy a leer muchos libros!' },
          { en: 'I [would like to thank]n everybody.', es: 'Me gustaría darles las gracias a todos.' },
          { en: 'And Ray... I [want to ask]n him a question. [Would]n he [like to open]n the old cinema again, with me?', es: 'Y Ray... Quiero hacerle una pregunta. ¿Le gustaría abrir otra vez el viejo cine conmigo?' },
        ],
        questions: [
          { q: 'What is Paula going to be?', options: ['The receptionist.', 'The new director.', 'A robot.'], answer: 1, tip: 'Las notas dicen: "Tomorrow, Paula is going to be the new director".' },
          { q: 'What would Diana like to do?', options: ['Say goodbye with a big smile.', 'Sit in her chair forever.', 'Close the tower.'], answer: 0, tip: 'Las notas dicen: "I would like to say goodbye with a big smile".' },
          { q: 'Which sentence is correct?', options: ['I want ask Ray a question.', 'I wants to ask Ray a question.', 'I want to ask Ray a question.'], answer: 2, tip: 'I + want to + verbo: I want to ask...' },
          { q: "What did Ray say to Diana's question?", options: ['"Yes, Diana. I would like to."', '"No, I wouldn\'t."', '"I want your chair."'], answer: 0, tip: 'En la torre, Ray dice que sí: "Yes, Diana. I would like to. Very much."' },
        ],
      },
      {
        id: 'office-mix',
        unlock: 'office-future-epilogue',
        tense: 'mix',
        tab: 'Mezcla',
        title: 'One building, three times',
        frame: 'Lo escribes al terminar la torre de 2056, al final de A1. Miras qué fue del cine, de la oficina y de su gente en las tres épocas. Activa "Ver verbos" para ver cada tiempo con su color.',
        lines: [
          { en: 'In 1980, Mr. Clark [opened]p a cinema. In 1996, his daughter Diana [sold]p the tickets, and she [wanted]p to be a director.', es: 'En 1980 el señor Clark abrió un cine. En 1996 su hija Diana vendía las boletas, y quería ser directora.' },
          { en: 'Today, the cinema [is]n an office, and Diana [is]n Ms. Clark, the director.', es: 'Hoy el cine es una oficina, y Diana es la señora Clark, la directora.' },
          { en: "In 1996, Ray [fixed]p the old projector. Today, he [is]n Mr. Stone, the manager. For sixty years, he [wanted]p Diana's chair.", es: 'En 1996 Ray arreglaba el proyector viejo. Hoy es el señor Stone, el gerente. Durante sesenta años quiso la silla de Diana.' },
          { en: 'But in 2056, Ray [said]p: "I didn\'t want an office. I wanted my friends." Now Diana and Ray [are going to open]f the old cinema again.', es: 'Pero en 2056 Ray dijo: "No quería una oficina. Quería a mis amigos". Ahora Diana y Ray van a abrir otra vez el viejo cine.' },
          { en: 'Grace [sold]p popcorn in 1996, and today she [answers]n the phones. In 2056, she [is]n retired, but she [drinks]n coffee with Diana every morning.', es: 'Grace vendía palomitas en 1996, y hoy contesta los teléfonos. En 2056 está jubilada, pero toma café con Diana todas las mañanas.' },
          { en: 'Today, Paula [writes]n a lot of emails. In 2056, she [is going to be]f the new director.', es: 'Hoy Paula escribe muchos correos. En 2056 va a ser la nueva directora.' },
          { en: 'In 1996, the stranger [watched]p "Two Best Friends" three times. He [said]p: "I know how it ends."', es: 'En 1996 el desconocido vio "Two Best Friends" tres veces. Dijo: "Sé cómo termina".' },
          { en: 'On the terrace of the tower, he [said]p: "Hi, hi"... like Leo.', es: 'En la terraza de la torre dijo: "Hi, hi"... como Leo.' },
          { en: 'I [have got]n all my words now: the present, the past and the future. But I [want to know]n who he [is]n.', es: 'Ya tengo todas mis palabras: el presente, el pasado y el futuro. Pero quiero saber quién es.' },
        ],
        questions: [
          { q: 'What did Diana want to be in 1996?', options: ['A teacher.', 'A director.', 'A farmer.'], answer: 1, tip: 'El texto dice: "she wanted to be a director". Hoy es la directora.' },
          { q: 'What did Ray really want?', options: ["Diana's chair.", 'A new office.', 'His friends and his old cinema.'], answer: 2, tip: 'Ray dijo: "I didn\'t want an office. I wanted my friends." Y va a abrir el cine con Diana.' },
          { q: 'Who is going to be the new director in 2056?', options: ['Paula.', 'Grace.', 'Ray.'], answer: 0, tip: 'El texto dice: "In 2056, she is going to be the new director", y habla de Paula.' },
          { q: 'Which sentence is about the future?', options: ['Diana sold tickets.', 'Diana and Ray are going to open the cinema.', 'Grace answers the phones.'], answer: 1, tip: '"Are going to + verbo" habla del futuro. "Sold" es pasado y "answers" es presente.' },
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
  give: 'dar', gives: 'da (give)', gave: 'dio (give)', goodbye: 'adiós', going: 'yendo (be going to = ir a)', got: 'consiguió, recibió, recuperó (get)', greenfield: 'Greenfield (nombre)',
  grimm: 'Grimm (nombre)', had: 'tenía, tenían (have)', has: 'tiene (have)', have: 'tener', he: 'él', help: 'ayudar', helped: 'ayudó, ayudé (help)', helps: 'ayuda (help)', him: 'a él, lo',
  his: 'su (de él)', i: 'yo', in: 'en', introduce: 'presentar', introduced: 'presenté (introduce)', is: 'es, está (to be)', it: 'eso, lo', its: 'su (de una cosa)', key: 'llave',
  kind: 'amable', last: 'pasado, último', leo: 'Leo (nombre)', lopez: 'López (nombre)', lost: 'perdí (lose)', lunch: 'almuerzo', man: 'hombre', max: 'Max (nombre)', me: 'me, a mí',
  mike: 'Mike (nombre)', morning: 'mañana (parte del día)', mr: 'señor', mrs: 'señora', my: 'mi', name: 'nombre', new: 'nuevo', night: 'noche', nobody: 'nadie', not: 'no',
  now: 'ahora', obey: 'obedecer', of: 'de', on: 'en, sobre', one: 'uno', or: 'o', other: 'otro, otros', piece: 'pieza, pedazo', pieces: 'piezas, pedazos', read: 'leer / leí (se escribe igual)',
  rick: 'Rick (nombre)', said: 'dijo, dije, dijimos (say)', say: 'decir', schedule: 'horario', school: 'escuela', spell: 'hechizo', strange: 'extraño, raro', stranger: 'desconocido',
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
  higgins: 'Higgins (nombre)', greg: 'Greg (nombre)', garcia: 'Garcia (nombre)', rosa: 'Rosa (nombre)', lily: 'Lily (nombre)', danny: 'Danny (nombre)', chloe: 'Chloe (nombre)', victor: 'Víctor (nombre)', tony: 'Tony (nombre)', betty: 'Betty (nombre)', kira: 'Kira (nombre)', bo: 'Bo (nombre)', bleeps: 'Bleeps (nombre)', marco: 'Marco (nombre)', sam: 'Sam (nombre)', carmen: 'Carmen (nombre)', hill: 'Hill (nombre)', daniel: 'Daniel (nombre)', joey: 'Joey (nombre)', bill: 'Bill (nombre)', hank: 'Hank (nombre)', lucy: 'Lucy (nombre)', priya: 'Priya (nombre)', patel: 'Patel (nombre)', finn: 'Finn (nombre)', grace: 'Grace (nombre)', diana: 'Diana (nombre)', ray: 'Ray (nombre)', kevin: 'Kevin (nombre)', stone: 'Stone (nombre)', paula: 'Paula (nombre)',
  'grimm-bot': 'GRIMM-BOT (nombre del robot director)', dr: 'doctora, doctor (Dr.)', l: 'L (la letra de la tarjeta)', 'twenty-five': 'veinticinco', 'great-grandpa': 'bisabuelo', valley: 'valle (Green Valley = nombre de la torre)',
}

/** Páginas del diario que el jugador ya abrió jugando (el modo profesor no cuenta) */
export function unlockedPages(opened: string[]) {
  return DIARY.flatMap((chapter) =>
    opened.includes(chapter.unlock)
      ? chapter.versions.filter((version) => !version.unlock || opened.includes(version.unlock)).map((version) => ({ chapter, version }))
      : [],
  )
}

/** Ya se vio la página (o se respondieron sus preguntas, o es el presente de un capítulo ya abierto) */
export function pageSeen(opened: string[], chapter: DiaryChapter, version: DiaryVersion) {
  return (
    opened.includes(`diary-seen-${version.id}`) ||
    opened.includes(`diary-${version.id}`) ||
    (!version.unlock && opened.includes(`diary-open-${chapter.id}`))
  )
}

/** El juego ya avisó de esta página (el diario se abrió solo una vez por ella) */
export function pageNotified(opened: string[], chapter: DiaryChapter, version: DiaryVersion) {
  return opened.includes(`diary-notified-${version.id}`) || pageSeen(opened, chapter, version)
}

/** Cuándo se abre cada página que todavía está cerrada */
export const LOCKED_HINT: Record<Tense | 'mix', string> = {
  n: 'al terminar este lugar',
  p: 'al terminar este lugar en 1996',
  f: 'al terminar este lugar en 2056',
  mix: 'al terminar este lugar en 2056',
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
