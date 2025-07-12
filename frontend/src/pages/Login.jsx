import React, { useState, useContext } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

function Login() {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ name: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await API.post('/users/login', form);
      login(res.data.token);
      navigate('/');
    } catch {
      setError('Invalid credentials');
    }
  };

  return (
    <Container className="py-5" style={{ maxWidth: '400px' }}>
      <h2>Login</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="loginName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="loginPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button type="submit" variant="primary">Login</Button>
      </Form>
    </Container>
  );
}

export default Login;
