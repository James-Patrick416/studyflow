import { useEffect, useState } from 'react';
import SessionCard from '../components/SessionCard';
import StatsPanel from '../components/StatsPanel';

export default function Stats() {
  const [sessions, setSessions] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 //fetch data
  useEffect(() => {
    fetch("http://localhost:3001/sessions")
      .then((res) => res.json())
      .then((data) => {
        setSessions(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Something went wrong...");
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/sessions/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setSessions(sessions.filter((s) => s.id !== id));
      });
  };

  const handleEdit = (updatedSession) => {
    const newNotes = prompt("Edit your notes:", updatedSession.notes);
    if (!newNotes) return;

    const newSession = { ...updatedSession, notes: newNotes };

    fetch(`http://localhost:3001/sessions/${updatedSession.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newSession),
    })
      .then(res => res.json())
      .then((data) => {
        setSessions(sessions.map((s) => s.id === data.id ? data : s));
      });
  };

  const filteredSessions = sessions.filter((s) =>
    s.technique.toLowerCase().includes(filter.toLowerCase()) ||
    s.notes.toLowerCase().includes(filter.toLowerCase())
  );

  if (loading) return <p>Loading sessions...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="stats-page p-4">
      <StatsPanel sessions={sessions} />
      
      <input
        type="text"
        placeholder="Search technique or notes..."
        className="p-2 border mb-4 w-full"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      {filteredSessions.map((session) => (
        <SessionCard
          key={session.id}
          session={session}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      ))}
    </div>
  );
}
