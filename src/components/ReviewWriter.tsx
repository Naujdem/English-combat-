import { useState } from 'react'
import { SpeakButton } from './SpeakButton'
import { btn, btnGhost, btnPrimary, Panel } from './ui'
import { commonErrors } from './EraExam'
import { sfx } from '../game/sfx'

/** Un texto corto con lista de requisitos (no se revisa la calidad). checks(text) devuelve cada requisito y si se cumple */
export type ReviewContent = {
  title: string
  ask: string
  es: string
  help: string
  checks: (text: string) => { label: string; ok: boolean }[]
  model: string
  modelBy: string
}

const words = (t: string) => t.trim().split(/\s+/).filter(Boolean).length

/**
 * Escribir una reseña corta (B1 · Extras, Movie Night). El jugador escribe, toca Revisar y ve qué requisitos cumple;
 * tras dos intentos puede dejarla así. Al final ve su texto junto al texto modelo y Guardar → onSave(texto).
 */
export function ReviewWriter({ title, ask, es, help, checks, model, modelBy, onClose, onSave }: ReviewContent & { onClose: () => void; onSave: (text: string) => void }) {
  const [text, setText] = useState('')
  const [checked, setChecked] = useState(false)
  const [tries, setTries] = useState(0)
  const [done, setDone] = useState(false)
  const list = checks(text)
  const advice = checked ? commonErrors(text) : []

  function check() {
    setChecked(true)
    if (list.every((c) => c.ok)) {
      sfx('correct')
      return setDone(true)
    }
    sfx('wrong')
    setTries(tries + 1)
  }

  return (
    <Panel className="max-h-[88vh] overflow-y-auto">
      <div className="flex items-center justify-between">
        <p className="font-display text-xl text-gold">{title}</p>
        {!done && <button className={btnGhost} onClick={onClose}>Después</button>}
      </div>
      {!done ? (
        <>
          <p className="mt-2 font-display text-[18px] leading-snug text-paper">{ask}</p>
          <p className="text-sm text-paper/60">{es}</p>
          <p className="text-sm text-paper/55">Por ejemplo: {help}</p>
          <textarea
            value={text}
            onChange={(e) => {
              setText(e.target.value)
              setChecked(false)
            }}
            rows={6}
            autoCapitalize="sentences"
            autoCorrect="off"
            spellCheck={false}
            placeholder="Escribe tu reseña en inglés"
            className="mt-2 w-full resize-none rounded-xl border-2 border-line bg-ink px-3 py-2.5 text-[16px] leading-relaxed outline-none focus:border-gold"
            data-testid="review-input"
          />
          <p className="text-right text-xs text-paper/55">{words(text)} palabras</p>
          <ul className="mt-1 grid gap-1 text-sm">
            {list.map((c) => (
              <li key={c.label} className={!checked ? 'text-paper/60' : c.ok ? 'text-hp' : 'text-[#f3b0b0]'}>
                {!checked ? '•' : c.ok ? '✓' : '✗'} {c.label}
              </li>
            ))}
          </ul>
          {advice.length > 0 && (
            <ul className="anim-fade-in mt-2 grid gap-1 rounded-lg bg-danger/15 px-3 py-2 text-sm text-[#f3b0b0]">
              {advice.map((n) => <li key={n}>• {n}</li>)}
            </ul>
          )}
          <p className="mt-2 text-xs text-paper/50">La revisión comprueba los requisitos, no la calidad del texto.</p>
          <button className={`${btnPrimary} mt-3 w-full`} onClick={check} disabled={words(text) === 0}>Revisar</button>
          {tries >= 2 && checked && words(text) >= 20 && (
            <button className={`${btn} mt-2 w-full text-[15px]`} onClick={() => setDone(true)}>Dejarla así y seguir</button>
          )}
        </>
      ) : (
        <>
          <div className="mt-3 rounded-xl border-2 border-line px-3 py-2">
            <p className="text-xs text-paper/55">Tu reseña</p>
            <p className="text-[15px] leading-relaxed text-paper">{text}</p>
            <div className="mt-2 flex items-start gap-2">
              <p className="flex-1 text-sm leading-relaxed text-gold">{modelBy}: {model}</p>
              <SpeakButton text={model} size="sm" />
            </div>
          </div>
          <button className={`${btnPrimary} mt-3 w-full`} onClick={() => onSave(text.trim())} autoFocus>Guardar mi reseña</button>
        </>
      )}
    </Panel>
  )
}
