import { useState } from 'react'
import { voiceOf } from '../game/speech'
import { sfx } from '../game/sfx'
import type { SpriteLook } from './Sprite'
import { SpriteIcon } from './Sprite'
import { SpeakButton } from './SpeakButton'
import { Tappable } from './Words'
import { btnGhost, btnPrimary, Panel } from './ui'

/** Tipo de cláusula: obligatoria (must / have to), prohibida (mustn't) o no obligatoria (don't have to / needn't) */
export type ClauseKind = 'must' | 'mustnt' | 'optional'
export type FineClause = { en: string; es: string; kind: ClauseKind; tip: string }
export type FinePrintContent = { title: string; intro: { en: string; es: string }; clauses: FineClause[]; finish: { en: string; es: string } }

/** Los tres sellos: además del color, cada uno tiene su forma (■ obligatorio, ✖ prohibido, ○ no es obligatorio) */
const STAMPS: Record<ClauseKind, { label: string; es: string; shape: string; color: string }> = {
  must: { label: 'MUST', es: 'obligatorio', shape: '■', color: '#2f6fb0' },
  mustnt: { label: "MUSTN'T", es: 'prohibido', shape: '✖', color: '#c0392b' },
  optional: { label: 'NOT NECESSARY', es: 'no es obligatorio', shape: '○', color: '#3b8f57' },
}
const ORDER: ClauseKind[] = ['must', 'mustnt', 'optional']

const PAPER = '#f6f0e1'
const INK = '#2b2620'

/**
 * The Fine Print (B1-04, residencia de Lumen Bay): una página de contrato con cláusulas numeradas.
 * Se toca una cláusula (se resalta) y se elige uno de los tres sellos. Acierto: el sello se estampa en la cláusula.
 * Error: no quita vida; la cláusula tiembla y aparece su pista. Las palabras se pueden tocar (diccionario) y cada
 * cláusula se puede escuchar. Al sellar todas: onClose(true, perfect) con perfect = sin errores.
 */
