import type { ReactNode } from 'react'

/**
 * The Moving Stone escrito (B1): registro de objetos con sus dos estados (antes / después) y las tres escenas
 * (templo, cuarto del Repair Shop y túnel de la Escape Room). Cada objeto se dibuja en una caja de 64×64.
 * Así una sala solo dice qué objetos tiene; no hace falta dibujar una escena por problema.
 */
export type StoneScene = 'temple' | 'room' | 'tunnel'

export type StoneObject = {
  /** Nombres que reconoce la orden escrita (el primero es el principal): ['gold key', 'key'] */
  names: string[]
  es: string
  draw: (after: boolean) => ReactNode
}

const GOLD = '#e0b84a'
const STONE = '#8a8f96'
const STONE_DARK = '#55606e'
const WOOD = '#8a5a32'
const METAL = '#7d8794'

export const STONE_OBJECTS: Record<string, StoneObject> = {
  stone: {
    names: ['stone', 'rock'],
    es: 'la piedra',
    draw: (a) => (
      <g className="stone-move" style={{ transform: a ? 'translateX(16px)' : 'none' }}>
        <path d="M10 56 Q8 30 24 24 Q40 18 50 30 Q58 42 54 56 Z" fill={STONE} stroke={STONE_DARK} strokeWidth="2" />
        <path d="M22 36 l6 4 M36 30 l4 6" stroke={STONE_DARK} strokeWidth="1.5" />
      </g>
    ),
  },
  lid: {
    names: ['lid', 'cover'],
    es: 'la tapa',
    draw: (a) => (
      <g>
        <rect x="12" y="34" width="40" height="22" rx="2" fill={STONE} stroke={STONE_DARK} strokeWidth="2" />
        {a && <rect x="16" y="34" width="32" height="5" fill={GOLD} opacity="0.7" />}
        <g className="stone-move" style={{ transform: a ? 'translate(-4px, -16px) rotate(-18deg)' : 'none', transformOrigin: '0% 50%' }}>
          <rect x="9" y="28" width="46" height="7" rx="2" fill="#a3a9b1" stroke={STONE_DARK} strokeWidth="2" />
        </g>
      </g>
    ),
  },
  lever: {
    names: ['lever', 'handle'],
    es: 'la palanca',
    draw: (a) => (
      <g>
        <rect x="20" y="48" width="24" height="10" rx="2" fill={METAL} stroke="#4a525e" strokeWidth="2" />
        <g className="stone-move" style={{ transform: a ? 'rotate(70deg)' : 'rotate(-20deg)', transformOrigin: '50% 100%' }}>
          <rect x="30" y="16" width="4" height="34" fill="#5a636e" />
          <circle cx="32" cy="16" r="5" fill="#c0392b" />
        </g>
      </g>
    ),
  },
  light: {
    names: ['light', 'lights', 'bulb'],
    es: 'la luz',
    draw: (a) => (
      <g>
        <line x1="32" y1="2" x2="32" y2="20" stroke="#4a525e" strokeWidth="2" />
        <circle className="stone-fade" cx="32" cy="32" r="22" fill="#ffe680" opacity={a ? 0.35 : 0} />
        <path d="M24 20 H40 L42 30 Q42 42 32 42 Q22 42 22 30 Z" fill={a ? '#ffe680' : '#c9c9c9'} stroke="#7d7466" strokeWidth="1.5" />
      </g>
    ),
  },
  box: {
    names: ['box'],
    es: 'la caja',
    draw: (a) => (
      <g className="stone-move" style={{ transform: a ? 'translateY(-16px)' : 'none' }}>
        <rect x="16" y="36" width="32" height="22" fill="#c9a46a" stroke={WOOD} strokeWidth="2" />
        <path d="M16 44 H48 M32 36 V58" stroke={WOOD} strokeWidth="1.5" />
      </g>
    ),
  },
  door: {
    names: ['door', 'gate'],
    es: 'la puerta',
    draw: (a) => (
      <g>
        <rect x="14" y="6" width="36" height="54" fill="#1a1d24" />
        {a && <rect x="16" y="8" width="32" height="52" fill={GOLD} opacity="0.35" className="stone-fade" />}
        <g className="stone-move" style={{ transform: a ? 'translateX(-30px) scaleX(0.3)' : 'none', transformOrigin: '0% 50%' }}>
          <rect x="14" y="6" width="36" height="54" fill="#6f7a8c" stroke={STONE_DARK} strokeWidth="2" />
          <path d="M20 16 h24 M20 26 h24" stroke={GOLD} strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx="44" cy="36" r="3" fill={GOLD} />
        </g>
      </g>
    ),
  },
  key: {
    names: ['gold key', 'golden key', 'key'],
    es: 'la llave dorada',
    draw: (a) => (
      <g className="stone-fade" opacity={a ? 0.35 : 1}>
        <circle cx="22" cy="40" r="8" fill="none" stroke={GOLD} strokeWidth="4" />
        <path d="M30 40 H52 M44 40 V48 M50 40 V46" stroke={GOLD} strokeWidth="4" strokeLinecap="round" />
      </g>
    ),
  },
  heater: {
    names: ['heater', 'radiator'],
    es: 'el calentador',
    draw: (a) => (
      <g>
        <rect x="10" y="24" width="44" height="32" rx="4" fill={a ? '#d9663a' : '#b8bec6'} stroke="#5a636e" strokeWidth="2" className="stone-fill" />
        {[18, 26, 34, 42].map((x) => <line key={x} x1={x} y1="28" x2={x} y2="52" stroke="#5a636e" strokeWidth="2" />)}
        {a && <path className="stone-fade" d="M18 18 q3 -4 0 -8 M30 18 q3 -4 0 -8 M42 18 q3 -4 0 -8" fill="none" stroke="#e8794a" strokeWidth="2" strokeLinecap="round" />}
      </g>
    ),
  },
  lamp: {
    names: ['lamp'],
    es: 'la lámpara',
    draw: (a) => (
      <g>
        <circle className="stone-fade" cx="26" cy="24" r="16" fill="#ffe680" opacity={a ? 0.4 : 0} />
        <path d="M16 28 L22 12 H34 L38 28 Z" fill={a ? '#ffe680' : '#d9c7a0'} stroke="#7d6a4a" strokeWidth="1.5" />
        <rect x="25" y="28" width="4" height="22" fill="#5a636e" />
        <rect x="16" y="50" width="22" height="6" rx="2" fill="#5a636e" />
        {/* el cable: suelto o enchufado a la pared */}
        <path d={a ? 'M38 53 Q48 56 56 50' : 'M38 53 Q46 60 50 56'} fill="none" stroke="#2d2d3a" strokeWidth="2" />
        <rect x="56" y="44" width="6" height="12" fill="#e6e6e6" stroke="#8a8a8a" />
      </g>
    ),
  },
  wifi: {
    names: ['wifi', 'wi fi', 'router', 'internet'],
    es: 'el wifi (el router)',
    draw: (a) => (
      <g>
        <rect x="12" y="40" width="40" height="14" rx="3" fill="#2d3a48" stroke="#5a6672" strokeWidth="2" />
        {[20, 28, 36].map((x) => <circle key={x} cx={x} cy="47" r="2" fill={a ? '#7ee08a' : '#e35d5d'} />)}
        <line x1="44" y1="40" x2="48" y2="26" stroke="#5a6672" strokeWidth="2" />
        {a && <path className="stone-fade" d="M22 30 Q32 20 42 30 M26 34 Q32 28 38 34" fill="none" stroke="#7ee08a" strokeWidth="2" strokeLinecap="round" />}
      </g>
    ),
  },
  shelf: {
    names: ['shelf', 'bookshelf', 'shelves'],
    es: 'el estante',
    draw: (a) => (
      <g className="stone-move" style={{ transform: a ? 'translateX(-22px)' : 'none' }}>
        <rect x="14" y="10" width="36" height="48" fill="#8a5a32" stroke="#5a3a20" strokeWidth="2" />
        {[22, 34, 46].map((y) => <line key={y} x1="14" y1={y} x2="50" y2={y} stroke="#5a3a20" strokeWidth="2" />)}
        <rect x="18" y="14" width="5" height="8" fill="#c0392b" />
        <rect x="25" y="26" width="5" height="8" fill="#3b8bd6" />
      </g>
    ),
  },
  ladder: {
    names: ['ladder', 'steps'],
    es: 'la escalera',
    draw: (a) => (
      <g>
        <rect x="18" y="0" width="28" height="6" fill={a ? GOLD : '#2a2a2a'} className="stone-fill" />
        <path d="M22 6 V60 M42 6 V60" stroke="#8a6a3a" strokeWidth="3" />
        {[14, 24, 34, 44, 54].map((y) => <line key={y} x1="22" y1={y} x2="42" y2={y} stroke="#8a6a3a" strokeWidth="3" />)}
      </g>
    ),
  },
  bed: {
    names: ['bed'],
    es: 'la cama',
    draw: (a) => (
      <g>
        <rect x="6" y="36" width="52" height="14" fill="#c9a46a" stroke={WOOD} strokeWidth="2" />
        <rect x="8" y="30" width="16" height="8" rx="2" fill="#f4efe4" />
        <rect x="24" y="32" width="32" height="6" fill={a ? '#5d8fd4' : '#9cb4d4'} className="stone-fill" />
      </g>
    ),
  },
  window: {
    names: ['window'],
    es: 'la ventana',
    draw: (a) => (
      <g>
        <rect x="12" y="10" width="40" height="40" fill="#9fc4de" stroke="#5a636e" strokeWidth="3" />
        <line x1="32" y1="10" x2="32" y2="50" stroke="#5a636e" strokeWidth="2" />
        <g className="stone-move" style={{ transform: a ? 'translateX(-18px)' : 'none' }}>
          <rect x="32" y="12" width="18" height="36" fill="#cfe3ea" opacity="0.8" />
        </g>
      </g>
    ),
  },
}

