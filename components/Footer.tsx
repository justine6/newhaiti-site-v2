
'use client';

import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-haiti-blue text-white py-6 mt-10 text-sm">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p>&copy; {year} New Haiti Team 2075. All rights reserved.</p>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <Link href="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:underline">
            Terms of Service
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
