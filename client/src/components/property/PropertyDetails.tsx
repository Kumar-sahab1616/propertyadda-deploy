import { Property } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { formatCurrency } from "@/lib/utils";

interface PropertyDetailsProps {
  property: Property;
}

export default function PropertyDetails({ property }: PropertyDetailsProps) {
  const formatCreatedAt = (dateString: string | Date) => {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    return formatDistanceToNow(date, { addSuffix: true });
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <h2 className="text-xl font-bold mb-4">{property.title}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">Overview</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-secondary-500">Type</span>
                <span className="font-medium">{property.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary-500">Status</span>
                <span className="font-medium">{property.status}</span>
              </div>
              {property.bedrooms && (
                <div className="flex justify-between">
                  <span className="text-secondary-500">Bedrooms</span>
                  <span className="font-medium">{property.bedrooms}</span>
                </div>
              )}
              {property.bathrooms && (
                <div className="flex justify-between">
                  <span className="text-secondary-500">Bathrooms</span>
                  <span className="font-medium">{property.bathrooms}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-secondary-500">Area</span>
                <span className="font-medium">{property.area} sq.ft.</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary-500">Price</span>
                <span className="font-medium">
                  ₹{formatCurrency(property.price)}
                  {property.status === "For Rent" && "/month"}
                </span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Location</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-secondary-500">City</span>
                <span className="font-medium">{property.city}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary-500">Locality</span>
                <span className="font-medium">{property.locality}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary-500">Address</span>
                <span className="font-medium">{property.address}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary-500">Listed</span>
                <span className="font-medium">
                  {formatCreatedAt(property.createdAt)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary-500">Property ID</span>
                <span className="font-medium">PA-{property.id}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Description</h3>
          <p className="text-secondary-700 whitespace-pre-line">
            {property.description}
          </p>
        </div>
        
        {property.features && property.features.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Key Features</h3>
            <ul className="list-disc pl-5 space-y-1 text-secondary-700">
              {property.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
