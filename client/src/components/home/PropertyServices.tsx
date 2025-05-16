import { useQuery } from "@tanstack/react-query";
import { Service } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

export default function PropertyServices() {
  const { data: services, isLoading, error } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  // Function to render service skeletons during loading
  const renderSkeletons = () => {
    return Array(4)
      .fill(0)
      .map((_, index) => (
        <div key={index} className="text-center p-4 rounded-lg">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
            <Skeleton className="w-8 h-8 rounded" />
          </div>
          <Skeleton className="h-5 w-24 mx-auto" />
          <Skeleton className="h-4 w-36 mx-auto mt-1" />
        </div>
      ));
  };

  // Function to get the appropriate FontAwesome icon
  const getIconClass = (iconName: string) => {
    return `fas fa-${iconName} text-xl`;
  };

  return (
    <section className="container mx-auto px-4 mb-12">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl md:text-3xl font-bold text-secondary-900 mb-6">
          Property Services
        </h2>

        {error ? (
          <div className="text-center py-4">
            <p className="text-destructive">Failed to load services. Please try again later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {isLoading
              ? renderSkeletons()
              : services?.map((service) => (
                  <div
                    key={service.id}
                    className="text-center p-4 rounded-lg hover:bg-secondary-50 transition-colors cursor-pointer"
                  >
                    <div className="w-16 h-16 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center mx-auto mb-3">
                      <i className={getIconClass(service.icon)}></i>
                    </div>
                    <h3 className="font-semibold">{service.name}</h3>
                    <p className="text-xs text-secondary-500 mt-1">
                      {service.description}
                    </p>
                  </div>
                ))}
          </div>
        )}
      </div>
    </section>
  );
}
