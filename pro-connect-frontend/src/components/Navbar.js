import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">Pro-connect</Link>
        <div>
          <Link className="btn btn-light mx-2" to="/login">Login</Link>
          <Link className="btn btn-warning" to="/register">Register</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
