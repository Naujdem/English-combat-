import { useEffect, useMemo, useRef, useState } from 'react'
import { sfx } from '../game/sfx'
import { checkPlate, maskedSentence, plateTiles, sentenceOf, shuffleTiles, type InsRole, type InsScene, type Plate } from '../game/inscriptions'
import { GlyphIcon, GlyphShape, glyphWidth, INS_ROLE_INFO } from './InsGlyph'
import { SpeakButton } from './SpeakButton'
import { Tappable } from './Words'
import { btn, btnGhost, btnPrimary, Panel } from './ui'

/**
 * Inscriptions (B1, ficha 0.6): la mecánica de los templos (misiones 9, 11 y 13).
 * Una tablilla de piedra con huecos que tienen la silueta de cada glifo: el jugador arma la frase con las fichas.
 * Es explicación y práctica (aquí sí van los colores de estructura; en combate, nunca).
 *   Acierto → la frase se traduce, se revela la regla (tarjeta de piedra) y, al seguir, se cumple el efecto de la escena.
 *   Error   → las fichas bien puestas se marcan en verde y las otras se sacuden y vuelven. No se pierde vida.
 *             2.º error: pista · 3.º: la tablilla se reinicia con las fichas mezcladas otra vez y la frase tapada (cuenta como reinicio).
 * Las tablillas se juegan en el orden de la lista (no se mezclan). Al terminar: onClose(true, perfect), perfect = sin reinicios.
 * No usa MemoryFrame: lo pone la escena que lo llame.
 */
