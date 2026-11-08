import type { ReactNode } from 'react'
import type { PredictContent } from '../components/Predict'
import type { SpriteLook } from '../components/Sprite'
import { SpriteBody } from '../components/Sprite'

/**
 * B1-08 · Game Day, bloque B (las gradas, data/b1Stands.ts): Predict "Before the match" (components/Predict.tsx con la prop content).
 * will y going to con fútbol. Cada escena es un SVG pequeño (200 × 150) hecho con formas simples y SpriteBody.
 */
const ANA: SpriteLook = { shirt: '#1f5fa8', hair: '#6b3a2a', skin: '#e6b894', gender: 'female' }
const JULIAN: SpriteLook = { shirt: '#1f5fa8', hair: '#3a2a1a', skin: '#d9a37a', gender: 'male' }
const ILVA: SpriteLook = { shirt: '#c0392b', hair: '#8a5a32', skin: '#e6b894', gender: 'female' }
const FAN_A: SpriteLook = { shirt: '#e0873a', hair: '#2a1c14', skin: '#c68e6a', gender: 'female' }
const FAN_B: SpriteLook = { shirt: '#3b9d5d', hair: '#1f1f1f', skin: '#e0ac69', gender: 'male' }
const PLAYER_B: SpriteLook = { shirt: '#1f5fa8', hair: '#1f1f1f', skin: '#c68642', gender: 'male' }
const PLAYER_C: SpriteLook = { shirt: '#1f5fa8', hair: '#a8502e', skin: '#f1c27d', gender: 'female' }

const person = (look: SpriteLook, x: number, y: number, k = 2) => (
  <g transform={`translate(${x} ${y}) scale(${k})`}>
    <SpriteBody look={look} />
  </g>
)
const sky = (dark = false) => <rect width="200" height="150" fill={dark ? '#6c7682' : '#cfe9f5'} />
const stands = (y = 40) => (
  <g>
    <rect y={y} width="200" height="30" fill="#5a5f6e" />
    {[0, 1, 2].map((row) => (
      <rect key={row} y={y + 2 + row * 10} width="200" height="2" fill="#474b58" />
    ))}
  </g>
)
const pitch = (y = 70) => (
  <g>
    <rect y={y} width="200" height={150 - y} fill="#4f9a48" />
    <rect y={y + 18} width="200" height="10" fill="#58a651" />
    <rect y={y + 46} width="200" height="10" fill="#58a651" />
  </g>
)
const ball = (x: number, y: number, r = 6) => (
  <g>
    <circle cx={x} cy={y} r={r} fill="#ffffff" stroke="#222" strokeWidth="1" />
    <circle cx={x} cy={y} r={r / 3} fill="#222" />
  </g>
)
const goal = (x: number, y: number) => (
  <g>
    <rect x={x} y={y} width="34" height="28" fill="none" stroke="#ffffff" strokeWidth="3" />
    {[8, 16, 24].map((d) => (
      <line key={d} x1={x + d} y1={y} x2={x + d} y2={y + 28} stroke="#ffffff" strokeOpacity="0.4" />
    ))}
  </g>
)
const umbrella = (x: number, y: number, color: string) => (
  <g>
    <path d={`M${x - 14} ${y} Q${x} ${y - 16} ${x + 14} ${y} Z`} fill={color} />
    <line x1={x} y1={y} x2={x} y2={y + 18} stroke="#333" strokeWidth="1.5" />
  </g>
)

const scene = (node: ReactNode) => node

