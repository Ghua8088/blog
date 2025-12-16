import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import projects from '../data/projectData.json';
import blogData from '../data/blogData.json';
import { thumbnails } from '../utils/ThumbnailLoader';
import Masonry from 'react-masonry-css';
import { Link } from 'react-router-dom';

export default function Home() {
  // Get the latest 3 blogs
  const latestBlogs = blogData.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3);
  return (
    <Container className="pt-5 text-light">
      <h2 className="display-4 fw-bold mb-4 Lobsterfont">Home</h2>
      <header className="text-center mb-5">
        <p className="lead">Machine Learning Engineer | Middle-end | Aspiring Data Scientist</p>
      </header>

      {/* Latest Blogs Section */}
      <section className="mb-5">
        <h2 className="mb-4 Lobsterfont">Latest Blogs</h2>
        <Row>
          {latestBlogs.map((blog) => (
            <Col md={4} key={blog.id} className="mb-4">
              <Card bg="dark" text="light" className="h-100 blog-card">
                <Card.Img
                  variant="top"
                  src={blog.thumbnail && thumbnails[blog.thumbnail] ? thumbnails[blog.thumbnail] : thumbnails['default.png']}
                  alt={blog.title}
                  className="blog-card-img"
                  style={{
                    height: '200px',
                    objectFit: 'contain',
                    backgroundColor: '#222'
                  }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="mb-2">{blog.title}</Card.Title>
                  <Card.Text className="flex-grow-1" style={{ fontSize: '0.9rem' }}>
                    {blog.description}
                  </Card.Text>
                  <div className="mt-auto">
                    <Button as={Link} to={`/blog/${blog.id}`} variant="warning" className="w-100">
                      Read More ↗
                    </Button>
                  </div>
                </Card.Body>
                <Card.Footer className="text-light small">
                  {blog.date}
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
        <div className="text-center mt-4">
          <Button as={Link} to="/blogs" variant="outline-light" className="px-4">
            View All Blogs
          </Button>
        </div>
      </section>

      <section className="mb-5">
        <h2 className="mb-4 Lobsterfont">Top Projects</h2>
        {/* Masonry layout for projects */}
        <Masonry
          breakpointCols={{ default: 3, 1200: 3, 900: 2, 600: 1 }}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {projects.map((project) => (
            <Card key={project.id} bg="dark" text="light" className="project-tile shadow-sm border-secondary mb-4">
              <Card.Img
                variant="top"
                src={thumbnails[project.thumbnail] || thumbnails['default.png']}
                alt={project.title}
                className="project-img"
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'cover',
                  borderTopLeftRadius: '20px',
                  borderTopRightRadius: '20px',
                  background: '#222',
                }}
              />
              <Card.Body>
                <Card.Title>{project.title}</Card.Title>
                <Card.Text style={{ fontSize: '0.9rem' }}>{project.description}</Card.Text>
                <Button
                  href={project.url}
                  target="_blank"
                  variant="warning"
                  className="w-100"
                  style={{textAlign:"left"}}
                >
                  View Project ↗
                </Button>
              </Card.Body>
            </Card>
          ))}
        </Masonry>
      </section>
    </Container>
  );
}
