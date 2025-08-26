import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  AlertTriangle, 
  Shield, 
  Activity, 
  Download, 
  Eye,
  FileText,
  BarChart3,
  Network
} from 'lucide-react';

interface ThreatData {
  id: string;
  type: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  source: string;
  destination: string;
  timestamp: string;
  details: string;
}

interface AnalysisMetrics {
  totalPackets: number;
  maliciousPackets: number;
  uniqueIPs: number;
  protocols: { name: string; count: number; percentage: number }[];
  threatsByType: { type: string; count: number }[];
}

export const AnalysisResults: React.FC = () => {
  const [selectedThreat, setSelectedThreat] = useState<ThreatData | null>(null);

  const mockThreats: ThreatData[] = [
    {
      id: '1',
      type: 'Malware Communication',
      severity: 'critical',
      description: 'Detected C&C communication to known malicious domain',
      source: '192.168.1.45',
      destination: 'malicious-domain.com',
      timestamp: '2024-01-15 14:32:15',
      details: 'TCP connection established to known botnet command and control server. Payload contains encrypted commands.'
    },
    {
      id: '2',
      type: 'DDoS Attack',
      severity: 'high',
      description: 'High volume of SYN packets detected',
      source: 'Multiple IPs',
      destination: '192.168.1.100',
      timestamp: '2024-01-15 14:28:42',
      details: 'Coordinated SYN flood attack targeting web server. 15,000+ connections per second observed.'
    },
    {
      id: '3',
      type: 'Data Exfiltration',
      severity: 'high',
      description: 'Unusual outbound data transfer pattern',
      source: '192.168.1.78',
      destination: '185.234.217.42',
      timestamp: '2024-01-15 14:15:33',
      details: 'Large volume of data transmitted to external IP during off-hours. Potential data theft.'
    },
    {
      id: '4',
      type: 'Port Scanning',
      severity: 'medium',
      description: 'Sequential port scan detected',
      source: '10.0.0.55',
      destination: '192.168.1.0/24',
      timestamp: '2024-01-15 13:45:17',
      details: 'Systematic scanning of ports 1-1024 across subnet. Reconnaissance activity detected.'
    }
  ];

  const metrics: AnalysisMetrics = {
    totalPackets: 125847,
    maliciousPackets: 2341,
    uniqueIPs: 456,
    protocols: [
      { name: 'TCP', count: 78234, percentage: 62.1 },
      { name: 'UDP', count: 32145, percentage: 25.5 },
      { name: 'HTTP', count: 12567, percentage: 10.0 },
      { name: 'HTTPS', count: 2901, percentage: 2.4 }
    ],
    threatsByType: [
      { type: 'Malware', count: 12 },
      { type: 'DDoS', count: 8 },
      { type: 'Data Exfiltration', count: 5 },
      { type: 'Port Scanning', count: 15 }
    ]
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-destructive text-destructive-foreground';
      case 'high':
        return 'bg-warning text-warning-foreground';
      case 'medium':
        return 'bg-primary/20 text-primary';
      case 'low':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="data-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Threats Detected</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{mockThreats.length}</div>
            <p className="text-xs text-muted-foreground">
              {mockThreats.filter(t => t.severity === 'critical').length} critical, {mockThreats.filter(t => t.severity === 'high').length} high priority
            </p>
          </CardContent>
        </Card>
        
        <Card className="data-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Analysis Coverage</CardTitle>
            <Shield className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{((metrics.maliciousPackets / metrics.totalPackets) * 100).toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              {metrics.maliciousPackets.toLocaleString()} of {metrics.totalPackets.toLocaleString()} packets flagged
            </p>
          </CardContent>
        </Card>
        
        <Card className="data-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Network Entities</CardTitle>
            <Network className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.uniqueIPs}</div>
            <p className="text-xs text-muted-foreground">
              Unique IP addresses observed
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="threats" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-muted">
          <TabsTrigger value="threats">
            <AlertTriangle className="w-4 h-4 mr-2" />
            Threats
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="reports">
            <FileText className="w-4 h-4 mr-2" />
            Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="threats" className="space-y-6">
          <Card className="data-card">
            <CardHeader>
              <CardTitle>Security Threats</CardTitle>
              <CardDescription>
                Detected security incidents and anomalies from the analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockThreats.map((threat) => (
                  <div 
                    key={threat.id}
                    className="p-4 border border-border rounded-lg hover:bg-muted/30 cursor-pointer transition-colors"
                    onClick={() => setSelectedThreat(threat)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3">
                          <Badge className={getSeverityColor(threat.severity)}>
                            {threat.severity.toUpperCase()}
                          </Badge>
                          <h4 className="font-medium">{threat.type}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {threat.description}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground font-mono">
                          <span>{threat.source} → {threat.destination}</span>
                          <span>{threat.timestamp}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {selectedThreat && (
            <Card className="data-card">
              <CardHeader>
                <CardTitle>Threat Details</CardTitle>
                <CardDescription>
                  Detailed analysis of {selectedThreat.type}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Type:</span> {selectedThreat.type}
                    </div>
                    <div>
                      <span className="font-medium">Severity:</span> 
                      <Badge className={`ml-2 ${getSeverityColor(selectedThreat.severity)}`}>
                        {selectedThreat.severity.toUpperCase()}
                      </Badge>
                    </div>
                    <div>
                      <span className="font-medium">Source:</span> {selectedThreat.source}
                    </div>
                    <div>
                      <span className="font-medium">Destination:</span> {selectedThreat.destination}
                    </div>
                    <div className="col-span-2">
                      <span className="font-medium">Timestamp:</span> {selectedThreat.timestamp}
                    </div>
                  </div>
                  <div>
                    <span className="font-medium">Details:</span>
                    <p className="mt-2 text-sm text-muted-foreground bg-muted p-3 rounded">
                      {selectedThreat.details}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="data-card">
              <CardHeader>
                <CardTitle>Protocol Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {metrics.protocols.map((protocol) => (
                    <div key={protocol.name} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{protocol.name}</span>
                        <span>{protocol.percentage}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${protocol.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="data-card">
              <CardHeader>
                <CardTitle>Threat Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {metrics.threatsByType.map((threat) => (
                    <div key={threat.type} className="flex justify-between items-center">
                      <span className="text-sm">{threat.type}</span>
                      <Badge variant="outline">{threat.count}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card className="data-card">
            <CardHeader>
              <CardTitle>Generate Reports</CardTitle>
              <CardDescription>
                Export comprehensive forensic analysis reports
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="justify-start h-auto p-4">
                  <div className="text-left">
                    <div className="font-medium">Executive Summary</div>
                    <div className="text-sm text-muted-foreground">
                      High-level overview for stakeholders
                    </div>
                  </div>
                  <Download className="w-4 h-4 ml-auto" />
                </Button>
                
                <Button variant="outline" className="justify-start h-auto p-4">
                  <div className="text-left">
                    <div className="font-medium">Technical Report</div>
                    <div className="text-sm text-muted-foreground">
                      Detailed technical analysis and findings
                    </div>
                  </div>
                  <Download className="w-4 h-4 ml-auto" />
                </Button>
                
                <Button variant="outline" className="justify-start h-auto p-4">
                  <div className="text-left">
                    <div className="font-medium">IOC Export</div>
                    <div className="text-sm text-muted-foreground">
                      Indicators of Compromise in STIX format
                    </div>
                  </div>
                  <Download className="w-4 h-4 ml-auto" />
                </Button>
                
                <Button variant="outline" className="justify-start h-auto p-4">
                  <div className="text-left">
                    <div className="font-medium">PCAP Evidence</div>
                    <div className="text-sm text-muted-foreground">
                      Filtered packet captures of incidents
                    </div>
                  </div>
                  <Download className="w-4 h-4 ml-auto" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};