import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Square, Wifi, Activity, AlertTriangle, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface NetworkCaptureProps {
  isCapturing: boolean;
  onToggleCapture: () => void;
}

interface PacketData {
  id: string;
  timestamp: string;
  source: string;
  destination: string;
  protocol: string;
  length: number;
  type: 'normal' | 'suspicious' | 'threat';
}

export const NetworkCapture: React.FC<NetworkCaptureProps> = ({ 
  isCapturing, 
  onToggleCapture 
}) => {
  const [packets, setPackets] = useState<PacketData[]>([]);
  const [stats, setStats] = useState({
    totalPackets: 0,
    suspiciousPackets: 0,
    threats: 0
  });
  const { toast } = useToast();

  // Simulate packet capture
  useEffect(() => {
    if (!isCapturing) return;

    const interval = setInterval(() => {
      const newPacket: PacketData = {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toLocaleTimeString(),
        source: `192.168.1.${Math.floor(Math.random() * 255)}`,
        destination: `192.168.1.${Math.floor(Math.random() * 255)}`,
        protocol: ['TCP', 'UDP', 'HTTP', 'HTTPS', 'DNS'][Math.floor(Math.random() * 5)],
        length: Math.floor(Math.random() * 1500) + 64,
        type: Math.random() > 0.9 ? 'suspicious' : Math.random() > 0.95 ? 'threat' : 'normal'
      };

      setPackets(prev => [newPacket, ...prev.slice(0, 99)]);
      setStats(prev => ({
        totalPackets: prev.totalPackets + 1,
        suspiciousPackets: prev.suspiciousPackets + (newPacket.type === 'suspicious' ? 1 : 0),
        threats: prev.threats + (newPacket.type === 'threat' ? 1 : 0)
      }));
    }, 500);

    return () => clearInterval(interval);
  }, [isCapturing]);

  const getPacketBadge = (type: string) => {
    switch (type) {
      case 'threat':
        return <Badge variant="destructive" className="text-xs">Threat</Badge>;
      case 'suspicious':
        return <Badge variant="secondary" className="text-xs bg-warning text-warning-foreground">Suspicious</Badge>;
      default:
        return <Badge variant="outline" className="text-xs">Normal</Badge>;
    }
  };

  const handleSaveCapture = () => {
    if (packets.length === 0) {
      toast({
        title: "No data to save",
        description: "Start capturing packets first",
        variant: "destructive"
      });
      return;
    }

    const captureData = {
      timestamp: new Date().toISOString(),
      totalPackets: stats.totalPackets,
      suspiciousPackets: stats.suspiciousPackets,
      threats: stats.threats,
      packets: packets
    };

    const blob = new Blob([JSON.stringify(captureData, null, 2)], {
      type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `network_capture_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Capture saved successfully",
      description: `Saved ${packets.length} packets to file`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Capture Controls */}
      <Card className="data-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Wifi className="w-5 h-5 text-primary" />
            <span>Live Network Capture</span>
          </CardTitle>
          <CardDescription>
            Monitor and analyze real-time network traffic
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant={isCapturing ? "destructive" : "cyber"}
                onClick={onToggleCapture}
                className="min-w-[120px]"
              >
                {isCapturing ? (
                  <>
                    <Square className="w-4 h-4 mr-2" />
                    Stop Capture
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Start Capture
                  </>
                )}
              </Button>
              {packets.length > 0 && (
                <Button 
                  variant="outline" 
                  onClick={handleSaveCapture}
                  className="min-w-[120px]"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Save Capture
                </Button>
              )}
              <div className="flex items-center space-x-2">
                <div className={`status-indicator ${isCapturing ? 'status-online' : 'status-offline'}`} />
                <span className="text-sm text-muted-foreground">
                  Interface: wlan0
                </span>
              </div>
            </div>
            
            <div className="flex space-x-6 text-sm">
              <div className="text-center">
                <div className="text-lg font-mono font-bold">{stats.totalPackets}</div>
                <div className="text-muted-foreground">Total</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-mono font-bold text-warning">{stats.suspiciousPackets}</div>
                <div className="text-muted-foreground">Suspicious</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-mono font-bold text-destructive">{stats.threats}</div>
                <div className="text-muted-foreground">Threats</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Packet Stream */}
      <Card className="data-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-primary" />
            <span>Packet Stream</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-96 overflow-y-auto font-mono text-sm">
            {packets.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                {isCapturing ? 'Waiting for packets...' : 'Start capture to see packet data'}
              </div>
            ) : (
              packets.map((packet) => (
                <div 
                  key={packet.id}
                  className={`p-3 rounded border-l-4 ${
                    packet.type === 'threat' 
                      ? 'border-l-destructive bg-destructive/5' 
                      : packet.type === 'suspicious'
                      ? 'border-l-warning bg-warning/5'
                      : 'border-l-primary/30 bg-muted/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className="text-muted-foreground">{packet.timestamp}</span>
                      <span>{packet.source}</span>
                      <span className="text-muted-foreground">→</span>
                      <span>{packet.destination}</span>
                      <Badge variant="outline" className="text-xs">
                        {packet.protocol}
                      </Badge>
                      {getPacketBadge(packet.type)}
                    </div>
                    <span className="text-muted-foreground text-xs">
                      {packet.length} bytes
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};