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
    { who: 'leo', text: 'To ask, say HOW OFTEN: How often do you play football? Every day. Once a week. Twice a week.', es: 'Para preguntar se dice How often (¿con qué frecuencia?). Respuestas: todos los días, una vez a la semana, dos veces a la semana.', board: ['How often do you...?', 'every day · once a week · twice a week'] },
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
    { who: 'leo', text: 'For your family and your things, you can also say it without GOT: I have a dog. Leo has a sister. But only for things you have! I have breakfast, NOT I have got breakfast.', es: 'Para la familia y las cosas que tienes también se dice sin got: I have a dog. Leo has a sister. ¡Pero solo cuando significa tener! "Desayuno" es I have breakfast, nunca I have got breakfast.', board: ['tener: I have got a dog. = I have a dog.', 'I have breakfast. (sin got)'] },
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

  'was-were': [
    { who: 'leo', text: 'We are in the past! To talk about the past, TO BE changes: AM and IS become WAS. ARE becomes WERE.', es: '¡Estamos en el pasado! Para hablar del pasado, TO BE cambia: am e is se vuelven was. Are se vuelve were.', board: ['am / is → was', 'are → were'], table: { head: ['Presente', 'Pasado'], rows: [['<I> [am]', '<I> [was]'], ['<He> · <She> · <It> [is]', '<He> · <She> · <It> [was]'], ['<You> · <We> · <They> [are]', '<You> · <We> · <They> [were]']] } },
    { who: 'board', text: 'The school ___ small.', board: ['am / is → was', 'are → were'], choice: { options: ['was', 'were', 'are'], answer: 0, tip: 'Una escuela (it): was.' } },
    { who: 'board', text: 'The students ___ happy.', board: ['am / is → was', 'are → were'], choice: { options: ['was', 'were', 'is'], answer: 1, tip: 'Varios estudiantes (they): were.' } },
    { who: 'leo', text: "To say no: WASN'T and WEREN'T. To ask, the verb goes first: Was he...? Were you...?", es: "Para negar: wasn't y weren't. Para preguntar, el verbo va primero.", board: ["wasn't · weren't", 'Was he...? Were you...?'], table: { head: ['Afirmativa', 'Negativa', 'Pregunta'], rows: [['<He> [was] here.', "<He> [was]{n't} here.", '[Was] <he> here?'], ['<They> [were] late.', "<They> [were]{n't} late.", '[Were] <they> late?']] } },
    { who: 'board', text: '___ you at school yesterday?', board: ["wasn't · weren't", 'Was he...? Were you...?'], choice: { options: ['Was', 'Were', 'Did'], answer: 1, tip: 'Con you: Were you...?' } },
    { who: 'leo', text: 'And THERE IS becomes THERE WAS. THERE ARE becomes THERE WERE. Words like yesterday and ago tell you: it is the past!', es: 'Y "there is" se vuelve "there was", "there are" se vuelve "there were". Palabras como yesterday (ayer) y ago (hace) te avisan: ¡es pasado!', board: ['there was · there were', 'yesterday · ago'], table: { head: ['Una cosa', 'Varias'], rows: [['<There> [was] a bell.', '<There> [were] two bells.'], ['[Was] <there> a bell?', '[Were] <there> {any} bells?']] } },
    { who: 'board', text: 'There ___ twenty students in the class.', board: ['there was · there were', 'yesterday · ago'], choice: { options: ['was', 'were', 'is'], answer: 1, tip: 'Varios estudiantes: there were.' } },
  ],

  'past-regular': [
    { who: 'leo', text: 'To say what happened, most verbs just add -ED: walk, walked. Play, played. Want, wanted. And it is the same for I, you, he, she... everybody!', es: 'Para contar lo que pasó, casi todos los verbos solo agregan -ed. ¡Y es igual para todas las personas: no hay -s con he o she!', board: ['verbo + ed', 'walk → walked'], table: { head: ['Presente', 'Pasado'], rows: [['<I> [walk]', '<I> [walk]{ed}'], ['<She> [plays]', '<She> [play]{ed}'], ['<They> [want]', '<They> [want]{ed}']] } },
    { who: 'board', text: 'Yesterday I ___ to school.', board: ['verbo + ed', 'walk → walked'], choice: { options: ['walked', 'walk', 'walks'], answer: 0, tip: 'Yesterday = pasado: walked.' } },
    { who: 'leo', text: 'Careful with the spelling! Verbs with E at the end: just add D. Consonant plus Y: Y becomes IED. And short verbs like STOP: double the last letter!', es: 'Cuidado con la ortografía: si termina en e, solo -d. Consonante + y: la y se vuelve -ied. Verbos cortos como stop: se dobla la última letra.', board: ['live → lived · study → studied', 'stop → stopped'], table: { head: ['Regla', 'Ejemplo'], rows: [['casi todos: + {ed}', '[walk] → [walk]{ed}'], ['termina en e: + {d}', '[live] → [live]{d}'], ['consonante + y → {ied}', '[study] → [stud]{ied}'], ['vocal + y: + {ed}', '[play] → [play]{ed}'], ['corto (stop, drop): se dobla', '[stop] → [stop]{ped}']] } },
    { who: 'board', text: 'Last night I ___ English.', board: ['live → lived · study → studied', 'stop → stopped'], choice: { options: ['studied', 'studyed', 'studed'], answer: 0, tip: 'Consonante + y: study → studied.' } },
    { who: 'board', text: 'The bus ___ at the market.', board: ['live → lived · study → studied', 'stop → stopped'], choice: { options: ['stopped', 'stoped', 'stopt'], answer: 0, tip: 'Verbo corto: se dobla la p: stopped.' } },
    { who: 'leo', text: 'Now listen! -ED has three sounds. After T or D, it is a new syllable: want-ed, need-ed. After p, k, s, sh, ch, f, it sounds like T: walkt. With other sounds, it sounds like D: playd.', es: '¡Ahora escucha! -ed tiene tres sonidos. Después de t o d suena /ɪd/ (una sílaba más). Después de p, k, s, sh, ch, f suena /t/. Con los demás sonidos suena /d/.', board: ['/t/ walked · /d/ played', '/ɪd/ wanted'], table: { head: ['/t/', '/d/', '/ɪd/'], rows: [['walk{ed}', 'play{ed}', 'want{ed}'], ['stopp{ed}', 'live{d}', 'need{ed}'], ['wash{ed}', 'open{ed}', 'visit{ed}']] } },
    { who: 'board', text: 'Which verb has one more syllable, the sound /ɪd/?', board: ['/t/ walked · /d/ played', '/ɪd/ wanted'], choice: { options: ['wanted', 'walked', 'played'], answer: 0, tip: 'want termina en t: want-ed suena /ɪd/.' } },
    { who: 'leo', text: 'Words for the past: yesterday, last night, last week, two days ago. When you hear them, use the past!', es: 'Palabras de pasado: yesterday (ayer), last night (anoche), last week (la semana pasada), two days ago (hace dos días). Cuando las oigas, ¡usa el pasado!', board: ['yesterday · last week', 'two days ago'] },
  ],

  'past-irregular': [
    { who: 'leo', text: 'Some verbs are rebels! They do NOT use -ED in the past. GO becomes WENT. SEE becomes SAW. EAT becomes ATE.', es: '¡Algunos verbos son rebeldes! No usan -ed en pasado: cada uno tiene su propia forma. En los colores: regulares en verde, irregulares en morado.', board: ['go → went · see → saw', '✗ goed · ✗ seed'], table: { head: ['Regular (-ed)', 'Irregular'], rows: [['[walk] → [walk]{ed}', '[go] → {went}'], ['[play] → [play]{ed}', '[see] → {saw}'], ['[cook] → [cook]{ed}', '[eat] → {ate}']] } },
    { who: 'board', text: 'Yesterday I ___ to the park.', board: ['go → went · see → saw', '✗ goed · ✗ seed'], choice: { options: ['went', 'goed', 'go'], answer: 0, tip: 'go es irregular: went.' } },
    { who: 'leo', text: 'The good news: it is the same for everybody. I went, you went, she went, they went. No -S, no changes!', es: 'La buena noticia: es igual para todos. Sin -s y sin cambios.', board: ['I · you · she · they', '+ went'], table: { head: ['Sujeto', 'Pasado'], rows: [['<I> · <You>', '{went} · {saw} · {ate}'], ['<He> · <She> · <It>', '{went} · {saw} · {ate}'], ['<We> · <They>', '{went} · {saw} · {ate}']] } },
    { who: 'board', text: 'Yesterday she ___ a sandwich for lunch.', board: ['I · you · she · they', '+ went'], choice: { options: ['ate', 'eated', 'eats'], answer: 0, tip: 'eat → ate, igual con she.' } },
    { who: 'leo', text: 'You have to learn them one by one. Here are the most important ones. Joe has a verb book with all of them!', es: 'Hay que aprenderlos uno por uno. Estos son los más importantes. ¡Joe tiene un libro de verbos con todos!', board: ['have → had · make → made', 'buy → bought · come → came'], table: { head: ['Presente', 'Pasado'], rows: [['[have]', '{had}'], ['[make]', '{made}'], ['[buy]', '{bought}'], ['[come]', '{came}'], ['[give]', '{gave}'], ['[write]', '{wrote}']] } },
    { who: 'board', text: 'Sam ___ two hundred bricks.', board: ['have → had · make → made', 'buy → bought · come → came'], choice: { options: ['bought', 'buyed', 'buy'], answer: 0, tip: 'buy → bought.' } },
    { who: 'leo', text: 'Careful! Some people here say "I goed" or "I eated". That is wrong. You can correct them!', es: '¡Cuidado! Aquí hay gente que dice "I goed" o "I eated". Está mal. ¡Puedes corregirlos!', board: ['✗ I goed · ✗ I eated', '✓ I went · ✓ I ate'] },
  ],

  'past-did': [
    { who: 'leo', text: 'To ask about the past, use DID. Did you see it? Did she go? And here is the secret: after DID, the verb is simple. No -ED, no WENT!', es: 'Para preguntar en pasado se usa did. El secreto: después de did, el verbo va simple, como en el diccionario. Did ya lleva el pasado.', board: ['Did + sujeto + verbo?', 'Did you go?'], table: { head: ['Afirmativa', 'Pregunta'], rows: [['<You> {went} home.', '[Did] <you> [go] home?'], ['<She> [play]{ed} football.', '[Did] <she> [play] football?'], ['<They> {saw} the mice.', '[Did] <they> [see] the mice?']] } },
    { who: 'board', text: '___ you see the windmill?', board: ['Did + sujeto + verbo?', 'Did you go?'], choice: { options: ['Did', 'Do', 'Were'], answer: 0, tip: 'Pregunta en pasado: Did...?' } },
    { who: 'board', text: 'Did you ___ to the farm?', board: ['Did + sujeto + verbo?', 'Did you go?'], choice: { options: ['go', 'went', 'goed'], answer: 0, tip: 'Después de did: go.' } },
    { who: 'leo', text: "To say no: DIDN'T plus the simple verb. I didn't go. He didn't see it. Never \"I didn't went\"!", es: "Para negar: didn't + verbo simple.", board: ["didn't + verbo", "I didn't go."], table: { head: ['Afirmativa', 'Negativa'], rows: [['<I> {went}.', "<I> [did]{n't} [go]."], ['<He> {saw} it.', "<He> [did]{n't} [see] it."], ['<We> [play]{ed}.', "<We> [did]{n't} [play]."]] } },
    { who: 'board', text: "I didn't ___ the dog.", board: ["didn't + verbo", "I didn't go."], choice: { options: ['see', 'saw', 'seed'], answer: 0, tip: "didn't + see." } },
    { who: 'leo', text: "Short answers are easy: Yes, I did. No, I didn't. The same for everybody!", es: 'Las respuestas cortas son fáciles, e iguales para todos.', board: ['Yes, I did.', "No, I didn't."], table: { head: ['Pregunta', 'Sí', 'No'], rows: [['[Did] <you> [go]?', 'Yes, <I> [did].', "No, <I> [did]{n't}."], ['[Did] <she> [eat]?', 'Yes, <she> [did].', "No, <she> [did]{n't}."]] } },
    { who: 'board', text: 'Did you like the farm? — Yes, I ___.', board: ['Yes, I did.', "No, I didn't."], choice: { options: ['did', 'liked', 'do'], answer: 0, tip: 'Yes, I did.' } },
    { who: 'leo', text: 'One more thing: with WAS and WERE we never use DID. Were you there? Was it cold? Easy!', es: 'Una cosa más: con was y were nunca se usa did.', board: ['Were you there? ✓', 'Did you were there? ✗'] },
  ],

  'past-time': [
    { who: 'leo', text: 'To say WHEN something happened: yesterday, last night, last week, last year. No THE and no IN before them!', es: 'Para decir cuándo pasó algo: yesterday, last night, last week, last year. ¡Sin "the" y sin "in" antes!', board: ['yesterday · last night', 'last week · last year'], table: { head: ['Español', 'Inglés'], rows: [['ayer', '{yesterday}'], ['anoche', '{last night} (no yesterday night)'], ['la semana pasada', '{last week} (no the last week)'], ['el año pasado', '{last year}']] } },
    { who: 'board', text: '___ night I watched a film.', board: ['yesterday · last night', 'last week · last year'], choice: { options: ['Last', 'Yesterday', 'The last'], answer: 0, tip: 'Anoche = last night.' } },
    { who: 'leo', text: 'HACE in Spanish is AGO in English. And AGO goes at the END: two days ago, an hour ago, thirty years ago.', es: '"Hace" en español es "ago" en inglés, ¡y va al final!', board: ['tiempo + ago', 'two days ago'], table: { head: ['Español', 'Inglés'], rows: [['hace dos días', 'two days {ago}'], ['hace una hora', 'an hour {ago}'], ['hace treinta años', 'thirty years {ago}']] } },
    { who: 'board', text: 'I saw that film two days ___.', board: ['tiempo + ago', 'two days ago'], choice: { options: ['ago', 'next', 'last'], answer: 0, tip: 'Two days ago.' } },
    { who: 'leo', text: 'With dates: IN for years, ON for days, AT for hours. In 1980, on Monday, at six o\'clock.', es: 'Con fechas: in para años, on para días, at para horas.', board: ['in 1980 · on Monday', "at six o'clock"], table: { head: ['Palabra', 'Con', 'Ejemplo'], rows: [['{in}', 'años, meses', '{in} 1980 · {in} June'], ['{on}', 'días', '{on} Monday'], ['{at}', 'horas', "{at} six o'clock"]] } },
    { who: 'board', text: 'Mr. Clark opened the cinema ___ 1980.', board: ['in 1980 · on Monday', "at six o'clock"], choice: { options: ['in', 'on', 'at'], answer: 0, tip: 'Con años: in.' } },
    { who: 'leo', text: 'To ask: WHEN DID you...? When did you see it? Two days ago! Now you can tell any story from the past.', es: 'Para preguntar: When did you...? Ahora puedes contar cualquier historia del pasado.', board: ['When did you see it?', 'Two days ago!'] },
  ],

  'going-to': [
    { who: 'leo', text: 'We are in the future! To talk about PLANS, use GOING TO: I am going to study. She is going to teach. It is like TO BE plus GOING TO plus a verb.', es: '¡Estamos en el futuro! Para hablar de planes se usa going to. Es como to be + going to + verbo.', board: ['am / is / are + going to', 'I am going to study.'], table: { head: ['Sujeto', 'to be', 'going to + verbo'], rows: [['<I>', '[am]', '{going to} [study]'], ['<He> · <She> · <It>', '[is]', '{going to} [teach]'], ['<You> · <We> · <They>', '[are]', '{going to} [play]']] } },
    { who: 'board', text: 'Tomorrow I ___ going to study.', board: ['am / is / are + going to', 'I am going to study.'], choice: { options: ['am', 'is', 'are'], answer: 0, tip: 'I + am going to.' } },
    { who: 'board', text: 'Theo ___ going to be an astronaut.', board: ['am / is / are + going to', 'I am going to study.'], choice: { options: ['is', 'are', 'am'], answer: 0, tip: 'He + is going to.' } },
    { who: 'leo', text: 'After GOING TO, the verb is simple: no -S, no -ED, no -ING. She is going to teach. Not "teaches"!', es: 'Después de going to, el verbo va simple: sin -s, sin -ed, sin -ing.', board: ['going to + verbo simple', '✗ going to teaches'], table: { head: ['Bien', 'Mal'], rows: [['<She> [is] {going to} [teach].', '✗ going to teaches'], ['<We> [are] {going to} [play].', '✗ going to played'], ['<I> [am] {going to} [fly].', '✗ I going to fly']] } },
    { who: 'board', text: 'They are going to ___ a new robot.', board: ['going to + verbo simple', '✗ going to teaches'], choice: { options: ['buy', 'buys', 'bought'], answer: 0, tip: 'going to + buy.' } },
    { who: 'leo', text: 'Words for the future: tomorrow, tonight, next week, next year, one day. Yesterday was the past... tomorrow is the future!', es: 'Palabras de futuro: tomorrow (mañana), tonight (esta noche), next week (la próxima semana), next year, one day (algún día).', board: ['tomorrow · tonight', 'next week · one day'], table: { head: ['Pasado', 'Futuro'], rows: [['{yesterday}', '{tomorrow}'], ['{last night}', '{tonight}'], ['{last week}', '{next week}']] } },
    { who: 'board', text: 'I am going to visit my grandma ___ week.', board: ['tomorrow · tonight', 'next week · one day'], choice: { options: ['next', 'last', 'ago'], answer: 0, tip: 'Futuro: next week.' } },
  ],

  'going-to-neg': [
    { who: 'leo', text: "To say NO with GOING TO, put NOT after am, is, are: I'm not going to... She isn't going to... They aren't going to...", es: 'Para negar con going to, el not va después de am / is / are.', board: ["isn't / aren't + going to", "I'm not going to..."], table: { head: ['Afirmativa', 'Negativa'], rows: [['<I>[\'m] {going to} [walk].', '<I>[\'m] {not} {going to} [walk].'], ['<She> [is] {going to} [buy] it.', '<She> [is]{n\'t} {going to} [buy] it.'], ['<They> [are] {going to} [fly].', '<They> [are]{n\'t} {going to} [fly].']] } },
    { who: 'board', text: "She ___ going to buy the jacket.", board: ["isn't / aren't + going to", "I'm not going to..."], choice: { options: ["isn't", "aren't", 'not'], answer: 0, tip: "She + isn't going to." } },
    { who: 'leo', text: 'To ASK, am, is, are go first, like with TO BE: Are you going to...? Is he going to...? No DO, no DOES!', es: 'Para preguntar, am / is / are van primero, como con to be. ¡Sin do ni does!', board: ['Are you going to...?', 'Is he going to...?'], table: { head: ['Afirmativa', 'Pregunta'], rows: [['<You> [are] {going to} [visit] it.', '[Are] <you> {going to} [visit] it?'], ['<He> [is] {going to} [come].', '[Is] <he> {going to} [come]?']] } },
    { who: 'board', text: '___ you going to visit the fountain?', board: ['Are you going to...?', 'Is he going to...?'], choice: { options: ['Are', 'Do', 'Is'], answer: 0, tip: 'Are you going to...?' } },
    { who: 'leo', text: "Short answers, just like TO BE: Yes, I am. No, she isn't. Yes, they are.", es: 'Respuestas cortas, igual que con to be.', board: ['Yes, I am.', "No, she isn't."], table: { head: ['Pregunta', 'Sí', 'No'], rows: [['[Are] <you> {going to}...?', 'Yes, <I> [am].', "No, <I>'[m] {not}."], ['[Is] <she> {going to}...?', 'Yes, <she> [is].', "No, <she> [is]{n't}."], ['[Are] <they> {going to}...?', 'Yes, <they> [are].', "No, <they> [are]{n't}."]] } },
    { who: 'board', text: 'Are you going to order? — Yes, I ___.', board: ['Yes, I am.', "No, she isn't."], choice: { options: ['am', 'do', 'going'], answer: 0, tip: 'Yes, I am.' } },
  ],

  'going-to-wh': [
    { who: 'leo', text: 'To ask about plans with WHAT, WHERE, WHEN or WHO: the question word first, then am, is, are, then the person, then GOING TO.', es: 'Para preguntar por planes: primero la palabra de pregunta, luego am / is / are, luego la persona y después going to.', board: ['What + are + you + going to...?', 'What are you going to do?'], table: { head: ['Pregunta', 'am / is / are', 'Sujeto', 'going to + verbo'], rows: [['{What}', '[are]', '<you>', '{going to} [do]?'], ['{Where}', '[is]', '<Lucy>', '{going to} [sit]?'], ['{When}', '[are]', '<they>', '{going to} [arrive]?'], ['{Who}', '[are]', '<you>', '{going to} [invite]?']] } },
    { who: 'board', text: 'What ___ you going to bring?', board: ['What + are + you + going to...?', 'What are you going to do?'], choice: { options: ['are', 'is', 'do'], answer: 0, tip: 'What are you going to...?' } },
    { who: 'leo', text: 'Choose the question word by the answer. A thing: WHAT. A place: WHERE. A time: WHEN. A person: WHO.', es: 'Elige la palabra según la respuesta: una cosa, what; un lugar, where; un momento, when; una persona, who.', board: ['what · where', 'when · who'], table: { head: ['Palabra', 'Pregunta por', 'Respuesta'], rows: [['{What}', 'una cosa', 'A cake.'], ['{Where}', 'un lugar', 'In the park.'], ['{When}', 'un momento', 'At five.'], ['{Who}', 'una persona', 'Theo.']] } },
    { who: 'board', text: '___ are you going to arrive? — At four.', board: ['what · where', 'when · who'], choice: { options: ['When', 'Where', 'Who'], answer: 0, tip: 'Una hora: When.' } },
    { who: 'leo', text: 'Careful! Not "What you are going to do?". The AM, IS or ARE goes BEFORE the person.', es: '¡Cuidado! No "What you are going to do?": am / is / are va ANTES de la persona.', board: ['✗ What you are going to do?', '✓ What are you going to do?'] },
    { who: 'board', text: 'Where ___ Lucy going to sit?', board: ['✗ What you are going to do?', '✓ What are you going to do?'], choice: { options: ['is', 'are', 'does'], answer: 0, tip: 'Lucy (she): Where is Lucy going to sit?' } },
  ],

  'want-to': [
    { who: 'leo', text: 'To say what you want: WANT TO + verb. I want to be a teacher! With he or she, WANT takes -s: she wants to travel.', es: 'Para decir lo que quieres: want to + verbo. ¡Quiero ser profesor! Con he o she, want lleva -s: ella quiere viajar.', board: ['I want to be a teacher.', 'She wants to travel.'], table: { head: ['Quién', 'Lo que quiere'], rows: [['I / you / we / they', '<I> [want] {to} [be] a teacher.'], ['he / she / it', '<She> [wants] {to} [travel].'], ['Negativo', "<He> [doesn't want] {to} [leave]."]] } },
    { who: 'board', text: 'I want ___ be a director.', board: ['I want to be a teacher.', 'She wants to travel.'], choice: { options: ['to', 'for', 'at'], answer: 0, tip: 'want + to + verbo.' } },
    { who: 'leo', text: "WOULD LIKE TO is the polite way: I would like to go up. Short: I'd like to. And to invite someone: Would you like to come?", es: 'Would like to es la forma más cortés: me gustaría subir. Corto: I\'d like to. Y para invitar: ¿Te gustaría venir?', board: ["I would like to go up. (I'd like to)", 'Would you like to come? Yes, I would!'], table: { head: ['Para qué', 'Cómo'], rows: [['Pedir con cortesía', "<I> [would like] {to} [go] up."], ['Invitar', '[Would] <you> [like] {to} [come]?'], ['Responder', '<Yes>, <I> [would]!']] } },
    { who: 'board', text: 'Would you like ___ go up?', board: ["I would like to go up. (I'd like to)", 'Would you like to come? Yes, I would!'], choice: { options: ['to', 'for', 'in'], answer: 0, tip: 'would like + to + verbo.' } },
    { who: 'leo', text: 'Careful! WANT changes with she: she wants to. But WOULD never changes: she would like to, they would like to.', es: '¡Cuidado! Want cambia con she: she wants to. Pero would nunca cambia: she would like to, they would like to.', board: ['She wants to · She would like to', '(would no cambia)'] },
    { who: 'board', text: 'Paula ___ to be a good director.', board: ['She wants to · She would like to', '(would no cambia)'], choice: { options: ['wants', 'want', 'wanting'], answer: 0, tip: 'Paula (she): wants.' } },
  ],
  'going-to-predict': [
    { who: 'leo', text: "GOING TO is not only for plans. When you SEE something is going to happen, use it too: Look at the clouds! It's going to rain!", es: 'Going to no es solo para planes. Cuando VES que algo va a pasar, también se usa: ¡Mira las nubes! ¡Va a llover!', board: ['Look! It is going to rain.', '(ves las nubes)'], table: { head: ['Lo que ves', 'Lo que va a pasar'], rows: [['Black clouds', "<It>'[s] {going to} [rain]."], ['A cow next to a hat', '<The cow> [is] {going to} [eat] it.'], ['A boy on a wet floor', "<He>'[s] {going to} [fall]!"]] } },
    { who: 'board', text: "Look at those clouds! It's going to ___.", board: ['Look! It is going to rain.', '(ves las nubes)'], choice: { options: ['rain', 'rains', 'rained'], answer: 0, tip: 'going to + rain.' } },
    { who: 'leo', text: "Words that help: LOOK! CAREFUL! SOON! Careful! You're going to fall!", es: 'Palabras que ayudan: Look! (¡Mira!), Careful! (¡Cuidado!), soon (pronto).', board: ["Careful! You're going to fall!", 'Look! · Careful! · soon'] },
    { who: 'board', text: 'Careful! You ___ going to fall!', board: ["Careful! You're going to fall!", 'Look! · Careful! · soon'], choice: { options: ['are', 'is', 'am'], answer: 0, tip: 'You + are going to.' } },
    { who: 'leo', text: "And to say it is NOT going to happen: There are no clouds. It isn't going to rain.", es: 'Y para decir que no va a pasar: no hay nubes, no va a llover.', board: ["It isn't going to rain.", '(no hay nubes)'] },
    { who: 'board', text: "There are no clouds. It ___ going to rain.", board: ["It isn't going to rain.", '(no hay nubes)'], choice: { options: ["isn't", "aren't", "doesn't"], answer: 0, tip: "It + isn't going to." } },
  ],

  // ── A2 · Leo en el hospital: consejos y reglas (should / must / have to) + palabras de salud ──
  'should-must': [
    { who: 'leo', text: "In a hospital you hear a lot of advice and a lot of rules. Let's learn three words for that: SHOULD, MUST and HAVE TO.", es: 'En un hospital se oyen muchos consejos y muchas reglas. Aprendamos tres palabras para eso: should, must y have to.', board: ['should · must · have to', 'consejos y reglas'] },

    { who: 'leo', text: 'SHOULD is for advice: a good idea. You should rest. You should drink water. After SHOULD, the verb goes alone: no TO, no -S.', es: 'Should es para consejos: una buena idea. Deberías descansar. Deberías tomar agua. Después de should el verbo va solo: sin to y sin -s.', board: ['should + verbo', 'You should rest.'] },
    { who: 'board', text: 'You look tired. You ___ rest a little.', board: ['should + verbo', 'You should rest.'], choice: { options: ['should', 'should to', 'shoulds'], answer: 0, tip: 'Should + verbo solo: You should rest.' } },
    { who: 'board', text: 'She has a fever. She should ___ to the doctor.', board: ['should + verbo', 'She should go.'], choice: { options: ['go', 'goes', 'to go'], answer: 0, tip: 'Después de should el verbo no lleva -s ni to: She should go.' } },

    { who: 'leo', text: "To give advice in negative: SHOULDN'T. Your leg hurts. You shouldn't run!", es: "Para aconsejar que no: shouldn't. Te duele la pierna. ¡No deberías correr!", board: ["shouldn't + verbo", "You shouldn't run."] },
    { who: 'board', text: 'You have a sore throat. You ___ drink cold soda.', board: ["shouldn't + verbo", "You shouldn't run."], choice: { options: ["shouldn't", 'should', "don't should"], answer: 0, tip: "Un mal consejo para la garganta: shouldn't drink." } },

    { who: 'leo', text: "MUST is stronger: a rule, something very important. You must take this medicine. And MUSTN'T means it is not allowed: You mustn't eat before the test.", es: "Must es más fuerte: una regla, algo muy importante. Debes tomar esta medicina. Y mustn't es que está prohibido: no debes comer antes del examen.", board: ['must = regla', "mustn't = prohibido"] },
    { who: 'board', text: 'The doctor says: You ___ take this medicine every day.', board: ['must = regla', "mustn't = prohibido"], choice: { options: ['must', 'must to', 'musts'], answer: 0, tip: 'Must + verbo solo, igual con todos: You must take.' } },
    { who: 'board', text: 'Hospital rule: Visitors ___ smoke here.', board: ['must = regla', "mustn't = prohibido"], choice: { options: ["mustn't", 'must', "don't must"], answer: 0, tip: "Está prohibido: mustn't smoke." } },

    { who: 'leo', text: 'HAVE TO is also obligation. I have to stay here tonight. With he, she, it: HAS TO. The doctor has to work at night.', es: 'Have to también es obligación. Tengo que quedarme aquí esta noche. Con he, she, it: has to. La médica tiene que trabajar de noche.', board: ['I / you / we / they → have to', 'he / she / it → has to'] },
    { who: 'board', text: 'The nurse ___ check my leg again.', board: ['I / you / we / they → have to', 'he / she / it → has to'], choice: { options: ['has to', 'have to', 'has'], answer: 0, tip: 'The nurse (she) → has to + verbo.' } },

    { who: 'leo', text: "Careful! DON'T HAVE TO is not the same as MUSTN'T. You don't have to stay in bed = it is not necessary. You mustn't = it is not allowed.", es: "¡Cuidado! Don't have to no es lo mismo que mustn't. You don't have to stay in bed = no es necesario. You mustn't = está prohibido.", board: ["don't have to = no es necesario", "mustn't = prohibido"] },
    { who: 'board', text: "Your leg is better. You ___ stay in bed all day.", board: ["don't have to = no es necesario", "mustn't = prohibido"], choice: { options: ["don't have to", "mustn't", "doesn't have to"], answer: 0, tip: "No es necesario quedarte en cama: don't have to. Con you: don't." } },

    { who: 'leo', text: 'To ask: SHOULD I...? or DO I HAVE TO...? Should I call the nurse? Do I have to take this medicine? — Yes, you do.', es: '¿Para preguntar? Should I...? o Do I have to...? ¿Debería llamar a la enfermera? ¿Tengo que tomar esta medicina? — Sí.', board: ['Should I...?', 'Do I have to...? — Yes, you do.'] },
    { who: 'board', text: '___ I have to stay here tonight?', board: ['Should I...?', 'Do I have to...? — Yes, you do.'], choice: { options: ['Do', 'Must', 'Am'], answer: 0, tip: 'Pregunta con have to: Do + I + have to...?' } },

    { who: 'leo', text: 'Now some health words. A headache, a stomachache, a fever, a cough, a sore throat. My head hurts: I have a headache.', es: 'Ahora palabras de salud. Dolor de cabeza, dolor de estómago, fiebre, tos, dolor de garganta. Me duele la cabeza: tengo dolor de cabeza.', board: ['I have a headache.', 'My head hurts.'], table: { head: ['Inglés', 'Español'], rows: [['a {headache}', 'dolor de cabeza'], ['a {stomachache}', 'dolor de estómago'], ['a {fever}', 'fiebre'], ['a {cough}', 'tos'], ['a {sore throat}', 'dolor de garganta']] } },
    { who: 'board', text: 'My head hurts. I have a ___.', board: ['I have a headache.', 'My head hurts.'], choice: { options: ['headache', 'stomachache', 'cough'], answer: 0, tip: 'Head (cabeza) + ache (dolor) = headache.' } },
    { who: 'board', text: "I'm very hot. I think I have a ___.", board: ['a fever · a cough', 'a sore throat'], choice: { options: ['fever', 'cough', 'sore throat'], answer: 0, tip: 'Mucho calor en el cuerpo: fever (fiebre).' } },

    { who: 'leo', text: "Great! Now you can understand the doctor... and give good advice. Let's practice!", es: '¡Genial! Ya puedes entender a la médica... y dar buenos consejos. ¡A practicar!', board: ['should · must · have to', '+ verbo solo'], table: { head: ['Para qué', 'Ejemplo'], rows: [['Consejo', '<You> {should} [rest].'], ['Mal consejo', "<You> {shouldn't} [run]."], ['Regla fuerte', '<You> {must} [take] this medicine.'], ['Prohibido', "<You> {mustn't} [smoke] here."], ['Obligación', '<She> {has to} [work] tonight.'], ['No es necesario', "<You> {don't have to} [stay] in bed."]] } },
  ],

  // ── A2-03 · Leo en la ciudad: invitaciones (let's / how about / would you like) y frecuencia ──
  invitations: [
    { who: 'leo', text: "A day in the city! To invite a friend, you need three little tools: LET'S, HOW ABOUT and WOULD YOU LIKE.", es: "¡Un día en la ciudad! Para invitar a un amigo necesitas tres herramientas: let's, how about y would you like.", board: ["let's · how about", 'would you like...?'] },
    { who: 'leo', text: "LET'S + verb: Let's go to the park! HOW ABOUT + verb with -ING: How about having a coffee?", es: '¡Vamos al parque! / ¿Qué tal si tomamos un café? Ojo: después de how about, el verbo lleva -ing.', board: ["Let's go!", 'How about having a coffee?'], table: { head: ['Para qué', 'Cómo'], rows: [['Proponer', "{Let's} [go] to the park!"], ['Sugerir', '{How about} [having] a coffee?'], ['Invitar', '{Would} <you> {like to} [come]?']] } },
    { who: 'board', text: 'How about ___ to the café?', board: ["Let's go!", 'How about having a coffee?'], choice: { options: ['going', 'go', 'to go'], answer: 0, tip: 'How about + verbo con -ing: going.' } },
    { who: 'leo', text: "To say YES: Sure! Good idea! I'd love to! To say NO, be kind: Sorry, I can't. I have to work.", es: "Para aceptar: ¡Claro! ¡Buena idea! ¡Me encantaría! Para rechazar con amabilidad: Lo siento, no puedo. Tengo que trabajar.", board: ["✓ Sure! · I'd love to!", "✗ Sorry, I can't. I have to..."] },
    { who: 'board', text: "Would you like to come? — I'd love ___!", board: ["✓ Sure! · I'd love to!", "✗ Sorry, I can't. I have to..."], choice: { options: ['to', 'it', 'for'], answer: 0, tip: "Para aceptar: I'd love to!" } },
    { who: 'leo', text: 'And how often? ALWAYS, USUALLY, SOMETIMES, NEVER. They go BEFORE the verb: I usually walk. But AFTER am, is, are: I am never late.', es: 'Y la frecuencia: siempre, normalmente, a veces, nunca. Van antes del verbo (I usually walk), pero después de am / is / are (I am never late).', board: ['always · usually · sometimes · never', 'I usually walk. · I am never late.'], table: { head: ['Frecuencia', 'Ejemplo'], rows: [['100%', '<I> {always} [have] breakfast.'], ['80%', '<I> {usually} [walk] to work.'], ['40%', '<We> {sometimes} [go] to the café.'], ['0%', '<She> [is] {never} late.']] } },
    { who: 'board', text: 'I ___ go to the café on Sundays.', board: ['always · usually · sometimes · never', 'I usually walk. · I am never late.'], choice: { options: ['usually', 'am usually', 'usually am'], answer: 0, tip: 'Antes del verbo go, sin am: I usually go.' } },
    { who: 'leo', text: "Great! Now you can make plans with your friends. Let's practice!", es: '¡Genial! Ya puedes hacer planes con tus amigos. ¡A practicar!', board: ["let's · how about + -ing", 'would you like to + verbo'] },
  ],

  // ── A2-04 · Leo en el taller: peticiones corteses, instrucciones, responsabilidades y herramientas ──
  requests: [
    { who: 'leo', text: 'A workshop is a busy place. To ask for help, be polite: CAN YOU...?, COULD YOU...? and WOULD YOU MIND...?', es: 'Un taller es un lugar ocupado. Para pedir ayuda, sé cortés: ¿Puedes...?, ¿Podrías...? y ¿Te importaría...?', board: ['Can you...? · Could you...?', 'Would you mind + -ing?'] },
    { who: 'leo', text: 'CAN / COULD YOU + verb: Could you pass me the hammer? WOULD YOU MIND + verb with -ING: Would you mind holding the ladder?', es: '¿Podrías pasarme el martillo? / ¿Te importaría sostener la escalera? Ojo: después de would you mind, el verbo lleva -ing.', board: ['Could you pass me the hammer?', 'Would you mind holding...?'], table: { head: ['Qué tan cortés', 'Cómo'], rows: [['Normal', '{Can} <you> [help] me?'], ['Cortés', '{Could} <you> [pass] me the hammer?'], ['Muy cortés', '{Would} <you> {mind} [holding] the ladder?']] } },
    { who: 'board', text: 'Would you mind ___ the door, please?', board: ['Could you pass me the hammer?', 'Would you mind holding...?'], choice: { options: ['closing', 'close', 'to close'], answer: 0, tip: 'Would you mind + verbo con -ing: closing.' } },
    { who: 'leo', text: "To say YES: Sure, no problem! Of course! To say NO, be kind: Sorry, I can't. I'm busy.", es: '¡Claro, no hay problema! ¡Por supuesto! Para decir que no con amabilidad: Lo siento, no puedo. Estoy ocupado.', board: ['✓ Sure, no problem! · Of course!', "✗ Sorry, I can't. I'm busy."] },
    { who: 'board', text: 'Could you help me? — Sure, ___!', board: ['✓ Sure, no problem! · Of course!', "✗ Sorry, I can't. I'm busy."], choice: { options: ['no problem', 'not problem', 'no problems'], answer: 0, tip: 'Para aceptar: Sure, no problem!' } },
    { who: 'leo', text: 'Now the tools: a hammer, a screwdriver, a wrench, a ladder, gloves and a toolbox. Everything is on the workbench.', es: 'Ahora las herramientas: martillo, destornillador, llave inglesa, escalera, guantes y caja de herramientas. Todo está en la mesa de trabajo.', board: ['hammer · screwdriver · wrench', 'ladder · gloves · toolbox'], table: { head: ['Inglés', 'Español'], rows: [['a {hammer}', 'un martillo'], ['a {screwdriver}', 'un destornillador'], ['a {wrench}', 'una llave inglesa'], ['a {ladder}', 'una escalera'], ['{gloves}', 'guantes'], ['a {toolbox}', 'una caja de herramientas']] } },
    { who: 'board', text: 'I need to climb up. Could you pass me the ___?', board: ['hammer · screwdriver · wrench', 'ladder · gloves · toolbox'], choice: { options: ['ladder', 'hammer', 'gloves'], answer: 0, tip: 'Para subir se usa una escalera: a ladder.' } },
    { who: 'leo', text: 'To give instructions, say the steps in order: FIRST, THEN, AFTER THAT, FINALLY. The verb is simple: First, turn off the machine.', es: 'Para dar instrucciones, di los pasos en orden: primero, luego, después, por último. El verbo va tal cual: Primero, apaga la máquina.', board: ['First → Then → After that → Finally', 'First, turn off the machine.'], table: { head: ['Paso', 'Ejemplo'], rows: [['1', '{First,} [turn off] the radio.'], ['2', '{Then,} [open] the box.'], ['3', '{After that,} [change] the battery.'], ['4', '{Finally,} [test] the radio.']] } },
    { who: 'board', text: 'First, open the box. ___, change the battery.', board: ['First → Then → After that → Finally', 'First, turn off the machine.'], choice: { options: ['Then', 'Finally', 'First'], answer: 0, tip: 'El segundo paso: Then.' } },
    { who: 'leo', text: "And responsibilities: IT'S MY JOB TO + verb, I'M RESPONSIBLE FOR + something, I HAVE TO + verb. It's my job to fix radios.", es: 'Y las responsabilidades: mi trabajo es + verbo, soy responsable de + algo, tengo que + verbo. Mi trabajo es arreglar radios.', board: ["It's my job to fix radios.", "I'm responsible for the tools."], table: { head: ['Para qué', 'Ejemplo'], rows: [['Tu trabajo', "<It's> {my job to} [fix] radios."], ['Tu responsabilidad', "<I'm> {responsible for} the tools."], ['Obligación', '<He> {has to} [clean] the workbench.']] } },
    { who: 'board', text: "I'm responsible ___ the toolbox.", board: ["It's my job to fix radios.", "I'm responsible for the tools."], choice: { options: ['for', 'of', 'to'], answer: 0, tip: 'Responsable de algo: responsible for.' } },
    { who: 'leo', text: "Great! Now you can ask for help and follow instructions in the workshop. Let's practice!", es: '¡Genial! Ya puedes pedir ayuda y seguir instrucciones en el taller. ¡A practicar!', board: ['Could you...? · Would you mind + -ing?', 'First → Then → After that → Finally'] },
  ],

  // ── A2-05 · Leo en la biblioteca: Past Simple (regulares e irregulares), conectores de tiempo y comparativos ──
  'past-simple': [
    { who: 'leo', text: 'In a library, people tell stories about the PAST. To say what happened yesterday, we use the PAST SIMPLE.', es: 'En una biblioteca la gente cuenta historias del pasado. Para decir qué pasó ayer usamos el pasado simple.', board: ['Yesterday I visited the library.', 'Last week I went to the city.'] },
    { who: 'leo', text: 'REGULAR verbs: add -ED. visit → visited, listen → listened. With -E, only -D: arrive → arrived. Careful: study → studied, stop → stopped.', es: 'Verbos regulares: se agrega -ed. Si terminan en -e, solo -d. Ojo: study → studied, stop → stopped.', board: ['visit → visited · arrive → arrived', 'study → studied · stop → stopped'], table: { head: ['Regla', 'Ejemplo'], rows: [['+ -ed', '<I> [visited] the library.'], ['-e + -d', '<She> [arrived] at nine.'], ['y → -ied', '<We> [studied] English.'], ['doble consonante', '<He> [stopped] the clock.']] } },
    { who: 'board', text: 'Yesterday we ___ to music.', board: ['visit → visited · arrive → arrived', 'study → studied · stop → stopped'], choice: { options: ['listened', 'listen', 'listenned'], answer: 0, tip: 'listen + -ed = listened.' } },
    { who: 'leo', text: 'IRREGULAR verbs have their own past. You must learn them: go → WENT, see → SAW, buy → BOUGHT, eat → ATE, write → WROTE. Never "goed" or "buyed"!', es: 'Los irregulares tienen su propio pasado y hay que aprenderlos. ¡Nunca "goed" ni "buyed"!', board: ['go → went · see → saw · buy → bought', 'eat → ate · write → wrote · hear → heard'], table: { head: ['Verbo', 'Pasado'], rows: [['go', '<I> [went] to the library.'], ['see', '<She> [saw] a light.'], ['buy', '<He> [bought] a book.'], ['write', '<They> [wrote] a note.']] } },
    { who: 'board', text: 'Last week a man ___ an old book.', board: ['go → went · see → saw · buy → bought', 'eat → ate · write → wrote · hear → heard'], choice: { options: ['bought', 'buyed', 'buy'], answer: 0, tip: 'buy es irregular: bought.' } },
    { who: 'leo', text: 'To tell WHEN: YESTERDAY, LAST WEEK, LAST NIGHT. To tell a story in order: FIRST, THEN, AFTER THAT, FINALLY.', es: 'Para decir cuándo: ayer, la semana pasada, anoche. Para contar en orden: primero, luego, después, por último.', board: ['yesterday · last week · last night', 'First → Then → After that → Finally'], table: { head: ['Para qué', 'Ejemplo'], rows: [['Cuándo', '{Yesterday} <I> [went] to the library.'], ['Cuándo', '<We> [met] {last week}.'], ['Orden', '{First,} <I> [opened] the book.'], ['Orden', '{Then,} <I> [saw] a light.']] } },
    { who: 'board', text: 'First, I opened the book. ___, I saw a purple light.', board: ['yesterday · last week · last night', 'First → Then → After that → Finally'], choice: { options: ['Then', 'Last', 'Yesterday'], answer: 0, tip: 'El siguiente paso de la historia: Then.' } },
    { who: 'leo', text: 'One more thing: to compare, short adjective + -ER + THAN. This book is OLDER THAN the library! The library is BIGGER THAN the café.', es: 'Una cosa más: para comparar, adjetivo corto + -er + than. ¡Este libro es más viejo que la biblioteca!', board: ['old → older than', 'big → bigger than'] },
    { who: 'board', text: 'The library is ___ than the café.', board: ['old → older than', 'big → bigger than'], choice: { options: ['bigger', 'more big', 'biggest'], answer: 0, tip: 'big → bigger than.' } },
    { who: 'leo', text: "Great! Now you can tell what happened yesterday. Let's practice!", es: '¡Genial! Ya puedes contar lo que pasó ayer. ¡A practicar!', board: ['visited · studied · stopped', 'went · saw · bought · wrote'] },
  ],
  'past-simple-comparatives': [
    { who: 'leo', text: 'Today we need the Past Simple. We use it to say what happened before. Example: They organized the River Race every year. Organized is the past of organize.', es: 'Hoy necesitamos el pasado simple. Lo usamos para decir qué pasó antes. Ejemplo: Organizaban la River Race cada año. Organized es el pasado de organize.', board: ['organize → organized', 'stop → stopped'], table: { head: ['Verbo', 'Pasado'], rows: [['organize', '<They> [organized] the River Race.'], ['stop', '<The race> [stopped].']] } },
    { who: 'leo', text: 'Some verbs are irregular. They have their own past: become → BECAME, lose → LOST, keep → KEPT, sell → SOLD.', es: 'Algunos verbos son irregulares y tienen su propio pasado: become → became, lose → lost, keep → kept, sell → sold.', board: ['become → became · lose → lost', 'keep → kept · sell → sold'], table: { head: ['Verbo', 'Pasado'], rows: [['become', '<He> [became] ill.'], ['lose', '<Someone> [lost] the banner.'], ['keep', '<The winner> [kept] the banner.'], ['sell', '<They> [sold] the corn.']] } },
    { who: 'board', text: 'Five years ago the grandfather ___ ill.', board: ['become → became · lose → lost', 'keep → kept · sell → sold'], choice: { options: ['became', 'becomed', 'become'], answer: 0, tip: 'become es irregular: became.' } },
    { who: 'board', text: 'Someone ___ the banner.', board: ['become → became · lose → lost', 'keep → kept · sell → sold'], choice: { options: ['lost', 'losed', 'lose'], answer: 0, tip: 'lose es irregular: lost.' } },
    { who: 'board', text: 'The winner ___ the banner for one year.', board: ['become → became · lose → lost', 'keep → kept · sell → sold'], choice: { options: ['kept', 'keeped', 'keep'], answer: 0, tip: 'keep es irregular: kept.' } },
    { who: 'leo', text: "For negatives we use did. The grandfather didn't sell the horses.", es: "Para negar usamos did: didn't + verbo base. El abuelo no vendió los caballos.", board: ["didn't + verbo base", "He didn't sell the horses."], table: { head: ['Afirmativa', 'Negativa'], rows: [['<He> [sold] the horses.', "<He> {didn't} [sell] the horses."], ['<They> [organized] the race.', "<They> {didn't} [organize] the race."]] } },
    { who: 'board', text: 'The grandfather selled the horses.', board: ["didn't + verbo base", "He didn't sell the horses."], choice: { options: ["The grandfather didn't sell the horses.", "The grandfather didn't sold the horses.", "The grandfather don't sell the horses."], answer: 0, tip: "\"selled\" no existe, y el abuelo NO los vendió: didn't + sell (verbo base)." } },
    { who: 'leo', text: 'To compare: short adjectives take -ER + THAN. Long adjectives take MORE ... THAN. The race was more expensive than before.', es: 'Para comparar: adjetivos cortos con -er + than; adjetivos largos con more ... than. La carrera era más cara que antes.', board: ['kind → kinder than', 'expensive → more expensive than'], table: { head: ['Adjetivo', 'Ejemplo'], rows: [['corto: kind', '<Elena> [is] {kinder than} the neighbor.'], ['largo: expensive', '<The race> [was] {more expensive than} before.']] } },
    { who: 'board', text: 'The race was ___ than the other activities.', board: ['kind → kinder than', 'expensive → more expensive than'], choice: { options: ['more expensive', 'expensiver', 'most expensive'], answer: 0, tip: 'expensive es largo: more expensive than.' } },
    { who: 'board', text: 'Elena is ___ than the neighbor.', board: ['kind → kinder than', 'expensive → more expensive than'], choice: { options: ['kinder', 'more kind', 'kindest'], answer: 0, tip: 'kind es corto: kinder than.' } },
    { who: 'leo', text: "Great! Now let's practice: order, complete and correct.", es: '¡Genial! Ahora practiquemos: ordenar, completar y corregir.', board: ['became · lost · kept · sold', 'kinder than · more expensive than'] },
  ],

  // ── A2-07 · Leo en el hipódromo: comparativos, superlativos y presente continuo ──
  'superlatives-comparatives-race': [
    { who: 'leo', text: 'Today we are going to talk about races. When we compare two horses, we use comparatives. When we talk about the best one, we use superlatives. And while the race is happening, we use the Present Continuous.', es: 'Hoy vamos a hablar de carreras. Cuando comparamos dos caballos usamos comparativos. Cuando hablamos del mejor, usamos superlativos. Y mientras la carrera está pasando, usamos el presente continuo.', board: ['faster than · the fastest', 'The horses are running.'] },
    { who: 'leo', text: 'This horse is faster than that one. She rides more carefully than him. The brown horse is better than the black one.', es: 'Este caballo es más rápido que ese. Ella monta con más cuidado que él. El caballo café es mejor que el negro.', board: ['fast → faster than', 'good → better than'], table: { head: ['Regla', 'Ejemplo'], rows: [['corto + -er + than', '<This horse> [is] {faster than} that one.'], ['more + largo + than', '<She> [rides] {more carefully than} him.'], ['irregular: good', '<The brown horse> [is] {better than} the black one.']] } },
    { who: 'board', text: 'My horse is ___ than yours.', board: ['fast → faster than', 'good → better than'], choice: { options: ['faster', 'fastest', 'more fast'], answer: 0, tip: 'Comparamos dos caballos: fast → faster than (sin "more").' } },
    { who: 'leo', text: 'This is the fastest horse on the track. He is the best jockey today. That is the most dangerous jump.', es: 'Este es el caballo más rápido de la pista. Él es el mejor jinete hoy. Ese es el salto más peligroso.', board: ['fast → the fastest', 'dangerous → the most dangerous'], table: { head: ['Regla', 'Ejemplo'], rows: [['the + corto + -est', '<This> [is] {the fastest} horse on the track.'], ['the most + largo', '<That> [is] {the most dangerous} jump.'], ['irregular: good', '<He> [is] {the best} jockey today.']] } },
    { who: 'board', text: 'This is ___ horse in the race.', board: ['fast → the fastest', 'dangerous → the most dangerous'], choice: { options: ['the fastest', 'faster', 'most fast'], answer: 0, tip: 'El más rápido de todos: the fastest.' } },
    { who: 'leo', text: 'Look at the race right now. The horses are running. She is jumping over the fence. They are riding as fast as they can.', es: 'Mira la carrera ahora mismo. Los caballos están corriendo. Ella está saltando la cerca. Están montando tan rápido como pueden.', board: ['am / is / are + -ing', 'The horses are running.'], table: { head: ['Sujeto', 'Ahora mismo'], rows: [['<The horses>', '{are} [running].'], ['<She>', '{is} [jumping] over the fence.'], ['<They>', '{are} [riding] as fast as they can.']] } },
    { who: 'board', text: 'Look! The white horse ___ the race.', board: ['am / is / are + -ing', 'The horses are running.'], choice: { options: ['is leading', 'leads', 'is lead'], answer: 0, tip: 'Pasa ahora mismo (Look!): is + verbo con -ing → is leading.' } },
    { who: 'leo', text: 'The white horse is running faster than the others. It is the fastest right now.', es: 'El caballo blanco está corriendo más rápido que los otros. Es el más rápido ahora mismo.', board: ['is running faster than', 'the fastest right now'] },
    { who: 'board', text: 'Ordena: is / the / jumping / horse / highest / The', board: ['is running faster than', 'the fastest right now'], choice: { options: ['The horse is jumping the highest.', 'The horse the highest is jumping.', 'Is the horse jumping the highest.'], answer: 0, tip: 'Sujeto (The horse) + is + verbo con -ing (jumping) + the highest.' } },
    { who: 'leo', text: "Good. Now you can talk about the race. Let's go to the track. Someone there remembers an old accident.", es: 'Bien. Ya puedes hablar de la carrera. Vamos a la pista. Alguien allí recuerda un viejo accidente.', board: ['faster than · the fastest', 'is running · are jumping'] },
  ],

  // ── A2-08 · Leo junto al carro detenido: Past Simple + Past Continuous (when / while) ──
  'past-simple-continuous': [
    { who: 'leo', text: 'Look at the car. It stopped in the middle of the road. We need to tell what happened. For finished actions we use the PAST SIMPLE: The engine stopped. JoJo got out.', es: 'Mira el carro. Se detuvo en mitad del camino. Tenemos que contar qué pasó. Para acciones terminadas usamos el pasado simple: El motor se detuvo. JoJo se bajó.', board: ['stop → stopped · get → got', 'see → saw · check → checked'], table: { head: ['Verbo', 'Pasado simple'], rows: [['stop', '<The engine> [stopped].'], ['get', '<JoJo> [got] out.'], ['see', '<We> [saw] a purple light.']] } },
    { who: 'board', text: 'JoJo ___ out of the car.', board: ['stop → stopped · get → got', 'see → saw · check → checked'], choice: { options: ['got', 'getted', 'was get'], answer: 0, tip: 'get es irregular: got.' } },
    { who: 'leo', text: 'For what WAS HAPPENING at that moment we use the PAST CONTINUOUS: was / were + verb with -ING. You were driving. The engine was making a noise.', es: 'Para lo que estaba pasando en ese momento usamos el pasado continuo: was / were + verbo con -ing. Tú estabas manejando. El motor estaba haciendo un ruido.', board: ['I / he / she / it → was + -ing', 'you / we / they → were + -ing'], table: { head: ['Sujeto', 'Pasado continuo'], rows: [['<I>', '{was} [checking] the engine.'], ['<You>', '{were} [driving].'], ['<The engine>', '{was} [making] a noise.'], ['<We>', '{were} [looking] at the road.']] } },
    { who: 'board', text: 'We ___ at the road.', board: ['I / he / she / it → was + -ing', 'you / we / they → were + -ing'], choice: { options: ['were looking', 'was looking', 'were look'], answer: 0, tip: 'we + were + verbo con -ing.' } },
    { who: 'leo', text: 'We connect them with WHEN and WHILE. WHEN + Past Simple: the short action that interrupts. WHILE + Past Continuous: the long action. You were driving WHEN the car stopped.', es: 'Los unimos con when y while. When + pasado simple: la acción corta que interrumpe. While + pasado continuo: la acción larga. Tú estabas manejando cuando el carro se detuvo.', board: ['… when + pasado simple', 'while + pasado continuo …'], table: { head: ['Conector', 'Ejemplo'], rows: [['when', '<You> {were} [driving] {when} the car [stopped].'], ['while', '<JoJo> [got] out {while} I {was} [checking] the engine.']] } },
    { who: 'board', text: 'I was looking at the map ___ the car stopped.', board: ['… when + pasado simple', 'while + pasado continuo …'], choice: { options: ['when', 'while', 'so'], answer: 0, tip: 'La acción corta que interrumpe va con when.' } },
    { who: 'board', text: '___ we were looking at the wheels, we saw a purple light.', board: ['… when + pasado simple', 'while + pasado continuo …'], choice: { options: ['While', 'When', 'Then'], answer: 0, tip: 'La acción larga (were looking) va con while.' } },
    { who: 'leo', text: 'Now you try. First practice, then we deal with whatever is still on this road.', es: 'Ahora tú. Primero practica, luego nos ocupamos de lo que sigue en este camino.', board: ['stopped · got · saw', 'was driving · were checking'] },
  ],

  // ── A2-09 · Leo junto al molino silencioso: recetas e imperativo · some / any · how much / many · compras ──
  'recipes-some-any': [
    { who: 'leo', text: 'This mill makes flour, and flour makes bread. In a recipe we give instructions with the IMPERATIVE: the verb first, with no subject. Put the flour in a bowl. Add some water.', es: 'Este molino hace harina, y la harina hace pan. En una receta damos instrucciones con el imperativo: el verbo primero, sin sujeto. Pon la harina en un tazón. Añade un poco de agua.', board: ['Verbo base → Put the flour in a bowl.', 'Add · Mix · Bake · Wait'], table: { head: ['Paso', 'Instrucción'], rows: [['1', '[Put] the flour in a bowl.'], ['2', '[Add] some water.'], ['3', '[Mix] everything.'], ['4', '[Bake] the bread.']] } },
    { who: 'board', text: '___ the flour and the water.', board: ['Verbo base → Put the flour in a bowl.', 'Add · Mix · Bake · Wait'], choice: { options: ['Mix', 'Mixes', 'To mix'], answer: 0, tip: 'Imperativo: verbo base al principio (Mix).' } },
    { who: 'leo', text: "To say no, use DON'T + verb. Don't open the oven. Don't touch the stones. The same rules work for the mill: Open the gate. Lift the stone. Turn the wheel.", es: 'Para prohibir, usa don’t + verbo. No abras el horno. No toques las piedras. Las mismas reglas sirven para el molino: Abre la compuerta. Levanta la piedra. Gira la rueda.', board: ["Don't + verbo → Don't touch it.", 'Open · Lift · Turn · Pull'], table: { head: ['Instrucción', 'Ejemplo'], rows: [['hacer', '[Open] the gate.'], ['hacer', '[Lift] the stone.'], ['no hacer', "{Don't} [touch] the stones."]] } },
    { who: 'board', text: '___ the hot oven!', board: ["Don't + verbo → Don't touch it.", 'Open · Lift · Turn · Pull'], choice: { options: ["Don't touch", 'Not touch', "Doesn't touch"], answer: 0, tip: "Prohibir: Don't + verbo base." } },
    { who: 'leo', text: "Now, how much do we have? We use SOME in positive sentences and ANY in negatives and questions. There is some flour. There isn't any salt. Is there any water?", es: 'Ahora, ¿cuánto tenemos? Usamos some en frases afirmativas y any en negativas y preguntas. Hay algo de harina. No hay sal. ¿Hay agua?', board: ['+ some → There is some flour.', "− ? any → There isn't any salt."], table: { head: ['Forma', 'Ejemplo'], rows: [['afirmativo', 'There is {some} flour.'], ['negativo', "There isn't {any} salt."], ['pregunta', 'Are there {any} sacks?']] } },
    { who: 'board', text: "There isn't ___ flour in the sacks.", board: ['+ some → There is some flour.', "− ? any → There isn't any salt."], choice: { options: ['any', 'some', 'a'], answer: 0, tip: 'Negativo: any.' } },
    { who: 'board', text: "We have ___ wheat, but we don't have any water.", board: ['+ some → There is some flour.', "− ? any → There isn't any salt."], choice: { options: ['some', 'any', 'a'], answer: 0, tip: 'Afirmativo: some.' } },
    { who: 'leo', text: 'Flour, water and salt are not counted: HOW MUCH flour? Sacks and eggs are counted: HOW MANY sacks? And to buy something: How much is it? It is four coins.', es: 'La harina, el agua y la sal no se cuentan: ¿cuánta harina? Los sacos y los huevos sí se cuentan: ¿cuántos sacos? Y para comprar algo: ¿Cuánto cuesta? Cuesta cuatro monedas.', board: ['How much + flour / water / salt', 'How many + sacks / eggs'], table: { head: ['Pregunta', 'Ejemplo'], rows: [['no se cuenta', '{How much} flour do you need?'], ['se cuenta', '{How many} sacks are there?'], ['precio', '{How much} is this sack?']] } },
    { who: 'board', text: 'How ___ sacks do you need?', board: ['How much + flour / water / salt', 'How many + sacks / eggs'], choice: { options: ['many', 'much', 'any'], answer: 0, tip: 'sacks se cuentan: How many.' } },
    { who: 'leo', text: 'Now you try. Practice first. Then we find out why this mill is silent.', es: 'Ahora tú. Primero practica. Luego averiguamos por qué este molino está en silencio.', board: ["Put · Add · Don't touch", 'some · any · how much · how many'] },
  ],

  // ── A2-10 · Leo en su casa: Present Perfect (participios, ever/never, just/already/yet, contraste con Past Simple) ──
  'present-perfect': [
    { who: 'leo', text: 'Look at all we have done! We have been to the past. We have seen a purple light. For experiences and for things that matter now, we use the PRESENT PERFECT: have / has + participle.', es: '¡Mira todo lo que hemos hecho! Hemos ido al pasado. Hemos visto una luz morada. Para experiencias y cosas que importan ahora usamos el Present Perfect: have / has + participio.', board: ['have / has + participio', 'We have seen a light.'], table: { head: ['Sujeto', 'Present Perfect'], rows: [['<I>', '{have} [seen] a purple light.'], ['<Leo>', '{has} [been] to the past.'], ['<We>', '{have} [found] three clues.']] } },
    { who: 'board', text: 'Leo ___ found a new clue.', board: ['have / has + participio', 'We have seen a light.'], choice: { options: ['has', 'have', 'is'], answer: 0, tip: 'Leo (he) → has.' } },
    { who: 'leo', text: 'Regular verbs add -ED: stop → stopped. But many verbs are irregular, and you must learn the third form: go → gone, see → seen, find → found.', es: 'Los verbos regulares añaden -ed: stop → stopped. Pero muchos son irregulares y hay que aprender la tercera forma: go → gone, see → seen, find → found.', board: ['go → went → gone', 'see → saw → seen'], table: { head: ['Verbo', 'Pasado', 'Participio'], rows: [['go', 'went', '[gone]'], ['see', 'saw', '[seen]'], ['be', 'was / were', '[been]'], ['find', 'found', '[found]'], ['take', 'took', '[taken]'], ['write', 'wrote', '[written]']] } },
    { who: 'board', text: 'We have ___ the light three times.', board: ['go → went → gone', 'see → saw → seen'], choice: { options: ['seen', 'saw', 'see'], answer: 0, tip: 'Después de have va el participio: seen.' } },
    { who: 'leo', text: 'For experiences in your life we use EVER in questions and NEVER for "no, not one time". Have you ever seen a ghost? No, I have never seen a ghost.', es: 'Para experiencias de la vida usamos ever en preguntas y never para "ninguna vez". ¿Alguna vez has visto un fantasma? No, nunca he visto un fantasma.', board: ['Have you ever…?', 'I have never…'], table: { head: ['Forma', 'Ejemplo'], rows: [['pregunta', '{Have} <you> {ever} [been] to a museum?'], ['sí', 'Yes, I {have}.'], ['nunca', '<I> {have never} [been] to 2080.']] } },
    { who: 'board', text: 'Have you ___ been to a museum?', board: ['Have you ever…?', 'I have never…'], choice: { options: ['ever', 'never', 'yet'], answer: 0, tip: 'Pregunta de experiencia: ever.' } },
    { who: 'leo', text: "For recent things: JUST means a moment ago. ALREADY means sooner than expected. YET goes at the end of negatives and questions. I have just opened the box. Have you tidied the attic yet? I haven't tidied it yet.", es: 'Para cosas recientes: just = hace un momento. already = ya, antes de lo esperado. yet va al final en negativas y preguntas. Acabo de abrir la caja. ¿Ya ordenaste el ático? Todavía no lo he ordenado.', board: ['have just / already + participio', "… yet? · haven't … yet"], table: { head: ['Palabra', 'Ejemplo'], rows: [['just', '<I> {have just} [opened] the box.'], ['already', '<Leo> {has already} [cleaned] the attic.'], ['yet', "<We> {haven't} [finished] {yet}."]] } },
    { who: 'board', text: "We haven't opened the chest ___.", board: ['have just / already + participio', "… yet? · haven't … yet"], choice: { options: ['yet', 'already', 'just'], answer: 0, tip: 'Negativo: yet al final.' } },
    { who: 'leo', text: 'Careful! When we say WHEN it happened (yesterday, in 1996, last week), we use the PAST SIMPLE. The car stopped yesterday. Without a time: The light has stopped three machines.', es: '¡Cuidado! Cuando decimos cuándo pasó (yesterday, in 1996, last week), usamos el Past Simple. El carro se detuvo ayer. Sin momento: La luz ha detenido tres máquinas.', board: ['yesterday / in 1996 → Past Simple', 'sin momento → Present Perfect'], table: { head: ['Tiempo', 'Ejemplo'], rows: [['Past Simple', '<The car> [stopped] {yesterday}.'], ['Present Perfect', '<The light> {has} [stopped] three machines.']] } },
    { who: 'board', text: 'The mill wheel ___ last night.', board: ['yesterday / in 1996 → Past Simple', 'sin momento → Present Perfect'], choice: { options: ['stopped', 'has stopped', 'have stopped'], answer: 0, tip: 'last night es un momento terminado: Past Simple.' } },
    { who: 'leo', text: "Now you try. Practice first. Then let's go up to the attic: I have kept all our clues there.", es: 'Ahora tú. Primero practica. Luego subamos al ático: ahí he guardado todas nuestras pistas.', board: ['have seen · has been', 'ever · never · just · already · yet'] },
  ],

  // ── A2-11 · Leo en la estación de 2056: lugar, movimiento, indicaciones y transporte ──
  'places-directions': [
    { who: 'leo', text: 'Wow, 2056! To find the museum, we need to say WHERE things are. The museum is NEXT TO the park. The café is BETWEEN the bank and the station. The tower is OPPOSITE the museum.', es: '¡Guau, 2056! Para encontrar el museo hay que decir dónde están las cosas. El museo está al lado del parque. El café está entre el banco y la estación. La torre está enfrente del museo.', board: ['next to · between … and …', 'behind · in front of · opposite'], table: { head: ['Preposición', 'Ejemplo'], rows: [['al lado', '<The museum> is {next to} the park.'], ['entre', '<The café> is {between} the bank {and} the station.'], ['detrás / delante', '<The stop> is {behind} / {in front of} the tower.'], ['enfrente', '<The tower> is {opposite} the museum.']] } },
    { who: 'board', text: 'The bench is ___ the door.', board: ['next to · between … and …', 'behind · in front of · opposite'], choice: { options: ['in front of', 'in front', 'front of'], answer: 0, tip: 'in front of, siempre con of.' } },
    { who: 'leo', text: 'To say how we MOVE: ACROSS the bridge (from one side to the other), THROUGH the tunnel (inside it), ALONG the river (next to it, all the way), PAST the park (we do not stop).', es: 'Para decir cómo nos movemos: across el puente (de un lado al otro), through el túnel (por dentro), along el río (a lo largo), past el parque (pasamos sin parar).', board: ['across · through', 'along · past'], table: { head: ['Movimiento', 'Ejemplo'], rows: [['de lado a lado', '<We> [walk] {across} the bridge.'], ['por dentro', '<The tram> [goes] {through} the tunnel.'], ['a lo largo', '<We> [walk] {along} the river.'], ['por delante', '<You> [go] {past} the park.']] } },
    { who: 'board', text: 'The train goes ___ the tunnel.', board: ['across · through', 'along · past'], choice: { options: ['through', 'across', 'along'], answer: 0, tip: 'Por dentro de un túnel: through.' } },
    { who: 'leo', text: 'To GIVE directions: go straight, turn left, turn right, take the second street on the left. Then: it is on your right. To ASK: Excuse me, how can I get to the museum?', es: 'Para dar indicaciones: sigue derecho, gira a la izquierda, gira a la derecha, toma la segunda calle a la izquierda. Luego: está a tu derecha. Para preguntar: Disculpa, ¿cómo llego al museo?', board: ['go straight · turn left / right', "it's on your left / right"], table: { head: ['Uso', 'Ejemplo'], rows: [['preguntar', 'How can I {get to} the museum?'], ['girar', '[Turn] {left} at the traffic lights.'], ['calle', '[Take] the second street {on the left}.'], ['llegar', "It's {on your right}."]] } },
    { who: 'board', text: '___ left at the bridge.', board: ['go straight · turn left / right', "it's on your left / right"], choice: { options: ['Turn', 'Take', 'Go to'], answer: 0, tip: 'Girar: turn left / turn right.' } },
    { who: 'leo', text: 'And TRANSPORT: we TAKE the tram, we GET ON and GET OFF at a stop. We travel BY tram or BY bus, but ON foot. And at the ticket office: A ticket to the museum, please.', es: 'Y el transporte: tomamos el tranvía, nos subimos y nos bajamos en una parada. Viajamos en tranvía o en bus, pero a pie (on foot). Y en la taquilla: Un boleto al museo, por favor.', board: ['take · get on · get off', 'by tram · on foot'], table: { head: ['Uso', 'Ejemplo'], rows: [['tomar', '<We> [take] {the tram}.'], ['subir / bajar', '[Get on] here. [Get off] {at} Museum Bridge.'], ['medio', '{by} tram · {by} bus · {on} foot'], ['boleto', 'A ticket {to} the museum, please.']] } },
    { who: 'board', text: 'We go to the museum ___ foot.', board: ['take · get on · get off', 'by tram · on foot'], choice: { options: ['on', 'by', 'with'], answer: 0, tip: 'A pie: on foot.' } },
    { who: 'leo', text: 'Now you try. Practice first. Then we follow the signal to the museum.', es: 'Ahora tú. Primero practica. Luego seguimos la señal hasta el museo.', board: ['next to · between · opposite', 'across · through · along · past'] },
  ],

  // ── A2-12 · Leo en la sala de boletos de 2056: planes con presente continuo, going to y will; viajes y reservas ──
  'future-plans': [
    { who: 'leo', text: "All the routes are closed, and everybody's plans are a mess. To talk about plans we have THREE forms. First: a plan that is already ARRANGED (you have the ticket, the time, the meeting). We use the PRESENT CONTINUOUS: I am leaving at ten.", es: 'Todas las rutas están cerradas y los planes de todos están desordenados. Para hablar de planes tenemos tres formas. Primero: un plan ya acordado (tienes el boleto, la hora, la cita). Usamos el presente continuo: Salgo a las diez.', board: ['plan acordado → am / is / are + -ing', 'I am leaving at ten.'], table: { head: ['Sujeto', 'Plan acordado'], rows: [['<I>', '{am} [leaving] at ten.'], ['<Mrs. Kim>', '{is} [traveling] to Lake Town.'], ['<We>', '{are} [meeting] Adrián at three.']] } },
    { who: 'board', text: 'I have my ticket. I ___ for Lake Town at ten.', board: ['plan acordado → am / is / are + -ing', 'I am leaving at ten.'], choice: { options: ['am leaving', 'leave going', 'will leaving'], answer: 0, tip: 'Con boleto: plan acordado → am leaving.' } },
    { who: 'leo', text: 'Second: an INTENTION (we want to do it, but nothing is booked) or something we can SEE is coming. We use GOING TO: We are going to visit Green Valley. Look at the clouds! It is going to rain.', es: 'Segundo: una intención (queremos hacerlo, pero no hay nada reservado) o algo que vemos venir. Usamos going to: Vamos a visitar Green Valley. ¡Mira las nubes! Va a llover.', board: ['am / is / are + going to + verbo', 'intención · evidencia'], table: { head: ['Uso', 'Ejemplo'], rows: [['intención', '<We> {are going to} [visit] Green Valley.'], ['evidencia', 'Look! <It> {is going to} [rain].'], ['negativo', "<I> {'m not going to} [take] the tram."]] } },
    { who: 'board', text: 'Look at the clock! We ___ miss the tram.', board: ['am / is / are + going to + verbo', 'intención · evidencia'], choice: { options: ['are going to', 'will to', 'are missing to'], answer: 0, tip: 'Lo vemos venir: going to.' } },
    { who: 'leo', text: "Third: we decide NOW, at this moment, or we offer help, promise or give an opinion. We use WILL + verb (no TO!): The train is cancelled? OK, I'll take the next one. I'll help you. I think it will rain.", es: 'Tercero: decidimos ahora, en este momento, u ofrecemos ayuda, prometemos o damos una opinión. Usamos will + verbo (¡sin to!): ¿El tren está cancelado? Vale, tomo el siguiente. Te ayudo. Creo que lloverá.', board: ["will + verbo base → I'll take it.", "will not = won't"], table: { head: ['Uso', 'Ejemplo'], rows: [['decisión ahora', "OK, <I>{'ll} [take] the next train."], ['ofrecer', "<I>{'ll} [help] you with your bag."], ['promesa', "<I> {won't} [be] late."], ['opinión', '<I> think <it> {will} [rain].']] } },
    { who: 'board', text: "The phone is ringing! — I ___ answer it.", board: ["will + verbo base → I'll take it.", "will not = won't"], choice: { options: ['will', 'will to', 'am answer'], answer: 0, tip: 'Decisión en el momento: will + verbo base.' } },
    { who: 'leo', text: 'And for TRAVEL: we BOOK a ticket. A SINGLE ticket is one way; a RETURN ticket is there and back. The train leaves from PLATFORM 3 (no "the"). If it is late, it is DELAYED. If it is not going, it is CANCELLED. At the airport we CHECK IN.', es: 'Y para viajar: reservamos (book) un boleto. Single es solo ida; return es ida y vuelta. El tren sale del andén 3 (platform 3, sin the). Si va tarde está delayed; si no sale, cancelled. En el aeropuerto hacemos check in.', board: ['book · single / return', 'platform 3 · delayed · cancelled'], table: { head: ['Palabra', 'Ejemplo'], rows: [['book', "I'd like to [book] a ticket to Lake Town."], ['single / return', 'A {return} ticket, please.'], ['platform', 'The train leaves from {platform} 3.'], ['delayed / cancelled', 'The 10:15 is {delayed}.']] } },
    { who: 'board', text: "I'm coming back on Sunday. A ___ ticket, please.", board: ['book · single / return', 'platform 3 · delayed · cancelled'], choice: { options: ['return', 'single', 'delayed'], answer: 0, tip: 'Ida y vuelta: return.' } },
    { who: 'leo', text: "Now you try. Practice first. Then let's help the travelers… and find out what Adrián is going to do.", es: 'Ahora tú. Primero practica. Luego ayudemos a los viajeros… y averigüemos qué va a hacer Adrián.', board: ["am leaving · are going to · I'll", 'book · return · platform'] },
  ],

  // ── A2-13 · Leo en el pasillo del hospital, con la voz cada vez más ronca: salud, consejos y emergencias ──
  'health-emergency': [
    { who: 'leo', text: "(cough) Sorry… my throat. Everybody in this hospital has lost their voice. To help them, we need to talk about HEALTH. First, ask: What's the matter? or What's wrong? The answer: I've got a headache… a sore throat… a fever… a cough.", es: '(tose) Perdón… mi garganta. Todos en este hospital perdieron la voz. Para ayudarlos, tenemos que hablar de salud. Primero pregunta: What\'s the matter? o What\'s wrong? La respuesta: I\'ve got a headache… a sore throat… a fever… a cough.', board: ["What's the matter? / What's wrong?", "I've got + a headache / a cough"], table: { head: ['Sujeto', 'Síntoma'], rows: [['<I>', "{'ve got} [a headache]."], ['<He>', "{'s got} [a sore throat]."], ['<She>', '{has got} [a fever].']] } },
    { who: 'board', text: "What's the matter? — I ___ a terrible headache.", board: ["What's the matter? / What's wrong?", "I've got + a headache / a cough"], choice: { options: ['have got', 'has got', 'am got'], answer: 0, tip: 'Con I: have got (I\'ve got).' } },
    { who: 'leo', text: 'If a part of your body has pain, use HURT: My back hurts (with -s, it is one thing). My ears hurt (no -s, they are two). And for how you feel: I feel sick, I feel dizzy, I feel tired.', es: 'Si te duele una parte del cuerpo, usa hurt: My back hurts (con -s, es una sola). My ears hurt (sin -s, son dos). Y para cómo te sientes: I feel sick, I feel dizzy, I feel tired.', board: ['my back hurts · my ears hurt', 'I feel sick / dizzy / tired'], table: { head: ['Parte del cuerpo', 'Ejemplo'], rows: [['una', 'My throat {hurts}.'], ['varias', 'My feet {hurt}.'], ['sentirse', 'I {feel} [dizzy].']] } },
    { who: 'board', text: 'My throat ___. I can\'t speak very well.', board: ['my back hurts · my ears hurt', 'I feel sick / dizzy / tired'], choice: { options: ['hurts', 'hurt me', 'is hurt'], answer: 0, tip: 'Una sola parte del cuerpo: hurts.' } },
    { who: 'leo', text: "To give ADVICE we use SHOULD + verb (no TO!): You should rest. You shouldn't shout. Or: Why don't you drink some tea? And for RULES we use MUST: You must wash your hands. You mustn't run in the hospital.", es: 'Para dar consejos usamos should + verbo (¡sin to!): Deberías descansar. No deberías gritar. O: ¿Por qué no tomas un té? Y para normas usamos must: Debes lavarte las manos. No debes correr en el hospital.', board: ["should / shouldn't + verbo", "must / mustn't → normas"], table: { head: ['Uso', 'Ejemplo'], rows: [['consejo', '<You> {should} [rest].'], ['mal consejo', "<You> {shouldn't} [shout]."], ['sugerencia', "Why don't <you> [drink] some tea?"], ['norma', "<You> {mustn't} [run] here."]] } },
    { who: 'board', text: 'You have a cold. You ___ go out in the rain.', board: ["should / shouldn't + verbo", "must / mustn't → normas"], choice: { options: ["shouldn't", 'should to', "don't should"], answer: 0, tip: "Un mal plan con resfriado: shouldn't + verbo." } },
    { who: 'leo', text: "And in an EMERGENCY, on the phone: the operator asks: What's your emergency? You say what happened: My friend has fainted. I need an ambulance. Then where you are: We are ON the second floor. And: Please come quickly!", es: 'Y en una emergencia, por teléfono: el operador pregunta: What\'s your emergency? Dices qué pasó: Mi amigo se desmayó. Necesito una ambulancia. Luego dónde estás: Estamos en el segundo piso (on). Y: ¡Por favor vengan rápido!', board: ["What's your emergency?", 'I need an ambulance · on the second floor'], table: { head: ['Operador', 'Tú'], rows: [["What's your emergency?", 'My friend {has fainted}.'], ['Where are you?', 'We are {on} the second floor.'], ['Is he breathing?', 'Yes, he {is}. Please come [quickly]!']] } },
    { who: 'board', text: "Where are you? — We're ___ the second floor of the hospital.", board: ["What's your emergency?", 'I need an ambulance · on the second floor'], choice: { options: ['on', 'in', 'at'], answer: 0, tip: 'Pisos de un edificio: on the second floor.' } },
    { who: 'leo', text: "(whispering) Now you try… Practice first. My voice is going… If I can't speak, you must speak for both of us.", es: '(susurrando) Ahora tú… Primero practica. Mi voz se está yendo… Si no puedo hablar, tú tienes que hablar por los dos.', board: ["I've got · hurts · should", "What's your emergency?"] },
  ],
  // Misión secundaria "Make a Wish" (Busuu A2 cap. 31): preferencias, deseos y primer condicional
  'wishes-conditional': [
    { who: 'leo', text: "Shh! It's a secret: today is a very special birthday, and we are preparing a surprise party. First, we need to know what people WANT. We use I'D LIKE: I'd like a big cake. I'd like to dance.", es: '¡Shh! Es un secreto: hoy es un cumpleaños muy especial y estamos preparando una fiesta sorpresa. Primero tenemos que saber qué QUIERE la gente. Usamos I\'d like: Me gustaría un pastel grande. Me gustaría bailar.', board: ["I'd like + cosa", "I'd like to + verbo"], table: { head: ['Forma', 'Ejemplo'], rows: [['cosa', "<I>{'d like} a big cake."], ['verbo', "<I>{'d like to} [dance]."], ['pregunta', '{Would} <you> {like} some juice?']] } },
    { who: 'board', text: 'Would you like ___ a game?', board: ["I'd like + cosa", "I'd like to + verbo"], choice: { options: ['to play', 'play', 'playing'], answer: 0, tip: 'would like + to + verbo: to play.' } },
    { who: 'leo', text: "When we choose between two things, we use I'D RATHER + verb (no TO!) or I'D PREFER + noun. Would you rather eat inside or outside? I'd rather eat outside. I'd prefer pizza.", es: 'Cuando elegimos entre dos cosas usamos I\'d rather + verbo (¡sin to!) o I\'d prefer + sustantivo. ¿Prefieres comer adentro o afuera? Prefiero comer afuera. Prefiero pizza.', board: ["I'd rather + verbo (sin to)", "I'd prefer + cosa"], table: { head: ['Forma', 'Ejemplo'], rows: [['rather', "<I>{'d rather} [eat] outside."], ['prefer', "<I>{'d prefer} pizza."], ['pregunta', '{Would} <you> {rather} [dance] or [sing]?']] } },
    { who: 'board', text: "I'd rather ___ in the garden.", board: ["I'd rather + verbo (sin to)", "I'd prefer + cosa"], choice: { options: ['stay', 'to stay', 'staying'], answer: 0, tip: "I'd rather + verbo tal cual, sin to: stay." } },
    { who: 'leo', text: 'For birthdays we say what we wish for the other person with I HOPE: I hope you have a great year. I hope all your wishes come true.', es: 'En los cumpleaños decimos lo que le deseamos a la otra persona con I hope: Espero que tengas un gran año. Espero que se cumplan todos tus deseos.', board: ['I hope + frase', 'I hope you have a great year.'], table: { head: ['Uso', 'Ejemplo'], rows: [['a otra persona', '<I> {hope} you [have] a great year.'], ['deseos', '<I> {hope} all your wishes [come] true.'], ['para mí', '<I> {hope to} [travel] next year.']] } },
    { who: 'board', text: 'I hope you ___ a wonderful birthday!', board: ['I hope + frase', 'I hope you have a great year.'], choice: { options: ['have', 'to have', 'having'], answer: 0, tip: 'I hope + you + verbo: you have.' } },
    { who: 'leo', text: "But what if something goes wrong? For possible situations in the future we use the FIRST CONDITIONAL: IF + present, WILL + verb. If it rains, we'll move the party inside.", es: 'Pero ¿y si algo sale mal? Para situaciones posibles en el futuro usamos el primer condicional: if + presente, will + verbo. Si llueve, pasaremos la fiesta adentro.', board: ['If + presente, will + verbo', "If it rains, we'll move inside."], table: { head: ['Si… (presente)', 'entonces… (will)'], rows: [['{If} it [rains],', "<we>{'ll} [move] inside."], ['{If} our friend [arrives] early,', "<we>{'ll} [hide] in the kitchen."], ['{If} the cake [falls],', '<Leo> {will} [cry]!']] } },
    { who: 'board', text: "If it ___, we'll eat in the living room.", board: ['If + presente, will + verbo', "If it rains, we'll move inside."], choice: { options: ['rains', 'will rain', 'rain'], answer: 0, tip: 'Después de if va el presente (rains), nunca will.' } },
    { who: 'leo', text: "Negatives and questions work the same way. If we don't hurry, we won't finish. What will you do if the cake falls?", es: 'Los negativos y las preguntas funcionan igual. Si no nos apuramos, no terminaremos. ¿Qué harás si se cae el pastel?', board: ["If + don't / doesn't…, won't…", 'What will you do if…?'], table: { head: ['Forma', 'Ejemplo'], rows: [['negativo', "{If} <we> {don't} [hurry], <we> {won't} [finish]."], ['pregunta', 'What {will} <you> [do] {if} the cake [falls]?']] } },
    { who: 'board', text: "If we don't hurry, we ___ finish on time.", board: ["If + don't / doesn't…, won't…", 'What will you do if…?'], choice: { options: ["won't", "don't", 'will not to'], answer: 0, tip: "Resultado negativo: won't + verbo." } },
    { who: 'leo', text: "Great! Now practice with me. If you practice, you'll be the best party planner!", es: '¡Genial! Ahora practica conmigo. ¡Si practicas, serás el mejor organizador de fiestas!', board: ["I'd like · I'd rather · I hope", 'If + presente, will + verbo'] },
  ],
  // Misión secundaria "Market Day" (Busuu A2 caps. 19 y 20): ropa, probarse ropa, precios, descuentos y devoluciones
  'clothes-shopping': [
    { who: 'leo', text: "Sale day! Everything is cheaper today. First, CLOTHES and SIZES. The color goes before the clothes: a black jacket, blue jeans. Sizes are S, M, L: small, medium, large. To say what you have on, use WEAR: I'm wearing a red T-shirt.", es: '¡Día de rebajas! Hoy todo es más barato. Primero, ropa y tallas. El color va antes de la prenda: una chaqueta negra, jeans azules. Las tallas son S, M, L: pequeña, mediana, grande. Para decir qué llevas puesto usa wear: Llevo una camiseta roja.', board: ['a black jacket · blue jeans', 'size S · M · L'], table: { head: ['Uso', 'Ejemplo'], rows: [['buscar', "<I>'m {looking for} a [black] jacket."], ['talla', 'What {size} are <you>? — <I>\'m a {medium}.'], ['llevar puesto', "<I>'m {wearing} a red T-shirt."]] } },
    { who: 'board', text: "I'm looking for ___.", board: ['a black jacket · blue jeans', 'size S · M · L'], choice: { options: ['a green jacket', 'a jacket green', 'green a jacket'], answer: 0, tip: 'El color va antes de la prenda: a green jacket.' } },
    { who: 'leo', text: "Before you buy, TRY IT ON. One thing: try IT on. Two things, like jeans or shoes: try THEM on. IT and THEM go in the middle! Then: It FITS (the size is OK). It SUITS you (it looks good on you). Or: It's TOO big. It isn't big ENOUGH.", es: 'Antes de comprar, pruébatelo. Una cosa: try it on. Varias, como jeans o zapatos: try them on. ¡It y them van en medio! Luego: It fits (la talla está bien). It suits you (te ves bien). O: Es demasiado grande. No es lo bastante grande.', board: ['try it on · try them on', 'too big · not big enough'], table: { head: ['Uso', 'Ejemplo'], rows: [['una cosa', 'Can <I> {try it on}?'], ['plural', 'Can <I> {try them on}? (jeans, shoes)'], ['talla', 'It {fits} perfectly. / It\'s {too} [small].'], ['enough', "It isn't [long] {enough}."]] } },
    { who: 'board', text: 'These shoes look nice. Can I try ___?', board: ['try it on · try them on', 'too big · not big enough'], choice: { options: ['them on', 'on them', 'it on'], answer: 0, tip: 'shoes es plural → them, y en medio: try them on.' } },
    { who: 'leo', text: "Now PRICES. One thing: How much IS it? Many things: How much ARE they? On sale means cheaper. 20% OFF: a $50 jacket is $40. HALF PRICE: the price divided by two. Pay BY card or IN cash. And if you like it: I'll take it!", es: 'Ahora los precios. Una cosa: How much is it? Varias: How much are they? On sale significa más barato. 20% off: una chaqueta de 50 dólares queda en 40. Half price: el precio dividido entre dos. Se paga by card o in cash. Y si te gusta: ¡me lo llevo!', board: ['How much is it? · How much are they?', 'on sale · 20% off · half price'], table: { head: ['Uso', 'Ejemplo'], rows: [['precio', '{How much} is this scarf?'], ['rebaja', 'The coat is {on sale}: {20% off}.'], ['pagar', '{By} card, please. / {In} cash.'], ['comprar', "It's a {bargain}. <I>'ll [take] it!"]] } },
    { who: 'board', text: 'The jeans are $40, half price. So they are ___.', board: ['How much is it? · How much are they?', 'on sale · 20% off · half price'], choice: { options: ['$20', '$40', '$80'], answer: 0, tip: 'Half price = la mitad: $40 → $20.' } },
    { who: 'leo', text: "And if there's a problem, you can RETURN it. Take the RECEIPT, the paper from the shop. Then say what you want: a REFUND (your money back) or an EXCHANGE (another size or color).", es: 'Y si hay un problema, puedes devolverlo (return). Lleva el recibo (receipt), el papel de la tienda. Luego di qué quieres: un refund (que te devuelvan el dinero) o un exchange (otra talla u otro color).', board: ["I'd like to return this.", 'receipt · refund · exchange'], table: { head: ['Uso', 'Ejemplo'], rows: [['devolver', "<I>'d like to {return} this shirt."], ['problema', "It's [too small]. / It has a hole."], ['dinero', 'Can <I> have a {refund}?'], ['cambio', 'Can <I> {exchange} it for a [bigger] size?']] } },
    { who: 'board', text: 'Have you got the ___? — Yes, here it is.', board: ["I'd like to return this.", 'receipt · refund · exchange'], choice: { options: ['receipt', 'recipe', 'refund'], answer: 0, tip: 'El papel de la compra: receipt. (recipe es una receta de cocina).' } },
    { who: 'leo', text: "Ready? Practice with me first. Then go and find your friend in the shop. And be careful: sale days are a battlefield!", es: '¿Listo? Primero practica conmigo. Luego busca a tu acompañante en la tienda. Y ten cuidado: ¡los días de rebajas son un campo de batalla!', board: ['try it on · too big · enough', 'How much…? · receipt · refund'] },
  ],
  // Misión secundaria "A Dinner to Remember" (Busuu A2 caps. 18 y 27, más much / many): platos, sabores, cantidades y conversación en la mesa
  'food-dinner': [
    { who: 'leo', text: "Dinner time! First, FLAVORS. Sugar is SWEET. Salt is SALTY. Lemons are SOUR. Black coffee is BITTER. Chili is SPICY. To ask: What does it taste like? — It tastes like chicken.", es: '¡Hora de cenar! Primero, los sabores. El azúcar es dulce. La sal es salada. Los limones son ácidos. El café negro es amargo. El ají es picante. Para preguntar: ¿A qué sabe? — Sabe a pollo.', board: ['sweet · salty · sour', 'bitter · spicy'], table: { head: ['Sabor', 'Ejemplo'], rows: [['dulce', 'The cake is very {sweet}.'], ['salado', 'The soup is a bit {salty}.'], ['ácido', 'Lemons are {sour}.'], ['picante', 'Be careful! The sauce is {spicy}.'], ['saber a', 'What does it {taste like}? — It tastes like [mango].']] } },
    { who: 'board', text: 'This sauce has a lot of chili. It is very ___.', board: ['sweet · salty · sour', 'bitter · spicy'], choice: { options: ['spicy', 'sweet', 'sour'], answer: 0, tip: 'Con mucho ají o chile: spicy.' } },
    { who: 'leo', text: "And how do we COOK it? In hot oil: FRIED. In the oven: ROASTED. On a grill: GRILLED. In hot water: BOILED. Not cooked: RAW. The word goes before the food: fried plantain, roasted chicken.", es: 'Y ¿cómo lo cocinamos? En aceite caliente: frito. En el horno: asado. En la parrilla: a la parrilla. En agua hirviendo: hervido. Sin cocinar: crudo. La palabra va antes de la comida: plátano frito, pollo asado.', board: ['fried · roasted · grilled', 'boiled · raw'], table: { head: ['Cómo', 'Ejemplo'], rows: [['en aceite', '{fried} [plantain]'], ['en el horno', '{roasted} [chicken]'], ['a la parrilla', '{grilled} [fish]'], ['en agua', '{boiled} [eggs]']] } },
    { who: 'board', text: 'We cook the potatoes in hot oil. They are ___ potatoes.', board: ['fried · roasted · grilled', 'boiled · raw'], choice: { options: ['fried', 'boiled', 'raw'], answer: 0, tip: 'En aceite caliente: fried.' } },
    { who: 'leo', text: "Now QUANTITIES. Some food you can count: one egg, two eggs. Use HOW MANY. Some food you can't count: rice, salt, milk. Use HOW MUCH. A LOT OF works for both. A FEW eggs, but A LITTLE salt.", es: 'Ahora las cantidades. Hay comida que se cuenta: un huevo, dos huevos. Usa How many. Hay comida que no se cuenta: arroz, sal, leche. Usa How much. A lot of sirve para las dos. A few eggs (unos pocos), pero a little salt (un poco).', board: ['How many eggs? · How much rice?', 'a few eggs · a little salt · a lot of'], table: { head: ['Uso', 'Ejemplo'], rows: [['se cuenta', '{How many} [eggs] do we need?'], ['no se cuenta', '{How much} [rice] is there?'], ['poco (contable)', 'There are {a few} tomatoes.'], ['poco (incontable)', 'Add {a little} salt.'], ['mucho', 'We have {a lot of} [fruit].']] } },
    { who: 'board', text: 'How ___ plates do we need? We are six.', board: ['How many eggs? · How much rice?', 'a few eggs · a little salt · a lot of'], choice: { options: ['many', 'much', 'little'], answer: 0, tip: 'plates se cuentan → How many.' } },
    { who: 'leo', text: "At the table, use HOW questions: How WAS the soup? How OFTEN do you cook? How do you MAKE it? To ask for something: Could you PASS the salt, please? To offer: Would you like some MORE? — Yes, please. / No, thank you, I'm FULL.", es: 'En la mesa, usa preguntas con how: ¿Qué tal estuvo la sopa? ¿Con qué frecuencia cocinas? ¿Cómo lo preparas? Para pedir algo: ¿Me pasas la sal, por favor? Para ofrecer: ¿Quieres más? — Sí, por favor. / No, gracias, estoy lleno.', board: ['How was…? · How often…? · How do you make…?', 'Could you pass…? · Would you like some more?'], table: { head: ['Uso', 'Ejemplo'], rows: [['opinión', '{How was} the [soup]? — It was delicious!'], ['frecuencia', '{How often} do <you> cook? — Every Sunday.'], ['receta', '{How do} <you> {make} it?'], ['pedir', '{Could you pass} the [salt], please?'], ['ofrecer', '{Would you like} some more [juice]?']] } },
    { who: 'board', text: 'Would you like some more cake? — No, thank you. I\'m ___.', board: ['How was…? · How often…? · How do you make…?', 'Could you pass…? · Would you like some more?'], choice: { options: ['full', 'hungry', 'thirsty'], answer: 0, tip: "Ya comí suficiente: I'm full." } },
    { who: 'leo', text: "Ready? Practice with me. Then go to the kitchen: my mom needs help. And don't eat everything before dinner!", es: '¿Listo? Practica conmigo. Luego ve a la cocina: mi mamá necesita ayuda. ¡Y no te comas todo antes de la cena!', board: ['sweet · spicy · fried · roasted', 'How much / many? · Could you pass…?'] },
  ],
  // Amistad en A2 (Busuu A2 caps. 1, 2 y 4): personalidad, familia ampliada y relaciones. Solo para el repaso.
  'people-relationships': [
    { who: 'leo', text: "Let's talk about PEOPLE. To ask about personality: What is he LIKE? — He's friendly and a bit shy. Careful! What does he LOOK like? is about his face and body. What does he like? is about his hobbies.", es: 'Hablemos de personas. Para preguntar por la personalidad: What is he like? — Es amable y un poco tímido. ¡Cuidado! What does he look like? es sobre su cara y su cuerpo. What does he like? es sobre sus gustos.', board: ['What is he like? → personalidad', 'What does he look like? → aspecto'], table: { head: ['Palabra', 'Ejemplo'], rows: [['amable', 'Maya is very {friendly}.'], ['tímido', '<He> is a bit {shy}.'], ['honesto', '<She> never tells lies. She is {honest}.'], ['generoso', '<He> always shares. He is {generous}.'], ['mandón', "<She> tells everybody what to do. She's {bossy}."], ['tranquilo', "<He> never gets angry. He's {easy-going}."]] } },
    { who: 'board', text: 'What is your cousin ___? — She is funny and kind.', board: ['What is he like? → personalidad', 'What does he look like? → aspecto'], choice: { options: ['like', 'look like', 'likes'], answer: 0, tip: 'Personalidad: What is she like?' } },
    { who: 'leo', text: "Now the BIG family. Your mother's brother is your UNCLE. His children are your COUSINS. Your sister's son is your NEPHEW, her daughter is your NIECE. Your dad's new wife is your STEPMOTHER. No brothers or sisters? You're an ONLY CHILD.", es: 'Ahora la familia grande. El hermano de tu mamá es tu tío (uncle). Sus hijos son tus primos (cousins). El hijo de tu hermana es tu sobrino (nephew), su hija es tu sobrina (niece). La nueva esposa de tu papá es tu madrastra (stepmother). ¿Sin hermanos? Eres hijo único (an only child).', board: ["my mother's brother = my uncle", 'cousin · nephew · niece'], table: { head: ['Quién', 'En inglés'], rows: [['tío / tía', '{uncle} / {aunt}'], ['primo / prima', '{cousin}'], ['sobrino / sobrina', '{nephew} / {niece}'], ['nieto / nieta', '{grandson} / {granddaughter}'], ['madrastra', '{stepmother}'], ['suegra', '{mother-in-law}']] } },
    { who: 'board', text: "My uncle's son is my ___.", board: ["my mother's brother = my uncle", 'cousin · nephew · niece'], choice: { options: ['cousin', 'nephew', 'brother'], answer: 0, tip: 'Los hijos de tus tíos son tus cousins.' } },
    { who: 'leo', text: "And RELATIONSHIPS. If you GET ON WELL WITH someone, you're happy together. If you FALL OUT, you have a big argument. Then you say sorry and MAKE UP. Good friends TRUST each other and HAVE A LOT IN COMMON.", es: 'Y las relaciones. Si te llevas bien con alguien (get on well with), están felices juntos. Si se pelean (fall out), tienen una gran discusión. Luego se piden perdón y se reconcilian (make up). Los buenos amigos confían uno en el otro (trust) y tienen mucho en común.', board: ['get on well with · fall out · make up', 'trust · have a lot in common'], table: { head: ['Uso', 'Ejemplo'], rows: [['llevarse bien', '<I> {get on well with} my cousins.'], ['pelearse', '<We> {fell out} last week.'], ['reconciliarse', 'But then <we> {made up}.'], ['confiar', '<I> {trust} my best friend.'], ['en común', '<We> {have a lot in common}.']] } },
    { who: 'board', text: 'We fell out on Monday, but we ___ up on Tuesday.', board: ['get on well with · fall out · make up', 'trust · have a lot in common'], choice: { options: ['made', 'did', 'fell'], answer: 0, tip: 'Reconciliarse: make up → pasado made up.' } },
  ],  // Make a Wish, después de la fiesta (Busuu A2 cap. 14): tareas de la casa, do / make y Present Perfect con tareas
  housework: [
    { who: 'leo', text: "What a party! And what a mess... Now we have to TIDY UP. In English the house jobs are called CHORES: do the dishes, sweep the floor, take out the trash, make the bed, do the laundry.", es: '¡Qué fiesta! Y qué desorden... Ahora tenemos que ordenar (tidy up). En inglés los oficios de la casa se llaman chores: lavar los platos, barrer el piso, sacar la basura, tender la cama, lavar la ropa.', board: ['do the dishes · sweep the floor', 'take out the trash · make the bed'], table: { head: ['Tarea', 'Ejemplo'], rows: [['lavar los platos', '<I> [do] the dishes.'], ['barrer', '<You> [sweep] the floor.'], ['sacar la basura', '<Leo> [takes out] the trash.'], ['ordenar', "<Let's> [tidy up] the garden."]] } },
    { who: 'board', text: 'The trash can is full. Can you ___ out the trash?', board: ['do the dishes · sweep the floor', 'take out the trash · make the bed'], choice: { options: ['take', 'make', 'do'], answer: 0, tip: 'Sacar la basura: take out the trash.' } },
    { who: 'leo', text: 'Careful with DO and MAKE! We use DO for jobs and tasks: do the dishes, do the shopping, do homework. We use MAKE when we create something: make a cake, make the bed, make a mess, make a mistake.', es: '¡Cuidado con do y make! Usamos do para trabajos y tareas: lavar los platos, hacer las compras, hacer la tarea. Usamos make cuando creamos algo: hacer un pastel, tender la cama, hacer un desorden, cometer un error.', board: ['do → tareas: the dishes, homework', 'make → crear: a cake, a mess, the bed'], table: { head: ['do', 'make'], rows: [['{do} the dishes', '{make} a cake'], ['{do} the shopping', '{make} the bed'], ['{do} homework', '{make} a mess'], ['{do} the laundry', '{make} a mistake']] } },
    { who: 'board', text: 'The children ___ a big mess in the garden!', board: ['do → tareas: the dishes, homework', 'make → crear: a cake, a mess, the bed'], choice: { options: ['made', 'did', 'took'], answer: 0, tip: 'Crear un desorden: make a mess → pasado made.' } },
    { who: 'board', text: 'Who is going to ___ the dishes?', board: ['do → tareas: the dishes, homework', 'make → crear: a cake, a mess, the bed'], choice: { options: ['do', 'make', 'take'], answer: 0, tip: 'Lavar los platos es una tarea: do the dishes.' } },
    { who: 'leo', text: "To check what is finished, we use the PRESENT PERFECT: Have you done the dishes yet? Yes, I've already done them. I haven't taken out the trash yet.", es: 'Para revisar qué está terminado usamos el Present Perfect: ¿Ya lavaste los platos? Sí, ya los lavé. Todavía no he sacado la basura.', board: ['Have you done… yet?', "I've already… · I haven't… yet"], table: { head: ['Forma', 'Ejemplo'], rows: [['pregunta', '{Have} <you> [done] the dishes {yet}?'], ['ya', "<I>{'ve already} [swept] the floor."], ['todavía no', "<I> {haven't} [taken out] the trash {yet}."]] } },
    { who: 'board', text: "I've already ___ the floor. Look, it's clean!", board: ['Have you done… yet?', "I've already… · I haven't… yet"], choice: { options: ['swept', 'sweeped', 'sweep'], answer: 0, tip: 'sweep es irregular: swept.' } },
    { who: 'leo', text: "And to share the chores: It's your turn to do the dishes. Whose turn is it? Can you give me a hand?", es: 'Y para repartir las tareas: Te toca lavar los platos. ¿A quién le toca? ¿Me das una mano?', board: ["It's your turn to + verbo", 'Can you give me a hand?'], table: { head: ['Uso', 'Ejemplo'], rows: [['turno', "It's {your turn to} [do] the dishes."], ['preguntar', '{Whose turn} is it?'], ['pedir ayuda', 'Can you {give me a hand}?']] } },
    { who: 'leo', text: "OK, enough talking. Let's practice, and then let's tidy up together!", es: 'Bueno, suficiente charla. ¡Practiquemos y luego ordenemos juntos!', board: ['do the dishes · make the bed', 'Have you done… yet?'] },
  ],
  // Vacaciones y alojamiento (Busuu A2 cap. 25): se abre en el repaso con la postal de Maya (amistad A2)
  holidays: [
    { who: 'leo', text: 'There are many kinds of HOLIDAYS: a beach holiday, a camping trip, a city break to go sightseeing. Where do you prefer to go?', es: 'Hay muchos tipos de vacaciones: vacaciones en la playa, un viaje de camping, una escapada a la ciudad para hacer turismo. ¿A dónde prefieres ir?', board: ['a beach holiday · a camping trip', 'a city break · go sightseeing'] },
    { who: 'leo', text: 'Where do you sleep? At a hotel, a hostel or a campsite. At a hotel you BOOK a room: a SINGLE room is for one person, a DOUBLE room is for two. You CHECK IN when you arrive and CHECK OUT when you leave.', es: '¿Dónde duermes? En un hotel, un hostal o un camping. En un hotel reservas (book) una habitación: single es para una persona, double es para dos. Haces check in al llegar y check out al irte.', board: ['hotel · hostel · campsite', 'book a room · check in / check out'], table: { head: ['Uso', 'Ejemplo'], rows: [['reservar', "<I>{'d like to} [book] a double room."], ['llegar', '<We> [checked in] at three.'], ['irse', '<We> [check out] on Sunday.']] } },
    { who: 'board', text: "I'd like to ___ a single room for two nights, please.", board: ['hotel · hostel · campsite', 'book a room · check in / check out'], choice: { options: ['book', 'make', 'do'], answer: 0, tip: 'Reservar: book a room.' } },
    { who: 'leo', text: "On a POSTCARD we tell where we are and what we did: We're staying at a small hotel. Yesterday we went snorkeling. And we finish with: Wish you were here!", es: 'En una postal contamos dónde estamos y qué hicimos: Nos estamos quedando en un hotel pequeño. Ayer fuimos a bucear. Y terminamos con: ¡Ojalá estuvieras aquí!', board: ["We're staying at…", 'Yesterday we went… · Wish you were here!'], table: { head: ['Uso', 'Ejemplo'], rows: [['dónde', "<We>{'re staying} at a small hotel."], ['qué hicimos', 'Yesterday <we> [went] snorkeling.'], ['despedida', 'Wish you were here!']] } },
    { who: 'board', text: "We're staying ___ a campsite near the lake.", board: ["We're staying at…", 'Yesterday we went… · Wish you were here!'], choice: { options: ['at', 'on', 'to'], answer: 0, tip: 'stay at + lugar: at a campsite.' } },
  ],
  // ── B1-01 · The Accident: Leo escribe por el teléfono. Contar una historia (was -ing + when / while) y causa y efecto ──
  'cause-effect': [
    { who: 'leo', text: 'I read your message. A fire... and a man who lost his voice. That sounds terrible.', es: 'Leí tu mensaje. Un incendio... y un hombre que perdió la voz. Suena terrible.' },
    { who: 'leo', text: "Let's check how you told it. When you tell a story, you mix two past tenses.", es: 'Veamos cómo lo contaste. Cuando cuentas una historia, mezclas dos tiempos del pasado.' },
    {
      who: 'leo',
      text: 'Look: "I was cleaning the board when the alarm rang."',
      es: 'Mira: "Yo estaba limpiando la pizarra cuando sonó la alarma."',
      board: ['I was cleaning the board', 'when the alarm rang.'],
      table: { head: ['Acción larga (el fondo)', 'Acción corta (interrumpe)'], rows: [['<I> [was cleaning] the board', '{when} <the alarm> [rang].']], arrow: true },
    },
    { who: 'leo', text: 'Past continuous (was/were + -ing) is the background: what was happening. Past simple is the event that interrupts it.', es: 'El past continuous (was/were + -ing) es el fondo: lo que estaba pasando. El past simple es el hecho que lo interrumpe.' },
    { who: 'leo', text: "With 'while', the long action comes right after it: 'While we were walking, the lights went out.'", es: "Con 'while', la acción larga va justo después: 'Mientras caminábamos, se fue la luz.'", board: ['While we were walking,', 'the lights went out.'] },
    { who: 'board', text: 'My friend ___ at the door when the alarm rang.', board: ['was / were + -ing', '+ when + past simple'], choice: { options: ['was waiting', 'were waiting', 'is waiting'], answer: 0, tip: 'Acción en progreso cuando algo la interrumpe: was waiting (my friend = he → was).' } },
    { who: 'leo', text: 'Now the new part: WHY something happened, and what happened AS A RESULT.', es: 'Ahora lo nuevo: POR QUÉ pasó algo y qué pasó COMO RESULTADO.', board: ['because + oración', 'because of + sustantivo'] },
    {
      who: 'leo',
      text: 'Look at these two sentences. They say the same thing in two ways.',
      es: 'Mira estas dos frases. Dicen lo mismo de dos maneras.',
      table: { head: ['Estructura', 'Ejemplo'], rows: [['because + <oración>', '<He> [lost] his voice {because} <the smoke was thick>.'], ['because of + sustantivo', '<He> [lost] his voice {because of} the smoke.']] },
    },
    { who: 'leo', text: 'Because + a full sentence (subject + verb). Because of + just a noun: the smoke, the fire, the heat.', es: 'Because + una oración completa (sujeto + verbo). Because of + solo un sustantivo: el humo, el fuego, el calor.' },
    { who: 'board', text: "He couldn't breathe ___ the smoke.", board: ['because + oración', 'because of + sustantivo'], choice: { options: ['because of', 'because', 'so'], answer: 0, tip: 'Después viene un sustantivo (the smoke), no una oración: because of.' } },
    { who: 'leo', text: "Now the result. 'So' goes before the result. 'As a result' starts a new sentence, with a comma.", es: "Ahora el resultado: 'so' va antes del resultado. 'As a result' empieza una frase nueva, con coma.", board: ['…, so + resultado', 'As a result, + oración'] },
    {
      who: 'leo',
      text: 'Look at the result in each sentence.',
      es: 'Mira el resultado en cada frase.',
      table: { rows: [['<The stairs> [were] full of smoke, {so} <we> [used] the fire exit.'], ['<The smoke> [was] thick. {As a result}, <he> [lost] his voice.']] },
    },
    { who: 'board', text: 'The alarm rang, ___ everybody left the building.', board: ['…, so + resultado', 'As a result, + oración'], choice: { options: ['so', 'because of', 'as a result of'], answer: 0, tip: 'Es el resultado: so (así que).' } },
    { who: 'leo', text: 'Reason: because / because of. Result: so / as a result. Ready to practice?', es: 'Causa: because / because of. Resultado: so / as a result. ¿Listo para practicar?', board: ['because · because of', 'so · as a result'] },
  ],
  // B1-02 · A New City: Leo en el aeropuerto, junto a la cinta de equipaje
  'pp-yet-already': [
    { who: 'leo', text: "We've landed! Welcome to Lumen Bay. Let's find our bags.", es: '¡Aterrizamos! Bienvenido a Lumen Bay. Busquemos nuestras maletas.' },
    { who: 'leo', text: "Look at the board. Some things have already happened. Other things haven't happened yet.", es: 'Mira el tablero. Algunas cosas ya pasaron. Otras todavía no.' },
    {
      who: 'board',
      text: "I've already found my bag. I haven't found my phone yet.",
      board: ["I've already found my bag.", "I haven't found my phone yet."],
      table: { head: ['Idea', 'Ejemplo'], rows: [['Ya (afirmativo)', '<I> [have] {already} [found] my bag.'], ['Todavía no (negativo)', "<I> [haven't] [found] my phone {yet}."], ['¿Ya? (pregunta)', '[Have] <you> [found] your bag {yet}?']] },
    },
    { who: 'leo', text: "'Already' goes in the middle: have + already + participle. 'Yet' goes at the end, in questions and negatives.", es: "'Already' va en medio: have + already + participio. 'Yet' va al final, en preguntas y negativas." },
    { who: 'board', text: "I haven't found my bag ___.", choice: { options: ['yet', 'already', 'just'], answer: 0, tip: "Negativa, 'todavía no': yet, al final." } },
    { who: 'leo', text: "'Just' means a very short time ago: 'I've just landed.' It also goes in the middle.", es: "'Just' significa hace muy poco: 'I've just landed.' También va en medio." },
    { who: 'board', text: 'Look! The plane ___ landed.', choice: { options: ['has just', 'just has', 'has yet'], answer: 0, tip: "'just' va entre has y el participio: has just landed." } },
    { who: 'leo', text: "Careful: with a finished time like 'yesterday' or 'last night', we use the past simple, not the present perfect.", es: "Ojo: con un momento terminado como 'yesterday' o 'last night', usamos el past simple, no el present perfect." },
    {
      who: 'board',
      text: "I've lost my bag. I lost my bag yesterday.",
      board: ["I've lost my bag. (it is missing now)", 'I lost my bag yesterday. (finished time)'],
      table: { head: ['Present perfect', 'Past simple'], rows: [['Resultado que importa ahora: <I> [have lost] my bag.', 'Momento terminado: <I> [lost] my bag {yesterday}.']] },
    },
    { who: 'board', text: 'I ___ my passport at the hotel yesterday.', choice: { options: ['left', 'have left', 'has left'], answer: 0, tip: "'yesterday' es un momento terminado: past simple (left)." } },
    { who: 'leo', text: "Ready? Let's practice, and then we'll find those bags.", es: '¿Listo? Practiquemos y después buscamos esas maletas.' },
  ],
  // B1-02 · A New City: Leo en la oficina del intercambio, después de la agenda de Ms. Haddad
  'futures-b1': [
    { who: 'leo', text: 'This is the Exchange Office. Ms. Haddad uses three different ways to talk about the future.', es: 'Esta es la oficina del intercambio. La Sra. Haddad usa tres formas distintas de hablar del futuro.' },
    { who: 'leo', text: "First: 'going to' is for plans we have already decided. 'We're going to visit the old port.'", es: "Primero: 'going to' es para planes que ya decidimos. 'We're going to visit the old port.'" },
    {
      who: 'board',
      text: "We're going to visit the old port. I'm going to buy a SIM card.",
      board: ["We're going to visit the old port.", "I'm going to buy a SIM card."],
      table: { head: ['Uso', 'Ejemplo'], rows: [['Plan ya decidido', '<We> [are going to] [visit] the old port.'], ['Plan personal', '<I> [am going to] [buy] a SIM card.']] },
    },
    { who: 'board', text: "I ___ a new phone next week. I've already decided.", choice: { options: ['am going to buy', 'am going buy', 'going to buying'], answer: 0, tip: 'Plan decidido: am going to + verbo base.' } },
    { who: 'leo', text: "Second: the present continuous, for fixed appointments with a time. 'We're meeting Ms. Haddad at nine.'", es: "Segundo: el presente continuo, para citas fijas con una hora. 'We're meeting Ms. Haddad at nine.'" },
    {
      who: 'board',
      text: "We're meeting Ms. Haddad at nine. I'm flying home on Friday.",
      board: ["We're meeting Ms. Haddad at nine.", "I'm flying home on Friday."],
      table: { head: ['Uso', 'Ejemplo'], rows: [['Cita fija (hora o día)', '<We> [are meeting] Ms. Haddad {at nine}.'], ['Viaje ya organizado', '<I> [am flying] home {on Friday}.']] },
    },
    { who: 'board', text: "We ___ Ms. Haddad at nine tomorrow. It's on the agenda.", choice: { options: ['are meeting', 'will meeting', 'meet to'], answer: 0, tip: 'Cita fija con hora: presente continuo (are meeting).' } },
    { who: 'leo', text: "Third: 'will', for decisions we make at the moment of speaking, and for predictions. 'The bus is late. I'll take a taxi.'", es: "Tercero: 'will', para decisiones que tomamos al hablar y para predicciones. 'The bus is late. I'll take a taxi.'" },
    {
      who: 'board',
      text: "I'll take the bus. It will be a great week.",
      board: ["I'll take the bus.", 'It will be a great week.'],
      table: { head: ['Uso', 'Ejemplo'], rows: [['Decisión en el momento', '<I> {will} [take] the bus.'], ['Predicción', '<It> {will} [be] a great week.']] },
    },
    { who: 'board', text: 'The bus is late! OK, I ___ a taxi.', choice: { options: ['will take', 'will to take', 'going to take'], answer: 0, tip: 'Decisión en el momento: will + verbo base.' } },
    { who: 'leo', text: 'So: a plan we decided = going to. A fixed appointment = present continuous. A quick decision or a prediction = will.', es: 'Entonces: un plan decidido = going to. Una cita fija = presente continuo. Una decisión rápida o una predicción = will.' },
    { who: 'board', text: "You are at a café and you suddenly decide to order a coffee. You say: 'I ___ a coffee.'", choice: { options: ['will have', 'am going have', 'have will'], answer: 0, tip: 'Decisión en el momento: will + verbo base.' } },
    { who: 'leo', text: "Ready? Let's practice, and then we'll find the residence.", es: '¿Listo? Practiquemos y después buscamos la residencia.' },
  ],
  // B1-03 · Cuaderno de L, página 1 (recuerdo 3). Pasos 'notebook': se ven como una página del cuaderno (components/LNotebook.tsx)
  'informal-messages': [
    { who: 'notebook', text: "Day 20. The doctors say no talking. So I will write. If I can't teach with my voice, I'll teach with this notebook.", es: 'Día 20. Los médicos dicen que no hable. Así que escribiré. Si no puedo enseñar con mi voz, enseñaré con este cuaderno.' },
    { who: 'notebook', text: "Lesson 1: Texting. When we text, we write fast. We cut the words we don't need.", es: 'Lección 1: Mensajes. Cuando mandamos mensajes, escribimos rápido. Quitamos las palabras que no necesitamos.' },
    { who: 'notebook', text: '', table: { head: ['Mensaje completo', 'Mensaje rápido'], rows: [['I have got it.', 'Got it.'], ['That sounds good to me.', 'Sounds good.'], ['I will see you there.', 'See you there.'], ['Please send me a message.', 'Drop me a line.']] } },
    { who: 'notebook', text: "What do we cut? Often the subject ('I', 'it'), the small verbs, and sometimes the beginning. But we keep the important words.", es: "¿Qué quitamos? A menudo el sujeto ('I', 'it'), los verbos pequeños y a veces el comienzo. Pero dejamos las palabras importantes." },
    { who: 'notebook', text: "A friend writes: 'Meeting at five?' You agree. The best quick reply is:", choice: { options: ['Sounds good. See you there.', "I am agreeing with you to meet at five o'clock sir.", 'Good sounds see there you.'], answer: 0, tip: 'Mensaje rápido y natural: Sounds good. See you there.' } },
    { who: 'notebook', text: "Four useful verbs for messages: text, message, reply, ping. 'Text me later.' 'Please reply soon.' 'Ping me when you arrive.'", es: 'Cuatro verbos útiles para mensajes: text, message, reply, ping. «Escríbeme luego». «Por favor responde pronto». «Avísame cuando llegues».' },
    { who: 'notebook', text: "'Ping me when you arrive.' Ping me means:", choice: { options: ['Avísame (mándame un mensaje rápido).', 'Llámame por teléfono.', 'Olvídame.'], answer: 0, tip: 'ping = mandar un mensaje rápido para avisar.' } },
    { who: 'notebook', text: "Careful: with friends we write 'Got it, thanks!'. With my director I write: 'Thank you. I have received your message.'", es: 'Ojo: con amigos escribo «Got it, thanks!». Con mi director escribo: «Thank you. I have received your message.»' },
    { who: 'notebook', text: "Your boss writes: 'Please send the report by Friday.' Which answer is better?", choice: { options: ['Understood. I will send it by Friday.', 'Got it lol.', 'Thx k.'], answer: 0, tip: 'Con un jefe: completo y cortés.' } },
    { who: 'notebook', text: "That's enough for today. Tomorrow, the messages begin.", es: 'Basta por hoy. Mañana empiezan los mensajes.' },
  ],
  // B1-03 · Cuaderno de L, página 2 (recuerdo 3, bloque B)
  'present-perfect-cont': [
    { who: 'notebook', text: "Day 35. Fifteen days of texting. My thumbs are tired, not my voice. Today's lesson: how long something has been happening.", es: 'Día 35. Quince días escribiendo mensajes. Mis pulgares están cansados, no mi voz. Lección de hoy: cuánto tiempo lleva pasando algo.' },
    { who: 'notebook', text: 'Present perfect continuous: have/has + been + verb-ing. I use it for things that started in the past and are still happening now.', es: 'Present perfect continuous: have/has + been + verbo con -ing. Se usa para cosas que empezaron en el pasado y siguen pasando ahora.' },
    { who: 'notebook', text: '', table: { head: ['Estructura', 'Ejemplo'], rows: [['I / you / we / they + have been + -ing', 'I have been waiting for weeks.'], ['he / she / it + has been + -ing', 'She has been calling every day.']] } },
    { who: 'notebook', text: 'He ___ for an hour.', choice: { options: ['has been waiting', 'have been waiting', 'has waiting'], answer: 0, tip: 'He = has been + -ing.' } },
    { who: 'notebook', text: 'For + a period of time: for two weeks, for an hour. Since + a starting point: since Monday, since March.', es: 'For + un período: for two weeks, for an hour. Since + un punto de inicio: since Monday, since March.' },
    { who: 'notebook', text: '', table: { head: ['for (cuánto tiempo)', 'since (desde cuándo)'], rows: [['for two weeks', 'since Monday'], ['for an hour', "since eight o'clock"], ['for a long time', 'since March']] } },
    { who: 'notebook', text: "I've been writing in this notebook ___ three weeks.", choice: { options: ['for', 'since', 'from'], answer: 0, tip: 'Un período de tiempo: for three weeks.' } },
    { who: 'notebook', text: 'She has been waiting ___ Monday.', choice: { options: ['since', 'for', 'during'], answer: 0, tip: 'Un punto de inicio (Monday): since.' } },
    { who: 'notebook', text: "To ask about duration: How long...? 'How long have you been feeling like this?' 'I've been trying to speak every day.'", es: 'Para preguntar la duración: How long...? «¿Cuánto tiempo llevas sintiéndote así?» «Llevo intentando hablar todos los días.»' },
    { who: 'notebook', text: '___ have you been waiting?', choice: { options: ['How long', 'How much', 'How many'], answer: 0, tip: 'Duración: How long...?' } },
    { who: 'notebook', text: "Careful: some verbs don't like -ing: know, be, have (to own), want. I say 'I've known her for years', not 'I've been knowing'.", es: "Ojo: algunos verbos no se usan con -ing: know, be, have (poseer), want. Digo «I've known her for years», no «I've been knowing»." },
    { who: 'notebook', text: 'I ___ her for ten years.', choice: { options: ['have known', 'have been knowing', 'know'], answer: 0, tip: 'know no usa -ing: I have known her for ten years.' } },
    { who: 'notebook', text: 'Enough. Let me test myself with the next messages.', es: 'Suficiente. Me pondré a prueba con los siguientes mensajes.' },
  ],
  // B1-04 · House Rules (residencia de Lumen Bay): Maya guía la lección (who 'maya': su retrato y su voz)
  'obligation-b1': [
    { who: 'maya', text: "Hi! Marisol gave me the contract, too. Let's read it together. Look: it says 'You must pay by the 5th'. 'Must' is for a strong obligation.", es: '¡Hola! Marisol también me dio el contrato. Leámoslo juntos. Mira: dice «You must pay by the 5th». «Must» es para una obligación fuerte.' },
    {
      who: 'board',
      text: 'You must pay by the 5th. You have to show your ID.',
      board: ['You must pay by the 5th.', 'You have to show your ID.'],
      table: { head: ['Obligación', 'Ejemplo'], rows: [['must + verbo base (regla fuerte)', '<You> {must} [pay] by the 5th.'], ['have to + verbo base (algo necesario)', '<You> {have to} [show] your ID.']] },
    },
    { who: 'maya', text: "'Must' and 'have to' are very similar. Both mean it is necessary.", es: '«Must» y «have to» son muy parecidos. Los dos significan que es necesario.' },
    { who: 'board', text: "You ___ pay the rent by the 5th. It's in the contract.", choice: { options: ['must', 'must to', 'musts'], answer: 0, tip: 'must + verbo base, sin to.' } },
    { who: 'maya', text: "Now the opposite. 'Mustn't' means it is forbidden: you can't do it.", es: 'Ahora lo contrario. «Mustn\'t» significa que está prohibido: no se puede.' },
    {
      who: 'board',
      text: "You mustn't smoke here. You mustn't make noise at night.",
      board: ["You mustn't smoke here.", "You mustn't make noise at night."],
      table: { head: ['Prohibido', 'Ejemplo'], rows: [["mustn't + verbo base", "<You> {mustn't} [smoke] in your room."], ["mustn't + verbo base", "<You> {mustn't} [make] noise at night."]] },
    },
    { who: 'board', text: "You ___ smoke in the room. It's forbidden.", choice: { options: ["mustn't", "don't have to", "haven't to"], answer: 0, tip: "Prohibido: mustn't." } },
    { who: 'maya', text: "Careful! 'Don't have to' is NOT the same. It means it is not necessary, but you can do it if you want.", es: '¡Cuidado! «Don\'t have to» NO es lo mismo. Significa que no es necesario, pero puedes hacerlo si quieres.' },
    {
      who: 'board',
      text: "You don't have to clean the kitchen. You needn't pay in cash.",
      board: ["You don't have to clean the kitchen.", "You needn't pay in cash."],
      table: { head: ['No es obligatorio', 'Ejemplo'], rows: [["don't / doesn't have to + verbo base", "<You> {don't have to} [clean] the kitchen."], ["needn't + verbo base", "<You> {needn't} [pay] in cash."]] },
    },
    { who: 'board', text: 'Marisol cleans the kitchen. You ___ clean it.', choice: { options: ["don't have to", "mustn't", 'must'], answer: 0, tip: "No es necesario (pero podrías): don't have to." } },
    { who: 'maya', text: "Compare: mustn't = prohibited. Don't have to = not necessary. Very different!", es: "Compara: mustn't = prohibido. Don't have to = no es necesario. ¡Muy distintos!" },
    { who: 'board', text: "You ___ park here. It's forbidden.", choice: { options: ["mustn't", "don't have to", "aren't have to"], answer: 0, tip: "Prohibido: mustn't." } },
    { who: 'maya', text: "Ready? Let's practice first. Then we'll find the rules in the contract.", es: '¿Listo? Practiquemos primero. Después buscamos las reglas en el contrato.' },
  ],
  // B1-04 · bloque C (el banco): Maya explica los phrasal verbs y los sustantivos compuestos
  'bank-phrasal': [
    { who: 'maya', text: "Ricardo said 'fill in a form' and 'take out money'. Those are phrasal verbs!", es: 'Ricardo dijo «fill in a form» y «take out money». ¡Esos son phrasal verbs!' },
    { who: 'maya', text: "A phrasal verb is a verb + a small word. The small word changes the meaning. 'Turn' is to rotate. 'Turn on' is to start something.", es: 'Un phrasal verb es un verbo + una palabra pequeña. La palabra pequeña cambia el significado. «Turn» es girar. «Turn on» es encender.' },
    {
      who: 'board',
      text: 'turn → turn on. fill → fill in.',
      board: ['turn → turn on', 'fill → fill in'],
      table: { head: ['Verbo', 'Phrasal verb'], rows: [['turn (girar)', 'turn on (encender)'], ['take (tomar)', 'take out (sacar)'], ['pay (pagar)', 'pay in (ingresar dinero)']] },
    },
    { who: 'board', text: "'Take out money' means:", choice: { options: ['sacar dinero', 'guardar dinero', 'perder dinero'], answer: 0, tip: 'take out = sacar.' } },
    { who: 'maya', text: "Some phrasal verbs are separable: the object can go in the middle. 'Fill in the form' or 'fill the form in'. Both are correct.", es: 'Algunos phrasal verbs son separables: el objeto puede ir en medio. «Fill in the form» o «fill the form in». Las dos son correctas.' },
    {
      who: 'board',
      text: 'I fill in the form. I fill the form in.',
      board: ['I fill in the form.', 'I fill the form in.'],
      table: { head: ['Forma 1', 'Forma 2'], rows: [['I fill in the form.', 'I fill the form in.'], ['Turn on the light.', 'Turn the light on.'], ['Plug in the lamp.', 'Plug the lamp in.']] },
    },
    { who: 'board', text: 'Which sentence is correct?', choice: { options: ['Fill the form in.', 'Fill in it the form.', 'Fill the in form.'], answer: 0, tip: 'El objeto puede ir en medio: fill the form in.' } },
    { who: 'maya', text: "Important rule! With a pronoun (it, them, me), the pronoun goes IN THE MIDDLE: 'Fill it in', never 'Fill in it'.", es: '¡Regla importante! Con un pronombre (it, them, me), el pronombre va EN MEDIO: «Fill it in», nunca «Fill in it».' },
    {
      who: 'board',
      text: 'Fill it in. Turn it on.',
      board: ['Fill it in.', 'Turn it on.'],
      table: { head: ['Con pronombre (correcto)', 'Incorrecto'], rows: [['Fill it in.', '✗ Fill in it.'], ['Turn it on.', '✗ Turn on it.'], ['Plug them in.', '✗ Plug in them.']] },
    },
    { who: 'board', text: 'The form? ___ now, please.', choice: { options: ['Fill it in', 'Fill in it', 'Fill it on'], answer: 0, tip: 'Con pronombre, va en medio: fill it in.' } },
    { who: 'maya', text: 'You already know many phrasal verbs from before: get up, get on, get off, try on, turn off, look for, find out, come back, pick up... You were using them without knowing their name!', es: 'Ya conoces muchos phrasal verbs de antes: get up, get on, get off, try on, turn off, look for, find out, come back, pick up... ¡Los usabas sin saber su nombre!' },
    {
      who: 'board',
      text: 'try the jacket on. look for my bag.',
      board: ['try the jacket on', 'look for my bag'],
      table: { head: ['Separables', 'No separables'], rows: [['try on (try the jacket on)', 'get on (get on the bus)'], ['turn off (turn the radio off)', 'look for (look for my bag)'], ['pick up (pick the book up)', 'come back (come back soon)']] },
    },
    { who: 'maya', text: "One more thing. Ricardo said 'bank account', 'debit card' and 'cash machine'. In English, two nouns can work together: the first one describes the second.", es: 'Una cosa más. Ricardo dijo «bank account», «debit card» y «cash machine». En inglés, dos sustantivos pueden trabajar juntos: el primero describe al segundo.' },
    {
      who: 'board',
      text: 'A card to pay from your account is a ___.',
      table: { head: ['Sustantivo + sustantivo', 'Significado'], rows: [['bank account', 'cuenta bancaria'], ['debit card', 'tarjeta de débito'], ['cash machine', 'cajero automático'], ['student ID', 'carné de estudiante']] },
      choice: { options: ['debit card', 'card debit', 'debit of card'], answer: 0, tip: 'El primer sustantivo describe al segundo: debit card.' },
    },
    { who: 'maya', text: "Now let's practice. Then we'll open your account.", es: 'Ahora practiquemos. Después abrimos su cuenta.' },
  ],
  // B1-05 · Cuaderno de L, página 12 (recuerdo 5, bloque A). 'board' = la pizarra
  'used-to': [
    { who: 'notebook', text: 'Page 12. I used to have a different life.', es: 'Página 12. Yo solía tener otra vida.' },
    { who: 'notebook', text: 'I used to teach five classes a day. I used to sing in the car.', es: 'Yo solía dar cinco clases al día. Yo solía cantar en el carro.' },
    { who: 'board', text: 'used to + verbo base: algo que hacías antes y ya no haces.', es: 'used to + verbo base: algo que hacías antes y ya no haces.', topic: 'used-to' },
    { who: 'board', text: 'I used to play the guitar. (Ahora ya no la toco.)', topic: 'used-to' },
    { who: 'board', text: "Negativa: I didn't use to like mornings. Pregunta: Did you use to sing? Con 'did' el pasado ya está en did: se escribe 'use to', sin d.", topic: 'used-to' },
    { who: 'board', text: 'Contraste: Yesterday I taught a class (una vez, con fecha). I used to teach five classes a day (un hábito de antes).', topic: 'used-to' },
    { who: 'board', text: "No uses 'used to' con una fecha exacta ni con un número exacto de veces.", topic: 'used-to' },
    { who: 'board', text: 'Errores típicos: ✗ I use to sing → ✓ I used to sing. ✗ I used to singing → ✓ I used to sing. ✗ Did you used to sing? → ✓ Did you use to sing?', topic: 'used-to' },
  ],
  // B1-05 · Cuaderno de L, página 13 (recuerdo 5, bloque B). 'board' = la pizarra
  'get-used-to': [
    { who: 'notebook', text: "Page 13. I'm not used to silence.", es: 'Página 13. No estoy acostumbrado al silencio.' },
    { who: 'notebook', text: "I'm getting used to it.", es: 'Me estoy acostumbrando.' },
    { who: 'board', text: 'be used to + -ing o sustantivo = estar acostumbrado a: ya es normal para ti.', topic: 'get-used-to' },
    { who: 'board', text: "I'm used to waking up early. She's used to the noise.", topic: 'get-used-to' },
    { who: 'board', text: "get used to + -ing o sustantivo = acostumbrarse: el proceso. I'm getting used to the silence.", topic: 'get-used-to' },
    { who: 'board', text: "Cuidado: used to + verbo base = hábito de antes (I used to wake up early). be used to + -ing = estar acostumbrado (I'm used to waking up early).", topic: 'get-used-to' },
    { who: 'board', text: "Errores típicos: ✗ I'm used to wake up early → ✓ I'm used to waking up early. ✗ She is getting used to live alone → ✓ She is getting used to living alone.", topic: 'get-used-to' },
  ],
  // B1-06 · First Job, bloque A (refugio Lumen Paws): Ms. Haddad explica el anuncio de empleo
  'work-english': [
    { who: 'haddad', text: "Welcome to Lumen Paws! I'm Noor Haddad, the coordinator. Let's read our job advert together.", es: '¡Bienvenido a Lumen Paws! Soy Noor Haddad, la coordinadora. Leamos juntos nuestro anuncio de empleo.' },
    { who: 'board', text: 'Un anuncio tiene: título, About us (quiénes somos), Duties (tareas), Requirements (requisitos), Hours (horario) y How to apply (cómo postularse).' },
    { who: 'haddad', text: 'Duties tell you what you will do. Requirements tell you what you must have.', es: 'Duties dice lo que harás. Requirements dice lo que debes tener.' },
    { who: 'board', text: 'Sustantivo + preposición: experience in animal care, responsible for the dogs, application for a job, interest in animals, reason for the visit.' },
    { who: 'board', text: 'Cada palabra va con su preposición. Aprende la pareja completa.' },
    { who: 'board', text: 'suit = quedar bien, convenir (Red suits you). fit = quedar de talla (These boots fit me). match = combinar, coincidir (Her shirt matches her shoes).' },
    { who: 'board', text: 'Errores típicos: ✗ experience on animal care → ✓ experience in animal care. ✗ responsible of the dogs → ✓ responsible for the dogs.' },
  ],
  // B1-06 · First Job, bloque B (las jaulas): Nayi presenta a los perros con oraciones de relativo
  'relative-clauses': [
    { who: 'nayi', text: "Hi! I'm Nayi. I work here with the dogs. Let me introduce them!", es: '¡Hola! Soy Nayi. Trabajo aquí con los perros. ¡Déjame presentártelos!' },
    { who: 'nayi', text: 'Laica is the dog that sleeps all day.', es: 'Laica es el perro que duerme todo el día.' },
    { who: 'nayi', text: 'Kitay is the one whose collar is red.', es: 'Kitay es el que tiene el collar rojo.' },
    { who: 'board', text: 'Una oración de relativo da más información sobre un sustantivo. who = personas (the girl who works here). that = cosas y animales (the dog that sleeps). whose = posesión (the dog whose collar is red). where = lugares (the shelter where I work).' },
    { who: 'board', text: 'Sin pronombre: si el pronombre es el objeto, se puede quitar. Fresas is the dog I walked yesterday. No repitas el objeto: ✗ the dog that I walked it.' },
    { who: 'nayi', text: 'Zirius is the dog that plays with the ball. Lupe is the dog that barks at everything. Fresas is the dog I walked yesterday.', es: 'Zirius es el perro que juega con la pelota. Lupe es el perro que ladra a todo. Fresas es el perro que paseé ayer.' },
    { who: 'board', text: "Errores típicos: ✗ The girl which works here → ✓ The girl who works here. ✗ The dog who's collar is red → ✓ The dog whose collar is red. (who's = who is)" },
  ],
  // B1-07 · The Underworld, bloque A (recuerdo 7): la tele del cuarto de L y la página 14 del Cuaderno de L. 'board' = la pizarra
  'passive-news': [
    { who: 'narrator', text: '(The TV is on. Nobody lives with you, but the news is talking to you.)', es: '(La tele está prendida. Nadie vive contigo, pero las noticias te hablan.)' },
    { who: 'narrator', text: 'A device that can restore lost human abilities has been developed by scientists.', es: 'Un aparato que puede restaurar habilidades humanas perdidas ha sido desarrollado por científicos.' },
    { who: 'narrator', text: 'It was designed using ancient temple writings.', es: 'Fue diseñado usando escritos antiguos de templos.' },
    { who: 'notebook', text: "Page 14. I turned off the TV. 'Has been developed.' 'Was designed.' Why do the news speak like this?", es: "Página 14. Apagué la tele. 'Has been developed.' 'Was designed.' ¿Por qué las noticias hablan así?" },
    { who: 'board', text: "Pasiva = be + participio. Se usa cuando importa más lo que pasó que quién lo hizo. Presente perfecto pasivo: has been developed. Pasado pasivo: was designed. 'by scientists' es opcional.", topic: 'passive-news' },
    { who: 'board', text: 'Pasiva: The device was made in 2060. Activa: Scientists made the device.', topic: 'passive-news' },
    { who: 'board', text: 'Errores típicos: ✗ The device was develop by scientists → ✓ The device was developed by scientists. ✗ A device has developed by scientists → ✓ A device has been developed by scientists.', topic: 'passive-news' },
  ],
  // B1-07 · The Underworld, bloque B: Cuaderno de L, página 15 (deducción en el presente). 'board' = la pizarra
  deduction: [
    { who: 'notebook', text: 'Page 15. Where is the device now? I need to think like a detective.', es: 'Página 15. ¿Dónde está el aparato ahora? Tengo que pensar como detective.' },
    { who: 'board', text: "Deducción en el presente: must be = seguro que es; might be = quizá es; can't be = es imposible.", topic: 'deduction' },
    { who: 'board', text: "It must be expensive. (Seguro que es caro.) It might be in the city. (Quizá está en la ciudad.) It can't be free. (Es imposible que sea gratis.)", topic: 'deduction' },
    { who: 'board', text: "Después de must, might y can't va el verbo base. ✗ It must to be there → ✓ It must be there.", topic: 'deduction' },
    { who: 'board', text: "Para deducir NO usamos mustn't: ✗ It mustn't be free → ✓ It can't be free.", topic: 'deduction' },
    { who: 'notebook', text: "The device is new and very rare. It can't be in a normal shop. It might be somewhere hidden.", es: 'El aparato es nuevo y muy raro. No puede estar en una tienda normal. Quizá esté escondido en alguna parte.' },
  ],
  // B1-07 · The Underworld, bloque B: Cuaderno de L, página 16 (deducción en el pasado). 'board' = la pizarra
  'deduction-past': [
    { who: 'notebook', text: 'Page 16. Who has the device? I need to think about the past too.', es: 'Página 16. ¿Quién tiene el aparato? También tengo que pensar en el pasado.' },
    { who: 'board', text: "Deducción en el pasado: must have + participio = seguro que pasó; might / could have + participio = quizá pasó; can't have + participio = es imposible que pasara.", topic: 'deduction-past' },
    { who: 'board', text: "He must have been a scientist. (Seguro que era científico.) She can't have known. (Es imposible que ella lo supiera.) They might have sold it. (Quizá lo vendieron.)", topic: 'deduction-past' },
    { who: 'board', text: "Errores típicos: ✗ It must be stole → ✓ It must have been stolen. ✗ He can't has known → ✓ He can't have known.", topic: 'deduction-past' },
    { who: 'notebook', text: "The scientists can't have sold it. A thief must have taken it. It must be in the black market.", es: 'Los científicos no pueden haberlo vendido. Un ladrón debe de haberlo tomado. Debe de estar en el mercado negro.' },
  ],
  // B1-08 · Game Day, bloque A (la entrada del estadio, data/b1Stadium.ts): la persona especial te invita a la final. 'board' = la pizarra
  'superlatives-b1': [
    { who: 'special', text: "The final is tomorrow! Are you coming with me? It's the biggest match of the year!", es: '¡La final es mañana! ¿Vienes conmigo? ¡Es el partido más grande del año!' },
    { who: 'board', text: 'Superlativos: adjetivo corto + -est (the fastest, the biggest); adjetivo largo con most (the most exciting, the most expensive). Siempre con the.', topic: 'superlatives-b1' },
    { who: 'board', text: 'Reglas: -y → -iest (happy → the happiest); una consonante final se duplica (big → the biggest, hot → the hottest).', topic: 'superlatives-b1' },
    { who: 'board', text: 'Irregulares: good → the best; bad → the worst; far → the furthest.', topic: 'superlatives-b1' },
    { who: 'board', text: 'Posición: the second best team, the third biggest stadium. Con grupos: one of the best players in the league.', topic: 'superlatives-b1' },
    { who: 'board', text: 'Errores típicos: ✗ The most fast player → ✓ The fastest player. ✗ He is the most good → ✓ He is the best.', topic: 'superlatives-b1' },
  ],
  // B1-08 · Game Day, bloque B (las gradas, data/b1Stands.ts): Jose Kike, el comentarista, narra la final. 'board' = la pizarra
  'football-results': [
    { who: 'narrator', text: 'Jose Kike: Good afternoon, everybody! Welcome to the final! Lumen Bay against the Red Lions!', es: 'Jose Kike: ¡Buenas tardes a todos! ¡Bienvenidos a la final! ¡Lumen Bay contra los Leones Rojos!' },
    { who: 'narrator', text: "Jose Kike: And Lumen Bay is one goal down: it's 0–1!", es: 'Jose Kike: ¡Y Lumen Bay va perdiendo por un gol: 0 a 1!' },
    { who: 'board', text: "Resultados: They won 3–1 (ganaron 3 a 1). They lost 2–0. It ended in a draw (terminó empatado). The score is 2–2. They're two goals down (van perdiendo por dos). They're one goal up (van ganando por uno).", topic: 'football-results' },
    { who: 'board', text: 'win / beat / lose: win + partido o copa (win the final); beat + equipo (beat the Red Lions); lose + partido (lose the match).', topic: 'football-results' },
    { who: 'board', text: 'Los marcadores se leen así: 3–1 = three–one; 0 = nil o zero.', topic: 'football-results' },
    { who: 'board', text: 'Errores típicos: ✗ They won the Red Lions → ✓ They beat the Red Lions. ✗ It ended on a draw → ✓ It ended in a draw.', topic: 'football-results' },
  ],
  // B1-08 · Game Day, bloque C (el pasillo del medio tiempo, data/b1Concourse.ts): la persona especial y los hinchas
  // B1-09 · Temples of Stones and Time, bloque A (el valle, data/b1Valley.ts): Cuaderno de L, página 31. 'board' = la pizarra
  'travel-b1': [
    { who: 'narrator', text: '(Years after the fire, L walks into a green valley. He is older now. His backpack is heavy.)', es: '(Años después del incendio, L entra a un valle verde. Ya es mayor. Su mochila pesa.)' },
    { who: 'notebook', text: 'Page 31. The journey here was exhausting. It took nine days.', es: 'Página 31. El viaje hasta aquí fue agotador. Duró nueve días.' },
    { who: 'notebook', text: "I took three buses and two boats. I didn't sleep much.", es: 'Tomé tres buses y dos botes. No dormí mucho.' },
    { who: 'notebook', text: 'But the valley is breathtaking.', es: 'Pero el valle es impresionante.' },
    { who: 'board', text: 'journey = el recorrido de un lugar a otro, normalmente largo (The journey was long). trip = un viaje con ida y vuelta o con un propósito (a trip to the mountains). travel = viajar en general, no se cuenta (Travel is exciting).', topic: 'travel-b1' },
    { who: 'board', text: "Pasado simple: regulares con -ed (walked, arrived); irregulares (took, went, saw, slept). Negativa: didn't + verbo base (I didn't sleep). Pregunta: Did you…? (Did you see the waterfall?)", topic: 'travel-b1' },
    { who: 'board', text: 'Adjetivos de viaje: bueno → breathtaking (impresionante), unforgettable (inolvidable); malo → exhausting (agotador), overcrowded (abarrotado). -ing = lo que causa; -ed = cómo te sientes (I was exhausted).', topic: 'travel-b1' },
    { who: 'board', text: "Errores típicos: ✗ I didn't slept much → ✓ I didn't sleep much. ✗ We goed to the valley → ✓ We went to the valley. ✗ I made a long travel → ✓ I made a long journey.", topic: 'travel-b1' },
  ],
  // B1-09 · bloque A: la guía local (hablar con respeto de otra cultura). L no habla: escribe en su cuaderno
  'culture-talk': [
    { who: 'narrator', text: "(L can't speak, so he writes his answers in the notebook.)", es: '(L no puede hablar, así que escribe sus respuestas en el cuaderno.)' },
    { who: 'narrator', text: 'Guide: Welcome to our valley. Our temple is very old.', es: 'Guía: Bienvenido a nuestro valle. Nuestro templo es muy antiguo.' },
    { who: 'narrator', text: "Guide: Before the temple, we leave our shoes at the door and we don't speak loudly.", es: 'Guía: Antes del templo, dejamos los zapatos en la puerta y no hablamos fuerte.' },
    { who: 'board', text: "Para hablar con respeto de otra cultura: muestra interés (That's fascinating! Could you tell me more?), pregunta con educación (Is it OK if I take a photo? Could you explain this tradition?) y compara sin juzgar (In my country we do it differently, but I'd like to learn).", topic: 'culture-talk' },
    { who: 'board', text: "Evita juzgar: ✗ That's weird. → ✓ That's different from what I know. Para preguntar un motivo: ✗ Why do you do that? → ✓ Could you tell me why you do that?", topic: 'culture-talk' },
  ],
  'question-tags': [
    { who: 'special', text: "It's half time! Listen to the fans. They ask each other questions, but they already know the answer.", es: '¡Es el medio tiempo! Escucha a los hinchas. Se hacen preguntas, pero ya saben la respuesta.' },
    { who: 'narrator', text: "Fan: Great match, wasn't it?", es: 'Hincha: Gran partido, ¿no?' },
    { who: 'narrator', text: "Fan: They're playing well, aren't they?", es: 'Hincha: Están jugando bien, ¿no?' },
    { who: 'board', text: "Question tag = pregunta corta al final para confirmar. Frase positiva → tag negativo: It's a great match, isn't it? Frase negativa → tag positivo: It isn't easy, is it?", topic: 'question-tags' },
    { who: 'board', text: "El tag usa el mismo auxiliar: is → isn't it; are → aren't they; was → wasn't it; can → can't she; will → won't he. Sin auxiliar usa do / does / did: You like football, don't you? He scored, didn't he?", topic: 'question-tags' },
    { who: 'board', text: "Casos especiales: I am → aren't I? (I'm right, aren't I?). There is → isn't there?", topic: 'question-tags' },
    { who: 'board', text: 'Entonación: si la voz baja, confirmas (ya lo sabes); si sube, preguntas de verdad.', topic: 'question-tags' },
    { who: 'board', text: "Errores típicos: ✗ They're playing well, don't they? → ✓ They're playing well, aren't they? ✗ Great match, isn't? → ✓ Great match, isn't it?", topic: 'question-tags' },
  ],
  'emphasis-b1': [
    { who: 'narrator', text: 'Jose Kike: GOAL! What a goal! It was such a beautiful shot!', es: 'Jose Kike: ¡GOL! ¡Qué gol! ¡Fue un tiro tan hermoso!' },
    { who: 'narrator', text: 'Jose Kike: This final is so exciting!', es: 'Jose Kike: ¡Esta final es tan emocionante!' },
    { who: 'board', text: 'what a + (adjetivo) + sustantivo singular: What a goal! What a great goal! Con plural o incontable no lleva a: What beautiful goals! What bad luck!', topic: 'emphasis-b1' },
    { who: 'board', text: 'such a + (adjetivo) + sustantivo: such a good game. so + adjetivo o adverbio (sin sustantivo): so exciting, so fast.', topic: 'emphasis-b1' },
    { who: 'board', text: 'It was such a good game. = The game was so good.', topic: 'emphasis-b1' },
    { who: 'board', text: 'Errores típicos: ✗ Such good game! → ✓ Such a good game! ✗ What goal! → ✓ What a goal!', topic: 'emphasis-b1' },
  ],
  // B1-06 · First Job, bloque C (las jaulas): Nayi repasa cómo contar tu experiencia antes de la entrevista
  'experience-b1': [
    { who: 'nayi', text: "Before the interview, let's practise how to talk about your experience.", es: 'Antes de la entrevista, practiquemos cómo contar tu experiencia.' },
    { who: 'board', text: 'Past simple: algo terminado, con un momento del pasado. I volunteered at a shelter last year. I walked dogs for two months in 2023.' },
    { who: 'board', text: "Present perfect: experiencia hasta ahora, sin decir cuándo. I've worked with animals. I've walked many dogs." },
    { who: 'board', text: "for + cuánto tiempo (for three years). since + desde cuándo (since 2022). Con for o since la acción sigue hasta hoy: I've worked here for three years." },
    { who: 'nayi', text: "Esteban will ask: 'Have you worked with animals before?' You can say: 'Yes, I have. I volunteered at a shelter last year.'", es: "Esteban preguntará: '¿Has trabajado antes con animales?' Puedes decir: 'Sí. Fui voluntario en un refugio el año pasado.'" },
    { who: 'board', text: "Errores típicos: ✗ I worked here since three years → ✓ I've worked here for three years. ✗ I have volunteered last year → ✓ I volunteered last year." },
  ],
  // B1-10 · Festival Night, bloque A (la entrada del festival, data/b1Festival.ts): la persona especial y el segundo condicional. 'board' = la pizarra
  'conditional-2': [
    { who: 'special', text: 'Look at this festival! If I had a ticket for every show, I would see them all.', es: '¡Mira este festival! Si tuviera una entrada para cada show, los vería todos.' },
    { who: 'board', text: 'Segundo condicional: situación imaginaria o poco probable. If + pasado simple, would + verbo base. If I had a ticket, I would see every show.', topic: 'conditional-2' },
    { who: 'board', text: 'If + pasado puede ir al principio o al final: I would see every show if I had a ticket. Con coma si if va primero.', topic: 'conditional-2' },
    { who: 'board', text: 'Con be se usa were: If I were rich, I would buy the festival. Para dar un consejo: If I were you, I would go.', topic: 'conditional-2' },
    { who: 'board', text: "Negativa: If I didn't have homework, I would go. Pregunta: What would you do if you won a ticket?", topic: 'conditional-2' },
    { who: 'board', text: 'Errores típicos: ✗ If I would have money, I would buy it → ✓ If I had money, I would buy it. ✗ If I would be rich → ✓ If I were rich.', topic: 'conditional-2' },
  ],
  // B1-10 · bloque A: la fila de la entrada (dos hinchas conversando) y verbo + -ing / to
  'verb-patterns': [
    { who: 'narrator', text: 'Fan 1: I enjoy dancing. I always dance at festivals.', es: 'Hincha 1: Disfruto bailar. Siempre bailo en los festivales.' },
    { who: 'narrator', text: 'Fan 2: We decided to stay until the end.', es: 'Hincha 2: Decidimos quedarnos hasta el final.' },
    { who: 'board', text: 'Verbo + -ing: enjoy, finish, avoid, keep, mind, suggest. I enjoy dancing. She finished singing.', topic: 'verb-patterns' },
    { who: 'board', text: 'Verbo + to + infinitivo: decide, want, hope, plan, need, learn, agree. We decided to stay. I hope to see the band.', topic: 'verb-patterns' },
    { who: 'board', text: 'stop cambia de sentido: He stopped smoking (dejó de fumar). He stopped to buy water (paró para comprar agua).', topic: 'verb-patterns' },
    { who: 'board', text: 'Errores típicos: ✗ I enjoy to dance → ✓ I enjoy dancing. ✗ We decided staying → ✓ We decided to stay.', topic: 'verb-patterns' },
  ],
  // B1-10 · bloque B (la carpa de videojuegos, data/b1GamingTent.ts): la persona especial y prefer / would rather. 'board' = la pizarra
  'prefer-b1': [
    { who: 'special', text: 'Do you prefer watching the band or playing games?', es: '¿Prefieres ver a la banda o jugar?' },
    { who: 'board', text: 'prefer + -ing to + -ing: I prefer watching to playing. prefer to + verbo base: I prefer to watch the band.', topic: 'prefer-b1' },
    { who: 'board', text: "would rather + verbo base (sin to): I'd rather watch the band than play.", topic: 'prefer-b1' },
    { who: 'board', text: "Negativa: I'd rather not go.", topic: 'prefer-b1' },
    { who: 'board', text: "Errores típicos: ✗ I'd rather to watch the band → ✓ I'd rather watch the band. ✗ I prefer stay home → ✓ I prefer to stay home / I prefer staying home.", topic: 'prefer-b1' },
  ],
  // B1-10 · bloque B: Jorge transmite en vivo (videojuegos)
  'gaming-b1': [
    { who: 'narrator', text: '(Jorge is streaming live. The chat moves fast.)', es: '(Jorge está transmitiendo en vivo. El chat se mueve rápido.)' },
    { who: 'narrator', text: "Jorge: Hi everybody! Today I'm playing a new adventure game at the festival.", es: 'Jorge: ¡Hola a todos! Hoy estoy jugando un juego de aventura nuevo en el festival.' },
    { who: 'narrator', text: 'Jorge: The graphics are incredible, the gameplay is really smooth, and the multiplayer is so much fun.', es: 'Jorge: Los gráficos son increíbles, la jugabilidad es muy fluida y el multijugador es muy divertido.' },
    { who: 'narrator', text: 'Jorge: But the levels are incredibly short. The main problem is the price!', es: 'Jorge: Pero los niveles son increíblemente cortos. ¡El principal problema es el precio!' },
  ],
  // B1-10 · bloque B: Jorge enseña a opinar con frases nominales
  'opinions-b1': [
    { who: 'narrator', text: 'Jorge: Opinions are easy with noun phrases. Listen: The best thing about it is the music.', es: 'Jorge: Opinar es fácil con frases nominales. Escucha: Lo mejor es la música.' },
    { who: 'board', text: 'Frase nominal + is: The best thing about it is the music. The main problem is the price. The worst part is waiting.', topic: 'opinions-b1' },
    { who: 'board', text: "Después de is puede ir un sustantivo, un -ing o that + frase: The best thing is playing with friends. The main problem is that it's expensive.", topic: 'opinions-b1' },
    { who: 'board', text: 'Énfasis: really, incredibly + adjetivo: really good, incredibly short.', topic: 'opinions-b1' },
    { who: 'board', text: 'Errores típicos: ✗ The best thing about is the music → ✓ The best thing about it is the music. ✗ The main problem it is the price → ✓ The main problem is the price.', topic: 'opinions-b1' },
  ],
  // B1-11 · The First Journey, bloque A (el cuarto de L, data/b1ClockRoom.ts): Cuaderno de L, página 42
  'narrative-b1': [
    { who: 'notebook', text: 'Page 42. Suddenly, the clock began to glow.', es: 'Página 42. De repente, el reloj empezó a brillar.' },
    { who: 'notebook', text: 'In a story, the past simple tells the main events: I opened the box. I took the clock.', es: 'En una historia, el pasado simple cuenta los hechos principales: abrí la caja. Tomé el reloj.' },
    { who: 'notebook', text: 'The past continuous sets the scene: It was raining while I was walking home.', es: 'El pasado continuo pone la escena: llovía mientras yo caminaba a casa.' },
    { who: 'notebook', text: 'The past perfect shows what happened before: By the time I arrived, the train had left.', es: 'El past perfect muestra lo que pasó antes: para cuando llegué, el tren ya se había ido.' },
    { who: 'notebook', text: 'Story words: suddenly (de repente), eventually (finalmente), meanwhile (mientras tanto), by the time (para cuando).', es: 'Palabras de historia: suddenly, eventually, meanwhile, by the time.' },
  ],
  // B1-11 · bloque A: el muro de recortes (tercer condicional)
  'conditional-3': [
    { who: 'notebook', text: 'If I had pulled the alarm earlier, they would have escaped.', es: 'Si hubiera activado la alarma antes, habrían escapado.' },
    { who: 'notebook', text: "Form: If + past perfect, would have + past participle. It talks about the past, and the past can't change.", es: 'Forma: If + past perfect, would have + participio. Habla del pasado, y el pasado no se puede cambiar.' },
    { who: 'notebook', text: "If I had closed the door, the smoke wouldn't have spread.", es: 'Si hubiera cerrado la puerta, el humo no se habría esparcido.' },
    { who: 'notebook', text: 'Question: What would you have done? Short answer: I would have called someone.', es: 'Pregunta: ¿Qué habrías hecho? Respuesta corta: habría llamado a alguien.' },
    { who: 'notebook', text: 'Words of regret: regret, if only, change, fate, unavoidable. If only I had known!', es: 'Palabras de arrepentimiento: regret, if only, change, fate, unavoidable. ¡Si tan solo lo hubiera sabido!' },
  ],
  // B1-11 · bloque B (la noche del incendio, data/b1FireNight.ts): Cuaderno de L, página 43
  'pastperfect-b1': [
    { who: 'notebook', text: 'Page 43. I arrived at the school. The fire had already started.', es: 'Página 43. Llegué a la escuela. El fuego ya había empezado.' },
    { who: 'notebook', text: 'Form: had + past participle. I had left. She had seen. They had run.', es: 'Forma: had + participio. Yo había salido. Ella había visto. Ellos habían corrido.' },
    { who: 'notebook', text: 'We use it for the first of two past events: When I arrived, the class had finished.', es: 'Lo usamos para el primero de dos hechos del pasado: cuando llegué, la clase ya había terminado.' },
    { who: 'notebook', text: "Negative and question: I hadn't known. Had you seen it? Yes, I had.", es: 'Negativa y pregunta: yo no había sabido. ¿Lo habías visto? Sí, lo había visto.' },
    { who: 'notebook', text: 'Be careful: By the time I arrived, the fire had started. Not: the fire started.', es: 'Ojo: para cuando llegué, el fuego ya había empezado. No: el fuego empezó.' },
  ],
  // B1-11 · bloque C (el Temple of Roads, data/b1TempleRoads.ts): Cuaderno de L, página 44
  'wish-b1': [
    { who: 'notebook', text: 'Page 44. I wish I had known. I wish I could go back.', es: 'Página 44. Ojalá lo hubiera sabido. Ojalá pudiera volver.' },
    { who: 'notebook', text: "wish + past simple: a wish about the present. I wish I knew the way. (I don't know it.)", es: 'wish + pasado simple: un deseo sobre el presente. Ojalá supiera el camino. (No lo sé.)' },
    { who: 'notebook', text: "wish + past perfect: a regret about the past. I wish I had listened. (I didn't listen.)", es: 'wish + past perfect: un arrepentimiento sobre el pasado. Ojalá hubiera escuchado. (No escuché.)' },
    { who: 'notebook', text: 'wish + would: something that bothers you, or a change you want. I wish you would listen.', es: 'wish + would: algo que te molesta o un cambio que quieres. Ojalá escucharas.' },
    { who: 'notebook', text: 'If only is stronger: If only I had stayed!', es: 'If only es más fuerte: ¡si tan solo me hubiera quedado!' },
  ],
  // B1-13 · bloque A (el Temple of Echoes, data/b1TempleEchoes.ts): Cuaderno de L, página 61
  'achievement-b1': [
    { who: 'notebook', text: 'Page 61. I finally made it... but at what cost?', es: 'Página 61. Por fin lo logré... pero ¿a qué costo?' },
    { who: 'notebook', text: 'Success: achieve a goal, succeed in + -ing, make it, manage to + verb.', es: 'Éxito: achieve a goal (lograr una meta), succeed in + -ing (tener éxito en), make it (lograrlo), manage to + verbo (conseguir).' },
    { who: 'notebook', text: "Failure: fail to + verb, give up (stop trying), don't make it.", es: 'Fracaso: fail to + verbo (no lograr), give up (rendirse), don\'t make it (no lograrlo).' },
    { who: 'notebook', text: 'Be careful: I succeeded in finding it. I managed to find it. I failed to find it.', es: 'Ojo: tuve éxito encontrándolo. Logré encontrarlo. No logré encontrarlo.' },
    { who: 'notebook', text: 'Words: cost, price, blame, revenge, unfair, regret.', es: 'Palabras: cost (costo), price (precio), blame (culpa), revenge (venganza), unfair (injusto), regret (arrepentimiento).' },
  ],
  // B1-12 · bloque A (la casa de los abuelos, data/b1HostHouse.ts): Maya, verbos de estado y de acción
  'state-verbs-b1': [
    { who: 'maya', text: 'Some verbs describe a state, not an action: know, like, love, want, need, believe, understand.', es: 'Algunos verbos describen un estado, no una acción: know, like, love, want, need, believe, understand.' },
    { who: 'maya', text: "We don't usually use state verbs in the -ing form. I know her. (Not: I am knowing her.)", es: 'Normalmente no usamos verbos de estado en -ing. Yo la conozco. (No: I am knowing her.)' },
    { who: 'maya', text: "Action verbs can use -ing: I'm cooking. She's talking to Einer.", es: 'Los verbos de acción pueden usar -ing: estoy cocinando. Ella está hablando con Einer.' },
    { who: 'maya', text: "Some verbs can be both, with a different meaning. I think it's great (my opinion). I'm thinking about it (I'm considering it).", es: 'Algunos verbos pueden ser ambos, con significado distinto. Pienso que es genial (mi opinión). Estoy pensando en eso (lo estoy considerando).' },
    { who: 'maya', text: "have: I have a cat (possession). I'm having dinner (action).", es: 'have: tengo un gato (posesión). Estoy cenando (acción).' },
    { who: 'maya', text: "taste, smell, feel work the same way. This soup tastes great. I'm tasting the soup.", es: 'taste, smell, feel funcionan igual. Esta sopa sabe genial. Estoy probando la sopa.' },
  ],
  // B1-12 · bloque B (el jardín, data/b1HostGarden.ts): Leo, remember / forget / remind
  'memory-verbs-b1': [
    { who: 'leo', text: 'Remember + -ing: a memory of the past. I remember meeting you at the airport.', es: 'remember + -ing: un recuerdo del pasado. Recuerdo haberte conocido en el aeropuerto.' },
    { who: 'leo', text: 'Remember + to + verb: not forgetting a duty. Remember to lock the door.', es: 'remember + to + verbo: no olvidar algo que debes hacer. Recuerda cerrar la puerta con llave.' },
    { who: 'leo', text: "Forget works the same way: I forgot to call her (I didn't call). I'll never forget meeting her (I have the memory).", es: 'forget funciona igual: olvidé llamarla (no llamé). Nunca olvidaré haberla conocido (tengo el recuerdo).' },
    { who: 'leo', text: 'Remind: remind someone to do something, or remind someone of something. Remind me to buy milk. This song reminds me of home.', es: 'remind: recordarle a alguien que haga algo, o recordarle algo. Recuérdame comprar leche. Esta canción me recuerda a casa.' },
  ],
  // B1-12 · bloque B: Maya, relaciones y personalidad
  'relationships-b1': [
    { who: 'maya', text: 'Personality: loyal (fiel), caring (cariñoso, atento), reliable (confiable), selfish (egoísta), stubborn (terco).', es: 'Personalidad: loyal (fiel), caring (cariñoso, atento), reliable (confiable), selfish (egoísta), stubborn (terco).' },
    { who: 'maya', text: 'Friends: a close friend (un amigo cercano), an old friend (un viejo amigo).', es: 'Amigos: a close friend (un amigo cercano), an old friend (un viejo amigo).' },
    { who: 'maya', text: 'get on with someone: have a good relationship. I get on well with my grandmother.', es: 'get on with alguien: llevarse bien. Me llevo bien con mi abuela.' },
    { who: 'maya', text: 'fall out (with someone): have an argument and stop being friends. We fell out last year.', es: 'fall out (con alguien): pelearse y dejar de ser amigos. Nos peleamos el año pasado.' },
    { who: 'maya', text: 'make up: become friends again. We said sorry and made up.', es: 'make up: volver a ser amigos. Pedimos perdón y hicimos las paces.' },
  ],
  // B1-12 · bloque B: la persona especial, empatía
  'empathy-b1': [
    { who: 'special', text: "When a friend has a problem, we show that we care. That must be hard. I'm so sorry to hear that.", es: 'Cuando un amigo tiene un problema, mostramos que nos importa. Eso debe ser difícil. Lamento mucho oírlo.' },
    { who: 'special', text: "Offer support: I'm here for you. Do you want to talk about it? Let me know if you need anything.", es: 'Ofrece apoyo: aquí estoy para ti. ¿Quieres hablar de eso? Avísame si necesitas algo.' },
    { who: 'special', text: "Ask, don't assume: How are you feeling? What happened?", es: 'Pregunta, no supongas: ¿cómo te sientes? ¿Qué pasó?' },
    { who: 'special', text: 'Respond: Thank you for listening. It means a lot to me.', es: 'Responde: gracias por escuchar. Significa mucho para mí.' },
  ],
  // B1-12 · bloque C (la ciudad, data/b1HostCity.ts): Einer, future continuous
  'future-continuous-b1': [
    { who: 'einer', text: "This time next year, I'll be living in a new city. This is the future continuous: will be + -ing.", es: 'El año que viene a esta hora, estaré viviendo en una ciudad nueva. Este es el future continuous: will be + -ing.' },
    { who: 'einer', text: "It describes an action in progress at a point in the future. At 8 o'clock tonight, I'll be having dinner.", es: 'Describe una acción en progreso en un momento del futuro. Esta noche a las 8, estaré cenando.' },
    { who: 'einer', text: "Negative and question: I won't be working tomorrow. Will you be using the car?", es: 'Negativa y pregunta: mañana no estaré trabajando. ¿Estarás usando el coche?' },
    { who: 'einer', text: "Compare: I'll call you at 8 (a decision). I'll be waiting at 8 (in progress at 8).", es: 'Compara: te llamaré a las 8 (una decisión). Estaré esperando a las 8 (en progreso a las 8).' },
  ],
  // B1-12 · bloque C: Einer en el mirador, sustantivos compuestos
  'compound-nouns-b1': [
    { who: 'einer', text: 'A compound noun is two nouns together: sky + scraper = skyscraper.', es: 'Un sustantivo compuesto son dos sustantivos juntos: sky + scraper = skyscraper (rascacielos).' },
    { who: 'einer', text: 'Some are one word (skyscraper), some are two words (city centre, bus stop), and some use a hyphen (a part-time job).', es: 'Algunos son una palabra (skyscraper), otros dos (city centre, bus stop) y otros llevan guion (a part-time job).' },
    { who: 'einer', text: 'The first noun tells us what kind: a bus stop is a stop for buses; a car park is a park for cars.', es: 'El primer sustantivo dice de qué tipo es: un bus stop es una parada de autobuses; un car park es un estacionamiento de coches.' },
    { who: 'einer', text: 'The first noun is usually singular: a shoe shop, not a shoes shop.', es: 'El primer sustantivo suele ir en singular: a shoe shop, no a shoes shop.' },
    { who: 'einer', text: 'More city words: landmark (a famous building or place), neighbourhood (a part of a city where people live), crowded (with many people).', es: 'Más palabras de ciudad: landmark (un edificio o lugar famoso), neighbourhood (una zona de la ciudad donde vive la gente), crowded (con mucha gente).' },
  ],
}
