import { ActionButton, ActionButtonProps } from '@/components'
import { deleteNoteAtom } from '@/store'
import { useSetAtom } from 'jotai'
import { FaRegTrashAlt } from 'react-icons/fa'

export const DeleteNoteButton = ({ ...props }: ActionButtonProps) => {
  const deleteNote = useSetAtom(deleteNoteAtom)

  return (
    <ActionButton onClick={() => deleteNote()} {...props}>
      <FaRegTrashAlt className="w-4 h-4 text-zinc-400" />
    </ActionButton>
  )
}
