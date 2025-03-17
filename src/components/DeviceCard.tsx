
import React, { useState } from 'react';
import { Lightbulb, Fan, Tv, Thermometer, Lock } from 'lucide-react';
import { Device } from '../hooks/useSmartHome';
import { cn } from '../lib/utils';
import { Slider } from './ui/slider';

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
  const [isHovering, setIsHovering] = useState(false);
  
  const getIcon = () => {
    switch (device.type) {
      case 'light':
        return (
          <Lightbulb 
            className={`w-6 h-6 transition-all duration-300 ${device.active 
              ? 'text-white animate-pulse-glow' 
              : 'text-device-light/50'}`} 
          />
        );
      case 'fan':
        return (
          <Fan 
            className={`w-6 h-6 transition-all duration-300 ${device.active 
              ? 'text-white animate-spin-slow' 
              : 'text-device-fan/50'}`} 
          />
        );
      case 'tv':
        return (
          <Tv 
            className={`w-6 h-6 transition-all duration-300 ${device.active 
              ? 'text-white' 
              : 'text-device-tv/50'}`} 
          />
        );
      case 'temperature':
        return (
          <Thermometer 
            className={`w-6 h-6 transition-all duration-300 ${device.active 
              ? 'text-white' 
              : 'text-device-temp/50'}`} 
          />
        );
      case 'security':
        return (
          <Lock 
            className={`w-6 h-6 transition-all duration-300 ${device.active 
              ? 'text-white' 
              : 'text-device-security/50'}`} 
          />
        );
      default:
        return <Lightbulb className="w-6 h-6" />;
    }
  };

  const getBackgroundStyle = () => {
    if (!device.active) return {};
    
    switch (device.type) {
      case 'light':
        return { background: 'linear-gradient(90deg, #0EA5E9, #38BDF8)' };
      case 'fan':
        return { background: 'linear-gradient(90deg, #8B5CF6, #A78BFA)' };
      case 'tv':
        return { background: 'linear-gradient(90deg, #F97316, #FB923C)' };
      case 'temperature':
        return { background: 'linear-gradient(90deg, #EF4444, #FCA5A5)' };
      case 'security':
        return { background: 'linear-gradient(90deg, #10B981, #6EE7B7)' };
      default:
        return {};
    }
  };

  const getIconBackgroundClass = () => {
    const baseClass = "device-icon transition-all duration-300";
    
    if (!device.active) {
      return `${baseClass} bg-${getColor()}/10`;
    }
    
    switch (device.type) {
      case 'light':
        return `${baseClass} bg-device-light shadow-lg shadow-device-light/30`;
      case 'fan':
        return `${baseClass} bg-device-fan shadow-lg shadow-device-fan/30`;
      case 'tv':
        return `${baseClass} bg-device-tv shadow-lg shadow-device-tv/30`;
      case 'temperature':
        return `${baseClass} bg-device-temp shadow-lg shadow-device-temp/30`;
      case 'security':
        return `${baseClass} bg-device-security shadow-lg shadow-device-security/30`;
      default:
        return `${baseClass} bg-primary`;
    }
  };

  const getColor = () => {
    switch (device.type) {
      case 'light': return 'device-light';
      case 'fan': return 'device-fan';
      case 'tv': return 'device-tv';
      case 'temperature': return 'device-temp';
      case 'security': return 'device-security';
      default: return 'primary';
    }
  };

  const handleIntensityChange = (value: number[]) => {
    if (onIntensityChange && device.intensity !== undefined) {
      onIntensityChange(device.id, value[0]);
    }
  };

  return (
    <div 
      className={cn(
        "device-card glass animate-fade-in relative overflow-hidden", 
        device.active && "active hover:scale-105",
        !device.active && "hover:border-gray-300"
      )}
      style={{
        ...getBackgroundStyle(),
        animationDelay: `${parseInt(device.id.split('-')[1]) * 100}ms`,
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {device.active && (
        <div className="absolute inset-0 bg-white opacity-10 rounded-2xl transform origin-center scale-105 animate-pulse-glow"></div>
      )}
      
      <div className={getIconBackgroundClass()}>
        {getIcon()}
      </div>
      
      <div className="mb-3">
        <h3 className={cn(
          "font-medium transition-colors duration-300",
          device.active && "text-white"
        )}>
          {device.name}
        </h3>
        <p className={cn(
          "text-xs transition-colors duration-300",
          device.active ? "text-white/80" : "text-muted-foreground"
        )}>
          {device.room}
        </p>
      </div>
      
      {device.intensity !== undefined && device.active && (
        <div className="mb-4">
          <Slider
            defaultValue={[device.intensity]}
            max={100}
            step={1}
            value={[device.intensity]}
            onValueChange={handleIntensityChange}
            className="mb-2"
          />
          <div className="flex justify-between text-xs text-white/80 mt-1">
            <span>Min</span>
            <span className="font-medium">{device.intensity}%</span>
            <span>Max</span>
          </div>
        </div>
      )}
      
      <button
        onClick={() => onToggle(device.id)}
        className={cn(
          "device-switch mt-2 transition-all duration-300",
          device.active ? 
            `bg-white shadow-md` : 
            "bg-secondary"
        )}
      >
        <span
          className={cn(
            "device-switch-thumb",
            device.active ? `bg-${getColor()} shadow-md` : "bg-white"
          )}
          data-state={device.active ? "checked" : "unchecked"}
        />
      </button>
    </div>
  );
};

export default DeviceCard;
