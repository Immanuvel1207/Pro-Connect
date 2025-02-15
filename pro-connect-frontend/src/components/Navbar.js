import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={{padding:'5px'}} className="navbar">
      <Link to="/" className="navbar-brand" style={{color:'white',padding:'10px'}}>Pro Connect</Link>
      <div className="navbar-links">
        <Link to="/projects">Projects</Link>
        {user ? (
          <>
            {/* <Link to="/dashboard">Dashboard</Link> */}
            <Link to="/create-project">Create Project</Link>
            <Link to="/profile">Profile</Link>
            <button  style={{color:'white',background:'transparent'}} onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
export default Navbar;