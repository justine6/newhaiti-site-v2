"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import LanguageSwitcher from "@/components/navigation/LanguageSwitcher";

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
  // 🔐 Make labels optional, allow partials
  labels?: Partial<TopbarLabels>;
};

// ✅ Safe English defaults (used when dictionary is missing)
const DEFAULT_LABELS: TopbarLabels = {
  home: "Home",
  about: "About",
  projects: "Projects",
  blog: "Blog",
  contact: "Contact",
  vision: "Vision",
  language: "Language",
};

// External blog base – we’ll send all “Blog” traffic there
const BLOG_BASE_URL =
  process.env.NEXT_PUBLIC_BLOG_BASE_URL ?? "https://blogs.nouvoayiti2075.com";

export default function Topbar({ locale, labels }: TopbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen((v) => !v);

  // 🛟 Merge whatever came in with safe defaults
  const safeLabels: TopbarLabels = { ...DEFAULT_LABELS, ...(labels ?? {}) };

  const navLinks: { href: string; label: string; external?: boolean }[] = [
    { href: `/${locale}`, label: safeLabels.home },
    { href: `/${locale}/#about`, label: safeLabels.about },
    { href: `/${locale}/#projects`, label: safeLabels.projects },
    // 🔗 Send Blog to the external blog site (locale-aware)
    {
      href: `${BLOG_BASE_URL}/${locale}/blog`,
      label: safeLabels.blog,
      external: true,
    },
    // 🎥 Vision – also to external blog/videos for now
    {
      href: `${BLOG_BASE_URL}/${locale}/blog`,
      label: "🎥 " + safeLabels.vision,
      external: true,
    },
    { href: `/${locale}/#contact`, label: safeLabels.contact },
  ];

  return (
    <header className="bg-white/90 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <Link href={`/${locale}`}>
          <div className="flex items-center gap-2">
            <Image
              src="/images/newhaitilogo.png"
              alt="Ayiti 2075"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="font-bold text-lg tracking-wide text-gray-800">
              Ayiti 2075
            </span>
          </div>
        </Link>

        {/* Desktop */}
        <nav className="hidden md:flex space-x-6 items-center">
          {navLinks.map((link) =>
            link.external ? (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-blue-600 font-medium transition"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-blue-600 font-medium transition"
              >
                {link.label}
              </Link>
            )
          )}
          <LanguageSwitcher />
        </nav>

        {/* Mobile toggle */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-700"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu (keep simple for now) */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-sm px-4 py-3 space-y-2">
          {navLinks.map((link) =>
            link.external ? (
              <a
                key={link.href}
                href={link.href}
                className="block text-gray-700 hover:text-blue-600 font-medium transition"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="block text-gray-700 hover:text-blue-600 font-medium transition"
              >
                {link.label}
              </Link>
            )
          )}
          <div className="pt-2">
            <LanguageSwitcher className="w-full" />
          </div>
        </div>
      )}
    </header>
  );
}
