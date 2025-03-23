import React, { createContext, useState, useEffect } from "react";
import { fetchTasks, createTask, markTaskComplete } from "../api/mockApi";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const response = await fetchTasks();
      setTasks(response.data || []);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addTask = async (newTask) => {
    try {
      const response = await createTask(newTask);
      setTasks((prevTasks) => [response.data, ...prevTasks]); // Add to top
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const updateTask = async (updatedTask) => {
    try {
      // Call mock API to mark task as complete (or update other fields)
      const response = await markTaskComplete(
        updatedTask.id,
        updatedTask.completed,
      );
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === updatedTask.id ? { ...task, ...response.data } : task,
        ),
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, loadTasks }}>
      {children}
    </TaskContext.Provider>
  );
};
