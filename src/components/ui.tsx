import type { ReactNode } from 'react'

export const btn =
  'rounded-xl border-2 border-line bg-panel-2 px-4 py-2.5 font-display text-[17px] font-medium text-paper transition active:scale-[0.97] hover:border-gold/70 disabled:opacity-40 disabled:active:scale-100'
export const btnPrimary =
  'rounded-xl border-2 border-gold bg-gold px-4 py-2.5 font-display text-[17px] font-semibold text-ink transition active:scale-[0.97] hover:brightness-105'
export const btnGhost =
  'rounded-lg px-3 py-1.5 text-sm font-semibold text-paper/80 transition hover:bg-white/5 active:scale-[0.97]'

export function Panel({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-2xl border-2 border-line bg-panel p-4 ${className}`}>{children}</div>
}

/** Ventana superpuesta que ocupa la pantalla del juego */
export function Overlay({ children, onClose }: { children: ReactNode; onClose?: () => void }) {
  return (
    <div className="absolute inset-0 z-30 flex items-end justify-center bg-black/55 p-3 sm:items-center" onClick={onClose}>
      <div className="anim-fade-in w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

export function Bar({ value, max, color, label }: { value: number; max: number; color: string; label?: string }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100))
  return (
    <div className="w-full" aria-label={label}>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-black/35">
        <div className="h-full rounded-full transition-[width] duration-500" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  )
}

export function Hearts({ hp, max }: { hp: number; max: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`Vida ${hp} de ${max}`}>
      {Array.from({ length: max }).map((_, i) => (
        <svg key={i} width="16" height="15" viewBox="0 0 16 15" aria-hidden="true">
          <path
            d="M8 14 L1.8 7.6 A3.6 3.6 0 0 1 8 2.8 A3.6 3.6 0 0 1 14.2 7.6 Z"
            fill={i < hp ? '#d64545' : 'transparent'}
            stroke={i < hp ? '#d64545' : '#6b6157'}
            strokeWidth="1.4"
          />
        </svg>
      ))}
    </div>
  )
}

export function KeyIcon({ filled = true, size = 16 }: { filled?: boolean; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="5" cy="5" r="3.2" fill="none" stroke={filled ? '#e0a526' : '#6b6157'} strokeWidth="2" />
      <path d="M7.3 7.3 L14 14 M11 11 L12.8 9.2 M12.6 12.6 L14.2 11" stroke={filled ? '#e0a526' : '#6b6157'} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
