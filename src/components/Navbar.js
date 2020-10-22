import React from 'react';
import { Link } from 'react-router-dom';
import netlifyIdentity from 'netlify-identity-widget';

export default function Navbar({ refreshTasks }) {


  const handleLogin = async () => {
    netlifyIdentity.open();
    await netlifyIdentity.on('login', () => refreshTasks());
  }

  const handleLogout = () => {
    netlifyIdentity.logout();
    refreshTasks();
  }

  const getUserDetails = async () => {
    const user = await netlifyIdentity.currentUser();
    console.log("User details", user);
    console.log("token", user.token);
  }

  return (
    <nav>
      <div className="nav-wrapper green lighten-1">
        <Link to="/" className="brand-logo left">Todo List</Link>
        <ul id="nav-mobile" className="right">
          <li><Link to="/privateRoute">Private Route</Link></li>
          {netlifyIdentity.currentUser() &&
            <li><a href="#!" onClick={handleLogout}>Logout</a></li>
          }
          {!netlifyIdentity.currentUser() &&
            <li><a href="#!" onClick={handleLogin}>Login/Register</a></li>

          }
          <li><a href="#!" onClick={getUserDetails}>User Details</a></li>
        </ul>
      </div>
    </nav>
  )
}
