import type { ReactNode } from 'react'
import type { LessonStep } from '../game/types'
import { L_HAND, L_INK } from './Diary'
import { Tappable } from './Words'

/**
 * Cuaderno de L (B1, recuerdos 3, 5 y 7): la variante de la lección (components/Lesson.tsx) para los pasos 'notebook'.
 * Una página de papel con renglones, la letra a mano del Diario de L, tachones con ~~texto~~ (no se tocan ni se leen),
 * el encabezado fijo "Cuaderno · página N" y una marca de tinta. Sin retrato de nadie.
 * Una lección es de cuaderno si su tarea tiene notebookPage (data/tasks.ts).
 */

/** Lo que se lee en voz alta: sin los tachones */
export const notebookSay = (text: string) => text.replace(/~~[^~]*~~/g, '').replace(/\s{2,}/g, ' ').trim()

/** Texto escrito a mano: las palabras se pueden tocar; ~~así~~ se ve tachado */
export function NotebookText({ text }: { text: string }) {
  return (
    <>
      {text.split(/(~~[^~]*~~)/).map((part, j) =>
        part.startsWith('~~') && part.endsWith('~~') ? (
          <span key={j} className="mr-1 line-through decoration-2 opacity-70" style={{ textDecorationColor: L_INK }} aria-hidden="true">
            {part.slice(2, -2)}
          </span>
        ) : (
          part && <Tappable key={j} text={part} />
        ),
      )}
    </>
  )
}

/** Tabla escrita a mano en la página (texto plano, sin colores) */
export function NotebookTable({ table }: { table: NonNullable<LessonStep['table']> }) {
  return (
    <table className="mt-2 w-full border-collapse text-left text-[16px]">
      {table.head && (
        <thead>
          <tr>
            {table.head.map((h, k) => (
              <th key={k} className="border-b-2 px-1 pb-1 font-normal underline decoration-1 underline-offset-4" style={{ borderColor: `${L_INK}55` }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
      )}
      <tbody>
        {table.rows.map((r, k) => (
          <tr key={k} style={{ transform: `rotate(${k % 2 ? 0.3 : -0.3}deg)` }}>
            {r.map((c, j) => (
              <td key={j} className={`px-1 py-1 align-top ${j ? 'border-l' : ''}`} style={{ borderColor: `${L_INK}33` }}>
                {j > 0 && table.head && <span aria-hidden="true">→ </span>}
                <NotebookText text={c} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

/** La página: papel con renglones, letra a mano, encabezado "Cuaderno · página N" y una marca de tinta */
export function NotebookPage({ page, children }: { page: number; children: ReactNode }) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl border-2 border-[#b9a98a] bg-[#efe6d2] py-4 pl-9 pr-5 shadow-inner"
      style={{ color: L_INK, fontFamily: L_HAND, backgroundImage: 'repeating-linear-gradient(transparent 0 30px, rgba(90,110,160,0.18) 30px 31px)' }}
    >
      {/* Margen rojo del cuaderno */}
      <div className="pointer-events-none absolute bottom-0 left-6 top-0 w-px bg-[#c0605a]/50" aria-hidden="true" />
      {/* Marca de tinta */}
      <svg className="pointer-events-none absolute right-3 top-2 h-9 w-12 opacity-70" viewBox="0 0 46 34" aria-hidden="true">
        <path d="M14 8 Q22 2 30 7 Q40 6 38 16 Q44 24 34 27 Q28 33 20 28 Q8 31 9 21 Q3 13 14 8 Z" fill={L_INK} opacity="0.8" />
        <circle cx="40" cy="8" r="2" fill={L_INK} opacity="0.7" />
        <circle cx="6" cy="27" r="1.4" fill={L_INK} opacity="0.6" />
      </svg>
      <p className="mb-2 pr-14 text-sm opacity-75" style={{ transform: 'rotate(-1deg)' }}>Cuaderno · página {page}</p>
      {children}
    </div>
  )
}

/** El cuaderno abierto sobre el escritorio, en el mapa (32×32, como la tablilla de la tarea 0-C) */
export function NotebookIcon({ lit }: { lit: boolean }) {
  return (
    <g>
      <ellipse cx="16" cy="27" rx="12" ry="2.2" fill="rgba(0,0,0,0.2)" />
      <path d="M4 10 Q10 7 16 10 V26 Q10 23 4 26 Z" fill="#efe6d2" stroke={lit ? '#e0b84a' : '#8a7a5c'} strokeWidth="1.2" />
      <path d="M28 10 Q22 7 16 10 V26 Q22 23 28 26 Z" fill="#f6efe0" stroke={lit ? '#e0b84a' : '#8a7a5c'} strokeWidth="1.2" />
      <path d="M7 14 Q10 13 13 14 M7 17.5 Q10 16.5 13 17.5 M7 21 Q9 20 11 21 M19 14 Q22 13 25 14 M19 17.5 Q22 16.5 24 17.5" stroke="#3a2f5c" strokeWidth="0.9" fill="none" strokeLinecap="round" />
      <path d="M21 19 L26 22.5" stroke="#3a2f5c" strokeWidth="1.4" strokeLinecap="round" />
    </g>
  )
}
