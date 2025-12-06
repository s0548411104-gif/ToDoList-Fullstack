import { useEffect, useState } from "react";
import service from "./service";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTaskName, setNewTaskName] = useState("");

  useEffect(() => {
    refreshTasks();
  }, []);

  const refreshTasks = async () => {
    try {
      const data = await service.getTasks();

      console.log("הנתונים שהתקבלו:", data);

      if (Array.isArray(data)) {
        setTasks(data);
      } else {
        console.error("הנתונים שהתקבלו אינם מערך:", data);
      }
    } catch (error) {
      console.error("שגיאה בהבאת המשימות:", error);
    }
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
        {tasks && tasks.length > 0 ? (
          tasks.map((task) => (
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
              <button onClick={() => handleDelete(task)}></button>
            </li>
          ))
        ) : (
          <p>אין משימות להציג</p>
        )}
      </ul>
    </div>
  );
}

export default App;
