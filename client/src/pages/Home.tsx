import HeroSection from "@/components/home/HeroSection";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import PopularCities from "@/components/home/PopularCities";
import PropertyServices from "@/components/home/PropertyServices";
import RealEstateAgents from "@/components/home/RealEstateAgents";
import PropertyGuide from "@/components/home/PropertyGuide";
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>PropertyAdda - Find Your Dream Property Across India</title>
        <meta
          name="description"
          content="PropertyAdda helps you find your dream property across India. Buy, sell, or rent residential and commercial properties with ease."
        />
        <meta property="og:title" content="PropertyAdda - Find Your Dream Property Across India" />
        <meta property="og:description" content="PropertyAdda helps you find your dream property across India. Buy, sell, or rent residential and commercial properties with ease." />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="flex flex-col">
        <HeroSection />
        <FeaturedProperties />
        <PopularCities />
        <PropertyServices />
        <RealEstateAgents />
        <PropertyGuide />
      </div>
    </>
  );
}
