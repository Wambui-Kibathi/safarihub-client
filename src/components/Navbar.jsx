import { Link } from "react-router-dom";
import "../styles/main.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>SafariHub</h1>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/destinations">Destinations</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
