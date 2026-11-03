import { useState } from 'react'
import type { GameState } from '../game/types'
import type { Update } from '../game/store'
import { PRESETS, setTeacher, skipLessons, useTeacher } from '../game/teacher'
import { SCENES } from '../game/helpers'
import { walkable } from './Tiles'
import { ENEMIES } from '../data/enemies'
import { NPCS } from '../data/npcs'
import { btn, btnGhost, Overlay, Panel } from './ui'
import { FragmentJoin } from './FragmentJoin'
import { MemoryFrame } from './MemoryFrame'
import { MiniTalk } from './MiniTalk'
import { SpriteL } from './SpriteL'
import { BlurFace, BlurFaceIcon } from './BlurFace'
import { enterMemory } from '../game/memory'
import { B1_MEMORY_DEMO } from '../data/b1MemoryDemo'
import { Inscriptions } from './Inscriptions'
import { INS_DEMOS } from '../data/b1InscriptionsDemo'
import { CommandPuzzle } from './CommandPuzzle'
import { STONE_DEMOS } from '../data/b1StoneDemo'

/** Botón flotante y panel del modo profesor */
export function TeacherPanel({ state, update }: { state: GameState; update: Update }) {
  const t = useTeacher()
  const [open, setOpen] = useState(false)
  // B1: vistas de prueba de la estética de los recuerdos (no cambian la partida)
  const [demo, setDemo] = useState<'frag-first' | 'frag-next' | 'static' | 'ins-door' | 'ins-bridge' | 'stone-temple' | 'stone-room' | 'stone-tunnel' | null>(null)
  if (!t.on) return null

  const scene = SCENES[state.sceneId]
  const go = (fn: (s: GameState) => GameState) => {
    update(fn)
    setOpen(false)
  }

  /** Casilla libre al lado de un personaje, para aparecer junto a él */
  function beside(x: number, y: number) {
    for (const [dx, dy] of [[0, 1], [-1, 0], [1, 0], [0, -1]]) {
      const c = scene.map[y + dy]?.[x + dx]
      const taken = scene.entities.some((e) => e.x === x + dx && e.y === y + dy)
      if (c && walkable(c, true) && !taken) return { x: x + dx, y: y + dy }
    }
    return null
  }

  const people = scene.entities
    .filter((e) => e.type !== 'chest' && e.type !== 'animal')
    .map((e) => {
      const name =
        e.type === 'enemy' || e.type === 'boss' ? ENEMIES[e.id].person : e.type === 'npc' ? NPCS[e.id].name : e.type === 'friend' ? e.id[0].toUpperCase() + e.id.slice(1) : state.interest.name
      return { name, pos: beside(e.x, e.y) }
    })
    .filter((p) => p.pos)

  return (
    <>
      {(demo === 'frag-first' || demo === 'frag-next') && (
        <FragmentJoin state={state} update={update} preview={demo === 'frag-first' ? 'first' : 'next'} onDone={() => setDemo(null)} />
      )}
      {(demo === 'ins-door' || demo === 'ins-bridge') && (
        <div className="fixed inset-0 z-[80] overflow-y-auto bg-ink/95 p-3">
          <div className="mx-auto max-w-md">
            {(() => {
              const r = INS_DEMOS[demo === 'ins-door' ? 'door' : 'bridge']
              return <Inscriptions title={r.title} intro={r.intro} scene={r.scene} plates={r.plates} finish={r.finish} onClose={() => setDemo(null)} />
            })()}
          </div>
        </div>
      )}
      {(demo === 'stone-temple' || demo === 'stone-room' || demo === 'stone-tunnel') && (
        <div className="fixed inset-0 z-[80] overflow-y-auto bg-ink/95 p-3">
          <div className="mx-auto max-w-md">
            <CommandPuzzle
              mode="text"
              name={demo === 'stone-temple' ? 'The temple' : demo === 'stone-room' ? 'Your room' : 'The tunnel'}
              room={STONE_DEMOS[demo === 'stone-temple' ? 'temple' : demo === 'stone-room' ? 'room' : 'tunnel']}
              onClose={() => setDemo(null)}
            />
          </div>
        </div>
      )}
      {demo === 'static' && (
        <div className="fixed inset-0 z-[80] bg-ink">
          <MemoryFrame entering>
            <div className="mx-auto flex h-full max-w-md flex-col justify-center gap-3 overflow-y-auto px-3 py-4">
              <p className="text-center text-xs text-paper/60">Prueba: L de espaldas, de perfil y con la mano en la garganta, y un personaje del recuerdo con la cara borrosa</p>
              <svg viewBox="0 0 128 32" className="mx-auto w-full max-w-xs" aria-hidden="true">
                <SpriteL pose="back" />
                <g transform="translate(32 0)"><SpriteL pose="profile" /></g>
                <g transform="translate(64 0)"><SpriteL pose="profile" mute /></g>
                <g transform="translate(96 0)"><BlurFace look={{ shirt: '#6a7a8c', hair: '#3b2a1a', skin: '#d8b48c' }} /></g>
              </svg>
              <MiniTalk
                name="Your friend"
                look={{ shirt: '#6a7a8c', hair: '#3b2a1a', skin: '#d8b48c' }}
                icon={<BlurFaceIcon look={{ shirt: '#6a7a8c', hair: '#3b2a1a', skin: '#d8b48c' }} size={48} />}
                steps={[{ text: 'Hey [[?]], how are you feeling?', es: 'Oye, ▒▒▒, ¿cómo te sientes?' }]}
                onClose={() => setDemo(null)}
              />
            </div>
          </MemoryFrame>
        </div>
      )}
      <button
        className="absolute bottom-1 left-1/2 z-50 -translate-x-1/2 rounded-full border border-gold/60 bg-ink/90 px-3 py-0.5 text-[11px] font-semibold text-gold"
        onClick={() => setOpen(true)}
      >
        Profe
      </button>
      {open && (
        <Overlay onClose={() => setOpen(false)}>
          <Panel className="max-h-[85vh] overflow-y-auto">
            <div className="mb-3 flex items-center justify-between">
              <p className="font-display text-xl text-gold">Modo profesor</p>
              <button className={btnGhost} onClick={() => setOpen(false)}>Cerrar</button>
            </div>

            <p className="text-xs font-semibold uppercase tracking-wide text-paper/55">Ayudas</p>
            <div className="mt-1 grid gap-2">
              <label className="flex items-center justify-between rounded-xl border-2 border-line px-3 py-2 text-[15px]">
                Mostrar la respuesta correcta en los combates
                <input type="checkbox" checked={t.answers} onChange={(e) => setTeacher({ answers: e.target.checked })} className="h-5 w-5 accent-[#e0a526]" />
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button className={`${btn} text-sm`} onClick={() => go(skipLessons)}>Saltar lecciones</button>
                <button className={`${btn} text-sm`} onClick={() => go((s) => ({ ...s, maxHp: 20, hp: 20 }))}>Vida 20</button>
                <button className={`${btn} text-sm`} onClick={() => go((s) => ({ ...s, hp: s.maxHp }))}>Llenar vida</button>
                <button className={`${btn} text-sm`} onClick={() => go((s) => ({ ...s, items: { ...s.items, shield: 2 } }))}>2 escudos</button>
              </div>
              <p className="text-xs text-paper/55">En combate aparece un botón "Ganar (profe)" para saltar el combate.</p>
            </div>

            <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-paper/55">B1 · Recuerdos</p>
            <div className="mt-1 grid gap-2">
              <button
                className={`${btn} text-left text-sm`}
                onClick={() => go((s) => enterMemory(PRESETS.find((p) => p.id === 'b1-opened')!.apply(s), 1, B1_MEMORY_DEMO.id, B1_MEMORY_DEMO.start))}
              >
                Ver demo de recuerdo
              </button>
              <div className="grid grid-cols-2 gap-2">
                <button className={`${btn} text-sm`} onClick={() => { setOpen(false); setDemo('frag-first') }}>Fragmentos: primera vez</button>
                <button className={`${btn} text-sm`} onClick={() => { setOpen(false); setDemo('frag-next') }}>Fragmentos: siguientes</button>
              </div>
              <button className={`${btn} text-left text-sm`} onClick={() => { setOpen(false); setDemo('static') }}>Probar estática de nombre</button>
              <div className="grid grid-cols-2 gap-2">
                <button className={`${btn} text-sm`} onClick={() => { setOpen(false); setDemo('ins-door') }}>Probar Inscriptions (puerta)</button>
                <button className={`${btn} text-sm`} onClick={() => { setOpen(false); setDemo('ins-bridge') }}>Probar Inscriptions (puente)</button>
              </div>
              <button
                className={`${btn} text-left text-sm`}
                onClick={() =>
                  go((s) => {
                    // La tablilla de prueba como tarea (activity 'inscriptions'), dentro de la escena de prueba del recuerdo 1
                    const b = enterMemory(PRESETS.find((p) => p.id === 'b1-opened')!.apply(s), 1, B1_MEMORY_DEMO.id, { x: 6, y: 3 })
                    return { ...b, opened: b.opened.filter((o) => o !== 'b1-01-demo-inscriptions') }
                  })
                }
              >
                Probar Inscriptions como tarea (tablilla)
              </button>
              <p className="text-xs text-paper/55">Probar Moving Stone (escribir la orden):</p>
              <div className="grid grid-cols-3 gap-2">
                <button className={`${btn} px-2 text-sm`} onClick={() => { setOpen(false); setDemo('stone-temple') }}>Templo</button>
                <button className={`${btn} px-2 text-sm`} onClick={() => { setOpen(false); setDemo('stone-room') }}>Cuarto</button>
                <button className={`${btn} px-2 text-sm`} onClick={() => { setOpen(false); setDemo('stone-tunnel') }}>Túnel</button>
              </div>
            </div>

            <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-paper/55">Saltar a</p>
            <div className="mt-1 grid gap-2">
              {PRESETS.map((p) => (
                <button key={p.id} className={`${btn} text-left text-sm`} onClick={() => go(p.apply)}>{p.label}</button>
              ))}
              <div className="grid grid-cols-2 gap-2">
                <button className={`${btn} text-sm`} onClick={() => go((s) => ({ ...s, battle: null, screen: 'world' }))}>Mapa del mundo</button>
                <button className={`${btn} text-sm`} onClick={() => go((s) => ({ ...s, battle: null, screen: 'title' }))}>Pantalla de inicio</button>
              </div>
            </div>

            {state.screen === 'explore' && people.length > 0 && (
              <>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-paper/55">Aparecer junto a</p>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {people.map((p) => (
                    <button key={p.name} className="rounded-full border border-line bg-panel-2 px-3 py-1 text-sm" onClick={() => go((s) => ({ ...s, pos: p.pos! }))}>
                      {p.name}
                    </button>
                  ))}
                </div>
              </>
            )}

            <button className={`${btnGhost} mt-5 w-full text-sm text-[#f3b0b0]`} onClick={() => { setTeacher({ on: false, answers: false }); setOpen(false) }}>
              Desactivar modo profesor
            </button>
          </Panel>
        </Overlay>
      )}
    </>
  )
}
