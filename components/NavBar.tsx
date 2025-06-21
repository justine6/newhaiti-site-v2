'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Home, Map, Megaphone, FolderKanban, Mail, Languages } from 'lucide-react';

export default function NavBar() {
  return (
    <header className="bg-white shadow-md px-4 py-2 flex items-center justify-between">
      {/* Logo and Title */}
      <Link href="/" className="flex items-center space-x-3">
        <Image
          src="/images/newhaitilogo.png"
          alt="New Haiti Team Logo"
          width={48}
          height={48}
          className="object-contain"
        />
        <span className="text-xl font-bold text-blue-800">New Haiti Team 2075</span>
      </Link>

      {/* Navigation Links */}
      <nav className="flex gap-6 items-center text-sm font-medium">
        <Link href="/" className="flex items-center gap-1 hover:text-blue-600">
          <Home className="w-4 h-4" /> Home
        </Link>
        <Link href="#vision" className="flex items-center gap-1 hover:text-blue-600">
          <FolderKanban className="w-4 h-4" /> Vision
        </Link>
        <Link href="#haiti-map" className="flex items-center gap-1 hover:text-blue-600">
          <Map className="w-4 h-4" /> Haiti Map
        </Link>
        <Link href="#appeal" className="flex items-center gap-1 hover:text-blue-600">
          <Megaphone className="w-4 h-4" /> Appeal
        </Link>
        <Link href="#projects" className="flex items-center gap-1 hover:text-blue-600">
          <FolderKanban className="w-4 h-4" /> Projects
        </Link>
        <Link href="#contact" className="flex items-center gap-1 hover:text-blue-600">
          <Mail className="w-4 h-4" /> Contact
        </Link>
        <button className="flex items-center gap-1 border px-2 py-1 rounded-md hover:bg-gray-100">
          <Languages className="w-4 h-4" /> English
        </button>
      </nav>
    </header>
  );
}
