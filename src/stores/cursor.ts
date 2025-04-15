import { atom } from 'jotai'

export type CursorType = 'DEFAULT' | 'HOVER' | 'CLICK' | 'SPECIAL'

export const cursorTypeAtom = atom<CursorType>('DEFAULT')
