import { PRESENT_NODES } from '../data/world'

const ERA_COLOR = { Presente: '#3b9d5d', Pasado: '#c98b4a', Futuro: '#5d8fd4' } as const

/**
 * El reloj del tiempo: una pieza por cada jefe (una por escenario del mapa).
 * La pieza k pertenece a WORLD[k]. Las que faltan se ven vacías y punteadas.
 */
export function TimeClock({ pieces, size = 96, highlight }: { pieces: number; size?: number; highlight?: number }) {
  const n = PRESENT_NODES.length
  const r = 40
  const wedge = (k: number) => {
    const a0 = (k / n) * Math.PI * 2 - Math.PI / 2
    const a1 = ((k + 1) / n) * Math.PI * 2 - Math.PI / 2
    const gap = 0.05
    const p = (a: number, rr: number) => `${50 + rr * Math.cos(a)} ${50 + rr * Math.sin(a)}`
    return `M ${p(a0 + gap, 14)} L ${p(a0 + gap, r)} A ${r} ${r} 0 0 1 ${p(a1 - gap, r)} L ${p(a1 - gap, 14)} A 14 14 0 0 0 ${p(a0 + gap, 14)} Z`
  }
  const complete = pieces >= n
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} role="img" aria-label={`Reloj del tiempo: ${Math.min(pieces, n)} de ${n} piezas`}>
      <circle cx="50" cy="50" r="47" fill="#1f1a14" stroke="#e0a526" strokeWidth="2.5" />
      {PRESENT_NODES.map((node, k) => {
        const owned = k < pieces
        return (
          <path
            key={node.id}
            d={wedge(k)}
            fill={owned ? ERA_COLOR[node.era] : 'transparent'}
            stroke={owned ? '#f4efe4' : '#8d7c68'}
            strokeWidth={owned ? 1.4 : 1.2}
            strokeDasharray={owned ? undefined : '3 3'}
            className={highlight === k ? 'anim-piece' : undefined}
          />
        )
      })}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((h) => {
        const a = (h / 12) * Math.PI * 2
        return <circle key={h} cx={50 + 44 * Math.sin(a)} cy={50 - 44 * Math.cos(a)} r={h % 3 === 0 ? 1.8 : 0.9} fill="#e0a526" />
      })}
      <circle cx="50" cy="50" r="12" fill="#2b241c" stroke="#e0a526" strokeWidth="1.5" />
      <line x1="50" y1="50" x2="50" y2="41" stroke="#f4efe4" strokeWidth="2" strokeLinecap="round" />
      <line x1="50" y1="50" x2="57" y2="50" stroke="#f4efe4" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="50" cy="50" r="2" fill={complete ? '#e0a526' : '#f4efe4'} />
    </svg>
  )
}

/** Lista de piezas con el lugar donde está cada una */
export function ClockPieces({ pieces }: { pieces: number }) {
  return (
    <ul className="grid gap-1.5">
      {PRESENT_NODES.map((node, k) => (
        <li key={node.id} className="flex items-center gap-2 text-[15px]">
          <span className="h-3.5 w-3.5 rounded-sm border" style={{ background: k < pieces ? ERA_COLOR[node.era] : 'transparent', borderColor: '#8d7c68', borderStyle: k < pieces ? 'solid' : 'dashed' }} />
          <span className={k < pieces ? '' : 'text-paper/55'}>
            Pieza {k + 1}: {k < pieces ? `${node.name} ✓` : `la guarda el jefe de ${node.name} (${node.era})`}
          </span>
        </li>
      ))}
    </ul>
  )
}
