import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import API from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function AddSkill() {
  const [form, setForm] = useState({ name: '', description: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { token } = useAuth();
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!token) {
      setError('You must be logged in to add a skill');
      return;
    }

    try {
      await API.post('/skills', form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('Skill added successfully!');
      setForm({ name: '', description: '' });

      // Optional: Redirect back to Browse page after 2 sec
      setTimeout(() => {
        navigate('/browse');
      }, 2000);

    } catch (err) {
      console.error(err);
      setError('Failed to add skill');
    }
  };

  return (
    <Container className="py-5" style={{ maxWidth: '600px' }}>
      <h2>Add a New Skill</h2>
      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="skillName">
          <Form.Label>Skill Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="skillDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </Form.Group>

        <Button type="submit" variant="primary">
          Add Skill
        </Button>
      </Form>
    </Container>
  );
}

export default AddSkill;
