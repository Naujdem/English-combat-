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
const T_GR = ['b2-09-strong']
const T_AO = ['b2-09-order']
const T_ND = ['b2-09-relative']

const ids = (p: string) => [1, 2, 3, 4, 5, 6].map((n) => `b2-09-${p}${n}`)
export const B2_09_STRONG_IDS = ids('gr')
export const B2_09_ORDER_IDS = ids('ao')
export const B2_09_RELATIVE_IDS = ids('nd')

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
]
