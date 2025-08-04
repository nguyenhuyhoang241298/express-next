'use client'

import { Button } from '@/components/ui/button'
import { TableCell } from '@/components/ui/table'
import { SquarePen, Trash2 } from 'lucide-react'
import useUserModalStore from './store'
import { User } from './type'

const ActionCell = ({ user }: { user: User }) => {
  const { setOpenEdit, setOpenDelete, setUser } = useUserModalStore()

  const onEdit = () => {
    setUser(user)
    setOpenEdit(true)
  }

  const onDelete = () => {
    setUser(user)
    setOpenDelete(true)
  }

  return (
    <TableCell className="text-right">
      <div className="flex gap-1 justify-end">
        <Button
          className="w-8 h-8 p-0"
          variant="ghost"
          size="icon"
          onClick={onEdit}
        >
          <SquarePen />
        </Button>
        <Button
          className="w-8 h-8 p-0"
          variant="ghost"
          size="icon"
          onClick={onDelete}
        >
          <Trash2 />
        </Button>
      </div>
    </TableCell>
  )
}

export default ActionCell
