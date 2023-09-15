import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Avatar, Button, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ShowTabel from '../../components/tableUser/showTable';
import React, { useRef, useState } from 'react';
import AddUser from '../addUser/adduser';
import Swal from 'sweetalert2';
import dayjs from 'dayjs';
import { format } from 'date-fns';
import EditUser from '../editUser/editUser';
import UserImg from '../../img/pngwing.png'

export default function UserManagement() {
    // สร้าง state สำหรับเก็บข้อมูล
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState(1);
    const [birthday, setBirthday] = useState(dayjs(new Date()));
    const [stateChekPage, setStateChekPage] = useState(0);

    // state img
    const [selectFile, setSelectFile] = useState(null);
    const [fileName, setFileName] = useState(null);
    const inputImage = useRef(null);
    const [fileContents, setFileContents] = useState(null);

    // state edit img 
    const [editSelectFile, setEditSelectFile] = useState(null);
    const [editfileName, setEditFileName] = useState(null);
    const [editfileContents, setEditFileContents] = useState(null);

    // state edit
    const [editFirstName, setEditFirstName] = useState("");
    const [editLastName, setEditLastName] = useState("");
    const [editGender, setEditGender] = useState(1);
    const [nameBefore, setNameBefore] = useState(null);
    const [lastNameBefore, setLastNameBefore] = useState(null);
    const [editBirthday, setEditBirthday] = useState(dayjs(new Date()));

    const [userList, setUserList] = useState([{
        name: "Rattapong",
        lastname: "Sukiai",
        gender: 1,
        birthday: "2023/09/15",
        img: ""
    }, {
        name: "Somchai",
        lastname: "Rirut",
        gender: 1,
        birthday: "2023/09/15",
        img: ""
    }, {
        name: "datarong",
        lastname: "supee",
        gender: 1,
        birthday: "2023/09/15",
        img: ""
    }]);


    const handleCancle = () => {
        setStateChekPage(0);
        setFirstName("");
        setLastName("");
        setGender(1);
        setSelectFile(null)
        setFileContents(null)
        setEditFirstName("");
        setEditLastName("");
        setEditGender(1);
        setEditFileContents(null)
    };
    const handlePageChange = () => {
        setStateChekPage(1);
    };

    const handlePageSaveAdd = async () => {
        const resultCheck = await Swal.fire({
            title: "Do you want to save?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#02d444",
            cancelButtonColor: "#d33",
            confirmButtonText: "Save",
            cancelButtonText: "Cancle",
        });

        if (resultCheck.isConfirmed) {

            if (!!firstName && lastName) {
                setUserList([...userList, {
                    name: firstName,
                    lastname: lastName,
                    gender: gender,
                    birthday: format(new Date(birthday), "yyyy/MM/dd"),
                    img: fileContents
                }]);
                setStateChekPage(0);
                setFirstName("");
                setLastName("");
                setGender(1);
                setSelectFile(null)
                setFileContents(null)
            } else {
                Swal.fire({
                    icon: "error",
                    title: "The operation was unsuccessful.",
                });
            }
        }
    };

    const handleSaveFile = () => {
        if (selectFile) {
            const reader = new FileReader();

            reader.onload = function (e) {
                const fileContent = e.target.result;
                setFileContents(fileContent)
                // ทำอะไรกับไฟล์ content ที่อ่านได้ที่นี่
            };

            reader.readAsDataURL(selectFile);

            Swal.fire({
                text: "Success",
                icon: "success",
                showConfirmButton: false,
                timer: 1000,
            })
        } else {
            Swal.fire({
                icon: "error",
                title: "Please select a file first.",
            });
        }
    };

    // FN Del
    const removeTransaction = (
        nameToDelete,
        lastnameToDelete,
        genderToDelete,
        birthdayToDelete
    ) => {
        const updatedTrans = userList.filter((data) => {
            return (
                data.name !== nameToDelete ||
                data.lastname !== lastnameToDelete ||
                data.gender !== genderToDelete ||
                data.birthday !== birthdayToDelete
            );
        });

        setUserList(updatedTrans);
    };


    const handlePageEditChange = (name, lastname, gender, birthdays, img) => {
        setEditFirstName(name)
        setEditLastName(lastname)
        setEditGender(gender)
        setNameBefore(name)
        setLastNameBefore(lastname)
        setEditFileName(img)
        setEditBirthday(dayjs(new Date(birthdays)));
        setStateChekPage(2);
    };

    const handlePageSaveEdit = async () => {
        const resultCheck = await Swal.fire({
            title: "Do you want to save?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#02d444",
            cancelButtonColor: "#d33",
            confirmButtonText: "Save",
            cancelButtonText: "Cancle",
        });

        if (resultCheck.isConfirmed) {

            if (!!editFirstName && editLastName) {
                const updatedData = userList.map(item => {
                    if (item.name === nameBefore && item.lastname === lastNameBefore && !!editfileContents) {
                        return { ...item, name: editFirstName, lastname: editLastName, gender: editGender, birthday: format(new Date(editBirthday), "yyyy/MM/dd"), img: editfileContents };
                    } else if (item.name === nameBefore && item.lastname === lastNameBefore) {
                        return { ...item, name: editFirstName, lastname: editLastName, gender: editGender, birthday: format(new Date(editBirthday), "yyyy/MM/dd") };
                    }
                    return item;
                });
                setUserList(updatedData);
                setStateChekPage(0);
                setEditFirstName("");
                setEditLastName("");
                setEditGender(1);
                // setEditSelectFile(null)
                setEditFileContents(null)
            } else {
                Swal.fire({
                    icon: "error",
                    title: "The operation was unsuccessful.",
                });
            }
        }
    };

    const handleSaveFileEdit = () => {
        if (editSelectFile) {
            const reader = new FileReader();

            reader.onload = function (e) {
                const fileContent = e.target.result;
                setEditFileContents(fileContent)
                // ทำอะไรกับไฟล์ content ที่อ่านได้ที่นี่
            };

            reader.readAsDataURL(editSelectFile);
        } else {
            Swal.fire({
                icon: "error",
                title: "Please select a file first.",
            });
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
                        <Avatar alt="Demy Sharp" src={UserImg} sx={{ float: "right" }} />
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
                            <Box sx={{ p: 2, mt: 5 }}>
                                <ShowTabel userList={userList} remove={removeTransaction} edit={handlePageEditChange} />
                            </Box>
                        </Grid>
                    </Grid>
                    : stateChekPage === 1 ? <AddUser Save={handlePageSaveAdd}
                        firstName={firstName}
                        lastName={lastName}
                        gender={gender}
                        birthday={birthday}
                        fileName={fileName}
                        setFileName={setFileName}
                        inputImage={inputImage}
                        setFirstName={setFirstName}
                        setLastName={setLastName}
                        setGender={setGender}
                        setBirthday={setBirthday}
                        selectFile={selectFile}
                        setSelectFile={setSelectFile}
                        setFileContents={setFileContents}
                        cancle={handleCancle}
                        handleSaveFile={handleSaveFile}
                    /> : <EditUser Save={handlePageSaveEdit}
                        firstName={editFirstName}
                        lastName={editLastName}
                        gender={editGender}
                        birthday={editBirthday}
                        fileName={editfileName}
                        setFileName={setEditFileName}
                        inputImage={inputImage}
                        setFirstName={setEditFirstName}
                        setLastName={setEditLastName}
                        setGender={setEditGender}
                        setBirthday={setEditBirthday}
                        selectFile={editSelectFile}
                        setSelectFile={setEditSelectFile}
                        setFileContents={setEditFileContents}
                        cancle={handleCancle}
                        handleSaveFile={handleSaveFileEdit} />}
            </Box>
        </Box>
    );
}