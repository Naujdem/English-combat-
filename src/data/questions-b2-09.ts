import type { Question } from '../game/types'

/**
 * B2-09 · The Gallery (presente). Bloque 1 (la exposición "Voices of Stone", data/b2Gallery.ts): prácticas después de cada lección.
 *  - Graduables y no graduables, quite / pretty / rather / fairly (tarea b2-09-strong, tema gradable-b2): b2-09-gr1…gr6.
 *  - Orden de adjetivos (tarea b2-09-order, tema adj-order-b2): b2-09-ao1…ao6.
 *  - Relativas explicativas y which de toda la oración (tarea b2-09-relative, tema nd-relative-b2): b2-09-nd1…nd6 (2 de escucha: la visita de Arturo).
 * Las opciones incorrectas están mal en cualquier contexto. La posición de la respuesta correcta varía a propósito.
 */
const GR = 'gradable-b2' as const
const AO = 'adj-order-b2' as const
const ND = 'nd-relative-b2' as const
const RV = 'review-b2' as const
const AD = 'adv-phrases-b2' as const
const T_RV = ['b2-09-review']
const T_AD = ['b2-09-adverbs']
const STATUE = ['b2-09-statue']
const BOSS_REL = ['b2-09-boss-rel']
const BOSS_ART = ['b2-09-boss-art']
const T_GR = ['b2-09-strong']
const T_AO = ['b2-09-order']
const T_ND = ['b2-09-relative']

const ids = (p: string) => [1, 2, 3, 4, 5, 6].map((n) => `b2-09-${p}${n}`)
export const B2_09_STRONG_IDS = ids('gr')
export const B2_09_ORDER_IDS = ids('ao')
export const B2_09_RELATIVE_IDS = ids('nd')
export const B2_09_REVIEW_IDS = ids('rv')
export const B2_09_ADVERBS_IDS = ids('ad')

