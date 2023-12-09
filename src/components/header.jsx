// Import React and useState from the 'react' library
import React, { useState } from 'react';

// Import the CSS file for styling (make sure to adjust the path as needed)
import '../style/header.css';
import ImgLogo  from "../img/logo-horizontal.webp"
// Import the image for the logo (adjust the path accordingly)


// Define a functional component named Header
function Header() {
  // Use the 'useState' hook to manage the 'menuOpen' state
  const [menuOpen, setMenuOpen] = useState(false);

  // Function to toggle the menu state (open/close)
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Render the header component
  return (
    <header>
       <div className='divContainer'>
          {/* Display the logo */}
          <img 
          className='logoã'
             src={ImgLogo}
          />
        </div>
      <nav>
     
        
        {/* Button to toggle the menu on smaller screens */}
        <button className={`menu-button ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <span className="menu-icon">&#9776;</span> {/* Hamburger icon */}
        </button>

        {/* Main menu */}
        <ul className={`menu ${menuOpen ? 'open' : ''}`}>
          <li><a href="https://www.linkedin.com/in/alexander-quiroga-90a781245/" target='_Blank'>Linkedin</a></li>
          <li><a href="https://thealeglynne.github.io/GLYNNE-HOME/"  target='_Blank'>Web</a></li>
          <li><a href="https://github.com/thealeglynne" target='_Blank'>Github</a></li>
          <li><a href="https://www.instagram.com/thealexglynne/"  target='_Blank'>Instagram</a></li>
          <li><a href="https://www.instagram.com/thealexglynne/"  target='_Blank'></a></li>
           </ul>
       
      </nav>
    </header>
  );
}

// Export the Header component as the default export
export default Header;