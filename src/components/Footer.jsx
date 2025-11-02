import { FaHeart } from "react-icons/fa";
import "../styles/main.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>© {new Date().getFullYear()} <span className="footer-brand">SafariHub</span>. Made with <FaHeart className="icon-small" /> All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
