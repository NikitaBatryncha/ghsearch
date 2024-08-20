import React, { useRef } from 'react';
import { Box, TextField, Button } from '@mui/material';
import styles from "./styles.module.scss"
import { useDispatch } from 'react-redux';
import { fetchData, setSearchbarValue, setToggle } from '../../store/toolkitSlice.ts';
import { AppDispatch } from '../../store/dataStore.ts';


/**
 * Основной компонент Header, который содержит поле поиска и кнопку.
 * Предназначен для ввода поискового запроса и запуска поиска по проектам.
 */

export default function Header() {

  // Ссылка на поле ввода (поисковую строку) для последующего доступа к его значению.
  const searchbar = useRef<HTMLInputElement>(null);

  //Хук для вызова функции dispatch из Redux для отправки экшенов в хранилище.
  const dispatch = useDispatch<AppDispatch>();

  /**
   * Обработчик клика по кнопке поиска.
   * Извлекает значение из строки поиска, отправляет его в хранилище,
   * выполняет запрос на получение проектов и сохраняет результаты в хранилище.
   */
  const handleSearch = () => {
    if (searchbar.current && searchbar.current !== null) {
      // Отправляет значение строки поиска в хранилище
      dispatch(setSearchbarValue(searchbar.current.value));

      // Выполняет запрос на получение проектов по заданному запросу
      dispatch(fetchData({value: searchbar.current.value, perPage: 10, page: 0}))

      // Устанавливает флаг завершения поиска
      dispatch(setToggle(true));
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }} className={styles.header}>
      <TextField
        inputRef={searchbar}
        hiddenLabel
        variant="outlined"
        placeholder="Введите поисковый запрос"
        sx={{
          backgroundColor: 'white',
          height: 42,
          '& .MuiOutlinedInput-root': {
            height: '100%',
            '& fieldset': {
              borderColor: 'transparent',
            },
            '&:hover fieldset': {
              borderColor: 'white',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'white',
            },
          },
          '& input': {
            height: '100%',
            padding: '0 14px',
          },
        }}
        className={styles.header__searchbar}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        className={styles.header__btn}
        sx={{
          backgroundColor: '#2196f3',
          height: 42,
          width: 105,
        }}
      >
        Искать
      </Button>
    </Box>
  );
}
