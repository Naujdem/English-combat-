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
}
