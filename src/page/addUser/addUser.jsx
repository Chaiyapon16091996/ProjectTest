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

export default function AddUser(props) {
    const { Save, firstName, lastName, gender, birthday, setFirstName, setLastName, setGender, setBirthday, selectFile, setSelectFile, fileName, setFileName, inputImage, handleSaveFile, setFileContents, cancle } = props

    return (
        <Box >
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="h6">Create new User</Typography>
                </Grid>
                <Grid item sm={4} md={4} lg={4} xs={12}>
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
                                    alt="Avatar"
                                    style={{ borderRadius: "50%" }}
                                />
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
                            setSelectFile(null)
                            setFileContents(null)
                        }}>Delete Picture</Button>
                </Grid>
                <Grid item sm={4} md={4} lg={4} xs={12}>
                    <StyledTextField
                        label="First name"
                        value={firstName}
                        sx={{ width: { xs: 300, sm: "auto", md: "auto", lg: "auto" }, mt: { xs: 5, sm: 20, md: 20, lg: 20 }, }}
                        onChange={(e) => {
                            setFirstName(e.target.value);
                        }}
                    />
                </Grid>
                <Grid item sm={4} md={4} lg={4} xs={12}>
                    <StyledTextField
                        label="Last name"
                        value={lastName}
                        sx={{ width: { xs: 300, sm: "auto", md: "auto", lg: "auto" }, mt: { xs: 2, sm: 20, md: 20, lg: 20 }, ml: { xs: "", sm: 1, md: "", lg: 1 } }}
                        onChange={(e) => {
                            setLastName(e.target.value);
                        }}
                    />
                </Grid>
                <Grid item xs={4}></Grid>
                <Grid item sm={4} md={4} lg={4} xs={12}>
                    <StyledTextField
                        select
                        variant="outlined"
                        label="Gender"
                        value={gender}
                        onChange={(e) => {
                            setGender(e.target.value);
                        }}
                        sx={{ width: { xs: 300, sm: "auto", md: "auto", lg: "auto" }, mt: { xs: 2, sm: 0, md: 0, lg: 0 } }}
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
                <Grid item sm={4} md={4} lg={4} xs={12}>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <StyledDatepicker
                            label="Birthday"
                            value={birthday}
                            format="DD/MM/YYYY"
                            onChange={(newValue) => {
                                setBirthday(newValue);
                            }}
                            sx={{ width: { xs: 300, sm: "auto", md: "auto", lg: "auto" }, mt: { xs: 2, sm: 0, md: 0, lg: 0 }, ml: { xs: "", sm: 1, md: "", lg: 1 } }}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ textAlign: { xs: "center", sm: "", md: "", lg: "" }, float: { xs: "", sm: "right", md: "right", lg: "right" }, m: { xs: 0, sm: 3, md: 3, lg: 0 }, mt: { xs: 3, sm: 10, md: 10, lg: 10 } }}>
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
    margin: "auto",
    display: "flex",
});
