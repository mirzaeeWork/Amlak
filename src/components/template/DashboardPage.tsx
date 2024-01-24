import UserModel from '@/models/User'
import connectDB from '@/utils/connectDB'
import { getServerSession } from 'next-auth'
import { UserSession } from '@/utils/Type-Interface'
import { GET } from '@/app/api/auth/[...nextauth]/route'
import styles from '@/components/template/DashboardPage.module.css'

type createdAtType={
  createdAt : Date | null
}

async function DashboardPage({createdAt}:createdAtType) {

  return (
    <div className={styles.cotainer}>
      <h3>سلام 👋</h3>
      <p>آگهی های خود را ثبت کنید تا هزاران نفر آن را مشاهده کنند</p>

      <div className={styles.createdAt}>
        <p>تاریخ عضویت:</p>
        <span>{createdAt && new Date(createdAt).toLocaleDateString("fa-IR")}</span>
      </div>

    </div>
  )
}

export default DashboardPage