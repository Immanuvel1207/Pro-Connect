import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserProfile() {
  const [user, setUser] = useState({});
  const [userProjects, setUserProjects] = useState([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/user');
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
    fetchUserProfile();
  }, []);

  useEffect(() => {
    const fetchUserProjects = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${user._id}/projects`);
        setUserProjects(response.data);
      } catch (error) {
        console.error('Error fetching user projects:', error);
      }
    };
    if (user._id) {
      fetchUserProjects();
    }
  }, [user._id]);

  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Username: {user.username}</p>
      <h2>My Projects</h2>
      <ul>
        {userProjects.map((project) => (
          <li key={project._id}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserProfile;