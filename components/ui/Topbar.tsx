"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Locale } from "@/lib/i18n/settings";

type TopbarDict = {
  home: string;
  about: string;
  projects: string;
  blog: string;
  videos: string;
  contact: string;
  vision: string;
  language: string;
};

export default function Topbar({
  dictionary,
  locale,
}: {
  dictionary: { topbar: TopbarDict };
  locale: string | Locale;
}) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Base path for non-English locales
  const base = typeof locale === "string" && locale !== "en" ? `/${locale}` : "";

  const navLinks = [
    { href: `${base}/`, label: dictionary.topbar.home },
    { href: `${base}/about`, label: dictionary.topbar.about },
    { href: `${base}/projects`, label: dictionary.topbar.projects },
    { href: `${base}/blog`, label: dictionary.topbar.blog },
    { href: `${base}/videos`, label: dictionary.topbar.videos },
    { href: `${base}/contact`, label: dictionary.topbar.contact },
    { href: `${base}/vision`, label: dictionary.topbar.vision },
    <Link href="https://blogs.nouvoayiti2075.com" className="hover:underline">
  Blog
</Link>
  
  ];

  return (
    <header className="w-full bg-white/90 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href={base || "/"}>
          <Image
            src="/images/newhaitilogo.png"
            alt="Haiti Logo"
            width={50}
            height={50}
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition ${
                pathname === link.href
                  ? "text-red-600"
                  : "text-gray-700 hover:text-red-600"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden p-2 text-gray-700 hover:text-red-600"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Sliding Menu + Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setIsOpen(false)} // close when clicking outside
            />

            {/* Sliding Menu */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed inset-y-0 right-0 w-3/4 bg-white shadow-lg z-50 md:hidden"
            >
              <nav className="flex flex-col p-6 space-y-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-lg font-medium transition ${
                      pathname === link.href
                        ? "text-red-600"
                        : "text-gray-700 hover:text-red-600"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
