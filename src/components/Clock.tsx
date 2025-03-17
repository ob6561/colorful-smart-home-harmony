
import React, { useState, useEffect } from 'react';

const Clock: React.FC = () => {
  const [time, setTime] = useState<Date>(new Date());
  const [colorPhase, setColorPhase] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    
    // Smoothly transition colors over time
    const colorTimer = setInterval(() => {
      setColorPhase(prev => (prev + 1) % 360);
    }, 10000);
    
    return () => {
      clearInterval(timer);
      clearInterval(colorTimer);
    };
  }, []);
  
  const formatTime = (date: Date): string => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    
    const formattedHours = hours % 12 || 12;
    const amPm = hours >= 12 ? 'PM' : 'AM';
    
    return `${formattedHours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${amPm}`;
  };
  
  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  };

  // Calculate color gradients based on time of day
  const getTimeBasedGradient = () => {
    const hour = time.getHours();
    
    if (hour >= 5 && hour < 10) {
      // Morning - Warm sunrise colors
      return 'linear-gradient(90deg, hsla(39, 100%, 77%, 1) 0%, hsla(22, 90%, 57%, 1) 100%)';
    } else if (hour >= 10 && hour < 17) {
      // Day - Blue sky colors
      return 'linear-gradient(90deg, hsla(186, 33%, 94%, 1) 0%, hsla(216, 41%, 79%, 1) 100%)';
    } else if (hour >= 17 && hour < 21) {
      // Evening - Sunset colors
      return 'linear-gradient(90deg, hsla(24, 100%, 83%, 1) 0%, hsla(341, 91%, 68%, 1) 100%)';
    } else {
      // Night - Deep blue colors
      return 'linear-gradient(90deg, hsla(221, 45%, 73%, 1) 0%, hsla(220, 78%, 29%, 1) 100%)';
    }
  };
  
  // Calculate a color for the time display based on color phase
  const getColorfulTimeDisplay = () => {
    return {
      background: `hsl(${colorPhase}, 80%, 60%)`,
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    };
  };
  
  return (
    <div 
      className="glass rounded-2xl p-6 mb-8 animate-scale-in backdrop-blur-lg border-white/40 shadow-xl"
      style={{ 
        background: getTimeBasedGradient(),
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
      }}
    >
      <div className="flex flex-col items-center text-white">
        <p className="text-sm font-medium opacity-90">{formatDate(time)}</p>
        <h2 
          className="text-4xl font-bold mt-2 tracking-tight"
          style={getColorfulTimeDisplay()}
        >
          {formatTime(time)}
        </h2>
      </div>
    </div>
  );
};

export default Clock;
