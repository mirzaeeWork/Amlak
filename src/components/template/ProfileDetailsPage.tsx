"use client"

import styles from '@/components/template/ProfileDetailsPage.module.css'
import { MyProfilePageType } from '../module/DashboardCard'
import { SiHomebridge } from "react-icons/si";
import { AiOutlinePhone } from "react-icons/ai";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BiCalendarCheck } from "react-icons/bi";
import ItemList from '../module/ItemList';
import Title from '../module/Title';
import { e2p, sp } from '@/utils/replaceNumber';
import { icons } from '@/constants/icons';
import { getCategories } from '@/constants/string';
import ShareButton from '../module/ShareButton';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';


function ProfileDetailsPage({ profile: {
  _id,
  title,
  location,
  description,
  amenities,
  rules,
  realState,
  phone,
  price,
  category,
  constructionDate,
  published
}, getRole }: MyProfilePageType) {

  const route = useRouter()

  const publishHandler = async () => {
    const res = await fetch(`/api/profile/publish/${_id}`, {
      method: "PATCH"
    })
    const data = await res.json()
    if (data.success) {
      toast.success(data.message);
      route.refresh()
      setTimeout(() => {
        route.push("/admin")
      }, 100);

    } else {
      // console.log(data)
      toast.error(data.message || data.messages);
    }
  };

  const deleteHandler = async () => {
    const res = await fetch(`/api/profile/delete/${_id}`, {
      method: "DELETE"
    })
    const data = await res.json()
    if (data.success) {
      toast.success(data.message);
      route.refresh()
      setTimeout(() => {
        route.push("/admin")
      }, 100);
    } else {
      // console.log(data)
      toast.error(data.message || data.messages);
    }
  };


  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h1>{title}</h1>
        <span><HiOutlineLocationMarker /> {location}</span>
        <Title tag="h3">توضیحات</Title>
        <p>{description}</p>
        <Title tag="h3">امکانات رفاهی</Title>
        <ItemList data={amenities} />
        <Title tag="h3">قوانین</Title>
        <ItemList data={rules} />

      </div>
      <div className={styles.sidebar}>
        <div className={styles.realState}>
          <SiHomebridge />
          <p>املاک {realState}</p>
          <span>
            <AiOutlinePhone />
            {e2p(phone)}
          </span>
        </div>
        <ShareButton />
        <div className={styles.price}>
          <p>
            {icons[category]}
            {getCategories[category]}
          </p>
          <p>{sp(price.toString())} تومان</p>
          <p>
            <BiCalendarCheck />
            {new Date(constructionDate).toLocaleDateString("fa-IR")}
          </p>
        </div>
        {getRole ?
          published ? <div className={styles.confirmation}>
            <button onClick={deleteHandler}>حذف</button></div>
            :
            <div className={styles.confirmation}>
              <button onClick={publishHandler}>انتشار</button>
              <button onClick={deleteHandler}>حذف</button></div>
          : null}
      </div>
    </div>
  )
}

export default ProfileDetailsPage