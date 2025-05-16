import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useRouter } from "wouter";
import { Property, propertyTypes, propertyStatus } from "@shared/schema";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PropertyCard from "@/components/property/PropertyCard";
import { Skeleton } from "@/components/ui/skeleton";

// Helper function to parse URL search params
function useQueryParams() {
  const [location] = useLocation();
  return new URLSearchParams(location.split("?")[1]);
}

export default function PropertyList() {
  const [location, setLocation] = useLocation();
  const queryParams = useQueryParams();
  
  // Extract search parameters
  const initialCity = queryParams.get("city") || "";
  const initialStatus = queryParams.get("status") || "";
  const initialSearch = queryParams.get("search") || "";
  
  // Filter state
  const [city, setCity] = useState(initialCity);
  const [status, setStatus] = useState(initialStatus);
  const [search, setSearch] = useState(initialSearch);
  const [propertyType, setPropertyType] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(10000000);
  const [bedrooms, setBedrooms] = useState<string>("");
  
  // Construct query string
  const getQueryString = () => {
    const params = new URLSearchParams();
    if (city) params.append("city", city);
    if (status) params.append("status", status);
    if (search) params.append("search", search);
    return params.toString();
  };
  
  // Fetch properties
  const { data: properties, isLoading, error } = useQuery<Property[]>({
    queryKey: [`/api/properties?${getQueryString()}`],
  });
  
  // Apply client-side filters to properties
  const filteredProperties = properties?.filter((property) => {
    if (propertyType && property.type !== propertyType) return false;
    if (property.price < minPrice || property.price > maxPrice) return false;
    if (bedrooms && property.bedrooms !== parseInt(bedrooms)) return false;
    return true;
  });
  
  // Handler for search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const queryString = getQueryString();
    setLocation(`/properties?${queryString}`);
  };
  
  // Reset all filters
  const resetFilters = () => {
    setCity("");
    setStatus("");
    setSearch("");
    setPropertyType("");
    setMinPrice(0);
    setMaxPrice(10000000);
    setBedrooms("");
    setLocation("/properties");
  };
  
  // Function to render property cards placeholder during loading
  const renderSkeletons = () => {
    return Array(8)
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

  const activeFiltersCount = [
    !!city, 
    !!status, 
    !!propertyType, 
    !!bedrooms, 
    minPrice > 0, 
    maxPrice < 10000000
  ].filter(Boolean).length;

  const pageTitle = city 
    ? `Properties in ${city} | PropertyAdda` 
    : status 
      ? `${status.replace("For ", "")} Properties | PropertyAdda` 
      : "Properties | PropertyAdda";

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta
          name="description"
          content={`Browse ${status || ""} properties ${city ? `in ${city}` : "across India"}. Find apartments, villas, plots and more on PropertyAdda.`}
        />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={`Browse ${status || ""} properties ${city ? `in ${city}` : "across India"}. Find apartments, villas, plots and more on PropertyAdda.`} />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        {/* Search bar */}
        <Card className="mb-8">
          <CardContent className="p-4">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <i className="fas fa-search text-secondary-400"></i>
                </div>
                <Input
                  type="text"
                  className="w-full pl-10 pr-3 py-2 border border-secondary-200 rounded-md"
                  placeholder="Search by locality, landmark, project, or builder"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Select value={city} onValueChange={setCity}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Select City" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Cities</SelectItem>
                  <SelectItem value="Delhi">Delhi</SelectItem>
                  <SelectItem value="Mumbai">Mumbai</SelectItem>
                  <SelectItem value="Bangalore">Bangalore</SelectItem>
                  <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                  <SelectItem value="Chennai">Chennai</SelectItem>
                  <SelectItem value="Kolkata">Kolkata</SelectItem>
                  <SelectItem value="Lucknow">Lucknow</SelectItem>
                  <SelectItem value="Auraiya">Auraiya</SelectItem>
                </SelectContent>
              </Select>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Property For" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Properties</SelectItem>
                  <SelectItem value="For Sale">Buy</SelectItem>
                  <SelectItem value="For Rent">Rent</SelectItem>
                </SelectContent>
              </Select>
              <Button type="submit" className="bg-primary-700 hover:bg-primary-800">
                Search
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left sidebar - Filters */}
          <div className="lg:w-1/4">
            <Card className="sticky top-20">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl">Filters</CardTitle>
                  {activeFiltersCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={resetFilters}
                      className="text-primary-700 hover:text-primary-800 hover:bg-primary-50 h-8"
                    >
                      Reset All
                    </Button>
                  )}
                </div>
                {activeFiltersCount > 0 && (
                  <CardDescription>
                    {activeFiltersCount} filter{activeFiltersCount > 1 ? 's' : ''} applied
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Property Type Filter */}
                <div className="space-y-3">
                  <h3 className="font-medium">Property Type</h3>
                  <Tabs value={propertyType || "all"} onValueChange={(value) => setPropertyType(value === "all" ? "" : value)}>
                    <TabsList className="w-full grid grid-cols-2 h-auto">
                      <TabsTrigger value="all" className="text-xs py-1 px-2">All Types</TabsTrigger>
                      <TabsTrigger value="Flat/Apartment" className="text-xs py-1 px-2">Apartment</TabsTrigger>
                      <TabsTrigger value="Villa" className="text-xs py-1 px-2">Villa</TabsTrigger>
                      <TabsTrigger value="Plot/Land" className="text-xs py-1 px-2">Plot/Land</TabsTrigger>
                      <TabsTrigger value="Builder Floor" className="text-xs py-1 px-2">Builder Floor</TabsTrigger>
                      <TabsTrigger value="House" className="text-xs py-1 px-2">House</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                {/* Budget Filter */}
                <div className="space-y-3">
                  <h3 className="font-medium">Budget (₹)</h3>
                  <div className="space-y-6">
                    <div className="flex justify-between text-sm">
                      <span>{minPrice.toLocaleString()}</span>
                      <span>{maxPrice.toLocaleString()}</span>
                    </div>
                    <Slider
                      defaultValue={[minPrice, maxPrice]}
                      min={0}
                      max={10000000}
                      step={100000}
                      onValueChange={(value) => {
                        setMinPrice(value[0]);
                        setMaxPrice(value[1]);
                      }}
                      className="my-4"
                    />
                    <div className="flex space-x-3">
                      <div className="w-1/2">
                        <Label htmlFor="min-price">Min</Label>
                        <Input
                          id="min-price"
                          type="number"
                          value={minPrice}
                          onChange={(e) => setMinPrice(Number(e.target.value))}
                        />
                      </div>
                      <div className="w-1/2">
                        <Label htmlFor="max-price">Max</Label>
                        <Input
                          id="max-price"
                          type="number"
                          value={maxPrice}
                          onChange={(e) => setMaxPrice(Number(e.target.value))}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bedrooms Filter */}
                <div className="space-y-3">
                  <h3 className="font-medium">Bedrooms</h3>
                  <div className="flex flex-wrap gap-2">
                    {["1", "2", "3", "4", "5+"].map((value) => (
                      <button
                        key={value}
                        className={`py-1 px-3 text-sm rounded-full border ${
                          bedrooms === value
                            ? "bg-primary-100 border-primary-300 text-primary-800"
                            : "border-secondary-200 hover:bg-secondary-50"
                        }`}
                        onClick={() => setBedrooms(bedrooms === value ? "" : value)}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Amenities Filter */}
                <div className="space-y-3">
                  <h3 className="font-medium">Amenities</h3>
                  <div className="space-y-2">
                    {["Swimming Pool", "Gym", "Parking", "Garden", "24x7 Security"].map((amenity) => (
                      <div key={amenity} className="flex items-center space-x-2">
                        <Checkbox id={`amenity-${amenity}`} />
                        <Label htmlFor={`amenity-${amenity}`} className="text-sm cursor-pointer">
                          {amenity}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Apply Filters Button (Mobile only) */}
                <div className="lg:hidden">
                  <Button className="w-full bg-primary-700 hover:bg-primary-800" onClick={handleSearch}>
                    Apply Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right content - Property listings */}
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-secondary-900">
                {city ? `Properties in ${city}` : status ? `${status.replace("For ", "")} Properties` : "All Properties"}
                {properties && properties.length > 0 && <span className="text-lg font-medium text-secondary-500 ml-2">({properties.length})</span>}
              </h1>
              <div className="flex items-center">
                <Select defaultValue="newest">
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="price-asc">Price (Low to High)</SelectItem>
                    <SelectItem value="price-desc">Price (High to Low)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {error ? (
              <div className="text-center py-12">
                <p className="text-destructive">Failed to load properties. Please try again later.</p>
                <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
                  Retry
                </Button>
              </div>
            ) : (
              <>
                {isLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {renderSkeletons()}
                  </div>
                ) : filteredProperties && filteredProperties.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredProperties.map((property) => (
                      <PropertyCard key={property.id} property={property} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                    <div className="text-6xl mb-4">🏠</div>
                    <h2 className="text-2xl font-bold mb-2">No Properties Found</h2>
                    <p className="text-secondary-500 mb-6">
                      We couldn't find any properties matching your search criteria.
                    </p>
                    <Button variant="outline" onClick={resetFilters}>
                      Clear All Filters
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
