import styles from '@/components/module/SideBar.module.css'
import { TfiAlignCenter } from "react-icons/tfi";
import { HiFilter } from "react-icons/hi";
import Link from 'next/link';
import { getCategories } from '@/constants/string';

type SideBardType = {
    children: React.ReactNode
  }
  

function SideBar({ children }: SideBardType) {
    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <p><HiFilter />دسته بندی </p>
                <span></span>
                <div className={styles.dropdown}>
                    <button className={styles.menu}><TfiAlignCenter /></button>
                    <div>
                        <Link href="/buy-residential">همه</Link>
                        {Object.keys(getCategories).map(item =>
                            <Link key={item} href={{ pathname: "/buy-residential", query: { category: item } }}>
                                {getCategories[item]}
                            </Link>)}
                    </div>
                </div>
            </div>
            <div className={styles.main}>{children}</div>
        </div>
    )
}

export default SideBar