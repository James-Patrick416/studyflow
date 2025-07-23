import { useState, useEffect } from 'react';
import SessionForm from '../components/SessionForm';

const Pomodoro = () => {
  const [isActive, setIsActive] = useState(false);
  const [isFocusTime, setIsFocusTime] = useState(true);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [showForm, setShowForm] = useState(false);
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    let interval = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
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

  const toggleTimer = () => setIsActive(prev => !prev);

  const resetTimer = () => {
    setIsActive(false);
    setIsFocusTime(true);
    setTimeLeft(25 * 60);
    setShowForm(false);
  };

  const formatTime = (seconds) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const handleSessionSubmit = (newSession) => {
    setSessions(prev => [...prev, newSession]);
    setShowForm(false);
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={{ ...styles.title, color: 'transparent' }}>Pomodoro Technique</h1>
        <p style={styles.description}>
          Work for 25 minutes, then take a 5-minute break.
          <span style={{ display: 'block' }}>
            Repeat for 4 cycles before taking a longer break.
          </span>
        </p>
      </header>

      <section style={styles.timerBox}>
        <div style={styles.statusText(isFocusTime)}>
          <span style={styles.statusDot(isFocusTime)}></span>
          {isFocusTime ? 'Focus Time' : 'Break Time'}
        </div>

        <div style={styles.timeDisplay(isFocusTime)}>
          {formatTime(timeLeft)}
        </div>

        <div style={styles.buttonGroup}>
          <button
            onClick={toggleTimer}
            style={styles.actionButton(isActive)}
          >
            {isActive ? 'Pause' : 'Start'}
          </button>
          <button
            onClick={resetTimer}
            style={styles.resetButton}
          >
            Reset
          </button>
        </div>
      </section>

      {showForm && (
        <div style={styles.formWrapper}>
          <SessionForm
            technique="pomodoro"
            duration={25}
            onSessionSubmit={handleSessionSubmit}
          />
        </div>
      )}

      <section style={styles.historySection}>
        <h2 style={styles.historyTitle}>Session History</h2>
        {sessions.length > 0 ? (
          <div style={styles.sessionList}>
            {sessions.map((session, index) => (
              <div key={index} style={styles.sessionItem}>
                <span>{session.technique}</span>
                <span>{session.focusLevel}</span>
              </div>
            ))}
          </div>
        ) : (
          <p style={styles.noSessions}>No sessions recorded yet</p>
        )}
      </section>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '2rem',
    backgroundColor: '#f8fafc',
    borderRadius: '16px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  title: {
    fontSize: '2.25rem',
    fontWeight: '800',
    marginBottom: '0.5rem',
    background: 'linear-gradient(90deg, #1e40af, #3b82f6)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
  },
  description: {
    color: '#4b5563',
    fontSize: '1.125rem',
    lineHeight: '1.75',
  },
  timerBox: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    marginBottom: '2rem',
    textAlign: 'center',
  },
  statusText: (isFocusTime) => ({
    fontSize: '1.25rem',
    fontWeight: '600',
    color: isFocusTime ? '#1e40af' : '#166534',
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
  }),
  statusDot: (isFocusTime) => ({
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    backgroundColor: isFocusTime ? '#3b82f6' : '#22c55e',
  }),
  timeDisplay: (isFocusTime) => ({
    fontSize: '5rem',
    fontWeight: '700',
    fontFamily: 'monospace',
    color: isFocusTime ? '#1e40af' : '#166534',
    margin: '1.5rem 0',
    textShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  }),
  buttonGroup: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
  },
  actionButton: (isActive) => ({
    padding: '0.75rem 1.5rem',
    backgroundColor: isActive ? '#ef4444' : '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
    minWidth: '120px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  }),
  resetButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#e2e8f0',
    color: '#4b5563',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
    minWidth: '120px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  },
  formWrapper: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  },
  historySection: {
    marginTop: '2rem',
    padding: '1.5rem',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  },
  historyTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: '1rem',
  },
  sessionList: {
    display: 'grid',
    gap: '0.75rem',
  },
  sessionItem: {
    padding: '0.75rem',
    backgroundColor: '#f8fafc',
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  noSessions: {
    color: '#64748b',
  },
};

export default Pomodoro;

