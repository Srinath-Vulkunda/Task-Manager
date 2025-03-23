import React, { useContext, useState, useEffect } from "react";
import { TaskContext } from "../context/TaskContext";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Button,
  Typography,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
} from "@mui/material";

import TaskFilters from "./TaskFilters";
import TaskForm from "./TaskForm";

const TaskGrid = () => {
  const { tasks, addTask, updateTask } = useContext(TaskContext);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filters, setFilters] = useState({});
  const [openTaskForm, setOpenTaskForm] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks]);

  useEffect(() => {
    applyFilters();
  }, [filters, tasks]);

  const applyFilters = () => {
    if (!tasks) return;

    let newFilteredTasks = tasks.filter(
      (task) =>
        (!filters.taskType || task.taskType === filters.taskType) &&
        (!filters.priority || task.priority === filters.priority) &&
        (!filters.assignedTo ||
          task.assignedTo
            ?.toLowerCase()
            .includes(filters.assignedTo.toLowerCase())) &&
        (!filters.dueDate || task.dueDate === filters.dueDate),
    );

    setFilteredTasks(newFilteredTasks);
  };

  const handleCompleteToggle = (task) => {
    setSelectedTask(task);
    setOpenDialog(true);
  };

  const confirmComplete = () => {
    if (selectedTask) {
      updateTask({ ...selectedTask, completed: !selectedTask.completed }); // Toggle completion
      setSnackbar({
        open: true,
        message: `Task "${selectedTask.title}" marked as ${selectedTask.completed ? "incomplete" : "complete"}`,
      });
    }
    setOpenDialog(false);
    setSelectedTask(null);
  };

  return (
    <Box
      sx={{
        bgcolor: "white",
        boxShadow: 3,
        borderRadius: 2,
        p: 4,
        width: "100%",
        maxWidth: "1200px",
      }}
    >
      <Typography
        variant="h5"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold", mb: 4 }}
      >
        Task Manager
      </Typography>

      <TaskFilters setFilters={setFilters} />

      <Box sx={{ mb: 3, display: "flex", justifyContent: "flex-start" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenTaskForm(true)}
          sx={{ textTransform: "none", px: 3 }}
        >
          + Create Task
        </Button>
      </Box>

      <TableContainer
        component={Paper}
        sx={{ borderRadius: 2, overflow: "hidden" }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "grey.200" }}>
              <TableCell>
                <Typography fontWeight="bold">Task Title</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">Priority</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">Due Date</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">Assigned To</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">Complete</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <TableRow key={task.id} hover>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>{task.priority}</TableCell>
                  <TableCell>{task.dueDate}</TableCell>
                  <TableCell>{task.assignedTo || "Unassigned"}</TableCell>
                  <TableCell>
                    <Checkbox
                      checked={task.completed || false}
                      onChange={() => handleCompleteToggle(task)}
                      color="primary"
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography color="textSecondary">
                    No tasks available.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Task Status</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to mark "{selectedTask?.title}" as{" "}
            {selectedTask?.completed ? "incomplete" : "complete"}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={confirmComplete} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        message={snackbar.message}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
      <TaskForm
        open={openTaskForm}
        handleClose={() => setOpenTaskForm(false)}
        addTask={addTask}
      />
    </Box>
  );
};

export default TaskGrid;
