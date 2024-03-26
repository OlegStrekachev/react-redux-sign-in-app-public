import styles from "./IsLoading.module.css";

export const IsLoading = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.spinner}></div>
    </div>
  );
};
