import { NoteInfo } from '@shared/model'
import { atom } from 'jotai'
import { unwrap } from 'jotai/utils'

// get notes from local file system
const loadNotes = async () => {
  const notes = await window.context.getNotes()

  // sort by most recently edited version
  return notes.sort((a, b) => b.lastEditTime - a.lastEditTime)
}

const notesAtomAsync = atom<NoteInfo[] | Promise<NoteInfo[]>>(loadNotes())

// used unwrap as notesAtomAsync is a async func while atom is non-async
export const notesAtom = unwrap(notesAtomAsync, (prev) => prev)

export const selectedNoteIndexAtom = atom<number | null>(null)
export const selectedNoteAtom = atom((get) => {
  const notes = get(notesAtom)
  const selectedNoteIndex = get(selectedNoteIndexAtom)

  if (selectedNoteIndex == null || !notes) return null
  const selectedNote = notes[selectedNoteIndex]

  return {
    ...selectedNote,
    content: `Hello from Note> ${selectedNoteIndex}`
  }
})

export const createEmptyNoteAtom = atom(null, (get, set) => {
  const notes = get(notesAtom)

  //! as notes warns about 'undefined', we added this condition !notes -> return
  if (!notes) return

  const title = `Note ${notes.length + 1}`
  const newNote: NoteInfo = {
    title: title,
    lastEditTime: new Date().getTime()
  }

  set(notesAtom, [newNote, ...notes.filter((note) => note.title !== newNote.title)])
  set(selectedNoteIndexAtom, 0)
})

export const deleteNoteAtom = atom(null, (get, set) => {
  const notes = get(notesAtom)
  const selectedNote = get(selectedNoteAtom)

  if (!selectedNote || !notes) return

  set(
    notesAtom,
    notes.filter((note) => note.title !== selectedNote.title)
  )

  set(selectedNoteIndexAtom, null)
})
