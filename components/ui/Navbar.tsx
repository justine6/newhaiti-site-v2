'use client';

import Link from 'next/link';
import Image from 'next/image';

type Props = {
  currentLocale: string;
};

export default function Navbar({ currentLocale }: Props) {
  return (
    <nav className="w-full bg-white shadow-md px-6 py-3 flex items-center justify-between">
      {/* Logo and text */}
      <div className="flex items-center gap-2">
        <Image
          src="/images/newhaitilogo.png"
          alt="New Haiti Logo"
          width={40}
          height={40}
          className="rounded-full"
        />
        <span className="text-lg font-bold text-gray-800">New Haiti</span>
      </div>

      {/* Navigation Links */}
      <ul className="flex gap-6 text-blue-600 font-medium">
        <li>
          <Link href={`/${currentLocale}#hero`}>Home</Link>
        </li>
        <li>
          <Link href={`/${currentLocale}#about`}>About</Link>
        </li>
        <li>
          <Link href={`/${currentLocale}#projects`}>Projects</Link>
        </li>
        <li>
          <Link href={`/${currentLocale}#contact`}>Contact</Link>
        </li>
      </ul>
    </nav>
  );
}
