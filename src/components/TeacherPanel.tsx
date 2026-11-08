import { useState } from 'react'
import type { GameState } from '../game/types'
import type { Update } from '../game/store'
import { PRESETS, b1Mission1, b1Mission2, b1Mission3, b1Mission4, b1Mission5, b1Mission6, b1Mission7, setTeacher, skipLessons, useTeacher } from '../game/teacher'
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
import { B1_TABLET_TEST } from '../data/b1TabletDemo'
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

            <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-paper/55">B1-1 · The Accident</p>
            <div className="mt-1 grid grid-cols-2 gap-2">
              <button className={`${btn} px-2 text-sm`} onClick={() => go((s) => b1Mission1(s, 'memory'))}>B1-1: entrar al recuerdo</button>
              <button className={`${btn} px-2 text-sm`} onClick={() => go((s) => b1Mission1(s, 'alarm'))}>B1-1: ir a la alarma</button>
              <button className={`${btn} px-2 text-sm`} onClick={() => go((s) => b1Mission1(s, 'call'))}>B1-1: ir al Call for Help</button>
              <button className={`${btn} px-2 text-sm`} onClick={() => go((s) => b1Mission1(s, 'epilogue'))}>B1-1: epílogo (ya despiertas)</button>
              <button className={`${btn} col-span-2 px-2 text-sm`} onClick={() => go((s) => b1Mission1(s, 'echo'))}>B1-1: Smoke Echo</button>
            </div>
            <p className="mt-1 text-xs text-paper/55">En el recuerdo, habla con el amigo (junto a la puerta) para empezar o seguir la secuencia.</p>

            <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-paper/55">B1-2 · A New City</p>
            <div className="mt-1 grid grid-cols-2 gap-2">
              <button className={`${btn} px-2 text-sm`} onClick={() => go((s) => b1Mission2(s, 'plane'))}>B1-2: empezar en el avión</button>
              <button className={`${btn} px-2 text-sm`} onClick={() => go((s) => b1Mission2(s, 'airport'))}>B1-2: llegar al aeropuerto (después de las charlas)</button>
              <button className={`${btn} px-2 text-sm`} onClick={() => go((s) => b1Mission2(s, 'trav1'))}>B1-2: viajero 1</button>
              <button className={`${btn} px-2 text-sm`} onClick={() => go((s) => b1Mission2(s, 'luggage'))}>B1-2: Lost Luggage</button>
              <button className={`${btn} px-2 text-sm`} onClick={() => go((s) => b1Mission2(s, 'jack'))}>B1-2: Jack</button>
              <button className={`${btn} px-2 text-sm`} onClick={() => go((s) => b1Mission2(s, 'shop'))}>B1-2: tienda</button>
              <button className={`${btn} px-2 text-sm`} onClick={() => go((s) => b1Mission2(s, 'office'))}>B1-2: oficina (Ms. Haddad)</button>
              <button className={`${btn} px-2 text-sm`} onClick={() => go((s) => b1Mission2(s, 'route'))}>B1-2: Route Challenge</button>
              <button className={`${btn} px-2 text-sm`} onClick={() => go((s) => b1Mission2(s, 'boss'))}>B1-2: Captain Delay</button>
              <button className={`${btn} px-2 text-sm`} onClick={() => go((s) => b1Mission2(s, 'close'))}>B1-2: cierre</button>
            </div>

            <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-paper/55">B1-3 · Words on a Screen</p>
            <div className="mt-1 grid grid-cols-2 gap-2">
              <button className={`${btn} px-2 text-sm`} onClick={() => go((s) => b1Mission3(s, 'memory'))}>B1-3: entrar al recuerdo</button>
              <button className={`${btn} px-2 text-sm`} onClick={() => go((s) => b1Mission3(s, 'notebook'))}>B1-3: ir al cuaderno (ya hablaste con la médica)</button>
              <button className={`${btn} px-2 text-sm`} onClick={() => go((s) => b1Mission3(s, 'texts'))}>B1-3: Text Only</button>
              <button className={`${btn} px-2 text-sm`} onClick={() => go((s) => b1Mission3(s, 'notebook2'))}>B1-3: página 2 del cuaderno</button>
              <button className={`${btn} px-2 text-sm`} onClick={() => go((s) => b1Mission3(s, 'unread'))}>B1-3: Unread Messages</button>
              <button className={`${btn} px-2 text-sm`} onClick={() => go((s) => b1Mission3(s, 'static'))}>B1-3: The Static</button>
              <button className={`${btn} px-2 text-sm`} onClick={() => go((s) => b1Mission3(s, 'close'))}>B1-3: cierre</button>
            </div>

            <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-paper/55">B1-4 · House Rules</p>
            <div className="mt-1 grid grid-cols-2 gap-2">
              <button className={`${btn} px-2 text-sm`} onClick={() => go((s) => b1Mission4(s, 'start'))}>B1-4: empezar</button>
              <button className={`${btn} px-2 text-sm`} onClick={() => go((s) => b1Mission4(s, 'lesson'))}>B1-4: lección de Maya (ya hablaste con Marisol)</button>
              <button className={`${btn} px-2 text-sm`} onClick={() => go((s) => b1Mission4(s, 'fineprint'))}>B1-4: The Fine Print</button>
              <button className={`${btn} px-2 text-sm`} onClick={() => go((s) => b1Mission4(s, 'jeison'))}>B1-4: Jeison</button>
              <button className={`${btn} px-2 text-sm`} onClick={() => go((s) => b1Mission4(s, 'neighbours'))}>B1-4: vecinos ruidosos</button>
              <button className={`${btn} px-2 text-sm`} onClick={() => go((s) => b1Mission4(s, 'repair'))}>B1-4: Repair Shop</button>
              <button className={`${btn} px-2 text-sm`} onClick={() => go((s) => b1Mission4(s, 'bank'))}>B1-4: banco (Ricardo)</button>
              <button className={`${btn} px-2 text-sm`} onClick={() => go((s) => b1Mission4(s, 'phrasal'))}>B1-4: lección de phrasal verbs (ya hablaste con Ricardo)</button>
              <button className={`${btn} px-2 text-sm`} onClick={() => go((s) => b1Mission4(s, 'boss'))}>B1-4: jefe Mr. Fine Print</button>
              <button className={`${btn} px-2 text-sm`} onClick={() => go((s) => b1Mission4(s, 'maya'))}>B1-4: charla con Maya</button>
              <button className={`${btn} px-2 text-sm`} onClick={() => go((s) => b1Mission4(s, 'close'))}>B1-4: cierre</button>
            </div>

            <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-paper/55">B1-5 · Nothing Left</p>
            <div className="mt-1 grid grid-cols-2 gap-2">
              <button className={`${btn} px-2 text-sm`} onClick={() => go((s) => b1Mission5(s, 'letter'))}>B1-5: carta de la escuela</button>
              <button className={`${btn} px-2 text-sm`} onClick={() => go((s) => b1Mission5(s, 'notebook'))}>B1-5: Cuaderno (used to)</button>
              <button className={`${btn} px-2 text-sm`} onClick={() => go((s) => b1Mission5(s, 'jobs'))}>B1-5: anuncios de empleo</button>
              <button className={`${btn} px-2 text-sm`} onClick={() => go((s) => b1Mission5(s, 'bank'))}>B1-5: banco</button>
              <button className={`${btn} px-2 text-sm`} onClick={() => go((s) => b1Mission5(s, 'notebook2'))}>B1-5: Cuaderno (be/get used to)</button>
              <button className={`${btn} px-2 text-sm`} onClick={() => go((s) => b1Mission5(s, 'chest'))}>B1-5: Memory Chest</button>
              <button className={`${btn} px-2 text-sm`} onClick={() => go((s) => b1Mission5(s, 'notice'))}>B1-5: carta de desalojo</button>
              <button className={`${btn} px-2 text-sm`} onClick={() => go((s) => b1Mission5(s, 'evictions'))}>B1-5: Eviction Notice (2)</button>
              <button className={`${btn} px-2 text-sm`} onClick={() => go((s) => b1Mission5(s, 'boss'))}>B1-5: jefe The Collector</button>
              <button className={`${btn} px-2 text-sm`} onClick={() => go((s) => b1Mission5(s, 'close'))}>B1-5: cierre</button>
            </div>

            <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-paper/55">B1-6 · First Job</p>
            <div className="mt-1 grid gap-2">
              <button className={`${btn} px-2 text-sm`} onClick={() => go((s) => b1Mission6(s, 'lesson'))}>B1-6: Ms. Haddad (lección)</button>
              <button className={`${btn} px-2 text-sm`} onClick={() => go((s) => b1Mission6(s, 'board'))}>B1-6: el tablón</button>
              <button className={`${btn} px-2 text-sm`} onClick={() => go((s) => b1Mission6(s, 'apply'))}>B1-6: cómo postularse</button>
              <button className={`${btn} px-2 text-sm`} onClick={() => go((s) => b1Mission6(s, 'nayi'))}>B1-6: Nayi (relativos)</button>
              <button className={`${btn} px-2 text-sm`} onClick={() => go((s) => b1Mission6(s, 'dogs'))}>B1-6: Which Dog?</button>
              <button className={`${btn} px-2 text-sm`} onClick={() => go((s) => b1Mission6(s, 'experience'))}>B1-6: Nayi (experiencia)</button>
              <button className={`${btn} px-2 text-sm`} onClick={() => go((s) => b1Mission6(s, 'volunteers'))}>B1-6: voluntarios (2)</button>
              <button className={`${btn} px-2 text-sm`} onClick={() => go((s) => b1Mission6(s, 'interview'))}>B1-6: entrevista con Esteban</button>
              <button className={`${btn} px-2 text-sm`} onClick={() => go((s) => b1Mission6(s, 'boss'))}>B1-6: jefe The Interviewer</button>
              <button className={`${btn} px-2 text-sm`} onClick={() => go((s) => b1Mission6(s, 'leo'))}>B1-6: charla con Leo</button>
              <button className={`${btn} px-2 text-sm`} onClick={() => go((s) => b1Mission6(s, 'close'))}>B1-6: cierre</button>
            </div>

            <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-paper/55">B1-7 · The Underworld</p>
            <div className="mt-1 grid gap-2">
              <button className={`${btn} px-2 text-sm`} onClick={() => go((s) => b1Mission7(s, 'news'))}>B1-7: las noticias (pasiva)</button>
              <button className={`${btn} px-2 text-sm`} onClick={() => go((s) => b1Mission7(s, 'now'))}>B1-7: Cuaderno p.15 (must / might / can't)</button>
              <button className={`${btn} px-2 text-sm`} onClick={() => go((s) => b1Mission7(s, 'past'))}>B1-7: Cuaderno p.16 (deducción en el pasado)</button>
            </div>

            <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-paper/55">B1 · Recuerdos</p>
            <div className="mt-1 grid gap-2">
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
                    // La tablilla de prueba como tarea (activity 'inscriptions'), en su sala de prueba (data/b1TabletDemo.ts)
                    const b = enterMemory(PRESETS.find((p) => p.id === 'b1-opened')!.apply(s), 9, B1_TABLET_TEST.id, B1_TABLET_TEST.start)
                    return { ...b, opened: b.opened.filter((o) => o !== 'b1-demo-inscriptions') }
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
