import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get("http://localhost:5000/api/auth/profile", { headers: { Authorization: `Bearer ${token}` } })
      .then(({ data }) => setUser(data));
  }, []);

  return (
    <div className="container">
      {user ? (
        <>
          <h2>{user.name}'s Profile</h2>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>GitHub:</strong> {user.githubID}</p>
          <p><strong>Skills:</strong> {user.skills.join(", ")}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
