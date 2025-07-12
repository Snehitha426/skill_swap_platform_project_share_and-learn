import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Alert, Spinner } from 'react-bootstrap';
import API from '../services/api';

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStatsAndUsers() {
      try {
        const statsRes = await API.get('/admin/swap-stats');
        setStats(statsRes.data);
        const usersRes = await API.get('/users'); // You will need to add this route in backend adminRoutes with adminOnly middleware
        setUsers(usersRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchStatsAndUsers();
  }, []);

  const handleBanUser = async (userId) => {
    try {
      await API.put(`/admin/ban-user/${userId}`);
      setUsers(prev =>
        prev.map(user => (user._id === userId ? { ...user, isBanned: true } : user))
      );
      setMessage('User banned successfully');
    } catch (err) {
      setMessage('Error banning user');
    }
  };

  if (loading) return <Container className="py-5 text-center"><Spinner animation="border" /></Container>;

  return (
    <Container className="py-5">
      <h2>Admin Dashboard</h2>
      {message && <Alert variant="info">{message}</Alert>}

      <h4 className="mt-4">Swap Statistics</h4>
      <ul>
        <li>Total swaps: {stats?.totalSwaps}</li>
        <li>Pending swaps: {stats?.pending}</li>
        <li>Accepted swaps: {stats?.accepted}</li>
      </ul>

      <h4 className="mt-4">User Management</h4>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Is Admin</th>
              <th>Banned</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(({ _id, name, isAdmin, isBanned }) => (
              <tr key={_id}>
                <td>{name}</td>
                <td>{isAdmin ? 'Yes' : 'No'}</td>
                <td>{isBanned ? 'Yes' : 'No'}</td>
                <td>
                  {!isBanned && !isAdmin && (
                    <Button variant="danger" size="sm" onClick={() => handleBanUser(_id)}>
                      Ban User
                    </Button>
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

export default AdminDashboard;
