/**
 * Animales de la granja dibujados en una caja de 32x32 (miran a la derecha).
 * Se usan en el mapa, en los combates (esbirros) y en los juegos de la granja.
 */
import type { AnimalKind } from '../game/types'
export type { AnimalKind }

export const ANIMALS: Record<AnimalKind, { en: string; plural: string; es: string; sound: string }> = {
  cow: { en: 'cow', plural: 'cows', es: 'vaca', sound: 'Moo!' },
  horse: { en: 'horse', plural: 'horses', es: 'caballo', sound: 'Neigh!' },
  sheep: { en: 'sheep', plural: 'sheep', es: 'oveja', sound: 'Baa!' },
  pig: { en: 'pig', plural: 'pigs', es: 'cerdo', sound: 'Oink!' },
  chicken: { en: 'chicken', plural: 'chickens', es: 'gallina', sound: 'Cluck!' },
  duck: { en: 'duck', plural: 'ducks', es: 'pato', sound: 'Quack!' },
  goose: { en: 'goose', plural: 'geese', es: 'ganso', sound: 'Honk!' },
  dog: { en: 'dog', plural: 'dogs', es: 'perro', sound: 'Woof!' },
  cat: { en: 'cat', plural: 'cats', es: 'gato', sound: 'Meow!' },
  rabbit: { en: 'rabbit', plural: 'rabbits', es: 'conejo', sound: '...' },
  mouse: { en: 'mouse', plural: 'mice', es: 'ratón', sound: 'Squeak!' },
}

function Eye({ x, y, hurt }: { x: number; y: number; hurt?: boolean }) {
  return hurt ? (
    <path d={`M${x - 1.2} ${y - 1.2} l2.4 2.4 M${x + 1.2} ${y - 1.2} l-2.4 2.4`} stroke="#2d2d3a" strokeWidth="0.8" strokeLinecap="round" />
  ) : (
    <circle cx={x} cy={y} r="1.1" fill="#2d2d3a" />
  )
}

