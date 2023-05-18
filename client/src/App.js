import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Employee from "./compoents/Employee";

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Employee />
    </ThemeProvider>
  );
}

export default App;
