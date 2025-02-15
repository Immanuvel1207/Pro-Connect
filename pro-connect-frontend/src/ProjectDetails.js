import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Comments from "../components/Comments";
import "./ProjectDetails.css";

function ProjectDetails() {
  const [project, setProject] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchProject();
  }, [id]);

  const fetchProject = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/projects/${id}`);
      setProject(response.data);
    } catch (error) {
      console.error("Error fetching project:", error);
    }
  };

  if (!project) return <div>Loading...</div>;

  return (
    <div className="project-details container">
      <div className="project-header">
        <h1>{project.title}</h1>
        <div className="project-meta">
          <span>Posted by: {project.postedBy.name}</span>
          <span>Posted on: {new Date(project.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="project-content">
        <div className="project-info">
          <h3>Description</h3>
          <p>{project.description}</p>

          <h3>Required Skills</h3>
          <div className="skills-list">
            {project.requiredSkills.map((skill, index) => (
              <span key={index} className="skill-tag">{skill}</span>
            ))}
          </div>

          <h3>GitHub Repository</h3>
          <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="github-link">
            {project.githubLink}
          </a>
        </div>

        <div className="project-discussion">
          <Comments projectId={id} />
        </div>
      </div>
    </div>
  );
}

export default ProjectDetails;