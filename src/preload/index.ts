import { contextBridge } from 'electron'

if (!process.contextIsolated) {
  throw new Error('ContextIsolation must be enabled in the  BrowserWindow')
}

try {
  contextBridge.exposeInMainWorld('context', {
    // TODO
  })
} catch (err) {
  console.error(err)
}
