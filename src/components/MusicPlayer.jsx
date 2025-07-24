import { useState, useRef, useEffect } from 'react';
// Directly import your music files
import track1 from '../assets/music/1.mp3';
import track2 from '../assets/music/2.mp3';
import track3 from '../assets/music/3.mp3';

const musicTracks = [
  { id: 1, title: 'Focus Mix 1', file: track1 },
  { id: 2, title: 'Classical Study', file: track2 },
  { id: 3, title: 'Nature Sounds', file: track3 }
];

export default function MusicPlayer() {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const audioRef = useRef(null);

  // Handle volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Handle play/pause
  useEffect(() => {
    if (!audioRef.current) return;

    const playPromise = isPlaying ? audioRef.current.play() : audioRef.current.pause();
    
    if (isPlaying && playPromise !== undefined) {
      playPromise.catch(error => {
        console.error("Playback failed:", error);
        setIsPlaying(false);
      });
    }
  }, [isPlaying]);

  // Handle track changes
  useEffect(() => {
    if (currentTrack && audioRef.current) {
      audioRef.current.src = currentTrack.file;
      if (isPlaying) {
        audioRef.current.play()
          .catch(error => console.error("Playback failed:", error));
      }
    }
  }, [currentTrack]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleTrackSelect = (track) => {
    // If same track is selected, toggle play/pause
    if (currentTrack && currentTrack.id === track.id) {
      togglePlay();
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
    }}>
      <h2 style={{
        fontSize: '1.5rem',
        fontWeight: '600',
        color: '#1e293b',
        marginBottom: '0.5rem'
      }}>Study Music</h2>
      
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        {musicTracks.map(track => (
          <div 
            key={track.id}
            onClick={() => handleTrackSelect(track)}
            style={{
              padding: '1rem',
              backgroundColor: currentTrack?.id === track.id ? '#e0f2fe' : '#fff',
              borderRadius: '8px',
              cursor: 'pointer',
              border: '1px solid #e2e8f0',
              transition: 'all 0.2s'
            }}
          >
            {track.title}
          </div>
        ))}
      </div>

      {currentTrack && (
        <div style={{
          marginTop: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <button 
              onClick={togglePlay}
              style={{
                padding: '0.75rem',
                borderRadius: '50%',
                border: 'none',
                backgroundColor: '#3b82f6',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {isPlaying ? '⏸' : '⏵'}
            </button>
            <span style={{ fontWeight: '500' }}>{currentTrack.title}</span>
          </div>
          
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            style={{ width: '100%' }}
          />
          
          <audio
            ref={audioRef}
            src={currentTrack.file}
            loop
            style={{ display: 'none' }}
            onEnded={() => setIsPlaying(false)}
          />
        </div>
      )}
    </div>
  );
}