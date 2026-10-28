import type { SpriteLook } from '../components/Sprite'

/** Personajes que no pelean y tienen su propia actividad */
export const NPCS: Record<string, { name: string; look: SpriteLook; doneLine: { text: string; es: string } }> = {
  secretary: {
    name: 'Mrs. Lopez',
    look: { shirt: '#6a8caf', hair: '#3b2a1a', skin: '#e0ac69', gender: 'female', accessory: 'glasses' },
    doneLine: { text: 'Have a nice day at Greenfield School!', es: '¡Que tengas un buen día en la escuela Greenfield!' },
  },
}

/** Datos inventados del papel de traslado: así no se pide información real del jugador */
export const TRANSFER = {
  address: '25 Park Street',
  phone: '555-0147',
  phoneWrong: '555-0174',
  phoneSpoken: 'five, five, five, oh, one, seven, four',
}

export function schoolEmail(name: string) {
  const user = name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z]/g, '')
  return `${user || 'student'}@greenfield.edu`
}
