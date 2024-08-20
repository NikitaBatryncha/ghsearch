import React, { useState } from "react";
import styles from "./styles.module.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/dataStore";
import Pagination from "../Pagination/index.tsx";
import { fetchInfo } from "../../store/toolkitSlice.ts";
import { TableSortLabel } from "@mui/material";

interface ProjectData {
  id: number | string;
  name: string;
  language: string;
  owner: string;
  forks: number;
  stars: number;
  date: string;
}

//таблица результатов запроса
export default function ResultTable() {
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const [sortColumn, setSortColumn] = useState<keyof ProjectData>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  function createData({
    id,
    name,
    language,
    owner,
    forks,
    stars,
    date,
  }: ProjectData) {
    return { id, owner, name, language, forks, stars, date };
  }

  const data = useSelector((state: RootState) => state.toolkit.data);
  const dispatch = useDispatch();

  const rows = data.items.map((item: any) =>
    createData({
      id: item.id,
      name: item.name,
      owner: item.owner.login,
      language: item.language,
      forks: item.forks_count,
      stars: item.stargazers_count,
      date: `${item.updated_at.substring(8, 10)}.${item.updated_at.substring(5, 7)}.${item.updated_at.substring(0, 4)}`,
    })
  );

  const sortedRows = rows.sort((a, b) => {
    let comparison = 0;

    if (a[sortColumn] < b[sortColumn]) {
      comparison = -1;
    } else if (a[sortColumn] > b[sortColumn]) {
      comparison = 1;
    }

    return sortDirection === "asc" ? comparison : -comparison;
  });

  const handleSortRequest = (column: keyof ProjectData) => {
    const isAscending = sortColumn === column && sortDirection === "asc";
    setSortColumn(column);
    setSortDirection(isAscending ? "desc" : "asc");
  };

  const handleRowClick = (id: string, owner: string, name: string) => {
    setSelectedRow(id);
    dispatch(fetchInfo({ owner, name }));
  };

  return (
    <div className={styles.table}>
      <h1 className={styles.table__header}>Результаты поиска</h1>
      <TableContainer component={Paper} className={styles.table__container}>
        <Table stickyHeader aria-label="sticky table" className={styles.table__grid}>
          <TableHead>
            <TableRow>
              <TableCell>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <TableSortLabel
                    active={sortColumn === "name"}
                    direction={sortColumn === "name" ? sortDirection : "asc"}
                    onClick={() => handleSortRequest("name")}
                    style={{ margin: 0 }}
                  />
                  <span className={styles.tabel__label}>Название</span>
                </div>
              </TableCell>
              <TableCell align="left">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <TableSortLabel
                    active={sortColumn === "language"}
                    direction={sortColumn === "language" ? sortDirection : "asc"}
                    onClick={() => handleSortRequest("language")}
                    style={{ margin: 0 }}
                  />
                  <span className={styles.tabel__label}>Язык</span>
                </div>
              </TableCell>
              <TableCell align="left">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <TableSortLabel
                    active={sortColumn === "forks"}
                    direction={sortColumn === "forks" ? sortDirection : "asc"}
                    onClick={() => handleSortRequest("forks")}
                    style={{ margin: 0 }}
                  />
                  <span className={styles.tabel__label}>Число форков</span>
                </div>
              </TableCell>
              <TableCell align="left">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <TableSortLabel
                    active={sortColumn === "stars"}
                    direction={sortColumn === "stars" ? sortDirection : "asc"}
                    onClick={() => handleSortRequest("stars")}
                    style={{ margin: 0 }}
                  />
                  <span className={styles.tabel__label}>Число звезд</span>
                </div>
              </TableCell>
              <TableCell align="left">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <TableSortLabel
                    active={sortColumn === "date"}
                    direction={sortColumn === "date" ? sortDirection : "asc"}
                    onClick={() => handleSortRequest("date")}
                    style={{ margin: 0 }}
                  />
                  <span className={styles.tabel__label}>Дата обновления</span>
                </div>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows.map((row) => (
              <TableRow
                selected={row.id === selectedRow}
                className={styles.table__row}
                key={row.id}
                data-owner={row.owner}
                data-name={row.name}
                onClick={() => handleRowClick(row.id as string, row.owner, row.name)}
              >
                <TableCell component="th" scope="row" className={styles.table__cell}>
                  {row.name}
                </TableCell>
                <TableCell align="left" className={styles.table__cell}>{row.language}</TableCell>
                <TableCell align="left" className={styles.table__cell}>{row.forks}</TableCell>
                <TableCell align="left" className={styles.table__cell}>{row.stars}</TableCell>
                <TableCell align="left" className={styles.table__cell}>{row.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination />
    </div>
  );
}
