import { useState, useEffect } from 'react';
import SessionForm from '../components/SessionForm';

const Pomodoro = () => {
  const [isActive, setIsActive] = useState(false);
  const [isFocusTime, setIsFocusTime] = useState(true);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [showForm, setShowForm] = useState(false);
  const [sessions, setSessions] = useState([]);

  // Timer logic remains unchanged
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
      setTimeLeft(isFocusTime ? 5 * 60 : 25 * 60);
      setShowForm(isFocusTime);
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, isFocusTime]);

  // All functions remain unchanged
  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setIsFocusTime(true);
    setTimeLeft(25 * 60);
    setShowForm(false);
  };
  const formatTime = (seconds) => `${Math.floor(seconds / 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
  const handleSessionSubmit = (newSession) => {
    setSessions([...sessions, newSession]);
    setShowForm(false);
  };

  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '2rem',
      backgroundColor: '#f8fafc',
      borderRadius: '16px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{
        textAlign: 'center',
        marginBottom: '2rem'
      }}>
        <h1 style={{
          fontSize: '2.25rem',
          fontWeight: '800',
          color: isFocusTime ? '#1e40af' : '#166534',
          marginBottom: '0.5rem',
          background: 'linear-gradient(90deg, #1e40af, #3b82f6)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent'
        }}>
          Pomodoro Technique
        </h1>
        <p style={{
          color: '#4b5563',
          fontSize: '1.125rem',
          lineHeight: '1.75'
        }}>
          Work for 25 minutes, then take a 5-minute break. 
          <span style={{ display: 'block' }}>Repeat for 4 cycles before taking a longer break.</span>
        </p>
      </div>

      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '2rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        marginBottom: '2rem',
        textAlign: 'center'
      }}>
        <div style={{
          fontSize: '1.25rem',
          fontWeight: '600',
          color: isFocusTime ? '#1e40af' : '#166534',
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem'
        }}>
          <span style={{
            display: 'inline-block',
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: isFocusTime ? '#3b82f6' : '#22c55e'
          }}></span>
          {isFocusTime ? 'Focus Time' : 'Break Time'}
        </div>

        <div style={{
          fontSize: '5rem',
          fontWeight: '700',
          fontFamily: 'monospace',
          color: isFocusTime ? '#1e40af' : '#166534',
          margin: '1.5rem 0',
          textShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          {formatTime(timeLeft)}
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
              backgroundColor: isActive ? '#ef4444' : '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
              minWidth: '120px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              ':hover': {
                transform: 'translateY(-2px)'
              }
            }}
          >
            {isActive ? 'Pause' : 'Start'}
          </button>
          <button 
            onClick={resetTimer}
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
                transform: 'translateY(-2px)'
              }
            }}
          >
            Reset
          </button>
        </div>
      </div>

      {showForm && (
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '2rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}>
          <SessionForm
            technique="pomodoro"
            duration={25}
            onSessionSubmit={handleSessionSubmit}
          />
        </div>
      )}

      <div style={{
        marginTop: '2rem',
        padding: '1.5rem',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{
          fontSize: '1.25rem',
          fontWeight: '600',
          color: '#1e293b',
          marginBottom: '1rem'
        }}>Session History</h2>
        {sessions.length > 0 ? (
          <div style={{
            display: 'grid',
            gap: '0.75rem'
          }}>
            {sessions.map((session, index) => (
              <div key={index} style={{
                padding: '0.75rem',
                backgroundColor: '#f8fafc',
                borderRadius: '8px',
                display: 'flex',
                justifyContent: 'space-between'
              }}>
                <span>{session.technique}</span>
                <span>{session.focusLevel}</span>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: '#64748b' }}>No sessions recorded yet</p>
        )}
      </div>
    </div>
  );
};

export default Pomodoro;