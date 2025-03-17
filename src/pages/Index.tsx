
import React from 'react';
import Header from '../components/Header';
import Clock from '../components/Clock';
import DeviceCard from '../components/DeviceCard';
import { useSmartHome } from '../hooks/useSmartHome';

const Index = () => {
  const { devices, toggleDevice, updateDeviceIntensity } = useSmartHome();
  
  return (
    <div className="min-h-screen px-6 py-6 max-w-6xl mx-auto">
      <Header />
      
      <main className="mt-6">
        <Clock />
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Quick Controls</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {devices.map(device => (
              <DeviceCard 
                key={device.id}
                device={device}
                onToggle={toggleDevice}
                onIntensityChange={updateDeviceIntensity}
              />
            ))}
          </div>
        </div>
      </main>
      
      <footer className="py-6 text-center text-sm text-muted-foreground">
        <p>Smart Home Management System © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default Index;
