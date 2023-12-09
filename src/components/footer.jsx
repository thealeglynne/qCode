import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import "../style/footer.css" // Import the CSS file for styling


// Define the Footer component as a functional component
const Footer = () => {
  return (
    // Footer container with the "footer" class
    <footer className="footer">
      <div className="footer-left">
        {/* Logo for the footer */}

        {/* Social media icons */}
        <div className="social-icons">
          <a href="https://facebook.com">
            {/* Facebook icon */}
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a href="https://instagram.com">
            {/* Instagram icon */}
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </div>

        {/* Horizontal line separator */}
        <hr className="footer-line" />

        {/* Copyright information */}
        {/* This section can be added here */}
      </div>

      <div className="footer-right">
        {/* List of buttons */}
        <ul className="footer-buttons">
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Topic</a></li>
         
          
          {/* Add more buttons as needed */}
        </ul>

        {/* Contact information */}
        <div className="contact-info">
            <p>Copyright © QCode 2023.</p>
         {/* Add more contact information as needed */}
        </div>
      </div>
    </footer>
  );
}

// Export the Footer component as thnpm starte default export
export default Footer;