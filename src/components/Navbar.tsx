import React from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Stock Analyzer</div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/stock-analyzer">Stock Analyzer</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
