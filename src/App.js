import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import netlifyIdentity from 'netlify-identity-widget';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import Navbar from './components/Navbar';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import PrivateRoute from './components/PrivateRoute';
import "./App.css";
import { loginUser, logoutUser } from './lib/identityActions';

const App = () => {

  const [user, setUser] = useState({ user: null })

  const loggedInUser = localStorage.getItem("currentOpenSauceUser");
  if (loggedInUser) {
    setUser({ user: JSON.parse(loggedInUser) });
  } else {
    loginUser();
  }
  netlifyIdentity.on("login", (user) => setUser({ user: loggedInUser }, loginUser()));
  netlifyIdentity.on("logout", (user) => setUser({ user: null }, logoutUser()));

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
      <Router>
        <Navbar />
        <TaskForm />
        <Switch>
          <Route exact path="/" render={(props) => <TaskList {...props} refreshTasks={loadTasks} tasks={tasks} />} />
          <Route exact path="/privateRoute" component={PrivateRoute} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
