"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import styles from "@/components/template/SignupPage.module.css"
import Loader from "../module/Loader";

function SigninPage() {
    const [email, setEmail] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const signupHandler = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        //https://mhnpd.github.io/react-loader-spinner/docs/components/three-dots  ==>for loading
        //https://react-hot-toast.com/  ==>react-hot-toast
        e.preventDefault();
        handleEmail()
        handlePassword()

        setLoading(true);
        //signIn ==>"next-auth/react"
        //به عنوان ورودی می دهیم credentials استفاده می کنیم و  signIn وقتی از پیش فرض 
        //می رود api/auth/[...nextauth]/route.ts به مسیر 
        //می گیرد credentials و اطلاعات 
        const res = await signIn("credentials", {
            email, password, redirect: false
        })
        setLoading(false);
        if (res?.error) {
            toast.error(res.error);
        } else {
            router.push("/");
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


    return (
        <div className={styles.form} >
            <h4>فرم ورود</h4>
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

                {loading ? <Loader />
                    : (
                        <button type="submit" onClick={signupHandler}>
                            ورود
                        </button>

                    )}
            </form>
            <p>
                حساب کاربری ندارید؟
                <Link href="/signup">ثبت نام</Link>
            </p>
            <Toaster position="top-left" reverseOrder={false} />
        </div>
    )
}

export default SigninPage