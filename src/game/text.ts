/**
 * Normaliza una respuesta escrita para compararla de forma flexible:
 * ignora mayúsculas, signos de puntuación y espacios de más, y trata igual
 * las contracciones y su forma larga ("I'm" = "I am", "isn't" = "is not").
 */
export function normalizeAnswer(text: string): string {
  return text
    .toLowerCase()
    .replace(/[’`´]/g, "'")
    .replace(/\bi'm\b/g, 'i am')
    .replace(/\b(you|we|they)'re\b/g, '$1 are')
    .replace(/\b(he|she|it|that|what|where|who|how|there)'s\b/g, '$1 is')
    .replace(/\bcan't\b/g, 'can not')
    .replace(/\bcannot\b/g, 'can not')
    .replace(/\b(is|are|do|does|was|were|have|has)n't\b/g, '$1 not')
    .replace(/[.,!?¿¡;:"]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function sameAnswer(typed: string, expected: string): boolean {
  return normalizeAnswer(typed) === normalizeAnswer(expected)
}
