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
  // B2-06 · The Lab (Ventana 2062): sin página de G (todavía no ha llegado a Vocalis). Se abre al cerrar la misión 6
  {
    id: 'b2-mission-6',
    title: 'B2 · Misión 6: The Lab (Ventana 2062)',
    unlock: 'b2-06-close',
    words: [
      { title: 'Laboratorio', words: [['trial', 'prueba, ensayo'], ['prototype', 'prototipo'], ['results', 'resultados'], ['data', 'datos'], ['donor', 'donante'], ['side effect', 'efecto secundario'], ['breakthrough', 'gran avance']] },
      { title: 'Tendencias', words: [['rise / rose', 'subir / subió'], ['fall / fell', 'bajar / bajó'], ['peak', 'llegar al máximo'], ['level off', 'estabilizarse'], ['fluctuate', 'subir y bajar'], ['sharply / steadily / slightly', 'bruscamente / poco a poco / un poco']] },
      { title: 'Formación de palabras', words: [['wellbeing', 'bienestar'], ['ability', 'capacidad'], ['restoration', 'restauración'], ['improvement', 'mejora'], ['effectiveness', 'eficacia']] },
      { title: 'Phrasal verbs', words: [['carry out', 'realizar'], ['set up', 'preparar, instalar'], ['rule out', 'descartar'], ['point out', 'señalar']] },
    ],
    versions: [
      {
        id: 'b2-mission-6-mine',
        tense: 'p',
        tab: 'Mi diario',
        title: 'What I found in 2062',
        unlock: 'b2-06-close',
        frame: 'Lo escribes al volver al presente.',
        lines: [
          { en: 'Tonight I [went]p into the Vocalis lab. Nobody [could]p hear me, so I [read]p everything.', es: 'Esta noche entré al laboratorio de Vocalis. Nadie podía oírme, así que leí todo.' },
          { en: 'The success rate [rose]p sharply. But in Trial 7 the donor [lost]p her voice.', es: 'La tasa de éxito subió bruscamente. Pero en la prueba 7 la donante perdió la voz.' },
          { en: 'Vocalis [knew]p. They [knew]p someone had to lose a voice.', es: 'Vocalis lo sabía. Sabían que alguien tenía que perder la voz.' },
        ],
        questions: [],
      },
      {
        id: 'b2-mission-6-mix',
        tense: 'mix',
        tab: 'Mezcla',
        title: 'The lab',
        unlock: 'b2-06-close',
        frame: 'Todo el laboratorio, con los tiempos de colores. Activa "Ver verbos" para verlos.',
        lines: [
          { en: 'The device [is said]n to restore lost voices. Dr. Sato [is said]n to have found the key in a temple.', es: 'Se dice que el aparato devuelve las voces perdidas. Se dice que la Dra. Sato encontró la clave en un templo.' },
          { en: 'They [had]p the prototype tested, and the results [were]p too good to stop.', es: 'Hicieron probar el prototipo, y los resultados eran demasiado buenos para parar.' },
          { en: 'Next, I [am going to find]f out who took that device.', es: 'Ahora voy a averiguar quién se llevó ese aparato.' },
        ],
        questions: [
          { q: 'What did the report of Trial 7 say?', options: ['The device stopped working.', 'A voice was restored, and the donor lost hers.', 'Nobody wanted to be a donor.'], answer: 1, tip: 'El informe decía: "Voice restored. The donor lost theirs."' },
          { q: 'What happened to the success rate?', options: ['It rose sharply.', 'It fell slightly.', 'It never changed.'], answer: 0, tip: 'El diario dice: "The success rate rose sharply".' },
          { q: 'What did Vocalis know?', options: ['That the temples were fake.', 'That G was coming.', 'That someone had to lose a voice.'], answer: 2, tip: 'El diario dice: "They knew someone had to lose a voice".' },
        ],
      },
    ],
  },
  // B2-07 · The Old Building (presente): página del protagonista y página mezclada. Se abre al cerrar la misión 7. Sin amistad
  {
    id: 'b2-mission-7',
    title: 'B2 · Misión 7: The Old Building',
    unlock: 'b2-07-close',
    words: [
      { title: 'Ciudad y cambio', words: [['neighbourhood', 'barrio'], ['rent', 'arriendo'], ['gentrification', 'gentrificación'], ['run-down', 'viejo y en mal estado'], ['renovate', 'renovar'], ['abandoned', 'abandonado'], ['community', 'comunidad'], ['council', 'concejo, ayuntamiento']] },
      { title: 'Turismo', words: [['overtourism', 'sobreturismo'], ['locals', 'los del lugar'], ['crowded', 'lleno de gente'], ['souvenir shops', 'tiendas de recuerdos'], ['short-term rentals', 'alquileres por días']] },
      { title: 'Alternativas a if', words: [['unless', 'a menos que (= if… not)'], ['as long as', 'siempre y cuando'], ['provided (that)', 'siempre que'], ['otherwise', 'si no, de lo contrario'], ['suppose', 'imagina que']] },
      { title: 'Phrasal verbs con get', words: [['get by', 'arreglárselas'], ['get around', 'moverse por un lugar'], ['get along with', 'llevarse bien con'], ['get over', 'superar'], ['get through', 'pasar por algo difícil'], ['get away with', 'salirse con la suya']] },
    ],
    versions: [
      {
        id: 'b2-mission-7-mine',
        tense: 'p',
        tab: 'Mi página',
        title: 'The old building',
        unlock: 'b2-07-close',
        frame: 'Lo que pasó en el barrio antiguo, contado por ti.',
        lines: [
          { en: 'The Old Town [has changed]p a lot. It [used to be]p quiet, but now it [is getting]n busier and busier.', es: 'El barrio antiguo ha cambiado mucho. Antes era tranquilo, pero ahora cada vez hay más gente.' },
          { en: 'Sam and I [explored]p the old building. It [was]p a school, and Leo [found]p an old poster for a night school.', es: 'Sam y yo exploramos el edificio viejo. Era una escuela, y Leo encontró un cartel viejo de una escuela nocturna.' },
          { en: 'At the meeting I [said]p: "We\'ll support the school as long as it [has]n two fire exits."', es: 'En la reunión dije: "Apoyaremos la escuela siempre y cuando tenga dos salidas de emergencia".' },
          { en: 'The town hall [voted]p for the school. I [don\'t know]n why, but those two exits [feel]n important.', es: 'El ayuntamiento votó por la escuela. No sé por qué, pero esas dos salidas se sienten importantes.' },
        ],
        questions: [],
      },
      {
        id: 'b2-mission-7-mix',
        tense: 'mix',
        tab: 'Mezcla',
        title: 'A school for the Old Town',
        unlock: 'b2-07-close',
        frame: 'El barrio entero, con los tiempos de colores. Activa "Ver verbos" para verlos.',
        lines: [
          { en: 'Rents [have been rising]p for years, and Rosa [can\'t get]n around her own street.', es: 'Los arriendos llevan años subiendo, y Rosa ya no puede moverse por su propia calle.' },
          { en: 'Oliver Grant [turned]p into a giant crane, but now he [is helping]n us.', es: 'Oliver Grant se convirtió en una grúa gigante, pero ahora nos está ayudando.' },
          { en: 'He [will build]f the school, provided that the town hall [pays]n a fair price.', es: 'Construirá la escuela, siempre que el ayuntamiento pague un precio justo.' },
          { en: 'Leo [said]p: "Maybe I\'ll teach here one day." I [hope]n he [will]f.', es: 'Leo dijo: "Quizá algún día enseñe aquí". Ojalá lo haga.' },
        ],
        questions: [
          { q: 'What happened to Oliver Grant?', options: ['He moved to another city.', 'He turned into a giant crane.', 'He became a teacher.'], answer: 1, tip: 'El diario dice: "Oliver Grant turned into a giant crane".' },
          { q: 'What is the condition for Oliver to build the school?', options: ['The town hall pays a fair price.', 'Rosa leaves the street.', 'Leo teaches there.'], answer: 0, tip: 'El diario dice: "provided that the town hall pays a fair price".' },
          { q: 'What did Leo say?', options: ['That he wants luxury flats.', 'That he will leave Lumen Bay.', 'That maybe he will teach there one day.'], answer: 2, tip: 'El diario dice: "Maybe I\'ll teach here one day".' },
        ],
      },
    ],
  },
  // B2-08 · Pitch (Ventana 2064): página del protagonista y página mezclada. Sin página de G. Se abre al cerrar la misión 8
  {
    id: 'b2-mission-8',
    title: 'B2 · Misión 8: Pitch (Ventana 2064)',
    unlock: 'b2-08-close',
    words: [
      { title: 'Marketing', words: [['campaign', 'campaña'], ['target audience', 'público objetivo'], ['brand', 'marca'], ['slogan', 'eslogan'], ['launch', 'lanzamiento, lanzar'], ['influencer', 'influencer'], ['word of mouth', 'voz a voz'], ['market research', 'estudio de mercado'], ['survey', 'encuesta']] },
      { title: 'Trabajo', words: [['perks', 'beneficios'], ['health insurance', 'seguro médico'], ['flexible hours', 'horario flexible'], ['parental leave', 'licencia por un bebé'], ['sick leave', 'incapacidad'], ['notice period', 'preaviso'], ['resign', 'renunciar']] },
      { title: 'Acrónimos', words: [['ASAP', 'lo antes posible'], ['ETA', 'hora estimada de llegada'], ['FYI', 'para que sepas'], ['EOD', 'fin del día'], ['TBC', 'por confirmar'], ['RSVP', 'responde, por favor'], ['BTW', 'por cierto'], ['IMO', 'en mi opinión']] },
      { title: 'Phrasal verbs', words: [['hand in (your notice)', 'entregar (la renuncia)'], ['roll out', 'lanzar (un producto)'], ['cover up', 'encubrir'], ['sign up for', 'inscribirse en']] },
    ],
    versions: [
      {
        id: 'b2-mission-8-mine',
        tense: 'p',
        tab: 'Mi diario',
        title: 'Launch day, 2064',
        unlock: 'b2-08-close',
        frame: 'Lo escribes al volver al presente.',
        lines: [
          { en: 'Today I [went]p into the future again. Vocalis [was launching]p Restore, and every screen [said]p: "Far easier than you think."', es: 'Hoy volví a entrar al futuro. Vocalis estaba lanzando Restore, y todas las pantallas decían: "Mucho más fácil de lo que crees".' },
          { en: 'I [printed]p the fine print: "A compatible donor voice is required." Then I [left]p a note for Dr. Mensah.', es: 'Imprimí la letra pequeña: "Se requiere una voz donante compatible". Luego le dejé una nota al Dr. Mensah.' },
          { en: 'At the launch I [saw]p someone with a hood at the back. They [touched]p their throat and [disappeared]p.', es: 'En el lanzamiento vi a alguien con capucha al fondo. Se tocó la garganta y desapareció.' },
          { en: 'Mensah [read]p my note and [handed]p in his notice. They sell it as wellbeing. Somebody always pays the price.', es: 'Mensah leyó mi nota y presentó su renuncia. Lo venden como bienestar. Alguien siempre paga el precio.' },
        ],
        questions: [],
      },
      {
        id: 'b2-mission-8-mix',
        tense: 'mix',
        tab: 'Mezcla',
        title: 'Restore',
        unlock: 'b2-08-close',
        frame: 'Toda la campaña, con los tiempos de colores. Activa "Ver verbos" para verlos.',
        lines: [
          { en: 'The ads [say]n that Restore [is]n far more effective than therapy and twice as fast.', es: 'Los anuncios dicen que Restore es mucho más eficaz que la terapia y el doble de rápido.' },
          { en: 'Chloe [wrote]p: "FYI, the donor issue is TBC. Keep it off the ads."', es: 'Chloe escribió: "Para que sepan, el tema del donante está por confirmar. Que no salga en los anuncios".' },
          { en: 'Mensah [has handed]p in his notice. He [won\'t help]f them cover it up.', es: 'Mensah ha presentado su renuncia. No los va a ayudar a encubrirlo.' },
          { en: 'And the person with the hood… I [think]n I [will see]f them again.', es: 'Y la persona de la capucha… creo que la voy a volver a ver.' },
        ],
        questions: [
          { q: 'What do the ads say about Restore?', options: ['It is twice as fast as therapy.', 'It needs a donor voice.', 'It is slightly slower than therapy.'], answer: 0, tip: 'El diario dice: "far more effective than therapy and twice as fast".' },
          { q: 'What did Chloe want to keep off the ads?', options: ['The price.', 'The donor issue.', 'The launch date.'], answer: 1, tip: 'El correo dice: "the donor issue is TBC. Keep it off the ads".' },
          { q: 'What has Mensah done?', options: ['He has signed up for Restore.', 'He has become head of marketing.', 'He has handed in his notice.'], answer: 2, tip: 'El diario dice: "Mensah has handed in his notice".' },
        ],
      },
    ],
  },
  // Lectura larga de B2 (opcional, unas 250 palabras con 5 preguntas). Se abre al cerrar la misión 8
  {
    id: 'b2-reading-2',
    title: 'Lectura: Restore: the small print',
    unlock: 'b2-08-close',
    words: [
      { title: 'El artículo', words: [['medical community', 'comunidad médica'], ['donor', 'donante'], ['consent', 'consentimiento'], ['long-term', 'a largo plazo'], ['side effects', 'efectos secundarios'], ['regulator', 'ente regulador']] },
    ],
    versions: [
      {
        id: 'b2-reading-2-text',
        tense: 'mix',
        tab: 'Lectura',
        title: 'Restore: the small print',
        unlock: 'b2-08-close',
        frame: 'Un artículo de la revista Health Today, 2064. Es un texto largo: léelo con calma antes de responder.',
        lines: [
          { en: 'This spring, Vocalis rolled out Restore, a treatment that promises to give people their lost voices back. The adverts are everywhere: "Far easier than you think."', es: 'Esta primavera, Vocalis lanzó Restore, un tratamiento que promete devolverle a la gente la voz perdida. Los anuncios están por todas partes: "Mucho más fácil de lo que crees".' },
          { en: 'According to the company, Restore is far more effective than traditional therapy and works twice as fast. Thousands of patients have already signed up for it.', es: 'Según la empresa, Restore es mucho más eficaz que la terapia tradicional y funciona el doble de rápido. Miles de pacientes ya se han inscrito.' },
          { en: 'However, many doctors are worried. The problem is not in the adverts, but in the small print of the contract: "A compatible donor voice is required."', es: 'Sin embargo, muchos médicos están preocupados. El problema no está en los anuncios, sino en la letra pequeña del contrato: "Se requiere una voz donante compatible".' },
          { en: 'In other words, for one person to speak again, another person has to give their voice. Vocalis says that all donors give their consent. But there is very little information about who the donors are, and nobody knows the long-term effects.', es: 'En otras palabras, para que una persona vuelva a hablar, otra tiene que dar su voz. Vocalis dice que todos los donantes dan su consentimiento. Pero hay muy poca información sobre quiénes son los donantes, y nadie conoce los efectos a largo plazo.' },
          { en: '"Some donors may never speak again," says Dr. Kwame Mensah, who worked for Vocalis until last month. "I couldn\'t help them cover it up, so I handed in my notice."', es: '"Puede que algunos donantes nunca vuelvan a hablar", dice el Dr. Kwame Mensah, quien trabajó para Vocalis hasta el mes pasado. "No podía ayudarles a encubrirlo, así que presenté mi renuncia".' },
          { en: 'Vocalis says that Dr. Mensah\'s claims are "nowhere near as serious as they sound". The regulator has asked the company for more research before the end of the year.', es: 'Vocalis dice que lo que afirma el Dr. Mensah "no es ni de lejos tan grave como suena". El ente regulador le ha pedido a la empresa más investigación antes de fin de año.' },
          { en: 'Our advice? Before you sign anything, read the small print. Then read it again, aloud.', es: '¿Nuestro consejo? Antes de firmar algo, lee la letra pequeña. Luego léela otra vez, en voz alta.' },
        ],
        questions: [
          { q: 'What does Vocalis say about Restore?', options: ['It is cheaper than any other treatment.', 'It is far more effective than traditional therapy.', 'It doesn\'t need a donor.'], answer: 1, tip: 'El artículo dice: "Restore is far more effective than traditional therapy".' },
          { q: 'Where is the problem, according to doctors?', options: ['In the small print of the contract.', 'In the price.', 'In the adverts.'], answer: 0, tip: 'El artículo dice: "The problem is not in the adverts, but in the small print".' },
          { q: 'What is missing about the donors?', options: ['Their consent.', 'Their price.', 'Information about who they are.'], answer: 2, tip: 'El artículo dice: "there is very little information about who the donors are".' },
          { q: 'Why did Dr. Mensah leave Vocalis?', options: ['He couldn\'t help them cover it up.', 'He wanted flexible hours.', 'He got a better job.'], answer: 0, tip: 'Mensah dice: "I couldn\'t help them cover it up, so I handed in my notice".' },
          { q: 'What has the regulator asked for?', options: ['A new slogan.', 'More research.', 'A cheaper treatment.'], answer: 1, tip: 'El artículo dice: "The regulator has asked the company for more research".' },
        ],
      },
    ],
  },
  // B2-09 · The Gallery (presente): página del protagonista (la inscripción de las dos voces, pista para los lugares 13 y 14) y página mezclada
  {
    id: 'b2-mission-9',
    title: 'B2 · Misión 9: The Gallery',
    unlock: 'b2-09-close',
    words: [
      { title: 'Arte', words: [['exhibition', 'exposición'], ['gallery', 'galería'], ['curator', 'curador, curadora'], ['sculpture', 'escultura'], ['installation', 'instalación'], ['masterpiece', 'obra maestra'], ['abstract', 'abstracto'], ['portrait', 'retrato']] },
      { title: 'Literatura', words: [['character', 'personaje'], ['plot', 'trama'], ['narrator', 'narrador'], ['chapter', 'capítulo'], ['relatable', 'con quien uno se identifica'], ['complex', 'complejo']] },
      { title: 'Adjetivos fuertes', words: [['amazing', 'increíble'], ['stunning', 'impresionante'], ['awful', 'horrible'], ['tiny', 'diminuto'], ['huge', 'enorme'], ['fascinating', 'fascinante']] },
      { title: 'Locuciones adverbiales', words: [['without a word', 'sin decir nada'], ['in silence', 'en silencio'], ['all of a sudden', 'de repente'], ['at long last', 'por fin'], ['by no means', 'de ninguna manera']] },
      { title: 'Phrasal verbs', words: [['look up to', 'admirar'], ['stand out', 'destacarse'], ['pick out', 'escoger'], ['take in', 'observar con calma, asimilar']] },
    ],
    versions: [
      {
        id: 'b2-mission-9-mine',
        tense: 'p',
        tab: 'Mi página',
        title: 'Two voices',
        unlock: 'b2-09-close',
        frame: 'Lo que pasó en el museo, contado por ti. Aquí copiaste la inscripción de la última tablilla.',
        lines: [
          { en: 'Today we [went]p to the art museum. The exhibition, which [is called]n "Voices of Stone", [has]n tablets from the four temples.', es: 'Hoy fuimos al museo de arte. La exposición, que se llama "Voices of Stone", tiene tablillas de los cuatro templos.' },
          { en: 'I [translated]p the last tablet. I [copied]p it here, word for word:', es: 'Traduje la última tablilla. La copié aquí, palabra por palabra:' },
          { en: '"A voice that [is taken]n [returns]n only when two voices [rise]n together."', es: '"Una voz que es arrebatada solo regresa cuando dos voces se alzan juntas".' },
          { en: 'Leo [read]p it, [touched]p his throat and [left]p without a word.', es: 'Leo la leyó, se tocó la garganta y se fue sin decir nada.' },
          { en: 'Two voices together… what [does]n that [mean]n?', es: 'Dos voces juntas… ¿qué significa eso?' },
        ],
        questions: [],
      },
      {
        id: 'b2-mission-9-mix',
        tense: 'mix',
        tab: 'Mezcla',
        title: 'A golden frame',
        unlock: 'b2-09-close',
        frame: 'El museo entero, con los tiempos de colores. Activa "Ver verbos" para verlos.',
        lines: [
          { en: 'The light show in the digital room [was]p absolutely stunning, but the beginning [was]p rather slow.', es: 'El espectáculo de luz de la sala digital fue absolutamente impresionante, pero el comienzo fue más bien lento.' },
          { en: 'In the bookshop, someone [had torn]p out the last page of "The Man Who Lost His Voice".', es: 'En la librería, alguien había arrancado la última página de "The Man Who Lost His Voice".' },
          { en: 'Arturo, who [had touched]p the oldest tablet, [turned]p into a huge golden frame.', es: 'Arturo, que había tocado la tablilla más antigua, se convirtió en un marco dorado enorme.' },
          { en: 'Now he [says]n that art [should be]n free. Maya [is reading]n the book, and I [will find]f out what the inscription means.', es: 'Ahora dice que el arte debería ser libre. Maya está leyendo el libro, y yo descubriré qué significa la inscripción.' },
        ],
        questions: [
          { q: 'How was the beginning of the light show?', options: ['Absolutely stunning.', 'Rather slow.', 'Very huge.'], answer: 1, tip: 'El diario dice: "the beginning was rather slow".' },
          { q: 'What was missing from the book?', options: ['The last page.', 'The cover.', 'The first chapter.'], answer: 0, tip: 'El diario dice: "someone had torn out the last page".' },
          { q: 'Why did Arturo turn into a golden frame?', options: ['Because he sold the tablets.', 'Because Leo touched him.', 'Because he had touched the oldest tablet.'], answer: 2, tip: 'El diario dice: "Arturo, who had touched the oldest tablet, turned into…"' },
        ],
      },
    ],
  },
  // B2-10 · The Card (Ventana 2056): página del protagonista, página del cuaderno de G (letra a mano) y página mezclada
  {
    id: 'b2-mission-10',
    title: 'B2 · Misión 10: The Card (Ventana 2056)',
    unlock: 'b2-10-close',
    words: [
      { title: 'Contraste', words: [['whereas', 'mientras que'], ['while', 'mientras que'], ['however', 'sin embargo'], ['nevertheless', 'aun así'], ['on the other hand', 'por otro lado'], ['despite', 'a pesar de'], ['in spite of', 'a pesar de']] },
      { title: 'Sentimientos encontrados', words: [['resentment', 'resentimiento'], ['forgive', 'perdonar'], ['grudge', 'rencor'], ['miss', 'extrañar'], ['mixed feelings', 'sentimientos encontrados'], ['torn', 'dividido, indeciso']] },
      { title: 'Expresiones con -ing', words: [["there's no point in", 'no tiene sentido'], ["it's worth", 'vale la pena'], ['have difficulty', 'costarle a uno'], ['tired of', 'cansado de'], ['afraid of', 'con miedo de']] },
      { title: 'Phrasal verbs', words: [['look up to', 'admirar'], ['let go of', 'soltar, dejar ir'], ['hold on to', 'aferrarse a'], ['give in', 'ceder, rendirse']] },
    ],
    versions: [
      {
        id: 'b2-mission-10-mine',
        tense: 'p',
        tab: 'Mi diario',
        title: 'A school, 2056',
        unlock: 'b2-10-close',
        frame: 'Lo escribes al volver al presente.',
        lines: [
          { en: 'Today the Window [took]p me to a school in 2056. An old man with a hood [was standing]p at a classroom window.', es: 'Hoy la Ventana me llevó a una escuela en 2056. Un viejo con capucha estaba parado frente a la ventana de un salón.' },
          { en: 'Inside, a teacher [said]p: "Be brave. Use your voice." The old man [didn\'t move]p.', es: 'Adentro, un profesor dijo: "Sean valientes. Usen su voz". El viejo no se movió.' },
          { en: 'Then he [sat]p on a bench and [wrote]p a card. It [was]p G. Despite being so close, I [couldn\'t speak]p to him.', es: 'Luego se sentó en una banca y escribió una tarjeta. Era G. A pesar de estar tan cerca, no pude hablarle.' },
          { en: 'The man in the park on Leo\'s birthday… it [was]p G. Why would he know Leo?', es: 'El hombre del parque en el cumpleaños de Leo… era G. ¿Por qué conocería a Leo?' },
        ],
        questions: [],
      },
      {
        id: 'b2-mission-10-g',
        kind: 'L',
        tense: 'mix',
        tab: 'Cuaderno de G',
        title: 'The card',
        unlock: 'b2-10-close',
        frame: 'La página que G escribió en la banca. Letra temblorosa, tachones y la mancha de tinta.',
        lines: [
          { en: '~~I hate~~ Despite hating him, I [can\'t stop]n thinking about our friendship.', es: 'A pesar de odiarlo, no puedo dejar de pensar en nuestra amistad.' },
          { en: 'I [have held]p on to this grudge for years. I [am]n torn.', es: 'Me he aferrado a este rencor durante años. Estoy dividido.' },
          { en: '~~I will never~~ I [won\'t give]f in. But I [miss]n him.', es: 'No voy a ceder. Pero lo extraño.' },
          { en: 'Despite everything… he [was]p a good teacher. I [hope]n he still [is]n.', es: 'A pesar de todo… fue un buen profesor. Espero que todavía lo sea.' },
        ],
        questions: [],
      },
      {
        id: 'b2-mission-10-mix',
        tense: 'mix',
        tab: 'Mezcla',
        title: 'Mixed feelings',
        unlock: 'b2-10-close',
        frame: 'Todo lo que pasó en la Ventana, con los tiempos de colores. Activa "Ver verbos" para verlos.',
        lines: [
          { en: 'G [has]n mixed feelings: he [is]n full of resentment, whereas part of him [wants]n to forgive.', es: 'G tiene sentimientos encontrados: está lleno de resentimiento, mientras que una parte de él quiere perdonar.' },
          { en: 'He [had]p difficulty writing the card. Nevertheless, he [finished]p it.', es: 'Le costó escribir la tarjeta. Aun así, la terminó.' },
          { en: 'Leo [looks]n up to his teachers. One day, he [will open]f a gift from G in the park.', es: 'Leo admira a sus profesores. Un día abrirá un regalo de G en el parque.' },
          { en: 'Maybe it [is]n time to let go of the past… but G [is holding]n on to it.', es: 'Quizá es hora de soltar el pasado… pero G se aferra a él.' },
        ],
        questions: [
          { q: 'How does G feel?', options: ['He has mixed feelings.', 'He is completely happy.', 'He feels nothing.'], answer: 0, tip: 'El diario dice: "G has mixed feelings".' },
          { q: 'Was it easy for G to write the card?', options: ['Yes, very easy.', 'No, he had difficulty writing it.', 'He didn\'t write it.'], answer: 1, tip: 'El diario dice: "He had difficulty writing the card".' },
          { q: 'What is G doing with the past?', options: ['He is letting go of it.', 'He is forgetting it.', 'He is holding on to it.'], answer: 2, tip: 'El diario dice: "G is holding on to it" (hold on to = aferrarse).' },
        ],
      },
    ],
  },
  // B2-11 · Who Is G? (presente): página del protagonista (la línea de tiempo del tablero de pistas) y página mezclada
  {
    id: 'b2-mission-11',
    title: 'B2 · Misión 11: Who Is G?',
    unlock: 'b2-11-close',
    words: [
      { title: 'Cine y series', words: [['plot', 'trama'], ['plot twist', 'giro'], ['cliffhanger', 'final en suspenso'], ['cast', 'reparto'], ['sequel', 'secuela'], ['episode', 'episodio'], ['binge-watch', 'ver muchos episodios seguidos'], ['review', 'reseña']] },
      { title: 'Adjetivos', words: [['gripping', 'atrapante'], ['predictable', 'predecible'], ['spine-chilling', 'escalofriante'], ['overrated', 'sobrevalorado'], ['thought-provoking', 'que hace pensar']] },
      { title: 'Preguntas indirectas', words: [['Do you know where…?', '¿Sabes dónde…?'], ['Can you tell me when…?', '¿Puedes decirme cuándo…?'], ['I wonder whether…', 'Me pregunto si…'], ['He asked me if…', 'Me preguntó si…']] },
      { title: 'Phrasal verbs', words: [['figure out', 'descifrar'], ['turn out', 'resultar'], ['piece together', 'armar (las pistas)'], ['give away', 'revelar (un final)']] },
    ],
    versions: [
      {
        id: 'b2-mission-11-mine',
        tense: 'p',
        tab: 'Mi línea de tiempo',
        title: 'Red threads',
        unlock: 'b2-11-close',
        frame: 'La línea de tiempo que armaste en el tablero de pistas, contada por ti.',
        lines: [
          { en: 'A teacher [was teaching]p a night class when the fire [started]p. A man [froze]p on the stairs.', es: 'Un profesor estaba dando una clase nocturna cuando empezó el incendio. Un hombre se quedó paralizado en la escalera.' },
          { en: 'A year later, Vocalis [had been testing]p a device for months.', es: 'Un año después, Vocalis llevaba meses probando un aparato.' },
          { en: 'By the time Vocalis [launched]p "Restore", G [had already stolen]p the prototype.', es: 'Para cuando Vocalis lanzó "Restore", G ya había robado el prototipo.' },
          { en: 'G [was sitting]p on a bench when he [wrote]p the card. By the time Leo [opened]p the gift, G [had already written]p it.', es: 'G estaba sentado en una banca cuando escribió la tarjeta. Para cuando Leo abrió el regalo, G ya la había escrito.' },
          { en: 'Tonight Leo [told]p us that he [had been having]p the same dream for weeks: smoke and a corridor on fire.', es: 'Esta noche Leo nos contó que llevaba semanas teniendo el mismo sueño: humo y un pasillo en llamas.' },
          { en: 'I [promised]p to speak for him. Under the last red thread I [wrote]p: "Who is G?"', es: 'Le prometí hablar por él. Bajo el último hilo rojo escribí: "¿Quién es G?"' },
        ],
        questions: [],
      },
      {
        id: 'b2-mission-11-mix',
        tense: 'mix',
        tab: 'Mezcla',
        title: 'Movie night',
        unlock: 'b2-11-close',
        frame: 'La noche entera, con los tiempos de colores. Activa "Ver verbos" para verlos.',
        lines: [
          { en: 'In the archive, Manuel [asked]p me who G [was]p. I [didn\'t know]p.', es: 'En el archivo, Manuel me preguntó quién era G. No lo sabía.' },
          { en: 'Then Marisol [chose]p a thriller. It [was]p a bit slow at first, but the plot twist [was]p spine-chilling.', es: 'Luego Marisol escogió un thriller. Fue un poco lento al principio, pero el giro fue escalofriante.' },
          { en: 'A critic [jumped]p out of the screen and [tried]p to give away the ending of everything.', es: 'Un crítico saltó de la pantalla e intentó revelar el final de todo.' },
          { en: 'Now Leo [is]n scared, and I [don\'t know]n how this story [ends]n. But we [will face]f it together.', es: 'Ahora Leo tiene miedo, y no sé cómo termina esta historia. Pero la enfrentaremos juntos.' },
        ],
        questions: [
          { q: 'What did Manuel ask?', options: ['Who G was.', 'Who was G.', 'Where the film was.'], answer: 0, tip: 'El diario dice: "Manuel asked me who G was".' },
          { q: 'What was the film like?', options: ['Fast and predictable.', 'Slow at first, with a spine-chilling twist.', 'Overrated and boring.'], answer: 1, tip: 'El diario dice: "a bit slow at first, but the plot twist was spine-chilling".' },
          { q: 'What did the critic try to do?', options: ['Write a review.', 'Steal the clock.', 'Give away the ending of everything.'], answer: 2, tip: 'El diario dice: "tried to give away the ending of everything".' },
        ],
      },
    ],
  },
]
