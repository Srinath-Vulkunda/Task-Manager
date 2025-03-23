import React, { useState, useEffect } from "react";
import { Container, Typography, Paper } from "@mui/material";
import TaskGrid from "../components/TaskGrid";

const TaskListPage = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ marginBottom: 3, marginTop: 3 }}>
        Task Manager
      </Typography>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <TaskGrid />
      </Paper>
    </Container>
  );
};

export default TaskListPage;
