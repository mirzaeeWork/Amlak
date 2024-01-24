import DashboardSideBar from "@/components/layout/DashboardLayout/DashboardSideBar";
import AdminPage from "@/components/template/AdminPage";
import { GetProfilesUnPublished, GetUser } from "@/utils/getInfo";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: 'پنل ادمین املاک',
}

async function Admin() {
  const user = await GetUser()
  if (!user) return <h3>مشکلی پیش آمده است</h3>
  if (user.role != "ADMIN") redirect("/dashboard")

  const profiles = await GetProfilesUnPublished();
  
  
  return (
    <DashboardSideBar user={user}>
      <AdminPage profiles={profiles} />
    </DashboardSideBar>
  )
}

export default Admin