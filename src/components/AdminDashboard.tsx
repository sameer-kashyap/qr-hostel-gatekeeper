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
      <div className="flex items-center justify-center py-8 sm:py-12">
        <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 animate-spin text-primary" />
        <span className="ml-2 text-base sm:text-lg">Loading visitor data...</span>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Stats Cards - Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card className="shadow-sm">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-muted-foreground">Active Visitors</p>
                <p className="text-2xl sm:text-3xl font-bold text-primary">{activeVisitors}</p>
              </div>
              <Users className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-muted-foreground">Total Today</p>
                <p className="text-2xl sm:text-3xl font-bold text-success">{totalVisitors}</p>
              </div>
              <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm sm:col-span-2 lg:col-span-1">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-muted-foreground">Avg. Visit Time</p>
                <p className="text-2xl sm:text-3xl font-bold text-warning">2.5h</p>
              </div>
              <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard */}
      <Card className="shadow-sm">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-4 sm:px-6 py-4 sm:py-6">
          <CardTitle className="text-xl sm:text-2xl">Visitor Management</CardTitle>
          <Button 
            onClick={handleExportData} 
            className="flex items-center gap-2 w-full sm:w-auto h-10 sm:h-11 text-sm sm:text-base"
          >
            <Download className="h-4 w-4" />
            <span className="sm:inline">Export Data</span>
          </Button>
        </CardHeader>
        <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
          {/* Mobile-First Table Container */}
          <div className="rounded-md border overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[120px] text-xs sm:text-sm">Name</TableHead>
                    <TableHead className="hidden sm:table-cell min-w-[120px] text-xs sm:text-sm">Contact</TableHead>
                    <TableHead className="hidden lg:table-cell min-w-[100px] text-xs sm:text-sm">ID Proof</TableHead>
                    <TableHead className="min-w-[140px] text-xs sm:text-sm">Purpose</TableHead>
                    <TableHead className="hidden md:table-cell min-w-[140px] text-xs sm:text-sm">Check-in Time</TableHead>
                    <TableHead className="min-w-[80px] text-xs sm:text-sm">Status</TableHead>
                    <TableHead className="text-right min-w-[80px] text-xs sm:text-sm">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {visitors.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        <div className="flex flex-col items-center gap-2">
                          <Users className="h-8 w-8 text-muted-foreground/50" />
                          <span className="text-sm sm:text-base">No visitors registered yet</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    visitors.map((visitor) => (
                      <TableRow key={visitor.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium text-xs sm:text-sm">
                          <div className="max-w-[100px] sm:max-w-none">
                            <div className="truncate">{visitor.name}</div>
                            {/* Show contact on mobile when hidden */}
                            <div className="sm:hidden text-xs text-muted-foreground truncate">
                              {visitor.contact}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell text-xs sm:text-sm">
                          {visitor.contact}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell text-xs sm:text-sm">
                          <div className="max-w-[80px] lg:max-w-none truncate">
                            {visitor.id_proof || 'N/A'}
                          </div>
                        </TableCell>
                        <TableCell className="text-xs sm:text-sm">
                          <div className="max-w-[120px] sm:max-w-[200px] truncate" title={visitor.visit_purpose}>
                            {visitor.visit_purpose}
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-xs sm:text-sm">
                          <div className="max-w-[120px] lg:max-w-none">
                            {new Date(visitor.check_in_time).toLocaleDateString()}
                            <div className="text-xs text-muted-foreground">
                              {new Date(visitor.check_in_time).toLocaleTimeString([], { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={visitor.status === 'active' ? 'default' : 'secondary'}
                            className={`text-xs ${visitor.status === 'active' ? 'bg-success text-success-foreground' : ''}`}
                          >
                            {visitor.status === 'active' ? 'Active' : 
                             visitor.status === 'checked-out' ? 'Out' : visitor.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8 p-0"
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Delete visitor</span>
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="mx-4 max-w-md">
                              <AlertDialogHeader>
                                <AlertDialogTitle className="text-base sm:text-lg">Delete Visitor Entry</AlertDialogTitle>
                                <AlertDialogDescription className="text-sm sm:text-base">
                                  Are you sure you want to delete {visitor.name}'s entry? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter className="flex-col sm:flex-row gap-2">
                                <AlertDialogCancel className="w-full sm:w-auto">Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteVisitor(visitor.id)}
                                  className="w-full sm:w-auto bg-destructive text-destructive-foreground hover:bg-destructive/90"
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;