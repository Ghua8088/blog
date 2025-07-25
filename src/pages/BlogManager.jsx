import React, { useState } from 'react';
import { Container, Form, Button, Card, Row, Col, Alert } from 'react-bootstrap';
import blogData from '../data/blogData.json';
import { isValidYouTubeUrl } from '../utils/MediaLoader';

export default function BlogManager() {
  const [blogs, setBlogs] = useState(blogData);
  const [newBlog, setNewBlog] = useState({
    id: '',
    title: '',
    date: '',
    description: '',
    thumbnail: 'default.png',
    content: {
      sections: []
    }
  });
  const [currentSection, setCurrentSection] = useState({
    type: 'paragraph',
    content: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  // Generate a simple ID from title
  const generateId = (title) => {
    return title.toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setNewBlog({
      ...newBlog,
      title,
      id: generateId(title)
    });
  };

  const addSection = () => {
    if (currentSection.content.trim() || currentSection.type === 'image' || currentSection.type === 'audio' || currentSection.type === 'link' || currentSection.type === 'youtube') {
      let sectionToAdd = { ...currentSection };
      
      // Handle list type - convert to proper format
      if (currentSection.type === 'list') {
        const items = currentSection.content.split('\n').filter(item => item.trim());
        sectionToAdd = {
          type: 'list',
          items: items
        };
      }
      
      // Handle heading type - add level
      if (currentSection.type === 'heading') {
        sectionToAdd.level = 2;
      }
      
      // Handle image type
      if (currentSection.type === 'image') {
        sectionToAdd = {
          type: 'image',
          src: currentSection.src || '',
          alt: currentSection.alt || '',
          caption: currentSection.caption || ''
        };
      }
      
      // Handle audio type
      if (currentSection.type === 'audio') {
        sectionToAdd = {
          src: currentSection.src || '',
          type: currentSection.audioType || 'audio/mpeg',
          caption: currentSection.caption || ''
        };
      }
      
      // Handle link type
      if (currentSection.type === 'link') {
        sectionToAdd = {
          type: 'link',
          url: currentSection.url || '',
          title: currentSection.title || '',
          description: currentSection.description || ''
        };
      }
      
      // Handle YouTube type
      if (currentSection.type === 'youtube') {
        sectionToAdd = {
          type: 'youtube',
          url: currentSection.url || '',
          title: currentSection.title || '',
          caption: currentSection.caption || '',
          autoplay: currentSection.autoplay || 0,
          controls: currentSection.controls !== undefined ? currentSection.controls : 1,
          modestbranding: currentSection.modestbranding !== undefined ? currentSection.modestbranding : 1,
          rel: currentSection.rel !== undefined ? currentSection.rel : 0,
          start: currentSection.start || 0,
          end: currentSection.end || 0,
          mute: currentSection.mute || 0
        };
      }
      
      setNewBlog({
        ...newBlog,
        content: {
          ...newBlog.content,
          sections: [...newBlog.content.sections, sectionToAdd]
        }
      });
      setCurrentSection({ type: 'paragraph', content: '' });
    }
  };

  const removeSection = (index) => {
    const updatedSections = newBlog.content.sections.filter((_, i) => i !== index);
    setNewBlog({
      ...newBlog,
      content: { ...newBlog.content, sections: updatedSections }
    });
  };

  const saveBlog = () => {
    if (!newBlog.title || !newBlog.description || newBlog.content.sections.length === 0) {
      alert('Please fill in all required fields and add at least one content section!');
      return;
    }

    const updatedBlogs = [...blogs, newBlog];
    setBlogs(updatedBlogs);
    
    // In a real app, you'd save to a file or database
    // For now, we'll show a success message
    setShowSuccess(true);
    
    // Reset form
    setNewBlog({
      id: '',
      title: '',
      date: '',
      description: '',
      thumbnail: 'default.png',
      content: { sections: [] }
    });
    
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const exportBlogs = () => {
    const dataStr = JSON.stringify(blogs, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'blogData.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Container className="mt-4 text-light">
      <h2 className="display-4 fw-bold mb-4 Lobsterfont">Blog Manager</h2>
      
      {showSuccess && (
        <Alert variant="success" className="mb-4">
          Blog saved successfully! Download the JSON file and replace src/data/blogData.json
        </Alert>
      )}

      <Row>
        <Col lg={6}>
          <Card bg="dark" text="light" className="blog-card mb-4">
            <Card.Header>
              <h4>Add New Blog</h4>
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Blog Title *</Form.Label>
                  <Form.Control
                    type="text"
                    value={newBlog.title}
                    onChange={handleTitleChange}
                    placeholder="Enter blog title"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={newBlog.date}
                    onChange={(e) => setNewBlog({...newBlog, date: e.target.value})}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Description *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={newBlog.description}
                    onChange={(e) => setNewBlog({...newBlog, description: e.target.value})}
                    placeholder="Enter blog description"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Thumbnail</Form.Label>
                  <Form.Control
                    type="text"
                    value={newBlog.thumbnail}
                    onChange={(e) => setNewBlog({...newBlog, thumbnail: e.target.value})}
                    placeholder="default.png"
                  />
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6}>
          <Card bg="dark" text="light" className="blog-card mb-4">
            <Card.Header>
              <h4>Add Content Sections</h4>
            </Card.Header>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label>Section Type</Form.Label>
                <Form.Select
                  value={currentSection.type}
                  onChange={(e) => setCurrentSection({...currentSection, type: e.target.value})}
                >
                  <option value="paragraph">Paragraph</option>
                  <option value="heading">Heading</option>
                  <option value="list">List</option>
                  <option value="code">Code Block</option>
                  <option value="image">Image</option>
                  <option value="audio">Audio</option>
                  <option value="link">Link</option>
                  <option value="youtube">YouTube Video</option>
                </Form.Select>
              </Form.Group>

              {currentSection.type === 'list' ? (
                <Form.Group className="mb-3">
                  <Form.Label>List Items (one per line)</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    value={currentSection.content}
                    onChange={(e) => setCurrentSection({...currentSection, content: e.target.value})}
                    placeholder="Item 1&#10;Item 2&#10;Item 3"
                  />
                </Form.Group>
              ) : currentSection.type === 'image' ? (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label>Image URL *</Form.Label>
                    <Form.Control
                      type="url"
                      value={currentSection.src || ''}
                      onChange={(e) => setCurrentSection({...currentSection, src: e.target.value})}
                      placeholder="https://example.com/image.jpg"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Alt Text</Form.Label>
                    <Form.Control
                      type="text"
                      value={currentSection.alt || ''}
                      onChange={(e) => setCurrentSection({...currentSection, alt: e.target.value})}
                      placeholder="Description of the image"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Caption</Form.Label>
                    <Form.Control
                      type="text"
                      value={currentSection.caption || ''}
                      onChange={(e) => setCurrentSection({...currentSection, caption: e.target.value})}
                      placeholder="Optional caption for the image"
                    />
                  </Form.Group>
                </>
              ) : currentSection.type === 'audio' ? (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label>Audio URL *</Form.Label>
                    <Form.Control
                      type="url"
                      value={currentSection.src || ''}
                      onChange={(e) => setCurrentSection({...currentSection, src: e.target.value})}
                      placeholder="https://example.com/audio.mp3"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Audio Type</Form.Label>
                    <Form.Select
                      value={currentSection.audioType || 'audio/mpeg'}
                      onChange={(e) => setCurrentSection({...currentSection, audioType: e.target.value})}
                    >
                      <option value="audio/mpeg">MP3</option>
                      <option value="audio/wav">WAV</option>
                      <option value="audio/ogg">OGG</option>
                      <option value="audio/webm">WebM</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Caption</Form.Label>
                    <Form.Control
                      type="text"
                      value={currentSection.caption || ''}
                      onChange={(e) => setCurrentSection({...currentSection, caption: e.target.value})}
                      placeholder="Optional caption for the audio"
                    />
                  </Form.Group>
                </>
              ) : currentSection.type === 'link' ? (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label>URL *</Form.Label>
                    <Form.Control
                      type="url"
                      value={currentSection.url || ''}
                      onChange={(e) => setCurrentSection({...currentSection, url: e.target.value})}
                      placeholder="https://example.com"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      value={currentSection.title || ''}
                      onChange={(e) => setCurrentSection({...currentSection, title: e.target.value})}
                      placeholder="Link title (optional)"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      value={currentSection.description || ''}
                      onChange={(e) => setCurrentSection({...currentSection, description: e.target.value})}
                      placeholder="Brief description of the link"
                    />
                  </Form.Group>
                </>
              ) : currentSection.type === 'youtube' ? (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label>YouTube URL *</Form.Label>
                    <Form.Control
                      type="url"
                      value={currentSection.url || ''}
                      onChange={(e) => setCurrentSection({...currentSection, url: e.target.value})}
                      placeholder="https://www.youtube.com/watch?v=VIDEO_ID"
                      isInvalid={currentSection.url && !isValidYouTubeUrl(currentSection.url)}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter a valid YouTube URL
                    </Form.Control.Feedback>
                    <Form.Text className="text-muted">
                      Supports: youtube.com/watch?v=, youtu.be/, youtube.com/embed/, etc.
                    </Form.Text>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      value={currentSection.title || ''}
                      onChange={(e) => setCurrentSection({...currentSection, title: e.target.value})}
                      placeholder="Video title (optional)"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Caption</Form.Label>
                    <Form.Control
                      type="text"
                      value={currentSection.caption || ''}
                      onChange={(e) => setCurrentSection({...currentSection, caption: e.target.value})}
                      placeholder="Optional caption for the video"
                    />
                  </Form.Group>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Check
                          type="checkbox"
                          label="Autoplay"
                          checked={currentSection.autoplay === 1}
                          onChange={(e) => setCurrentSection({...currentSection, autoplay: e.target.checked ? 1 : 0})}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Check
                          type="checkbox"
                          label="Show Controls"
                          checked={currentSection.controls !== 0}
                          onChange={(e) => setCurrentSection({...currentSection, controls: e.target.checked ? 1 : 0})}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Check
                          type="checkbox"
                          label="Modest Branding"
                          checked={currentSection.modestbranding !== 0}
                          onChange={(e) => setCurrentSection({...currentSection, modestbranding: e.target.checked ? 1 : 0})}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Check
                          type="checkbox"
                          label="Show Related Videos"
                          checked={currentSection.rel === 1}
                          onChange={(e) => setCurrentSection({...currentSection, rel: e.target.checked ? 1 : 0})}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Start Time (seconds)</Form.Label>
                        <Form.Control
                          type="number"
                          min="0"
                          value={currentSection.start || 0}
                          onChange={(e) => setCurrentSection({...currentSection, start: parseInt(e.target.value) || 0})}
                          placeholder="0"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>End Time (seconds)</Form.Label>
                        <Form.Control
                          type="number"
                          min="0"
                          value={currentSection.end || 0}
                          onChange={(e) => setCurrentSection({...currentSection, end: parseInt(e.target.value) || 0})}
                          placeholder="0 (no end)"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </>
              ) : (
                <Form.Group className="mb-3">
                  <Form.Label>Content</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    value={currentSection.content}
                    onChange={(e) => setCurrentSection({...currentSection, content: e.target.value})}
                    placeholder="Enter content..."
                  />
                </Form.Group>
              )}

              <Button variant="warning" onClick={addSection} className="w-100">
                Add Section
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Content Sections Preview */}
      {newBlog.content.sections.length > 0 && (
        <Card bg="dark" text="light" className="blog-card mb-4">
          <Card.Header>
            <h4>Content Sections ({newBlog.content.sections.length})</h4>
          </Card.Header>
          <Card.Body>
            {newBlog.content.sections.map((section, index) => (
              <div key={index} className="mb-3 p-3 border border-secondary rounded">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="badge bg-secondary">{section.type}</span>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => removeSection(index)}
                  >
                    Remove
                  </Button>
                </div>
                <div className="text-muted">
                  {section.type === 'list' ? (
                    <ul>
                      {section.items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  ) : section.type === 'image' ? (
                    <div>
                      <p><strong>Image URL:</strong> {section.src}</p>
                      {section.alt && <p><strong>Alt Text:</strong> {section.alt}</p>}
                      {section.caption && <p><strong>Caption:</strong> {section.caption}</p>}
                    </div>
                  ) : section.type === 'audio' ? (
                    <div>
                      <p><strong>Audio URL:</strong> {section.src}</p>
                      <p><strong>Type:</strong> {section.type}</p>
                      {section.caption && <p><strong>Caption:</strong> {section.caption}</p>}
                    </div>
                  ) : section.type === 'link' ? (
                    <div>
                      <p><strong>URL:</strong> {section.url}</p>
                      {section.title && <p><strong>Title:</strong> {section.title}</p>}
                      {section.description && <p><strong>Description:</strong> {section.description}</p>}
                    </div>
                  ) : section.type === 'youtube' ? (
                    <div>
                      <p><strong>YouTube URL:</strong> {section.url}</p>
                      {section.title && <p><strong>Title:</strong> {section.title}</p>}
                      {section.caption && <p><strong>Caption:</strong> {section.caption}</p>}
                      <p><strong>Options:</strong> Autoplay: {section.autoplay ? 'Yes' : 'No'}, Controls: {section.controls !== 0 ? 'Yes' : 'No'}, Modest Branding: {section.modestbranding !== 0 ? 'Yes' : 'No'}</p>
                      {(section.start > 0 || section.end > 0) && <p><strong>Time Range:</strong> {section.start}s - {section.end > 0 ? section.end + 's' : 'End'}</p>}
                    </div>
                  ) : (
                    <p>{section.content}</p>
                  )}
                </div>
              </div>
            ))}
          </Card.Body>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="d-flex gap-3 justify-content-center">
        <Button variant="success" size="lg" onClick={saveBlog}>
          Save Blog
        </Button>
        <Button variant="outline-light" size="lg" onClick={exportBlogs}>
          Download JSON
        </Button>
      </div>

      {/* Instructions */}
      <Card bg="dark" text="light" className="blog-card mt-4">
        <Card.Header>
          <h4>How to Use</h4>
        </Card.Header>
        <Card.Body>
          <ol>
            <li>Fill in the blog details (title, date, description)</li>
            <li>Add content sections one by one</li>
            <li>Click "Save Blog" to add it to the list</li>
            <li>Click "Download JSON" to get the updated blogData.json file</li>
            <li>Replace the file in src/data/blogData.json</li>
            <li>Your new blog will appear on the site!</li>
          </ol>
        </Card.Body>
      </Card>
    </Container>
  );
} 