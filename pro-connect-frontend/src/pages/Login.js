import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // ✅ Use useNavigate instead of useHistory

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();  // ✅ Correct Hook

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      navigate("/dashboard");  // ✅ Use navigate instead of history.push
    } catch (error) {
      console.error("Login failed:", error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" className="form-control mb-3" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" className="form-control mb-3" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default Login;
