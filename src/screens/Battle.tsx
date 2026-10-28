import { useMemo, useState } from 'react'
import type { GameState, Question, Zone } from '../game/types'
import type { Update } from '../game/store'
import { ENEMIES, OUTFITS } from '../data/school'
import { pickQuestion, TOPICS } from '../data/questions'
import { QuestionCard } from '../components/QuestionCard'
import { sessionFor } from '../data/schedule'
import { SpeakButton } from '../components/SpeakButton'
import { SCENES, heroLook, perks } from '../game/helpers'
import { SpriteBody } from '../components/Sprite'
import { Bar, btnGhost, btnPrimary, Hearts, Panel } from '../components/ui'
import { TimeClock } from '../components/TimeClock'
import { WORLD } from '../data/world'


function Backdrop({ zone }: { zone: Zone }) {
  const wall = zone === 'patio' ? '#bfe3f5' : zone === 'bano' ? '#dfeef2' : zone === 'sala' ? '#e6dcef' : '#efe5d3'
  return (
    <g>
      <rect width="360" height="150" fill={wall} />
      <rect y="150" width="360" height="70" fill={zone === 'patio' ? '#8fbf6a' : zone === 'bano' ? '#b8d3dc' : zone === 'sala' ? '#b8a7c6' : '#b98c5a'} />
      <line x1="0" y1="172" x2="360" y2="172" stroke="rgba(0,0,0,0.1)" />
      <line x1="0" y1="198" x2="360" y2="198" stroke="rgba(0,0,0,0.1)" />
      {zone === 'patio' && (
        <>
          <circle cx="310" cy="38" r="20" fill="#f6d36b" />
          <ellipse cx="90" cy="40" rx="34" ry="12" fill="#ffffff" opacity="0.85" />
          <ellipse cx="200" cy="28" rx="26" ry="9" fill="#ffffff" opacity="0.8" />
          <rect x="0" y="118" width="360" height="32" fill="#7aa95a" />
          <rect x="140" y="80" width="90" height="70" fill="none" stroke="#f4efe4" strokeWidth="5" />
          {[0, 1, 2, 3].map((k) => (
            <line key={k} x1="143" y1={92 + k * 14} x2="227" y2={92 + k * 14} stroke="#f4efe4" strokeOpacity="0.5" />
          ))}
          <rect x="22" y="92" width="10" height="40" fill="#7a5230" />
          <circle cx="27" cy="80" r="26" fill="#3b8a3e" />
          <circle cx="250" cy="196" r="9" fill="#ffffff" stroke="#2d2d3a" strokeWidth="1.5" />
        </>
      )}
      {zone === 'aula' && (
        <>
          <rect x="110" y="22" width="140" height="66" rx="3" fill="#7a5230" />
          <rect x="116" y="28" width="128" height="54" fill="#2f5d50" />
          <text x="180" y="52" textAnchor="middle" fontSize="12" fill="#f4efe4" fontFamily="Fredoka, Nunito, system-ui, sans-serif">I am · You are</text>
          <text x="180" y="70" textAnchor="middle" fontSize="12" fill="#f4efe4" fontFamily="Fredoka, Nunito, system-ui, sans-serif">He / She / It is</text>
          <rect x="18" y="24" width="50" height="70" fill="#9fd3f0" stroke="#8d7c68" strokeWidth="4" />
          <rect x="292" y="24" width="50" height="70" fill="#9fd3f0" stroke="#8d7c68" strokeWidth="4" />
        </>
      )}
      {zone === 'bano' && (
        <>
          {[40, 150, 260].map((x) => (
            <g key={x}>
              <rect x={x} y="26" width="60" height="50" rx="4" fill="#cfe9f2" stroke="#9fb7c0" strokeWidth="3" />
              <rect x={x + 8} y="108" width="44" height="22" rx="4" fill="#fff" stroke="#9fb7c0" strokeWidth="2" />
            </g>
          ))}
        </>
      )}
      {zone === 'cafeteria' && (
        <>
          <rect x="20" y="70" width="200" height="60" fill="#b0b0b0" />
          <rect x="20" y="62" width="200" height="10" fill="#8d8d8d" />
          {['#d64545', '#e0a526', '#3b9d5d', '#5d8fd4'].map((c, k) => (
            <circle key={c} cx={50 + k * 45} cy="56" r="9" fill={c} />
          ))}
          <rect x="250" y="22" width="90" height="40" rx="4" fill="#2f5d50" />
          <text x="295" y="47" textAnchor="middle" fontSize="12" fill="#f4efe4" fontFamily="Fredoka, Nunito, system-ui, sans-serif">MENU</text>
        </>
      )}
      {zone === 'biblioteca' && (
        <>
          {[20, 130, 240].map((x) => (
            <g key={x}>
              <rect x={x} y="18" width="100" height="120" fill="#6b4423" />
              {[0, 1, 2].map((r) =>
                ['#c0504d', '#3b6fb6', '#e0a526', '#3b9d5d', '#7a4fa3', '#d9822b'].map((c, k) => (
                  <rect key={`${r}-${k}`} x={x + 8 + k * 14} y={26 + r * 38} width="10" height={30 - (k % 3) * 4} fill={c} />
                )),
              )}
            </g>
          ))}
        </>
      )}
      {zone === 'sala' && (
        <>
          <rect x="30" y="24" width="110" height="80" rx="4" fill="#2f5d50" stroke="#7a5230" strokeWidth="5" />
          <rect x="282" y="14" width="56" height="48" fill="#9fd3f0" stroke="#8d7c68" strokeWidth="4" />
          <circle cx="190" cy="44" r="18" fill="#fff" stroke="#5a4a7a" strokeWidth="4" />
          <path d="M190 44 V33 M190 44 L198 49" stroke="#2d2d3a" strokeWidth="2.5" strokeLinecap="round" />
        </>
      )}
    </g>
  )
}

