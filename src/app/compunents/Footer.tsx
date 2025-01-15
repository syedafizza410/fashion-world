// components/Footer.tsx
'use client';

import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between">
          {/* About Section */}
          <div className="mb-6 md:mb-0">
            <h2 className="text-xl font-semibold mb-2">Efuc</h2>
            <p className="text-sm">
              Your one-stop shop for all your needs. Quality products at unbeatable prices.
            </p>
          </div>

          {/* Links Section */}
          <div className="flex space-x-8">
            <div>
              <h3 className="text-lg font-semibold mb-2">Company</h3>
              <ul className="space-y-1">
                <li>
                  <Link href="/hero">
                    <span className="text-sm hover:text-white cursor-pointer">About Us</span>
                  </Link>
                </li>
                <li>
                  <Link href="/careers">
                    <span className="text-sm hover:text-white cursor-pointer">Careers</span>
                  </Link>
                </li>
                <li>
                  <Link href="/press">
                    <span className="text-sm hover:text-white cursor-pointer">Press</span>
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Support</h3>
              <ul className="space-y-1">
                <li>
                  <Link href="/help">
                    <span className="text-sm hover:text-white cursor-pointer">Help Center</span>
                  </Link>
                </li>
                <li>
                  <Link href="/Contact">
                    <span className="text-sm hover:text-white cursor-pointer">Contact Us</span>
                  </Link>
                </li>
                <li>
                  <Link href="/privacy">
                    <span className="text-sm hover:text-white cursor-pointer">Privacy Policy</span>
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Services</h3>
              <ul className="space-y-1">
                <li>
                  <Link href="/shipping">
                    <span className="text-sm hover:text-white cursor-pointer">Shipping</span>
                  </Link>
                </li>
                <li>
                  <Link href="/returns">
                    <span className="text-sm hover:text-white cursor-pointer">Returns</span>
                  </Link>
                </li>
                <li>
                  <Link href="/faq">
                    <span className="text-sm hover:text-white cursor-pointer">FAQ</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-gray-700"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} Efuc. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="https://www.facebook.com/share/15esMnPZy5/?mibextid=wwXIfr" className="hover:text-white" aria-label="Facebook">
              <FaFacebookF className="h-5 w-5" />
            </a>
            <a href="https://twitter.com" className="hover:text-white" aria-label="Twitter">
              <FaTwitter className="h-5 w-5" />
            </a>
            <a href="https://www.instagram.com/eucfworld?igsh=NzY5N3oyeW1hdDVr" className="hover:text-white" aria-label="Instagram">
              <FaInstagram className="h-5 w-5" />
            </a>
            
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
