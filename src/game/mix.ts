/**
 * Orden estable pero variado para las opciones de una elección: depende del texto de las opciones,
 * así no cambia al volver a dibujar, y la respuesta correcta no queda siempre en el mismo lugar.
 */
export function mixOrder(seed: string, n: number): number[] {
  let h = 2166136261
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  const idx = Array.from({ length: n }, (_, i) => i)
  for (let i = n - 1; i > 0; i--) {
    h = Math.imul(h ^ (h >>> 13), 1274126177)
    const j = (h >>> 0) % (i + 1)
    ;[idx[i], idx[j]] = [idx[j], idx[i]]
  }
  return idx
}

/** Las opciones en orden mezclado, con su índice original (para comparar con la respuesta) */
export function mixed<T>(options: T[], seed?: string): [T, number][] {
  const key = seed ?? options.map((o) => (typeof o === 'string' ? o : JSON.stringify(o))).join('|')
  return mixOrder(key, options.length).map((k) => [options[k], k])
}
