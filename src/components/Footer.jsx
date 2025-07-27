import { Container, Row, Col } from 'react-bootstrap';
export default function Footer() {
  return (
    <footer className="bg-dark text-light mt-5 py-4">
      <Container>
        <Row>
          <Col md={6}>
            <p className="mb-0">© 2025 All rights reserved.</p>
          </Col>
          <Col md={6} className="text-md-end mt-3 mt-md-0">
            <a href="/blog#/about" className="text-light text-decoration-none me-3">About</a>
            <a href="/blog#/contact" className="text-light text-decoration-none me-3">Contact</a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}