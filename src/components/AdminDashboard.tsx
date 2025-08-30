import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Download, Trash2, Users, Clock, TrendingUp, Loader2 } from 'lucide-react';

interface Visitor {
  id: string;
  name: string;
  contact: string;
  id_proof: string;
  visit_purpose: string;
  check_in_time: string;
  status: string;
  created_at?: string;
}

const AdminDashboard = () => {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchVisitors();
  }, []);

  const fetchVisitors = async () => {
    try {
      const { data, error } = await supabase
        .from('visitors')
        .select('*')
        .order('check_in_time', { ascending: false });

      if (error) {
        throw error;
      }

      setVisitors(data || []);
    } catch (error) {
      console.error('Error fetching visitors:', error);
      toast({
        title: "Error",
        description: "Failed to load visitor data.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteVisitor = async (visitorId: string) => {
    try {
      const { error } = await supabase
        .from('visitors')
        .delete()
        .eq('id', visitorId);

      if (error) {
        throw error;
      }

      setVisitors(prev => prev.filter(v => v.id !== visitorId));
      toast({
        title: "Visitor Deleted",
        description: "Visitor entry has been removed from the system.",
      });
    } catch (error) {
      console.error('Error deleting visitor:', error);
      toast({
        title: "Error",
        description: "Failed to delete visitor entry.",
        variant: "destructive"
      });
    }
  };

  const handleExportData = () => {
    // Create CSV content
    const csvContent = [
      ['Name', 'Contact', 'ID Proof', 'Purpose', 'Check-in Time', 'Status'],
      ...visitors.map(v => [
        v.name,
        v.contact,
        v.id_proof || '',
        v.visit_purpose,
        new Date(v.check_in_time).toLocaleString(),
        v.status
      ])
    ].map(row => row.join(',')).join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `visitors-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Export Successful",
      description: "Visitor data has been exported to CSV file.",
    });
  };

  const activeVisitors = visitors.filter(v => v.status === 'active').length;
  const totalVisitors = visitors.length;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-lg">Loading visitor data...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Visitors</p>
                <p className="text-3xl font-bold text-primary">{activeVisitors}</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Today</p>
                <p className="text-3xl font-bold text-success">{totalVisitors}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Visit Time</p>
                <p className="text-3xl font-bold text-warning">2.5h</p>
              </div>
              <Clock className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl">Visitor Management</CardTitle>
          <Button onClick={handleExportData} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Data
          </Button>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden sm:table-cell">Contact</TableHead>
                  <TableHead className="hidden md:table-cell">ID Proof</TableHead>
                  <TableHead>Purpose</TableHead>
                  <TableHead className="hidden lg:table-cell">Check-in Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {visitors.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No visitors registered yet
                    </TableCell>
                  </TableRow>
                ) : (
                  visitors.map((visitor) => (
                    <TableRow key={visitor.id}>
                      <TableCell className="font-medium">{visitor.name}</TableCell>
                      <TableCell className="hidden sm:table-cell">{visitor.contact}</TableCell>
                      <TableCell className="hidden md:table-cell">{visitor.id_proof || 'N/A'}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{visitor.visit_purpose}</TableCell>
                      <TableCell className="hidden lg:table-cell">
                        {new Date(visitor.check_in_time).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={visitor.status === 'active' ? 'default' : 'secondary'}
                          className={visitor.status === 'active' ? 'bg-success text-success-foreground' : ''}
                        >
                          {visitor.status === 'active' ? 'Active' : visitor.status === 'checked-out' ? 'Checked Out' : visitor.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Visitor Entry</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete {visitor.name}'s entry? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteVisitor(visitor.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;