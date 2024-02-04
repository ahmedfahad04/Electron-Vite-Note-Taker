import { CreateNote, GetNotes, ReadNote, WriteNote } from '@shared/types'
import { contextBridge, ipcRenderer } from 'electron'

if (!process.contextIsolated) {
  throw new Error('ContextIsolation must be enabled in the  BrowserWindow')
}

try {
  contextBridge.exposeInMainWorld('context', {
    locale: navigator.language,
    getNotes: (...args: Parameters<GetNotes>) => ipcRenderer.invoke('getNotes', ...args),
    readNotes: (...args: Parameters<ReadNote>) => ipcRenderer.invoke('readNotes', ...args),
    writeNotes: (...args: Parameters<WriteNote>) => ipcRenderer.invoke('writeNotes', ...args),
    createNotes: (...args: Parameters<CreateNote>) => ipcRenderer.invoke('createNotes', ...args)
  })
} catch (err) {
  console.error(err)
}
