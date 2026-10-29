import type { Zone } from '../game/types'

export const T = 32

export const FLOOR: Record<Zone, string> = {
  aula: '#e8dcc8',
  bano: '#cfe3ea',
  cafeteria: '#f0d9b5',
  biblioteca: '#dccdae',
  sala: '#d8c9e0',
  secretaria: '#d6e3cf',
  patio: '#8fbf6a',
  calle: '#d6d1c7',
  cafe: '#ecd2b0',
  tienda: '#eadff0',
  turismo: '#d9e6f0',
  'casa-leo': '#f0e0c8',
  'casa-maya': '#e3e8f5',
  parque: '#8fbf6a',
  casa: '#f3dcc6',
  granero: '#dcc08a',
  corral: '#c9a46a',
  campo: '#9cc46e',
  'casa-granja': '#efd9b8',
  recepcion: '#e6e1d6',
  oficina: '#d9dfe6',
  reuniones: '#e3dcef',
  direccion: '#efe2cc',
  'aula-vieja': '#c9a77a',
  'patio-viejo': '#c2a878',
  'direccion-vieja': '#b89a70',
  'calle-vieja': '#c9b48a',
  'tienda-vieja': '#d8bf94',
  correo: '#d9cdb4',
  mercado: '#cdb28a',
  obra: '#c9b48a',
  'casa-nueva': '#e8d3b0',
  caseta: '#cdb89a',
  'granero-viejo': '#d9bd85',
  'casa-vieja': '#e6d0a8',
  'campo-viejo': '#a9c47e',
  'sala-cine': '#5a3a4a',
  vestibulo: '#c9a77a',
  'oficina-cine': '#d8c2a0',
  'aula-futuro': '#e4eef5',
  'patio-futuro': '#9fcf8a',
  'direccion-futuro': '#d9e4ee',
  'calle-futuro': '#d9e2ea',
  'turismo-futuro': '#dce9f4',
}

const WALL = '#7a6a58'
const WALL_TOP = '#8d7c68'

/** Casillas por las que se puede caminar */
export function walkable(c: string, doorOpen: boolean) {
  return c === '.' || c === ',' || c === 'd' || c === '_' || c === 'z' || c === 'r' || (c === 'X' && doorOpen)
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
  F: { en: 'cabinet', es: 'archivador' },
  C: { en: 'counter', es: 'mostrador' },
  G: { en: 'goal', es: 'portería' },
  Y: { en: 'tree', es: 'árbol' },
  H: { en: 'bench', es: 'banca' },
  '#': { en: 'wall', es: 'pared' },
  '=': { en: 'road', es: 'calle (cruza por la cebra)' },
  P: { en: 'bus stop', es: 'parada de autobús' },
  U: { en: 'car', es: 'carro' },
  N: { en: 'fountain', es: 'fuente' },
  R: { en: 'clothes rack', es: 'perchero de ropa' },
  Q: { en: 'mirror', es: 'espejo' },
  O: { en: 'desk', es: 'escritorio' },
  A: { en: 'sofa', es: 'sofá' },
  J: { en: 'fridge', es: 'nevera' },
  k: { en: 'birthday cake', es: 'pastel de cumpleaños' },
  y: { en: 'hay', es: 'heno' },
  f: { en: 'fence', es: 'cerca' },
  w: { en: 'pond', es: 'estanque' },
  c: { en: 'corn', es: 'maíz' },
  b: { en: 'brick wall', es: 'pared de ladrillo' },
  I: { en: 'school bell', es: 'campana de la escuela' },
  u: { en: 'cart', es: 'carreta' },
  m: { en: 'market stall', es: 'puesto del mercado' },
  o: { en: 'well', es: 'pozo' },
  e: { en: 'phone box', es: 'cabina de teléfono' },
  g: { en: 'scaffolding', es: 'andamio' },
  a: { en: 'sand', es: 'arena' },
  x: { en: 'cement mixer', es: 'mezcladora de cemento' },
  n: { en: 'windmill', es: 'molino de viento' },
  v: { en: 'screen', es: 'pantalla' },
  s: { en: 'seats', es: 'butacas' },
  h: { en: 'poster', es: 'afiche' },
  j: { en: 'popcorn machine', es: 'máquina de palomitas' },
  l: { en: 'projector', es: 'proyector' },
  q: { en: 'glass wall', es: 'pared de vidrio' },
  i: { en: 'smart board', es: 'pizarra digital' },
  t: { en: 'cleaning robot', es: 'robot de limpieza' },
  E: { en: 'flying car', es: 'carro volador' },
  Z: { en: 'statue', es: 'estatua' },
  '1': { en: 'wind turbine', es: 'molino eólico' },
  '2': { en: 'solar panel', es: 'panel solar' },
  '3': { en: 'robot tractor', es: 'tractor robot' },
}

