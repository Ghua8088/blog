import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import blogData from '../data/blogData.json';
import { createMediaFallback, extractYouTubeId, createYouTubeEmbedUrl } from '../utils/MediaLoader';

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
    
    case 'image':
      return (
        <div className="blog-image-container">
          <img 
            src={section.src} 
            alt={section.alt || 'Blog image'} 
            className="blog-image"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
          <div style={{ display: 'none' }}>
            {createMediaFallback('image', section.alt)}
          </div>
          {section.caption && (
            <p className="blog-image-caption">
              {section.caption}
            </p>
          )}
        </div>
      );
    
    case 'audio':
      return (
        <div className="blog-audio-container">
          <audio 
            controls 
            preload="metadata"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          >
            <source src={section.src} type={section.type || 'audio/mpeg'} />
            Your browser does not support the audio element.
          </audio>
          <div style={{ display: 'none' }}>
            {createMediaFallback('audio')}
          </div>
          {section.caption && (
            <p className="blog-audio-caption">
              {section.caption}
            </p>
          )}
        </div>
      );
    
    case 'link':
      return (
        <a 
          href={section.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="blog-link"
        >
          <div className="blog-link-title">
            {section.title || 'External Link'}
          </div>
          <div className="blog-link-url">
            {section.url}
          </div>
          {section.description && (
            <div className="blog-link-description">
              {section.description}
            </div>
          )}
        </a>
      );
    
    case 'youtube':
      const videoId = extractYouTubeId(section.url);
      if (!videoId) {
        return (
          <div className="blog-youtube-container">
            {createMediaFallback('youtube')}
          </div>
        );
      }
      
      const embedUrl = createYouTubeEmbedUrl(videoId, {
        autoplay: section.autoplay || 0,
        controls: section.controls !== undefined ? section.controls : 1,
        modestbranding: section.modestbranding !== undefined ? section.modestbranding : 1,
        rel: section.rel !== undefined ? section.rel : 0,
        start: section.start || 0,
        end: section.end || 0,
        mute: section.mute || 0
      });
      
      return (
        <div className="blog-youtube-container">
          <div className="blog-youtube-wrapper">
            <iframe
              src={embedUrl}
              title={section.title || 'YouTube video'}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="blog-youtube-iframe"
            />
          </div>
          {section.caption && (
            <p className="blog-youtube-caption">
              {section.caption}
            </p>
          )}
        </div>
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
          {blog.content.sections.map((section, index) => {
            // Check if this is a link and if the next section is also a link
            const isLink = section.type === 'link';
            const nextSection = blog.content.sections[index + 1];
            const isNextLink = nextSection && nextSection.type === 'link';
            
            // Skip rendering if this link was already rendered as part of a group
            if (index > 0 && blog.content.sections[index - 1].type === 'link' && section.type === 'link') {
              return null;
            }
            
            // If this is a link and the next one is also a link, render them together
            if (isLink && isNextLink) {
              // Find all consecutive links starting from this index
              let linkGroup = [];
              let i = index;
              while (i < blog.content.sections.length && blog.content.sections[i].type === 'link') {
                linkGroup.push(blog.content.sections[i]);
                i++;
              }
              
              // Render the link group
              return (
                <div key={`link-group-${index}`} className="blog-link-container">
                  {linkGroup.map((linkSection, linkIndex) => (
                    <RenderSection key={`link-${index + linkIndex}`} section={linkSection} />
                  ))}
                </div>
              );
            }
            
            // If this is a link but not part of a group, render normally
            if (isLink) {
              return <RenderSection key={index} section={section} />;
            }
            
            // Render other content types normally
            return <RenderSection key={index} section={section} />;
          })}
        </div>
      </div>
    </div>
  );
}
