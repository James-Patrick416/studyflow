import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale);

export default function StatsPanel({ sessions }) {
  const totalSessions = sessions.length;
  const totalTime = sessions.reduce((acc, s) => acc + s.duration, 0);

  const focusCount = {
    Low: 0,
    Medium: 0,
    High: 0
  };

  sessions.forEach((s) => {
    focusCount[s.focusLevel]++;
  });

  const data = {
    labels: ['Low', 'Medium', 'High'],
    datasets: [
      {
        label: 'Focus Levels',
        data: [focusCount.Low, focusCount.Medium, focusCount.High],
        backgroundColor: ['#f87171', '#facc15', '#4ade80']
      }
    ]
  };

  return (
    <div className="stats-panel mb-6">
      <h2 className="text-xl font-bold mb-2">📊 Study Stats</h2>
      <p><strong>Total Sessions:</strong> {totalSessions}</p>
      <p><strong>Total Time Studied:</strong> {totalTime} mins</p>
      <div className="w-full md:w-1/2 mt-4">
        <Bar data={data} />
      </div>
    </div>
  );
}

