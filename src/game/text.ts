/**
 * Normaliza una respuesta escrita para compararla de forma flexible:
 * ignora mayúsculas, signos de puntuación y espacios de más, y trata igual
 * las contracciones y su forma larga ("I'm" = "I am", "isn't" = "is not").
 */
export function normalizeAnswer(text: string): string {
  return text
    .toLowerCase()
    .replace(/[’`´]/g, "'")
    // Negativas escritas sin apóstrofo (didnt, dont, isnt...), muy comunes en el celular
    .replace(/\b(is|are|was|were|do|does|did|have|has|could)nt\b/g, "$1n't")
    .replace(/\bim\b/g, "i'm")
    .replace(/\bi'm\b/g, 'i am')
    .replace(/\b(you|we|they)'re\b/g, '$1 are')
    // he's got = he has got (no "he is got")
    .replace(/\b(he|she|it|who|what)'s got\b/g, '$1 has got')
    .replace(/\b(he|she|it|that|what|where|who|how|there)'s\b/g, '$1 is')
    .replace(/\b(i|you|we|they)'ve\b/g, '$1 have')
    .replace(/\b(i|you|he|she|it|we|they)'ll\b/g, '$1 will')
    // 'd puede ser had o would: solo se expande cuando no hay duda (I'd like = I would like)
    .replace(/\b(i|you|he|she|we|they)'d (like|love|prefer)\b/g, '$1 would $2')
    .replace(/\bwon't\b/g, 'will not')
    .replace(/\bcan't\b/g, 'can not')
    .replace(/\bcannot\b/g, 'can not')
    .replace(/\b(is|are|do|does|did|was|were|have|has|could|would|should)n't\b/g, '$1 not')
    .replace(/[.,!?¿¡;:"]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function sameAnswer(typed: string, expected: string): boolean {
  return normalizeAnswer(typed) === normalizeAnswer(expected)
}
