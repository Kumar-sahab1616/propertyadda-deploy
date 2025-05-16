import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { topCities, allCities } from "@/lib/cityData";
import { useAuth } from "@/components/auth/AuthProvider";
import LoginModal from "@/components/auth/LoginModal";
import RegisterModal from "@/components/auth/RegisterModal";
import CitySelector from "@/components/ui/city-selector";

export default function Header() {
  const [location, setLocation] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Lucknow");
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const { user, logout } = useAuth();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
  };

  const openLoginModal = () => {
    setLoginModalOpen(true);
    setRegisterModalOpen(false);
  };

  const openRegisterModal = () => {
    setRegisterModalOpen(true);
    setLoginModalOpen(false);
  };

  const closeModals = () => {
    setLoginModalOpen(false);
    setRegisterModalOpen(false);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-secondary-100">
      {/* Top Bar */}
      <div className="bg-primary text-white py-1">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex space-x-4 text-xs">
            <a href="#" className="hover:underline flex items-center">
              <i className="fas fa-download mr-1"></i> Download App
            </a>
            <a href="#" className="hover:underline flex items-center">
              <i className="fas fa-briefcase mr-1"></i> PropertyAdda for Business
            </a>
            <a href="#" className="hover:underline flex items-center">
              <i className="fas fa-ad mr-1"></i> Advertise
            </a>
          </div>
          <div className="flex space-x-4 text-xs">
            <a href="#" className="hover:underline flex items-center">
              <i className="fas fa-blog mr-1"></i> Blog
            </a>
            <a href="#" className="hover:underline flex items-center">
              <i className="fas fa-question-circle mr-1"></i> Help
            </a>
            <a href="#" className="hover:underline flex items-center">
              <i className="fas fa-envelope mr-1"></i> Contact Us
            </a>
          </div>
        </div>
      </div>
      
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="flex items-center">
              <span className="text-2xl font-bold">
                <span className="text-primary">Property</span><span className="text-primary">Adda</span>
                <span className="text-xs bg-primary text-white px-1 rounded-sm ml-1">.com</span>
              </span>
            </div>
          </Link>

          {/* City Selector (Desktop) */}
          <div className="hidden md:flex items-center ml-6">
            <CitySelector
              selectedCity={selectedCity}
              onCityChange={handleCityChange}
            />
          </div>

          {/* Main Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/properties?status=For Sale" className="flex flex-col items-center text-sm font-medium hover:text-primary transition-colors duration-200">
              <i className="fas fa-home text-lg mb-1"></i> Buy
            </Link>
            <Link href="/properties?status=For Rent" className="flex flex-col items-center text-sm font-medium hover:text-primary transition-colors duration-200">
              <i className="fas fa-key text-lg mb-1"></i> Rent
            </Link>
            <Link href="/post-property" className="flex flex-col items-center text-sm font-medium hover:text-primary transition-colors duration-200">
              <i className="fas fa-tag text-lg mb-1"></i> Sell
            </Link>
            <Link href="#" className="flex flex-col items-center text-sm font-medium hover:text-primary transition-colors duration-200">
              <i className="fas fa-tools text-lg mb-1"></i> Home Services
            </Link>
            <Link href="#" className="flex flex-col items-center text-sm font-medium hover:text-primary transition-colors duration-200">
              <i className="fas fa-building text-lg mb-1"></i> PG/Co-living
            </Link>
            <Link href="#" className="flex flex-col items-center text-sm font-medium hover:text-primary transition-colors duration-200">
              <i className="fas fa-briefcase text-lg mb-1"></i> Commercial
            </Link>
            <Link href="#" className="flex flex-col items-center text-sm font-medium hover:text-primary transition-colors duration-200">
              <i className="fas fa-map-marked-alt text-lg mb-1"></i> Plot
            </Link>
          </div>

          {/* Auth Navigation */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="hidden md:flex items-center space-x-4">
                <div className="flex items-center space-x-2 py-1 px-3">
                  <i className="fas fa-user-circle text-primary"></i>
                  <span className="text-sm font-medium text-secondary-700">Hi, {user.username}</span>
                </div>
                {user.role === "admin" && (
                  <Link href="/admin" className="text-sm font-medium text-primary hover:text-primary transition-colors">
                    <i className="fas fa-cog mr-1"></i> Admin
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-secondary-600 hover:text-secondary-800 transition-colors"
                >
                  <i className="fas fa-sign-out-alt mr-1"></i> Logout
                </button>
              </div>
            ) : (
              <button
                onClick={openLoginModal}
                className="hidden md:flex items-center border border-primary rounded-full px-5 py-1.5 text-sm font-medium text-primary hover:bg-primary/5 transition-colors"
              >
                <i className="fas fa-user mr-1"></i> Login
              </button>
            )}
            <Link href="/post-property">
              <Button className="bg-primary hover:bg-primary/90 text-white text-sm font-medium px-5 py-2 rounded-full shadow-sm hover:shadow-md transition-all">
                <i className="fas fa-plus-circle mr-1"></i> Post Property FREE
              </Button>
            </Link>
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden bg-secondary-100 p-2 rounded-md text-secondary-700 hover:bg-secondary-200 transition-colors"
            >
              <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-lg`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-3 animate-in slide-in-from-top-5 duration-300">
            <div className="bg-secondary-50 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between pb-3 border-b border-secondary-100">
                <div className="flex items-center space-x-2 text-secondary-600">
                  <i className="fas fa-map-marker-alt text-primary-600"></i>
                  <span className="text-sm font-medium">{selectedCity}</span>
                  <i className="fas fa-chevron-down text-xs"></i>
                </div>
                {user ? (
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2 bg-white py-1 px-3 rounded-full">
                      <i className="fas fa-user-circle text-primary-600"></i>
                      <span className="text-sm font-medium text-secondary-700">
                        {user.username}
                      </span>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={openLoginModal}
                    className="text-sm font-medium bg-white py-1.5 px-4 rounded-full text-primary-600 shadow-sm flex items-center"
                  >
                    <i className="fas fa-user mr-1"></i> Login
                  </button>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/properties?status=For Sale"
                className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-secondary-100"
              >
                <i className="fas fa-home text-primary-600 text-xl mb-2"></i>
                <span className="text-sm font-medium">Buy</span>
              </Link>
              <Link
                href="/properties?status=For Rent"
                className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-secondary-100"
              >
                <i className="fas fa-key text-primary-600 text-xl mb-2"></i>
                <span className="text-sm font-medium">Rent</span>
              </Link>
              <Link
                href="/post-property"
                className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-secondary-100"
              >
                <i className="fas fa-tag text-primary-600 text-xl mb-2"></i>
                <span className="text-sm font-medium">Sell</span>
              </Link>
              <Link
                href="#"
                className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-secondary-100"
              >
                <i className="fas fa-rupee-sign text-primary-600 text-xl mb-2"></i>
                <span className="text-sm font-medium">Home Loans</span>
              </Link>
              <Link
                href="#"
                className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-secondary-100"
              >
                <i className="fas fa-tools text-primary-600 text-xl mb-2"></i>
                <span className="text-sm font-medium">Services</span>
              </Link>
              {user && (
                <button
                  onClick={handleLogout}
                  className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-secondary-100"
                >
                  <i className="fas fa-sign-out-alt text-accent-500 text-xl mb-2"></i>
                  <span className="text-sm font-medium">Logout</span>
                </button>
              )}
              {user && user.role === "admin" && (
                <Link
                  href="/admin"
                  className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-secondary-100"
                >
                  <i className="fas fa-cog text-primary-600 text-xl mb-2"></i>
                  <span className="text-sm font-medium">Admin Panel</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Login Modal */}
      <LoginModal
        isOpen={loginModalOpen}
        onClose={closeModals}
        onRegisterClick={openRegisterModal}
      />

      {/* Register Modal */}
      <RegisterModal
        isOpen={registerModalOpen}
        onClose={closeModals}
        onLoginClick={openLoginModal}
      />
    </header>
  );
}
