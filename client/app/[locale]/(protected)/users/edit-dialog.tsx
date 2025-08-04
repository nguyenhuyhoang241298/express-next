'use client'

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { updateUser } from './api'
import useUserModalStore from './store'
import { User } from './type'

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Name is required' })
    .max(255, { message: 'Name must be less than 255 characters' }),
  age: z.coerce
    .number()
    .min(1, { message: 'Age must be a positive number' })
    .optional(),
  email: z
    .string()
    .email({ message: 'Invalid email address' })
    .max(255, { message: 'Email must be less than 255 characters' }),
})

const EditDialog = () => {
  const queryClient = useQueryClient()
  const { openEdit, setOpenEdit, user } = useUserModalStore()
  console.log('user', user)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name || '',
      age: user?.age || undefined,
      email: user?.email || '',
    },
  })

  const mutation = useMutation({
    mutationFn: (user: User) => updateUser(user),
    onSuccess: (data: any) => {
      if (data.code) {
        toast.error(`Failed to update user: ${data.message}`)
        return
      }

      toast.success('User updated successfully')
      queryClient.invalidateQueries({
        queryKey: ['users'],
      })
      form.reset()
      setOpenEdit(false)
    },
    onError: (error: Error) => {
      toast.error(`Failed to create user: ${error.message}`)
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user) return
    mutation.mutate({
      ...values,
      id: user.id,
    })
  }

  useEffect(() => {
    form.reset({
      name: user?.name || '',
      age: user?.age || undefined,
      email: user?.email || '',
    })
  }, [user, form])

  return (
    <AlertDialog open={openEdit} onOpenChange={setOpenEdit}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Edit User</AlertDialogTitle>
        </AlertDialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter your age"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button type="submit" isLoading={mutation.isPending}>
                Edit
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default EditDialog
