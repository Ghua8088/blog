// src/projects/HSIDE/HSIDE.jsx
import React, { useEffect, useState } from 'react';
import './HSIDE.css';
import icon from './icon.ico';
import github from '../../assets/icons/github.svg';
import java from '../../assets/icons/java.svg';
import download from '../../assets/icons/download.svg';
import ui from './UI.png';
function HSIDE() {
  const [release, setRelease] = useState(null);

  useEffect(() => {
    fetch('https://api.github.com/repos/Ghua8088/HSide/releases/latest')
      .then((res) => res.json())
      .then((data) => setRelease(data));
  }, []);

  return (
    <div className="hside-wrapper">
      <header className="hside-nav">
        <div className="logo-box">
          <img src={icon} alt="icons" className="icons" />
          <span className="logo-text">HSIDE</span>
        </div>
        {release?.assets?.length > 0 && (
          <a
            href={release.assets[0].browser_download_url}
            className="download-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src ={download} alt="Download" className="icons" /> HSIDE ({release.tag_name})   
          </a>
        )}
      </header>

      <main className="hero">
        <h1 className="hero-heading">Coded in Java for speed with old fashion UI<img src={java} alt="Java" className="icons" /></h1>
        <p className="hero-desc">
          HSIDE is a modern AI-powered Java IDE that feels as lightweight as Notepad — with the intelligence of an assistant.
        </p>

        {release?.assets?.length > 0 && (
          <a
            href={release.assets[0].browser_download_url}
            className="primary-download"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={download} alt="Download" className="icon" /> Download for Windows
          </a>
        )}
        <p className="compatibility-note">Supports Windows 10 & above</p>
      </main>

      <footer className="platform-footer">
        <h4>Cross-Platform Soon</h4>
        <div className="platforms-row">
          <span className="platform-chip coming-soon">macOS (coming soon)</span>
          <span className="platform-chip available">Linux (Jar)</span>
          <a href="https://github.com/Ghua8088/HSide"className='platform-chip' target="_blank" rel="noopener noreferrer">
            <img src={github} alt="GitHub" className="icons" style={{filter:'invert(1)'}} />
          </a>
          <span className="made-with">
            made with <img src={java} alt="Java" className="icons" style={{ filter: 'invert(1)' }} />
          </span>
          
        </div>
      </footer>
      <div>
        <p> Example of HSIDE  UI </p>
        <img src={ui} alt="HSIDE UI" className='example-img' />
      </div>
    </div>
  );
}

export default HSIDE;
