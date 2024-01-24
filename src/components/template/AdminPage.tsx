import styles from '@/components/template/AdminPage.module.css'
import { MongoProfile } from '@/utils/Type-Interface'
import AdminCard from '@/components/module/AdminCard';

type ProfilesPublishedType = {
  profiles?: MongoProfile[];
}

function AdminPage({ profiles }: ProfilesPublishedType) {
  return (
    <div>
      {!profiles?.length ? <p className={styles.text}> آگهی در انتظار تایید وجود ندارد</p> : null}
      {profiles?.map((item, index) => <AdminCard key={index} profile={JSON.parse(JSON.stringify(item))} />)}
    </div>
  )
}

export default AdminPage