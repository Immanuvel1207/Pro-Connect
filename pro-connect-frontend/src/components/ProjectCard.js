import React from "react";
import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {
  return (
    <div className="col-md-4">
      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">{project.title}</h5>
          <p className="card-text">{project.description.substring(0, 100)}...</p>
          <Link to={`/projects/${project._id}`} className="btn btn-primary">View Details</Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
