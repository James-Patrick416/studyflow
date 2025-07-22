// src/components/SessionForm.jsx
import { useState } from 'react';

const SessionForm = ({ technique, duration, onSessionSubmit }) => {
  const [focusLevel, setFocusLevel] = useState('Medium');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const newSession = {
      technique,
      duration,
      focusLevel,
      notes,
      date: new Date().toISOString(),
    };

    try {
      const response = await fetch('http://localhost:3000/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSession),
      });

      if (!response.ok) {
        throw new Error('Failed to save session');
      }

      const savedSession = await response.json();
      onSessionSubmit(savedSession);
      
      // Reset form
      setFocusLevel('Medium');
      setNotes('');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="session-form">
      <h3>Session Feedback</h3>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Technique:</label>
          <input 
            type="text" 
            value={technique} 
            readOnly 
            className="disabled-input"
          />
        </div>
        
        <div className="form-group">
          <label>Duration (minutes):</label>
          <input 
            type="number" 
            value={duration} 
            readOnly 
            className="disabled-input"
          />
        </div>
        
        <div className="form-group">
          <label>Focus Level:</label>
          <select
            value={focusLevel}
            onChange={(e) => setFocusLevel(e.target.value)}
            required
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Notes:</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="How did your session go?"
          />
        </div>
        
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Session'}
        </button>
      </form>
    </div>
  );
};

export default SessionForm;