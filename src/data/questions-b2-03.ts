import type { Question } from '../game/types'

/**
 * B2-03 · Frozen (Ventana 2061). Bloque 1 (la escuela nocturna, data/b2Frozen.ts): prácticas después de cada lección.
 *  - La pizarra (tarea b2-03-senses, tema senses-b2): b2-03-sn1…sn6.
 *  - El cartel de bienestar (tarea b2-03-feelings, tema feelings-b2): b2-03-fe1…fe6.
 *  - El cuaderno olvidado (tarea b2-03-diary, tema diary-b2): b2-03-di1…di6.
 *  - Bloque 2 · el botiquín (tarea b2-03-injury, tema injuries-b2): b2-03-ij1…ij6. Combate: B2_03_COMBAT_QUESTIONS.
 * Las opciones incorrectas están mal en cualquier contexto. La posición de la respuesta correcta varía a propósito.
 */
const SN = 'senses-b2' as const
const FE = 'feelings-b2' as const
const DI = 'diary-b2' as const
const IJ = 'injuries-b2' as const
const T_SN = ['b2-03-senses']
const T_FE = ['b2-03-feelings']
const T_DI = ['b2-03-diary']
const T_IJ = ['b2-03-injury']

const ids = (p: string) => [1, 2, 3, 4, 5, 6].map((n) => `b2-03-${p}${n}`)
export const B2_03_SENSES_IDS = ids('sn')
export const B2_03_FEELINGS_IDS = ids('fe')
export const B2_03_DIARY_IDS = ids('di')
export const B2_03_INJURY_IDS = ids('ij')

