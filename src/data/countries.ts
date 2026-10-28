/** Países para la presentación con Leo, con su nombre y nacionalidad en inglés */
export const COUNTRIES: { en: string; es: string; nationality: string }[] = [
  { en: 'Colombia', es: 'Colombia', nationality: 'Colombian' },
  { en: 'Mexico', es: 'México', nationality: 'Mexican' },
  { en: 'Peru', es: 'Perú', nationality: 'Peruvian' },
  { en: 'Ecuador', es: 'Ecuador', nationality: 'Ecuadorian' },
  { en: 'Venezuela', es: 'Venezuela', nationality: 'Venezuelan' },
  { en: 'Chile', es: 'Chile', nationality: 'Chilean' },
  { en: 'Argentina', es: 'Argentina', nationality: 'Argentinian' },
  { en: 'Spain', es: 'España', nationality: 'Spanish' },
  { en: 'Brazil', es: 'Brasil', nationality: 'Brazilian' },
  { en: 'the United States', es: 'Estados Unidos', nationality: 'American' },
]

export function countryOf(en?: string) {
  return COUNTRIES.find((c) => c.en === en)
}
