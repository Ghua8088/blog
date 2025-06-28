// src/projects/gdnet/Gdnet.jsx
import './gdnet.css';
import icon from './icon.ico';
import github from '../../assets/icons/github.svg';
import python from '../../assets/icons/Python.svg';

function Gdnet() {
  return (
    <div className="gdnet-wrapper">
      <header className="gdnet-nav">
        <div className="logo-box">
          <img src={icon} alt="GDnet Logo" className="icons" />
          <span className="logo-text">GDnet</span>
        </div>
        <a
          href="https://github.com/Ghua8088/GDnet"
          className="download-btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={github} alt="GitHub" className="icons" />
          View on GitHub
        </a>
      </header>

      <main className="hero">
        <h1 className="hero-heading">
          A Torch-level Deep Learning Framework Built From Scratch 🧠⚙️
        </h1>
        <p className="hero-desc">
          GDnet is a minimal, educational deep learning library—handcrafted without relying on high-level abstractions.
          Inspired by PyTorch & TensorFlow, but built using raw Python + NumPy.
        </p>

        <a
          href="https://github.com/Ghua8088/GDnet"
          className="primary-download"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={python} alt="Python" className="icon" />
          Install with pip
        </a>
        <p className="compatibility-note">Requires Python 3.7+</p>
      </main>

      <footer className="platform-footer">
        <h4 className="terminal-heading">Try it now:</h4>
        <div className="terminal-line">
          <code className="code-block ">pip install gdnet</code>
        </div>
        <p className="footer-note">Cross-platform | Cupy + NumPy powered</p>
      </footer>
    </div>
  );
}

export default Gdnet;
