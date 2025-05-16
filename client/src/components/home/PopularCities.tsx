import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { City } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

export default function PopularCities() {
  const { data: cities, isLoading, error } = useQuery<City[]>({
    queryKey: ["/api/cities"],
  });

  // Function to render city card skeletons during loading
  const renderSkeletons = () => {
    return Array(4)
      .fill(0)
      .map((_, index) => (
        <div key={index} className="relative rounded-lg overflow-hidden shadow-md">
          <Skeleton className="w-full h-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
            <div className="absolute bottom-0 left-0 p-4">
              <Skeleton className="h-6 w-20 bg-gray-300/50" />
              <Skeleton className="h-4 w-24 mt-1 bg-gray-300/50" />
            </div>
          </div>
        </div>
      ));
  };

  return (
    <section className="container mx-auto px-4 mb-12">
      <h2 className="text-2xl md:text-3xl font-bold text-secondary-900 mb-6">
        Popular Cities
      </h2>

      {error ? (
        <div className="text-center py-8">
          <p className="text-destructive">Failed to load cities. Please try again later.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {isLoading
            ? renderSkeletons()
            : cities?.slice(0, 4).map((city) => (
                <Link key={city.id} href={`/properties?city=${city.name}`}>
                  <div className="group relative rounded-xl overflow-hidden shadow-lg cursor-pointer border border-secondary-100">
                    <img
                      src={city.image ?? '/placeholder-city.jpg'}
                      alt={`${city.name} city view`}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    />
                    <div className="absolute inset-0 city-card-overlay"></div>
                    <div className="absolute inset-0 flex flex-col justify-end p-4 transform transition-transform duration-300">
                      <div className="transform group-hover:translate-y-0 translate-y-2 transition-transform duration-300">
                        <h3 className="font-bold text-xl text-white mb-1">{city.name}</h3>
                        <div className="flex items-center">
                          <span className="inline-block w-10 h-0.5 bg-primary-400 mr-2"></span>
                          <p className="text-sm text-white/90 font-medium">
                            {city.propertiesCount.toLocaleString()}+ Properties
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
        </div>
      )}
    </section>
  );
}
