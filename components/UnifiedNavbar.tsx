/** @jsxImportSource react */
"use client";  // This component uses state and event handlers

import { useState } from "react";
import Link from "next/link";

export default function Navbar({ currentLocale }: { currentLocale: string }) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Optional: define nav items in an array to avoid repeating in JSX
  const navItems = [
    { href: `/${currentLocale}/`, label: "Home" },
    { href: `/${currentLocale}/projects`, label: "Projects" },
    { href: `/${currentLocale}/haiti-map`, label: "Haiti Map" },
    { href: `/${currentLocale}/vision`, label: "Vision" },
    { href: `/${currentLocale}/appeal`, label: "Appeal" },
  ];

  return (
    <header className="bg-white shadow-md"> {/* unified bar container */}
      <nav className="max-w-screen-xl mx-auto px-4 py-2 flex items-center justify-between">
        {/* Left side: Brand/Logo and main nav links */}
        <div className="flex items-center space-x-6">
          {/* Logo/Brand (could be an image or text link to home) */}
          <Link href={`/${currentLocale}/`}>
            <span className="font-bold text-lg">newhaitilogo.png</span>
          </Link>
          {/* Nav links (hidden on mobile, shown on md and up) */}
          <ul className="hidden md:flex space-x-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link 
                  href={item.href} 
                  className="text-gray-700 hover:text-gray-900 px-2 py-1"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right side: Language selector and contact (hidden on mobile) + Hamburger (mobile) */}
        <div className="flex items-center space-x-4">
          {/* Language dropdown and contact button for desktop */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Language Switcher Dropdown */}
            <div className="relative">
              {/* Trigger button for language menu */}
              <button 
                className="flex items-center px-2 py-1 border border-gray-300 rounded hover:bg-gray-100"
                onClick={() => {/* toggle language dropdown logic */}}
              >
                English {/* or current language label */}
                <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5.5 8.5l4.5 4 4.5-4" /> {/* simple dropdown arrow icon */}
                </svg>
              </button>
              {/* Dropdown menu items (e.g., languages) */}
              {/* ... your language options ... */}
            </div>
            {/* Contact/Email Button or Icon */}
            <a 
              href="mailto:contact@nouvoayiti2075@gmail.com" 
              className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100"
            >
              Contact
            </a>
          </div>

          {/* Hamburger menu button (visible on mobile only) */}
          <button 
            className="md:hidden inline-flex items-center p-2 text-gray-700 hover:text-gray-900 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            {/* Icon: hamburger (three bars) or X for close */}
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2}>
              {menuOpen ? (
                // X icon (close)
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                // Hamburger icon (open)
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h14M3 12h14M3 18h14" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu dropdown (visible when menuOpen is true on small screens) */}
      <div className={`md:hidden bg-white ${menuOpen ? "block" : "hidden"}`}>
        <ul className="px-4 pt-2 pb-4 space-y-2 border-t border-gray-200">
          {navItems.map((item) => (
            <li key={`m-${item.href}`}>
              <Link 
                href={item.href} 
                className="block text-gray-700 hover:bg-gray-100 rounded px-2 py-1"
                onClick={() => setMenuOpen(false)}  {/* close menu on selection */}
              >
                {item.label}
              </Link>
            </li>
          ))}
          {/* Language and contact in mobile menu */}
          <li>
            {/* Example: static language links for mobile */}
            <button 
              className="w-full text-left text-gray-700 hover:bg-gray-100 rounded px-2 py-1"
              onClick={() => {/* handle language change, e.g., switch to next locale */}}
            >
              🌐 Language: English
            </button>
          </li>
          <li>
            <a 
              href="mailto:contact@yoursite.com" 
              className="block text-gray-700 hover:bg-gray-100 rounded px-2 py-1"
            >
              📧 Contact Us
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
