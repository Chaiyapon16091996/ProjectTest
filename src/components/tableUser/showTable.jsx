import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar, Button, TablePagination, styled } from '@mui/material';
import React, { useMemo, useState } from 'react';

export default function ShowTabel(props) {
  const { userList, remove, edit } = props
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCellHeader align="center">Profile picture</StyledTableCellHeader>
              <StyledTableCellHeader align="center">First name</StyledTableCellHeader>
              <StyledTableCellHeader align="center">Last name</StyledTableCellHeader>
              <StyledTableCellHeader align="center">Gender</StyledTableCellHeader>
              <StyledTableCellHeader align="center">Birthday</StyledTableCellHeader>
              <StyledTableCellHeader align="center">Action</StyledTableCellHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {!!userList ? userList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
              <TableRow key={index} >
                <TableCell align="center" width={120}>
                  <Avatar alt="Demy Sharp" src={!!item.img ? item.img : "-"} sx={{ m: "auto" }} />
                </TableCell>
                <TableCell align="center">{!!item.name ? item.name : "-"}</TableCell>
                <TableCell align="center">{!!item.lastname ? item.lastname : "-"}</TableCell>
                <TableCell align="center">{!!item.gender && item.gender === 1 ? "Male" : !!item.gender && item.gender === 2 ? "Female" : "-"}</TableCell>
                <TableCell align="center">{!!item.birthday ? item.birthday : "-"}</TableCell>
                <TableCell align="center">
                  <Button variant="contained"
                    sx={{
                      mr: 1, width: 80, background: "#f5c60a", "&:hover": {
                        backgroundColor: "#fce483",
                      },
                    }}
                    onClick={() =>
                      edit(
                        item.name,
                        item.lastname,
                        item.gender,
                        item.birthday,
                        item.img
                      )
                    }>Edit</Button>
                  <Button variant="contained"
                    sx={{
                      background: "red", width: 80, "&:hover": {
                        backgroundColor: "#fc8383",
                      }
                    }}
                    onClick={() =>
                      remove(
                        item.name,
                        item.lastname,
                        item.gender,
                        item.birthday
                      )
                    }>Delete</Button>
                </TableCell>
              </TableRow>
            )) : null}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={userList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}

const StyledTableCellHeader = styled(TableCell)({
  background: "#c8cbcf",
  fontSize: 16,
  fontWeight: 600
});