/** Los nombres de los objetos de una sala (para matchCommand) */
export const objectNames = (ids: string[]) => ids.map((id) => ({ id, names: STONE_OBJECTS[id]?.names ?? [id] }))

const BG: Record<StoneScene, ReactNode> = {
  temple: (
    <g>
      <rect width="320" height="150" fill="#3e4757" />
      {[0, 1, 2, 3, 4].map((r) => (
        <path key={r} d={`M0 ${20 + r * 22} H320`} stroke="#343c4b" strokeWidth="2" />
      ))}
      <rect y="112" width="320" height="38" fill="#2e3542" />
      <path d="M0 112 H320" stroke={GOLD} strokeWidth="2" />
      <path d="M20 14 h40 M260 14 h40" stroke={GOLD} strokeWidth="2" strokeDasharray="4 4" />
    </g>
  ),
  room: (
    <g>
      <rect width="320" height="150" fill="#e8dcc8" />
      {[...Array(16)].map((_, k) => <line key={k} x1={k * 20 + 10} y1="0" x2={k * 20 + 10} y2="112" stroke="#dccbb0" strokeWidth="3" />)}
      <rect y="112" width="320" height="38" fill="#b08a5a" />
      <path d="M0 112 H320" stroke="#8a6a3a" strokeWidth="3" />
    </g>
  ),
  tunnel: (
    <g>
      <rect width="320" height="150" fill="#1f2228" />
      {[...Array(6)].map((_, r) =>
        [...Array(9)].map((__, c) => (
          <rect key={`${r}-${c}`} x={c * 38 + (r % 2 ? 0 : 19) - 10} y={r * 19} width="34" height="15" fill="#2c3038" />
        )),
      )}
      <rect y="112" width="320" height="38" fill="#15171b" />
    </g>
  ),
}

