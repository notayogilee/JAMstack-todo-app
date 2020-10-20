import React, { useEffect, useState } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Navbar from './components/Navbar';
import "./App.css";

const App = () => {

  useEffect(() => {
    M.AutoInit();
  });

  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    try {
      const res = await fetch('/.netlify/functions/getTasks');
      const tasks = await res.json();
      tasks.sort((a, b) => a.priority - b.priority);
      setTasks(tasks);
    } catch (err) {
      console.error(err)
    }
  };



  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="row">
      <Navbar />
      <div className="container">
        <TaskForm refreshTasks={loadTasks} />
        <TaskList tasks={tasks} refreshTasks={loadTasks} />
      </div>
    </div>
  );
}

export default App;
