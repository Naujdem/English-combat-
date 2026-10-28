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

    { who: 'leo', text: 'With WE and THEY, use ARE. We are friends. They are students.', es: 'Con "we" (nosotros) y "they" (ellos) se usa "are".', board: ['We / They → are', 'They are students.'] },
    { who: 'board', text: 'We ___ in the classroom.', board: ['We / They → are', 'We are friends.'], choice: { options: ['am', 'are', 'is'], answer: 1, tip: '"We" es plural, así que va "are".' } },

    { who: 'leo', text: "To say no, add NOT. I am not sad. He isn't here. They aren't late.", es: 'Para negar, agrega "not". Se puede contraer: is not = isn\'t, are not = aren\'t.', board: ['+ not', "isn't · aren't"] },
    { who: 'board', text: 'They ___ at home.', board: ['+ not', "isn't · aren't"], choice: { options: ["isn't", "aren't", 'am not'], answer: 1, tip: '"They" va con "are", y su negación es "aren\'t".' } },

    { who: 'leo', text: 'To ask, put the verb first. Are you OK? Is she here?', es: 'Para preguntar, el verbo va primero: You are OK → Are you OK?', board: ['¿Pregunta?', 'Are you OK?'] },
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

    { who: 'leo', text: "You've got it! Now go and get your words back!", es: '¡Lo tienes! ¡Ahora ve a recuperar tus palabras!', board: ['my · your · his · her', 'its · our · their'] },
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
    { who: 'leo', text: "Great! Now help Ana find your school things.", es: '¡Genial! Ahora ayuda a Ana a encontrar tus útiles.', board: ['in · on · under', 'next to · between'] },
  ],

  imperatives: [
    { who: 'leo', text: 'Teachers and coaches give orders. In English, orders are easy!', es: 'Los profesores y entrenadores dan órdenes. ¡En inglés las órdenes son fáciles!', board: ['Orders', 'Órdenes'] },
    { who: 'leo', text: 'Start with the verb. No "you", no -s. Run! Jump! Open the door!', es: 'Empieza con el verbo. Sin "you" y sin -s. ¡Corre! ¡Salta! ¡Abre la puerta!', board: ['Verb + ...', 'Open the door!'] },
    { who: 'board', text: '___ the ball!', board: ['Verb + ...', 'Open the door!'], choice: { options: ['Kicks', 'Kick', 'You kicks'], answer: 1, tip: 'Verbo base, sin -s y sin "you": Kick the ball!' } },
    { who: 'leo', text: "To say NO, use DON'T. Don't run! Don't talk!", es: "Para prohibir, usa \"don't\". ¡No corras! ¡No hables!", board: ["Don't + verb", "Don't run!"] },
    { who: 'board', text: '___ eat in the library!', board: ["Don't + verb", "Don't run!"], choice: { options: ['No', "Don't", 'Not'], answer: 1, tip: "Para prohibir: Don't + verbo." } },
    { who: 'leo', text: "With TO BE, say BE. Be quiet! Be careful! Don't be late!", es: 'Con "to be" se dice "be". ¡Silencio! ¡Ten cuidado! ¡No llegues tarde!', board: ['Be quiet!', "Don't be late!"] },
    { who: 'board', text: '___ careful! The floor is wet.', board: ['Be quiet!', "Don't be late!"], choice: { options: ['Are', 'Is', 'Be'], answer: 2, tip: 'La orden de "to be" es "Be": Be careful!' } },
    { who: 'leo', text: 'Add PLEASE to be polite. Sit down, please.', es: 'Agrega "please" para ser amable. Siéntate, por favor.', board: ['..., please.', 'Sit down, please.'] },
    { who: 'leo', text: "Perfect! Now listen to the coach. Do what he says!", es: '¡Perfecto! Ahora escucha al entrenador. ¡Haz lo que dice!', board: ['Run! Jump!', "Don't stop!"] },
  ],
}
