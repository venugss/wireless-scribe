import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer,
  AreaChart, Area
} from 'recharts';
import { 
  FileText, Download, Shield, AlertTriangle, Activity, 
  Network, Clock, TrendingUp 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import jsPDF from 'jspdf';

interface ForensicReportProps {
  captureData?: any[];
  analysisData?: any;
}

export const ForensicReport: React.FC<ForensicReportProps> = ({ 
  captureData = [], 
  analysisData 
}) => {
  const { toast } = useToast();

  // Mock data for demonstration
  const protocolData = [
    { name: 'TCP', value: 45, color: 'hsl(var(--primary))' },
    { name: 'UDP', value: 30, color: 'hsl(var(--secondary))' },
    { name: 'HTTP', value: 15, color: 'hsl(var(--accent))' },
    { name: 'HTTPS', value: 8, color: 'hsl(var(--success))' },
    { name: 'DNS', value: 2, color: 'hsl(var(--warning))' }
  ];

  const threatLevelData = [
    { level: 'Low', count: 120, color: 'hsl(var(--success))' },
    { level: 'Medium', count: 45, color: 'hsl(var(--warning))' },
    { level: 'High', count: 23, color: 'hsl(var(--destructive))' },
    { level: 'Critical', count: 8, color: 'hsl(var(--destructive-dark))' }
  ];

  const timelineData = [
    { time: '00:00', packets: 234, threats: 2 },
    { time: '04:00', packets: 189, threats: 1 },
    { time: '08:00', packets: 567, threats: 8 },
    { time: '12:00', packets: 834, threats: 12 },
    { time: '16:00', packets: 923, threats: 15 },
    { time: '20:00', packets: 678, threats: 9 },
    { time: '24:00', packets: 345, threats: 3 }
  ];

  const networkFlowData = [
    { hour: '00', inbound: 120, outbound: 80 },
    { hour: '04', inbound: 90, outbound: 60 },
    { hour: '08', inbound: 200, outbound: 150 },
    { hour: '12', inbound: 280, outbound: 220 },
    { hour: '16', inbound: 320, outbound: 280 },
    { hour: '20', inbound: 180, outbound: 160 },
    { hour: '24', inbound: 100, outbound: 90 }
  ];

  const generateReport = () => {
    const pdf = new jsPDF();
    const currentDate = new Date().toLocaleDateString();
    
    // Title
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Integrated Wireless Network Forensic Analysis Report', 20, 30);
    
    // Date
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Generated: ${currentDate}`, 20, 45);
    
    // Summary Statistics
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Summary Statistics', 20, 65);
    
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    pdf.text('• Total Packets Analyzed: 3,770', 20, 80);
    pdf.text('• Threats Detected: 50', 20, 90);
    pdf.text('• Critical Issues: 8', 20, 100);
    pdf.text('• Analysis Completion: 92%', 20, 110);
    pdf.text('• Risk Level: Medium', 20, 120);
    
    // Protocol Distribution
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Protocol Distribution', 20, 140);
    
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    protocolData.forEach((protocol, index) => {
      pdf.text(`• ${protocol.name}: ${protocol.value}%`, 20, 155 + (index * 10));
    });
    
    // Threat Level Analysis
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Threat Level Analysis', 20, 210);
    
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    threatLevelData.forEach((threat, index) => {
      pdf.text(`• ${threat.level}: ${threat.count} incidents`, 20, 225 + (index * 10));
    });
    
    // New page for findings
    pdf.addPage();
    
    // Key Findings
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Key Findings', 20, 30);
    
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    const findings = [
      'CRITICAL: Multiple failed authentication attempts from 192.168.1.45 (15 attempts in 5 minutes)',
      'MEDIUM: Suspicious DNS queries detected - potential data exfiltration patterns',
      'INFO: Traffic spike during business hours - normal pattern but worth monitoring'
    ];
    
    findings.forEach((finding, index) => {
      const lines = pdf.splitTextToSize(finding, 170);
      pdf.text(lines, 20, 50 + (index * 20));
    });
    
    // Recommendations
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Recommendations', 20, 130);
    
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    const recommendations = [
      'Implement IP-based access controls for 192.168.1.45',
      'Review and update DNS filtering policies',
      'Enable real-time monitoring for authentication events',
      'Schedule regular forensic analysis during peak hours',
      'Implement additional encryption validation checks'
    ];
    
    recommendations.forEach((rec, index) => {
      pdf.text(`• ${rec}`, 20, 150 + (index * 10));
    });
    
    // Executive Summary
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Executive Summary', 20, 220);
    
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    const summary = 'The forensic analysis of network traffic captured over a 24-hour period reveals several security concerns that require immediate attention. A total of 3,770 packets were analyzed, with 50 potential threats identified across various severity levels. While no critical infrastructure compromise was detected, the presence of suspicious authentication attempts and anomalous DNS patterns suggests active reconnaissance or early-stage attack preparation.';
    const summaryLines = pdf.splitTextToSize(summary, 170);
    pdf.text(summaryLines, 20, 240);
    
    // Save PDF
    const fileName = `forensic_report_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.pdf`;
    pdf.save(fileName);

    toast({
      title: "PDF Report generated successfully",
      description: "Forensic analysis report has been downloaded as PDF",
    });
  };

  return (
    <div className="space-y-6">
      {/* Report Header */}
      <Card className="data-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-primary" />
              <CardTitle>Forensic Analysis Report</CardTitle>
            </div>
            <Button onClick={generateReport} variant="cyber">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
          <CardDescription>
            Comprehensive integrated wireless network forensic analysis results - {new Date().toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 border border-border rounded-lg">
              <div className="text-2xl font-mono font-bold text-primary">3,770</div>
              <div className="text-sm text-muted-foreground">Total Packets</div>
            </div>
            <div className="text-center p-4 border border-border rounded-lg">
              <div className="text-2xl font-mono font-bold text-destructive">50</div>
              <div className="text-sm text-muted-foreground">Threats Detected</div>
            </div>
            <div className="text-center p-4 border border-border rounded-lg">
              <div className="text-2xl font-mono font-bold text-warning">8</div>
              <div className="text-sm text-muted-foreground">Critical Issues</div>
            </div>
            <div className="text-center p-4 border border-border rounded-lg">
              <div className="text-2xl font-mono font-bold text-success">92%</div>
              <div className="text-sm text-muted-foreground">Analysis Complete</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Protocol Distribution */}
        <Card className="data-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Network className="w-5 h-5 text-primary" />
              <span>Protocol Distribution</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={protocolData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {protocolData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Threat Levels */}
        <Card className="data-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-primary" />
              <span>Threat Level Analysis</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={threatLevelData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="level" 
                  stroke="hsl(var(--muted-foreground))"
                />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))' 
                  }}
                />
                <Bar dataKey="count" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Timeline Analysis */}
        <Card className="data-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-primary" />
              <span>Timeline Analysis</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="time" 
                  stroke="hsl(var(--muted-foreground))"
                />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))' 
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="packets" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  name="Packets"
                />
                <Line 
                  type="monotone" 
                  dataKey="threats" 
                  stroke="hsl(var(--destructive))" 
                  strokeWidth={2}
                  name="Threats"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Network Flow */}
        <Card className="data-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span>Network Traffic Flow</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={networkFlowData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="hour" 
                  stroke="hsl(var(--muted-foreground))"
                />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))' 
                  }}
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="inbound" 
                  stackId="1" 
                  stroke="hsl(var(--primary))" 
                  fill="hsl(var(--primary))"
                  fillOpacity={0.6}
                  name="Inbound"
                />
                <Area 
                  type="monotone" 
                  dataKey="outbound" 
                  stackId="1" 
                  stroke="hsl(var(--secondary))" 
                  fill="hsl(var(--secondary))"
                  fillOpacity={0.6}
                  name="Outbound"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Findings & Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="data-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-warning" />
              <span>Key Findings</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 border-l-4 border-l-destructive bg-destructive/5 rounded">
                <Badge variant="destructive" className="mt-0.5">Critical</Badge>
                <div>
                  <p className="font-medium">Multiple failed authentication attempts</p>
                  <p className="text-sm text-muted-foreground">Source: 192.168.1.45 (15 attempts in 5 minutes)</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 border-l-4 border-l-warning bg-warning/5 rounded">
                <Badge variant="secondary" className="mt-0.5 bg-warning/20 text-warning">Medium</Badge>
                <div>
                  <p className="font-medium">Suspicious DNS queries detected</p>
                  <p className="text-sm text-muted-foreground">Potential data exfiltration patterns identified</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 border-l-4 border-l-primary bg-primary/5 rounded">
                <Badge variant="outline" className="mt-0.5">Info</Badge>
                <div>
                  <p className="font-medium">Traffic spike during business hours</p>
                  <p className="text-sm text-muted-foreground">Normal pattern but worth monitoring</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="data-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-success" />
              <span>Recommendations</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <p className="text-sm">Implement IP-based access controls for 192.168.1.45</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <p className="text-sm">Review and update DNS filtering policies</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <p className="text-sm">Enable real-time monitoring for authentication events</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <p className="text-sm">Schedule regular forensic analysis during peak hours</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <p className="text-sm">Implement additional encryption validation checks</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Executive Summary */}
      <Card className="data-card">
        <CardHeader>
          <CardTitle>Executive Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none">
            <p className="text-muted-foreground mb-4">
              The forensic analysis of network traffic captured over a 24-hour period reveals several 
              security concerns that require immediate attention. A total of 3,770 packets were analyzed, 
              with 50 potential threats identified across various severity levels.
            </p>
            
            <h4 className="font-semibold mb-2">Risk Assessment: <Badge variant="secondary" className="bg-warning/20 text-warning ml-2">Medium</Badge></h4>
            <p className="text-muted-foreground mb-4">
              While no critical infrastructure compromise was detected, the presence of suspicious 
              authentication attempts and anomalous DNS patterns suggests active reconnaissance 
              or early-stage attack preparation.
            </p>
            
            <h4 className="font-semibold mb-2">Immediate Actions Required:</h4>
            <ul className="text-muted-foreground space-y-1 mb-4">
              <li>• Investigate and potentially block IP address 192.168.1.45</li>
              <li>• Review authentication logs for the past 7 days</li>
              <li>• Implement enhanced DNS monitoring</li>
              <li>• Schedule follow-up analysis within 48 hours</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};