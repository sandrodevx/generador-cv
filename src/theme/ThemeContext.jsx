import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [savedThemes, setSavedThemes] = useState(() => {
    const saved = localStorage.getItem('savedThemes');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentTheme, setCurrentTheme] = useState({
    primary: '#4361ee',
    secondary: '#3f37c9',
    accent: '#4895ef',
    text: isDarkMode ? '#ffffff' : '#333333',
    background: isDarkMode ? '#1a1a1a' : '#ffffff',
    surface: isDarkMode ? '#2d2d2d' : '#f8f9fa',
    border: isDarkMode ? '#404040' : '#dee2e6',
    spacing: {
      section: '2rem',
      element: '1rem',
      text: '1.6'
    },
    fontSize: {
      h1: '2.5rem',
      h2: '2rem',
      h3: '1.75rem',
      body: '1rem',
      small: '0.875rem'
    },
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      bold: 700
    }
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    localStorage.setItem('savedThemes', JSON.stringify(savedThemes));
  }, [isDarkMode, savedThemes]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const saveTheme = (name, theme) => {
    setSavedThemes(prev => [...prev, { name, theme }]);
  };

  const applyTheme = (theme) => {
    setCurrentTheme(theme);
  };

  return (
    <ThemeContext.Provider value={{
      isDarkMode,
      toggleDarkMode,
      currentTheme,
      applyTheme,
      savedThemes,
      saveTheme
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 