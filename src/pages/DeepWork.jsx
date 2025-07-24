import DeepWorkTimer from '../components/DeepWorkTimer';

const DeepWork = () => {
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
          background: 'linear-gradient(90deg, #7c3aed, #a855f7)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          marginBottom: '0.5rem'
        }}>
          Deep Work Mode
        </h1>
        <p style={{
          color: '#4b5563',
          fontSize: '1.125rem',
          lineHeight: '1.75',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          Enter a 90-minute focused work session followed by a 30-minute break.
          <span style={{ display: 'block', marginTop: '0.5rem' }}>
            Minimize distractions and focus intensely on your task.
          </span>
        </p>
      </div>

      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '2rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}>
        <DeepWorkTimer />
      </div>

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
        }}>Deep Work Principles</h2>
        <ul style={{
          listStyleType: 'none',
          padding: 0,
          display: 'grid',
          gap: '0.75rem'
        }}>
          <li style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.5rem'
          }}>
            <span style={{
              color: '#7c3aed',
              fontWeight: 'bold'
            }}>•</span>
            <span>Work with intense focus for 90-minute blocks</span>
          </li>
          <li style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.5rem'
          }}>
            <span style={{
              color: '#7c3aed',
              fontWeight: 'bold'
            }}>•</span>
            <span>Eliminate all distractions (phone, email, notifications)</span>
          </li>
          <li style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.5rem'
          }}>
            <span style={{
              color: '#7c3aed',
              fontWeight: 'bold'
            }}>•</span>
            <span>Take 30-minute breaks between sessions</span>
          </li>
          <li style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.5rem'
          }}>
            <span style={{
              color: '#7c3aed',
              fontWeight: 'bold'
            }}>•</span>
            <span>Limit to 2-3 deep work sessions per day</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DeepWork;