/** Grimm se despide al ser vencido: práctica de despedidas */
const FAREWELL = {
  q: "It's late. Goodbye, my student. See you in class tomorrow!",
  options: ['Goodbye, Mr. Grimm! See you tomorrow!', 'Good morning, Mr. Grimm!', 'Hello, Mr. Grimm! Nice to meet you!'],
  answer: 0,
  tip: 'Para despedirse se dice "Goodbye" o "See you tomorrow". "Good morning" es para saludar y "Nice to meet you" es al conocer a alguien.',
}

type Phase = 'story' | 'ask' | 'feedback' | 'after' | 'bonus' | 'won' | 'lost'


export function Battle({ state, update, onExit }: { state: GameState; update: Update; onExit: () => void }) {
  const battle = state.battle!
  const enemy = ENEMIES[battle.enemyId]
  const scene = SCENES[state.sceneId]
  const ent = scene.entities.find((e) => 'id' in e && e.id === enemy.id)
  const zone = ent ? scene.zoneAt(ent.x, ent.y) : 'aula'
  const leoHint = perks(state).leoHint
  const metLeo = 'leo' in state.talks || 'leo' in state.friendship

  const [phase, setPhase] = useState<Phase>('story')
  const [line, setLine] = useState(0)
  const [showEs, setShowEs] = useState(false)
  const [used, setUsed] = useState<string[]>([])
  // Fases del jefe: según la vida que le queda, cambia el tipo de preguntas
  function phaseAt(hpLeft: number) {
    if (!enemy.phases) return -1
    const damage = enemy.hp - hpLeft
    let acc = 0
    for (let i = 0; i < enemy.phases.length; i++) {
      acc += enemy.phases[i].hp
      if (damage < acc) return i
    }
    return enemy.phases.length - 1
  }
  function poolAt(hpLeft: number) {
    const ph = enemy.phases?.[phaseAt(hpLeft)]
    return ph ?? { topics: enemy.topics, kinds: enemy.kinds, tags: enemy.tags }
  }
  function pick(hpLeft: number, usedIds: string[]) {
    const p = poolAt(hpLeft)
    return pickQuestion(p.topics, p.kinds, usedIds, state.mistakes, p.tags ?? [])
  }
  const [interlude, setInterlude] = useState<{ text: string; es?: string } | null>(null)
  const [q, setQ] = useState<Question>(() => pick(battle.enemyHp, []))
  const [correct, setCorrect] = useState(false)
  const [blocked, setBlocked] = useState(false)
  const [heroAnim, setHeroAnim] = useState('')
  const [enemyAnim, setEnemyAnim] = useState('')
  const [hitText, setHitText] = useState<{ who: 'hero' | 'enemy'; n: number; text: string } | null>(null)
  const [hint, setHint] = useState(false)

  function animate(setter: (v: string) => void, cls: string) {
    setter('')
    requestAnimationFrame(() => setter(cls))
  }

  function resolve(ok: boolean) {
    setCorrect(ok)
    // Cuaderno de errores: se anota lo que fallas y se borra cuando lo aciertas
    update((s) => ({
      ...s,
      mistakes: ok ? s.mistakes.filter((id) => id !== q.id) : s.mistakes.includes(q.id) ? s.mistakes : [...s.mistakes, q.id],
    }))
    if (ok) {
      const left = battle.enemyHp - 1
      animate(setHeroAnim, 'anim-lunge-r')
      animate(setEnemyAnim, 'anim-shake')
      setHitText({ who: 'enemy', n: Date.now(), text: '-1' })
      update((s) => ({ ...s, battle: s.battle ? { ...s.battle, enemyHp: left } : null }))
      setPhase('feedback')
      if (left <= 0) window.setTimeout(() => win(), 700)
      else if (enemy.phases && phaseAt(left) !== phaseAt(battle.enemyHp)) {
        const line = enemy.phases[phaseAt(left)].line
        if (line) setInterlude(line)
      }
      return
    }
    animate(setEnemyAnim, 'anim-lunge-r')
    if (state.items.shield > 0) {
      setBlocked(true)
      setHitText({ who: 'hero', n: Date.now(), text: '¡Escudo!' })
      update((s) => ({ ...s, items: { ...s.items, shield: s.items.shield - 1 } }))
      setPhase('feedback')
      return
    }
    const hp = state.hp - 1
    animate(setHeroAnim, 'anim-shake')
    setHitText({ who: 'hero', n: Date.now(), text: '-1' })
    update((s) => ({ ...s, hp: Math.max(0, hp) }))
    setPhase(hp <= 0 ? 'lost' : 'feedback')
  }

  function nextQuestion() {
    const nextUsed = [...used, q.id]
    setUsed(nextUsed)
    setQ(pick(state.battle?.enemyHp ?? battle.enemyHp, nextUsed))
    setInterlude(null)
    setCorrect(false)
    setBlocked(false)
    setHint(false)
    setPhase('ask')
  }

  function win() {
    setLine(0)
    setShowEs(false)
    setPhase('after')
    update((s) => {
      if (enemy.kind === 'trainer') {
        // Al terminar el entrenamiento Leo queda como amigo y da pistas en combate
        return {
          ...s,
          hp: s.maxHp,
          talks: { ...s.talks, leo: Math.max(1, s.talks.leo ?? 0) },
          friendship: { ...s.friendship, leo: Math.max(3, s.friendship.leo ?? 0) },
          seenLesson: s.seenLesson.includes('greetings') ? s.seenLesson : [...s.seenLesson, 'greetings'],
        }
      }
      const base = { ...s, defeated: [...s.defeated, enemy.id], hp: s.maxHp }
      if (enemy.optional) {
        const r = enemy.reward
        return r && !s.outfits.includes(r) ? { ...base, outfits: [...s.outfits, r] } : base
      }
      if (enemy.kind === 'minion') {
        const r = enemy.reward
        return {
          ...base,
          keys: { ...s.keys, [s.sceneId]: (s.keys[s.sceneId] ?? 0) + 1 },
          outfits: r && !s.outfits.includes(r) ? [...s.outfits, r] : s.outfits,
        }
      }
      return {
        ...base,
        recovered: [...s.recovered, ...enemy.topics.filter((t) => !s.recovered.includes(t))],
        relics: s.relics + 1,
        outfits: s.outfits.includes('capa') ? s.outfits : [...s.outfits, 'capa'],
      }
    })
  }

  function leave() {
    if (enemy.kind === 'trainer') {
      if (phase === 'lost') {
        // Con Leo no se pierde nada: se vuelve a intentar con la vida llena
        update((s) => ({ ...s, hp: s.maxHp, battle: s.battle ? { ...s.battle, enemyHp: enemy.hp } : null }))
        nextQuestion()
        return
      }
      update((s) => ({ ...s, battle: null, screen: 'world' }))
      onExit()
      return
    }
    if (phase === 'lost') {
      update((s) => ({ ...s, hp: s.maxHp, pos: { ...scene.start }, battle: null, screen: 'explore' }))
    } else if (enemy.kind === 'boss') {
      // Al vencer al jefe viene el final del capítulo
      update((s) => ({ ...s, battle: null, screen: s.opened.includes('school-epilogue') ? 'explore' : 'epilogue' }))
    } else {
      update((s) => ({ ...s, battle: null, screen: 'explore' }))
    }
    onExit()
  }

  const hero = useMemo(() => heroLook(state, { book: true }), [state])
  const keysNow = state.keys[state.sceneId] ?? 0
  const storyLines = phase === 'after' ? enemy.after : enemy.before
  // Pregunta extra al ser vencido: los esbirros preguntan por el horario y Grimm se despide
  const session = enemy.kind === 'minion' ? sessionFor(enemy.id) : undefined
  const bonusSession = session
    ? { id: session.id, title: 'Pregunta extra del horario', bonus: session.bonus, shield: true }
    : enemy.kind === 'boss'
      ? { id: 'farewell', title: 'Despedida', bonus: FAREWELL, shield: false }
      : undefined
  const [bonusPick, setBonusPick] = useState<number | null>(null)
  const story = storyLines[line]
  const wasMistake = state.mistakes.includes(q.id)

  function nextStory() {
    setShowEs(false)
    if (line < storyLines.length - 1) setLine(line + 1)
    else if (phase === 'story') setPhase('ask')
    else if (bonusSession) setPhase('bonus')
    else setPhase('won')
  }

  const showQuestion = phase === 'ask' || phase === 'feedback' || phase === 'lost'

  return (
    <div className="mx-auto flex h-full max-w-md flex-col gap-3 overflow-y-auto px-3 py-3">
      <div className="grid grid-cols-2 gap-2">
        <Panel className="px-3 py-2">
          <p className="truncate font-display text-[15px]">{state.hero.name}</p>
          <div className="mt-1 flex items-center gap-2">
            <Hearts hp={state.hp} max={state.maxHp} />
            {state.items.shield > 0 && (
              <span className="whitespace-nowrap rounded-full bg-[#5d8fd4]/25 px-1.5 text-xs font-semibold text-[#9cc0f0]" title="Escudos de palabras">
                Escudo ×{state.items.shield}
              </span>
            )}
          </div>
        </Panel>
        <Panel className="px-3 py-2">
          <p className="truncate font-display text-[15px]">{enemy.name}</p>
          <div className="mt-2"><Bar value={battle.enemyHp} max={enemy.hp} color={enemy.kind === 'boss' ? '#a07cd0' : enemy.kind === 'trainer' ? '#3b9d5d' : '#d64545'} label="Vida del enemigo" /></div>
          {enemy.phases && <p className="mt-1 text-[11px] text-paper/50">Fase {phaseAt(battle.enemyHp) + 1} de {enemy.phases.length}</p>}
        </Panel>
      </div>

      <div className="relative shrink-0 overflow-hidden rounded-2xl border-2 border-line">
        <svg viewBox="0 0 360 220" className="block w-full" role="img" aria-label={`Combate contra ${enemy.name}`}>
          <Backdrop zone={zone} />
          <g transform="translate(26 92) scale(3.8)">
            <g className={heroAnim} onAnimationEnd={() => setHeroAnim('')}>
              <SpriteBody look={hero} mood={(phase === 'feedback' && !correct && !blocked) || phase === 'lost' ? 'hurt' : state.recovered.length ? 'normal' : 'mute'} />
            </g>
          </g>
          {blocked && phase === 'feedback' && (
            <circle cx="88" cy="150" r="70" fill="none" stroke="#9cc0f0" strokeWidth="5" opacity="0.8" className="anim-pop" />
          )}
          <g transform={`translate(${enemy.kind === 'boss' ? 342 : 334} ${enemy.kind === 'boss' ? 68 : 92}) scale(${enemy.kind === 'boss' ? -4.6 : -3.8} ${enemy.kind === 'boss' ? 4.6 : 3.8})`}>
            <g className={enemyAnim} onAnimationEnd={() => setEnemyAnim('')}>
              <SpriteBody look={{ ...enemy.look }} mood={(phase === 'feedback' && correct) || phase === 'after' ? 'hurt' : 'normal'} />
            </g>
          </g>
          {hitText && (
            <text
              key={hitText.n}
              x={hitText.who === 'enemy' ? 270 : 90}
              y="80"
              textAnchor="middle"
              fontSize="22"
              fontFamily="Fredoka, Nunito, system-ui, sans-serif"
              fontWeight="600"
              fill={hitText.who === 'enemy' ? '#d64545' : hitText.text === '-1' ? '#e0a526' : '#9cc0f0'}
              stroke="#1c1a17"
              strokeWidth="3"
              paintOrder="stroke"
              className="anim-float-up"
            >
              {hitText.text}
            </text>
          )}
        </svg>
        {phase === 'story' && line === 0 && <div className="anim-wipe pointer-events-none absolute inset-0 bg-paper" />}
      </div>

      {(phase === 'story' || phase === 'after') && story && (
        <Panel className="anim-fade-in">
          <div className="flex items-center justify-between gap-2">
            <p className="font-display text-lg text-gold">{enemy.kind !== 'minion' || phase === 'after' ? enemy.person : enemy.name}</p>
            <SpeakButton text={story.text} size="sm" />
          </div>
          <p key={`${phase}-${line}`} className="anim-fade-in text-[17px] leading-relaxed">"{story.text}"</p>
          {showEs && story.es && <p className="mt-1 text-sm text-paper/60">{story.es}</p>}
          <div className="mt-3 flex items-center justify-between">
            {story.es ? (
              <button className={btnGhost} onClick={() => setShowEs((v) => !v)}>{showEs ? 'Ocultar' : 'Traducir'}</button>
            ) : <span />}
            <button className={btnPrimary} onClick={nextStory} autoFocus>
              {phase === 'story' && line === storyLines.length - 1 ? '¡A pelear!' : 'Siguiente'}
            </button>
          </div>
        </Panel>
      )}

      {showQuestion && (
        <Panel className="anim-fade-in">
          {wasMistake && phase === 'ask' && (
            <p className="mb-2 rounded-lg bg-gold/10 px-2 py-1 text-xs font-semibold text-gold">Esta pregunta está en tu cuaderno de errores</p>
          )}
          <QuestionCard
            key={`${q.id}-${used.length}`}
            q={q}
            speaker={enemy.person}
            hint={hint}
            onAnswer={(ok) => phase === 'ask' && resolve(ok)}
            headerRight={
              leoHint && phase === 'ask' ? (
                <button className="rounded-lg border border-hp/60 px-2 py-1 text-xs font-semibold text-hp disabled:opacity-40" onClick={() => setHint(true)} disabled={hint}>
                  Pista de Leo
                </button>
              ) : undefined
            }
          />

          {phase === 'feedback' && correct && battle.enemyHp > 0 && interlude && (
            <div className="anim-fade-in mt-3 rounded-xl border-2 border-[#a07cd0]/60 bg-[#a07cd0]/10 p-3">
              <div className="flex items-center justify-between gap-2">
                <p className="font-display text-lg text-[#c9b3ee]">{enemy.person} cambia...</p>
                <SpeakButton text={interlude.text} size="sm" />
              </div>
              <p className="text-[16px] leading-snug">"{interlude.text}"</p>
              {interlude.es && <p className="mt-1 text-sm text-paper/60">{interlude.es}</p>}
              <div className="mt-3 flex justify-end">
                <button className={btnPrimary} onClick={nextQuestion} autoFocus>Siguiente fase</button>
              </div>
            </div>
          )}
          {phase === 'feedback' && correct && battle.enemyHp > 0 && !interlude && (
            <div className="anim-fade-in mt-3 flex items-center justify-between gap-2">
              <p className="text-sm font-semibold text-hp">
                {q.kind === 'fix' ? '¡Lo corregiste! El golpe acertó.' : '¡Correcto! El golpe acertó.'}
              </p>
              <button className={btnPrimary} onClick={nextQuestion} autoFocus>Seguir</button>
            </div>
          )}
          {(phase === 'feedback' || phase === 'lost') && !correct && (
            <div className="anim-fade-in mt-3 rounded-xl bg-panel-2 p-3">
              {blocked && <p className="mb-1 text-sm font-semibold text-[#9cc0f0]">Tu escudo de palabras bloqueó el golpe.</p>}
              <p className="text-sm font-semibold text-gold">{metLeo ? 'Pista de Leo' : 'Pista'}</p>
              <p className="mt-0.5 text-[15px] leading-snug">{q.tip}</p>
              <p className="mt-1 text-xs text-paper/50">Se anotó en tu cuaderno de errores.</p>
              <div className="mt-3 flex justify-end">
                {phase === 'lost' ? (
                  <button className={btnPrimary} onClick={leave} autoFocus>{enemy.kind === 'trainer' ? 'Intentar otra vez' : 'Volver a intentarlo'}</button>
                ) : (
                  <button className={btnPrimary} onClick={nextQuestion} autoFocus>Seguir</button>
                )}
              </div>
              {phase === 'lost' && (
                <p className="mt-2 text-xs text-paper/60">
                  {enemy.kind === 'trainer'
                    ? 'Leo: "Don\'t worry, it\'s just practice!" Vuelves a empezar con la vida llena.'
                    : 'Te quedaste sin energía. Volverás a la entrada con la vida llena.'}
                </p>
              )}
            </div>
          )}
        </Panel>
      )}

      {phase === 'bonus' && bonusSession && (
        <Panel className="anim-fade-in">
          <p className="text-xs font-semibold uppercase tracking-wide text-gold">{bonusSession.title}</p>
          <div className="mt-1 flex items-start gap-2">
            <p className="flex-1 text-[17px] leading-relaxed">
              <span className="font-semibold text-gold">{enemy.person}: </span>"{bonusSession.bonus.q}"
            </p>
            <SpeakButton text={bonusSession.bonus.q} size="sm" />
          </div>
          <div className="mt-3 grid gap-2">
            {bonusSession.bonus.options.map((o, k) => {
              const right = k === bonusSession.bonus.answer
              const look =
                bonusPick === null ? 'border-line bg-panel-2' : right ? 'border-hp bg-hp/25' : bonusPick === k ? 'border-danger bg-danger/25' : 'border-line bg-panel-2 opacity-40'
              return (
                <button
                  key={k}
                  className={`rounded-xl border-2 px-3 py-2.5 text-left font-display text-[16px] text-paper transition ${look}`}
                  disabled={bonusPick !== null}
                  onClick={() => {
                    setBonusPick(k)
                    if (right && bonusSession.shield) update((s) => ({ ...s, items: { ...s.items, shield: Math.min(2, s.items.shield + 1) } }))
                  }}
                >
                  {o}
                </button>
              )
            })}
          </div>
          {bonusPick !== null && (
            <div className="anim-fade-in mt-3 rounded-xl bg-panel-2 p-3">
              {bonusPick === bonusSession.bonus.answer ? (
                <p className="text-sm font-semibold text-hp">
                  {bonusSession.shield ? '¡Correcto! Leíste bien el horario. Ganaste un escudo de palabras (máximo 2).' : '¡Muy bien! Así se despide uno en inglés.'}
                </p>
              ) : (
                <p className="text-[15px] leading-snug"><span className="font-semibold text-gold">Pista: </span>{bonusSession.bonus.tip}</p>
              )}
              <div className="mt-3 flex justify-end">
                <button className={btnPrimary} onClick={() => setPhase('won')} autoFocus>Continuar</button>
              </div>
            </div>
          )}
        </Panel>
      )}

      {phase === 'won' && (
        <Panel className="anim-pop border-gold">
          <p className="font-display text-2xl text-gold">{enemy.kind === 'trainer' ? '¡Entrenamiento completo!' : '¡Victoria!'}</p>
          {enemy.kind === 'trainer' ? (
            <p className="mt-1 text-[16px]">
              Leo ahora es tu amigo. Si fallas en un combate, te dará una pista. Tu aventura empieza en la escuela.
            </p>
          ) : enemy.optional ? (
            <p className="mt-1 text-[16px]">{enemy.person} te regaló un atuendo nuevo. Póntelo desde Atuendos.</p>
          ) : enemy.kind === 'minion' ? (
            <p className="mt-1 text-[16px]">
              {enemy.person} te dio un pedazo de llave. Llevas {keysNow} de {scene.keysNeeded}.
              {enemy.reward && ` También te regaló: ${OUTFITS[enemy.reward].name}.`}
              {keysNow >= scene.keysNeeded && ' ¡La sala de profesores ya está abierta!'}
              {session && session.id !== 'board-4' && ' Mira la pizarra del aula: apareció una clase nueva en el horario.'}
            </p>
          ) : (
            <div className="mt-1 grid gap-1.5 text-[16px]">
              <p>Recuperaste una parte de tu voz: <b>{listEs(enemy.topics.map((t) => TOPICS[t].name.toLowerCase()))}</b>.</p>
              <div className="my-1 flex items-center gap-3 rounded-xl bg-panel-2 p-2">
                <TimeClock pieces={state.relics} size={72} highlight={state.relics - 1} />
                <p className="text-[15px]">
                  <b className="text-gold">¡Pieza del reloj!</b> Tienes {Math.min(state.relics, WORLD.length)} de {WORLD.length}. Grimm la tenía: el desconocido la dejó caer.
                </p>
              </div>
              <p className="text-paper/75">También ganaste la Capa del tiempo. Tus amigos tienen cosas nuevas que contarte.</p>
            </div>
          )}
          <button className={`${btnPrimary} mt-4 w-full`} onClick={leave} autoFocus>{enemy.kind === 'trainer' ? 'Ir al mapa' : 'Continuar'}</button>
        </Panel>
      )}
    </div>
  )
}

/** "a, b y c" */
function listEs(items: string[]) {
  return items.length <= 1 ? items.join('') : `${items.slice(0, -1).join(', ')} y ${items[items.length - 1]}`
}
