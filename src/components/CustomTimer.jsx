// src/components/CustomTimer.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CustomTimer.module.css';

export default function CustomTimer() {
  const [focusTime, setFocusTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [minutes, setMinutes] = useState(focusTime);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let interval;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            if (isFocusMode) {
              // Switch to break mode
              setMinutes(breakTime);
              setIsFocusMode(false);
            } else {
              // Session complete
              clearInterval(interval);
              navigate('/session-form?technique=custom');
            }
            return;
          }
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, minutes, seconds, isFocusMode, breakTime, navigate]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setMinutes(focusTime);
    setSeconds(0);
    setIsFocusMode(true);
  };

  return (
    <div className={styles.customTimer}>
      <h2>Custom Timer</h2>
      {!isActive && (
        <div className={styles.timeSettings}>
          <label>
            Focus (min):
            <input 
              type="number" 
              min="1" 
              value={focusTime} 
              onChange={(e) => setFocusTime(Number(e.target.value))} 
            />
          </label>
          <label>
            Break (min):
            <input 
              type="number" 
              min="1" 
              value={breakTime} 
              onChange={(e) => setBreakTime(Number(e.target.value))} 
            />
          </label>
        </div>
      )}
      <div className={styles.timerDisplay}>
        <div className={`${styles.modeIndicator} ${isFocusMode ? styles.focus : styles.break}`}>
          {isFocusMode ? 'Focus Time' : 'Break Time'}
        </div>
        <div className={styles.time}>
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
      </div>
      <div className='{styles.controls}'>
      <button onClick={toggleTimer}>
        {isActive ? 'Pause' : 'Start'}
      </button>
      <button onClick={resetTimer}>Reset</button>
    </div>
    </div>
  );
}