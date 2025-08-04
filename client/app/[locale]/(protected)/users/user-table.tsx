'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Loader } from 'lucide-react'
import ActionCell from './action-cell'
import { useUsers } from './hooks'

export function UserTable() {
  const { data: users, isFetching, isError } = useUsers()

  if (isFetching || isError)
    return (
      <div className="h-96 flex items-center justify-center">
        <Loader className="animate-spin" />
      </div>
    )

  if (!users || users.length === 0)
    return (
      <div className="h-96 flex items-center justify-center">
        <span>No users found</span>
      </div>
    )

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Age</TableHead>
          <TableHead>Email</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.age}</TableCell>
            <TableCell>{user.email}</TableCell>
            <ActionCell user={user} />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
