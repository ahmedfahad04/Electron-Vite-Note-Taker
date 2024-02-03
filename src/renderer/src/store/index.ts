import { mockNotes } from '@/store/mocks'
import { NoteInfo } from '@shared/model'
import { atom } from 'jotai'

export const notesAtom = atom<NoteInfo[]>(mockNotes)
export const selectedNoteIndexAtom = atom<number | null>(null)
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

export const createEmptyNoteAtom = atom(null, (get, set) => {
  const notes = get(notesAtom)

  const title = `Note ${notes.length + 1}`
  const newNote: NoteInfo = {
    title: title,
    content: 'Sample Content 555',
    lastEditTime: new Date().getTime()
  }

  set(notesAtom, [newNote, ...notes.filter((note) => note.title !== newNote.title)])
  set(selectedNoteIndexAtom, 0)
})

export const deleteNoteAtom = atom(null, (get, set) => {
  const notes = get(notesAtom)
  const selectedNote = get(selectedNoteAtom)

  if (!selectedNote) return null

  set(
    notesAtom,
    notes.filter((note) => note.title !== selectedNote.title)
  )

  set(selectedNoteIndexAtom, null)
})
