import React, { useState } from 'react';
import blogData from '../data/blogData.json';
import { Card, Button, Container, Form, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { thumbnails } from '../utils/ThumbnailLoader';
import { FaSearch, FaTimes } from 'react-icons/fa';
import Masonry from 'react-masonry-css';

export default function Blogs() {
  const [query, setQuery] = useState('');
  const filteredPosts = blogData.filter((post) => {
    const title = post.title || '';
    const description = post.description || '';
    return (
      title.toLowerCase().includes(query.toLowerCase()) ||
      description.toLowerCase().includes(query.toLowerCase())
    );
  });

  let defaultThumbnail;
  try {
    defaultThumbnail = require('../assets/thumbnails/default.png');
  } catch {
    defaultThumbnail = '';
  }

  // Masonry breakpoints
  const breakpointColumns = {
    default: 3,
    1100: 2,
    700: 1
  };

  return (
    <Container className="mt-4">
      <h2 className="display-4 fw-bold mb-4 Lobsterfont">Blog Posts</h2>

      {/* 🔍 Modern Search Input */}
      <Form className="mb-4">
        <InputGroup className="search-bar-group">
          <InputGroup.Text className="search-icon-bg">
            <FaSearch className="search-icon" />
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Search blog posts..."
            value={query}
            
            onChange={(e) => setQuery(e.target.value)}
            className="search-bar-input bg-dark text-light border-secondary"
            autoComplete="off"
          />
          {query && (
            <Button
              variant="outline-secondary"
              className="clear-btn"
              onClick={() => setQuery('')}
              tabIndex={0}
            >
              <FaTimes />
            </Button>
          )}
        </InputGroup>
      </Form>

      {filteredPosts.length === 0 ? (
        <div className="text-center text-muted py-5">
          <h4>No results found</h4>
          <p>Try a different search term.</p>
        </div>
      ) : (
        <Masonry
          breakpointCols={breakpointColumns}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {filteredPosts.map((post) => (
            <Card bg="dark" text="light" key={post.id} className="blog-card mb-4">
              <Card.Img
                variant="top"
                src={post.thumbnail && thumbnails[post.thumbnail] ? thumbnails[post.thumbnail] : defaultThumbnail}
                alt={post.title || 'Blog thumbnail'}
                className="blog-card-img"
              />
              <Card.Body>
                <Card.Title>{post.title || 'Untitled'}</Card.Title>
                <Card.Text>{post.description || 'No description available.'}</Card.Text>
                <Button as={Link} to={`/blog/${post.id}`} variant="warning" className="blog-card-btn">
                  Read More
                </Button>
              </Card.Body>
              <Card.Footer className="text-light small">{post.date || ''}</Card.Footer>
            </Card>
          ))}
        </Masonry>
      )}
    </Container>
  );
}
