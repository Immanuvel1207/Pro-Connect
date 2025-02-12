import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/projects/all").then(({ data }) => setProjects(data));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Project Listings</h2>
      <Link to="/add-project" className="btn btn-success mb-3">➕ Add Project</Link>
      <div className="row">
        {projects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
