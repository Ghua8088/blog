import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Blogs from './pages/Blogs';
import Contact from './pages/Contact';
import BlogPost from './pages/BlogPost';
import BlogManager from './pages/BlogManager';
import Footer from './components/Footer';
import CursorGlow from './components/CursorGlow';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigations from './components/Navigations';
import { Container } from 'react-bootstrap';
import React from 'react';
import HSIDE from './projects/HSIDE/hside';
import Gdnet from './projects/gdnet/gdnet';

function App() {
  return (
    <div className="App">
      <CursorGlow />
      <Navigations />
      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/manage" element={<BlogManager />} />
          <Route path="/projects/HSIDE" element={<HSIDE />} />
          <Route path="/projects/gdnet" element={<Gdnet/>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
      <Footer />
      <PWAInstallPrompt />
    </div>
  );
}

export default App;
