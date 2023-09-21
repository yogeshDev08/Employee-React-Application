import React, { useState, useMemo } from 'react';
import './App.css';
import Router from './Router/Router';
import ToggleTheme from './Component/ToggleTheme';
import { ThemeProvider } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import DarkTheme from './Theme/DarkMode';
import GradientTheme from './Theme/GradientTheme';
import SystemDefault from './Theme/SystemDefaultTheme';
import WarmCoolTheme from './Theme/WarmCoolTheme';

function App() {
  const currentTheme = useSelector((state: any) => state.employee.theme)
  console.log("🚀 ~ file: App.tsx:14 ~ App ~ currentTheme:", currentTheme)
  const [theme, setTheme] = useState(SystemDefault)

  const getTheme = () => {
    switch (currentTheme) {
      case 'System Default Theme':
        return SystemDefault;
      case 'Gradient Theme':
        return GradientTheme;
      case 'Dark Theme':
        return DarkTheme;
      case 'Warm Theme':
        return WarmCoolTheme;
      default:
        return SystemDefault; // Default to light theme
    }
  }

  useMemo(() => setTheme(getTheme()), [currentTheme])
      
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <ToggleTheme />
        <Router />
      </div>
    </ThemeProvider>
  );
}

export default App;
