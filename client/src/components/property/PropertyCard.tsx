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
    <Card className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full">
      <div className="relative">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-48 object-cover"
        />
        <div
          className={`absolute top-3 right-3 ${
            property.status === "For Sale"
              ? "bg-primary-700"
              : "bg-accent-500"
          } text-white text-xs font-medium px-2 py-1 rounded`}
        >
          {property.status}
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg text-secondary-900">
              {formatPrice(property.price, property.status)}
            </h3>
            <p className="text-sm text-secondary-500">
              {property.locality}, {property.city}
            </p>
          </div>
          <button
            onClick={toggleFavorite}
            className={`${
              isFavorite ? "text-red-500" : "text-accent-500"
            } hover:text-accent-600`}
          >
            <i className={`${isFavorite ? "fas" : "far"} fa-heart text-xl`}></i>
          </button>
        </div>
        <div className="mt-3">
          <h4 className="font-semibold">{property.title}</h4>
          <p className="text-sm text-secondary-600 mt-1">{property.area} sq.ft.</p>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex space-x-3 text-xs text-secondary-500">
            {property.bedrooms && (
              <span>
                <i className="fas fa-bed mr-1"></i> {property.bedrooms}
              </span>
            )}
            {property.bathrooms && (
              <span>
                <i className="fas fa-bath mr-1"></i> {property.bathrooms}
              </span>
            )}
            <span>
              <i className="fas fa-vector-square mr-1"></i> {property.area} sq.ft.
            </span>
          </div>
          <Link href={`/properties/${property.id}`}>
            <Button
              variant="link"
              className="text-primary-700 text-sm font-medium hover:text-primary-800 p-0"
            >
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
