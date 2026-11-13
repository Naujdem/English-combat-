import type { Gender } from './types'

/**
 * Textos que cambian según el género elegido en el juego:
 *   {h:masculino|femenino}  → el jugador           (ej.: "Although {h:he|she} was my friend")
 *   {i:masculino|femenino}  → la persona especial  (ej.: "tu {i:amigo|amiga}")
 * También se rellenan {name} y {iname}.
 */
export type People = { hero: { name: string; gender: Gender }; interest: { name: string; gender: Gender } }

const TOKEN = /\{([hi]):([^|{}]*)\|([^{}]*)\}/g

export function fillGender(text: string, hero: Gender, interest: Gender) {
  if (!text.includes('{')) return text
  return text.replace(TOKEN, (_all, who: string, male: string, female: string) => ((who === 'h' ? hero : interest) === 'female' ? female : male))
}

export function fillText(text: string, p: People) {
  if (!text.includes('{')) return text
  return fillGender(text, p.hero.gender, p.interest.gender).replaceAll('{name}', p.hero.name).replaceAll('{iname}', p.interest.name)
}

const cache = new WeakMap<object, Map<string, unknown>>()

/** Rellena todos los textos de un dato (guion, lección, charla…). Devuelve siempre el mismo objeto para el mismo dato y las mismas elecciones */
export function fillDeep<T>(value: T, p: People): T {
  if (typeof value === 'string') return fillText(value, p) as T
  if (!value || typeof value !== 'object') return value
  const plain = Array.isArray(value) || Object.getPrototypeOf(value) === Object.prototype
  if (!plain || '$$typeof' in (value as object)) return value
  const key = `${p.hero.name}|${p.hero.gender}|${p.interest.name}|${p.interest.gender}`
  let byKey = cache.get(value as object)
  if (!byKey) cache.set(value as object, (byKey = new Map()))
  if (byKey.has(key)) return byKey.get(key) as T
  const out = Array.isArray(value)
    ? value.map((v) => fillDeep(v, p))
    : Object.fromEntries(Object.entries(value as Record<string, unknown>).map(([k, v]) => [k, fillDeep(v, p)]))
  byKey.set(key, out)
  return out as T
}
