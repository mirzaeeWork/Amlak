import styles from "@/components/template/MyProfilePage.module.css"
import { MongoProfile } from "@/utils/Type-Interface"
import DashboardCard from "../module/DashboardCard";

type MyProfilesPageType = {
    profiles: MongoProfile[];
}


function MyProfilePage({ profiles }: MyProfilesPageType) {
    return (
        <div className={styles.container}>
            {profiles.length ? null : (
                <p className={styles.text}>هیچ آگهی ثبت نشده است</p>
            )}
            {profiles.map((item,index) => (
                //  وقتی مقداری از کامپوننت سرور ساید به کامپوننت کلاینت ساید بخواهیم پاس دهیم
                //  از روش زیر استفاده می کنیم
                <DashboardCard key={index} profile={JSON.parse(JSON.stringify(item))} />
            ))}  
        </div> 
    )
}

export default MyProfilePage