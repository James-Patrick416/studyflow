// src/components/DeepWorkTimer.jsx
import { useState, useEffect } from 'react';
import SessionForm from './SessionForm';

const DeepWorkTimer = () => {
  const [isActive, setIsActive] = useState(false);
  const [isFocusTime, setIsFocusTime] = useState(true);
  const [timeLeft, setTimeLeft] = useState(90 * 60); // 90 minutes in seconds
  const [showForm, setShowForm] = useState(false);
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    let interval = null;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      clearInterval(interval);
      setIsActive(false);
      setIsFocusTime(!isFocusTime);
      setTimeLeft(isFocusTime ? 30 * 60 : 90 * 60); // Switch between 90m focus and 30m break
      setShowForm(isFocusTime); // Show form only after focus sessions
    }
    
    return () => clearInterval(interval);
  }, [isActive, timeLeft, isFocusTime]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsFocusTime(true);
    setTimeLeft(90 * 60);
    setShowForm(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSessionSubmit = (newSession) => {
    setSessions([...sessions, newSession]);
    setShowForm(false);
  };

  return (
    <div className="deep-work-timer">
      <h2>Deep Work Mode</h2>
      <p className="timer-mode">{isFocusTime ? 'Focus Time' : 'Break Time'}</p>
      <div className="timer-display">{formatTime(timeLeft)}</div>
      
      <div className="timer-controls">
        <button
         onClick={toggleTimer}
         style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: isActive ? '#ef4444' : '#10b981', // Red when active, green when paused
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s',
            minWidth: '120px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            ':hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2)'
            }
          }}
         >
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button onClick={resetTimer}
        style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#e2e8f0',
            color: '#4b5563',
            border: 'none',
            borderRadius: '8px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s',
            minWidth: '120px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            ':hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2)'
            }
          }}
        >Reset</button>
      </div>
      
      {showForm && (
        <SessionForm 
          technique="deepwork" 
          duration={90}
          onSessionSubmit={handleSessionSubmit}
        />
      )}
    </div>
  );
};

export default DeepWorkTimer;