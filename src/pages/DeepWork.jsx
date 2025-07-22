// src/pages/DeepWork.jsx
import DeepWorkTimer from '../components/DeepWorkTimer';

const DeepWork = () => {
  return (
    <div className="deep-work-page">
      <h1>Deep Work Session</h1>
      <p className="description">
        Enter a 90-minute focused work session followed by a 30-minute break.
        Minimize distractions and focus intensely on your task.
      </p>
      
      <DeepWorkTimer />
    </div>
  );
};

export default DeepWork;