'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function NavBar() {
  return (
    <header className="bg-white shadow-md px-4 py-2 flex items-center justify-between">
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

      <nav className="space-x-6 text-sm font-medium">
        <Link href="#vision" className="hover:text-blue-600">
          Vision
        </Link>
        <Link href="#map" className="hover:text-blue-600">
          Haiti Map
        </Link>
        <Link href="#apply" className="hover:text-blue-600">
          Apply
        </Link>
      </nav>
    </header>
  );
}
