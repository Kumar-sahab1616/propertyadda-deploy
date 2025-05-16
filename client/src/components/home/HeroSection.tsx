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
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80" 
          alt="House with red walls" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-md">
            Find Your Perfect Home &<br />Professional Services
          </h1>
          <p className="text-lg md:text-xl text-white opacity-90 mb-8 max-w-2xl mx-auto">
            Discover properties and home services tailored to your needs
          </p>
        </div>

        {/* City Selection */}
        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-full shadow-md px-2 py-0.5 inline-flex items-center space-x-1">
            <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
              <i className="fas fa-map-marker-alt mr-1"></i> DELHI NCR <i className="fas fa-chevron-down ml-1 text-xs"></i>
            </span>
            <span className="px-2 py-1 text-sm">Mumbai</span>
            <span className="px-2 py-1 text-sm">Bangalore</span>
            <span className="px-2 py-1 text-sm">Hyderabad</span>
            <span className="px-2 py-1 text-sm">Pune</span>
            <span className="px-2 py-1 text-sm">Chennai</span>
            <span className="px-2 py-1 text-sm">Kolkata</span>
            <span className="px-2 py-1 text-sm">+ more</span>
          </div>
        </div>
        
        {/* Search Box */}
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-5">
          {/* Tab Navigation */}
          <Tabs defaultValue="buy" value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="mb-6 w-full p-0 bg-transparent border-b border-gray-200">
              <TabsTrigger 
                value="buy" 
                className="data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=inactive]:text-secondary-600 rounded-none px-6 py-2.5 transition-all duration-200"
              >
                <i className="fas fa-home mr-2"></i> Buy
              </TabsTrigger>
              <TabsTrigger 
                value="rent" 
                className="data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=inactive]:text-secondary-600 rounded-none px-6 py-2.5 transition-all duration-200"
              >
                <i className="fas fa-key mr-2"></i> Rent
              </TabsTrigger>
              <TabsTrigger 
                value="pg" 
                className="data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=inactive]:text-secondary-600 rounded-none px-6 py-2.5 transition-all duration-200"
              >
                <i className="fas fa-building mr-2"></i> PG/Co-living
              </TabsTrigger>
              <TabsTrigger 
                value="commercial" 
                className="data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=inactive]:text-secondary-600 rounded-none px-6 py-2.5 transition-all duration-200"
              >
                <i className="fas fa-briefcase mr-2"></i> Commercial
              </TabsTrigger>
              <TabsTrigger 
                value="plot" 
                className="data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=inactive]:text-secondary-600 rounded-none px-6 py-2.5 transition-all duration-200"
              >
                <i className="fas fa-map-marked-alt mr-2"></i> Plot
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="buy">
              <form onSubmit={handleSearch} className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
                <div className="relative flex-grow">
                  <Input
                    type="text"
                    className="w-full pl-4 pr-3 py-3 border border-secondary-200 rounded focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    placeholder="Search by locality, landmark, project, or builder"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-white font-medium px-8 py-3 rounded"
                >
                  Search
                </Button>
              </form>
              <div className="flex justify-between mt-4 text-sm text-secondary-600">
                <div className="flex space-x-4">
                  <a href="#" className="hover:text-primary">
                    <i className="fas fa-calculator mr-1"></i> EMI Calculator
                  </a>
                  <a href="#" className="hover:text-primary">
                    <i className="fas fa-exchange-alt mr-1"></i> Area Converter
                  </a>
                  <a href="#" className="hover:text-primary">
                    <i className="fas fa-chart-line mr-1"></i> Property Rates
                  </a>
                </div>
                <div className="flex space-x-4">
                  <a href="#" className="hover:text-primary">
                    <i className="fas fa-hand-holding-usd mr-1"></i> Investment Advice
                  </a>
                  <a href="#" className="hover:text-primary">
                    <i className="fas fa-user-tie mr-1"></i> Owner Services
                  </a>
                </div>
              </div>
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
