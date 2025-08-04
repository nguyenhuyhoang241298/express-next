import { create } from 'zustand'
import { User } from './type'

interface UserModalStore {
  openEdit: boolean
  openDelete: boolean
  user: User | undefined

  setOpenEdit: (open: boolean) => void
  setOpenDelete: (open: boolean) => void
  setUser: (user: User | undefined) => void
}

const useUserModalStore = create<UserModalStore>((set) => ({
  openEdit: false,
  openDelete: false,
  user: undefined,

  setOpenEdit: (open) => set({ openEdit: open }),
  setOpenDelete: (open) => set({ openDelete: open }),
  setUser: (user) => set({ user }),
}))

export default useUserModalStore
