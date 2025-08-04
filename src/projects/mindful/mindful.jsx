// src/projects/mindful/mindful.jsx
import React, { useEffect, useState } from 'react';
import './mindful.css';
import github from '../../assets/icons/github.svg';
import js from '../../assets/icons/js.svg';
import download from '../../assets/icons/download.svg';
import mindfulLogo from '../../assets/thumbnails/mindful.png';
import mindfulIcon from './icon128.png';
function Mindful() {
  const [release, setRelease] = useState(null);

  useEffect(() => {
    fetch('https://api.github.com/repos/Ghua8088/Mindful/releases/latest')
      .then((res) => res.json())
      .then((data) => setRelease(data))
      .catch((error) => console.log('No releases found or error fetching:', error));
  }, []);

  // Smooth scroll function for HashRouter compatibility
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Get download text
  const getDownloadText = () => {
    if (!release) return 'Install Mindful';
    return `Install Mindful (${release.tag_name})`;
  };

  const downloadAsset = release?.assets?.[0];

  return (
    <div className="mindful-wrapper">
      {/* Navigation */}
      <nav className="mindful-nav">
        <div className="logo-box">
          <div className="mindful-icon">
            <img src={mindfulIcon} alt="Mindful Logo" className="hero-icon" />
          </div>
          <span className="logo-text">Mindful</span>
        </div>
        <div className="nav-links">
          <button onClick={() => scrollToSection('features')} className="nav-link-btn">Features</button>
          <button onClick={() => scrollToSection('mindfulness')} className="nav-link-btn">Mindfulness</button>
          <button onClick={() => scrollToSection('download')} className="nav-link-btn">Install</button>
          <a href="https://github.com/Ghua8088/Mindful" target="_blank" rel="noopener noreferrer">
            <img src={github} alt="GitHub" className="nav-icon" />
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Transform Your Browser into a Mindfulness Tool
          </h1>
          <p className="hero-subtitle">
            Stay focused, reduce distractions, and cultivate mindfulness while browsing the web
          </p>
          <div className="hero-buttons">
            {downloadAsset && (
              <a
                href={downloadAsset.browser_download_url}
                className="primary-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={download} alt="Download" className="btn-icon" />
                {getDownloadText()}
              </a>
            )}
            <button onClick={() => scrollToSection('mindfulness')} className="secondary-btn">
              Explore Mindfulness Features
            </button>
          </div>
          <p className="hero-note">Available for Chrome, Firefox, and Edge • Free and Open Source</p>
        </div>
        <div className="hero-visual">
          <div className="hero-image-container">
            <img src={mindfulLogo} alt="Mindful Logo" className="hero-logo" />
            <div className="mindful-preview">
              <div className="browser-mockup">
                <div className="browser-header">
                  <div className="browser-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <div className="browser-url">mindful-browsing.com</div>
                </div>
                <div className="browser-content">
                  <div className="mindful-notification">
                    <span className="notification-icon">🧘</span>
                    <span>Take a mindful breath...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mindfulness Features Section */}
      <section id="mindfulness" className="mindfulness-section">
        <div className="container">
          <h2 className="section-title">Mindful Browsing Experience</h2>
          <p className="section-subtitle">Transform your digital habits with intentional browsing</p>
          
          <div className="mindfulness-features-grid">
            <div className="mindfulness-feature-card">
              <div className="mindfulness-feature-icon">
                <span className="mindfulness-emoji">🕰️</span>
              </div>
              <h3>Mindful Timers</h3>
              <p>Set gentle reminders to take breaks and practice mindfulness throughout your browsing session.</p>
            </div>

            <div className="mindfulness-feature-card">
              <div className="mindfulness-feature-icon">
                <span className="mindfulness-emoji">🎯</span>
              </div>
              <h3>Focus Mode</h3>
              <p>Block distracting websites and notifications to help you stay focused on what matters most.</p>
            </div>

            <div className="mindfulness-feature-card">
              <div className="mindfulness-feature-icon">
                <span className="mindfulness-emoji">📊</span>
              </div>
              <h3>Browsing Insights</h3>
              <p>Track your digital habits and get insights into your browsing patterns with mindful analytics.</p>
            </div>

            <div className="mindfulness-feature-card">
              <div className="mindfulness-feature-icon">
                <span className="mindfulness-emoji">🌱</span>
              </div>
              <h3>Mindful Prompts</h3>
              <p>Receive gentle prompts and mindfulness exercises to cultivate awareness during your online time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="container">
          <h2 className="section-title">One extension. Infinite mindfulness.</h2>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <img src={js} alt="JavaScript" className="feature-icon-img" />
              </div>
              <h3>Web Native</h3>
              <p>Built with modern web technologies for seamless integration with your favorite browsers.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <span className="feature-emoji">🔒</span>
              </div>
              <h3>Privacy First</h3>
              <p>Your browsing data stays private. No tracking, no ads, no data collection - just mindfulness.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <span className="feature-emoji">⚡</span>
              </div>
              <h3>Lightweight</h3>
              <p>Minimal resource usage that won't slow down your browser or impact your browsing experience.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <span className="feature-emoji">🎨</span>
              </div>
              <h3>Customizable</h3>
              <p>Personalize your mindfulness experience with customizable themes and notification preferences.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <span className="feature-emoji">🌍</span>
              </div>
              <h3>Cross-Platform</h3>
              <p>Works seamlessly across Chrome, Firefox, and Edge browsers on any operating system.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <span className="feature-emoji">🚀</span>
              </div>
              <h3>Open Source</h3>
              <p>Transparent, community-driven development with full source code available on GitHub.</p>
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
              <p>Privacy Focused</p>
              <span>No data collection or tracking - your privacy is our priority</span>
            </div>
            <div className="stat-item">
              <h3>3+</h3>
              <p>Browser Support</p>
              <span>Works on Chrome, Firefox, and Edge for maximum compatibility</span>
            </div>
            <div className="stat-item">
              <h3>∞</h3>
              <p>Mindfulness Moments</p>
              <span>Unlimited opportunities to practice mindful browsing</span>
            </div>
          </div>
        </div>
        <div className="browser-support">
            <h3>Supported Browsers</h3>
            <div className="browser-logos">
                <div className="browser-item">
                  <span className="browser-name">Chrome</span>
                </div>
                <div className="browser-item">
                  <span className="browser-name">Firefox</span>
                </div>
                <div className="browser-item">
                  <span className="browser-name">Edge</span>
                </div>
                <div className="browser-item">
                  <span className="browser-name">Safari (Coming Soon)</span>
                </div>
              </div>
            </div>
      </section>

      {/* Download Section */}
      <section id="download" className="download-section">
        <div className="container">
          <div className="download-content">
            <h2>Ready to browse mindfully?</h2>
            <p>Install Mindful today and transform your digital habits with intentional, mindful browsing.</p>
            {downloadAsset && (
              <a
                href={downloadAsset.browser_download_url}
                className="download-cta"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={download} alt="Download" className="btn-icon" />
                {getDownloadText()}
              </a>
            )}
            <div className="platform-info">
              <span className="platform-tag available">Chrome</span>
              <span className="platform-tag available">Firefox</span>
              <span className="platform-tag available">Edge</span>
              <span className="platform-tag coming-soon">Safari (Coming Soon)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mindful-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-left">
              <div className="logo-box">
                <div className="mindful-icon">🧘</div>
                <span className="logo-text">Mindful</span>
              </div>
              <p>Transform your browser into a mindfulness tool.</p>
            </div>
            <div className="footer-right">
              <a href="https://github.com/Ghua8088/Mindful" target="_blank" rel="noopener noreferrer" className="github-link">
                <img src={github} alt="GitHub" className="nav-icon" />
                View on GitHub
              </a>
              <div className="made-with">
                Made with <img src={js} alt="JavaScript" className="nav-icon" /> JavaScript
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Mindful; 