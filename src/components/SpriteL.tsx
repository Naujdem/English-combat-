/**
 * L, el hombre de los recuerdos de B1. Una sola pieza para todos los recuerdos.
 * Abrigo largo con capucha, en grises azulados oscuros. SIN CARA: la capucha deja una sombra negra; nunca ojos ni boca.
 * Misma caja de 32×32 que SpriteBody (para el mapa y el combate). Para mirar a la izquierda, se voltea igual que el héroe.
 *   pose 'back'    = de espaldas (caminando en el recuerdo)
 *   pose 'profile' = de perfil, mirando a la derecha, con la cara en sombra
 *   mute           = una mano en la garganta
 */
export type LPose = 'back' | 'profile'

const COAT = '#39445a'
const COAT_DARK = '#2a3243'
const HOOD = '#323c50'
const SHADOW = '#07080c'
const HAND = '#4f5a6e'

export function SpriteL({ pose = 'back', mute = false }: { pose?: LPose; mute?: boolean }) {
  return (
    <g>
      <ellipse cx="16" cy="30" rx="8" ry="2.2" fill="rgba(0,0,0,0.22)" />
      <rect x="12.6" y="27" width="2.6" height="3" fill="#1d212b" />
      <rect x="16.8" y="27" width="2.6" height="3" fill="#1d212b" />
      {/* Abrigo largo */}
      <path d="M10.2 14.5 Q9 21.5 8.4 28.6 L23.6 28.6 Q23 21.5 21.8 14.5 Z" fill={COAT} />
      {pose === 'back' ? (
        <>
          <path d="M16 18 V28.6" stroke={COAT_DARK} strokeWidth="0.8" />
          <path d="M10 15 Q8.2 20 8 24.5 L9.9 24.8 Q10.6 20 11.6 16.5 Z" fill={COAT_DARK} />
          <path d="M22 15 Q23.8 20 24 24.5 L22.1 24.8 Q21.4 20 20.4 16.5 Z" fill={COAT_DARK} />
          {/* Capucha vista desde atrás: tapa toda la cabeza */}
          <path d="M8.4 12.6 Q8 2.4 16 2.6 Q24 2.4 23.6 12.6 Q22.2 16.4 16 16.4 Q9.8 16.4 8.4 12.6 Z" fill={HOOD} />
          <path d="M16 3.4 Q15 9 16 15.6" fill="none" stroke={COAT_DARK} strokeWidth="0.7" />
        </>
      ) : (
        <>
          <path d="M18.5 15 L20.5 28.6" stroke={COAT_DARK} strokeWidth="0.7" />
          {!mute && <path d="M13 15.5 Q11.5 20 12 24.6 L14 24.8 Q14.2 20 15 16.5 Z" fill={COAT_DARK} />}
          {/* Capucha de perfil: el hueco de la cara, a la derecha, es una sombra negra */}
          <path d="M8.6 12.4 Q8.4 2.6 16 2.6 Q23.2 2.8 24.2 10.5 Q24 15.6 18 16.2 Q10.4 16.6 8.6 12.4 Z" fill={HOOD} />
          <ellipse cx="20.2" cy="10.6" rx="3.5" ry="4.6" fill={SHADOW} />
          <path d="M18.4 5.8 Q24.6 6.4 23.8 11.6 Q23.4 15 19.6 15.6" fill="none" stroke={COAT_DARK} strokeWidth="0.9" />
        </>
      )}
      {mute && (
        <>
          <path d={pose === 'back' ? 'M21.6 16.4 Q21.2 15.2 19.4 15' : 'M14.5 17 Q16.5 17.6 18.6 16'} stroke={COAT_DARK} strokeWidth="2.4" strokeLinecap="round" fill="none" />
          <circle cx={pose === 'back' ? 19 : 19} cy={pose === 'back' ? 15 : 15.8} r="1.5" fill={HAND} />
        </>
      )}
    </g>
  )
}

/** L en pequeño, como retrato en los diálogos (como SpriteIcon) */
export function LIcon({ size = 64, pose = 'profile', mute = false }: { size?: number; pose?: LPose; mute?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <SpriteL pose={pose} mute={mute} />
    </svg>
  )
}
