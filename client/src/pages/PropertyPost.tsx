import { useAuth } from "@/components/auth/AuthProvider";
import PropertyForm from "@/components/property/PropertyForm";
import { Helmet } from "react-helmet";
import { useRouter } from "wouter";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export default function PropertyPost() {
  const { user, isLoading } = useAuth();
  const { toast } = useToast();
  const [, navigate] = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      toast({
        title: "Login Required",
        description: "You need to be logged in to post a property.",
      });
    }
  }, [user, isLoading, toast]);

  return (
    <>
      <Helmet>
        <title>Post Your Property | PropertyAdda</title>
        <meta
          name="description"
          content="List your property for sale or rent on PropertyAdda for free. Reach thousands of genuine buyers and tenants across India."
        />
        <meta property="og:title" content="Post Your Property | PropertyAdda" />
        <meta property="og:description" content="List your property for sale or rent on PropertyAdda for free. Reach thousands of genuine buyers and tenants across India." />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-secondary-900 mb-2">
                Post Your Property
              </h1>
              <p className="text-secondary-600">
                Fill in the details below to list your property on PropertyAdda
              </p>
            </div>

            <PropertyForm />
          </div>

          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
              <h2 className="text-xl font-bold mb-4">Why Post on PropertyAdda?</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-eye"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold">Maximum Visibility</h3>
                    <p className="text-sm text-secondary-600">
                      Your property gets exposure to thousands of potential buyers and tenants.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-rupee-sign"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold">Completely Free</h3>
                    <p className="text-sm text-secondary-600">
                      List your property at no cost and get genuine leads.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-user-shield"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold">Verified Buyers</h3>
                    <p className="text-sm text-secondary-600">
                      Connect with serious and verified property seekers.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-headset"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold">Dedicated Support</h3>
                    <p className="text-sm text-secondary-600">
                      Our team is available to help you with any queries or assistance.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-secondary-50 rounded-lg border border-secondary-100">
                <h3 className="font-semibold mb-2">Need help?</h3>
                <p className="text-sm text-secondary-600 mb-3">
                  Contact our support team for assistance with property posting
                </p>
                <Button variant="outline" className="w-full">
                  <i className="fas fa-phone-alt mr-2"></i> Call Support
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
