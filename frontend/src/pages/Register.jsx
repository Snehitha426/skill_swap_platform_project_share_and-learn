import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [form, setForm] = useState({ name: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await API.post('/users/register', form);
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch {
      setError('Registration failed');
    }
  };

  return (
    <Container className="py-5" style={{ maxWidth: '400px' }}>
      <h2>Register</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="registerName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="registerPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button type="submit" variant="primary">Register</Button>
      </Form>
    </Container>
  );
}

export default Register;
