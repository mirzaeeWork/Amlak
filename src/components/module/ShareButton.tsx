"use client";

import styles from "@/components/module/ShareButton.module.css";
import { useEffect, useState } from "react";
import { LuShare2 } from "react-icons/lu";
import { CopyToClipboard } from 'react-copy-to-clipboard';


function ShareButton() {
    const [url, setUrl] = useState({ value: '', copy: false })

    useEffect(() => {
        //برای اینکه لینک را در کلیپ بورد ذخیره کنیم مرا حل زیر را پیش می رویم
        setUrl({ value: window.location.href, copy: true })
    }, [])

    return (
        <CopyToClipboard text={url.value} onCopy={() => setUrl({ value: window.location.href, copy: true })}>
            <div className={styles.container}>
                <LuShare2 />
                <button>اشتراک گذاری</button>
            </div>
        </CopyToClipboard>

    )
}

export default ShareButton