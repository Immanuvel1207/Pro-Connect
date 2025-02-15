import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";

const Home = () => {
  return (
    <div className="home-page">
      <div className="hero-section text-center py-5 bg-primary text-white">
        <Container>
          <h1 className="display-4 mb-4">Welcome to Pro-Connect</h1>
          <p className="lead mb-4">
            Connect with fellow developers, share projects, and collaborate globally!
          </p>
          <div className="cta-buttons">
            <Link to="/register" className="btn btn-light btn-lg mx-2">
              Get Started
            </Link>
            <Link to="/login" className="btn btn-outline-light btn-lg mx-2">
              Sign In
            </Link>
          </div>
        </Container>
      </div>

      <Container className="py-5">
        <Row className="features-section text-center">
          <Col md={4} className="mb-4">
            <div className="feature-card p-4">
              <i className="fas fa-project-diagram fa-3x mb-3"></i>
              <h3>Share Projects</h3>
              <p>Showcase your projects and get feedback from the community</p>
            </div>
          </Col>
          <Col md={4} className="mb-4">
            <div className="feature-card p-4">
              <i className="fas fa-users fa-3x mb-3"></i>
              <h3>Find Collaborators</h3>
              <p>Connect with developers who match your project needs</p>
            </div>
          </Col>
          <Col md={4} className="mb-4">
            <div className="feature-card p-4">
              <i className="fas fa-comments fa-3x mb-3"></i>
              <h3>Real-time Chat</h3>
              <p>Communicate with potential collaborators instantly</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;