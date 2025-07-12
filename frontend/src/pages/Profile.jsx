import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Alert, Badge } from 'react-bootstrap';
import API from '../services/api';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ name: '', location: '', availability: '', skillsOffered: [] });
  const [newSkill, setNewSkill] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await API.get('/users/me');
        setProfile(res.data);
        setForm({
          name: res.data.name || '',
          location: res.data.location || '',
          availability: res.data.availability || '',
          skillsOffered: res.data.skillsOffered || [],
        });
      } catch (err) {
        console.error(err);
      }
    }
    fetchProfile();
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  // Add a skill to skillsOffered
  const addSkill = () => {
    if (newSkill.trim() && !form.skillsOffered.includes(newSkill.trim())) {
      setForm({ ...form, skillsOffered: [...form.skillsOffered, newSkill.trim()] });
      setNewSkill('');
    }
  };

  // Remove a skill from skillsOffered
  const removeSkill = (skill) => {
    setForm({
      ...form,
      skillsOffered: form.skillsOffered.filter(s => s !== skill),
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await API.put('/users/me', form);
      setProfile(res.data);
      setMessage('Profile updated successfully!');
    } catch (err) {
      setMessage('Error updating profile');
    }
  };

  if (!profile) return <Container className="py-5">Loading...</Container>;

  return (
    <Container className="py-5" style={{ maxWidth: '600px' }}>
      <h2>Your Profile</h2>
      {message && <Alert variant="info">{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        {/* Existing fields */}
        <Form.Group className="mb-3" controlId="profileName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name="name" value={form.name} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="profileLocation">
          <Form.Label>Location</Form.Label>
          <Form.Control type="text" name="location" value={form.location} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="profileAvailability">
          <Form.Label>Availability</Form.Label>
          <Form.Control type="text" name="availability" value={form.availability} onChange={handleChange} />
        </Form.Group>

        {/* New skills input */}
        <Form.Group className="mb-3">
          <Form.Label>Skills Offered</Form.Label>
          <div className="mb-2">
            {form.skillsOffered.map(skill => (
              <Badge key={skill} bg="primary" className="me-2" style={{ cursor: 'pointer' }} onClick={() => removeSkill(skill)}>
                {skill} &times;
              </Badge>
            ))}
          </div>
          <Form.Control
            type="text"
            placeholder="Add a skill and press Add"
            value={newSkill}
            onChange={e => setNewSkill(e.target.value)}
          />
          <Button variant="secondary" className="mt-2" onClick={addSkill} type="button">
            Add Skill
          </Button>
        </Form.Group>

        <Button type="submit" variant="primary">Update Profile</Button>
      </Form>
    </Container>
  );
}

export default Profile;
