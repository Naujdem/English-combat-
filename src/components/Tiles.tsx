import type { Zone } from '../game/types'

export const T = 32

export const FLOOR: Record<Zone, string> = {
  aula: '#e8dcc8',
  bano: '#cfe3ea',
  cafeteria: '#f0d9b5',
  biblioteca: '#dccdae',
  sala: '#d8c9e0',
}

const WALL = '#7a6a58'
const WALL_TOP = '#8d7c68'

/** Casillas por las que se puede caminar */
export function walkable(c: string, doorOpen: boolean) {
  return c === '.' || c === 'd' || (c === 'X' && doorOpen)
}

/** Nombre en inglés de cada objeto, se muestra al chocar con él */
export const VOCAB: Record<string, { en: string; es: string }> = {
  W: { en: 'window', es: 'ventana' },
  B: { en: 'board', es: 'pizarra' },
  D: { en: 'desk and chair', es: 'pupitre y silla' },
  T: { en: 'toilet', es: 'inodoro' },
  S: { en: 'sink', es: 'lavamanos' },
  K: { en: 'table', es: 'mesa' },
  V: { en: 'vending machine', es: 'máquina expendedora' },
  L: { en: 'bookshelf', es: 'estantería' },
  p: { en: 'plant', es: 'planta' },
  M: { en: "teacher's desk", es: 'escritorio del profesor' },
  '#': { en: 'wall', es: 'pared' },
}

