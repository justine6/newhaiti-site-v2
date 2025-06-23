// components/Topbar.tsx
import Image from 'next/image';
import LanguageSwitcher from './navigation/LanguageSwitcher';

export default function Topbar() {
  return (
    <div className="w-full bg-white px-4 py-1 text-xs md:text-sm flex justify-between items-center border-b shadow-sm z-50 ltr:flex-row rtl:flex-row-reverse">
      {/* ✅ Left Side: Logo + Title */}
      <div className="flex items-center gap-2">
        <Image
          src="/nh-logo.jpg"
          alt="New Haiti Logo"
          width={28}
          height={28}
          className="object-contain rounded"
        />
        <span className="font-semibold text-gray-800">New Haiti Team 2075</span>
      </div>

      {/* ✅ Right Side: Contact Info + Language Switcher */}
      <div className="flex gap-4 items-center text-gray-600">
        <a href="#contact" className="hover:text-blue-600">Contact</a>
        <a href="#newsletter" className="hover:text-blue-600">Newsletter</a>
        <a href="tel:+1234567890" className="hover:text-blue-600">Call</a>
        <a href="mailto:info@newhaiti2075.org" className="hover:text-blue-600">Email</a>
        <LanguageSwitcher className="ml-2 text-sm" />
      </div>
    </div>
  );
}
