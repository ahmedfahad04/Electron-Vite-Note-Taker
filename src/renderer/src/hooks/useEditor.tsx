import { selectedNoteAtom } from '@renderer/store'
import { useAtomValue } from 'jotai'

export const useEditor = () => {
  const seletedNote = useAtomValue(selectedNoteAtom)

  return {
    seletedNote
  }
}
