import axios from "axios";

// לקיחת כתובת מה־.env והסרת סלש בסוף אם יש
const apiUrl = process.env.REACT_APP_API_URL?.replace(/\/$/, "");

const apiService = {
  getTasks: async () => {
    try {
      const result = await axios.get(`${apiUrl}/tasks`);
      return result.data;
    } catch (error) {
      console.error("שגיאה ב־getTasks:", error);
      throw error;
    }
  },

  addTask: async (name) => {
    try {
      const newTask = { name, isComplete: false };
      const result = await axios.post(`${apiUrl}/tasks`, newTask);
      return result.data;
    } catch (error) {
      console.error("שגיאה ב־addTask:", error);
      throw error;
    }
  },

  setCompleted: async (id, isComplete) => {
    try {
      const updatedTask = { isComplete };
      await axios.put(`${apiUrl}/tasks/${id}`, updatedTask);
    } catch (error) {
      console.error("שגיאה ב־setCompleted:", error);
      throw error;
    }
  },

  deleteTask: async (id) => {
    try {
      await axios.delete(`${apiUrl}/tasks/${id}`);
    } catch (error) {
      console.error("שגיאה ב־deleteTask:", error);
      throw error;
    }
  }
};

export default apiService;
