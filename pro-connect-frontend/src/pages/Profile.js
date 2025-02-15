import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({});

  useEffect(() => {
    fetchUserData();
    fetchUserProjects();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users/profile', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await response.json();
      setUser(data);
      setEditedUser(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchUserProjects = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/projects/user', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching user projects:', error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(editedUser)
      });
      const data = await response.json();
      setUser(data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  if (!user) return <div>Loading...</div>;

  return (
    <Container className="mt-4">
      <Row>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>{user.name}</Card.Title>
              {isEditing ? (
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={editedUser.name}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={editedUser.email}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Skills</Form.Label>
                    <Form.Control
                      type="text"
                      name="skills"
                      value={editedUser.skills.join(', ')}
                      onChange={(e) => setEditedUser({ ...editedUser, skills: e.target.value.split(', ') })}
                    />
                  </Form.Group>
                  <Button variant="primary" onClick={handleSave}>Save</Button>
                </Form>
              ) : (
                <>
                  <Card.Text>Email: {user.email}</Card.Text>
                  <Card.Text>GitHub: {user.githubID}</Card.Text>
                  <Card.Text>Skills: {user.skills.join(', ')}</Card.Text>
                  <Card.Text>College: {user.college}</Card.Text>
                  <Button variant="primary" onClick={handleEdit}>Edit Profile</Button>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <h2>My Projects</h2>
          <Row>
            {projects.map(project => (
              <Col md={6} key={project._id}>
                <ProjectCard project={project} />
              </Col>
            ))}
          </Row>
          <Link to="/add-project" className="btn btn-success mt-3">Add New Project</Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;