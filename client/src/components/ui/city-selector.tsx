import { useState, useRef, useEffect } from "react";
import { topCities, allCities } from "@/lib/cityData";

interface CitySelectorProps {
  selectedCity: string;
  onCityChange: (city: string) => void;
}

export default function CitySelector({ selectedCity, onCityChange }: CitySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCitySelect = (city: string) => {
    onCityChange(city);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-1 text-secondary-600 hover:text-primary-700"
      >
        <i className="fas fa-map-marker-alt text-primary-700"></i>
        <span className="text-sm font-medium">{selectedCity}</span>
        <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'} text-xs`}></i>
      </button>
      
      {isOpen && (
        <div className="absolute mt-2 w-64 bg-white rounded-md shadow-lg py-1 z-10 max-h-96 overflow-y-auto">
          {/* Top Cities */}
          <div className="px-4 py-2">
            <h3 className="font-semibold text-sm text-secondary-500">Top Cities</h3>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {topCities.map((city) => (
                <button
                  key={city}
                  onClick={() => handleCitySelect(city)}
                  className={`text-sm text-left hover:text-primary-700 ${
                    selectedCity === city ? "font-medium text-primary-700" : ""
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
          
          <div className="border-t border-secondary-100 my-2"></div>
          
          {/* All Cities (Alphabetical) */}
          <div className="px-4 py-2">
            <h3 className="font-semibold text-sm text-secondary-500">All Cities</h3>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {allCities.map((city) => (
                <button
                  key={city}
                  onClick={() => handleCitySelect(city)}
                  className={`text-sm text-left hover:text-primary-700 ${
                    selectedCity === city ? "font-medium text-primary-700" : ""
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