export const B1_08_PREDICT: PredictContent = {
  title: 'Before the match',
  intro: { en: 'Look at the picture and say what is going to happen.', es: 'Mira el dibujo y di qué va a pasar.' },
  rounds: [
    {
      es: 'Ana corre sola con el balón frente al arco vacío.',
      scene: scene(
        <g>
          {sky()}
          {stands(20)}
          {pitch(50)}
          {goal(150, 70)}
          {person(ANA, 60, 72, 2.2)}
          {ball(140, 136)}
          <path d="M40 100 h14 M36 110 h16 M40 120 h14" stroke="#ffffff" strokeOpacity="0.7" strokeWidth="2" />
        </g>,
      ),
      options: ['She going to score!', "She's going to score!", "She's go to score!"],
      answer: 1,
      tip: 'Hay señales claras: is going to + verbo.',
    },
    {
      es: 'Hay nubes negras sobre el estadio y los hinchas abren paraguas.',
      scene: scene(
        <g>
          {sky(true)}
          {[20, 80, 140].map((x) => (
            <g key={x}>
              <ellipse cx={x + 10} cy="22" rx="30" ry="14" fill="#3f444c" />
              <ellipse cx={x + 30} cy="16" rx="22" ry="12" fill="#4d535b" />
            </g>
          ))}
          {stands(50)}
          {pitch(80)}
          {person(FAN_A, 30, 70, 1.8)}
          {person(FAN_B, 90, 70, 1.8)}
          {person(FAN_A, 150, 70, 1.8)}
          {umbrella(59, 72, '#d4537e')}
          {umbrella(119, 72, '#5d8fd4')}
          {umbrella(179, 72, '#e8c95a')}
        </g>,
      ),
      options: ["It's going to rain.", 'It going to rain.', "It's going to rains."],
      answer: 0,
      tip: "Hay señales: It's going to + verbo base.",
    },
    {
      es: 'El balón viene alto, directo hacia la cámara del comentarista.',
      scene: scene(
        <g>
          {sky()}
          {stands(60)}
          {pitch(90)}
          <rect x="130" y="20" width="62" height="44" rx="3" fill="#6b3fa0" />
          <rect x="136" y="26" width="50" height="22" fill="#cfe9f5" />
          <rect x="146" y="34" width="20" height="12" rx="2" fill="#2d2d3a" />
          <circle cx="146" cy="40" r="5" fill="#2d2d3a" />
          <circle cx="146" cy="40" r="2.5" fill="#5d8fd4" />
          {ball(90, 50, 8)}
          <path d="M40 110 Q60 70 78 56" fill="none" stroke="#ffffff" strokeDasharray="4 4" strokeWidth="2" />
        </g>,
      ),
      options: ['The ball is go to hit the camera!', 'The ball going to hit the camera!', 'The ball is going to hit the camera!'],
      answer: 2,
      tip: 'Hay señales: is going to + verbo base.',
    },
    {
      es: 'Julian piensa antes del partido: no sabe qué pasará, pero cree que su equipo es fuerte.',
      scene: scene(
        <g>
          {sky()}
          {stands(40)}
          {pitch(70)}
          {person(JULIAN, 30, 72, 2.4)}
          <circle cx="100" cy="74" r="4" fill="#ffffff" />
          <circle cx="110" cy="62" r="6" fill="#ffffff" />
          <ellipse cx="150" cy="40" rx="42" ry="28" fill="#ffffff" />
          <path d="M138 26 h24 v10 q0 14 -12 16 q-12 -2 -12 -16 Z" fill="#e8c95a" />
          <rect x="146" y="52" width="8" height="6" fill="#e8c95a" />
          <rect x="140" y="58" width="20" height="4" fill="#c9a83a" />
          <text x="176" y="44" fontSize="16" fontWeight="bold" fill="#6b3fa0">?</text>
        </g>,
      ),
      options: ['I think we will to win the final.', 'I think we will win the final.', 'I think we wills win the final.'],
      answer: 1,
      tip: 'Una opinión sobre el futuro: I think + will + verbo base.',
    },
    {
      es: 'Hace frío en las gradas. Una hincha tiembla frente al puesto de bufandas y decide en ese momento.',
      scene: scene(
        <g>
          {sky(true)}
          {stands(30)}
          <rect y="60" width="200" height="90" fill="#7a7f8c" />
          <rect x="110" y="76" width="80" height="40" fill="#8a5a32" />
          <rect x="110" y="70" width="80" height="8" fill="#6b4426" />
          {[118, 136, 154, 172].map((x, k) => (
            <g key={x}>
              <rect x={x} y="82" width="10" height="28" fill={k % 2 ? '#c0392b' : '#1f5fa8'} />
              <rect x={x} y="90" width="10" height="4" fill="#ffffff" />
              <rect x={x} y="100" width="10" height="4" fill="#ffffff" />
            </g>
          ))}
          {person(FAN_A, 30, 72, 2.4)}
          <path d="M22 88 l4 -4 l4 4 l4 -4 M98 88 l4 -4 l4 4 l4 -4" stroke="#cfe9f5" strokeWidth="2" fill="none" />
          {[20, 60, 100, 150].map((x) => <circle key={x} cx={x} cy={x % 3 ? 14 : 22} r="2" fill="#ffffff" />)}
        </g>,
      ),
      options: ["I'll to buy a scarf.", 'I buy will a scarf.', "I'll buy a scarf."],
      answer: 2,
      tip: "Decisión en el momento: will + verbo base (I'll buy).",
    },
    {
      es: 'La entrenadora Ilva promete algo al equipo después de la final.',
      scene: scene(
        <g>
          {sky()}
          {stands(30)}
          {pitch(60)}
          {person(ILVA, 20, 70, 2.4)}
          {person(JULIAN, 100, 84, 1.8)}
          {person(PLAYER_B, 130, 84, 1.8)}
          {person(PLAYER_C, 160, 84, 1.8)}
          <ellipse cx="70" cy="36" rx="30" ry="18" fill="#ffffff" />
          <path d="M60 52 l-6 12 l14 -10 Z" fill="#ffffff" />
          {[
            [56, 30, '#c0392b'],
            [70, 40, '#1f5fa8'],
            [84, 30, '#e8c95a'],
          ].map(([x, y, c]) => (
            <path key={`${x}`} d={`M${x} ${Number(y) - 6} l2 4 l4 0 l-3 3 l1 4 l-4 -2 l-4 2 l1 -4 l-3 -3 l4 0 Z`} fill={String(c)} />
          ))}
        </g>,
      ),
      options: ["We'll celebrate tomorrow!", "We'll celebrating tomorrow!", 'We celebrate will tomorrow!'],
      answer: 0,
      tip: 'Una promesa: will + verbo base.',
    },
  ],
}
