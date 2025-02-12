import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // ✅ Correct navigation method

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    githubID: "",
    skills: "",
    college: "",
  });

  const navigate = useNavigate();  // ✅ Replaces useHistory()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", formData);
      alert("Registration successful! Please login.");
      navigate("/login");  // ✅ Correct way to navigate in React Router v6
    } catch (error) {
      console.error("Registration failed:", error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input type="text" name="name" className="form-control mb-3" placeholder="Name" onChange={handleChange} required />
        <input type="email" name="email" className="form-control mb-3" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" className="form-control mb-3" placeholder="Password" onChange={handleChange} required />
        <input type="text" name="githubID" className="form-control mb-3" placeholder="GitHub ID" onChange={handleChange} required />
        <input type="text" name="skills" className="form-control mb-3" placeholder="Skills (comma-separated)" onChange={handleChange} required />
        <input type="text" name="college" className="form-control mb-3" placeholder="College Name" onChange={handleChange} required />
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
      <p className="mt-3">
        Already have an account? <a href="/login">Login here</a>
      </p>
    </div>
  );
};

export default Register;
