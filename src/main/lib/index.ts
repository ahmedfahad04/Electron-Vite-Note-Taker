import { appDirectoryName, fileEncoding } from '@shared/constants'
import { NoteInfo } from '@shared/model'
import { CreateNote, DeleteNote, GetNotes, ReadNote, WriteNote } from '@shared/types'
import { dialog } from 'electron'
import { ensureDir, readFile, readdir, remove, stat, writeFile } from 'fs-extra'
import { homedir } from 'os'
import path from 'path'

export const getRootDir = () => {
  return `${homedir()}/Desktop/${appDirectoryName}`
}

export const getNotes: GetNotes = async () => {
  const rootDir = getRootDir()

  // ensure the directory (NoteMark) exists?
  await ensureDir(rootDir)

  // read all file names
  const notesFileNames = await readdir(rootDir, {
    encoding: fileEncoding,
    withFileTypes: false
  })

  // filter files with only .md extension
  const notes = notesFileNames.filter((fileName) => fileName.endsWith('.md'))

  return Promise.all(notes.map(getNoteInfoFromFileName))
}

export const getNoteInfoFromFileName = async (fileName: string): Promise<NoteInfo> => {
  const fileStats = await stat(`${getRootDir()}/${fileName}`)

  return {
    title: fileName.replace(/\.md%/, ''),
    lastEditTime: fileStats.mtimeMs
  }
}

export const readNote: ReadNote = async (fileName) => {
  const rootDir = getRootDir()

  //! fs function to read file
  return readFile(`${rootDir}/${fileName}`, { encoding: fileEncoding })
}

export const writeNote: WriteNote = async (fileName, content) => {
  const rootDir = getRootDir()

  console.info(`Writing Note ${fileName}`)
  return writeFile(`${rootDir}/${fileName}`, content, { encoding: fileEncoding })
}

export const createNote: CreateNote = async () => {
  const rootDir = getRootDir()

  await ensureDir(rootDir)
  const { filePath, canceled } = await dialog.showSaveDialog({
    title: 'New Note',
    defaultPath: `${rootDir}/Untitled.md`,
    buttonLabel: 'Create',
    properties: ['showOverwriteConfirmation'],
    showsTagField: false,
    filters: [{ name: 'Markdown', extensions: ['md'] }]
  })

  if (canceled || !filePath) {
    console.info('Note Creation Canceled')
    return false
  }

  const { name: fileName, dir: parentDir } = path.parse(filePath)
  if (parentDir != rootDir) {
    await dialog.showMessageBox({
      type: 'error',
      title: 'Creation Failed',
      message: `All notes must be saved under ${rootDir}. Avoid using other directories`
    })

    return false
  }

  console.info(`Creating note: ${filePath}`)

  const fileNameWithExt = fileName.concat('.md')

  //! fs function to create file
  await writeFile(filePath, '')

  return fileNameWithExt
}

export const deleteNote: DeleteNote = async (fileName) => {
  const rootDir = getRootDir()

  const { response } = await dialog.showMessageBox({
    type: 'warning',
    title: 'Delete Note',
    message: `Are you sure you want to delete ${fileName}`,
    buttons: ['Delete', 'Cancel'], /// 0 Delete, 1 Cancel
    defaultId: 1,
    cancelId: 1
  })

  if (response === 1) {
    console.info('Note Deletion Canceled')
    return false
  }

  console.info(`Deleting note: ${fileName}`)

  //! fs function to delete file
  await remove(`${rootDir}/${fileName}`)
  return true
}
