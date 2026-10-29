import { useEffect, useState } from 'react'

/** PC: pantalla ancha con ratón y teclado (sin pantalla táctil como entrada principal) */
const QUERY = '(min-width: 900px) and (hover: hover) and (pointer: fine)'

export function isDesktop() {
  try {
    return window.matchMedia(QUERY).matches
  } catch {
    return false
  }
}

export function useDesktop() {
  const [desktop, setDesktop] = useState(isDesktop)
  useEffect(() => {
    let mq: MediaQueryList
    try {
      mq = window.matchMedia(QUERY)
    } catch {
      return
    }
    const on = () => setDesktop(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return desktop
}
