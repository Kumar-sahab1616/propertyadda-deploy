import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-secondary-900 to-secondary-950 text-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-64 h-64 bg-primary-500 opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-500 opacity-5 rounded-full blur-3xl"></div>
      </div>
      
      {/* Footer Content */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Top Section with Logo and Newsletter */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 pb-10 border-b border-secondary-800">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center">
              <i className="fas fa-building text-primary-500 mr-2 text-3xl"></i>
              <h2 className="text-2xl font-bold">
                <span className="text-primary-400">Property</span><span className="text-accent-400">Adda</span>
              </h2>
            </div>
            <p className="text-secondary-300 mt-2 max-w-md">
              Your trusted partner in finding your dream property across India.
            </p>
          </div>
          
          <div className="flex space-x-3">
            <a href="#" className="w-10 h-10 bg-secondary-800 hover:bg-primary-700 text-white rounded-full flex items-center justify-center transition-colors duration-300">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="w-10 h-10 bg-secondary-800 hover:bg-primary-700 text-white rounded-full flex items-center justify-center transition-colors duration-300">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="w-10 h-10 bg-secondary-800 hover:bg-primary-700 text-white rounded-full flex items-center justify-center transition-colors duration-300">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="w-10 h-10 bg-secondary-800 hover:bg-primary-700 text-white rounded-full flex items-center justify-center transition-colors duration-300">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h3 className="text-lg font-semibold mb-6 flex items-center">
              <i className="fas fa-info-circle text-primary-500 mr-2"></i>
              <span className="relative inline-block">
                About Us
                <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-primary-500"></span>
              </span>
            </h3>
            <p className="text-secondary-400 mb-4 leading-relaxed">
              PropertyAdda is India's leading online real estate marketplace to buy, sell, and rent residential and commercial properties.
            </p>
            <p className="text-secondary-400 mb-4 leading-relaxed">
              Launched in 2023, we connect buyers with sellers and revolutionize the way people discover and rent properties.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 flex items-center">
              <i className="fas fa-link text-primary-500 mr-2"></i>
              <span className="relative inline-block">
                Quick Links
                <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-primary-500"></span>
              </span>
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-secondary-400 hover:text-white transition-colors duration-300 flex items-center">
                  <i className="fas fa-chevron-right text-xs text-primary-500 mr-2"></i>
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-400 hover:text-white transition-colors duration-300 flex items-center">
                  <i className="fas fa-chevron-right text-xs text-primary-500 mr-2"></i>
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-400 hover:text-white transition-colors duration-300 flex items-center">
                  <i className="fas fa-chevron-right text-xs text-primary-500 mr-2"></i>
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-400 hover:text-white transition-colors duration-300 flex items-center">
                  <i className="fas fa-chevron-right text-xs text-primary-500 mr-2"></i>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-400 hover:text-white transition-colors duration-300 flex items-center">
                  <i className="fas fa-chevron-right text-xs text-primary-500 mr-2"></i>
                  Refund Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 flex items-center">
              <i className="fas fa-map-marker-alt text-primary-500 mr-2"></i>
              <span className="relative inline-block">
                Popular Locations
                <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-primary-500"></span>
              </span>
            </h3>
            <ul className="grid grid-cols-2 gap-2">
              <li>
                <Link href="/properties?city=Delhi" className="text-secondary-400 hover:text-white transition-colors duration-300 flex items-center">
                  <i className="fas fa-chevron-right text-xs text-primary-500 mr-2"></i>
                  Delhi
                </Link>
              </li>
              <li>
                <Link href="/properties?city=Mumbai" className="text-secondary-400 hover:text-white transition-colors duration-300 flex items-center">
                  <i className="fas fa-chevron-right text-xs text-primary-500 mr-2"></i>
                  Mumbai
                </Link>
              </li>
              <li>
                <Link href="/properties?city=Bangalore" className="text-secondary-400 hover:text-white transition-colors duration-300 flex items-center">
                  <i className="fas fa-chevron-right text-xs text-primary-500 mr-2"></i>
                  Bangalore
                </Link>
              </li>
              <li>
                <Link href="/properties?city=Hyderabad" className="text-secondary-400 hover:text-white transition-colors duration-300 flex items-center">
                  <i className="fas fa-chevron-right text-xs text-primary-500 mr-2"></i>
                  Hyderabad
                </Link>
              </li>
              <li>
                <Link href="/properties?city=Lucknow" className="text-secondary-400 hover:text-white transition-colors duration-300 flex items-center">
                  <i className="fas fa-chevron-right text-xs text-primary-500 mr-2"></i>
                  Lucknow
                </Link>
              </li>
              <li>
                <Link href="/properties?city=Auraiya" className="text-secondary-400 hover:text-white transition-colors duration-300 flex items-center">
                  <i className="fas fa-chevron-right text-xs text-primary-500 mr-2"></i>
                  Auraiya
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 flex items-center">
              <i className="fas fa-phone-alt text-primary-500 mr-2"></i>
              <span className="relative inline-block">
                Contact Us
                <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-primary-500"></span>
              </span>
            </h3>
            <address className="not-italic text-secondary-400 space-y-3">
              <div className="flex items-start">
                <i className="fas fa-map-marker-alt text-primary-500 mt-1 mr-3"></i>
                <p>Om Nagar, Auraiya<br />Uttar Pradesh - 206122</p>
              </div>
              <div className="flex items-center">
                <i className="fas fa-phone-alt text-primary-500 mr-3"></i>
                <p>+91 9045327038</p>
              </div>
              <div className="flex items-center">
                <i className="fas fa-envelope text-primary-500 mr-3"></i>
                <p>info@propertyadda.com</p>
              </div>
              <div className="flex items-center">
                <i className="fas fa-clock text-primary-500 mr-3"></i>
                <p>Mon - Sat: 9:00 AM - 8:00 PM</p>
              </div>
            </address>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-secondary-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-secondary-400">
          <p>&copy; {new Date().getFullYear()} PropertyAdda. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <a href="#" className="text-secondary-400 hover:text-white transition-colors duration-300">Terms</a>
            <span>•</span>
            <a href="#" className="text-secondary-400 hover:text-white transition-colors duration-300">Privacy</a>
            <span>•</span>
            <a href="#" className="text-secondary-400 hover:text-white transition-colors duration-300">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
