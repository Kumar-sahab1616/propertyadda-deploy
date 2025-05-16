import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-secondary-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">PropertyAdda</h3>
            <p className="text-secondary-300 mb-4">
              Your trusted partner in finding your dream property across India.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-secondary-300 hover:text-white">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-secondary-300 hover:text-white">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-secondary-300 hover:text-white">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-secondary-300 hover:text-white">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-secondary-300 hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-300 hover:text-white">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-300 hover:text-white">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-300 hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-300 hover:text-white">
                  Refund Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Locations</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/properties?city=Delhi" className="text-secondary-300 hover:text-white">
                  Delhi
                </Link>
              </li>
              <li>
                <Link href="/properties?city=Mumbai" className="text-secondary-300 hover:text-white">
                  Mumbai
                </Link>
              </li>
              <li>
                <Link href="/properties?city=Bangalore" className="text-secondary-300 hover:text-white">
                  Bangalore
                </Link>
              </li>
              <li>
                <Link href="/properties?city=Hyderabad" className="text-secondary-300 hover:text-white">
                  Hyderabad
                </Link>
              </li>
              <li>
                <Link href="/properties?city=Lucknow" className="text-secondary-300 hover:text-white">
                  Lucknow
                </Link>
              </li>
              <li>
                <Link href="/properties?city=Auraiya" className="text-secondary-300 hover:text-white">
                  Auraiya
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <address className="not-italic text-secondary-300">
              <p className="mb-2">Om Nagar, Auraiya</p>
              <p className="mb-2">Uttar Pradesh - 206122</p>
              <p className="mb-2">
                <i className="fas fa-phone-alt mr-2"></i>
                +91 9045327038
              </p>
              <p className="mb-2">
                <i className="fas fa-envelope mr-2"></i>
                info@propertyadda.com
              </p>
            </address>
          </div>
        </div>

        <div className="border-t border-secondary-700 mt-12 pt-8 text-center text-secondary-400">
          <p>&copy; {new Date().getFullYear()} PropertyAdda. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
