import VisitorForm from '@/components/VisitorForm';
import Navbar from '@/components/Navbar';

const VisitorEntry = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <Navbar />
      <div className="max-w-4xl mx-auto p-4 space-y-8">
        
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Welcome to Our Hostel
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're glad to have you visit us today. Please complete the quick registration below to ensure a smooth and secure experience for everyone.
          </p>
        </div>

        <VisitorForm />

        <div className="text-center text-sm text-muted-foreground">
          <p>Your information is securely stored and only used for visitor management purposes.</p>
        </div>
      </div>
    </div>
  );
};

export default VisitorEntry;