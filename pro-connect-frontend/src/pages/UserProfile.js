import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import ProjectCard from '../components/ProjectCard';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchUserData();
    fetchUserProjects();
  }, [id]);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/profile/${id}`);
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchUserProjects = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/projects/user/${id}`);
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching user projects:', error);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <Container className="mt-4">
      <Row>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>{user.name}</Card.Title>
              <Card.Text>Email: {user.email}</Card.Text>
              <Card.Text>GitHub: {user.githubID}</Card.Text>
              <Card.Text>Skills: {user.skills.join(', ')}</Card.Text>
              <Card.Text>College: {user.college}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <h2>{user.name}'s Projects</h2>
          <Row>
            {projects.map(project => (
              <Col md={6} key={project._id}>
                <ProjectCard project={project} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;