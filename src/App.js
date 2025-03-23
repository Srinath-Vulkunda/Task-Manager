import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { TaskProvider } from "./context/TaskContext";
import TaskGrid from "./components/TaskGrid";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  CssBaseline,
} from "@mui/material";

const App = () => {
  return (
    <TaskProvider>
      <Router>
        <CssBaseline />
        <AppBar position="static" sx={{ mb: 4 }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Task Manager
            </Typography>
          </Toolbar>
        </AppBar>
        <Container
          maxWidth="xl"
          sx={{ py: 6, bgcolor: "grey.100", minHeight: "100vh" }}
        >
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box sx={{ width: "100%", maxWidth: "1200px" }}>
              <Routes>
                <Route path="/" element={<TaskGrid />} />
              </Routes>
            </Box>
          </Box>
        </Container>
      </Router>
    </TaskProvider>
  );
};

export default App;
