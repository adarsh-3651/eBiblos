import { Link } from "react-router-dom";
import "./Footer.css";  // Ensure this import is correct

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-text">
          &copy; {new Date().getFullYear()} Your Website. All Rights Reserved.
        </p>
        <nav className="footer-nav">
          <Link to="/contact" className="footer-link">Contact Us</Link>
          <Link to="/terms" className="footer-link">Terms & Conditions</Link>
          <Link to="/account" className="footer-link">Account</Link>
          <Link to="/privacy" className="footer-link">Privacy Policy</Link>
        </nav>
      </div>
      <h2>Footer is Working!</h2>
    </footer>
  );
};

export default Footer;
