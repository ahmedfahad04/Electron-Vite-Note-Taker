import { NoteInfo } from '@shared/model'

export const mockNotes: NoteInfo[] = [
  {
    title: 'Welcome Electron',
    content: 'Sample Content 1',
    lastEditTime: new Date().getTime()
  },
  {
    title: 'Note 1',
    content: 'Sample Content 12',
    lastEditTime: new Date().getTime()
  },
  {
    title: 'Note 2',
    content: 'Sample Content 15',
    lastEditTime: new Date().getTime()
  }
]
