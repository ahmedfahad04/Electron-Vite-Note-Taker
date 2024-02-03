import {
  MDXEditor,
  codeBlockPlugin,
  headingsPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin
} from '@mdxeditor/editor'
import { useEditor } from '@renderer/hooks/useEditor'

export const MarkdownEditor = () => {
  const { seletedNote } = useEditor()
  if (!seletedNote) return null

  return (
    <MDXEditor
      key={seletedNote.title} // this is a must to re-render while new note is clicked
      markdown={seletedNote.content}
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        markdownShortcutPlugin(),
        codeBlockPlugin()
      ]}
      contentEditableClassName="outline-none min-h-screen max-w-none text-lg px-8 py-5 caret-yellow-500 prose prose-invert prose-p:my-3 prose-p:leading-relaxed prose-headings:my-4 prose-blockquote:my-4 prose-ul:my-2 prose-li:my-0 prose-code:px-1 prose-code:text-yellow-200 prose-code:before:content-[''] prose-code:after:content-['']"
    />
  )
}
