import React from 'react';
import { Link } from 'react-router-dom';
import netlifyIdentity from 'netlify-identity-widget';

export default function Navbar() {
  return (
    <nav>
      <div className="nav-wrapper green lighten-1">
        <Link to="/" className="brand-logo left">Todo List</Link>
        <ul id="nav-mobile" className="right">
          <li><a href="/privateRoute">Private Route</a></li>
          <li><a href="#!" onClick={() => netlifyIdentity.open()}>Login/Register</a></li>
        </ul>
      </div>
    </nav>
  )
}
