import AdminDashboard from '@/components/AdminDashboard';
import Navbar from '@/components/Navbar';
import { Shield } from 'lucide-react';

const AdminPanel = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <Navbar />
      <div className="max-w-7xl mx-auto p-4 space-y-8">
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="h-4 w-4" />
            Admin Access
          </div>
        </div>
        
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Visitor Management Dashboard
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Monitor and manage all visitor entries, export data, and maintain security records.
          </p>
        </div>

        <AdminDashboard />
      </div>
    </div>
  );
};

export default AdminPanel;