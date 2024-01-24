import styles from '@/components/template/BuyResidentialsPage.module.css'
import { MongoProfile } from '@/utils/Type-Interface'
import Card from '../module/Card'

type profilesType={
 data: MongoProfile[]
}

function BuyResidentialsPage({data}:profilesType) {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        {data.length ? null: <p className={styles.text}>هیچ آگهی ثبت نشده است</p>}
        {data.map((item,index)=><Card key={index} profile={item}/> )}
      </div>
    </div>
  )
}

export default BuyResidentialsPage