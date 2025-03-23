import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Button,
  Box,
  Typography,
  Snackbar,
} from "@mui/material";
import axios from "axios"; // For mock API integration

const TaskForm = ({ open, handleClose, addTask }) => {
  const [taskData, setTaskData] = useState({
    title: "",
    taskType: "",
    priority: "",
    associatedRecord: "",
    assignedTo: "",
    dueDate: "",
    notes: "",
  });
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  const handleChange = (event) => {
    setTaskData({ ...taskData, [event.target.name]: event.target.value });
    if (errors[event.target.name]) {
      setErrors({ ...errors, [event.target.name]: "" });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!taskData.title) newErrors.title = "Task Name is required";
    if (!taskData.taskType) newErrors.taskType = "Task Type is required";
    if (!taskData.priority) newErrors.priority = "Priority is required";
    if (!taskData.dueDate) newErrors.dueDate = "Due Date is required";
    return newErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // Mock API call
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/todos",
        {
          ...taskData,
          completed: false,
        },
      );

      // Add task with mock API response ID
      const newTask = {
        ...taskData,
        id: response.data.id || Date.now(),
        completed: false,
      };
      await addTask(newTask);

      setSnackbar({ open: true, message: "Task created successfully!" });
      handleClose();
      setTaskData({
        title: "",
        taskType: "",
        priority: "",
        associatedRecord: "",
        assignedTo: "",
        dueDate: "",
        notes: "",
      });
    } catch (error) {
      setSnackbar({ open: true, message: "Failed to create task" });
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 2, p: 2 } }}
      >
        <DialogTitle>
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
            Create New Task
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <TextField
              label="Task Name"
              name="title"
              value={taskData.title}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
              error={!!errors.title}
              helperText={errors.title}
            />
            <TextField
              select
              label="Task Type"
              name="taskType"
              value={taskData.taskType}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
              error={!!errors.taskType}
              helperText={errors.taskType}
            >
              <MenuItem value="Call">📞 Call</MenuItem>
              <MenuItem value="Email">📧 Email</MenuItem>
              <MenuItem value="Meeting">📅 Meeting</MenuItem>
            </TextField>
            <TextField
              select
              label="Priority"
              name="priority"
              value={taskData.priority}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
              error={!!errors.priority}
              helperText={errors.priority}
            >
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
            </TextField>
            <TextField
              label="Associated Record"
              name="associatedRecord"
              value={taskData.associatedRecord}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
            <TextField
              label="Assigned To"
              name="assignedTo"
              value={taskData.assignedTo}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
            <TextField
              type="datetime-local"
              label="Due Date & Time"
              name="dueDate"
              value={taskData.dueDate}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
              error={!!errors.dueDate}
              helperText={errors.dueDate}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Notes"
              name="notes"
              value={taskData.notes}
              onChange={handleChange}
              fullWidth
              multiline
              rows={3}
              variant="outlined"
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleClose} color="secondary" variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            Create Task
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
    </>
  );
};

export default TaskForm;
