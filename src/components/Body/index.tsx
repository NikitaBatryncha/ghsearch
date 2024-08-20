import React from 'react';
import styles from "./styles.module.scss"
import ResultTable from '../ResultTable/index.tsx';
import Info from '../Info/index.tsx';

// компонент-контейнер для таблицы результатов и доп информации
export default function Body() {
  return (
    <div className={styles.body}>
      <ResultTable />
      <Info/>
    </div>
  );
}
