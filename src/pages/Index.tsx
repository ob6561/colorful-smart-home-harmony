
import React from 'react';
import Header from '../components/Header';
import Clock from '../components/Clock';
import DeviceCard from '../components/DeviceCard';
import { useSmartHome } from '../hooks/useSmartHome';

const Index = () => {
  const { devices, toggleDevice, updateDeviceIntensity } = useSmartHome();
  
  // Group devices by room for better organization
  const devicesByRoom = devices.reduce((acc, device) => {
    if (!acc[device.room]) {
      acc[device.room] = [];
    }
    acc[device.room].push(device);
    return acc;
  }, {} as Record<string, typeof devices>);
  
  return (
    <div 
      className="min-h-screen px-6 py-6 max-w-6xl mx-auto bg-background dark:bg-background"
    >
      <Header />
      
      <main className="mt-6 animate-fade-in">
        <Clock />
        
        {Object.entries(devicesByRoom).map(([room, roomDevices]) => (
          <div className="mb-10" key={room}>
            <div className="flex items-center mb-4">
              <div className="h-8 w-1 bg-gradient-to-b from-primary to-primary/30 rounded-full mr-3"></div>
              <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-200 dark:to-gray-400">
                {room}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
              {roomDevices.map(device => (
                <DeviceCard 
                  key={device.id}
                  device={device}
                  onToggle={toggleDevice}
                  onIntensityChange={updateDeviceIntensity}
                />
              ))}
            </div>
          </div>
        ))}
      </main>
      
      <footer className="py-8 text-center text-sm text-muted-foreground mt-8 border-t border-gray-200 dark:border-gray-800">
        <p className="opacity-70 hover:opacity-100 transition-opacity">
          Smart Home Management System © {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
};

export default Index;
