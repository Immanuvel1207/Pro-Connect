import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProject = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    githubLink: "",
    requiredSkills: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.post("http://localhost:5000/api/projects/create", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Project Added Successfully!");
      navigate("/dashboard"); // Redirect to dashboard
    } catch (error) {
      console.error("Project creation failed:", error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add New Project</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" className="form-control mb-3" placeholder="Project Title" onChange={handleChange} required />
        <textarea name="description" className="form-control mb-3" placeholder="Project Description" onChange={handleChange} required />
        <input type="text" name="githubLink" className="form-control mb-3" placeholder="GitHub Repository Link" onChange={handleChange} required />
        <input type="text" name="requiredSkills" className="form-control mb-3" placeholder="Required Skills (comma-separated)" onChange={handleChange} required />
        <button type="submit" className="btn btn-primary">Add Project</button>
      </form>
    </div>
  );
};

export default AddProject;
