import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function PropertyGuide() {
  return (
    <section className="container mx-auto px-4 mb-12">
      <div className="bg-secondary-50 rounded-lg p-6 border border-secondary-100">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-2/3 mb-4 md:mb-0">
            <h2 className="text-2xl md:text-3xl font-bold text-secondary-900 mb-3">
              Looking to sell your property?
            </h2>
            <p className="text-secondary-600">
              List your property on PropertyAdda and reach thousands of genuine
              buyers and tenants.
            </p>
            <div className="mt-6 space-y-3 md:space-y-0 md:flex md:space-x-4">
              <Link href="/post-property">
                <Button className="w-full md:w-auto bg-primary-700 text-white font-medium px-6 py-3 rounded-md hover:bg-primary-800 transition-colors">
                  Post Your Property FREE
                </Button>
              </Link>
              <Button
                variant="outline"
                className="w-full md:w-auto border border-primary-700 text-primary-700 font-medium px-6 py-3 rounded-md hover:bg-primary-50 transition-colors"
              >
                Learn More
              </Button>
            </div>
          </div>
          <div className="md:w-1/3 flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200"
              alt="Property seller and buyer shaking hands"
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
