'use client'
import styles from '@/components/module/AdminCard.module.css'
import { MyProfilePageType } from '@/components/module/DashboardCard'
import { sp } from '@/utils/replaceNumber'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast'

function AdminCard({ profile }: MyProfilePageType) {
  const { _id, description, title, location, price } = profile

  const route = useRouter()

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

  const publishHandler = async () => {
    const res = await fetch(`/api/profile/publish/${_id}`, {
      method: "PATCH"
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
    <>
      <div className={styles.container}>
        <h3>{title}</h3>
        <p>{description}</p>
        <div className={styles.properties}>
          <span>{location}</span>
          <span>{sp(price.toString())}</span>
        </div>
        <button onClick={publishHandler}>انتشار</button>
        <Link href={`/get-residential/${_id}`}>جزئیات آگهی</Link>
        <button onClick={deleteHandler}>حذف</button>
      </div>
      <Toaster /> 
    </>
  )
}

export default AdminCard