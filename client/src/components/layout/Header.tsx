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
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary-800">
              Property<span className="text-accent-500">Adda</span>
            </span>
          </Link>

          {/* City Selector (Desktop) */}
          <div className="hidden md:flex items-center">
            <CitySelector
              selectedCity={selectedCity}
              onCityChange={handleCityChange}
            />
          </div>

          {/* Main Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/properties?status=For Sale" className="text-sm font-medium hover:text-primary-700">
              Buy
            </Link>
            <Link href="/properties?status=For Rent" className="text-sm font-medium hover:text-primary-700">
              Rent
            </Link>
            <Link href="/post-property" className="text-sm font-medium hover:text-primary-700">
              Sell
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-primary-700">
              Home Loans
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-primary-700">
              Property Services
            </Link>
          </div>

          {/* Auth Navigation */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="hidden md:flex items-center space-x-4">
                <span className="text-sm font-medium text-secondary-700">Hi, {user.username}</span>
                {user.role === "admin" && (
                  <Link href="/admin" className="text-sm font-medium text-primary-700 hover:text-primary-800">
                    Admin
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-primary-700 hover:text-primary-800"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={openLoginModal}
                className="hidden md:block text-sm font-medium text-primary-700 hover:text-primary-800"
              >
                Login
              </button>
            )}
            <Link href="/post-property">
              <Button className="bg-primary-700 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-primary-800 transition">
                Post Property <span className="hidden md:inline">FREE</span>
              </Button>
            </Link>
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden text-secondary-700"
            >
              <i className="fas fa-bars text-lg"></i>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pb-2">
            <div className="flex items-center justify-between pb-3">
              <div className="flex items-center space-x-1 text-secondary-600">
                <i className="fas fa-map-marker-alt text-primary-700"></i>
                <span className="text-sm font-medium">{selectedCity}</span>
                <i className="fas fa-chevron-down text-xs"></i>
              </div>
              {user ? (
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-secondary-700">
                    Hi, {user.username}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-sm font-medium text-primary-700"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={openLoginModal}
                  className="text-sm font-medium text-primary-700"
                >
                  Login / Register
                </button>
              )}
            </div>
            <div className="flex flex-col space-y-3 border-t border-secondary-100 pt-3">
              <Link
                href="/properties?status=For Sale"
                className="text-sm font-medium hover:text-primary-700"
              >
                Buy
              </Link>
              <Link
                href="/properties?status=For Rent"
                className="text-sm font-medium hover:text-primary-700"
              >
                Rent
              </Link>
              <Link
                href="/post-property"
                className="text-sm font-medium hover:text-primary-700"
              >
                Sell
              </Link>
              <Link
                href="#"
                className="text-sm font-medium hover:text-primary-700"
              >
                Home Loans
              </Link>
              <Link
                href="#"
                className="text-sm font-medium hover:text-primary-700"
              >
                Property Services
              </Link>
              {user && user.role === "admin" && (
                <Link
                  href="/admin"
                  className="text-sm font-medium hover:text-primary-700"
                >
                  Admin Panel
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
