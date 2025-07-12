import React, { useEffect, useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import API from '../services/api';

function SwapRequestForm({ onSuccess }) {
  const [users, setUsers] = useState([]);
  const [mySkills, setMySkills] = useState([]);
  const [form, setForm] = useState({ receiver: '', offeredSkill: '', requestedSkill: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch all users for receiver dropdown
  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await API.get('/admin/users');
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchUsers();
  }, []);

  // Fetch my profile skills
  useEffect(() => {
    async function fetchMyProfile() {
      try {
        const res = await API.get('/users/me');
        setMySkills(res.data.skillsOffered || []);
      } catch (err) {
        console.error(err);
      }
    }
    fetchMyProfile();
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await API.post('/swaps', form);
      setLoading(false);
      onSuccess && onSuccess();
    } catch {
      setLoading(false);
      setError('Failed to create swap request');
    }
  };

  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="receiver">
          <Form.Label>Select User to Swap With</Form.Label>
          <Form.Select name="receiver" value={form.receiver} onChange={handleChange} required>
            <option value="">Choose a user</option>
            {users.map(user => (
              <option key={user._id} value={user._id}>{user.name}</option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="offeredSkill">
          <Form.Label>Your Offered Skill</Form.Label>
          <Form.Select name="offeredSkill" value={form.offeredSkill} onChange={handleChange} required>
            <option value="">Select your skill</option>
            {mySkills.map(skill => (
              <option key={skill} value={skill}>{skill}</option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="requestedSkill">
          <Form.Label>Skill You Want</Form.Label>
          <Form.Control type="text" name="requestedSkill" value={form.requestedSkill} onChange={handleChange} required />
        </Form.Group>
        <Button type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Send Swap Request'}
        </Button>
      </Form>
    </>
  );
}

export default SwapRequestForm;
