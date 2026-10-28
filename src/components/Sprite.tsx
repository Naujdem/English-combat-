import type { Gender } from '../game/types'

export type SpriteLook = {
  shirt: string
  hair: string
  skin: string
  gender?: Gender
  accessory?: 'cap' | 'mortarboard' | 'glasses'
  cape?: string
  book?: boolean
}

/**
 * Personaje "chibi" en una caja de 32x32 unidades.
 * Se usa pequeño en el mapa y grande en el combate.
 */
export function SpriteBody({ look, mood = 'normal' }: { look: SpriteLook; mood?: 'normal' | 'hurt' | 'mute' }) {
  const long = look.gender === 'female'
  return (
    <g>
      <ellipse cx="16" cy="30" rx="8" ry="2.2" fill="rgba(0,0,0,0.18)" />
      {look.cape && <path d="M9 15 L5.5 28 L26.5 28 L23 15 Z" fill={look.cape} />}
      {long && <path d="M8 10 Q7 22 10.5 23 L21.5 23 Q25 22 24 10 Z" fill={look.hair} />}
      <rect x="12.4" y="25" width="2.6" height="5" fill="#2d2d3a" />
      <rect x="17" y="25" width="2.6" height="5" fill="#2d2d3a" />
      <rect x="10" y="15" width="12" height="11" rx="3" fill={look.shirt} />
      <circle cx="16" cy="10.5" r="7.2" fill={look.skin} />
      <path d="M8.8 10 Q9.6 2.6 16 3.2 Q22.4 2.6 23.2 10 Q19.6 6.6 16 7.4 Q12.4 6.6 8.8 10 Z" fill={look.hair} />
      {mood === 'hurt' ? (
        <>
          <path d="M12 10.5 l2 1.6 M14 10.5 l-2 1.6" stroke="#2d2d3a" strokeWidth="0.9" />
          <path d="M18 10.5 l2 1.6 M20 10.5 l-2 1.6" stroke="#2d2d3a" strokeWidth="0.9" />
        </>
      ) : (
        <>
          <circle cx="13.3" cy="11.3" r="1.05" fill="#2d2d3a" />
          <circle cx="18.7" cy="11.3" r="1.05" fill="#2d2d3a" />
        </>
      )}
      {mood === 'mute' && <path d="M14 14.6 l1 -0.7 l1 0.7 l1 -0.7 l1 0.7" fill="none" stroke="#2d2d3a" strokeWidth="0.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.75" />}
      {look.accessory === 'cap' && (
        <>
          <path d="M8.6 8.6 Q9.4 2.4 16 2.6 Q22.6 2.4 23.4 8.6 Z" fill={look.shirt} stroke="rgba(0,0,0,0.25)" strokeWidth="0.4" />
          <rect x="21" y="7.2" width="5.5" height="2" rx="0.8" fill={look.shirt} />
        </>
      )}
      {look.accessory === 'mortarboard' && (
        <>
          <polygon points="6.5,5.5 16,1.2 25.5,5.5 16,8.8" fill="#2d2d3a" />
          <rect x="12.6" y="5.6" width="6.8" height="2.6" fill="#2d2d3a" />
          <path d="M24.6 5.6 L25.4 10.6" stroke="#e0a526" strokeWidth="0.8" />
          <circle cx="13.3" cy="11.3" r="2.3" fill="none" stroke="#2d2d3a" strokeWidth="0.7" />
          <circle cx="18.7" cy="11.3" r="2.3" fill="none" stroke="#2d2d3a" strokeWidth="0.7" />
        </>
      )}
      {look.accessory === 'glasses' && (
        <>
          <circle cx="13.3" cy="11.3" r="2.2" fill="none" stroke="#2d2d3a" strokeWidth="0.7" />
          <circle cx="18.7" cy="11.3" r="2.2" fill="none" stroke="#2d2d3a" strokeWidth="0.7" />
        </>
      )}
      {look.book && (
        <>
          <rect x="21" y="17.5" width="6.5" height="5.5" rx="0.6" fill="#e0a526" />
          <line x1="24.25" y1="17.5" x2="24.25" y2="23" stroke="#8a6210" strokeWidth="0.5" />
        </>
      )}
    </g>
  )
}

/** Sprite suelto como SVG propio, útil en menús y en la creación de personaje */
export function SpriteIcon({ look, size = 64, mood }: { look: SpriteLook; size?: number; mood?: 'normal' | 'hurt' | 'mute' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <SpriteBody look={look} mood={mood} />
    </svg>
  )
}
