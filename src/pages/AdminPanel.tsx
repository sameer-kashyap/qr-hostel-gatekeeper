import AdminDashboard from '@/components/AdminDashboard';
import Navbar from '@/components/Navbar';
import { Shield } from 'lucide-react';

const AdminPanel = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <Navbar />
      <div className="max-w-7xl mx-auto p-3 sm:p-4 lg:p-6 space-y-6 sm:space-y-8">
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
            <Shield className="h-4 w-4" />
            Admin Access
          </div>
        </div>
        
        <div className="text-center space-y-2 sm:space-y-3 px-2 sm:px-0">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-tight">
            Visitor Management Dashboard
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Monitor and manage all visitor entries, export data, and maintain security records.
          </p>
        </div>

        <AdminDashboard />
      </div>
    </div>
  );
};

export default AdminPanel;