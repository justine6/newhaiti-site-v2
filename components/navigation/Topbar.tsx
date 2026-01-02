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
  join?: string;
  donate?: string;
  videos?: string; // 👈 NEW
};

type TopbarProps = {
  locale: string;
  labels?: Partial<TopbarLabels>;
};

const DEFAULT_LABELS: TopbarLabels = {
  home: "Home",
  about: "About",
  projects: "Projects",
  blog: "Blog",
  contact: "Contact",
  vision: "Vision",
  language: "Language",
  join: "Join the movement",
  donate: "Donate",
  videos: "Videos", // 👈 NEW
};

const BLOG_BASE_URL =
  process.env.NEXT_PUBLIC_BLOG_BASE_URL ??
  "https://blogs.nouvoayiti2075.com";

export default function Topbar({ locale, labels }: TopbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen((v) => !v);

  const safeLabels: TopbarLabels = { ...DEFAULT_LABELS, ...(labels ?? {}) };

  const stripeDonateUrl = process.env.NEXT_PUBLIC_STRIPE_DONATE_URL ?? "";
  const hasStripeDonate = stripeDonateUrl.trim().length > 0;

  const navLinks: { href: string; label: string; external?: boolean }[] = [
    { href: `/${locale}`, label: safeLabels.home },
    { href: `/${locale}/#about`, label: safeLabels.about },
    { href: `/${locale}/#projects`, label: safeLabels.projects },
    {
      href: BLOG_BASE_URL,
      label: safeLabels.blog,
      external: true,
    },
    {
      href: `/${locale}/vision`,
      label: safeLabels.vision,
    },
    {
      href: `/${locale}/videos`,
      label: safeLabels.videos ?? "Videos", // 👈 NEW
    },
    { href: `/${locale}/#contact`, label: safeLabels.contact },
  ];

  return (
    <header className="bg-white/90 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Left: logo */}
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

        {/* Center: desktop nav */}
        <nav className="hidden md:flex flex-1 items-center justify-center gap-4">
          {navLinks.map((link) =>
            link.external ? (
              <a
                key={link.href}
                href={link.href}
                className="relative text-sm font-medium text-slate-700 px-3 py-1 rounded-full transition-all duration-150 hover:text-blue-700 hover:bg-blue-50"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-sm font-medium text-slate-700 px-3 py-1 rounded-full transition-all duration-150 hover:text-blue-700 hover:bg-blue-50"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* Right: profile pill + CTAs + language (desktop) */}
        <div className="hidden md:flex items-center gap-4">
          {/* Signature pill */}
          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-2.5 py-1 shadow-sm">
            <Image
              src="/images/kiawel-daniel.png"
              alt="Kiawel Daniel"
              width={32}
              height={32}
              className="h-8 w-8 rounded-full object-cover ring-2 ring-blue-100"
            />
            <span className="text-xs font-medium text-slate-700 whitespace-nowrap">
              Restoring Haiti with{" "}
              <span className="text-blue-700">Kiawel Daniel</span>
            </span>
          </div>

          {/* Join CTA – now black */}
          <Link
            href={`/${locale}/join`}
            className="inline-flex items-center justify-center rounded-full bg-black px-5 py-2 text-sm font-semibold text-white shadow-md hover:bg-gray-900 hover:shadow-lg active:scale-[0.98] transition-all"
          >
            {safeLabels.join ?? "Join the movement"}
          </Link>

          {/* Donate CTA – only if Stripe URL configured */}
          {hasStripeDonate && (
            <a
              href={stripeDonateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-rose-500 bg-white px-5 py-2 text-sm font-semibold text-rose-700 shadow-md hover:bg-rose-600 hover:text-white hover:shadow-lg active:scale-[0.98] transition-all"
            >
              <span>❤️</span>
              <span>{safeLabels.donate ?? "Donate"}</span>
            </a>
          )}

          <LanguageSwitcher />
        </div>

        {/* Mobile: language + burger */}
        <div className="md:hidden flex items-center gap-2">
          <LanguageSwitcher />
          <button
            onClick={toggleMenu}
            className="inline-flex items-center justify-center rounded-full border border-slate-200 p-1.5 text-gray-700 shadow-sm hover:bg-slate-50"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-sm px-4 py-3 space-y-2 border-t border-slate-100">
          {/* Mini signature */}
          <div className="flex items-center gap-2 pb-2">
            <Image
              src="/images/kiawel-daniel.png"
              alt="Kiawel Daniel"
              width={28}
              height={28}
              className="h-7 w-7 rounded-full object-cover ring-2 ring-blue-100"
            />
            <span className="text-xs font-medium text-slate-700">
              Restoring Haiti with{" "}
              <span className="text-blue-700">Kiawel Daniel</span>
            </span>
          </div>

          {/* Mobile nav links */}
          {navLinks.map((link) =>
            link.external ? (
              <a
                key={link.href}
                href={link.href}
                className="block rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            )
          )}

          {/* Mobile Join – black */}
          <Link
            href={`/${locale}/join`}
            className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-black px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-gray-900 active:scale-[0.98] transition-all"
            onClick={() => setIsOpen(false)}
          >
            {safeLabels.join ?? "Join the movement"}
          </Link>

          {/* Mobile Donate – only if configured */}
          {hasStripeDonate && (
            <a
              href={stripeDonateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full border border-rose-500 bg-white px-4 py-2 text-sm font-semibold text-rose-700 shadow-md hover:bg-rose-600 hover:text-white active:scale-[0.98] transition-all"
              onClick={() => setIsOpen(false)}
            >
              <span>❤️</span>
              <span>{safeLabels.donate ?? "Donate"}</span>
            </a>
          )}
        </div>
      )}
    </header>
  );
}
