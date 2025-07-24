import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function StatsPanel({ sessions, onAddSession }) {
  // Calculate stats
  const totalSessions = sessions.length;
  const totalTime = sessions.reduce((acc, s) => acc + s.duration, 0);
  const focusCount = { Low: 0, Medium: 0, High: 0 };
  sessions.forEach((s) => focusCount[s.focusLevel]++);

  // Chart data
  const data = {
    labels: ['Low', 'Medium', 'High'],
    datasets: [{
      label: 'Focus Levels',
      data: [focusCount.Low, focusCount.Medium, focusCount.High],
      backgroundColor: ['#ef4444', '#f59e0b', '#10b981']
    }]
  };

  return (
    <div style={{
      padding: '1.5rem',
      backgroundColor: '#f8fafc',
      borderRadius: '0.5rem',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      marginBottom: '1.5rem'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1e293b' }}>📊 Study Analytics</h2>
        <button 
          onClick={onAddSession}
          style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '0.375rem',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          + Add Session
        </button>
      </div>
      
      <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <p style={{ color: '#64748b' }}><strong>Total Sessions:</strong> {totalSessions}</p>
          <p style={{ color: '#64748b' }}><strong>Total Time:</strong> {totalTime} minutes</p>
        </div>
        <div style={{ height: '150px' }}>
          <Bar data={data} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      </div>
    </div>
  );
}