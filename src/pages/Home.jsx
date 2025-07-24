import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import logo from '../assets/images/logo.jpg';

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
    <div className={styles.container}>
      <h1 className={styles.header}>Welcome to STUDYFLOW</h1>
      
      <div className={styles.quoteContainer}>
        <p className={styles.quoteText}>"{quote.content}"</p>
        <small className={styles.quoteAuthor}>- {quote.author}</small>
      </div>

      <div className={styles.buttons}>
        <Link to="/pomodoro" className={styles.button}>Start Pomodoro</Link>
        <Link to="/custom" className={styles.button}>Custom Timer</Link>
        <Link to="/deepwork" className={styles.button}>Deep Work</Link>
      </div>
      <div style={{ marginTop: '3rem', textAlign: 'center' }}>
        <img 
          src={logo} 
          alt="StudyFlow Logo" 
          style={{ 
            maxWidth: '200px', 
            height: 'auto',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
          }} 
        />
      </div>
    </div>
  );
}