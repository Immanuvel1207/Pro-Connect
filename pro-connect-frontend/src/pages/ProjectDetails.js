import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const ProjectDetails = () => {
  const [project, setProject] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchProjectDetails();
  }, [id]);

  const fetchProjectDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/projects/${id}`);
      const data = await response.json();
      setProject(data);
    } catch (error) {
      console.error('Error fetching project details:', error);
    }
  };

  if (!project) return <div>Loading...</div>;

  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <Card.Title>{project.title}</Card.Title>
          <Card.Text>{project.description}</Card.Text>
          <Card.Text>
            <strong>Required Skills:</strong> {project.requiredSkills.join(', ')}
          </Card.Text>
          <Card.Text>
            <strong>GitHub Link:</strong>{' '}
            <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
              {project.githubLink}
            </a>
          </Card.Text>
          <Card.Text>
            <strong>Posted By:</strong>{' '}
            <Link to={`/user/${project.postedBy._id}`}>{project.postedBy.name}</Link>
          </Card.Text>
          <Button
            as={Link}
            to={`/messages?userId=${project.postedBy._id}`}
            variant="primary"
          >
            Contact Project Owner
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProjectDetails;