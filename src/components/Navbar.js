import React from 'react';

export default function Navbar() {
  return (
    <nav>
      <div className="nav-wrapper green lighten-1">
        <a href="#" className="brand-logo left">Todo List</a>
        <ul id="nav-mobile" className="right">
          <li><a href="sass.html">Login</a></li>
          <li><a href="badges.html">Register</a></li>
        </ul>
      </div>
    </nav>
  )
}
