'use client'

import { MongoProfile } from "@/utils/Type-Interface";
import { Toaster, toast } from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import Card from "@/components/module/Card";
import styles from "@/components/module/DashboardCard.module.css";
import { useRouter } from "next/navigation";

export type MyProfilePageType = {
  profile: MongoProfile;
  getRole?:boolean;
}

function DashboardCard({ profile }: MyProfilePageType) {
  // برای این کامپوننت های تو در تو نوشته
  //در بخش آگهی ها هم استفاده می شود Card چون 
  //سرور ساید باشد Card و در آنجا مهم هست که 
  //تا موتورهای جستجو بتوانند آنها را پیدا کنند
  //و در سئو سایت مهم هست

  const route = useRouter()

  const editHandler = () => {
    route.push(`/dashboard/my-profiles/${profile._id}`)
  };

  const deleteHandler = async () => {
    const res = await fetch(`/api/profile/delete/${profile._id}`, {
      method: "DELETE"
    })
    const data = await res.json()
    if (data.success) {
      toast.success(data.message);
      route.refresh()
    } else {
      // console.log(data)
      toast.error(data.message || data.messages);
    }

  };

  return (
    <div className={styles.container}>
      <Card profile={profile} />
      <div className={styles.main}>
        <button onClick={editHandler}>
          ویرایش
          <FiEdit />
        </button>
        <button onClick={deleteHandler}>
          حذف
          <AiOutlineDelete />
        </button>
      </div>
      <Toaster />

    </div>
  )
}

export default DashboardCard