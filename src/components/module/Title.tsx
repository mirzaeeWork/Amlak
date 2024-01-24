import styles from "@/components/module/Title.module.css";

type titleType = {
    children: React.ReactNode;
    tag: string
}

function Title({ children, tag }: titleType) {
    const DynamicTag = tag as keyof JSX.IntrinsicElements;

    return <DynamicTag className={styles.title}>{children}</DynamicTag>;
}

export default Title