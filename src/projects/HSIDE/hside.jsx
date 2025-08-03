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
  const [platform, setPlatform] = useState('unknown');

  useEffect(() => {
    // Detect platform
    const detectPlatform = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      if (userAgent.includes('win')) {
        return 'windows';
      } else if (userAgent.includes('mac')) {
        return 'macos';
      } else if (userAgent.includes('linux')) {
        return 'linux';
      }
      return 'unknown';
    };

    setPlatform(detectPlatform());

    fetch('https://api.github.com/repos/Ghua8088/HSide/releases/latest')
      .then((res) => res.json())
      .then((data) => setRelease(data));
  }, []);

  // Smooth scroll function for HashRouter compatibility
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Get platform-specific download URL
  const getPlatformSpecificDownload = () => {
    if (!release?.assets?.length) return null;

    const assets = release.assets;
    
    // Look for platform-specific files
    if (platform === 'windows') {
      // Look for .exe file first, then fallback to first asset
      const exeAsset = assets.find(asset => 
        asset.name.toLowerCase().includes('.exe') || 
        asset.name.toLowerCase().includes('windows')
      );
      return exeAsset || assets[0];
    } else {
      // For macOS and Linux, look for .jar file first, then fallback to first asset
      const jarAsset = assets.find(asset => 
        asset.name.toLowerCase().includes('.jar') || 
        asset.name.toLowerCase().includes('universal') ||
        asset.name.toLowerCase().includes('cross-platform')
      );
      return jarAsset || assets[0];
    }
  };

  // Get platform-specific download text
  const getDownloadText = () => {
    if (!release) return 'Download HSIDE';
    
    const asset = getPlatformSpecificDownload();
    if (!asset) return 'Download HSIDE';
    
    if (platform === 'windows') {
      return `Download HSIDE for Windows (${release.tag_name})`;
    } else if (platform === 'macos') {
      return `Download HSIDE for macOS (${release.tag_name})`;
    } else if (platform === 'linux') {
      return `Download HSIDE for Linux (${release.tag_name})`;
    } else {
      return `Download HSIDE (${release.tag_name})`;
    }
  };

  const downloadAsset = getPlatformSpecificDownload();

  return (
    <div className="hside-wrapper">
      {/* Navigation */}
      <nav className="hside-nav">
        <div className="logo-box">
        <img src={icon} alt="HSIDE Logo" className="icons" />
          <span className="logo-text">HSIDE</span>
        </div>
        <div className="nav-links">
          <button onClick={() => scrollToSection('features')} className="nav-link-btn">Features</button>
          <button onClick={() => scrollToSection('ai-capabilities')} className="nav-link-btn">AI Features</button>
          <button onClick={() => scrollToSection('download')} className="nav-link-btn">Download</button>
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
            <button onClick={() => scrollToSection('ai-capabilities')} className="secondary-btn">
              Explore AI Features
            </button>
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
      <section id="ai-capabilities" className="ai-capabilities-section">
        <div className="container">
          <h2 className="section-title">AI-Powered Development</h2>
          <p className="section-subtitle">Experience the future of coding with intelligent assistance</p>
          
          <div className="ai-features-grid">
            <div className="ai-feature-card">
              <div className="ai-feature-icon">
                <span className="ai-emoji">🤖</span>
              </div>
              <h3>Smart Code Completion</h3>
              <p>AI-powered suggestions that understand your coding patterns and project context.</p>
            </div>

            <div className="ai-feature-card">
              <div className="ai-feature-icon">
                <span className="ai-emoji">💬</span>
              </div>
              <h3>Natural Language Coding</h3>
              <p>Describe what you want to build in plain English and watch the AI generate code.</p>
            </div>

            <div className="ai-feature-card">
              <div className="ai-feature-icon">
                <span className="ai-emoji">🔍</span>
              </div>
              <h3>Intelligent Debugging</h3>
              <p>AI assistance in finding and fixing bugs with contextual explanations.</p>
            </div>

            <div className="ai-feature-card">
              <div className="ai-feature-icon">
                <span className="ai-emoji">📚</span>
              </div>
              <h3>Code Documentation</h3>
              <p>Automatically generate comprehensive documentation for your Java projects.</p>
            </div>
          </div>
        </div>
      </section>

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
