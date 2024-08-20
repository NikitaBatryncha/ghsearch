import React from "react";
import styles from "./styles.module.scss";

//заглушка для страртовой страницы

export default function Placeholder() {
  return (
    <div className={styles.placeholder}>
      <p className={styles.placeholder__text}>Добро пожаловать</p>
    </div>
  );
}