export function FinePrint({
  name,
  look,
  title,
  intro,
  clauses,
  finish,
  onClose,
}: FinePrintContent & {
  name: string
  look: SpriteLook
  onClose: (done: boolean, perfect: boolean) => void
}) {
  const [sealed, setSealed] = useState<boolean[]>(() => clauses.map(() => false))
  const [sel, setSel] = useState<number | null>(null)
  const [wrong, setWrong] = useState<{ k: number; n: number } | null>(null)
  const [last, setLast] = useState<number | null>(null)
  const [errors, setErrors] = useState(0)
  const [showEs, setShowEs] = useState(false)
  const [hint, setHint] = useState(false)
  const count = sealed.filter(Boolean).length
  const done = count === clauses.length
  const line = done ? finish : intro
  const tip = wrong && wrong.k === sel ? clauses[wrong.k].tip : null

  function pick(k: number) {
    if (done || sealed[k]) return
    setSel(k)
    setHint(false)
    if (wrong?.k !== k) setWrong(null)
  }

  function stamp(kind: ClauseKind) {
    if (done) return
    if (sel === null) {
      setHint(true)
      return
    }
    if (clauses[sel].kind === kind) {
      sfx('correct')
      const next = sealed.map((v, k) => v || k === sel)
      setSealed(next)
      setLast(sel)
      setWrong(null)
      // Sigue con la próxima cláusula sin sello
      const after = next.findIndex((v, k) => !v && k > sel)
      const nextSel = after >= 0 ? after : next.findIndex((v) => !v)
      setSel(nextSel >= 0 ? nextSel : null)
    } else {
      sfx('wrong')
      setErrors((e) => e + 1)
      setWrong({ k: sel, n: (wrong?.n ?? 0) + 1 })
    }
  }

  return (
    <Panel>
      <div className="flex items-center gap-3">
        <SpriteIcon look={look} size={48} />
        <div className="flex-1">
          <p className="font-display text-lg text-gold">{name}</p>
          <p className="text-xs text-paper/60">{title} · {count}/{clauses.length}</p>
        </div>
        <SpeakButton text={line.en} size="sm" auto voice={voiceOf(look)} />
      </div>
      <p key={line.en} className="anim-fade-in mt-2 text-[17px] leading-relaxed"><Tappable text={line.en} /></p>
      {showEs && <p className="mt-1 text-sm text-paper/60">{line.es}</p>}

      {/* La página del contrato */}
      <div className="mt-3 rounded-lg border-2 px-3 pb-4 pt-3 shadow-inner" style={{ background: PAPER, color: INK, borderColor: '#d8cbb0' }} role="group" aria-label={`Contrato: ${count} de ${clauses.length} cláusulas selladas`}>
        <p className="text-center font-display text-lg tracking-[0.2em]">RESIDENCE CONTRACT</p>
        <p className="mb-2 text-center text-[11px] uppercase tracking-wide opacity-60">Lumen Bay Student Residence</p>
        <ol className="grid gap-1.5">
          {clauses.map((c, k) => {
            const st = STAMPS[c.kind]
            const active = sel === k && !sealed[k]
            return (
              <li
                key={`${k}-${wrong?.k === k ? wrong.n : 0}`}
                onClick={() => pick(k)}
                className={`flex items-start gap-2 rounded-md px-1.5 py-1 transition ${sealed[k] ? '' : 'cursor-pointer'} ${active ? 'ring-2 ring-[#d9a93a]' : ''} ${wrong?.k === k ? 'anim-shake' : ''}`}
                style={{ background: active ? '#f1e2b8' : 'transparent' }}
              >
                <button
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-bold"
                  style={{ borderColor: `${INK}55`, background: active ? '#d9a93a' : 'transparent' }}
                  onClick={(e) => {
                    e.stopPropagation()
                    pick(k)
                  }}
                  disabled={sealed[k] || done}
                  aria-label={`Cláusula ${k + 1}`}
                >
                  {k + 1}
                </button>
                <p className="flex-1 text-[15px] leading-snug">
                  <Tappable text={c.en} />
                  {showEs && <span className="mt-0.5 block text-xs opacity-60">{c.es}</span>}
                </p>
                <span onClick={(e) => e.stopPropagation()}>
                  <SpeakButton text={c.en} size="sm" />
                </span>
                {sealed[k] && (
                  <span
                    className={`shrink-0 self-center rounded border-2 px-1.5 py-0.5 text-[10px] font-bold leading-tight ${last === k ? 'anim-pop' : ''}`}
                    style={{ color: st.color, borderColor: st.color, transform: 'rotate(-8deg)' }}
                    aria-label={`Sello: ${st.label}, ${st.es}`}
                  >
                    {st.shape} {st.label}
                  </span>
                )}
              </li>
            )
          })}
        </ol>
        {/* Firma y sello de la residencia */}
        <div className="mt-4 flex items-end justify-between gap-3">
          <div className="flex-1">
            <div className="border-b" style={{ borderColor: `${INK}88` }} />
            <p className="mt-1 text-[11px] opacity-60">Signature</p>
          </div>
          <svg width="56" height="56" viewBox="0 0 56 56" aria-hidden="true" style={{ opacity: done ? 0.9 : 0.45 }}>
            <circle cx="28" cy="28" r="25" fill="none" stroke="#8a3b6d" strokeWidth="2.5" />
            <circle cx="28" cy="28" r="19" fill="none" stroke="#8a3b6d" strokeWidth="1" />
            <text x="28" y="26" textAnchor="middle" fontSize="7" fontWeight="700" fill="#8a3b6d">LUMEN BAY</text>
            <text x="28" y="35" textAnchor="middle" fontSize="6" fill="#8a3b6d">RESIDENCE</text>
          </svg>
        </div>
      </div>

      {tip && <p className="anim-fade-in mt-3 rounded-lg bg-danger/15 px-3 py-2 text-sm text-[#f3b0b0]">{name}: casi. {tip}</p>}
      {hint && !done && <p className="anim-fade-in mt-3 rounded-lg bg-black/25 px-3 py-2 text-sm">Primero toca una cláusula (su número).</p>}

      {!done ? (
        <>
          <p className="mt-3 text-xs text-paper/60">Toca una cláusula y elige su sello. Toca una palabra para ver qué significa.</p>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {ORDER.map((kind) => {
              const st = STAMPS[kind]
              return (
                <button
                  key={kind}
                  className="flex flex-col items-center gap-0.5 rounded-xl border-2 px-1 py-2 font-bold transition active:scale-[0.97]"
                  style={{ borderColor: st.color, color: st.color, background: '#f6f0e1' }}
                  onClick={() => stamp(kind)}
                >
                  <span className="text-xl leading-none">{st.shape}</span>
                  <span className="text-[13px] leading-tight">{st.label}</span>
                  <span className="text-[11px] font-normal leading-tight opacity-80">{st.es}</span>
                </button>
              )
            })}
          </div>
        </>
      ) : (
        <p className="anim-fade-in mt-3 text-sm text-hp">{errors === 0 ? '¡Todo el contrato sin errores!' : `Contrato sellado. Errores: ${errors}.`}</p>
      )}

      <div className="mt-4 flex items-center justify-between gap-2">
        <div className="flex gap-1">
          <button className={btnGhost} onClick={() => setShowEs((v) => !v)}>{showEs ? 'Ocultar' : 'Traducir'}</button>
          {!done && <button className={btnGhost} onClick={() => onClose(false, false)}>Salir</button>}
        </div>
        {done && (
          <button className={btnPrimary} onClick={() => onClose(true, errors === 0)} autoFocus>
            Terminar
          </button>
        )}
      </div>
    </Panel>
  )
}
