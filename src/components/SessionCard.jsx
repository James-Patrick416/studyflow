export default function SessionCard({ session, onDelete, onEdit }) {
  const { id, technique, date, duration, focusLevel, notes } = session;

  return (
    <div style={{
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '16px',
      backgroundColor: 'white',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ margin: '0 0 8px 0', color: '#1e40af' }}>
        {technique.charAt(0).toUpperCase() + technique.slice(1)}
      </h3>
      <p style={{ margin: '4px 0', fontSize: '14px' }}>
        <strong>Date:</strong> {new Date(date).toLocaleString()}
      </p>
      <p style={{ margin: '4px 0', fontSize: '14px' }}>
        <strong>Duration:</strong> {duration} minutes
      </p>
      <p style={{ margin: '4px 0', fontSize: '14px' }}>
        <strong>Focus:</strong> {focusLevel}
      </p>
      <p style={{ margin: '4px 0 12px 0', fontSize: '14px' }}>
        <strong>Notes:</strong> {notes || 'No notes'}
      </p>
      
      <div style={{ display: 'flex', gap: '8px' }}>
        <button 
          onClick={() => onEdit(session)}
          style={{
            padding: '6px 12px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Edit
        </button>
        <button 
          onClick={() => onDelete(id)}
          style={{
            padding: '6px 12px',
            backgroundColor: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}