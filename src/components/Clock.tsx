
import React, { useState, useEffect } from 'react';

const Clock: React.FC = () => {
  const [time, setTime] = useState<Date>(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    
    return () => {
      clearInterval(timer);
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
  
  return (
    <div className="glass rounded-2xl p-6 mb-6 animate-scale-in">
      <div className="flex flex-col items-center">
        <p className="text-sm font-medium text-muted-foreground">{formatDate(time)}</p>
        <h2 className="text-4xl font-bold text-primary mt-2 tracking-tight">{formatTime(time)}</h2>
      </div>
    </div>
  );
};

export default Clock;
