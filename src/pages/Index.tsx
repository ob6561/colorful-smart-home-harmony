
import React from 'react';
import Header from '../components/Header';
import Clock from '../components/Clock';
import DeviceCard from '../components/DeviceCard';
import { useSmartHome } from '../hooks/useSmartHome';

const Index = () => {
  const { devices, toggleDevice, updateDeviceIntensity } = useSmartHome();
  
  // Group devices by room and subRoom for hierarchical organization
  const devicesByRoomAndSubRoom = devices.reduce((acc, device) => {
    if (!acc[device.room]) {
      acc[device.room] = {
        devices: [],
        subRooms: {}
      };
    }
    
    if (device.subRoom) {
      if (!acc[device.room].subRooms[device.subRoom]) {
        acc[device.room].subRooms[device.subRoom] = [];
      }
      acc[device.room].subRooms[device.subRoom].push(device);
    } else {
      acc[device.room].devices.push(device);
    }
    
    return acc;
  }, {} as Record<string, { devices: typeof devices, subRooms: Record<string, typeof devices> }>);
  
  return (
    <div 
      className="min-h-screen px-6 py-6 max-w-6xl mx-auto bg-background dark:bg-background"
    >
      <Header />
      
      <main className="mt-6 animate-fade-in">
        <Clock />
        
        {Object.entries(devicesByRoomAndSubRoom).map(([room, { devices: roomDevices, subRooms }]) => (
          <div className="mb-10" key={room}>
            {/* Room header */}
            <div className="flex items-center mb-6">
              <div className="h-8 w-1 bg-gradient-to-b from-primary to-primary/30 rounded-full mr-3"></div>
              <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-200 dark:to-gray-400">
                {room}
              </h2>
            </div>
            
            {/* Main room devices */}
            {roomDevices.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 mb-8">
                {roomDevices.map(device => (
                  <DeviceCard 
                    key={device.id}
                    device={device}
                    onToggle={toggleDevice}
                    onIntensityChange={updateDeviceIntensity}
                  />
                ))}
              </div>
            )}
            
            {/* Sub-rooms */}
            {Object.keys(subRooms).length > 0 && (
              <div className="space-y-8 pl-5 border-l-2 border-primary/20">
                {Object.entries(subRooms).map(([subRoom, subRoomDevices]) => (
                  <div key={subRoom} className="mb-6">
                    <div className="flex items-center mb-4">
                      <div className="h-6 w-1 bg-gradient-to-b from-blue-400 to-blue-400/30 rounded-full mr-3"></div>
                      <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300">
                        {subRoom}
                      </h3>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
                      {subRoomDevices.map(device => (
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
              </div>
            )}
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
