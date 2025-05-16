import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Property } from "@shared/schema";
import PropertyCard from "@/components/property/PropertyCard";
import { Skeleton } from "@/components/ui/skeleton";

export default function FeaturedProperties() {
  const { data: properties, isLoading, error } = useQuery<Property[]>({
    queryKey: ["/api/properties?featured=true"],
  });

  // Function to render property cards placeholder during loading
  const renderSkeletons = () => {
    return Array(4)
      .fill(0)
      .map((_, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
          <Skeleton className="w-full h-48" />
          <div className="p-4 space-y-4">
            <div className="flex justify-between">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-6 rounded-full" />
            </div>
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-5 w-40" />
            <div className="flex justify-between items-center">
              <div className="flex space-x-3">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-20" />
              </div>
              <Skeleton className="h-5 w-20" />
            </div>
          </div>
        </div>
      ));
  };

  return (
    <section className="container mx-auto px-4 py-8 mb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-secondary-900">Featured Properties</h2>
          <p className="text-secondary-600 mt-1">Handpicked properties for you</p>
        </div>
        <div className="mt-3 md:mt-0">
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm bg-white border border-secondary-200 rounded-md text-secondary-700 hover:bg-secondary-50">
              <i className="fas fa-sliders-h mr-1"></i> Filter
            </button>
            <button className="px-3 py-1 text-sm bg-white border border-secondary-200 rounded-md text-secondary-700 hover:bg-secondary-50">
              <i className="fas fa-sort mr-1"></i> Sort By
            </button>
          </div>
        </div>
      </div>

      {error ? (
        <div className="text-center py-8">
          <p className="text-destructive">Failed to load properties. Please try again later.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {isLoading
              ? renderSkeletons()
              : properties?.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
          </div>

          <div className="mt-8 text-center">
            <Link href="/properties">
              <Button variant="outline" className="px-6 py-2 border border-primary-700 text-primary-700 font-medium rounded-md hover:bg-primary-50 transition-colors">
                View All Properties
              </Button>
            </Link>
          </div>
        </>
      )}
    </section>
  );
}
