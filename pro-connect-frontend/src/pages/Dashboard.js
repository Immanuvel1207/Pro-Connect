import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import './Dashboard.css';

function Dashboard() {
  const { user } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const [projectsRes, applicationsRes] = await Promise.all([
        axios.get('http://localhost:5000/api/projects/user', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }),
        axios.get('http://localhost:5000/api/applications/user', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
      ]);

      setProjects(projectsRes.data);
      setApplications(applicationsRes.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Welcome, {user.name}!</h2>
        <Link to="/create-project" className="create-project-btn">
          Create New Project
        </Link>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-section">
          <h3>My Projects</h3>
          <div className="projects-list">
            {projects.map(project => (
              <div key={project._id} className="dashboard-card">
                <h4>{project.title}</h4>
                <p>{project.description.substring(0, 100)}...</p>
                <div className="card-footer">
                  <Link to={`/projects/${project._id}`}>View Details</Link>
                  <span>{project.applications?.length || 0} applications</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-section">
          <h3>My Applications</h3>
          <div className="applications-list">
            {applications.map(app => (
              <div key={app._id} className="dashboard-card">
                <h4>{app.project.title}</h4>
                <p>Status: <span className={`status-${app.status}`}>{app.status}</span></p>
                <div className="card-footer">
                  <Link to={`/projects/${app.project._id}`}>View Project</Link>
                  <span>{new Date(app.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
