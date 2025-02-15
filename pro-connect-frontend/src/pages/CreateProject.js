import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CreateProject.css';

function CreateProject() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [githubLink, setGithubLink] = useState('');
  const [requiredSkills, setRequiredSkills] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/projects', {
        title,
        description,
        githubLink,
        requiredSkills: requiredSkills.split(',').map(skill => skill.trim())
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      navigate('/projects');
    } catch (error) {
      setError('Failed to create project');
    }
  };

  return (
    <div className="create-project container">
      <h2>Create New Project</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Project Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="url"
          placeholder="GitHub Repository Link"
          value={githubLink}
          onChange={(e) => setGithubLink(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Required Skills (comma-separated)"
          value={requiredSkills}
          defaultValue={"None"}
          onChange={(e) => setRequiredSkills(e.target.value)}
        />
        <button type="submit">Create Project</button>
      </form>
    </div>
  );
}

export default CreateProject;
