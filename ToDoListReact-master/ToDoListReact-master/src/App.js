import { useEffect, useState } from "react";
import service from "./service";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTaskName, setNewTaskName] = useState("");

  useEffect(() => {
    refreshTasks();
  }, []);

  const refreshTasks = async () => {
    const data = await service.getTasks();
    setTasks(data);
  };

  const handleAddTask = async () => {
    if (newTaskName.trim() === "") return;
    await service.addTask(newTaskName);
    setNewTaskName("");
    refreshTasks();
  };

  const handleToggleComplete = async (task) => {
    await service.setCompleted(task.id, !task.isComplete);
    refreshTasks();
  };

  const handleDelete = async (task) => {
    await service.deleteTask(task.id);
    refreshTasks();
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>רשימת משימות</h1>

      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
          placeholder="הכנס שם משימה"
        />
        <button onClick={handleAddTask}>הוסף משימה</button>
      </div>

      <ul>
        {tasks.map((task) => (
          <li key={task.id} style={{ marginBottom: "5px" }}>
            <span
              style={{
                textDecoration: task.isComplete ? "line-through" : "none",
                cursor: "pointer",
              }}
              onClick={() => handleToggleComplete(task)}
            >
              {task.name}
            </span>{" "}
            <button onClick={() => handleDelete(task)}>❌ מחק</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
