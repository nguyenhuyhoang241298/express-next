import DeleteDialog from './delete-dialog'
import EditDialog from './edit-dialog'
import Header from './header'
import { UserTable } from './user-table'

const Page = () => {
  return (
    <div className="p-4 space-y-4">
      <Header />
      <EditDialog />
      <DeleteDialog />
      <div className="border border-gray-200 rounded-lg p-4">
        <UserTable />
      </div>
    </div>
  )
}

export default Page
