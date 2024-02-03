import { appDirectoryName, fileEncoding } from '@shared/constants'
import { NoteInfo } from '@shared/model'
import { GetNotes } from '@shared/types'
import { ensureDir, readdir, stat } from 'fs-extra'
import { homedir } from 'os'

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
