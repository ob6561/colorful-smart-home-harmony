
import React, { useState } from 'react';
import { Home, Settings, Activity, BarChart4, Sun, Moon } from 'lucide-react';

const Header: React.FC = () => {
  const [isSettingsHovered, setIsSettingsHovered] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle('dark', newMode);
  };
  
  return (
    <header className="flex justify-between items-center py-6 px-2 animate-fade-in">
      <div className="flex items-center">
        <div className="bg-gradient-to-br from-primary to-primary/50 p-3 rounded-2xl mr-4 shadow-lg shadow-primary/20 animate-pulse-glow">
          <Home className="text-white w-6 h-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
            Smart Home
          </h1>
          <p className="text-sm text-muted-foreground">Control your home devices</p>
        </div>
      </div>
      
      <div className="flex gap-3">
        <button 
          className="p-2.5 rounded-full bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-700 shadow-sm transition-all hover:shadow-md"
          onClick={toggleDarkMode}
        >
          {isDarkMode ? 
            <Sun className="w-5 h-5 text-amber-400" /> : 
            <Moon className="w-5 h-5 text-primary" />
          }
        </button>
        <button className="p-2.5 rounded-full bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-700 shadow-sm transition-all hover:shadow-md">
          <Activity className="w-5 h-5 text-primary dark:text-blue-400" />
        </button>
        <button className="p-2.5 rounded-full bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-700 shadow-sm transition-all hover:shadow-md">
          <BarChart4 className="w-5 h-5 text-primary dark:text-blue-400" />
        </button>
        <button 
          className={`p-2.5 rounded-full transition-all duration-300 ${
            isSettingsHovered 
              ? 'bg-primary text-white rotate-45 scale-110 shadow-md shadow-primary/30' 
              : 'bg-white/80 dark:bg-gray-800/80 text-muted-foreground hover:bg-white dark:hover:bg-gray-700 shadow-sm'
          }`}
          onMouseEnter={() => setIsSettingsHovered(true)}
          onMouseLeave={() => setIsSettingsHovered(false)}
        >
          <Settings className={`w-5 h-5 transition-all duration-300 ${isSettingsHovered ? 'animate-spin-slow' : ''}`} />
        </button>
      </div>
    </header>
  );
};

export default Header;
