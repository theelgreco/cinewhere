import styles from "@/styles/Type.module.css";

export default function Type() {
  return (
    <section className={styles.Type}>
      <div className={styles.flex_col}>
        <div className={styles.flex_row}>
          <div className={styles.tv}>TV</div>
          <div className={styles.movies}>MOVIES</div>
        </div>
        <div className={styles.both}>BOTH</div>
      </div>
    </section>
  );
}
