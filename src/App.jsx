import { ThemeProvider } from "@mui/material/styles";
import { Route, Routes } from "react-router-dom";
import UserManagement from "./page/user/userManagement";
import theme from "./theme";
import AddUser from "./page/addUser/adduser";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route exact path="/" element={<UserManagement />} />
        <Route exact path="/Add" element={<AddUser />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
