import type { InsRole } from '../game/inscriptions'
import { ROLE_STYLE } from './Grammar'

/**
 * Glifos de Inscriptions: cada función de la frase tiene FORMA y COLOR propios.
 * Los colores de sujeto, verbo y palabra clave son los mismos de las explicaciones de A1 y A2 (ROLE_STYLE en Grammar.tsx).
 * La forma (y un iconito al lado de la palabra) distingue el papel sin depender del color.
 */
export const INS_ROLE_INFO: Record<InsRole, { name: string; shape: string; color: string; path: string; icon: string }> = {
  subject: { name: 'Sujeto', shape: 'rombo', color: ROLE_STYLE.subj.bg, path: 'M14 1 H99 L86 39 H1 Z', icon: 'M7 1 L13 7 L7 13 L1 7 Z' },
  verb: { name: 'Verbo', shape: 'hexágono', color: ROLE_STYLE.verb.bg, path: 'M10 1 H90 L99 20 L90 39 H10 L1 20 Z', icon: 'M4 1.5 H10 L13 7 L10 12.5 H4 L1 7 Z' },
  aux: { name: 'Auxiliar o modal', shape: 'escudo', color: '#2f8a7e', path: 'M1 1 H99 V24 Q99 33 50 39 Q1 33 1 24 Z', icon: 'M1.5 1.5 H12.5 V7 Q12.5 10.5 7 13 Q1.5 10.5 1.5 7 Z' },
  participle: { name: 'Participio', shape: 'hexágono con muesca', color: ROLE_STYLE.key.bg, path: 'M10 1 H42 L50 10 L58 1 H90 L99 20 L90 39 H10 L1 20 Z', icon: 'M4 1.5 H5.5 L7 4 L8.5 1.5 H10 L13 7 L10 12.5 H4 L1 7 Z' },
  object: { name: 'Objeto', shape: 'círculo', color: '#d27a2c', path: 'M20 1 H80 A19 19 0 0 1 80 39 H20 A19 19 0 0 1 20 1 Z', icon: 'M7 1 A6 6 0 1 1 6.99 1 Z' },
  complement: { name: 'Complemento', shape: 'rectángulo redondeado', color: '#7d7466', path: 'M7 1 H93 Q99 1 99 7 V33 Q99 39 93 39 H7 Q1 39 1 33 V7 Q1 1 7 1 Z', icon: 'M3 2 H11 Q12.5 2 12.5 3.5 V10.5 Q12.5 12 11 12 H3 Q1.5 12 1.5 10.5 V3.5 Q1.5 2 3 2 Z' },
  connector: { name: 'Conector', shape: 'barra', color: '#b8901f', path: 'M1 6 L8 1 V12 H92 V1 L99 6 V34 L92 39 V28 H8 V39 L1 34 Z', icon: 'M1 4 L3 2 V6 H11 V2 L13 4 V10 L11 12 V8 H3 V12 L1 10 Z' },
  time: { name: 'Tiempo', shape: 'arco', color: '#2a8fb8', path: 'M1 39 V20 Q1 1 50 1 Q99 1 99 20 V39 Z', icon: 'M1.5 13 V7 Q1.5 1.5 7 1.5 Q12.5 1.5 12.5 7 V13 Z' },
  agent: { name: 'Agente (by…)', shape: 'triángulo', color: '#c0507a', path: 'M1 1 H84 L99 20 L84 39 H1 L12 20 Z', icon: 'M7 1.5 L13 12.5 H1 Z' },
}

/** Fondo de un glifo (o de su hueco). Se estira al ancho de la palabra; el borde no se deforma */
export function GlyphShape({ role, hollow = false, state }: { role: InsRole; hollow?: boolean; state?: 'right' | 'wrong' }) {
  const info = INS_ROLE_INFO[role]
  const stroke = state === 'right' ? '#4cc27a' : state === 'wrong' ? '#e35d5d' : hollow ? '#c9b98f' : '#f4efe4'
  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true">
      <path
        d={info.path}
        fill={hollow ? 'rgba(10,14,22,0.45)' : info.color}
        stroke={stroke}
        strokeWidth={state ? 3 : hollow ? 1.6 : 1.4}
        strokeDasharray={hollow ? '5 4' : undefined}
        vectorEffect="non-scaling-stroke"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Iconito de la forma (no se estira): se pone junto a la palabra y en la leyenda */
export function GlyphIcon({ role, size = 13, color }: { role: InsRole; size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" aria-hidden="true" className="shrink-0">
      <path d={INS_ROLE_INFO[role].icon} fill={color ?? '#f4efe4'} stroke="rgba(0,0,0,0.35)" strokeWidth="0.6" />
    </svg>
  )
}

/** Ancho de un glifo según su texto, para que ficha y hueco midan lo mismo */
export const glyphWidth = (text: string) => `calc(${Math.max(text.length, 3)}ch + 2.4rem)`
