import React, { useContext } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

function NavigationBar() {
  const { token, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Navbar bg="light" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Skill Swap
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {token && (
              <>
                <Nav.Link as={Link} to="/browse">Browse</Nav.Link>
                <Nav.Link as={Link} to="/requests">Requests</Nav.Link>
                <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                <Nav.Link as={Link} to="/requests">Requests</Nav.Link>
                {user?.isAdmin && <Nav.Link as={Link} to="/admin">Admin</Nav.Link>}
              </>
            )}
          </Nav>
          <Nav>
            {!token ? (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            ) : (
              <Button variant="outline-danger" onClick={handleLogout}>
                Logout
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
