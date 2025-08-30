import VisitorForm from '@/components/VisitorForm';
import Navbar from '@/components/Navbar';

const VisitorEntry = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <Navbar />
      <div className="max-w-4xl mx-auto p-3 sm:p-4 lg:p-6 space-y-6 sm:space-y-8">
        
        <div className="text-center space-y-2 sm:space-y-3 px-2 sm:px-0">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-tight">
            Welcome to Our Hostel
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We're glad to have you visit us today. Please complete the quick registration below to ensure a smooth and secure experience for everyone.
          </p>
        </div>

        <VisitorForm />

        <div className="text-center text-xs sm:text-sm text-muted-foreground px-4 sm:px-0">
          <p>Your information is securely stored and only used for visitor management purposes.</p>
        </div>
      </div>
    </div>
  );
};

export default VisitorEntry;