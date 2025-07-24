import { Routes, Route } from 'react-router-dom';
import './styles/App.css';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Pomodoro from './pages/Pomodoro';
import Custom from './pages/Custom';
import DeepWork from './pages/DeepWork';
import Stats from './pages/Stats';

function App() {
  return (
    <div className="app-container">
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pomodoro" element={<Pomodoro />} />
          <Route path="/custom" element={<Custom />} />
          <Route path="/deepwork" element={<DeepWork />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="*" element={<h2>404 - Page Not Found</h2>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
