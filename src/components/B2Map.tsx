import type { CSSProperties } from 'react'
import type { GameState } from '../game/types'
import { B2_BAND, B2_ERA_COLOR, B2_NODES, b2Core, b2Label, b2NodeDone, b2NodeOpen, type B2Node, type B2Part } from '../data/b2World'

const FONT = 'Fredoka, Nunito, system-ui, sans-serif'

/**
 * Mapa de B2 (viewBox 360×380, como el de B1). Franja azul eléctrico a la izquierda (Ventana) y dorada a la derecha (Presente);
 * en Extras, todo dorado. Una Ventana cerrada lleva un candado en forma de reloj.
 */
export function B2Map({ state, part, onTap, style }: { state: GameState; part: B2Part; onTap: (n: B2Node) => void; style?: CSSProperties }) {
  const shown = B2_NODES.filter((n) => n.part === part)
  const bands = part === 4 ? [{ era: 'Presente' as const, x: 0, w: 360 }] : [{ era: 'Ventana' as const, x: 0, w: 180 }, { era: 'Presente' as const, x: 180, w: 180 }]
  return (
    <svg viewBox="0 0 360 380" className="w-full shrink-0 rounded-2xl border-2 border-line bg-[#16202e]" style={style} role="img" aria-label="Mapa de B2">
      {bands.map((b) => (
        <g key={b.x}>
          <rect x={b.x} y="0" width={b.w} height="380" fill={B2_BAND[b.era]} />
          <text x={b.x + 10} y="370" fontSize="11" fontFamily="Nunito, system-ui, sans-serif" fontWeight="700" fill={B2_ERA_COLOR[b.era]}>{b.era === 'Ventana' ? 'Ventanas · futuro' : b.era}</text>
        </g>
      ))}
      {bands.length > 1 && <path d="M180 0 V380" stroke="#f4efe4" strokeOpacity="0.2" strokeWidth="2" />}
      <polyline points={shown.map((n) => `${n.x},${n.y}`).join(' ')} fill="none" stroke="#e8dcc8" strokeOpacity="0.55" strokeWidth="4" strokeDasharray="2 9" strokeLinecap="round" />
      {shown.map((n) => {
        const open = b2NodeOpen(n, state)
        const done = b2NodeDone(n, state)
        const color = B2_ERA_COLOR[n.era]
        const long = n.name.length > 16
        return (
          <g key={n.id} onClick={() => onTap(n)} className="cursor-pointer" role="button" aria-label={`${b2Label(n)}. ${n.name}, ${n.era}${n.year ? ` ${n.year}` : ''}${done ? ', terminado' : open ? '' : ', cerrado'}`}>
            {open && !done && <circle cx={n.x} cy={n.y} r="29" fill="none" stroke={color} strokeOpacity="0.45" strokeWidth="4" />}
            <circle
              cx={n.x}
              cy={n.y}
              r="22"
              fill={done ? color : open ? '#141c27' : n.era === 'Ventana' ? '#24364d' : '#3f3a30'}
              stroke={done ? '#f4efe4' : open ? color : '#62708a'}
              strokeWidth={open && !done ? 3.5 : 2.5}
            />
            {open ? (
              <text x={n.x} y={n.y + 5} textAnchor="middle" fontSize="14" fontFamily={FONT} fontWeight="600" fill={done ? '#1c1a17' : '#f4efe4'}>{b2Label(n)}</text>
            ) : n.era === 'Ventana' ? (
              <ClockLock x={n.x} y={n.y} />
            ) : (
              <g transform={`translate(${n.x - 7} ${n.y - 9})`} opacity="0.7">
                <rect x="0" y="7" width="14" height="11" rx="2" fill="#f4efe4" />
                <path d="M3 7 V4.5 a4 4 0 0 1 8 0 V7" fill="none" stroke="#f4efe4" strokeWidth="2.2" />
              </g>
            )}
            <rect x={n.x - 78} y={n.y + 26} width="156" height="20" rx="8" fill="rgba(0,0,0,0.45)" />
            <text x={n.x} y={n.y + 40} textAnchor="middle" fontSize={long ? 11 : 13} fontFamily={FONT} fontWeight="600" fill={open ? '#f4efe4' : '#b1bccb'}>
              {n.year ? `${n.name} · ${n.year}` : n.name}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

/** Candado de una Ventana cerrada: un candado con la esfera de un reloj */
function ClockLock({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`} stroke="#bfe2ff" fill="none">
      <path d="M-5 -3 V-6 a5 5 0 0 1 10 0 V-3" strokeWidth="2.2" />
      <circle cx="0" cy="4" r="7" fill="#bfe2ff" fillOpacity="0.15" strokeWidth="2" />
      <path d="M0 4 V0 M0 4 L3 6" strokeWidth="1.6" strokeLinecap="round" />
    </g>
  )
}

/**
 * Barra del núcleo del reloj (ficha 0.4): 6 segmentos que se llenan en azul (también de a medio segmento).
 * Si hay un fragmento suelto esperando, se ve una astilla al lado.
 */
export function CoreBar({ state, filled: forced }: { state?: GameState; filled?: number }) {
  const core = state ? b2Core(state) : { filled: forced ?? 0, loose: false }
  const filled = forced ?? core.filled
  return (
    <div className="flex items-center gap-2" aria-label={`Núcleo del reloj: ${filled} de 6 segmentos`}>
      <span className="text-xs font-semibold uppercase tracking-wide text-[#8fcbff]">Núcleo</span>
      <div className="flex flex-1 gap-1">
        {Array.from({ length: 6 }, (_, k) => {
          const amount = Math.max(0, Math.min(1, filled - k))
          return (
            <div key={k} className="relative h-3 flex-1 overflow-hidden rounded-full border border-[#3fa9ff]/60 bg-[#0e1824]">
              <div className="absolute inset-y-0 left-0 bg-[#3fa9ff] shadow-[0_0_8px_#3fa9ff]" style={{ width: `${amount * 100}%`, transition: 'width 600ms ease' }} />
            </div>
          )
        })}
      </div>
      {core.loose && (
        <svg width="14" height="14" viewBox="0 0 14 14" aria-label="Un fragmento suelto espera en el reloj">
          <path d="M3 1 L11 3 L9 8 L12 13 L2 11 L5 6 Z" fill="#bfe2ff" />
        </svg>
      )}
    </div>
  )
}
