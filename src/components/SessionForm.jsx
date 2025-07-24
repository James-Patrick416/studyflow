import { useState } from 'react';

const SessionForm = ({ technique, duration, onSessionSubmit }) => {
  const [formData, setFormData] = useState({
    focusLevel: 'Medium',
    notes: '',
    isSubmitting: false,
    error: null
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormData(prev => ({ ...prev, isSubmitting: true, error: null }));

    const newSession = {
      technique,
      duration,
      focusLevel: formData.focusLevel,
      notes: formData.notes,
      date: new Date().toISOString(),
      id: Date.now() // Temporary ID for optimistic updates
    };

    try {
      const response = await fetch('http://localhost:3001/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSession)
      });

      if (!response.ok) throw new Error('Failed to save session');
      
      const savedSession = await response.json();
      onSessionSubmit(savedSession);
      
      // Reset form on success
      setFormData({
        focusLevel: 'Medium',
        notes: '',
        isSubmitting: false,
        error: null
      });

    } catch (err) {
      setFormData(prev => ({ 
        ...prev, 
        isSubmitting: false, 
        error: err.message 
      }));
    }
  };

  return (
    <div style={{
      backgroundColor: '#ffffff',
      padding: '1.5rem',
      borderRadius: '0.5rem',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      marginTop: '1.5rem'
    }}>
      <h3 style={{
        fontSize: '1.25rem',
        fontWeight: '600',
        color: '#1e293b',
        marginBottom: '1rem'
      }}>Session Feedback</h3>
      
      {formData.error && (
        <div style={{
          color: '#ef4444',
          backgroundColor: '#fee2e2',
          padding: '0.5rem',
          borderRadius: '0.25rem',
          marginBottom: '1rem'
        }}>
          {formData.error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
        <div style={{ display: 'grid', gap: '0.5rem' }}>
          <label style={{ fontWeight: '500', color: '#374151' }}>Technique</label>
          <input 
            type="text" 
            value={technique} 
            readOnly
            style={{
              padding: '0.5rem',
              border: '1px solid #e5e7eb',
              borderRadius: '0.375rem',
              backgroundColor: '#f9fafb'
            }}
          />
        </div>
        
        <div style={{ display: 'grid', gap: '0.5rem' }}>
          <label style={{ fontWeight: '500', color: '#374151' }}>Duration (minutes)</label>
          <input 
            type="number" 
            value={duration} 
            readOnly
            style={{
              padding: '0.5rem',
              border: '1px solid #e5e7eb',
              borderRadius: '0.375rem',
              backgroundColor: '#f9fafb'
            }}
          />
        </div>
        
        <div style={{ display: 'grid', gap: '0.5rem' }}>
          <label style={{ fontWeight: '500', color: '#374151' }}>Focus Level</label>
          <select
            value={formData.focusLevel}
            onChange={(e) => setFormData(prev => ({ ...prev, focusLevel: e.target.value }))}
            required
            style={{
              padding: '0.5rem',
              border: '1px solid #e5e7eb',
              borderRadius: '0.375rem'
            }}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        
        <div style={{ display: 'grid', gap: '0.5rem' }}>
          <label style={{ fontWeight: '500', color: '#374151' }}>Notes</label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
            placeholder="How did your session go?"
            style={{
              padding: '0.5rem',
              border: '1px solid #e5e7eb',
              borderRadius: '0.375rem',
              minHeight: '80px'
            }}
          />
        </div>
        
        <button 
          type="submit" 
          disabled={formData.isSubmitting}
          style={{
            padding: '0.75rem',
            backgroundColor: formData.isSubmitting ? '#9ca3af' : '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            fontWeight: '600',
            cursor: formData.isSubmitting ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.2s'
          }}
        >
          {formData.isSubmitting ? 'Saving...' : 'Save Session'}
        </button>
      </form>
    </div>
  );
};

export default SessionForm;