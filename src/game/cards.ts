/**
 * Fichas tipo Anki: palabras que el jugador guarda al tocar una palabra en una lectura.
 * Repaso espaciado sencillo (basado en SM-2): Otra vez / Difícil / Bien / Fácil.
 */
export type Card = {
  id: string
  front: string
  back: string
  /** Frase donde apareció la palabra */
  example?: string
  /** Próximo repaso (ms) */
  due: number
  /** Intervalo actual en días (0 = nueva o en aprendizaje) */
  interval: number
  ease: number
  reps: number
  /** Mazo: el lugar donde se ganó (palabras clave del escenario o frases corregidas) */
  deck?: string
  /** word: palabra o expresión · phrase: frase corregida en combate */
  type?: 'word' | 'phrase'
}

export type Grade = 'again' | 'hard' | 'good' | 'easy'

const MIN = 60 * 1000
const DAY = 24 * 60 * MIN

export function newCard(front: string, back: string, example?: string, extra: { id?: string; deck?: string; type?: 'word' | 'phrase'; due?: number } = {}): Card {
  return { id: extra.id ?? front.toLowerCase(), front, back, example, due: extra.due ?? Date.now(), interval: 0, ease: 2.5, reps: 0, deck: extra.deck, type: extra.type ?? 'word' }
}

/** Cuánto falta para el siguiente repaso con cada botón: [ms, intervalo en días] */
function next(card: Card, grade: Grade): [number, number] {
  const { interval, ease, reps } = card
  if (grade === 'again') return [MIN, 0]
  if (grade === 'hard') return reps === 0 ? [10 * MIN, 0] : [Math.max(1, Math.round(interval * 1.2)) * DAY, Math.max(1, Math.round(interval * 1.2))]
  if (grade === 'good') {
    const d = reps === 0 ? 1 : reps === 1 ? 3 : Math.round(Math.max(1, interval) * ease)
    return [d * DAY, d]
  }
  const d = reps === 0 ? 4 : Math.round(Math.max(1, interval) * ease * 1.3)
  return [d * DAY, d]
}

export function review(card: Card, grade: Grade, now = Date.now()): Card {
  const [wait, interval] = next(card, grade)
  const ease =
    grade === 'again' ? Math.max(1.3, card.ease - 0.2) : grade === 'hard' ? Math.max(1.3, card.ease - 0.15) : grade === 'easy' ? card.ease + 0.15 : card.ease
  return { ...card, due: now + wait, interval, ease, reps: grade === 'again' ? 0 : card.reps + 1 }
}

/** Texto corto del tiempo hasta el próximo repaso: "1 min", "10 min", "3 d" */
export function waitLabel(card: Card, grade: Grade) {
  const [ms] = next(card, grade)
  if (ms < 60 * MIN) return `${Math.round(ms / MIN)} min`
  if (ms < DAY) return `${Math.round(ms / (60 * MIN))} h`
  const d = Math.round(ms / DAY)
  return d >= 30 ? `${Math.round(d / 30)} mes` : `${d} d`
}

export function dueCards(cards: Card[], now = Date.now()) {
  return cards.filter((c) => c.due <= now).sort((a, b) => a.due - b.due)
}

/** CSV "frente,reverso" para importar en SimulaPro o Anki */
export function toCsv(cards: Card[]) {
  const q = (t: string) => `"${t.replaceAll('"', '""')}"`
  return cards.map((c) => `${q(c.front)},${q(c.back + (c.example ? ` — ${c.example}` : ''))}`).join('\n')
}