export const B2_09_QUESTIONS: Question[] = [
  // Bloque 1 · la persona especial (graduables y no graduables, matizar)
  { id: 'b2-09-gr1', topic: GR, prompt: 'This painting is ___ amazing!', options: ['very', 'absolutely', 'a bit'], answer: 1, tip: 'amazing ya es extremo (no graduable): absolutely amazing, nunca "very amazing".', tags: T_GR },
  { id: 'b2-09-gr2', topic: GR, prompt: 'The sculpture is ___ good, but not great.', options: ['very', 'absolutely', 'completely'], answer: 0, tip: 'good es graduable: very good. Con good no va absolutely.', tags: T_GR },
  { id: 'b2-09-gr3', topic: GR, prompt: "This room isn't just big. It's ___!", options: ['very huge', 'absolutely big', 'absolutely huge'], answer: 2, tip: 'huge es extremo (= very big): absolutely huge. Nunca "very huge" ni "absolutely big".', tags: T_GR },
  { id: 'b2-09-gr4', topic: GR, prompt: "The exhibition is ___ interesting. I'd like to come back.", options: ['quite', 'absolutely', 'utterly'], answer: 0, tip: 'interesting es graduable: quite / very interesting (nunca "absolutely interesting").', tags: T_GR },
  { id: 'b2-09-gr5', topic: GR, prompt: 'The meaning of the tablet is ___ strange. I didn\'t expect that.', options: ['absolutely', 'rather', 'totally'], answer: 1, tip: 'rather + adjetivo graduable: algo inesperado o un poco negativo.', tags: T_GR },
  { id: 'b2-09-gr6', topic: GR, prompt: "Look at that ring! It's ___.", options: ['very tiny', 'absolutely small', 'tiny'], answer: 2, tip: 'tiny ya significa very small: no lleva very. Y small es graduable: no va con absolutely.', tags: T_GR },
  // Bloque 1 · la persona especial (orden de adjetivos)
  { id: 'b2-09-ao1', topic: AO, prompt: 'It\'s a ___ tablet.', options: ['grey small ancient', 'small ancient grey', 'ancient grey small'], answer: 1, tip: 'Tamaño – edad – color: small ancient grey.', tags: T_AO },
  { id: 'b2-09-ao2', topic: AO, prompt: 'She bought a ___ vase.', options: ['big red Chinese', 'red big Chinese', 'Chinese big red'], answer: 0, tip: 'Tamaño – color – origen: big red Chinese.', tags: T_AO },
  { id: 'b2-09-ao3', topic: AO, prompt: 'Look at that ___ box!', options: ['wooden old small', 'small wooden old', 'small old wooden'], answer: 2, tip: 'Tamaño – edad – material: small old wooden.', tags: T_AO },
  { id: 'b2-09-ao4', topic: AO, prompt: 'What a ___ dress!', options: ['red silk lovely', 'lovely red silk', 'silk lovely red'], answer: 1, tip: 'La opinión va siempre primero; después color y material: lovely red silk.', tags: T_AO },
  { id: 'b2-09-ao5', topic: AO, prompt: 'He has a ___ table.', options: ['round beautiful Italian', 'beautiful round Italian', 'Italian beautiful round'], answer: 1, tip: 'Opinión – forma – origen: beautiful round Italian.', tags: T_AO },
  { id: 'b2-09-ao6', topic: AO, prompt: 'I need a ___ bag.', options: ['leather black sleeping', 'sleeping black leather', 'black leather sleeping'], answer: 2, tip: 'Color – material – propósito: black leather sleeping bag. El propósito va justo antes del sustantivo.', tags: T_AO },
  // Bloque 1 · la persona especial (relativas explicativas, la visita de Arturo)
  { id: 'b2-09-nd1', topic: ND, prompt: 'This tablet, ___ was found in 1998, comes from the Temple of Echoes.', options: ['that', 'which', 'who'], answer: 1, tip: 'Con comas (información extra) sobre una cosa: which. Nunca that.', tags: T_ND },
  { id: 'b2-09-nd2', topic: ND, prompt: 'My brother, ___ lives in Lima, is an artist.', options: ['who', 'that', 'which'], answer: 0, tip: 'Persona + información extra entre comas: who.', tags: T_ND },
  { id: 'b2-09-nd3', topic: ND, prompt: "He didn't come, ___ was strange.", options: ['that', 'what', 'which'], answer: 2, tip: 'which de toda la oración (= y eso): coma + which. Nunca that ni what.', tags: T_ND },
  { id: 'b2-09-nd4', topic: ND, prompt: 'Arturo, ___ office is upstairs, is the curator.', options: ['who', 'whose', "who's"], answer: 1, tip: 'Posesión (su oficina): whose.', tags: T_ND },
  {
    id: 'b2-09-nd5',
    topic: ND,
    kind: 'listen',
    audio: 'Dr. Ruiz, who led the excavation, never published her notes. Nobody knows why.',
    voice: 'male',
    prompt: 'What do we know about Dr. Ruiz?',
    options: ['She translated the tablets.', 'She led the excavation.', 'She works at the museum.'],
    answer: 1,
    tip: '"Dr. Ruiz, who led the excavation, never published her notes."',
    tags: T_ND,
  },
  {
    id: 'b2-09-nd6',
    topic: ND,
    kind: 'listen',
    audio: 'For years nobody could read the tablets, which made them famous all over the world.',
    voice: 'male',
    prompt: 'Why did the tablets become famous?',
    options: ['Because nobody could read them.', 'Because they were very big.', 'Because Dr. Ruiz published them.'],
    answer: 0,
    tip: '"…nobody could read the tablets, which made them famous" (which = y eso).',
    tags: T_ND,
  },
  // Bloque 2 · la persona especial en la sala de arte digital (opinar y reseñar, stand out / take in)
  { id: 'b2-09-rv1', topic: RV, prompt: 'What I liked ___ was the ending.', options: ['most', 'more', 'the more'], answer: 0, tip: 'What I liked most was… = lo que más me gustó fue…', tags: T_RV },
  { id: 'b2-09-rv2', topic: RV, prompt: 'The show was long, but it was well ___ seeing.', options: ['worthy', 'worth', 'worthwhile'], answer: 1, tip: 'be (well) worth + -ing: valer (mucho) la pena.', tags: T_RV },
  { id: 'b2-09-rv3', topic: RV, prompt: 'Everyone talked about the ending. It really stood ___.', options: ['up', 'off', 'out'], answer: 2, tip: 'stand out = destacarse.', tags: T_RV },
  { id: 'b2-09-rv4', topic: RV, kind: 'fix', prompt: "The concert didn't live up my expectations.", options: ["The concert didn't live up to my expectations.", "The concert didn't live my expectations up.", "The concert didn't live on my expectations."], answer: 0, tip: 'live up to (expectations) = estar a la altura (de lo esperado).', tags: T_RV },
  { id: 'b2-09-rv5', topic: RV, kind: 'order', prompt: 'Necesité tiempo para asimilarlo todo.', options: ['I', 'needed', 'time', 'to', 'take', 'it', 'all', 'in.'], answer: 0, tip: 'take in = asimilar, observar con calma: take it all in.', tags: T_RV },
  {
    id: 'b2-09-rv6',
    topic: RV,
    kind: 'listen',
    audio: 'The music was absolutely stunning, but the beginning was rather slow. Overall, it was well worth seeing. Four stars out of five.',
    voice: 'female',
    prompt: 'What did the reviewer NOT like?',
    options: ['The music.', 'The beginning.', 'The ending.'],
    answer: 1,
    tip: '"…but the beginning was rather slow."',
    tags: T_RV,
  },
  // Bloque 2 · la librería (locuciones adverbiales, el cuento, look up to / pick out)
  { id: 'b2-09-ad1', topic: AD, prompt: 'He left the room ___ a word.', options: ['without', 'with no', 'in'], answer: 0, tip: 'without a word = sin decir (ni) una palabra.', tags: T_AD },
  { id: 'b2-09-ad2', topic: AD, prompt: '___, the lights went out and everyone screamed.', options: ['At long last', 'All of a sudden', 'By no means'], answer: 1, tip: 'all of a sudden = de repente.', tags: T_AD },
  { id: 'b2-09-ad3', topic: AD, kind: 'fix', prompt: 'They ate their dinner in a silence.', options: ['They ate their dinner in the silence of.', 'They ate their dinner in silence.', 'They ate their dinner on silence.'], answer: 1, tip: 'in silence, sin artículo.', tags: T_AD },
  { id: 'b2-09-ad4', topic: AD, prompt: "It's ___ an easy book, but it's worth reading.", options: ['at long last', 'all of a sudden', 'by no means'], answer: 2, tip: 'by no means = de ninguna manera, para nada.', tags: T_AD },
  { id: 'b2-09-ad5', topic: AD, prompt: 'In the story, everybody looked up ___ Tomas because he was brave.', options: ['to', 'at', 'for'], answer: 0, tip: 'look up to someone = admirar a alguien.', tags: T_AD },
  { id: 'b2-09-ad6', topic: AD, prompt: 'Nell was shy and quiet. In the story, she is a ___ character: we feel what she feels.', options: ['flat', 'relatable', 'boring'], answer: 1, tip: 'relatable = con el que uno se identifica.', tags: T_AD },
  // Bloque 2 · combate: Living Statues (b2-09-statue)
  { id: 'b2-09-ls1', topic: GR, kind: 'fix', prompt: "I'm very fantastic!", options: ["I'm absolutely fantastic!", "I'm fairly fantastic!", "I'm a bit fantastic!"], answer: 0, tip: 'fantastic es extremo: absolutely fantastic.', tags: STATUE },
  { id: 'b2-09-ls2', topic: AO, kind: 'fix', prompt: 'A wooden old small box is my home.', options: ['An old small wooden box is my home.', 'A small old wooden box is my home.', 'A small wooden old box is my home.'], answer: 1, tip: 'Tamaño – edad – material: small old wooden.', tags: STATUE },
  { id: 'b2-09-ls3', topic: ND, kind: 'fix', prompt: 'My brother, that lives in Lima, is an artist.', options: ['My brother, who lives in Lima, is an artist.', 'My brother, which lives in Lima, is an artist.', 'My brother who, lives in Lima, is an artist.'], answer: 0, tip: 'Con comas y persona: who. Nunca that.', tags: STATUE },
  { id: 'b2-09-ls4', topic: GR, prompt: 'The statue is ___ huge. It touches the ceiling!', options: ['very', 'fairly', 'absolutely'], answer: 2, tip: 'huge es extremo: absolutely huge.', tags: STATUE },
  { id: 'b2-09-ls5', topic: GR, kind: 'fix', prompt: 'He is absolutely good at painting.', options: ['He is absolutely well at painting.', 'He is really good at painting.', 'He is very excellent at painting.'], answer: 1, tip: 'good es graduable: really / very good. "Very excellent" tampoco: excellent es extremo.', tags: STATUE },
  { id: 'b2-09-ls6', topic: AO, prompt: 'She is wearing a ___ hat.', options: ['lovely big black', 'big black lovely', 'black lovely big'], answer: 0, tip: 'Opinión – tamaño – color: lovely big black.', tags: STATUE },
  // The Curator, fase 1 (relativas explicativas, which de toda la oración)
  { id: 'b2-09-cr1', topic: ND, kind: 'fix', prompt: 'The tablet, that is very old, is mine!', options: ['The tablet, who is very old, is mine!', 'The tablet that, is very old, is mine!', 'The tablet, which is very old, is mine!'], answer: 2, tip: 'Con comas, cosa: which. Nunca that.', tags: BOSS_REL },
  { id: 'b2-09-cr2', topic: ND, kind: 'fix', prompt: "He didn't come which was strange.", options: ["He didn't come, which was strange.", "He didn't come, what was strange.", "He didn't come, that was strange."], answer: 0, tip: 'which de toda la oración: le falta la coma.', tags: BOSS_REL },
  { id: 'b2-09-cr3', topic: ND, prompt: 'Mina Takeda, ___ installation is in the next room, is from Osaka.', options: ['who', 'whose', 'which'], answer: 1, tip: 'Posesión (su instalación): whose.', tags: BOSS_REL },
  { id: 'b2-09-cr4', topic: ND, prompt: 'The museum, ___ opened in 2010, is free on Sundays.', options: ['which', 'that', 'who'], answer: 0, tip: 'Cosa + comas: which.', tags: BOSS_REL },
  { id: 'b2-09-cr5', topic: ND, prompt: 'The page was missing, ___ made Ingrid very nervous.', options: ['what', 'which', 'that'], answer: 1, tip: 'which = y eso (toda la idea anterior).', tags: BOSS_REL },
  { id: 'b2-09-cr6', topic: ND, kind: 'order', prompt: 'Ingrid, que trabaja en la librería, ama los cuentos.', options: ['Ingrid,', 'who', 'works', 'in', 'the', 'bookshop,', 'loves', 'stories.'], answer: 0, tip: 'Persona + coma + who + información extra + coma.', tags: BOSS_REL },
  // The Curator, fase 2 (graduables, orden de adjetivos, quite / rather, locuciones adverbiales; escucha)
  { id: 'b2-09-cg1', topic: GR, kind: 'fix', prompt: 'The exhibition is absolutely interesting.', options: ['The exhibition is absolutely fascinating.', 'The exhibition is very fascinating.', 'The exhibition is absolutely interested.'], answer: 0, tip: 'interesting es graduable. Para absolutely, un extremo: fascinating.', tags: BOSS_ART },
  { id: 'b2-09-cg2', topic: AO, kind: 'fix', prompt: 'You will stay in a red big ancient frame.', options: ['You will stay in a big red ancient frame.', 'You will stay in a big ancient red frame.', 'You will stay in an ancient big red frame.'], answer: 1, tip: 'Tamaño – edad – color: big ancient red.', tags: BOSS_ART },
  { id: 'b2-09-cg3', topic: AD, kind: 'fix', prompt: 'You will wait in a silence.', options: ['You will wait in silence.', 'You will wait on silence.', 'You will wait with a silence.'], answer: 0, tip: 'in silence, sin artículo.', tags: BOSS_ART },
  { id: 'b2-09-cg4', topic: GR, prompt: "The book is ___ good. It's not my favourite, but I finished it.", options: ['absolutely', 'fairly', 'utterly'], answer: 1, tip: 'fairly good = aceptable, más o menos bien.', tags: BOSS_ART },
  { id: 'b2-09-cg5', topic: AD, prompt: 'After ten years, ___, Nell sang again.', options: ['at long last', 'without a word', 'by no means'], answer: 0, tip: 'at long last = por fin (después de mucho tiempo).', tags: BOSS_ART },
  {
    id: 'b2-09-cg6',
    topic: AD,
    kind: 'listen',
    audio: 'All of a sudden, the lights went out. We waited in silence. At long last, the music started again.',
    voice: 'male',
    prompt: 'What happened first?',
    options: ['The music started again.', 'Everybody sang.', 'The lights went out.'],
    answer: 2,
    tip: '"All of a sudden, the lights went out."',
    tags: BOSS_ART,
  },
]

