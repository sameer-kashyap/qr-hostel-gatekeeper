import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Building2, Users, Shield, LogOut, Menu, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setIsOpen(false);
  };

  const closeSheet = () => setIsOpen(false);

  return (
    <header className="bg-card/95 backdrop-blur-sm border-b sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo - Responsive sizing */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 min-w-0">
            <Building2 className="h-6 w-6 sm:h-8 sm:w-8 text-primary flex-shrink-0" />
            <div className="min-w-0">
              <h1 className="text-base sm:text-xl font-bold text-foreground truncate">
                HostelGuard
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">
                Visitor Management System
              </p>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2 lg:gap-4">
            <Link to="/visitor-entry">
              <Button 
                variant={location.pathname === '/visitor-entry' ? 'default' : 'ghost'} 
                size="sm"
                className="flex items-center gap-2 text-sm"
              >
                <Users className="h-4 w-4" />
                <span className="hidden lg:inline">Visitor Form</span>
                <span className="lg:hidden">Form</span>
              </Button>
            </Link>
            
            {user ? (
              <div className="flex items-center gap-2 lg:gap-4">
                <Link to="/admin">
                  <Button 
                    variant={location.pathname === '/admin' ? 'default' : 'ghost'} 
                    size="sm"
                    className="flex items-center gap-2 text-sm"
                  >
                    <Shield className="h-4 w-4" />
                    <span className="hidden lg:inline">Admin Panel</span>
                    <span className="lg:hidden">Admin</span>
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleSignOut}
                  className="flex items-center gap-2 text-sm"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden lg:inline">Sign Out</span>
                </Button>
              </div>
            ) : (
              <Link to="/auth">
                <Button variant="outline" size="sm" className="flex items-center gap-2 text-sm">
                  <Shield className="h-4 w-4" />
                  <span className="hidden lg:inline">Admin Login</span>
                  <span className="lg:hidden">Login</span>
                </Button>
              </Link>
            )}
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="p-2">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64 p-0">
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="flex items-center justify-between p-4 border-b">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-6 w-6 text-primary" />
                      <span className="font-semibold">HostelGuard</span>
                    </div>
                  </div>

                  {/* Mobile Navigation Links */}
                  <nav className="flex-1 p-4 space-y-2">
                    <Link to="/visitor-entry" onClick={closeSheet}>
                      <Button 
                        variant={location.pathname === '/visitor-entry' ? 'default' : 'ghost'} 
                        className="w-full justify-start gap-3 h-12 text-base"
                      >
                        <Users className="h-5 w-5" />
                        Visitor Form
                      </Button>
                    </Link>
                    
                    {user ? (
                      <>
                        <Link to="/admin" onClick={closeSheet}>
                          <Button 
                            variant={location.pathname === '/admin' ? 'default' : 'ghost'} 
                            className="w-full justify-start gap-3 h-12 text-base"
                          >
                            <Shield className="h-5 w-5" />
                            Admin Panel
                          </Button>
                        </Link>
                        <Button 
                          variant="outline" 
                          onClick={handleSignOut}
                          className="w-full justify-start gap-3 h-12 text-base"
                        >
                          <LogOut className="h-5 w-5" />
                          Sign Out
                        </Button>
                      </>
                    ) : (
                      <Link to="/auth" onClick={closeSheet}>
                        <Button 
                          variant="outline" 
                          className="w-full justify-start gap-3 h-12 text-base"
                        >
                          <Shield className="h-5 w-5" />
                          Admin Login
                        </Button>
                      </Link>
                    )}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;