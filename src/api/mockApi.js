import axios from "axios";

const API_URL = "https://67df8a257635238f9aa9d210.mockapi.io/tasks";

export const fetchTasks = async () => {
  return await axios.get(API_URL);
};

export const createTask = async (taskData) => {
  return await axios.post(API_URL, taskData);
};

export const markTaskComplete = async (taskId) => {
  return await axios.put(`${API_URL}/${taskId}`, { completed: true });
};
