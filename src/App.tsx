import { useState } from 'react'
import { clearSave, newGame, useGameState } from './game/store'
import { SCENES } from './game/helpers'
import { Title } from './screens/Title'
import { Create } from './screens/Create'
import { Intro } from './screens/Intro'
import { World } from './screens/World'
import { Explore } from './screens/Explore'
import { Battle } from './screens/Battle'
import { ENEMIES } from './data/school'

export default function App() {
  const { state, update, setState } = useGameState()
  const [flash, setFlash] = useState(0)

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
          onContinue={() => go(state.battle ? 'battle' : 'world')}
          onNew={() => {
            clearSave()
            setState(newGame())
          }}
        />
      )
      break
    case 'create':
      screen = <Create onDone={(hero, interest) => update((s) => ({ ...s, hero, interest, screen: 'intro' }))} />
      break
    case 'intro':
      screen = <Intro state={state} onDone={() => go('world')} />
      break
    case 'world':
      screen = (
        <World
          state={state}
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
  }

  return (
    <main className="relative h-full w-full overflow-hidden">
      {screen}
      {flash > 0 && state.screen === 'explore' && (
        <div key={flash} className="anim-wipe pointer-events-none absolute inset-0 z-50 bg-paper" />
      )}
    </main>
  )
}