export function Tile({ c, x, y, floor, doorOpen, party = true, still = false }: { c: string; x: number; y: number; floor: string; doorOpen: boolean; party?: boolean; still?: boolean }) {
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
    case 'F':
      return (
        <g>
          {base}
          <rect x={X + 4} y={Y + 2} width={T - 8} height={T - 5} rx="2" fill="#8a8f96" />
          <rect x={X + 6} y={Y + 5} width={T - 12} height={7} fill="#9da3aa" />
          <rect x={X + 6} y={Y + 15} width={T - 12} height={7} fill="#9da3aa" />
          <rect x={X + 13} y={Y + 8} width={6} height={1.6} fill="#5f646b" />
          <rect x={X + 13} y={Y + 18} width={6} height={1.6} fill="#5f646b" />
        </g>
      )
    case 'C':
      return (
        <g>
          {base}
          <rect x={X} y={Y + 8} width={T} height={18} fill="#7a5230" />
          <rect x={X} y={Y + 8} width={T} height={4} fill="#93663f" />
          {x % 2 === 1 && (
            <>
              <rect x={X + 8} y={Y + 1} width={14} height={9} rx="1" fill="#2d2d3a" />
              <rect x={X + 9.5} y={Y + 2.5} width={11} height={6} fill="#9fd3f0" />
            </>
          )}
        </g>
      )
    case '_':
      return (
        <g>
          {base}
          <line x1={X} y1={Y + T - 0.5} x2={X + T} y2={Y + T - 0.5} stroke="rgba(0,0,0,0.08)" />
          <line x1={X + T - 0.5} y1={Y} x2={X + T - 0.5} y2={Y + T} stroke="rgba(0,0,0,0.08)" />
        </g>
      )
    case '=':
      return (
        <g>
          <rect x={X} y={Y} width={T} height={T} fill="#4f4f57" />
          {x % 2 === 0 && <rect x={X + 6} y={y % 2 === 0 ? Y + T - 2 : Y} width={18} height={2} fill="#f2d16b" opacity="0.8" />}
        </g>
      )
    case 'z':
      return (
        <g>
          <rect x={X} y={Y} width={T} height={T} fill="#4f4f57" />
          {[3, 11, 19, 27].map((k) => <rect key={k} x={X + 3} y={Y + k - 2} width={T - 6} height={4} fill="#f4efe4" />)}
        </g>
      )
    case 'U':
      return (
        <g>
          <rect x={X} y={Y} width={T} height={T} fill="#4f4f57" />
          <rect x={X + 2} y={Y + 7} width={T - 4} height={18} rx="5" fill="#c0392b" />
          <rect x={X + 8} y={Y + 9} width={T - 16} height={14} rx="2" fill="#9fd3f0" />
          <circle cx={X + 8} cy={Y + 26} r="3" fill="#222" />
          <circle cx={X + 24} cy={Y + 26} r="3" fill="#222" />
        </g>
      )
    case 'P':
      return (
        <g>
          {base}
          <rect x={X + 15} y={Y + 8} width={2.5} height={22} fill="#6b6b6b" />
          <rect x={X + 6} y={Y + 2} width={20} height={11} rx="2" fill="#2f6fd0" />
          <text x={X + 16} y={Y + 10.5} textAnchor="middle" fontSize="7" fontWeight="700" fill="#fff" fontFamily="Fredoka, Nunito, system-ui, sans-serif">BUS</text>
        </g>
      )
    case 'N':
      return (
        <g>
          {base}
          <rect x={X + 1} y={Y + 1} width={T - 2} height={T - 2} rx="6" fill="#9aa3ad" />
          <rect x={X + 4} y={Y + 4} width={T - 8} height={T - 8} rx="4" fill="#7cc4e6" />
          <circle cx={X + 16} cy={Y + 16} r="3" fill="#e8f6fc" />
        </g>
      )
    case 'R':
      return (
        <g>
          {base}
          <rect x={X + 3} y={Y + 6} width={T - 6} height={2} fill="#6b6b6b" />
          {['#d64545', '#2f6fd0', '#e0a526', '#3b9d5d'].map((col, k) => (
            <path key={k} d={`M${X + 5 + k * 6} ${Y + 8} h5 l1 14 h-7 z`} fill={col} />
          ))}
          <rect x={X + 3} y={Y + 26} width={T - 6} height={2} fill="#6b6b6b" />
        </g>
      )
    case 'Q':
      return (
        <g>
          {base}
          <rect x={X + 8} y={Y + 2} width={16} height={26} rx="3" fill="#b9dff0" stroke="#a8743f" strokeWidth="2" />
          <line x1={X + 12} y1={Y + 6} x2={X + 16} y2={Y + 12} stroke="#fff" strokeWidth="1.5" />
        </g>
      )
    case 'O':
      return (
        <g>
          {base}
          <rect x={X + 1} y={Y + 8} width={T - 2} height={16} fill="#5b7a99" />
          <rect x={X + 1} y={Y + 8} width={T - 2} height={3} fill="#6f8fae" />
          {x % 2 === 0 && <rect x={X + 9} y={Y + 2} width={14} height={9} rx="1" fill="#2d2d3a" />}
        </g>
      )
    case ',':
      return (
        <g>
          {base}
          <path d={`M${X + 6} ${Y + 20} l2 -5 l2 5 M${X + 20} ${Y + 10} l2 -5 l2 5 M${X + 14} ${Y + 28} l1.5 -4 l1.5 4`} fill="none" stroke="#6fa04d" strokeWidth="1.2" />
        </g>
      )
    case 'G':
      return (
        <g>
          {base}
          <rect x={X + 3} y={Y + 2} width={T - 6} height={T - 4} fill="none" stroke="#f4efe4" strokeWidth="3" />
          {[0, 1, 2, 3].map((k) => (
            <line key={k} x1={X + 5} y1={Y + 7 + k * 6} x2={X + T - 5} y2={Y + 7 + k * 6} stroke="#f4efe4" strokeOpacity="0.5" strokeWidth="0.8" />
          ))}
        </g>
      )
    case 'Y':
      return (
        <g>
          {base}
          <rect x={X + 13} y={Y + 18} width={6} height={11} fill="#7a5230" />
          <circle cx={X + 16} cy={Y + 12} r={11} fill="#3b8a3e" />
          <circle cx={X + 10} cy={Y + 15} r={6} fill="#2f7a33" />
          <circle cx={X + 22} cy={Y + 15} r={6} fill="#2f7a33" />
        </g>
      )
    case 'H':
      return (
        <g>
          {base}
          <rect x={X + 2} y={Y + 10} width={T - 4} height={7} rx="1" fill="#a8743f" />
          <rect x={X + 2} y={Y + 19} width={T - 4} height={4} rx="1" fill="#93663f" />
          <rect x={X + 4} y={Y + 23} width={3} height={6} fill="#5a5a5a" />
          <rect x={X + T - 7} y={Y + 23} width={3} height={6} fill="#5a5a5a" />
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
    case 'A':
      return (
        <g>
          {base}
          <rect x={X + 2} y={Y + 8} width={T - 4} height={18} rx="4" fill="#b5523b" />
          <rect x={X + 2} y={Y + 6} width={T - 4} height={8} rx="3" fill="#c8664e" />
          <rect x={X + 5} y={Y + 15} width={10} height={7} rx="2" fill="#d97c63" />
          <rect x={X + 17} y={Y + 15} width={10} height={7} rx="2" fill="#d97c63" />
        </g>
      )
    case 'J':
      return (
        <g>
          {base}
          <rect x={X + 7} y={Y + 1} width={18} height={29} rx="2" fill="#e8eef2" stroke="#b8c4cc" strokeWidth="1.2" />
          <line x1={X + 7} y1={Y + 11} x2={X + 25} y2={Y + 11} stroke="#b8c4cc" strokeWidth="1.2" />
          <rect x={X + 21} y={Y + 4} width={2} height={5} rx="1" fill="#8d9aa3" />
          <rect x={X + 21} y={Y + 14} width={2} height={7} rx="1" fill="#8d9aa3" />
        </g>
      )
    case 'k':
      return (
        <g>
          {base}
          <rect x={X + 1} y={Y + 9} width={T - 2} height={15} rx="2" fill="#f4efe4" stroke="#d64545" strokeWidth="1" strokeDasharray="3 2" />
          {!party ? null : y % 2 === 1 ? (
            <>
              <rect x={X + 8} y={Y + 4} width={16} height={11} rx="2" fill="#e88aa8" />
              <rect x={X + 8} y={Y + 4} width={16} height={3} rx="1" fill="#f4efe4" />
              <rect x={X + 15} y={Y} width={2} height={5} fill="#e0a526" />
            </>
          ) : (
            <>
              <rect x={X + 6} y={Y + 5} width={12} height={10} rx="1" fill="#2f6fd0" />
              <rect x={X + 11} y={Y + 5} width={2} height={10} fill="#e0a526" />
              <circle cx={X + 24} cy={Y + 10} r="4" fill="#3b9d5d" />
            </>
          )}
        </g>
      )
    case 'y':
      return (
        <g>
          {base}
          <rect x={X + 3} y={Y + 8} width={T - 6} height={18} rx="3" fill="#e8c95a" />
          <line x1={X + 3} y1={Y + 14} x2={X + T - 3} y2={Y + 14} stroke="#c9a83a" strokeWidth="1.2" />
          <line x1={X + 3} y1={Y + 20} x2={X + T - 3} y2={Y + 20} stroke="#c9a83a" strokeWidth="1.2" />
        </g>
      )
    case 'f':
      return (
        <g>
          {base}
          <rect x={X} y={Y + 10} width={T} height={3} fill="#a8743f" />
          <rect x={X} y={Y + 19} width={T} height={3} fill="#a8743f" />
          <rect x={X + 4} y={Y + 6} width={4} height={20} fill="#8b5a2b" />
          <rect x={X + 22} y={Y + 6} width={4} height={20} fill="#8b5a2b" />
        </g>
      )
    case 'w':
      return (
        <g>
          <rect x={X} y={Y} width={T} height={T} fill={floor} />
          <rect x={X} y={Y} width={T} height={T} rx="8" fill="#6fb6d9" />
          <path d={`M${X + 6} ${Y + 12} q4 -3 8 0 M${X + 16} ${Y + 22} q4 -3 8 0`} fill="none" stroke="#e8f6fc" strokeWidth="1.2" />
        </g>
      )
    case 'c':
      return (
        <g>
          {base}
          {[7, 16, 25].map((cx) => (
            <g key={cx}>
              <rect x={X + cx - 1} y={Y + 8} width={2} height={20} fill="#5f9a3c" />
              <ellipse cx={X + cx + 2.5} cy={Y + 14} rx="2" ry="4.5" fill="#e8c95a" />
              <path d={`M${X + cx} ${Y + 20} q-5 -2 -6 -7`} fill="none" stroke="#5f9a3c" strokeWidth="1.5" />
            </g>
          ))}
        </g>
      )
    case 'b':
      return (
        <g>
          <rect x={X} y={Y} width={T} height={T} fill="#a4553a" />
          {[0, 1, 2, 3].map((r) => (
            <g key={r}>
              <line x1={X} y1={Y + r * 8} x2={X + T} y2={Y + r * 8} stroke="#7d3f2a" strokeWidth="1.2" />
              <line x1={X + (r % 2 ? 8 : 16)} y1={Y + r * 8} x2={X + (r % 2 ? 8 : 16)} y2={Y + r * 8 + 8} stroke="#7d3f2a" strokeWidth="1.2" />
              {r % 2 === 1 && <line x1={X + 24} y1={Y + r * 8} x2={X + 24} y2={Y + r * 8 + 8} stroke="#7d3f2a" strokeWidth="1.2" />}
            </g>
          ))}
        </g>
      )
    case 'I':
      return (
        <g>
          {base}
          <rect x={X + 6} y={Y + 2} width={3} height={28} fill="#6b4423" />
          <rect x={X + 23} y={Y + 2} width={3} height={28} fill="#6b4423" />
          <rect x={X + 5} y={Y + 2} width={22} height={3} fill="#6b4423" />
          <path d={`M${X + 10} ${Y + 18} q6 -14 12 0 z`} fill="#c9a83a" stroke="#8a6210" strokeWidth="1" />
          <circle cx={X + 16} cy={Y + 19.5} r="1.6" fill="#8a6210" />
        </g>
      )
    case 'r':
      return (
        <g>
          <rect x={X} y={Y} width={T} height={T} fill="#b8946a" />
          <line x1={X} y1={Y + 9} x2={X + T} y2={Y + 9} stroke="#9c7a52" strokeWidth="1.5" strokeDasharray="5 4" />
          <line x1={X} y1={Y + 23} x2={X + T} y2={Y + 23} stroke="#9c7a52" strokeWidth="1.5" strokeDasharray="3 6" />
          <circle cx={X + ((x * 7 + y * 3) % 24) + 4} cy={Y + 16} r="1.4" fill="#8a6a46" />
        </g>
      )
    case 'u':
      return (
        <g>
          <rect x={X} y={Y} width={T} height={T} fill="#b8946a" />
          <rect x={X + 3} y={Y + 8} width={26} height={12} rx="2" fill="#8b5a2b" />
          <rect x={X + 3} y={Y + 6} width={26} height={4} fill="#a8743f" />
          <circle cx={X + 8} cy={Y + 23} r="5" fill="none" stroke="#5a3a1a" strokeWidth="2.2" />
          <circle cx={X + 24} cy={Y + 23} r="5" fill="none" stroke="#5a3a1a" strokeWidth="2.2" />
          <circle cx={X + 12} cy={Y + 6} r="3" fill="#d64545" />
          <circle cx={X + 19} cy={Y + 5} r="3" fill="#e8c95a" />
        </g>
      )
    case 'm':
      return (
        <g>
          {base}
          <rect x={X + 4} y={Y + 14} width={24} height={14} fill="#a8743f" />
          <rect x={X + 6} y={Y + 10} width={4} height={4} rx="2" fill="#d64545" />
          <rect x={X + 13} y={Y + 10} width={4} height={4} rx="2" fill="#e8c95a" />
          <rect x={X + 20} y={Y + 10} width={4} height={4} rx="2" fill="#5f9a3c" />
          <path d={`M${X + 1} ${Y + 9} L${X + 4} ${Y + 2} H${X + 28} L${X + 31} ${Y + 9} Z`} fill="#d64545" />
          <path d={`M${X + 9} ${Y + 2} L${X + 8} ${Y + 9} M${X + 16} ${Y + 2} V${Y + 9} M${X + 23} ${Y + 2} L${X + 24} ${Y + 9}`} stroke="#f4efe4" strokeWidth="2.5" />
        </g>
      )
    case 'o':
      return (
        <g>
          {base}
          <ellipse cx={X + 16} cy={Y + 22} rx="12" ry="6" fill="#8d8d8d" />
          <ellipse cx={X + 16} cy={Y + 20} rx="12" ry="6" fill="#a9a9a9" />
          <ellipse cx={X + 16} cy={Y + 20} rx="8" ry="3.5" fill="#3d6f8a" />
          <rect x={X + 5} y={Y + 3} width={2.5} height={17} fill="#6b4423" />
          <rect x={X + 24.5} y={Y + 3} width={2.5} height={17} fill="#6b4423" />
          <path d={`M${X + 3} ${Y + 5} L${X + 16} ${Y} L${X + 29} ${Y + 5} Z`} fill="#8b3a2b" />
        </g>
      )
    case 'e':
      return (
        <g>
          {base}
          <rect x={X + 7} y={Y + 1} width={18} height={29} rx="2" fill="#c0392b" />
          <rect x={X + 10} y={Y + 7} width={12} height={17} fill="#d9eef8" />
          <rect x={X + 13} y={Y + 13} width={6} height={6} rx="1" fill="#2d2d3a" />
          <rect x={X + 9} y={Y + 2.5} width={14} height={3} fill="#f4efe4" />
        </g>
      )
    case 'g':
      return (
        <g>
          {base}
          <rect x={X + 2} y={Y} width={3} height={T} fill="#8d8d8d" />
          <rect x={X + 27} y={Y} width={3} height={T} fill="#8d8d8d" />
          <rect x={X} y={Y + 6} width={T} height={3} fill="#a8743f" />
          <rect x={X} y={Y + 22} width={T} height={3} fill="#a8743f" />
          <line x1={X + 4} y1={Y + 9} x2={X + 28} y2={Y + 22} stroke="#8d8d8d" strokeWidth="1.5" />
          <rect x={X + 8} y={Y + 12} width={16} height={8} fill="#a4553a" opacity="0.8" />
        </g>
      )
    case 'a':
      return (
        <g>
          {base}
          <path d={`M${X + 2} ${Y + 28} Q${X + 16} ${Y + 2} ${X + 30} ${Y + 28} Z`} fill="#e3c98a" />
          <path d={`M${X + 9} ${Y + 20} q4 -2 8 0 M${X + 15} ${Y + 13} q3 -2 6 0`} fill="none" stroke="#c9a85e" strokeWidth="1.2" />
          <rect x={X + 21} y={Y + 8} width={2} height={16} fill="#6b4423" transform={`rotate(25 ${X + 22} ${Y + 16})`} />
        </g>
      )
    case 'x':
      return (
        <g>
          {base}
          <ellipse cx={X + 16} cy={Y + 14} rx="10" ry="9" fill="#e07b39" />
          <ellipse cx={X + 22} cy={Y + 9} rx="3.5" ry="3" fill="#5a3a1a" />
          <path d={`M${X + 9} ${Y + 10} l12 8 M${X + 8} ${Y + 15} l12 7`} stroke="#c0602a" strokeWidth="1.5" />
          <rect x={X + 6} y={Y + 23} width={20} height={3} fill="#5a5a5a" />
          <circle cx={X + 8} cy={Y + 28} r="3" fill="#2b2b2b" />
          <circle cx={X + 24} cy={Y + 28} r="3" fill="#2b2b2b" />
        </g>
      )
    case 'n':
      return (
        <g>
          {base}
          <path d={`M${X + 10} ${Y + 31} L${X + 13} ${Y + 10} H${X + 19} L${X + 22} ${Y + 31} Z`} fill="#c98b4a" stroke="#8b5a2b" strokeWidth="1" />
          <rect x={X + 14} y={Y + 22} width={4} height={9} fill="#5a3a1a" />
          <g className={still ? undefined : 'anim-spin-slow'} style={{ transformOrigin: `${X + 16}px ${Y + 10}px` }}>
            {[0, 90, 180, 270].map((a) => (
              <rect key={a} x={X + 14.5} y={Y - 8} width={3} height={18} fill="#f4efe4" stroke="#8b5a2b" strokeWidth="0.8" transform={`rotate(${a} ${X + 16} ${Y + 10})`} />
            ))}
          </g>
          <circle cx={X + 16} cy={Y + 10} r="2" fill="#5a3a1a" />
        </g>
      )
    case 'v':
      return (
        <g>
          <rect x={X} y={Y} width={T} height={T} fill="#2b1d24" />
          <rect x={X} y={Y + 6} width={T} height={T - 10} fill="#f4efe4" />
          <rect x={X} y={Y + 6} width={T} height={2} fill="#d9d2c4" />
        </g>
      )
    case 's':
      return (
        <g>
          {base}
          <rect x={X + 3} y={Y + 6} width={26} height={12} rx="4" fill="#a8323a" />
          <rect x={X + 3} y={Y + 16} width={26} height={8} rx="2" fill="#8a2830" />
          <line x1={X + 16} y1={Y + 6} x2={X + 16} y2={Y + 24} stroke="#5a1a20" strokeWidth="1.5" />
        </g>
      )
    case 'h':
      return (
        <g>
          <rect x={X} y={Y} width={T} height={T} fill="#7a6a58" />
          <rect x={X} y={Y} width={T} height={6} fill="#8d7c68" />
          <rect x={X + 6} y={Y + 7} width={20} height={22} fill={['#d64545', '#3b6fb6', '#e0a526'][(x + y) % 3]} stroke="#f4efe4" strokeWidth="1.5" />
          <circle cx={X + 16} cy={Y + 15} r="4" fill="#f4efe4" opacity="0.8" />
          <rect x={X + 9} y={Y + 22} width={14} height={3} fill="#f4efe4" opacity="0.8" />
        </g>
      )
    case 'j':
      return (
        <g>
          {base}
          <rect x={X + 7} y={Y + 4} width={18} height={18} rx="2" fill="#d64545" />
          <rect x={X + 9} y={Y + 6} width={14} height={12} fill="#fbe9a8" />
          {[0, 1, 2, 3, 4].map((k) => <circle key={k} cx={X + 11 + (k % 3) * 5} cy={Y + 10 + Math.floor(k / 3) * 4} r="2" fill="#fff6d6" />)}
          <rect x={X + 9} y={Y + 22} width={14} height={8} fill="#8b3a2b" />
        </g>
      )
    case 'l':
      return (
        <g>
          {base}
          <rect x={X + 6} y={Y + 12} width={20} height={12} rx="2" fill="#3a3a3a" />
          <circle cx={X + 12} cy={Y + 9} r="5" fill="none" stroke="#3a3a3a" strokeWidth="2.5" />
          <circle cx={X + 22} cy={Y + 9} r="5" fill="none" stroke="#3a3a3a" strokeWidth="2.5" />
          <rect x={X + 1} y={Y + 15} width={6} height={6} fill="#5a5a5a" />
          <path d={`M${X + 1} ${Y + 18} L${X - 10} ${Y + 10} L${X - 10} ${Y + 26} Z`} fill="#fff6d6" opacity="0.35" />
          <rect x={X + 10} y={Y + 24} width={12} height={6} fill="#5a5a5a" />
        </g>
      )
    case 'q':
      return (
        <g>
          <rect x={X} y={Y} width={T} height={T} fill="#8fb8cf" />
          <rect x={X + 2} y={Y + 2} width={T - 4} height={T - 4} fill="#cfe9f5" opacity="0.7" />
          <line x1={X + 6} y1={Y + 24} x2={X + 16} y2={Y + 6} stroke="#ffffff" strokeWidth="1.5" opacity="0.8" />
        </g>
      )
    case 'i':
      return (
        <g>
          <rect x={X} y={Y} width={T} height={T} fill="#8fb8cf" />
          <rect x={X} y={Y + 6} width={T} height={T - 10} fill="#1f3c58" />
          <rect x={X + 2} y={Y + 8} width={T - 4} height={T - 14} fill="#2f7fbf" opacity="0.7" />
          <line x1={X + 5} y1={Y + 13} x2={X + 25} y2={Y + 13} stroke="#7fe0ff" strokeWidth="1.2" />
          <line x1={X + 5} y1={Y + 18} x2={X + 18} y2={Y + 18} stroke="#7fe0ff" strokeWidth="1.2" opacity="0.7" />
        </g>
      )
    case 't':
      return (
        <g>
          {base}
          <ellipse cx={X + 16} cy={Y + 26} rx="10" ry="2.5" fill="rgba(0,0,0,0.15)" />
          <ellipse cx={X + 16} cy={Y + 20} rx="11" ry="6" fill="#c9d3dc" stroke="#7a8794" strokeWidth="1" />
          <ellipse cx={X + 16} cy={Y + 18} rx="7" ry="3" fill="#9aa6b2" />
          <circle cx={X + 12} cy={Y + 18} r="1.2" fill="#7fe0ff" />
          <circle cx={X + 20} cy={Y + 18} r="1.2" fill="#7fe0ff" />
        </g>
      )
    case 'E':
      return (
        <g>
          <rect x={X} y={Y} width={T} height={T} fill="#4f4f57" />
          <ellipse cx={X + 16} cy={Y + 28} rx="11" ry="2.5" fill="#7fe0ff" opacity="0.5" />
          <g className="anim-bob">
            <rect x={X + 2} y={Y + 8} width={T - 4} height={14} rx="7" fill="#5d8fd4" />
            <rect x={X + 9} y={Y + 5} width={T - 18} height={9} rx="4" fill="#cfe9f5" />
            <rect x={X + 4} y={Y + 18} width={6} height={3} rx="1.5" fill="#7fe0ff" />
            <rect x={X + 22} y={Y + 18} width={6} height={3} rx="1.5" fill="#7fe0ff" />
          </g>
        </g>
      )
    case 'Z':
      return (
        <g>
          {base}
          <rect x={X + 6} y={Y + 22} width={20} height={8} fill="#9a9a9a" />
          <rect x={X + 8} y={Y + 20} width={16} height={3} fill="#b5b5b5" />
          <circle cx={X + 16} cy={Y + 7} r="4.5" fill="#b5b5b5" />
          <path d={`M${X + 11} ${Y + 6} h10 v-2 h-10 z`} fill="#8d8d8d" />
          <rect x={X + 12} y={Y + 11} width={8} height={9} rx="2" fill="#a9a9a9" />
          <path d={`M${X + 20} ${Y + 13} l5 -4`} stroke="#a9a9a9" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      )
    case '1':
      return (
        <g>
          {base}
          <rect x={X + 15} y={Y + 8} width={2.5} height={23} fill="#e4eef5" stroke="#9aa6b2" strokeWidth="0.6" />
          <g className="anim-spin-slow" style={{ transformOrigin: `${X + 16}px ${Y + 8}px` }}>
            {[0, 120, 240].map((a) => <rect key={a} x={X + 15.2} y={Y - 6} width={1.8} height={14} rx="0.9" fill="#ffffff" stroke="#9aa6b2" strokeWidth="0.5" transform={`rotate(${a} ${X + 16} ${Y + 8})`} />)}
          </g>
          <circle cx={X + 16} cy={Y + 8} r="1.6" fill="#9aa6b2" />
        </g>
      )
    case '2':
      return (
        <g>
          {base}
          <path d={`M${X + 3} ${Y + 26} L${X + 8} ${Y + 8} H${X + 29} L${X + 24} ${Y + 26} Z`} fill="#1f3c58" stroke="#9aa6b2" strokeWidth="1" />
          <path d={`M${X + 6} ${Y + 17} H${X + 26} M${X + 13} ${Y + 8} L${X + 10} ${Y + 26} M${X + 21} ${Y + 8} L${X + 18} ${Y + 26}`} stroke="#5d8fd4" strokeWidth="0.8" />
          <rect x={X + 14} y={Y + 26} width={3} height={4} fill="#7a8794" />
        </g>
      )
    case '3':
      return (
        <g>
          {base}
          <rect x={X + 3} y={Y + 12} width={24} height={11} rx="3" fill="#e07b39" />
          <rect x={X + 16} y={Y + 5} width={10} height={9} rx="2" fill="#cfe9f5" stroke="#7a8794" strokeWidth="0.8" />
          <circle cx={X + 19} cy={Y + 9} r="1" fill="#1f3c58" />
          <circle cx={X + 23} cy={Y + 9} r="1" fill="#1f3c58" />
          <circle cx={X + 8} cy={Y + 25} r="5" fill="#2b2b2b" />
          <circle cx={X + 23} cy={Y + 26} r="4" fill="#2b2b2b" />
          <rect x={X + 6} y={Y + 9} width={2} height={4} fill="#7fe0ff" />
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
