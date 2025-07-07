'use client';

import LanguageSwitcher from './LanguageSwitcher';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

// ✅ Accept locale as a prop (even if unused for now)
type TopbarProps = {
  locale: string;
};

export default function Topbar({ locale }: TopbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

const navLinks = [
  { href: `/${locale}`, label: 'Home' },
  { href: `/${locale}/#about`, label: 'About' },
  { href: `/${locale}/#projects`, label: 'Projects' },
  { href: `/${locale}/blog`, label: 'Blog' },
  { href: `/${locale}/#contact`, label: 'Contact' },
];


  return (
    <header className="bg-white/90 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center gap-2">
            <Image
              src="/images/newhaitilogo.png"
              alt="Nouvo Ayiti 2075"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="font-bold text-lg tracking-wide text-gray-800">
              Nouvo Ayiti 2075
            </span>
          </div>
        </Link>

        {/* Desktop Nav + Language Switcher */}
        <nav className="hidden md:flex space-x-6 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              {link.label}
            </Link>
          ))}

          {/* Language Switcher */}
          <LanguageSwitcher />
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-700">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-sm px-4 py-3 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-gray-800 hover:text-blue-600 font-medium transition"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
