import { NavLink } from "react-router-dom";

export default function NavBar() {
    return (
        <nav className="navbar">
            <NavLink to="/" className="nav-link">Home</NavLink>
            <NavLink to="/pomodoro" className="nav-link">Pomodoro</NavLink>
            <NavLink to="/custom" className="nav-link">Custom</NavLink>
            <NavLink to="/deepwork" className="nav-link">Deep Work</NavLink>
            <NavLink to="/stats" className="nav-link">Stats</NavLink>
        </nav>
    );
}

