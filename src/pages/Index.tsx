import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import { Users, Shield, Smartphone, Database, Download } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground">
            Secure Visitor
            <span className="text-primary block">Management</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Streamline your hostel's visitor registration with our modern, mobile-friendly system. 
            Simple navigation, instant registration, complete security.
          </p>
        </div>

        {/* Quick Access Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-3xl font-bold text-foreground">Easy Access Navigation</h3>
              <p className="text-lg text-muted-foreground">
                Use the navigation bar above to quickly access the visitor form or admin panel. 
                No QR codes needed - just simple, direct access.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-foreground">
                <Smartphone className="h-5 w-5 text-primary" />
                <span>Mobile-optimized registration</span>
              </div>
              <div className="flex items-center gap-3 text-foreground">
                <Database className="h-5 w-5 text-primary" />
                <span>Secure database storage</span>
              </div>
              <div className="flex items-center gap-3 text-foreground">
                <Download className="h-5 w-5 text-primary" />
                <span>CSV export capability</span>
              </div>
            </div>

            <Link to="/visitor-entry">
              <Button size="lg" className="text-lg px-8 py-6">
                Access Visitor Form
              </Button>
            </Link>
          </div>

          <div className="flex justify-center">
            <Card className="w-full max-w-md p-8 text-center">
              <CardContent className="space-y-4">
                <Users className="h-16 w-16 text-primary mx-auto" />
                <h3 className="text-2xl font-bold">Quick Registration</h3>
                <p className="text-muted-foreground">
                  Visitors can register in under 60 seconds with automatic timestamp recording.
                </p>
              </CardContent>
            </Card>
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
            Use the navigation above to access the visitor form or admin panel to manage visitor data.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button size="lg" variant="outline" className="text-lg px-8">
                Admin Login
              </Button>
            </Link>
            <Link to="/visitor-entry">
              <Button size="lg" className="text-lg px-8">
                Visitor Registration
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