export function Inscriptions({
  title,
  intro,
  scene,
  plates,
  finish,
  onClose,
}: {
  title: string
  intro: { en: string; es: string }
  scene: InsScene
  plates: Plate[]
  finish?: { en: string; es: string; banner: string }
  onClose: (done: boolean, perfect: boolean) => void
}) {
  const [pi, setPi] = useState(0)
  const [solvedCount, setSolvedCount] = useState(0)
  const [resets, setResets] = useState(0)
  const [effect, setEffect] = useState<string | null>(null)
  const [showEs, setShowEs] = useState(false)
  const done = pi >= plates.length
  const end = finish ?? { en: 'The inscriptions are awake.', es: 'Las inscripciones despertaron.', banner: '¡Sala completa!' }

  return (
    <Panel className="max-h-[90vh] overflow-y-auto">
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-[#d8c38a]">Inscriptions</p>
          <p className="font-display text-lg text-gold">{title}</p>
        </div>
        <p className="rounded-full border border-[#d8c38a]/60 px-3 py-0.5 font-display text-[15px] text-[#e8dcb0]" aria-label={`Inscripciones: ${solvedCount} de ${plates.length}`}>
          {solvedCount} / {plates.length}
        </p>
      </div>
      <SceneArt scene={scene} total={plates.length} done={solvedCount} />
      {effect && <p key={effect + solvedCount} className="anim-fade-in mt-1 text-center text-sm text-[#e8dcb0]">{effect}</p>}

      {pi === 0 && solvedCount === 0 && (
        <div className="mt-2">
          <p className="text-[16px] leading-relaxed"><Tappable text={intro.en} /></p>
          {showEs && <p className="text-sm text-paper/60">{intro.es}</p>}
        </div>
      )}

      {done ? (
        <div className="anim-fade-in mt-3 rounded-xl bg-hp/15 px-3 py-3">
          <p className="flex items-center gap-2 text-[16px]"><span className="min-w-0 flex-1"><Tappable text={end.en} /></span><span className="shrink-0"><SpeakButton text={end.en} size="sm" auto /></span></p>
          {showEs && <p className="text-sm text-paper/60">{end.es}</p>}
          <p className="mt-1 text-sm text-hp">{end.banner} {resets === 0 ? 'Sin reiniciar ninguna tablilla: ganas un escudo.' : ''}</p>
        </div>
      ) : (
        <PlateBoard
          key={pi}
          plate={plates[pi]}
          showEs={showEs}
          onReset={() => setResets((r) => r + 1)}
          onSolved={() => {
            setSolvedCount((n) => n + 1)
            setEffect(plates[pi].effect ?? null)
            sfx('item')
            setPi(pi + 1)
          }}
        />
      )}

      <Legend roles={done ? [] : plates[pi].roles} />

      <div className="mt-4 flex items-center justify-between gap-2">
        <button className={btnGhost} onClick={() => setShowEs((v) => !v)}>{showEs ? 'Ocultar' : 'Traducir textos'}</button>
        {done ? (
          <button className={btnPrimary} onClick={() => onClose(true, resets === 0)} autoFocus>Listo</button>
        ) : (
          <button className={btnGhost} onClick={() => onClose(false, false)}>Salir</button>
        )}
      </div>
    </Panel>
  )
}

/** Una tablilla: huecos, fichas, revisión, pista, reinicio y, al acertar, la traducción y la regla */
function PlateBoard({ plate, showEs, onReset, onSolved }: { plate: Plate; showEs: boolean; onReset: () => void; onSolved: () => void }) {
  const tiles = useMemo(() => plateTiles(plate), [plate])
  const [order, setOrder] = useState(() => shuffleTiles(tiles.length))
  const [slots, setSlots] = useState<(number | null)[]>(() => plate.words.map(() => null))
  const [stack, setStack] = useState<number[]>([])
  const [errors, setErrors] = useState(0)
  const [hint, setHint] = useState(false)
  const [masked, setMasked] = useState(false)
  const [marks, setMarks] = useState<boolean[] | null>(null)
  const [shaking, setShaking] = useState(false)
  const [solved, setSolved] = useState(false)
  const timer = useRef<number | undefined>(undefined)
  useEffect(() => () => window.clearTimeout(timer.current), [])

  const full = slots.every((s) => s !== null)
  const placedWords = slots.map((s) => (s === null ? null : tiles[s].text))
  const said = sentenceOf(placedWords.filter((w): w is string => !!w))
  const busy = shaking || solved

  function place(t: number) {
    if (busy) return
    const at = slots.indexOf(t)
    if (at >= 0) return removeSlot(at)
    const free = slots.indexOf(null)
    if (free < 0) return
    const next = [...slots]
    next[free] = t
    setSlots(next)
    setStack([...stack, free])
    setMarks(null)
  }
  function removeSlot(k: number) {
    if (busy || slots[k] === null) return
    const next = [...slots]
    next[k] = null
    setSlots(next)
    setStack(stack.filter((x) => x !== k))
    setMarks(null)
  }
  function undo() {
    const k = stack[stack.length - 1]
    if (k !== undefined) removeSlot(k)
  }
  function clear() {
    if (busy) return
    setSlots(plate.words.map(() => null))
    setStack([])
    setMarks(null)
  }

  function translate() {
    if (!full || busy) return
    const res = checkPlate(plate, placedWords as string[])
    if (res.ok) {
      sfx('correct')
      setMarks(res.right)
      setSolved(true)
      return
    }
    sfx('wrong')
    const n = errors + 1
    setErrors(n)
    setMarks(res.right)
    setShaking(true)
    if (n >= 2) setHint(true)
    timer.current = window.setTimeout(() => {
      setShaking(false)
      if (n >= 3) {
        // 3.er error: la tablilla se reinicia con las fichas mezcladas otra vez y se muestra la frase tapada
        onReset()
        setOrder(shuffleTiles(tiles.length))
        setSlots(plate.words.map(() => null))
        setStack([])
        setMarks(null)
        setErrors(0)
        setMasked(true)
        return
      }
      // Las fichas mal puestas vuelven abajo; las bien puestas se quedan (en verde)
      setSlots(slots.map((s, k) => (res.right[k] ? s : null)))
      setStack(stack.filter((k) => res.right[k]))
    }, 650)
  }

  const correct = sentenceOf(plate.words)

  return (
    <div className="mt-3">
      {/* La tablilla de piedra */}
      <div className={`ins-tablet relative rounded-2xl border-2 px-2 py-3 ${solved ? 'ins-glow border-[#e8c96a]' : 'border-[#6f7a8c]'}`}>
        {/* Al traducir, los glifos se funden (bajan de brillo) y queda la traducción */}
        <div className={`ins-move flex flex-wrap items-center justify-center gap-x-1.5 gap-y-2 ${solved ? 'opacity-40' : ''}`}>
          {plate.words.map((w, k) => {
            const t = slots[k]
            const state = marks ? (marks[k] ? 'right' : 'wrong') : undefined
            if (t === null) {
              const role = plate.roles[k]
              return (
                <span
                  key={k}
                  className="relative flex h-10 items-center justify-center"
                  style={{ width: glyphWidth(w) }}
                  aria-label={`Hueco ${k + 1}: ${INS_ROLE_INFO[role].name.toLowerCase()} (${INS_ROLE_INFO[role].shape})`}
                >
                  <GlyphShape role={role} hollow />
                  <span className="relative opacity-80"><GlyphIcon role={role} color={INS_ROLE_INFO[role].color} size={15} /></span>
                </span>
              )
            }
            const tile = tiles[t]
            return (
              <Glyph
                key={k}
                text={k === 0 ? cap(tile.text) : tile.text}
                role={tile.role}
                state={state}
                shake={shaking && state === 'wrong'}
                onClick={() => removeSlot(k)}
                disabled={busy}
                label={`Quitar ${tile.text}`}
              />
            )
          })}
        </div>
        {solved && (
          <div className="ins-translate mt-3 text-center">
            <p className="flex items-center justify-center gap-2 font-display text-[18px] text-[#f6e7b4]">
              {/* La frase va en un solo bloque para que salte de línea (si no, cada palabra es una columna y se sale de la tablilla) */}
              <span className="min-w-0">
                <Tappable text={correct} />
              </span>
              <span className="shrink-0">
                <SpeakButton text={correct} size="sm" auto />
              </span>
            </p>
            <p className="text-[15px] text-paper/80">{plate.es}</p>
          </div>
        )}
      </div>

      {!solved && (
        <>
          <div className="mt-2 flex items-center justify-between text-xs text-paper/55">
            <span>
              {slots.filter((s) => s !== null).length} de {plate.words.length} glifos
              {said && <span className="ml-2 inline-flex align-middle"><SpeakButton text={said} size="sm" label="Leer tu frase" /></span>}
            </span>
            <span className="flex gap-1">
              <button className="rounded-md border border-line px-2 py-0.5 font-semibold text-paper/75 disabled:opacity-30" onClick={undo} disabled={!stack.length || busy}>↶ Deshacer</button>
              <button className="rounded-md border border-line px-2 py-0.5 font-semibold text-paper/75 disabled:opacity-30" onClick={clear} disabled={!stack.length || busy}>Borrar</button>
            </span>
          </div>

          {/* Las fichas, desordenadas */}
          <div className="mt-2 flex flex-wrap justify-center gap-x-1.5 gap-y-2">
            {order.map((t) => {
              const used = slots.includes(t)
              return (
                <Glyph key={`${t}-${tiles[t].text}`} text={tiles[t].text} role={tiles[t].role} onClick={() => place(t)} disabled={busy || used} faded={used} label={`Poner ${tiles[t].text}`} />
              )
            })}
          </div>

          {masked && (
            <p className="anim-fade-in mt-3 rounded-lg bg-[#2a3140] px-3 py-2 text-sm text-paper/85">
              La tablilla se reinició. La frase empieza así: <span className="font-display text-[#f6e7b4]">{maskedSentence(plate)}</span>
            </p>
          )}
          {hint && plate.hint && <p className="anim-fade-in mt-2 rounded-lg bg-gold/10 px-3 py-2 text-sm text-gold">Pista: {plate.hint}</p>}
          {errors > 0 && !shaking && <p className="mt-2 text-xs text-paper/55">Errores en esta tablilla: {errors} de 3. No pierdes vida.</p>}

          <button className={`${btnPrimary} mt-3 w-full`} onClick={translate} disabled={!full || busy}>Traducir</button>
        </>
      )}

      {solved && (
        <div className="ins-stone anim-fade-in mt-3 rounded-2xl border-2 border-[#8d97a8] px-4 py-3 text-[#eef0f4]">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#e8c96a]">La regla del templo</p>
          <p className="font-display text-lg">{plate.rule.title}</p>
          <p className="mt-1 text-[15px] leading-relaxed">{plate.rule.text}</p>
          {plate.rule.examples?.length ? (
            <ul className="mt-2 grid gap-1">
              {plate.rule.examples.map((ex) => (
                <li key={ex} className="flex items-center gap-2 text-[15px] text-[#f6e7b4]"><span aria-hidden="true">◆</span><span className="flex-1"><Tappable text={ex} /></span><SpeakButton text={ex} size="sm" /></li>
              ))}
            </ul>
          ) : null}
          {showEs && plate.effect && <p className="mt-2 text-xs text-paper/60">{plate.effect}</p>}
          <button className={`${btn} mt-3 w-full`} onClick={onSolved} autoFocus>Seguir</button>
        </div>
      )}
    </div>
  )
}

const cap = (t: string) => (t ? t[0].toUpperCase() + t.slice(1) : t)

/** Un glifo: la palabra dentro de la forma de su papel, con el iconito de la forma */
function Glyph({ text, role, state, shake, faded, disabled, onClick, label }: { text: string; role: InsRole; state?: 'right' | 'wrong'; shake?: boolean; faded?: boolean; disabled?: boolean; onClick: () => void; label: string }) {
  const info = INS_ROLE_INFO[role]
  return (
    <button
      className={`relative flex h-10 items-center justify-center gap-1 px-4 text-[15px] font-semibold text-white transition-opacity disabled:cursor-default ${faded ? 'opacity-20' : ''} ${shake ? 'anim-shake' : ''}`}
      style={{ width: glyphWidth(text), textShadow: '0 1px 1px rgba(0,0,0,0.45)' }}
      onClick={onClick}
      disabled={disabled}
      aria-label={`${label} (${info.name.toLowerCase()}, ${info.shape})${state === 'right' ? ', bien colocada' : state === 'wrong' ? ', mal colocada' : ''}`}
    >
      <GlyphShape role={role} state={state} />
      <span className="relative flex items-center gap-1 whitespace-nowrap">
        <GlyphIcon role={role} size={11} />
        {text}
      </span>
    </button>
  )
}

/** Leyenda de las formas que aparecen en la tablilla (la forma dice el papel, sin depender del color) */
function Legend({ roles }: { roles: InsRole[] }) {
  const list = [...new Set(roles)]
  if (!list.length) return null
  return (
    <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-paper/65">
      {list.map((r) => (
        <span key={r} className="flex items-center gap-1">
          <GlyphIcon role={r} color={INS_ROLE_INFO[r].color} size={12} />
          {INS_ROLE_INFO[r].name}
        </span>
      ))}
    </div>
  )
}

const STONE = '#4a5568'
const STONE_DARK = '#343c4b'
const GOLD = '#e0b84a'

/**
 * Dibujo de la sala (estilo templo: piedra gris azulada con detalles dorados). done = inscripciones completas.
 *   door:   puerta de piedra en N tramos que se separan
 *   bridge: barranco con N tramos de puente que aparecen (The Ancient Bridge)
 *   wall:   muro con N glifos que se encienden
 */
function SceneArt({ scene, total, done }: { scene: InsScene; total: number; done: number }) {
  const n = Math.max(1, total)
  return (
    <svg viewBox="0 0 300 110" className="mt-2 w-full rounded-xl border border-[#6f7a8c]/60" role="img" aria-label={`${scene === 'door' ? 'Puerta' : scene === 'bridge' ? 'Puente' : 'Muro'}: ${done} de ${total}`}>
      <rect width="300" height="110" fill="#1d2330" />
      {scene === 'door' && (
        <g>
          <rect x="70" y="6" width="160" height="104" fill={STONE_DARK} />
          <path d="M70 6 H230 M70 6 V110 M230 6 V110" stroke={GOLD} strokeWidth="2" />
          {/* Luz detrás de la puerta: crece con cada tramo abierto */}
          <rect x="84" y="14" width="132" height="96" fill={GOLD} opacity={0.15 + (0.55 * done) / n} className="ins-move" />
          {Array.from({ length: n }, (_, k) => {
            const h = 96 / n
            const open = k < done
            return (
              <g key={k} className="ins-move" style={{ transform: open ? `translateX(${k % 2 ? 150 : -150}px)` : 'none', opacity: open ? 0 : 1 }}>
                <rect x="84" y={14 + k * h} width="132" height={h - 2} fill={STONE} stroke={STONE_DARK} />
                <path d={`M120 ${14 + k * h + h / 2} h60`} stroke={GOLD} strokeWidth="1.5" strokeDasharray="4 5" opacity="0.8" />
              </g>
            )
          })}
        </g>
      )}
      {scene === 'bridge' && (
        <g>
          <path d="M0 110 V40 H60 L66 110 Z" fill={STONE} />
          <path d="M300 110 V40 H240 L234 110 Z" fill={STONE} />
          <rect x="60" y="40" width="180" height="70" fill="#0e1118" />
          <path d="M60 70 H240 M60 92 H240" stroke="#2a3140" strokeWidth="1" strokeDasharray="2 7" />
          <path d="M0 40 H60 M240 40 H300" stroke={GOLD} strokeWidth="2" />
          <path d="M60 40 H240" stroke={GOLD} strokeOpacity="0.25" strokeWidth="1" strokeDasharray="3 6" />
          {Array.from({ length: n }, (_, k) => {
            const w = 180 / n
            const open = k < done
            return (
              <g key={k} className="ins-move" style={{ transform: open ? 'none' : 'translateY(30px)', opacity: open ? 1 : 0 }}>
                <rect x={60 + k * w + 1} y="38" width={w - 2} height="8" fill="#8a7a5a" stroke={GOLD} strokeWidth="1" />
                <path d={`M${60 + k * w + w / 2} 46 v10`} stroke="#6b5d42" strokeWidth="3" />
              </g>
            )
          })}
        </g>
      )}
      {scene === 'wall' && (
        <g>
          <rect x="20" y="10" width="260" height="92" fill={STONE} stroke={GOLD} strokeWidth="2" />
          {Array.from({ length: n }, (_, k) => {
            const x = 20 + ((k + 0.5) * 260) / n
            const lit = k < done
            return (
              <g key={k}>
                <circle cx={x} cy="56" r="16" fill={STONE_DARK} stroke={GOLD} strokeOpacity="0.5" />
                <path d={`M${x - 7} 56 L${x} 47 L${x + 7} 56 L${x} 65 Z`} fill={STONE} />
                <circle className="ins-move" cx={x} cy="56" r="16" fill={GOLD} style={{ opacity: lit ? 0.75 : 0 }} />
                <path className="ins-move" d={`M${x - 7} 56 L${x} 47 L${x + 7} 56 L${x} 65 Z`} fill="#fff6d6" style={{ opacity: lit ? 1 : 0 }} />
              </g>
            )
          })}
        </g>
      )}
    </svg>
  )
}
