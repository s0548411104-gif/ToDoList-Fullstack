import { useEffect, useState } from "react";
import service from "./service";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTaskName, setNewTaskName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    refreshTasks();
  }, []);

  const refreshTasks = async () => {
    try {
      const data = await service.getTasks();
      if (Array.isArray(data)) {
        setTasks(data);
      } else {
        console.error("הנתונים שהתקבלו אינם מערך:", data);
      }
    } catch (error) {
      console.error("שגיאה בהבאת המשימות:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (newTaskName.trim() === "") return;
    await service.addTask(newTaskName);
    setNewTaskName("");
    refreshTasks();
  };

  const handleToggleComplete = async (task) => {
    await service.setCompleted(task.id, !task.isComplete);
    refreshTasks();
  };

  const handleDelete = async (taskId, e) => {
    e.stopPropagation();
    if (window.confirm("האם אתה בטוח שברצונך למחוק את המשימה?")) {
      await service.deleteTask(taskId);
      refreshTasks();
    }
  };

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>רשימת משימות</h1>
          <p>היום {new Date().toLocaleDateString('he-IL')}</p>
        </header>

        <form onSubmit={handleAddTask} className="task-form">
          <div className="input-group">
            <input
              type="text"
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
              placeholder="מה המשימה הבאה שלך?"
              className="task-input"
              dir="rtl"
            />
            <button type="submit" className="add-button">
              <span>הוסף משימה</span>
              <span className="plus-icon">+</span>
            </button>
          </div>
        </form>

        <div className="tasks-container">
          {isLoading ? (
            <div className="loading">טוען משימות...</div>
          ) : tasks && tasks.length > 0 ? (
            <ul className="task-list">
              {tasks.map((task) => (
                <li 
                  key={task.id} 
                  className={`task-item ${task.isComplete ? 'completed' : ''}`}
                  onClick={() => handleToggleComplete(task)}
                >
                  <div className="task-content">
                    <span className="checkbox">
                      {task.isComplete && <span className="checkmark">✓</span>}
                    </span>
                    <span className="task-text">{task.name}</span>
                  </div>
                  <button 
                    onClick={(e) => handleDelete(task.id, e)}
                    className="delete-button"
                    aria-label="מחק משימה"
                  >
                    🗑️
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty-state">
              <p>אין משימות כרגע. הוסיף משימה חדשה!</p>
            </div>
          )}
        </div>

        {tasks.length > 0 && (
          <div className="tasks-summary">
            {tasks.filter(t => t.isComplete).length} מתוך {tasks.length} הושלמו
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
