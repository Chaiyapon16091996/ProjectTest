import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar, Button, styled } from '@mui/material';

export default function ShowTabel(props) {
  const { userList } = props
  return (
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
          {!!userList ? userList.map((item, index) => (
            <TableRow key={index} >
              <TableCell align="center" width={120}>
                <Avatar alt="Demy Sharp" sx={{ m: "auto" }} />
              </TableCell>
              <TableCell align="center">{!!item.name ? item.name : "-"}</TableCell>
              <TableCell align="center">{!!item.lastname ? item.lastname : "-"}</TableCell>
              <TableCell align="center">{!!item.gender && item.gender === 1 ? "Male" : !!item.gender && item.gender === 1 ? "Female" : "-"}</TableCell>
              <TableCell align="center">{!!item.birthday ? item.birthday : "-"}</TableCell>
              <TableCell align="center">
                <Button variant="contained"
                  sx={{
                    mr: 1, width: 80, background: "#f5c60a", "&:hover": {
                      backgroundColor: "#fce483",
                    },
                  }}>Edit</Button>
                <Button variant="contained"
                  sx={{
                    background: "red", width: 80, "&:hover": {
                      backgroundColor: "#fc8383",
                    }
                  }}>Delete</Button>
              </TableCell>
            </TableRow>
          )) : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const StyledTableCellHeader = styled(TableCell)({
  background: "#c8cbcf",
  fontSize: 16,
  fontWeight: 600
});
