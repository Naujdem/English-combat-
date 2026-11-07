/** B1-04: la caja de herramientas de tu cuarto (Repair Shop), en la caja de 32x32 de los objetos del mapa */
export function ToolboxIcon({ lit }: { lit: boolean }) {
  const edge = lit ? '#e0b84a' : '#7a2a22'
  return (
    <g>
      <ellipse cx="16" cy="27" rx="12" ry="2.2" fill="rgba(0,0,0,0.2)" />
      <path d="M11 13 V10 Q11 8 13 8 H19 Q21 8 21 10 V13" fill="none" stroke="#55606e" strokeWidth="1.8" />
      <rect x="4" y="13" width="24" height="13" rx="2" fill="#c0392b" stroke={edge} strokeWidth="1.2" />
      <rect x="4" y="13" width="24" height="4" rx="1.5" fill="#a5301f" />
      <rect x="14" y="16" width="4" height="3" rx="0.6" fill="#d9d2c0" stroke="#55606e" strokeWidth="0.6" />
      <path d="M8 22 h5 M19 22 h5" stroke="#7a2a22" strokeWidth="0.9" strokeLinecap="round" />
    </g>
  )
}

/** El mismo dibujo como retrato pequeño (para la charla antes del Repair Shop) */
export function ToolboxPortrait({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <ToolboxIcon lit={false} />
    </svg>
  )
}
