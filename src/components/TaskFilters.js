import React, { useState } from "react";
import { TextField, MenuItem, Grid, Button } from "@mui/material";

const TaskFilters = ({ setFilters }) => {
  const [filters, updateFilters] = useState({
    taskType: "",
    priority: "",
    assignedTo: "",
    dueDate: "",
  });

  const handleChange = (event) => {
    updateFilters({ ...filters, [event.target.name]: event.target.value });
  };

  const applyFilters = () => {
    if (typeof setFilters !== "function") {
      console.error("setFilters is not a function");
      return;
    }
    setFilters(filters);
  };

  return (
    <Grid container spacing={2} sx={{ marginBottom: 2, padding: 2 }}>
      <Grid item xs={3}>
        <TextField
          select
          label="Task Type"
          name="taskType"
          value={filters.taskType}
          onChange={handleChange}
          fullWidth
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Call">📞 Call</MenuItem>
          <MenuItem value="Email">📧 Email</MenuItem>
          <MenuItem value="Meeting">📅 Meeting</MenuItem>
        </TextField>
      </Grid>

      <Grid item xs={3}>
        <TextField
          select
          label="Priority"
          name="priority"
          value={filters.priority}
          onChange={handleChange}
          fullWidth
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="High">High</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="Low">Low</MenuItem>
        </TextField>
      </Grid>

      <Grid item xs={3}>
        <TextField
          label="Assigned To"
          name="assignedTo"
          value={filters.assignedTo}
          onChange={handleChange}
          fullWidth
        />
      </Grid>

      <Grid item xs={3}>
        <TextField
          type="date"
          name="dueDate"
          value={filters.dueDate}
          onChange={handleChange}
          fullWidth
        />
      </Grid>

      <Grid
        item
        xs={12}
        sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}
      >
        <Button variant="contained" color="primary" onClick={applyFilters}>
          Apply Filters
        </Button>
      </Grid>
    </Grid>
  );
};

export default TaskFilters;
