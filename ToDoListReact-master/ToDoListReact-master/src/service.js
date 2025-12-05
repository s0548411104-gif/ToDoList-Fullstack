import axios from "axios";

// קבלת כתובת ה־API מה־.env
const apiUrl = process.env.REACT_APP_API_URL;

// ודאי שאין // כפול בכתובת
const normalizeUrl = (url) => url.replace(/\/+$/, "");

const apiService = {
  getTasks: async () => {
    const result = await axios.get(`${normalizeUrl(apiUrl)}/tasks`);
    return result.data;
  },

  addTask: async (name) => {
    const newTask = { name, isComplete: false };
    const result = await axios.post(`${normalizeUrl(apiUrl)}/tasks`, newTask);
    return result.data;
  },

  setCompleted: async (id, isComplete) => {
    const updatedTask = { isComplete };
    await axios.put(`${normalizeUrl(apiUrl)}/tasks/${id}`, updatedTask);
  },

  deleteTask: async (id) => {
    await axios.delete(`${normalizeUrl(apiUrl)}/tasks/${id}`);
  }
};

export default apiService;
