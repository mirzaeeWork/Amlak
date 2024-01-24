import { MyProfilePageType } from "@/components/module/DashboardCard";
import styles from "@/components/module/Card.module.css"
import { HiOutlineLocationMarker } from "react-icons/hi";
import { icons } from "@/constants/icons";
import { sp, truncateText } from "@/utils/replaceNumber";
import Link from "next/link";
import { BiLeftArrowAlt } from "react-icons/bi";


type ValidCategory = 'villa' | 'apartment' | 'store' | 'office';


function Card({ profile }: MyProfilePageType) {
  const { _id, category, title, location, price } = profile

  return (
    <div className={styles.container}>
      <div className={styles.icon}>{icons[category as ValidCategory]}</div>
      <p className={styles.title}>{title}</p>
      <div className={styles.location}>
        <HiOutlineLocationMarker />
        <p> {truncateText(location,30)}  </p>
      </div>
      <span>{sp(price.toString())}  تومان</span>
      <Link href={`/get-residential/${_id}`}>
        مشاهده آگهی
        <BiLeftArrowAlt />
      </Link>
    </div>
  )
}

export default Card