import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background cyber-grid">
      <div className="absolute inset-0 bg-gradient-cyber opacity-50" />
      <div className="relative min-h-screen flex">
        {/* Left side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12">
          <div className="max-w-md text-center">
            <div className="mb-8">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-primary rounded-2xl cyber-glow flex items-center justify-center">
                <svg className="w-10 h-10 text-primary-foreground" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Integrated Wireless Network Forensic Analysis
              </h1>
              <p className="text-muted-foreground text-lg">
                Advanced Wireless Analysis Framework
              </p>
            </div>
            <div className="space-y-4 text-left">
              <div className="flex items-center space-x-3">
                <div className="status-indicator status-online" />
                <span className="text-sm text-muted-foreground">
                  Real-time packet capture & analysis
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="status-indicator status-online" />
                <span className="text-sm text-muted-foreground">
                  Advanced threat detection algorithms
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="status-indicator status-online" />
                <span className="text-sm text-muted-foreground">
                  Comprehensive forensic reporting
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right side - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};