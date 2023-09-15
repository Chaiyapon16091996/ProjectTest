import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Avatar, Button, Grid, MenuItem, Stack, TextField, styled } from '@mui/material';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

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
    const { Save, firstName, lastName, gender, birthday, setFirstName, setLastName, setGender, setBirthday } = props

    return (
        <Box >
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="h6">Create new User</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Stack spacing={3} justifyContent="center" alignItems="center" sx={{ mt: 2 }}>
                        <Box sx={{ background: "#F5F5F5" }}>
                            <Avatar
                                sx={{ width: 200, height: 200, background: "#FFFFFF" }}
                            />
                        </Box>
                    </Stack>
                    <Button variant='contained' sx={{ display: "flex", m: "auto", mt: 2 }}>Upload Profile Picture</Button>
                    <Button variant='contained' sx={{
                        display: "flex", m: "auto", mt: 2, background: "red", "&:hover": {
                            backgroundColor: "#870303",
                        }
                    }}>Delete Picture</Button>
                </Grid>
                <Grid item xs={4}>
                    <StyledTextField
                        label="First name"
                        value={firstName}
                        sx={{ width: 450, mt: 30, }}
                        onChange={(e) => {
                            setFirstName(e.target.value);
                        }}
                    />
                </Grid>
                <Grid item xs={4}>
                    <StyledTextField
                        label="Last name"
                        value={lastName}
                        sx={{ width: 450, mt: 30, }}
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
                        }}>Cancle</Button>
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
