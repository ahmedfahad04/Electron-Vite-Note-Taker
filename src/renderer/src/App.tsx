import { ActionButtonsRow, Content, RootLayout, Sidebar } from '@/components'

function App(): JSX.Element {
  return (
    <RootLayout>
      <Sidebar className="p-2 bg-zinc-900">
        <ActionButtonsRow className="flex justify-between mt-1" />
      </Sidebar>
      <Content className="border-l bg-zic-900/50 border-l-white/20 ">Content</Content>
    </RootLayout>
  )
}

export default App
