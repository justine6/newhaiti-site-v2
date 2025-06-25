// components/navigation/LanguageSwitcher.tsx
'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useTransition } from 'react';
import { useState } from 'react';

const locales = [
  { code: 'en', label: '🇺🇸 English' },
  { code: 'fr', label: '🇫🇷 Français' },
  { code: 'ht', label: '🇭🇹 Kreyòl' },
];

export default function LanguageSwitcher({ className = '' }: { className?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [selected, setSelected] = useState(() => {
    const pathLocale = pathname?.split('/')[1];
    return locales.find(l => l.code === pathLocale)?.code || 'en';
  });

  function onChangeLocale(newLocale: string) {
    if (!pathname) return;

    const segments = pathname.split('/');
    segments[1] = newLocale;
    const newPath = segments.join('/');

    setSelected(newLocale);
    startTransition(() => {
      router.push(newPath);
    });
  }

  return (
    <select
      value={selected}
      onChange={e => onChangeLocale(e.target.value)}
      className={`cursor-pointer border rounded px-2 py-1 text-xs md:text-sm transition-all duration-300 ease-in-out hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
    >
      {locales.map(locale => (
        <option key={locale.code} value={locale.code}>
          {locale.label}
        </option>
      ))}
    </select>
  );
}
