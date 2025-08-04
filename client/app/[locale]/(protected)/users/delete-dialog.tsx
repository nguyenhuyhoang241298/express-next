'use client'

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { deleteUser } from './api'
import useUserModalStore from './store'

const DeleteDialog = () => {
  const queryClient = useQueryClient()
  const { openDelete, setOpenDelete, user } = useUserModalStore()

  const mutation = useMutation({
    mutationFn: (id: number) => deleteUser(id),
    onSuccess: (data: any) => {
      if (data.code) {
        toast.error(`Failed to delete user: ${data.message}`)
        return
      }
      toast.success('User deleted successfully')
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete user: ${error.message}`)
    },
    onSettled: () => {
      setOpenDelete(false)
    },
  })

  const onDelete = () => {
    if (!user) return
    mutation.mutate(Number(user.id))
  }

  return (
    <AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your user
            and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button onClick={onDelete} isLoading={mutation.isPending}>
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteDialog
