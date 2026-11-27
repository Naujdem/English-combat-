import type { DiaryChapter } from './diary'

/**
 * Diario de B2: un capítulo por misión. Las del presente no tienen página de G; las Ventanas 10 y 12 sí (cuaderno de G).
 * Se abren al cerrar cada misión (b2CloseId(n), data/b2World.ts). Formato igual que data/b1Diary.ts.
 */
export const B2_DIARY: DiaryChapter[] = [
  // B2-01 · Catching Up (presente): sin página de G. Se abre al cerrar la misión 1
  {
    id: 'b2-mission-1',
    title: 'B2 · Misión 1: Catching Up',
    unlock: 'b2-01-close',
    words: [
      { title: 'Ponerse al día', words: [['catch up', 'ponerse al día'], ['keep in touch', 'mantenerse en contacto'], ['lose touch', 'perder el contacto'], ['be up to', 'andar haciendo'], ['run into', 'encontrarse por casualidad'], ['settle in', 'adaptarse, instalarse']] },
      { title: 'Reacciones', words: [['thrilled', 'feliz, emocionado'], ['gutted', 'muy decepcionado'], ['relieved', 'aliviado'], ['no way', '¡no puede ser!'], ['fair enough', 'vale, tiene sentido'], ['I bet', 'me imagino']] },
      { title: 'Phrasal verbs', words: [['catch up', 'ponerse al día'], ['run into', 'toparse con'], ['keep up with', 'seguir el ritmo de'], ['hang out', 'pasar el rato']] },
    ],
    versions: [
      {
        id: 'b2-mission-1-mine',
        tense: 'n',
        tab: 'Mi diario',
        title: 'Catching up',
        unlock: 'b2-01-close',
        frame: 'Lo escribes esa noche en la residencia.',
        lines: [
          { en: 'Everyone [has been moving]n on. Marisol [has been working]n on the garden, and Jeison [has finished]n two exams.', es: 'Todos han seguido adelante. Marisol ha estado trabajando en el jardín y Jeison ya terminó dos exámenes.' },
          { en: 'And Leo [has been hiding]n something.', es: 'Y Leo ha estado escondiendo algo.' },
        ],
        questions: [],
      },
      {
        id: 'b2-mission-1-mix',
        tense: 'mix',
        tab: 'Mezcla',
        title: 'A morning at the port',
        unlock: 'b2-01-close',
        frame: 'Tu mañana entera, con los tiempos de colores. Activa "Ver verbos" para verlos.',
        lines: [
          { en: 'This morning Leo\'s voice [broke]p at breakfast. He [said]p it [was]p the coffee.', es: 'Esta mañana a Leo se le quebró la voz en el desayuno. Dijo que era el café.' },
          { en: 'Nayi [has been running]n with the dogs since seven. She [has walked]n five dogs today.', es: 'Nayi lleva corriendo con los perros desde las siete. Hoy ya paseó cinco perros.' },
          { en: 'Tomorrow I [am starting]f at the Herald with Manuel.', es: 'Mañana empiezo en el Herald con Manuel.' },
        ],
        questions: [
          { q: 'What happened to Leo at breakfast?', options: ['He fell asleep.', 'His voice broke.', 'He lost his phone.'], answer: 1, tip: 'El diario dice: "Leo\'s voice broke at breakfast".' },
          { q: 'How many dogs has Nayi walked today?', options: ['Five.', 'Two.', 'Seven.'], answer: 0, tip: 'El diario dice: "She has walked five dogs today".' },
          { q: 'Where are you starting tomorrow?', options: ['At the café.', 'At Lumen Paws.', 'At the Herald.'], answer: 2, tip: 'El diario dice: "Tomorrow I am starting at the Herald".' },
        ],
      },
    ],
  },
  // B2-02 · The Herald (presente): sin página de G. Se abre al cerrar la misión 2
  {
    id: 'b2-mission-2',
    title: 'B2 · Misión 2: The Herald',
    unlock: 'b2-02-close',
    words: [
      { title: 'Redacción', words: [['editor', 'editor, editora'], ['deadline', 'hora de cierre, plazo'], ['draft', 'borrador'], ['source', 'fuente'], ['headline', 'titular'], ['byline', 'firma del autor'], ['scoop', 'primicia'], ['fact-check', 'verificar datos']] },
      { title: 'Competencias', words: [['reliable', 'confiable'], ['adaptable', 'adaptable'], ['attention to detail', 'atención al detalle'], ['cope with', 'lidiar con'], ['overcome', 'superar'], ['under pressure', 'bajo presión']] },
      { title: 'Reuniones', words: [['agenda', 'orden del día'], ['minutes', 'acta'], ['chair', 'quien preside'], ['item', 'punto (de la agenda)'], ['follow up', 'hacer seguimiento'], ['bring up', 'sacar un tema']] },
      { title: 'Lenguaje inclusivo', words: [['chairperson', 'quien preside'], ['firefighter', 'bombero, bombera'], ['singular they', 'they en singular'], ['stereotype', 'estereotipo']] },
      { title: 'Phrasal verbs', words: [['follow up', 'hacer seguimiento'], ['bring up', 'sacar un tema'], ['run by', 'consultar, explicar a alguien'], ['come up with', 'ocurrírsele (una idea)']] },
    ],
    versions: [
      {
        id: 'b2-mission-2-mine',
        tense: 'p',
        tab: 'Mi diario',
        title: 'My first day at the Herald',
        unlock: 'b2-02-close',
        frame: 'Lo escribes esa noche en la residencia.',
        lines: [
          { en: 'Today I [started]p at the Herald. Amara [asked]p me about the time I [had been volunteering]p at Lumen Paws.', es: 'Hoy empecé en el Herald. Amara me preguntó por el tiempo que llevaba de voluntariado en Lumen Paws.' },
          { en: 'Viktor [had been working]p for days without a break. A fragment [had made]p him the Deadline.', es: 'Viktor llevaba días trabajando sin descanso. Un fragmento lo había convertido en The Deadline.' },
          { en: 'Manuel [asked]p me to write about the voice blackouts.', es: 'Manuel me pidió escribir sobre los apagones de voz.' },
        ],
        questions: [],
      },
      {
        id: 'b2-mission-2-mix',
        tense: 'mix',
        tab: 'Mezcla',
        title: 'A day in the newsroom',
        unlock: 'b2-02-close',
        frame: 'Tu día entero, con los tiempos de colores. Activa "Ver verbos" para verlos.',
        lines: [
          { en: 'Priya [showed]p me the style guide: we [write]n "firefighter", not "fireman".', es: 'Priya me mostró la guía de estilo: escribimos "firefighter", no "fireman".' },
          { en: 'The core of the clock [has filled]n its first part.', es: 'El núcleo del reloj ha llenado su primera parte.' },
          { en: 'Tomorrow I [am going to call]f the harbour office.', es: 'Mañana voy a llamar a la oficina del puerto.' },
        ],
        questions: [
          { q: 'What had Viktor been doing for days?', options: ['Sleeping at the port.', 'Working without a break.', 'Writing a book.'], answer: 1, tip: 'El diario dice: "Viktor had been working for days without a break".' },
          { q: 'What does the style guide say?', options: ['Write "firefighter", not "fireman".', 'Write "fireman", not "firefighter".', 'Never write about fires.'], answer: 0, tip: 'El diario dice: we write "firefighter", not "fireman".' },
          { q: 'What is your first story about?', options: ['The new café.', 'Lumen Paws.', 'The voice blackouts.'], answer: 2, tip: 'El diario dice: "Manuel asked me to write about the voice blackouts".' },
        ],
      },
    ],
  },
  // B2-03 · Frozen (Ventana 2061): sin página de G (G aún no existe en esta escena). Se abre al cerrar la misión 3
  {
    id: 'b2-mission-3',
    title: 'B2 · Misión 3: Frozen (Ventana 2061)',
    unlock: 'b2-03-close',
    words: [
      { title: 'Sentimientos', words: [['overwhelmed', 'abrumado'], ['anxious / anxiety', 'ansioso / ansiedad'], ['ashamed / shame', 'avergonzado / vergüenza'], ['guilty / guilt', 'culpable / culpa'], ['numb', 'insensible'], ['relieved / relief', 'aliviado / alivio'], ['frozen', 'paralizado']] },
      { title: 'Sentidos', words: [['hear someone scream', 'oír a alguien gritar'], ['hear someone screaming', 'oír a alguien que grita'], ['notice', 'notar'], ['as if', 'como si'], ['sound like', 'sonar como']] },
      { title: 'Cuerpo y lesiones', words: [['sprain', 'torcerse'], ['burn', 'quemarse'], ['bruise', 'moretón'], ['bleed', 'sangrar'], ['twist', 'torcer'], ['injury', 'lesión']] },
      { title: 'Phrasal verbs', words: [['hold back', 'contenerse'], ['freeze up', 'quedarse paralizado'], ['calm down', 'calmarse'], ['speak up', 'hablar, alzar la voz']] },
    ],
    versions: [
      {
        id: 'b2-mission-3-mine',
        tense: 'p',
        tab: 'Mi diario',
        title: 'What I saw in 2061',
        unlock: 'b2-03-close',
        frame: 'Lo escribes al volver al presente.',
        lines: [
          { en: 'Tonight I [went]p into the future. Nobody [could]p hear me.', es: 'Esta noche entré al futuro. Nadie podía oírme.' },
          { en: 'I [heard]p the alarm ring and I [saw]p people running to the back stairs.', es: 'Oí sonar la alarma y vi a la gente correr hacia las escaleras traseras.' },
          { en: 'I [saw]p myself freeze. It [wasn\'t]p that I [didn\'t care]p. I [couldn\'t move]p.', es: 'Me vi a mí {h:mismo|misma} paralizarme. No era que no me importara. No podía moverme.' },
        ],
        questions: [],
      },
      {
        id: 'b2-mission-3-mix',
        tense: 'mix',
        tab: 'Mezcla',
        title: 'The night school',
        unlock: 'b2-03-close',
        frame: 'La noche entera, con los tiempos de colores. Activa "Ver verbos" para verlos.',
        lines: [
          { en: 'My older self [had been feeling]p tired for weeks. In the notebook I [read]p: "I used to speak up more."', es: 'Mi yo adulto llevaba semanas sintiéndose cansado. En el cuaderno leí: "Antes hablaba más".' },
          { en: 'Fear [can freeze]n anyone. It [doesn\'t mean]n you don\'t care.', es: 'El miedo puede paralizar a cualquiera. No quiere decir que no te importe.' },
          { en: 'Next time, I [am going to speak]f up.', es: 'La próxima vez, voy a alzar la voz.' },
        ],
        questions: [
          { q: 'Why could nobody answer you in 2061?', options: ['Nobody could hear you.', 'You were asleep.', 'Everyone was angry with you.'], answer: 0, tip: 'El diario dice: "Nobody could hear me".' },
          { q: 'What did your older self do when the alarm rang?', options: ['Ran to the back stairs.', 'Froze and couldn\'t move.', 'Called the firefighters.'], answer: 1, tip: 'El diario dice: "I saw myself freeze. I couldn\'t move".' },
          { q: 'What does the diary say about fear?', options: ['Only cowards feel it.', 'It never happens to adults.', 'It can freeze anyone.'], answer: 2, tip: 'El diario dice: "Fear can freeze anyone".' },
        ],
      },
    ],
  },
  // B2-04 · Fake Profile (presente): sin página de G. Se abre al cerrar la misión 4
  {
    id: 'b2-mission-4',
    title: 'B2 · Misión 4: Fake Profile',
    unlock: 'b2-04-close',
    words: [
      { title: 'Seguridad', words: [['password', 'contraseña'], ['two-factor authentication', 'autenticación en dos pasos'], ['phishing', 'mensajes falsos para robar datos'], ['scam', 'estafa'], ['hacked', 'hackeado'], ['privacy settings', 'configuración de privacidad'], ['fake profile', 'perfil falso'], ['data', 'datos']] },
      { title: 'Fraude', words: [['report', 'reportar'], ['refund', 'reembolso'], ['unauthorised payment', 'pago no autorizado'], ['look into', 'investigar, revisar'], ['suspicious', 'sospechoso']] },
      { title: 'Modales en pasado', words: [['might have', 'pudo haber (quizá)'], ['must have', 'debió de (seguro)'], ["can't have", 'no pudo (imposible)'], ['should have', 'debió (crítica)'], ["needn't have", 'no hacía falta (y lo hiciste)']] },
      { title: 'Phrasal verbs', words: [['log in', 'iniciar sesión'], ['hack into', 'entrar sin permiso'], ['take down', 'eliminar (una página)'], ['give away', 'revelar, regalar (datos)']] },
    ],
    versions: [
      {
        id: 'b2-mission-4-mine',
        tense: 'p',
        tab: 'Mi diario',
        title: 'The "G" profile',
        unlock: 'b2-04-close',
        frame: 'Lo escribes esa noche en tu cuarto de la residencia.',
        lines: [
          { en: 'Today someone [used]p my photo to make a fake profile called "G".', es: 'Hoy alguien usó mi foto para hacer un perfil falso llamado "G".' },
          { en: 'It [must have been]p created yesterday. I [shouldn\'t have given]p my birthday to that silly quiz.', es: 'Debió de crearse ayer. No debí darle mi cumpleaños a ese test tonto.' },
          { en: 'Someone [wants]n me to remember. But who?', es: 'Alguien quiere que recuerde. Pero ¿quién?' },
        ],
        questions: [],
      },
      {
        id: 'b2-mission-4-mix',
        tense: 'mix',
        tab: 'Mezcla',
        title: 'A day of fake messages',
        unlock: 'b2-04-close',
        frame: 'El día entero, con los tiempos de colores. Activa "Ver verbos" para verlos.',
        lines: [
          { en: 'Jeison [paid]p for a bike that [didn\'t exist]p. He [should have checked]p the account first.', es: 'Jeison pagó por una bicicleta que no existía. Debió revisar la cuenta primero.' },
          { en: 'Ricardo [is looking]n into it, and Jeison [will get]f a full refund.', es: 'Ricardo lo está revisando y a Jeison le van a devolver todo el dinero.' },
          { en: 'Leo [changed]p the subject when I [asked]p about his voice. "Maybe. Not yet," he [said]p.', es: 'Leo cambió de tema cuando le pregunté por su voz. "Quizá. Todavía no", dijo.' },
        ],
        questions: [
          { q: 'Why did Jeison lose his money?', options: ['He paid for a bike that didn\'t exist.', 'He forgot his password.', 'The bank closed his account.'], answer: 0, tip: 'El diario dice: "paid for a bike that didn\'t exist".' },
          { q: 'What will happen with Jeison\'s money?', options: ['Nothing.', 'He will get a full refund.', 'Ricardo will keep it.'], answer: 1, tip: 'El diario dice: "Jeison will get a full refund".' },
          { q: 'What did Leo do when you asked about his voice?', options: ['He told you everything.', 'He got angry.', 'He changed the subject.'], answer: 2, tip: 'El diario dice: "Leo changed the subject".' },
        ],
      },
    ],
  },
  // Lectura larga de B2 (opcional, unas 250 palabras con 5 preguntas). Se abre al cerrar la misión 4
  {
    id: 'b2-reading-1',
    title: 'Lectura: Inside the Echo Market',
    unlock: 'b2-04-close',
    words: [
      { title: 'El artículo', words: [['dark web', 'internet oculto'], ['search engine', 'buscador'], ['seller', 'vendedor'], ['buyer', 'comprador'], ['advert', 'anuncio'], ['claim', 'afirmar']] },
    ],
    versions: [
      {
        id: 'b2-reading-1-text',
        tense: 'mix',
        tab: 'Lectura',
        title: 'Inside the Echo Market',
        unlock: 'b2-04-close',
        frame: 'El artículo de Priya para The Lumen Bay Herald. Es un texto largo: léelo con calma antes de responder.',
        lines: [
          { en: 'Most of us use the internet every day without thinking about it. But there is a part of the internet that you will never find with a normal search engine: the dark web.', es: 'La mayoría usamos internet todos los días sin pensarlo. Pero hay una parte de internet que nunca encontrarás con un buscador normal: la dark web.' },
          { en: 'Not everything on the dark web is illegal. Some journalists use it to talk to sources safely. However, it is also where criminals sell stolen passwords, bank details and fake profiles.', es: 'No todo en la dark web es ilegal. Algunos periodistas la usan para hablar con sus fuentes de forma segura. Sin embargo, también es donde los delincuentes venden contraseñas robadas, datos bancarios y perfiles falsos.' },
          { en: 'Last month, a reader sent the Herald a strange link. It led to a market called the Echo Market.', es: 'El mes pasado, un lector le envió al Herald un enlace extraño. Llevaba a un mercado llamado Echo Market.' },
          { en: 'At first, it looked like any other black market. But one advert was different. The seller claimed to offer "lost voices" and said that buyers "needn\'t have suffered in silence".', es: 'Al principio parecía un mercado negro cualquiera. Pero un anuncio era distinto. El vendedor decía ofrecer "voces perdidas" y aseguraba que los compradores "no tenían por qué haber sufrido en silencio".' },
          { en: 'We don\'t know who wrote the advert. It might have been a joke, or it could have been a trick to steal money. Two days after we found it, the page was taken down.', es: 'No sabemos quién escribió el anuncio. Pudo ser una broma, o pudo ser un truco para robar dinero. Dos días después de encontrarlo, la página fue eliminada.' },
          { en: 'Experts say that you should never pay for something you cannot see, and you should report suspicious adverts to the police.', es: 'Los expertos dicen que nunca debes pagar por algo que no puedes ver y que debes reportar los anuncios sospechosos a la policía.' },
          { en: 'However, one question is still open. In the last few weeks, several people in Lumen Bay have lost their voices for a few seconds. Is it a coincidence, or is someone listening?', es: 'Sin embargo, queda una pregunta abierta. En las últimas semanas, varias personas en Lumen Bay han perdido la voz durante unos segundos. ¿Es una coincidencia, o alguien está escuchando?' },
          { en: 'Priya Raman, intern, The Lumen Bay Herald', es: 'Priya Raman, practicante, The Lumen Bay Herald' },
        ],
        questions: [
          { q: 'Why do some journalists use the dark web?', options: ['To talk to sources safely.', 'To sell fake profiles.', 'To find a normal search engine.'], answer: 0, tip: 'El artículo dice: "Some journalists use it to talk to sources safely".' },
          { q: 'How did the Herald find the Echo Market?', options: ['Priya found it with a search engine.', 'A reader sent a strange link.', 'The police told them.'], answer: 1, tip: 'El artículo dice: "a reader sent the Herald a strange link".' },
          { q: 'What was different about one advert?', options: ['It sold cheap bikes.', 'It was written by the police.', 'It offered "lost voices".'], answer: 2, tip: 'El artículo dice: "The seller claimed to offer lost voices".' },
          { q: 'What happened to the page two days later?', options: ['It was taken down.', 'It became more popular.', 'The Herald bought it.'], answer: 0, tip: 'El artículo dice: "the page was taken down".' },
          { q: 'What have several people in Lumen Bay experienced?', options: ['Their bank accounts were hacked.', 'They lost their voices for a few seconds.', 'They received fake friend requests.'], answer: 1, tip: 'El artículo dice: "several people in Lumen Bay have lost their voices for a few seconds".' },
        ],
      },
    ],
  },
  // B2-05 · Voice Blackouts (presente): nota de prensa (reported speech) y página mezclada, con la pista Vocalis. Se abre al cerrar la misión 5
  {
    id: 'b2-mission-5',
    title: 'B2 · Misión 5: Voice Blackouts',
    unlock: 'b2-05-close',
    words: [
      { title: 'Prensa', words: [['tabloid', 'tabloide'], ['broadsheet', 'periódico serio'], ['headline', 'titular'], ['gossip', 'chisme'], ['rumour', 'rumor'], ['allegedly', 'supuestamente'], ['exclusive', 'exclusiva'], ['eyewitness', 'testigo presencial'], ['sources', 'fuentes']] },
      { title: 'Verbo + to', words: [['promise to', 'prometer'], ['refuse to', 'negarse a'], ['threaten to', 'amenazar con'], ['warn someone (not) to', 'advertirle a alguien que (no)'], ['remind someone to', 'recordarle a alguien'], ['persuade someone to', 'convencer a alguien de']] },
      { title: 'Verbo + -ing', words: [['deny + -ing', 'negar'], ['admit + -ing', 'admitir'], ['suggest + -ing', 'sugerir'], ['accuse someone of', 'acusar de'], ['blame someone for', 'culpar de'], ['apologise for', 'disculparse por'], ['insist on', 'insistir en']] },
      { title: 'Phrasal verbs', words: [['make up', 'inventar'], ['turn out', 'resultar'], ['look into', 'investigar'], ['play down', 'restar importancia']] },
      { title: 'Pista', words: [['Vocalis', 'el logo de la placa del muelle norte. ¿Quién es?']] },
    ],
    versions: [
      {
        id: 'b2-mission-5-mine',
        tense: 'p',
        tab: 'Mi nota de prensa',
        title: 'Voice blackouts at the port: the facts',
        unlock: 'b2-05-close',
        frame: 'Lo escribes como una nota del Herald, con los verbos declarativos de Manuel.',
        lines: [
          { en: 'A fisherman, Tomás Quispe, [denied]p making up his story. He [claimed]p that he had seen a purple light under the water.', es: 'Un pescador, Tomás Quispe, negó haberse inventado su historia. Afirmó que había visto una luz morada bajo el agua.' },
          { en: 'Captain Ingrid Halvorsen [warned]p the fishermen not to sail after midnight and [refused]p to give an interview.', es: 'La capitana Ingrid Halvorsen advirtió a los pescadores que no navegaran después de medianoche y se negó a dar una entrevista.' },
          { en: 'The blogger Zoe Park [apologised]p for exaggerating and [promised]p to check her facts.', es: 'La bloguera Zoe Park se disculpó por exagerar y prometió revisar sus datos.' },
          { en: 'A metal plate with the logo "VOCALIS" [was found]p near the north pier. Nobody [knows]n who Vocalis is.', es: 'Se encontró una placa de metal con el logo "VOCALIS" cerca del muelle norte. Nadie sabe quién es Vocalis.' },
        ],
        questions: [],
      },
      {
        id: 'b2-mission-5-mix',
        tense: 'mix',
        tab: 'Mezcla',
        title: 'A night at the port',
        unlock: 'b2-05-close',
        frame: 'La noche entera, con los tiempos de colores. Activa "Ver verbos" para verlos.',
        lines: [
          { en: 'Tonight Manuel and I [investigated]p the voice blackouts at the port.', es: 'Esta noche Manuel y yo investigamos los apagones de voz en el puerto.' },
          { en: 'Zoe\'s blog [turned]p into a giant newspaper, but now she [is writing]n a real article.', es: 'El blog de Zoe se convirtió en un periódico gigante, pero ahora está escribiendo un artículo de verdad.' },
          { en: 'Tomás [gave]p me his old jacket. I [will wear]f it when I [go]n back to the port.', es: 'Tomás me regaló su chaqueta vieja. Me la voy a poner cuando vuelva al puerto.' },
          { en: 'Manuel [told]p me to find out who Vocalis is. Tomorrow I [will start]f.', es: 'Manuel me dijo que averiguara quién es Vocalis. Mañana empiezo.' },
        ],
        questions: [
          { q: 'What happened to Zoe\'s blog?', options: ['It turned into a giant newspaper.', 'It won a prize.', 'The police closed it.'], answer: 0, tip: 'El diario dice: "Zoe\'s blog turned into a giant newspaper".' },
          { q: 'What did Tomás give you?', options: ['His boat.', 'His old jacket.', 'A purple light.'], answer: 1, tip: 'El diario dice: "Tomás gave me his old jacket".' },
          { q: 'What did Manuel tell you to do?', options: ['To write about Zoe.', 'To sail after midnight.', 'To find out who Vocalis is.'], answer: 2, tip: 'El diario dice: "Manuel told me to find out who Vocalis is".' },
        ],
      },
    ],
  },
]
