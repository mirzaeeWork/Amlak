import styles from "@/components/module/ItemList.module.css";

type dataType = {
    data: string[]
  };
  
function ItemList({ data }:dataType) {
  return (
    <div className={styles.container}>
      {data.length ? (
        <ul>
          {data.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : (
        <p>هیچ موردی ذکر نشده است</p>
      )}
    </div>
  );
}

export default ItemList;
