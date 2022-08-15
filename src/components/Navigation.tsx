import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useUpdateAtom } from 'jotai/utils';
import { authenticated, userAtom } from '../lib/store';
import { Link } from 'react-router-dom';
import { User } from '../react-app-env';

type NavigationProps = {
  user: User;
};
const Navigation: React.FC<NavigationProps> = ({ user }) => {
  const authenticate = useUpdateAtom(authenticated);
  const setUser = useUpdateAtom(userAtom);
  return (
    <Navbar bg="light" expand="lg" className="mb-3">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Dashboard Test App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/company">
              Companies
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <NavDropdown title={user.name} id="basic-nav-dropdown">
            <NavDropdown.Item
              onClick={() => {
                authenticate(false);
                setUser(null);
              }}
            >
              Logout
            </NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Navigation;