export function AnimalSprite({ kind, hurt }: { kind: AnimalKind; hurt?: boolean }) {
  const shadow = <ellipse cx="16" cy="30" rx="10" ry="2.2" fill="rgba(0,0,0,0.18)" />
  switch (kind) {
    case 'cow':
      return (
        <g>
          {shadow}
          {[8, 12, 19, 23].map((x) => <rect key={x} x={x} y="22" width="2.6" height="8" fill="#3a3a3a" />)}
          <rect x="6" y="12" width="20" height="12" rx="4" fill="#f4efe4" />
          <ellipse cx="11" cy="16" rx="3.5" ry="2.6" fill="#2d2d3a" />
          <ellipse cx="20" cy="19" rx="3" ry="2.2" fill="#2d2d3a" />
          <rect x="22" y="7" width="8" height="9" rx="3" fill="#f4efe4" />
          <rect x="24" y="12.5" width="6.5" height="4.5" rx="2" fill="#e8a7b5" />
          <path d="M23 7 l-1.5 -3 M29 7 l1.5 -3" stroke="#d9c9a0" strokeWidth="1.5" strokeLinecap="round" />
          <Eye x={25} y={10} hurt={hurt} />
          <path d="M6 14 q-3 4 -1 8" fill="none" stroke="#f4efe4" strokeWidth="1.3" />
        </g>
      )
    case 'horse':
      return (
        <g>
          {shadow}
          {[8, 12, 19, 23].map((x) => <rect key={x} x={x} y="20" width="2.6" height="10" fill="#6b4423" />)}
          <rect x="6" y="11" width="20" height="11" rx="4" fill="#a0662e" />
          <path d="M21 13 L25 3 L30 5 L29 12 L26 14 Z" fill="#a0662e" />
          <path d="M22 5 L24 2 L26 12 L22 14 Z" fill="#3b2a1a" />
          <path d="M6 13 q-4 4 -2 10" fill="none" stroke="#3b2a1a" strokeWidth="2" />
          <Eye x={27} y={6.5} hurt={hurt} />
        </g>
      )
    case 'sheep':
      return (
        <g>
          {shadow}
          {[10, 13, 19, 22].map((x) => <rect key={x} x={x} y="22" width="2.2" height="8" fill="#2d2d3a" />)}
          {[9, 14, 19, 23, 11, 17, 21].map((x, k) => (
            <circle key={k} cx={x} cy={k < 4 ? 15 : 20} r="5" fill="#f4efe4" />
          ))}
          <ellipse cx="26" cy="14" rx="3.6" ry="4.2" fill="#2d2d3a" />
          <Eye x={27} y={13} hurt={hurt} />
          <ellipse cx="24" cy="11" rx="2" ry="1" fill="#2d2d3a" />
        </g>
      )
    case 'pig':
      return (
        <g>
          {shadow}
          {[9, 13, 19, 23].map((x) => <rect key={x} x={x} y="22" width="2.6" height="7" fill="#d98c9c" />)}
          <ellipse cx="16" cy="18" rx="11" ry="7" fill="#f2a7b5" />
          <ellipse cx="27" cy="18" rx="3" ry="3.4" fill="#e88aa0" />
          <circle cx="26.5" cy="17.5" r="0.6" fill="#a35a6a" />
          <circle cx="28" cy="18.5" r="0.6" fill="#a35a6a" />
          <path d="M21 11 l2 -3 l2 3 Z" fill="#e88aa0" />
          <Eye x={23} y={15} hurt={hurt} />
          <path d="M5 16 q-2 -2 0 -3" fill="none" stroke="#e88aa0" strokeWidth="1.2" />
        </g>
      )
    case 'chicken':
      return (
        <g>
          {shadow}
          <path d="M14 25 v4 M18 25 v4" stroke="#e0a526" strokeWidth="1.3" />
          <ellipse cx="15" cy="20" rx="8" ry="6" fill="#f4efe4" />
          <circle cx="22" cy="12" r="4.2" fill="#f4efe4" />
          <path d="M20 8 q1 -3 2 0 q1 -3 2 0" fill="#d64545" />
          <path d="M26 12 l3 1 l-3 1 Z" fill="#e0a526" />
          <path d="M23 15 q1 3 -1 3" fill="#d64545" />
          <path d="M11 18 q4 4 8 1" fill="none" stroke="#d9cfbd" strokeWidth="1.2" />
          <Eye x={23} y={11.5} hurt={hurt} />
        </g>
      )
    case 'duck':
      return (
        <g>
          {shadow}
          <path d="M14 25 v4 M18 25 v4" stroke="#e0a526" strokeWidth="1.3" />
          <ellipse cx="15" cy="21" rx="9" ry="5.5" fill="#f2d16b" />
          <circle cx="22" cy="13" r="4" fill="#3b8a3e" />
          <path d="M25.5 13 l4 0.5 l-4 1.8 Z" fill="#e07b39" />
          <path d="M10 19 q4 4 9 1" fill="none" stroke="#d9b440" strokeWidth="1.2" />
          <Eye x={23} y={12} hurt={hurt} />
        </g>
      )
    case 'goose':
      return (
        <g>
          {shadow}
          <path d="M13 25 v4 M17 25 v4" stroke="#e07b39" strokeWidth="1.3" />
          <ellipse cx="14" cy="21" rx="9" ry="5.5" fill="#e8e8e8" />
          <path d="M19 19 q4 -4 3 -12" fill="none" stroke="#e8e8e8" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="22.5" cy="7" r="3" fill="#e8e8e8" />
          <path d="M25 7 l4 0.6 l-4 1.6 Z" fill="#e07b39" />
          <Eye x={23.3} y={6.2} hurt={hurt} />
        </g>
      )
    case 'dog':
      return (
        <g>
          {shadow}
          {[9, 13, 19, 22].map((x) => <rect key={x} x={x} y="21" width="2.4" height="8" fill="#8b5a2b" />)}
          <rect x="7" y="14" width="18" height="9" rx="4" fill="#b07a45" />
          <circle cx="25" cy="12" r="5" fill="#b07a45" />
          <path d="M22 8 q-2 6 1 7" fill="#6b4423" />
          <ellipse cx="29.5" cy="13.5" rx="1.4" ry="1.1" fill="#2d2d3a" />
          <path d="M7 16 q-3 -4 -2 -6" fill="none" stroke="#b07a45" strokeWidth="2" strokeLinecap="round" />
          <Eye x={26} y={11} hurt={hurt} />
        </g>
      )
    case 'cat':
      return (
        <g>
          {shadow}
          {[10, 13, 19, 22].map((x) => <rect key={x} x={x} y="22" width="2" height="7" fill="#7a7a7a" />)}
          <ellipse cx="16" cy="19" rx="9" ry="5" fill="#9a9a9a" />
          <circle cx="25" cy="13" r="4.5" fill="#9a9a9a" />
          <path d="M21.5 10 l0.5 -4 l3 3 Z M25.5 9 l3 -3 l0.5 4 Z" fill="#9a9a9a" />
          <path d="M7 18 q-4 -2 -3 -8" fill="none" stroke="#9a9a9a" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M27 14.5 h3 M27 15.5 l3 1" stroke="#5a5a5a" strokeWidth="0.4" />
          <Eye x={26} y={12.5} hurt={hurt} />
        </g>
      )
    case 'rabbit':
      return (
        <g>
          {shadow}
          <ellipse cx="15" cy="22" rx="8" ry="6" fill="#d9cfbd" />
          <circle cx="8" cy="21" r="2.2" fill="#f4efe4" />
          <circle cx="22" cy="16" r="4.2" fill="#d9cfbd" />
          <ellipse cx="20.5" cy="7" rx="1.5" ry="5" fill="#d9cfbd" />
          <ellipse cx="23.5" cy="7.5" rx="1.5" ry="5" fill="#d9cfbd" />
          <ellipse cx="23.5" cy="7.5" rx="0.6" ry="3.5" fill="#e8a7b5" />
          <Eye x={23.5} y={15} hurt={hurt} />
        </g>
      )
    case 'mouse':
      return (
        <g>
          <ellipse cx="16" cy="29" rx="6" ry="1.5" fill="rgba(0,0,0,0.18)" />
          <ellipse cx="15" cy="25" rx="6" ry="3.5" fill="#9a9a9a" />
          <circle cx="20" cy="22" r="2.4" fill="#b5b5b5" />
          <circle cx="21" cy="24.5" r="0.6" fill="#e8a7b5" />
          <path d="M9 26 q-5 1 -5 -3" fill="none" stroke="#e8a7b5" strokeWidth="0.8" />
          <Eye x={19.5} y={24} hurt={hurt} />
        </g>
      )
  }
}

export function AnimalIcon({ kind, size = 44, dim }: { kind: AnimalKind; size?: number; dim?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" style={dim ? { opacity: 0.25, filter: 'grayscale(1)' } : undefined}>
      <AnimalSprite kind={kind} />
    </svg>
  )
}
