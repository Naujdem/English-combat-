import type { CSSProperties } from 'react'
import type { GameState } from '../game/types'
import { B1_BAND, B1_ERA_COLOR, B1_NODES, b1Label, b1NodeDone, b1NodeOpen, type B1Node, type B1Part } from '../data/b1World'

const FONT = 'Fredoka, Nunito, system-ui, sans-serif'

/**
 * Mapa de B1 (viewBox 360×380, como el de A2). Franja morada a la izquierda (Recuerdo) y dorada a la derecha (Presente);
 * en Extras, todo dorado. Nodo hecho = relleno sólido; abierto = borde brillante; cerrado = apagado.
 * Un recuerdo cerrado lleva un candado hecho de dos fragmentos.
 */
export function B1Map({ state, part, onTap, style }: { state: GameState; part: B1Part; onTap: (n: B1Node) => void; style?: CSSProperties }) {
  const shown = B1_NODES.filter((n) => n.part === part)
  const bands = part === 4 ? [{ era: 'Presente' as const, x: 0, w: 360 }] : [{ era: 'Recuerdo' as const, x: 0, w: 180 }, { era: 'Presente' as const, x: 180, w: 180 }]
  return (
    <svg viewBox="0 0 360 380" className="w-full shrink-0 rounded-2xl border-2 border-line bg-[#221a30]" style={style} role="img" aria-label="Mapa de B1">
      {bands.map((b) => (
        <g key={b.x}>
          <rect x={b.x} y="0" width={b.w} height="380" fill={B1_BAND[b.era]} />
          <text x={b.x + 10} y="370" fontSize="11" fontFamily="Nunito, system-ui, sans-serif" fontWeight="700" fill={B1_ERA_COLOR[b.era]}>{b.era}</text>
        </g>
      ))}
      {bands.length > 1 && <path d="M180 0 V380" stroke="#f4efe4" strokeOpacity="0.2" strokeWidth="2" />}
      <polyline points={shown.map((n) => `${n.x},${n.y}`).join(' ')} fill="none" stroke="#e8dcc8" strokeOpacity="0.55" strokeWidth="4" strokeDasharray="2 9" strokeLinecap="round" />
      {shown.map((n) => {
        const open = b1NodeOpen(n, state)
        const done = b1NodeDone(n, state)
        const color = B1_ERA_COLOR[n.era]
        const long = n.name.length > 16
        return (
          <g key={n.id} onClick={() => onTap(n)} className="cursor-pointer" role="button" aria-label={`${b1Label(n)}. ${n.name}, ${n.era}${done ? ', terminado' : open ? '' : ', cerrado'}`}>
            {open && !done && <circle cx={n.x} cy={n.y} r="29" fill="none" stroke={color} strokeOpacity="0.45" strokeWidth="4" />}
            <circle
              cx={n.x}
              cy={n.y}
              r="22"
              fill={done ? color : open ? '#1d1726' : n.era === 'Recuerdo' ? '#3e3352' : '#3f3a30'}
              stroke={done ? '#f4efe4' : open ? color : '#6b6478'}
              strokeWidth={open && !done ? 3.5 : 2.5}
            />
            {open ? (
              <text x={n.x} y={n.y + 5} textAnchor="middle" fontSize="14" fontFamily={FONT} fontWeight="600" fill={done ? '#1c1a17' : '#f4efe4'}>{b1Label(n)}</text>
            ) : n.era === 'Recuerdo' ? (
              <FragmentLock x={n.x} y={n.y} />
            ) : (
              <g transform={`translate(${n.x - 7} ${n.y - 9})`} opacity="0.7">
                <rect x="0" y="7" width="14" height="11" rx="2" fill="#f4efe4" />
                <path d="M3 7 V4.5 a4 4 0 0 1 8 0 V7" fill="none" stroke="#f4efe4" strokeWidth="2.2" />
              </g>
            )}
            <rect x={n.x - 78} y={n.y + 26} width="156" height="20" rx="8" fill="rgba(0,0,0,0.45)" />
            <text x={n.x} y={n.y + 40} textAnchor="middle" fontSize={long ? 11 : 13} fontFamily={FONT} fontWeight="600" fill={open ? '#f4efe4' : '#b9b1c4'}>{n.name}</text>
          </g>
        )
      })}
    </svg>
  )
}

/** Candado de un recuerdo cerrado: dos astillas (dos fragmentos) que juntas forman un candado */
function FragmentLock({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y + 1})`} fill="#d9c7f2" stroke="#d9c7f2">
      {/* Fragmento izquierdo: mitad del arco y mitad del cuerpo, con el borde quebrado */}
      <g transform="translate(-0.8 0)">
        <path d="M-5 -2 V-5.5 a5 5 0 0 1 4.2 -4.9" fill="none" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M-8 -2 H0.5 L-1.8 1.5 L0.8 4.2 L-1.2 7.2 L0 9.5 H-8 Z" strokeWidth="0.6" strokeLinejoin="round" />
      </g>
      {/* Fragmento derecho, un poco separado */}
      <g transform="translate(1.6 0.6)">
        <path d="M0.8 -10.4 a5 5 0 0 1 4.2 4.9 V-2" fill="none" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M0.5 -2 H8 V9.5 H0 L-1.2 7.2 L0.8 4.2 L-1.8 1.5 Z" strokeWidth="0.6" strokeLinejoin="round" />
      </g>
      <path d="M0.6 -1 L-1.2 1.6 L0.9 4.3" fill="none" stroke="#ffffff" strokeOpacity="0.8" strokeWidth="0.8" />
    </g>
  )
}
