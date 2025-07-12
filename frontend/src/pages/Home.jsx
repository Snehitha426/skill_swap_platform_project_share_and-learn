import React from 'react';
import { Container, Button } from 'react-bootstrap';

function Home() {
  return (
    <Container className="py-5">
      <div className="bg-light p-5 rounded">
        <h1>Welcome to Skill Swap Platform</h1>
        <p className="lead">
          Swap skills, connect with others, and grow your knowledge.
        </p>
        <Button variant="primary" href="/browse">Browse Skills</Button>
      </div>
    </Container>
  );
}

export default Home;
