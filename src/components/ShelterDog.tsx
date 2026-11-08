/**
 * B1-06 · First Job, bloque B: los 5 perros del refugio Lumen Paws (data/b1Kennels.ts y components/WhichDog.tsx).
 * Misma silueta que AnimalSprite 'dog' (components/Animals.tsx) con el pelaje de cada perro y un detalle encima
 * (collar, manchas, pelota, correa, "Zzz"). Se dibuja en una caja de 32×32, como los demás sprites.
 */
export type ShelterDogId = 'zirius' | 'laica' | 'kitay' | 'fresas' | 'lupe'

const FUR: Record<ShelterDogId, { body: string; dark: string }> = {
  zirius: { body: '#2b2b33', dark: '#141418' },
  laica: { body: '#d9a441', dark: '#a8781f' },
  kitay: { body: '#f2eee6', dark: '#7a4a24' },
  fresas: { body: '#a8502e', dark: '#6e2e18' },
  lupe: { body: '#9a9aa2', dark: '#6a6a72' },
}

const shadow = <ellipse cx="16" cy="30" rx="10" ry="2.2" fill="rgba(0,0,0,0.18)" />

/** El perro de pie (igual que AnimalSprite 'dog'); collar opcional */
function Standing({ body, dark, legs, collar, mouthOpen }: { body: string; dark: string; legs: string; collar?: string; mouthOpen?: boolean }) {
  return (
    <g>
      {[9, 13, 19, 22].map((x) => <rect key={x} x={x} y="21" width="2.4" height="8" fill={legs} />)}
      <rect x="7" y="14" width="18" height="9" rx="4" fill={body} />
      <circle cx="25" cy="12" r="5" fill={body} />
      <path d="M22 8 q-2 6 1 7" fill={dark} />
      <ellipse cx="29.5" cy="13.5" rx="1.4" ry="1.1" fill="#2d2d3a" />
      {mouthOpen && <path d="M27.5 15.2 q1.6 1.8 3 0.2" fill="#c0392b" stroke="#2d2d3a" strokeWidth="0.4" />}
      <path d="M7 16 q-3 -4 -2 -6" fill="none" stroke={body} strokeWidth="2" strokeLinecap="round" />
      {collar && <rect x="20.5" y="15" width="5.5" height="1.8" rx="0.8" fill={collar} />}
      <circle cx="26" cy="11" r="1.1" fill={body === '#2b2b33' ? '#f4f4f0' : '#2d2d3a'} />
    </g>
  )
}

export function ShelterDog({ who }: { who: ShelterDogId }) {
  const { body, dark } = FUR[who]
  switch (who) {
    case 'zirius':
      // Negro, collar azul, una pelota al lado
      return (
        <g>
          {shadow}
          <Standing body={body} dark={dark} legs={dark} collar="#2f6fb0" />
          <circle cx="4" cy="27" r="2.6" fill="#e6c229" stroke="#b08f12" strokeWidth="0.5" />
          <path d="M2 26 q2 1.5 4 0" fill="none" stroke="#f4f4f0" strokeWidth="0.5" />
        </g>
      )
    case 'laica':
      // Dorada, acostada, con "Zzz"
      return (
        <g>
          {shadow}
          <rect x="6" y="21" width="20" height="8" rx="4" fill={body} />
          <circle cx="25" cy="22" r="4.5" fill={body} />
          <path d="M22 19 q-2 5 1 6" fill={dark} />
          <ellipse cx="29" cy="23.5" rx="1.3" ry="1" fill="#2d2d3a" />
          <path d="M24.5 21.5 q1 0.8 2 0" fill="none" stroke="#2d2d3a" strokeWidth="0.6" strokeLinecap="round" />
          <path d="M6 26 q-3 1 -4 -1" fill="none" stroke={body} strokeWidth="2" strokeLinecap="round" />
          <text x="20" y="13" fontSize="5" fontWeight="bold" fill="#5b7bb5">Z</text>
          <text x="24" y="9" fontSize="4" fontWeight="bold" fill="#5b7bb5">z</text>
          <text x="27" y="6" fontSize="3" fontWeight="bold" fill="#5b7bb5">z</text>
        </g>
      )
    case 'kitay':
      // Blanco con manchas café, collar rojo
      return (
        <g>
          {shadow}
          <Standing body={body} dark={dark} legs="#d8d2c6" collar="#c0392b" />
          <ellipse cx="11" cy="17" rx="3" ry="2.2" fill={dark} />
          <ellipse cx="18" cy="20" rx="2.4" ry="1.7" fill={dark} />
          <ellipse cx="14.5" cy="15.5" rx="1.4" ry="1" fill={dark} />
        </g>
      )
    case 'fresas':
      // Café rojizo, una correa colgada al lado
      return (
        <g>
          {shadow}
          <Standing body={body} dark={dark} legs={dark} />
          <rect x="1.5" y="6" width="2.4" height="2.4" rx="0.5" fill="#55606e" />
          <path d="M2.7 8.4 q-1.5 8 1 13 q2 4 -0.5 7" fill="none" stroke="#2f7f7a" strokeWidth="1.3" strokeLinecap="round" />
          <circle cx="2.3" cy="28.6" r="1" fill="none" stroke="#55606e" strokeWidth="0.6" />
        </g>
      )
    case 'lupe':
      // Pequeña y gris, collar naranja, boca abierta (ladrando)
      return (
        <g>
          {shadow}
          <g transform="translate(16 30) scale(0.72) translate(-16 -30)">
            <Standing body={body} dark={dark} legs={dark} collar="#e0873a" mouthOpen />
          </g>
          <path d="M25.5 16 l2.5 -1.5 M26 17.5 l3 0 M25.5 19 l2.5 1.5" stroke="#c0392b" strokeWidth="0.6" strokeLinecap="round" />
        </g>
      )
  }
}
