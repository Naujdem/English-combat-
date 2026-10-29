/**
 * Los 25 verbos irregulares de A1, en el orden de las páginas del libro de verbos de Joe (1996).
 * En las explicaciones, el pasado irregular se muestra en morado y el regular (-ed) en verde.
 */
export type IrregularVerb = { base: string; past: string; es: string; wrong: string }
export type VerbPage = { title: string; verbs: IrregularVerb[] }

export const VERB_PAGES: VerbPage[] = [
  {
    title: 'Mi día',
    verbs: [
      { base: 'go', past: 'went', es: 'ir', wrong: 'goed' },
      { base: 'get', past: 'got', es: 'conseguir, llegar', wrong: 'getted' },
      { base: 'have', past: 'had', es: 'tener', wrong: 'haved' },
      { base: 'eat', past: 'ate', es: 'comer', wrong: 'eated' },
      { base: 'drink', past: 'drank', es: 'beber', wrong: 'drinked' },
    ],
  },
  {
    title: 'En la obra',
    verbs: [
      { base: 'make', past: 'made', es: 'hacer, fabricar', wrong: 'maked' },
      { base: 'build', past: 'built', es: 'construir', wrong: 'builded' },
      { base: 'put', past: 'put', es: 'poner', wrong: 'putted' },
      { base: 'bring', past: 'brought', es: 'traer', wrong: 'bringed' },
      { base: 'buy', past: 'bought', es: 'comprar', wrong: 'buyed' },
    ],
  },
  {
    title: 'Moverse y descansar',
    verbs: [
      { base: 'come', past: 'came', es: 'venir', wrong: 'comed' },
      { base: 'run', past: 'ran', es: 'correr', wrong: 'runned' },
      { base: 'sit', past: 'sat', es: 'sentarse', wrong: 'sitted' },
      { base: 'sleep', past: 'slept', es: 'dormir', wrong: 'sleeped' },
      { base: 'take', past: 'took', es: 'tomar, llevar', wrong: 'taked' },
    ],
  },
  {
    title: 'Hablar y pensar',
    verbs: [
      { base: 'say', past: 'said', es: 'decir', wrong: 'sayed' },
      { base: 'tell', past: 'told', es: 'contar, decirle a alguien', wrong: 'telled' },
      { base: 'know', past: 'knew', es: 'saber, conocer', wrong: 'knowed' },
      { base: 'think', past: 'thought', es: 'pensar', wrong: 'thinked' },
      { base: 'write', past: 'wrote', es: 'escribir', wrong: 'writed' },
    ],
  },
  {
    title: 'Ver y encontrar',
    verbs: [
      { base: 'see', past: 'saw', es: 'ver', wrong: 'seed' },
      { base: 'find', past: 'found', es: 'encontrar', wrong: 'finded' },
      { base: 'give', past: 'gave', es: 'dar', wrong: 'gived' },
      { base: 'read', past: 'read', es: 'leer (el pasado se escribe igual, pero suena "red")', wrong: 'readed' },
      { base: 'do', past: 'did', es: 'hacer', wrong: 'doed' },
    ],
  },
]

export const IRREGULAR_VERBS: IrregularVerb[] = VERB_PAGES.flatMap((p) => p.verbs)

/** Otros pasados irregulares que aparecen en el juego (para colorearlos en morado) */
export const MORE_IRREGULAR_PASTS = ['met', 'became', 'fell', 'left', 'took', 'won', 'lost', 'fought', 'felt', 'heard', 'swam', 'sang', 'rode', 'drove', 'flew', 'spoke', 'wore', 'woke', 'began', 'grew', 'stood', 'understood', 'forgot', 'paid', 'sold', 'sent', 'spent', 'taught', 'caught', 'kept']
