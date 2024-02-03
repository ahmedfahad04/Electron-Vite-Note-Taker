import {
  ActionButtonsRow,
  Content,
  FloatingNoteTitle,
  MarkdownEditor,
  RootLayout,
  Sidebar
} from '@/components'
import { NotePreviewList } from './components/NotePreviewList'

function App(): JSX.Element {
  return (
    <RootLayout>
      <Sidebar className="p-2 bg-zinc-900">
        <ActionButtonsRow className="flex justify-between mt-1" />
        <NotePreviewList className="mt-5 space-y-1" />
      </Sidebar>
      <Content className="border-l bg-zic-900/50 border-l-white/20 text-white">
        <FloatingNoteTitle />
        <MarkdownEditor />
      </Content>
    </RootLayout>
  )
}

export default App
