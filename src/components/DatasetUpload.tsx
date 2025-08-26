import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Upload, FileText, CheckCircle, AlertCircle, Play } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DatasetFile {
  id: string;
  name: string;
  size: string;
  type: string;
  status: 'uploading' | 'completed' | 'analyzing' | 'error';
  packets?: number;
  threats?: number;
}

export const DatasetUpload: React.FC = () => {
  const [files, setFiles] = useState<DatasetFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = (uploadedFiles: FileList | null) => {
    if (!uploadedFiles) return;

    Array.from(uploadedFiles).forEach((file) => {
      const newFile: DatasetFile = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
        type: file.name.split('.').pop()?.toUpperCase() || 'UNKNOWN',
        status: 'uploading'
      };

      setFiles(prev => [...prev, newFile]);

      // Simulate upload progress
      setTimeout(() => {
        setFiles(prev => prev.map(f => 
          f.id === newFile.id 
            ? { ...f, status: 'completed', packets: Math.floor(Math.random() * 10000) + 1000 }
            : f
        ));
        
        toast({
          title: "File uploaded successfully",
          description: `${newFile.name} is ready for analysis`,
        });
      }, 2000);
    });
  };

  const handleAnalyze = (fileId: string) => {
    setFiles(prev => prev.map(f => 
      f.id === fileId ? { ...f, status: 'analyzing' } : f
    ));

    // Simulate analysis
    setTimeout(() => {
      setFiles(prev => prev.map(f => 
        f.id === fileId 
          ? { 
              ...f, 
              status: 'completed',
              threats: Math.floor(Math.random() * 50) + 5
            }
          : f
      ));
      
      toast({
        title: "Analysis completed",
        description: "Forensic analysis has been completed successfully",
      });
    }, 3000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'analyzing':
        return <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-destructive" />;
      default:
        return <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="secondary" className="bg-success/20 text-success">Ready</Badge>;
      case 'analyzing':
        return <Badge variant="secondary" className="bg-primary/20 text-primary">Analyzing</Badge>;
      case 'uploading':
        return <Badge variant="secondary">Uploading</Badge>;
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <Card className="data-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="w-5 h-5 text-primary" />
            <span>Dataset Upload</span>
          </CardTitle>
          <CardDescription>
            Upload network capture files (PCAP, PCAPNG, CSV) for forensic analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragging 
                ? 'border-primary bg-primary/5' 
                : 'border-border hover:border-primary/50'
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              handleFileUpload(e.dataTransfer.files);
            }}
          >
            <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Drop files here</h3>
            <p className="text-muted-foreground mb-4">
              Or click to browse and select files
            </p>
            <Input
              id="file-upload"
              type="file"
              multiple
              accept=".pcap,.pcapng,.csv,.cap"
              className="hidden"
              onChange={(e) => handleFileUpload(e.target.files)}
            />
            <Label htmlFor="file-upload">
              <Button variant="outline" className="cursor-pointer">
                Browse Files
              </Button>
            </Label>
            <p className="text-xs text-muted-foreground mt-4">
              Supported formats: PCAP, PCAPNG, CSV, CAP (Max 100MB per file)
            </p>
          </div>
        </CardContent>
      </Card>

      {/* File List */}
      {files.length > 0 && (
        <Card className="data-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-primary" />
              <span>Uploaded Datasets</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {files.map((file) => (
                <div key={file.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(file.status)}
                    <div>
                      <h4 className="font-medium">{file.name}</h4>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>{file.size}</span>
                        <span>{file.type}</span>
                        {file.packets && <span>{file.packets.toLocaleString()} packets</span>}
                        {file.threats && <span className="text-destructive">{file.threats} threats detected</span>}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    {getStatusBadge(file.status)}
                    {file.status === 'completed' && !file.threats && (
                      <Button 
                        size="sm" 
                        variant="cyber"
                        onClick={() => handleAnalyze(file.id)}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Analyze
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Sample Datasets */}
      <Card className="data-card">
        <CardHeader>
          <CardTitle>Sample Datasets</CardTitle>
          <CardDescription>
            Use these pre-loaded datasets to test the analysis capabilities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-border rounded-lg">
              <h4 className="font-medium mb-2">Malware Traffic Analysis</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Network capture containing various malware communications and C&C traffic
              </p>
              <div className="flex items-center justify-between">
                <Badge variant="outline">PCAP • 24.5 MB</Badge>
                <Button size="sm" variant="outline">Load Dataset</Button>
              </div>
            </div>
            
            <div className="p-4 border border-border rounded-lg">
              <h4 className="font-medium mb-2">Wi-Fi Security Assessment</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Wireless network capture with various security vulnerabilities and attacks
              </p>
              <div className="flex items-center justify-between">
                <Badge variant="outline">PCAPNG • 18.2 MB</Badge>
                <Button size="sm" variant="outline">Load Dataset</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};