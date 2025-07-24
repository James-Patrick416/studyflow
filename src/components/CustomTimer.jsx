import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
    }}>
      {!isActive && (
        <div style={{
          display: 'flex',
          gap: '1.5rem',
          marginBottom: '1rem',
          justifyContent: 'center'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{
              marginBottom: '0.5rem',
              fontWeight: '500',
              color: '#2d3748'
            }}>Focus (minutes)</label>
            <input 
              type="number" 
              min="1" 
              value={focusTime} 
              onChange={(e) => setFocusTime(Number(e.target.value))} 
              style={{
                padding: '0.75rem',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                width: '100px',
                textAlign: 'center'
              }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{
              marginBottom: '0.5rem',
              fontWeight: '500',
              color: '#2d3748'
            }}>Break (minutes)</label>
            <input 
              type="number" 
              min="1" 
              value={breakTime} 
              onChange={(e) => setBreakTime(Number(e.target.value))} 
              style={{
                padding: '0.75rem',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                width: '100px',
                textAlign: 'center'
              }}
            />
          </div>
        </div>
      )}

      <div style={{
        backgroundColor: '#f7fafc',
        padding: '2rem',
        borderRadius: '12px',
        textAlign: 'center'
      }}>
        <div style={{
          fontSize: '1.2rem',
          fontWeight: '600',
          color: isFocusMode ? '#2b6cb0' : '#38a169',
          marginBottom: '1rem'
        }}>
          {isFocusMode ? 'Focus Time' : 'Break Time'}
        </div>
        <div style={{
          fontSize: '4rem',
          fontFamily: 'monospace',
          color: '#1e40af',
          margin: '1rem 0'
        }}>
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
      </div>

      <div style={{
        display: 'flex',
        gap: '1rem',
        justifyContent: 'center'
      }}>
        <button 
          onClick={toggleTimer}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button 
          onClick={resetTimer}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#e2e8f0',
            color: '#4a5568',
            border: 'none',
            borderRadius: '8px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}