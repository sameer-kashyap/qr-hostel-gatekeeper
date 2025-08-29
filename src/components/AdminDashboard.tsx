import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { Download, Trash2, Users, Clock, TrendingUp } from 'lucide-react';

interface Visitor {
  id: string;
  fullName: string;
  contactNumber: string;
  idType: string;
  purpose: string;
  checkInTime: string;
  status: 'active' | 'checked-out';
}

// Mock data for demonstration
const mockVisitors: Visitor[] = [
  {
    id: '1',
    fullName: 'John Doe',
    contactNumber: '+91 9876543210',
    idType: 'Aadhaar Card',
    purpose: 'Meeting with resident',
    checkInTime: '2024-01-15 10:30 AM',
    status: 'active'
  },
  {
    id: '2',
    fullName: 'Jane Smith',
    contactNumber: '+91 9876543211',
    idType: 'Driving License',
    purpose: 'Delivery',
    checkInTime: '2024-01-15 09:15 AM',
    status: 'checked-out'
  },
  {
    id: '3',
    fullName: 'Mike Johnson',
    contactNumber: '+91 9876543212',
    idType: 'Passport',
    purpose: 'Property viewing',
    checkInTime: '2024-01-15 11:45 AM',
    status: 'active'
  }
];

const AdminDashboard = () => {
  const [visitors, setVisitors] = useState<Visitor[]>(mockVisitors);
  const { toast } = useToast();

  const handleDeleteVisitor = (visitorId: string) => {
    setVisitors(prev => prev.filter(v => v.id !== visitorId));
    toast({
      title: "Visitor Deleted",
      description: "Visitor entry has been removed from the system.",
    });
  };

  const handleExportData = () => {
    // Create CSV content
    const csvContent = [
      ['Name', 'Contact', 'ID Type', 'Purpose', 'Check-in Time', 'Status'],
      ...visitors.map(v => [
        v.fullName,
        v.contactNumber,
        v.idType,
        v.purpose,
        v.checkInTime,
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
                  <TableHead className="hidden md:table-cell">ID Type</TableHead>
                  <TableHead>Purpose</TableHead>
                  <TableHead className="hidden lg:table-cell">Check-in Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {visitors.map((visitor) => (
                  <TableRow key={visitor.id}>
                    <TableCell className="font-medium">{visitor.fullName}</TableCell>
                    <TableCell className="hidden sm:table-cell">{visitor.contactNumber}</TableCell>
                    <TableCell className="hidden md:table-cell">{visitor.idType}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{visitor.purpose}</TableCell>
                    <TableCell className="hidden lg:table-cell">{visitor.checkInTime}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={visitor.status === 'active' ? 'default' : 'secondary'}
                        className={visitor.status === 'active' ? 'bg-success text-success-foreground' : ''}
                      >
                        {visitor.status === 'active' ? 'Active' : 'Checked Out'}
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
                              Are you sure you want to delete {visitor.fullName}'s entry? This action cannot be undone.
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
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;