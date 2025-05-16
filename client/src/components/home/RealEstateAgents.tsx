import { useQuery } from "@tanstack/react-query";
import { Agent } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export default function RealEstateAgents() {
  const { data: agents, isLoading, error } = useQuery<Agent[]>({
    queryKey: ["/api/agents"],
  });

  // Function to render agent card skeletons during loading
  const renderSkeletons = () => {
    return Array(4)
      .fill(0)
      .map((_, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 text-center">
            <Skeleton className="w-24 h-24 rounded-full mx-auto mb-3" />
            <Skeleton className="h-6 w-32 mx-auto mb-1" />
            <Skeleton className="h-4 w-40 mx-auto mb-3" />
            <div className="flex justify-center mb-3">
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="flex justify-center space-x-2">
              <Skeleton className="h-10 w-20" />
              <Skeleton className="h-10 w-24" />
            </div>
          </div>
        </div>
      ));
  };

  // Function to render star rating
  const renderRating = (rating: number) => {
    const fullStars = Math.floor(rating / 10);
    const halfStar = rating % 10 >= 5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    return (
      <div className="flex justify-center text-amber-400 mb-3">
        {[...Array(fullStars)].map((_, i) => (
          <i key={`full-${i}`} className="fas fa-star"></i>
        ))}
        {halfStar && <i className="fas fa-star-half-alt"></i>}
        {[...Array(emptyStars)].map((_, i) => (
          <i key={`empty-${i}`} className="far fa-star"></i>
        ))}
        <span className="ml-1 text-secondary-700 text-sm">
          {(rating / 10).toFixed(1)}
        </span>
      </div>
    );
  };

  return (
    <section className="container mx-auto px-4 mb-12">
      <h2 className="text-2xl md:text-3xl font-bold text-secondary-900 mb-6">
        Connect with Top Agents
      </h2>

      {error ? (
        <div className="text-center py-8">
          <p className="text-destructive">Failed to load agents. Please try again later.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading
            ? renderSkeletons()
            : agents?.map((agent) => (
                <div key={agent.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-4 text-center">
                    <img
                      src={agent.image}
                      alt={`${agent.name} - Real Estate Agent`}
                      className="w-24 h-24 rounded-full object-cover mx-auto mb-3"
                    />
                    <h3 className="font-bold text-lg">{agent.name}</h3>
                    <p className="text-sm text-secondary-500 mb-3">
                      {agent.company}
                    </p>
                    {renderRating(agent.rating)}
                    <div className="flex justify-center space-x-2">
                      <Button className="bg-primary-700 text-white text-sm px-4 py-2 rounded-md hover:bg-primary-800 transition-colors">
                        Contact
                      </Button>
                      <Button variant="outline" className="border border-secondary-300 text-secondary-700 text-sm px-4 py-2 rounded-md hover:bg-secondary-50 transition-colors">
                        View Profile
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      )}
    </section>
  );
}
