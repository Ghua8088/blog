// src/projects/HSIDE/HSIDE.jsx
import React, { useEffect, useState } from 'react';
import './HSIDE.css';
import icon from './icon.ico';
import github from '../../assets/icons/github.svg';
import java from '../../assets/icons/java.svg';
import download from '../../assets/icons/download.svg';
import ui from './UI.png';
import hsideLogo from '../../assets/thumbnails/HSIDE.png';

function HSIDE() {
  const [release, setRelease] = useState(null);

  useEffect(() => {
    fetch('https://api.github.com/repos/Ghua8088/HSide/releases/latest')
      .then((res) => res.json())
      .then((data) => setRelease(data));
  }, []);

  return (
    <div className="hside-wrapper">
      {/* Navigation */}
      <nav className="hside-nav">
        <div className="logo-box">
        <img src={icon} alt="HSIDE Logo" className="icons" />
          <span className="logo-text">HSIDE</span>
        </div>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#ai-capabilities">AI Features</a>
          <a href="#download">Download</a>
          <a href="https://github.com/Ghua8088/HSide" target="_blank" rel="noopener noreferrer">
            <img src={github} alt="GitHub" className="nav-icon" />
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Introducing the HSIDE Editor
          </h1>
          <p className="hero-subtitle">
            The new purpose-built Java IDE with built-in AI to harness magic
          </p>
          <div className="hero-buttons">
            {release?.assets?.length > 0 && (
              <a
                href={release.assets[0].browser_download_url}
                className="primary-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={download} alt="Download" className="btn-icon" />
                Download HSIDE
              </a>
            )}
            <a href="#ai-capabilities" className="secondary-btn">
              Explore AI Features
            </a>
          </div>
          <p className="hero-note">Supports Windows 10 & above • Cross-platform coming soon</p>
        </div>
        <div className="hero-visual">
          <div className="hero-image-container">
            <img src={hsideLogo} alt="HSIDE Logo" className="hero-logo" />
            <img src={ui} alt="HSIDE Interface" className="hero-image" />
          </div>
        </div>
      </section>

      {/* AI Capabilities Section */}


      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="container">
          <h2 className="section-title">One editor. Unlimited superpowers.</h2>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <img src={java} alt="Java" className="feature-icon-img" />
              </div>
              <h3>Java Native</h3>
              <p>Built entirely in Java for lightning-fast performance and native system integration.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <span className="feature-emoji">⚡</span>
              </div>
              <h3>Lightning Fast</h3>
              <p>Starts up instantly and runs smoothly even on older hardware with minimal resource usage.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <span className="feature-emoji">🎯</span>
              </div>
              <h3>AI-Powered</h3>
              <p>Intelligent code completion and suggestions that understand your coding style and project context.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <span className="feature-emoji">🔧</span>
              </div>
              <h3>Simple & Clean</h3>
              <p>Minimalist interface that focuses on what matters - your code, without distractions.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <span className="feature-emoji">🔒</span>
              </div>
              <h3>Secure & Private</h3>
              <p>Your code and AI conversations stay private. No data collection or cloud dependencies.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <span className="feature-emoji">🚀</span>
              </div>
              <h3>Extensible</h3>
              <p>Plugin system and API support for custom extensions and integrations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <h3>100%</h3>
              <p>Java Native</p>
              <span>Built from the ground up in Java for optimal performance</span>
            </div>
            <div className="stat-item">
              <h3>100MB</h3>
              <p>Lightweight</p>
              <span>Tiny footprint that won't slow down your system</span>
            </div>
            <div className="stat-item">
              <h3>∞</h3>
              <p>AI Models</p>
              <span>Support for unlimited AI providers and custom models</span>
            </div>
          </div>
        </div>
        <div className="ai-providers">
            <h3>Supported AI Providers</h3>
            <div className="provider-logos">
                <div className="provider-item">
                  <span className="provider-name">OpenAI GPT</span>
                </div>
                <div className="provider-item">
                  <span className="provider-name">Anthropic Claude</span>
                </div>
                <div className="provider-item">
                  <span className="provider-name">Google Gemini</span>
                </div>
                <div className="provider-item">
                  <span className="provider-name">Custom Models</span>
                </div>
              </div>
            </div>
 
      </section>
      {/* Download Section */}
      <section id="download" className="download-section">
        <div className="container">
          <div className="download-content">
            <h2>Ready to experience the magic?</h2>
            <p>Download HSIDE today and transform your Java development workflow with AI-powered assistance.</p>
            {release?.assets?.length > 0 && (
              <a
                href={release.assets[0].browser_download_url}
                className="download-cta"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={download} alt="Download" className="btn-icon" />
                Download HSIDE ({release.tag_name})
              </a>
            )}
            <div className="platform-info">
              <span className="platform-tag available">Windows 10+</span>
              <span className="platform-tag coming-soon">macOS (Coming Soon)</span>
              <span className="platform-tag available">Linux (JAR)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="hside-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-left">
              <div className="logo-box">
              <img src={icon} alt="HSIDE Logo" className="icons" />
                <span className="logo-text">HSIDE</span>
              </div>
              <p>Built to keep you in flow state with AI assistance.</p>
            </div>
            <div className="footer-right">
              <a href="https://github.com/Ghua8088/HSide" target="_blank" rel="noopener noreferrer" className="github-link">
                <img src={github} alt="GitHub" className="nav-icon" />
                View on GitHub
              </a>
              <div className="made-with">
                Made with <img src={java} alt="Java" className="nav-icon" /> Java
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HSIDE;
