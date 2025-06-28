import React, { useState, useRef } from 'react';
import sendIcon from '../assets/icons/send.svg';
import linkedInIcon from '../assets/icons/linked-in.svg';
import githubIcon from '../assets/icons/github.svg';
import leetcodeIcon from '../assets/icons/leetcode.svg';

export default function Contact() {
    // Whack-a-Meteor game state
    const [score, setScore] = useState(0);
    const [gameActive, setGameActive] = useState(false);
    const [timer, setTimer] = useState(15);
    const timerRef = useRef();
    const [meteor, setMeteor] = useState({ x: 50, y: 50, key: 0 });
    const meteorEmojis = ['🎯','👻','💗','✨'];

    // Start or restart the game
    const startGame = () => {
        setScore(0);
        setTimer(15);
        setGameActive(true);
        spawnMeteor();
        timerRef.current = setInterval(() => {
            setTimer((t) => {
                if (t <= 1) {
                    clearInterval(timerRef.current);
                    setGameActive(false);
                    return 0;
                }
                return t - 1;
            });
        }, 1000);
    };

    // Spawn a meteor at a random position
    const spawnMeteor = () => {
        setMeteor({
            x: Math.random() * 80 + 5,
            y: Math.random() * 35 + 40,
            key: Math.random(),
        });
    };

    // Handle meteor click
    const handleMeteorClick = () => {
        if (!gameActive) return;
        setScore((s) => s + 1);
        spawnMeteor();
    };

    // Cleanup timer on unmount
    React.useEffect(() => () => clearInterval(timerRef.current), []);

    return (
        <div className="container mt-4 text-light">
            <h2 className="display-4 fw-bold mb-4 Lobsterfont">Contact</h2>
            
            <div className="blog-content">
                <p className="blog-text">Feel free to reach out for collaborations or just to connect!</p>
                
                <ul className="contact-list">
                    <li>
                        <img src={sendIcon} alt="Email" className="contact-icon" />
                        <a href="mailto:raghusony2005@gmail.com" target="_blank" rel="noopener noreferrer">
                            raghusony2005@gmail.com
                        </a>
                    </li>
                    <li>
                        <img src={linkedInIcon} alt="LinkedIn" className="contact-icon" />
                        <a href="https://www.linkedin.com/in/raghu-raamm-914a33300/" target="_blank" rel="noopener noreferrer">
                            Raghuraamm
                        </a>
                    </li>
                    <li>
                        <img src={githubIcon} alt="GitHub" className="contact-icon" />
                        <a href="https://github.com/Ghua8088/" target="_blank" rel="noopener noreferrer">
                            Ghua8088
                        </a>
                    </li>
                    <li>
                        <img src={leetcodeIcon} alt="LeetCode" className="contact-icon" />
                        <a href="https://leetcode.com/Ghua8088/" target="_blank" rel="noopener noreferrer">
                            Ghua8088
                        </a>
                    </li>
                </ul>
                
                <div className="fun-bottom">
                    <span className="fun-message">Thanks for visiting! Have a stellar day </span>
                </div>
            </div>

            {/* Whack-a-Meteor Game */}
            <div className="star-game-container mt-4">
                <h4>Aim challenge</h4>
                <div className="mb-3">Score: <b>{score}</b> | Time: <b>{timer}</b>s</div>
                
                <div style={{ 
                    position: 'relative', 
                    width: '100%', 
                    height: 200, 
                    background: 'rgba(30,30,40,0.7)', 
                    borderRadius: 16, 
                    overflow: 'hidden', 
                    margin: '0 auto', 
                    maxWidth: 400,
                    border: '1px solid rgba(255, 255, 255, 0.05)'
                }}>
                    {gameActive && (
                        <span
                            key={meteor.key}
                            className="star-game-star"
                            style={{
                                position: 'absolute',
                                left: `${meteor.x}%`,
                                top: `${meteor.y}%`,
                                fontSize: 44,
                                cursor: 'pointer',
                                userSelect: 'none',
                                filter: 'drop-shadow(0 0 12px #fff59d) brightness(1.2)',
                                transition: 'left 0.15s, top 0.15s',
                            }}
                            onClick={handleMeteorClick}
                            role="img"
                            aria-label="meteor"
                        >
                            {meteorEmojis[Math.floor(Math.random() * meteorEmojis.length)]}
                        </span>
                    )}
                    
                    {!gameActive && timer === 0 && (
                        <div className="text-center" style={{ paddingTop: '80px' }}>
                            <div className="mb-3">Final Score: <b>{score}</b></div>
                            <button className="btn btn-warning" onClick={startGame}>
                                Play Again
                            </button>
                        </div>
                    )}
                    
                    {!gameActive && timer === 15 && (
                        <div className="text-center" style={{ paddingTop: '80px' }}>
                            <button className="btn btn-warning" onClick={startGame}>
                                Start Game
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
