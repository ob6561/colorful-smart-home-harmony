
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Lightbulb, Fan, Thermometer, Droplets, Wind } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

// Mock data for initial chart rendering
const generateMockData = (baseValue: number, count: number, variance: number) => {
  return Array.from({ length: count }, (_, i) => ({
    time: new Date(Date.now() - (count - i) * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    value: Math.max(0, baseValue + Math.random() * variance * 2 - variance)
  }));
};

const Dashboard = () => {
  // State for environmental data
  const [temperature, setTemperature] = useState<{ time: string; value: number }[]>(
    generateMockData(24, 10, 2)
  );
  const [humidity, setHumidity] = useState<{ time: string; value: number }[]>(
    generateMockData(60, 10, 10)
  );
  const [airQuality, setAirQuality] = useState<{ time: string; value: number }[]>(
    generateMockData(800, 10, 200)
  );
  
  // Current values for display
  const [currentTemp, setCurrentTemp] = useState<number>(temperature[temperature.length - 1]?.value || 0);
  const [currentHumidity, setCurrentHumidity] = useState<number>(humidity[humidity.length - 1]?.value || 0);
  const [currentAirQuality, setCurrentAirQuality] = useState<number>(airQuality[airQuality.length - 1]?.value || 0);
  
  // Device control states
  const [lightIntensity, setLightIntensity] = useState<number>(0);
  const [fanSpeed, setFanSpeed] = useState<number>(0);
  const [connectionStatus, setConnectionStatus] = useState<string>("Connecting...");
  const [statusColor, setStatusColor] = useState<string>("text-amber-500");
  
  // Derived states for device status
  const isLightOn = lightIntensity > 0;
  const isFanOn = fanSpeed > 0;

  useEffect(() => {
    // WebSocket Connection logic
    let socket: WebSocket | null = null;
    
    try {
      socket = new WebSocket("ws://esp.local:81");
      
      socket.onopen = () => {
        setConnectionStatus("✅ Connected to ESP WebSocket");
        setStatusColor("text-green-500");
      };
      
      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          if (data.temp !== undefined) {
            const newTemp = parseFloat(data.temp);
            setCurrentTemp(newTemp);
            setTemperature(prev => [
              ...prev.slice(1),
              { time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), value: newTemp }
            ]);
          }
          
          if (data.humidity !== undefined) {
            const newHumidity = parseFloat(data.humidity);
            setCurrentHumidity(newHumidity);
            setHumidity(prev => [
              ...prev.slice(1),
              { time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), value: newHumidity }
            ]);
          }
          
          if (data.co2_ppm !== undefined) {
            const newAirQuality = parseFloat(data.co2_ppm);
            setCurrentAirQuality(newAirQuality);
            setAirQuality(prev => [
              ...prev.slice(1),
              { time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), value: newAirQuality }
            ]);
          }
        } catch (e) {
          console.error("Invalid data:", event.data);
        }
      };
      
      socket.onerror = () => {
        setConnectionStatus("❌ WebSocket Error");
        setStatusColor("text-red-500");
      };
      
      socket.onclose = () => {
        setConnectionStatus("Connection closed");
        setStatusColor("text-gray-500");
      };
    } catch (error) {
      console.error("WebSocket connection error:", error);
      setConnectionStatus("❌ Failed to connect");
      setStatusColor("text-red-500");
    }
    
    // Handle light intensity changes
    const handleLightChange = (value: number) => {
      setLightIntensity(value);
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send("led:" + value);
      }
    };

    // Handle fan speed changes
    const handleFanChange = (value: number) => {
      setFanSpeed(value);
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send("fan:" + value);
      }
    };
    
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);

  const handleLightChange = (value: number[]) => {
    const intensity = value[0];
    setLightIntensity(intensity);
    // In a real app, we would send this to the WebSocket here
    console.log("Sending light intensity:", intensity);
  };

  const handleFanChange = (value: number[]) => {
    const speed = value[0];
    setFanSpeed(speed);
    // In a real app, we would send this to the WebSocket here
    console.log("Sending fan speed:", speed);
  };
  
  // Chart configuration
  const chartConfig = {
    temperature: {
      label: 'Temperature',
      theme: { light: '#EF4444', dark: '#EF4444' }
    },
    humidity: {
      label: 'Humidity',
      theme: { light: '#3B82F6', dark: '#3B82F6' }
    },
    airQuality: {
      label: 'Air Quality',
      theme: { light: '#10B981', dark: '#10B981' }
    }
  };

  return (
    <div className="min-h-screen p-6 bg-background dark:bg-background">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-foreground">Smart Home Dashboard</h1>
          <p className={`text-sm ${statusColor}`}>{connectionStatus}</p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Temperature Card */}
          <Card className="overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center space-x-2">
                <Thermometer className="h-5 w-5 text-red-500" />
                <span>Temperature</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-2">
                <span className="text-2xl font-bold">{currentTemp.toFixed(1)}°C</span>
              </div>
              <div className="h-[180px]">
                <ChartContainer config={chartConfig}>
                  <AreaChart data={temperature}>
                    <defs>
                      <linearGradient id="temperatureGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <ChartTooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const value = Number(payload[0].value);
                          return (
                            <div className="bg-background border rounded p-2 shadow-lg">
                              <p>{`Time: ${payload[0].payload.time}`}</p>
                              <p className="text-red-500">{`Temperature: ${typeof value === 'number' ? value.toFixed(1) : value}°C`}</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      name="temperature"
                      stroke="#EF4444" 
                      fill="url(#temperatureGradient)" 
                    />
                  </AreaChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Humidity Card */}
          <Card className="overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center space-x-2">
                <Droplets className="h-5 w-5 text-blue-500" />
                <span>Humidity</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-2">
                <span className="text-2xl font-bold">{currentHumidity.toFixed(1)}%</span>
              </div>
              <div className="h-[180px]">
                <ChartContainer config={chartConfig}>
                  <AreaChart data={humidity}>
                    <defs>
                      <linearGradient id="humidityGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <ChartTooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const value = Number(payload[0].value);
                          return (
                            <div className="bg-background border rounded p-2 shadow-lg">
                              <p>{`Time: ${payload[0].payload.time}`}</p>
                              <p className="text-blue-500">{`Humidity: ${typeof value === 'number' ? value.toFixed(1) : value}%`}</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      name="humidity"
                      stroke="#3B82F6" 
                      fill="url(#humidityGradient)" 
                    />
                  </AreaChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Air Quality Card */}
          <Card className="overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center space-x-2">
                <Wind className="h-5 w-5 text-green-500" />
                <span>Air Quality (CO₂)</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-2">
                <span className="text-2xl font-bold">{currentAirQuality.toFixed(0)} ppm</span>
              </div>
              <div className="h-[180px]">
                <ChartContainer config={chartConfig}>
                  <AreaChart data={airQuality}>
                    <defs>
                      <linearGradient id="airQualityGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <ChartTooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const value = Number(payload[0].value);
                          return (
                            <div className="bg-background border rounded p-2 shadow-lg">
                              <p>{`Time: ${payload[0].payload.time}`}</p>
                              <p className="text-green-500">{`CO₂: ${typeof value === 'number' ? value.toFixed(0) : value} ppm`}</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      name="airQuality"
                      stroke="#10B981" 
                      fill="url(#airQualityGradient)" 
                    />
                  </AreaChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Light Control Card */}
          <Card className={`transition-all duration-300 ${isLightOn ? 'border-yellow-400 shadow-lg shadow-yellow-100 dark:shadow-yellow-900/20' : ''}`}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lightbulb className={`h-5 w-5 ${isLightOn ? 'text-yellow-400' : 'text-muted-foreground'}`} />
                <span>Light Control</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex justify-center">
                  <div className={`h-16 w-16 rounded-full flex items-center justify-center transition-all ${
                    isLightOn 
                      ? 'bg-gradient-to-r from-yellow-300 to-yellow-500 shadow-lg shadow-yellow-200 dark:shadow-yellow-800/30' 
                      : 'bg-gray-200 dark:bg-gray-800'
                  }`}>
                    <Lightbulb className={`h-8 w-8 ${isLightOn ? 'text-white' : 'text-gray-400'}`} />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Off</span>
                    <span className="text-sm font-medium">{lightIntensity}%</span>
                    <span className="text-sm text-muted-foreground">Max</span>
                  </div>
                  <Slider
                    value={[lightIntensity]}
                    max={100}
                    step={1}
                    className={isLightOn ? "accent-yellow-400" : ""}
                    onValueChange={handleLightChange}
                  />
                </div>
                
                <div className="mt-4">
                  <div className="text-sm text-muted-foreground mb-1">Brightness</div>
                  <Progress value={lightIntensity} className={`h-2 ${isLightOn ? 'bg-yellow-100 dark:bg-yellow-950' : ''}`}>
                    <div className={`h-full ${isLightOn ? 'bg-yellow-400' : 'bg-gray-400'} transition-all`}></div>
                  </Progress>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Fan Control Card */}
          <Card className={`transition-all duration-300 ${isFanOn ? 'border-purple-400 shadow-lg shadow-purple-100 dark:shadow-purple-900/20' : ''}`}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Fan className={`h-5 w-5 ${isFanOn ? 'text-purple-500 animate-spin' : 'text-muted-foreground'}`} 
                  style={{ animationDuration: isFanOn ? `${3 - (fanSpeed / 50)}s` : '0s' }} />
                <span>Fan Control</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex justify-center">
                  <div className={`h-16 w-16 rounded-full flex items-center justify-center transition-all ${
                    isFanOn 
                      ? 'bg-gradient-to-r from-purple-300 to-purple-500 shadow-lg shadow-purple-200 dark:shadow-purple-800/30' 
                      : 'bg-gray-200 dark:bg-gray-800'
                  }`}>
                    <Fan 
                      className={`h-8 w-8 ${isFanOn ? 'text-white animate-spin' : 'text-gray-400'}`} 
                      style={{ animationDuration: isFanOn ? `${3 - (fanSpeed / 50)}s` : '0s' }}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Off</span>
                    <span className="text-sm font-medium">{fanSpeed}%</span>
                    <span className="text-sm text-muted-foreground">Max</span>
                  </div>
                  <Slider
                    value={[fanSpeed]}
                    max={100}
                    step={1}
                    className={isFanOn ? "accent-purple-400" : ""}
                    onValueChange={handleFanChange}
                  />
                </div>
                
                <div className="mt-4">
                  <div className="text-sm text-muted-foreground mb-1">Fan Speed</div>
                  <Progress value={fanSpeed} className={`h-2 ${isFanOn ? 'bg-purple-100 dark:bg-purple-950' : ''}`}>
                    <div className={`h-full ${isFanOn ? 'bg-purple-400' : 'bg-gray-400'} transition-all`}></div>
                  </Progress>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
