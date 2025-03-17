
import React from 'react';
import { Lightbulb, Fan, Tv, Thermometer, Lock } from 'lucide-react';
import { Device } from '../hooks/useSmartHome';
import { cn } from '../lib/utils';

interface DeviceCardProps {
  device: Device;
  onToggle: (id: string) => void;
  onIntensityChange?: (id: string, intensity: number) => void;
}

const DeviceCard: React.FC<DeviceCardProps> = ({ 
  device, 
  onToggle,
  onIntensityChange
}) => {
  const getIcon = () => {
    switch (device.type) {
      case 'light':
        return <Lightbulb className={`w-6 h-6 ${device.active ? 'text-white' : 'text-device-light/50'}`} />;
      case 'fan':
        return <Fan className={`w-6 h-6 ${device.active ? 'text-white animate-spin-slow' : 'text-device-fan/50'}`} />;
      case 'tv':
        return <Tv className={`w-6 h-6 ${device.active ? 'text-white' : 'text-device-tv/50'}`} />;
      case 'temperature':
        return <Thermometer className={`w-6 h-6 ${device.active ? 'text-white' : 'text-device-temp/50'}`} />;
      case 'security':
        return <Lock className={`w-6 h-6 ${device.active ? 'text-white' : 'text-device-security/50'}`} />;
      default:
        return <Lightbulb className="w-6 h-6" />;
    }
  };

  const getColor = () => {
    switch (device.type) {
      case 'light':
        return 'device-light';
      case 'fan':
        return 'device-fan';
      case 'tv':
        return 'device-tv';
      case 'temperature':
        return 'device-temp';
      case 'security':
        return 'device-security';
      default:
        return 'primary';
    }
  };

  const handleIntensityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onIntensityChange && device.intensity !== undefined) {
      onIntensityChange(device.id, parseInt(e.target.value, 10));
    }
  };

  return (
    <div 
      className={cn(
        "device-card glass animate-fade-in", 
        device.active && "active"
      )}
      style={{animationDelay: `${parseInt(device.id.split('-')[1]) * 100}ms`}}
    >
      <div 
        className={cn(
          "device-icon", 
          device.active 
            ? `bg-${getColor()} ${device.active && 'animate-pulse-glow'}` 
            : `bg-${getColor()}/10`
        )}
      >
        {getIcon()}
      </div>
      
      <div className="mb-3">
        <h3 className="font-medium">{device.name}</h3>
        <p className="text-xs text-muted-foreground">{device.room}</p>
      </div>
      
      {device.intensity !== undefined && device.active && (
        <div className="mb-4">
          <input
            type="range"
            min="1"
            max="100"
            value={device.intensity}
            onChange={handleIntensityChange}
            className={`w-full h-2 bg-${getColor()}/20 rounded-lg appearance-none cursor-pointer`}
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>Min</span>
            <span>{device.intensity}%</span>
            <span>Max</span>
          </div>
        </div>
      )}
      
      <button
        onClick={() => onToggle(device.id)}
        className={cn(
          "device-switch mt-2",
          device.active ? `bg-${getColor()}` : "bg-secondary"
        )}
      >
        <span
          className="device-switch-thumb"
          data-state={device.active ? "checked" : "unchecked"}
        />
      </button>
    </div>
  );
};

export default DeviceCard;
