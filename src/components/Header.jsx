import { useEffect, useState } from "react";
import '../style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <header>
      <h1>Where in the world?</h1>
      <button id="toggleTheme" onClick={toggleTheme}>
        <FontAwesomeIcon icon={faMoon} className="toggle-icon" />
        <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
      </button>
    </header>
  );
};

export default Header;
