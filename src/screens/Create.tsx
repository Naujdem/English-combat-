import { useState } from 'react'
import type { Gender, Hero, Interest } from '../game/types'
import { SpriteIcon } from '../components/Sprite'
import { btn, btnPrimary, Panel } from '../components/ui'

const SKINS = ['#f6d3b3', '#f1c27d', '#c68642', '#8d5524']
const HAIRS = ['#1f1f1f', '#4a2c17', '#a0522d', '#d9b46a']

function Choice<T extends string>({ value, options, onChange }: { value: T; options: { v: T; label: string }[]; onChange: (v: T) => void }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {options.map((o) => (
        <button
          key={o.v}
          type="button"
          onClick={() => onChange(o.v)}
          className={`rounded-xl border-2 px-3 py-2 font-semibold transition ${value === o.v ? 'border-gold bg-gold/15 text-gold' : 'border-line text-paper/80'}`}
          aria-pressed={value === o.v}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

function Swatches({ colors, value, onChange, label }: { colors: string[]; value: string; onChange: (c: string) => void; label: string }) {
  return (
    <div className="flex gap-2" role="radiogroup" aria-label={label}>
      {colors.map((c) => (
        <button
          key={c}
          type="button"
          role="radio"
          aria-checked={value === c}
          aria-label={c}
          onClick={() => onChange(c)}
          className={`h-9 w-9 rounded-full border-[3px] transition ${value === c ? 'scale-110 border-gold' : 'border-transparent'}`}
          style={{ background: c }}
        />
      ))}
    </div>
  )
}

const GENDERS: { v: Gender; label: string }[] = [
  { v: 'male', label: 'Masculino' },
  { v: 'female', label: 'Femenino' },
]

export function Create({ onDone }: { onDone: (hero: Hero, interest: Interest) => void }) {
  const [step, setStep] = useState<0 | 1>(0)
  const [hero, setHero] = useState<Hero>({ name: '', gender: 'male', look: { skin: SKINS[1], hair: HAIRS[1] } })
  const [interest, setInterest] = useState<Interest>({ name: '', gender: 'female', mode: 'romance' })
  const [error, setError] = useState('')

  const heroPreview = { shirt: '#3b6fb6', cape: '#c0392b', hair: hero.look.hair, skin: hero.look.skin, gender: hero.gender, book: true }
  const interestPreview =
    interest.gender === 'female'
      ? { shirt: '#5d8fd4', hair: '#6b3b1f', skin: '#f1c27d', gender: 'female' as const }
      : { shirt: '#5d8fd4', hair: '#1f1f1f', skin: '#e0ac69', gender: 'male' as const }

  function nextStep() {
    if (!hero.name.trim()) return setError('Escribe un nombre para tu personaje.')
    setError('')
    setStep(1)
  }

  function finish() {
    if (!interest.name.trim()) return setError('Escribe un nombre para este personaje.')
    setError('')
    onDone({ ...hero, name: hero.name.trim() }, { ...interest, name: interest.name.trim() })
  }

  return (
    <div className="mx-auto flex h-full max-w-md flex-col gap-4 overflow-y-auto px-4 py-6">
      <p className="text-center text-sm text-paper/60">Paso {step + 1} de 2</p>
      {step === 0 ? (
        <Panel className="anim-fade-in flex flex-col gap-4">
          <h2 className="font-display text-2xl">Tu personaje</h2>
          <div className="flex justify-center rounded-xl bg-panel-2 py-2">
            <SpriteIcon look={heroPreview} size={120} />
          </div>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-semibold text-paper/80">Nombre</span>
            <input
              value={hero.name}
              maxLength={14}
              onChange={(e) => { setHero({ ...hero, name: e.target.value }); setError('') }}
              placeholder="Alex"
              className="rounded-xl border-2 border-line bg-ink px-3 py-2.5 text-lg outline-none focus:border-gold"
            />
          </label>
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-semibold text-paper/80">Género</span>
            <Choice value={hero.gender} options={GENDERS} onChange={(g) => setHero({ ...hero, gender: g })} />
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-semibold text-paper/80">Piel</span>
            <Swatches label="Tono de piel" colors={SKINS} value={hero.look.skin} onChange={(c) => setHero({ ...hero, look: { ...hero.look, skin: c } })} />
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-semibold text-paper/80">Cabello</span>
            <Swatches label="Color de cabello" colors={HAIRS} value={hero.look.hair} onChange={(c) => setHero({ ...hero, look: { ...hero.look, hair: c } })} />
          </div>
          {error && <p className="text-sm text-[#f3b0b0]">{error}</p>}
          <button className={btnPrimary} onClick={nextStep}>Siguiente</button>
        </Panel>
      ) : (
        <Panel className="anim-fade-in flex flex-col gap-4">
          <h2 className="font-display text-2xl">Alguien especial</h2>
          <p className="-mt-2 text-sm text-paper/65">Conocerás a esta persona en la escuela. Sus charlas cubren temas como amistad, planes y celebraciones.</p>
          <div className="flex justify-center rounded-xl bg-panel-2 py-2">
            <SpriteIcon look={interestPreview} size={120} />
          </div>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-semibold text-paper/80">Nombre</span>
            <input
              value={interest.name}
              maxLength={14}
              onChange={(e) => { setInterest({ ...interest, name: e.target.value }); setError('') }}
              placeholder="Sam"
              className="rounded-xl border-2 border-line bg-ink px-3 py-2.5 text-lg outline-none focus:border-gold"
            />
          </label>
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-semibold text-paper/80">Género</span>
            <Choice value={interest.gender} options={GENDERS} onChange={(g) => setInterest({ ...interest, gender: g })} />
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-semibold text-paper/80">Tipo de relación</span>
            <Choice
              value={interest.mode}
              options={[
                { v: 'romance', label: 'Romántica' },
                { v: 'friendship', label: 'Solo amistad' },
              ]}
              onChange={(m) => setInterest({ ...interest, mode: m })}
            />
          </div>
          {error && <p className="text-sm text-[#f3b0b0]">{error}</p>}
          <div className="flex gap-2">
            <button className={`${btn} flex-1`} onClick={() => setStep(0)}>Atrás</button>
            <button className={`${btnPrimary} flex-[2]`} onClick={finish}>Comenzar</button>
          </div>
        </Panel>
      )}
    </div>
  )
}
