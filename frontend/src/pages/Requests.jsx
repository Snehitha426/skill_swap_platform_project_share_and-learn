import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Spinner, Alert } from 'react-bootstrap';
import API from '../services/api';
import { useAuth } from '../contexts/AuthContext';

function Requests() {
  const [swaps, setSwaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchSwaps = async () => {
    try {
      const res = await API.get('/swaps/my-swaps');
      setSwaps(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await API.put(`/swaps/${id}`, { status });
      fetchSwaps();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  useEffect(() => {
    fetchSwaps();
  }, []);

  if (loading) return (
    <Container className="py-5 text-center">
      <Spinner animation="border" />
    </Container>
  );

  return (
    <Container className="py-5">
      <h2>Your Swap Requests</h2>
      {swaps.length === 0 ? (
        <Alert variant="info">No swap requests found.</Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Sender</th>
              <th>Receiver</th>
              <th>Offered Skill</th>
              <th>Requested Skill</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {swaps.map(({ _id, sender, receiver, offeredSkill, requestedSkill, status }) => (
              <tr key={_id}>
                <td>{sender?.name || 'Unknown'}</td>
                <td>{receiver?.name || 'Unknown'}</td>
                <td>{offeredSkill}</td>
                <td>{requestedSkill}</td>
                <td>
                  <span className={`badge bg-${status === 'accepted' ? 'success' : status === 'rejected' ? 'danger' : 'secondary'}`}>
                    {status}
                  </span>
                </td>
                <td>
                  {status === 'pending' && receiver?._id === user?._id && (
                    <>
                      <Button variant="success" size="sm" className="me-2" onClick={() => handleUpdateStatus(_id, 'accepted')}>
                        Accept
                      </Button>
                      <Button variant="danger" size="sm" onClick={() => handleUpdateStatus(_id, 'rejected')}>
                        Reject
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default Requests;
