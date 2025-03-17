
import { useState } from 'react';

export type DeviceType = 'light' | 'fan' | 'tv' | 'temperature' | 'security';

export interface Device {
  id: string;
  name: string;
  type: DeviceType;
  active: boolean;
  room: string;
  intensity?: number; // For dimmable lights or fan speed
}

export const useSmartHome = () => {
  const [devices, setDevices] = useState<Device[]>([
    {
      id: 'light-1',
      name: 'Living Room Light',
      type: 'light',
      active: false,
      room: 'Living Room',
      intensity: 80
    },
    {
      id: 'light-2',
      name: 'Bedroom Light',
      type: 'light',
      active: false,
      room: 'Bedroom',
      intensity: 60
    },
    {
      id: 'fan-1',
      name: 'Ceiling Fan',
      type: 'fan',
      active: false,
      room: 'Living Room',
      intensity: 50
    },
    {
      id: 'tv-1',
      name: 'Smart TV',
      type: 'tv',
      active: false,
      room: 'Living Room'
    },
    {
      id: 'temp-1',
      name: 'Temperature Control',
      type: 'temperature',
      active: true,
      room: 'Whole House',
      intensity: 72
    },
    {
      id: 'security-1',
      name: 'Security System',
      type: 'security',
      active: true,
      room: 'Whole House'
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
