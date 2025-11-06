import axios from "axios";

const apiUrl = "http://localhost:5000";

export default {
  getTasks: async () => {
    const result = await axios.get(`${apiUrl}/tasks`);
    return result.data;
  },

  addTask: async (name) => {
    const newTask = { name, isComplete: false };
    const result = await axios.post(`${apiUrl}/tasks`, newTask);
    return result.data;
  },

  setCompleted: async (id, isComplete) => {
    const updatedTask = { name: "", isComplete }; 
    await axios.put(`${apiUrl}/tasks/${id}`, updatedTask);
  },

  deleteTask: async (id) => {
    await axios.delete(`${apiUrl}/tasks/${id}`);
  }
};
