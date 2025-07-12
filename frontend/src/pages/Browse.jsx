import React, { useEffect, useState } from 'react';
import { Container, Card, Row, Col, Spinner, Button, Modal, Form, Alert } from 'react-bootstrap';
import API from '../services/api';

function Browse() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [offeredSkill, setOfferedSkill] = useState('');
  const [requestedSkill, setRequestedSkill] = useState('');
  const [message, setMessage] = useState('');
  
  // Get logged-in user id from localStorage or context
  const currentUserId = localStorage.getItem('userId'); 

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await API.get('/users');
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  // Open modal to send swap request to a specific user
  const openRequestModal = (user) => {
    setSelectedUser(user);
    setOfferedSkill('');
    setRequestedSkill('');
    setMessage('');
    setShowRequestModal(true);
  };

  const closeRequestModal = () => {
    setShowRequestModal(false);
    setSelectedUser(null);
  };

  // Handle submitting the swap request
  const handleSubmitRequest = async (e) => {
    e.preventDefault();
    if (!offeredSkill.trim() || !requestedSkill.trim()) {
      setMessage('Please enter both offered and requested skills.');
      return;
    }
    setMessage('');

    try {
      await API.post('/swaps', {
        receiver: selectedUser._id,
        offeredSkill: offeredSkill.trim(),
        requestedSkill: requestedSkill.trim(),
      });
      setMessage('Swap request sent successfully!');
      
      // Optionally close modal after short delay
      setTimeout(() => {
        closeRequestModal();
      }, 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to send swap request.');
    }
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h2>Browse Candidates</h2>
      <Row xs={1} md={3} className="g-4 mt-3">
        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          users.map(user => (
            <Col key={user._id}>
              <Card>
                <Card.Body>
                  <Card.Title>{user.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{user.location || 'Location not specified'}</Card.Subtitle>
                  <Card.Text>
                    <strong>Availability:</strong> {user.availability || 'Not specified'}<br />
                    <strong>Skills Offered:</strong> {user.skillsOffered && user.skillsOffered.length > 0 ? user.skillsOffered.join(', ') : 'None'}
                  </Card.Text>
                  {/* Show request button only if it's not the current user */}
                  {user._id !== currentUserId && (
                    <Button variant="primary" onClick={() => openRequestModal(user)}>
                      Request Swap
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>

      {/* Modal for sending swap request */}
      <Modal show={showRequestModal} onHide={closeRequestModal}>
        <Modal.Header closeButton>
          <Modal.Title>Request Skill Swap with {selectedUser?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {message && <Alert variant={message.includes('successfully') ? 'success' : 'danger'}>{message}</Alert>}
          <Form onSubmit={handleSubmitRequest}>
            <Form.Group className="mb-3" controlId="offeredSkill">
              <Form.Label>Your Offered Skill</Form.Label>
              <Form.Control
                type="text"
                value={offeredSkill}
                onChange={(e) => setOfferedSkill(e.target.value)}
                placeholder="Skill you offer"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="requestedSkill">
              <Form.Label>Requested Skill</Form.Label>
              <Form.Control
                type="text"
                value={requestedSkill}
                onChange={(e) => setRequestedSkill(e.target.value)}
                placeholder={`Skill you want from ${selectedUser?.name}`}
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary" disabled={!offeredSkill || !requestedSkill}>
              Send Request
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default Browse;
