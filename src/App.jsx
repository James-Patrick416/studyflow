import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Pomodoro from './pages/Pomodoro';
import Custom from './pages/Custom';
import DeepWork from './pages/DeepWork';
import Stats from './pages/Stats';

export default function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pomodoro" element={<Pomodoro />} />
        <Route path="/custom" element={<Custom />} />
        <Route path="/deepwork" element={<DeepWork />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </Router>
  );
}
