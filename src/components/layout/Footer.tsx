import styles from "@/components/layout/Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.desc}>
        <h3>سامانه خرید و اجاره ملک</h3>
        <p>
          با این سامانه شما می توانید خرید خود را مطمئن و به سهولت انجام دهید
        </p>
      </div>
      <div>
        <ul>
          <li>تعرفه قانونی</li>
          <li>دسترسی سریع</li>
          <li>مشاورین خبره</li>
          <li>قولنامه محضری</li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
