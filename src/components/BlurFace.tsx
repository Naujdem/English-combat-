import type { ReactNode } from 'react'
import { SpriteBody, type SpriteLook } from './Sprite'

/**
 * NPC de un recuerdo (B1): el mismo cuerpo de los sprites normales, pero la cara es un óvalo liso del color de piel,
 * con borde suave, sin ojos ni boca. Acepta el mismo `look` que SpriteBody.
 */
export function BlurFace({ look }: { look: SpriteLook }) {
  return <SpriteBody look={look} blur />
}

/** Versión suelta (retrato en diálogos y menús), como SpriteIcon */
export function BlurFaceIcon({ look, size = 64 }: { look: SpriteLook; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <BlurFace look={look} />
    </svg>
  )
}

/** Dado el look de un personaje normal, devuelve su sprite de recuerdo (para dibujar dentro de un <svg> de 32×32) */
export function memorySprite(look: SpriteLook): ReactNode {
  return <BlurFace look={look} />
}