export const B2_03_QUESTIONS: Question[] = [
  // Bloque 1 · La pizarra (verbos de los sentidos, like / as if)
  { id: 'b2-03-sn1', topic: SN, prompt: 'I heard someone ___ for help, so I ran to the door.', options: ['to shout', 'shouting', 'shouted'], answer: 1, tip: 'hear + alguien + -ing (o forma base), nunca to.', tags: T_SN },
  { id: 'b2-03-sn2', topic: SN, prompt: 'I saw him ___ the door and leave.', options: ['close', 'to close', 'closed'], answer: 0, tip: 'Acción completa → see + alguien + forma base: saw him close.', tags: T_SN },
  { id: 'b2-03-sn3', topic: SN, prompt: 'It smells ___ smoke in here.', options: ['as', 'as if', 'like'], answer: 2, tip: 'like + sustantivo (smoke).', tags: T_SN },
  { id: 'b2-03-sn4', topic: SN, prompt: "You look ___ you haven't slept for days.", options: ['as if', 'like as', 'as'], answer: 0, tip: 'as if + oración completa.', tags: T_SN },
  { id: 'b2-03-sn5', topic: SN, kind: 'fix', prompt: 'We watched the children to play in the yard.', options: ['We watched the children playing in the yard.', 'We watched the children to playing in the yard.', 'We watched to the children play in the yard.'], answer: 0, tip: 'watch + alguien + -ing (o forma base), sin to.', tags: T_SN },
  { id: 'b2-03-sn6', topic: SN, prompt: 'In the story, he looked as if he ___ made of stone.', options: ['is', 'were', 'be'], answer: 1, tip: 'Historia en pasado y algo irreal → as if he were.', tags: T_SN },

  // Bloque 1 · El cartel de bienestar (sentimientos, adjetivo y sustantivo, -ed / -ing)
  { id: 'b2-03-fe1', topic: FE, prompt: 'Too much work and no time. I feel ___.', options: ['relieved', 'overwhelmed', 'boring'], answer: 1, tip: 'Demasiado al mismo tiempo → overwhelmed.', tags: T_FE },
  { id: 'b2-03-fe2', topic: FE, prompt: 'The exam is over and I passed. What a ___!', options: ['relief', 'relieved', 'relieve'], answer: 0, tip: 'Después de "What a" va un sustantivo: relief.', tags: T_FE },
  { id: 'b2-03-fe3', topic: FE, prompt: 'She felt a lot of ___ before the interview.', options: ['anxious', 'anxiously', 'anxiety'], answer: 2, tip: 'a lot of + sustantivo: anxiety.', tags: T_FE },
  { id: 'b2-03-fe4', topic: FE, prompt: "This film is two hours too long. It's really ___.", options: ['bored', 'boring', 'bore'], answer: 1, tip: 'La cosa que causa el sentimiento → -ing: boring.', tags: T_FE },
  { id: 'b2-03-fe5', topic: FE, kind: 'fix', prompt: 'I was very exciting about the trip.', options: ['I was very excited about the trip.', 'I was very excite about the trip.', 'I was very exciting for the trip.'], answer: 0, tip: 'Cómo se siente la persona → -ed: excited.', tags: T_FE },
  { id: 'b2-03-fe6', topic: FE, prompt: 'He lied to his friend, and now he feels ___.', options: ['guilt', 'guilty', 'guiltily'], answer: 1, tip: 'feel + adjetivo: guilty (guilt es el sustantivo).', tags: T_FE },

  // Bloque 1 · El cuaderno olvidado (varios tiempos y phrasal verbs)
  { id: 'b2-03-di1', topic: DI, prompt: "I've been ___ tired lately.", options: ['feel', 'feeling', 'felt'], answer: 1, tip: 'have been + -ing: sigue ahora.', tags: T_DI },
  { id: 'b2-03-di2', topic: DI, prompt: 'I ___ speak up more when I was younger.', options: ['use to', 'was used', 'used to'], answer: 2, tip: 'Costumbre del pasado: used to + verbo.', tags: T_DI },
  { id: 'b2-03-di3', topic: DI, prompt: "Don't hold ___. Tell us what you really think.", options: ['back', 'up', 'down'], answer: 0, tip: 'hold back = contenerse, no decir lo que piensas.', tags: T_DI },
  { id: 'b2-03-di4', topic: DI, prompt: 'Everyone was shouting and I just froze ___.', options: ['down', 'off', 'up'], answer: 2, tip: 'freeze up = quedarse paralizado por el miedo.', tags: T_DI },
  { id: 'b2-03-di5', topic: DI, prompt: 'Take a deep breath and calm ___.', options: ['up', 'down', 'back'], answer: 1, tip: 'calm down = calmarse.', tags: T_DI },
  { id: 'b2-03-di6', topic: DI, kind: 'fix', prompt: "I've been feeling tired since three weeks.", options: ["I've been feeling tired for three weeks.", "I've been feel tired for three weeks.", "I've been feeling tired since three weeks ago."], answer: 0, tip: 'Con una cantidad de tiempo va for: for three weeks.', tags: T_DI },

  // Bloque 2 · El botiquín (el cuerpo y las lesiones)
  { id: 'b2-03-ij1', topic: IJ, prompt: 'She fell on the stairs and ___ her ankle.', options: ['sprained', 'bruise', 'bled'], answer: 0, tip: 'sprain your ankle = torcerse el tobillo.', tags: T_IJ },
  { id: 'b2-03-ij2', topic: IJ, prompt: 'Be careful with the pan. You could ___ your hand.', options: ['bleed', 'burn', 'bruised'], answer: 1, tip: 'Con algo caliente: burn your hand.', tags: T_IJ },
  { id: 'b2-03-ij3', topic: IJ, prompt: 'I hit my arm on the door, and now I have a ___.', options: ['bleed', 'sprain', 'bruise'], answer: 2, tip: 'La marca oscura después de un golpe: a bruise.', tags: T_IJ },
  { id: 'b2-03-ij4', topic: IJ, kind: 'fix', prompt: 'He cut the finger with a knife.', options: ['He cut his finger with a knife.', "He cut finger's with a knife.", 'He cut the his finger with a knife.'], answer: 0, tip: 'Con el cuerpo, posesivo: his finger.', tags: T_IJ },
  { id: 'b2-03-ij5', topic: IJ, prompt: 'Three people were ___ in the fire.', options: ['injury', 'injured', 'injure'], answer: 1, tip: 'Adjetivo después de were: injured.', tags: T_IJ },
  { id: 'b2-03-ij6', topic: IJ, prompt: "It's a small cut, but it won't stop ___.", options: ['bleeding', 'to bleeding', 'bled'], answer: 0, tip: 'stop + -ing = dejar de: stop bleeding.', tags: T_IJ },
]

const SHADOW = ['b2-03-shadow']
const BOSS_SN = ['b2-03-boss-sn']
const BOSS_FE = ['b2-03-boss-fe']

