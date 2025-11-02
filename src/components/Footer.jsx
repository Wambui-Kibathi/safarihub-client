import "../styles/main.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>© {new Date().getFullYear()} <span className="footer-brand">SafariHub</span>. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
