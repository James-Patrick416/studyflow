// src/pages/Pomodoro.jsx
import { useState, useEffect } from 'react';
import SessionForm from '../components/SessionForm';

const Pomodoro = () => {
  const [isActive, setIsActive] = useState(false);
  const [isFocusTime, setIsFocusTime] = useState(true);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
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
      setTimeLeft(isFocusTime ? 5 * 60 : 25 * 60); // Switch between 25m focus and 5m break
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
    setTimeLeft(25 * 60);
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
    <div className="pomodoro-page">
      <h1>Pomodoro Technique</h1>
      <p className="description">
        Work for 25 minutes, then take a 5-minute break. Repeat for 4 cycles before taking a longer break.
      </p>
      
      <div className="timer-container">
        <p className="timer-mode">{isFocusTime ? 'Focus Time' : 'Break Time'}</p>
        <div className="timer-display">{formatTime(timeLeft)}</div>
        
        <div className="timer-controls">
          <button onClick={toggleTimer}>
            {isActive ? 'Pause' : 'Start'}
          </button>
          <button onClick={resetTimer}>Reset</button>
        </div>
      </div>
      
      {showForm && (
        <SessionForm 
          technique="pomodoro" 
          duration={25}
          onSessionSubmit={handleSessionSubmit}
        />
      )}
    </div>
  );
};

export default Pomodoro;