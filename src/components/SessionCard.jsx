export default function SessionCard({ session, onDelete, onEdit }) {
  const { id, technique, date, duration, focusLevel, notes } = session;

  return (
    <div className="session-card border p-4 rounded shadow mb-4">
      <h3>{technique.toUpperCase()}</h3>
      <p><strong>Date:</strong> {date}</p>
      <p><strong>Duration:</strong> {duration} mins</p>
      <p><strong>Focus:</strong> {focusLevel}</p>
      <p><strong>Notes:</strong> {notes}</p>

      <div className="flex gap-2 mt-2">
        <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => onDelete(id)}>Delete</button>
        <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={() => onEdit(session)}>Edit</button>
      </div>
    </div>
  );
}
