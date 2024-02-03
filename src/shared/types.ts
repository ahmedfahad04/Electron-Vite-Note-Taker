import { NoteInfo } from './model'

export type GetNotes = () => Promise<NoteInfo[]>
