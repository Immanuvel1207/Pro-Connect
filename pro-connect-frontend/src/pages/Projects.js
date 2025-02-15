import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Projects.css';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/projects');
      setProjects(res.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="projects-container" >
      <h2>Projects</h2>
      <input
        type="text"
        placeholder="Search Projects"
        style={{ backgroundColor: '#fff', color: '#333', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <div className="project-list" style={{margin: '20px'}}>
        {filteredProjects.map(project => (
          <div key={project._id} className="project-card">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <Link to={`/projects/${project._id}`} className="view-project">View Project</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;