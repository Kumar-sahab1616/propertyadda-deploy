import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function HeroSection() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("buy");
  const [selectedPropertyType, setSelectedPropertyType] = useState("all");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const status = selectedTab === "buy" ? "For Sale" : "For Rent";
    setLocation(`/properties?status=${status}&search=${searchQuery}`);
  };

  const propertyTypes = [
    { id: "all", label: "All Residential" },
    { id: "flat", label: "Flat/Apartment" },
    { id: "villa", label: "Villa" },
    { id: "builder", label: "Builder Floor" },
    { id: "plot", label: "Plot/Land" },
  ];

  return (
    <section className="relative bg-gradient-to-r from-primary-900 to-primary-800 py-12 md:py-24">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 bg-black opacity-40 z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Find Your Dream Property
          </h1>
          <p className="text-lg md:text-xl text-white opacity-90">
            Discover the perfect home across India with PropertyAdda
          </p>
        </div>

        {/* Search Box */}
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-4">
          {/* Tab Navigation */}
          <Tabs defaultValue="buy" value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="mb-4 w-full bg-transparent border-b">
              <TabsTrigger 
                value="buy" 
                className="data-[state=active]:text-primary-700 data-[state=active]:border-b-2 data-[state=active]:border-primary-700 data-[state=inactive]:text-secondary-500"
              >
                Buy
              </TabsTrigger>
              <TabsTrigger 
                value="rent" 
                className="data-[state=active]:text-primary-700 data-[state=active]:border-b-2 data-[state=active]:border-primary-700 data-[state=inactive]:text-secondary-500"
              >
                Rent
              </TabsTrigger>
              <TabsTrigger 
                value="pg" 
                className="data-[state=active]:text-primary-700 data-[state=active]:border-b-2 data-[state=active]:border-primary-700 data-[state=inactive]:text-secondary-500"
              >
                PG/Co-living
              </TabsTrigger>
              <TabsTrigger 
                value="commercial" 
                className="data-[state=active]:text-primary-700 data-[state=active]:border-b-2 data-[state=active]:border-primary-700 data-[state=inactive]:text-secondary-500"
              >
                Commercial
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="buy">
              <form onSubmit={handleSearch} className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <i className="fas fa-search text-secondary-400"></i>
                  </div>
                  <Input
                    type="text"
                    className="w-full pl-10 pr-3 py-3 border border-secondary-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Search by locality, landmark, project, or builder"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-primary-700 hover:bg-primary-800 text-white font-medium px-6 py-3 rounded-md transition-colors"
                >
                  Search
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="rent">
              <form onSubmit={handleSearch} className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <i className="fas fa-search text-secondary-400"></i>
                  </div>
                  <Input
                    type="text"
                    className="w-full pl-10 pr-3 py-3 border border-secondary-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Search by locality, landmark, project, or builder"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-primary-700 hover:bg-primary-800 text-white font-medium px-6 py-3 rounded-md transition-colors"
                >
                  Search
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="pg">
              <form onSubmit={handleSearch} className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <i className="fas fa-search text-secondary-400"></i>
                  </div>
                  <Input
                    type="text"
                    className="w-full pl-10 pr-3 py-3 border border-secondary-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Search by locality, landmark, or hostel name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-primary-700 hover:bg-primary-800 text-white font-medium px-6 py-3 rounded-md transition-colors"
                >
                  Search
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="commercial">
              <form onSubmit={handleSearch} className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <i className="fas fa-search text-secondary-400"></i>
                  </div>
                  <Input
                    type="text"
                    className="w-full pl-10 pr-3 py-3 border border-secondary-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Search commercial properties"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-primary-700 hover:bg-primary-800 text-white font-medium px-6 py-3 rounded-md transition-colors"
                >
                  Search
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          {/* Property Type Filters */}
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-sm font-medium text-secondary-600 self-center mr-2">
              Property Type:
            </span>
            {propertyTypes.map((type) => (
              <button
                key={type.id}
                className={`text-xs md:text-sm px-3 py-1 rounded-full hover:bg-primary-200 transition-colors ${
                  selectedPropertyType === type.id
                    ? "bg-primary-100 text-primary-800"
                    : "bg-secondary-100 text-secondary-700"
                }`}
                onClick={() => setSelectedPropertyType(type.id)}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
