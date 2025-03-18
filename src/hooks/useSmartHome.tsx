
import { useState } from 'react';

export type DeviceType = 'light' | 'fan' | 'tv' | 'temperature' | 'security' | 'meter' | 'nightlamp';

export interface Device {
  id: string;
  name: string;
  type: DeviceType;
  active: boolean;
  room: string;
  subRoom?: string; // Added subRoom property
  intensity?: number; // For dimmable lights or fan speed
  meterData?: {
    watts: number;
    lastUpdated: string;
  };
}

export const useSmartHome = () => {
  const [devices, setDevices] = useState<Device[]>([
    // Living Room devices
    {
      id: 'light-1',
      name: 'Living Room Light',
      type: 'light',
      active: false,
      room: 'Living Room',
      intensity: 80,
      meterData: {
        watts: 24,
        lastUpdated: new Date().toISOString()
      }
    },
    {
      id: 'fan-1',
      name: 'Ceiling Fan',
      type: 'fan',
      active: false,
      room: 'Living Room',
      intensity: 50,
      meterData: {
        watts: 45,
        lastUpdated: new Date().toISOString()
      }
    },
    {
      id: 'tv-1',
      name: 'Smart TV',
      type: 'tv',
      active: false,
      room: 'Living Room',
      meterData: {
        watts: 120,
        lastUpdated: new Date().toISOString()
      }
    },
    {
      id: 'meter-1',
      name: 'Living Room Meter',
      type: 'meter',
      active: true,
      room: 'Living Room',
    },
    
    // Master Bedroom devices
    {
      id: 'light-2',
      name: 'Ceiling Light',
      type: 'light',
      active: false,
      room: 'Bedroom',
      subRoom: 'Master Bedroom',
      intensity: 75,
      meterData: {
        watts: 18,
        lastUpdated: new Date().toISOString()
      }
    },
    {
      id: 'light-3',
      name: 'Bedside Light',
      type: 'light',
      active: false,
      room: 'Bedroom',
      subRoom: 'Master Bedroom',
      intensity: 40,
      meterData: {
        watts: 8,
        lastUpdated: new Date().toISOString()
      }
    },
    {
      id: 'light-4',
      name: 'Closet Light',
      type: 'light',
      active: false,
      room: 'Bedroom',
      subRoom: 'Master Bedroom',
      intensity: 60,
      meterData: {
        watts: 12,
        lastUpdated: new Date().toISOString()
      }
    },
    {
      id: 'nightlamp-1',
      name: 'Night Lamp',
      type: 'nightlamp',
      active: false,
      room: 'Bedroom',
      subRoom: 'Master Bedroom',
      intensity: 20,
      meterData: {
        watts: 5,
        lastUpdated: new Date().toISOString()
      }
    },
    {
      id: 'meter-2',
      name: 'Master Bedroom Meter',
      type: 'meter',
      active: true,
      room: 'Bedroom',
      subRoom: 'Master Bedroom',
    },
    
    // Mid Room devices
    {
      id: 'light-5',
      name: 'Ceiling Light',
      type: 'light',
      active: false,
      room: 'Bedroom',
      subRoom: 'Mid Room',
      intensity: 70,
      meterData: {
        watts: 15,
        lastUpdated: new Date().toISOString()
      }
    },
    {
      id: 'light-6',
      name: 'Desk Light',
      type: 'light',
      active: false,
      room: 'Bedroom',
      subRoom: 'Mid Room',
      intensity: 50,
      meterData: {
        watts: 10,
        lastUpdated: new Date().toISOString()
      }
    },
    {
      id: 'light-7',
      name: 'Wall Light',
      type: 'light',
      active: false,
      room: 'Bedroom',
      subRoom: 'Mid Room',
      intensity: 40,
      meterData: {
        watts: 9,
        lastUpdated: new Date().toISOString()
      }
    },
    {
      id: 'nightlamp-2',
      name: 'Night Lamp',
      type: 'nightlamp',
      active: false,
      room: 'Bedroom',
      subRoom: 'Mid Room',
      intensity: 25,
      meterData: {
        watts: 5,
        lastUpdated: new Date().toISOString()
      }
    },
    {
      id: 'meter-3',
      name: 'Mid Room Meter',
      type: 'meter',
      active: true,
      room: 'Bedroom',
      subRoom: 'Mid Room',
    },
    
    // Children's Den devices
    {
      id: 'light-8',
      name: 'Ceiling Light',
      type: 'light',
      active: false,
      room: 'Bedroom',
      subRoom: 'Children\'s Den',
      intensity: 65,
      meterData: {
        watts: 14,
        lastUpdated: new Date().toISOString()
      }
    },
    {
      id: 'light-9',
      name: 'Study Light',
      type: 'light',
      active: false,
      room: 'Bedroom',
      subRoom: 'Children\'s Den',
      intensity: 80,
      meterData: {
        watts: 12,
        lastUpdated: new Date().toISOString()
      }
    },
    {
      id: 'light-10',
      name: 'Play Area Light',
      type: 'light',
      active: false,
      room: 'Bedroom',
      subRoom: 'Children\'s Den',
      intensity: 70,
      meterData: {
        watts: 16,
        lastUpdated: new Date().toISOString()
      }
    },
    {
      id: 'nightlamp-3',
      name: 'Night Lamp',
      type: 'nightlamp',
      active: false,
      room: 'Bedroom',
      subRoom: 'Children\'s Den',
      intensity: 15,
      meterData: {
        watts: 4,
        lastUpdated: new Date().toISOString()
      }
    },
    {
      id: 'meter-4',
      name: 'Children\'s Den Meter',
      type: 'meter',
      active: true,
      room: 'Bedroom',
      subRoom: 'Children\'s Den',
    },
    
    // Whole House devices
    {
      id: 'temp-1',
      name: 'Temperature Control',
      type: 'temperature',
      active: true,
      room: 'Whole House',
      intensity: 72,
      meterData: {
        watts: 850,
        lastUpdated: new Date().toISOString()
      }
    },
    {
      id: 'security-1',
      name: 'Security System',
      type: 'security',
      active: true,
      room: 'Whole House',
      meterData: {
        watts: 35,
        lastUpdated: new Date().toISOString()
      }
    }
  ]);

  const toggleDevice = (id: string) => {
    setDevices(prevDevices => 
      prevDevices.map(device => 
        device.id === id 
          ? { ...device, active: !device.active } 
          : device
      )
    );
  };

  const updateDeviceIntensity = (id: string, intensity: number) => {
    setDevices(prevDevices => 
      prevDevices.map(device => 
        device.id === id 
          ? { ...device, intensity } 
          : device
      )
    );
  };

  return {
    devices,
    toggleDevice,
    updateDeviceIntensity
  };
};