/**
 * La sala: fondo y objetos en fila. solved = ids que ya cambiaron de estado.
 * wrong = objeto que se sacude con un destello rojo · highlight = objetos resaltados (ayuda del 3.er error).
 */
export function StoneSceneArt({ scene, objects, solved, wrong, highlight }: { scene: StoneScene; objects: string[]; solved: string[]; wrong?: { id: string; n: number } | null; highlight?: boolean }) {
  const n = objects.length
  return (
    <svg viewBox="0 0 320 150" className="mt-3 w-full rounded-xl border-2 border-line" role="group" aria-label={`Sala: ${objects.map((o) => STONE_OBJECTS[o]?.es ?? o).join(', ')}`}>
      {BG[scene]}
      {objects.map((id, k) => {
        const o = STONE_OBJECTS[id]
        if (!o) return null
        const x = ((k + 0.5) * 320) / n - 32
        const isWrong = wrong?.id === id
        return (
          <g key={id} transform={`translate(${x} 52)`}>
            <g key={isWrong ? `w${wrong!.n}` : 'ok'} className={isWrong ? 'anim-shake' : undefined}>
              {o.draw(solved.includes(id))}
              {isWrong && <rect className="stone-flash" x="0" y="0" width="64" height="64" rx="8" fill="#e35d5d" />}
            </g>
            {highlight && <rect x="-2" y="-2" width="68" height="68" rx="10" fill="none" stroke={GOLD} strokeWidth="2" strokeDasharray="5 4" />}
            <text x="32" y="78" textAnchor="middle" fontSize="10" fontFamily="Nunito, system-ui, sans-serif" fontWeight="700" fill={scene === 'room' ? '#3a2e1e' : '#e8dcb0'}>
              {o.names[0]}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
