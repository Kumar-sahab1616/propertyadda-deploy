import { useState } from "react";
import { Link } from "wouter";
import { Property } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const formatPrice = (price: number, status: string) => {
    if (status === "For Rent") {
      return `₹${formatCurrency(price)}/month`;
    }
    return `₹${formatCurrency(price)}`;
  };

  return (
    <Card className="property-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full border border-secondary-100">
      <div className="relative">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-52 object-cover hover:scale-105 transition-transform duration-500"
        />
        <div
          className={`absolute top-3 right-3 ${
            property.status === "For Sale"
              ? "bg-primary-600"
              : "featured-tag"
          } text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm`}
        >
          {property.status}
        </div>
        {property.featured && (
          <div className="absolute top-3 left-3 bg-yellow-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
            <i className="fas fa-star mr-1"></i> Featured
          </div>
        )}
      </div>
      <CardContent className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-xl text-secondary-900">
              {formatPrice(property.price, property.status)}
            </h3>
            <p className="text-sm text-secondary-500 flex items-center mt-1">
              <i className="fas fa-map-marker-alt text-primary-500 mr-1"></i>
              {property.locality}, {property.city}
            </p>
          </div>
          <button
            onClick={toggleFavorite}
            className={`${
              isFavorite ? "text-red-500" : "text-gray-400"
            } hover:text-red-500 transition-colors p-2 hover:bg-gray-100 rounded-full`}
          >
            <i className={`${isFavorite ? "fas" : "far"} fa-heart text-xl`}></i>
          </button>
        </div>
        <div className="mt-3 border-t border-gray-100 pt-3">
          <h4 className="font-semibold text-secondary-800 line-clamp-1">{property.title}</h4>
          <p className="text-sm text-secondary-600 mt-1 line-clamp-2">{property.description.substring(0, 80)}...</p>
        </div>
        <div className="flex items-center mt-4 bg-secondary-50 p-2 rounded-lg">
          <div className="grid grid-cols-3 gap-2 w-full text-xs text-secondary-700">
            {property.bedrooms && (
              <div className="flex flex-col items-center p-1">
                <i className="fas fa-bed text-primary-500 text-sm mb-1"></i>
                <span>{property.bedrooms} Beds</span>
              </div>
            )}
            {property.bathrooms && (
              <div className="flex flex-col items-center p-1">
                <i className="fas fa-bath text-primary-500 text-sm mb-1"></i>
                <span>{property.bathrooms} Baths</span>
              </div>
            )}
            <div className="flex flex-col items-center p-1">
              <i className="fas fa-vector-square text-primary-500 text-sm mb-1"></i>
              <span>{property.area} sq.ft.</span>
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <Link href={`/properties/${property.id}`}>
            <Button
              className="bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium px-4 py-1 rounded-lg shadow-sm"
            >
              View Details <i className="fas fa-arrow-right ml-1"></i>
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
