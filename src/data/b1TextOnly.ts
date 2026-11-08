import type { TextOnlyContent } from '../components/TextOnly'

/**
 * B1-03 · Text Only (recuerdo 3, el teléfono del apartamento; tarea 'b1-03-texts'): tres chats con tres registros.
 * Chat 1 la amiga (informal) · Chat 2 el director (formal) · Chat 3 un alumno (cálido y sencillo).
 * Los nombres van con el marcador [[?]] (se ven ▒▒▒). En cada elección solo UNA opción es correcta.
 */
const ASK = 'L responde por mensaje:'

export const B1_TEXT_ONLY: TextOnlyContent = {
  title: 'Text Only',
  intro: { text: "I can't speak. But I can write. Who am I writing to?", es: 'No puedo hablar. Pero puedo escribir. ¿A quién le escribo?' },
  chats: [
    {
      contact: '[[?]]',
      steps: [
        { text: 'Hey L, how are you feeling?', es: 'Hola L, ¿cómo te sientes?', choice: { ask: ASK, options: ["Better. Still can't talk, but I'm OK.", 'I am feeling much better, thank you for your kind inquiry.', "Better still can't I talk OK am."], answer: 0, tip: 'Con una amiga: mensaje corto y natural.' } },
        { text: 'Do you want me to come over tonight? I can bring food.', es: '¿Quieres que pase esta noche? Puedo llevar comida.', choice: { ask: ASK, options: ['I would be delighted to receive you at my residence this evening.', 'Sounds good. See you tonight!', 'Sounds good see tonight you!'], answer: 1, tip: 'Con una amiga: Sounds good. See you tonight!' } },
        { text: 'Great! Take your time, OK? Text me if you need anything.', es: '¡Genial! Tómate tu tiempo, ¿sí? Escríbeme si necesitas algo.', choice: { ask: ASK, options: ['I have comprehended your message. Thank you very much.', 'Got thanks it.', 'Got it. Thanks.'], answer: 2, tip: 'Con una amiga: Got it. Thanks.' } },
      ],
    },
    {
      contact: 'Director [[?]]',
      steps: [
        {
          text: 'Good afternoon. I hope you are recovering well. Could you please confirm if you can return to work next month?',
          es: 'Buenas tardes. Espero que se esté recuperando bien. ¿Podría confirmar si puede volver al trabajo el próximo mes?',
          choice: { ask: ASK, options: ["Hey! Nope, can't talk lol.", "Good afternoon. Thank you for your message. I'm afraid I can't speak yet, so I cannot teach next month.", "Afternoon. No voice. Can't teach. Bye."], answer: 1, tip: 'Con el director: saludo, agradecimiento y frases completas y corteses.' },
        },
        { text: "I understand. Would you be able to send me the doctor's report by Friday?", es: 'Entiendo. ¿Podría enviarme el informe del médico antes del viernes?', choice: { ask: ASK, options: ['Certainly. I will send it by Friday.', 'Yep, will do.', 'Certainly I sending it by Friday.'], answer: 0, tip: 'Con el director: Certainly. I will send it by Friday.' } },
        { text: 'Thank you. Please let us know if you need anything.', es: 'Gracias. Por favor avísenos si necesita algo.', choice: { ask: ASK, options: ['Got it, thx!', 'Thank you very much I be in touch will.', 'Thank you very much. I will be in touch.'], answer: 2, tip: 'Con el director: Thank you very much. I will be in touch.' } },
      ],
    },
    {
      contact: 'Student',
      steps: [
        { text: 'Hi teacher! We miss your classes. When are you coming back?', es: '¡Hola profe! Extrañamos sus clases. ¿Cuándo vuelve?', choice: { ask: ASK, options: ['Hi! I miss you too. Soon, I hope.', 'Dear student, I am pleased to inform you that my return date is uncertain.', 'Hi miss you too soon hope I.'], answer: 0, tip: 'Con un alumno cercano: cálido y sencillo, ni demasiado formal ni demasiado seco.' } },
        { text: 'Can you help me with my homework? Just a quick question.', es: '¿Me ayuda con mi tarea? Solo una pregunta rápida.', choice: { ask: ASK, options: ['Negative. I am unable to assist at this moment.', 'Sure. Send me your question.', 'Sure send question me your.'], answer: 1, tip: 'Con un alumno: Sure. Send me your question.' } },
        { text: "Thanks! You're the best teacher ever.", es: '¡Gracias! Es el mejor profesor.', choice: { ask: ASK, options: ['I am honoured by your compliment, dear student.', 'Thanks keep hard studying.', 'Thanks! Keep studying hard.'], answer: 2, tip: 'Con un alumno: Thanks! Keep studying hard.' } },
      ],
    },
  ],
  finish: { text: 'Three conversations, three different voices. And I never said a word.', es: 'Tres conversaciones, tres voces distintas. Y nunca dije una palabra.' },
}

/** B1-03 · cierre (tarea 'b1-03-close'): la amiga escribe y L responde. Lo que narra L antes va en los steps de la tarea */
export const B1_03_CLOSE_CHAT: TextOnlyContent = {
  title: 'Words on a Screen',
  chats: [
    {
      contact: '[[?]]',
      steps: [
        {
          text: 'How are you today, L? Any news?',
          es: '¿Cómo estás hoy, L? ¿Alguna novedad?',
          choice: { ask: 'L le responde:', options: ['I try to speak every day since weeks. Nothing.', "I've been trying to speak every day. Nothing.", 'I have tried speak every day. Nothing.'], answer: 1, tip: 'Llevo intentándolo todos los días: present perfect continuous (have been trying).' },
        },
      ],
    },
  ],
  finish: { text: '(Three dots appear on the screen. Then they disappear.)', es: '(Aparecen tres puntos en la pantalla. Luego desaparecen.)' },
}
