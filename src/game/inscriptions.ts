/**
 * Inscriptions (B1): tipos y reglas del minijuego de los templos (misiones 9, 11 y 13).
 * El componente está en components/Inscriptions.tsx; aquí solo hay datos y lógica, para que el validador
 * (scripts/validate-questions.ts) use las mismas comprobaciones que el juego.
 */

/** Función de cada glifo en la frase. Cada una tiene forma y color propios (InsGlyph) */
export type InsRole = 'subject' | 'verb' | 'aux' | 'participle' | 'object' | 'complement' | 'connector' | 'time' | 'agent'
export const INS_ROLES: InsRole[] = ['subject', 'verb', 'aux', 'participle', 'object', 'complement', 'connector', 'time', 'agent']

/** Ficha que no va en la frase. Con role, se dibuja con esa forma (lo recomendable: que parezca posible) */
export type InsDistractor = string | { text: string; role: InsRole }

/** Una tablilla: la frase de una inscripción */
export type Plate = {
  /** La frase en el orden correcto: una palabra o grupo por ficha. La primera letra de la frase se pone en mayúscula sola */
  words: string[]
  /** Mismo largo que words */
  roles: InsRole[]
  /** Traducción de la frase */
  es: string
  /** La regla que se revela al traducir (texto del templo, en español, con la estructura en inglés) */
  rule: { title: string; text: string; examples?: string[] }
  /** Pista al 2.º error */
  hint?: string
  /** Fichas extra que no van (máx. 2) */
  distractors?: InsDistractor[]
  /** Texto del efecto al completar: "La puerta se abre un poco más" */
  effect?: string
  /** Otros órdenes válidos (con las mismas fichas que words): p. ej. el tiempo al principio en vez de al final */
  alt?: string[][]
}

export type InsScene = 'door' | 'bridge' | 'wall'

/** Una sala completa (lo que se declara en una tarea de data/tasks.ts como `inscriptions`) */
export type InscriptionRoom = {
  title: string
  intro: { en: string; es: string }
  scene: InsScene
  plates: Plate[]
  /** Texto al completar la sala (por defecto: "The inscriptions are awake.") */
  finish?: { en: string; es: string; banner: string }
}

/** Una ficha en juego: las de la frase (word = su posición) y las que no van (word = -1) */
export type InsTile = { text: string; role: InsRole; word: number }

export function plateTiles(p: Plate): InsTile[] {
  const own = p.words.map((text, i) => ({ text, role: p.roles[i] ?? 'complement', word: i }))
  const extra = (p.distractors ?? []).map((d) => (typeof d === 'string' ? { text: d, role: 'complement' as InsRole, word: -1 } : { ...d, word: -1 }))
  return [...own, ...extra]
}

const norm = (t: string) => t.trim().replace(/\s+/g, ' ').toLowerCase()

/** Frases válidas de la tablilla (la principal y las alternativas), en minúsculas */
export function targets(p: Plate): string[][] {
  return [p.words, ...(p.alt ?? [])].map((w) => w.map(norm))
}

/**
 * Revisa lo que armó el jugador. Devuelve si está bien y, hueco por hueco, si esa ficha está en su lugar
 * (comparando con la frase válida que más se parece).
 */
export function checkPlate(p: Plate, placed: string[]): { ok: boolean; right: boolean[] } {
  const got = placed.map(norm)
  let best: boolean[] = got.map(() => false)
  for (const t of targets(p)) {
    const right = got.map((w, i) => w === t[i])
    if (right.every(Boolean) && got.length === t.length) return { ok: true, right }
    if (right.filter(Boolean).length > best.filter(Boolean).length) best = right
  }
  return { ok: false, right: best }
}

/** La frase para leer o mostrar: con la primera letra en mayúscula y punto final */
export function sentenceOf(words: string[]): string {
  const s = words.join(' ').trim()
  if (!s) return ''
  const cap = s[0].toUpperCase() + s.slice(1)
  return /[.!?]$/.test(cap) ? cap : `${cap}.`
}

/** La frase correcta con las palabras tapadas salvo la primera (se muestra al reiniciar una tablilla) */
export function maskedSentence(p: Plate): string {
  return sentenceOf(p.words.map((w, i) => (i === 0 ? w : w.split(' ').map((x) => '▒'.repeat(Math.max(2, Math.min(x.length, 6)))).join(' '))))
}

/** Problemas de datos de una tablilla (los usa el validador). Lista vacía = está bien */
export function plateProblems(p: Plate): string[] {
  const out: string[] = []
  if (!p.words?.length) out.push('no tiene palabras')
  if (p.words.length !== p.roles.length) out.push(`words tiene ${p.words.length} fichas y roles tiene ${p.roles.length}`)
  for (const r of p.roles) if (!INS_ROLES.includes(r)) out.push(`role desconocido: ${r}`)
  if (!p.rule?.text?.trim()) out.push('la regla (rule.text) está vacía')
  if (!p.rule?.title?.trim()) out.push('la regla no tiene título')
  if (!p.es?.trim()) out.push('sin traducción (es)')
  if ((p.distractors?.length ?? 0) > 2) out.push(`tiene ${p.distractors!.length} fichas de más (máximo 2)`)
  // Fichas con el mismo texto: si una de ellas sobra (distractor) o están en lugares distintos, la solución es ambigua
  const tiles = plateTiles(p).map((t) => norm(t.text))
  const dup = tiles.filter((t, i) => tiles.indexOf(t) !== i)
  if (dup.length && !p.alt?.length) out.push(`fichas repetidas que hacen ambigua la solución: ${[...new Set(dup)].join(', ')}`)
  // Las alternativas deben usar exactamente las mismas fichas que words
  const key = (w: string[]) => w.map(norm).sort().join('|')
  for (const a of p.alt ?? []) if (key(a) !== key(p.words)) out.push(`una alternativa no usa las mismas fichas: ${a.join(' / ')}`)
  return out
}

/** Orden al azar de n fichas (nunca el orden de la frase) */
export function shuffleTiles(n: number): number[] {
  const a = Array.from({ length: n }, (_, i) => i)
  if (n < 2) return a
  do {
    for (let i = n - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[a[i], a[j]] = [a[j], a[i]]
    }
  } while (a.every((v, i) => v === i))
  return a
}
