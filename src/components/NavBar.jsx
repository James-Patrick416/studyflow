import { NavLink } from "react-router-dom";

export default function NavBar() {
    const navStyles = {
        navbar: {
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            padding: "1rem",
            backgroundColor: "#2c3e50",
            position: "sticky",
            top: 0,
            zIndex: 100
        },
        navLink: {
            color: "white",
            textDecoration: "none",
            padding: "0.5rem 1rem",
            borderRadius: "4px",
            transition: "all 0.3s ease"
        },
        navLinkHover: {
            backgroundColor: "#3498db",
            transform: "translateY(-2px)"
        },
        navLinkActive: {
            backgroundColor: "#2980b9",
            fontWeight: "bold"
        }
    };

    return (
        <nav style={navStyles.navbar}>
            <NavLink 
                to="/" 
                style={({ isActive }) => 
                    isActive 
                        ? { ...navStyles.navLink, ...navStyles.navLinkActive } 
                        : navStyles.navLink
                }
            >
                Home
            </NavLink>
            <NavLink 
                to="/pomodoro" 
                style={({ isActive }) => 
                    isActive 
                        ? { ...navStyles.navLink, ...navStyles.navLinkActive } 
                        : navStyles.navLink
                }
            >
                Pomodoro
            </NavLink>
            <NavLink 
                to="/custom" 
                style={({ isActive }) => 
                    isActive 
                        ? { ...navStyles.navLink, ...navStyles.navLinkActive } 
                        : navStyles.navLink
                }
            >
                Custom
            </NavLink>
            <NavLink 
                to="/deepwork" 
                style={({ isActive }) => 
                    isActive 
                        ? { ...navStyles.navLink, ...navStyles.navLinkActive } 
                        : navStyles.navLink
                }
            >
                Deep Work
            </NavLink>
            <NavLink 
                to="/stats" 
                style={({ isActive }) => 
                    isActive 
                        ? { ...navStyles.navLink, ...navStyles.navLinkActive } 
                        : navStyles.navLink
                }
            >
                Stats
            </NavLink>
        </nav>
    );
}

