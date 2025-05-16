import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { Property } from "@shared/schema";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PropertyDetails from "@/components/property/PropertyDetails";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/lib/utils";

export default function PropertyDetail() {
  const { id } = useParams();
  const { data: property, isLoading, error } = useQuery<Property>({
    queryKey: [`/api/properties/${id}`],
  });

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-destructive mb-4">Error</h1>
        <p className="mb-8">
          Failed to load property details. Please try again later.
        </p>
        <Link href="/properties">
          <Button>Back to Properties</Button>
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <Skeleton className="h-[400px] w-full mb-4 rounded-lg" />
            <div className="grid grid-cols-4 gap-2">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-24 w-full rounded-md" />
              ))}
            </div>
          </div>
          <div className="lg:w-1/3">
            <Skeleton className="h-[500px] w-full rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Property Not Found</h1>
        <p className="mb-8">The property you're looking for doesn't exist or has been removed.</p>
        <Link href="/properties">
          <Button>View All Properties</Button>
        </Link>
      </div>
    );
  }

  const formatPrice = (price: number, status: string) => {
    if (status === "For Rent") {
      return `₹${formatCurrency(price)}/month`;
    }
    return `₹${formatCurrency(price)}`;
  };

  return (
    <>
      <Helmet>
        <title>{`${property.title} | PropertyAdda`}</title>
        <meta
          name="description"
          content={`${property.title} - ${property.locality}, ${property.city}. ${property.description.substring(0, 150)}...`}
        />
        <meta property="og:title" content={`${property.title} | PropertyAdda`} />
        <meta property="og:description" content={`${property.title} - ${property.locality}, ${property.city}. ${property.description.substring(0, 150)}...`} />
        <meta property="og:image" content={property.images[0]} />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left column - Property images and details */}
          <div className="lg:w-2/3">
            {/* Property images */}
            <div className="mb-6">
              <img
                src={property.images[0]}
                alt={property.title}
                className="w-full h-[400px] object-cover rounded-lg mb-4"
              />
              <div className="grid grid-cols-4 gap-2">
                {property.images.slice(1).map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${property.title} - image ${index + 2}`}
                    className="h-24 w-full object-cover rounded-md cursor-pointer"
                  />
                ))}
              </div>
            </div>

            {/* Property details tabs */}
            <Tabs defaultValue="details" className="mb-8">
              <TabsList className="w-full">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="features">Features & Amenities</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="mt-4">
                <PropertyDetails property={property} />
              </TabsContent>
              
              <TabsContent value="features" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-4">Features & Amenities</h3>
                    {property.features && property.features.length > 0 ? (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {property.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <i className="fas fa-check-circle text-primary-600"></i>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-secondary-500">No features listed for this property.</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="location" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-2">Location</h3>
                    <p className="text-secondary-700 mb-4">{property.address}</p>
                    <div className="bg-secondary-100 h-64 rounded-lg flex items-center justify-center">
                      <p className="text-secondary-500">Map view is not available in this demo</p>
                    </div>
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Nearby Places</h4>
                      <p className="text-secondary-500">Information not available</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right column - Contact info and similar properties */}
          <div className="lg:w-1/3">
            <Card className="mb-6 sticky top-20">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold text-secondary-900">
                  {formatPrice(property.price, property.status)}
                </h2>
                <p className="text-secondary-500 mb-4">
                  {property.locality}, {property.city}
                </p>
                
                <div className="flex space-x-4 text-sm text-secondary-700 mb-6">
                  {property.bedrooms && (
                    <div>
                      <i className="fas fa-bed mr-1"></i>
                      <span>{property.bedrooms} Beds</span>
                    </div>
                  )}
                  {property.bathrooms && (
                    <div>
                      <i className="fas fa-bath mr-1"></i>
                      <span>{property.bathrooms} Baths</span>
                    </div>
                  )}
                  <div>
                    <i className="fas fa-vector-square mr-1"></i>
                    <span>{property.area} sq.ft.</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Button className="w-full bg-primary-700 hover:bg-primary-800">
                    <i className="fas fa-phone-alt mr-2"></i> Contact Owner
                  </Button>
                  <Button variant="outline" className="w-full border-primary-700 text-primary-700 hover:bg-primary-50">
                    <i className="far fa-envelope mr-2"></i> Send Enquiry
                  </Button>
                  <Button variant="outline" className="w-full">
                    <i className="far fa-heart mr-2"></i> Save Property
                  </Button>
                </div>
                
                <div className="mt-6 p-4 bg-secondary-50 rounded-lg border border-secondary-100">
                  <h3 className="font-semibold mb-2">Need a home loan?</h3>
                  <p className="text-sm text-secondary-600 mb-3">
                    Get the best home loan offers from our partners
                  </p>
                  <Button className="w-full bg-accent-500 hover:bg-accent-600">
                    Check Eligibility
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-8 mb-12">
          <h2 className="text-2xl font-bold text-secondary-900 mb-6">Similar Properties</h2>
          <p className="text-secondary-500 text-center py-8">
            Similar properties will appear here
          </p>
        </div>
      </div>
    </>
  );
}
