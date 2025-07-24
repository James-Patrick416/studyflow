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

      <div className="session-history">
        <h2>Session History</h2>
        {sessions.length > 0 ? (
          <div className="sessions-list">
            {sessions.map((session, index) => (
              <div key={index} className="session-item">
                <span>{session.technique}</span>
                <span>{session.focusLevel}</span>
              </div>
            ))}
          </div>
        ) : (
          <p>No sessions recorded yet</p>
        )}
      </div>
    </div>
  );
};

export default Pomodoro;