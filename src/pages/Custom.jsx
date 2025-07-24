import CustomTimer from '../components/CustomTimer';
import MusicPlayer from '../components/MusicPlayer';

export default function Custom() {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '2rem',
      padding: '2rem',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <div style={{
        backgroundColor: '#f8fafc',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{
          fontSize: '1.8rem',
          fontWeight: '600',
          color: '#1e293b',
          marginBottom: '1.5rem',
          textAlign: 'center'
        }}>Custom Study Session</h1>
        <CustomTimer />
      </div>
      
      <div style={{
        backgroundColor: '#f8fafc',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <MusicPlayer />
      </div>
    </div>
  );
}