"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import styles from "@/components/template/SignupPage.module.css"
import Loader from "../module/Loader";

function SignUpPage() {
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [errorRePassword, setErrorRePassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const signupHandler = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    //https://mhnpd.github.io/react-loader-spinner/docs/components/three-dots  ==>for loading
    //https://react-hot-toast.com/  ==>react-hot-toast
    e.preventDefault();
    handleEmail()
    handlePassword()
    handlePrePassword()

    setLoading(true);
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    })
    const data = await res.json()
    setLoading(false);
    if (data.success) {
      router.push("/signin");
    } else {
      toast.error(data.message);
    }
  }

  const handleEmail = async () => {
    const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailPattern.test(email)) setErrorEmail("The email is not valid.")
    else setErrorEmail("")
  }

  const handlePassword = async () => {
    const PasswordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
    if (!PasswordPattern.test(password)) setErrorPassword("six characters with a mix of lowercase, uppercase letters, numbers, and special characters.")
    else setErrorPassword("")
  }

  const handlePrePassword = async () => {
    if (password != rePassword) setErrorRePassword("The password and its repetition are not the same.")
    else setErrorRePassword("")
  }


  return (
    <div className={styles.form} >
      <h4>فرم ثبت نام</h4>
      <form>
        <label>ایمیل:</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={handleEmail}
        />
        <h6 className={styles.error}>{errorEmail}</h6>
        <label>رمز عبور:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={handlePassword}
        />
        <h6 className={styles.error}>{errorPassword}</h6>

        <label>تکرار رمز عبور:</label>
        <input
          type="password"
          value={rePassword}
          onChange={(e) => setRePassword(e.target.value)}
          onBlur={handlePrePassword}
        />
        <h6 className={styles.error}>{errorRePassword}</h6>
        {loading ? <Loader/> : (
          <button type="submit" onClick={signupHandler}>
            ثبت نام
          </button>

        )}
      </form>
      <p>
        حساب کاربری دارید؟
        <Link href="/signin">ورود</Link>
      </p>
      <Toaster position="top-left" reverseOrder={false} />
    </div>
  )
}

export default SignUpPage