# ToDo Fullstack App

A fullstack project containing:

* Frontend (React)
* Backend (ASP.NET Core Web API)

## 📦 Frontend Setup (React)

1. Navigate to the folder:

   ```bash
   cd ToDoListReact-master/ToDoListReact-master
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the frontend:

   ```bash
   npm start
   ```

The frontend will run at:

```
http://localhost:3000
```

---

## 🖥️ Backend Setup (ASP.NET Core Web API)

1. Navigate to the API folder:

   ```bash
   cd TodoApi
   ```

2. Run the backend:

   ```bash
   dotnet run
   ```

The server will start at:

```
http://localhost:5000
```

---

## 🔗 Connecting Frontend to Backend

Make sure your Axios calls in the frontend use the correct URL:

```javascript
axios.get("http://localhost:5000/api/tasks");
```

---

## 🚀 Full Development Run

To develop the project:

* Open one terminal → run `dotnet run`
* Open a second terminal → run `npm start`

Both must run simultaneously.

---

## 📁 Project Structure

```
/TodoApi
/ToDoListReact-master
README.md
```

---
