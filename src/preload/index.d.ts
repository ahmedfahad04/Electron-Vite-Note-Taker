import { CreateNote, DeleteNote, GetNotes, ReadNote, WriteNote } from '@shared/types'

declare global {
  interface Window {
    // electron: ElectronAPI
    context: {
      locale: string
      getNotes: GetNotes
      readNotes: ReadNote
      writeNotes: WriteNote
      createNotes: CreateNote
      deleteNotes: DeleteNote
    }
  }
}
