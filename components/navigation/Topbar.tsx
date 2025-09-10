'use client';

import LanguageSwitcher from './LanguageSwitcher';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

type TopbarLabels = {
  home: string;
  about: string;
  projects: string;
  blog: string;
  contact: string;
  vision: string;
  language: string;
};

type TopbarProps = {
  locale: string;
  labels: TopbarLabels;
};

export default function Topbar({ locale, labels }: TopbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen((v) => !v);

  const navLinks = [
    { href: `/${locale}`, label: labels.home },
    { href: `/${locale}/#about`, label: labels.about },
    { href: `/${locale}/#projects`, label: labels.projects },
    { href: `/${locale}/blog`, label: labels.blog },
    { href: `/${locale}/vision`, label: labels.vision },
    { href: `/${locale}/vision#videos`, label: '🎥 ' + labels.vision }, // optional direct jump
    { href: `/${locale}/#contact`, label: labels.contact },
  ];

  return (
    <header className="bg-white/90 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <Link href={`/${locale}`}>
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

        {/* Desktop */}
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
          <LanguageSwitcher />
        </nav>

        {/* Mobile toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-700" aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
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
          <div className="pt-2 border-t">
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </header>
  );
}
