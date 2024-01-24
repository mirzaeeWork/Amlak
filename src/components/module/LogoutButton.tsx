'use client'

import { FiLogOut } from "react-icons/fi";
import { signOut } from "next-auth/react";
import styles from "@/components/module/LogoutButton.module.css"

function LogOutButton() {
  //NEXT_PUBLIC_AUTH0_SIGNOUT_CALLBACK_URL ==> این نام پیش فرض است
    const signOutUrl = process.env.NEXT_PUBLIC_AUTH0_SIGNOUT_CALLBACK_URL
  return (
    <button className={styles.button} onClick={()=>signOut({ callbackUrl: signOutUrl })}>
        <FiLogOut/>
        خروج
    </button>
  )
}

export default LogOutButton