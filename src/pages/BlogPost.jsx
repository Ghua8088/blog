import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import blogData from '../data/blogData.json';

// Component to render different content sections
const RenderSection = ({ section }) => {
  switch (section.type) {
    case 'paragraph':
      return <p className="blog-text">{section.content}</p>;
    
    case 'heading':
      const HeadingTag = `h${section.level || 2}`;
      return <HeadingTag className="blog-text">{section.content}</HeadingTag>;
    
    case 'list':
      // Handle both array format (from JSON) and string format (from BlogManager)
      let items = [];
      if (Array.isArray(section.items)) {
        items = section.items;
      } else if (typeof section.content === 'string') {
        items = section.content.split('\n').filter(item => item.trim());
      }
      
      return (
        <ul className="blog-text" style={{ marginLeft: '20px', marginBottom: '20px' }}>
          {items.map((item, index) => (
            <li key={index} style={{ marginBottom: '8px' }}>{item}</li>
          ))}
        </ul>
      );
    
    case 'code':
      return (
        <pre className="blog-text">
          <code>{section.content}</code>
        </pre>
      );
    
    default:
      return null;
  }
};

export default function BlogPost() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundBlog = blogData.find(b => b.id === id);
    if (foundBlog) {
      setBlog(foundBlog);
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="container mt-4 text-light">
        <div className="blog-content">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="container mt-4 text-light">
        <div className="blog-content">
          <h1 className="blog-title">Blog Not Found</h1>
          <p className="blog-text">The blog post you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  let thumbnailSrc = null;
  if (blog.thumbnail) {
    try {
      thumbnailSrc = require(`../assets/thumbnails/${blog.thumbnail}`);
    } catch {
      try {
        thumbnailSrc = require('../assets/thumbnails/default.png');
      } catch {
        thumbnailSrc = null;
      }
    }
  }

  return (
    <div className="container mt-4 text-light">
      {thumbnailSrc ? (
        <img
          src={thumbnailSrc}
          alt="thumbnail"
          className="blog-card-img"
          style={{
            maxHeight: '300px',
            width: '100%',
            objectFit: 'cover',
            borderRadius: '12px',
            marginBottom: '1rem',
          }}
        />
      ) : (
        <div
          className="blog-card-img"
          style={{
            height: '200px',
            background: '#222',
            borderRadius: '12px',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#888',
          }}
        >
          No image
        </div>
      )}
      
      <div className="blog-content">
        <h1 className="blog-title">{blog.title}</h1>
        <div className="blog-meta">
          <span>Published on {blog.date}</span>
        </div>
        
        <div className="blog-text">
          {blog.content.sections.map((section, index) => (
            <RenderSection key={index} section={section} />
          ))}
        </div>
      </div>
    </div>
  );
}
