// src/pages/Browse.jsx

import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import API from '../services/api';
import SkillCard from '../components/SkillCard';

function Browse() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSkills() {
      try {
        const res = await API.get('/skills');
        setSkills(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchSkills();
  }, []);

  if (loading)
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" />
      </Container>
    );

  return (
    <Container className="py-5">
      <h2>Available Skills</h2>
      <Row xs={1} md={3} className="g-4 mt-3">
        {skills.map(skill => (
          <Col key={skill._id}>
            <SkillCard skill={skill} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Browse;
