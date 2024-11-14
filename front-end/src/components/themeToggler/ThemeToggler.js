import React, { useState, useEffect } from 'react';
import './ThemeToggler.css';

const ThemeToggler = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.body.classList.add('dark-mode');
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    } else {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    }
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="theme-toggler" onClick={toggleTheme}>
      <span className="material-icons-sharp">
        {isDarkMode ? 'dark_mode' : 'light_mode'}
      </span>
    </div>
  );
};

export default ThemeToggler;