
import React from 'react';
import { Home, Settings } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center py-6 px-2 animate-fade-in">
      <div className="flex items-center">
        <div className="bg-primary/10 p-2 rounded-xl mr-4">
          <Home className="text-primary w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Smart Home</h1>
          <p className="text-sm text-muted-foreground">Control your home devices</p>
        </div>
      </div>
      <button className="p-2 rounded-full hover:bg-secondary transition-colors">
        <Settings className="w-6 h-6 text-muted-foreground" />
      </button>
    </header>
  );
};

export default Header;
