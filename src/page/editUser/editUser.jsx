import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button, Grid, IconButton, MenuItem, TextField, styled } from '@mui/material';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

const dataDropDrownGender = [
    {
        id: 1,
        name: "ชาย",
    },
    {
        id: 2,
        name: "หญิง",
    },
];

export default function EditUser(props) {
    const { Save, firstName, lastName, gender, birthday, setFirstName, setLastName, setGender, setBirthday, selectFile, setSelectFile, fileName, setFileName, inputImage, handleSaveFile, setFileContents, cancle, imgData } = props
console.log(fileName);
    return (
        <Box >
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="h6">Create new User</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Box
                        border="3px dashed #bbbb"
                        width="180px"
                        height="180px"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        sx={{ borderRadius: "50%", m: "auto" }}
                    >
                        {!!fileName ? (
                            selectFile?.name?.split(".").pop() === "png" ||
                                selectFile?.name?.split(".").pop() === "jpg" ||
                                selectFile?.name?.split(".").pop() === "jpeg" ? (
                                <img
                                    type="file"
                                    onClick={() => {
                                        inputImage.current.click();
                                    }}
                                    src={fileName}
                                    width="100%"
                                    height="100%"
                                    style={{ borderRadius: "50%" }}
                                />
                            ) : (
                                null
                            )
                        ) : (
                            <IconButton
                                color="primary"
                                aria-label="upload picture"
                                component="label"
                                style={{ backgroundColor: "transparent" }}
                                onClick={() => {
                                    inputImage.current.click();
                                }}
                            >
                                <PhotoCameraIcon />
                            </IconButton>
                        )}

                        <input
                            ref={inputImage}
                            hidden
                            accept="image/*"
                            type="file"
                            onChange={(e) => {
                                if (e.target.files[0] !== undefined) {
                                    setFileName(URL.createObjectURL(e.target.files[0]));
                                    setSelectFile((oldFile) => {
                                        oldFile = e.target.files[0];
                                        return oldFile;
                                    });
                                }
                            }}
                        />
                    </Box>
                    <Button variant='contained' sx={{ display: "flex", m: "auto", mt: 2 }} onClick={handleSaveFile}>Upload Profile Picture</Button>
                    <Button variant='contained' sx={{
                        display: "flex", m: "auto", mt: 2, background: "red", "&:hover": {
                            backgroundColor: "#870303",
                        }
                    }}
                        onClick={() => {
                            setFileName(null);
                            // setSelectFile(null)
                            setFileContents(null)
                        }}>Delete Picture</Button>
                </Grid>
                <Grid item xs={4}>
                    <StyledTextField
                        label="First name"
                        value={firstName}
                        sx={{ width: 450, mt: 20, }}
                        onChange={(e) => {
                            setFirstName(e.target.value);
                        }}
                    />
                </Grid>
                <Grid item xs={4}>
                    <StyledTextField
                        label="Last name"
                        value={lastName}
                        sx={{ width: 450, mt: 20, }}
                        onChange={(e) => {
                            setLastName(e.target.value);
                        }}
                    />
                </Grid>
                <Grid item xs={4}></Grid>
                <Grid item xs={4}>
                    <StyledTextField
                        select
                        variant="outlined"
                        label="Gender"
                        value={gender}
                        onChange={(e) => {
                            setGender(e.target.value);
                        }}
                        sx={{ width: 450 }}
                    >
                        {!!dataDropDrownGender
                            ? dataDropDrownGender.map((item, index) => (
                                <MenuItem key={index} value={item.id}>
                                    {item.name}
                                </MenuItem>
                            ))
                            : []}
                    </StyledTextField>
                </Grid>
                <Grid item xs={4}>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <StyledDatepicker
                            label="Birthday"
                            value={birthday}
                            format="DD/MM/YYYY"
                            onChange={(newValue) => {
                                setBirthday(newValue);
                            }}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ float: "right", m: 10 }}>
                        <Button variant='contained' sx={{
                            background: "#808080", width: 100, "&:hover": {
                                backgroundColor: "#636363",
                            }
                        }} onClick={cancle}>Cancle</Button>
                        <Button variant='contained' sx={{
                            background: "#02d444", ml: 2, width: 100, "&:hover": {
                                backgroundColor: "#017d28",
                            }
                        }} onClick={Save}>Save</Button>
                    </Box>

                </Grid>
            </Grid>
        </Box>
    );
}

const StyledTextField = styled(TextField)({
    display: "flex",
    margin: "auto",
});

const StyledDatepicker = styled(DatePicker)({
    width: 450,
    margin: "auto",
    display: "flex",
});
