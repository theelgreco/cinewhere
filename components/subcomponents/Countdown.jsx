import styles from "@/styles/Countdown.module.css";

export default function Countdown({ count }) {
  if (count !== null && count < 4) {
    return (
      <div className={styles.countdownContainer}>
        <p className={styles.countdownText}>{count}</p>
      </div>
    );
  }
}
