import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import './ProjectDetails.css';

function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [comment, setComment] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchProject();
  }, [id]);

/**
 * Fetches project details from the API using the project ID from the URL parameters.
 * Sets the fetched project data to the state.
 * Logs an error message to the console if the request fails.
 */

  const fetchProject = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/projects/${id}`);
      setProject(res.data);
    } catch (error) {
      console.error('Error fetching project:', error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/api/projects/${id}/comments`, { text: comment });
      setComment('');
      fetchProject();
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div className="project-details">
      <h2>{project.title}</h2>
      <p>{project.description}</p>
      <h3>Skills Required:</h3>
      <ul>
        {project.skillsRequired.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
      <h3>Comments:</h3>
      <ul className="comments-list">
  {project.comments.map((comment) => (
    <li key={comment._id}>
      <strong>{comment.user.name} ({user._id === comment.user._id ? 'You' : comment.user.name}):</strong> {comment.text}
    </li>
  ))}
</ul>
      {user && (
        <form onSubmit={handleCommentSubmit} className="comment-form">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            required
          ></textarea>
          <button type="submit">Post Comment</button>
        </form>
      )}
    </div>
  );
}

export default ProjectDetails;