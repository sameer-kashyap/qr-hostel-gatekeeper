import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import { Users, Shield, Smartphone, Database, Download, ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <Navbar />

      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        {/* Hero Section - Mobile-First */}
        <div className="text-center space-y-4 sm:space-y-6 py-8 sm:py-12 lg:py-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
            Secure Visitor
            <span className="text-primary block mt-1 sm:mt-2">Management</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            Streamline your hostel's visitor registration with our modern, mobile-friendly system. 
            Simple navigation, instant registration, complete security.
          </p>
        </div>

        {/* Quick Access Section - Responsive Layout */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center mb-12 sm:mb-16 px-3 sm:px-0">
          <div className="space-y-4 sm:space-y-6 order-2 lg:order-1">
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                Easy Access Navigation
              </h3>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                Use the navigation bar above to quickly access the visitor form or admin panel. 
                No QR codes needed - just simple, direct access.
              </p>
            </div>
            
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-3 text-foreground">
                <Smartphone className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-sm sm:text-base">Mobile-optimized registration</span>
              </div>
              <div className="flex items-center gap-3 text-foreground">
                <Database className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-sm sm:text-base">Secure database storage</span>
              </div>
              <div className="flex items-center gap-3 text-foreground">
                <Download className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-sm sm:text-base">CSV export capability</span>
              </div>
            </div>

            <Link to="/visitor-entry" className="block">
              <Button size="lg" className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 h-12 sm:h-14">
                Access Visitor Form
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </Link>
          </div>

          <div className="flex justify-center order-1 lg:order-2">
            <Card className="w-full max-w-sm sm:max-w-md p-4 sm:p-8 text-center shadow-lg">
              <CardContent className="space-y-3 sm:space-y-4 p-0">
                <Users className="h-12 w-12 sm:h-16 sm:w-16 text-primary mx-auto" />
                <h3 className="text-xl sm:text-2xl font-bold">Quick Registration</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Visitors can register in under 60 seconds with automatic timestamp recording.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features Grid - Mobile-First Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16 px-3 sm:px-0">
          <Card className="text-center shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="px-4 sm:px-6 py-4 sm:py-6">
              <Users className="h-10 w-10 sm:h-12 sm:w-12 text-primary mx-auto mb-3 sm:mb-4" />
              <CardTitle className="text-lg sm:text-xl">Easy Registration</CardTitle>
            </CardHeader>
            <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Visitors complete registration in under 60 seconds with our intuitive form design.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="px-4 sm:px-6 py-4 sm:py-6">
              <Shield className="h-10 w-10 sm:h-12 sm:w-12 text-primary mx-auto mb-3 sm:mb-4" />
              <CardTitle className="text-lg sm:text-xl">Secure Data</CardTitle>
            </CardHeader>
            <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                All visitor information is securely stored with restricted access for authorized staff only.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-sm hover:shadow-md transition-shadow sm:col-span-2 lg:col-span-1">
            <CardHeader className="px-4 sm:px-6 py-4 sm:py-6">
              <Smartphone className="h-10 w-10 sm:h-12 sm:w-12 text-primary mx-auto mb-3 sm:mb-4" />
              <CardTitle className="text-lg sm:text-xl">Mobile First</CardTitle>
            </CardHeader>
            <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Fully responsive design works perfectly on all devices, from smartphones to tablets.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section - Mobile-Optimized */}
        <div className="text-center bg-card rounded-lg p-4 sm:p-6 lg:p-8 border shadow-sm mx-3 sm:mx-0 mb-8 sm:mb-12">
          <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4">
            Ready to Get Started?
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 max-w-2xl mx-auto leading-relaxed">
            Use the navigation above to access the visitor form or admin panel to manage visitor data.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link to="/auth" className="w-full sm:w-auto">
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 h-11 sm:h-12"
              >
                Admin Login
              </Button>
            </Link>
            <Link to="/visitor-entry" className="w-full sm:w-auto">
              <Button 
                size="lg" 
                className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 h-11 sm:h-12"
              >
                Visitor Registration
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer - Responsive */}
      <footer className="border-t bg-card/50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8 text-center">
          <p className="text-xs sm:text-sm text-muted-foreground">
            HostelGuard Visitor Management System - Secure, Simple, Efficient
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;