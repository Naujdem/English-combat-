import { useEffect, useState } from 'react'
import { clearSave, newGame, useGameState } from './game/store'
import { SCENES } from './game/helpers'
import { Title } from './screens/Title'
import { Intro } from './screens/Intro'
import { World } from './screens/World'
import { Explore } from './screens/Explore'
import { Battle } from './screens/Battle'
import { Epilogue } from './screens/Epilogue'
import { TeacherPanel } from './components/TeacherPanel'
import { WordProvider } from './components/Words'
import { ENEMIES } from './data/enemies'
import { ACHIEVEMENTS, achieved } from './data/collection'
import { OUTFITS } from './data/school'
import { sfx } from './game/sfx'
import { KEYWORDS } from './data/keywords'
import { newCard } from './game/cards'

/** Un capítulo terminado cuyo final todavía no se vio (por si se cerró el juego en medio) */
function pendingEpilogue(s: ReturnType<typeof useGameState>['state']) {
  const scene = SCENES[s.sceneId]
  const boss = scene?.entities.find((e) => e.type === 'boss')
  return !!(scene?.epilogue && boss && 'id' in boss && s.defeated.includes(boss.id) && !s.opened.includes(scene.epilogue))
}

export default function App() {
  const { state, update, setState } = useGameState()
  const [flash, setFlash] = useState(0)
  const [toast, setToast] = useState<{ kind: 'logro' | 'fichas'; text: string }[]>([])

  // Logros nuevos: se avisan una vez (se guardan en opened como logro-<id>) y entregan su premio
  useEffect(() => {
    if (state.screen === 'title' || state.screen === 'intro') return
    const fresh = ACHIEVEMENTS.filter((a) => !state.opened.includes(`logro-${a.id}`) && achieved(a, state))
    if (!fresh.length) return
    update((s) => ({
      ...s,
      opened: [...s.opened, ...fresh.map((a) => `logro-${a.id}`)],
      outfits: [...s.outfits, ...fresh.map((a) => a.reward).filter((r): r is string => !!r && !s.outfits.includes(r))],
    }))
    sfx('item')
    setToast((t) => [...t, ...fresh.map((a) => ({ kind: 'logro' as const, text: a.reward ? `${a.name} · Premio: ${OUTFITS[a.reward].name}` : a.name }))])
  }, [state, update])

  // Al terminar un escenario, sus palabras clave entran solas a las fichas (un mazo por lugar)
  useEffect(() => {
    if (state.screen === 'title' || state.screen === 'intro') return
    const ready = Object.keys(KEYWORDS).filter((id) => SCENES[id]?.epilogue && state.opened.includes(SCENES[id].epilogue!) && !state.opened.includes(`deck-${id}`))
    if (!ready.length) return
    update((s) => {
      const have = new Set(s.cards.map((c) => c.id))
      const cards = [...s.cards]
      for (const id of ready)
        for (const [en, es, ex] of KEYWORDS[id]) {
          if (have.has(en.toLowerCase())) continue
          have.add(en.toLowerCase())
          cards.push(newCard(en, es, ex, { deck: SCENES[id].name }))
        }
      return { ...s, cards, opened: [...s.opened, ...ready.map((id) => `deck-${id}`)] }
    })
    setToast((t) => [...t, { kind: 'fichas' as const, text: ready.length > 2 ? `Palabras clave de ${ready.length} lugares: ya están en tus fichas para repasar.` : `Palabras clave de ${ready.map((id) => SCENES[id].name).join(' y ')}: ya están en tus fichas para repasar.` }])
  }, [state, update])

  useEffect(() => {
    if (!toast.length) return
    const t = window.setTimeout(() => setToast([]), 4500)
    return () => window.clearTimeout(t)
  }, [toast])

  function go(screen: typeof state.screen) {
    update((s) => ({ ...s, screen }))
  }

  function startBattle(enemyId: string) {
    const enemy = ENEMIES[enemyId]
    setFlash(Date.now())
    window.setTimeout(() => {
      update((s) => ({
        ...s,
        screen: 'battle',
        battle: { enemyId, enemyHp: enemy.hp, returnTo: { ...s.pos } },
      }))
    }, 260)
  }

  let screen
  switch (state.screen) {
    case 'title':
      screen = (
        <Title
          state={state}
          onContinue={() =>
            go(state.battle ? 'battle' : pendingEpilogue(state) ? 'epilogue' : 'world')
          }
          onNew={() => {
            clearSave()
            setState(newGame())
          }}
        />
      )
      break
    case 'intro':
      screen = (
        <Intro
          state={state}
          onDone={({ lessonDone, hero, interest }) =>
            update((s) => ({
              ...s,
              hero,
              interest,
              seenLesson: lessonDone && !s.seenLesson.includes('to-be') ? [...s.seenLesson, 'to-be'] : s.seenLesson,
              // Primer combate: entrenamiento con Leo
              screen: 'battle',
              battle: { enemyId: 'leo-trainer', enemyHp: ENEMIES['leo-trainer'].hp, returnTo: { ...s.pos } },
            }))
          }
        />
      )
      break
    case 'world':
      screen = (
        <World
          state={state}
          update={update}
          onTitle={() => go('title')}
          onEnter={(sceneId) => update((s) => ({ ...s, sceneId, pos: s.sceneId === sceneId ? s.pos : { ...SCENES[sceneId].start }, screen: 'explore' }))}
        />
      )
      break
    case 'explore':
      screen = <Explore state={state} update={update} onBattle={startBattle} onWorld={() => go('world')} />
      break
    case 'battle':
      screen = state.battle ? <Battle key={state.battle.enemyId} state={state} update={update} onExit={() => setFlash(0)} /> : null
      break
    case 'epilogue':
      screen = (
        <Epilogue
          state={state}
          onDone={() =>
            update((s) => ({
              ...s,
              opened: (() => {
                const id = SCENES[s.sceneId].epilogue ?? 'school-epilogue'
                return s.opened.includes(id) ? s.opened : [...s.opened, id]
              })(),
              screen: 'world',
            }))
          }
        />
      )
      break
  }

  return (
    <main className="relative h-full w-full overflow-hidden">
      <WordProvider state={state} update={update}>
        {screen}
      </WordProvider>
      <TeacherPanel state={state} update={update} />
      {toast.length > 0 && (
        <div className="pointer-events-none absolute inset-x-0 top-3 z-50 flex justify-center px-3" role="status">
          <div className="anim-fade-in max-w-sm rounded-2xl border-2 border-gold bg-panel px-4 py-2 shadow-lg">
            {(['logro', 'fichas'] as const).map((k) => {
              const items = toast.filter((t) => t.kind === k)
              if (!items.length) return null
              return (
                <div key={k}>
                  <p className="font-display text-[15px] text-gold">{k === 'logro' ? '★ ¡Logro desbloqueado!' : '🗂 Fichas nuevas'}</p>
                  {items.slice(0, 3).map((t) => <p key={t.text} className="text-sm text-paper/85">{t.text}</p>)}
                  {items.length > 3 && <p className="text-xs text-paper/60">y {items.length - 3} más</p>}
                </div>
              )
            })}
          </div>
        </div>
      )}
      {flash > 0 && state.screen === 'explore' && (
        <div key={flash} className="anim-wipe pointer-events-none absolute inset-0 z-50 bg-paper" />
      )}
    </main>
  )
}
