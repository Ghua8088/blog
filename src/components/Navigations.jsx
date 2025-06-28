import React from 'react';
import { Navbar, Container, Nav, NavbarToggle, NavbarCollapse } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Navigations() {
  return (
    <Navbar expand="lg" className="cool-navbar py-2">
      <Container className="fw-bold mb-2">
        <Navbar.Brand as={Link} to="/" className="brand-glow">
          <span className="display-5 Lobsterfont">Raghuraamm</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto nav-underline">
            <Nav.Link as={Link} to="/" className="nav-link-underline">Home</Nav.Link>
            <Nav.Link as={Link} to="/blogs" className="nav-link-underline">Blog</Nav.Link>
            <Nav.Link as={Link} to="/contact" className="nav-link-underline">Contact</Nav.Link>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
