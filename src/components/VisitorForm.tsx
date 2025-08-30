import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Camera, Upload, User, Phone, IdCard, MessageSquare, Loader2 } from 'lucide-react';

interface VisitorData {
  name: string;
  contact: string;
  idType: string;
  idNumber: string;
  visitPurpose: string;
  photo?: File;
}

const VisitorForm = () => {
  const [formData, setFormData] = useState<VisitorData>({
    name: '',
    contact: '',
    idType: '',
    idNumber: '',
    visitPurpose: ''
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
    if (!formData.name || !formData.contact || !formData.idType || !formData.visitPurpose) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Save to Supabase with auto-timestamp
      const { error } = await supabase
        .from('visitors')
        .insert({
          name: formData.name,
          contact: formData.contact,
          id_proof: formData.idType + (formData.idNumber ? `: ${formData.idNumber}` : ''),
          visit_purpose: formData.visitPurpose,
          check_in_time: new Date().toISOString(),
          status: 'active'
        });

      if (error) {
        throw error;
      }
      
      toast({
        title: "Registration Successful",
        description: "Welcome! Your visit has been recorded.",
      });

      // Reset form
      setFormData({
        name: '',
        contact: '',
        idType: '',
        idNumber: '',
        visitPurpose: ''
      });
    } catch (error) {
      console.error('Registration error:', error);
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
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader className="text-center px-4 sm:px-6 py-4 sm:py-6">
        <div className="flex items-center justify-center gap-2 mb-2 sm:mb-4">
          <User className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
        </div>
        <CardTitle className="text-xl sm:text-2xl lg:text-3xl">
          Visitor Registration
        </CardTitle>
        <p className="text-sm sm:text-base text-muted-foreground px-2">
          Please fill in your details to register your visit
        </p>
      </CardHeader>
      <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm sm:text-base font-medium">
              Full Name *
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              required
              className="w-full h-11 sm:h-12 text-base"
            />
          </div>

          {/* Contact Number */}
          <div className="space-y-2">
            <Label htmlFor="contact" className="text-sm sm:text-base font-medium flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Contact Number *
            </Label>
            <Input
              id="contact"
              type="tel"
              placeholder="Enter your phone number"
              value={formData.contact}
              onChange={(e) => handleInputChange('contact', e.target.value)}
              required
              className="w-full h-11 sm:h-12 text-base"
            />
          </div>

          {/* ID Type and Number - Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="idType" className="text-sm sm:text-base font-medium flex items-center gap-2">
                <IdCard className="h-4 w-4" />
                ID Type *
              </Label>
              <Select value={formData.idType} onValueChange={(value) => handleInputChange('idType', value)}>
                <SelectTrigger className="h-11 sm:h-12 text-base">
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
              <Label htmlFor="idNumber" className="text-sm sm:text-base font-medium">
                ID Number
              </Label>
              <Input
                id="idNumber"
                type="text"
                placeholder="Enter ID number"
                value={formData.idNumber}
                onChange={(e) => handleInputChange('idNumber', e.target.value)}
                className="w-full h-11 sm:h-12 text-base"
              />
            </div>
          </div>

          {/* Purpose of Visit */}
          <div className="space-y-2">
            <Label htmlFor="visitPurpose" className="text-sm sm:text-base font-medium flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Purpose of Visit *
            </Label>
            <Textarea
              id="visitPurpose"
              placeholder="Please describe the purpose of your visit"
              value={formData.visitPurpose}
              onChange={(e) => handleInputChange('visitPurpose', e.target.value)}
              required
              className="min-h-[100px] sm:min-h-[120px] resize-none text-base"
            />
          </div>

          {/* Photo Section - Responsive Layout */}
          <div className="space-y-3">
            <Label className="text-sm sm:text-base font-medium">Photo (Optional)</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={handlePhotoCapture}
                className="flex items-center justify-center gap-2 h-11 sm:h-12 text-base"
              >
                <Camera className="h-4 w-4 sm:h-5 sm:w-5" />
                Take Photo
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex items-center justify-center gap-2 h-11 sm:h-12 text-base"
              >
                <Upload className="h-4 w-4 sm:h-5 sm:w-5" />
                Upload Photo
              </Button>
            </div>
          </div>

          {/* Submit Button - Large and Touch-Friendly */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 sm:h-14 text-base sm:text-lg font-medium mt-6 sm:mt-8"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin mr-2" />
                Registering...
              </>
            ) : (
              'Complete Registration'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default VisitorForm;