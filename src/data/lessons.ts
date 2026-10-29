import type { LessonStep, TopicId } from '../game/types'

/**
 * Lecciones guiadas por Leo. Aparecen la primera vez que el jugador se enfrenta a un tema.
 * Como el protagonista no puede hablar, practica escribiendo en la pizarra ('board').
 */
export const LESSONS: Partial<Record<TopicId, LessonStep[]>> = {
  'to-be': [
    { who: 'leo', text: 'The most important verb is TO BE.', es: 'El verbo más importante es TO BE. Significa "ser" o "estar".', board: ['TO BE', '= ser / estar'] },

    { who: 'leo', text: 'With I, use AM. Look: I am Leo. I am a student.', es: 'Con "I" (yo) se usa "am". Mira: Soy Leo. Soy estudiante.', board: ['I → am', 'I am Leo.'] },
    { who: 'board', text: 'I ___ a student.', board: ['I → am', 'I am Leo.'], choice: { options: ['am', 'is', 'are'], answer: 0, tip: 'Con "I" siempre va "am".' } },

    { who: 'leo', text: 'With YOU, use ARE. You are my new friend!', es: 'Con "you" (tú) se usa "are". ¡Eres mi nuevo amigo!', board: ['You → are', 'You are my friend.'] },
    { who: 'board', text: 'You ___ very smart.', board: ['You → are', 'You are my friend.'], choice: { options: ['is', 'am', 'are'], answer: 2, tip: 'Con "you" siempre va "are".' } },

    { who: 'leo', text: 'With HE, SHE and IT, use IS. She is a teacher. It is a book.', es: 'Con "he" (él), "she" (ella) e "it" (cosa o animal) se usa "is".', board: ['He / She / It → is', 'She is a teacher.'] },
    { who: 'board', text: 'He ___ my brother.', board: ['He / She / It → is', 'She is a teacher.'], choice: { options: ['are', 'is', 'am'], answer: 1, tip: 'Con "he" va "is".' } },
    { who: 'board', text: 'It ___ a big school.', board: ['He / She / It → is', 'It is a book.'], choice: { options: ['is', 'are', 'am'], answer: 0, tip: '"It" es para cosas, y con "it" va "is".' } },

    { who: 'leo', text: 'With WE and THEY, use ARE. We are friends. They are students.', es: 'Con "we" (nosotros) y "they" (ellos) se usa "are".', board: ['We / They → are', 'They are students.'], table: {"head": ["Sujeto", "to be", "Ejemplo"], "rows": [["<I>", "[am]", "<I> [am] Leo."], ["<You>", "[are]", "<You> [are] my friend."], ["<He> · <She> · <It>", "[is]", "<She> [is] a teacher."], ["<We>", "[are]", "<We> [are] friends."], ["<They>", "[are]", "<They> [are] students."]]} },
    { who: 'board', text: 'We ___ in the classroom.', board: ['We / They → are', 'We are friends.'], choice: { options: ['am', 'are', 'is'], answer: 1, tip: '"We" es plural, así que va "are".' } },

    { who: 'leo', text: "To say no, add NOT. I am not sad. He isn't here. They aren't late.", es: 'Para negar, agrega "not". Se puede contraer: is not = isn\'t, are not = aren\'t.', board: ['+ not', "isn't · aren't"], table: {"head": ["Completo", "Corto"], "rows": [["<I> [am] {not}", "<I>'[m] {not}"], ["<He> [is] {not}", "<He> [is]{n't}"], ["<They> [are] {not}", "<They> [are]{n't}"]]} },
    { who: 'board', text: 'They ___ at home.', board: ['+ not', "isn't · aren't"], choice: { options: ["isn't", "aren't", 'am not'], answer: 1, tip: '"They" va con "are", y su negación es "aren\'t".' } },

    { who: 'leo', text: 'To ask, put the verb first. Are you OK? Is she here?', es: 'Para preguntar, el verbo va primero: You are OK → Are you OK?', board: ['¿Pregunta?', 'Are you OK?'], table: {"head": ["Afirmativa", "Pregunta"], "rows": [["<You> [are] OK.", "[Are] <you> OK?"], ["<She> [is] here.", "[Is] <she> here?"], ["<I> [am] late.", "[Am] <I> late?"]]} },
    { who: 'board', text: '___ he your teacher?', board: ['¿Pregunta?', 'Is she here?'], choice: { options: ['Are', 'Am', 'Is'], answer: 2, tip: 'Con "he" la pregunta empieza con "Is".' } },

    { who: 'leo', text: 'Careful! Some students say things like "She are happy". That is wrong! You can correct them.', es: '¡Cuidado! Algunos estudiantes dicen cosas como "She are happy". ¡Eso está mal! Puedes corregirlos.', board: ['She are happy ✗', 'She is happy ✓'] },
    { who: 'leo', text: 'Great! Now you know TO BE. Let me know you better!', es: '¡Genial! Ya conoces TO BE. ¡Déjame conocerte mejor!', board: ['I am · You are', 'He / She / It is'] },
  ],

  possessives: [
    { who: 'leo', text: 'Wait! This student talks about things like MY bag and HER book. Let me help you first.', es: '¡Espera! Este estudiante habla de cosas como "mi mochila" y "su libro". Déjame ayudarte primero.' },
    { who: 'leo', text: 'To say who has something, use MY, YOUR, HIS, HER... before the thing.', es: 'Para decir de quién es algo, usa my, your, his, her... antes de la cosa.', board: ['¿De quién es?', 'my · your · his · her'] },

    { who: 'leo', text: 'I → MY. My name is Leo. Not "me name"!', es: 'I → my. "My name is Leo". ¡No se dice "me name"!', board: ['I → my', 'My name is Leo.'] },
    { who: 'board', text: 'I am Ana. ___ name is Ana.', board: ['I → my', 'My name is Leo.'], choice: { options: ['Me', 'My', 'I'], answer: 1, tip: 'Antes de un sustantivo va "my". "Me" significa "a mí".' } },

    { who: 'leo', text: 'YOU → YOUR. Is this your bag?', es: 'You → your. ¿Es esta tu mochila?', board: ['You → your', 'Is this your bag?'] },
    { who: 'board', text: 'What is ___ name?', board: ['You → your', 'Is this your bag?'], choice: { options: ['your', 'you', "you're"], answer: 0, tip: '"Your" significa "tu". "You\'re" es "you are".' } },

    { who: 'leo', text: 'HE → HIS, SHE → HER. His name is Tom. Her name is Maya.', es: 'He → his (de él). She → her (de ella).', board: ['He → his · She → her', 'Her name is Maya.'] },
    { who: 'board', text: 'Maya is my friend. ___ bag is pink.', board: ['He → his · She → her', 'Her name is Maya.'], choice: { options: ['His', 'Her', 'She'], answer: 1, tip: 'Maya es mujer, así que es "her bag".' } },
    { who: 'board', text: 'Tom is my brother. ___ bike is red.', board: ['He → his · She → her', 'His name is Tom.'], choice: { options: ['His', 'He', 'Her'], answer: 0, tip: 'Tom es hombre, así que es "his bike".' } },

    { who: 'leo', text: "IT → ITS, for animals and things. The dog loves its ball. No apostrophe!", es: 'It → its, para animales y cosas. Sin apóstrofo: "it\'s" significa "it is".', board: ['It → its', 'The dog loves its ball.'] },
    { who: 'board', text: 'The cat is hungry. ___ bowl is empty.', board: ['It → its', 'The dog loves its ball.'], choice: { options: ["It's", 'It', 'Its'], answer: 2, tip: '"Its" sin apóstrofo es el posesivo. "It\'s" es "it is".' } },

    { who: 'leo', text: 'WE → OUR, THEY → THEIR. Our school is big. Their teacher is Mr. Grimm.', es: 'We → our (nuestro). They → their (de ellos).', board: ['We → our · They → their', 'Our school is big.'] },
    { who: 'board', text: 'They are students. ___ teacher is nice.', board: ['We → our · They → their', 'Our school is big.'], choice: { options: ['There', 'Their', 'They'], answer: 1, tip: '"Their" es "de ellos". "There" significa "allí".' } },

    { who: 'leo', text: "With names, add 's. Maya's bag. Leo's pen.", es: "Con nombres se agrega 's: Maya's bag = la mochila de Maya.", board: ["Name + 's", "Maya's bag"] },
    { who: 'board', text: 'This pen is from Leo. It is ___ pen.', board: ["Name + 's", "Maya's bag"], choice: { options: ['Leos', "Leo's", 'Leo'], answer: 1, tip: "Se agrega 's al nombre: Leo's pen." } },

    { who: 'leo', text: "You've got it! Now go and get your words back!", es: '¡Lo tienes! ¡Ahora ve a recuperar tus palabras!', board: ['my · your · his · her', 'its · our · their'], table: {"head": ["Persona", "Posesivo", "Ejemplo"], "rows": [["<I>", "{my}", "{my} name"], ["<you>", "{your}", "{your} bag"], ["<he>", "{his}", "{his} bike"], ["<she>", "{her}", "{her} book"], ["<it>", "{its}", "{its} ball"], ["<we>", "{our}", "{our} school"], ["<they>", "{their}", "{their} teacher"], ["Maya", "Maya{'s}", "Maya{'s} bag"]]} },
  ],

  prepositions: [
    { who: 'leo', text: "Your things are everywhere! Let's learn how to say WHERE things are.", es: '¡Tus cosas están por todas partes! Aprendamos a decir DÓNDE están las cosas.', board: ['Where is it?', '¿Dónde está?'] },
    { who: 'leo', text: 'IN means inside. The pencil is in the bag.', es: '"In" es dentro de. El lápiz está dentro de la mochila.', board: ['in = dentro', 'The pencil is in the bag.'] },
    { who: 'board', text: 'The books are ___ the box.', board: ['in = dentro', 'The pencil is in the bag.'], choice: { options: ['in', 'on', 'under'], answer: 0, tip: 'Dentro de la caja: in the box.' } },
    { who: 'leo', text: 'ON means on top. The book is on the desk.', es: '"On" es encima, tocando. El libro está sobre el pupitre.', board: ['on = encima', 'The book is on the desk.'] },
    { who: 'leo', text: 'UNDER means below. The bag is under the chair.', es: '"Under" es debajo. La mochila está debajo de la silla.', board: ['under = debajo', 'The bag is under the chair.'] },
    { who: 'board', text: 'The cat is ___ the table. (debajo)', board: ['on = encima · under = debajo', 'The bag is under the chair.'], choice: { options: ['on', 'under', 'in'], answer: 1, tip: 'Debajo de = under.' } },
    { who: 'leo', text: 'NEXT TO means beside. Ana is next to the window. Always with TO!', es: '"Next to" es al lado de. ¡Siempre con "to"!', board: ['next to = al lado de', 'Ana is next to the window.'] },
    { who: 'leo', text: 'BETWEEN is for two things. The board is between the windows.', es: '"Between" es entre dos cosas.', board: ['between = entre', 'between A and B'] },
    { who: 'board', text: 'I sit ___ Leo and Maya.', board: ['between = entre', 'between A and B'], choice: { options: ['next to', 'between', 'on'], answer: 1, tip: 'Entre dos personas: between Leo and Maya.' } },
    { who: 'leo', text: 'IN FRONT OF and BEHIND. The teacher is in front of the class. The ball is behind the tree.', es: '"In front of" es delante de. "Behind" es detrás de.', board: ['in front of = delante', 'behind = detrás'] },
    { who: 'board', text: 'The teacher stands ___ the students.', board: ['in front of = delante', 'behind = detrás'], choice: { options: ['in front of', 'in front', 'front of'], answer: 0, tip: 'Se dice completo: in front of.' } },
    { who: 'leo', text: 'To ask, say: WHERE IS...? Where is my pen? It is on the desk.', es: 'Para preguntar: Where is...? ¿Dónde está mi bolígrafo? Está sobre el pupitre.', board: ['Where is my pen?', 'It is on the desk.'] },
    { who: 'leo', text: "Great! Now help Ana find your school things.", es: '¡Genial! Ahora ayuda a Ana a encontrar tus útiles.', board: ['in · on · under', 'next to · between'], table: {"head": ["Inglés", "Español"], "rows": [["{in}", "dentro de"], ["{on}", "encima de"], ["{under}", "debajo de"], ["{next to}", "al lado de"], ["{between}", "entre"], ["{in front of}", "delante de"], ["{behind}", "detrás de"]]} },
  ],

  imperatives: [
    { who: 'leo', text: 'Teachers and coaches give orders. In English, orders are easy!', es: 'Los profesores y entrenadores dan órdenes. ¡En inglés las órdenes son fáciles!', board: ['Orders', 'Órdenes'] },
    { who: 'leo', text: 'Start with the verb. No "you", no -s. Run! Jump! Open the door!', es: 'Empieza con el verbo. Sin "you" y sin -s. ¡Corre! ¡Salta! ¡Abre la puerta!', board: ['Verb + ...', 'Open the door!'] },
    { who: 'board', text: '___ the ball!', board: ['Verb + ...', 'Open the door!'], choice: { options: ['Kicks', 'Kick', 'You kicks'], answer: 1, tip: 'Verbo base, sin -s y sin "you": Kick the ball!' } },
    { who: 'leo', text: "To say NO, use DON'T. Don't run! Don't talk!", es: "Para prohibir, usa \"don't\". ¡No corras! ¡No hables!", board: ["Don't + verb", "Don't run!"], table: {"head": ["Orden", "Prohibición"], "rows": [["[Run]!", "[Don't run]!"], ["[Talk]!", "[Don't talk]!"], ["[Open] the door.", "[Don't open] the door."]]} },
    { who: 'board', text: '___ eat in the library!', board: ["Don't + verb", "Don't run!"], choice: { options: ['No', "Don't", 'Not'], answer: 1, tip: "Para prohibir: Don't + verbo." } },
    { who: 'leo', text: "With TO BE, say BE. Be quiet! Be careful! Don't be late!", es: 'Con "to be" se dice "be". ¡Silencio! ¡Ten cuidado! ¡No llegues tarde!', board: ['Be quiet!', "Don't be late!"] },
    { who: 'board', text: '___ careful! The floor is wet.', board: ['Be quiet!', "Don't be late!"], choice: { options: ['Are', 'Is', 'Be'], answer: 2, tip: 'La orden de "to be" es "Be": Be careful!' } },
    { who: 'leo', text: 'Add PLEASE to be polite. Sit down, please.', es: 'Agrega "please" para ser amable. Siéntate, por favor.', board: ['..., please.', 'Sit down, please.'] },
    { who: 'leo', text: "Perfect! Now listen to the coach. Do what he says!", es: '¡Perfecto! Ahora escucha al entrenador. ¡Haz lo que dice!', board: ['Run! Jump!', "Don't stop!"] },
  ],

  'there-is': [
    { who: 'leo', text: "Wow, the city is big! Let's learn to say what there is in a place.", es: '¡Guau, la ciudad es grande! Aprendamos a decir qué hay en un lugar.', board: ['There is / There are', '= hay'] },
    { who: 'leo', text: 'For one thing, say THERE IS. There is a bank on Main Street.', es: 'Para una cosa: "There is". Hay un banco en Main Street.', board: ['There is + una cosa', 'There is a bank.'] },
    { who: 'leo', text: 'For two or more, say THERE ARE. There are two cafés.', es: 'Para dos o más: "There are". Hay dos cafés.', board: ['There are + varias', 'There are two cafés.'] },
    { who: 'board', text: 'There ___ a fountain in the plaza.', board: ['There is + una cosa', 'There are + varias'], choice: { options: ['is', 'are', 'have'], answer: 0, tip: 'Una fuente: There is.' } },
    { who: 'board', text: 'There ___ three shops on this street.', board: ['There is + una cosa', 'There are + varias'], choice: { options: ['is', 'are', 'have'], answer: 1, tip: 'Tres tiendas: There are.' } },
    { who: 'leo', text: 'To ask: Is there a bank? Are there any shops? Never "there have"!', es: 'Para preguntar: Is there...? Are there any...? ¡Nunca "there have"!', board: ['Is there a...?', 'Are there any...?'], table: {"head": ["", "Una cosa", "Varias"], "rows": [["Afirmativa", "<There> [is] a bank.", "<There> [are] two cafés."], ["Negativa", "<There> [is]{n't} a bank.", "<There> [are]{n't} {any} shops."], ["Pregunta", "[Is] <there> a bank?", "[Are] <there> {any} shops?"]]} },
    { who: 'leo', text: 'Directions are orders: Go straight. Turn left. Turn right. It is on your left.', es: 'Las direcciones son órdenes: Sigue derecho. Gira a la izquierda. Gira a la derecha. Está a tu izquierda.', board: ['Go straight · Turn left', 'It is on your right.'] },
    { who: 'board', text: '___ straight and turn right.', board: ['Go straight · Turn left', 'It is on your right.'], choice: { options: ['Goes', 'Go', 'Going'], answer: 1, tip: 'Las direcciones usan el verbo base: Go straight.' } },
    { who: 'leo', text: "Great! Now you can find any place in the city.", es: '¡Genial! Ahora puedes encontrar cualquier lugar de la ciudad.', board: ['There is · There are', 'Go · Turn left / right'] },
  ],

  demonstratives: [
    { who: 'leo', text: 'In a shop, you point at things. Here is the secret: near or far? One or many?', es: 'En una tienda señalas cosas. El secreto: ¿cerca o lejos? ¿Una o varias?', board: ['¿Cerca o lejos?', '¿Una o varias?'] },
    { who: 'leo', text: 'Near me: THIS (one) and THESE (many). This jacket. These shoes.', es: 'Cerca: "this" (una) y "these" (varias). Esta chaqueta. Estos zapatos.', board: ['Cerca: this · these', 'This jacket. These shoes.'] },
    { who: 'board', text: '___ shoes are nice. (cerca)', board: ['Cerca: this · these', 'This jacket. These shoes.'], choice: { options: ['This', 'These', 'Those'], answer: 1, tip: 'Varias cosas cerca: these.' } },
    { who: 'leo', text: 'Far from me: THAT (one) and THOSE (many). That dress. Those T-shirts.', es: 'Lejos: "that" (una) y "those" (varias). Ese vestido. Esas camisetas.', board: ['Lejos: that · those', 'Those T-shirts.'], table: {"head": ["", "Una", "Varias"], "rows": [["Cerca", "{this} jacket", "{these} shoes"], ["Lejos", "{that} dress", "{those} T-shirts"]]} },
    { who: 'board', text: 'Look at ___ T-shirt over there!', board: ['Lejos: that · those', 'Those T-shirts.'], choice: { options: ['that', 'these', 'this'], answer: 0, tip: 'Una cosa lejos: that.' } },
    { who: 'leo', text: 'For many things, add -S: shirt, shirts. After -s, -sh, -ch, -x add -ES: dress, dresses.', es: 'Para el plural se agrega -s. Después de -s, -sh, -ch o -x se agrega -es.', board: ['shirt → shirts', 'dress → dresses'], table: {"arrow": true, "head": ["Una", "Varias"], "rows": [["shirt", "shirt{s}"], ["dress", "dress{es}"], ["sandwich", "sandwich{es}"], ["box", "box{es}"]]} },
    { who: 'leo', text: 'Prices: How much is this? How much are these? It is ten dollars.', es: 'Precios: ¿Cuánto cuesta esto? ¿Cuánto cuestan estos? Cuesta diez dólares.', board: ['How much is this?', 'How much are these?'] },
    { who: 'board', text: 'How much ___ these jeans?', board: ['How much is this?', 'How much are these?'], choice: { options: ['is', 'are', 'am'], answer: 1, tip: 'Varias cosas: How much are...?' } },
    { who: 'leo', text: 'Careful with numbers: thirteen is 13, thirty is 30. Listen to the end!', es: 'Cuidado con los números: thirteen es 13 y thirty es 30. ¡Escucha el final!', board: ['13 thirteen · 30 thirty', '15 fifteen · 50 fifty'] },
  ],

  ordering: [
    { who: 'leo', text: "I'm hungry! In a café, ask politely: Can I have a juice, please?", es: '¡Tengo hambre! En un café se pide con amabilidad: ¿Me da un jugo, por favor?', board: ['Can I have ..., please?', '¿Me da..., por favor?'] },
    { who: 'board', text: '___ I have a sandwich, please?', board: ['Can I have ..., please?', '¿Me da..., por favor?'], choice: { options: ['Do', 'Can', 'Am'], answer: 1, tip: 'Para pedir: Can I have...?' } },
    { who: 'leo', text: 'Use A before a consonant sound, and AN before a vowel sound: a sandwich, an apple.', es: '"A" antes de sonido de consonante y "an" antes de sonido de vocal.', board: ['a sandwich', 'an apple'], table: {"head": ["a + consonante", "an + vocal"], "rows": [["{a} sandwich", "{an} apple"], ["{a} juice", "{an} orange"], ["{a} cake", "{an} egg"]]} },
    { who: 'board', text: 'Can I have ___ orange, please?', board: ['a sandwich', 'an apple'], choice: { options: ['a', 'an', 'any'], answer: 1, tip: '"Orange" empieza con vocal: an orange.' } },
    { who: 'leo', text: "Some things you can't count: water, milk, coffee. Say SOME water, not a water.", es: 'Algunas cosas no se cuentan: agua, leche, café. Se dice "some water", no "a water".', board: ['some water', 'some milk'] },
    { who: 'leo', text: 'In questions, use ANY: Is there any milk? Are there any cookies?', es: 'En preguntas se usa "any".', board: ['some → frases', 'any → preguntas'], table: {"head": ["Afirmativa", "Pregunta"], "rows": [["There is {some} milk.", "Is there {any} milk?"], ["There are {some} cookies.", "Are there {any} cookies?"]]} },
    { who: 'board', text: 'Is there ___ cake?', board: ['some → frases', 'any → preguntas'], choice: { options: ['a', 'some', 'any'], answer: 2, tip: 'En preguntas: any.' } },
    { who: 'leo', text: "When they give you something, they say: Here you are. And you say: Thank you!", es: 'Cuando te entregan algo dicen "Here you are". Y tú dices "Thank you!".', board: ['Here you are.', 'Thank you!'] },
  ],

  'present-simple': [
    { who: 'leo', text: 'Welcome to my street! Here, people have routines: things they do every day.', es: '¡Bienvenido a mi calle! Aquí la gente tiene rutinas: cosas que hace todos los días.', board: ['Present simple', '= rutinas'] },
    { who: 'leo', text: 'With I, you, we and they, the verb is simple: I get up at seven. We have dinner at eight.', es: 'Con I, you, we y they el verbo va tal cual: Me levanto a las siete. Cenamos a las ocho.', board: ['I / you / we / they + verbo', 'I get up at seven.'] },
    { who: 'board', text: 'We ___ in a small house.', board: ['I / you / we / they + verbo', 'I get up at seven.'], choice: { options: ['live', 'lives', 'living'], answer: 0, tip: 'Con "we" el verbo va sin -s.' } },
    { who: 'leo', text: 'But with HE, SHE and IT, add -S! My dad works. My sister plays the guitar.', es: 'Pero con he, she e it, ¡agrega -s! Mi papá trabaja. Mi hermana toca la guitarra.', board: ['he / she / it + verbo-s', 'My dad works.'], table: {"head": ["Sujeto", "Verbo"], "rows": [["<I> · <you> · <we> · <they>", "[work] · [play]"], ["<he> · <she> · <it>", "[work]{s} · [play]{s}"]]} },
    { who: 'board', text: 'My mom ___ in a bank.', board: ['he / she / it + verbo-s', 'My dad works.'], choice: { options: ['work', 'works', 'working'], answer: 1, tip: '"My mom" es "she": works.' } },
    { who: 'leo', text: 'After -s, -sh, -ch and -o, add -ES: go → goes, watch → watches. And study → studies.', es: 'Después de -s, -sh, -ch y -o se agrega -es. Y consonante + y cambia a -ies.', board: ['go → goes · watch → watches', 'study → studies'], table: {"arrow": true, "head": ["Verbo", "con he / she / it"], "rows": [["play", "play{s}"], ["go", "go{es}"], ["watch", "watch{es}"], ["study", "stud{ies}"]]} },
    { who: 'board', text: 'Leo ___ to school by bus.', board: ['go → goes · watch → watches', 'study → studies'], choice: { options: ['go', 'gos', 'goes'], answer: 2, tip: 'go con he, she, it: goes.' } },
    { who: 'leo', text: 'How often? Always, usually, sometimes, never. They go BEFORE the verb: I always eat breakfast.', es: '¿Con qué frecuencia? Siempre, normalmente, a veces, nunca. Van ANTES del verbo.', board: ['always · usually · sometimes · never', 'I always eat breakfast.'], table: {"head": ["Frecuencia", "Español"], "rows": [["{always}", "siempre (100%)"], ["{usually}", "normalmente"], ["{sometimes}", "a veces"], ["{never}", "nunca (0%)"]]} },
    { who: 'leo', text: 'But with TO BE, they go AFTER: I am never late. Ha ha... I am always late!', es: 'Pero con TO BE van DESPUÉS: Nunca llego tarde. Ja, ja... ¡yo siempre llego tarde!', board: ['to be + never', 'I am never late.'] },
    { who: 'board', text: 'She ___ breakfast. She is always hungry at school!', board: ['always · usually · sometimes · never', 'to be + never'], choice: { options: ['never eats', 'eats never', 'never eat'], answer: 0, tip: 'never va antes del verbo, y con "she" el verbo lleva -s: never eats.' } },
  ],

  likes: [
    { who: 'leo', text: 'Maya and her dad love talking about hobbies. Let\'s learn to say what you like!', es: 'A Maya y a su papá les encanta hablar de pasatiempos. ¡Aprendamos a decir lo que te gusta!', board: ['like · love · hate', 'gustar · encantar · odiar'] },
    { who: 'leo', text: 'After like, love and hate, the verb takes -ING: I like reading. I love dancing.', es: 'Después de like, love y hate el verbo lleva -ing: Me gusta leer. Me encanta bailar.', board: ['like + verbo-ing', 'I like reading.'] },
    { who: 'board', text: 'I love ___ to music.', board: ['like + verbo-ing', 'I like reading.'], choice: { options: ['listen', 'listening', 'listens'], answer: 1, tip: 'Después de love: listening.' } },
    { who: 'leo', text: 'Careful with the -ing! Some verbs lose the E, and some double the last letter. Look!', es: 'Cuidado: dance → dancing (sin e). Run → running, swim → swimming (letra doble).', board: ['dance → dancing', 'run → running · swim → swimming'], table: {"arrow": true, "head": ["Verbo", "con -ing"], "rows": [["read", "read{ing}"], ["dance", "danc{ing}"], ["run", "run{ning}"], ["swim", "swim{ming}"]]} },
    { who: 'board', text: 'Do you like ___?', board: ['dance → dancing', 'run → running · swim → swimming'], choice: { options: ['swiming', 'swimming', 'swim'], answer: 1, tip: 'swim → swimming, con doble m.' } },
    { who: 'leo', text: 'With he and she, LIKE takes -S: Maya likes drawing. To say no: I don\'t like, he doesn\'t like.', es: 'Con he y she, like lleva -s. Para negar: I don\'t like, he doesn\'t like.', board: ['she likes · he doesn\'t like', "I don't like cooking."], table: {"head": ["", "Afirmativa", "Negativa"], "rows": [["<I>", "<I> [like] cooking.", "<I> [don't like] cooking."], ["<She>", "<She> [like]{s} cooking.", "<She> [doesn't like] cooking."]]} },
    { who: 'board', text: 'Mr. Hill ___ like noise.', board: ['she likes · he doesn\'t like', "I don't like cooking."], choice: { options: ["don't", "doesn't", 'not'], answer: 1, tip: "Con he: doesn't like." } },
  ],

  can: [
    { who: 'leo', text: 'In the park, everybody shows what they CAN do. CAN means you are able to do something.', es: 'En el parque todos muestran lo que pueden hacer. CAN significa que eres capaz de hacer algo.', board: ['can = poder, saber', "can't = no poder"] },
    { who: 'leo', text: 'After CAN, use the simple verb. No TO, no -S: I can swim. She can sing.', es: 'Después de can va el verbo solo: sin "to" y sin -s.', board: ['can + verbo', 'She can sing.'] },
    { who: 'board', text: 'He can ___ very fast.', board: ['can + verbo', 'She can sing.'], choice: { options: ['run', 'runs', 'to run'], answer: 0, tip: 'can + verbo solo: can run.' } },
    { who: 'leo', text: "For NO, say CAN'T: Fish can't walk. I can't drive.", es: "Para negar: can't. Los peces no pueden caminar. No sé manejar.", board: ["can't + verbo", "I can't drive."] },
    { who: 'leo', text: 'To ask, CAN goes first: Can you dance? Yes, I can. No, I can\'t.', es: 'Para preguntar, can va primero.', board: ['Can you dance?', "Yes, I can. / No, I can't."], table: {"head": ["Afirmativa", "Negativa", "Pregunta"], "rows": [["<I> [can] swim.", "<I> [can't] swim.", "[Can] <you> swim?"], ["<She> [can] sing.", "<She> [can't] sing.", "[Can] <she> sing?"]]} },
    { who: 'board', text: '___ you ride a bike?', board: ['Can you dance?', "Yes, I can. / No, I can't."], choice: { options: ['Do', 'Can', 'Are'], answer: 1, tip: 'Pregunta de habilidad: Can you...?' } },
  ],

  'present-continuous': [
    { who: 'leo', text: 'Look around! Things are happening right now. For that, we use AM, IS, ARE + -ING.', es: '¡Mira alrededor! Están pasando cosas ahora mismo. Para eso usamos am, is, are + -ing.', board: ['am / is / are + verbo-ing', '= está pasando ahora'] },
    { who: 'leo', text: 'The dog is running. The children are playing. I am watching them.', es: 'El perro está corriendo. Los niños están jugando. Yo los estoy mirando.', board: ['The dog is running.', 'The kids are playing.'], table: {"head": ["Sujeto", "to be", "verbo-ing"], "rows": [["<I>", "[am]", "[reading]"], ["<He> · <She> · <It>", "[is]", "[running]"], ["<We> · <You> · <They>", "[are]", "[playing]"]]} },
    { who: 'board', text: 'Look! The kids ___ playing football.', board: ['The dog is running.', 'The kids are playing.'], choice: { options: ['is', 'are', 'am'], answer: 1, tip: '"The kids" son varios: are playing.' } },
    { who: 'board', text: 'The baby is ___.', board: ['am / is / are + verbo-ing', '= está pasando ahora'], choice: { options: ['sleep', 'sleeps', 'sleeping'], answer: 2, tip: 'is + verbo con -ing.' } },
    { who: 'leo', text: 'Do not forget AM, IS or ARE! "The kids playing" is wrong. "The kids ARE playing" is right.', es: '¡No olvides am, is o are! "The kids playing" está mal.', board: ['✗ The kids playing.', '✓ The kids are playing.'] },
    { who: 'leo', text: 'The weather too: It is raining. It is snowing. The sun is shining!', es: 'El clima también: Está lloviendo. Está nevando. ¡Está brillando el sol!', board: ['It is raining.', 'The sun is shining.'] },
    { who: 'leo', text: 'To ask: What are you doing? → I am reading.', es: 'Para preguntar: ¿Qué estás haciendo? → Estoy leyendo.', board: ['What are you doing?', 'I am reading.'] },
  ],

  'have-got': [
    { who: 'leo', text: 'This is your house! To talk about your family and your things, use HAVE GOT.', es: '¡Esta es tu casa! Para hablar de tu familia y tus cosas se usa HAVE GOT.', board: ['have got = tener', 'I have got a brother.'] },
    { who: 'leo', text: 'I, you, we, they: HAVE GOT. He, she, it: HAS GOT. I have got a dog. Leo has got a sister.', es: 'I, you, we, they: have got. He, she, it: has got.', board: ['I / you / we / they → have got', 'he / she / it → has got'], table: {"head": ["Sujeto", "Afirmativa", "Negativa"], "rows": [["<I> · <you> · <we> · <they>", "[have got]", "[haven't got]"], ["<he> · <she> · <it>", "[has got]", "[hasn't got]"]]} },
    { who: 'board', text: 'Your brother ___ got a bike.', board: ['I / you / we / they → have got', 'he / she / it → has got'], choice: { options: ['have', 'has', 'is'], answer: 1, tip: '"Your brother" es "he": has got.' } },
    { who: 'leo', text: "To say no: I haven't got a cat. She hasn't got any brothers.", es: "Para negar: haven't got / hasn't got.", board: ["haven't got · hasn't got", "I haven't got a cat."] },
    { who: 'leo', text: 'To ask, HAVE goes first: Have you got a pet? Yes, I have. No, I haven\'t.', es: 'Para preguntar, have va primero.', board: ['Have you got a pet?', "Yes, I have. / No, I haven't."], table: {"head": ["Pregunta", "Respuesta"], "rows": [["[Have] <you> [got] a pet?", "Yes, I [have]. · No, I [haven't]."], ["[Has] <she> [got] a cat?", "Yes, she [has]. · No, she [hasn't]."]]} },
    { who: 'board', text: '___ you got a sister?', board: ['Have you got a pet?', "Yes, I have. / No, I haven't."], choice: { options: ['Do', 'Have', 'Has'], answer: 1, tip: 'Con you: Have you got...?' } },
    { who: 'leo', text: 'Your brother is in there. He says everything without -S! Remember: he goes, she works, it has got.', es: 'Tu hermano está ahí dentro. ¡Dice todo sin -s! Recuerda: he goes, she works, it has got.', board: ['he goes · she works', 'it has got'] },
  ],

  'do-does': [
    { who: 'leo', text: 'On the farm, everybody asks questions. To ask in the present, use DO or DOES.', es: 'En la granja todos hacen preguntas. Para preguntar en presente se usa DO o DOES.', board: ['Do / Does + ...?', '= ¿...?'] },
    { who: 'leo', text: 'With I, you, we and they: DO. Do you like horses? Do the cows sleep here?', es: 'Con I, you, we y they: DO.', board: ['Do + you / we / they', 'Do you like horses?'] },
    { who: 'board', text: '___ you live on a farm?', board: ['Do + you / we / they', 'Do you like horses?'], choice: { options: ['Do', 'Does', 'Are'], answer: 0, tip: 'Con you: Do.' } },
    { who: 'leo', text: 'With he, she and it: DOES. And the verb loses the -S! Does the cow eat grass? Not "eats".', es: 'Con he, she e it: DOES. ¡Y el verbo pierde la -s! No se dice "Does the cow eats".', board: ['Does + he / she / it + verbo', 'Does the cow eat grass?'] },
    { who: 'board', text: 'Does the horse ___ fast?', board: ['Does + he / she / it + verbo', 'Does the cow eat grass?'], choice: { options: ['runs', 'run', 'running'], answer: 1, tip: 'Después de does el verbo va sin -s: run.' } },
    { who: 'leo', text: "To say NO: DON'T or DOESN'T, and the verb without -S. Pigs don't fly. The horse doesn't eat meat.", es: "Para negar: don't o doesn't, y el verbo sin -s.", board: ["don't / doesn't + verbo", "The horse doesn't eat meat."], table: {"head": ["", "I · you · we · they", "he · she · it"], "rows": [["Afirmativa", "<They> [eat] grass.", "<It> [eat]{s} grass."], ["Negativa", "<They> [don't eat] grass.", "<It> [doesn't eat] grass."], ["Pregunta", "[Do] <they> [eat] grass?", "[Does] <it> [eat] grass?"]]} },
    { who: 'board', text: "The cat ___ like water.", board: ["don't / doesn't + verbo", "The horse doesn't eat meat."], choice: { options: ["don't", "doesn't", 'not'], answer: 1, tip: "The cat es it: doesn't." } },
    { who: 'leo', text: "Short answers: Does it swim? Yes, it does. No, it doesn't. Do they fly? Yes, they do. No, they don't.", es: 'Respuestas cortas: se repite does o do.', board: ["Yes, it does. / No, it doesn't.", "Yes, they do. / No, they don't."], table: {"head": ["Pregunta", "Sí", "No"], "rows": [["[Does] <it> swim?", "Yes, it [does].", "No, it [doesn't]."], ["[Do] <they> fly?", "Yes, they [do].", "No, they [don't]."]]} },
  ],

  plurals: [
    { who: 'leo', text: 'One cow, two cows. Easy! But some animals are strange in the plural.', es: 'Una vaca, dos vacas. ¡Fácil! Pero algunos animales son raros en plural.', board: ['cow → cows', 'horse → horses'] },
    { who: 'leo', text: 'SHEEP is the same: one sheep, ten sheep. Never "sheeps"!', es: 'SHEEP no cambia: una oveja, diez ovejas. ¡Nunca "sheeps"!', board: ['one sheep', 'ten sheep'] },
    { who: 'board', text: 'There are five ___ in the pen.', board: ['one sheep', 'ten sheep'], choice: { options: ['sheeps', 'sheep', 'sheepes'], answer: 1, tip: 'Sheep es igual en plural.' } },
    { who: 'leo', text: 'Some animals change inside: one goose, two geese. One mouse, two mice!', es: 'GOOSE → GEESE. MOUSE → MICE. ¡Cambian por dentro!', board: ['goose → geese', 'mouse → mice'], table: {"arrow": true, "head": ["Una", "Varias"], "rows": [["cow", "cow{s}"], ["sheep", "{sheep}"], ["goose", "{geese}"], ["mouse", "{mice}"]]} },
    { who: 'board', text: 'The cat catches three ___.', board: ['goose → geese', 'mouse → mice'], choice: { options: ['mouses', 'mice', 'mices'], answer: 1, tip: 'mouse → mice.' } },
    { who: 'leo', text: 'People change too, and some parts of the body. Look at the table!', es: 'Las personas también: niño → niños, hombre → hombres, mujer → mujeres. Y pie → pies, diente → dientes.', board: ['child → children', 'foot → feet'], table: {"arrow": true, "head": ["Uno", "Varios"], "rows": [["child", "{children}"], ["man", "{men}"], ["woman", "{women}"], ["foot", "{feet}"], ["tooth", "{teeth}"]]} },
  ],

  time: [
    { who: 'leo', text: 'In an office, time is very important! What time is it? Look at the clock.', es: '¡En una oficina la hora es muy importante! ¿Qué hora es? Mira el reloj.', board: ['What time is it?', '¿Qué hora es?'] },
    { who: 'leo', text: "Exact hour: O'CLOCK. It's nine o'clock. Half an hour: HALF PAST. 9:30 is half past nine.", es: "Hora exacta: o'clock. Media hora: half past. 9:30 es half past nine.", board: ["9:00 nine o'clock", '9:30 half past nine'], table: {"head": ["Hora", "Se dice"], "rows": [["9:00", "nine {o'clock}"], ["9:30", "{half past} nine"]]} },
    { who: 'board', text: "It's 6:30. It's ___ six.", board: ["9:00 nine o'clock", '9:30 half past nine'], choice: { options: ['half past', 'half to', 'six and half'], answer: 0, tip: '6:30 = half past six.' } },
    { who: 'leo', text: 'A quarter is 15 minutes. 9:15 is quarter PAST nine. 9:45 is quarter TO ten: fifteen minutes to ten!', es: 'Un cuarto son 15 minutos. 9:15 es quarter past nine. 9:45 es quarter to ten: ¡faltan quince para las diez!', board: ['9:15 quarter past nine', '9:45 quarter to ten'], table: {"head": ["Hora", "Se dice"], "rows": [["9:15", "{quarter past} nine"], ["9:45", "{quarter to} ten"], ["9:10", "{ten past} nine"], ["9:50", "{ten to} ten"]]} },
    { who: 'board', text: "It's 4:45. It's quarter ___ five.", board: ['9:15 quarter past nine', '9:45 quarter to ten'], choice: { options: ['past', 'to', 'and'], answer: 1, tip: 'Faltan 15 minutos para las cinco: quarter to five.' } },
    { who: 'leo', text: 'Now the little words: AT for the hour, ON for the day, IN for months, seasons and parts of the day.', es: 'Ahora las palabras pequeñas: at para la hora, on para el día, in para meses, estaciones y partes del día.', board: ['at 9 · on Monday', 'in May · in summer · in the morning'], table: {"head": ["", "Para", "Ejemplo"], "rows": [["{at}", "la hora", "{at} nine · {at} night"], ["{on}", "el día", "{on} Monday"], ["{in}", "mes, estación, parte del día", "{in} May · {in} summer · {in} the morning"]]} },
    { who: 'board', text: 'The meeting is ___ Tuesday ___ ten o\'clock.', board: ['at 9 · on Monday', 'in May · in summer · in the morning'], choice: { options: ['on / at', 'in / on', 'at / in'], answer: 0, tip: 'on + día, at + hora.' } },
    { who: 'leo', text: 'One strange one: AT NIGHT. In the morning, in the afternoon, in the evening... but at night!', es: 'Una rara: at night. In the morning, in the afternoon, in the evening... ¡pero at night!', board: ['in the morning / evening', 'at night'] },
  ],

  'object-pronouns': [
    { who: 'leo', text: 'In an office, people say: Call me! Send it to her! Help them! These words come AFTER the verb.', es: 'En una oficina la gente dice: ¡Llámame! ¡Envíaselo a ella! ¡Ayúdalos! Estas palabras van DESPUÉS del verbo.', board: ['Call me!', 'Send it to her!'] },
    { who: 'leo', text: 'I becomes ME, he becomes HIM, she becomes HER, we becomes US, they becomes THEM. You and it do not change.', es: 'I → me, he → him, she → her, we → us, they → them. You e it no cambian.', board: ['I → me · he → him · she → her', 'we → us · they → them'], table: {"head": ["Sujeto", "Objeto", "Ejemplo"], "rows": [["<I>", "{me}", "Call {me}."], ["<you>", "{you}", "I see {you}."], ["<he>", "{him}", "Help {him}."], ["<she>", "{her}", "Call {her}."], ["<it>", "{it}", "Send {it}."], ["<we>", "{us}", "Look at {us}."], ["<they>", "{them}", "Tell {them}."]]} },
    { who: 'board', text: 'Ms. Clark is busy. Call ___ later.', board: ['I → me · he → him · she → her', 'we → us · they → them'], choice: { options: ['she', 'her', 'hers'], answer: 1, tip: 'Después del verbo: her.' } },
    { who: 'board', text: 'Could you help ___? I am lost.', board: ['I → me · he → him · she → her', 'we → us · they → them'], choice: { options: ['I', 'me', 'my'], answer: 1, tip: 'Después del verbo: me.' } },
    { who: 'leo', text: 'After to, with and for too: Give it to HIM. I work with THEM. This is for YOU.', es: 'También después de to, with y for.', board: ['to him · with them', 'for you · for us'] },
  ],

  'could-you': [
    { who: 'leo', text: 'In an office we are very polite. Not "Give me the report!" but "Could you give me the report, please?"', es: 'En una oficina somos muy amables. No "¡Dame el informe!", sino "¿Podrías darme el informe, por favor?"', board: ['Could you + verbo, please?', 'Could you help me, please?'], table: {"head": ["Directo", "Con cortesía"], "rows": [["[Give] me the report!", "[Could] <you> [give] me the report, {please}?"], ["[Open] the window!", "[Could] <you> [open] the window, {please}?"]]} },
    { who: 'board', text: '___ you open the door, please?', board: ['Could you + verbo, please?', 'Could you help me, please?'], choice: { options: ['Could', 'Do', 'Are'], answer: 0, tip: 'Para pedir con cortesía: Could you...?' } },
    { who: 'leo', text: 'After COULD, the simple verb. No TO, no -S: Could you send it? Not "could you to send".', es: 'Después de could, el verbo solo: sin to y sin -s.', board: ['Could you send it?', '✗ Could you to send it?'] },
    { who: 'leo', text: 'To ask for permission: COULD I...? Could I speak to Ms. Clark, please?', es: 'Para pedir permiso: Could I...?', board: ['Could I speak to...?', '¿Podría hablar con...?'] },
    { who: 'leo', text: "And the answers: Sure! Of course! Or, if you can't: Sorry, I can't.", es: "Las respuestas: ¡Claro! ¡Por supuesto! O si no puedes: Lo siento, no puedo.", board: ['Sure! · Of course!', "Sorry, I can't."], table: {"head": ["Respuesta", "Significa"], "rows": [["{Sure!} · {Of course!}", "sí, claro"], ["{Sorry, I can't.}", "no, lo siento"]]} },
    { who: 'board', text: "Could you call me at nine? — ___, I can't. I'm busy.", board: ['Sure! · Of course!', "Sorry, I can't."], choice: { options: ['Sure', 'Sorry', 'Of course'], answer: 1, tip: "Para decir que no: Sorry, I can't." } },
  ],
}
