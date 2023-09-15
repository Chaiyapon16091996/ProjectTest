import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Avatar, Button, Grid, Pagination } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ShowTabel from '../../components/tableUser/showTable';
import React, { useState } from 'react';
import AddUser from '../addUser/adduser';
import Swal from 'sweetalert2';
import dayjs from 'dayjs';
import { format } from 'date-fns';

export default function UserManagement() {
    // สร้าง state สำหรับเก็บข้อมูล
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState(1);
    const [birthday, setBirthday] = useState(dayjs(new Date()));
    const [stateChekPage, setStateChekPage] = useState(0);

    const [userList, setUserList] = useState([{
        name: "Rattapong",
        lastname: "Sukiai",
        gender: 1,
        birthday: "15/09/2023"
    }, {
        name: "Somchai",
        lastname: "Rirut",
        gender: 1,
        birthday: "15/09/2023"
    }, {
        name: "datarong",
        lastname: "supee",
        gender: 1,
        birthday: "15/09/2023"
    }]);

    const handlePageChange = () => {
        setStateChekPage(1);
    };

    const handlePageSaveAdd = async () => {
        const resultCheck = await Swal.fire({
            title: "ต้องการบันทึกหรือไม่?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#02d444",
            cancelButtonColor: "#d33",
            confirmButtonText: "บันทึก",
            cancelButtonText: "ยกเลิก",
        });

        if (resultCheck.isConfirmed) {

            if (!!firstName && lastName) {
                setUserList([...userList, {
                    name: firstName,
                    lastname: lastName,
                    gender: gender,
                    birthday: format(new Date(birthday), "dd-MM-yyyy")
                }]);
                setStateChekPage(0);
                setFirstName("");
                setLastName("");
                setGender("");
            } else {
                Swal.fire({
                    icon: "error",
                    title: "ดำเนินการไม่สำเร็จ",
                });
            }
        }
    };

    return (
        <Box sx={{ flexGrow: 0 }}>
            <AppBar position="absolute">
                <Toolbar>
                    <Typography variant="h6">
                        User Management
                    </Typography>
                    <Box sx={{ flexGrow: 1, }}>
                        <Avatar alt="Demy Sharp" sx={{ float: "right" }} />
                    </Box>
                </Toolbar>
            </AppBar>
            <Box component="main" sx={{ mt: 10, p: 2 }}>
                {stateChekPage === 0 ?
                    <Grid container>
                        <Grid item xs={10}>
                            <Typography variant="h6">User List</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Button variant="contained" endIcon={<AddIcon />} sx={{ float: "right", width: 80 }} onClick={handlePageChange}>Add</Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{ p: 2 }}>
                                <ShowTabel userList={userList} />
                            </Box>
                        </Grid>
                    </Grid>
                    : <AddUser Save={handlePageSaveAdd}
                        firstName={firstName}
                        lastName={lastName}
                        gender={gender}
                        birthday={birthday}
                        setFirstName={setFirstName}
                        setLastName={setLastName}
                        setGender={setGender}
                        setBirthday={setBirthday} />}
            </Box>
        </Box>
    );
}