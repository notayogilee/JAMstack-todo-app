import React, { useEffect, useState } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

// Grab all of the tasks
// Display all the tasks
// Add, update, and delete functionality
const App = () => {

  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    try {
      const res = await fetch('/.netlify/functions/getTasks');
      const tasks = await res.json();

      setTasks(tasks);
    } catch (err) {
      console.error(err)
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5">Todo List</h1>
      <TaskForm refreshTasks={loadTasks} />
      <TaskList tasks={tasks} refreshTasks={loadTasks} />
    </div>
  );
}

export default App;
