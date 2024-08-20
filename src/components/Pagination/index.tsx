import React, {useEffect, useState} from 'react';
import TablePagination from '@mui/material/TablePagination';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/dataStore.ts';
import { fetchData } from '../../store/toolkitSlice.ts';


//пагинация по таблице

export default function Pagination() {
  //Хук для вызова функции dispatch из Redux для отправки экшенов в хранилище.
  const dispatch = useDispatch<AppDispatch>();

  //хук получения количества результатов запроса из хранилища
  const totalResult = useSelector((state: RootState) => state.toolkit.data.total_count);

  //хук получения значения поисковой строки
  const searchbarValue = useSelector((state: RootState) => state.toolkit.searchbarValue);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10)

  useEffect(() => {
    dispatch(fetchData({value: searchbarValue, perPage: rowsPerPage, page: page}))
  }, [dispatch, page, rowsPerPage, searchbarValue]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage)

  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TablePagination
      component="div"
      count={totalResult}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
}

