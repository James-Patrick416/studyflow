import { useState, useEffect } from 'react';
import SessionCard from '../components/SessionCard';
import StatsPanel from '../components/StatsPanel';

export default function Stats() {
  const [sessions, setSessions] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newSession, setNewSession] = useState({
    technique: 'pomodoro',
    duration: 25,
    focusLevel: 'Medium',
    notes: ''
  });

  // Fetch all sessions
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await fetch("http://localhost:3001/sessions");
        if (!res.ok) throw new Error("Failed to fetch sessions");
        const data = await res.json();
        setSessions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSessions();
  }, []);

  // Create new session
  const handleCreate = async () => {
    try {
      const res = await fetch("http://localhost:3001/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newSession,
          date: new Date().toISOString(),
          id: Date.now()
        })
      });
      const data = await res.json();
      setSessions([data, ...sessions]);
      setNewSession({
        technique: 'pomodoro',
        duration: 25,
        focusLevel: 'Medium',
        notes: ''
      });
    } catch (err) {
      setError("Failed to create session");
    }
  };

  // Update session
  const handleUpdate = async (id, updates) => {
    try {
      const res = await fetch(`http://localhost:3001/sessions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates)
      });
      const updated = await res.json();
      setSessions(sessions.map(s => s.id === id ? updated : s));
    } catch (err) {
      setError("Failed to update session");
    }
  };

  // Delete session
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3001/sessions/${id}`, { method: "DELETE" });
      setSessions(sessions.filter(s => s.id !== id));
    } catch (err) {
      setError("Failed to delete session");
    }
  };

  const filteredSessions = sessions.filter(s =>
    s.technique.toLowerCase().includes(filter.toLowerCase()) ||
    s.notes.toLowerCase().includes(filter.toLowerCase())
  );

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading sessions...</div>;
  if (error) return <div style={{ color: 'red', padding: '2rem' }}>{error}</div>;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '1rem' }}>
      <StatsPanel sessions={sessions} onAddSession={() => document.getElementById('create-form')?.scrollIntoView()} />

      {/* Search and Filter */}
      <div style={{ margin: '1rem 0' }}>
        <input
          type="text"
          placeholder="🔍 Search sessions..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '1px solid #e2e8f0',
            borderRadius: '0.375rem'
          }}
        />
      </div>

      {/* Create Form */}
      <div
        id="create-form"
        style={{
          backgroundColor: '#f1f5f9',
          padding: '1rem',
          borderRadius: '0.5rem',
          margin: '1rem 0'
        }}
      >
        <h3 style={{ marginBottom: '0.5rem', fontWeight: '600' }}>Add New Session</h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem' }}>Technique</label>
            <select
              value={newSession.technique}
              onChange={(e) => setNewSession({ ...newSession, technique: e.target.value })}
              style={{ width: '100%', padding: '0.5rem' }}
            >
              <option value="pomodoro">Pomodoro</option>
              <option value="deepwork">Deep Work</option>
              <option value="custom">Custom</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem' }}>Focus Level</label>
            <select
              value={newSession.focusLevel}
              onChange={(e) => setNewSession({ ...newSession, focusLevel: e.target.value })}
              style={{ width: '100%', padding: '0.5rem' }}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>

        <div style={{ marginTop: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.25rem' }}>Notes</label>
          <textarea
            value={newSession.notes}
            onChange={(e) => setNewSession({ ...newSession, notes: e.target.value })}
            style={{ width: '100%', padding: '0.5rem', minHeight: '80px' }}
          />
        </div>

        <button
          onClick={handleCreate}
          style={{
            marginTop: '1rem',
            backgroundColor: '#3b82f6',
            color: 'white',
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: 'pointer'
          }}
        >
          Save Session
        </button>
      </div>

      {/* Sessions List */}
      <div style={{ marginTop: '2rem' }}>
        {filteredSessions.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#64748b' }}>No sessions found</p>
        ) : (
          filteredSessions.map(session => (
            <SessionCard
              key={session.id}
              session={session}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
              style={{ marginBottom: '1rem' }}
            />
          ))
        )}
      </div>
    </div>
  );
}
