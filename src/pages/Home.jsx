// src/pages/Home.jsx
import styles from './Home.module.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [quote, setQuote] = useState({ content: '', author: '' });

  useEffect(() => {
    fetch('https://api.quotable.io/random')
      .then(res => res.json())
      .then(data => setQuote(data))
      .catch(() => setQuote({
        content: 'The secret of getting ahead is getting started.',
        author: 'Mark Twain'
      }));
  }, []);

  return (
    <div className="home-page">
      <h1>Welcome to STUDYFLOW</h1>
      
      <div className="motivational-quote">
        <p>"{quote.content}"</p>
        <small>- {quote.author}</small>
      </div>

      <div className="cta-buttons">
        <Link to="/pomodoro" className="btn">Start Pomodoro</Link>
        <Link to="/custom" className="btn">Custom Timer</Link>
        <Link to="/deepwork" className="btn">Deep Work</Link>
      </div>
    </div>
  );
}