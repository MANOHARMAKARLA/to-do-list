import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    // Fetch tasks from the server when the component mounts
    fetch('http://localhost:500/api/tasks') // Updated to use port 500
      .then((response) => response.json())
      .then((data) => setTasks(data));
  }, []);

  const addTask = () => {
    if (newTask) {
      // Send a POST request to add a new task
      fetch('http://localhost:500/api/tasks', { // Updated to use port 500
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newTask }),
      })
        .then((response) => response.json())
        .then((data) => {
          setTasks([...tasks, data]);
          setNewTask('');
        });
    }
  };

  const markAsComplete = (taskId) => {
    // Send a PUT request to mark a task as complete
    fetch(`http://localhost:500/api/tasks/${taskId}`, { // Updated to use port 500
      method: 'PUT',
    })
      .then(() => {
        const updatedTasks = tasks.map((task) =>
          task.id === taskId ? { ...task, completed: true } : task
        );
        setTasks(updatedTasks);
      });
  };

  return (
    <div className="App">
      <h1>My To-Do List</h1>
      <input
        type="text"
        placeholder="Add a new task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            className={task.completed ? 'completed' : ''}
            onClick={() => markAsComplete(task.id)}
          >
            {task.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