export function Tile({ c, x, y, floor, doorOpen }: { c: string; x: number; y: number; floor: string; doorOpen: boolean }) {
  const X = x * T
  const Y = y * T
  const base = <rect x={X} y={Y} width={T} height={T} fill={floor} stroke="rgba(0,0,0,0.05)" />

  switch (c) {
    case '#':
      return (
        <g>
          <rect x={X} y={Y} width={T} height={T} fill={WALL} />
          <rect x={X} y={Y} width={T} height={6} fill={WALL_TOP} />
        </g>
      )
    case 'W':
      return (
        <g>
          <rect x={X} y={Y} width={T} height={T} fill={WALL} />
          <rect x={X + 6} y={Y + 4} width={T - 12} height={T - 8} fill="#9fd3f0" stroke="#e8e8e8" strokeWidth="2" />
          <line x1={X + T / 2} y1={Y + 4} x2={X + T / 2} y2={Y + T - 4} stroke="#e8e8e8" strokeWidth="1.5" />
        </g>
      )
    case 'B':
      return (
        <g>
          <rect x={X} y={Y} width={T} height={T} fill={WALL} />
          <rect x={X} y={Y + 6} width={T} height={T - 10} fill="#7a5230" />
          <rect x={X} y={Y + 9} width={T} height={T - 16} fill="#2f5d50" />
          <line x1={X + 6} y1={Y + 14} x2={X + 22} y2={Y + 14} stroke="#f4efe4" strokeOpacity="0.7" strokeWidth="1.2" />
          <line x1={X + 4} y1={Y + 19} x2={X + 16} y2={Y + 19} stroke="#f4efe4" strokeOpacity="0.5" strokeWidth="1.2" />
        </g>
      )
    case 'X':
      return doorOpen ? (
        <g>
          {base}
          <rect x={X} y={Y + 2} width={T} height={T - 4} fill="rgba(0,0,0,0.12)" />
        </g>
      ) : (
        <g>
          <rect x={X} y={Y} width={T} height={T} fill="#8b5a2b" />
          <rect x={X + 3} y={Y + 3} width={T - 6} height={T - 6} fill="none" stroke="#6b4423" strokeWidth="2" />
          <rect x={X + 11} y={Y + 12} width="10" height="9" rx="1.5" fill="#e0a526" />
          <path d={`M${X + 13} ${Y + 12} V${Y + 9.5} a3 3 0 0 1 6 0 V${Y + 12}`} fill="none" stroke="#e0a526" strokeWidth="1.8" />
        </g>
      )
    case 'd':
      return (
        <g>
          {base}
          <rect x={X} y={Y + 2} width={T} height={T - 4} fill="rgba(0,0,0,0.07)" />
        </g>
      )
    case 'D':
      return (
        <g>
          {base}
          <rect x={X + 4} y={Y + 3} width={T - 8} height={15} rx="2" fill="#a8743f" />
          <rect x={X + 4} y={Y + 3} width={T - 8} height={3} rx="1" fill="#bf8a52" />
          <rect x={X + 10} y={Y + 21} width={12} height={8} rx="2" fill="#5a5a5a" />
        </g>
      )
    case 'M':
      return (
        <g>
          {base}
          <rect x={X} y={Y + 6} width={T} height={18} fill="#6b4423" />
          <rect x={X} y={Y + 6} width={T} height={4} fill="#80542e" />
          {x % 2 === 0 && <rect x={X + 10} y={Y + 11} width={10} height={7} fill="#f4efe4" />}
        </g>
      )
    case 'T':
      return (
        <g>
          {base}
          <rect x={X + 9} y={Y + 2} width={14} height={8} rx="2" fill="#fff" stroke="#999" strokeWidth="0.6" />
          <ellipse cx={X + 16} cy={Y + 19} rx={8} ry={10} fill="#fff" stroke="#999" strokeWidth="0.6" />
          <ellipse cx={X + 16} cy={Y + 20} rx={4.5} ry={6} fill="#cfe3ea" />
        </g>
      )
    case 'S':
      return (
        <g>
          {base}
          <rect x={X + 4} y={Y + 3} width={T - 8} height={18} rx="3" fill="#fff" stroke="#999" strokeWidth="0.6" />
          <ellipse cx={X + 16} cy={Y + 12} rx={7} ry={5} fill="#9fd3f0" />
          <rect x={X + 15} y={Y + 1} width={2} height={6} fill="#999" />
        </g>
      )
    case 'K':
      return (
        <g>
          {base}
          <circle cx={X + 16} cy={Y + 16} r={12} fill="#c98b4a" />
          <circle cx={X + 16} cy={Y + 16} r={12} fill="none" stroke="#a8743f" strokeWidth="1.5" />
          <circle cx={X + 12} cy={Y + 13} r={3.5} fill="#fff" />
          <circle cx={X + 21} cy={Y + 19} r={2.5} fill="#d64545" />
        </g>
      )
    case 'V':
      return (
        <g>
          {base}
          <rect x={X + 2} y={Y + 2} width={T - 4} height={T - 6} rx="2" fill="#b0b0b0" />
          <rect x={X + 5} y={Y + 5} width={T - 10} height={14} fill="#3a3a3a" />
          <rect x={X + 7} y={Y + 7} width={5} height={4} fill="#d64545" />
          <rect x={X + 14} y={Y + 7} width={5} height={4} fill="#e0a526" />
          <rect x={X + 21} y={Y + 7} width={4} height={4} fill="#3b9d5d" />
          <rect x={X + 7} y={Y + 13} width={5} height={4} fill="#5d8fd4" />
          <rect x={X + 14} y={Y + 13} width={5} height={4} fill="#d4537e" />
        </g>
      )
    case 'L':
      return (
        <g>
          {base}
          <rect x={X + 1} y={Y + 1} width={T - 2} height={T - 6} fill="#6b4423" />
          {['#c0504d', '#3b6fb6', '#e0a526', '#3b9d5d', '#7a4fa3'].map((col, k) => (
            <rect key={k} x={X + 4 + k * 5} y={Y + 4} width={4} height={18 - (k % 2) * 3} fill={col} />
          ))}
        </g>
      )
    case 'p':
      return (
        <g>
          {base}
          <rect x={X + 10} y={Y + 18} width={12} height={11} rx="2" fill="#a8743f" />
          <circle cx={X + 16} cy={Y + 12} r={8} fill="#3b9d5d" />
          <circle cx={X + 11} cy={Y + 15} r={5} fill="#2f8a4e" />
          <circle cx={X + 21} cy={Y + 15} r={5} fill="#2f8a4e" />
        </g>
      )
    default:
      return base
  }
}

export function Chest({ x, y }: { x: number; y: number }) {
  const X = x * T
  const Y = y * T
  return (
    <g>
      <ellipse cx={X + 16} cy={Y + 28} rx={11} ry={2.5} fill="rgba(0,0,0,0.18)" />
      <rect x={X + 5} y={Y + 10} width={22} height={17} rx="2" fill="#d4a017" />
      <rect x={X + 5} y={Y + 10} width={22} height={6} rx="2" fill="#e8b830" />
      <rect x={X + 5} y={Y + 16} width={22} height={2.5} fill="#8a6210" />
      <rect x={X + 14} y={Y + 15} width={4} height={5} rx="1" fill="#8a6210" />
    </g>
  )
}
