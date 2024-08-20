import React from 'react';
import { useSelector } from 'react-redux';
import styles from "./styles.module.scss";
import { RootState } from '../../store/dataStore';
import { Chip } from '@mui/material';

//подробная информация о репозитории
export default function Info () {

  //хук получения данных выбранного репозитория из хранилища
  const info = useSelector((state: RootState) => state.toolkit.info);

  return (
    <div className={styles.info}>
      {info.toggle ?
        <div className={styles.info__container}>
          <h3 className={styles.info__title}>{info.name}</h3>
          <div className={styles.info__wrapper}>
            {info.language ? <Chip label={info.language} style={{ background: "#2196f3", color: "white" }} /> : ''}
            <p className={styles.info__stargazers}>{info.stargazers_count}</p>
          </div>
          <div className={styles.info__topic}>
            {info.topics.map((item: string, index) => <Chip key={index + 1} label={item} className={styles.info__chip} />)}
          </div>
          <p className={styles.info__license}>{info.license}</p>
        </div>
        :
        <div className={styles.info__placeholderContainer}>
          <h3 className={styles.info__placeholder}>
            Выберите репозиторий
          </h3>
        </div>
      }
    </div>
  );
}
