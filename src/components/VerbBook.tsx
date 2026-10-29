import { useMemo, useState } from 'react'
import type { GameState } from '../game/types'
import type { Update } from '../game/store'
import { newCard } from '../game/cards'
import { IRREGULAR_VERBS, VERB_PAGES, type IrregularVerb } from '../data/irregular'
import { SpeakButton } from './SpeakButton'
import { btn, btnGhost, btnPrimary, Panel } from './ui'
import { sfx } from '../game/sfx'

const PURPLE = '#b48cf0'

/** Las tres opciones de un verbo: el pasado correcto, el error con -ed y el pasado de otro verbo */
function optionsFor(v: IrregularVerb, k: number) {
  const other = IRREGULAR_VERBS[(IRREGULAR_VERBS.indexOf(v) + 7) % IRREGULAR_VERBS.length].past
  const list = [v.past, v.wrong, other === v.past ? IRREGULAR_VERBS[(k + 3) % IRREGULAR_VERBS.length].past : other]
  // Rotar para que la respuesta no esté siempre en el mismo lugar
  const r = k % 3
  return [...list.slice(r), ...list.slice(0, r)]
}

function cardOf(v: IrregularVerb) {
  return newCard(`${v.base} → ${v.past}`, `${v.es} (pasado irregular)`, `Yesterday I ${v.past}...`)
}

/** Tabla del libro de verbos: presente → pasado (en morado) */
export function VerbTable({ verbs = IRREGULAR_VERBS }: { verbs?: IrregularVerb[] }) {
  return (
    <div className="overflow-hidden rounded-xl border-2 border-[#8b5a2b] bg-[#f4efe4] text-ink">
      <div className="grid grid-cols-[0.9fr_1.5fr_1.3fr] border-b border-[#c9b79a] px-2 py-1 text-[12px] font-semibold">
        <span>Presente</span>
        <span>Pasado</span>
        <span>Significa</span>
      </div>
      {verbs.map((v) => (
        <div key={v.base} className="grid grid-cols-[0.9fr_1.5fr_1.3fr] items-center border-b border-[#e0d4bd] px-2 py-1 text-[15px] last:border-b-0">
          <span className="font-display text-[#2f7a33]">{v.base}</span>
          <span className="flex items-center gap-1 font-display font-semibold text-[#6b3fb0]">
            {v.past}
            <SpeakButton text={`${v.base}, ${v.past}`} size="sm" label={`Escuchar ${v.base}, ${v.past}`} />
          </span>
          <span className="text-[12px] leading-tight text-ink/70">{v.es.split(' (')[0]}</span>
        </div>
      ))}
    </div>
  )
}

/**
 * El libro de verbos de Joe (Green Street, 1996): 5 páginas de 5 verbos irregulares.
 * En cada verbo se elige el pasado correcto (no el que inventa -ed). Al terminar una página,
 * sus verbos se guardan en las fichas para repasarlos.
 */
export function VerbBook({ state, update, onClose }: { state: GameState; update: Update; onClose: (done: boolean) => void }) {
  const [page, setPage] = useState(0)
  const [k, setK] = useState(0)
  const [ok, setOk] = useState(false)
  const [tip, setTip] = useState<string | null>(null)
  const p = VERB_PAGES[page]
  const pageDone = k >= p.verbs.length
  const v = p.verbs[Math.min(k, p.verbs.length - 1)]
  const opts = useMemo(() => optionsFor(v, page * 5 + k), [v, page, k])
  const lastPage = page === VERB_PAGES.length - 1
  const saved = p.verbs.filter((x) => state.cards.some((c) => c.id === cardOf(x).id)).length

  function pick(o: string) {
    if (ok) return
    if (o === v.past) {
      sfx('correct')
      setOk(true)
      setTip(null)
    } else {
      sfx('wrong')
      setTip(
        o === v.wrong
          ? `"${v.base}" es irregular: no lleva -ed. Su pasado es "${v.past}".`
          : `"${o}" es el pasado de otro verbo. El pasado de "${v.base}" es "${v.past}".`,
      )
    }
  }

  function nextVerb() {
    setOk(false)
    const nk = k + 1
    setK(nk)
    if (nk >= p.verbs.length) {
      // Guardar la página en las fichas
      update((s) => {
        const add = p.verbs.map(cardOf).filter((c) => !s.cards.some((x) => x.id === c.id))
        return add.length ? { ...s, cards: [...s.cards, ...add] } : s
      })
    }
  }

  return (
    <Panel>
      <div className="flex items-center justify-between">
        <p className="font-display text-lg text-gold">
          El libro de verbos · página {page + 1} de {VERB_PAGES.length}
        </p>
        <button className={btnGhost} onClick={() => onClose(false)}>Salir</button>
      </div>
      <p className="mt-1 text-sm text-paper/70">
        <b className="text-paper">{p.title}.</b> Estos verbos no usan -ed en pasado: cada uno tiene su propia forma (en <span style={{ color: PURPLE }}>morado</span>).
      </p>

      {!pageDone ? (
        <>
          <div className="mt-3 flex items-center justify-center gap-3">
            <p key={`${page}-${k}`} className="anim-pop text-center font-display text-3xl">
              {v.base} → <span style={{ color: ok ? PURPLE : undefined }}>{ok ? v.past : '?'}</span>
            </p>
            <SpeakButton text={ok ? `${v.base}, ${v.past}` : v.base} size="sm" voice="male" />
          </div>
          <p className="text-center text-sm text-paper/60">{v.es}</p>
          <p className="mt-1 text-center text-xs text-paper/50">Verbo {k + 1} de {p.verbs.length}</p>
          {!ok && (
            <div className="mt-3 grid gap-2">
              {opts.map((o) => (
                <button key={o} className={`${btn} text-left text-base`} onClick={() => pick(o)}>
                  Yesterday I {o}...
                </button>
              ))}
            </div>
          )}
          {tip && <p className="anim-fade-in mt-3 rounded-lg bg-danger/15 px-3 py-2 text-sm text-[#f3b0b0]">Casi. {tip}</p>}
          {ok && (
            <>
              <p className="anim-fade-in mt-3 rounded-lg bg-hp/15 px-3 py-2 text-sm text-hp">
                ¡Bien! {v.base} → <b>{v.past}</b>. {v.base === v.past ? 'Este se escribe igual en pasado.' : ''}
              </p>
              <button className={`${btnPrimary} mt-3 w-full`} autoFocus onClick={nextVerb}>
                {k === p.verbs.length - 1 ? 'Terminar la página' : 'Siguiente verbo'}
              </button>
            </>
          )}
        </>
      ) : (
        <div className="anim-fade-in mt-3">
          <VerbTable verbs={p.verbs} />
          <p className="mt-2 text-sm text-hp">Se guardaron {saved} {saved === 1 ? 'verbo' : 'verbos'} en tus fichas para repasar.</p>
          <button
            className={`${btnPrimary} mt-3 w-full`}
            autoFocus
            onClick={() => {
              if (lastPage) return onClose(true)
              setPage(page + 1)
              setK(0)
              setTip(null)
            }}
          >
            {lastPage ? 'Cerrar el libro' : 'Pasar la página'}
          </button>
        </div>
      )}
    </Panel>
  )
}
