import styles from '@/components/module/CategoryCard.module.css';
import Image from 'next/image';
import Link from 'next/link';

type itemType = {
  key: number;
  item: { title: string; image: string; name:string}
}

function CategoryCard({ item }: itemType) {
  return (
    <div className={styles.card}>
      <Link href={`/buy-residential?category=${item.name}`} >
        <Image src={item.image} alt={item.title} width={240} height={144} property='true' />
        <p>{item.title}</p>
      </Link>
    </div>
  );
}

export default CategoryCard;
