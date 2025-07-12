import React from 'react';
import { Card } from 'react-bootstrap';

function SkillCard({ skill }) {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Body>
        <Card.Title>{skill.name}</Card.Title>
        <Card.Text>{skill.description || 'No description provided.'}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">
        Offered by: {skill.createdBy?.name || 'Unknown'}
      </Card.Footer>
    </Card>
  );
}

export default SkillCard;
