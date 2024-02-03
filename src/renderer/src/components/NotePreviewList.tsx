import { NotePreview } from '@/components'
import { useNotesList } from '@renderer/hooks/useNotesList'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export type NotePreviewListProp = ComponentProps<'ul'> & {
  onSelect?: () => void
}

export const NotePreviewList = ({ onSelect, className, ...props }: NotePreviewListProp) => {
  const { notes, selectedNoteIndex, handleSelectedNote } = useNotesList({ onSelect })

  if (!notes) return

  if (notes.length === 0) {
    return (
      <ul className={twMerge('text-center pt-4', className)} {...props}>
        <span>No Notes yet!</span>
      </ul>
    )
  }

  return (
    <ul className={className} {...props}>
      {notes.map((note, index) => (
        <NotePreview
          key={note.title + note.lastEditTime}
          isActive={selectedNoteIndex === index}
          onClick={handleSelectedNote(index)}
          {...note}
        />
      ))}
    </ul>
  )
}
