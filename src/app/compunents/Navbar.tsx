"use client";

import { useState } from 'react';
import Link from 'next/link';
import { HiSun, HiMoon, HiMenu, HiX } from 'react-icons/hi';
import { useTheme } from 'next-themes';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <nav className="bg-gray-800 text-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-white hover:text-gray-300">
              Efuc
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center">
            <Link href="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">
              Home
            </Link>
            <Link href="/products" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">
              Products
            </Link>
            <Link href="/about" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">
              About
            </Link>
            <Link href="/contact" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">
              Contact
            </Link>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="ml-4 p-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-label="Toggle Dark Mode"
            >
              {theme === 'dark' ? (
                <HiSun className="h-6 w-6 text-yellow-400" />
              ) : (
                <HiMoon className="h-6 w-6 text-gray-200" />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? (
                <HiX className="h-6 w-6" />
              ) : (
                <HiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-800">
          <Link href="/" className="block px-4 py-2 text-sm hover:bg-gray-700">
            Home
          </Link>
          <Link href="/products" className="block px-4 py-2 text-sm hover:bg-gray-700">
            Products
          </Link>
          <Link href="/about" className="block px-4 py-2 text-sm hover:bg-gray-700">
            About
          </Link>
          <Link href="/contact" className="block px-4 py-2 text-sm hover:bg-gray-700">
            Contact
          </Link>
          {/* Dark Mode Toggle in Mobile Menu */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-700 flex items-center"
            aria-label="Toggle Dark Mode"
          >
            {theme === 'dark' ? (
              <>
                <HiSun className="h-6 w-6 text-yellow-400 mr-2" />
                Light Mode
              </>
            ) : (
              <>
                <HiMoon className="h-6 w-6 text-gray-200 mr-2" />
                Dark Mode
              </>
            )}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
