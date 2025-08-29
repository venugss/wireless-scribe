import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { NetworkCapture } from './NetworkCapture';
import { DatasetUpload } from './DatasetUpload';
import { AnalysisResults } from './AnalysisResults';
import { ForensicReport } from './ForensicReport';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Activity, 
  Upload, 
  Play, 
  Square, 
  Download, 
  AlertTriangle,
  Shield,
  Wifi,
  Database,
  Settings,
  LogOut,
  FileText
} from 'lucide-react';

interface DashboardProps {
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [isCapturing, setIsCapturing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const stats = {
    totalPackets: 15742,
    threatsDetected: 23,
    activeConnections: 156,
    captureTime: '2h 14m'
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg cyber-glow flex items-center justify-center">
              <Shield className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">
                Integrated Wireless Network Forensic Analysis
              </h1>
              <p className="text-sm text-muted-foreground">
                Advanced Wireless Analysis System
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className={`status-indicator ${isCapturing ? 'status-online' : 'status-offline'}`} />
              <span className="text-sm text-muted-foreground">
                {isCapturing ? 'Capturing' : 'Idle'}
              </span>
            </div>
            <Button variant="ghost" size="sm" onClick={onLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-muted">
            <TabsTrigger value="overview" className="data-v-[state=active]:bg-primary">
              <Activity className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="capture">
              <Wifi className="w-4 h-4 mr-2" />
              Live Capture
            </TabsTrigger>
            <TabsTrigger value="dataset">
              <Database className="w-4 h-4 mr-2" />
              Dataset Analysis
            </TabsTrigger>
            <TabsTrigger value="results">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Results
            </TabsTrigger>
            <TabsTrigger value="report">
              <FileText className="w-4 h-4 mr-2" />
              Report
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="data-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Packets</CardTitle>
                  <Activity className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalPackets.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    +12% from last session
                  </p>
                </CardContent>
              </Card>
              
              <Card className="data-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Threats Detected</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-destructive">{stats.threatsDetected}</div>
                  <p className="text-xs text-muted-foreground">
                    3 critical, 20 medium
                  </p>
                </CardContent>
              </Card>
              
              <Card className="data-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Connections</CardTitle>
                  <Wifi className="h-4 w-4 text-success" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.activeConnections}</div>
                  <p className="text-xs text-muted-foreground">
                    Across 8 access points
                  </p>
                </CardContent>
              </Card>
              
              <Card className="data-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Capture Time</CardTitle>
                  <Activity className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.captureTime}</div>
                  <p className="text-xs text-muted-foreground">
                    Current session
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="data-card">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Start network analysis or upload existing datasets
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-4">
                <Button 
                  variant="cyber" 
                  onClick={() => setActiveTab('capture')}
                >
                  <Play className="w-4 h-4 mr-2" />
                  Start Live Capture
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setActiveTab('dataset')}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Dataset
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export Report
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="capture">
            <NetworkCapture 
              isCapturing={isCapturing}
              onToggleCapture={() => setIsCapturing(!isCapturing)}
            />
          </TabsContent>

          <TabsContent value="dataset">
            <DatasetUpload />
          </TabsContent>

          <TabsContent value="results">
            <AnalysisResults />
          </TabsContent>

          <TabsContent value="report">
            <ForensicReport />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};