/** Bloque 2: Smoke Shadows (b2-03-sh1…sh6) y Panic (fase 1: b2-03-bs1…bs6 · fase 2: b2-03-bf1…bf6) */
export const B2_03_COMBAT_QUESTIONS: Question[] = [
  // Bloque 2 · Smoke Shadows (esbirros)
  { id: 'b2-03-sh1', topic: SN, kind: 'fix', prompt: 'I saw him to run down the stairs.', options: ['I saw him running to the stairs down.', 'I saw him run down the stairs.', 'I saw to him run down the stairs.'], answer: 1, tip: 'see + alguien + forma base, sin to.', tags: SHADOW },
  { id: 'b2-03-sh2', topic: SN, kind: 'fix', prompt: 'We heard her to call for help.', options: ['We heard her calling for help.', 'We heard her to calling for help.', 'We heard to her call for help.'], answer: 0, tip: 'hear + alguien + -ing, sin to.', tags: SHADOW },
  { id: 'b2-03-sh3', topic: FE, kind: 'fix', prompt: "I'm boring in this class.", options: ["I'm bore in this class.", "I'm boredom in this class.", "I'm bored in this class."], answer: 2, tip: 'Cómo te sientes → bored. Boring es la clase.', tags: SHADOW },
  { id: 'b2-03-sh4', topic: FE, prompt: 'After ten hours of work I was completely ___.', options: ['exhausted', 'exhausting', 'exhaust'], answer: 0, tip: 'Cómo se siente la persona → exhausted.', tags: SHADOW },
  { id: 'b2-03-sh5', topic: SN, prompt: 'I could feel the floor ___ under my feet.', options: ['to shake', 'shaking', 'shook'], answer: 1, tip: 'feel + algo + -ing (en curso).', tags: SHADOW },
  { id: 'b2-03-sh6', topic: DI, prompt: 'When people shout, I sometimes freeze ___.', options: ['up', 'back', 'down'], answer: 0, tip: 'freeze up = quedarse paralizado.', tags: SHADOW },

  // Bloque 2 · Panic, fase 1 (verbos de los sentidos y like / as if)
  { id: 'b2-03-bs1', topic: SN, kind: 'fix', prompt: 'I could smell the smoke to come from the stairs.', options: ['I could smell the smoke coming from the stairs.', 'I could smell the smoke to coming from the stairs.', 'I could smell to the smoke come from the stairs.'], answer: 0, tip: 'smell + algo + -ing, sin to.', tags: BOSS_SN },
  { id: 'b2-03-bs2', topic: SN, kind: 'fix', prompt: 'In the story, he looked as if he is a statue.', options: ['In the story, he looked as if he be a statue.', 'In the story, he looked like as he were a statue.', 'In the story, he looked as if he were a statue.'], answer: 2, tip: 'Historia en pasado y algo irreal → as if he were.', tags: BOSS_SN },
  { id: 'b2-03-bs3', topic: SN, prompt: 'Did you notice anyone ___ the building before the fire?', options: ['to leave', 'leave', 'left'], answer: 1, tip: 'notice + alguien + forma base, sin to.', tags: BOSS_SN },
  { id: 'b2-03-bs4', topic: SN, prompt: 'That noise sounds ___ an alarm.', options: ['as if', 'like', 'as though'], answer: 1, tip: 'like + sustantivo (an alarm).', tags: BOSS_SN },
  { id: 'b2-03-bs5', topic: SN, kind: 'order', prompt: 'Los vi correr escaleras abajo.', options: ['I', 'watched', 'them', 'run', 'down', 'the', 'stairs.'], answer: 0, tip: 'watch + objeto + forma base.', tags: BOSS_SN },
  { id: 'b2-03-bs6', topic: SN, kind: 'order', prompt: 'Parecía como si no hubiera dormido.', options: ['She', 'looked', 'as', 'if', 'she', "hadn't", 'slept.'], answer: 0, tip: 'look + as if + oración en pasado.', tags: BOSS_SN },

  // Bloque 2 · Panic, fase 2 (sentimientos, adjetivo y sustantivo, lesiones y escucha de evacuación)
  { id: 'b2-03-bf1', topic: FE, kind: 'fix', prompt: 'He felt a lot of anxious before the exam.', options: ['He felt a lot of anxiously before the exam.', 'He felt a lot of anxiety before the exam.', 'He felt a lot anxious before the exam.'], answer: 1, tip: 'a lot of + sustantivo: anxiety.', tags: BOSS_FE },
  { id: 'b2-03-bf2', topic: IJ, kind: 'fix', prompt: "She sprained her ankle's on the stairs.", options: ['She sprained her ankle on the stairs.', "She sprained the ankle's on the stairs.", 'She sprained ankle her on the stairs.'], answer: 0, tip: 'Posesivo + parte del cuerpo: her ankle.', tags: BOSS_FE },
  { id: 'b2-03-bf3', topic: FE, prompt: 'When they all got out safely, I felt a huge sense of ___.', options: ['relieved', 'relieve', 'relief'], answer: 2, tip: 'a sense of + sustantivo: relief.', tags: BOSS_FE },
  { id: 'b2-03-bf4', topic: FE, prompt: "He didn't help, and now he can't forget the ___.", options: ['guilt', 'guilty', 'guiltily'], answer: 0, tip: 'the + sustantivo: guilt.', tags: BOSS_FE },
  {
    id: 'b2-03-bf5',
    topic: IJ,
    kind: 'listen',
    audio: 'Attention, please. This is not a drill. Do not use the lifts or the main stairs. Leave the building by the back stairs.',
    voice: 'female',
    prompt: 'How should people leave the building?',
    options: ['By the lifts.', 'By the main stairs.', 'By the back stairs.'],
    answer: 2,
    tip: 'Leave the building by the back stairs.',
    tags: BOSS_FE,
  },
  {
    id: 'b2-03-bf6',
    topic: IJ,
    kind: 'listen',
    audio: 'If anyone is injured, stay with them and wait for the firefighters at the main entrance. Please stay calm.',
    voice: 'female',
    prompt: 'What should you do if someone is injured?',
    options: ['Stay with them and wait for the firefighters.', 'Carry them up the stairs.', 'Call a taxi.'],
    answer: 0,
    tip: 'If anyone is injured, stay with them and wait for the firefighters.',
    tags: BOSS_FE,
  },
]
