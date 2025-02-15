import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <div className="home-content">
        <h1>Welcome to Pro Connect</h1>
        <p>
          Join our thriving community of innovators and creators. Share your projects,
          discover amazing collaborations, and connect with talented professionals
          worldwide.
        </p>
        <div className="cta-buttons">
          <Link to="/projects" className="cta-button">
            Explore Projects
          </Link>
          <Link to="/register" className="cta-button">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
