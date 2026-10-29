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
  title: string
  /** Quién lo escribe y cuándo */
  frame: string
  lines: DiaryLine[]
  questions: DiaryQuestion[]
}
export type DiaryChapter = { id: string; title: string; unlock: string; versions: DiaryVersion[] }

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
    versions: [
      {
        id: 'school-past',
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
          { q: '"Leo helps me." In the past, it is...', options: ['Leo helps me.', 'Leo helped me.', 'Leo is going to help me.'], answer: 1, tip: 'Muchos verbos forman el pasado con -ed: help → helped.' },
        ],
      },
      {
        id: 'school-future',
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
  week: 'semana', whistle: 'silbato', win: 'ganar', won: 'gané (win)', words: 'palabras', ha: 'ja (risa)', broken: 'roto', machine: 'máquina', inside: 'dentro de', time: 'tiempo, época', this: 'este, esta', teacher: 'profesor', them: 'a ellos, los', keep: 'guardar', later: 'después',
  "school's": 'de la escuela', ana: 'Ana (nombre)', story: 'historia', plan: 'plan', "stranger's": 'del desconocido',
}

export function fillNames(text: string, name: string, iname: string) {
  return text.replaceAll('{name}', name).replaceAll('{iname}', iname)
}

/** Normaliza una palabra para buscarla en el diccionario */
export function normWord(raw: string) {
  return raw.toLowerCase().replace(/[’`]/g, "'").replace(/^[^a-z']+|[^a-z']+$/g, '').replace(/^'+|'+$/g, '')
}

export function lookup(raw: string, names: string[] = []): string | null {
  const w = normWord(raw)
  if (!w) return null
  if (names.some((n) => n.toLowerCase() === w)) return `${raw.replace(/[^\p{L}]/gu, '')} (nombre)`
  return DICT[w] ?? null
}
