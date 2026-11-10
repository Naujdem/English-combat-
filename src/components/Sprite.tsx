import type { Gender } from '../game/types'

export type SpriteLook = {
  shirt: string
  hair: string
  skin: string
  gender?: Gender
  accessory?: 'cap' | 'mortarboard' | 'glasses'
  cape?: string
  book?: boolean
  /** B1-04: llavero de la residencia (una casita con una llave) que cuelga del cinturón */
  charm?: 'house-key' | 'scarf' | 'wristband' | 'clock-keychain' | 'apron'
  /** B1-12: el llavero con forma de reloj (objeto de historia), colgando del cinturón a la izquierda; independiente del atuendo y del charm */
  keychain?: boolean
}

/**
 * Personaje "chibi" en una caja de 32x32 unidades.
 * Se usa pequeño en el mapa y grande en el combate.
 */
export function SpriteBody({ look, mood = 'normal', blur = false }: { look: SpriteLook; mood?: 'normal' | 'hurt' | 'mute'; /** Recuerdos de B1: cara lisa, sin ojos ni boca (ver BlurFace.tsx) */ blur?: boolean }) {
  const long = look.gender === 'female'
  if (blur) return <BlurredBody look={look} long={long} />
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
      {look.charm === 'house-key' && (
        <g aria-hidden="true">
          <path d="M20.2 24.4 v1.4" stroke="#8a6210" strokeWidth="0.45" />
          <path d="M18.7 27.1 L20.2 25.7 L21.7 27.1 Z" fill="#c0392b" />
          <rect x="19" y="27" width="2.4" height="1.9" fill="#d4a63a" />
          <rect x="19.9" y="27.8" width="0.6" height="1.1" fill="#8a6210" />
          <circle cx="22.3" cy="27.6" r="0.55" fill="none" stroke="#b0b6bf" strokeWidth="0.35" />
          <path d="M22.3 28.15 v1.3 h0.5 M22.3 28.9 h0.4" stroke="#b0b6bf" strokeWidth="0.35" fill="none" />
        </g>
      )}
      {look.charm === 'scarf' && (
        // B1-08: la bufanda del equipo de Lumen Bay: azul con una franja dorada, al cuello, con una punta colgando
        <g aria-hidden="true">
          <rect x="10.4" y="15.4" width="11.2" height="2.6" rx="1.3" fill="#1f5fa8" />
          <rect x="10.8" y="16.3" width="10.4" height="0.7" fill="#e0b84a" />
          <rect x="17.4" y="17.2" width="2.4" height="5.4" rx="0.5" fill="#1f5fa8" />
          <rect x="17.4" y="20" width="2.4" height="0.7" fill="#e0b84a" />
          <path d="M17.8 22.6 v0.9 M18.6 22.6 v0.9 M19.4 22.6 v0.9" stroke="#e0b84a" strokeWidth="0.35" />
        </g>
      )}
      {look.charm === 'apron' && (
        // B1-12: el delantal de la abuela Jhoana: crema sobre el torso, con un bolsillo y los cordones (la camiseta no cambia)
        <g aria-hidden="true">
          <path d="M12.6 15.4 L11.2 19.6 M19.4 15.4 L20.8 19.6" stroke="#c9a56a" strokeWidth="0.45" />
          <path d="M13 16.2 h6 v3.2 h1.2 v6.2 h-8.4 v-6.2 h1.2 Z" fill="#efe2c4" stroke="#c9a56a" strokeWidth="0.35" />
          <path d="M10.6 19.6 h1.4 M20 19.6 h1.4" stroke="#c9a56a" strokeWidth="0.45" strokeLinecap="round" />
          <rect x="14.2" y="21.4" width="3.6" height="2.4" rx="0.4" fill="none" stroke="#c9a56a" strokeWidth="0.35" />
        </g>
      )}
      {look.charm === 'wristband' && (
        // B1-10: la pulsera del festival: rosada, en la muñeca derecha, con una pequeña estrella dorada
        <g aria-hidden="true">
          <rect x="20.6" y="21.6" width="2.6" height="1.5" rx="0.6" fill="#d4488a" />
          <path d="M21.9 21.75 l0.25 0.5 l0.55 0.08 l-0.4 0.38 l0.1 0.55 l-0.5 -0.26 l-0.5 0.26 l0.1 -0.55 l-0.4 -0.38 l0.55 -0.08 Z" fill="#e0b84a" />
        </g>
      )}
      {look.charm === 'clock-keychain' && (
        // B1-11: el amigo de la noche del incendio: una mochila pequeña (correas y el bolso asomando a un lado) con un llavero
        // circular dorado con dos manecillas de reloj, colgando
        <g aria-hidden="true">
          <path d="M11.6 15.6 L12.6 23 M20.4 15.6 L19.4 23" stroke="#3a3a44" strokeWidth="0.9" />
          <rect x="21.2" y="16.6" width="3.4" height="6.4" rx="1" fill="#3a3a44" />
          <path d="M22.9 23 v0.9" stroke="#8a6210" strokeWidth="0.35" />
          <circle cx="22.9" cy="25.1" r="1.2" fill="#e0b84a" stroke="#8a6210" strokeWidth="0.3" />
          <path d="M22.9 25.1 v-0.8 M22.9 25.1 h0.6" stroke="#2a1c14" strokeWidth="0.3" strokeLinecap="round" />
        </g>
      )}
      {look.keychain && (
        // B1-12: el llavero con forma de reloj (el mismo dibujo del charm 'clock-keychain'): dorado, con dos manecillas, al lado izquierdo del cinturón
        <g aria-hidden="true">
          <path d="M11.8 24.4 v1.2" stroke="#8a6210" strokeWidth="0.35" />
          <circle cx="11.8" cy="26.8" r="1.2" fill="#e0b84a" stroke="#8a6210" strokeWidth="0.3" />
          <path d="M11.8 26.8 v-0.8 M11.8 26.8 h0.6" stroke="#2a1c14" strokeWidth="0.3" strokeLinecap="round" />
        </g>
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

/**
 * Cuerpo para los NPC de los recuerdos de B1: el mismo de SpriteBody, pero la cara es un óvalo liso del color de piel,
 * con el borde difuminado y sin ojos, boca ni gafas.
 */
function BlurredBody({ look, long }: { look: SpriteLook; long: boolean }) {
  return (
    <g>
      <ellipse cx="16" cy="30" rx="8" ry="2.2" fill="rgba(0,0,0,0.18)" />
      {look.cape && <path d="M9 15 L5.5 28 L26.5 28 L23 15 Z" fill={look.cape} />}
      {long && <path d="M8 10 Q7 22 10.5 23 L21.5 23 Q25 22 24 10 Z" fill={look.hair} />}
      <rect x="12.4" y="25" width="2.6" height="5" fill="#2d2d3a" />
      <rect x="17" y="25" width="2.6" height="5" fill="#2d2d3a" />
      <rect x="10" y="15" width="12" height="11" rx="3" fill={look.shirt} />
      {/* Borde suave: un halo un poco más grande y transparente alrededor del óvalo */}
      <ellipse cx="16" cy="10.6" rx="7.9" ry="8.1" fill={look.skin} opacity="0.35" />
      <ellipse cx="16" cy="10.6" rx="7" ry="7.3" fill={look.skin} />
      <path d="M8.8 10 Q9.6 2.6 16 3.2 Q22.4 2.6 23.2 10 Q19.6 6.6 16 7.4 Q12.4 6.6 8.8 10 Z" fill={look.hair} opacity="0.85" />
      {look.accessory === 'cap' && (
        <>
          <path d="M8.6 8.6 Q9.4 2.4 16 2.6 Q22.6 2.4 23.4 8.6 Z" fill={look.shirt} stroke="rgba(0,0,0,0.25)" strokeWidth="0.4" />
          <rect x="21" y="7.2" width="5.5" height="2" rx="0.8" fill={look.shirt} />
        </>
      )}
      {look.book && <rect x="21" y="17.5" width="6.5" height="5.5" rx="0.6" fill="#e0a526" />}
    </g>
  )
}
