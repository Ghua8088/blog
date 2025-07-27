import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaGithub, FaLinkedin, FaCode, FaBlog, FaUser } from 'react-icons/fa';

export default function About() {
    return (
        <Container className="mt-5 text-light">
            <Row className="justify-content-center">
                <Col lg={10}>
                    {/* Header Section */}
                    <div className="text-center mb-5">
                        <h1 className="display-4 fw-bold mb-3 Lobsterfont">About This Blog</h1>
                        <p className="lead text-white">Welcome to my digital space where I share thoughts, projects, and experiences</p>
                    </div>

                    {/* Main Content */}
                    <Row className="mb-5">
                        <Col md={6} className="mb-4">
                            <Card bg="dark" text="light" className="h-100 border-secondary">
                                <Card.Body>
                                    <div className="text-center mb-3">
                                        <FaUser className="display-4 text-warning mb-3" />
                                        <h3 className="fw-bold">About Ghua8088</h3>
                                    </div>
                                    <p className="mb-3">
                                        Hi there! I'm Ghua8088, a passionate developer and tech enthusiast. 
                                        I love exploring new technologies, building projects, and sharing 
                                        my knowledge with the community.
                                    </p>
                                    <p>
                                        This blog serves as my personal platform to document my journey, 
                                        share insights, and showcase the projects I'm working on. 
                                        Whether you're here for technical content, project showcases, 
                                        or just to learn more about my work, I'm glad you stopped by!
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md={6} className="mb-4">
                            <Card bg="dark" text="light" className="h-100 border-secondary">
                                <Card.Body>
                                    <div className="text-center mb-3">
                                        <FaBlog className="display-4 text-warning mb-3" />
                                        <h3 className="fw-bold">What You'll Find Here</h3>
                                    </div>
                                    <ul className="list-unstyled">
                                        <li className="mb-2">
                                            <span className="text-warning"> </span> Technical blog posts about programming and development
                                        </li>
                                        <li className="mb-2">
                                            <span className="text-warning"> </span> Project showcases and case studies
                                        </li>
                                        <li className="mb-2">
                                            <span className="text-warning"> </span> Tips, tricks, and best practices
                                        </li>
                                        <li className="mb-2">
                                            <span className="text-warning"> </span> Tutorials and how-to guides
                                        </li>
                                        <li className="mb-2">
                                            <span className="text-warning"> </span> Learning resources and recommendations
                                        </li>
                                    </ul>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    {/* Mission Statement */}
                    <Card bg="dark" text="light" className="mb-5 border-warning">
                        <Card.Body className="text-center">
                            <FaCode className="display-4 text-warning mb-3" />
                            <h3 className="fw-bold mb-3">My Mission</h3>
                            <p className="lead mb-0">
                                To create valuable content that helps others learn, grow, and succeed in their 
                                development journey. I believe in the power of sharing knowledge and building 
                                a supportive tech community.
                            </p>
                        </Card.Body>
                    </Card>

                    {/* Contact & Links */}
                    <Row>
                        <Col md={6} className="mb-4">
                            <Card bg="dark" text="light" className="h-100 border-secondary">
                                <Card.Body>
                                    <h4 className="fw-bold mb-3">Get In Touch</h4>
                                    <p className="mb-3">
                                        I'm always open to discussions about technology, collaboration opportunities, 
                                        or just a friendly chat about coding and development.
                                    </p>
                                    <div className="d-flex gap-3">
                                        <a 
                                            href="https://github.com/ghua8088" 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="btn btn-outline-warning"
                                        >
                                            <FaGithub className="me-2" />
                                            GitHub
                                        </a>
                                        <a 
                                            href="https://linkedin.com/in/ghua8088" 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="btn btn-outline-warning"
                                        >
                                            <FaLinkedin className="me-2" />
                                            LinkedIn
                                        </a>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md={6} className="mb-4">
                            <Card bg="dark" text="light" className="h-100 border-secondary">
                                <Card.Body>
                                    <h4 className="fw-bold mb-3">Stay Updated</h4>
                                    <p className="mb-3">
                                        New content is regularly added to this blog. Feel free to explore the 
                                        blog posts and projects sections to see what I've been working on.
                                    </p>
                                    <div className="d-grid gap-2">
                                        <a href="/blogs" className="btn btn-warning">
                                            <FaBlog className="me-2" />
                                            Browse Blog Posts
                                        </a>
                                        <a href="/" className="btn btn-outline-warning">
                                            <FaCode className="me-2" />
                                            View Projects
                                        </a>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    {/* Footer Note */}
                    <div className="text-center mt-5 pt-4 border-top border-secondary">
                        <p className="text-white mb-0">
                            Built with    using React and modern web technologies
                        </p>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}