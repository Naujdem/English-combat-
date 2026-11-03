import { useEffect, type ReactNode } from 'react'
import { STATIC_NAME, STATIC_SHOWN } from '../game/staticName'
import { sfx } from '../game/sfx'

/** Un nombre tapado por la estática: ▒▒▒ con un leve temblor. Con `sound`, suena la estática al aparecer */
export function StaticName({ sound = false }: { sound?: boolean }) {
  useEffect(() => {
    if (sound) sfx('static')
  }, [sound])
  return (
    <span className="b1-static-name" aria-label="nombre con estática" title="Nombre con estática">
      {STATIC_SHOWN}
    </span>
  )
}

/**
 * Divide un texto en trozos y pone StaticName donde está el marcador [[?]].
 * `piece` dibuja cada trozo normal (por ejemplo, con palabras que se pueden tocar). Solo el primer nombre de la línea suena.
 */
export function withStatic(text: string, piece: (part: string, key: number) => ReactNode = (p) => p): ReactNode {
  if (!text.includes(STATIC_NAME)) return piece(text, 0)
  const parts = text.split(STATIC_NAME)
  return parts.map((p, i) => (
    <span key={i}>
      {p && piece(p, i)}
      {i < parts.length - 1 && <StaticName sound={i === 0} />}
    </span>
  ))
}

/** Texto plano con nombres con estática */
export function StaticText({ text }: { text: string }) {
  return <>{withStatic(text)}</>
}
