'use client'

import Link from 'next/link'
import { FiLogIn } from "react-icons/fi";
import { FaUserAlt } from "react-icons/fa";
import { useSession } from 'next-auth/react';
import styles from '@/components/layout/Header.module.css'


function Header() {
  //Client Side به روش  session گرفتن اطلاعات
  //کردیم import ، layout که در فایل اصلی   NextAuthProviders  از فایل
  //می گیریم session اطلاعات 
  const { data } = useSession();
  // console.log(data)

  return (
    <header className={styles.header}>
      <div>
        <ul>
          <li>
            <Link href={"/"}>صفحه اصلی</Link>
          </li>
          <li>
            <Link href="/buy-residential">آگهی ها</Link>
          </li>
        </ul>
      </div>
      <div className={styles.login}>
        {data ?
          <Link href="/dashboard">
            <FaUserAlt />
          </Link>
          :
          <Link href="/signin">
            <FiLogIn />
            <span>ورود</span>
          </Link>
        }
      </div>

    </header>
  )
}

export default Header