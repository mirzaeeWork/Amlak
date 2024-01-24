import DashboardPage from '@/components/template/DashboardPage'
import { GetUser } from '@/utils/getInfo'


async function Dashboard() {
  const user = await GetUser()
  if (!user) return <h3>مشکلی پیش آمده است</h3>
  const createdAt = user?.createdAt || null

  return <DashboardPage createdAt={createdAt} />
}

export default Dashboard