import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Pomodoro from './pages/Pomodoro';
import Custom from './pages/Custom';
import DeepWork from './pages/DeepWork';
import Stats from './pages/Stats';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <NavBar />
        
        <main className="main-content">
          <Routes>
            {/* Home Route - Welcome + Motivation */}
            <Route path="/" element={<Home />} />
            
            {/* Timer Routes */}
            <Route path="/pomodoro" element={<Pomodoro />} />
            <Route path="/custom" element={<Custom />} />
            <Route path="/deepwork" element={<DeepWork />} />
            
            {/* Stats Route */}
            <Route path="/stats" element={<Stats />} />
            
            {/* Optional: Fallback for 404 */}
            <Route path="*" element={<h2>404 - Page Not Found</h2>} />
          </Routes>
        </main>
        
        {/* Optional Footer can go here */}
      </div>
    </Router>
  );
}

export default App;