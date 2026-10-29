import { useState } from 'react'
import { SpeakButton } from './SpeakButton'
import { btnGhost, btnPrimary, Panel } from './ui'
import { sfx } from '../game/sfx'

/**
 * Los sacos del señor López (1996): escuchar un verbo en pasado y ponerlo en el saco
 * de su sonido final: /t/ (walked), /d/ (played) o /ɪd/ (wanted).
 */
type Sound = 't' | 'd' | 'id'
const SACKS: { id: Sound; label: string; example: string; color: string }[] = [
  { id: 't', label: '/t/', example: 'walked', color: '#d9822b' },
  { id: 'd', label: '/d/', example: 'played', color: '#3b9d5d' },
  { id: 'id', label: '/ɪd/', example: 'wanted', color: '#9b6fd0' },
]

const WORDS: { base: string; past: string; sound: Sound }[] = [
  { base: 'cook', past: 'cooked', sound: 't' },
  { base: 'need', past: 'needed', sound: 'id' },
  { base: 'play', past: 'played', sound: 'd' },
  { base: 'wash', past: 'washed', sound: 't' },
  { base: 'visit', past: 'visited', sound: 'id' },
  { base: 'open', past: 'opened', sound: 'd' },
  { base: 'stop', past: 'stopped', sound: 't' },
  { base: 'live', past: 'lived', sound: 'd' },
  { base: 'wait', past: 'waited', sound: 'id' },
  { base: 'watch', past: 'watched', sound: 't' },
  { base: 'call', past: 'called', sound: 'd' },
  { base: 'paint', past: 'painted', sound: 'id' },
]

function why(w: (typeof WORDS)[number]) {
  const end = w.base.at(-1)!
  if (w.sound === 'id') return `"${w.base}" termina en ${end}: después de t o d, -ed es una sílaba más: ${w.base}-ed, /ɪd/.`
  if (w.sound === 't') return `"${w.base}" termina en ${/(sh|ch)$/.test(w.base) ? w.base.slice(-2) : end}: después de p, k, s, sh, ch o f, -ed suena /t/.`
  return `"${w.base}" no termina en t ni d, ni en p, k, s, sh, ch, f: -ed suena /d/.`
}

export function SoundSacks({ onClose }: { onClose: (done: boolean) => void }) {
  const [i, setI] = useState(0)
  const [ok, setOk] = useState(false)
  const [tip, setTip] = useState<string | null>(null)
  const [filled, setFilled] = useState<Record<Sound, string[]>>({ t: [], d: [], id: [] })
  const w = WORDS[i]
  const last = i === WORDS.length - 1

  function drop(s: Sound) {
    if (ok) return
    if (s === w.sound) {
      sfx('correct')
      setOk(true)
      setTip(null)
      setFilled((f) => ({ ...f, [s]: [...f[s], w.past] }))
    } else {
      sfx('wrong')
      setTip(why(w))
    }
  }

  return (
    <Panel>
      <div className="flex items-center justify-between">
        <p className="font-display text-lg text-gold">Los sacos de sonidos · {i + 1} de {WORDS.length}</p>
        <button className={btnGhost} onClick={() => onClose(false)}>Salir</button>
      </div>
      <p className="mt-1 text-sm text-paper/70">Escucha el verbo en pasado y ponlo en el saco de su sonido final.</p>
      <div className="mt-2 grid grid-cols-3 gap-1 rounded-xl bg-paper/5 px-2 py-1.5 text-center text-[12px] text-paper/70">
        <span><b className="text-paper">/t/</b> después de p, k, s, sh, ch, f</span>
        <span><b className="text-paper">/d/</b> los demás sonidos</span>
        <span><b className="text-paper">/ɪd/</b> después de t o d</span>
      </div>

      <div className="mt-3 flex items-center justify-center gap-3">
        <p key={i} className="anim-pop font-display text-3xl">
          {w.base} → <span className="text-[#4cc27a]">{w.past}</span>
        </p>
        <SpeakButton text={w.past} size="sm" auto voice="male" />
      </div>

      <div className="sacks mt-3 grid grid-cols-3 gap-2">
        {SACKS.map((s) => (
          <button
            key={s.id}
            data-sack={s.id}
            onClick={() => drop(s.id)}
            className="flex min-h-28 flex-col items-center rounded-2xl border-2 px-1 pb-2 pt-1 transition active:scale-95"
            style={{ borderColor: s.color, background: `${s.color}22` }}
          >
            <svg viewBox="0 0 40 30" width="44" height="33" aria-hidden="true">
              <path d="M8 8 Q20 2 32 8 L35 26 Q20 31 5 26 Z" fill="#c9a46a" stroke="#8b5a2b" strokeWidth="1.5" />
              <path d="M10 8 Q20 13 30 8" fill="none" stroke="#8b5a2b" strokeWidth="1.5" />
            </svg>
            <span className="font-display text-xl" style={{ color: s.color }}>{s.label}</span>
            <span className="text-[11px] text-paper/60">como {s.example}</span>
            <span className="mt-1 flex flex-wrap justify-center gap-1">
              {filled[s.id].map((p) => (
                <span key={p} className="rounded bg-paper/10 px-1 text-[11px]">{p}</span>
              ))}
            </span>
          </button>
        ))}
      </div>

      {tip && <p className="anim-fade-in mt-3 rounded-lg bg-danger/15 px-3 py-2 text-sm text-[#f3b0b0]">Casi. {tip}</p>}
      {ok && (
        <>
          <p className="anim-fade-in mt-3 rounded-lg bg-hp/15 px-3 py-2 text-sm text-hp">¡Bien! {why(w)}</p>
          <button
            className={`${btnPrimary} mt-3 w-full`}
            autoFocus
            onClick={() => {
              if (last) return onClose(true)
              setI(i + 1)
              setOk(false)
            }}
          >
            {last ? 'Listo' : 'Siguiente verbo'}
          </button>
        </>
      )}
    </Panel>
  )
}
