import { mockNotes } from '@/store/mocks'
import { NoteInfo } from '@shared/model'
import { atom } from 'jotai'

export const notesAtom = atom<NoteInfo[]>(mockNotes)
export const selectedNoteIndexAtom = atom<number>(0)
export const selectedNoteAtom = atom((get) => {
  const notes = get(notesAtom)
  const selectedNoteIndex = get(selectedNoteIndexAtom)

  if (selectedNoteIndex == null) return null
  const selectedNote = notes[selectedNoteIndex]

  return {
    ...selectedNote
    // content: `Hello from Note${selectedNoteIndex}`
  }
})
