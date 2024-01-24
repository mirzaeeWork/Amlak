import styles from '@/components/template/HomePage.module.css'
import { categories, cities, services } from '@/constants/string'
import { FiCircle } from "react-icons/fi";
import CategoryCard from '../module/CategoryCard';
import { FaCity } from 'react-icons/fa';


function HomePage() {
    return (
        <>
            <div className={styles.banner}>
                <div className={styles.desc}>
                    <h1>سامانه خرید و اجاره ملک</h1>
                    <ul>
                        {services.map((i) => (
                            <li key={i}>
                                <FiCircle />
                                <span>{i}</span>
                            </li>
                        ))}
                    </ul>

                </div>
            </div>
            <div className={styles.categories}>
                {
                    categories.map((item, index) => <CategoryCard key={index} item={item} />)
                }
            </div>
            <div className={styles.city}>
                <h3>شهرهای پر بازدید</h3>
                <ul>
                {
                    cities.map(city=>(
                        <li key={city}>
                            <FaCity/>
                           <span> {city}</span>
                        </li>
                        
                    ))
                }
                </ul>
            </div>
        </>
    )
}

export default HomePage