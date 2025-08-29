import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Camera, Upload, User, Phone, IdCard, MessageSquare } from 'lucide-react';

interface VisitorData {
  fullName: string;
  contactNumber: string;
  idType: string;
  idNumber: string;
  purpose: string;
  photo?: File;
}

const VisitorForm = () => {
  const [formData, setFormData] = useState<VisitorData>({
    fullName: '',
    contactNumber: '',
    idType: '',
    idNumber: '',
    purpose: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: keyof VisitorData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePhotoCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      // In a real implementation, you'd create a camera capture component
      toast({
        title: "Camera Access",
        description: "Camera functionality would be implemented here",
      });
      stream.getTracks().forEach(track => track.stop());
    } catch (error) {
      toast({
        title: "Camera Error",
        description: "Unable to access camera. Please upload a photo instead.",
        variant: "destructive"
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate required fields
    if (!formData.fullName || !formData.contactNumber || !formData.idType || !formData.purpose) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Here you would send data to your backend/Google Sheets
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      
      toast({
        title: "Registration Successful",
        description: "Welcome! Your visit has been recorded.",
      });

      // Reset form
      setFormData({
        fullName: '',
        contactNumber: '',
        idType: '',
        idNumber: '',
        purpose: ''
      });
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Please try again or contact reception.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl flex items-center justify-center gap-2">
          <User className="h-6 w-6" />
          Visitor Registration
        </CardTitle>
        <p className="text-muted-foreground">Please fill in your details to register your visit</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-sm font-medium">
              Full Name *
            </Label>
            <Input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              required
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactNumber" className="text-sm font-medium flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Contact Number *
            </Label>
            <Input
              id="contactNumber"
              type="tel"
              placeholder="Enter your phone number"
              value={formData.contactNumber}
              onChange={(e) => handleInputChange('contactNumber', e.target.value)}
              required
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="idType" className="text-sm font-medium flex items-center gap-2">
                <IdCard className="h-4 w-4" />
                ID Type *
              </Label>
              <Select value={formData.idType} onValueChange={(value) => handleInputChange('idType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select ID type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aadhaar">Aadhaar Card</SelectItem>
                  <SelectItem value="driving-license">Driving License</SelectItem>
                  <SelectItem value="passport">Passport</SelectItem>
                  <SelectItem value="voter-id">Voter ID</SelectItem>
                  <SelectItem value="pan-card">PAN Card</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="idNumber" className="text-sm font-medium">
                ID Number
              </Label>
              <Input
                id="idNumber"
                type="text"
                placeholder="Enter ID number"
                value={formData.idNumber}
                onChange={(e) => handleInputChange('idNumber', e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="purpose" className="text-sm font-medium flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Purpose of Visit *
            </Label>
            <Textarea
              id="purpose"
              placeholder="Please describe the purpose of your visit"
              value={formData.purpose}
              onChange={(e) => handleInputChange('purpose', e.target.value)}
              required
              className="min-h-[100px] resize-none"
            />
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium">Photo (Optional)</Label>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={handlePhotoCapture}
                className="flex items-center gap-2 flex-1"
              >
                <Camera className="h-4 w-4" />
                Take Photo
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex items-center gap-2 flex-1"
              >
                <Upload className="h-4 w-4" />
                Upload Photo
              </Button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-6 text-lg font-medium"
          >
            {isSubmitting ? 'Registering...' : 'Complete Registration'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default VisitorForm;