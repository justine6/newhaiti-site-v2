// app/[locale]/layout.tsx
import '../../styles/globals.css';
import { ReactNode } from 'react';
import { languages, type Locale } from '@/lib/i18n/settings';
import Topbar from '@/components/navigation/Topbar';

export async function generateStaticParams() {
  return languages.map((locale) => ({ locale }));
}

export async function generateMetadata() {
  return {
    title: 'New Haiti Team 2075',
    description: 'Restoring Dignity. Rebuilding Hope.',
  };
}

export default async function LocaleLayout(props: {
  children: ReactNode;
  params: { locale: string };
}) {
  // ✅ appease Next 15 dynamic API rule
  const { locale } = await Promise.resolve(props.params);

  const safeLocale: Locale = (languages as readonly string[]).includes(locale)
    ? (locale as Locale)
    : 'en';

import { getDictionary } from '@/lib/i18n/get-dictionary';

export default async function LocaleLayout(props: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = await Promise.resolve(props.params);

  const safeLocale = (['en','fr','ht','es'] as const).includes(locale as any) ? (locale as any) : 'en';

  // Load the home dictionary to get topbar labels (we already have these keys)
  const homeDict = await getDictionary(safeLocale, 'home');

  const topbarLabels = homeDict?.topbar ?? {
    home: 'Home',
    about: 'About',
    projects: 'Projects',
    blog: 'Blog',
    contact: 'Contact',
    vision: 'Vision',
    language: 'Language',
  };

  return (
    <>
      <Topbar locale={safeLocale} labels={topbarLabels} />
      {props.children}
    </>
  );
}

