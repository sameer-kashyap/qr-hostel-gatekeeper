import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import QRCodeDisplay from '@/components/QRCodeDisplay';
import { Building2, Users, Shield, Smartphone, Database, Download } from 'lucide-react';

const Index = () => {
  const visitorFormUrl = `${window.location.origin}/visitor-entry`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Building2 className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-xl font-bold text-foreground">HostelGuard</h1>
                <p className="text-sm text-muted-foreground">Visitor Management System</p>
              </div>
            </div>
            <Link to="/admin">
              <Button variant="outline" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Admin Panel
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground">
            Secure Visitor
            <span className="text-primary block">Management</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Streamline your hostel's visitor registration with our modern, mobile-friendly system. 
            One QR code, instant registration, complete security.
          </p>
        </div>

        {/* QR Code Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-3xl font-bold text-foreground">Quick Access QR Code</h3>
              <p className="text-lg text-muted-foreground">
                Display this QR code at your entrance. Visitors can scan it with any smartphone 
                to instantly access the registration form.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-foreground">
                <Smartphone className="h-5 w-5 text-primary" />
                <span>Mobile-optimized registration</span>
              </div>
              <div className="flex items-center gap-3 text-foreground">
                <Database className="h-5 w-5 text-primary" />
                <span>Secure data storage</span>
              </div>
              <div className="flex items-center gap-3 text-foreground">
                <Download className="h-5 w-5 text-primary" />
                <span>CSV export capability</span>
              </div>
            </div>

            <Link to="/visitor-entry">
              <Button size="lg" className="text-lg px-8 py-6">
                Test Registration Form
              </Button>
            </Link>
          </div>

          <div className="flex justify-center">
            <QRCodeDisplay value={visitorFormUrl} size={320} />
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center">
            <CardHeader>
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Easy Registration</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Visitors complete registration in under 60 seconds with our intuitive form design.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Secure Data</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                All visitor information is securely stored with restricted access for authorized staff only.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Smartphone className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Mobile First</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Fully responsive design works perfectly on all devices, from smartphones to tablets.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-card rounded-lg p-8 border">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Ready to Get Started?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Print the QR code above and place it at your entrance, or access the admin panel to view visitor data.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/admin">
              <Button size="lg" variant="outline" className="text-lg px-8">
                Access Admin Panel
              </Button>
            </Link>
            <Link to="/visitor-entry">
              <Button size="lg" className="text-lg px-8">
                Try Registration
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card/50 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <p className="text-muted-foreground">
            HostelGuard Visitor Management System - Secure, Simple, Efficient
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
