import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Lock, User } from 'lucide-react';

interface LoginFormProps {
  onLogin: (credentials: { username: string; password: string }) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate authentication delay
    setTimeout(() => {
      onLogin(credentials);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Card className="data-card border-primary/20">
      <CardHeader className="text-center space-y-4">
        <div className="mx-auto w-12 h-12 bg-gradient-primary rounded-lg cyber-glow flex items-center justify-center">
          <Shield className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <CardTitle className="text-2xl font-bold">Secure Access</CardTitle>
          <CardDescription className="text-muted-foreground">
            Enter your credentials to access the forensic analysis system
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-foreground font-medium">
              Username
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                className="pl-10 cyber-border"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-foreground font-medium">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="pl-10 cyber-border"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                required
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            variant="cyber"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                <span>Authenticating...</span>
              </div>
            ) : (
              'Access System'
            )}
          </Button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            Demo credentials: admin / password
          </p>
        </div>
      </CardContent>
    </Card>
  );
};