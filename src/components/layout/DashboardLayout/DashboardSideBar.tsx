import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import { TfiAlignCenter } from "react-icons/tfi";
import { MongoUser, UserSession } from "@/utils/Type-Interface";
import LogOutButton from "@/components/module/LogoutButton";
import styles from '@/components/layout/DashboardLayout/DashboardSideBar.module.css'
import { GetUser } from "@/utils/getInfo";


type dashboarSideBardType = {
  children: React.ReactNode;
  user?: MongoUser;
}

async function DashboardSideBar({ children,user }: dashboarSideBardType) {
  let getUser: MongoUser | undefined | null;
  getUser=user
  if(!user) getUser=await GetUser()
  if(!getUser) return <h3>مشکلی پیش آمده است</h3>

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <CgProfile />
        <p>{getUser.email} 
        <span>{getUser.role=="ADMIN" ?" Admin" :null}</span></p>
        <span></span>
        <div className={styles.dropdown}>
          <button className={styles.menu}><TfiAlignCenter /></button>
          <div>
            <Link href="/dashboard">حساب کاربری</Link>
            <Link href="/dashboard/my-profiles">آگهی های من</Link>
            <Link href="/dashboard/add">ثبت آگهی</Link>
            {getUser.role =="ADMIN" ? <Link href="/admin">در انتظار تایید</Link> :null}
            <LogOutButton />
          </div>
        </div>
      </div>
      <div className={styles.main}>{children}</div>
    </div>
  )
}

export default DashboardSideBar